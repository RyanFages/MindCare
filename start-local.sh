#!/bin/bash

# Local start script - MindCare
# Starts backend and frontend for local development.

set -u

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/MindCare Mobile App Design"
BACKEND_PID=""

cleanup() {
    if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        kill "$BACKEND_PID" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

echo "=== MindCare - Demarrage Local ==="
echo ""

# Verify Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "Node.js n'est pas installe"
    exit 1
fi

# ==========================================
# 1. Backend setup
# ==========================================
echo "Demarrage du Backend..."

cd "$BACKEND_DIR" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installation des dependances backend..."
    npm install || {
        echo "Echec installation backend"
        exit 1
    }
fi

if [ ! -f ".env" ]; then
    echo "backend/.env introuvable. Ajoutez votre fichier .env puis relancez."
    exit 1
fi

echo "Backend pret (port 3001)"
echo ""

# ==========================================
# 2. Frontend setup
# ==========================================
echo "Preparation du Frontend..."

cd "$FRONTEND_DIR" || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installation des dependances frontend..."
    npm install || {
        echo "Echec installation frontend"
        exit 1
    }
fi

echo "Frontend pret (port 8080)"
echo ""

# ==========================================
# 3. Start both servers
# ==========================================
echo "Lancement de l'application..."
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:8080"
echo "Appuyez sur Ctrl+C pour arreter"
echo ""

cd "$BACKEND_DIR" || exit 1
PORT=3001 npm start &
BACKEND_PID=$!

# Give backend time to initialize.
sleep 2
if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "Le backend s'est arrete au demarrage. Verifiez les logs backend."
    exit 1
fi

cd "$FRONTEND_DIR" || exit 1
npm run dev -- --port 8080
