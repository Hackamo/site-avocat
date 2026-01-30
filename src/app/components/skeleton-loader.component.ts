import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'app-skeleton-loader',
	standalone: true,
	imports: [CommonModule, MatProgressSpinnerModule],
	template: `
		<div class="skeleton-container">
			<div class="loader-wrapper">
				<mat-spinner diameter="64"></mat-spinner>
				<p class="loader-text">{{ loadingText }}</p>
			</div>
		</div>
	`,
	styles: [
		`
			.skeleton-container {
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 400px;
				padding: 2rem;
				animation: fadeIn 0.3s ease-in;
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			.loader-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1.5rem;
			}

			.loader-text {
				color: var(--mat-sys-on-surface-variant);
				font-size: 1rem;
				margin: 0;
				text-align: center;
				animation: pulse 1.5s ease-in-out infinite;
			}

			@keyframes pulse {
				0%,
				100% {
					opacity: 0.7;
				}
				50% {
					opacity: 1;
				}
			}
		`,
	],
})
export class SkeletonLoaderComponent {
	readonly loadingText = 'Chargement...'
}
