#!/bin/bash
# =============================================================================
#  Service 1: VNC Desktop
#  - 1280×720 full HD stream
#  - CDP proxied via nginx (X-Agent-Secret header) for Service 2
#  - NO FastAPI — all CPU dedicated to Chromium + x11vnc
# =============================================================================
set -uo pipefail

export DISPLAY=:99
export PORT="${PORT:-10000}"
export VNC_PORT=5900
export WS_PORT=6080
export CDP_PORT=9222
export AGENT_SECRET="${AGENT_SECRET:-}"
NOVNC_WEB=/usr/share/novnc

mkdir -p /tmp/agent-logs
log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ─────────────────────────────────────────────────────────────────────────────
# 0. nginx placeholder — holds port while everything else starts
# ─────────────────────────────────────────────────────────────────────────────
cat > /tmp/nginx.conf << NGINX_PH
worker_processes 1;
pid /tmp/nginx.pid;
error_log /tmp/agent-logs/nginx.log warn;
events { worker_connections 128; }
http {
    server {
        listen ${PORT};
        location /health {
            return 200 '{"status":"starting"}';
            add_header Content-Type application/json;
        }
        location / {
            return 200 'Desktop loading...';
            add_header Content-Type text/plain;
        }
    }
}
NGINX_PH
nginx -c /tmp/nginx.conf
log "[0/5] nginx placeholder OK — port ${PORT}"

# ─────────────────────────────────────────────────────────────────────────────
# 1. Xvfb — 1280×720 full HD virtual display
# ─────────────────────────────────────────────────────────────────────────────
Xvfb :99 -screen 0 1280x720x24 -nolisten tcp -noreset \
    > /tmp/agent-logs/xvfb.log 2>&1 &
XVFB_PID=$!

COUNT=0
until [ -S /tmp/.X11-unix/X99 ]; do
    sleep 0.1; COUNT=$((COUNT + 1))
    if [ $COUNT -gt 100 ]; then log "[ERROR] Xvfb failed"; exit 1; fi
done

if command -v xsetroot > /dev/null 2>&1; then
    xsetroot -display :99 -solid '#0d0d0d'
    log "[1/5] Xvfb 1280×720 ready + background set"
else
    log "[1/5] Xvfb 1280×720 ready"
fi

# ─────────────────────────────────────────────────────────────────────────────
# 2. openbox — clean WM (prevents raw X11 artifacts in stream)
# ─────────────────────────────────────────────────────────────────────────────
DISPLAY=:99 openbox --sm-disable > /tmp/agent-logs/openbox.log 2>&1 &
sleep 0.4
log "[2/5] openbox OK"

# ─────────────────────────────────────────────────────────────────────────────
# 3. Chromium — kiosk, CDP on localhost:9222, all CPU-saving flags
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
    --window-size=1280,720 \
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
log "[3/5] Chromium + CDP ready (${COUNT} probes)"

# ─────────────────────────────────────────────────────────────────────────────
# 4. x11vnc — live capture, localhost only
# ─────────────────────────────────────────────────────────────────────────────
x11vnc \
    -display :99 \
    -forever \
    -nopw \
    -rfbport ${VNC_PORT} \
    -localhost \
    -xdamage \
    -wait 30 \
    -defer 30 \
    -nosel \
    -noprimary \
    -shared \
    -quiet \
    -noxrecord \
    > /tmp/agent-logs/x11vnc.log 2>&1 &
X11VNC_PID=$!
sleep 0.8
log "[4/5] x11vnc live stream OK (PID ${X11VNC_PID})"

# ─────────────────────────────────────────────────────────────────────────────
# 5. websockify — WebSocket bridge, localhost only
# ─────────────────────────────────────────────────────────────────────────────
websockify \
    --web=${NOVNC_WEB} \
    --heartbeat=25 \
    127.0.0.1:${WS_PORT} 127.0.0.1:${VNC_PORT} \
    > /tmp/agent-logs/websockify.log 2>&1 &
WS_PID=$!
sleep 0.5
log "[5/5] websockify WebSocket bridge OK (PID ${WS_PID})"

