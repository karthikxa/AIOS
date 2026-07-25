"""Configuration for the agent runner.

Values are placeholders — will be tuned from Phase 1 measurements.
"""

# Max concurrent agents (measured: ~22MB/agent on Render, 512-110 overhead = 402 available / 22 = 18)
MAX_CONCURRENT_AGENTS = 18

# Gap between launching new agents (seconds)
LAUNCH_INTERVAL_SECONDS = 0.25

# Agent execution timeout (seconds)
AGENT_TIMEOUT_SECONDS = 30

# Retry settings
MAX_RETRIES = 3
RETRY_BACKOFF_BASE = 2.0  # exponential backoff: 2s, 4s, 8s

# Shared httpx client limits
SHARED_HTTPX_TIMEOUT = 30.0
SHARED_HTTPX_CONNECT_TIMEOUT = 10.0
SHARED_HTTPX_MAX_CONNECTIONS = 20
SHARED_HTTPX_MAX_KEEPALIVE = 18
