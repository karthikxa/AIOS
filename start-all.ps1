# start-all.ps1 — Single command to launch the entire AVDE stack
# Usage: powershell -ExecutionPolicy Bypass -File start-all.ps1

$ErrorActionPreference = "SilentlyContinue"
$pythonPath = "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe"
$avdeRoot = "C:\Users\balur\Downloads\AVDE"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  AVDE — Starting Everything" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# ── Kill old processes on our ports ────────────────────────────────────────
Write-Host "[0/5] Cleaning up old processes..." -ForegroundColor Yellow
@(3001, 3002, 8000, 8642, 8765) | ForEach-Object {
    $conns = Get-NetTCPConnection -LocalPort $_ -ErrorAction SilentlyContinue
    if ($conns) {
        $conns | ForEach-Object {
            Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
}
Start-Sleep -Seconds 2
Write-Host "  Done." -ForegroundColor Gray

# ── 1. LLM Proxy (ports 3001 + 3002) ──────────────────────────────────────
Write-Host "[1/5] Starting LLM Proxy (3001/3002)..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$avdeRoot\llm\llm-proxy`" && set PORT=3001 && set LOCAL_PORT=3002 && npm run dev -w server" -WindowStyle Minimized

# ── 2. Backend (port 8642) ────────────────────────────────────────────────
Write-Host "[2/5] Starting Backend (8642)..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$avdeRoot\backend`" && set ZED_HOME=C:\Users\balur\.hermes&& set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1&& `"$pythonPath`" -m uvicorn server:app --host 0.0.0.0 --port 8642" -WindowStyle Minimized

# ── 3. Dashboard (port 8000) ──────────────────────────────────────────────
Write-Host "[3/5] Starting Dashboard (8000)..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$avdeRoot\frontend`" && npm run dev" -WindowStyle Minimized

# ── 4. Computer Agent (port 8765) ─────────────────────────────────────────
Write-Host "[4/5] Starting Computer Agent (8765)..." -ForegroundColor Cyan
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$avdeRoot\desktop-agent\agent`" && `"$pythonPath`" -m uvicorn main:app --host 0.0.0.0 --port 8765" -WindowStyle Minimized

# ── 5. VNC Desktop (port 6902) ────────────────────────────────────────────
Write-Host "[5/5] Checking VNC Desktop (6902)..." -ForegroundColor Cyan
$vnc = docker ps --filter "name=vnc-desktop" --format "{{.Status}}"
if ($vnc -match "Up") {
    Write-Host "  VNC already running." -ForegroundColor Gray
} else {
    Write-Host "  Starting VNC container..." -ForegroundColor Gray
    docker start vnc-desktop 2>$null
    if ($LASTEXITCODE -ne 0) {
        docker run -d --name vnc-desktop -p 6902:6901 -e VNC_PW=headless -e DISPLAY_WIDTH=1920 -e DISPLAY_HEIGHT=1080 accetto/ubuntu-vnc-xfce-g3:latest
    }
}

# ── Wait for services to come up ──────────────────────────────────────────
Write-Host ""
Write-Host "Waiting for services..." -ForegroundColor Yellow
$maxWait = 30
$elapsed = 0
while ($elapsed -lt $maxWait) {
    Start-Sleep -Seconds 2
    $elapsed += 2
    $ports = @(3001, 3002, 8000, 8642, 8765)
    $ready = 0
    foreach ($p in $ports) {
        if (Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue) { $ready++ }
    }
    Write-Host "`r  $ready/5 services ready... ($elapsed s)" -NoNewline -ForegroundColor Gray
    if ($ready -eq 5) { break }
}
Write-Host ""

# ── Status Report ──────────────────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Status" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

$allOk = $true
function Check-Port($port, $label) {
    if (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue) {
        Write-Host "  [OK] $label : http://127.0.0.1:$port" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $label (port $port)" -ForegroundColor Red
        $script:allOk = $false
    }
}

Check-Port 3001 "LLM Proxy"
Check-Port 3002 "LLM Local (no-auth)"
Check-Port 8000 "Dashboard"
Check-Port 8642 "Backend"
Check-Port 8765 "Computer Agent"

$vncUp = docker ps --filter "name=vnc-desktop" --format "{{.Status}}" | Select-String "Up"
if ($vncUp) {
    Write-Host "  [OK] VNC Desktop : http://127.0.0.1:6902" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] VNC Desktop" -ForegroundColor Red
    $allOk = $false
}

# ── Open browser ──────────────────────────────────────────────────────────
Write-Host ""
if ($allOk) {
    Write-Host "All services running! Opening dashboard..." -ForegroundColor Green
    Start-Process "http://localhost:8000"
} else {
    Write-Host "Some services failed. Check the windows above." -ForegroundColor Yellow
    Write-Host "Try opening http://localhost:8000 anyway." -ForegroundColor Yellow
    Start-Process "http://localhost:8000"
}
