import { AfterViewInit, Directive, ElementRef, inject, input, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Directive({
	selector:
		'[animateText], h1, h2, h3, h4, h5, h6, p, li, blockquote, mat-card-title, mat-card-subtitle, mat-label, mat-option, a[mat-button], a[mat-flat-button], a[mat-stroked-button], a[mat-raised-button], button[mat-button], button[mat-flat-button], button[mat-stroked-button], button[mat-raised-button]',
})
export class AnimateText implements AfterViewInit {
	private readonly element = inject(ElementRef)
	private readonly platformId = inject(PLATFORM_ID)
	animateText = input<'fade' | 'slide-up' | 'slide-left' | 'slide-right'>('fade')
	threshold = input<number>(0.4)
	delay = input<number>(200)
	duration = input<number>(800)

	ngAfterViewInit() {
		// Only run in browser environment
		if (!isPlatformBrowser(this.platformId)) {
			return
		}

		const animationType = this.animateText()
		const el = this.element.nativeElement as HTMLElement

		// Set transition FIRST before adding animation classes
		el.style.transitionDuration = `${this.duration()}ms`
		if (this.delay() > 0) {
			el.style.transitionDelay = `${this.delay()}ms`
		}

		// Defer class addition to next tick so transition is active
		requestAnimationFrame(() => {
			el.classList.add('animate-text', `animate-text-${animationType}`)

			// Now set up the Intersection Observer to trigger the visible class
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible')
							// Once visible, we can stop observing
							observer.unobserve(entry.target)
						}
					})
				},
				{ threshold: this.threshold() },
			)

			observer.observe(el)

			// Check if element is already in view and immediately add visible class
			const rect = el.getBoundingClientRect()
			if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
				el.classList.add('visible')
			}
		})
	}
}
