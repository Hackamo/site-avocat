import { isPlatformBrowser } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { RouterLink } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { AnimateText } from '../directives/animate-text.directive'
import { ServicesDataService, ServiceItem } from '../services/services-data.service'

@Component({
	selector: 'app-services',
	standalone: true,
	imports: [
		MatCardModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatTabsModule,
		RouterLink,
		AnimateText,
		TranslateModule,
	],
	templateUrl: './prestations.html',
	styleUrl: './prestations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
	private servicesDataService = inject(ServicesDataService)
	private platformId = inject(PLATFORM_ID)
	private translate = inject(TranslateService)

	services = this.servicesDataService.services()
	zoomedCardIndex = signal<number | null>(null)
	isGridView = signal(true)

	getServiceTitle(service: ServiceItem): string {
		return this.translate.instant(service.titleKey)
	}

	getServiceDescription(service: ServiceItem): string {
		return this.translate.instant(service.descriptionKey)
	}

	getServiceSubtitle(service: ServiceItem): string | undefined {
		return service.subtitleKey ? this.translate.instant(service.subtitleKey) : undefined
	}

	getServiceDetailedDescription(service: ServiceItem): string | undefined {
		return service.detailedDescriptionKey ? this.translate.instant(service.detailedDescriptionKey) : undefined
	}

	getServiceItems(service: ServiceItem): string[] | undefined {
		if (!service.itemsKey) return undefined
		return service.itemsKey.map((key) => this.translate.instant(key))
	}

	onCardClick(index: number): void {
		if (isPlatformBrowser(this.platformId)) {
			if (window.innerWidth >= 960) {
				this.zoomedCardIndex.set(this.zoomedCardIndex() === index ? null : index)
			}
			// Scroll to the card on any device
			this.scrollToCard(index)
		}
	}

	private scrollToCard(index: number): void {
		console.log('Scrolling to card index:', index)
		const anchor = this.services[index]?.anchor
		if (anchor) {
			const element = document.getElementById(anchor)
			if (element) {
				const offset = 80 // Toolbar height offset
				const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
				const offsetPosition = elementPosition - offset

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		}
	}
}
