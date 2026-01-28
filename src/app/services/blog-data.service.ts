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
			this.ensureLoaded()
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

			const metadataResponse = await fetch(`assets/blog/${languagePath}/articles.json`)
			if (!metadataResponse.ok) {
				throw new Error(`Failed to load articles metadata for language ${lang}: ${metadataResponse.status}`)
			}

			const metadata = (await metadataResponse.json()) as ArticleMetadata[]
			const articles: BlogArticle[] = await Promise.all(
				metadata.map(async (meta) => {
					const response = await fetch(`assets/blog/${languagePath}/${meta.markdownFile}`)
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
				}),
			)

			// Simulate x second loading delay
			await new Promise((resolve) => setTimeout(resolve, 300))

			this._articles.set(articles)
		} catch (error) {
			console.error('Failed to load blog articles:', error)
		}
	}

	articles = this._articles.asReadonly()
	loading = this._loading.asReadonly()

	getBySlug(slug: string) {
		return this._articles().find((article) => article.slug === slug)
	}
}
