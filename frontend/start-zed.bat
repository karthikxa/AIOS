@echo off
echo ============================================
echo   Launching Zed Pro (Full Stack)
echo ============================================
echo.
echo [1/3] Starting freellmapi (free AI providers)...
start "freellmapi - Port 3001/3002" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\freellmapi && npm run dev"
timeout /t 4 /nobreak > nul

echo [2/3] Starting Zed Agent backend...
start "Zed Agent Backend - Port 8642" cmd /k "C:\Users\balur\Downloads\AVDE\Dashboard\start-zed-backend.bat"
timeout /t 5 /nobreak > nul

echo [3/3] Starting Zed Pro Dashboard...
start "Zed Pro Dashboard - Port 8000" cmd /k "C:\Users\balur\Downloads\AVDE\Dashboard\start-zed-frontend.bat"

echo.
echo ============================================
echo   Zed Pro is starting up!
echo.
echo   Dashboard  : http://localhost:8000
echo   Agent API  : http://localhost:8642
echo   freellmapi : http://localhost:3001
echo   Local AI   : http://127.0.0.1:3002 (no key)
echo ============================================
echo.
pause
