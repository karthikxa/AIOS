@echo off
cd /d "%~dp0"
echo Starting frontend dev server...
npx vite --host
if %errorlevel% neq 0 (
    echo.
    echo Frontend exited with error code %errorlevel%
    pause
)
