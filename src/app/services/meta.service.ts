import { Injectable, inject } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

interface PageMeta {
	title: string
	description: string
	keywords?: string
}

@Injectable({ providedIn: 'root' })
export class MetaService {
	private readonly meta = inject(Meta)
	private readonly titleService = inject(Title)

	private readonly pagesMeta: Record<string, PageMeta> = {
		home: {
			title: 'Cabinet Martinet - Avocat Droit des Étrangers à Bordeaux',
			description:
				"Cabinet d'avocat spécialisé en droit des étrangers à Bordeaux. Accompagnement juridique pour vos démarches de titre de séjour, naturalisation et contentieux. Consultation personnalisée.",
			keywords:
				'avocat droit des étrangers, titre de séjour, naturalisation française, OQTF, contentieux étrangers, Bordeaux',
		},
		prestations: {
			title: 'Nos Prestations - Droit des Étrangers | Cabinet Martinet',
			description:
				"Découvrez nos domaines d'intervention en droit des étrangers : titres de séjour, naturalisation française, contentieux et recours. Expertise juridique à Bordeaux.",
			keywords: 'prestations avocat, droit immigration, carte de résident, naturalisation, recours OQTF',
		},
		blog: {
			title: 'Blog Juridique - Actualités Droit des Étrangers | Cabinet Martinet',
			description:
				'Actualités, conseils et analyses en droit des étrangers. Articles juridiques sur les titres de séjour, naturalisation, OQTF et contentieux des étrangers.',
			keywords: 'blog juridique, actualités droit étrangers, conseils immigration, OQTF',
		},
		about: {
			title: 'À Propos - Maître Martinet, Avocat Droit des Étrangers',
			description:
				'Découvrez le parcours de Maître Martinet, avocate spécialisée en droit des étrangers à Bordeaux. Expertise, engagement et accompagnement personnalisé pour vos démarches.',
			keywords: 'avocat bordeaux, maître martinet, droit des étrangers, avocat immigration',
		},
		contact: {
			title: 'Contact - Cabinet Martinet Bordeaux | Avocat Droit des Étrangers',
			description:
				'Contactez le Cabinet Martinet à Bordeaux pour une consultation en droit des étrangers. Prenez rendez-vous pour vos démarches de titre de séjour, naturalisation ou contentieux.',
			keywords: 'contact avocat bordeaux, rendez-vous avocat, consultation droit étrangers',
		},
		legal: {
			title: 'Mentions Légales | Cabinet Martinet',
			description:
				"Mentions légales du Cabinet Martinet, avocat en droit des étrangers à Bordeaux. Informations légales, RGPD et conditions d'utilisation du site.",
			keywords: 'mentions légales, cabinet avocat, bordeaux',
		},
		privacy: {
			title: 'Politique de Confidentialité | Cabinet Martinet',
			description:
				'Politique de confidentialité et protection des données personnelles du Cabinet Martinet. Informations sur le traitement de vos données conformément au RGPD.',
			keywords: 'politique confidentialité, RGPD, protection données, cabinet avocat',
		},
	}

	updateMetaTags(page: keyof typeof this.pagesMeta) {
		const meta = this.pagesMeta[page]
		if (!meta) return

		this.titleService.setTitle(meta.title)
		this.meta.updateTag({ name: 'description', content: meta.description })
		if (meta.keywords) {
			this.meta.updateTag({ name: 'keywords', content: meta.keywords })
		}
	}

	updateArticleMeta(title: string, description: string) {
		this.titleService.setTitle(`${title} | Cabinet Martinet`)
		this.meta.updateTag({ name: 'description', content: description })
	}
}
