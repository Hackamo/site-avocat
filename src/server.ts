import {
	AngularNodeAppEngine,
	createNodeRequestHandler,
	isMainModule,
	writeResponseToNodeResponse,
} from '@angular/ssr/node'
import express from 'express'
import { join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { promises as fs } from 'node:fs'
import multer from 'multer'

const browserDistFolder = join(import.meta.dirname, '../browser')
const blogDir = join(browserDistFolder, 'assets/blog')
const metadataPath = join(blogDir, 'articles-config.json')

const app = express()
const angularApp = new AngularNodeAppEngine()

// Middleware for parsing JSON and handling file uploads
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' })

const ensureBlogDir = () => {
	if (!existsSync(blogDir)) {
		mkdirSync(blogDir, { recursive: true })
	}
}

/**
 * API endpoint for uploading blog markdown files
 */
app.post('/api/upload-blog-file', upload.single('file'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No file provided' })
		}

		ensureBlogDir()

		const fileName = req.file.originalname
		const filePath = join(blogDir, fileName)

		// Move uploaded file to blog directory
		await fs.copyFile(req.file.path, filePath)
		await fs.unlink(req.file.path) // Clean up temp file

		return res.json({ success: true, fileName })
	} catch (error) {
		console.error('File upload error:', error)
		return res.status(500).json({ error: 'Failed to upload file' })
	}
})

/**
 * API endpoints for reading/writing blog metadata
 */
app.get('/api/blog-metadata', async (_req, res) => {
	try {
		ensureBlogDir()
		const fileExists = existsSync(metadataPath)
		if (!fileExists) {
			await fs.writeFile(metadataPath, '[]', 'utf8')
		}
		const raw = await fs.readFile(metadataPath, 'utf8')
		const data = raw ? JSON.parse(raw) : []
		return res.json(data)
	} catch (error) {
		console.error('Failed to read blog metadata:', error)
		return res.status(500).json({ error: 'Failed to read metadata' })
	}
})

app.post('/api/blog-metadata', async (req, res) => {
	try {
		ensureBlogDir()
		const payload = req.body
		if (!Array.isArray(payload)) {
			return res.status(400).json({ error: 'Metadata must be an array' })
		}
		await fs.writeFile(metadataPath, JSON.stringify(payload, null, 2), 'utf8')
		return res.json({ success: true })
	} catch (error) {
		console.error('Failed to write blog metadata:', error)
		return res.status(500).json({ error: 'Failed to write metadata' })
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

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
	angularApp
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
	app.listen(port, (error) => {
		if (error) {
			throw error
		}

		console.log(`Node Express server listening on http://localhost:${port}`)
	})
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app)
