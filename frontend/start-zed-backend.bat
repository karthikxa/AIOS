@echo off
title Zed Agent Backend - Port 8642
echo ============================================
echo   Zed Agent Backend starting on port 8642
echo ============================================
echo.
cd /d C:\Users\balur\Downloads\AVDE\Dashboard\zed-agent
set ZED_HOME=C:\Users\balur\.hermes
set ZED_PRO_BASE_URL=http://127.0.0.1:3002/v1
C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe -m uvicorn server:app --host 0.0.0.0 --port 8642 --reload
pause

