#!/bin/bash

# Start KasmVNC in background
/dockerStartup.sh &

# Wait for KasmVNC to be ready
echo "Waiting for KasmVNC..."
sleep 15

# Check if node and server.js exist
echo "=== Checking environment ==="
which node
node --version
ls -la /app/

# Start Node.js server
echo "=== Starting Node.js server ==="
cd /app
PORT=8080 node server.js
