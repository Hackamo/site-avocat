import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import { join } from 'node:path'
import { GoogleGenAI } from '@google/genai'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const cwd = process.cwd()
const distFromCwd = cwd.endsWith('dist') ? cwd : resolve(scriptDir, 'dist')
const serverDistFolder = existsSync(distFromCwd) ? distFromCwd : scriptDir
const browserDistFolder = resolve(serverDistFolder, 'browser')

// Load environment variables from adjacent .env.local when present
try {
	const envPath = join(scriptDir, '../.env.local')
	config({ path: envPath })
	console.log('Loaded .env.local from', envPath)
} catch (e) {
	// ignore
}

const geminiModel = 'gemini-3.1-flash-lite'
const maxGeminiOutputTokens = 1024

function buildGeminiPrompt(userMessage) {
	return [
		'Tu es un assistant juridique spécialisé en droit des étrangers en France, de la famille et du handicap.',
		'Réponds de manière claire et très succinte.',
		'Limite-toi à 1024 mots maximum.',
		"Précise que les informations fournies ne remplacent pas un avis juridique professionnel, qu'elles sont à titre informatif uniquement et qu'il faut prendre rendez-vous avec un avocat pour des conseils juridiques personnalisés.",
		`Question : ${userMessage}`,
	].join('\n\n')
}

async function getAiAnswer(userMessage) {
	const apiKey = process.env['GEMINI_API_KEY']
	if (!apiKey) {
		console.error('GEMINI_API_KEY is not set')
		throw new Error('GEMINI_API_KEY manquant')
	}

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1/models/${geminiModel}:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [{ parts: [{ text: buildGeminiPrompt(userMessage) }] }],
				generationConfig: {
					maxOutputTokens: maxGeminiOutputTokens,
					temperature: 0.2,
					topP: 0.95,
				},
			}),
		},
	)

	if (!response.ok) {
		const errorText = await response.text()
		console.error(`Gemini API error ${response.status}:`, errorText)
		throw new Error(`Gemini API error ${response.status}: ${errorText}`)
	}

	const bodyText = await response.text()
	const result = JSON.parse(bodyText)
	const text = result.candidates?.[0]?.content?.parts
		?.map((p) => p.text || '')
		.join('')
		.trim()
	if (!text) throw new Error("Aucune réponse reçue de l'IA")
	return text
}

const app = express()
app.use(express.json())

// Simple in-memory rate limiter (per IP)
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60 // per window for normal endpoints
const RATE_LIMIT_STREAM_MAX_REQUESTS = 20 // per window for streaming endpoint

const rateMap = new Map()

function isRateLimited(ip, isStream = false) {
	const now = Date.now()
	const key = ip
	const entry = rateMap.get(key) || { count: 0, windowStart: now }

	// reset window if passed
	if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
		entry.count = 0
		entry.windowStart = now
	}

	entry.count += 1
	rateMap.set(key, entry)

	const limit = isStream ? RATE_LIMIT_STREAM_MAX_REQUESTS : RATE_LIMIT_MAX_REQUESTS
	const remaining = Math.max(0, limit - entry.count)
	const resetSeconds = Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000)

	return { limited: entry.count > limit, remaining, resetSeconds }
}

// Periodically clean old entries
setInterval(() => {
	const now = Date.now()
	for (const [key, entry] of rateMap.entries()) {
		if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 5) {
			rateMap.delete(key)
		}
	}
}, RATE_LIMIT_WINDOW_MS)
const PORT = process.env.PORT || 4000

// Security headers middleware
app.use((req, res, next) => {
	res.setHeader('X-Frame-Options', 'SAMEORIGIN')
	res.setHeader('X-Content-Type-Options', 'nosniff')
	res.setHeader('X-XSS-Protection', '1; mode=block')
	res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
	res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
	)
	next()
})

// Serve shared assets at the root (fonts, icons, images referenced as /assets/...)
app.use(
	'/assets',
	express.static(resolve(browserDistFolder, 'fr/assets'), {
		maxAge: '1y',
		fallthrough: true,
	}),
)
app.use(
	'/assets',
	express.static(resolve(browserDistFolder, 'en/assets'), {
		maxAge: '1y',
		fallthrough: true,
	}),
)

