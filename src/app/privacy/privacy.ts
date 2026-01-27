import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
	selector: 'app-privacy',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	template: `
		<div class="container">
			<button mat-button (click)="goBack()" aria-label="Revenir à la page précédente" class="back-button">
				<mat-icon>arrow_back</mat-icon>Revenir
			</button>
			<h1>Politique de Confidentialité</h1>

			<section>
				<h2>1. Responsable du traitement des données</h2>
				<p>
					<strong>Cabinet Martinet</strong><br />
					5 Avenue de la République<br />
					33000 Bordeaux, France<br />
					Email : contact@cabinet-martinet.fr<br />
					Téléphone : 01 23 45 67 89
				</p>
				<p>
					Le Cabinet Martinet est responsable du traitement de vos données personnelles conformément à la Loi
					Informatique et Libertés et au Règlement Général sur la Protection des Données (RGPD).
				</p>
			</section>

			<section>
				<h2>2. Données collectées</h2>
				<p>Nous collectons les catégories de données suivantes :</p>
				<ul>
					<li>
						<strong>Via le formulaire de contact :</strong> Nom, Prénom, Email, Numéro de téléphone, Message
					</li>
					<li><strong>Via les cookies :</strong> Adresse IP, Type de navigateur, Informations de session</li>
					<li>
						<strong>Via les logs du serveur :</strong> Données d'accès au site (URLs visitées, horodatage)
					</li>
				</ul>
			</section>

			<section>
				<h2>3. Finalités du traitement</h2>
				<p>Vos données sont traitées pour :</p>
				<ul>
					<li>Vous contacter en réponse à votre demande via le formulaire</li>
					<li>Améliorer votre expérience utilisateur et la performance du site</li>
					<li>Analyser l'utilisation du site pour des statistiques internes</li>
					<li>Respecter nos obligations légales et réglementaires</li>
				</ul>
			</section>

			<section>
				<h2>4. Fondement juridique</h2>
				<p>Le traitement de vos données repose sur :</p>
				<ul>
					<li>
						<strong>Votre consentement explicite</strong> : Lorsque vous remplissez un formulaire de contact
					</li>
					<li><strong>L'intérêt légitime</strong> : Pour améliorer nos services et analyser le site</li>
					<li>
						<strong>Nos obligations légales</strong> : Conservation des données conformément aux lois
						applicables
					</li>
				</ul>
			</section>

			<section>
				<h2>5. Durée de conservation des données</h2>
				<ul>
					<li>
						<strong>Données du formulaire de contact :</strong> 3 années civiles (conformément à nos
						obligations légales)
					</li>
					<li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
					<li><strong>Logs serveur :</strong> Conservés 90 jours maximum</li>
				</ul>
			</section>

			<section>
				<h2>6. Destinataires des données</h2>
				<p>Vos données personnelles ne sont partagées que dans les cas suivants :</p>
				<ul>
					<li>Avec les avocats du Cabinet Martinet pour répondre à votre demande</li>
					<li>Avec les autorités compétentes si requis par la loi</li>
					<li>Avec notre hébergeur (GitHub Pages) pour la continuité du service</li>
				</ul>
				<p><strong>Pas de transfert hors de l'Union Européenne sans garanties appropriées.</strong></p>
			</section>

			<section>
				<h2>7. Vos droits</h2>
				<p>Conformément au RGPD, vous disposez des droits suivants :</p>
				<ul>
					<li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
					<li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
					<li><strong>Droit à l'oubli :</strong> Demander la suppression de vos données</li>
					<li>
						<strong>Droit à la limitation du traitement :</strong> Restreindre l'utilisation de vos données
					</li>
					<li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
					<li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
				</ul>
				<p>
					Pour exercer ces droits, contactez-nous à :
					<a href="mailto:privacy@cabinet-martinet.fr">privacy@cabinet-martinet.fr</a>
				</p>
			</section>

			<section>
				<h2>8. Cookies et technologies de suivi</h2>
				<p>Ce site utilise les types de cookies suivants :</p>
				<ul>
					<li>
						<strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification,
						préférences de thème)
					</li>
					<li>
						<strong>Cookies de performance :</strong> Pour analyser votre utilisation du site afin
						d'améliorer votre expérience
					</li>
				</ul>
				<p>
					Vous pouvez modifier les paramètres de cookies dans les paramètres de votre navigateur. Cependant,
					certains cookies essentiels ne peuvent pas être désactivés sans altérer le fonctionnement du site.
				</p>
			</section>

			<section>
				<h2>9. Sécurité des données</h2>
				<p>
					Nous prenons les mesures de sécurité appropriées pour protéger vos données personnelles contre tout
					accès, modification ou destruction non autorisée. Cependant, aucune transmission sur Internet n'est
					100% sécurisée.
				</p>
				<p>
					Si vous découvrez une violation de sécurité, veuillez nous contacter immédiatement à :
					<a href="mailto:security@cabinet-martinet.fr">security@cabinet-martinet.fr</a>
				</p>
			</section>

			<section>
				<h2>10. Modifications de cette politique</h2>
				<p>
					Le Cabinet Martinet se réserve le droit de modifier cette Politique de Confidentialité à tout
					moment. Les modifications seront publiées sur cette page avec une date de mise à jour.
				</p>
				<p><strong>Dernière mise à jour : 2026</strong></p>
			</section>

			<section>
				<h2>11. Contact et réclamations</h2>
				<p>
					Si vous avez des questions ou préoccupations concernant cette politique, veuillez nous contacter à :
				</p>
				<p>
					<strong>Email :</strong> <a href="mailto:contact@cabinet-martinet.fr">contact@cabinet-martinet.fr</a
					><br />
					<strong>Adresse :</strong> 5 Avenue de la République, 33000 Bordeaux
				</p>
				<p>
					Vous avez également le droit de déposer une plainte auprès de la Commission Nationale de
					l'Informatique et des Libertés (CNIL) à l'adresse :
					<a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a>
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

		ul {
			margin-left: 1.5rem;
			margin-bottom: 1rem;
		}

		li {
			margin-bottom: 0.5rem;
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
export class PrivacyComponent {
	private readonly location = inject(Location)

	goBack() {
		this.location.back()
	}
}
