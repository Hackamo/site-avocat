import { Routes } from '@angular/router'
import { Home } from './home/home'
import { Services } from './prestations/prestations'
import { About } from './about/about'
import { Contact } from './contact/contact'

export const routes: Routes = [
	{ path: '', component: Home, title: 'Accueil' },
	{ path: 'prestations', component: Services, title: 'Nos Prestations' },
	{ path: 'a-propos', component: About, title: 'À Propos' },
	{ path: 'contact', component: Contact, title: 'Contact' },
	// Redirige les chemins inconnus vers la page d'accueil
	{ path: '**', redirectTo: '', pathMatch: 'full' },
]
