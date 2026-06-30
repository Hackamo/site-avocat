import { Injectable } from '@angular/core'

export interface ChatMessage {
	id: string
	type: 'user' | 'bot'
	text: string
	timestamp: Date
}

@Injectable({ providedIn: 'root' })
export class ChatService {
	private readonly apiUrl = '/api/chat'
	private readonly directGeminiModel = 'gemini-3.5-flash'

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
					return 'Le service d’IA est temporairement indisponible. Veuillez réessayer plus tard.'
				}
			}

			const errorMessage = backendError instanceof Error ? backendError.message : String(backendError)
			console.error('ChatService.sendMessage failed:', errorMessage)
			return `Le service d’IA est temporairement indisponible (${errorMessage}).`
		}
	}

	private getDirectGeminiApiKey(): string | null {
		if (typeof window === 'undefined') {
			return null
		}

		const candidate = (window as any).GEMINI_API_KEY ?? (window as any).VITE_GEMINI_API_KEY ?? ''
		const apiKey = String(candidate).trim()
		return apiKey || null
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
