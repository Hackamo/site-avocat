# Guide: Ajouter des Articles Dynamiques au Blog

## ✅ Ce qui a été implémenté

### 1. **JSON Configuration File** (`src/assets/blog/articles-config.json`)

- Stocke la configuration de tous les articles
- Format facile à gérer
- Peut être modifié via l'API

### 2. **BlogDataService Amélioré** (`src/app/services/blog-data.service.ts`)

- `getMetadata()` - Récupère la configuration JSON
- `updateMetadata()` - Sauvegarde la configuration mise à jour
- Charge automatiquement les fichiers markdown

### 3. **Admin Panel Component** (`src/app/blog-admin/`)

- Interface pour créer/supprimer des articles
- Upload de fichiers markdown
- Formulaire avec validation

### 4. **Backend API** (`src/server.ts`)

- Endpoint: `POST /api/upload-blog-file`
- Gère l'upload des fichiers markdown
- Les fichiers sont sauvegardés dans `/assets/blog/`

### 5. **Route Admin** (`src/app/app.routes.ts`)

- Accessible via: `/admin/blog`

---

## 🚀 Utilisation

### Accéder au panneau d'administration

1. Allez à: `http://localhost:4200/admin/blog`
2. Cliquez sur "Créer un nouvel article"

### Créer un nouvel article

1. Remplissez le formulaire:
    - **Slug**: `mon-article` (URL-friendly, lettres/chiffres/tirets)
    - **Titre**: Titre de l'article
    - **Résumé**: Court résumé
    - **Catégorie**: Choisir parmi les options
    - **Date**: Sélectionner la date
    - **Fichier Markdown**: Uploader votre fichier `.md`
    - **Articles similaires** (optionnel): Slugs séparés par des virgules

2. Cliquez sur "Créer l'article"

3. Votre article apparaîtra:
    - Sur la page du blog: `/blog`
    - À l'URL: `/blog/{slug}`

### Supprimer un article

1. Trouvez l'article dans la liste
2. Cliquez sur le bouton "Supprimer"

---

## 📝 Format du fichier Markdown

Votre fichier `.md` doit être en markdown valide:

```markdown
# Titre de l'article

Votre contenu ici...

## Sous-titre

Plus de contenu...

### Sous-sous-titre

Du texte avec **gras** et _italique_.

- Liste
- d'éléments
```

---

## 🔧 Structure des fichiers

```
src/
├── app/
│   ├── blog-admin/
│   │   ├── blog-admin.ts
│   │   ├── blog-admin.html
│   │   └── blog-admin.scss
│   └── services/
│       └── blog-data.service.ts (modifié)
├── assets/
│   └── blog/
│       ├── articles-config.json
│       ├── oqtf-erreurs-eviter.md
│       ├── regularisation-...md
│       └── ... (autres articles)
└── server.ts (modifié avec API endpoint)
```

---

## ⚙️ Configuration avancée

### Ajouter une nouvelle catégorie

Modifiez `blog-admin.html` et ajoutez une option dans le `<select>`:

```html
<option value="Ma Nouvelle Catégorie">Ma Nouvelle Catégorie</option>
```

### Changer le chemin des uploads

Dans `server.ts`, modifiez le chemin:

```typescript
const blogDir = join(import.meta.dirname, '../browser/assets/blog')
```

---

## 🔐 Sécurité (Étapes Futures)

Pour protéger l'accès admin, vous pouvez ajouter:

1. **Route Guard** - Vérifier l'authentification
2. **Mot de passe simple** - Protéger le formulaire
3. **Firebase Auth** - Authentification complète
4. **JWT Tokens** - Pour l'API backend

Exemple de guard simple:

```typescript
canActivate: () => {
	return localStorage.getItem('adminPassword') === 'your-password'
}
```

---

## 📱 Responsive

- ✅ Desktop
- ✅ Tablette
- ✅ Mobile

---

## 🎨 Styles personnalisés

L'interface utilise les styles du projet. Pour personnaliser:

1. Modifiez `blog-admin.scss`
2. Adapté au reste du design du site

---

## ✨ Prochaines étapes recommandées

1. **Ajouter un prévisualisation** de l'article avant création
2. **Édition d'articles** (modifier existants)
3. **Authentification admin** avec mot de passe
4. **Permissions** (multi-users)
5. **Suppression des fichiers markdown** quand on supprime un article
6. **Backup automatique** des configurations

---

## 🐛 Dépannage

### Les articles ne s'affichent pas après création

- Vérifiez que le fichier markdown a été uploadé
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que le slug n'existe pas déjà

### Erreur "Failed to upload file"

- Vérifiez les permissions du dossier `/assets/blog/`
- Assurez-vous que le fichier markdown est valide

### Slug invalide

- Utilisez uniquement: a-z, 0-9, et tirets (-)
- Commencez par une lettre
- Pas d'espaces ni caractères spéciaux

---

## 📧 Questions?

Pour des modifications plus avancées (authentification, bases de données, etc.), consultez la documentation Angular: https://angular.dev
