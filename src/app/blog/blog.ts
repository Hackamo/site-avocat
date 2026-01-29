import { AnimateText } from './../directives/animate-text.directive'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { MetaService } from '../services/meta.service'

@Component({
	selector: 'app-blog',
	imports: [CommonModule, RouterModule, BlogArticleCard, AnimateText],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
	providers: [],
})
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	private readonly metaService = inject(MetaService)
	readonly articles = this.blogData.articles
	readonly loading = this.blogData.loading

	ngOnInit() {
		this.metaService.updateMetaTags('blog')
		// Load articles when component initializes
		this.blogData.loadArticles()
	}
}
