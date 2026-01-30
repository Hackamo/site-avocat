#!/usr/bin/env node

const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

// Get all JPG/PNG files in src/assets
const assetsDir = path.join(__dirname, '../src/assets')

function getAllImages(dir) {
	const files = []
	const items = fs.readdirSync(dir)
	for (const item of items) {
		const fullPath = path.join(dir, item)
		const stat = fs.statSync(fullPath)
		if (stat.isDirectory()) {
			files.push(...getAllImages(fullPath))
		} else if (/\.(jpe?g|png)$/i.test(item)) {
			files.push(fullPath)
		}
	}
	return files
}

const imageFiles = getAllImages(assetsDir)

async function convertToWebP(inputPath) {
	const outputPath = inputPath.replace(/\.(jpe?g|png)$/i, '.webp')
	const fileName = path.basename(inputPath)
	const outputFileName = path.basename(outputPath)

	try {
		const inputStats = fs.statSync(inputPath)
		const inputSizeKb = (inputStats.size / 1024).toFixed(2)

		await sharp(inputPath).webp({ quality: 80, effort: 6 }).toFile(outputPath)

		const outputStats = fs.statSync(outputPath)
		const outputSizeKb = (outputStats.size / 1024).toFixed(2)
		const reduction = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1)

		console.log(`✓ ${fileName} → ${outputFileName} | ${inputSizeKb}KB → ${outputSizeKb}KB (${reduction}% smaller)`)
	} catch (error) {
		console.error(`✗ Failed to convert ${fileName}:`, error.message)
	}
}

async function main() {
	if (imageFiles.length === 0) {
		console.log('No images found in src/assets')
		return
	}

	console.log(`Found ${imageFiles.length} images to convert...\n`)

	for (const file of imageFiles) {
		await convertToWebP(file)
	}

	console.log('\nConversion complete!')
}

main()
