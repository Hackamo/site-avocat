import { AfterViewInit, Directive, ElementRef, inject, input, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Directive({
	selector: '[animateOnScroll]',
})
export class AnimateOnScroll implements AfterViewInit {
	private readonly element = inject(ElementRef)
	private readonly platformId = inject(PLATFORM_ID)
	animateOnScroll = input<'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom'>('fade')
	threshold = input<number>(0.2)
	delay = input<number>(0.4)

	ngAfterViewInit() {
		// Only run in browser environment
		if (!isPlatformBrowser(this.platformId)) {
			return
		}

		const animationType = this.animateOnScroll()
		const el = this.element.nativeElement as HTMLElement

		// Add base animation class
		el.classList.add('animate-scroll', `animate-${animationType}`)

		// Apply delay if specified
		if (this.delay() > 0) {
			el.style.transitionDelay = `${this.delay()}ms`
		}

		// Set up Intersection Observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible')
						// Optional: unobserve after animation triggers once
						// observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: this.threshold() },
		)

		observer.observe(el)
	}
}
