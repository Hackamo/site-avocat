import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { BlogArticle } from '../models/blog-article.model'
import { marked } from 'marked'

interface ArticleMetadata {
	slug: string
	title: string
	summary: string
	category: string
	date: string
	author?: string
	markdownFile: string
	similarSlugs: string[]
}

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	private readonly platformId = inject(PLATFORM_ID)
	private readonly translate = inject(TranslateService)
	private readonly _articles = signal<BlogArticle[]>([])
	private readonly _loading = signal(false)
	private loadingPromise: Promise<void> | null = null
	private currentLanguage: string | null = null

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			this.translate.onLangChange.subscribe(() => {
				// Reset articles on language change to force reload
				this._articles.set([])
				this.loadingPromise = null
				this.ensureLoaded()
			})
			// Don't load during prerendering - wait for explicit user interaction
			// Load will happen on first access via ensureLoaded
		}
	}

	private async ensureLoaded(): Promise<void> {
		// If already loaded or loading, return existing promise
		if (this._articles().length > 0) return
		if (this.loadingPromise) return this.loadingPromise

		this._loading.set(true)
		this.loadingPromise = this.loadArticlesInternal()
		await this.loadingPromise
		this._loading.set(false)
	}

	private async loadArticlesInternal() {
		try {
			// Get current language
			const lang = this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en'
			this.currentLanguage = lang

			// Construct language-specific path
			const languagePath = lang === 'fr' ? 'fr' : 'en'

			// Create an abort controller with timeout
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

			try {
				const metadataResponse = await fetch(`assets/blog/${languagePath}/articles.json`, {
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
							const response = await fetch(`assets/blog/${languagePath}/${meta.markdownFile}`, {
								signal: articleController.signal,
							})
							clearTimeout(articleTimeoutId)

							if (!response.ok) {
								throw new Error(`Failed to load article: ${meta.slug}`)
							}
							const markdown = await response.text()
							const content = await marked(markdown)

							return {
								slug: meta.slug,
								title: meta.title,
								summary: meta.summary,
								content,
								category: meta.category,
								date: meta.date,
								similarSlugs: meta.similarSlugs,
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
