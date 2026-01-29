import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common'
import { Component, inject, signal, PLATFORM_ID } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { AnimateText } from '../directives/animate-text.directive'

@Component({
	selector: 'app-about',
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
		NgOptimizedImage,
		AnimateText,
		TranslateModule,
	],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {
	private readonly document = inject(DOCUMENT)
	private readonly platformId = inject(PLATFORM_ID)

	imageLoaded = signal(false)
	darkMode = signal(this.isDarkMode())

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			this.darkMode.set(this.isDarkMode())
			const observer = new MutationObserver(() => {
				this.darkMode.set(this.isDarkMode())
			})
			observer.observe(this.document.body, { attributes: true, attributeFilter: ['class'] })
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
}
