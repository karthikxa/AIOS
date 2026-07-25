# AVDE-Hermes Unified Architecture — Complete Documentation

## Executive Summary

AVDE is a **unified AI assistant platform** that combines:
- **Hermes** (Nous Research v0.18.2) — The agent core with 94 tools, 24 skills, 5 databases
- **AVDE Dashboard** — A ChatGPT-style web UI with React + vanilla JS frontend

**Key Achievement**: All data (sessions, skills, plugins, memory, config) flows through a single source of truth: `C:\Users\balur\.hermes\`

---

## 1. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        UNIFIED ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  FRONTEND (Port 8001) — React + Vanilla JS Dashboard                │    │
│  │  ├── Chat Mode: LLM conversation with tool calling                 │    │
│  │  ├── Agent Mode: Multi-agent orchestration (swarm)                 │    │
│  │  ├── Computer Mode: Browser automation + desktop control           │    │
│  │  ├── Plugins Menu: Google, Feishu, Yuanbao, MCP integrations      │    │
│  │  ├── Schedules Menu: Cron jobs + Kanban board                      │    │
│  │  ├── Models Menu: Provider connections + model selection           │    │
│  │  └── Skills Menu: Skill catalog + management                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  VITE PROXY (Port 8001) → Routes to Backend                        │    │
│  │  ├── /api/* → localhost:8642 (Backend)                             │    │
│  │  ├── /v1/* → localhost:8642 (Backend)                              │    │
│  │  ├── /oauth/* → localhost:8642 (Backend)                           │    │
│  │  ├── /kasm/* → localhost:6901 (KasmVNC)                            │    │
│  │  └── /agent/* → localhost:8765 (Desktop Agent)                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  BACKEND (Port 8642) — FastAPI + AIAgent Core                      │    │
│  │  ├── server.py: API endpoints, route_query(), tool routing         │    │
│  │  ├── run_agent.py: AIAgent class (conversation loop)               │    │
│  │  ├── model_tools.py: Tool discovery, registration, execution       │    │
│  │  ├── toolsets.py: 77 toolsets, 107+ tools defined                 │    │
│  │  └── ZED_HOME = C:\Users\balur\.hermes (unified data)              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  HERMES HOME (C:\Users\balur\.hermes\) — Single Source of Truth     │    │
│  │  ├── config.yaml: Main configuration (10KB)                        │    │
│  │  ├── auth.json: Provider OAuth tokens (3.7KB)                      │    │
│  │  ├── .env: API keys and credentials (25KB)                         │    │
│  │  ├── SOUL.md: Agent identity (now says "Zed")                      │    │
│  │  ├── AGENTS.md: Agent rules and behavior                           │    │
│  │  ├── sessions.db: Chat sessions (4MB, 137 sessions)               │    │
│  │  ├── state.db: Full agent state (5MB, 454 messages)               │    │
│  │  ├── kanban.db: Multi-agent task board (100KB)                     │    │
│  │  ├── memory.db: Long-term memory (12KB)                            │    │
│  │  ├── connections.db: OAuth connections (28KB, 2 connections)        │    │
│  │  ├── skills/: 24 skills                                            │    │
│  │  └── plugins/: Active plugins                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  LLM PROXY (Render Cloud) — server-llm-1-0r64.onrender.com         │    │
│  │  ├── Only cloud service                                            │    │
│  │  ├── Routes to multiple LLM providers                              │    │
│  │  ├── API Key: freellmapi-b8b35f76...                               │    │
│  │  └── Keepalive: GET /api/ping every 10 min                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  KasmVNC (Port 6901) — 4K Linux Desktop                            │    │
│  │  ├── Container: accetto/ubuntu-vnc-xfce-g3                         │    │
│  │  ├── Resolution: 3840x2160 (4K)                                    │    │
│  │  ├── Password: headless                                            │    │
│  │  └── CUA agent drives it                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. WHAT AVDE HAS (Dashboard Features)

### 2.1 Frontend Pages

| Page | Port | Description |
|------|------|-------------|
| **Home** | 8001 | Chat interface with mode selector (Agent/Computer) |
| **Agent** | 8001/#agent | Agent management, create/edit/run agents |
| **Models** | 8001/#models | Provider connections (13 providers), model selection |
| **Plugins** | 8001/#plugins | Google, Feishu, Yuanbao, MCP integrations |
| **Schedules** | 8001/#scheduled | Cron jobs, kanban board, task scheduling |
| **Computer** | 8001 (split pane) | KasmVNC 4K desktop, browser automation |

### 2.2 Frontend Capabilities

- **Chat Mode**: LLM conversation with streaming responses
- **Agent Mode**: Multi-agent orchestration with swarm patterns
- **Computer Mode**: Browser automation with live desktop stream
- **File Upload**: 5MB limit, text/image files
- **Slash Commands**: `/agent`, `/computer`, `/memory`, `/skills`, etc.
- **@ Mentions**: Gmail, Drive, Calendar integration
- **Tool Indicators**: Real-time tool execution status

### 2.3 Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Main chat endpoint with streaming |
| `/api/tools` | GET | List all 91+ tools |
| `/api/skills` | GET | List all 24 skills |
| `/api/sessions` | GET | List chat sessions |
| `/api/sessions/{id}` | GET | Get session details |
| `/api/plugins/status` | GET | Plugin connection status |
| `/api/credentials/status` | GET | API key status (masked) |
| `/api/soul` | GET/PUT | Read/update SOUL.md |
| `/api/config` | GET | Configuration |
| `/api/cron/*` | * | Cron job management |
| `/api/agents/*` | * | Agent CRUD + run |
| `/v1/chat/completions` | POST | OpenAI-compatible endpoint |

---

## 3. WHAT HERMES HAS (Agent Core)

### 3.1 Tools (94 total)

#### Browser Tools (12)
```
browser_navigate, browser_snapshot, browser_click, browser_type,
browser_scroll, browser_back, browser_press, browser_get_images,
browser_vision, browser_console, browser_cdp, browser_dialog
```

#### File Tools (4)
```
read_file, write_file, patch, search_files
```

#### Terminal Tools (4)
```
terminal, process, read_terminal, close_terminal
```

#### Code Execution (1)
```
execute_code
```

#### Vision/Image (2)
```
vision_analyze, image_generate
```

#### Web Tools (2)
```
web_search, web_extract
```

#### Video Tools (4)
```
video_analyze, video_generate, xai_video_edit, xai_video_extend
```

#### TTS/Voice (3)
```
text_to_speech, transcription_tools, voice_mode
```

#### Memory/Session (2)
```
memory, session_search
```

#### Todo (1)
```
todo
```

#### Clarify (1)
```
clarify
```

#### Skills (3)
```
skills_list, skill_view, skill_manage
```

#### Delegation (1)
```
delegate_task
```

#### Swarm (10)
```
concurrent_swarm, sequential_swarm, hierarchical_swarm,
agent_rearrange_swarm, graph_swarm, mixture_of_agents_swarm,
group_chat_swarm, heavy_swarm, forest_swarm, swarm_router
```

#### Mixture of Agents (1)
```
mixture_of_agents
```

#### Cronjob (1)
```
cronjob
```

#### Kanban (9)
```
kanban_show, kanban_list, kanban_complete, kanban_block,
kanban_heartbeat, kanban_comment, kanban_create, kanban_unblock, kanban_link
```

#### Computer Use (1)
```
computer_use
```

#### Home Assistant (4)
```
ha_list_entities, ha_get_state, ha_list_services, ha_call_service
```

#### Discord (2)
```
discord, discord_admin
```

#### Google Workspace (47)
```
gmail_list, gmail_read, gmail_send,
drive_list, drive_search, drive_read,
calendar_list_events, calendar_create_event, calendar_update_event, calendar_delete_event,
tasks_list, tasks_create, tasks_update, tasks_delete,
contacts_list, contacts_create, contacts_update, contacts_delete,
photos_list_albums, photos_list_media, photos_create_album,
youtube_search, youtube_video_details, youtube_rate_video, youtube_add_comment,
docs_list, docs_read, docs_create, docs_update, docs_delete,
sheets_list, sheets_read, sheets_create, sheets_update, sheets_clear,
slides_list, slides_read, slides_create, slides_delete,
chat_list_spaces, chat_send_message, chat_delete_message,
meet_create,
fit_list_data_sources, fit_get_dataset,
classroom_list_courses, classroom_list_assignments, classroom_list_students
```

#### Feishu (5)
```
feishu_doc_read,
feishu_drive_list_comments, feishu_drive_list_comment_replies,
feishu_drive_reply_comment, feishu_drive_add_comment
```

#### Yuanbao (5)
```
yb_query_group_info, yb_query_group_members,
yb_send_dm, yb_search_sticker, yb_send_sticker
```

#### Project (3)
```
project_list, project_create, project_switch
```

#### MCP (dynamic)
```
mcp_tool, mcp_oauth, mcp_oauth_manager, mcp_stdio_watchdog
```

#### Security (7)
```
approval, write_approval, url_safety, website_policy,
threat_patterns, tirith_security, path_security
```

#### Skill Management (7)
```
skill_manager, skill_provenance, skill_usage,
skills_ast_audit, skills_guard, skills_hub, skills_sync
```

#### Blueprints (1)
```
blueprints
```

#### X Search (1)
```
x_search
```

### 3.2 Skills (24)

```
apple, autonomous-ai-agents, creative, data-science, devops,
diagramming, dogfood, domain, email, gaming, gifs, github,
inference-sh, mcp, media, mlops, note-taking, productivity,
red-teaming, research, smart-home, social-media,
software-development, yuanbao
```

### 3.3 Databases (5)

| Database | Size | Tables | Purpose |
|----------|------|--------|---------|
| sessions.db | 4MB | 19 | Chat sessions and message history |
| state.db | 5MB | 17 | Full agent state (sessions, messages, FTS5) |
| kanban.db | 100KB | Multi-agent task board |
| memory.db | 12KB | Long-term memory store |
| connections.db | 28KB | OAuth connections (Gmail, Google) |

### 3.4 Config Files (6)

| File | Size | Purpose |
|------|------|---------|
| config.yaml | 10KB | Main configuration |
| .env | 25KB | API keys and credentials |
| auth.json | 3.7KB | Provider OAuth tokens |
| SOUL.md | 494B | Agent identity (now "Zed") |
| AGENTS.md | 461B | Agent rules and behavior |
| sessions.db | 4MB | Session data |

---

## 4. HOW EVERYTHING IS WIRED

### 4.1 Data Flow

```
User types message in frontend
    │
    ▼
Frontend sends POST /api/chat with dashboard_state
    │
    ▼
server.py receives request
    │
    ├── 1. Extract user_msg from messages
    ├── 2. route_query(user_msg) → selected_toolsets (keyword heuristic)
    │       Always includes: _CORE_AGENT_TOOLS + _SWARM_ROUTE
    │       Adds: query-specific toolsets based on keywords
    │
    ├── 3. AIAgent(enabled_toolsets=selected_toolsets)
    │       │
    │       ├── 4. get_tool_definitions(enabled_toolsets, disabled_toolsets)
    │       │       │
    │       │       ├── resolve_toolset(name) → expands includes
    │       │       ├── registry.get_definitions(tools_to_include)
    │       │       │   (filters by check_fn: env vars, OAuth tokens)
    │       │       ├── Truncate descriptions (60 chars)
    │       │       └── Schema sanitization
    │       │       │
    │       │   Returns: List[OpenAI-format tool schemas]
    │       │
    │       └── 5. agent.tools = [filtered tool schemas]
    │
    └── 6. Agent loop:
            ├── LLM call with tools=agent.tools
            ├── If tool_calls: handle_function_call()
            │       → registry.dispatch() → tool handler executes
            ├── Result returned to LLM
            └── Repeat until text response (max 90 iterations)
```

### 4.2 Tool Routing (route_query)

```python
# Example routing:

"send email to john@example.com"
  → detects "email" → enables gmail tools
  → core + gmail

"research AI papers"
  → detects "research" → enables web + session_search
  → core + web + session_search

"create a schedule"
  → detects "schedule" → enables cronjob
  → core + cronjob

"automate web form"
  → detects "automate" → enables computer_use + browser + vision + terminal + file
  → core + computer_use + browser + vision + terminal + file

"control smart home lights"
  → detects "smart home" → enables homeassistant
  → core + homeassistant

"generate an image"
  → detects "generate image" → enables vision
  → core + vision

"analyze this data"
  → detects "analyze" → enables code_execution + terminal + file
  → core + code_execution + terminal + file

"debug this code"
  → detects "debug" → enables terminal + file + browser
  → core + terminal + file + browser

"delegate task to subagent"
  → detects "delegate" → enables delegation + swarm + terminal + file + web + browser
  → core + delegation + swarm + terminal + file + web + browser
```

### 4.3 Core Tools (Always Included)

Every query gets these 9 toolsets:
```python
_CORE_AGENT_TOOLS = [
    "delegation",       # Spawn sub-agents
    "clarify",          # Ask user questions
    "memory",           # Persistent memory
    "todo",             # Task tracking
    "session_search",   # Search past conversations
    "skills",           # Skill access
    "approval",         # Tool approval (NEW)
    "checkpoint",       # Filesystem snapshots (NEW)
    "budget_config",    # Budget management (NEW)
]

_SWARM_ROUTE = ["swarm"]  # Always included for autonomous multi-agent
```

### 4.4 Mode-Specific Tool Access

| Mode | Tools Available |
|------|-----------------|
| **Chat** | 56 tools (core + dynamic based on query) |
| **Plugins** | 32 tools (skills, Google, Feishu, Yuanbao, MCP, HA, Discord) |
| **Schedules** | 45 tools (cron, kanban, Google, HA, Discord, security) |
| **Agents** | 75 tools (almost all - excludes infrastructure/backend) |
| **Computer** | 45 tools (browser, vision, terminal, file, computer_use) |

---

## 5. KEY FILES AND THEIR ROLES

### Backend Files

| File | Lines | Purpose |
|------|-------|---------|
| `server.py` | 3200+ | API endpoints, route_query(), tool routing, AIAgent init |
| `run_agent.py` | 5500+ | AIAgent class, conversation loop, tool execution |
| `model_tools.py` | 1400+ | Tool discovery, registration, get_tool_definitions() |
| `toolsets.py` | 1100+ | 77 toolsets, 107+ tool definitions |
| `agent/system_prompt.py` | 530+ | System prompt assembly (SOUL + context + memory) |
| `agent/agent_init.py` | — | Agent initialization, tool loading |

### Frontend Files

| File | Lines | Purpose |
|------|-------|---------|
| `app.js` | 6400+ | Main orchestrator, chat, tool display, computer mode |
| `js/chatbox.js` | 85+ | Slash commands, @ mentions |
| `js/agent-page.js` | 470+ | Agent CRUD, skill display |
| `js/plugins-page.js` | 900+ | Plugin connection, OAuth |
| `js/schedules-page.js` | 650+ | Schedule CRUD, cron endpoints |
| `js/create-agent-page.js` | 300+ | Agent creation, skill selection |
| `js/edit-agent-page.js` | 880+ | Agent editing, skill toggle |
| `js/skills-catalog.js` | 200+ | Skill catalog with tools |

---

## 6. HOW TO SET UP FINE

### 6.1 Environment Variables

```bash
# Backend .env
ZED_HOME=C:\Users\balur\.hermes
ZED_PRO_BASE_URL=https://server-llm-1-0r64.onrender.com/v1
ZED_PRO_API_KEY=freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac
DESKTOP_AGENT_URL=http://localhost:8765
BROWSER_SERVER_URL=http://localhost:3000
```

### 6.2 Vite Proxy Config

```javascript
// frontend/vite.config.js
server: {
  port: 8001,
  proxy: {
    '/v1': { target: 'http://127.0.0.1:8642' },
    '/api': { target: 'http://127.0.0.1:8642' },
    '/oauth': { target: 'http://127.0.0.1:8642' },
    '/kasm': { target: 'http://127.0.0.1:6901', ws: true },
  }
}
```

### 6.3 Startup Commands

```bash
# 1. Start Backend
cd C:\Users\balur\Downloads\AVDE\backend
$env:ZED_HOME="C:\Users\balur\.hermes"
python -m uvicorn server:app --host 0.0.0.0 --port 8642 --reload

# 2. Start Frontend
cd C:\Users\balur\Downloads\AVDE\frontend
npm run dev

# 3. Start KasmVNC (Docker)
docker start zed-desktop-4k
```

### 6.4 Verification Checklist

- [ ] Backend health: `GET /health` → 200
- [ ] Tools loaded: `GET /api/tools` → 91+ tools
- [ ] Skills loaded: `GET /api/skills` → 5+ skills
- [ ] SOUL.md loaded: `GET /api/soul` → "You are Zed..."
- [ ] Plugins status: `GET /api/plugins/status` → real connections
- [ ] Credentials: `GET /api/credentials/status` → boolean status
- [ ] Frontend accessible: `http://localhost:8001`
- [ ] KasmVNC accessible: `http://localhost:6901`

---

## 7. TROUBLESHOOTING

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| 503 from backend | Render suspended | Backend is local now, not Render |
| 429 from LLM | Rate limiting | Expected, LLM is on Render |
| Tools not loading | ZED_HOME not set | Set `ZED_HOME=C:\Users\balur\.hermes` |
| Skills not showing | Wrong directory | Check `~/.hermes/skills/` |
| VNC black screen | Password mismatch | Use `password=headless` |
| CSP violation | Missing domain | Added `*.onrender.com` to CSP |

### Debug Commands

```bash
# Check backend logs
Get-Content "C:\Users\balur\Downloads\AVDE\backend\backend.log" -Tail 50

# Check tools
curl http://localhost:8642/api/tools | jq '.count'

# Check skills
curl http://localhost:8642/api/skills | jq '.count'

# Check route_query
python -c "from server import route_query; print(route_query('send email'))"
```

---

## 8. SUMMARY

### What's Wired

| Component | Status | Details |
|-----------|--------|---------|
| **SOUL.md** | ✅ Wired | Loaded from ~/.hermes, says "Zed" |
| **auth.json** | ✅ Wired | OAuth tokens for Google, etc. |
| **connections.db** | ✅ Wired | `/api/plugins/status` endpoint |
| **.env** | ✅ Wired | `/api/credentials/status` endpoint |
| **sessions.db** | ✅ Wired | Chat sessions via backend |
| **state.db** | ✅ Wired | Full agent state |
| **kanban.db** | ✅ Wired | Schedules menu |
| **memory.db** | ✅ Wired | Long-term memory |
| **skills/** | ✅ Wired | 24 skills loaded |
| **plugins/** | ✅ Wired | Plugin status endpoints |
| **94 tools** | ✅ Wired | All routed via route_query() |
| **77 toolsets** | ✅ Wired | All defined in toolsets.py |

### RAM Usage

| Service | RAM |
|---------|-----|
| Frontend (Vite) | ~545 MB |
| Backend (Python) | ~314 MB |
| KasmVNC 4K | ~256 MB |
| **Total** | **~1,115 MB** |

---

*Documentation generated for AVDE-Hermes unified system.*
*Last updated: 2026-07-23*
