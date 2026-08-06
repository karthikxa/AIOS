@echo off
title AVDE Full Stack Launcher
echo =====================================================
echo   AVDE - Starting All Services (Remote LLM Proxy)
echo =====================================================
echo.
echo [0/4] Cleaning up old local processes...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8000 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8642 "') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":6901 "') do taskkill /f /pid %%a >nul 2>&1
timeout /t 1 /nobreak >nul

echo [1/4] Connecting to Remote LLM Server (https://server-llm-1-0r64.onrender.com/v1)...

echo [2/4] Starting Zed Agent Backend (port 8642)...
start "Zed Agent Backend" cmd /k "set ZED_HOME=%USERPROFILE%\.hermes&& set ZED_PRO_BASE_URL=https://server-llm-1-0r64.onrender.com/v1&& cd /d "%~dp0..\backend" && .venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"

echo [3/4] Starting Dashboard Frontend (port 8000)...
start "Zed Dashboard" cmd /k "cd /d "%~dp0..\frontend" && npm run dev"

echo [4/4] Starting CUA Computer Agent (port 6901)...
start "CUA Computer Agent" cmd /k "cd /d "%~dp0..\desktop-agent\cua" && set PORT=6901&& set STREAM_FPS=15&& .venv\Scripts\python.exe -m computer_server --host 0.0.0.0 --port 6901 --backend native"

echo.
echo All services launching!
echo Dashboard Frontend: http://localhost:8000
echo LLM Server Target:  https://server-llm-1-0r64.onrender.com/v1
echo.
pause
