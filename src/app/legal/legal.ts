import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

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

	goBack() {
		this.location.back()
	}
}
