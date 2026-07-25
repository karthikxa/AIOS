@echo off
title AVDE Desktop Setup (WSL2)
echo ====================================================
echo   AVDE Desktop Setup — WSL2 Virtual Desktop
echo ====================================================
echo.

:: ── 1. Check if Docker is available ──────────────────
echo [1/6] Checking for Docker...
docker version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo   Docker found — you can use the Docker path instead.
    echo   This setup is only needed when Docker is NOT installed.
    echo.
    choice /m "   Continue with WSL2 setup anyway"
    if errorlevel 2 goto :skip_wsl
)
echo   Docker not found — proceeding with WSL2 setup.
echo.

:: ── 2. Check if WSL2 is enabled ──────────────────────
echo [2/6] Checking WSL2...
wsl --status >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo   WSL2 is not enabled. Enabling now...
    wsl --install --no-distribution
    if %ERRORLEVEL% neq 0 (
        echo.
        echo   ERROR: Failed to enable WSL2.
        echo   Please enable manually:
        echo     1. Open PowerShell as Administrator
        echo     2. Run: wsl --install
        echo     3. Reboot and run this script again.
        pause
        goto :eof
    )
    echo.
    echo   WSL2 has been enabled. A REBOOT IS REQUIRED.
    echo   After reboot, run this script again to continue.
    echo.
    pause
    shutdown /r /t 30 /c "WSL2 enabled — rebooting to complete setup"
    goto :eof
)
echo   WSL2 is enabled.
echo.

:: ── 3. Install Ubuntu-22.04 distro ───────────────────
echo [3/6] Checking for Ubuntu-22.04 distro...
wsl -l -v 2>nul | findstr /i "Ubuntu-22.04" >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo   Ubuntu-22.04 not found. Installing...
    echo   This may take a few minutes on first run.
    wsl --install -d Ubuntu-22.04 --no-launch
    if %ERRORLEVEL% neq 0 (
        echo.
        echo   ERROR: Failed to install Ubuntu-22.04.
        echo   Try running manually: wsl --install -d Ubuntu-22.04
        pause
        goto :eof
    )
    echo   Ubuntu-22.04 installed. A REBOOT MAY BE REQUIRED.
    echo   After reboot, run this script again to continue.
    echo.
    pause
    goto :eof
)
echo   Ubuntu-22.04 is available.
echo.

:: ── 4. Write .wslconfig ─────────────────────────────
echo [4/6] Writing WSL2 resource limits...
(
    echo [wsl2]
    echo memory=1536MB
    echo processors=2
    echo swap=0
    echo localhostForwarding=true
) > "%UserProfile%\.wslconfig"
echo   Written to %UserProfile%\.wslconfig
echo     memory=1536MB, processors=2, swap=0
echo     (1536MB allows room for Chromium + desktop stack)
echo.

:: ── 5. Shutdown WSL to apply config ─────────────────
echo [5/6] Restarting WSL2 to apply configuration...
wsl --shutdown
timeout /t 3 /nobreak >nul
echo   WSL2 restarted.
echo.

:: ── 6. Install desktop packages ─────────────────────
echo [6/6] Installing desktop packages inside WSL2...
echo   (xvfb, x11vnc, fluxbox, novnc, websockify, etc.)
echo.

:: Find the WSL distro name (Ubuntu-22.04 or Ubuntu)
set DISTRO=
wsl -l -v 2>nul | findstr /i "Ubuntu-22.04" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set DISTRO=Ubuntu-22.04
) else (
    wsl -l -v 2>nul | findstr /i "Ubuntu" >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        set DISTRO=Ubuntu
    ) else (
        echo   ERROR: No Ubuntu distro found.
        pause
        goto :eof
    )
)

:: Get the script directory (where this .bat lives)
set SCRIPT_DIR=%~dp0

:: Run install-packages.sh inside WSL2
wsl -d %DISTRO% -- bash -c "chmod +x /dev/stdin" < "%SCRIPT_DIR%wsl\install-packages.sh"
wsl -d %DISTRO% -- bash "%SCRIPT_DIR%wsl\install-packages.sh"

if %ERRORLEVEL% neq 0 (
    echo.
    echo   WARNING: Package installation may have had errors.
    echo   Check the output above.
)

echo.
echo ====================================================
echo   Setup complete!
echo.
echo   You can now run: scripts\start.bat
echo   The virtual desktop will start at http://localhost:6901
echo ====================================================
echo.
pause
goto :eof

:skip_wsl
echo   Docker detected — skipping WSL2 setup.
echo   The Docker path will be used instead.
pause
