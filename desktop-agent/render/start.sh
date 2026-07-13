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
            return 302 /vnc.html?autoconnect=true&reconnect=true&reconnect_delay=0&resize=scale&quality=9&compression=2&path=websockify&bell=false&show_dot=false;
        }

        # ── Live WebSocket VNC stream ──
        location /websockify {
            proxy_pass http://127.0.0.1:${WS_PORT}/;
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
# Patch noVNC HTML: hide sidebar, keep WS alive with client ping, instant reconnect
# v6: NO canvas freeze — live stream always. WebSocket kept alive by 20s ping.
# ─────────────────────────────────────────────────────────────────────────────
VNC_HTML="${NOVNC_WEB}/vnc.html"
if [ -f "${VNC_HTML}" ]; then
    if ! grep -q 'novnc_hide_patch_v6' "${VNC_HTML}"; then
        log "Patching noVNC HTML — always-live WS keepalive (v6)..."
        python3 - "${VNC_HTML}" <<'PYEOF'
import sys, re
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove any older patch versions to avoid duplicates
html = re.sub(r'<style>\s*/\* novnc_hide_patch_v[0-9]+ \*/.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<script>\s*/\* novnc_hide_patch_v[0-9]+_js \*/.*?</script>', '', html, flags=re.DOTALL)

PATCH = """<style>
/* novnc_hide_patch_v6 */
/* ── Hide entire left control bar ── */
#noVNC_control_bar_anchor,
#noVNC_control_bar_handle,
#noVNC_control_bar,
#noVNC_side_panel,
.noVNC_open,
.noVNC_control_bar,
/* ── Hide connect / disconnect overlays ── */
#noVNC_transition,
#noVNC_connect_controls,
#noVNC_connect_button,
/* ── Hide status bar ── */
#noVNC_status,
/* ── Hide floating toolbar buttons ── */
#noVNC_extra_keys,
#noVNC_clipboard_button,
#noVNC_keyboard_button,
#noVNC_toggle_extra_keys_button,
#noVNC_fullscreen_button,
#noVNC_view_only_button,
#noVNC_clipboard,
.noVNC_button_group,
.noVNC_group {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  max-width: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
}
/* ── Canvas fills full viewport — live always ── */
#noVNC_container, #app, body {
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: #000 !important;
}
#noVNC_canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}
</style>
<script>
/* novnc_hide_patch_v6_js */
(function() {
  'use strict';

  /* ── 1. Hide all noVNC UI elements via MutationObserver ── */
  var UI_IDS = [
    'noVNC_control_bar_anchor','noVNC_control_bar_handle','noVNC_control_bar',
    'noVNC_side_panel','noVNC_status','noVNC_transition','noVNC_connect_controls',
    'noVNC_connect_button','noVNC_extra_keys','noVNC_clipboard','noVNC_clipboard_button',
    'noVNC_keyboard_button','noVNC_toggle_extra_keys_button','noVNC_fullscreen_button',
    'noVNC_view_only_button'
  ];
  function hideUI() {
    UI_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.cssText = 'display:none!important;width:0!important;height:0!important;opacity:0!important;';
    });
    document.querySelectorAll('.noVNC_button_group,.noVNC_group,.noVNC_open,.noVNC_control_bar').forEach(function(el) {
      el.style.cssText = 'display:none!important;width:0!important;height:0!important;opacity:0!important;';
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    hideUI();
    var obs = new MutationObserver(hideUI);
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class','style'] });
  });
  [300, 800, 1500, 3000, 6000].forEach(function(t) { setTimeout(hideUI, t); });

  /* ── 2. WebSocket interceptor — keepalive ping + suppress disconnect UI ── */
  var _OrigWS = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    var ws = protocols ? new _OrigWS(url, protocols) : new _OrigWS(url);
    var _pingTimer = null;

    /* Start a ping every 20s to prevent idle timeout (browsers kill WS after ~60s idle) */
    function startPing() {
      if (_pingTimer) clearInterval(_pingTimer);
      _pingTimer = setInterval(function() {
        try {
          if (ws.readyState === 1) { /* OPEN */
            /* Send a WebSocket ping frame via a 0-byte binary message */
            ws.send(new Uint8Array(0));
          }
        } catch(e) {}
      }, 20000);
    }

    /* Intercept addEventListener to hook open/close events */
    var _origAddEL = ws.addEventListener.bind(ws);
    ws.addEventListener = function(type, listener, opts) {
      if (type === 'open') {
        /* On connect: start keepalive ping, hide UI */
        _origAddEL(type, function(evt) {
          startPing();
          hideUI();
          listener(evt);
        }, opts);
        return;
      }
      if (type === 'close') {
        /* On disconnect: stop ping, hide UI immediately, let noVNC auto-reconnect */
        _origAddEL(type, function(evt) {
          if (_pingTimer) { clearInterval(_pingTimer); _pingTimer = null; }
          /* Suppress connecting UI — hide overlay so user sees black momentarily */
          hideUI();
          listener(evt);
          /* noVNC will reconnect with reconnect_delay=0, hide UI again after reconnect */
          setTimeout(hideUI, 50);
          setTimeout(hideUI, 200);
          setTimeout(hideUI, 600);
          setTimeout(hideUI, 1500);
        }, opts);
        return;
      }
      _origAddEL(type, listener, opts);
    };

    /* Also hook via onopen/onclose property setters */
    var _onopen = null, _onclose = null;
    Object.defineProperty(ws, 'onopen', {
      get: function() { return _onopen; },
      set: function(fn) {
        _onopen = fn;
        _origAddEL('open', function(evt) { startPing(); hideUI(); if (_onopen) _onopen(evt); });
      }
    });
    Object.defineProperty(ws, 'onclose', {
      get: function() { return _onclose; },
      set: function(fn) {
        _onclose = fn;
        _origAddEL('close', function(evt) {
          if (_pingTimer) { clearInterval(_pingTimer); _pingTimer = null; }
          hideUI();
          if (_onclose) _onclose(evt);
          setTimeout(hideUI, 50); setTimeout(hideUI, 300); setTimeout(hideUI, 800);
        });
      }
    });

    return ws;
  };
  /* Copy static properties from native WebSocket */
  ['prototype','CONNECTING','OPEN','CLOSING','CLOSED'].forEach(function(k) {
    try { window.WebSocket[k] = _OrigWS[k]; } catch(e) {}
  });

})();
</script>"""

if '</head>' in html:
    html = html.replace('</head>', PATCH + '\n</head>', 1)
else:
    html = PATCH + html

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print("noVNC HTML patched successfully (v6 — WS keepalive ping, always live)")
PYEOF
        log "noVNC always-live WS keepalive patch active (v6)"
    else
        log "noVNC HTML already patched (v6 tag found), skipping"
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
