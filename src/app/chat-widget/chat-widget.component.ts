import {
	Component,
	ElementRef,
	ViewChild,
	inject,
	signal,
	ChangeDetectionStrategy,
	OnInit,
	PLATFORM_ID,
} from '@angular/core'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDividerModule } from '@angular/material/divider'
import { ChatService, ChatMessage } from '../services/chat.service'

@Component({
	selector: 'app-chat-widget',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDividerModule,
	],
	templateUrl: './chat-widget.component.html',
	styleUrl: './chat-widget.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWidgetComponent implements OnInit {
	@ViewChild('chatInput') private chatInput?: ElementRef<HTMLInputElement>

	readonly isOpen = signal(false)
	readonly messages = signal<ChatMessage[]>([])
	readonly isTyping = signal(false)
	readonly isRedirecting = signal(false)
	readonly redirectProgress = signal(0)

	private readonly redirectDurationMs = 3000
	private redirectTimeoutId?: number
	private redirectIntervalId?: number

	private readonly chatService = inject(ChatService)
	private readonly router = inject(Router)
	private readonly sanitizer = inject(DomSanitizer)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	userInput = ''

	ngOnInit(): void {
		this.addBotMessage('Posez votre question et obtenez une réponse rapide.')
	}

	toggleChat(): void {
		this.isOpen.update((isOpen) => {
			const next = !isOpen
			if (next) {
				setTimeout(() => this.chatInput?.nativeElement.focus(), 0)
			}
			return next
		})
	}

	closeChat(): void {
		this.clearRedirectCountdown()
		this.isOpen.set(false)
	}

	sendMessage(text: string): void {
		this.userInput = text
		this.onSubmitMessage()
	}

	onSubmitMessage(): void {
		const userMessage = this.userInput.trim()
		if (!userMessage) return

		this.addUserMessage(userMessage)
		this.userInput = ''
		this.isTyping.set(true)

		const botMessageId = this.addBotMessage('')
		const redirectUrl = this.chatService.getRedirectUrl(userMessage)

		const redirectIfNeeded = () => {
			if (redirectUrl && this.isBrowser && !this.isRedirecting()) {
				this.startRedirectCountdown(botMessageId, redirectUrl)
			}
		}

		redirectIfNeeded()

		const responsePromise = this.chatService.canUseChatStream()
			? this.chatService.streamMessage(userMessage, (chunk) => this.appendBotChunk(botMessageId, chunk))
			: this.chatService
				.sendMessage(userMessage)
				.then((response) => {
					this.appendBotChunk(botMessageId, response)
				})

		responsePromise
			.then(() => {
				this.isTyping.set(false)
				redirectIfNeeded()
			})
			.catch((error) => {
				this.updateBotMessage(
					botMessageId,
					`Erreur : ${error instanceof Error ? error.message : String(error)}`,
				)
				this.isTyping.set(false)
				redirectIfNeeded()
			})
	}

	private addUserMessage(text: string): void {
		const message: ChatMessage = {
			id: `user-${Date.now()}`,
			type: 'user',
			text,
			timestamp: new Date(),
		}
		this.messages.update((msgs) => [...msgs, message])
		this.scrollToBottom()
	}

	private addBotMessage(text: string): string {
		const message: ChatMessage = {
			id: `bot-${Date.now()}-${Math.random().toString(36).slice(2)}`,
			type: 'bot',
			text,
			timestamp: new Date(),
		}
		this.messages.update((msgs) => [...msgs, message])
		this.scrollToBottom()
		return message.id
	}

	private appendBotChunk(id: string, chunk: string): void {
		this.messages.update((msgs) =>
			msgs.map((message) => (message.id === id ? { ...message, text: `${message.text}${chunk}` } : message)),
		)
		this.scrollToBottom()
	}

	private updateBotMessage(id: string, text: string): void {
		this.messages.update((msgs) => msgs.map((message) => (message.id === id ? { ...message, text } : message)))
		this.scrollToBottom()
	}

	private addRedirectNotice(botMessageId: string): void {
		this.messages.update((msgs) =>
			msgs.map((message) =>
				message.id === botMessageId
					? {
							...message,
							text: `${message.text}\n\nNous allons vous rediriger vers la bonne page dans 3 secondes...`,
						}
					: message,
			),
		)
		this.scrollToBottom()
	}

	get redirectRemainingSeconds(): number {
		return Math.max(0, Math.ceil((1 - this.redirectProgress() / 100) * (this.redirectDurationMs / 1000)))
	}

	private startRedirectCountdown(botMessageId: string, redirectUrl: string): void {
		this.clearRedirectCountdown()
		this.addRedirectNotice(botMessageId)
		this.isRedirecting.set(true)
		this.redirectProgress.set(0)

		const start = Date.now()
		this.redirectIntervalId = window.setInterval(() => {
			const elapsed = Date.now() - start
			const ratio = Math.min(1, elapsed / this.redirectDurationMs)
			this.redirectProgress.set(Math.round(ratio * 100))
		}, 50)

		this.redirectTimeoutId = window.setTimeout(() => {
			this.clearRedirectCountdown()
			this.router.navigateByUrl(redirectUrl)
			this.closeChat()
		}, this.redirectDurationMs)
	}

	private clearRedirectCountdown(): void {
		if (this.redirectTimeoutId) {
			clearTimeout(this.redirectTimeoutId)
			this.redirectTimeoutId = undefined
		}

		if (this.redirectIntervalId) {
			clearInterval(this.redirectIntervalId)
			this.redirectIntervalId = undefined
		}

		this.isRedirecting.set(false)
		this.redirectProgress.set(0)
	}

	formatMessageHtml(text: string): SafeHtml {
		const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

		const withLinks = escaped.replace(
			/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>',
		)
		const withBold = withLinks.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		const withItalic = withBold.replace(/\*(.+?)\*/g, '<em>$1</em>')
		const lines = withItalic.split(/\r?\n/)

		let html = ''
		let inList = false

		for (const line of lines) {
			const trimmed = line.trim()
			if (trimmed.startsWith('### ')) {
				if (inList) {
					html += '</ul>'
					inList = false
				}
				html += `<h4>${trimmed.slice(4)}</h4>`
			} else if (trimmed.startsWith('## ')) {
				if (inList) {
					html += '</ul>'
					inList = false
				}
				html += `<h3>${trimmed.slice(3)}</h3>`
			} else if (trimmed.startsWith('* ')) {
				if (!inList) {
					html += '<ul>'
					inList = true
				}
				html += `<li>${trimmed.slice(2)}</li>`
			} else if (!trimmed) {
				if (inList) {
					html += '</ul>'
					inList = false
				}
				html += '<p></p>'
			} else {
				if (inList) {
					html += '</ul>'
					inList = false
				}
				html += `<p>${trimmed.replace(/\s{2,}/g, ' ')}</p>`
			}
		}

		if (inList) {
			html += '</ul>'
		}

		return this.sanitizer.bypassSecurityTrustHtml(html)
	}

	private scrollToBottom(): void {
		if (!this.isBrowser) return

		setTimeout(() => {
			const messagesContainer = document.querySelector('.chat-messages')
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight
			}
		}, 0)
	}
}
