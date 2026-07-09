FROM kasmweb/core-ubuntu-jammy:1.15.0

USER root

ENV HOME=/home/kasm-default
ENV WIDTH=1280
ENV HEIGHT=720
ENV QUALITY=80
ENV FPS=30
ENV VNC_PW=password123

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
COPY package*.json ./
RUN npm ci --only=production

# Copy server files
COPY server.js .
COPY registry.js .

# Expose ports
# 5900 - VNC
# 6901 - noVNC web interface
# 6902 - KasmVNC WebSocket API
# 3000 - Node.js API
EXPOSE 5900 6901 6902 3000

# Start both KasmVNC and Node.js server
CMD ["/bin/bash", "-c", "/dockerStartup.sh & sleep 5 && node server.js"]
