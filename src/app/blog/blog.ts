import { AnimateText } from './../directives/animate-text.directive'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
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
export class Blog {
	private readonly blogData = inject(BlogDataService)
	readonly articles = this.blogData.articles
	readonly loading = this.blogData.loading
}
