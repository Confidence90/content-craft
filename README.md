# Site Vitrine + Dashboard Admin

Application web complète composée d'un site vitrine public et d'un tableau de bord d'administration, permettant de gérer dynamiquement le contenu des pages, les services, les contacts et les notifications.

---

## Stack technique

### Frontend
- **React 18** + **TypeScript** — framework UI
- **Vite** — bundler et serveur de développement
- **Tailwind CSS** — styling utilitaire
- **React Router v6** — navigation
- **TanStack Query (React Query)** — gestion du cache et des requêtes API
- **Axios** — client HTTP avec intercepteurs JWT
- **Framer Motion** — animations
- **Lucide React** — icônes

### Backend
- **Node.js** + **Express** — serveur HTTP
- **Sequelize** — ORM
- **MySQL 9** — base de données
- **JWT** (jsonwebtoken) — authentification
- **Multer** — upload de fichiers
- **Winston** — logs
- **dotenv** — variables d'environnement

---

## Structure du projet

```
projet/
├── site-/                          # Backend Express
│   ├── config/
│   │   ├── database.js             # Connexion Sequelize MySQL
│   │   └── logger.config.js        # Configuration Winston
│   ├── controllers/
│   │   ├── auth.controller.js      # Connexion, déconnexion, refresh token
│   │   ├── contact.controller.js   # CRUD contacts/messages
│   │   ├── service.controller.js   # CRUD services
│   │   ├── solution.controller.js  # CRUD solutions
│   │   ├── entreprise.controller.js
│   │   ├── notification.controller.js
│   │   ├── temoignage.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js       # Vérification JWT (verifyToken)
│   │   ├── updateActivity.middleware.js  # Met à jour last_activity user
│   │   └── uploadVideo.middleware.js    # Multer pour vidéos
│   ├── models/
│   │   ├── index.js                # Chargement et associations Sequelize
│   │   ├── Users.models.js         # Modèle utilisateur (ADMIN / VISITEUR)
│   │   ├── Contact.models.js       # Messages du formulaire de contact
│   │   ├── Service.models.js       # Services proposés
│   │   ├── Solution.models.js      # Solutions numériques
│   │   ├── Notifications.models.js # Notifications admin
│   │   ├── Temoinage.models.js     # Témoignages clients
│   │   ├── Video.models.js         # Vidéos associées
│   │   ├── Enterprise.models.js    # Informations entreprise
│   │   ├── PageSection.model.js    # Sections de pages (CMS)
│   │   ├── ContentBlock.model.js   # Blocs de contenu dans les sections
│   │   ├── HistoriqueLog.model.js  # Journal des actions
│   │   ├── ServiceSolution.models.js
│   │   └── token.model.js          # Refresh tokens
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── service.routes.js
│   │   ├── solution.routes.js
│   │   ├── notification.routes.js
│   │   ├── temoignage.routes.js
│   │   ├── user.routes.js
│   │   ├── entreprise.routes.js
│   │   └── pageSection.routes.js   # CMS pages et blocs
│   ├── scripts/
│   │   └── seed-pages.js           # Script de seed des données initiales
│   ├── services/
│   │   ├── historique.service.js   # Journalisation des actions
│   │   └── notification.service.js # Création de notifications
│   ├── uploads/                    # Fichiers uploadés (images, vidéos)
│   ├── .env                        # Variables d'environnement (ne pas commiter)
│   └── server.js                   # Point d'entrée du serveur
│
└── site-frontend/                  # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── AdminContacts.tsx       # Liste et consultation des contacts
    │   │   │   ├── AdminMessages.tsx       # Alias de AdminContacts (legacy)
    │   │   │   ├── AdminNotifications.tsx  # Gestion des notifications
    │   │   │   ├── AdminOverview.tsx       # Tableau de bord avec statistiques
    │   │   │   ├── AdminPageBuilder.tsx    # CMS visuel (sections + blocs)
    │   │   │   ├── AdminServices.tsx       # CRUD services
    │   │   │   └── ImageUpload.tsx         # Composant upload d'image
    │   │   ├── blocks/
    │   │   │   └── BlockRenderer.tsx       # Rendu dynamique des blocs de contenu
    │   │   └── layout/
    │   │       └── Layout.tsx              # Layout principal (header, footer)
    │   ├── hooks/
    │   │   ├── useAuth.tsx                 # Contexte authentification
    │   │   ├── useLanguage.tsx             # Contexte langue (FR/EN)
    │   │   ├── useContacts.ts             # React Query contacts
    │   │   ├── useServices.ts             # React Query services
    │   │   ├── useNotifications.ts        # React Query notifications
    │   │   └── usePageContent.ts          # React Query sections de page (CMS)
    │   ├── pages/
    │   │   ├── Index.tsx                  # Page d'accueil
    │   │   ├── Presentation.tsx           # Page À propos
    │   │   ├── Services.tsx               # Page Services
    │   │   ├── Solutions.tsx              # Page Solutions
    │   │   ├── Contact.tsx                # Page Contact avec formulaire
    │   │   ├── AdminLogin.tsx             # Page de connexion admin
    │   │   └── AdminDashboard.tsx         # Dashboard admin principal
    │   ├── services/
    │   │   ├── api.ts                     # Instance Axios + intercepteurs JWT
    │   │   ├── contact.service.ts
    │   │   ├── service.service.ts
    │   │   ├── notification.service.ts
    │   │   ├── solution.service.ts
    │   │   └── temoignage.service.ts
    │   └── App.tsx                        # Routes principales
    └── .env                               # VITE_API_URL (ne pas commiter)
```

