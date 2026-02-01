import { AfterViewInit, Directive, ElementRef, inject, input, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Directive({
	selector: '[animateText]',
})
export class AnimateText implements AfterViewInit {
	private readonly element = inject(ElementRef)
	private readonly platformId = inject(PLATFORM_ID)
	animateText = input<'fade' | 'slide-up' | 'slide-left' | 'slide-right'>('fade')
	threshold = input<number>(0.3)
	delay = input<number>(0)
	duration = input<number>(750)

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
