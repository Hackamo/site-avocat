import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { BlogArticle } from '../models/blog-article.model'

@Component({
	selector: 'app-blog-article-card',
	standalone: true,
	imports: [CommonModule, RouterModule, MatCardHeader, MatCardTitle, MatCardContent, MatCard],
	templateUrl: './blog-article-card.html',
	styleUrl: './blog-article-card.scss',
})
export class BlogArticleCard {
	@Input({ required: true }) article!: BlogArticle
}
