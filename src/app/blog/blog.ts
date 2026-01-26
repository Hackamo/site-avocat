import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
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
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	readonly articles = this.blogData.articles

	ngOnInit(): void {
		console.log('Blog component initialized')
		console.log('Articles signal:', this.articles())
		console.log('Articles count:', this.articles().length)
	}
}
