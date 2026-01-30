import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home').then((m) => m.Home),
		title: 'Accueil',
	},
	{
		path: 'prestations',
		loadComponent: () => import('./prestations/prestations').then((m) => m.Services),
		title: 'Nos Prestations',
	},
	{
		path: 'a-propos',
		loadComponent: () => import('./about/about').then((m) => m.About),
		title: 'À Propos',
	},
	{
		path: 'contact',
		loadComponent: () => import('./contact/contact').then((m) => m.Contact),
		title: 'Contact',
	},
	{
		path: 'mentions-legales',
		loadComponent: () => import('./legal/legal').then((m) => m.LegalComponent),
		title: 'Mentions Légales',
	},
	{
		path: 'politique-confidentialite',
		loadComponent: () => import('./privacy/privacy').then((m) => m.PrivacyComponent),
		title: 'Politique de Confidentialité',
	},
	{
		path: 'blog',
		children: [
			{
				path: '',
				loadComponent: () => import('./blog/blog').then((m) => m.Blog),
				title: 'Blog',
			},
			{
				path: ':slug',
				loadComponent: () => import('./article-page/article-page').then((m) => m.ArticlePage),
				title: 'Article',
			},
		],
	},
	{
		path: '**',
		loadComponent: () => import('./not-found/not-found').then((m) => m.NotFoundComponent),
		title: 'Page non trouvée',
	},
]
