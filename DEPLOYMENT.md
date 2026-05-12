# Guide de Déploiement SimONU Marseille 🚀

Ce guide vous accompagne pour déployer votre site sur internet avec le backend email fonctionnel.

## 📋 Prérequis

- ✅ Compte GitHub (gratuit)
- ✅ Compte Railway (gratuit) → [railway.app](https://railway.app)
- ✅ Compte Vercel (gratuit) → [vercel.com](https://vercel.com)

---

## 🔧 Étape 1 : Préparer le Repository GitHub

### 1.1 Créer un nouveau repository

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur **"New repository"**
3. Nom : `simonu-marseille`
4. Visibilité : **Public** ou **Private** (votre choix)
5. **NE PAS** cocher "Add README"
6. Cliquez sur **"Create repository"**

### 1.2 Pousser votre code

Dans votre terminal, depuis le dossier du projet :

```bash
# Initialiser git (si ce n'est pas déjà fait)
git init

# Ajouter tous les fichiers (le .env est déjà ignoré par .gitignore)
git add .

# Créer le premier commit
git commit -m "Initial commit - SimONU Marseille website"

# Lier au repository GitHub (remplacer YOUR_USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/YOUR_USERNAME/simonu-marseille.git

# Pousser le code
git push -u origin main
```

> ⚠️ **IMPORTANT** : Vérifiez que le fichier `.env` n'est PAS dans votre repository GitHub ! Il doit être ignoré par `.gitignore`.

---

## 🚂 Étape 2 : Déployer le Backend sur Railway

### 2.1 Créer un compte et un projet

1. Allez sur [railway.app](https://railway.app)
2. Cliquez sur **"Start a New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Autorisez Railway à accéder à votre GitHub
5. Sélectionnez le repository `simonu-marseille`

### 2.2 Configurer le projet

Railway va détecter automatiquement votre projet Node.js.

1. Une fois le projet créé, cliquez sur votre service
2. Allez dans l'onglet **"Variables"**
3. Ajoutez les variables suivantes :

```
EMAIL_USER=rabdelmalek794@gmail.com
EMAIL_PASS=dftq bptx glyj ojfr
NODE_ENV=production
FRONTEND_URL=https://simonu-marseille.vercel.app
```

> 📝 **Note** : L'URL `FRONTEND_URL` sera mise à jour après le déploiement Vercel à l'étape 3.

### 2.3 Configurer le fichier de démarrage

Railway doit savoir comment démarrer votre serveur.

1. Dans l'onglet **"Settings"**
2. Trouvez **"Start Command"**
3. Entrez : `node server.js`
4. Cliquez sur **"Save"**

### 2.4 Déployer

1. Cliquez sur **"Deploy"** (ou attendez le déploiement automatique)
2. Une fois déployé, allez dans **"Settings"** → **"Networking"**
3. Cliquez sur **"Generate Domain"**
4. **Copiez cette URL** (elle ressemblera à `https://simonu-marseille-production-xxxx.up.railway.app`)

### 2.5 Tester le backend

Dans votre navigateur, allez sur :
```
https://votre-url-railway.up.railway.app/api/health
```

Vous devriez voir :
```json
{"status":"OK","message":"SimONU Backend is running"}
```

✅ **Backend déployé !**

---

## ▲ Étape 3 : Déployer le Frontend sur Vercel

### 3.1 Créer un compte et importer le projet

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Import Git Repository"**
4. Autorisez Vercel à accéder à votre GitHub
5. Sélectionnez le repository `simonu-marseille`

### 3.2 Configurer le build

Vercel va détecter automatiquement Vite. Vérifiez que :

- **Framework Preset** : Vite
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

### 3.3 Ajouter la variable d'environnement

1. Avant de déployer, cliquez sur **"Environment Variables"**
2. Ajoutez :
   - **Name** : `VITE_API_URL`
   - **Value** : `https://votre-url-railway.up.railway.app` (celle copiée à l'étape 2.4)
3. Cliquez sur **"Add"**

### 3.4 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes
3. Une fois terminé, Vercel vous donne une URL (ex: `https://simonu-marseille.vercel.app`)

✅ **Frontend déployé !**

---

## 🔄 Étape 4 : Finaliser la Configuration

### 4.1 Mettre à jour Railway avec l'URL Vercel

1. Retournez sur [Railway](https://railway.app)
2. Allez dans **"Variables"**
3. Modifiez `FRONTEND_URL` avec votre vraie URL Vercel : `https://simonu-marseille.vercel.app`
4. Sauvegardez
5. Railway va redéployer automatiquement

### 4.2 Ajouter un domaine personnalisé (optionnel)

Si vous avez un nom de domaine (ex: `simonumarseille.com`) :

**Sur Vercel (frontend) :**
1. Allez dans **"Settings"** → **"Domains"**
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS

**Sur Railway (backend) :**
1. Allez dans **"Settings"** → **"Networking"**
2. Ajoutez un domaine personnalisé (ex: `api.simonumarseille.com`)

---

## ✅ Étape 5 : Tester en Production

### Tests à effectuer :

1. **Ouvrez votre site** : `https://simonu-marseille.vercel.app`
2. **Testez les langues** : Changez entre FR, EN, ES, RU, ZH, AR
3. **Testez le formulaire de contact** :
   - Remplissez tous les champs
   - Envoyez le message
   - Vérifiez que vous recevez l'email à `rabdelmalek794@gmail.com`
   - Vérifiez l'accusé de réception dans votre boîte mail
4. **Testez sur mobile** : Le site est responsive
5. **Vérifiez le SSL** : L'URL doit commencer par `https://`

---

## 🔄 Déploiements Futurs (Automatiques)

**Bonne nouvelle** : Maintenant que tout est configuré, les futurs déploiements sont **100% automatiques** !

Chaque fois que vous modifiez votre code :

```bash
# Modifier le code localement
# Tester avec npm run dev:full

# Quand c'est prêt :
git add .
git commit -m "Description des changements"
git push
```

→ **Railway** et **Vercel** déploient automatiquement ! 🎉

---

## 📊 Monitoring et Logs

### Vérifier les logs Backend (Railway)

1. Sur Railway, cliquez sur votre service
2. Allez dans **"Deployments"**
3. Cliquez sur le dernier déploiement
4. Vous voyez les logs en temps réel :
   ```
   🚀 Serveur email démarré sur le port 3001
   📧 Email configuré: rabdelmalek794@gmail.com
   ✅ Serveur email prêt
   ```

### Vérifier les logs Frontend (Vercel)

1. Sur Vercel, allez dans **"Deployments"**
2. Cliquez sur le dernier déploiement
3. Onglet **"Logs"** pour voir les erreurs éventuelles

---

## 💰 Coûts

| Service | Plan | Coût |
|---------|------|------|
| **Vercel** | Hobby | **Gratuit** (100GB/mois) |
| **Railway** | Trial | **$5/mois offerts** (~500h) |
| **GitHub** | Free | **Gratuit** |

**Total : 0-5€/mois** 🎉

---

## ❓ Dépannage

### Le formulaire ne fonctionne pas

1. Vérifiez que `VITE_API_URL` sur Vercel pointe bien vers Railway
2. Vérifiez que `FRONTEND_URL` sur Railway pointe bien vers Vercel
3. Ouvrez la console du navigateur (F12) → onglet "Network" pour voir les erreurs

### Le backend ne démarre pas sur Railway

1. Vérifiez que toutes les variables d'environnement sont configurées
2. Vérifiez que le "Start Command" est `node server.js`
3. Consultez les logs Railway pour voir l'erreur précise

### Problème d'envoi d'email

1. Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects sur Railway
2. Vérifiez que le mot de passe est bien un **App Password** Gmail
3. Testez le endpoint `/api/health` pour vérifier que le backend tourne

---

## 🎓 Ressources

- [Documentation Railway](https://docs.railway.app)
- [Documentation Vercel](https://vercel.com/docs)
- [Créer un App Password Gmail](https://support.google.com/accounts/answer/185833)

---

**🎉 Félicitations ! Votre site est maintenant en production !**

URL de votre site : `https://simonu-marseille.vercel.app`
