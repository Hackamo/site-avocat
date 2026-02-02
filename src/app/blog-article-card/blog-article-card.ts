import { CommonModule } from '@angular/common'
import { Component, Input, inject, computed } from '@angular/core'
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { BlogArticle } from '../models/blog-article.model'
import { ReadingTimeService } from '../services/reading-time.service'
import { MatButtonModule } from '@angular/material/button'
import { SavedArticlesService } from '../services/saved-articles.service'

@Component({
	selector: 'app-blog-article-card',
	standalone: true,
	templateUrl: './blog-article-card.html',
	styleUrl: './blog-article-card.scss',
	imports: [
		CommonModule,
		RouterModule,
		MatCardHeader,
		MatCardTitle,
		MatCardContent,
		MatCard,
		MatIconModule,
		MatButtonModule,
	],
})
export class BlogArticleCard {
	@Input({ required: true }) article!: BlogArticle

	private readonly readingTimeService = inject(ReadingTimeService)
	private readonly savedService = inject(SavedArticlesService)

	readonly isFavorite = computed(() => this.savedService.isSaved(this.article?.slug))

	readonly readingTimeText = computed(() => {
		return this.article?.readingTime ? this.readingTimeService.formatReadingTime(this.article.readingTime) : ''
	})

	toggleFavorite(event: Event) {
		event.preventDefault()
		event.stopPropagation()
		if (!this.article) return
		this.savedService.toggle(this.article.slug)
	}
}
