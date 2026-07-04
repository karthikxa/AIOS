#!/bin/bash

# Start X Virtual Framebuffer
Xvfb :0 -screen 0 1024x768x24 &

# Wait for X to start
sleep 2

# Start Fluxbox window manager
fluxbox &

# Wait for fluxbox to start
sleep 1

# Start xterm
xterm &

# Start VNC server
x11vnc -display :0 -rfbauth ~/.vnc/passwd -forever -shared &

# Keep container running
tail -f /dev/null
