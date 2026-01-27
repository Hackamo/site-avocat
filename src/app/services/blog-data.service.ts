import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
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
	private readonly _articles = signal<BlogArticle[]>([])
	private readonly _loading = signal(false)
	private loadingPromise: Promise<void> | null = null

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
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
			const metadataResponse = await fetch('assets/blog/articles.json')
			if (!metadataResponse.ok) {
				throw new Error(`Failed to load articles metadata: ${metadataResponse.status}`)
			}

			const metadata = (await metadataResponse.json()) as ArticleMetadata[]
			const articles: BlogArticle[] = await Promise.all(
				metadata.map(async (meta) => {
					const response = await fetch(`assets/blog/${meta.markdownFile}`)
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

			// Simulate 1 second loading delay
			await new Promise((resolve) => setTimeout(resolve, 500))

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
