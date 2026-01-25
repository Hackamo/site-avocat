import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { CommonModule, NgOptimizedImage } from '@angular/common'

@Component({
	selector: 'app-about',
	imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, NgOptimizedImage],
	templateUrl: './about.html',
	styleUrl: './about.scss',
})
export class About {}
