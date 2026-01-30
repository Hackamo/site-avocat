import { Component, ChangeDetectionStrategy } from '@angular/core'
import { RouterModule, Router } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
	template: `
		<main class="not-found-container">
			<div class="not-found-content">
				<div class="not-found-icon">
					<mat-icon>error_outline</mat-icon>
				</div>
				<h1 class="mat-display-1" i18n="404 page|Main heading">Page non trouvée</h1>
				<p class="mat-headline-5" i18n="404 page|Subtitle">Désolé, la page que vous recherchez n'existe pas.</p>
				<p class="error-code" i18n="404 page|Error code">Erreur 404</p>

				<div class="action-buttons">
					<button mat-raised-button color="primary" routerLink="/" i18n="404 page|Home button">
						<mat-icon>home</mat-icon>
						<span>Retour à l'accueil</span>
					</button>
					<button mat-stroked-button (click)="goBack()" i18n="404 page|Back button">
						<mat-icon>arrow_back</mat-icon>
						<span>Retour</span>
					</button>
				</div>

				<div class="suggestions">
					<p class="mat-body-medium" i18n="404 page|Suggestions label">Peut-être cherchez-vous :</p>
					<nav class="suggestion-links">
						<a mat-button routerLink="/" i18n="404 page|Suggestion home">Accueil</a>
						<a mat-button routerLink="/prestations" i18n="404 page|Suggestion services">Nos Prestations</a>
						<a mat-button routerLink="/blog" i18n="404 page|Suggestion blog">Blog</a>
						<a mat-button routerLink="/a-propos" i18n="404 page|Suggestion about">À Propos</a>
						<a mat-button routerLink="/contact" i18n="404 page|Suggestion contact">Contact</a>
					</nav>
				</div>
			</div>
		</main>
	`,
	styles: [
		`
			.not-found-container {
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: calc(100vh - 200px);
				padding: 2rem;
				animation: fadeIn 0.5s ease-in;
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
					transform: translateY(20px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.not-found-content {
				text-align: center;
				max-width: 600px;
			}

			.not-found-icon {
				font-size: 5rem;
				color: var(--mat-sys-error);
				margin-bottom: 1rem;
				display: flex;
				justify-content: center;

				mat-icon {
					font-size: 5rem;
					width: 5rem;
					height: 5rem;
				}
			}

			h1 {
				margin: 1rem 0 0.5rem;
				color: var(--mat-sys-on-surface);
			}

			.mat-headline-5 {
				color: var(--mat-sys-on-surface-variant);
				margin: 0 0 1.5rem;
			}

			.error-code {
				font-size: 1.25rem;
				font-weight: 600;
				color: var(--mat-sys-error);
				margin-bottom: 2rem;
			}

			.action-buttons {
				display: flex;
				gap: 1rem;
				justify-content: center;
				margin-bottom: 2rem;
				flex-wrap: wrap;
			}

			button {
				mat-icon {
					margin-right: 0.5rem;
				}
			}

			.suggestions {
				margin-top: 3rem;
				padding-top: 2rem;
				border-top: 1px solid var(--mat-sys-outline-variant);
			}

			.suggestion-links {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				align-items: center;
				margin-top: 1rem;

				a {
					text-decoration: none;
				}
			}

			@media (max-width: 600px) {
				.not-found-container {
					min-height: calc(100vh - 150px);
				}

				.not-found-icon {
					font-size: 3rem;

					mat-icon {
						font-size: 3rem;
						width: 3rem;
						height: 3rem;
					}
				}

				.action-buttons {
					flex-direction: column;
				}

				button {
					width: 100%;
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
	constructor(private router: Router) {}

	goBack(): void {
		this.router.navigate(['/'])
	}
}
