"""Phase 1: Measure LLM proxy load with concurrent agents.

Runs 20-30 agents in concurrency ramps (5→10→20→30) and logs:
- Per-agent wall-clock time and API call count
- Response headers (X-RateLimit-*, Retry-After, status codes)
- First concurrency level where 429s appear
- Summary: calls/agent, time/call, p50/p95 latency

Usage:
    cd backend
    python -m agent_runner.measure
"""

import asyncio
import json
import time
import logging
import sys
from typing import Any

import httpx

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

# ── Configuration ──────────────────────────────────────────────────────

LLM_BASE = "https://server-llm-1-0r64.onrender.com/v1"
LLM_KEY = "freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac"
MODEL = "auto"
CONCURRENCY_LEVELS = [5, 10, 20, 30]
AGENTS_PER_LEVEL = 10  # agents to run at each concurrency level
AGENT_TIMEOUT = 30.0


# ── Test agent function ───────────────────────────────────────────────

async def test_agent(agent_id: int, task: dict, client: httpx.AsyncClient) -> dict:
    """Simulates a real agent: makes 2-3 LLM API calls."""
    t0 = time.monotonic()
    call_count = 0
    headers_log = []

    # Simulate: decomposition + execution + synthesis (3 calls)
    for step in range(3):
        try:
            resp = await client.post(
                f"{LLM_BASE}/chat/completions",
                headers={"Authorization": f"Bearer {LLM_KEY}", "Content-Type": "application/json"},
                json={
                    "model": MODEL,
                    "messages": [{"role": "user", "content": f"Agent {agent_id} step {step+1}: {task.get('prompt', 'hello')}"}],
                    "max_tokens": 50,
                },
                timeout=AGENT_TIMEOUT,
            )
            call_count += 1
            headers_log.append({
                "step": step + 1,
                "status": resp.status_code,
                "headers": {k: v for k, v in resp.headers.items()
                           if "rate" in k.lower() or "limit" in k.lower() or "retry" in k.lower()},
            })
            if resp.status_code == 429:
                break  # Don't keep hammering a rate-limited provider
            resp.raise_for_status()
        except Exception as e:
            headers_log.append({"step": step + 1, "error": str(e)[:100]})
            break

    elapsed = time.monotonic() - t0
    return {
        "agent_id": agent_id,
        "wall_clock_seconds": round(elapsed, 2),
        "api_calls": call_count,
        "headers_log": headers_log,
        "final_status": headers_log[-1].get("status", "error") if headers_log else "error",
    }


# ── Concurrency ramp test ─────────────────────────────────────────────

async def run_concurrency_ramp():
    """Run agents at increasing concurrency levels to find the 429 threshold."""
    client = httpx.AsyncClient(timeout=AGENT_TIMEOUT)
    all_results = {}

    print("=" * 70)
    print("PHASE 1: Concurrency Ramp Test")
    print(f"LLM Proxy: {LLM_BASE}")
    print(f"Concurrency levels: {CONCURRENCY_LEVELS}")
    print(f"Agents per level: {AGENTS_PER_LEVEL}")
    print("=" * 70)

    first_429_level = None

    for level in CONCURRENCY_LEVELS:
        print(f"\n--- Concurrency Level: {level} ---")
        semaphore = asyncio.Semaphore(level)
        tasks_list = [{"prompt": f"test query {i}"} for i in range(AGENTS_PER_LEVEL)]

        t0 = time.monotonic()
        results = []
        for i, task in enumerate(tasks_list):
            async def run_with_semaphore(aid=i, t=task):
                async with semaphore:
                    return await test_agent(aid + level * 100, t, client)
            results.append(asyncio.create_task(run_with_semaphore()))

        agent_results = await asyncio.gather(*results)
        elapsed = time.monotonic() - t0

        # Analyze this level
        statuses = [r["final_status"] for r in agent_results]
        calls = [r["api_calls"] for r in agent_results]
        times = [r["wall_clock_seconds"] for r in agent_results]
        rate_limited = sum(1 for s in statuses if s == 429)

        avg_calls = sum(calls) / len(calls) if calls else 0
        avg_time = sum(times) / len(times) if times else 0
        sorted_times = sorted(times)
        p50 = sorted_times[len(sorted_times) // 2] if sorted_times else 0
        p95 = sorted_times[int(len(sorted_times) * 0.95)] if sorted_times else 0

        print(f"  Agents: {AGENTS_PER_LEVEL}")
        print(f"  Wall time: {elapsed:.1f}s")
        print(f"  Avg calls/agent: {avg_calls:.1f}")
        print(f"  Avg time/agent: {avg_time:.1f}s")
        print(f"  p50 latency: {p50:.1f}s  |  p95 latency: {p95:.1f}s")
        print(f"  429 rate-limited: {rate_limited}/{AGENTS_PER_LEVEL}")

        # Check for rate limit headers
        for r in agent_results[:3]:  # Print first 3
            for h in r.get("headers_log", []):
                if h.get("headers"):
                    print(f"  Headers (agent {r['agent_id']}, step {h['step']}): {h['headers']}")

        all_results[level] = {
            "elapsed": elapsed,
            "avg_calls": avg_calls,
            "avg_time": avg_time,
            "p50": p50,
            "p95": p95,
            "rate_limited": rate_limited,
        }

        if rate_limited > 0 and first_429_level is None:
            first_429_level = level
            print(f"\n  *** 429s FIRST APPEARED AT CONCURRENCY LEVEL {level} ***")

    await client.aclose()

    # Final summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"{'Level':<10} {'Time':<10} {'Avg Calls':<12} {'p50':<8} {'p95':<8} {'429s':<8}")
    print("-" * 70)
    for level, data in all_results.items():
        print(f"{level:<10} {data['elapsed']:<10.1f} {data['avg_calls']:<12.1f} {data['p50']:<8.1f} {data['p95']:<8.1f} {data['rate_limited']:<8}")

    if first_429_level:
        print(f"\n429 THRESHOLD: {first_429_level} concurrent agents")
        print(f"Recommendation: set MAX_CONCURRENT_AGENTS = {max(1, first_429_level - 2)}")
    else:
        print(f"\nNo 429s at any tested level. Safe to use {CONCURRENCY_LEVELS[-1]}+ concurrent agents.")

    return all_results, first_429_level


if __name__ == "__main__":
    asyncio.run(run_concurrency_ramp())
