import { CommonModule, isPlatformBrowser } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, PLATFORM_ID, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-root',
	imports: [
		RouterModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		CommonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	readonly scrolledDown = signal(false)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly ngZone = inject(NgZone)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	constructor(private router: Router) {
		console.log('App constructor - isBrowser:', this.isBrowser)
	}

	ngOnInit(): void {
		console.log('ngOnInit called - isBrowser:', this.isBrowser)
		if (!this.isBrowser) {
			console.log('Not in browser, skipping scroll listener')
			return
		}

		console.log('Setting up scroll listener...')

		// Listen outside Angular zone for performance
		this.ngZone.runOutsideAngular(() => {
			window.addEventListener('scroll', () => {
				const scrollY = window.scrollY
				const shouldShow = scrollY > 250

				// Only run change detection when state actually changes
				if (this.scrolledDown() !== shouldShow) {
					this.ngZone.run(() => {
						console.log('SCROLL EVENT - scrollY:', scrollY, 'shouldShow:', shouldShow)
						this.scrolledDown.set(shouldShow)
					})
				}
			})
		})

		console.log('Scroll listener attached!')
	}

	ngAfterViewInit() {
		if (!this.isBrowser) return
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const fragment = window.location.hash?.substring(1)
				if (fragment) {
					setTimeout(() => this.scrollToFragment(fragment), 100)
				}
			}
		})
	}

	scrollToFragment(fragment: string) {
		if (!this.isBrowser) return
		const el = document.getElementById(fragment)
		if (el) {
			const yOffset = -((document.querySelector('.app-toolbar') as HTMLElement)?.offsetHeight || 80)
			const y = el.getBoundingClientRect().top + window.scrollY + yOffset
			window.scrollTo({ top: y, behavior: 'smooth' })
		}
	}

	scrollToTop(): void {
		if (this.isBrowser) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}
}
