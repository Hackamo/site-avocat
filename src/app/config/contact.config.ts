/**
 * Centralized contact and business information
 * Update this single file to change contact details across the entire website
 */
export const CONTACT_CONFIG = {
	// Business information
	businessName: 'Cabinet Martinet',
	businessNameShort: 'Maître Débora Martinet',
	businessNameFull: 'Cabinet juridique Maître Débora Martinet',

	// Lawyer information
	lawyer: {
		title: 'Maître',
		firstName: 'Débora',
		lastName: 'Martinet',
		fullName: 'Maître Débora Martinet',
		specialties: ['Droit des étrangers', 'Droit du handicap', 'Droit de la famille'],
	},

	// Contact details
	email: 'debora.martinet@avocat.fr',
	phone: '06 10 96 49 09',

	// Address
	address: {
		street: '14 Rue Mazarin',
		city: 'Bordeaux',
		postalCode: '33000',
		country: 'France',
		full: '14 Rue Mazarin, 33000 Bordeaux',
		building: '',
		floor: '',
	},

	// Office hours
	hours: {
		weekday: {
			open: '08:00',
			close: '20:00',
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
		siret: '99936948100018',
		siren: '999369481',
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
		embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.565364590384!2d-0.5779476!3d44.8304185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd54d9c35b8417dd%3A0x34bffb2f70f02197!2sMa%C3%AEtre%20D%C3%A9bora%20MARTINET%20-%20Avocat%20%C3%A0%20Bordeaux%20-%20Droit%20des%20%C3%A9trangers%20-%20Droit%20du%20handicap!5e0!3m2!1sfr!2sfr!4v1783288681579!5m2!1sfr!2sfr',
	},
}
