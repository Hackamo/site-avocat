import { ChangeDetectionStrategy, Component, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { ServicesDataService } from '../services/services-data.service'
import { AnimateOnScroll } from '../directives/animate-on-scroll.directive'
import { AnimateText } from '../directives/animate-text.directive'

@Component({
	selector: 'app-services',
	standalone: true,
	imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterLink, AnimateText],
	templateUrl: './prestations.html',
	styleUrl: './prestations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
	private servicesDataService = inject(ServicesDataService)
	private platformId = inject(PLATFORM_ID)

	services = this.servicesDataService.services()
	zoomedCardIndex = signal<number | null>(null)

	onCardClick(index: number): void {
		if (isPlatformBrowser(this.platformId) && window.innerWidth >= 960) {
			this.zoomedCardIndex.set(this.zoomedCardIndex() === index ? null : index)
		}
	}
}
