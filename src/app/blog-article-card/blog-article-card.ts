import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BlogArticle } from '../models/blog-article.model'

@Component({
	selector: 'app-blog-article-card',
	standalone: true,
	templateUrl: './blog-article-card.html',
	styleUrl: './blog-article-card.scss',
	imports: [CommonModule, RouterModule, MatCardHeader, MatCardTitle, MatCardContent, MatCard, TranslateModule],
})
export class BlogArticleCard {
	@Input({ required: true }) article!: BlogArticle
}
