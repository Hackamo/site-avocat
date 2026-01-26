import { Component, inject, signal, PLATFORM_ID, OnDestroy } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common'
import { Router, NavigationStart } from '@angular/router'
import emailjs from '@emailjs/browser'
import { AnimateText } from '../directives/animate-text.directive'

declare global {
	interface Window {
		SpeechRecognition: any
		webkitSpeechRecognition: any
	}
}

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
		MatProgressSpinnerModule,
		AnimateText,
	],
	templateUrl: './contact.html',
	styleUrl: './contact.scss',
})
export class Contact implements OnDestroy {
	private fb = inject(FormBuilder)
	private snackBar = inject(MatSnackBar)
	private platformId = inject(PLATFORM_ID)
	private router = inject(Router)

	isSubmitting = signal(false)
	isListening = signal(false)
	speechSupported = signal(false)
	private recognition: any = null

	contactForm: FormGroup = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 \\-]{7,15}$')]],
		subject: ['', Validators.required],
		message: ['', Validators.required],
	})

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
			if (SpeechRecognition) {
				this.speechSupported.set(true)
				this.recognition = new SpeechRecognition()
				this.recognition.lang = 'fr-FR'
				this.recognition.continuous = true
				this.recognition.interimResults = true

				this.recognition.onresult = (event: any) => {
					let interimTranscript = ''
					let finalTranscript = ''

					for (let i = event.resultIndex; i < event.results.length; i++) {
						const transcript = event.results[i][0].transcript
						if (event.results[i].isFinal) {
							finalTranscript += transcript + ' '
						} else {
							interimTranscript += transcript
						}
					}

					const currentMessage = this.contactForm.get('message')?.value || ''

					// Si on a un résultat final, on l'ajoute au message
					if (finalTranscript) {
						const baseMessage = currentMessage.replace(/\[En cours de dictée\.\.\.\]$/, '').trim()
						const newMessage = baseMessage ? `${baseMessage} ${finalTranscript.trim()}` : finalTranscript.trim()
						this.contactForm.patchValue({ message: newMessage })
					}
					// Sinon, on affiche le résultat intermédiaire
					else if (interimTranscript) {
						const baseMessage = currentMessage.replace(/\[En cours de dictée\.\.\.\]$/, '').trim()
						const newMessage = baseMessage ? `${baseMessage} [En cours de dictée...]` : '[En cours de dictée...]'
						this.contactForm.patchValue({ message: newMessage })
					}
				}

				this.recognition.onerror = (event: any) => {
					console.error('Speech recognition error:', event.error)
					this.isListening.set(false)
					let errorMessage = 'Erreur de reconnaissance vocale'
					if (event.error === 'not-allowed') {
						errorMessage = 'Autorisation microphone refusée'
					} else if (event.error === 'no-speech') {
						errorMessage = 'Aucune parole détectée'
					}
					this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 })
				}

				this.recognition.onend = () => {
					this.isListening.set(false)
				}
			}

			// Stop mic on route change
			this.router.events.subscribe((event) => {
				if (event instanceof NavigationStart) {
					this.stopVoiceInput()
				}
			})
		}
	}

	ngOnDestroy(): void {
		this.stopVoiceInput()
	}

	private stopVoiceInput(): void {
		if (this.recognition && this.isListening()) {
			this.recognition.stop()
			this.isListening.set(false)
		}
	}

	startVoiceInput() {
		if (!this.recognition || !this.speechSupported()) return

		if (this.isListening()) {
			this.stopVoiceInput()
		} else {
			try {
				this.recognition.start()
				this.isListening.set(true)
				this.snackBar.open('🎤 Parlez maintenant...', '', { duration: 3000 })
			} catch (error) {
				console.error('Failed to start recognition:', error)
				this.snackBar.open('Impossible de démarrer le microphone', 'Fermer', { duration: 3000 })
			}
		}
	}

	copyToClipboard(text: string, successMessage: string) {
		try {
			if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text)
				this.snackBar.open(successMessage, 'Fermer', {
					duration: 1500,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				})
				return
			}
			// Fallback
			const textarea = document.createElement('textarea')
			textarea.value = text
			textarea.style.position = 'fixed'
			textarea.style.opacity = '0'
			document.body.appendChild(textarea)
			textarea.focus()
			textarea.select()
			document.execCommand('copy')
			document.body.removeChild(textarea)
			this.snackBar.open(successMessage, 'Fermer', {
				duration: 1500,
				horizontalPosition: 'center',
				verticalPosition: 'top',
			})
		} catch (e) {
			this.snackBar.open('Impossible de copier. Veuillez copier manuellement.', 'Fermer', {
				duration: 2000,
				horizontalPosition: 'center',
				verticalPosition: 'top',
			})
		}
	}

	async onSubmit() {
		if (this.contactForm.valid) {
			// Stop mic when submitting form
			this.stopVoiceInput()

			this.isSubmitting.set(true)

			try {
				// Simulate 1s delay
				await new Promise((resolve) => setTimeout(resolve, 1000))

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
				this.isSubmitting.set(false)
			}
		}
	}
}
