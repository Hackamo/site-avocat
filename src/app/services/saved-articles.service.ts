import { Injectable, inject, PLATFORM_ID } from '@angular/core'
import { signal, computed } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({ providedIn: 'root' })
export class SavedArticlesService {
	private readonly STORAGE_KEY = 'saved-articles'
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	private _saved = signal<string[]>([])
	readonly saved = this._saved.asReadonly()

	constructor() {
		if (!this.isBrowser) return
		try {
			const raw = localStorage.getItem(this.STORAGE_KEY)
			if (raw) {
				this._saved.set(JSON.parse(raw))
			}
		} catch (e) {
			console.warn('Failed to read saved articles from localStorage', e)
		}
	}

	isSaved(slug: string | undefined): boolean {
		if (!slug) return false
		return this._saved().includes(slug)
	}

	toggle(slug: string): boolean {
		const list = [...this._saved()]
		const idx = list.indexOf(slug)
		let added = false
		if (idx === -1) {
			list.push(slug)
			added = true
		} else {
			list.splice(idx, 1)
		}
		this._saved.set(list)
		if (this.isBrowser) {
			try {
				localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list))
			} catch (e) {
				console.warn('Failed to persist saved articles', e)
			}
		}
		return added
	}

	getAll(): string[] {
		return [...this._saved()]
	}
}
