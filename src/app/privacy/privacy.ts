import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

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

	goBack() {
		this.location.back()
	}
}
