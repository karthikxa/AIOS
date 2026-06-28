# launch-all.ps1
# Script to launch all AVDE services in the background

Write-Host "=== Stopping any existing services on ports 3001, 3002, 8642, 8000, 8765 ===" -ForegroundColor Cyan

function Stop-Process-On-Port($port) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            $pidToKill = $conn.OwningProcess
            if ($pidToKill -gt 0) {
                Write-Host "Killing process $pidToKill on port $port" -ForegroundColor Yellow
                Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

Stop-Process-On-Port 3001
Stop-Process-On-Port 3002
Stop-Process-On-Port 8642
Stop-Process-On-Port 8000
Stop-Process-On-Port 8765

Start-Sleep -Seconds 2

# 1. Start freellmapi
Write-Host "=== Starting freellmapi (ports 3001/3002) ===" -ForegroundColor Cyan
$freellmapiDir = "C:\Users\balur\Downloads\AVDE\llm\llm-proxy"
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$freellmapiDir`" && set PORT=3001 && set LOCAL_PORT=3002 && npm run dev -w server" -WindowStyle Normal
Write-Host "  freellmapi starting..." -ForegroundColor Gray

# 2. Start Zed Agent Backend (8642)
Write-Host "=== Starting Zed Agent Backend (port 8642) ===" -ForegroundColor Cyan
$backendDir = "C:\Users\balur\Downloads\AVDE\backend"
$pythonPath = "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe"
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$backendDir`" && set ZED_HOME=C:\Users\balur\.hermes&& set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1&& `"$pythonPath`" -m uvicorn server:app --host 0.0.0.0 --port 8642" -WindowStyle Normal
Write-Host "  Zed Agent Backend starting..." -ForegroundColor Gray

# 3. Start Zed Pro Dashboard (port 8000)
Write-Host "=== Starting Zed Pro Dashboard (port 8000) ===" -ForegroundColor Cyan
$dashboardDir = "C:\Users\balur\Downloads\AVDE\frontend"
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$dashboardDir`" && npm run dev" -WindowStyle Normal
Write-Host "  Dashboard frontend starting..." -ForegroundColor Gray

# 4. Start Computer Agent (port 8765)
Write-Host "=== Starting Computer Agent (port 8765) ===" -ForegroundColor Cyan
$agentDir = "C:\Users\balur\Downloads\AVDE\desktop-agent\agent"
Start-Process "cmd.exe" -ArgumentList "/k", "cd /d `"$agentDir`" && `"$pythonPath`" -m uvicorn main:app --host 0.0.0.0 --port 8765" -WindowStyle Normal
Write-Host "  Computer Agent starting..." -ForegroundColor Gray

Write-Host "`nWaiting for servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 12

$ok = $true
if (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] Dashboard: http://127.0.0.1:8000" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 8000 (Dashboard Frontend)" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 8642 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] Agent API: http://127.0.0.1:8642" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 8642 (Zed Agent Backend)" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] freellmapi: http://127.0.0.1:3001" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 3001 (LLM Server)" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] Local AI: http://127.0.0.1:3002" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 3002 (Local AI)" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 8765 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] Computer Agent: http://127.0.0.1:8765" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 8765 (Computer Agent)" -ForegroundColor Red; $ok = $false }

if ($ok) {
    Write-Host "`nAll servers running successfully! Open http://localhost:8000/" -ForegroundColor Green
} else {
    Write-Host "`nSome servers failed to start. Please check logs or run manually." -ForegroundColor Red
}
