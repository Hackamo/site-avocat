import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { AnimateText } from '../directives/animate-text.directive'

@Component({
	selector: 'app-about',
	imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, NgOptimizedImage, AnimateText],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {
	imageLoaded = signal(false)
	darkMode = signal(this.isDarkMode())

	constructor() {
		this.darkMode.set(document.body.classList.contains('dark-theme'))
		const observer = new MutationObserver(() => {
			this.darkMode.set(document.body.classList.contains('dark-theme'))
		})
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
	}

	isDarkMode(): boolean {
		return document.body.classList.contains('dark-theme')
	}

	onImageLoad() {
		this.imageLoaded.set(true)
	}
}
