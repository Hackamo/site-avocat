import { Injectable, signal } from '@angular/core'
import { BlogArticle } from '../models/blog-article.model'

@Injectable({ providedIn: 'root' })
export class BlogDataService {
	private readonly _articles = signal<BlogArticle[]>([
		{
			slug: 'victoires-juridiques-decembre-2025',
			title: 'Nos victoires juridiques – Décembre 2025',
			summary:
				'Retour sur 9 décisions favorables obtenues par le cabinet en droit des étrangers et en droit pénal à Bordeaux. Découvrez les stratégies gagnantes et conseils pratiques pour défendre vos droits.',
			content: `
      <h2 class="mat-headline-4">Droit des étrangers : 7 victoires majeures</h2>
      <ul>
        <li><strong>Titre de séjour salarié</strong> pour métier en tension : annulation d’un refus, obtention du titre grâce à un dossier solide (expérience, promesse d’embauche, métier en tension, insertion réussie). <em>Conseil : rassemblez tous vos justificatifs professionnels et une promesse d’embauche.</em></li>
        <li><strong>Titre « vie privée et familiale »</strong> pour une mère d’enfants scolarisés.</li>
        <li><strong>Suspension en référé</strong> d’un refus de renouvellement de titre.</li>
        <li><strong>Visa long séjour salarié</strong> pour un professionnel de la restauration.</li>
        <li><strong>Annulation d’un ajournement de naturalisation</strong>.</li>
        <li><strong>Maintien du titre</strong> après divorce avec droit de garde.</li>
        <li><strong>Titre « parent d’enfant français »</strong> obtenu.</li>
      </ul>
      <h2 class="mat-headline-4">Droit pénal : 2 succès notables</h2>
      <ul>
        <li><strong>Détention à domicile sous surveillance électronique</strong> : libération rapide grâce à un projet solide (hébergement, promesse d’embauche, suivi médical, indemnisation de la victime).</li>
        <li><strong>Irresponsabilité pénale</strong> reconnue malgré expertises contradictoires.</li>
      </ul>
      <h2 class="mat-headline-5">Conclusion</h2>
      <p>Ces 9 victoires illustrent l’importance d’une stratégie juridique rigoureuse, d’un dossier complet et d’une argumentation précise. Que ce soit en droit des étrangers ou en droit pénal, chaque situation nécessite une approche personnalisée et une connaissance approfondie de la jurisprudence.</p>
      <p><strong>Besoin d’un accompagnement juridique&nbsp;?</strong><br>Le cabinet vous accompagne dans toutes vos démarches à Bordeaux et en France.</p>
      `,
			category: 'Actualités',
			date: '2026-01-06',
			similarSlugs: [
				'oqtf-5-erreurs-eviter-contester-bordeaux',
				'post-regularisation-renouvellement-changement-statut-titre-sejour-bordeaux',
				'naturalisation-refusee-erreur-administrative-coute-2-ans',
			],
		},
		{
			slug: 'oqtf-5-erreurs-eviter-contester-bordeaux',
			title: 'OQTF : 5 erreurs fatales à éviter',
			summary: 'Conseils pour contester efficacement une obligation de quitter le territoire français.',
			content: '<p>Contenu à venir.</p>',
			category: 'Conseils',
		},
		{
			slug: 'post-regularisation-renouvellement-changement-statut-titre-sejour-bordeaux',
			title: 'Régularisation, Renouvellement ou Changement de statut ?',
			summary: 'Le guide complet pour ne plus se tromper dans vos démarches de titre de séjour.',
			content: '<p>Contenu à venir.</p>',
			category: 'Guides',
		},
		{
			slug: 'naturalisation-refusee-erreur-administrative-coute-2-ans',
			title: 'Naturalisation refusée : Cette erreur administrative vous coûte 2 ans',
			summary: "Comprendre les pièges à éviter lors d'une demande de naturalisation.",
			content: '<p>Contenu à venir.</p>',
			category: 'Actualités',
		},
	])

	get articles() {
		return this._articles.asReadonly()
	}

	getBySlug(slug: string) {
		return this._articles().find((a) => a.slug === slug)
	}
}
