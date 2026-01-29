# Localisation avec ngx-translate

## Vue d'ensemble

L'application utilise **ngx-translate** pour la traduction **runtime**, ce qui permet aux utilisateurs de changer de langue instantanément sans recharger la page.

## Configuration

### Fichiers de traduction

Les fichiers de traduction se trouvent dans `src/assets/i18n/`:

- **fr.json** : Traductions en français
- **en.json** : Traductions en anglais

Chaque fichier contient une structure clé-valeur organisée par domaine (nav, common, footer, etc.)

### Configuration (app.config.ts)

```typescript
TranslateModule.forRoot({
	defaultLanguage: 'fr',
	loader: {
		provide: TranslateLoader,
		useFactory: HttpLoaderFactory,
		deps: [HttpClient],
	},
}).providers!
```

## Utilisation

### Dans les templates

Utiliser le pipe `translate` :

```html
<!-- Traduction simple -->
<h1>{{ 'nav.home' | translate }}</h1>

<!-- Avec interpolation -->
<p>{{ 'greeting' | translate: {name: userName} }}</p>
```

### Dans les composants TypeScript

```typescript
import { TranslateService } from '@ngx-translate/core'

export class MyComponent {
  private translate = inject(TranslateService)

  // Changer la langue
  changeLanguage(lang: 'fr' | 'en') {
    this.translate.use(lang)
    localStorage.setItem('language', lang)
  }

  // Obtenir une traduction
  this.translate.get('nav.home').subscribe(translated => {
    console.log(translated)
  })
}
```

## Bouton de changement de langue

Un bouton **FR/EN** a été ajouté dans la barre de navigation (app.html):

```html
<div class="language-switch">
	<button (click)="changeLanguage('fr')" [class.active]="currentLanguage() === 'fr'">FR</button>
	<button (click)="changeLanguage('en')" [class.active]="currentLanguage() === 'en'">EN</button>
</div>
```

La langue est persistée dans `localStorage` et restaurée au chargement de la page.

## Ajouter une nouvelle traduction

1. **Ajouter la clé dans les deux fichiers JSON** :

    **fr.json:**

    ```json
    {
    	"section": {
    		"key": "Texte en français"
    	}
    }
    ```

    **en.json:**

    ```json
    {
    	"section": {
    		"key": "Text in English"
    	}
    }
    ```

2. **Utiliser dans le template** :
    ```html
    <h1>{{ 'section.key' | translate }}</h1>
    ```

## Structure des clés

Les clés sont organisées par domaine pour la clarté :

- **nav.\*** : Éléments de navigation
- **common.\*** : Texte courant réutilisable
- **home.\*** : Page d'accueil
- **about.\*** : Page À propos
- **services.\*** : Page Prestations
- **blog.\*** : Pages du blog
- **contact.\*** : Page Contact
- **footer.\*** : Pied de page
- **legal.\*** : Mentions légales
- **privacy.\*** : Politique de confidentialité

## Avantages de cette approche

✅ **Changement instantané de langue** sans rechargement
✅ **Un seul build** pour toutes les langues (reduce taille du site)
✅ **Mises à jour faciles** des traductions (modification JSON sans rebuild)
✅ **Préférence utilisateur persistée** via localStorage
✅ **Performance optimale** avec lazy loading des traductions

## Désactiver l'ancienne i18n (optionnel)

Si vous voulez entièrement supprimer la build-time i18n configurée dans `angular.json` :

1. Supprimez la section `i18n` de `angular.json`
2. Mettez à jour les scripts du build :
    ```json
    "build": "ng build --configuration production"
    ```
    à la place de :
    ```json
    "build:all": "ng build --configuration=production --localize"
    ```
