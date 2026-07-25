@echo off
title AVDE Desktop Launcher
setlocal enabledelayedexpansion

:: ── Auto-detect: Docker or WSL2 ─────────────────────
echo [Desktop] Detecting desktop backend...

:: Check Docker
docker version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    docker info >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        echo [Desktop] Docker found — using Docker/KasmVNC path
        goto :docker_path
    )
)

:: Docker not running — use WSL2
echo [Desktop] Docker not available — using WSL2 path
goto :wsl_path

:: ═══════════════════════════════════════════════════════
:: Docker path (existing behavior)
:: ═══════════════════════════════════════════════════════
:docker_path
echo [Desktop] Starting KasmVNC container...
docker ps --filter "name=zed-desktop-4k" --format "{{.Status}}" 2>nul | findstr /i "Up" >nul
if %ERRORLEVEL% equ 0 (
    echo [Desktop] Container already running.
    goto :docker_ready
)

docker start zed-desktop-4k >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [Desktop] Container not found — creating...
    docker run -d --name zed-desktop-4k --restart unless-stopped ^
        -p 6901:6901 -p 5901:5901 ^
        -e VNC_PW=headless ^
        -e VNC_RESOLUTION=1360x768 ^
        -e DISPLAY_WIDTH=3840 ^
        -e DISPLAY_HEIGHT=2160 ^
        -e FEATURES_VNC=1 ^
        -e FEATURES_NOVNC=1 ^
        -e FEATURES_BUILD_SLIM_XFCE=1 ^
        -m 250m accetto/ubuntu-vnc-xfce-g3:latest
)

echo [Desktop] Waiting for VNC to be ready...
set RETRIES=0
:docker_poll
    curl -s -o nul -w "%%{http_code}" http://localhost:6901/ 2>nul | findstr "200" >nul
    if %ERRORLEVEL% equ 0 goto :docker_ready
    set /a RETRIES+=1
    if !RETRIES! geq 30 (
        echo [Desktop] WARNING: VNC not responding after 30s
        goto :eof
    )
    timeout /t 1 /nobreak >nul
    goto :docker_poll

:docker_ready
echo [Desktop] Docker desktop ready on port 6901.
goto :eof

:: ═══════════════════════════════════════════════════════
:: WSL2 path (no Docker)
:: ═══════════════════════════════════════════════════════
:wsl_path

:: Find distro name
set DISTRO=
wsl -l -v 2>nul | findstr /i "Ubuntu-22.04" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    set DISTRO=Ubuntu-22.04
) else (
    wsl -l -v 2>nul | findstr /i "Ubuntu" >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        set DISTRO=Ubuntu
    ) else (
        echo [Desktop] ERROR: No WSL2 Ubuntu distro found.
        echo [Desktop] Run scripts\setup-desktop.bat first.
        goto :eof
    )
)

echo [Desktop] Using WSL2 distro: !DISTRO!

:: Check if VNC is already running inside WSL2
wsl -d !DISTRO! -- bash -c "pgrep -f websockify" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [Desktop] WSL2 desktop already running.
    goto :wsl_ready
)

:: Get the script directory
set SCRIPT_DIR=%~dp0

:: Start the VNC desktop inside WSL2 (background)
echo [Desktop] Starting virtual desktop in WSL2...
wsl -d !DISTRO! -- bash -c "chmod +x '%SCRIPT_DIR%wsl/start-vnc.sh' && nohup '%SCRIPT_DIR%wsl/start-vnc.sh' > /tmp/avde-vnc.log 2>&1 &"

:: Wait for websockify to come up
echo [Desktop] Waiting for noVNC on port 6901...
set RETRIES=0
:wsl_poll
    curl -s -o nul -w "%%{http_code}" http://localhost:6901/ 2>nul | findstr "200" >nul
    if %ERRORLEVEL% equ 0 goto :wsl_ready
    set /a RETRIES+=1
    if !RETRIES! geq 30 (
        echo [Desktop] WARNING: noVNC not responding after 30s
        echo [Desktop] Check WSL2 log: wsl -d !DISTRO! -- cat /tmp/avde-vnc.log
        goto :eof
    )
    timeout /t 1 /nobreak >nul
    goto :wsl_poll

:wsl_ready
echo [Desktop] WSL2 desktop ready on port 6901.

:: Set up portproxy fallback (in case localhostForwarding has issues)
for /f "tokens=*" %%i in ('wsl -d !DISTRO! -- hostname -I 2^>nul') do (
    for %%j in (%%i) do (
        set WSL_IP=%%j
        goto :got_ip
    )
)
:got_ip
if defined WSL_IP (
    netsh interface portproxy delete v4tov4 listenport=6901 listenaddress=127.0.0.1 >nul 2>&1
    netsh interface portproxy add v4tov4 listenport=6901 listenaddress=127.0.0.1 connectport=6901 connectaddress=!WSL_IP! >nul 2>&1
    echo [Desktop] Portproxy set: 127.0.0.1:6901 -^> !WSL_IP!:6901
)
goto :eof
