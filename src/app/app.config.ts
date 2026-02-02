import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router'
import { provideHttpClient, withFetch } from '@angular/common/http'

import { routes } from './app.routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(withFetch()),
		provideRouter(
			routes,
			withViewTransitions(),
			withInMemoryScrolling({
				anchorScrolling: 'enabled',
				scrollPositionRestoration: 'disabled',
			}),
		),
		provideClientHydration(withEventReplay()),
	],
}
