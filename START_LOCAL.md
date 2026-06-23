# Démarrage Local - MindCare

Script simple pour lancer l'application en développement local.

## Utilisation

### Windows (PowerShell)

```powershell
.\start-local.ps1
```

### macOS/Linux

```bash
chmod +x start-local.sh
./start-local.sh
```

## Ce que le script fait

✅ Vérifie que Node.js est installé
✅ Installe les dépendances du backend et frontend
✅ Vérifie que `backend/.env` existe
✅ Lance le backend sur le port 3001
✅ Lance le frontend sur le port 8080

## Accès

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3001

## Arrêt

Appuyez simplement sur **Ctrl+C** dans le terminal

## Prérequis

- Node.js et npm installés
- MongoDB (si vous voulez utiliser la base de données)
- `backend/.env` présent
