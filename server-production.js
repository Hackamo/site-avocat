import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDistFolder = dirname(fileURLToPath(import.meta.url))
const browserDistFolder = resolve(serverDistFolder, 'browser')

const app = express()
const PORT = process.env.PORT || 3000

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

// Import locale-specific server bundles
const frServer = await import('./server/fr/server.mjs')
const enServer = await import('./server/en/server.mjs')

// Serve static files from browser/fr and browser/en
app.use('/fr', express.static(resolve(browserDistFolder, 'fr'), { maxAge: '1y', index: false }))
app.use('/en', express.static(resolve(browserDistFolder, 'en'), { maxAge: '1y', index: false }))

// Shared assets at root level
app.use('/assets', express.static(resolve(browserDistFolder, 'fr/assets'), { maxAge: '1y' }))

// Root redirect to French
app.get('/', (req, res) => {
	res.redirect(301, '/fr/')
})

// French SSR routes
app.get('/fr/*', (req, res, next) => {
	const { protocol, originalUrl, baseUrl, headers } = req

	frServer.app()(req, res, next)
})

// English SSR routes
app.get('/en/*', (req, res, next) => {
	const { protocol, originalUrl, baseUrl, headers } = req

	enServer.app()(req, res, next)
})

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server listening on http://localhost:${PORT}`)
	console.log(`🇫🇷 French: http://localhost:${PORT}/fr/`)
	console.log(`🇬🇧 English: http://localhost:${PORT}/en/`)
})
