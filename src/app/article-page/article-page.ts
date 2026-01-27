import { Component, computed, effect, inject, signal } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticle } from '../models/blog-article.model'

@Component({
	selector: 'app-article-page',
	standalone: true,
	imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
	templateUrl: './article-page.html',
	styleUrl: './article-page.scss',
})
export class ArticlePage {
	private readonly blogData = inject(BlogDataService)
	private readonly route = inject(ActivatedRoute)
	private readonly location = inject(Location)

	readonly loading = signal(true)
	readonly article = signal<BlogArticle | undefined>(undefined)

	constructor() {
		effect(() => {
			const slug = this.route.snapshot.paramMap.get('slug')
			const blogArticle = slug ? this.blogData.getBySlug(slug) : undefined

			this.loading.set(true)
			setTimeout(() => {
				this.article.set(blogArticle)
				this.loading.set(false)
			}, 1000)
		})
	}

	goBack() {
		this.location.back()
	}
}