# ─────────────────────────────────────────────────────────────────────────────
# Full nginx:
#   /              → noVNC 1280×720 stream
#   /websockify    → VNC WebSocket (live, no polling)
#   /cdp/          → CDP proxy for Service 2 (requires X-Agent-Secret header)
#   /health        → health check
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
    absolute_redirect off;

    server {
        listen ${PORT};

        location /health {
            return 200 '{"status":"ok","service":"vnc-desktop","resolution":"1280x720"}';
            add_header Content-Type application/json;
        }

        # ── noVNC autoconnect — quality=9, no blur scaling ──
        location = / {
            return 302 /vnc.html?autoconnect=true&reconnect=true&reconnect_delay=500&resize=scale&quality=9&compression=2&path=websockify&bell=false&show_dot=false;
        }

        # ── Live WebSocket VNC stream ──
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

        # ── CDP proxy for Service 2 (agent-api) ──
        # Requires X-Agent-Secret header matching AGENT_SECRET env var
        location /cdp/ {
            if (\$http_x_agent_secret != "${AGENT_SECRET}") {
                return 403 'Forbidden';
            }
            proxy_pass http://127.0.0.1:${CDP_PORT}/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host 127.0.0.1:${CDP_PORT};
            proxy_read_timeout 3600s;
            proxy_buffering off;
            proxy_cache off;
        }

        # ── noVNC static files ──
        location / {
            root ${NOVNC_WEB};
            try_files \$uri \$uri/ /vnc.html;
        }
    }
}
NGINX_FULL

nginx -c /tmp/nginx.conf -s reload
sleep 0.5
log "[6/6] nginx full routing + CDP proxy active"

# ─────────────────────────────────────────────────────────────────────────────
# Patch noVNC HTML: hide sidebar, "Connecting..." overlay, status bar
# Makes reconnects invisible — user sees frozen frame instead of noVNC UI
# ─────────────────────────────────────────────────────────────────────────────
VNC_HTML="${NOVNC_WEB}/vnc.html"
if [ -f "${VNC_HTML}" ]; then
    # Hide: left sidebar, connecting overlay, status bar, connect button
    HIDE_CSS='<style>
/* novnc_hide_patch_v3 */
#noVNC_control_bar_anchor,
#noVNC_control_bar_handle,
#noVNC_control_bar,
.noVNC_open,
#noVNC_status,
#noVNC_connect_controls,
#noVNC_transition {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  width: 0 !important;
  height: 0 !important;
}
#noVNC_container {
  width: 100% !important;
  height: 100% !important;
  left: 0 !important;
}
</style>'
    # Only patch once (idempotent check) using version tag v3
    if ! grep -q 'novnc_hide_patch_v3' "${VNC_HTML}"; then
        # If it had v2 or older hidden styles, clean them up or append new
        sed -i "s|</head>|${HIDE_CSS}</head>|" "${VNC_HTML}"
        log "noVNC UI chrome hidden (sidebar + connecting overlay patched with v3)"
    fi
fi

echo ""
echo "================================================"
echo "  VNC DESKTOP READY — Service 1"
echo "  Port      : ${PORT}"
echo "  Stream    : /  (noVNC 1280×720 HD)"
echo "  CDP proxy : /cdp/ (X-Agent-Secret required)"
echo "  Health    : /health"
echo "================================================"

# ─────────────────────────────────────────────────────────────────────────────
# Watchdog — restart crashed processes + self-ping to keep Render alive
# ─────────────────────────────────────────────────────────────────────────────
PING_COUNTER=0
while true; do
    sleep 15
    PING_COUNTER=$((PING_COUNTER + 1))

    # Self-ping every ~14 min (56 × 15s) to prevent Render free-tier spindown
    if [ $((PING_COUNTER % 56)) -eq 0 ]; then
        curl -sf "http://localhost:${PORT}/health" > /dev/null 2>&1 || true
        log "[KEEPALIVE] Self-ping sent"
    fi

    if ! kill -0 $CHROME_PID 2>/dev/null; then
        log "[WATCHDOG] Chromium died — restarting"
        DISPLAY=:99 chromium --no-sandbox --disable-gpu --disable-dev-shm-usage \
            --disable-extensions --no-first-run --kiosk --window-size=1280,720 \
            --disable-background-timer-throttling --disable-renderer-backgrounding \
            --memory-pressure-off \
            --remote-debugging-port=${CDP_PORT} --remote-debugging-address=127.0.0.1 \
            "https://www.google.com" >> /tmp/agent-logs/chromium.log 2>&1 &
        CHROME_PID=$!
    fi

    if ! kill -0 $X11VNC_PID 2>/dev/null; then
        log "[WATCHDOG] x11vnc died — restarting"
        x11vnc -display :99 -forever -nopw -rfbport ${VNC_PORT} \
            -localhost -xdamage -wait 30 -defer 30 \
            -nosel -noprimary -shared -quiet -noxrecord \
            >> /tmp/agent-logs/x11vnc.log 2>&1 &
        X11VNC_PID=$!
    fi

    if ! kill -0 $WS_PID 2>/dev/null; then
        log "[WATCHDOG] websockify died — restarting"
        websockify --web=${NOVNC_WEB} --heartbeat=25 \
            127.0.0.1:${WS_PORT} 127.0.0.1:${VNC_PORT} \
            >> /tmp/agent-logs/websockify.log 2>&1 &
        WS_PID=$!
    fi
done
