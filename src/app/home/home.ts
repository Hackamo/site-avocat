import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, inject, signal, LOCALE_ID } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { AnimateText } from '../directives/animate-text.directive'
import { ServicesDataService } from '../services/services-data.service'
import { MetaService } from '../services/meta.service'

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
	],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	private servicesDataService = inject(ServicesDataService)
	private locale = inject(LOCALE_ID)
	private metaService = inject(MetaService)

	services = this.servicesDataService.services()
	imageLoaded = signal(false)

	constructor() {
		this.metaService.updateMetaTags('home')
	}

	onImageLoad() {
		this.imageLoaded.set(true)
	}
}
