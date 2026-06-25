@echo off
title AVDE Dashboard
echo ========================================
echo   AVDE Dashboard - Starting All Services
echo ========================================
echo.

:: Start server in a new window
start "AVDE Server" cmd /c "%~dp0start-server.bat"

:: Wait a moment for the server to initialize
timeout /t 3 /nobreak >nul

:: Start frontend in a new window
start "AVDE Frontend" cmd /c "%~dp0start-frontend.bat"

echo.
echo Both services are starting.
echo   - Server: http://localhost:8000
echo   - Frontend: http://localhost:5173
echo.
echo Close this window when done.
pause
