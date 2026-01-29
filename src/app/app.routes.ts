import { Routes } from '@angular/router'
import { Home } from './home/home'
import { Services } from './prestations/prestations'
import { About } from './about/about'
import { Contact } from './contact/contact'
import { Blog } from './blog/blog'
import { BlogArticleCard } from './blog-article-card/blog-article-card'
import { LegalComponent } from './legal/legal'
import { PrivacyComponent } from './privacy/privacy'

export const routes: Routes = [
	{
		path: '',
		component: Home,
		title: 'Accueil',
	},
	{
		path: 'prestations',
		component: Services,
		title: 'Nos Prestations',
	},
	{
		path: 'a-propos',
		component: About,
		title: 'À Propos',
	},
	{
		path: 'contact',
		component: Contact,
		title: 'Contact',
	},
	{
		path: 'mentions-legales',
		component: LegalComponent,
		title: 'Mentions Légales',
	},
	{
		path: 'politique-confidentialite',
		component: PrivacyComponent,
		title: 'Politique de Confidentialité',
	},
	{
		path: 'blog',
		children: [
			{
				path: '',
				component: Blog,
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
		redirectTo: '',
		pathMatch: 'full',
	},
]
