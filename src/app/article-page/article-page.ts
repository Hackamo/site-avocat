import {
	Component,
	computed,
	effect,
	inject,
	signal,
	ElementRef,
	viewChild,
	afterNextRender,
	PLATFORM_ID,
} from '@angular/core'
import { CommonModule, Location, isPlatformBrowser, NgOptimizedImage } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { BlogDataService } from '../services/blog-data.service'
import { ReadingTimeService } from '../services/reading-time.service'
import { BlogArticle } from '../models/blog-article.model'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { AnimateText } from '../directives/animate-text.directive'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs/operators'
import { MetaService } from '../services/meta.service'
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatMenuModule } from '@angular/material/menu'
import { SavedArticlesService } from '../services/saved-articles.service'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDividerModule } from '@angular/material/divider'
import { ArticleActionsSheet } from '../article-actions-sheet/article-actions-sheet'

@Component({
	selector: 'app-article-page',
	standalone: true,
	imports: [
		CommonModule,
		NgOptimizedImage,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		BlogArticleCard,
		AnimateText,
		MatBottomSheetModule,
		MatMenuModule,
		MatDividerModule,
		MatSnackBarModule,
	],
	templateUrl: './article-page.html',
	styleUrl: './article-page.scss',
})
export class ArticlePage {
	private readonly blogData = inject(BlogDataService)
	private readonly route = inject(ActivatedRoute)
	private readonly location = inject(Location)
	private readonly metaService = inject(MetaService)
	private readonly readingTimeService = inject(ReadingTimeService)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
		initialValue: this.route.snapshot.paramMap.get('slug'),
	})
	readonly headline = viewChild<ElementRef<HTMLHeadingElement>>('headline')

	readonly loading = signal(true)
	readonly article = signal<BlogArticle | undefined>(undefined)
	readonly imageLoaded = signal(false)
	readonly authorImageLoaded = signal(true)
	readonly lastScrolledSlug = signal<string | null>(null)
	readonly similarArticles = computed(() => {
		const current = this.article()
		if (!current) return []
		const allArticles = this.blogData.articles()
		return allArticles
			.filter((article) => article.slug !== current.slug)
			.filter((article) => (current.similarSlugs ?? []).includes(article.slug))
			.slice(0, 3)
	})

	private readonly bottomSheet = inject(MatBottomSheet)

	private readonly savedService = inject(SavedArticlesService)
	private readonly snack = inject(MatSnackBar)

	constructor() {
		// Ensure articles are loaded
		this.blogData.loadArticles()

		effect(() => {
			const slug = this.slug()

			// Wait for articles to be available
			const articles = this.blogData.articles()
			const isLoading = this.blogData.loading()

			if (isLoading || articles.length === 0) {
				this.loading.set(true)
				return
			}

			const blogArticle = slug ? this.blogData.getBySlug(slug) : undefined

			this.loading.set(true)
			this.article.set(blogArticle)
			this.loading.set(false)

			// Update meta tags for the article
			if (blogArticle) {
				this.metaService.updateArticleMeta(blogArticle.title, blogArticle.summary)
			}
		})

		effect(() => {
			const article = this.article()
			const slug = this.slug()
			const headline = this.headline()
			if (!article || !slug || !headline || !isPlatformBrowser(this.platformId)) {
				return
			}

			if (this.lastScrolledSlug() === slug) {
				return
			}
			this.lastScrolledSlug.set(slug)

			queueMicrotask(() => {
				requestAnimationFrame(() => {
					const element = headline.nativeElement
					element.style.scrollMarginTop = '90px'
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
				})
			})
		})
	}

	onCoverLoaded() {
		this.imageLoaded.set(true)
	}

	onCoverError() {
		this.imageLoaded.set(true)
	}

	onAuthorImageLoad() {
		this.authorImageLoaded.set(true)
	}

	onAuthorImageError() {
		this.authorImageLoaded.set(true)
	}

	goBack() {
		this.location.back()
	}

	getReadingTimeText(minutes: number): string {
		return this.readingTimeService.formatReadingTime(minutes)
	}

	openArticleActions() {
		const article = this.article()
		if (!article || !isPlatformBrowser(this.platformId)) return

		// Only open bottom sheet on small screens (mobile)
		const isMobile = window.matchMedia('(max-width: 768px)').matches
		if (!isMobile) {
			// On desktop we keep the default behaviour: no bottom sheet opened.
			return
		}

		const url = `${this.getBaseUrl()}/blog/${article.slug}`
		this.bottomSheet.open(ArticleActionsSheet, {
			data: { slug: article.slug, title: article.title, url, readingTime: article.readingTime },
			panelClass: 'article-actions-sheet-panel',
		})
	}

	onActionsClick(event: MouseEvent) {
		// If mobile, open bottom sheet and prevent menu opening
		if (!isPlatformBrowser(this.platformId)) return
		const isMobile = window.matchMedia('(max-width: 768px)').matches
		if (isMobile) {
			event.stopPropagation()
			this.openArticleActions()
		}
	}

	async shareArticle() {
		const article = this.article()
		if (!article) return
		const url = `${this.getBaseUrl()}/blog/${article.slug}`
		try {
			if ((navigator as any).share) {
				await (navigator as any).share({ title: article.title, url })
				this.snack.open('Partage lancé', '', {
					duration: 2000,
					verticalPosition: 'top',
					panelClass: ['favorite-snack-animation'],
				})
			} else {
				await navigator.clipboard.writeText(url)
				this.snack.open('Lien copié', '', {
					duration: 2000,
					verticalPosition: 'top',
					panelClass: ['favorite-snack-animation'],
				})
			}
		} catch (e) {
			console.error('Share failed', e)
			this.snack.open('Impossible de partager', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		}
	}

	async copyArticleLink() {
		const article = this.article()
		if (!article) return
		const url = `${this.getBaseUrl()}/blog/${article.slug}`
		try {
			await navigator.clipboard.writeText(url)
			this.snack.open('Lien copié', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		} catch (e) {
			console.error('Copy failed', e)
			this.snack.open('Erreur lors de la copie', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		}
	}

	saveFav() {
		const article = this.article()
		if (!article) return
		const added = this.savedService.toggle(article.slug)
		this.snack.open(added ? 'Article enregistré' : 'Article supprimé', '', {
			duration: 2000,
			verticalPosition: 'top',
			panelClass: ['favorite-snack-animation'],
		})
	}

	isSaved(): boolean {
		const article = this.article()
		if (!article) return false
		return this.savedService.isSaved(article.slug)
	}

	private getBaseUrl(): string {
		if (!isPlatformBrowser(this.platformId)) return ''
		return `${window.location.protocol}//${window.location.host}`
	}
}
