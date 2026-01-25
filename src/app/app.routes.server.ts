import { RenderMode, ServerRoute } from '@angular/ssr'

import { BlogDataService } from './services/blog-data.service'

// Helper to get all slugs for prerendering
function getBlogSlugs(): string[] {
	// This must match the slugs in BlogDataService
	// If BlogDataService is not available at build time, hardcode the slugs here
	return [
		'victoires-juridiques-decembre-2025',
		'oqtf-5-erreurs-eviter-contester-bordeaux',
		'post-regularisation-renouvellement-changement-statut-titre-sejour-bordeaux',
		'naturalisation-refusee-erreur-administrative-coute-2-ans',
	]
}

export const serverRoutes: ServerRoute[] = [
	{
		path: 'blog/:slug',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			return getBlogSlugs().map((slug) => ({ slug }))
		},
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
]
