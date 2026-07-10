#!/bin/bash

# Keep disabling SSL dynamically for the first 30 seconds of boot
(
    for i in {1..30}; do
        for f in /etc/kasmvnc/kasmvnc.yaml /usr/share/kasmvnc/kasmvnc.yaml "${HOME}/.kasmvnc/kasmvnc.yaml"; do
            if [ -f "$f" ]; then
                sed -i 's/require_ssl: true/require_ssl: false/g' "$f"
                sed -i 's/protocol: https/protocol: http/g' "$f"
            fi
        done
        # Delete any self.pem or snakeoil certs to force websockify/novnc to run in plain HTTP/WS mode
        rm -f /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/ssl/private/ssl-cert-snakeoil.key /usr/share/novnc/self.pem /opt/novnc/self.pem "${HOME}/.vnc/self.pem" "${HOME}/self.pem" 2>/dev/null || true
        find / -name "self.pem" -exec rm -f {} + 2>/dev/null || true
        sleep 1
    done
) &

# Start KasmVNC in background
/dockerStartup.sh &

# Wait for KasmVNC to be ready
echo "Waiting for KasmVNC..."
sleep 15

# Check if node and server.js exist
echo "=== Checking environment ==="
which node
node --version
ls -la /app/

# Start Node.js server
echo "=== Starting Node.js server ==="
cd /app
PORT=8080 node server.js
