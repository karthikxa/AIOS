"""
LLM Load Balancer and Rate Limiter for AVDE Dashboard.

Distributes requests across multiple LLM providers and prevents 429 errors
by adapting rate limits based on agent count and workload.

Features:
- Multiple LLM provider endpoints with health checks
- Adaptive rate limiting based on agent count
- Automatic failover to backup providers
- Request queuing with priority
- Real-time metrics and monitoring
"""

import asyncio
import time
import logging
import os
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
import random

logger = logging.getLogger(__name__)


class ProviderStatus(Enum):
    """LLM provider health status."""
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    UNHEALTHY = "unhealthy"
    UNKNOWN = "unknown"


@dataclass
class LLMProvider:
    """LLM provider configuration."""
    name: str
    url: str
    api_key: str
    models: List[str]
    rate_limit: int = 60  # requests per minute
    burst: int = 10
    priority: int = 1  # lower = higher priority
    status: ProviderStatus = ProviderStatus.UNKNOWN
    last_health_check: float = 0
    consecutive_failures: int = 0
    total_requests: int = 0
    total_failures: int = 0
    avg_latency_ms: float = 0


@dataclass
class RequestMetrics:
    """Metrics for a single request."""
    provider: str
    model: str
    start_time: float
    end_time: float = 0
    success: bool = False
    status_code: int = 0
    error: str = ""
    tokens_used: int = 0


