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
import { CommonModule, Location, isPlatformBrowser } from '@angular/common'
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

@Component({
	selector: 'app-article-page',
	standalone: true,
	imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, BlogArticleCard, AnimateText],
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
			setTimeout(() => {
				this.article.set(blogArticle)
				this.loading.set(false)

				// Update meta tags for the article
				if (blogArticle) {
					this.metaService.updateArticleMeta(blogArticle.title, blogArticle.summary)
				}
			}, 500)
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
					headline.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
				})
			})
		})
	}

	goBack() {
		this.location.back()
	}

	getReadingTimeText(minutes: number): string {
		return this.readingTimeService.formatReadingTime(minutes)
	}
}
