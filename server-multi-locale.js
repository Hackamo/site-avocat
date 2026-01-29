import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node'
import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDistFolder = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 4000

// Detect locale from URL path or use default (French)
const getLocale = (url) => {
	if (url.startsWith('/en')) return 'en'
	return 'fr'
}

// Create Angular engines for each locale with proper configuration
const engines = {
	fr: new AngularNodeAppEngine(),
	en: new AngularNodeAppEngine(),
}

// Serve static files for each locale
app.use(
	'/fr',
	express.static(resolve(serverDistFolder, 'browser/fr'), {
		maxAge: '1y',
		index: 'index.html',
	}),
)

app.use(
	'/en',
	express.static(resolve(serverDistFolder, 'browser/en'), {
		maxAge: '1y',
		index: 'index.html',
	}),
)

// Root redirect to French
app.get('/', (req, res) => {
	res.redirect(301, '/fr/')
})

// Handle all requests with SSR
app.use('*', async (req, res, next) => {
	try {
		const locale = getLocale(req.url)
		const response = await engines[locale].handle(req)

		if (response) {
			writeResponseToNodeResponse(response, res)
		} else {
			next()
		}
	} catch (error) {
		next(error)
	}
})

// Error handler
app.use((err, req, res, next) => {
	console.error('Server error:', err)
	res.status(500).send('Internal Server Error')
})

// Start server
app.listen(PORT, () => {
	console.log(`✅ SSR server running on http://localhost:${PORT}`)
	console.log(`   - French: http://localhost:${PORT}/fr/`)
	console.log(`   - English: http://localhost:${PORT}/en/`)
})
