import { Component, inject } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ServicesDataService } from '../services/services-data.service'

@Component({
	selector: 'app-home',
	imports: [
		// Imports pour Angular Material
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		NgOptimizedImage,
		CommonModule,
		RouterLink,
	],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	private servicesDataService = inject(ServicesDataService)

	services = this.servicesDataService.services()
}
