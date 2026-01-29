import { Component, computed, effect, inject, signal } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticle } from '../models/blog-article.model'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { AnimateText } from '../directives/animate-text.directive'
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs/operators'

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
	private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
		initialValue: this.route.snapshot.paramMap.get('slug'),
	})

	readonly loading = signal(true)
	readonly article = signal<BlogArticle | undefined>(undefined)
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
		effect(() => {
			const slug = this.slug()
			const blogArticle = slug ? this.blogData.getBySlug(slug) : undefined

			this.loading.set(true)
			setTimeout(() => {
				this.article.set(blogArticle)
				this.loading.set(false)
			}, 500)
		})
	}

	goBack() {
		this.location.back()
	}
}
