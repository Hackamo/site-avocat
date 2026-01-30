import { Component, inject, signal, ChangeDetectionStrategy, OnInit, PLATFORM_ID } from '@angular/core'
import { CommonModule, isPlatformBrowser } from '@angular/common'
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
	private readonly platformId = inject(PLATFORM_ID)
	private readonly isBrowser = isPlatformBrowser(this.platformId)

	userInput = ''

	ngOnInit(): void {
		this.addBotMessage('Bonjour ! Comment puis-je vous aider ? Posez-moi une question sur nos services juridiques.')
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

		// Set typing immediately
		this.isTyping.set(true)

		setTimeout(
			() => {
				const botResponse = this.chatService.getBotResponse(userMessage)
				this.isTyping.set(false)
				this.addBotMessage(botResponse)

				// Check if this request requires a redirect to contact page
				const redirectUrl = this.chatService.getRedirectUrl(userMessage)
				if (redirectUrl && this.isBrowser) {
					setTimeout(() => {
						this.router.navigate([redirectUrl])
						this.closeChat()
					}, 2000)
				}
			},
			500 + Math.random() * 1000,
		)
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

	private addBotMessage(text: string): void {
		const message: ChatMessage = {
			id: `bot-${Date.now()}`,
			type: 'bot',
			text,
			timestamp: new Date(),
		}
		this.messages.update((msgs) => [...msgs, message])
		this.scrollToBottom()
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
