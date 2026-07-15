import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { MetaService } from '../services/meta.service'
import { AnimateText } from '../directives/animate-text.directive'

@Component({
	selector: 'app-honoraires',
	imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink, AnimateText],
	templateUrl: './honoraires.html',
	styleUrl: './honoraires.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HonorairesComponent {
	private readonly location = inject(Location)
	private readonly metaService = inject(MetaService)

	readonly legalAidSimulatorUrl = 'https://www.service-public.fr/particuliers/vosdroits/R1444'

	constructor() {
		this.metaService.updateMetaTags('honoraires')
	}

	goBack() {
		this.location.back()
	}
}
