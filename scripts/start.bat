@echo off
title AVDE Full Stack Launcher
echo ====================================================
echo   AVDE Full Stack - Launching All Services
echo ====================================================
echo.

:: 1. Start freellmapi (free AI providers / LLM server)
echo [1/3] Starting freellmapi (LLM server) on ports 3001/3002...
start "freellmapi (LLM Server) - Ports 3001/3002" cmd /k "cd /d "%~dp0..\llm\llm-proxy" && npm run dev"
ping 127.0.0.1 -n 4 > nul

:: 2. Start Zed Agent Backend
echo [2/3] Starting Zed Agent Backend on port 8642...
start "Zed Agent Backend - Port 8642" cmd /k "set ZED_HOME=C:\Users\balur\.hermes && set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1 && cd /d "%~dp0..\backend" && "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe" -m uvicorn server:app --host 0.0.0.0 --port 8642 --reload"
ping 127.0.0.1 -n 5 > nul

:: 3. Start Zed Pro Dashboard Frontend
echo [3/3] Starting Zed Pro Dashboard on port 8000...
start "Zed Pro Dashboard - Port 8000" cmd /k "cd /d "%~dp0..\frontend" && npm run dev"

echo.
echo ====================================================
echo   AVDE Services are starting up successfully!
echo.
echo   Dashboard:  http://localhost:8000
echo   Agent API:  http://localhost:8642
echo   LLM API  :  http://localhost:3001
echo   Local AI :  http://127.0.0.1:3002 (OpenAI format)
echo ====================================================
echo.
