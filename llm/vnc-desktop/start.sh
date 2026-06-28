#!/bin/bash
export DISPLAY=:0

# Start Xvfb
Xvfb :0 -screen 0 1280x720x24 &
sleep 1

# Set a solid background
xsetroot -solid "#1a1a2e" 2>/dev/null || true

# Start fluxbox window manager
fluxbox &
sleep 1

# Open a terminal so there's something visible
xterm -geometry 100x30+50+50 -bg "#0f0f23" -fg "#e0e0e0" -title "Desktop" &
sleep 1

# Start x11vnc (no password)
x11vnc -display :0 -forever -shared -nopw -rfbport 5900 &

# Start noVNC websockify on port 6080 (maps to host 6901)
websockify --web /usr/share/novnc 6080 localhost:5900 &

wait
