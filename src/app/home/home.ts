import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { AnimateText } from '../directives/animate-text.directive'
import { ServicesDataService, ServiceItem } from '../services/services-data.service'

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
		TranslateModule,
	],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	private servicesDataService = inject(ServicesDataService)
	private translate = inject(TranslateService)

	services = this.servicesDataService.services()
	imageLoaded = signal(false)

	onImageLoad() {
		this.imageLoaded.set(true)
	}

	getServiceTitle(service: ServiceItem): string {
		return this.translate.instant(service.titleKey)
	}

	getServiceDescription(service: ServiceItem): string {
		return this.translate.instant(service.descriptionKey)
	}
}
