import { Component, computed, inject } from '@angular/core'
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
	readonly article = computed(() => {
		const slug = this.route.snapshot.paramMap.get('slug')
		return slug ? this.blogData.getBySlug(slug) : undefined
	})

	private readonly location = inject(Location)

	constructor(
		private blogData: BlogDataService,
		private route: ActivatedRoute,
	) {}

	goBack() {
		this.location.back()
	}
}
