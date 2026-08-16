import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { CONTACT_CONFIG } from '../config/contact.config'

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
	private readonly apiUrl = '/api/chat'

	// Message stream for components to subscribe to (keeps recent messages)
	private readonly messageSubject = new ReplaySubject<ChatMessage>(50)
	public readonly messages$: Observable<ChatMessage> = this.messageSubject.asObservable()

	// Simple in-memory send queue to serialize outbound messages and apply a small rate limit
	private readonly sendQueue: Array<{ message: string; resolve: (r: string) => void; reject: (e: any) => void }> = []
	private processingQueue = false
	private readonly sendDelayMs = 250

	private readonly faqs: FAQ[] = [
		{
			id: 'titre-sejour',
			keywords: [
				'titre',
				'séjour',
				'visa',
				'residence',
				'permis',
				'stay',
				'résidence',
				'carte de séjour',
				'carte résident',
				'titre de séjour étudiant',
				'carte de séjour travailleur',
				'passet talent',
				'carte de séjour salarié',
				'travailleur',
				'étudiant',
			],
			question: 'Comment obtenir un titre de séjour en France ?',
			answer: 'Le titre de séjour dépend de votre situation : étudiant, travailleur, famille, réfugié... Je peux vous aider à déterminer le type de titre adapté à votre cas. Contactez-moi pour une consultation détaillée.',
		},
		{
			id: 'naturalisation',
			keywords: [
				'naturalisation',
				'citoyen',
				'français',
				'naturalité',
				'citoyenneté',
				'nationalité',
				'nationalité française',
				'demande naturalisation',
				'dossier naturalisation',
			],
			question: 'Quelles sont les conditions pour la naturalisation française ?',
			answer: 'La naturalisation requiert généralement 5 ans de résidence en France, la maîtrise du français, et le respect des valeurs de la République. Les conditions peuvent varier selon votre profil. Contactez-moi pour évaluer votre cas.',
		},
		{
			id: 'oqtf',
			keywords: [
				'oqtf',
				'expulsion',
				'quitter',
				'ordre',
				'deportation',
				'expel',
				'leave',
				'deport',
				'removal',
				'oust',
				'obligation de quitter le territoire',
				'délai 30 jours',
				'recours administratif',
				'recours contentieux',
				'préfecture',
			],
			question: 'Que faire si je reçois une OQTF (Obligation de Quitter le Territoire) ?',
			answer: "Une OQTF n'est pas définitive. Vous avez le droit de contester cette décision devant le tribunal. Il existe plusieurs recours possibles. Je vous recommande de nous contacter rapidement pour préparer votre défense.",
		},
		{
			id: 'regroupement-familial',
			keywords: [
				'famille',
				'regroupement',
				'conjoint',
				'enfant',
				'parent',
				'family',
				'spouse',
				'child',
				'parent',
				'visa conjoint',
				'vie privée et familiale',
				'logement',
				'ressources',
				'famille étrangère',
				'épouse',
				'enfant mineur',
			],
			question: 'Comment faire venir ma famille en France ?',
			answer: 'Le regroupement familial permet à votre conjoint et vos enfants de vous rejoindre. Les conditions incluent un revenu suffisant et un logement approprié. Nous pouvons vous guider dans cette procédure complexe.',
		},
		{
			id: 'urgence',
			keywords: [
				'urgent',
				'urgence',
				'aide',
				'emergency',
				'immediate',
				'rapid',
				'asap',
				'délai',
				'référé',
				'suspension',
				'procédure urgente',
				'audience rapide',
			],
			question: 'Avez-vous des services pour les cas urgents ?',
			answer: `Oui, nous proposons une prise en charge prioritaire pour les cas urgents de droit des étrangers. Appelez-moi au ${CONTACT_CONFIG.phone} ou utilisez le formulaire de contact.`,
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
				'avocat',
				'conseil juridique',
				'avis juridique',
				'prise en charge',
				'visio',
			],
			question: 'Comment prendre un rendez-vous pour une consultation ?',
			answer: 'Pour prendre rendez-vous, veuillez utiliser mon formulaire de contact. Je vous recontacterai pour confirmer votre créneau.',
			redirectUrl: '/contact#contact-phone',
		},
		{
			id: 'tarifs',
			keywords: [
				'tarif',
				'prix',
				'coût',
				'honoraire',
				'devis',
				'cost',
				'price',
				'rate',
				'fees',
				'quote',
				'estimate',
				'forfait',
				'consultation',
				'par heure',
				'honoraire avocat',
			],
			question: 'Quels sont vos tarifs ?',
			answer: 'Nos tarifs varient selon la complexité de votre dossier et le type de prestation. Nous proposons une première consultation pour établir un devis personnalisé. Contactez-moi pour discuter de vos besoins.',
		},
		{
			id: 'langues',
			keywords: [
				'langue',
				'english',
				'spanish',
				'arabe',
				'languages',
				'language',
				'speak',
				'parler',
				'parles',
				'parlez',
				'langages',
				'français',
				'anglais',
				'traducteur',
				'interprète',
			],
			question: 'Quelles langues parlez-vous ?',
			answer: "Nous parlons français et anglais. Pour d'autres langues, nous travaillons avec des traducteurs professionnels. N'hésitez pas à nous contacter pour discuter de votre situation.",
		},
		{
			id: 'handicap',
			keywords: [
				'handicap',
				'mdph',
				'aah',
				'prestation',
				'compensation',
				'cotorep',
				'rsa',
				'rqth',
				'pch',
				'reconnaissance handicap',
				'demande mdph',
				'indemnisation',
				'allocation',
			],
			question: 'Aidez-vous les personnes en situation de handicap ?',
			answer: 'Oui, nous accompagnons les personnes en situation de handicap dans leurs démarches MDPH, les demandes de prestations et les recours administratifs. Nous veillons à ce que leurs droits soient respectés.',
		},
		{
			id: 'contentieux',
			keywords: [
				'contentieux',
				'recours',
				'tribunal administratif',
				'référé',
				'annulation',
				'suspension',
				'TA',
				'référé suspension',
				'référé liberté',
				'décision préfectorale',
				'juridiction administrative',
			],
			question: 'Que faire en cas de litige administratif ou de recours contentieux ?',
			answer: 'Nous prenons en charge les recours devant les juridictions administratives, les procédures de suspension et d’annulation, ainsi que le suivi des délais et des pièces à fournir.',
		},
		{
			id: 'titre-sejour-refus',
			keywords: [
				'refus',
				'titre de séjour refusé',
				'carte refusée',
				'demande refusée',
				'recours préfectoral',
				'ofii',
				'contestation',
				'préfecture',
				'motif refus',
				'délai recours',
				'ordonnance',
			],
			question: 'Mon titre de séjour a été refusé, que dois-je faire ?',
			answer: 'En cas de refus de titre de séjour, il faut analyser la motivation et préparer un recours dans les délais. Une assistance juridique rapide est recommandée pour éviter une situation irrégulière.',
		},
		{
			id: 'naturalisation-refus',
			keywords: [
				'naturalisation refusée',
				'refus naturalisation',
				'ajournement',
				'échec naturalisation',
				'motif refus',
				'commission de naturalisation',
				'préfecture',
				'dossier de naturalisation',
			],
			question: 'Que faire si ma naturalisation est refusée ou ajournée ?',
			answer: 'Le refus de naturalisation peut être contesté et il est important de comprendre les motifs. Nous aidons à préparer un recours ou à déposer une nouvelle demande avec un dossier renforcé.',
		},
		{
			id: 'carte-resident-10-ans',
			keywords: [
				'carte résident 10 ans',
				'carte de résident',
				'carte 10 ans',
				'10 ans',
				'carte de résident 10 ans',
				'résident 10 ans',
				'carte de séjour 10 ans',
			],
			question: 'Comment obtenir une carte de résident 10 ans ?',
			answer: 'La carte de résident 10 ans est accordée sous conditions de stabilité de séjour, de ressources et d’intégration. Nous vous aidons à vérifier votre éligibilité et à constituer un dossier solide.',
		},
		{
			id: 'changement-statut',
			keywords: [
				'changement de statut',
				'étudiant à salarié',
				'statut étudiant',
				'changement statut',
				'changement de carte',
				'passeport talent',
				'carte salarié',
			],
			question: 'Comment changer de statut ? Par exemple étudiant vers salarié ?',
			answer: 'Le changement de statut nécessite une nouvelle demande auprès de la préfecture et un dossier adapté à votre situation. Nous pouvons vous accompagner pour passer d’un statut étudiant à un titre de séjour salarié ou passeport talent.',
		},
		{
			id: 'regularisation',
			keywords: [
				'régularisation',
				'regularisation',
				'boursier',
				'étranger en situation irrégulière',
				'démarche réguli',
				'carte de séjour pour vie privée et familiale',
			],
			question: 'Est-il possible de se régulariser en France ?',
			answer: 'La régularisation dépend de votre situation personnelle, la durée de séjour et les liens avec la France. Nous analysons votre dossier et vous aidons à identifier les voies possibles de régularisation.',
		},
	]

	private findAnswer(userMessage: string): FAQ | null {
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

		return `Je ne suis pas certain de comprendre votre question. Nos services couvrent le droit des étrangers, le droit de la famille et le contentieux. Pourriez-vous reformuler ou utiliser le formulaire de contact pour une question plus spécifique ?`
	}

	getRedirectUrl(userMessage: string): string | null {
		const faq = this.findAnswer(userMessage)
		return faq?.redirectUrl || null
	}

	async sendMessage(userMessage: string): Promise<string> {
		return new Promise((resolve, reject) => {
			// push user message immediately to the observable stream
			try {
				this.messageSubject.next({ id: this._makeId(), type: 'user', text: userMessage, timestamp: new Date() })
			} catch (e) {
				// non-blocking
				console.warn('ChatService.sendMessage could not push user message to stream', e)
			}

			this.sendQueue.push({ message: userMessage, resolve, reject })
			this.processQueue().catch((err) => console.error('ChatService.processQueue failed:', err))
		})
	}

	private async processQueue(): Promise<void> {
		if (this.processingQueue) return
		this.processingQueue = true

		while (this.sendQueue.length) {
			const item = this.sendQueue.shift()!
			try {
				const answer = await this._sendAttempt(item.message)
				this.messageSubject.next({ id: this._makeId(), type: 'bot', text: answer, timestamp: new Date() })
				item.resolve(answer)
			} catch (err) {
				console.error('ChatService._sendAttempt failed, returning fallback response:', err)
				const fallback = this.getBotResponse(item.message)
				this.messageSubject.next({ id: this._makeId(), type: 'bot', text: fallback, timestamp: new Date() })
				// resolve with fallback so callers always get a useful reply
				item.resolve(fallback)
			}

			// small delay between messages to avoid bursts
			await new Promise((r) => setTimeout(r, this.sendDelayMs))
		}

		this.processingQueue = false
	}

	private async _sendAttempt(userMessage: string): Promise<string> {
		return await this.sendBackendMessage(userMessage)
	}

	private _makeId(): string {
		return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
	}

	async streamMessage(userMessage: string, onChunk: (chunk: string) => void): Promise<void> {
		try {
			const response = await this.sendBackendMessage(userMessage)
			onChunk(response)
		} catch {
			onChunk(this.getBotResponse(userMessage))
		}
	}

	canUseChatStream(): boolean {
		return false
	}

	private async sendBackendMessage(userMessage: string): Promise<string> {
		const response = await fetch(this.apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: userMessage }),
		})

		const bodyText = await response.text()
		const contentType = response.headers.get('content-type') ?? ''

		if (!response.ok) {
			const errorMessage = contentType.includes('application/json')
				? (() => {
						try {
							const json = JSON.parse(bodyText)
							return typeof json.error === 'string' ? json.error : `API error ${response.status}`
						} catch {
							return `API error ${response.status}`
						}
					})()
				: bodyText.trim() || `API error ${response.status}`
			throw new Error(errorMessage)
		}

		if (contentType.includes('application/json')) {
			try {
				const data = JSON.parse(bodyText) as { answer?: string }
				if (typeof data.answer === 'string' && data.answer.trim()) {
					return data.answer
				}
				throw new Error('ChatService.sendMessage missing answer in response')
			} catch (jsonError) {
				console.error('ChatService.sendMessage parse error:', jsonError, 'body:', bodyText)
				throw jsonError
			}
		}

		throw new Error('ChatService.sendMessage unexpected content type')
	}

    
}
