import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

interface ArticleActionsData {
	slug: string
	title?: string
	url: string
	readingTime?: number
}
@Component({
	selector: 'app-article-actions-sheet',
	imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
	templateUrl: './article-actions-sheet.html',
	styleUrl: './article-actions-sheet.scss',
})
export class ArticleActionsSheet {
	constructor(
		private ref: MatBottomSheetRef<ArticleActionsSheet>,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: ArticleActionsData,
		private snack: MatSnackBar,
	) {}

	async share() {
		try {
			if ((navigator as any).share) {
				await (navigator as any).share({
					title: this.data.title,
					url: this.data.url,
				})
				this.close()
			} else {
				this.copyLink()
			}
		} catch (e) {
			console.error('Share failed', e)
			this.snack.open('Impossible de partager', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		}
	}

	async copyLink() {
		try {
			await navigator.clipboard.writeText(this.data.url)
			this.snack.open('Lien copié', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
			this.close()
		} catch (e) {
			console.error('Copy failed', e)
			this.snack.open('Erreur lors de la copie', '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		}
	}

	saveFav() {
		try {
			const key = 'saved-articles'
			const raw = localStorage.getItem(key)
			const list: string[] = raw ? JSON.parse(raw) : []
			if (!list.includes(this.data.slug)) {
				list.push(this.data.slug)
				localStorage.setItem(key, JSON.stringify(list))
				this.snack.open('Article ajouté aux favoris', '', {
					duration: 2000,
					verticalPosition: 'top',
					panelClass: ['favorite-snack-animation'],
				})
			} else {
				this.snack.open('Article déjà en favori', '', {
					duration: 2000,
					verticalPosition: 'top',
					panelClass: ['favorite-snack-animation'],
				})
			}
			this.close()
		} catch (e) {
			console.error('Save failed', e)
			this.snack.open("Erreur pour ajouter l'article aux favoris", '', {
				duration: 2000,
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		}
	}

	formatReadingTime(minutes?: number) {
		if (!minutes && minutes !== 0) return ''
		return `${minutes} min lecture`
	}

	close() {
		this.ref.dismiss()
	}
}
