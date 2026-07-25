@echo off
title AVDE Full Stack Launcher
echo ====================================================
echo   AVDE Full Stack - Launching All Services
echo ====================================================
echo.

:: 0. Start Desktop (Docker or WSL2 — auto-detect)
echo [0/4] Starting Desktop (auto-detect Docker vs WSL2)...
call "%~dp0start-desktop.bat"
ping 127.0.0.1 -n 3 > nul

:: 1. Start Zed Agent Backend
echo [1/4] Starting Zed Agent Backend on port 8642...
start "Zed Agent Backend - Port 8642" cmd /k "set ZED_HOME=C:\Users\balur\.hermes && cd /d "%~dp0..\backend" && "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe" -m uvicorn server:app --host 0.0.0.0 --port 8642 --reload"
ping 127.0.0.1 -n 5 > nul

:: 2. Start Zed Pro Dashboard Frontend
echo [2/4] Starting Zed Pro Dashboard on port 8001...
start "Zed Pro Dashboard - Port 8001" cmd /k "cd /d "%~dp0..\frontend" && npm run dev"
ping 127.0.0.1 -n 3 > nul

:: 3. Start Computer Agent
echo [3/4] Starting Computer Agent on port 4000...
start "Computer Agent - Port 4000" cmd /k "cd /d "%~dp0..\desktop-agent\agent" && "C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe" -m uvicorn main:app --host 0.0.0.0 --port 4000"
ping 127.0.0.1 -n 5 > nul

:: 4. Open browser
echo [4/4] Opening dashboard in browser...
start http://localhost:8001

echo.
echo ====================================================
echo   AVDE Services are running!
echo.
echo   Dashboard:      http://localhost:8001
echo   Backend API:    http://localhost:8642
echo   Computer:       http://localhost:6901 (VNC)
echo   Desktop Agent:  http://localhost:4000
echo ====================================================
echo.
