import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CONTACT_CONFIG } from '../config/contact.config'
import { MetaService } from '../services/meta.service'

@Component({
	selector: 'app-privacy',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: './privacy.html',
	styleUrl: './privacy.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
	private readonly location = inject(Location)
	private readonly metaService = inject(MetaService)
	contactConfig = CONTACT_CONFIG

	constructor() {
		this.metaService.updateMetaTags('privacy')
	}

	goBack() {
		this.location.back()
	}
}