---

## Installation

### Prérequis
- Node.js 18+
- MySQL 9+ (ou compatible)
- npm

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd projet
```

### 2. Configurer le backend

```bash
cd site-
npm install
```

Créez le fichier `.env` à la racine de `site-/` :

```env
PORT=5002
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=site_db
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=votre_secret_jwt_tres_long
REFRESH_SECRET=votre_secret_refresh_tres_long
EMAIL_USER=votre@email.com
EMAIL_PASS=votre_mot_de_passe_email
```

### 3. Créer la base de données

```bash
# Dans MySQL
mysql -u root -p
CREATE DATABASE site_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

### 4. Démarrer le backend (crée les tables automatiquement)

```bash
npm start
```

Sequelize crée automatiquement toutes les tables au premier démarrage grâce à `sequelize.sync({ alter: true })`.

### 5. Insérer les données initiales (une seule fois)

```bash
node scripts/seed-pages.js
```

Ce script insère les sections et blocs de contenu pour toutes les pages (home, presentation, solutions, contact). Il est idempotent — vous pouvez le relancer sans risque, il ne duplique pas les données.

### 6. Créer un compte administrateur

Faites un POST sur l'API pour créer votre premier admin :

```bash
curl -X POST http://localhost:5002/api/auth/inscription \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Admin",
    "prenom": "Site",
    "username": "admin",
    "email": "admin@votre-site.com",
    "password": "votre_mot_de_passe",
    "telephone": "0600000000",
    "role": "ADMIN"
  }'
```

### 7. Configurer le frontend

```bash
cd ../site-frontend
npm install
```

Créez `.env` à la racine de `site-frontend/` :

```env
VITE_API_URL=http://localhost:5002/api
```

### 8. Démarrer le frontend

