# Angular i18n Setup Guide

## ✅ What's Already Done

1. ✅ Installed `@angular/localize`
2. ✅ Configured `angular.json` with:
    - Source locale: French (`fr`)
    - Target locale: English (`en`)
    - Translation file path: `src/locale/messages.en.xlf`
3. ✅ Created `src/locale` directory
4. ✅ Added build configurations

## 📝 How to Mark Text for Translation

### In Templates (.html)

Add the `i18n` attribute to any element containing translatable text:

```html
<!-- Before -->
<h1 class="mat-display-2">À Propos de Maître Martinet</h1>

<!-- After -->
<h1 class="mat-display-2" i18n>À Propos de Maître Martinet</h1>
```

### With Context/Description

Add context to help translators:

```html
<h1 i18n="Header|Main page title">À Propos de Maître Martinet</h1>
```

Format: `i18n="meaning|description"`

### For Attributes

```html
<img alt="Image du Maître Martinet" i18n-alt /> <button title="Retour" i18n-title>...</button>
```

### In TypeScript

```typescript
import { $localize } from '@angular/localize/init'

const message = $localize`Bienvenue`
const withVar = $localize`Bonjour ${name}`
```

## 🔄 Translation Workflow

### Step 1: Mark All Translatable Content

Go through all your `.html` files and add `i18n` attributes:

**Example for about.html:**

```html
<h1 class="mat-display-2" i18n="About page|Page title">À Propos de Maître Martinet</h1>
<p class="mat-headline-5 hero-subtitle" i18n="About page|Subtitle">Avocate spécialisée en droit des étrangers...</p>
```

### Step 2: Extract Translation Strings

Run this command to extract all marked text:

```bash
ng extract-i18n --output-path src/locale
```

This creates `src/locale/messages.xlf` (source file in French).

### Step 3: Create English Translation File

Copy and rename:

```bash
cp src/locale/messages.xlf src/locale/messages.en.xlf
```

### Step 4: Translate

Open `src/locale/messages.en.xlf` and translate each `<source>` tag by adding a `<target>` tag:

```xml
<trans-unit id="..." datatype="html">
  <source>À Propos de Maître Martinet</source>
  <target>About Maître Martinet</target>
  <context-group purpose="location">...</context-group>
</trans-unit>
```

### Step 5: Build for Specific Locale

```bash
# Build for English only
ng build --configuration=en

# Build for all locales (production)
ng build --configuration=production --localize
```

This creates:

- `dist/site-avocat/fr/` (French version)
- `dist/site-avocat/en/` (English version)

### Step 6: Serve Localized Version (Development)

```bash
# Serve English version
ng serve --configuration=en
```

## 📁 Project Structure After Setup

```
src/
├── locale/
│   ├── messages.xlf       # Source (French) - auto-generated
│   └── messages.en.xlf    # English translations - you edit this
└── app/
    └── ... (your components with i18n attributes)
```

## 🚀 Deployment Strategy

### Option 1: Subdirectories (Recommended)

- Deploy both versions
- French: `yoursite.com/` or `yoursite.com/fr/`
- English: `yoursite.com/en/`

### Option 2: Subdomains

- French: `fr.yoursite.com`
- English: `en.yoursite.com`

### Option 3: Separate Builds

- Build and deploy only one language per environment

## 🔧 Package.json Scripts

Add these to your `package.json`:

```json
"scripts": {
  "extract-i18n": "ng extract-i18n --output-path src/locale",
  "start:en": "ng serve --configuration=en",
  "build:en": "ng build --configuration=en",
  "build:all": "ng build --configuration=production --localize"
}
```

## 📋 Next Steps

1. Start with one component (e.g., `about.html`)
2. Add `i18n` attributes to all text
3. Run `npm run extract-i18n`
4. Translate `messages.en.xlf`
5. Test with `npm run start:en`
6. Repeat for all components

## 💡 Tips

- Mark ALL user-facing text, including buttons, labels, errors
- Use descriptive meanings/descriptions for complex strings
- Keep the source file (`messages.xlf`) in version control
- Commit translation files (`messages.en.xlf`) to track changes
- Re-run `extract-i18n` after adding new translatable content
- Use translation management tools (Crowdin, Lokalise) for larger projects

## 🐛 Common Issues

**Issue**: Translations not showing

- Solution: Make sure you built with `--localize` or `--configuration=en`

**Issue**: New strings not extracted

- Solution: Run `ng extract-i18n` again after marking new text

**Issue**: Build errors with i18n

- Solution: Check that all `<target>` tags are properly closed in `.xlf` files
