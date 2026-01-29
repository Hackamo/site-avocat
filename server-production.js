import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDistFolder = dirname(fileURLToPath(import.meta.url))
const browserDistFolder = resolve(serverDistFolder, 'browser')

const app = express()
const PORT = process.env.PORT || 3000

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
