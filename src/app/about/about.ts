import { Component, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { AnimateOnScroll } from '../directives/animate-on-scroll.directive'
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
		AnimateOnScroll,
		AnimateText,
	],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {
	imageLoaded = signal(false)

	onImageLoad() {
		this.imageLoaded.set(true)
	}
}