```bash
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

---

## Utilisation

### Site public

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Hero, à propos, témoignages, CTA |
| Présentation | `/presentation` | Mission, vision, valeurs, équipe |
| Services | `/services` | Liste des services depuis la BDD |
| Solutions | `/solutions` | Grille de solutions |
| Contact | `/contact` | Formulaire de contact |

### Dashboard admin

Accédez à `/admin/login` avec votre compte ADMIN.

| Onglet | Description |
|--------|-------------|
| Aperçu | Statistiques globales (contacts, services, notifications) |
| Pages | CMS visuel — gérez sections et blocs de contenu par page |
| Services | Ajout, modification, suppression des services |
| Messages | Consultation des anciens contacts (legacy) |
| Contacts | Liste complète des contacts avec recherche et pagination |
| Notifications | Notifications admin avec marquage lu/non lu |

---

## Architecture CMS (Pages dynamiques)

Le contenu des pages est géré via deux tables :

### `page_sections`
Chaque section correspond à un bloc de page (hero, about, testimonials...).

| Champ | Description |
|-------|-------------|
| `page` | Identifiant de la page (`home`, `presentation`, `solutions`, `contact`) |
| `section_key` | Clé unique de la section (ex: `hero`, `about`, `cta`) |
| `title_fr` / `title_en` | Titre bilingue |
| `subtitle_fr` / `subtitle_en` | Sous-titre bilingue |
| `bg_variant` | Fond (`default`, `hero`, `secondary`) |
| `sort_order` | Ordre d'affichage |
| `is_visible` | Afficher ou masquer la section |

### `content_blocks`
Chaque bloc appartient à une section et contient un type de contenu précis.

| Type | Usage |
|------|-------|
| `text` | Paragraphe, badge ou titre (`metadata.variant`) |
| `image` | Image avec URL dans `media_url` |
| `video` | Iframe vidéo |
| `stat` | Statistique avec icône et label |
| `testimonial` | Témoignage client avec nom et rôle |
| `card` | Carte avec icône, titre, tag et lien |
| `team_member` | Membre d'équipe avec photo ou initiales |
| `feature_list` | Liste de fonctionnalités |
| `cta` | Bouton d'appel à l'action avec lien |
| `contact_info` | Information de contact avec icône |

---

## API — Principales routes

### Authentification (public)
```
POST /api/auth/inscription        Créer un compte
POST /api/auth/connexion          Se connecter → retourne accessToken + refreshToken
POST /api/auth/deconnexion        Se déconnecter
POST /api/auth/refresh            Rafraîchir le token
GET  /api/auth/me                 Profil de l'utilisateur connecté
```

### CMS Pages (public en lecture)
```
GET  /api/page-sections?page=home     Sections visibles d'une page
GET  /api/page-sections/admin?page=home  Toutes les sections (auth requise)
POST /api/page-sections               Créer une section (auth)
PUT  /api/page-sections/:id           Modifier une section (auth)
DELETE /api/page-sections/:id         Supprimer section + blocs (auth)
POST /api/page-sections/:id/blocks    Ajouter un bloc (auth)
PUT  /api/page-sections/blocks/:id    Modifier un bloc (auth)
DELETE /api/page-sections/blocks/:id  Supprimer un bloc (auth)
```

### Contacts (POST public, GET/DELETE auth)
```
POST   /api/contacts              Envoyer un message de contact
GET    /api/contacts              Liste des contacts (auth)
DELETE /api/contacts/:id          Supprimer un contact (auth)
```

### Services (GET public, POST/PUT/DELETE auth)
```
GET    /api/services              Liste des services
GET    /api/services/:id          Détail d'un service
POST   /api/services              Créer un service (auth)
PUT    /api/services/:id          Modifier un service (auth)
DELETE /api/services/:id          Supprimer un service (auth)
```

### Notifications (auth)
```
GET  /api/notifications/user/:userId               Notifications d'un utilisateur
GET  /api/notifications/user/:userId/unread-count  Nombre de non lues
PUT  /api/notifications/:id/read                   Marquer comme lue
PUT  /api/notifications/user/:userId/mark-all-read Tout marquer comme lu
DELETE /api/notifications/:id                      Supprimer une notification
```

---

## Authentification

Le système utilise deux tokens JWT :

- **accessToken** : durée courte (24h), envoyé dans le header `Authorization: Bearer <token>`
- **refreshToken** : durée longue, utilisé pour renouveler l'accessToken automatiquement

Les tokens sont stockés dans `localStorage`. L'intercepteur Axios dans `src/services/api.ts` gère automatiquement le renouvellement en cas de 401.

### Rôles utilisateurs

| Rôle | Accès |
|------|-------|
| `VISITEUR` | Lecture seule du site public |
| `ADMIN` | Accès complet au dashboard admin |

---

## Internationalisation (FR/EN)

Le site supporte le français et l'anglais. La langue est gérée via le contexte `useLanguage` et stockée dans `localStorage`.

Tous les contenus CMS ont des champs `_fr` et `_en`. La fonction `t(fr, en)` retourne automatiquement la bonne langue selon le contexte.

---

## Variables d'environnement

### Backend (`site-/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `PORT` | Port du serveur | `5002` |
| `DB_USER` | Utilisateur MySQL | `root` |
| `DB_PASSWORD` | Mot de passe MySQL | `monmotdepasse` |
| `DB_NAME` | Nom de la base | `site_db` |
| `DB_HOST` | Hôte MySQL | `localhost` |
| `DB_PORT` | Port MySQL | `3306` |
| `JWT_SECRET` | Secret pour les access tokens | chaîne aléatoire longue |
| `REFRESH_SECRET` | Secret pour les refresh tokens | chaîne aléatoire longue |
| `EMAIL_USER` | Email pour l'envoi de mails | `app@gmail.com` |
| `EMAIL_PASS` | Mot de passe email | mot de passe app Gmail |

### Frontend (`site-frontend/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de base de l'API | `http://localhost:5002/api` |

---

## Commandes utiles

```bash
# Backend
npm start                        # Démarrer le serveur
node scripts/seed-pages.js       # Insérer les données initiales

# Frontend
npm run dev                      # Serveur de développement
npm run build                    # Build de production
npm run preview                  # Prévisualiser le build

# Base de données (depuis MySQL)
USE site_db;
SELECT COUNT(*) FROM page_sections;
SELECT COUNT(*) FROM content_blocks;
SELECT * FROM users;
```

---

## Notes importantes

- Ne jamais commiter les fichiers `.env`
- Le script `seed-pages.js` est idempotent (sûr à relancer)
- `sequelize.sync({ alter: true })` modifie les tables existantes au démarrage — à désactiver en production
- Les uploads sont stockés dans `site-/uploads/` — à configurer avec un CDN en production
- Le polling des notifications est configuré à 30 secondes dans `useNotifications.ts`