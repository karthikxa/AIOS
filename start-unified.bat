@echo off
REM AVDE Unified Launcher — Single Port 8001
REM Backend (8001) serves frontend + proxies desktop-agent (6901)

setlocal enabledelayedexpansion
set SCRIPT_DIR=%~dp0

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║       AVDE Unified — Single Port 8001                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Check if backend venv exists
if not exist "%SCRIPT_DIR%backend\.venv" (
    echo ERROR: Backend venv not found. Run setup first.
    exit /b 1
)

echo [1/3] Starting Desktop Agent (port 6901)...
cd /d "%SCRIPT_DIR%desktop-agent"
start "AVDE Desktop Agent (6901)" cmd /k "..\backend\.venv\Scripts\python.exe -u start_agent.py"
timeout /t 2 /nobreak >nul

echo [2/3] Starting Backend (port 8001)...
cd /d "%SCRIPT_DIR%backend"
set PORT=8001
start "AVDE Backend (8001)" cmd /k ".\.venv\Scripts\python.exe server.py"
timeout /t 3 /nobreak >nul

echo [3/3] Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:8001

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  ✓ All services started!                                    ║
echo ║                                                              ║
echo ║  📍 Main dashboard:   http://localhost:8001                  ║
echo ║  📍 API:              http://localhost:8001/api              ║
echo ║  📍 Desktop via API:  http://localhost:8001/api/desktop      ║
echo ║                                                              ║
echo ║  Quick tests:                                                ║
echo ║  • curl http://localhost:8001/health                        ║
echo ║  • curl http://localhost:8001/api/desktop/status            ║
echo ║  • curl http://localhost:6901/health                        ║
echo ║                                                              ║
echo ║  Close terminal windows to stop services.                   ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
pause
