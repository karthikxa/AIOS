#!/bin/bash
# =============================================================================
#  Desktop Agent — Render startup
#  Conditions:
#    1. NO black screen   → xsetroot solid bg before x11vnc starts
#    2. LIVE STREAM ONLY  → x11vnc → websockify → noVNC (pure WebSocket)
#    3. < 512 MB RAM      → no GStreamer, no Playwright, chromium + x11vnc
# =============================================================================
set -uo pipefail

export DISPLAY=:99
export PORT="${PORT:-10000}"
export VNC_PORT=5900
export WS_PORT=6080
export AGENT_PORT=8000
export CDP_PORT=9222
NOVNC_WEB=/usr/share/novnc

mkdir -p /tmp/agent-logs

log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ─────────────────────────────────────────────────────────────────────────────
# 0. nginx placeholder — Render health checks port immediately
# ─────────────────────────────────────────────────────────────────────────────
cat > /tmp/nginx.conf << NGINX_PLACEHOLDER
worker_processes 1;
pid /tmp/nginx.pid;
error_log /tmp/agent-logs/nginx.log warn;
events { worker_connections 128; }
http {
    server {
        listen ${PORT};
        location /health { return 200 '{"status":"starting"}'; add_header Content-Type application/json; }
        location / { return 200 'Desktop Agent loading...'; add_header Content-Type text/plain; }
    }
}
NGINX_PLACEHOLDER

nginx -c /tmp/nginx.conf
log "[0/6] nginx placeholder OK — port ${PORT} held"

# ─────────────────────────────────────────────────────────────────────────────
# 1. Xvfb — virtual display
# ─────────────────────────────────────────────────────────────────────────────
Xvfb :99 -screen 0 1024x576x24 -nolisten tcp -noreset \
    > /tmp/agent-logs/xvfb.log 2>&1 &
XVFB_PID=$!

COUNT=0
until [ -S /tmp/.X11-unix/X99 ]; do
    sleep 0.1; COUNT=$((COUNT + 1))
    if [ $COUNT -gt 100 ]; then
        log "[ERROR] Xvfb failed to start"; exit 1
    fi
done

# ── ANTI-BLACK-SCREEN: solid background immediately — xsetroot is in x11-xserver-utils
if command -v xsetroot > /dev/null 2>&1; then
    xsetroot -display :99 -solid '#0d0d0d'
    log "[1/6] Xvfb ready + background set (no black screen)"
else
    log "[1/6] Xvfb ready (xsetroot not found — openbox will set BG)"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 2. openbox — prevents raw X11 artifact frames appearing in stream
# ─────────────────────────────────────────────────────────────────────────────
DISPLAY=:99 openbox --sm-disable > /tmp/agent-logs/openbox.log 2>&1 &
sleep 0.4
log "[2/6] openbox OK"

# ─────────────────────────────────────────────────────────────────────────────
# 3. Chromium — kiosk mode, CDP on 127.0.0.1:9222
# ─────────────────────────────────────────────────────────────────────────────
DISPLAY=:99 chromium \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --disable-software-rasterizer \
    --disable-extensions \
    --disable-background-networking \
    --disable-sync \
    --no-first-run \
    --no-default-browser-check \
    --metrics-recording-only \
    --disable-background-timer-throttling \
    --disable-backgrounding-occluded-windows \
    --disable-renderer-backgrounding \
    --disable-hang-monitor \
    --disable-prompt-on-repost \
    --memory-pressure-off \
    --kiosk \
    --window-size=1024,576 \
    --remote-debugging-port=${CDP_PORT} \
    --remote-debugging-address=127.0.0.1 \
    "https://www.google.com" \
    > /tmp/agent-logs/chromium.log 2>&1 &
CHROME_PID=$!

COUNT=0
until curl -sf http://127.0.0.1:${CDP_PORT}/json/version > /dev/null 2>&1; do
    sleep 0.5; COUNT=$((COUNT + 1))
    if [ $COUNT -gt 80 ]; then
        log "[ERROR] CDP timeout after 40s"
        tail -20 /tmp/agent-logs/chromium.log
        exit 1
    fi
done
log "[3/6] Chromium + CDP ready (${COUNT} probes)"

# ─────────────────────────────────────────────────────────────────────────────
# 4. x11vnc — live VNC capture of X99 framebuffer (NO POLLING — push only)
# ─────────────────────────────────────────────────────────────────────────────
x11vnc \
    -display :99 \
    -forever \
    -nopw \
    -rfbport ${VNC_PORT} \
    -localhost \
    -xdamage \
    -wait 40 \
    -defer 40 \
    -nosel \
    -noprimary \
    -shared \
    -quiet \
    -noxrecord \
    > /tmp/agent-logs/x11vnc.log 2>&1 &
X11VNC_PID=$!
sleep 0.8
log "[4/6] x11vnc live stream OK (PID ${X11VNC_PID})"

