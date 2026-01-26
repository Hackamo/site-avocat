import { ChangeDetectionStrategy, Component, signal, effect, inject } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router'
import { PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

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
	host: {
		'(window:scroll)': 'onWindowScroll()',
	},
})
export class App {
	private readonly scrolledDown = signal(false)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	constructor(private router: Router) {
		if (this.isBrowser) {
			effect(() => {
				this.scrolledDown.set(window.scrollY > 200)
			})
		}
	}

	onWindowScroll(): void {
		if (this.isBrowser) {
			this.scrolledDown.set(window.scrollY > 200)
		}
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

	showScrollTop(): boolean {
		return this.scrolledDown()
	}

	scrollToTop(): void {
		if (this.isBrowser) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}
}
