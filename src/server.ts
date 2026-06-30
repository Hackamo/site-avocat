import '@angular/compiler'
import { config } from 'dotenv'
import { join } from 'node:path'
import {
	AngularNodeAppEngine,
	createNodeRequestHandler,
	isMainModule,
	writeResponseToNodeResponse,
} from '@angular/ssr/node'
import { ɵsetAngularAppEngineManifest } from '@angular/ssr'
import express from 'express'
import { pathToFileURL } from 'node:url'
import { GoogleGenAI } from '@google/genai'

// Load environment variables from .env.local
const envPath = join(import.meta.dirname, '../.env.local')
console.log('Loading .env.local from:', envPath)
config({ path: envPath })

const browserDistFolder = join(import.meta.dirname, '../browser')
const manifestPath = join(import.meta.dirname, '../dist/server/angular-app-engine-manifest.mjs')

let angularApp: AngularNodeAppEngine | null = null
const app = express()

// Initialize Angular SSR only if manifest exists (production/build mode)
const initAngularAppPromise = (async () => {
	try {
		const fs = await import('fs/promises')
		await fs.stat(manifestPath)

		const manifestModule = await import(pathToFileURL(manifestPath).href)
		ɵsetAngularAppEngineManifest(manifestModule.default)
		angularApp = new AngularNodeAppEngine()
		console.log('Angular SSR initialized')
	} catch (error) {
		console.log('Angular SSR not available (development mode). API-only mode.')
	}
})()

app.use(async (req, res, next) => {
	await initAngularAppPromise
	next()
})

app.use(express.json())

app.get('/api/chat-stream', async (req, res) => {
	const userMessage = String(req.query?.['message'] || '').trim()
	if (!userMessage) {
		return res.status(400).json({ error: 'Le message est requis.' })
	}

	const apiKey = process.env['GEMINI_API_KEY']
	if (!apiKey) {
		return res.status(500).json({ error: 'GEMINI_API_KEY manquant' })
	}

	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Cache-Control', 'no-cache, no-transform')
	res.setHeader('Connection', 'keep-alive')
	res.flushHeaders()

	try {
		const ai = new GoogleGenAI({ apiKey })
		const stream = await ai.models.generateContentStream({
			model: geminiModel,
			contents: buildGeminiPrompt(userMessage),
			config: {
				maxOutputTokens: maxGeminiOutputTokens,
				temperature: 0.1,
				topP: 0.95,
			},
		})

		for await (const chunk of stream) {
			const text = typeof chunk.text === 'string' ? chunk.text : ''
			if (text) {
				res.write(`data: ${JSON.stringify({ text })}\n\n`)
			}
		}

		res.write('event: done\ndata: {}\n\n')
		return res.end()
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('AI stream error:', errorMessage)
		res.write(`event: error\ndata: ${JSON.stringify({ error: errorMessage })}\n\n`)
		return res.end()
	}
})

app.post('/api/chat', async (req, res) => {
	const userMessage = String(req.body?.message || '').trim()
	if (!userMessage) {
		return res.status(400).json({ error: 'Le message est requis.' })
	}

	try {
		const answer = await getAiAnswer(userMessage)
		return res.json({ answer })
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('AI proxy error:', errorMessage)
		return res.status(500).json({ error: 'Impossible de contacter le service IA pour le moment.' })
	}
})

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
	express.static(browserDistFolder, {
		maxAge: '1y',
		index: false,
		redirect: false,
	}),
)

const geminiModel = 'gemini-3.5-flash'
const maxGeminiOutputTokens = 80

function buildGeminiPrompt(userMessage: string): string {
	return [
		'Tu es un assistant juridique spécialisé en droit des étrangers en France.',
		'Réponds de manière claire, concise et en français.',
		'Limite-toi à 3 phrases maximum et à 80 mots maximum.',
		"Précise que les informations fournies ne remplacent pas un avis juridique professionnel, qu'elles sont à titre informatif uniquement et qu'il faut prendre rendez-vous avec un avocat pour des conseils juridiques personnalisés.",
		`Question : ${userMessage}`,
	].join('\n\n')
}

async function getAiAnswer(userMessage: string): Promise<string> {
	console.log('Received user message for AI:', userMessage)
	const apiKey = process.env['GEMINI_API_KEY']
	if (!apiKey) {
		console.error('GEMINI_API_KEY is not set')
		throw new Error('GEMINI_API_KEY manquant')
	}

	console.log(`Calling Gemini API model ${geminiModel}...`)
	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1/models/${geminiModel}:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: buildGeminiPrompt(userMessage),
							},
						],
					},
				],
				generationConfig: {
					maxOutputTokens: maxGeminiOutputTokens,
					temperature: 0.1,
					topP: 0.95,
				},
			}),
		},
	)

	console.log('Gemini API response status:', response.status)

	if (!response.ok) {
		const errorText = await response.text()
		console.error(`Gemini API error ${response.status}:`, errorText)
		throw new Error(`Gemini API error ${response.status}: ${errorText}`)
	}

	const bodyText = await response.text()
	console.log('Gemini API response body:', bodyText.substring(0, 200))
	const result = JSON.parse(bodyText) as {
		candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }>
	}
	console.log('Parsed Gemini result:', result)
	const text = result.candidates?.[0]?.content?.parts
		?.map((part) => part.text ?? '')
		.join('')
		.trim()
	if (!text) {
		console.error('No text in response:', result)
		throw new Error('Aucune réponse reçue de l"IA')
	}
	if (result.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
		console.warn('Gemini response was cut by max output tokens')
	}
	console.log('Gemini returned text successfully')
	return text
}

/**
 * Handle all other requests by rendering the Angular application (if available, i.e., in SSR mode)
 */
app.use((req, res, next) => {
	if (!angularApp) {
		// In dev mode, return 404 for non-API routes
		return res.status(404).json({ error: 'Not found' })
	}
	return angularApp
		.handle(req)
		.then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
		.catch(next)
})

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
	const port = process.env['PORT'] || 4000
	initAngularAppPromise
		.then(() => {
			app.listen(port, (error) => {
				if (error) {
					throw error
				}

				console.log(`Node Express server listening on http://localhost:${port}`)
			})
		})
		.catch((error) => {
			console.error('Failed to initialize Angular SSR:', error)
			process.exit(1)
		})
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app)
