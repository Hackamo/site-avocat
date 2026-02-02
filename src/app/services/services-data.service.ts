import { inject, Injectable, LOCALE_ID, signal } from '@angular/core'

export interface ServiceItem {
	title: string
	titleContext: string
	icon: string
	description: string
	descriptionContext: string
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
				title: 'Titres de Séjour',
				titleContext: 'Services page|Residence permits title',
				icon: 'badge',
				description: 'Accompagnement complet pour tous vos besoins en matière de titre de séjour',
				descriptionContext: 'Services page|Residence permits description',
				subtitle: 'Régularisation, Renouvellement, Changement de Statut',
				subtitleContext: 'Services page|Residence permits subtitle',
				anchor: 'titres-de-sejour',
				detailedDescription:
					"Qu'il s'agisse d'une première demande de visa, d'un renouvellement ou d'un changement de statut, je vous guide à travers chaque étape de la procédure administrative. Ma spécialité est d'aider les demandeurs à constituer des dossiers solides et conformes aux exigences des autorités préfectorales.",
				detailedDescriptionContext: 'Services page|Residence permits detailed',
				items: [
					{ text: 'Visa long séjour', context: 'Services page|Residence permits item visa' },
					{
						text: 'Titre de séjour (renouvellement)',
						context: 'Services page|Residence permits item renewal',
					},
					{ text: 'Changement de statut', context: 'Services page|Residence permits item status change' },
					{
						text: 'Régularisation exceptionnelle',
						context: 'Services page|Residence permits item regularization',
					},
					{
						text: 'Autorisation provisoire de séjour',
						context: 'Services page|Residence permits item provisional',
					},
					{ text: 'Récours administratifs', context: 'Services page|Residence permits item appeal' },
				],
			},
			{
				title: 'Nationalité Française',
				titleContext: 'Services page|Nationality title',
				icon: 'flag',
				description: "Conseil juridique pour l'accès à la nationalité française",
				descriptionContext: 'Services page|Nationality description',
				subtitle: 'Naturalisation, Déclaration, Mariage',
				subtitleContext: 'Services page|Nationality subtitle',
				anchor: 'nationalite-francaise',
				detailedDescription:
					'Accéder à la nationalité française est un projet important. Que vous envisagiez une naturalisation, une déclaration de nationalité ou une acquisition par mariage, je vous assiste dans la constitution de votre dossier et vous accompagne dans les démarches auprès de la préfecture.',
				detailedDescriptionContext: 'Services page|Nationality detailed',
				items: [
					{ text: 'Naturalisation par décret', context: 'Services page|Nationality item decree' },
					{ text: 'Déclaration de nationalité', context: 'Services page|Nationality item declaration' },
					{ text: 'Acquisition par mariage', context: 'Services page|Nationality item marriage' },
					{ text: 'Réclamation en matière de nationalité', context: 'Services page|Nationality item claim' },
					{
						text: 'Réintégration dans la nationalité française',
						context: 'Services page|Nationality item reintegration',
					},
				],
			},
			{
				title: 'Contentieux et Recours',
				titleContext: 'Services page|Litigation title',
				icon: 'gavel',
				description: 'Défense et assistance juridique en cas de refus, de retrait ou de contentieux',
				descriptionContext: 'Services page|Litigation description',
				subtitle: 'Recours Administratifs, Recours Gracieux, Tribunaux',
				subtitleContext: 'Services page|Litigation subtitle',
				anchor: 'contentieux-recours',
				detailedDescription:
					"Un refus de titre de séjour ou de naturalité ? Une mesure de retrait ou d'expulsion ? Je vous assiste pour contester ces décisions et défendre vos droits auprès de l'administration et des tribunaux. Ma connaissance du droit administratif me permet de construire des stratégies efficaces de recours.",
				detailedDescriptionContext: 'Services page|Litigation detailed',
				items: [
					{ text: 'Recours gracieux et hiérarchique', context: 'Services page|Litigation item appeal' },
					{
						text: 'Recours devant le tribunal administratif',
						context: 'Services page|Litigation item court',
					},
					{
						text: "Assistance en cas d'expulsion ou OQTF",
						context: 'Services page|Litigation item expulsion',
					},
					{ text: 'Représentation en justice', context: 'Services page|Litigation item representation' },
				],
			},
		]
	}

	private getEnglishServices(): ServiceItem[] {
		return [
			{
				title: 'Residence Permits',
				titleContext: 'Services page|Residence permits title',
				icon: 'badge',
				description: 'Complete support for all your residence permit needs',
				descriptionContext: 'Services page|Residence permits description',
				subtitle: 'Regularization, Renewal, Status Change',
				subtitleContext: 'Services page|Residence permits subtitle',
				anchor: 'titres-de-sejour',
				detailedDescription:
					'Whether it is a first visa application, a renewal, or a status change, I guide you through each step of the administrative procedure. My specialty is helping applicants build solid files that comply with the requirements of the prefectural authorities.',
				detailedDescriptionContext: 'Services page|Residence permits detailed',
				items: [
					{ text: 'Long-stay visa', context: 'Services page|Residence permits item visa' },
					{ text: 'Residence permit (renewal)', context: 'Services page|Residence permits item renewal' },
					{ text: 'Status change', context: 'Services page|Residence permits item status change' },
					{
						text: 'Exceptional regularization',
						context: 'Services page|Residence permits item regularization',
					},
					{
						text: 'Provisional residence authorization',
						context: 'Services page|Residence permits item provisional',
					},
					{ text: 'Administrative appeals', context: 'Services page|Residence permits item appeal' },
				],
			},
			{
				title: 'French Nationality',
				titleContext: 'Services page|Nationality title',
				icon: 'flag',
				description: 'Legal advice for access to French nationality',
				descriptionContext: 'Services page|Nationality description',
				subtitle: 'Naturalization, Declaration, Marriage',
				subtitleContext: 'Services page|Nationality subtitle',
				anchor: 'nationalite-francaise',
				detailedDescription:
					'Acquiring French nationality is an important project. Whether you are considering naturalization, a nationality declaration, or acquisition by marriage, I assist you in building your file and accompany you through the procedures with the prefecture.',
				detailedDescriptionContext: 'Services page|Nationality detailed',
				items: [
					{ text: 'Naturalization by decree', context: 'Services page|Nationality item decree' },
					{ text: 'Nationality declaration', context: 'Services page|Nationality item declaration' },
					{ text: 'Acquisition by marriage', context: 'Services page|Nationality item marriage' },
					{ text: 'Nationality claim', context: 'Services page|Nationality item claim' },
					{
						text: 'Reintegration into French nationality',
						context: 'Services page|Nationality item reintegration',
					},
				],
			},
			{
				title: 'Litigation and Appeals',
				titleContext: 'Services page|Litigation title',
				icon: 'gavel',
				description: 'Legal defense and assistance in case of refusal, withdrawal, or litigation',
				descriptionContext: 'Services page|Litigation description',
				subtitle: 'Administrative Appeals, Gracious Appeals, Courts',
				subtitleContext: 'Services page|Litigation subtitle',
				anchor: 'contentieux-recours',
				detailedDescription:
					'A residence permit or nationality refusal? A withdrawal or expulsion order? I assist you in challenging these decisions and defending your rights before the administration and courts. My knowledge of administrative law allows me to build effective appeal strategies.',
				detailedDescriptionContext: 'Services page|Litigation detailed',
				items: [
					{ text: 'Gracious and hierarchical appeals', context: 'Services page|Litigation item appeal' },
					{ text: 'Appeals before administrative court', context: 'Services page|Litigation item court' },
					{
						text: 'Assistance in case of expulsion or OQTF',
						context: 'Services page|Litigation item expulsion',
					},
					{ text: 'Legal representation', context: 'Services page|Litigation item representation' },
				],
			},
		]
	}
}
