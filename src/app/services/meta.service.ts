import { Injectable, inject, PLATFORM_ID } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { DOCUMENT, isPlatformBrowser, LowerCasePipe } from '@angular/common'
import { CONTACT_CONFIG } from '../config/contact.config'

interface PageMeta {
	title: string
	description: string
	keywords?: string
	image?: string
	url?: string
}

@Injectable({ providedIn: 'root' })
export class MetaService {
	private readonly meta = inject(Meta)
	private readonly titleService = inject(Title)
	private readonly document = inject(DOCUMENT)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	private readonly pagesMeta: Record<string, PageMeta> = {
		home: {
			title: `${CONTACT_CONFIG.businessName} - Avocat Droit des Étrangers à ${CONTACT_CONFIG.address.city}`,
			description: `Cabinet d'avocat spécialisé en droit des étrangers à ${CONTACT_CONFIG.address.city}. Accompagnement juridique pour vos démarches de titre de séjour, naturalisation et contentieux. Consultation personnalisée.`,
			keywords: `avocat droit des étrangers, titre de séjour, naturalisation française, OQTF, contentieux étrangers, ${CONTACT_CONFIG.address.city}`,
		},
		prestations: {
			title: `Nos Prestations - Droit des Étrangers | ${CONTACT_CONFIG.businessName}`,
			description: `Découvrez nos domaines d'intervention en droit des étrangers : titres de séjour, naturalisation française, contentieux et recours. Expertise juridique à ${CONTACT_CONFIG.address.city}.`,
			keywords: 'prestations avocat, droit immigration, carte de résident, naturalisation, recours OQTF',
		},
		blog: {
			title: `Blog Juridique - Actualités Droit des Étrangers | ${CONTACT_CONFIG.businessName}`,
			description:
				'Actualités, conseils et analyses en droit des étrangers. Articles juridiques sur les titres de séjour, naturalisation, OQTF et contentieux des étrangers.',
			keywords: `blog juridique, actualités droit étrangers, conseils immigration, OQTF, ${CONTACT_CONFIG.address.city}`,
		},
		about: {
			title: `À Propos - ${CONTACT_CONFIG.lawyer.fullName}, Avocat Droit des Étrangers`,
			description: `Découvrez le parcours de ${CONTACT_CONFIG.lawyer.fullName}, avocate spécialisée en droit des étrangers à ${CONTACT_CONFIG.address.city}. Expertise, engagement et accompagnement personnalisé pour vos démarches.`,
			keywords: `avocat ${CONTACT_CONFIG.address.city.toLowerCase()}, maître ${CONTACT_CONFIG.lawyer.lastName}, droit des étrangers, avocat immigration`,
		},
		contact: {
			title: `Contact - ${CONTACT_CONFIG.businessName} ${CONTACT_CONFIG.address.city} | Avocat Droit des Étrangers`,
			description: `Contactez le ${CONTACT_CONFIG.businessName} à ${CONTACT_CONFIG.address.city} pour une consultation en droit des étrangers. Prenez rendez-vous pour vos démarches de titre de séjour, naturalisation ou contentieux.`,
			keywords: `contact avocat ${CONTACT_CONFIG.address.city.toLowerCase()}, rendez-vous avocat, consultation droit étrangers`,
		},
		legal: {
			title: `Mentions Légales | ${CONTACT_CONFIG.businessName}`,
			description: `Mentions légales du ${CONTACT_CONFIG.businessName}, avocat en droit des étrangers à ${CONTACT_CONFIG.address.city}. Informations légales, RGPD et conditions d'utilisation du site.`,
			keywords: `mentions légales, cabinet avocat, ${CONTACT_CONFIG.address.city.toLowerCase()}`,
		},
		privacy: {
			title: `Politique de Confidentialité | ${CONTACT_CONFIG.businessName}`,
			description: `Politique de confidentialité et protection des données personnelles du ${CONTACT_CONFIG.businessName}. Informations sur le traitement de vos données conformément au RGPD.`,
			keywords: `politique confidentialité, RGPD, protection données, cabinet avocat`,
		},
	}

