#!/bin/bash
# install-packages.sh — runs inside WSL2 to install the minimal desktop stack
# Called by scripts/setup-desktop.bat after the distro is ready.
set -euo pipefail

echo "=== Installing AVDE desktop packages ==="

# Non-interactive apt
export DEBIAN_FRONTEND=noninteractive

apt-get update -qq

# Minimal desktop stack — no recommends to keep image small
apt-get install -y --no-install-recommends \
  xvfb \
  x11vnc \
  fluxbox \
  novnc \
  websockify \
  pcmanfm \
  xclip \
  xdotool \
  x11-xserver-utils \
  fonts-liberation \
  fonts-dejavu-core \
  ca-certificates \
  procps \
  python3 \
  python3-pip \
  python3-venv

# Create persistent agent home directory
if [ ! -d /home/agent ]; then
  useradd -m -s /bin/bash agent 2>/dev/null || true
  mkdir -p /home/agent
fi
chown -R agent:agent /home/agent 2>/dev/null || true

# Install CUA Python dependencies for the Ubuntu desktop agent
echo "=== Installing CUA Python dependencies ==="
pip3 install --break-system-packages -q \
  fastapi \
  uvicorn[standard] \
  python-dotenv \
  httpx \
  Pillow \
  2>/dev/null || echo "WARN: Some Python deps failed to install"

# Try to install cua-agent and cua-sandbox (may not be available for all environments)
pip3 install --break-system-packages -q \
  cua-agent \
  cua-sandbox \
  2>/dev/null && echo "  CUA libraries installed successfully" || echo "  WARN: CUA libraries not available — will use legacy agent"

# Clean up
apt-get clean
rm -rf /var/lib/apt/lists/*

echo "=== Desktop packages installed successfully ==="
