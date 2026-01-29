/**
 * Centralized contact and business information
 * Update this single file to change contact details across the entire website
 */
export const CONTACT_CONFIG = {
	// Business information
	businessName: 'Cabinet Martinet',
	businessNameShort: 'Maître Martinet',
	businessNameFull: 'Cabinet juridique Maître Martinet',

	// Lawyer information
	lawyer: {
		title: 'Maître',
		firstName: 'Martinet',
		lastName: 'Martinet',
		fullName: 'Maître Martinet',
		specialties: ["Droit de l'immigration", 'Droit de la famille', 'Droit du contentieux'],
	},

	// Contact details
	email: 'contact@maitre-martinet.fr',
	phone: '01 23 45 67 89',
	phoneSecondary: '06 12 34 56 78',
	fax: '01 23 45 67 90',

	// Address
	address: {
		street: '5 Avenue de la République',
		city: '33000 Bordeaux',
		country: 'France',
		full: '5 Avenue de la République, 33000 Bordeaux',
		building: '',
		floor: '',
	},

	// Office hours
	hours: {
		weekday: {
			open: '09:00',
			close: '18:00',
		},
		saturday: {
			open: '10:00',
			close: '13:00',
		},
		sunday: {
			open: null,
			close: null,
		},
	},

	// Response times
	responseTime: {
		email: '24h',
		phone: 'Immédiat',
		consultation: '48h',
	},

	// Special email addresses
	specialEmails: {
		legal: 'legal@cabinet-martinet.fr',
		privacy: 'privacy@cabinet-martinet.fr',
		security: 'security@cabinet-martinet.fr',
		appointments: 'rdv@cabinet-martinet.fr',
	},

	// Business registration
	businessInfo: {
		siret: '00000000000000',
		siren: '000000000',
		rcs: 'RCS Bordeaux',
		vat: 'FR00000000000',
		insurance: 'Assurance Responsabilité Civile Professionnelle',
		order: 'Barreau de Bordeaux',
	},

	// Website
	website: 'dmartinet-avocat.fr',
	domain: 'dmartinet-avocat.fr',
	protocol: 'https',

	// Social links
	socialLinks: {
		linkedin: 'https://linkedin.com/in/martinet-avocat',
		twitter: 'https://twitter.com/avocat_martinet',
		instagram: 'https://instagram.com/cabinet.martinet',
		facebook: 'https://facebook.com/cabinetmartinet',
	},

	// Map information
	map: {
		lat: 44.840336,
		lng: -0.5997146,
		embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.078425044478!2d-0.5997146!3d44.840336199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527da20689615%3A0x1a5b7e0cc1d30f05!2sDefis%20avocats!5e0!3m2!1sfr!2sfr!4v1769534638232!5m2!1sfr!2sfr',
	},
}
