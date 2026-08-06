"""Phase 1A: Test if rate limits are per-model or per-account.

Run Model A until 429, then immediately hit Model B. If B also gets 429 → per-account.
If B works → per-model. Repeat 2-3 times for reliability.
"""

import asyncio
import json
import os
import time
import logging
import httpx

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

LLM_BASE = os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1")
LLM_KEY = os.getenv("ZED_PRO_API_KEY", "")
MODEL_A = "gemini-3.5-flash"
MODEL_B = "deepseek-v4-flash"


async def call_model(client, model, label):
    """Make one LLM call. Returns (status_code, headers, elapsed)."""
    t0 = time.monotonic()
    try:
        resp = await client.post(
            f"{LLM_BASE}/chat/completions",
            headers={"Authorization": f"Bearer {LLM_KEY}", "Content-Type": "application/json"},
            json={"model": model, "messages": [{"role": "user", "content": "hi"}], "max_tokens": 5},
            timeout=15,
        )
        elapsed = time.monotonic() - t0
        return resp.status_code, dict(resp.headers), elapsed
    except Exception as e:
        elapsed = time.monotonic() - t0
        return 0, {"error": str(e)[:100]}, elapsed


async def run_test(client, run_num):
    """Run one test iteration: exhaust Model A, then immediately hit Model B."""
    print(f"\n--- Run {run_num} ---")

    # Step 1: Hammer Model A until 429
    print(f"  Exhausting {MODEL_A}...")
    a_429_time = None
    for i in range(50):
        status, headers, elapsed = await call_model(client, MODEL_A, "A")
        remaining = headers.get("x-ratelimit-remaining", "?")
        if status == 429:
            a_429_time = time.monotonic()
            print(f"  {MODEL_A} got 429 after {i+1} calls (remaining: {remaining}, elapsed: {elapsed:.1f}s)")
            break
        elif status == 200:
            pass  # success
        else:
            print(f"  {MODEL_A} returned {status} on call {i+1}")

    if a_429_time is None:
        print(f"  {MODEL_A} never hit 429 after 50 calls — rate limit is high")
        return "inconclusive"

    # Step 2: IMMEDIATELY hit Model B (no delay)
    print(f"  Immediately testing {MODEL_B}...")
    status_b, headers_b, elapsed_b = await call_model(client, MODEL_B, "B")
    remaining_b = headers_b.get("x-ratelimit-remaining", "?")

    if status_b == 429:
        print(f"  {MODEL_B} also got 429 (remaining: {remaining_b}) → LIMIT IS PER-ACCOUNT")
        return "per_account"
    elif status_b == 200:
        print(f"  {MODEL_B} returned 200 (remaining: {remaining_b}) → LIMIT IS PER-MODEL")
        return "per_model"
    else:
        print(f"  {MODEL_B} returned {status_b}")
        return "inconclusive"


async def run_experiment():
    client = httpx.AsyncClient(timeout=30)
    print("=" * 60)
    print("Phase 1A: Per-Model vs Per-Account Rate Limit Test")
    print(f"Model A: {MODEL_A}")
    print(f"Model B: {MODEL_B}")
    print(f"API Key: {LLM_KEY[:20]}...")
    print("=" * 60)

    results = []
    for run_num in range(1, 4):
        result = await run_test(client, run_num)
        results.append(result)
        await asyncio.sleep(5)  # Brief cooldown between runs

    await client.aclose()

    print("\n" + "=" * 60)
    print("PHASE 1A RESULTS")
    print("=" * 60)
    print(f"Runs: {results}")
    per_model_count = results.count("per_model")
    per_account_count = results.count("per_account")

    if per_account_count >= 2:
        print("\nCONCLUSION: Rate limit is PER-ACCOUNT")
        print("Round-robin across models will NOT help")
        print("RECOMMENDATION: Use multiple API keys instead")
        return "per_account"
    elif per_model_count >= 2:
        print("\nCONCLUSION: Rate limit is PER-MODEL")
        print("Round-robin across 82 models WILL help")
        print("RECOMMENDATION: Build model_router.py")
        return "per_model"
    else:
        print("\nCONCLUSION: Inconclusive — need more testing")
        return "inconclusive"


if __name__ == "__main__":
    asyncio.run(run_experiment())
