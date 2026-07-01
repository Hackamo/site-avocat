import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Services } from './prestations'

describe('Services', () => {
	let component: Services
	let fixture: ComponentFixture<Services>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Services],
		}).compileComponents()

		fixture = TestBed.createComponent(Services)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should expose disability and family law expertise cards', () => {
		const titles = component.services.map((service) => service.title)

		expect(titles).toContain('Droit du handicap')
		expect(titles).toContain('Droit de la famille')
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
