#!/bin/bash
set -e

# Delete any self.pem files to force websockify/novnc to run in plain HTTP/WS mode
rm -f self.pem /self.pem /root/self.pem /root/.vnc/self.pem "${HOME}/.vnc/self.pem" "${HOME}/self.pem" /usr/share/novnc/self.pem /opt/novnc/self.pem 2>/dev/null || true
find / -name "self.pem" -exec rm -f {} + 2>/dev/null || true

# Source the original startup script's functions and config
source /dockerstartup/vnc_startup.sh --skip

