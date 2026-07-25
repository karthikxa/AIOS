# AVDE — Full System Context for Claude

## What Is This?

AVDE (AI Virtual Development Environment) is a self-hosted AI agent platform with swarm orchestration, 550+ concurrent agents, 4K virtual desktop, and 82-model LLM routing.

---

## Architecture

```
Frontend (Vite + vanilla JS + React shadcn/ui) → localhost:8001
Backend (Python FastAPI + uvicorn) → localhost:8642
LLM Proxy (FreeLLMAPI on Render) → server-llm-1-0r64.onrender.com
Desktop Agent (Playwright) → localhost:4000
KasmVNC 4K (Xfce Linux) → localhost:6901
```

## What's Working

- Chat: AIAgent (82 tools) → LLM via FreeLLMAPI → SSE stream
- Swarm: 10 patterns (concurrent, sequential, hierarchical, rearrange, graph, mixture, group_chat, heavy, forest, router)
- Desktop: Playwright controls browser, MJPEG streaming, shell/file access
- Model routing: 76 models, round-robin, per-provider circuit breaker
- Rate limiting: 3000 req/min token bucket with circuit breaker

## Key Config

MAX_CONCURRENT_AGENTS=18, LAUNCH_INTERVAL=0.25s, AGENT_TIMEOUT=30s, TOKEN_BUCKET=3000/min, BURST=300, CONTAINER_LIMIT=512MB

## Key Files

server.py (3700+), swarms_tool.py (1300+), delegate_tool.py (3100+), model_router.py (132), pool.py (190), token_bucket.py (120), circuit_breaker.py (50), main.py (505), app.js (6400+)

## Production Prompt

Before making changes, list every file and line you're about to modify and why.

1. Auto-detect RAM for config (MAX_CONCURRENT_AGENTS, CONTAINER_LIMIT_MB, TOKEN_BUCKET_RATE). Set minimum viable RAM floor.
2. Desktop security: bind 4000/6901 to 127.0.0.1, use KasmVNC password auth, add CORS.
3. Graceful degradation: LLM down → "AI unavailable" error. Desktop crash → chat-only. KasmVNC dies → clear error.
4. Clean startup: validate env vars, fail fast, health check all deps.
5. Concurrency safety: verify locks on shared state, show actual lock code. Add stuck-worker timeout.
6. Dependency audit: pip-audit + npm audit. List version bumps vs patches.
7. Desktop data isolation: no telemetry, no external logging from Computer mode.

After each change, run tests and confirm clean startup. If no test suite exists, say so.
