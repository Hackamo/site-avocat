import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BlogDataService } from '../services/blog-data.service'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { AnimateOnScroll } from '../directives/animate-on-scroll.directive'

@Component({
	selector: 'app-blog',
	imports: [CommonModule, RouterModule, BlogArticleCard, AnimateOnScroll],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
})
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	readonly articles = this.blogData.articles

	ngOnInit(): void {
		// Articles are loaded via BlogDataService
	}
}
