import { CommonModule, isPlatformBrowser } from '@angular/common'
import { Component, computed, inject, OnInit, signal, PLATFORM_ID, ElementRef, viewChild } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, MatSelect } from '@angular/material/select'
import { MatCheckbox } from '@angular/material/checkbox'
import { RouterModule } from '@angular/router'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { BlogDataService } from '../services/blog-data.service'
import { MetaService } from '../services/meta.service'
import { SavedArticlesService } from '../services/saved-articles.service'
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
		MatCheckbox,
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
	private readonly savedArticles = inject(SavedArticlesService)
	readonly loading = this.blogData.loading
	readonly selectedCategory = signal<string>('all')
	readonly searchText = signal<string>('')
	readonly showFavoritesOnly = signal<boolean>(false)
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
		const favoritesOnly = this.showFavoritesOnly()
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

		if (favoritesOnly) {
			filtered = filtered.filter((article) => this.savedArticles.isSaved(article.slug))
		}

		return filtered
	})

	ngOnInit() {
		this.metaService.updateMetaTags('blog')
		this.blogData.loadArticles()
	}

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

	onFavoritesToggle(checked: boolean): void {
		this.showFavoritesOnly.set(checked)
	}
}
