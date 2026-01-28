import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router'
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader'

import { routes } from './app.routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader()
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(withFetch()),
		{
			provide: TRANSLATE_HTTP_LOADER_CONFIG,
			useValue: {
				prefix: './assets/i18n/',
				suffix: '.json',
			},
		},
		provideRouter(
			routes,
			withViewTransitions(),
			withInMemoryScrolling({
				anchorScrolling: 'enabled',
				scrollPositionRestoration: 'enabled',
			}),
		),
		provideClientHydration(withEventReplay()),
		provideAnimationsAsync(),
		TranslateModule.forRoot({
			fallbackLang: 'fr',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient, TRANSLATE_HTTP_LOADER_CONFIG],
			},
		}).providers!,
	],
}
