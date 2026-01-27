import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { BlogArticle } from '../models/blog-article.model'
import { marked } from 'marked'

export interface ArticleMetadata {
	slug: string
	title: string
	summary: string
	category: string
	date: string
	markdownFile: string
	similarSlugs: string[]
}

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)
	private readonly metadataApiUrl = '/api/blog-metadata'
	private readonly metadataAssetUrl = 'assets/blog/articles-config.json'
	private readonly _articles = signal<BlogArticle[]>([])
	private readonly _loading = signal(false)
	private loadingPromise: Promise<void> | null = null

	constructor() {
		if (this.isBrowser) {
			this.ensureLoaded()
		}
	}

	private async ensureLoaded(): Promise<void> {
		if (!this.isBrowser) return
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
			const articlesMetadata = await this.fetchMetadata()

			const articles: BlogArticle[] = await Promise.all(
				articlesMetadata.map(async (meta) => {
					const mdResponse = await fetch(`assets/blog/${meta.markdownFile}`)
					const markdown = await mdResponse.text()
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

	async getMetadata(): Promise<ArticleMetadata[]> {
		if (!this.isBrowser) return []
		return this.fetchMetadata()
	}

	async updateMetadata(metadata: ArticleMetadata[]): Promise<void> {
		if (!this.isBrowser) return
		try {
			const response = await fetch(this.metadataApiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(metadata),
			})

			if (!response.ok) {
				throw new Error(`Failed to update metadata: ${response.status}`)
			}
			// Reload articles after metadata update
			this._articles.set([])
			this.loadingPromise = null
			await this.ensureLoaded()
		} catch (error) {
			console.error('Failed to update article metadata:', error)
			throw error
		}
	}

	private async fetchMetadata(): Promise<ArticleMetadata[]> {
		try {
			const response = await fetch(this.metadataApiUrl)
			if (response.ok) {
				return await response.json()
			}
			console.warn('API metadata fetch failed, falling back to assets:', response.status)
		} catch (error) {
			console.warn('API metadata fetch error, falling back to assets:', error)
		}

		try {
			const assetResponse = await fetch(this.metadataAssetUrl)
			return await assetResponse.json()
		} catch (error) {
			console.error('Failed to load article metadata from assets:', error)
			return []
		}
	}
}
