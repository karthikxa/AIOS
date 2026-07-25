#!/bin/bash
# start-vnc.sh — runs inside WSL2 to start the virtual desktop
# Called by scripts/start-desktop.bat on every launch.
set -euo pipefail

# Persistent home directory — files saved here survive restarts
export HOME=/home/agent
export DISPLAY=:0

SCREEN_SIZE="${AVDE_SCREEN:-1360x768x16}"

echo "=== Starting AVDE virtual desktop (${SCREEN_SIZE}) ==="

# Kill any previous instances
pkill -f Xvfb 2>/dev/null || true
pkill -f fluxbox 2>/dev/null || true
pkill -f x11vnc 2>/dev/null || true
pkill -f websockify 2>/dev/null || true
sleep 1

# 1. Virtual framebuffer — the "monitor" nobody sees directly
Xvfb ${DISPLAY} -screen 0 ${SCREEN_SIZE} -ac +extension GLX +render -noreset &
XVFB_PID=$!
sleep 1

# 2. Window manager — gives us a taskbar, window decorations, right-click menu
fluxbox &
FLUXBOX_PID=$!
sleep 1

# 3. VNC server — shares the Xvfb display over the VNC protocol
x11vnc ${DISPLAY} -rfbport 5900 -forever -shared -clipboard -noxfixes -noxdamage &
VNC_PID=$!
sleep 1

# 4. noVNC websocket proxy — translates VNC to WebSocket for browser access
WEBsockify --web=/usr/share/novnc 6901 localhost:5900 &
WEBSOCKIFY_PID=$!

echo "=== Desktop running ==="
echo "  Xvfb PID:       ${XVFB_PID}"
echo "  Fluxbox PID:    ${FLUXBOX_PID}"
echo "  x11vnc PID:     ${VNC_PID}"
echo "  websockify PID: ${WEBSOCKIFY_PID}"
echo "  VNC:            port 5900"
echo "  noVNC:          port 6901"
echo "=== Ready for connections ==="

# Wait for any process to exit — if one crashes, report it
wait -n ${XVFB_PID} ${FLUXBOX_PID} ${VNC_PID} ${WEBSOCKIFY_PID} 2>/dev/null
echo "=== A desktop process exited — restarting in 3s ==="
sleep 3
exec "$0"
