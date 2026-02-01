import { CommonModule, isPlatformBrowser } from '@angular/common'
import { Component, computed, inject, OnInit, signal, PLATFORM_ID, ElementRef, viewChild } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, MatSelect } from '@angular/material/select'
import { RouterModule } from '@angular/router'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { BlogDataService } from '../services/blog-data.service'
import { MetaService } from '../services/meta.service'
import { AnimateText } from './../directives/animate-text.directive'

@Component({
	selector: 'app-blog',
	imports: [
		CommonModule,
		RouterModule,
		BlogArticleCard,
		AnimateText,
		MatFormField,
		MatLabel,
		MatSelect,
		MatOption,
		MatInput,
	],
	templateUrl: './blog.html',
	styleUrl: './blog.scss',
	standalone: true,
	providers: [],
})
export class Blog implements OnInit {
	private readonly blogData = inject(BlogDataService)
	private readonly metaService = inject(MetaService)
	private readonly platformId = inject(PLATFORM_ID)
	readonly loading = this.blogData.loading
	readonly selectedCategory = signal<string>('all')
	readonly searchText = signal<string>('')
	readonly filtersSection = viewChild<ElementRef<HTMLElement>>('filtersSection')

	readonly allArticles = this.blogData.articles
	readonly categories = computed(() => {
		const allArticles = this.allArticles()
		const uniqueCategories = [...new Set(allArticles.map((article) => article.category))].sort()
		return uniqueCategories
	})

	readonly articles = computed(() => {
		const selected = this.selectedCategory()
		const search = this.searchText().toLowerCase()
		let filtered = this.allArticles()

		if (selected !== 'all') {
			filtered = filtered.filter((article) => article.category === selected)
		}

		if (search) {
			filtered = filtered.filter(
				(article) =>
					article.title.toLowerCase().includes(search) ||
					article.summary.toLowerCase().includes(search) ||
					article.category.toLowerCase().includes(search),
			)
		}

		return filtered
	})

	onCategoryChange(category: string): void {
		this.selectedCategory.set(category)
	}

	onSearchChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value
		this.searchText.set(value)

		if (isPlatformBrowser(this.platformId)) {
			const filters = this.filtersSection()
			if (filters) {
				requestAnimationFrame(() => {
					filters.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
				})
			}
		}
	}

	ngOnInit() {
		this.metaService.updateMetaTags('blog')
		// Load articles when component initializes
		this.blogData.loadArticles()
	}
}
