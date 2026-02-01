# Enter Animation Directive - Usage Guide

## Overview

The `animateOnEnter` directive provides a reusable way to animate elements when they enter the viewport. It uses the Intersection Observer API to detect when elements become visible and applies CSS transitions.

## Features

- ✅ Intersection Observer-based (performant)
- ✅ Multiple animation types (fade, slide-up, slide-left, slide-right, zoom)
- ✅ Customizable duration, delay, and threshold
- ✅ SSR-safe (only runs in browser)
- ✅ Works across all templates globally

## Installation

The directive is already available globally. Simply import it in your component:

```typescript
import { AnimateOnEnter } from '../directives/animate-on-enter.directive'

@Component({
  // ...
  imports: [AnimateOnEnter, /* other imports */]
})
```

## Basic Usage

### Simple Fade-in

```html
<div animateOnEnter>This element will fade in when it enters the viewport</div>
```

### Slide-up Animation

```html
<div animateOnEnter="slide-up">This element will slide up and fade in</div>
```

### Slide from Sides

```html
<!-- Slide from right -->
<div animateOnEnter="slide-left">This element will slide in from the right</div>

<!-- Slide from left -->
<div animateOnEnter="slide-right">This element will slide in from the left</div>
```

### Zoom Animation

```html
<div animateOnEnter="zoom">This element will zoom and fade in</div>
```

## Advanced Options

### Custom Duration

```html
<!-- Default is 1000ms (1 second) -->
<div animateOnEnter="fade" [duration]="1500">Slower fade-in (1.5 seconds)</div>
```

### Delay Animation

```html
<div animateOnEnter="slide-up" [delay]="300">This will start animating 300ms after entering viewport</div>
```

### Custom Threshold

```html
<!-- Default is 0.1 (10% visible) -->
<div animateOnEnter="fade" [threshold]="0.5">This will only animate when 50% of the element is visible</div>
```

### Combining Options

```html
<div animateOnEnter="slide-up" [duration]="1200" [delay]="200" [threshold]="0.3">Fully customized animation</div>
```

## Common Use Cases

### Blog Cards (Like in blog.ts)

```html
@for (article of articles(); track article.slug) {
<app-blog-article-card animateOnEnter="fade" [article]="article" />
}
```

### Staggered List Items

```html
@for (item of items(); track item.id; let i = $index) {
<div animateOnEnter="slide-up" [delay]="i * 100">{{ item.name }}</div>
}
```

### Hero Sections

```html
<section class="hero">
	<h1 animateOnEnter="fade" [duration]="1500">Welcome</h1>
	<p animateOnEnter="slide-up" [delay]="200">Discover our services</p>
	<button animateOnEnter="zoom" [delay]="400">Get Started</button>
</section>
```

### Grid Layouts

```html
<div class="grid">
	@for (card of cards(); track card.id; let i = $index) {
	<div class="card" animateOnEnter="fade" [delay]="(i % 3) * 100">{{ card.title }}</div>
	}
</div>
```

## Animation Types

| Type          | Effect                    | Best For                        |
| ------------- | ------------------------- | ------------------------------- |
| `fade`        | Simple opacity transition | Text, images, any content       |
| `slide-up`    | Slides from bottom        | Cards, sections, articles       |
| `slide-left`  | Slides from right         | Side content, secondary info    |
| `slide-right` | Slides from left          | Main content, featured items    |
| `zoom`        | Scales from 95% to 100%   | Icons, buttons, call-to-actions |

## Performance Tips

1. **Use appropriate thresholds**: Lower thresholds (0.1) start animations earlier, higher ones (0.5) wait for more visibility
2. **Don't over-animate**: Keep animations under 1.5 seconds for best UX
3. **Stagger animations**: Use delays to create natural flow (100-200ms between items)
4. **Choose the right animation**: Subtle animations (fade, zoom) work better for large sections

## CSS Classes Applied

The directive applies these classes automatically:

- `.animate-on-enter` - Base class with transition properties
- `.animate-on-enter-{type}` - Initial state (e.g., `.animate-on-enter-fade`)
- `.entered` - Final state when element becomes visible

## Browser Support

Uses Intersection Observer API, supported in:

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

## Migration from Old System

If you're migrating from the old `[animate.enter]` binding:

**Before:**

```typescript
// Component
enterClass = signal('enter-animation')

// Template
<div [animate.enter]="enterClass()">Content</div>
```

**After:**

```html
<div animateOnEnter="fade">Content</div>
```

## Examples Across the Site

You can use this directive in:

- [blog.html](src/app/blog/blog.html) - Blog article cards
- [home.html](src/app/home/home.html) - Hero sections, feature cards
- [prestations.html](src/app/prestations/prestations.html) - Service cards
- [about.html](src/app/about/about.html) - Team members, timeline
- Any other component templates!

## Related Directives

- `animateText` - For text-specific animations with longer duration
- Angular's built-in animations - For complex, multi-step animations
