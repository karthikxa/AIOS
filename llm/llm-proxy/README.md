# AVDE LLM Proxy (FreeLLMAPI)

Local OpenAI-compatible proxy powered by [FreeLLMAPI](https://freellmapi.co) — gives the entire team access to **~1.7 billion free tokens per month** with no API keys.

## Quick Start (after cloning)

```bash
cd llm/llm-proxy
node setup.mjs        # generates .env with encryption key, installs deps
start-server.bat      # Windows: starts the server on http://localhost:3001
# or
npm run dev -w server # cross-platform
```

## What this does

| Port | Purpose |
|------|---------|
| `3001` | Main LLM proxy — OpenAI-compatible `/v1/chat/completions` |
| `3002` | No-auth loopback port (backend calls here — no API key needed) |

## Architecture

```
Browser (port 8000)
  └── Vite proxy /v1/* ──► backend/server.py (port 8642)
                                └── FreeLLMAPI (port 3001/3002)
                                        └── Free providers:
                                            pollinations | kilo | llm7 | ovh
```

## Free Token Pool

- **~1.7B tokens/month** shared across all teammates
- **No API keys required** — providers give free access
- Models: Gemini 2.5 Flash Lite, Claude, LLaMA, Mistral, and more
- Automatically load-balances and falls back across providers

## Teammate Onboarding

1. Clone the repo: `git clone https://github.com/karthikxa/AIOS.git`
2. Run setup: `cd llm/llm-proxy && node setup.mjs`
3. Start proxy: `start-server.bat` (Windows) or `npm run dev -w server`
4. Start backend: `cd backend && python server.py`
5. Start frontend: `cd frontend && npm run dev`

> **Note**: The `.env` file is gitignored (contains your encryption key). `setup.mjs` auto-generates it.  
> The SQLite database (`server/data/`) is also gitignored but auto-created on first run.  
> Each team member gets their own local database — token usage is tracked per-instance.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ENCRYPTION_KEY not set` | Run `node setup.mjs` to create `.env` |
| Port 3001 in use | Change `PORT=3001` in `.env` and update `backend/server.py:FREELLMAPI_URL` |
| `Cannot connect to LLM` | Make sure `start-server.bat` is running before starting the backend |
| `LLM error: 500` | Check `server.log` in this folder for details |