class LLMLoadBalancer:
    """Load balancer for LLM API requests with adaptive rate limiting."""
    
    def __init__(self):
        self.providers: Dict[str, LLMProvider] = {}
        self.request_queue: asyncio.PriorityQueue = asyncio.PriorityQueue()
        self.metrics: List[RequestMetrics] = []
        self._lock = asyncio.Lock()
        self._initialized = False
        
        # Adaptive rate limiting
        self._current_rate = 60  # requests per minute
        self._target_rate = 60
        self._min_rate = 10
        self._max_rate = 300
        self._backoff_factor = 0.5
        self._recovery_factor = 1.1
        
        # Agent tracking
        self._active_agents = 0
        self._max_concurrent_agents = 250
        
        # Request tracking
        self._requests_in_flight = 0
        self._requests_last_minute = 0
        self._last_minute_reset = time.time()
        
    def initialize(self):
        """Initialize load balancer with default providers."""
        if self._initialized:
            return
            
        # Add Render LLM proxy as primary provider
        self.providers["render-llm"] = LLMProvider(
            name="Render LLM Proxy",
            url=os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1-0r64.onrender.com/v1"),
            api_key=os.getenv("ZED_PRO_API_KEY", ""),
            models=["auto", "gemini-2.5-flash-lite", "gpt-4o-mini", "claude-3-haiku"],
            rate_limit=120,  # Increased from 60 to handle more requests
            burst=20,  # Increased burst capacity
            priority=1,
        )
        
        # Add backup providers (free tier) with higher limits
        self.providers["pollinations"] = LLMProvider(
            name="Pollinations",
            url="https://text.pollinations.ai",
            api_key="",
            models=["openai-large", "openai-small", "gemini"],
            rate_limit=60,  # Increased from 30
            burst=10,
            priority=2,
        )
        
        self.providers["kilo"] = LLMProvider(
            name="Kilo AI",
            url="https://api.kilo.ai",
            api_key="",
            models=["auto"],
            rate_limit=40,  # Increased from 20
            burst=5,
            priority=3,
        )
        
        # Increase adaptive rate limits
        self._min_rate = 30  # Increased from 10
        self._max_rate = 500  # Increased from 300
        
        self._initialized = True
        logger.info("LLM Load Balancer initialized with %d providers", len(self.providers))
    
    def _get_sorted_providers(self) -> List[LLMProvider]:
        """Get providers sorted by priority and health status."""
        providers = list(self.providers.values())
        
        def sort_key(p: LLMProvider) -> Tuple[int, int]:
            # Priority 1: Healthy providers first
            if p.status == ProviderStatus.HEALTHY:
                health_score = 0
            elif p.status == ProviderStatus.DEGRADED:
                health_score = 1
            else:
                health_score = 2
            
            # Priority 2: Lower priority number = higher priority
            return (health_score, p.priority)
        
        return sorted(providers, key=sort_key)
    
    async def acquire_token(self, provider_name: str = None) -> Tuple[LLMProvider, float]:
        """Acquire a token for making an LLM request.
        
        Returns:
            Tuple of (provider, wait_time)
        """
        await self._lock.acquire()
        try:
            # Update rate based on agent count
            self._update_adaptive_rate()
            
            # Get sorted providers
            providers = self._get_sorted_providers()
            
            for provider in providers:
                if provider.status == ProviderStatus.UNHEALTHY:
                    continue
                    
                # Check if provider has capacity
                if provider.total_requests - provider.total_failures < provider.rate_limit:
                    provider.total_requests += 1
                    return provider, 0.0
            
            # All providers at capacity - wait and retry
            wait_time = 60.0 / self._current_rate
            logger.warning("All providers at capacity, waiting %.1fs", wait_time)
            return providers[0], wait_time
        finally:
            self._lock.release()
    
    def _update_adaptive_rate(self):
        """Update rate limit based on agent count and workload."""
        # Calculate target rate based on active agents
        agent_ratio = self._active_agents / self._max_concurrent_agents
        self._target_rate = int(self._min_rate + (self._max_rate - self._min_rate) * (1 - agent_ratio))
        
        # Smoothly adjust current rate
        if self._current_rate < self._target_rate:
            self._current_rate = min(self._target_rate, self._current_rate * self._recovery_factor)
        elif self._current_rate > self._target_rate:
            self._current_rate = max(self._target_rate, self._current_rate * self._backoff_factor)
    
    def record_request(self, metrics: RequestMetrics):
        """Record request metrics for adaptive rate limiting."""
        self.metrics.append(metrics)
        
        # Keep only last 1000 metrics
        if len(self.metrics) > 1000:
            self.metrics = self.metrics[-500:]
        
        # Update provider stats
        if metrics.provider in self.providers:
            provider = self.providers[metrics.provider]
            if metrics.success:
                provider.consecutive_failures = 0
                provider.status = ProviderStatus.HEALTHY
                # Update average latency
                latency = (metrics.end_time - metrics.start_time) * 1000
                provider.avg_latency_ms = (provider.avg_latency_ms * 0.9) + (latency * 0.1)
            else:
                provider.consecutive_failures += 1
                provider.total_failures += 1
                if provider.consecutive_failures >= 3:
                    provider.status = ProviderStatus.UNHEALTHY
                elif provider.consecutive_failures >= 1:
                    provider.status = ProviderStatus.DEGRADED
    
    def register_agent(self):
        """Register a new agent."""
        self._active_agents += 1
        logger.info("Agent registered. Active: %d/%d", self._active_agents, self._max_concurrent_agents)
    
    def unregister_agent(self):
        """Unregister an agent."""
        self._active_agents = max(0, self._active_agents - 1)
        logger.info("Agent unregistered. Active: %d/%d", self._active_agents, self._max_concurrent_agents)
    
    def get_status(self) -> Dict:
        """Get load balancer status."""
        return {
            "active_agents": self._active_agents,
            "max_concurrent_agents": self._max_concurrent_agents,
            "current_rate": round(self._current_rate, 1),
            "target_rate": self._target_rate,
            "providers": {
                name: {
                    "name": p.name,
                    "status": p.status.value,
                    "rate_limit": p.rate_limit,
                    "total_requests": p.total_requests,
                    "total_failures": p.total_failures,
                    "consecutive_failures": p.consecutive_failures,
                    "avg_latency_ms": round(p.avg_latency_ms, 1),
                }
                for name, p in self.providers.items()
            },
            "recent_metrics": len(self.metrics),
        }
    
    async def health_check_all(self):
        """Check health of all providers."""
        import httpx
        
        for name, provider in self.providers.items():
            try:
                async with httpx.AsyncClient() as client:
                    # Try to get models list
                    resp = await client.get(
                        f"{provider.url}/models",
                        headers={"Authorization": f"Bearer {provider.api_key}"} if provider.api_key else {},
                        timeout=5.0,
                    )
                    if resp.status_code == 200:
                        provider.status = ProviderStatus.HEALTHY
                        provider.consecutive_failures = 0
                    elif resp.status_code == 429:
                        provider.status = ProviderStatus.DEGRADED
                    else:
                        provider.status = ProviderStatus.UNHEALTHY
                        provider.consecutive_failures += 1
            except Exception as e:
                provider.status = ProviderStatus.UNHEALTHY
                provider.consecutive_failures += 1
                logger.warning("Health check failed for %s: %s", name, e)
            
            provider.last_health_check = time.time()


# Global instance
_load_balancer: Optional[LLMLoadBalancer] = None


def get_load_balancer() -> LLMLoadBalancer:
    """Get the global load balancer instance."""
    global _load_balancer
    if _load_balancer is None:
        _load_balancer = LLMLoadBalancer()
        _load_balancer.initialize()
    return _load_balancer


async def rate_limit_acquire(tokens: int = 1) -> Tuple[LLMProvider, float]:
    """Acquire rate limit tokens. Returns (provider, wait_time)."""
    lb = get_load_balancer()
    return await lb.acquire_token()


def record_llm_request(provider: str, model: str, start_time: float, end_time: float, 
                       success: bool, status_code: int = 0, error: str = ""):
    """Record LLM request metrics."""
    lb = get_load_balancer()
    metrics = RequestMetrics(
        provider=provider,
        model=model,
        start_time=start_time,
        end_time=end_time,
        success=success,
        status_code=status_code,
        error=error,
    )
    lb.record_request(metrics)


def register_agent():
    """Register a new agent."""
    lb = get_load_balancer()
    lb.register_agent()


def unregister_agent():
    """Unregister an agent."""
    lb = get_load_balancer()
    lb.unregister_agent()


def get_load_balancer_status() -> Dict:
    """Get load balancer status."""
    lb = get_load_balancer()
    return lb.get_status()
