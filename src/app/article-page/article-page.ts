import { Component, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticle } from '../models/blog-article.model'

@Component({
	selector: 'app-article-page',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './article-page.html',
	styleUrl: './article-page.scss',
})
export class ArticlePage {
	readonly article = computed(() => {
		const slug = this.route.snapshot.paramMap.get('slug')
		return slug ? this.blogData.getBySlug(slug) : undefined
	})

	constructor(
		private blogData: BlogDataService,
		private route: ActivatedRoute,
	) {}
}
