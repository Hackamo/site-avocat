# Angular i18n Quick Reference

## Common Tasks

### Start Development Server

```bash
npm start           # French (default)
npm run start:en    # English
```

### Extract New Translations

```bash
npm run extract-i18n
```

### Build for Production

```bash
npm run build       # French only
npm run build:en    # English only
npm run build:all   # Both locales
```

## Template Syntax

### Simple Text

```html
<h1 i18n>Titre en français</h1>
```

### With Context (helps translators)

```html
<h1 i18n="Page section|Description for translator">Titre</h1>
```

### Attributes

```html
<img alt="Description" i18n-alt /> <button title="Tooltip" i18n-title>Click</button>
```

### Multiple Attributes

```html
<input placeholder="Entrez votre nom" i18n-placeholder aria-label="Champ nom" i18n-aria-label />
```

## TypeScript ($localize)

For dynamic text in components:

```typescript
import { $localize } from '@angular/localize/init'

const message = $localize`Bienvenue`
const withVar = $localize`Bonjour ${name}`
```

## Translation File Format (XLIFF)

```xml
<trans-unit id="..." datatype="html">
  <source>Texte en français</source>
  <target>Text in English</target>
  <context-group purpose="location">
    <context context-type="sourcefile">src/app/home/home.html</context>
    <context context-type="linenumber">10,12</context>
  </context-group>
  <note priority="1" from="description">Description</note>
  <note priority="1" from="meaning">Section</note>
</trans-unit>
```

## URL Structure

After deployment:

- French: `https://example.com/fr/`
- English: `https://example.com/en/`

## File Locations

- **Source**: `src/locale/messages.xlf` (French)
- **English**: `src/locale/messages.en.xlf`
- **Config**: `angular.json` → i18n section

## Workflow Summary

1. Add `i18n` attribute to template
2. `npm run extract-i18n`
3. Edit `messages.en.xlf` to add `<target>` tags
4. `npm run build:all`
5. Test both builds

## Tips

- Use meaningful context in `i18n="meaning|description"`
- Extract frequently to catch new text
- Keep translations in sync with design changes
- Use XLIFF editors for large projects (e.g., Poedit, Lokalise)

## Common Pitfalls

❌ **Don't** use `{{ variable | translate }}`  
✅ **Do** use `i18n` attributes

❌ **Don't** expect runtime language switching  
✅ **Do** reload page or navigate to different locale URL

❌ **Don't** forget to add `<target>` tags in `.en.xlf`  
✅ **Do** always translate every `<source>`

❌ **Don't** edit the source `messages.xlf` directly  
✅ **Do** re-extract after template changes
