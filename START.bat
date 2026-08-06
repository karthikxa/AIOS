@echo off
title AVDE Full Stack Launcher
echo =====================================================
echo   AVDE - Starting All Services (Remote LLM Proxy)
echo =====================================================
echo.

echo [1/4] Cleaning up stale processes on ports 8000, 8642, 6901...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8000 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8642 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":6901 "') do taskkill /f /pid %%a >nul 2>&1
timeout /t 1 /nobreak >nul

echo [2/4] Starting Zed Agent Backend (port 8642)...
start "Zed Agent Backend (8642)" cmd /k "cd /d "%~dp0backend" && set ZED_HOME=%USERPROFILE%\.hermes&& set ZED_PRO_BASE_URL=https://server-llm-1.onrender.com/v1&& .venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"

echo [3/4] Starting Dashboard Frontend (port 8000)...
start "Zed Dashboard Frontend (8000)" cmd /k "cd /d "%~dp0frontend" && npm run dev -- --port 8000 --host"

echo [4/4] Starting CUA Computer Agent (port 6901)...
start "CUA Computer Agent (6901)" cmd /k "cd /d "%~dp0desktop-agent\cua" && set PORT=6901&& set STREAM_FPS=15&& .venv\Scripts\python.exe -m computer_server --host 0.0.0.0 --port 6901 --backend native"

echo.
echo =====================================================
echo All services launched!
echo Opening Dashboard: http://localhost:8000
echo Remote LLM Server: https://server-llm-1.onrender.com/v1
echo =====================================================
echo.

timeout /t 3 /nobreak >nul
start http://localhost:8000

pause
