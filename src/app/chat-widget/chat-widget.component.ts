import { Component, inject, signal, ChangeDetectionStrategy, OnInit, PLATFORM_ID } from '@angular/core'
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
	readonly isOpen = signal(false)
	readonly messages = signal<ChatMessage[]>([])
	readonly isTyping = signal(false)

	private readonly chatService = inject(ChatService)
	private readonly router = inject(Router)
	private readonly sanitizer = inject(DomSanitizer)
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	userInput = ''

	ngOnInit(): void {
		this.addBotMessage(
			'Bonjour ! Notre assistant est désormais connecté à un service d’IA. Posez votre question et obtenez une réponse rapide sur le droit des étrangers.',
		)
	}

	toggleChat(): void {
		this.isOpen.update((isOpen) => !isOpen)
	}

	closeChat(): void {
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

		this.chatService
			.streamMessage(userMessage, (chunk) => this.appendBotChunk(botMessageId, chunk))
			.then(() => {
				this.isTyping.set(false)
			})
			.catch((error) => {
				this.updateBotMessage(
					botMessageId,
					`Erreur : ${error instanceof Error ? error.message : String(error)}`,
				)
				this.isTyping.set(false)
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