// Serve static files for French locale
app.use(
	'/fr',
	express.static(resolve(browserDistFolder, 'fr'), {
		maxAge: '1y',
		fallthrough: true,
	}),
)

// Serve static files for English locale
app.use(
	'/en',
	express.static(resolve(browserDistFolder, 'en'), {
		maxAge: '1y',
		fallthrough: true,
	}),
)

// Root redirect to French
app.get('/', (req, res) => {
	res.redirect(301, '/fr/')
})

// Accept API calls that are prefixed by locale (e.g. /fr/api/... or /en/api/...)
app.use(['/fr/api', '/en/api'], (req, res, next) => {
	// rewrite /fr/api/xxx -> /api/xxx so existing handlers work
	req.url = req.url.replace(/^\/(fr|en)\/api/, '/api')
	next()
})

// API: chat streaming (SSE)
app.get('/api/chat-stream', async (req, res) => {
	// Rate limit per IP
	const ip = req.ip || req.socket.remoteAddress || 'unknown'
	const rate = isRateLimited(ip, true)
	if (rate.limited) {
		res.setHeader('Retry-After', String(rate.resetSeconds))
		return res.status(429).json({ error: 'Too many requests' })
	}

	const userMessage = String(req.query?.['message'] || '').trim()
	if (!userMessage) return res.status(400).json({ error: 'Le message est requis.' })

	if (userMessage.length > 4000) return res.status(400).json({ error: 'Le message est trop long.' })

	const apiKey = process.env['GEMINI_API_KEY']
	if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY manquant' })

	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Cache-Control', 'no-cache, no-transform')
	res.setHeader('Connection', 'keep-alive')
	res.flushHeaders()

	try {
		const ai = new GoogleGenAI({ apiKey })
		const stream = await ai.models.generateContentStream({
			model: geminiModel,
			contents: buildGeminiPrompt(userMessage),
			config: { maxOutputTokens: maxGeminiOutputTokens, temperature: 0.1, topP: 0.95 },
		})

		for await (const chunk of stream) {
			const text = typeof chunk.text === 'string' ? chunk.text : ''
			if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`)
		}

		res.write('event: done\ndata: {}\n\n')
		res.end()
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('AI stream error:', errorMessage)
		res.write(`event: error\ndata: ${JSON.stringify({ error: errorMessage })}\n\n`)
		res.end()
	}
})

// API: non-streaming chat
app.post('/api/chat', async (req, res) => {
	// Rate limit per IP
	const ip = req.ip || req.socket.remoteAddress || 'unknown'
	const rate = isRateLimited(ip, false)
	if (rate.limited) {
		res.setHeader('Retry-After', String(rate.resetSeconds))
		return res.status(429).json({ error: 'Too many requests' })
	}

	const userMessage = String(req.body?.message || '').trim()
	if (!userMessage) return res.status(400).json({ error: 'Le message est requis.' })

	if (userMessage.length > 4000) return res.status(400).json({ error: 'Le message est trop long.' })

	try {
		const answer = await getAiAnswer(userMessage)
		return res.json({ answer })
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('AI proxy error:', errorMessage)
		return res.status(500).json({ error: 'Impossible de contacter le service IA pour le moment.' })
	}
})

// Fallback for French SPA routes - serve index.html
app.use('/fr', (req, res) => {
	res.sendFile(resolve(browserDistFolder, 'fr/index.html'))
})

// Fallback for English SPA routes - serve index.html
app.use('/en', (req, res) => {
	res.sendFile(resolve(browserDistFolder, 'en/index.html'))
})

// Start server
app.listen(PORT, () => {
	console.log(`✅ Static server running on http://localhost:${PORT}`)
	console.log(`   - French: http://localhost:${PORT}/fr/`)
	console.log(`   - English: http://localhost:${PORT}/en/`)
	console.log('')
	console.log('This serves the pre-rendered static build with SPA fallback routing.')
})
