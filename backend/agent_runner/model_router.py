"""Model Router — dynamically fetch models and distribute agents across them.

Fetches available models from FreeLLMAPI, filters to chat models, then assigns
each agent a model via round-robin: agents_per_model = ceil(total_agents / total_models).
"""

import asyncio
import json
import os
import time
import logging
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

# Models to exclude (not chat-capable)
EXCLUDE_PATTERNS = ["flux", "melotts", "stable-diffusion", "embedding", "tts", "image"]


class ModelRouter:
    """Fetches models and assigns them to agents round-robin."""

    def __init__(self, proxy_url: str, api_key: str):
        self.proxy_url = proxy_url
        self.api_key = api_key
        self._all_models: list[str] = []
        self._chat_models: list[str] = []
        self._cached_at: float = 0
        self._cache_ttl: float = 300  # 5 minutes
        self._bad_models: set[str] = set()  # temporarily failed models

    async def fetch_models(self, force: bool = False) -> list[str]:
        """Fetch /v1/models and filter to chat-capable models."""
        now = time.monotonic()
        if not force and self._chat_models and (now - self._cached_at) < self._cache_ttl:
            return self._chat_models

        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.get(
                    f"{self.proxy_url}/models",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                )
                resp.raise_for_status()
                data = resp.json()
                self._all_models = [m["id"] for m in data.get("data", [])]
                self._chat_models = self._filter_chat_models(self._all_models)
                self._cached_at = now
                logger.info(
                    "Fetched %d models, %d chat-usable",
                    len(self._all_models),
                    len(self._chat_models),
                )
                return self._chat_models
        except Exception as e:
            logger.error("Failed to fetch models: %s", e)
            return self._chat_models  # return cached if available

    def _filter_chat_models(self, models: list[str]) -> list[str]:
        """Exclude non-chat models (image, tts, embedding)."""
        return [
            m for m in models
            if not any(x in m.lower() for x in EXCLUDE_PATTERNS)
        ]

    def get_active_models(self) -> list[str]:
        """Return callable models (exclude temporarily bad ones)."""
        return [m for m in self._chat_models if m not in self._bad_models]

    def assign_models(self, agent_count: int) -> dict[int, str]:
        """Round-robin assign agents to active models.

        Returns: {agent_id: model_name}
        """
        models = self.get_active_models()
        if not models:
            models = self._chat_models  # fallback to all if all marked bad

        assignment = {}
        for i in range(agent_count):
            assignment[i] = models[i % len(models)]
        return assignment

    def on_model_failure(self, failed_model: str, agent_id: int) -> str:
        """Mark model as bad, return a different model for retry."""
        self._bad_models.add(failed_model)
        logger.warning("Model %s marked bad (agent %d)", failed_model, agent_id)

        models = self.get_active_models()
        if not models:
            # All models bad — clear bad cache and retry with first model
            self._bad_models.clear()
            models = self._chat_models

        # Pick a different model (round-robin from agent_id)
        return models[agent_id % len(models)] if models else failed_model

    def clear_bad_models(self):
        """Reset bad model cache (e.g. after a cooldown period)."""
        self._bad_models.clear()
        logger.info("Bad model cache cleared")

    def stats(self) -> dict:
        return {
            "total_models": len(self._all_models),
            "chat_models": len(self._chat_models),
            "active_models": len(self.get_active_models()),
            "bad_models": list(self._bad_models),
            "cache_age_seconds": round(time.monotonic() - self._cached_at, 1),
        }


# ── Singleton ──────────────────────────────────────────────────────────

_router: Optional[ModelRouter] = None


def get_model_router(
    proxy_url: str = "https://server-llm-1-0r64.onrender.com/v1",
    api_key: str = None,
) -> ModelRouter:
    global _router
    if api_key is None:
        api_key = os.environ.get("ZED_PRO_API_KEY", "")
    if _router is None:
        _router = ModelRouter(proxy_url, api_key)
    return _router


def get_model_router_stats() -> dict:
    if _router is None:
        return {"status": "not_initialized"}
    return _router.stats()
