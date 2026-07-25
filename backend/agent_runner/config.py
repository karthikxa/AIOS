"""Configuration for the agent runner.

Auto-detects from system RAM. Override via env vars if needed.
Minimum viable RAM: 1GB. Below that, warn and limit to 2 concurrent agents.
"""

import os
import logging

logger = logging.getLogger(__name__)

ESTIMATED_MB_PER_WORKER = 15
SAFETY_MARGIN_MB = 150
MIN_VIABLE_MB = 1024


def _get_available_memory_mb() -> float:
    """Detect available memory. Returns MB."""
    try:
        import psutil
        return psutil.virtual_memory().available / (1024 * 1024)
    except ImportError:
        pass
    try:
        # Linux cgroup memory limit
        with open("/sys/fs/cgroup/memory.max", "r") as f:
            return int(f.read().strip()) / (1024 * 1024)
    except (FileNotFoundError, ValueError):
        pass
    # Fallback: assume 2GB
    return 2048


def _compute_max_concurrent() -> int:
    """Auto-detect max concurrent agents from available RAM."""
    env_override = os.environ.get("MAX_CONCURRENT_AGENTS")
    if env_override:
        val = int(env_override)
        logger.info("MAX_CONCURRENT_AGENTS from env: %d", val)
        return max(1, val)

    available = _get_available_memory_mb()
    if available < MIN_VIABLE_MB:
        logger.warning("Available RAM %.0fMB below minimum %dMB — limiting to 2 agents", available, MIN_VIABLE_MB)
        return 2
    safe = available - SAFETY_MARGIN_MB
    computed = max(1, int(safe / ESTIMATED_MB_PER_WORKER))
    # Cap at 250 (max model count)
    result = min(computed, 250)
    logger.info("Auto-detected MAX_CONCURRENT_AGENTS=%d (available=%.0fMB)", result, available)
    return result


MAX_CONCURRENT_AGENTS = _compute_max_concurrent()

# Gap between launching new agents (seconds)
LAUNCH_INTERVAL_SECONDS = 0.25

# Agent execution timeout (seconds) — configurable via env
AGENT_TIMEOUT_SECONDS = int(os.environ.get("AGENT_TIMEOUT_SECONDS", "120"))

# Retry settings
MAX_RETRIES = 3
RETRY_BACKOFF_BASE = 2.0

# Shared httpx client limits
SHARED_HTTPX_TIMEOUT = 30.0
SHARED_HTTPX_CONNECT_TIMEOUT = 10.0
SHARED_HTTPX_MAX_CONNECTIONS = 20
SHARED_HTTPX_MAX_KEEPALIVE = 18
