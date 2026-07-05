import { inject, Injectable, LOCALE_ID, signal } from '@angular/core'

export interface ServiceItem {
	title: string
	titleContext: string
	icon: string
	description: string
	descriptionContext: string
	bottomDescription?: string
	bottomDescriptionContext?: string
	subtitle?: string
	subtitleContext?: string
	anchor?: string
	detailedDescription?: string
	detailedDescriptionContext?: string
	items?: { text: string; context: string }[]
}

@Injectable({
	providedIn: 'root',
})
export class ServicesDataService {
	private locale = inject(LOCALE_ID)

	private readonly _services = signal<ServiceItem[]>(
		this.locale === 'en' ? this.getEnglishServices() : this.getFrenchServices(),
	)

	get services() {
		return this._services.asReadonly()
	}

	private getFrenchServices(): ServiceItem[] {
		return [
			{
				title: 'Droit des étrangers',
				titleContext: 'Services page|Residence permits title',
				icon: 'badge',
				description:
					'Accompagnement complet pour les questions de titre de séjour, d’asile, de naturalisation et de contentieux',
				descriptionContext: 'Services page|Residence permits description',
				subtitle: 'Titre de séjour, Asile, Naturalisation, Contentieux et recours',
				subtitleContext: 'Services page|Residence permits subtitle',
				anchor: 'droit-etrangers',
				detailedDescription:
					"J'interviens à toutes les étapes de vos démarches en droit des étrangers, qu'il s'agisse d'obtenir ou de renouveler un titre de séjour, de contester une obligation de quitter le territoire français (OQTF), un refus de séjour ou de visa, d'engager une demande de naturalisation ou de vous accompagner dans une procédure d'asile.",
				detailedDescriptionContext: 'Services page|Residence permits detailed',
				bottomDescription:
					"Chaque situation étant unique, j'étudie votre dossier avec attention afin de vous conseiller sur les démarches les plus adaptées et de défendre vos droits devant les juridictions compétentes lorsque cela est nécessaire.",
				bottomDescriptionContext: 'Services page|Residence permits bottom description',
				items: [
					{
						text: 'Titres de séjour et renouvellements',
						context: 'Services page|Residence permits item visa',
					},
					{
						text: 'OQTF, refus de séjour et contentieux devant le tribunal administratif',
						context: 'Services page|Residence permits item litigation',
					},
					{ text: 'Asile', context: 'Services page|Residence permits item asylum' },
					{ text: 'Visas', context: 'Services page|Residence permits item visas' },
					{
						text: 'Regroupement familial',
						context: 'Services page|Residence permits item family',
					},
					{
						text: 'Naturalisation et nationalité française',
						context: 'Services page|Residence permits item nationality',
					},
				],
			},
			{
				title: 'Droit du handicap',
				titleContext: 'Services page|Disability title',
				icon: 'accessible',
				description:
					'J’accompagne les adultes et les parents d’enfants en situation de handicap dans leurs démarches auprès de la MDPH et dans les recours contre les décisions de la CDAPH',
				descriptionContext: 'Services page|Disability description',
				subtitle: 'MDPH, AAH, PCH, AEEH, AESH, RQTH, CMI',
				subtitleContext: 'Services page|Disability subtitle',
				anchor: 'droit-handicap',
				detailedDescription:
					"J'interviens notamment en cas de refus ou de révision de l'Allocation aux adultes handicapés (AAH), de la Prestation de compensation du handicap (PCH), de l'Allocation d'éducation de l'enfant handicapé (AEEH), de la Carte Mobilité Inclusion (CMI), de la Reconnaissance de la qualité de travailleur handicapé (RQTH), des décisions d'orientation ou des difficultés liées à l'accompagnement scolaire, notamment concernant les AESH.",
				detailedDescriptionContext: 'Services page|Disability detailed',
				bottomDescription:
					'Je vous accompagne à chaque étape de la procédure, depuis la constitution du dossier et le recours administratif préalable obligatoire (RAPO) jusqu’au recours devant le Pôle social du Tribunal judiciaire lorsque cela est nécessaire.',
				bottomDescriptionContext: 'Services page|Disability bottom description',
				items: [
					{ text: 'Dossiers MDPH', context: 'Services page|Disability item mdph' },
					{
						text: 'Recours contre les décisions de la MDPH et de la CDAPH',
						context: 'Services page|Disability item appeals',
					},
					{ text: 'AAH, PCH, AEEH, AESH, CMI, RQTH', context: 'Services page|Disability item benefits' },
					{
						text: 'Orientations (IME, IEM, SESSAD, etc.)',
						context: 'Services page|Disability item orientations',
					},
					{
						text: 'RAPO et recours devant le Tribunal judiciaire',
						context: 'Services page|Disability item rapo',
					},
				],
			},
			{
				title: 'Droit de la famille',
				titleContext: 'Services page|Family title',
				icon: 'family_restroom',
				description:
					'J’accompagne mes clients dans les principales problématiques relevant du droit de la famille, qu’il s’agisse d’une séparation, d’un divorce ou de difficultés concernant les enfants',
				descriptionContext: 'Services page|Family description',
				subtitle: 'Divorce, autorité parentale, pension alimentaire',
				subtitleContext: 'Services page|Family subtitle',
				anchor: 'droit-famille',
				detailedDescription:
					'Parce que ces procédures touchent directement à la vie personnelle et familiale, je privilégie un accompagnement à la fois humain, disponible et rigoureux afin de défendre au mieux vos intérêts. J’interviens notamment en matière de :',
				detailedDescriptionContext: 'Services page|Family detailed',
				bottomDescriptionContext: 'Services page|Family bottom description',
				items: [
					{ text: 'Divorce par consentement mutuel', context: 'Services page|Family item mutual divorce' },
					{ text: 'Divorce judiciaire', context: 'Services page|Family item judicial divorce' },
					{ text: 'Autorité parentale', context: 'Services page|Family item parental' },
					{ text: 'Résidence des enfants', context: 'Services page|Family item residence' },
					{ text: 'Droit de visite et d’hébergement', context: 'Services page|Family item visitation' },
					{ text: 'Pension alimentaire', context: 'Services page|Family item pension' },
					{
						text: 'Assistance éducative devant le juge des enfants',
						context: 'Services page|Family item educational assistance',
					},
				],
			},
		]
	}

