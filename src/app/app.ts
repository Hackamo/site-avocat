import { CommonModule, isPlatformBrowser } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, PLATFORM_ID, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
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
		MatFormFieldModule,
		MatSelectModule,
		CommonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	readonly scrolledDown = signal(false)
	readonly darkMode = signal(false)
	readonly colorTheme = signal<
		'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'chartreuse' | 'azure' | 'violet' | 'rose'
	>('red')
	private readonly platformId = inject(PLATFORM_ID)
	private readonly ngZone = inject(NgZone)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	constructor(private router: Router) {
		if (this.isBrowser) {
			const savedTheme = localStorage.getItem('theme')
			const isDark = savedTheme === 'dark'
			this.darkMode.set(isDark)
			const savedColor =
				(localStorage.getItem('colorTheme') as
					| 'blue'
					| 'red'
					| 'green'
					| 'yellow'
					| 'magenta'
					| 'orange'
					| 'chartreuse'
					| 'azure'
					| 'violet'
					| 'rose') || 'red'
			this.colorTheme.set(savedColor)
			this.applyTheme(isDark)
			this.applyColorTheme(savedColor)
		}
	}

	ngOnInit(): void {
		if (!this.isBrowser) return

		// Listen outside Angular zone for performance
		this.ngZone.runOutsideAngular(() => {
			window.addEventListener('scroll', () => {
				const scrollY = window.scrollY
				const shouldShow = scrollY > 250

				// Only run change detection when state actually changes
				if (this.scrolledDown() !== shouldShow) {
					this.ngZone.run(() => {
						this.scrolledDown.set(shouldShow)
					})
				}
			})
		})
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

	toggleDarkMode(): void {
		if (!this.isBrowser) return
		const isDark = !this.darkMode()
		this.darkMode.set(isDark)
		this.applyTheme(isDark)
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}

	private applyTheme(isDark: boolean): void {
		if (!this.isBrowser) return
		if (isDark) {
			document.body.classList.add('dark-theme')
		} else {
			document.body.classList.remove('dark-theme')
		}
	}

	private applyColorTheme(
		theme: 'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'chartreuse' | 'azure' | 'violet' | 'rose',
	): void {
		if (!this.isBrowser) return
		document.body.classList.remove(
			'theme-blue',
			'theme-red',
			'theme-green',
			'theme-yellow',
			'theme-magenta',
			'theme-orange',
			'theme-chartreuse',
			'theme-azure',
			'theme-violet',
			'theme-rose',
		)
		document.body.classList.add(`theme-${theme}`)
	}

	onThemeSelect(
		theme: 'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'chartreuse' | 'azure' | 'violet' | 'rose',
	) {
		this.colorTheme.set(theme)
		this.applyColorTheme(theme)
		localStorage.setItem('colorTheme', theme)
	}
}
