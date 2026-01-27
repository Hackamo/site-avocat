import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
	selector: 'app-legal',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<div class="container">
			<button mat-button (click)="goBack()" aria-label="Revenir à la page précédente" class="back-button">
				<mat-icon>arrow_back</mat-icon>Revenir
			</button>
			<h1>Mentions Légales</h1>

			<section>
				<h2>Informations légales et d'identification</h2>
				<p><strong>Cabinet Martinet</strong></p>
				<p>
					Adresse : 5 Avenue de la République, 33000 Bordeaux<br />
					Téléphone : 01 23 45 67 89<br />
					Email : contact@cabinet-martinet.fr
				</p>
				<p>
					<strong>Responsable de la publication :</strong> Maître [Nom]<br />
					<strong>Statut :</strong> Avocat inscrit au Barreau de Bordeaux<br />
					<strong>Numéro SIRET :</strong> [À compléter]
				</p>
			</section>

			<section>
				<h2>Conditions d'utilisation</h2>
				<p>
					L'accès et l'utilisation de ce site web sont soumis aux présentes conditions d'utilisation. En
					accédant à ce site, vous acceptez ces conditions.
				</p>
				<p>
					Le Cabinet Martinet s'efforce de fournir des informations exactes et à jour. Cependant, nous
					déclinons toute responsabilité en cas d'erreurs, omissions ou inexactitudes.
				</p>
			</section>

			<section>
				<h2>Droits d'auteur et propriété intellectuelle</h2>
				<p>
					Tous les contenus du site (textes, images, logos, etc.) sont protégés par les droits d'auteur. Toute
					reproduction, distribution ou utilisation du contenu sans autorisation préalable est interdite.
				</p>
				<p>© 2026 Cabinet Martinet. Tous droits réservés.</p>
			</section>

			<section>
				<h2>Responsabilité</h2>
				<p>
					Le Cabinet Martinet décline toute responsabilité quant aux dommages directs ou indirects causés par
					l'utilisation ou l'impossibilité d'utiliser le site. Les informations fournies sur ce site ne
					constituent pas un conseil juridique professionnel.
				</p>
				<p>
					Pour obtenir un conseil juridique, veuillez contacter directement le cabinet via le formulaire de
					contact ou par téléphone.
				</p>
			</section>

			<section>
				<h2>Hébergement</h2>
				<p>
					<strong>Hébergeur :</strong> GitHub Pages<br />
					<strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
				</p>
			</section>

			<section>
				<h2>Lois applicables</h2>
				<p>Ce site est soumis aux lois françaises et à la juridiction des tribunaux compétents de Bordeaux.</p>
			</section>

			<section>
				<h2>Cookies</h2>
				<p>
					Ce site utilise des cookies pour améliorer votre expérience utilisateur. En continuant à utiliser ce
					site, vous acceptez notre utilisation de cookies. Consultez notre
					<a href="/politique-confidentialite">Politique de Confidentialité</a> pour plus de détails.
				</p>
			</section>

			<section>
				<h2>Contact</h2>
				<p>
					Pour toute question concernant ces mentions légales, veuillez nous contacter à l'adresse email
					suivante :
					<a href="mailto:legal@cabinet-martinet.fr">legal@cabinet-martinet.fr</a>
				</p>
			</section>
		</div>
	`,
	styles: `
		.container {
			max-width: 900px;
			margin: 2rem auto;
			padding: 2rem;
		}

		h1 {
			font-size: 2.5rem;
			margin-bottom: 2rem;
			color: var(--mat-button-filled-container-color);
		}

		h2 {
			font-size: 1.5rem;
			margin-top: 2rem;
			margin-bottom: 1rem;
			color: var(--mat-button-filled-container-color);
		}

		section {
			margin-bottom: 2rem;
			line-height: 1.8;
		}

		p {
			margin-bottom: 1rem;
		}

		a {
			color: var(--mat-sys-primary);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}

		.back-button {
			margin-bottom: 2rem;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalComponent {
	private readonly location = inject(Location)

	goBack() {
		this.location.back()
	}
}
