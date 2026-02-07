import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, computed, inject, LOCALE_ID, OnInit, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { BlogArticleCard } from '../blog-article-card/blog-article-card'
import { AnimateText } from '../directives/animate-text.directive'
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
export class Home implements OnInit {
	private servicesDataService = inject(ServicesDataService)
	private blogDataService = inject(BlogDataService)
	private locale = inject(LOCALE_ID)
	private metaService = inject(MetaService)
	imageLoaded = signal(false)

	constructor() {
		this.metaService.updateMetaTags('home')
	}

	ngOnInit(): void {
		this.blogDataService.loadArticles()
	}

	services = this.servicesDataService.services()

	readonly latestArticles = computed(() => {
		return this.blogDataService.getSortedByDate().slice(0, 3)
	})

	onImageLoad() {
		this.imageLoaded.set(true)
	}

	onImageError() {
		this.imageLoaded.set(true)
	}
}
