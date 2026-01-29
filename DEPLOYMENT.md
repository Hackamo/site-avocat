# Deployment Guide

## GitHub Pages Deployment (Easiest)

### Prerequisites

- GitHub repository
- GitHub Actions enabled

### Setup

1. **Update `angular.json` for GitHub Pages:**

Set the correct `baseHref` for your repository:

```json
"baseHref": "/site-avocat/"
```

2. **Build both locales:**

```bash
npm run build:all
```

This creates separate builds in:

- `dist/site-avocat/browser/fr/`
- `dist/site-avocat/browser/en/`

3. **Prepare for deployment:**

GitHub Pages doesn't support multiple locale folders by default. You need to flatten the structure:

```bash
# After building, reorganize files
cd dist/site-avocat/browser
mkdir -p deploy
cp -r fr/* deploy/
mkdir -p deploy/en
cp -r en/* deploy/en/
```

4. **Deploy to GitHub Pages:**

```bash
npx angular-cli-ghpages --dir=dist/site-avocat/browser/deploy
```

Or add a deploy script to `package.json`:

```json
"deploy": "ng build --configuration=production --base-href=/site-avocat/ && npx angular-cli-ghpages --dir=dist/site-avocat/browser/fr"
```

5. **Access your site:**

- French: `https://hackamo.github.io/site-avocat/`
- English: `https://hackamo.github.io/site-avocat/en/`

### With Custom Domain (dmartinet-avocat.fr)

If you want to use your custom domain with GitHub Pages:

1. In your GitHub repository settings → Pages:
    - Set custom domain to: `dmartinet-avocat.fr`
    - Enable HTTPS

2. Add a `CNAME` file to `public/`:

```
dmartinet-avocat.fr
```

3. Configure DNS with your registrar:

```
Type: A
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Host: www
Value: hackamo.github.io
```

4. Update `baseHref` in `angular.json`:

```json
"baseHref": "/"
```

---

## O2Switch Deployment (Custom Server)

### Prerequisites

- SSH access to your O2Switch server
- Your domain: dmartinet-avocat.fr

## Step 1: Build Production Files

Run this command locally:

```bash
npm run build:all
```

This creates:

```
dist/site-avocat/
├── browser/
│   ├── fr/          # French static files
│   └── en/          # English static files
└── server/
    ├── fr/          # French server files
    └── en/          # English server files
```

## Step 2: Upload to O2Switch via SSH

### Connect to your server:

```bash
ssh your-username@your-server.o2switch.net
```

### Create app directory (if not exists):

```bash
mkdir -p ~/www/app
cd ~/www/app
```

### From your local machine, upload the files:

```bash
# Upload the entire dist folder
scp -r dist/site-avocat/* your-username@your-server.o2switch.net:~/www/app/
```

Or use SFTP client like FileZilla:

- Host: your-server.o2switch.net
- Protocol: SFTP
- Upload `dist/site-avocat/` contents to `~/www/app/`

## Step 3: Server Setup

### Option A: SSR with Node.js (Recommended)

1. On your server, install dependencies:

```bash
cd ~/www/app
npm install express
```

2. Create a server script `~/www/app/server.js`:

```javascript
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Serve French version (default)
app.use('/fr', express.static(path.join(__dirname, 'browser/fr')))

// Serve English version
app.use('/en', express.static(path.join(__dirname, 'browser/en')))

// Redirect root to French
app.get('/', (req, res) => {
	res.redirect('/fr')
})

// Catch-all for client-side routing (French)
app.get('/fr/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'browser/fr/index.html'))
})

// Catch-all for client-side routing (English)
app.get('/en/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'browser/en/index.html'))
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
```

3. Start the server:

```bash
node server.js
```

4. Configure O2Switch to proxy your domain to this Node.js server (contact O2Switch support for help).

### Option B: Static Hosting (Without SSR)

If SSR isn't required, serve only the `browser/` folder:

1. Upload only `dist/site-avocat/browser/` contents to `~/www/`

2. Create `.htaccess` in `~/www/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect root to /fr/
  RewriteRule ^$ /fr/ [R=301,L]

  # French version
  RewriteCond %{REQUEST_URI} ^/fr/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^fr/(.*)$ /fr/index.html [L]

  # English version
  RewriteCond %{REQUEST_URI} ^/en/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^en/(.*)$ /en/index.html [L]
</IfModule>
```

## Step 4: Test Your Site

- French: https://dmartinet-avocat.fr/fr/
- English: https://dmartinet-avocat.fr/en/

## Updating the Site

When you make changes:

1. Build locally: `npm run build:all`
2. Upload new files via SSH/SFTP
3. Restart Node.js server if using SSR

## Troubleshooting

### Assets not loading?

Check that `baseHref` is set correctly in `angular.json` (currently set to `/`).

### 404 errors on page refresh?

Make sure the `.htaccess` rewrite rules or Node.js catch-all routes are working.

### Need help with O2Switch?

Contact O2Switch support to:

- Enable Node.js if using SSR
- Configure domain routing
- Set up SSL certificate
