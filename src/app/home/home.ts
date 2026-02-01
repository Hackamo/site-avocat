import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { AnimateText } from '../directives/animate-text.directive'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { BlogDataService } from '../services/blog-data.service'
import { MetaService } from '../services/meta.service'
import { ServicesDataService } from '../services/services-data.service'

@Component({
	selector: 'app-home',
	imports: [
		// Imports pour Angular Material
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		NgOptimizedImage,
		CommonModule,
		RouterLink,
		AnimateText,
		BlogArticleCard,
	],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	private servicesDataService = inject(ServicesDataService)
	private blogDataService = inject(BlogDataService)
	private locale = inject(LOCALE_ID)
	private metaService = inject(MetaService)

	services = this.servicesDataService.services()
	imageLoaded = signal(false)

	readonly latestArticles = computed(() => {
		return this.blogDataService.getSortedByDate().slice(0, 3)
	})

	constructor() {
		this.metaService.updateMetaTags('home')
		// Trigger article loading on initialization
		this.blogDataService.loadArticles()
	}

	onImageLoad() {
		this.imageLoaded.set(true)
	}
}
