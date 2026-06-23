# Local start script - MindCare
# Starts backend and frontend in local development.

Write-Host "=== MindCare - Demarrage Local ===" -ForegroundColor Blue
Write-Host ""

# Verify Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js n'est pas installe" -ForegroundColor Red
    exit 1
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "MindCare Mobile App Design"
$backendProcess = $null

# ==========================================
# 1. Backend setup
# ==========================================
Write-Host "Demarrage du Backend..." -ForegroundColor Green
Set-Location $backendDir

if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances backend..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Echec installation backend" -ForegroundColor Red
        exit 1
    }
}

if (-not (Test-Path ".env")) {
    Write-Host "backend/.env introuvable. Ajoutez votre fichier .env puis relancez." -ForegroundColor Red
    exit 1
}

Write-Host "Backend pret (port 3001)" -ForegroundColor Green
Write-Host ""

# ==========================================
# 2. Frontend setup
# ==========================================
Write-Host "Preparation du Frontend..." -ForegroundColor Green
Set-Location $frontendDir

if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dependances frontend..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Echec installation frontend" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Frontend pret (port 8080)" -ForegroundColor Green
Write-Host ""

# ==========================================
# 3. Start both servers
# ==========================================
Write-Host "Lancement de l'application..." -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Appuyez sur Ctrl+C pour arreter" -ForegroundColor Gray
Write-Host ""

try {
    # Force backend port for local run.
    $backendCommand = '$env:PORT=3001; npm start'
    $backendProcess = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile", "-Command", $backendCommand -WorkingDirectory $backendDir -PassThru

    # Start frontend on port 8080.
    Set-Location $frontendDir
    npm run dev

}
finally {
    if ($null -ne $backendProcess -and -not $backendProcess.HasExited) {
        Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
    }
}
