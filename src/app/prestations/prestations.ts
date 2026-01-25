import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { ServicesDataService } from '../services/services-data.service'

@Component({
	selector: 'app-services',
	standalone: true,
	imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './prestations.html',
	styleUrl: './prestations.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
	private servicesDataService = inject(ServicesDataService)

	services = this.servicesDataService.services()
}
