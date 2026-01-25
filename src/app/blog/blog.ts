import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'

@Component({
	selector: 'app-blog',
	imports: [CommonModule, RouterModule, BlogArticleCard],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
})
export class Blog {
	readonly articles
	constructor(private blogData: BlogDataService) {
		this.articles = this.blogData.articles
	}
}
