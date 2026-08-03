#!/bin/bash
# setup-cua-agent.sh — Sync the desktop-agent code into WSL2 and install Python deps
# This should be run inside WSL2 after the desktop is set up.
set -euo pipefail

AGENT_DIR="/home/agent/avde/desktop-agent"
HOST_SCRIPT_DIR="${1:-/mnt/c/Users/$(whoami)/Downloads/AVDE/desktop-agent}"

echo "[setup-cua] Syncing desktop-agent code to ${AGENT_DIR}"

mkdir -p "${AGENT_DIR}"
mkdir -p /home/agent/avde/desktop-agent/frontend

# Copy the agent source files
if [ -d "${HOST_SCRIPT_DIR}" ]; then
    cp -r "${HOST_SCRIPT_DIR}/ubuntu_agent.py" "${AGENT_DIR}/" 2>/dev/null || true
    cp -r "${HOST_SCRIPT_DIR}/start_agent.py" "${AGENT_DIR}/" 2>/dev/null || true
    cp -r "${HOST_SCRIPT_DIR}/requirements.txt" "${AGENT_DIR}/" 2>/dev/null || true
    cp -r "${HOST_SCRIPT_DIR}/frontend/index.html" "${AGENT_DIR}/frontend/" 2>/dev/null || true
    chown -R agent:agent /home/agent/avde
else
    echo "[setup-cua] Host path not found: ${HOST_SCRIPT_DIR}"
    echo "[setup-cua] Skipping — agent code may already be synced"
fi

# Install Python dependencies
echo "[setup-cua] Installing Python dependencies..."
pip3 install --break-system-packages -q -r "${AGENT_DIR}/requirements.txt" 2>/dev/null || {
    echo "[setup-cua] Installing individual packages..."
    pip3 install --break-system-packages -q fastapi uvicorn[standard] python-dotenv httpx Pillow mss pyautogui 2>/dev/null || true
}

# Try installing CUA libraries
echo "[setup-cua] Installing CUA libraries..."
pip3 install --break-system-packages -q cua-agent cua-sandbox 2>/dev/null && echo "[setup-cua] CUA libraries installed" || {
    echo "[setup-cua] WARN: CUA libraries not available via pip"
    echo "[setup-cua] Install from source: cd cua/libs/python && pip install -e agent/ -e sandbox/"
}

echo "[setup-cua] Setup complete!"
echo "[setup-cua] Start the agent with: cd ${AGENT_DIR} && python3 start_agent.py"
