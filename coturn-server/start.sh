#!/bin/bash
envsubst < /etc/turnserver.conf.template > /tmp/turnserver.conf
echo "Starting coturn with secret: ${TURN_SECRET:0:4}****"
turnserver -c /tmp/turnserver.conf --no-stdout-log
