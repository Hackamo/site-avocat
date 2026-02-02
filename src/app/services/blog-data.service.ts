import { Injectable, signal, inject, PLATFORM_ID, LOCALE_ID, computed } from '@angular/core'
import { isPlatformBrowser, DOCUMENT } from '@angular/common'
import { BlogArticle, AuthorBio } from '../models/blog-article.model'
import { ReadingTimeService } from './reading-time.service'
import { marked } from 'marked'

interface AuthorMetadata {
	name: string
	title: string
	bio: string
	image?: string
}

interface ArticleMetadata {
	slug: string
	title: string
	summary: string
	category: string
	date: string
	author?: AuthorMetadata
	markdownFile: string
	similarSlugs: string[]
}

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	private readonly platformId = inject(PLATFORM_ID)
	private readonly locale = inject(LOCALE_ID)
	private readonly document = inject(DOCUMENT)
	private readonly readingTimeService = inject(ReadingTimeService)
	private readonly _articles = signal<BlogArticle[]>([])
	private readonly _loading = signal(false)
	private loadingPromise: Promise<void> | null = null
	private currentLanguage: string | null = null

	articles = computed(() => this.getSortedByDate())
	loading = this._loading.asReadonly()
	private readonly CACHE_NAME = 'blog-articles-cache-v1'

	constructor() {
		// No language change subscription needed with Angular i18n
		// Each locale build is separate
	}

	getSortedByDate() {
		return [...this._articles()].sort((a, b) => this.compareDates(b.date, a.date))
	}

	loadArticles() {
		this.ensureLoaded()
	}

	getBySlug(slug: string) {
		const article = this._articles().find((article) => article.slug === slug)
		if (!article) return undefined

		// If content is already loaded, return immediately
		if (article.content) {
			return article
		}

		// Load content asynchronously (fire and forget)
		this.loadArticleContent(slug)

		return article
	}

	private compareDates(dateA: string | undefined, dateB: string | undefined): number {
		const timeA = new Date(dateA || '1970-01-01').getTime()
		const timeB = new Date(dateB || '1970-01-01').getTime()
		return timeA - timeB // Ascending order for comparison (will be reversed in sort)
	}

	private async ensureLoaded(): Promise<void> {
		// If already loaded, return immediately
		if (this._articles().length > 0) {
			return
		}

		// If already loading, return existing promise
		if (this.loadingPromise) {
			return this.loadingPromise
		}

		this._loading.set(true)

		try {
			this.loadingPromise = this.loadArticlesInternal()
			await this.loadingPromise
		} finally {
			this._loading.set(false)
			this.loadingPromise = null
		}
	}

	private async loadArticlesInternal() {
		try {
			// Skip if not in browser
			if (!isPlatformBrowser(this.platformId)) {
				return
			}

			// Get current locale from LOCALE_ID or document.documentElement.lang
			const lang = this.locale || this.document.documentElement.lang || 'fr'
			this.currentLanguage = lang

			// Construct language-specific path
			const languagePath = lang === 'fr' ? 'fr' : 'en'

			// Use relative path from current location - works with any base href
			const basePath = 'assets/blog'
			const metadataUrl = `${basePath}/${languagePath}/articles.json`

			try {
				// Try to get metadata from Cache API first
				const cache = await caches.open(this.CACHE_NAME)
				let metadata: ArticleMetadata[]

				const cachedResponse = await cache.match(metadataUrl)
				if (cachedResponse) {
					metadata = await cachedResponse.json()
				} else {
					// Fetch with timeout if not cached
					const controller = new AbortController()
					const timeoutId = setTimeout(() => controller.abort(), 10000)

					const response = await fetch(metadataUrl, { signal: controller.signal })
					clearTimeout(timeoutId)

					if (!response.ok) {
						throw new Error(`Failed to load articles metadata for language ${lang}: ${response.status}`)
					}

					metadata = await response.clone().json()
					// Cache the response
					await cache.put(metadataUrl, response)
				}

				// Create articles with metadata only - no content parsing yet (lazy loaded)
				const articles: BlogArticle[] = metadata.map((meta) => ({
					slug: meta.slug,
					title: meta.title,
					summary: meta.summary,
					content: '', // Empty initially, loaded on demand
					category: meta.category,
					date: meta.date,
					similarSlugs: meta.similarSlugs,
					readingTime: 0, // Will be calculated when content is loaded
					author: meta.author,
				}))

				this._articles.set(articles)
			} catch (error) {
				console.error('Failed to load blog articles:', error)
			}
		} catch (error) {
			console.error('Failed to load blog articles:', error)
		}
	}

	private async loadArticleContent(slug: string): Promise<void> {
		try {
			if (!isPlatformBrowser(this.platformId)) return

			const lang = this.currentLanguage || this.locale || this.document.documentElement.lang || 'fr'
			const languagePath = lang === 'fr' ? 'fr' : 'en'
			const basePath = 'assets/blog'
			const cacheKey = `${languagePath}-${slug}`

			// Check localStorage cache first (faster than Cache API)
			const cachedData = localStorage.getItem(cacheKey)
			if (cachedData) {
				try {
					const { content, readingTime } = JSON.parse(cachedData)
					const articles = this._articles()
					const index = articles.findIndex((a) => a.slug === slug)
					if (index >= 0) {
						articles[index].content = content
						articles[index].readingTime = readingTime
						this._articles.set([...articles])
					}
					return
				} catch (e) {
					localStorage.removeItem(cacheKey)
				}
			}

			// Find article metadata to get markdown file path
			const metadataUrl = `${basePath}/${languagePath}/articles.json`

			// Try to get metadata from cache
			const cache = await caches.open(this.CACHE_NAME)
			let metadata: ArticleMetadata[]

			const cachedMetadata = await cache.match(metadataUrl)
			if (cachedMetadata) {
				metadata = await cachedMetadata.json()
			} else {
				const metadataResponse = await fetch(metadataUrl)
				metadata = await metadataResponse.clone().json()
				cache.put(metadataUrl, metadataResponse)
			}

			const articleMeta = metadata.find((m: ArticleMetadata) => m.slug === slug)

			if (!articleMeta) {
				console.warn(`Article metadata not found for slug: ${slug}`)
				return
			}

			const markdownUrl = `${basePath}/${languagePath}/${articleMeta.markdownFile}`

			// Try to get markdown from cache
			let markdown: string
			const cachedMarkdown = await cache.match(markdownUrl)

			if (cachedMarkdown) {
				markdown = await cachedMarkdown.text()
			} else {
				const response = await fetch(markdownUrl)
				if (!response.ok) {
					console.warn(`Failed to load article content: ${slug}`)
					return
				}
				markdown = await response.clone().text()
				cache.put(markdownUrl, response)
			}

			const content = await marked(markdown)
			const readingTime = this.readingTimeService.calculateReadingTime(content)

			// Store in localStorage for fast access
			try {
				localStorage.setItem(cacheKey, JSON.stringify({ content, readingTime }))
			} catch (e) {
				console.warn('Failed to cache article in localStorage:', e)
			}

			// Update article in signal
			const articles = this._articles()
			const index = articles.findIndex((a) => a.slug === slug)
			if (index >= 0) {
				articles[index].content = content
				articles[index].readingTime = readingTime
				this._articles.set([...articles])
			}
		} catch (error) {
			console.warn(`Failed to load article content for ${slug}:`, error)
		}
	}
}
