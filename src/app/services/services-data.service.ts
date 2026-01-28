import { Injectable, signal } from '@angular/core'

export interface ServiceItem {
	titleKey: string
	icon: string
	descriptionKey: string
	subtitleKey?: string
	anchor?: string
	detailedDescriptionKey?: string
	itemsKey?: string[]
}

@Injectable({
	providedIn: 'root',
})
export class ServicesDataService {
	private readonly _services = signal<ServiceItem[]>([
		{
			titleKey: 'services.categories.residencePermits.title',
			icon: 'badge',
			descriptionKey: 'services.categories.residencePermits.description',
			subtitleKey: 'services.categories.residencePermits.subtitle',
			anchor: 'titres-de-sejour',
			detailedDescriptionKey: 'services.categories.residencePermits.detailedDescription',
			itemsKey: [
				'services.categories.residencePermits.items.0',
				'services.categories.residencePermits.items.1',
				'services.categories.residencePermits.items.2',
				'services.categories.residencePermits.items.3',
				'services.categories.residencePermits.items.4',
				'services.categories.residencePermits.items.5',
			],
		},
		{
			titleKey: 'services.categories.nationality.title',
			icon: 'flag',
			descriptionKey: 'services.categories.nationality.description',
			subtitleKey: 'services.categories.nationality.subtitle',
			anchor: 'nationalite-francaise',
			detailedDescriptionKey: 'services.categories.nationality.detailedDescription',
			itemsKey: [
				'services.categories.nationality.items.0',
				'services.categories.nationality.items.1',
				'services.categories.nationality.items.2',
				'services.categories.nationality.items.3',
				'services.categories.nationality.items.4',
			],
		},
		{
			titleKey: 'services.categories.litigation.title',
			icon: 'gavel',
			descriptionKey: 'services.categories.litigation.description',
			subtitleKey: 'services.categories.litigation.subtitle',
			anchor: 'contentieux-recours',
			detailedDescriptionKey: 'services.categories.litigation.detailedDescription',
			itemsKey: [
				'services.categories.litigation.items.0',
				'services.categories.litigation.items.1',
				'services.categories.litigation.items.2',
				'services.categories.litigation.items.3',
			],
		},
	])

	get services() {
		return this._services.asReadonly()
	}
}
