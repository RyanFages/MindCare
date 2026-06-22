# MindCare Project

Ce dépôt contient deux parties principales :

1. `backend/` : serveur Node.js Express avec MongoDB pour l'authentification, les journaux et les évaluations.
2. `MindCare Mobile App Design/` : application frontend React + TypeScript avec Vite, Tailwind CSS et shadcn-ui.

## Architecture globale

### Backend

Le backend est une API Express qui utilise MongoDB via Mongoose.

- `backend/server.js` : point d'entrée du serveur.
- `backend/collections/User.js` : modèle utilisateur.
- `backend/collections/journal.js` : modèle de journal personnel.
- `backend/collections/Eval.js` : modèle d'évaluations / check-ins.

Routes principales :

- `POST /api/auth/signup` : création de compte utilisateur.
- `POST /api/auth/login` : authentification utilisateur.
- `PUT /api/auth/profile` : modification du profil.
- `GET /api/journals` : récupération des entrées de journal.
- `POST /api/journals` : ajout d'une entrée de journal.
- `PUT /api/journals/:id` : mise à jour d'une entrée de journal.
- `DELETE /api/journals/:id` : suppression d'une entrée de journal.
- `GET /api/evals` : récupération des évaluations utilisateur.
- `POST /api/evals` : enregistrement d'une nouvelle évaluation.

Le backend protège l'utilisateur avec un hachage d'email stocké en base et un mot de passe bcrypt.
Il peut envoyer certaines évaluations vers un webhook n8n si la variable `N8N_WEBHOOK_URL` est configurée.

### Frontend

Le frontend est une application Vite React TypeScript dans `MindCare Mobile App Design/`.

- `src/App.tsx` : configuration globale des providers, du routeur et des toasts.
- `src/lib/` : contextes globaux (auth, langage, thème), utilitaires et hooks.
- `src/screens/` : écrans principaux de l'application mobile.
- `src/components/` : UI réutilisable et composants shadcn.

Fonctionnalités :

- authentification et stockage local de l'utilisateur
- check-in / évaluation de l'état émotionnel
- journal personnel CRUD
- ressources d'aide et support
- thèmes, traduction et notifications

## Variables d'environnement

### Backend

Créer un fichier `.env` dans `backend/` avec au moins :

```env
MONGO_URI=<votre-mongodb-uri>
EMAIL_HASH_SECRET=<secret-pour-hasher-les-emails>
N8N_WEBHOOK_URL=<optionnel-webhook-n8n>
PORT=3000
```

### Frontend

Le frontend n'utilise pas un `.env` central visible ici, mais peut être configuré si nécessaire par Vite.

## Installation et démarrage

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd "MindCare Mobile App Design"
npm install
npm run dev
```

## Tests frontend

Le frontend utilise `vitest`.

```bash
cd "MindCare Mobile App Design"
npm test
```

## Notes

- Le backend est en CommonJS (`type: commonjs`).
- Le frontend utilise React 18, React Router DOM, TanStack Query et Tailwind CSS.
- Le backend peut fonctionner sans webhook n8n si `N8N_WEBHOOK_URL` n'est pas défini.

## Structure des dossiers

- `backend/`
    - `server.js`
    - `collections/`
        - `User.js`
        - `journal.js`
        - `Eval.js`

- `MindCare Mobile App Design/`
    - `src/`
    - `public/`
    - `package.json`
    - `tsconfig.json`
    - `vite.config.ts`
    - `vitest.config.ts`
