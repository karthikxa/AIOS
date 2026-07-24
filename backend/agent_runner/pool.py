"""Queue-based worker pool for staggered concurrent agent execution.

Uses asyncio.Queue + fixed worker coroutines instead of create_task per agent.
More memory-efficient for 550+ agents — unstarted work sits as plain tuples.
Models are fetched from FreeLLMAPI and distributed round-robin across agents.
"""

import asyncio
import logging
import time
from typing import Any, Callable, Awaitable, Dict, List

from .config import MAX_CONCURRENT_AGENTS, AGENT_TIMEOUT_SECONDS, MAX_RETRIES, RETRY_BACKOFF_BASE, LAUNCH_INTERVAL_SECONDS
from .shared_client import get_client
from .model_router import get_model_router

logger = logging.getLogger(__name__)

RETRYABLE_STATUSES = {429, 500, 502, 503, 504}


async def _run_agent_with_retry(
    agent_id: int,
    task_payload: dict,
    agent_fn: Callable[[int, dict, Any], Awaitable[dict]],
    client: Any,
    model_router=None,
) -> dict:
    """Run a single agent with retry logic and model failover."""
    last_error = None
    model = task_payload.get("model", "auto")
    for attempt in range(MAX_RETRIES):
        try:
            task_with_model = {**task_payload, "model": model}
            result = await asyncio.wait_for(
                agent_fn(agent_id, task_with_model, client),
                timeout=AGENT_TIMEOUT_SECONDS,
            )
            return {"id": agent_id, "status": "ok", "result": result, "attempts": attempt + 1, "model": model}
        except asyncio.TimeoutError:
            last_error = "timeout"
            logger.warning("Agent %d attempt %d timed out (model=%s)", agent_id, attempt + 1, model)
        except Exception as e:
            error_str = str(e)
            last_error = error_str
            logger.warning("Agent %d attempt %d failed: %s (model=%s)", agent_id, attempt + 1, error_str, model)

        # Model failover: assign a different model on retry
        if model_router and attempt < MAX_RETRIES - 1:
            new_model = model_router.on_model_failure(model, agent_id)
            if new_model != model:
                logger.info("Agent %d retrying on model %s instead of %s", agent_id, new_model, model)
                model = new_model

        if attempt < MAX_RETRIES - 1:
            wait = RETRY_BACKOFF_BASE ** (attempt + 1)
            logger.info("Agent %d retrying in %.1fs", agent_id, wait)
            await asyncio.sleep(wait)

    return {"id": agent_id, "status": "error", "error": last_error, "attempts": MAX_RETRIES, "model": model}


async def _worker(
    queue: asyncio.Queue,
    agent_fn: Callable,
    semaphore: asyncio.Semaphore,
    results: Dict[int, dict],
    model_router=None,
):
    """Worker coroutine — picks tasks from queue, runs them under semaphore."""
    client = get_client()
    while True:
        try:
            item = await asyncio.wait_for(queue.get(), timeout=2.0)
        except asyncio.TimeoutError:
            break
        agent_id, task_payload = item
        try:
            async with semaphore:
                result = await _run_agent_with_retry(agent_id, task_payload, agent_fn, client, model_router)
                results[agent_id] = result
        except Exception as e:
            results[agent_id] = {"id": agent_id, "status": "error", "error": str(e), "attempts": 0}
            logger.error("Agent %d crashed: %s", agent_id, e)
        finally:
            queue.task_done()


def run_batch(
    tasks: List[dict],
    agent_fn: Callable[[int, dict, Any], Awaitable[dict]],
) -> dict:
    """Run a batch of agents using queue-based worker pool.

    Args:
        tasks: List of task payloads (dicts). Each gets an agent_id (0..N-1).
        agent_fn: Async function(agent_id, task_payload, client) -> result dict.

    Returns:
        Dict with 'results' list and 'summary' stats.
    """
    return asyncio.run(_run_batch_async(tasks, agent_fn))


async def run_batch_async(
    tasks: List[dict],
    agent_fn: Callable[[int, dict, Any], Awaitable[dict]],
) -> dict:
    """Async version of run_batch — for use inside an event loop."""
    return await _run_batch_async(tasks, agent_fn)


async def _run_batch_async(
    tasks: List[dict],
    agent_fn: Callable[[int, dict, Any], Awaitable[dict]],
) -> dict:
    total = len(tasks)
    semaphore = asyncio.Semaphore(MAX_CONCURRENT_AGENTS)

    # Fetch models and assign to agents
    model_router = get_model_router()
    chat_models = await model_router.fetch_models()
    model_assignment = model_router.assign_models(total)
    logger.info("Batch: %d agents across %d models (%.1f agents/model)",
                total, len(chat_models), total / max(len(chat_models), 1))

    # Attach model to each task
    for i, task in enumerate(tasks):
        task["model"] = model_assignment[i]

    results: Dict[int, dict] = {}
    logger.info("Starting batch: %d agents, max_concurrent=%d", total, MAX_CONCURRENT_AGENTS)
    t0 = time.monotonic()

    # Load queue with all tasks
    queue = asyncio.Queue()
    for i, task in enumerate(tasks):
        await queue.put((i, task))

    # Launch fixed pool of workers
    workers = [
        asyncio.create_task(_worker(queue, agent_fn, semaphore, results, model_router))
        for _ in range(min(MAX_CONCURRENT_AGENTS, total))
    ]

    # Wait for all tasks to complete
    await queue.join()

    # Stop workers
    for w in workers:
        w.cancel()
    await asyncio.gather(*workers, return_exceptions=True)

    elapsed = time.monotonic() - t0
    logger.info("Batch complete: %d agents in %.1fs", total, elapsed)

    # Verify completeness
    missing = [i for i in range(total) if i not in results]
    if missing:
        logger.error("Missing agent_ids: %s", missing)

    results_list = [results.get(i, {"id": i, "status": "missing"}) for i in range(total)]

    success_count = sum(1 for r in results_list if r.get("status") == "ok")
    error_count = sum(1 for r in results_list if r.get("status") == "error")
    timeout_count = sum(1 for r in results_list if r.get("error") == "timeout")
    missing_count = len(missing)

    # Model distribution summary
    model_counts = {}
    for r in results_list:
        m = r.get("model", "unknown")
        model_counts[m] = model_counts.get(m, 0) + 1

    return {
        "results": results_list,
        "summary": {
            "total": total,
            "success": success_count,
            "errors": error_count,
            "timeouts": timeout_count,
            "missing": missing_count,
            "elapsed_seconds": round(elapsed, 2),
            "agents_per_second": round(total / elapsed, 2) if elapsed > 0 else 0,
            "models_used": len(model_counts),
            "model_distribution": model_counts,
        },
    }
