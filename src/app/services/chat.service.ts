import { Injectable } from '@angular/core'

export interface ChatMessage {
	id: string
	type: 'user' | 'bot'
	text: string
	timestamp: Date
}

export interface FAQ {
	id: string
	keywords: string[]
	question: string
	answer: string
	redirectUrl?: string
}

@Injectable({ providedIn: 'root' })
export class ChatService {
	private faqs: FAQ[] = [
		{
			id: 'titre-sejour',
			keywords: ['titre', 'séjour', 'visa', 'residence'],
			question: 'Comment obtenir un titre de séjour en France ?',
			answer: 'Le titre de séjour dépend de votre situation : étudiant, travailleur, famille, réfugié... Je peux vous aider à déterminer le type de titre adapté à votre cas. Contactez-nous pour une consultation détaillée.',
		},
		{
			id: 'naturalisation',
			keywords: ['naturalisation', 'citoyen', 'français', 'naturalité'],
			question: 'Quelles sont les conditions pour la naturalisation française ?',
			answer: 'La naturalisation requiert généralement 5 ans de résidence en France, la maîtrise du français, et le respect des valeurs de la République. Les conditions peuvent varier selon votre profil. Consultez-nous pour évaluer votre cas.',
		},
		{
			id: 'oqtf',
			keywords: ['oqtf', 'expulsion', 'quitter', 'ordre'],
			question: 'Que faire si je reçois une OQTF (Obligation de Quitter le Territoire) ?',
			answer: "Une OQTF n'est pas définitive. Vous avez le droit de contester cette décision devant le tribunal. Il existe plusieurs recours possibles. Je vous recommande de nous contacter rapidement pour préparer votre défense.",
		},
		{
			id: 'regroupement-familial',
			keywords: ['famille', 'regroupement', 'conjoint', 'enfant', 'parent'],
			question: 'Comment faire venir ma famille en France ?',
			answer: 'Le regroupement familial permet à votre conjoint et vos enfants de vous rejoindre. Les conditions incluent un revenu suffisant et un logement approprié. Nous pouvons vous guider dans cette procédure complexe.',
		},
		{
			id: 'urgence',
			keywords: ['urgent', 'urgence', 'aide', 'emergency'],
			question: 'Avez-vous des services pour les cas urgents ?',
			answer: 'Oui, nous proposons une prise en charge prioritaire pour les cas urgents de droit des étrangers. Appelez-nous immédiatement au +33 5 56 51 09 51 ou utilisez le formulaire de contact.',
		},
		{
			id: 'consultation',
			keywords: [
				'consultation',
				'rendez-vous',
				'rdv',
				'entretien',
				'appointment',
				'créneau',
				'disponibilité',
				'disponibilités',
				'disponible',
				'dispo',
				'contact',
			],
			question: 'Comment prendre un rendez-vous pour une consultation ?',
			answer: 'Pour prendre rendez-vous, veuillez utiliser notre formulaire de contact. Nous vous recontacterons pour confirmer votre créneau.',
			redirectUrl: '/contact',
		},
		{
			id: 'tarifs',
			keywords: ['tarif', 'prix', 'coût', 'honoraire', 'devis'],
			question: 'Quels sont vos tarifs ?',
			answer: 'Nos tarifs varient selon la complexité de votre dossier et le type de prestation. Nous proposons une première consultation pour établir un devis personnalisé. Contactez-nous pour discuter de vos besoins.',
		},
		{
			id: 'langues',
			keywords: ['langue', 'english', 'spanish', 'arabe', 'languages'],
			question: 'Quelles langues parlez-vous ?',
			answer: "Nous parlons français et anglais. Pour d'autres langues, nous travaillons avec des traducteurs professionnels. N'hésitez pas à nous contacter pour discuter de votre situation.",
		},
	]

	findAnswer(userMessage: string): FAQ | null {
		const lowerMessage = userMessage.toLowerCase()

		for (const faq of this.faqs) {
			if (faq.keywords.some((keyword) => lowerMessage.includes(keyword))) {
				return faq
			}
		}

		return null
	}

	getBotResponse(userMessage: string): string {
		const faq = this.findAnswer(userMessage)

		if (faq) {
			return faq.answer
		}

		return `Je ne suis pas certain de comprendre votre question. Nos services couvrent les titres de séjour, la naturalisation, les OQTF, le regroupement familial et plus. Pourriez-vous reformuler ou utiliser le formulaire de contact pour une question plus spécifique ?`
	}

	getRedirectUrl(userMessage: string): string | null {
		const faq = this.findAnswer(userMessage)
		return faq?.redirectUrl || null
	}

	getFAQs(): FAQ[] {
		return this.faqs
	}
}
