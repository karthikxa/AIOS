@echo off
cd /d "%~dp0zed-agent"
echo Starting Zed Pro Dashboard Server...
"C:\Users\balur\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe" server.py
if %errorlevel% neq 0 (
    echo.
    echo Server exited with error code %errorlevel%
    pause
)
