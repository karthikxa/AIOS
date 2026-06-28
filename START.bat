@echo off
title AVDE - Starting All Services
color 0B
echo.
echo   =============================================
echo        AVDE - Starting Everything
echo   =============================================
echo.

set PYTHON=C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe
set BASE=C:\Users\balur\Downloads\AVDE

echo [1/5] Starting LLM Proxy (ports 3001/3002)...
start "LLM Proxy" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\llm\llm-proxy && set PORT=3001 && set LOCAL_PORT=3002 && npm run dev -w server"
timeout /t 2 /nobreak >nul

echo [2/5] Starting Backend (port 8642)...
start "Backend" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\backend && set ZED_HOME=C:\Users\balur\.hermes && set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1 && C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"
timeout /t 2 /nobreak >nul

echo [3/5] Starting Dashboard (port 8000)...
start "Dashboard" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\frontend && npm run dev"
timeout /t 2 /nobreak >nul

echo [4/5] Starting Computer Agent (port 8765)...
start "Computer Agent" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\desktop-agent\agent && C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8765"
timeout /t 2 /nobreak >nul

echo [5/5] Checking VNC Desktop (port 6902)...
docker ps --filter "name=vnc-desktop" --format "{{.Names}}" | findstr "vnc-desktop" >nul 2>&1
if %errorlevel%==0 (
    echo         VNC already running
) else (
    echo         Starting VNC...
    docker run -d --name vnc-desktop -p 6902:6901 -e VNC_PW=headless -e DISPLAY_WIDTH=1024 -e DISPLAY_HEIGHT=600 accetto/ubuntu-vnc-xfce-g3:latest >nul 2>&1
)
timeout /t 2 /nobreak >nul
if exist "C:\Windows\Web\Wallpaper\Windows\img0.jpg" (
    docker cp "C:\Windows\Web\Wallpaper\Windows\img0.jpg" vnc-desktop:/tmp/wallpaper.jpg >nul 2>&1
    docker exec vnc-desktop xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVNC-0/workspace0/last-image -s /tmp/wallpaper.jpg >nul 2>&1
    docker exec vnc-desktop xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVNC-0/workspace1/last-image -s /tmp/wallpaper.jpg >nul 2>&1
    docker exec vnc-desktop xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVNC-0/workspace2/last-image -s /tmp/wallpaper.jpg >nul 2>&1
    docker exec vnc-desktop xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorVNC-0/workspace3/last-image -s /tmp/wallpaper.jpg >nul 2>&1
)

echo.
echo   Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo   =============================================
echo       Checking all services...
echo   =============================================
echo.

set ALL_OK=1

netstat -ano | findstr ":3001 " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (echo   [OK] LLM Proxy     :3001) else (echo   [FAIL] LLM Proxy     :3001 & set ALL_OK=0)

netstat -ano | findstr ":3002 " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (echo   [OK] Local AI      :3002) else (echo   [FAIL] Local AI      :3002 & set ALL_OK=0)

netstat -ano | findstr ":8000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (echo   [OK] Dashboard     :8000) else (echo   [FAIL] Dashboard     :8000 & set ALL_OK=0)

netstat -ano | findstr ":8642 " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (echo   [OK] Backend       :8642) else (echo   [FAIL] Backend       :8642 & set ALL_OK=0)

netstat -ano | findstr ":8765 " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (echo   [OK] Agent         :8765) else (echo   [FAIL] Agent         :8765 & set ALL_OK=0)

docker ps --filter "name=vnc-desktop" --format "{{.Names}}" | findstr "vnc-desktop" >nul 2>&1
if %errorlevel%==0 (echo   [OK] VNC Desktop   :6902) else (echo   [FAIL] VNC Desktop   :6902 & set ALL_OK=0)

echo.
if %ALL_OK%==1 (
    echo   All services running!
    echo   Opening dashboard in your browser...
    start http://localhost:8000
) else (
    echo   Some services failed. Check the terminal windows.
)
echo.
pause
