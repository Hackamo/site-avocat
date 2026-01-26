import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { BlogArticle } from '../models/blog-article.model'
import { marked } from 'marked'

interface ArticleMetadata {
	slug: string
	title: string
	summary: string
	category: string
	date: string
	author: string
	markdownFile: string
	similarSlugs: string[]
}

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	private readonly http = inject(HttpClient)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly _articles = signal<BlogArticle[]>([])

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			this.loadArticles()
		}
	}

	private async loadArticles() {
		try {
			const metadata = await firstValueFrom(this.http.get<ArticleMetadata[]>('/assets/blog/articles.json'))

			const articles: BlogArticle[] = []

			for (const meta of metadata) {
				const markdown = await firstValueFrom(
					this.http.get(`/assets/blog/${meta.markdownFile}`, { responseType: 'text' }),
				)

				const content = await marked(markdown)

				articles.push({
					slug: meta.slug,
					title: meta.title,
					summary: meta.summary,
					content,
					category: meta.category,
					date: meta.date,
					similarSlugs: meta.similarSlugs,
				})
			}

			this._articles.set(articles)
		} catch (error) {
			console.error('Failed to load blog articles:', error)
		}
	}

	articles = this._articles.asReadonly()

	getBySlug(slug: string) {
		return this._articles().find((article) => article.slug === slug)
	}
}
