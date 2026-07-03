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
	private readonly apiUrl = '/api/chat'
	private readonly directGeminiModel = 'gemini-3.5-flash'
	private readonly directGeminiDisabled = this.readDirectGeminiDisabled()
	private readonly directGeminiEnabled = this.readDirectGeminiEnabled()

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
			answer: 'Le titre de séjour dépend de votre situation : étudiant, travailleur, famille, réfugié... Je peux vous aider à déterminer le type de titre adapté à votre cas. Contactez-nous pour une consultation détaillée.',
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
			answer: 'La naturalisation requiert généralement 5 ans de résidence en France, la maîtrise du français, et le respect des valeurs de la République. Les conditions peuvent varier selon votre profil. Consultez-nous pour évaluer votre cas.',
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
				'avocat',
				'conseil juridique',
				'avis juridique',
				'prise en charge',
				'visio',
			],
			question: 'Comment prendre un rendez-vous pour une consultation ?',
			answer: 'Pour prendre rendez-vous, veuillez utiliser notre formulaire de contact. Nous vous recontacterons pour confirmer votre créneau.',
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
			answer: 'Nos tarifs varient selon la complexité de votre dossier et le type de prestation. Nous proposons une première consultation pour établir un devis personnalisé. Contactez-nous pour discuter de vos besoins.',
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
		const directApiKey = this.getDirectGeminiApiKey()

		try {
			return await this.sendBackendMessage(userMessage)
		} catch (backendError) {
			console.warn(
				'ChatService.sendMessage backend failed, falling back to direct Gemini if configured.',
				backendError,
			)

			if (directApiKey) {
				try {
					return await this.sendGeminiDirect(userMessage, directApiKey)
				} catch (directError) {
					console.error('ChatService.sendMessage direct Gemini failed:', directError)
					return this.getBotResponse(userMessage)
				}
			}

			console.warn('ChatService.sendMessage error fallback using legacy chatbox for:', userMessage)
			return this.getBotResponse(userMessage)
		}
	}

	async streamMessage(userMessage: string, onChunk: (chunk: string) => void): Promise<void> {
		if (typeof window === 'undefined' || !('EventSource' in window) || !this.directGeminiEnabled) {
			try {
				const response = await this.sendBackendMessage(userMessage)
				onChunk(response)
				return
			} catch {
				onChunk(this.getBotResponse(userMessage))
				return
			}
		}

		const url = new URL('/api/chat-stream', window.location.origin)
		url.searchParams.set('message', userMessage)

		return new Promise((resolve) => {
			const source = new EventSource(url.toString())

			source.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data) as { text?: string }
					if (typeof data.text === 'string' && data.text) {
						onChunk(data.text)
					}
				} catch {
					source.close()
					onChunk(this.getBotResponse(userMessage))
					resolve()
				}
			}

			source.addEventListener('done', () => {
				source.close()
				resolve()
			})

			source.addEventListener('error', () => {
				source.close()
				onChunk(this.getBotResponse(userMessage))
				resolve()
			})
		})
	}

	canUseChatStream(): boolean {
		return typeof window !== 'undefined' && 'EventSource' in window && this.directGeminiEnabled
	}

	private getDirectGeminiApiKey(): string | null {
		if (typeof window === 'undefined') {
			return null
		}

		if (!this.directGeminiEnabled) {
			return null
		}

		const candidate = (window as any).GEMINI_API_KEY ?? (window as any).VITE_GEMINI_API_KEY ?? ''
		const apiKey = String(candidate).trim()
		return apiKey || null
	}

	private readDirectGeminiEnabled(): boolean {
		if (typeof window === 'undefined') {
			return false
		}

		if (this.directGeminiDisabled) {
			return false
		}

		const enabledValue = (window as any).GEMINI_DIRECT_ENABLED ?? (window as any).VITE_GEMINI_DIRECT_ENABLED
		if (enabledValue === undefined || enabledValue === null) {
			return true
		}

		if (typeof enabledValue === 'string') {
			return enabledValue.toLowerCase() !== 'false' && enabledValue !== '0'
		}

		return Boolean(enabledValue)
	}

	private readDirectGeminiDisabled(): boolean {
		if (typeof window === 'undefined') {
			return false
		}

		const disabledValue = (window as any).GEMINI_DIRECT_DISABLED ?? (window as any).VITE_GEMINI_DIRECT_DISABLED
		if (disabledValue === undefined || disabledValue === null) {
			return false
		}

		if (typeof disabledValue === 'string') {
			return disabledValue.toLowerCase() !== 'false' && disabledValue !== '0'
		}

		return Boolean(disabledValue)
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

	private async sendGeminiDirect(userMessage: string, apiKey: string): Promise<string> {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1/models/${this.directGeminiModel}:generateContent?key=${encodeURIComponent(apiKey)}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text:
										'Tu es un assistant juridique spécialisé en droit des étrangers en France. Réponds de manière claire et concise en français et précise que les informations fournies ne remplacent pas un avis juridique professionnel.\n\nQuestion : ' +
										userMessage,
								},
							],
						},
					],
					generationConfig: {
						maxOutputTokens: 4096,
						temperature: 0.2,
						topP: 0.95,
					},
				}),
			},
		)

		const bodyText = await response.text()
		if (!response.ok) {
			const errorMessage = bodyText.trim() || `Gemini direct error ${response.status}`
			throw new Error(errorMessage)
		}

		const result = JSON.parse(bodyText) as {
			candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
		}
		const text = result.candidates?.[0]?.content?.parts
			?.map((part) => part.text ?? '')
			.join('')
			.trim()
		if (!text) {
			throw new Error('Aucune réponse reçue de l’IA')
		}

		return text
	}
}
