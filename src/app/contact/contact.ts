import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common'
import emailjs from '@emailjs/browser'

@Component({
	selector: 'app-contact',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatIconModule,
		MatSnackBarModule,
	],
	templateUrl: './contact.html',
	styleUrl: './contact.scss',
})
export class Contact {
	private fb = inject(FormBuilder)
	private snackBar = inject(MatSnackBar)

	isSubmitting = false

	contactForm: FormGroup = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 \\-]{7,15}$')]],
		subject: ['', Validators.required],
		message: ['', Validators.required],
	})

	async onSubmit() {
		if (this.contactForm.valid) {
			this.isSubmitting = true

			try {
				// EmailJS configuration - Replace with your actual EmailJS credentials
				const serviceId = 'service_nhi3txj' // Get from EmailJS dashboard
				const templateId = 'template_9x1kaok' // Create in EmailJS dashboard
				const publicKey = 'gN3YmDTuAVK7LloXM' // Get from EmailJS dashboard

				const templateParams = {
					from_name: this.contactForm.value.name,
					from_email: this.contactForm.value.email,
					phone: this.contactForm.value.phone || 'Non fourni',
					subject: this.contactForm.value.subject,
					message: this.contactForm.value.message,
					to_email: 'corentin.rodrigo@gmail.com',
					// to_email: 'contact@maitre-martinet.fr', // Your email address
				}

				// await emailjs.send(serviceId, templateId, templateParams, publicKey)

				this.snackBar.open('Message envoyé avec succès !', 'Fermer', {
					duration: 5000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				})

				this.contactForm.reset()
			} catch (error) {
				console.error("Erreur lors de l'envoi:", error)
				this.snackBar.open("Erreur lors de l'envoi du message. Veuillez réessayer.", 'Fermer', {
					duration: 5000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				})
			} finally {
				this.isSubmitting = false
			}
		}
	}
}
