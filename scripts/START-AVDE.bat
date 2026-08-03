@echo off
title AVDE Full Stack Launcher
echo =====================================================
echo   AVDE - Starting All Services
echo =====================================================
echo.
echo [0/5] Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3001 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3002 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8000 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8642 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":6901 "') do taskkill /f /pid %%a >nul 2>&1
timeout /t 2 /nobreak >nul
echo [1/5] Starting LLM Proxy (ports 3001/3002)...
start "LLM Proxy" cmd /k "set PORT=3001&& set LOCAL_PORT=3002&& cd /d C:\Users\balur\Downloads\AVDE\llm\llm-proxy && npm run dev -w server"
timeout /t 3 /nobreak >nul
echo [2/5] Starting Zed Agent Backend (port 8642)...
start "Zed Agent Backend" cmd /k "set ZED_HOME=C:\Users\balur\.hermes&& set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1&& cd /d C:\Users\balur\Downloads\AVDE\backend && C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"
timeout /t 3 /nobreak >nul
echo [3/5] Starting Dashboard Frontend (port 8000)...
start "Zed Dashboard" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\frontend && npm run dev"
timeout /t 3 /nobreak >nul
echo [4/5] Starting CUA Computer Agent (port 6901)...
start "CUA Computer Agent" cmd /k "cd /d C:\Users\balur\Downloads\AVDE\desktop-agent\cua && set PORT=6901&& set STREAM_FPS=15&& .venv\Scripts\python.exe -m computer_server --host 0.0.0.0 --port 6901 --backend native"
echo.
echo All services launching! Open http://localhost:8000
echo The Computer panel will show your LIVE desktop stream.
echo.
pause
