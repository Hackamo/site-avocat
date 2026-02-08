#!/usr/bin/env node

const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const os = require('os')

// Target width for resizing
const TARGET_WIDTH = 1200

// Blog images directory (WebP only)
const blogImagesDir = path.join(__dirname, '../src/assets/blog/images/webp')
const blogImagesOutputDir = path.join(__dirname, '../src/assets/blog/images/webp1200')

const isWindows = os.platform() === 'win32'

function getAllImages(dir) {
	const files = []
	try {
		const items = fs.readdirSync(dir)
		for (const item of items) {
			const fullPath = path.join(dir, item)
			const stat = fs.statSync(fullPath)
			if (stat.isDirectory()) {
				files.push(...getAllImages(fullPath))
			} else if (/\.webp$/i.test(item)) {
				files.push(fullPath)
			}
		}
	} catch (error) {
		console.error(`Error reading directory ${dir}:`, error.message)
	}
	return files
}

function safeUnlink(filePath, label = 'file') {
	try {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
			return true
		}
	} catch (error) {
		if (isWindows) {
			// On Windows, try waiting a bit for file locks to clear
			try {
				const maxRetries = 3
				for (let i = 0; i < maxRetries; i++) {
					try {
						fs.unlinkSync(filePath)
						return true
					} catch (retryError) {
						if (i < maxRetries - 1) {
							// Wait a bit before retrying
							const waitTime = 100 * (i + 1)
							console.warn(`  ⚠ Retry ${i + 1}/${maxRetries} - waiting ${waitTime}ms...`)
							// Simple busy wait (not ideal but works for Windows locks)
							const start = Date.now()
							while (Date.now() - start < waitTime) {}
						}
					}
				}
			} catch (retryError) {
				console.warn(`  ⚠ Could not delete ${label} after retries: ${error.message}`)
				return false
			}
		} else {
			console.warn(`  ⚠ Could not delete ${label}: ${error.message}`)
			return false
		}
	}
	return false
}

