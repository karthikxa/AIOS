FROM kasmweb/core-ubuntu-jammy:1.15.0

USER root

ENV HOME=/home/kasm-default
ENV WIDTH=1280
ENV HEIGHT=720
ENV QUALITY=80
ENV FPS=30
ENV VNC_PW=password123
ENV PORT=8080

# Install Chromium and Node.js
RUN apt-get update && apt-get install -y \
    chromium-browser \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Set Chromium as default browser
ENV CHROME_BIN=/usr/bin/chromium-browser

# Create app directory
WORKDIR /app

# Copy package files first for caching
COPY browser-server/package*.json ./
RUN npm install --only=production

# Copy server files
COPY browser-server/server.js .
COPY browser-server/registry.js .

# Expose ports
# 8080 - Main API (Render auto-detects this)
# 6901 - noVNC web interface
# 6902 - KasmVNC WebSocket API
EXPOSE 8080 6901 6902

# Start both KasmVNC and Node.js server
CMD ["/bin/bash", "-c", "/dockerStartup.sh & sleep 10 && cd /app && PORT=8080 node server.js 2>&1"]
