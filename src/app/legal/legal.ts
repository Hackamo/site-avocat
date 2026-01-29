import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CONTACT_CONFIG } from '../config/contact.config'
import { MetaService } from '../services/meta.service'

@Component({
	selector: 'app-legal',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: './legal.html',
	styleUrl: './legal.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalComponent {
	private readonly location = inject(Location)
	private readonly metaService = inject(MetaService)
	contactConfig = CONTACT_CONFIG

	constructor() {
		this.metaService.updateMetaTags('legal')
	}

	goBack() {
		this.location.back()
	}
}
