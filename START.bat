@echo off
title AVDE Full Stack Launcher
echo =====================================================
echo   AVDE - Starting All Services (Remote LLM Server)
echo =====================================================
echo.
echo [1/3] Starting Zed Agent Backend (port 8642)...
start "Zed Agent Backend" cmd /k "set ZED_HOME=%USERPROFILE%\.hermes&& set ZED_PRO_BASE_URL=https://server-llm-1.onrender.com/v1&& cd /d "%~dp0backend" && .venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642"

echo [2/3] Starting Dashboard Frontend (port 8000)...
start "Zed Dashboard" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo [3/3] Starting CUA Computer Agent (port 6901)...
start "CUA Computer Agent" cmd /k "cd /d "%~dp0desktop-agent\cua" && set PORT=6901&& set STREAM_FPS=15&& .venv\Scripts\python.exe -m computer_server --host 0.0.0.0 --port 6901 --backend native"

echo.
echo All services launching!
echo Dashboard Frontend: http://localhost:8000
echo LLM Server Target:  https://server-llm-1.onrender.com/v1
echo.
pause
