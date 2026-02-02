import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy, inject, computed, input } from '@angular/core'
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { BlogArticle } from '../models/blog-article.model'
import { ReadingTimeService } from '../services/reading-time.service'
import { MatButtonModule } from '@angular/material/button'
import { SavedArticlesService } from '../services/saved-articles.service'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
	selector: 'app-blog-article-card',
	templateUrl: './blog-article-card.html',
	styleUrl: './blog-article-card.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		RouterModule,
		MatCardHeader,
		MatCardTitle,
		MatCardContent,
		MatCard,
		MatIconModule,
		MatButtonModule,
		MatSnackBarModule,
	],
})
export class BlogArticleCard {
	readonly article = input.required<BlogArticle>()

	private readonly readingTimeService = inject(ReadingTimeService)
	private readonly savedService = inject(SavedArticlesService)
	private readonly snack = inject(MatSnackBar)

	readonly isFavorite = computed(() => this.savedService.isSaved(this.article()?.slug))

	readonly readingTimeText = computed(() => {
		const article = this.article()
		return article?.readingTime ? this.readingTimeService.formatReadingTime(article.readingTime) : ''
	})

	toggleFavorite(event: Event) {
		event.preventDefault()
		event.stopPropagation()
		const article = this.article()
		if (!article) return
		const added = this.savedService.toggle(article.slug)
		this.snack.open(added ? 'Article ajouté aux favoris' : 'Article retiré des favoris', '', {
			duration: 2000,
			verticalPosition: 'top',
			panelClass: ['favorite-snack-animation'],
		})
	}
}
