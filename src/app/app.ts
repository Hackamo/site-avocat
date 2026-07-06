import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	NgZone,
	OnInit,
	PLATFORM_ID,
	signal,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import {
	ChildrenOutletContexts,
	NavigationEnd,
	NavigationStart,
	Router,
	RouterLink,
	RouterLinkActive,
	RouterModule,
	RouterOutlet,
} from '@angular/router'
import { AnimateText } from './directives/animate-text.directive'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { SkeletonLoaderComponent } from './components/skeleton-loader.component'
import { CONTACT_CONFIG } from './config/contact.config'
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
		MatTooltipModule,
		CommonModule,
		AnimateText,
		SkeletonLoaderComponent,
		ChatWidgetComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	readonly scrolledDown = signal(false)
	readonly darkMode = signal(false)
	readonly mobileNavOpen = signal(false)
	readonly currentLanguage = signal<'fr'>('fr')
	readonly colorTheme = signal<'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'rose'>('red')
	readonly isLoading = signal(false)
	readonly loadingMessage = computed(() => {
		return this.isLoading() ? 'Chargement de la page...' : ''
	})
	readonly config = CONTACT_CONFIG
	private readonly platformId = inject(PLATFORM_ID)
	private readonly document = inject(DOCUMENT)
	private readonly ngZone = inject(NgZone)
	private readonly contexts = inject(ChildrenOutletContexts)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	constructor(private router: Router) {
		if (this.isBrowser) {
			this.darkMode.set(false)
			const savedColor =
				(localStorage.getItem('colorTheme') as
					'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'rose') || 'red'
			this.colorTheme.set(savedColor)
			this.applyTheme(false)
			localStorage.removeItem('theme')
			this.applyColorTheme(savedColor)

			// Extract language from URL path
			this.updateLanguageFromUrl()

			// Update language and loading state when route changes
			this.router.events.subscribe((event) => {
				if (event instanceof NavigationStart) {
					this.isLoading.set(true)
				} else if (event instanceof NavigationEnd) {
					this.isLoading.set(false)
					this.mobileNavOpen.set(false)
					this.updateLanguageFromUrl()

					const url = this.router.url
					const hasFragment = url.includes('#')
					const isArticlePage = /\/blog\/[^/]+/.test(url)

					if (!hasFragment && !isArticlePage) {
						window.scrollTo({ top: 0, behavior: 'auto' })
					}
				}
			})
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

			window.addEventListener('resize', () => {
				if (window.innerWidth > 1100 && this.mobileNavOpen()) {
					this.ngZone.run(() => {
						this.mobileNavOpen.set(false)
					})
				}
			})
		})
	}

	toggleMobileNav(): void {
		this.mobileNavOpen.update((isOpen) => !isOpen)
	}

	closeMobileNav(): void {
		this.mobileNavOpen.set(false)
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
		this.darkMode.set(false)
		this.applyTheme(false)
		localStorage.removeItem('theme')
	}

	resetPreferences(): void {
		if (!this.isBrowser) return
		const defaultTheme = 'red'
		this.darkMode.set(false)
		this.colorTheme.set(defaultTheme)
		this.applyTheme(false)
		this.applyColorTheme(defaultTheme)
		localStorage.removeItem('theme')
		localStorage.removeItem('colorTheme')
	}

	getLoadingMessage(): string {
		return this.loadingMessage()
	}

	private updateLanguageFromUrl(): void {
		if (!this.isBrowser) return
		this.currentLanguage.set('fr')

		const hostname = window.location.hostname
		const currentPort = window.location.port
		const isDevEnglishPort = hostname === 'localhost' && currentPort === '4201'
		const isEnPath = window.location.pathname.startsWith('/en')

		if (isDevEnglishPort) {
			window.location.href = `http://localhost:4200${window.location.pathname}${window.location.search}${window.location.hash}`
			return
		}

		if (isEnPath) {
			const normalizedPath = window.location.pathname.replace(/^\/en\/?/, '/')
			window.location.href = `/fr${normalizedPath === '/' ? '' : normalizedPath}${window.location.search}${window.location.hash}`
		}
	}

	onThemeSelect(theme: 'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'rose') {
		this.colorTheme.set(theme)
		this.applyColorTheme(theme)
		localStorage.setItem('colorTheme', theme)
	}

	changeLanguage(language: 'fr'): void {
		if (!this.isBrowser) return
		this.currentLanguage.set(language)
	}

	private applyTheme(isDark: boolean): void {
		if (!this.isBrowser) return
		if (isDark) {
			document.body.classList.add('dark-theme')
		} else {
			document.body.classList.remove('dark-theme')
		}
	}

	private applyColorTheme(theme: 'blue' | 'red' | 'green' | 'yellow' | 'magenta' | 'orange' | 'rose'): void {
		if (!this.isBrowser) return
		document.body.classList.remove(
			'theme-blue',
			'theme-red',
			'theme-green',
			'theme-yellow',
			'theme-magenta',
			'theme-orange',
			'theme-rose',
		)
		document.body.classList.add(`theme-${theme}`)
	}
}
