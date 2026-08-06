@echo off
title AVDE Full Stack Launcher
echo =====================================================
echo   AVDE - Starting All Services (Remote LLM Proxy)
echo =====================================================
echo.

echo [1/3] Cleaning up stale processes on ports 8000, 8001, 8642...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8000 :8001 :8642"') do taskkill /f /pid %%a >nul 2>&1
ping -n 2 127.0.0.1 >nul

echo [2/3] Starting Zed Agent Backend (port 8642)...
start "Zed Agent Backend (8642)" cmd /k "cd /d "%~dp0backend" && set ZED_HOME=%USERPROFILE%\.hermes&& set ZED_PRO_BASE_URL=https://server-llm-1.onrender.com/v1&& .venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"

echo [3/3] Starting Dashboard Frontend (port 8000)...
start "Zed Dashboard Frontend (8000)" cmd /k "cd /d "%~dp0frontend" && npx vite --port 8000 --host"

echo.
echo =====================================================
echo All services launched!
echo Opening Dashboard: http://localhost:8000
echo Remote LLM Server: https://server-llm-1.onrender.com/v1
echo =====================================================
echo.

ping -n 3 127.0.0.1 >nul
start http://localhost:8000
