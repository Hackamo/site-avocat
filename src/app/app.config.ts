import { ApplicationConfig, provideBrowserGlobalErrorListeners, PLATFORM_ID } from '@angular/core'
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router'
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader'
import { isPlatformBrowser } from '@angular/common'
import { Observable, of } from 'rxjs'

import { routes } from './app.routes'
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

// Custom loader that doesn't load during SSR
export class SSRSafeTranslateLoader implements TranslateLoader {
	constructor(
		private http: HttpClient,
		private platformId: object,
		private config: any,
	) {}

	getTranslation(lang: string): Observable<any> {
		// During SSR, return empty object to avoid HTTP requests
		if (!isPlatformBrowser(this.platformId)) {
			return of({})
		}
		// In browser, use the standard HTTP loader
		return this.http.get(`${this.config.prefix}${lang}${this.config.suffix}`)
	}
}

export function HttpLoaderFactory(http: HttpClient, platformId: object, config: any) {
	return new SSRSafeTranslateLoader(http, platformId, config)
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
			defaultLanguage: 'fr',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient, PLATFORM_ID, TRANSLATE_HTTP_LOADER_CONFIG],
			},
		}).providers!,
	],
}
