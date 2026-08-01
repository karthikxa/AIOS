"""Circuit breaker per LLM provider.

Prevents workers from hanging on a dead provider. Opens after threshold
failures, cooldown before retry. Prevents cascade failures across swarm.
"""

import time
import logging
from typing import Dict

logger = logging.getLogger(__name__)


class CircuitBreaker:
    """Simple circuit breaker with closed/open/half-open states."""

    def __init__(self, name: str, threshold: int = 5, cooldown: int = 20):
        self.name = name
        self.failures = 0
        self.threshold = threshold
        self.cooldown = cooldown
        self.opened_at = 0.0
        self.state = "closed"

    def record_success(self):
        self.failures = 0
        self.state = "closed"

    def record_failure(self):
        self.failures += 1
        if self.failures >= self.threshold:
            self.state = "open"
            self.opened_at = time.monotonic()
            logger.warning("circuit_breaker_opened provider=%s failures=%d", self.name, self.failures)

    def can_attempt(self) -> bool:
        if self.state == "open":
            if time.monotonic() - self.opened_at > self.cooldown:
                self.state = "half_open"
                logger.info("circuit_breaker_half_open provider=%s", self.name)
                return True
            return False
        return True

    def stats(self) -> dict:
        return {
            "provider": self.name,
            "state": self.state,
            "failures": self.failures,
            "threshold": self.threshold,
            "cooldown_s": self.cooldown,
        }


# Global breaker registry
_breakers: Dict[str, CircuitBreaker] = {}


def get_breaker(provider: str, threshold: int = 5, cooldown: int = 20) -> CircuitBreaker:
    if provider not in _breakers:
        _breakers[provider] = CircuitBreaker(provider, threshold, cooldown)
    return _breakers[provider]


def get_all_breakers_stats() -> dict:
    return {name: b.stats() for name, b in _breakers.items()}
