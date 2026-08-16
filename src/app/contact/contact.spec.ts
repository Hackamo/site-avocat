import { ComponentFixture, TestBed } from '@angular/core/testing'
import emailjs from '@emailjs/browser'

import { Contact } from './contact'

describe('Contact', () => {
	let component: Contact
	let fixture: ComponentFixture<Contact>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Contact],
		}).compileComponents()

		fixture = TestBed.createComponent(Contact)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should include the message and subject in the EmailJS payload', async () => {
		spyOn(emailjs, 'send').and.resolveTo({} as any)
		component.contactForm.setValue({
			name: 'Alice Dupont',
			email: 'alice@example.com',
			phone: '+33123456789',
			subject: 'Consultation',
			message: 'Je souhaite prendre rendez-vous.',
		})

		await component.onSubmit()

		expect(emailjs.send).toHaveBeenCalled()
		const params = (emailjs.send as jasmine.Spy).calls.mostRecent().args[2]
		expect(params).toEqual(
			jasmine.objectContaining({
				from_name: 'Alice Dupont',
				from_email: 'alice@example.com',
				subject: 'Consultation',
				message: 'Je souhaite prendre rendez-vous.',
			}),
		)
	})
})
