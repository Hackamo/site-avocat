import { CommonModule } from '@angular/common'
import { Component, computed, inject, OnInit, signal } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'
import { RouterModule } from '@angular/router'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { BlogDataService } from '../services/blog-data.service'
import { MetaService } from '../services/meta.service'
import { AnimateText } from './../directives/animate-text.directive'

@Component({
	selector: 'app-blog',
	imports: [CommonModule, RouterModule, BlogArticleCard, AnimateText, MatFormField, MatLabel, MatSelect, MatOption],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
	providers: [],
})
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	private readonly metaService = inject(MetaService)
	readonly loading = this.blogData.loading
	readonly selectedCategory = signal<string>('all')

	readonly allArticles = this.blogData.articles
	readonly categories = computed(() => {
		const allArticles = this.allArticles()
		const uniqueCategories = [...new Set(allArticles.map((article) => article.category))].sort()
		return uniqueCategories
	})

	readonly articles = computed(() => {
		const selected = this.selectedCategory()
		const all = this.allArticles()
		if (selected === 'all') {
			return all
		}
		return all.filter((article) => article.category === selected)
	})

	onCategoryChange(category: string): void {
		this.selectedCategory.set(category)
	}

	ngOnInit() {
		this.metaService.updateMetaTags('blog')
		// Load articles when component initializes
		this.blogData.loadArticles()
	}
}
