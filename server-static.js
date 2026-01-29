import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDistFolder = dirname(fileURLToPath(import.meta.url))
const browserDistFolder = resolve(serverDistFolder, 'browser')

const app = express()
const PORT = process.env.PORT || 4000

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
