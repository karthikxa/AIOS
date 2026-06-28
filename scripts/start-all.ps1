# AVDE Start-All Script
# ─────────────────────────────────────────────────────────────────────────────
# Starts all three services in separate windows:
#   1. FreeLLMAPI LLM Proxy  (port 3001/3002)
#   2. Backend Python Server  (port 8642)
#   3. Frontend Vite Dev Server (port 8000)
#
# Usage: .\scripts\start-all.ps1
# ─────────────────────────────────────────────────────────────────────────────

$root = Split-Path $PSScriptRoot -Parent

Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         AVDE — Starting All Services                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ── 1. FreeLLMAPI LLM Proxy ──────────────────────────────────────────────────
$llmProxyPath = Join-Path $root "llm\llm-proxy"

# Run first-time setup if .env doesn't exist
if (-not (Test-Path (Join-Path $llmProxyPath ".env"))) {
    Write-Host "📦 First-time setup: generating .env for FreeLLMAPI..." -ForegroundColor Yellow
    Push-Location $llmProxyPath
    node setup.mjs
    Pop-Location
}

Write-Host "🚀 Starting FreeLLMAPI proxy (port 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$llmProxyPath'; npm run dev -w server" -WindowStyle Normal

Start-Sleep -Seconds 3  # Give proxy time to initialize

# ── 2. Backend Python Server ──────────────────────────────────────────────────
$backendPath = Join-Path $root "backend"
Write-Host "🚀 Starting backend server (port 8642)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$backendPath'; python server.py" -WindowStyle Normal

Start-Sleep -Seconds 2

# ── 3. Frontend Vite Dev Server ───────────────────────────────────────────────
$frontendPath = Join-Path $root "frontend"

# Install deps if needed
if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $frontendPath
    npm install
    Pop-Location
}

Write-Host "🚀 Starting frontend (port 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontendPath'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  All services started!                               ║" -ForegroundColor Green
Write-Host "║                                                      ║" -ForegroundColor Green
Write-Host "║  Dashboard: http://localhost:8000                    ║" -ForegroundColor Green
Write-Host "║  Backend:   http://localhost:8642                    ║" -ForegroundColor Green
Write-Host "║  LLM Proxy: http://localhost:3001                    ║" -ForegroundColor Green
Write-Host "║  VNC Desktop (Docker): http://localhost:6902         ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:8000"