# ─────────────────────────────────────────────────────────────────────────────
# 5. websockify — WebSocket bridge for noVNC (pure WS, no image polling)
# ─────────────────────────────────────────────────────────────────────────────
websockify \
    --web=${NOVNC_WEB} \
    --heartbeat=30 \
    127.0.0.1:${WS_PORT} 127.0.0.1:${VNC_PORT} \
    > /tmp/agent-logs/websockify.log 2>&1 &
WS_PID=$!
sleep 0.5
log "[5/6] websockify WebSocket bridge OK (PID ${WS_PID})"

# ─────────────────────────────────────────────────────────────────────────────
# 6. FastAPI agent (CDP control only — no screenshot endpoints)
# ─────────────────────────────────────────────────────────────────────────────
cd /app
uvicorn app:app \
    --host 127.0.0.1 \
    --port ${AGENT_PORT} \
    --log-level warning \
    > /tmp/agent-logs/agent.log 2>&1 &
AGENT_PID=$!

COUNT=0
until curl -sf http://127.0.0.1:${AGENT_PORT}/health > /dev/null 2>&1; do
    sleep 0.5; COUNT=$((COUNT + 1))
    if [ $COUNT -gt 40 ]; then
        log "[ERROR] Agent timeout"; tail -20 /tmp/agent-logs/agent.log; exit 1
    fi
done
log "[6/6] FastAPI agent ready"

# ─────────────────────────────────────────────────────────────────────────────
# Full nginx — routes all traffic on $PORT
#   /              → noVNC HTML5 client (autoconnect via URL params)
#   /websockify    → websockify WebSocket VNC (live stream)
#   /api/          → FastAPI agent REST API
# ─────────────────────────────────────────────────────────────────────────────
cat > /tmp/nginx.conf << NGINX_FULL
worker_processes 1;
pid /tmp/nginx.pid;
error_log /tmp/agent-logs/nginx.log warn;
events { worker_connections 256; }
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    access_log off;
    client_max_body_size 10m;
    absolute_redirect off;    # prevents nginx adding :4000 to redirect URLs

    server {
        listen ${PORT};

        # ── Root: redirect to noVNC — quality=9, no scale blur ──
        location = / {
            return 302 /vnc.html?autoconnect=1&quality=9&compression=2&path=websockify;
        }

        # ── Live WebSocket VNC stream (noVNC connects here) ──
        location /websockify {
            proxy_pass http://127.0.0.1:${WS_PORT}/websockify;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host \$host;
            proxy_read_timeout 3600s;
            proxy_send_timeout 3600s;
            proxy_buffering off;
            proxy_cache off;
        }

        # ── Agent REST API ────────────────────────────────────
        location /api/ {
            proxy_pass http://127.0.0.1:${AGENT_PORT}/;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_read_timeout 30s;
        }

        # ── noVNC static files ────────────────────────────────
        location / {
            root ${NOVNC_WEB};
            try_files \$uri \$uri/ /vnc.html;
        }
    }
}
NGINX_FULL

nginx -c /tmp/nginx.conf -s reload
sleep 0.5
log "[7/7] nginx full routing reloaded"

echo ""
echo "=========================================="
echo "  DESKTOP AGENT READY"
echo "  Port    : ${PORT}"
echo "  Stream  : /  (noVNC → WebSocket → VNC)"
echo "  API     : /api/"
echo "  CDP     : 127.0.0.1:${CDP_PORT}"
echo "=========================================="
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Watchdog — auto-restart any crashed process
# ─────────────────────────────────────────────────────────────────────────────
while true; do
    sleep 10

    if ! kill -0 $CHROME_PID 2>/dev/null; then
        log "[WATCHDOG] Chromium died — restarting"
        DISPLAY=:99 chromium \
            --no-sandbox --disable-gpu --disable-dev-shm-usage \
            --disable-extensions --no-first-run --kiosk \
            --window-size=1280,720 \
            --remote-debugging-port=${CDP_PORT} \
            --remote-debugging-address=127.0.0.1 \
            "about:blank" >> /tmp/agent-logs/chromium.log 2>&1 &
        CHROME_PID=$!
    fi

    if ! kill -0 $X11VNC_PID 2>/dev/null; then
        log "[WATCHDOG] x11vnc died — restarting"
        x11vnc -display :99 -forever -nopw -rfbport ${VNC_PORT} \
            -localhost -xdamage -shared -quiet -noxrecord \
            >> /tmp/agent-logs/x11vnc.log 2>&1 &
        X11VNC_PID=$!
    fi

    if ! kill -0 $WS_PID 2>/dev/null; then
        log "[WATCHDOG] websockify died — restarting"
        websockify --web=${NOVNC_WEB} --heartbeat=30 \
            127.0.0.1:${WS_PORT} 127.0.0.1:${VNC_PORT} \
            >> /tmp/agent-logs/websockify.log 2>&1 &
        WS_PID=$!
    fi

    if ! kill -0 $AGENT_PID 2>/dev/null; then
        log "[WATCHDOG] Agent died — restarting"
        cd /app && uvicorn app:app --host 127.0.0.1 --port ${AGENT_PORT} \
            --log-level warning >> /tmp/agent-logs/agent.log 2>&1 &
        AGENT_PID=$!
    fi
done
