import { Injectable, signal } from '@angular/core'

export interface ServiceItem {
	title: string
	icon: string
	description: string
	subtitle?: string
	anchor?: string
	detailedDescription?: string
	items?: string[]
}

@Injectable({
	providedIn: 'root',
})
export class ServicesDataService {
	private readonly _services = signal<ServiceItem[]>([
		{
			title: 'Titres de Séjour',
			icon: 'badge',
			description: 'Demande de régularisation, renouvellement, changement de statut et regroupement familial.',
			subtitle: 'Obtention et renouvellement de votre droit au séjour',
			anchor: 'titres-de-sejour',
			detailedDescription:
				'Nous vous assistons dans la constitution de votre dossier et vous représentons auprès des préfectures pour sécuriser votre situation administrative en France.',
			items: [
				'Cartes de séjour "vie privée et familiale"',
				'Titres de séjour pour motifs professionnels (salarié, passeport talent)',
				'Statut "étudiant" et "visiteur"',
				'Procédures de regroupement familial',
				"Demandes d'admission exceptionnelle au séjour",
				'Changements de statut',
			],
		},
		{
			title: 'Nationalité Française',
			icon: 'flag',
			description: 'Procédures de naturalisation par décret, mariage ou déclaration.',
			subtitle: 'Devenir citoyen français',
			anchor: 'nationalite-francaise',
			detailedDescription:
				"L'acquisition de la nationalité française est une étape majeure. Nous vous guidons à travers les différentes procédures pour maximiser vos chances de succès.",
			items: [
				'Constitution des dossiers de naturalisation par décret',
				'Déclaration de nationalité par mariage',
				'Déclaration de nationalité à raison de la naissance et de la résidence en France',
				"Recours contre les décisions d'ajournement ou de rejet",
				'Demandes de Certificat de Nationalité Française (CNF)',
			],
		},
		{
			title: 'Contentieux & Recours',
			icon: 'gavel',
			description: 'Défense contre les OQTF, refus de visa et contentieux devant le tribunal administratif.',
			subtitle: 'Défense de vos droits devant les juridictions',
			anchor: 'contentieux-recours',
			detailedDescription:
				'Face à une décision administrative défavorable, une action rapide et stratégique est essentielle. Nous vous défendons avec pugnacité devant les tribunaux administratifs.',
			items: [
				'Recours contre les Obligations de Quitter le Territoire Français (OQTF)',
				'Contestation des refus de titre de séjour et des refus de renouvellement',
				'Recours contre les décisions de transfert "Dublin"',
				"Contentieux du placement en rétention administrative et de l'assignation à résidence",
			],
		},
	])

	get services() {
		return this._services.asReadonly()
	}
}
