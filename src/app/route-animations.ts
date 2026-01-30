import { animate, style, transition, trigger } from '@angular/animations'

export const routeAnimations = trigger('routeAnimations', [
	transition('* <=> *', [
		style({ opacity: 0, transform: 'translateY(10px)' }),
		animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
])