	updateMetaTags(page: keyof typeof this.pagesMeta, locale: 'fr' | 'en' = 'fr') {
		if (!this.isBrowser) return

		const meta = this.pagesMeta[page]
		if (!meta) return

		const baseUrl = this.getBaseUrl()
		const url = `${baseUrl}/${locale}`

		// Title and description
		this.titleService.setTitle(meta.title)
		this.meta.updateTag({ name: 'description', content: meta.description })
		if (meta.keywords) {
			this.meta.updateTag({ name: 'keywords', content: meta.keywords })
		}

		// Canonical URL
		this.setCanonical(url)

		// Open Graph tags
		this.meta.updateTag({ property: 'og:title', content: meta.title })
		this.meta.updateTag({ property: 'og:description', content: meta.description })
		this.meta.updateTag({ property: 'og:url', content: url })
		this.meta.updateTag({ property: 'og:type', content: 'website' })
		if (meta.image) {
			this.meta.updateTag({ property: 'og:image', content: meta.image })
		}

		// Twitter Card tags
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' })
		this.meta.updateTag({ name: 'twitter:title', content: meta.title })
		this.meta.updateTag({ name: 'twitter:description', content: meta.description })
		if (meta.image) {
			this.meta.updateTag({ name: 'twitter:image', content: meta.image })
		}

		// Language alternate links
		this.setLanguageAlternates(page)
	}

	updateArticleMeta(title: string, description: string, image?: string) {
		if (!this.isBrowser) return

		const baseUrl = this.getBaseUrl()

		this.titleService.setTitle(title)
		this.meta.updateTag({ name: 'description', content: description })
		this.setCanonical(baseUrl)

		// Open Graph for articles
		this.meta.updateTag({ property: 'og:title', content: title })
		this.meta.updateTag({ property: 'og:description', content: description })
		this.meta.updateTag({ property: 'og:type', content: 'article' })
		if (image) {
			this.meta.updateTag({ property: 'og:image', content: image })
		}

		// Twitter Cards
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' })
		this.meta.updateTag({ name: 'twitter:title', content: title })
		this.meta.updateTag({ name: 'twitter:description', content: description })
	}

	private setCanonical(url: string) {
		let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement
		if (!link) {
			link = this.document.createElement('link')
			link.rel = 'canonical'
			this.document.head.appendChild(link)
		}
		link.href = url
	}

	private setLanguageAlternates(page: string) {
		// Remove existing alternates
		const existing = this.document.querySelectorAll('link[rel="alternate"][hreflang]')
		existing.forEach((el) => el.remove())

		const baseUrl = this.getBaseUrl()
		const pageUrl = page === 'home' ? '' : `/${page}`

		// Add French version
		let linkFr = this.document.createElement('link')
		linkFr.rel = 'alternate'
		linkFr.hreflang = 'fr'
		linkFr.href = `${baseUrl}/fr${pageUrl}`
		this.document.head.appendChild(linkFr)

		// Add English version
		let linkEn = this.document.createElement('link')
		linkEn.rel = 'alternate'
		linkEn.hreflang = 'en'
		linkEn.href = `${baseUrl}/en${pageUrl}`
		this.document.head.appendChild(linkEn)

		// Add x-default
		let linkDefault = this.document.createElement('link')
		linkDefault.rel = 'alternate'
		linkDefault.hreflang = 'x-default'
		linkDefault.href = `${baseUrl}/fr${pageUrl}`
		this.document.head.appendChild(linkDefault)
	}

	private getBaseUrl(): string {
		if (!this.isBrowser) return ''
		const protocol = window.location.protocol
		const host = window.location.host
		return `${protocol}//${host}`
	}
}
