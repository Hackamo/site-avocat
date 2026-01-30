import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ReadingTimeService {
	private readonly WORDS_PER_MINUTE = 200

	/**
	 * Calculate reading time in minutes for given text
	 * @param text - The text content to calculate reading time for
	 * @returns Reading time in minutes (minimum 1)
	 */
	calculateReadingTime(text: string): number {
		if (!text || !text.trim()) {
			return 0
		}

		// Remove HTML tags if present
		const plainText = text.replace(/<[^>]*>/g, '')

		// Count words (split by whitespace)
		const wordCount = plainText.trim().split(/\s+/).length

		// Calculate minutes and round up
		const minutes = Math.ceil(wordCount / this.WORDS_PER_MINUTE)

		return Math.max(1, minutes)
	}

	/**
	 * Format reading time for display
	 * @param minutes - Number of minutes
	 * @returns Formatted string like "5 min read" or "1 min read"
	 */
	formatReadingTime(minutes: number): string {
		if (!minutes || minutes < 1) {
			return "moins d'une minute"
		}

		if (minutes === 1) {
			return '1 min de lecture'
		}

		return `${minutes} min de lecture`
	}
}
