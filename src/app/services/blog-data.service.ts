import { Injectable, signal, inject, PLATFORM_ID, LOCALE_ID } from '@angular/core'
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

	constructor() {
		// No language change subscription needed with Angular i18n
		// Each locale build is separate
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

			// Create an abort controller with timeout
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

			try {
				const metadataResponse = await fetch(`${basePath}/${languagePath}/articles.json`, {
					signal: controller.signal,
				})
				clearTimeout(timeoutId)

				if (!metadataResponse.ok) {
					throw new Error(`Failed to load articles metadata for language ${lang}: ${metadataResponse.status}`)
				}

				const metadata = (await metadataResponse.json()) as ArticleMetadata[]
				const articles: BlogArticle[] = await Promise.all(
					metadata.map(async (meta) => {
						const articleController = new AbortController()
						const articleTimeoutId = setTimeout(() => articleController.abort(), 5000) // 5 second timeout per article

						try {
							const response = await fetch(`${basePath}/${languagePath}/${meta.markdownFile}`, {
								signal: articleController.signal,
							})
							clearTimeout(articleTimeoutId)

							if (!response.ok) {
								throw new Error(`Failed to load article: ${meta.slug}`)
							}
							const markdown = await response.text()
							const content = await marked(markdown)
							const readingTime = this.readingTimeService.calculateReadingTime(content)

							return {
								slug: meta.slug,
								title: meta.title,
								summary: meta.summary,
								content,
								category: meta.category,
								date: meta.date,
								similarSlugs: meta.similarSlugs,
								readingTime,
								author: meta.author,
							}
						} catch (error) {
							clearTimeout(articleTimeoutId)
							console.warn(`Failed to load article ${meta.slug}:`, error)
							// Return a placeholder article instead of failing
							return {
								slug: meta.slug,
								title: meta.title,
								summary: meta.summary,
								content: '<p>Content unavailable</p>',
								category: meta.category,
								date: meta.date,
								similarSlugs: meta.similarSlugs,
								readingTime: 0,
								author: meta.author,
							}
						}
					}),
				)

				this._articles.set(articles)
			} catch (error) {
				clearTimeout(timeoutId)
				console.error('Failed to load blog articles:', error)
			}
		} catch (error) {
			console.error('Failed to load blog articles:', error)
		}
	}

	articles = this._articles.asReadonly()
	loading = this._loading.asReadonly()

	loadArticles() {
		this.ensureLoaded()
	}

	getBySlug(slug: string) {
		return this._articles().find((article) => article.slug === slug)
	}
}
