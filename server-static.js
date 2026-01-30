import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const cwd = process.cwd()
const distFromCwd = cwd.endsWith('dist') ? cwd : resolve(scriptDir, 'dist')
const serverDistFolder = existsSync(distFromCwd) ? distFromCwd : scriptDir
const browserDistFolder = resolve(serverDistFolder, 'browser')

const app = express()
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