async function resizeAndConvertToWebP(inputPath) {
	const fileName = path.basename(inputPath)
	const nameWithoutExt = path.parse(fileName).name
	const ext = path.parse(fileName).ext.toLowerCase()

	try {
		// Check if file exists and is readable
		if (!fs.existsSync(inputPath)) {
			console.error(`✗ File not found: ${fileName}`)
			return
		}

		const stats = fs.statSync(inputPath)
		if (stats.size === 0) {
			console.warn(`⚠ Skipping empty file: ${fileName}`)
			return
		}

		// Get original dimensions
		let metadata
		try {
			metadata = await sharp(inputPath).metadata()
		} catch (metaError) {
			console.error(`✗ Could not read image ${fileName}: ${metaError.message}`)
			console.error(`  File size: ${stats.size} bytes, Format: ${ext}`)
			return
		}

		const originalWidth = metadata.width
		const originalHeight = metadata.height

		// Skip if already at or below target width
		if (originalWidth <= TARGET_WIDTH) {
			console.log(`⊘ ${fileName} (${originalWidth}×${originalHeight}) - Already ≤ ${TARGET_WIDTH}px width`)
			return
		}

		// Calculate new height maintaining aspect ratio
		const newHeight = Math.round((TARGET_WIDTH / originalWidth) * originalHeight)

		// Output path (keep .webp, write into webp1200 folder)
		const outputPath = path.join(blogImagesOutputDir, nameWithoutExt + '.webp')
		const tempPath = outputPath + '.tmp'

		// Resize and convert to WebP
		try {
			await sharp(inputPath)
				.resize(TARGET_WIDTH, newHeight, {
					fit: 'inside',
					withoutEnlargement: true,
				})
				.webp({ quality: 80, effort: 6 })
				.toFile(tempPath)
		} catch (processError) {
			console.error(`✗ Processing failed for ${fileName}: ${processError.message}`)
			safeUnlink(tempPath, 'temp file')
			return
		}

		// Verify temp file
		if (!fs.existsSync(tempPath)) {
			console.error(`✗ Temp file not created for ${fileName}`)
			return
		}

		const tempStats = fs.statSync(tempPath)
		if (tempStats.size === 0) {
			console.error(`✗ Temp file is empty for ${fileName}`)
			safeUnlink(tempPath, 'empty temp file')
			return
		}

		// Ensure output directory exists
		const outputDir = path.dirname(outputPath)
		if (!fs.existsSync(outputDir)) {
			try {
				fs.mkdirSync(outputDir, { recursive: true })
			} catch (mkdirError) {
				console.error(`✗ Could not create output directory: ${mkdirError.message}`)
				safeUnlink(tempPath, 'temp file')
				return
			}
		}

		// Copy temp to output (with retries for Windows)
		let copySuccess = false
		const maxCopyRetries = 3
		for (let attempt = 0; attempt < maxCopyRetries; attempt++) {
			try {
				// Delete existing output file first (Windows compatibility)
				if (fs.existsSync(outputPath)) {
					try {
						fs.unlinkSync(outputPath)
					} catch (unlinkError) {
						if (isWindows && attempt < maxCopyRetries - 1) {
							const waitTime = 200 * (attempt + 1)
							console.warn(`  ⚠ Waiting ${waitTime}ms for file lock to clear...`)
							const start = Date.now()
							while (Date.now() - start < waitTime) {}
							continue
						}
						throw unlinkError
					}
				}

				// Copy the temp file to output
				fs.copyFileSync(tempPath, outputPath)
				copySuccess = true
				break
			} catch (copyError) {
				if (attempt < maxCopyRetries - 1 && isWindows) {
					const waitTime = 200 * (attempt + 1)
					console.warn(`  ⚠ Copy attempt ${attempt + 1}/${maxCopyRetries} failed, waiting ${waitTime}ms...`)
					const start = Date.now()
					while (Date.now() - start < waitTime) {}
				} else {
					console.error(`✗ Could not write output for ${fileName}: ${copyError.message}`)
					console.error(`  Output path: ${outputPath}`)
					console.error(`  Temp path: ${tempPath}`)
					safeUnlink(tempPath, 'temp file')
					return
				}
			}
		}

		if (!copySuccess) {
			console.error(`✗ Failed to copy output after ${maxCopyRetries} attempts`)
			safeUnlink(tempPath, 'temp file')
			return
		}

		// Clean up temp file
		safeUnlink(tempPath, 'temp file')

		const newStats = fs.statSync(outputPath)
		const newSizeKb = (newStats.size / 1024).toFixed(2)
		const savingsPercent = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1)

		console.log(
			`✓ ${fileName} → ${nameWithoutExt}.webp | ${originalWidth}×${originalHeight} → ${TARGET_WIDTH}×${newHeight} | ${newSizeKb}KB (${savingsPercent}% smaller)`,
		)
	} catch (error) {
		console.error(`✗ Failed to process ${fileName}:`, error.message)
		if (error.code) {
			console.error(`  Error code: ${error.code}`)
		}
	}
}

async function main() {
	console.log(`\n${'='.repeat(70)}`)
	console.log(`🖼️  Image Resize & Convert to WebP`)
	console.log(`${'='.repeat(70)}`)
	console.log(`Input directory: ${blogImagesDir}`)
	console.log(`Output directory: ${blogImagesOutputDir}`)
	console.log(`Target width: ${TARGET_WIDTH}px (maintaining aspect ratio)`)
	console.log(`Platform: ${isWindows ? 'Windows' : 'Unix/Linux'}\n`)

	if (!fs.existsSync(blogImagesDir)) {
		console.error(`✗ Blog images directory not found: ${blogImagesDir}`)
		process.exit(1)
	}

	if (!fs.existsSync(blogImagesOutputDir)) {
		try {
			fs.mkdirSync(blogImagesOutputDir, { recursive: true })
		} catch (mkdirError) {
			console.error(`✗ Could not create output directory: ${mkdirError.message}`)
			process.exit(1)
		}
	}

	const imageFiles = getAllImages(blogImagesDir)

	if (imageFiles.length === 0) {
		console.log('⚠ No images found in blog images directory')
		return
	}

	console.log(`Found ${imageFiles.length} image(s)\n`)

	let successCount = 0
	let skipCount = 0
	let errorCount = 0

	for (const file of imageFiles) {
		const originalSize = fs.statSync(file).size
		await resizeAndConvertToWebP(file)
		const finalFile = path.join(blogImagesOutputDir, path.basename(file))
		if (fs.existsSync(finalFile) && fs.statSync(finalFile).size > 0) {
			successCount++
		} else if (fs.existsSync(file)) {
			skipCount++
		} else {
			errorCount++
		}
	}

	console.log(`\n${'='.repeat(70)}`)
	console.log(`✅ Complete! | Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`)
	console.log(`${'='.repeat(70)}\n`)
}

main().catch((error) => {
	console.error('Fatal error:', error)
	process.exit(1)
})
