FROM debian:bookworm-slim

# ── Service 1: VNC Desktop (no Python/FastAPI — pure stream) ───
# All CPU goes to Chromium + x11vnc + websockify
ENV DEBIAN_FRONTEND=noninteractive \
    DISPLAY=:99

RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb x11-utils x11-xserver-utils xdotool \
    openbox \
    chromium \
    x11vnc \
    websockify novnc \
    nginx python3-minimal \
    curl fonts-liberation ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 10000
CMD ["/bin/bash", "/app/start.sh"]
