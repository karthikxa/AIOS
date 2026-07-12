FROM debian:bookworm-slim

# ── Environment ────────────────────────────────────────────────
ENV DEBIAN_FRONTEND=noninteractive \
    DISPLAY=:99 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# ── System packages ────────────────────────────────────────────
# Stack: Xvfb (virtual display) → Chromium → x11vnc → websockify → noVNC
# NO GStreamer / Selkies / Playwright — keeps RAM << 512 MB
RUN apt-get update && apt-get install -y --no-install-recommends \
    # ── Virtual framebuffer ──────────────────────────────────
    xvfb \
    x11-utils \
    xdotool \
    # ── Window manager (prevents black-screen/artifact frames) ─
    openbox \
    # ── Chromium browser (CDP-controllable, apt-native) ──────
    chromium \
    # ── Live VNC stream source ───────────────────────────────
    x11vnc \
    # ── WebSocket-to-VNC bridge + noVNC HTML5 client ─────────
    websockify \
    novnc \
    # ── Reverse proxy ────────────────────────────────────────
    nginx \
    # ── Python runtime ───────────────────────────────────────
    python3 python3-pip \
    # ── Misc ─────────────────────────────────────────────────
    curl fonts-liberation ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ── Python dependencies ────────────────────────────────────────
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# ── Application ────────────────────────────────────────────────
COPY app.py start.sh ./
RUN chmod +x start.sh

# Render sets $PORT (default 10000)
EXPOSE 10000

CMD ["/bin/bash", "/app/start.sh"]
