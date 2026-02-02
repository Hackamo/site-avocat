import { Component, inject, signal, PLATFORM_ID, OnDestroy, AfterViewInit } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
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
import { CONTACT_CONFIG } from '../config/contact.config'
import { MetaService } from '../services/meta.service'

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
export class Contact implements OnDestroy, AfterViewInit {
	private fb = inject(FormBuilder)
	private snackBar = inject(MatSnackBar)
	private platformId = inject(PLATFORM_ID)
	private router = inject(Router)
	private metaService = inject(MetaService)
	private sanitizer = inject(DomSanitizer)

	// Make config accessible in template
	config = CONTACT_CONFIG
	// Sanitized map URL for iframe
	safeMapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(CONTACT_CONFIG.map.embed)

	isSubmitting = signal(false)
	isListening = signal(false)
	speechSupported = signal(false)
	iframeLoading = signal(true)
	private recognition: any = null

	contactForm: FormGroup = this.fb.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9 \\-]{7,15}$')]],
		subject: ['', Validators.required],
		message: ['', Validators.required],
	})

	constructor() {
		this.metaService.updateMetaTags('contact')
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
					const dictatingText = `[Écoute en cours...]`
					// Si on a un résultat final, on l'ajoute au message
					if (finalTranscript) {
						const baseMessage = currentMessage.replace(new RegExp(`\\[Écoute en cours...\\]$`), '').trim()
						const newMessage = baseMessage
							? `${baseMessage} ${finalTranscript.trim()}`
							: finalTranscript.trim()
						this.contactForm.patchValue({ message: newMessage })
					}
					// Sinon, on affiche le résultat intermédiaire
					else if (interimTranscript) {
						const baseMessage = currentMessage.replace(new RegExp(`\\[Écoute en cours...\\]$`), '').trim()
						const newMessage = baseMessage ? `${baseMessage} ${dictatingText}` : dictatingText
						this.contactForm.patchValue({ message: newMessage })
					}
				}

				this.recognition.onerror = (event: any) => {
					console.error('Speech recognition error:', event.error)
					this.isListening.set(false)
					let errorMessage = 'contact.voice.micError'
					if (event.error === 'not-allowed') {
						errorMessage = 'contact.voice.noPermission'
					} else if (event.error === 'no-speech') {
						errorMessage = 'contact.voice.noSpeech'
					}
					const errorMessages: Record<string, string> = {
						'contact.voice.micError': 'Erreur du microphone',
						'contact.voice.noPermission': 'Permission de microphone refusée',
						'contact.voice.noSpeech': 'Aucune parole détectée',
					}
					this.snackBar.open(errorMessages[errorMessage] || 'Erreur', 'Fermer', {
						duration: 3000,
						panelClass: ['favorite-snack-animation'],
					})
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

	startVoiceInput() {
		if (!this.recognition || !this.speechSupported()) return

		if (this.isListening()) {
			this.stopVoiceInput()
		} else {
			try {
				this.recognition.start()
				this.isListening.set(true)
				this.snackBar.open('Écoute activée...', 'Fermer', {
					duration: 3000,
					panelClass: ['favorite-snack-animation'],
				})
			} catch (error) {
				console.error('Failed to start recognition:', error)
				this.snackBar.open('Erreur lors du démarrage', 'Fermer', {
					duration: 3000,
					panelClass: ['favorite-snack-animation'],
				})
			}
		}
	}

	copyToClipboard(text: string, messageKey: string) {
		try {
			if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text)
				const copyMessages: Record<string, string> = {
					'contact.copyPhone': 'Numéro copié !',
					'contact.copyEmail': 'Email copié !',
				}
				this.snackBar.open(copyMessages[messageKey] || 'Copié !', 'Fermer', {
					duration: 1500,
					horizontalPosition: 'center',
					verticalPosition: 'top',
					panelClass: ['favorite-snack-animation'],
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
			const copyMessages2: Record<string, string> = {
				'contact.copyPhone': 'Numéro copié !',
				'contact.copyEmail': 'Email copié !',
			}
			this.snackBar.open(copyMessages2[messageKey] || 'Copié !', 'Fermer', {
				duration: 1500,
				horizontalPosition: 'center',
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
			})
		} catch (e) {
			this.snackBar.open('Erreur lors de la copie', 'Fermer', {
				duration: 2000,
				horizontalPosition: 'center',
				verticalPosition: 'top',
				panelClass: ['favorite-snack-animation'],
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
				await new Promise((resolve) => setTimeout(resolve, 300))

				// EmailJS configuration - Replace with your actual EmailJS credentials
				const serviceId = 'service_nhi3txj' // Get from EmailJS dashboard
				const templateId = 'template_9x1kaok' // Create in EmailJS dashboard
				const publicKey = 'gN3YmDTuAVK7LloXM' // Get from EmailJS dashboard

				const templateParams = {
					from_name: this.contactForm.value.name,
					from_email: this.contactForm.value.email,
					phone: this.contactForm.value.phone || 'Non fourni',
					to_email: this.config.email,
				}

				await emailjs.send(serviceId, templateId, templateParams, publicKey)

				this.snackBar.open('Message envoyé avec succès !', 'Fermer', {
					duration: 5000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				})

				this.contactForm.reset()
			} catch (error) {
				console.error("Erreur lors de l'envoi:", error)
				this.snackBar.open("Erreur lors de l'envoi du message", 'Fermer', {
					duration: 5000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				})
			} finally {
				this.isSubmitting.set(false)
			}
		}
	}

	onIframeLoad() {
		this.iframeLoading.set(false)
	}

	ngAfterViewInit() {
		// Set a timeout to hide the loading spinner since external iframes don't fire load events
		setTimeout(() => {
			this.iframeLoading.set(false)
		}, 500)
	}

	private stopVoiceInput(): void {
		if (this.recognition && this.isListening()) {
			this.recognition.stop()
			this.isListening.set(false)
		}
	}
}
