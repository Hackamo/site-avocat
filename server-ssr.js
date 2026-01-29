import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node'
import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDistFolder = dirname(fileURLToPath(import.meta.url))
const browserDistFolder = resolve(serverDistFolder, 'browser')

const app = express()
const PORT = process.env.PORT || 4000

// Create separate Angular engines for each locale
const frAngularApp = new AngularNodeAppEngine()
const enAngularApp = new AngularNodeAppEngine()

// Serve static files from browser/fr and browser/en
app.use(
	'/fr',
	express.static(resolve(browserDistFolder, 'fr'), {
		maxAge: '1y',
		index: false,
		redirect: false,
	}),
)

app.use(
	'/en',
	express.static(resolve(browserDistFolder, 'en'), {
		maxAge: '1y',
		index: false,
		redirect: false,
	}),
)

// Root redirect to French
app.get('/', (req, res) => {
	res.redirect(301, '/fr/')
})

// French SSR routes - handle all /fr/* requests through Angular engine
app.use('/fr', (req, res, next) => {
	// Adjust the request URL to remove the /fr prefix for Angular routing
	const originalUrl = req.url
	req.url = originalUrl === '/' ? '/' : originalUrl

	frAngularApp
		.handle(req)
		.then((response) => {
			if (response) {
				writeResponseToNodeResponse(response, res)
			} else {
				next()
			}
		})
		.catch(next)
})

// English SSR routes - handle all /en/* requests through Angular engine
app.use('/en', (req, res, next) => {
	// Adjust the request URL to remove the /en prefix for Angular routing
	const originalUrl = req.url
	req.url = originalUrl === '/' ? '/' : originalUrl

	enAngularApp
		.handle(req)
		.then((response) => {
			if (response) {
				writeResponseToNodeResponse(response, res)
			} else {
				next()
			}
		})
		.catch(next)
})

// Start server
app.listen(PORT, () => {
	console.log(`✅ Multi-locale SSR server running on http://localhost:${PORT}`)
	console.log(`   - French: http://localhost:${PORT}/fr/`)
	console.log(`   - English: http://localhost:${PORT}/en/`)
})
