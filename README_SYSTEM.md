# AVDE — AI Virtual Development Environment

## What Is This?

Full-stack AI agent platform with swarm orchestration, 550+ concurrent agents, 4K virtual desktop, and 82-model LLM routing. Runs locally or on Render.

---

## Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/karthikxa/AIOS.git
cd AIOS

# 2. Install backend dependencies
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -e ".[google]"

# 3. Start backend (port 8642)
python server.py

# 4. Start frontend (port 8001)
cd ../frontend
npm install
npm run dev

# 5. Start desktop agent (port 4000)
cd ../desktop-agent/agent
pip install -r requirements.txt
playwright install chromium
uvicorn main:app --host 0.0.0.0 --port 4000

# 6. Start KasmVNC desktop (port 6901)
docker run -d --name zed-desktop-4k -p 6901:6901 -e PW=desktop -e DISPLAY_WIDTH=3840 -e DISPLAY_HEIGHT=2160 --shm-size=2g accetto/ubuntu-vnc-xfce-g3:latest
```

Open http://localhost:8001

---

## RAM Requirements

| Component | RAM |
|-----------|-----|
| Windows OS | 800 MB |
| Python backend (FastAPI) | 150 MB |
| Vite frontend | 120 MB |
| Playwright Chromium | 250 MB |
| Desktop agent | 80 MB |
| KasmVNC Docker | 250 MB |
| **Per agent** | **15 MB each** |

| Scenario | Total RAM |
|----------|-----------|
| Idle (services only) | 1.5 GB |
| 50 agents | 2.1 GB |
| 250 agents | 5.1 GB |
| 550 agents + 4K desktop | **5.1 GB** (optimized) |
| Render free tier (512MB) | Not enough — use paid |

---

## Architecture

```
Frontend (Vercel / localhost:8001)
    ↓ WebSocket
Backend (Render / localhost:8642)
    ↓ AIAgent with 82 tools
LLM Proxy (Render: server-llm-1-0r64.onrender.com)
    ↓ Routes to 76 models
FreeLLMAPI (Pollinations, Kilo, LLM7, OVH)

Desktop Mode:
Frontend → KasmVNC (port 6901) → 4K Linux desktop
Agent → Desktop Agent (port 4000) → Playwright → Controls browser
```

---

## File Structure

```
AVDE/
├── backend/                    # Python FastAPI server
│   ├── server.py               # Main server (3700+ lines)
│   ├── agent_runner/           # 550-agent runner package
│   │   ├── config.py           # Concurrency, timeout settings
│   │   ├── pool.py             # Queue-based worker pool
│   │   ├── model_router.py     # Fetches 76 models, distributes agents
│   │   ├── shared_client.py    # Singleton httpx client
│   │   ├── verify.py           # Post-batch validation
│   │   ├── measure.py          # Phase 1 load testing
│   │   └── phase1a.py          # Per-model vs per-account test
│   ├── tools/                  # 82 agent tools (swarm, web, browser, etc.)
│   ├── agent/                  # Core agent (AIAgent, memory, context)
│   └── zed_cli/                # Config, CLI, plugins
├── frontend/                   # Vanilla JS + React dashboard
│   ├── app.js                  # Main app logic (6400+ lines)
│   ├── index.html              # Single-page app
│   ├── styles.css              # Global styles (11000+ lines)
│   ├── js/                     # Page modules (agent, schedule, plugin, model)
│   └── src/components/ui/      # 64 shadcn/ui components
├── desktop-agent/              # Desktop agent system
│   ├── agent/main.py           # Playwright-based desktop controller (port 4000)
│   ├── frontend/index.html     # Standalone desktop agent UI
│   └── docker-compose.yml      # Docker setup
├── llm/                        # LLM proxies
│   ├── litellm/                # BerriAI LiteLLM (Python)
│   ├── llm-proxy/              # FreeLLMAPI (Node.js)
│   └── omni/                   # OmniRoute (Next.js)
└── browser-server-1/2          # Render services (KasmVNC + Agent API)
```

---

## Computer Access

### Local (Windows)
- Desktop agent runs Playwright headless Chromium
- Full OS control: mouse, keyboard, shell, files, browser
- Stream via MJPEG at port 4000

### Render (4K Linux)
- KasmVNC Docker container with Xfce desktop
- 3840x2160 resolution, Chromium browser
- Live stream via noVNC at port 6901
- Agent controls via Playwright at port 4000

---

## Agent System

### 550+ Agents
- 76 chat models available via FreeLLMAPI
- Model router distributes agents round-robin: `ceil(550 / 76) = 7.2 agents/model`
- Stagger: 0.25s between launches, 18 concurrent max
- Total launch time: ~2.3 minutes for 550 agents

### Swarm Patterns (10)
1. `concurrent_swarm` — parallel on same task
2. `sequential_swarm` — pipeline chain
3. `hierarchical_swarm` — director + workers
4. `agent_rearrange_swarm` — custom DSL flow
5. `graph_swarm` — DAG fan-out/fan-in
6. `mixture_of_agents_swarm` — experts + aggregator
7. `group_chat_swarm` — conversational turns
8. `heavy_swarm` — 5-phase deep research
9. `forest_swarm` — parallel groups merged
10. `swarm_router` — auto-selects best pattern

---

## Security

- API keys removed from source code (loaded from env)
- Auth middleware on dangerous endpoints (file I/O, tool exec, env vars, git)
- CORS restricted to specific origins
- XSS sanitized (escapeHtml on all innerHTML)
- Race conditions fixed (threading.Lock on shared state)
- Memory capped (ActionLogger max 500 entries)

---

## Deploy to Render

### Backend
- Source: `https://github.com/karthikxa/AIOS`
- Root Directory: `backend`
- Dockerfile: `Dockerfile`
- Env: `ZED_PRO_API_KEY`, `ZED_HOME=/tmp/.zed`

### LLM Proxy
- Source: `https://github.com/karthikxa/AIOS`
- Root Directory: `llm/llm-proxy`
- Dockerfile: `Dockerfile`
- Env: `ENCRYPTION_KEY`, `PORT=3001`

### Desktop Agent
- Source: `https://github.com/karthikxa/AIOS`
- Root Directory: `desktop-agent/agent`
- Dockerfile: `Dockerfile`
- Env: `LLM_API_KEY`, `LLM_BASE_URL`, `PORT=4000`

### Frontend
- Auto-deploys from Vercel (master branch)
- `vercel.json` rewrites `/api/*` to backend