	private getEnglishServices(): ServiceItem[] {
		return [
			{
				title: 'Immigration Law',
				titleContext: 'Services page|Residence permits title',
				icon: 'badge',
				description:
					'Comprehensive support for residence permits, asylum, naturalization and litigation matters',
				descriptionContext: 'Services page|Residence permits description',
				subtitle: 'Residence permits, Asylum, Naturalization, Appeals',
				subtitleContext: 'Services page|Residence permits subtitle',
				anchor: 'droit-etrangers',
				detailedDescription:
					'I support you in the most sensitive immigration matters, from residence permits and asylum to naturalization and administrative appeals, with clear and rigorous guidance.',
				detailedDescriptionContext: 'Services page|Residence permits detailed',
				items: [
					{
						text: 'Residence permits and renewals',
						context: 'Services page|Residence permits item visa',
					},
					{
						text: 'OQTF, refusal of stay and litigation before the administrative court',
						context: 'Services page|Residence permits item litigation',
					},
					{ text: 'Asylum', context: 'Services page|Residence permits item asylum' },
					{ text: 'Visas', context: 'Services page|Residence permits item visas' },
					{
						text: 'Family reunification',
						context: 'Services page|Residence permits item family',
					},
					{
						text: 'Naturalization and French nationality',
						context: 'Services page|Residence permits item nationality',
					},
				],
			},
			{
				title: 'Disability Law',
				titleContext: 'Services page|Disability title',
				icon: 'accessible',
				description:
					'I support adults and parents of children with disabilities in their procedures with the MDPH and in appeals against decisions of the CDAPH',
				descriptionContext: 'Services page|Disability description',
				subtitle: 'MDPH, AAH, PCH, AEEH, AESH, RQTH, CMI',
				subtitleContext: 'Services page|Disability subtitle',
				anchor: 'droit-handicap',
				detailedDescription:
					'I intervene particularly in cases of refusal or revision of the Disability Allowance for Adults (AAH), the Disability Compensation Benefit (PCH), the Education Allowance for Disabled Children (AEEH), the Inclusion Mobility Card (CMI), the recognition of the status of disabled worker (RQTH), orientation decisions or difficulties related to school support, particularly concerning AESH.',
				detailedDescriptionContext: 'Services page|Disability detailed',
				items: [
					{ text: 'MDPH files', context: 'Services page|Disability item mdph' },
					{
						text: 'Appeals against MDPH and CDAPH decisions',
						context: 'Services page|Disability item appeals',
					},
					{ text: 'AAH', context: 'Services page|Disability item aah' },
					{ text: 'PCH', context: 'Services page|Disability item pch' },
					{ text: 'AEEH', context: 'Services page|Disability item aeeh' },
					{ text: 'AESH', context: 'Services page|Disability item aesh' },
					{ text: 'CMI', context: 'Services page|Disability item cmi' },
					{ text: 'RQTH', context: 'Services page|Disability item rqth' },
					{
						text: 'Orientations (IME, IEM, SESSAD, etc.)',
						context: 'Services page|Disability item orientations',
					},
					{
						text: 'RAPO and appeals before the judicial court',
						context: 'Services page|Disability item rapo',
					},
				],
			},
			{
				title: 'Family Law',
				titleContext: 'Services page|Family title',
				icon: 'family_restroom',
				description:
					'I support my clients in the main issues relating to family law, whether it be separation, divorce or difficulties concerning children',
				descriptionContext: 'Services page|Family description',
				subtitle: 'Divorce, parental authority, alimony',
				subtitleContext: 'Services page|Family subtitle',
				anchor: 'droit-famille',
				detailedDescription:
					'Because these proceedings directly affect personal and family life, I favour a human, available and rigorous approach in order to defend your interests as effectively as possible.',
				detailedDescriptionContext: 'Services page|Family detailed',
				items: [
					{ text: 'Mutual consent divorce', context: 'Services page|Family item mutual divorce' },
					{ text: 'Judicial divorce', context: 'Services page|Family item judicial divorce' },
					{ text: 'Parental authority', context: 'Services page|Family item parental' },
					{ text: 'Child residence', context: 'Services page|Family item residence' },
					{ text: 'Visitation and accommodation rights', context: 'Services page|Family item visitation' },
					{ text: 'Child support', context: 'Services page|Family item pension' },
					{
						text: 'Educational assistance before the juvenile judge',
						context: 'Services page|Family item educational assistance',
					},
				],
			},
		]
	}
}
