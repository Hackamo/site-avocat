import { AnimateText } from './../directives/animate-text.directive'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'

@Component({
	selector: 'app-blog',
	imports: [CommonModule, RouterModule, BlogArticleCard, AnimateText, TranslateModule],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
	providers: [],
})
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	readonly articles = this.blogData.articles
	readonly loading = this.blogData.loading

	ngOnInit() {
		// Load articles when component initializes
		this.blogData.loadArticles()
	}
}
