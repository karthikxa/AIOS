Write-Host "=== Killing old processes ===" -ForegroundColor Cyan
Get-Process -Id 14100 -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Id 18124 -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Id 9264 -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "=== Starting freellmapi (port 3001/3002) ===" -ForegroundColor Cyan
$freellmapiDir = "C:\Users\balur\Downloads\AVDE\freellmapi"
$env:PORT = "3001"
$env:LOCAL_PORT = "3002"
$npmPath = (Get-Command npm).Source
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c", "cd /d $freellmapiDir && $npmPath run dev" -WindowStyle Hidden
Write-Host "  freellmapi starting..." -ForegroundColor Gray

Write-Host "=== Starting Dashboard backend+frontend (port 8000) ===" -ForegroundColor Cyan
$backendDir = "C:\Users\balur\Downloads\AVDE\backend"
$pythonPath = "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe"
Start-Process -NoNewWindow -FilePath $pythonPath -ArgumentList "-m", "uvicorn", "server:app", "--host", "127.0.0.1", "--port", "8000" -WorkingDirectory $backendDir -WindowStyle Hidden
Write-Host "  dashboard starting..." -ForegroundColor Gray

Write-Host "Waiting for servers..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

$ok = $true
if (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] Dashboard backend: http://127.0.0.1:8000" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 8000" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] freellmapi: port 3001" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 3001" -ForegroundColor Red; $ok = $false }

if (Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue) {
    Write-Host "  [OK] freellmapi no-auth: port 3002" -ForegroundColor Green
} else { Write-Host "  [FAIL] Port 3002" -ForegroundColor Red; $ok = $false }

if ($ok) {
    Write-Host "`nAll servers running! Open http://127.0.0.1:8000/" -ForegroundColor Green
} else {
    Write-Host "`nSome servers failed to start. Check above." -ForegroundColor Red
}
