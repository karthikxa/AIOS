"""Token bucket rate limiter for LLM API calls.

Prevents 429s, 502s, and crashes when many agents (up to 250) hit the LLM
proxy simultaneously. Each API call must acquire a token before proceeding.
Tokens refill at a configurable rate with burst support.
"""

import asyncio
import time
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# Global rate limiter instance — shared across all agents in the process
_bucket: Optional["TokenBucket"] = None
_lock = asyncio.Lock()


class TokenBucket:
    """Async token bucket rate limiter."""

    def __init__(self, rate_per_minute: int = 60, burst: int = 10):
        """
        Args:
            rate_per_minute: How many tokens refill per minute.
            burst: Maximum tokens that can accumulate (burst capacity).
        """
        self.rate = rate_per_minute / 60.0  # tokens per second
        self.burst = burst
        self.tokens = float(burst)
        self.last_refill = time.monotonic()
        self._async_lock = asyncio.Lock()
        self._waiters = 0
        self._total_acquired = 0
        self._total_waited = 0

    async def acquire(self, tokens: int = 1) -> float:
        """Acquire tokens, sleeping if necessary. Returns wait time in seconds."""
        waited = 0.0
        async with self._async_lock:
            self._refill()
            while self.tokens < tokens:
                # Calculate how long until we have enough tokens
                deficit = tokens - self.tokens
                wait_time = deficit / self.rate
                self._waiters += 1
                logger.debug(
                    "Rate limit: waiting %.1fs for %d tokens (%.1f available, %d total acquired)",
                    wait_time, tokens, self.tokens, self._total_acquired,
                )
                # Release lock while sleeping so other coroutines can check
                self._async_lock.release()
                try:
                    await asyncio.sleep(wait_time)
                finally:
                    await self._async_lock.acquire()
                    self._refill()
                waited += wait_time
                self._waiters -= 1

            self.tokens -= tokens
            self._total_acquired += 1
            if waited > 0:
                self._total_waited += 1
        return waited

    def _refill(self):
        """Add tokens based on elapsed time."""
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.burst, self.tokens + elapsed * self.rate)
        self.last_refill = now

    def stats(self) -> dict:
        return {
            "tokens_available": round(self.tokens, 2),
            "rate_per_minute": round(self.rate * 60, 1),
            "burst": self.burst,
            "total_acquired": self._total_acquired,
            "total_waited": self._total_waited,
            "current_waiters": self._waiters,
        }


def get_rate_limiter(
    rate_per_minute: int = 60,
    burst: int = 10,
) -> TokenBucket:
    """Get or create the global rate limiter singleton."""
    global _bucket
    if _bucket is None:
        _bucket = TokenBucket(rate_per_minute=rate_per_minute, burst=burst)
        logger.info(
            "Rate limiter initialized: %d req/min, burst %d",
            rate_per_minute,
            burst,
        )
    return _bucket


async def rate_limit_acquire(tokens: int = 1) -> float:
    """Acquire a token from the global rate limiter. Returns wait time."""
    bucket = get_rate_limiter()
    return await bucket.acquire(tokens)


def get_rate_limiter_stats() -> dict:
    """Get current rate limiter stats."""
    if _bucket is None:
        return {"status": "not_initialized"}
    return _bucket.stats()
