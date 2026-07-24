"""Token bucket rate limiter for LLM API calls — balanced for 550+ agents.

Each agent makes ~3-5 API calls per task (decompose + tool calls + synthesis).
With 550 agents: ~1650-2750 req/min peak. Token bucket smooths bursts.

Per-provider tracking prevents one provider from eating all the quota.
Circuit breaker skips providers that return 429/503.
"""

import asyncio
import time
import logging
from collections import defaultdict
from typing import Optional

logger = logging.getLogger(__name__)

_bucket: Optional["TokenBucket"] = None


class TokenBucket:
    """Async token bucket with per-provider tracking."""

    def __init__(self, rate_per_minute: int = 3000, burst: int = 100):
        self.rate = rate_per_minute / 60.0  # tokens per second
        self.burst = burst
        self.tokens = float(burst)
        self.last_refill = time.monotonic()
        self._async_lock = asyncio.Lock()
        self._total_acquired = 0
        self._total_waited = 0

        # Per-provider tracking
        self._provider_calls: dict = defaultdict(int)
        self._provider_errors: dict = defaultdict(int)

        # Circuit breaker per provider
        self._circuit_open: dict = {}  # provider -> open_time
        self._circuit_threshold = 5  # failures before opening
        self._circuit_cooldown = 30  # seconds before retry

    async def acquire(self, tokens: int = 1) -> float:
        waited = 0.0
        async with self._async_lock:
            self._refill()
            while self.tokens < tokens:
                deficit = tokens - self.tokens
                wait_time = min(deficit / self.rate, 5.0)  # cap wait at 5s
                self._async_lock.release()
                try:
                    await asyncio.sleep(wait_time)
                finally:
                    await self._async_lock.acquire()
                    self._refill()
                waited += wait_time

            self.tokens -= tokens
            self._total_acquired += 1
        return waited

    def _refill(self):
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.burst, self.tokens + elapsed * self.rate)
        self.last_refill = now

    def record_provider_call(self, provider: str):
        self._provider_calls[provider] += 1

    def record_provider_error(self, provider: str):
        self._provider_errors[provider] += 1
        self._circuit_open[provider] = time.monotonic()

    def is_provider_open(self, provider: str) -> bool:
        """Check if circuit breaker is open for a provider."""
        if provider not in self._circuit_open:
            return False
        open_time = self._circuit_open[provider]
        if time.monotonic() - open_time > self._circuit_cooldown:
            del self._circuit_open[provider]
            return False
        return True

    def stats(self) -> dict:
        return {
            "tokens_available": round(self.tokens, 2),
            "rate_per_minute": round(self.rate * 60, 1),
            "burst": self.burst,
            "total_acquired": self._total_acquired,
            "total_waited": self._total_waited,
            "providers": dict(self._provider_calls),
            "provider_errors": dict(self._provider_errors),
            "circuit_open": list(self._circuit_open.keys()),
        }


def get_rate_limiter(
    rate_per_minute: int = 6000,
    burst: int = 300,
) -> TokenBucket:
    global _bucket
    if _bucket is None:
        _bucket = TokenBucket(rate_per_minute=rate_per_minute, burst=burst)
        logger.info("Rate limiter: %d req/min, burst %d", rate_per_minute, burst)
    return _bucket


async def rate_limit_acquire(tokens: int = 1) -> float:
    bucket = get_rate_limiter()
    return await bucket.acquire(tokens)


def get_rate_limiter_stats() -> dict:
    if _bucket is None:
        return {"status": "not_initialized"}
    return _bucket.stats()
