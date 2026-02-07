import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common'
import { Component, inject, signal, PLATFORM_ID } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { AnimateText } from '../directives/animate-text.directive'
import { MetaService } from '../services/meta.service'
import { CONTACT_CONFIG } from '../config/contact.config'

@Component({
	selector: 'app-about',
	imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, NgOptimizedImage, AnimateText],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {
	private readonly document = inject(DOCUMENT)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly metaService = inject(MetaService)

	imageLoaded = signal(false)
	darkMode = signal(this.isDarkMode())
	isMobile = signal(this.checkIsMobile())

	// Expose centralized config for template usage
	readonly config = CONTACT_CONFIG

	constructor() {
		this.metaService.updateMetaTags('about')
		if (isPlatformBrowser(this.platformId)) {
			this.darkMode.set(this.isDarkMode())
			this.isMobile.set(this.checkIsMobile())
			const observer = new MutationObserver(() => {
				this.darkMode.set(this.isDarkMode())
			})
			observer.observe(this.document.body, { attributes: true, attributeFilter: ['class'] })

			// Listen for window resize to update isMobile
			window.addEventListener('resize', () => {
				this.isMobile.set(this.checkIsMobile())
			})
		}
	}

	isDarkMode(): boolean {
		if (!isPlatformBrowser(this.platformId)) {
			return false
		}
		return this.document.body.classList.contains('dark-theme')
	}

	onImageLoad() {
		this.imageLoaded.set(true)
	}
	checkIsMobile(): boolean {
		if (!isPlatformBrowser(this.platformId)) {
			return false
		}
		return window.innerWidth < 480
	}
}
