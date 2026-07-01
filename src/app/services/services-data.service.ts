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
					'Je vous accompagne dans les démarches les plus sensibles liées au séjour, au droit d’asile, à la naturalisation et au contentieux administratif, avec un accompagnement clair, rigoureux et adapté à chaque situation. Chaque dossier est étudié avec attention pour identifier les arguments les plus solides, anticiper les obstacles et proposer une stratégie réaliste dès les premières étapes.',
				detailedDescriptionContext: 'Services page|Residence permits detailed',
				items: [
					{ text: 'Titre de séjour', context: 'Services page|Residence permits item visa' },
					{ text: 'Asile', context: 'Services page|Residence permits item asylum' },
					{
						text: 'Naturalisation et nationalité',
						context: 'Services page|Residence permits item nationality',
					},
					{
						text: 'Contentieux et recours (service entier)',
						context: 'Services page|Residence permits item litigation',
					},
				],
			},
			{
				title: 'Droit du handicap',
				titleContext: 'Services page|Disability title',
				icon: 'accessible',
				description: 'Accompagnement attentif face aux démarches MDPH, aux refus de prestations et aux recours',
				descriptionContext: 'Services page|Disability description',
				subtitle: 'MDPH, AAH, PCH, RQTH, CMI',
				subtitleContext: 'Services page|Disability subtitle',
				anchor: 'droit-handicap',
				detailedDescription:
					'Lorsqu’un dossier de handicap est refusé ou insuffisamment reconnu, chaque délai compte. J’aide les personnes et leurs familles à comprendre leurs droits, préparer un dossier solide et contester les décisions défavorables avec la clarté et la rigueur nécessaires.',
				detailedDescriptionContext: 'Services page|Disability detailed',
				bottomDescription:
					'L’objectif est de protéger les droits des personnes en situation de handicap, que ce soit pour l’accès aux aides, la reconnaissance de la qualité de travailleur handicapé ou la défense de leurs droits face à l’administration.',
				bottomDescriptionContext: 'Services page|Disability bottom description',
				items: [
					{ text: 'Dossier MDPH et recours', context: 'Services page|Disability item mdph' },
					{ text: 'AAH, PCH, AEEH et aides spécifiques', context: 'Services page|Disability item aides' },
					{
						text: 'RQTH et reconnaissance du handicap au travail',
						context: 'Services page|Disability item rqth',
					},
					{ text: 'CMI, stationnement et aménagements', context: 'Services page|Disability item cmi' },
				],
			},
			{
				title: 'Droit de la famille',
				titleContext: 'Services page|Family title',
				icon: 'family_restroom',
				description:
					'Conseil et accompagnement dans les situations familiales sensibles, du divorce aux mesures de protection',
				descriptionContext: 'Services page|Family description',
				subtitle: 'Divorce, autorité parentale, pension alimentaire',
				subtitleContext: 'Services page|Family subtitle',
				anchor: 'droit-famille',
				detailedDescription:
					'Le droit de la famille exige à la fois une écoute attentive et une stratégie juridique solide. J’accompagne les parents, les couples et les proches dans les moments de rupture ou de fragilité, avec un souci constant de préserver l’intérêt des enfants et la stabilité de la famille.',
				detailedDescriptionContext: 'Services page|Family detailed',
				bottomDescription:
					'Je vous aide à trouver une solution adaptée, qu’il s’agisse d’un règlement amiable, d’un divorce contentieux, d’une mesure provisoire ou d’un recours devant le juge aux affaires familiales.',
				bottomDescriptionContext: 'Services page|Family bottom description',
				items: [
					{ text: 'Divorce et séparation', context: 'Services page|Family item divorce' },
					{
						text: 'Autorité parentale et résidence des enfants',
						context: 'Services page|Family item parental',
					},
					{
						text: 'Pension alimentaire et contribution aux charges',
						context: 'Services page|Family item pension',
					},
					{ text: 'Mesures de protection et tutelle', context: 'Services page|Family item protection' },
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
					{ text: 'Residence permits', context: 'Services page|Residence permits item visa' },
					{ text: 'Asylum', context: 'Services page|Residence permits item asylum' },
					{
						text: 'Naturalization and nationality',
						context: 'Services page|Residence permits item nationality',
					},
					{ text: 'Litigation and appeals', context: 'Services page|Residence permits item litigation' },
				],
			},
			{
				title: 'Disability Law',
				titleContext: 'Services page|Disability title',
				icon: 'accessible',
				description: 'Support for MDPH procedures, benefit refusals and appeals',
				descriptionContext: 'Services page|Disability description',
				subtitle: 'MDPH, AAH, PCH, RQTH, CMI',
				subtitleContext: 'Services page|Disability subtitle',
				anchor: 'droit-handicap',
				detailedDescription:
					'When a disability-related request is denied or insufficiently recognized, every deadline matters. I help individuals and families understand their rights, prepare strong files and challenge unfavorable decisions with clarity and rigor.',
				detailedDescriptionContext: 'Services page|Disability detailed',
				items: [
					{ text: 'MDPH file and appeal strategy', context: 'Services page|Disability item mdph' },
					{ text: 'AAH, PCH, AEEH and specific benefits', context: 'Services page|Disability item aides' },
					{ text: 'RQTH and recognition at work', context: 'Services page|Disability item rqth' },
					{ text: 'CMI and mobility-related rights', context: 'Services page|Disability item cmi' },
				],
			},
			{
				title: 'Family Law',
				titleContext: 'Services page|Family title',
				icon: 'family_restroom',
				description: 'Advice and support in sensitive family matters, from divorce to protection measures',
				descriptionContext: 'Services page|Family description',
				subtitle: 'Divorce, parental authority, alimony',
				subtitleContext: 'Services page|Family subtitle',
				anchor: 'droit-famille',
				detailedDescription:
					'Family law requires both empathy and a strong legal strategy. I support parents, couples and relatives in times of separation or vulnerability, always with the interest of the children and the stability of the family in mind.',
				detailedDescriptionContext: 'Services page|Family detailed',
				items: [
					{ text: 'Divorce and separation', context: 'Services page|Family item divorce' },
					{ text: 'Parental authority and child residence', context: 'Services page|Family item parental' },
					{ text: 'Child support and shared expenses', context: 'Services page|Family item pension' },
					{ text: 'Protection measures and guardianship', context: 'Services page|Family item protection' },
				],
			},
		]
	}
}
