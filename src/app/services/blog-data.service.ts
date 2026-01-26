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
	markdownFile: string
	similarSlugs: string[]
}

const ARTICLES_METADATA: ArticleMetadata[] = [
	{
		slug: 'oqtf-erreurs-eviter',
		title: 'OQTF : 5 Erreurs à Éviter',
		summary: "Les 5 erreurs les plus fréquentes lors de la réception d'une OQTF et comment les éviter.",
		category: 'Conseils Juridiques',
		date: '2025-12-10',
		markdownFile: 'oqtf-erreurs-eviter.md',
		similarSlugs: ['naturalisation-refusee-erreur-administrative'],
	},
	{
		slug: 'regularisation-renouvellement-changement-statut',
		title: 'Régularisation, Renouvellement et Changement de Statut',
		summary: 'Guide complet sur les procédures de régularisation et de changement de statut migratoire.',
		category: 'Procédures',
		date: '2025-11-15',
		markdownFile: 'regularisation-renouvellement-changement-statut.md',
		similarSlugs: ['oqtf-5-erreurs-eviter'],
	},
	{
		slug: 'naturalisation-refusee-erreur-administrative',
		title: 'Naturalisation Refusée : Erreur Administrative',
		summary: 'Comment contester un refus de naturalisation suite à une erreur administrative.',
		category: 'Recours',
		date: '2025-10-20',
		markdownFile: 'naturalisation-refusee-erreur-administrative.md',
		similarSlugs: ['oqtf-5-erreurs-eviter'],
	},
	{
		slug: 'victoires-juridiques-decembre-2025',
		title: 'Victoires Juridiques - Décembre 2025',
		summary: 'Retour sur les succès récents et cas résolus avec succès.',
		category: 'Actualités',
		date: '2025-12-01',
		markdownFile: 'victoires-juridiques-decembre-2025.md',
		similarSlugs: [],
	},
]

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
			const articles: BlogArticle[] = await Promise.all(
				ARTICLES_METADATA.map(async (meta) => {
					const response = await fetch(`assets/blog/${meta.markdownFile}`)
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
