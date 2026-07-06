#!/bin/bash
envsubst < /etc/turnserver.conf.template > /tmp/turnserver.conf
echo "Starting coturn..."
turnserver -c /tmp/turnserver.conf --no-stdout-log &

# Tiny HTTP health server so Render stops complaining
while true; do
  echo -e "HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK" | nc -l -p 8080 -q 1 2>/dev/null || true
done
