"""Shared httpx client — one singleton instance reused by all agents."""

import httpx
from .config import SHARED_HTTPX_TIMEOUT, SHARED_HTTPX_CONNECT_TIMEOUT, SHARED_HTTPX_MAX_CONNECTIONS, SHARED_HTTPX_MAX_KEEPALIVE

_client: httpx.AsyncClient | None = None


def get_client() -> httpx.AsyncClient:
    """Get or create the singleton httpx client."""
    global _client
    if _client is None or _client.is_closed:
        _client = httpx.AsyncClient(
            timeout=httpx.Timeout(SHARED_HTTPX_TIMEOUT, connect=SHARED_HTTPX_CONNECT_TIMEOUT),
            limits=httpx.Limits(
                max_connections=SHARED_HTTPX_MAX_CONNECTIONS,
                max_keepalive_connections=SHARED_HTTPX_MAX_KEEPALIVE,
            ),
        )
    return _client


async def close_client():
    """Close the singleton client."""
    global _client
    if _client and not _client.is_closed:
        await _client.aclose()
    _client = None
