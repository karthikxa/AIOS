"""
Zed Pro Dashboard Server
========================
FastAPI bridge connecting the Zed Pro frontend (localhost:8000) to
the zed-agent's full capabilities — rebranded as Zed Pro.

Architecture:
  Browser → localhost:8000 (Dashboard Vite) → /v1/* → localhost:3001 (freellmapi no-auth)
                                             → /api/* → localhost:8642 (this server)

This server:
  - Proxies /v1/chat/completions to freellmapi (port 3001) with SSE streaming
  - Exposes all agent management APIs (sessions, skills, tools, cron, memory)
  - Loads config from C:\\Users\\balur\\.hermes\\config.yaml (Zed Home)
  - All sessions/memories/skills saved to C:\\Users\\balur\\.hermes\\
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import sys
import threading
import time
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Dict, List, Optional

# ── Resolve zed-agent module path ──────────────────────────────────────────
_AGENT_DIR = Path(__file__).resolve().parent
if str(_AGENT_DIR) not in sys.path:
    sys.path.insert(0, str(_AGENT_DIR))

import httpx
import uvicorn
from fastapi import FastAPI, HTTPException, Query, WebSocket, WebSocketDisconnect, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

# ── Zed Home = C:\Users\<user>\.hermes (all sessions, config, memories) ────
# CRITICAL: Must set ZED_HOME env var BEFORE importing cron modules,
# because cron/jobs.py resolves get_zed_home() at import time.
_DEFAULT_ZED_HOME = Path.home() / ".hermes"
_raw_zed_home = os.environ.get("ZED_HOME", str(_DEFAULT_ZED_HOME)).strip()
ZED_HOME = Path(_raw_zed_home)
os.environ["ZED_HOME"] = str(ZED_HOME)

try:
    from zed_constants import get_zed_home
except Exception:
    get_zed_home = lambda: ZED_HOME

try:
    from zed_logging import setup_logging
except Exception:
    setup_logging = lambda **kw: None

# Self-contained cron daemon — no dependency on cron.scheduler.tick
# (which requires resolve_runtime_provider and full zed-agent setup)
HAS_CRON_SCHEDULER = True  # always available — we use httpx directly

# Optional cron.jobs module — for properly-formatted job creation
# that the tick() scheduler can actually execute
try:
    from cron.jobs import (
        create_job as _cron_create_job,
        load_jobs as _cron_load_jobs,
        remove_job as _cron_remove_job,
        parse_schedule as _cron_parse_schedule,
    )
    HAS_CRON_JOBS = True
except Exception:
    _cron_create_job = None
    _cron_load_jobs = None
    _cron_remove_job = None
    _cron_parse_schedule = None
    HAS_CRON_JOBS = False

_log_dir = ZED_HOME / "logs"
try:
    _log_dir.mkdir(parents=True, exist_ok=True)
except OSError as _e:
    # Fallback: use a logs dir beside this server.py file
    import warnings
    warnings.warn(f"Could not create log dir {_log_dir}: {_e}. Using local logs/")
    _log_dir = Path(__file__).resolve().parent / "logs"
    _log_dir.mkdir(parents=True, exist_ok=True)
    ZED_HOME = _log_dir.parent
try:
    setup_logging(zed_home=ZED_HOME, log_level="INFO")
except Exception:
    pass

logger = logging.getLogger("zed.server")

# ── Enable tools that gate on session-mode env vars ───────────────────────
# These defaults unlock cronjob + kanban-style tools so the dashboard gets the
# full Hermes toolset without requiring a gateway / interactive-CLI session.
# Individual tools still self-disable via check_fn when their real deps are
# missing (playwright binaries, API keys, etc.) -- we only flip the session-
# mode flags that have no other meaning here.
os.environ.setdefault("ZED_INTERACTIVE", "1")        # unlocks cronjob
os.environ.setdefault("ZED_GATEWAY_SESSION", "1")    # unlocks cronjob alt path

# ── Load .env from ZED_HOME and server directory ──────────────────────────
try:
    from dotenv import load_dotenv
    _env_zed_home = ZED_HOME / ".env"
    _env_server_dir = Path(__file__).resolve().parent / ".env"
    if _env_zed_home.exists():
        load_dotenv(_env_zed_home)
    if _env_server_dir.exists():
        load_dotenv(_env_server_dir)
except ImportError:
    pass

from run_agent import AIAgent
from zed_state import SessionDB
from model_tools import get_tool_definitions, get_toolset_for_tool
from zed_cli.plugins import discover_plugins, get_plugin_manager
from tools.registry import discover_builtin_tools

# ── Config ──────────────────────────────────────────────────────────────────
HOST = "0.0.0.0"
PORT = 8642  # Vite proxies /v1/* and /api/* to this port

# Upstream proxy endpoint configurations
FREELLMAPI_URL = os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1").rstrip("/") + "/chat/completions"

# Tell zed-agent's provider router to call freellmapi directly
if "ZED_PRO_BASE_URL" not in os.environ:
    os.environ["ZED_PRO_BASE_URL"] = "https://server-llm-1.onrender.com/v1"
if "ZED_PRO_API_KEY" not in os.environ:
    os.environ["ZED_PRO_API_KEY"] = "freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac"

# ── Dynamic Tool Router ──────────────────────────────────────────────────────
# Maps query intent keywords to enabled toolsets. Router call: ~50 tokens.
TOOL_ROUTES = {
    "file": ["file"],
    "terminal": ["terminal", "code_execution"],
    "code": ["code_execution", "terminal", "file"],
    "browser": ["browser", "web", "vision"],
    "web": ["web", "browser"],
    "search": ["web", "session_search"],
    "email": ["gmail"],
    "gmail": ["gmail"],
    "drive": ["drive"],
    "calendar": ["calendar"],
    "tasks": ["tasks"],
    "contacts": ["contacts"],
    "photos": ["photos"],
    "youtube": ["youtube"],
    "docs": ["docs"],
    "sheets": ["sheets"],
    "slides": ["slides"],
    "chat": ["chat"],
    "meet": ["meet"],
    "fit": ["fit"],
    "classroom": ["classroom"],
    "delegate": ["delegation", "swarm"],
    "swarm": ["swarm", "delegation", "web", "file", "terminal", "browser", "search", "code_execution"],
    "memory": ["memory", "session_search"],
    "skill": ["skills"],
    "cron": ["cronjob"],
    "todo": ["todo"],
    "vision": ["vision"],
    "image": ["image_gen"],
    "video": ["video"],
    "music": ["video", "web"],
}

ROUTER_PROMPT = """You are a tool router. Given a user query, output the single most relevant category.
Categories: file, terminal, code, browser, web, search, gmail, drive, calendar, tasks, contacts, photos, youtube, docs, sheets, slides, chat, meet, fit, classroom, delegate, swarm, memory, skill, cron, todo, vision, image, video, music, general
Reply with ONLY the category name, nothing else.

Query: {query}"""


_SWARM_ROUTE = ["swarm"]


def route_query(query: str) -> list:
    """Route a query to the matching toolsets. Uses keyword heuristic (0 tokens), falls back to LLM."""
    q = query.lower()
    # Quick keyword check first. ALWAYS include swarm so the agent can
    # autonomously decide when multi-agent orchestration helps — like Kimi.
    if any(w in q for w in ["email", "inbox", "send mail", "compose"]):
        return TOOL_ROUTES["email"] + _SWARM_ROUTE
    if any(w in q for w in ["gmail", "google mail", "read mail"]):
        return TOOL_ROUTES["gmail"] + _SWARM_ROUTE
    if any(w in q for w in ["drive", "google drive", "file in drive"]):
        return TOOL_ROUTES["drive"] + _SWARM_ROUTE
    if any(w in q for w in ["browse", "open url", "navigate", "website", "go to"]):
        return TOOL_ROUTES["browser"] + _SWARM_ROUTE
    if any(w in q for w in ["search", "find", "look up", "google", "research"]):
        return TOOL_ROUTES["search"] + _SWARM_ROUTE
    if any(w in q for w in ["run", "execute", "bash", "terminal", "command", "shell"]):
        return TOOL_ROUTES["terminal"] + _SWARM_ROUTE
    if any(w in q for w in ["write code", "python", "javascript", "program", "script"]):
        return TOOL_ROUTES["code"] + _SWARM_ROUTE
    if any(w in q for w in ["read", "write", "create file", "edit file", "list dir"]):
        return TOOL_ROUTES["file"] + _SWARM_ROUTE
    if any(w in q for w in ["delegate", "subagent", "child"]):
        return TOOL_ROUTES["delegate"]
    if any(w in q for w in ["swarm", "concurrent", "hierarchical", "orchestrate", "multi-agent", "forest"]):
        return TOOL_ROUTES["swarm"]
    if any(w in q for w in ["remember", "memory", "recall", "find session"]):
        return TOOL_ROUTES["memory"] + _SWARM_ROUTE
    if any(w in q for w in ["skill", "install", "create skill"]):
        return TOOL_ROUTES["skill"] + _SWARM_ROUTE
    if any(w in q for w in ["schedule", "cron", "every day", "every hour", "recurring"]):
        return TOOL_ROUTES["cron"] + _SWARM_ROUTE
    if any(w in q for w in ["todo", "task list", "to-do"]):
        return TOOL_ROUTES["todo"] + _SWARM_ROUTE
    if any(w in q for w in ["see ", "view ", "image", "photo", "picture", "screenshot"]):
        return TOOL_ROUTES["vision"] + _SWARM_ROUTE
    if any(w in q for w in ["generate image", "create image", "draw", "make a picture"]):
        return TOOL_ROUTES["image"] + _SWARM_ROUTE
    if any(w in q for w in ["video", "youtube", "watch", "play video"]):
        return TOOL_ROUTES["video"] + _SWARM_ROUTE
    if any(w in q for w in ["calendar", "event", "appointment", "schedule"]):
        return TOOL_ROUTES["calendar"] + _SWARM_ROUTE
    if any(w in q for w in ["contact", "phonebook", "people", "address book"]):
        return TOOL_ROUTES["contacts"] + _SWARM_ROUTE
    if any(w in q for w in ["photo", "picture", "album"]):
        return TOOL_ROUTES["photos"] + _SWARM_ROUTE
    if any(w in q for w in ["doc", "google doc", "write doc"]):
        return TOOL_ROUTES["docs"] + _SWARM_ROUTE
    if any(w in q for w in ["sheet", "spreadsheet", "excel"]):
        return TOOL_ROUTES["sheets"] + _SWARM_ROUTE
    if any(w in q for w in ["slide", "presentation", "powerpoint"]):
        return TOOL_ROUTES["slides"] + _SWARM_ROUTE
    if any(w in q for w in ["google chat", "chat space", "chat message"]):
        return TOOL_ROUTES["chat"] + _SWARM_ROUTE
    if any(w in q for w in ["meet", "video call", "meeting", "conference"]):
        return TOOL_ROUTES["meet"] + _SWARM_ROUTE
    if any(w in q for w in ["fitness", "fit data", "health data", "step count"]):
        return TOOL_ROUTES["fit"] + _SWARM_ROUTE
    if any(w in q for w in ["classroom", "course", "class", "student"]):
        return TOOL_ROUTES["classroom"] + _SWARM_ROUTE
    # Default: minimal toolset (~20 tools, <1000 tokens)
    # Covers common general-purpose capabilities without the full 76-tool footprint
    return ["web", "file", "terminal", "browser", "delegation", "memory", "skills",
            "cronjob", "todo", "vision", "session_search", "tts", "code_execution", "swarm"]

# ── Google OAuth plugin ───────────────────────────────────────────────────────
from plugins.dashboard_auth.google import router as google_oauth_router
from plugins.dashboard_auth.google import init_db as init_google_db
from plugins.dashboard_auth.google import all_connected, GOOGLE_PLUGIN_IDS

# ── Dashboard API Endpoints ──────────────────────────────────────────────────


def _enhance_system_prompt(system_msg: str, dashboard_state: Optional[Dict[str, Any]] = None) -> str:
    """Append dashboard state and Google services info so the model is aware of the live dashboard."""
    parts = [system_msg or ""]

    # ── Dashboard state awareness ────────────────────────────────────────
    if dashboard_state:
        lines = []
        agents = dashboard_state.get("agents")
        if agents:
            lines.append("## Dashboard Agents")
            for a in agents:
                lines.append(f"- {a.get('name')} ({a.get('model', 'no model')}) — {a.get('desc', '')}")
        schedules = dashboard_state.get("schedules")
        if schedules:
            lines.append("## Scheduled Jobs")
            for s in schedules:
                lines.append(f"- {s.get('name')} — {s.get('schedule', s.get('cron', ''))} — enabled={s.get('enabled', True)}")
        plugins = dashboard_state.get("plugins")
        if plugins:
            lines.append("## Connected Plugins & Services")
            for p in plugins:
                name = p.get('name', '')
                desc = p.get('desc', '')
                if desc:
                    lines.append(f"- {name} — {desc}")
                else:
                    lines.append(f"- {name}")
            lines.append("These plugins are already connected and authenticated — you can use their tools directly.")
        models = dashboard_state.get("models")
        if models:
            lines.append("## Available Models")
            for m in models:
                lines.append(f"- {m.get('name')} — {m.get('provider', '')} — status={m.get('status', 'unknown')}")
        active_model = dashboard_state.get("activeModel")
        if active_model:
            lines.append(f"Active chat model: {active_model}")
        if lines:
            parts.append("\n".join(lines))
            parts.append("You are running inside the Dashboard web UI. Use your available tools (read_file, write_file, terminal, cronjob, web_search, etc.) to inspect or modify anything the user asks about. When the user asks about agents, schedules, plugins, or models, answer from the dashboard state above. If they want to change something that requires a tool call, ask for permission before proceeding.")

    # ── Swarm orchestration via delegate_task sub-agents (10 patterns) ──
    parts.append(
        "## Swarm Orchestration — Autonomous Multi-Agent Mode\n"
        "You can dynamically spawn teams of sub-agents for complex work. "
        "Always autonomously consider whether a task would benefit from "
        "multi-agent orchestration — use it for research, planning, analysis, "
        "comparison, debate, or any task with multiple facets.\n\n"
        "Available patterns:\n"
        "- swarm_router (recommended): Call with swarm_type='auto' to auto-select the best\n"
        "  pattern from the ones below based on task analysis.\n"
        "- concurrent_swarm: Run agents in parallel on same task\n"
        "- sequential_swarm: Chain agents linearly (output→input pipeline)\n"
        "- hierarchical_swarm: Director plans, delegates to workers, synthesizes\n"
        "- agent_rearrange_swarm: DSL flow 'a->b, c' for custom patterns\n"
        "- graph_swarm: DAG with fan-out/fan-in (Node→Edge→Node)\n"
        "- mixture_of_agents_swarm: Multiple experts in parallel + aggregator\n"
        "- group_chat_swarm: Agents converse in turns\n"
        "- heavy_swarm: 5-phase deep research (Research→Analysis→Alternatives→Verification→Synthesis)\n"
        "- forest_swarm: Multiple parallel groups merged into one result\n\n"
        "Use these instead of delegate_task when the work has multiple subtasks, "
        "perspectives, or stages. Each worker is a full sub-agent (up to 250 concurrent).\n"
        "You decide when to swarm — not the user. For most complex tasks, "
        "use swarm_router(swarm_type='auto')."
    )

    # ── Google connected services ────────────────────────────────────────
    connected = all_connected()
    google_connected = [p for p in connected if p in GOOGLE_PLUGIN_IDS or p == "google"]
    if google_connected:
        names = []
        for p in google_connected:
            if p == "google":
                continue
            name = p.replace("-", " ").title()
            names.append(name)
        if names:
            suffix = f"\n\nConnected Google services: {', '.join(names)}. These are already authenticated — use their tools directly."
            suffix += "\nIf the user asks about a Google service that is NOT connected, respond with ONLY the marker [CONNECT:service_id] (no other text). Valid service IDs: gmail, google-drive, calendar, google-tasks, google-contacts, google-photos, youtube, google-docs, google-sheets, google-slides, google-chat, google-meet, google-fit, google-classroom."
            parts.append(suffix)

    return "\n\n".join(p for p in parts if p)

# ── State ────────────────────────────────────────────────────────────────────
_active_agents: Dict[str, Any] = {}
_ws_clients: List[WebSocket] = []
session_db: Optional[SessionDB] = None
_plugin_manager = None
_http_client: Optional[httpx.AsyncClient] = None



# ── Lifespan ─────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    global session_db, _plugin_manager, _http_client

    logger.info("=" * 60)
    logger.info("  Zed Pro Backend starting on port %s", PORT)
    logger.info("  ZED_HOME: %s", ZED_HOME)
    logger.info("  Upstream: %s", FREELLMAPI_URL)
    logger.info("=" * 60)

    _http_client = httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=10.0))

    # Session DB
    session_db_path = ZED_HOME / "sessions.db"
    session_db = SessionDB(session_db_path)

    # Initialize Google OAuth plugin DB
    init_google_db(ZED_HOME / "connections.db")

    # Discover plugins and tools
    _plugin_manager = discover_plugins()
    discover_builtin_tools()
    tool_defs = get_tool_definitions()
    logger.info("Discovered %s plugins, %s tools",
                len(_plugin_manager.list_plugins()) if _plugin_manager else 0,
                len(tool_defs))

    # ── Self-contained Cron scheduler daemon ─────────────────────────────
    # Uses httpx directly to call the LLM proxy — no zed-agent provider
    # resolution required. Reads jobs from jobs.json, checks croniter for
    # due jobs, fires them, saves output to disk.
    _cron_stop = threading.Event()

    def _cron_tick_self_contained():
        """Check for due cron jobs and fire them via httpx to the LLM proxy."""
        jobs_file = ZED_HOME / "cron" / "jobs.json"
        if not jobs_file.exists():
            return
        try:
            data = json.loads(jobs_file.read_text(encoding="utf-8"))
            jobs = data.get("jobs", []) if isinstance(data, dict) else data
        except Exception:
            return

        now = time.time()
        changed = False

        for job in jobs:
            if not job.get("enabled", True):
                continue

            # Check if due
            schedule = job.get("schedule")
            if not isinstance(schedule, dict):
                continue  # raw string schedules not supported in self-contained mode

            kind = schedule.get("kind", "")
            is_due = False

            if kind == "interval":
                # Interval schedule: check minutes
                minutes = schedule.get("minutes", 60)
                last_run = job.get("last_run_at")
                if last_run:
                    try:
                        last_ts = last_run.timestamp() if hasattr(last_run, 'timestamp') else float(last_run)
                        if now - last_ts >= minutes * 60:
                            is_due = True
                    except Exception:
                        is_due = True
                else:
                    is_due = True
            elif kind == "cron":
                # Cron expression — try croniter
                expr = schedule.get("expr", "")
                if not expr:
                    continue
                try:
                    from croniter import croniter
                    last_run = job.get("last_run_at")
                    if last_run:
                        try:
                            last_ts = last_run.timestamp() if hasattr(last_run, 'timestamp') else float(last_run)
                        except Exception:
                            last_ts = now - 60
                    else:
                        last_ts = now - 60
                    # Get next run time after last_run
                    cron = croniter(expr, last_ts)
                    next_run = cron.get_next(float)
                    if next_run <= now + 5:  # 5s tolerance
                        is_due = True
                except ImportError:
                    # croniter not available — fall back to simple minute check
                    if schedule.get("expr", "").strip() == "* * * * *":
                        last_run = job.get("last_run_at")
                        if last_run:
                            try:
                                last_ts = last_run.timestamp() if hasattr(last_run, 'timestamp') else float(last_run)
                                if now - last_ts >= 55:
                                    is_due = True
                            except Exception:
                                is_due = True
                        else:
                            is_due = True
                except Exception:
                    logger.debug("Cron expr parse failed for job %s: %s", job.get("id"), schedule.get("expr"))
                    continue

            if not is_due:
                continue

            # Fire the job
            job_id = job.get("id", "unknown")
            job_name = job.get("name", job_id)
            prompt = job.get("prompt", f"Execute scheduled task: {job_name}")
            llm_model = job.get("model", "auto") or "auto"
            if llm_model.lower() in ("zed-pro", ""):
                llm_model = "auto"

            logger.info("Cron daemon firing job '%s' (id=%s)", job_name, job_id)

            run_id = f"run-{uuid.uuid4().hex[:8]}"

            def _fire_job(_job_id=job_id, _job_name=job_name, _prompt=prompt, _llm_model=llm_model, _run_id=run_id):
                output_dir = ZED_HOME / "cron_output" / _job_id
                output_dir.mkdir(parents=True, exist_ok=True)
                try:
                    llm_base_url = os.environ.get(
                        "ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"
                    ).rstrip("/")
                    llm_api_key = os.environ.get(
                        "ZED_PRO_API_KEY", os.environ.get("OPENAI_API_KEY", "no-key")
                    )
                    if not llm_base_url.endswith("/v1"):
                        llm_base_url += "/v1"
                    resp = httpx.post(
                        f"{llm_base_url}/chat/completions",
                        json={
                            "model": _llm_model,
                            "messages": [{"role": "user", "content": _prompt}],
                            "max_tokens": 4096,
                        },
                        headers={
                            "Authorization": f"Bearer {llm_api_key}",
                            "Content-Type": "application/json",
                        },
                        timeout=120.0,
                    )
                    if resp.status_code == 200:
                        result = resp.json().get("choices", [{}])[0].get("message", {}).get("content", "No response")
                        status = "success"
                    else:
                        result = f"LLM error {resp.status_code}: {resp.text[:200]}"
                        status = "error"
                except Exception as e:
                    result = f"Execution failed: {e}"
                    status = "error"

                # Save output
                output_file = output_dir / f"{_run_id}.json"
                output_file.write_text(json.dumps({
                    "run_id": _run_id,
                    "job_id": _job_id,
                    "job_name": _job_name,
                    "prompt": _prompt,
                    "result": result,
                    "model": _llm_model,
                    "status": status,
                    "created_at": time.time(),
                }, indent=2), encoding="utf-8")

                # Update job state in jobs.json
                try:
                    jobs_data = json.loads(jobs_file.read_text(encoding="utf-8"))
                    jobs_list = jobs_data.get("jobs", []) if isinstance(jobs_data, dict) else jobs_data
                    for j in jobs_list:
                        if j.get("id") == _job_id:
                            j["last_run_at"] = time.time()
                            j["last_status"] = status
                            j["last_error"] = result if status == "error" else None
                            repeat = j.get("repeat") or {}
                            repeat["completed"] = repeat.get("completed", 0) + 1
                            j["repeat"] = repeat
                            break
                    if isinstance(jobs_data, dict):
                        jobs_data["jobs"] = jobs_list
                    else:
                        jobs_data = {"jobs": jobs_list}
                    jobs_file.write_text(json.dumps(jobs_data, indent=2), encoding="utf-8")
                except Exception:
                    pass

                logger.info("Cron daemon job '%s' run %s: %s", _job_name, _run_id, status)

            threading.Thread(target=_fire_job, daemon=True).start()
            changed = True

    def _cron_loop():
        logger.info("Cron scheduler daemon started (interval=60s, self-contained mode)")
        while not _cron_stop.is_set():
            try:
                _cron_tick_self_contained()
            except Exception:
                logger.exception("Cron tick failed")
            _cron_stop.wait(timeout=60)

    _cron_thread = threading.Thread(target=_cron_loop, name="cron-daemon", daemon=True)
    _cron_thread.start()

    logger.info("Zed Pro backend ready — http://127.0.0.1:%s", PORT)
    yield

    logger.info("Stopping cron scheduler daemon...")
    _cron_stop.set()

    if _http_client:
        await _http_client.aclose()
    _active_agents.clear()



app = FastAPI(
    title="Zed Pro Dashboard API",
    description="Zed Agent — powered by freellmapi (no key required)",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Google OAuth plugin routes
app.include_router(google_oauth_router)

# ── Pydantic Models ──────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str
    content: Optional[str] = None  # null is valid for assistant messages with tool_calls
    tool_calls: Optional[List[Dict[str, Any]]] = None
    tool_call_id: Optional[str] = None

    def dict(self, **kwargs):
        # Always exclude_none so null content is dropped from the payload
        kwargs.setdefault('exclude_none', True)
        return super().dict(**kwargs)


class ChatCompletionRequest(BaseModel):
    model: Optional[str] = "auto"
    messages: List[ChatMessage]
    stream: Optional[bool] = True
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None
    dashboard_state: Optional[Dict[str, Any]] = None
    tools: Optional[List[Dict[str, Any]]] = None
    tool_choice: Optional[str] = None


class SessionCreateRequest(BaseModel):
    title: Optional[str] = "New Chat"
    model: Optional[str] = None


class AgentRequest(BaseModel):
    name: str
    desc: Optional[str] = ""          # primary description field
    description: Optional[str] = None  # alias — curl tests send this key
    task: Optional[str] = None         # what the agent should do when run
    prompt: Optional[str] = None       # alias for task
    avatar: Optional[str] = "assistant"
    model: Optional[str] = "auto"
    provider: Optional[str] = "zed-pro"
    schedule: Optional[str] = "Manual"
    status: Optional[str] = "active"
    skills: Optional[List[str]] = []

    @property
    def effective_desc(self) -> str:
        """Return the best available description, preferring description over desc."""
        return (self.description or self.desc or "").strip()

    @property
    def effective_task(self) -> str:
        """Return the best available task/prompt."""
        return (self.task or self.prompt or self.effective_desc or "").strip()


class CronJobRequest(BaseModel):
    name: str
    schedule: str
    prompt: str
    enabled: Optional[bool] = True


class ConfigUpdateRequest(BaseModel):
    data: Dict[str, Any]


# ── Health ───────────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "zed-pro-backend"}


@app.get("/api/ping")
async def api_ping():
    """Lightweight ping endpoint for cron/keep-alive jobs."""
    return {"status": "ok", "ts": time.time()}


@app.get("/api/agent_output/{agent_id}")
async def get_agent_output(agent_id: str):
    """Get the latest output from an agent run."""
    output_dir = ZED_HOME / "agent_output" / agent_id
    if not output_dir.exists():
        return {"outputs": [], "count": 0}
    outputs = []
    for f in sorted(output_dir.glob("*.json"), key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            data = json.loads(f.read_text())
            outputs.append(data)
        except Exception:
            pass
    return {"outputs": outputs[:10], "count": len(outputs)}


@app.get("/")
async def root_ping():
    """Root endpoint — returns OK so external cron jobs don't get 404."""
    return {"status": "ok", "service": "zed-pro-backend", "ts": time.time()}


@app.get("/api/status")
async def get_status():
    """Health check — shows freellmapi connectivity."""
    freellmapi_ok = False
    try:
        base_url = os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1")
        base_ping_url = base_url.replace("/v1", "") if "/v1" in base_url else base_url
        api_key = os.getenv("ZED_PRO_API_KEY", "")
        headers = {}
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"
            
        r = await _http_client.get(f"{base_ping_url.rstrip('/')}/api/ping", headers=headers, timeout=2.0)
        freellmapi_ok = r.status_code == 200
    except Exception:
        pass

    return {
        "status": "ok",
        "service": "zed-pro-backend",
        "version": "1.0.0",
        "agent": "Zed",
        "zed_home": str(ZED_HOME),
        "upstream": FREELLMAPI_URL,
        "freellmapi_connected": freellmapi_ok,
    }


# ── Models ───────────────────────────────────────────────────────────────────
@app.get("/api/models")
@app.get("/v1/models")
async def list_models():
    """List available models via freellmapi."""
    try:
        base_url = os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1")
        base_ping_url = base_url.replace("/v1", "") if "/v1" in base_url else base_url
        api_key = os.getenv("ZED_PRO_API_KEY", "")
        headers = {}
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"

        r = await _http_client.get(f"{base_ping_url.rstrip('/')}/api/models", headers=headers, timeout=5.0)
        if r.status_code == 200:
            return r.json()
    except Exception:
        pass
    # Fallback — always show Zed Pro
    return {
        "object": "list",
        "data": [
            {
                "id": "zed-pro",
                "object": "model",
                "created": int(time.time()),
                "owned_by": "zed-team",
                "description": "Zed Pro — powered by freellmapi free providers",
                "context_length": 128000,
            }
        ],
    }


# ── Chat Completions — Direct connection to freellmapi (no API key needed) ────
# Uses port 3002 (createLocalApp — no auth) for direct httpx calls.
# The AIAgent path is used only when dashboard_state is provided (agentic mode).
@app.post("/v1/chat/completions")
@app.post("/api/chat")
async def chat_completions(request: ChatCompletionRequest, raw_request: Request):
    """
    OpenAI-compatible chat endpoint.
    - Normal chat: direct httpx proxy to freellmapi port 3002 (no auth needed)
    - Agentic mode (dashboard_state set): runs full AIAgent loop with tools
    Supports both streaming (SSE) and non-streaming responses.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="No messages provided")

    # ── Build outbound payload ───────────────────────────────────────────────
    def build_payload() -> dict:
        payload: dict = {}
        # Map zed-pro / auto → router picks best model
        model = request.model or "auto"
        payload["model"] = "auto" if model.lower() in ("zed-pro", "auto") else model
        # Serialize messages — drop None fields so freellmapi schema validates
        payload["messages"] = [
            {k: v for k, v in msg.dict(exclude_none=True).items()}
            for msg in request.messages
        ]
        if request.stream is not None:
            payload["stream"] = request.stream
        if request.max_tokens is not None:
            payload["max_tokens"] = request.max_tokens
        if request.temperature is not None:
            payload["temperature"] = request.temperature
        if request.tools:
            payload["tools"] = request.tools
        if request.tool_choice:
            payload["tool_choice"] = request.tool_choice
        return payload

    # ── Direct proxy path (normal chat + tool-call requests) ─────────────────
    # Skip AIAgent entirely — go direct to freellmapi via httpx (no auth header).
    use_agent = bool(request.dashboard_state)  # only agentic mode uses AIAgent

    if not use_agent:
        payload = build_payload()
        # Route dynamically to remote LLM Proxy URL (like Render) if configured.
        base_url = os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1")
        api_key = os.getenv("ZED_PRO_API_KEY", "")
        freellmapi_target = base_url.rstrip("/") + "/chat/completions"
            
        proxy_headers = {"Content-Type": "application/json"}
        if api_key:
            proxy_headers["Authorization"] = f"Bearer {api_key}"

        if request.stream:
            async def stream_direct():
                try:
                    async with _http_client.stream(
                        "POST",
                        freellmapi_target,
                        json=payload,
                        headers=proxy_headers,
                        timeout=httpx.Timeout(120.0),
                    ) as resp:
                        async for chunk in resp.aiter_bytes():
                            yield chunk
                except Exception as e:
                    logger.exception("Direct stream proxy error")
                    yield f"data: {json.dumps({'error': {'message': str(e), 'type': 'proxy_error'}})}\n\n".encode()
                    yield b"data: [DONE]\n\n"

            return StreamingResponse(
                stream_direct(),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",
                    "Access-Control-Allow-Origin": "*",
                },
            )
        else:
            try:
                resp = await _http_client.post(
                    freellmapi_target,
                    json=payload,
                    headers=proxy_headers,
                    timeout=120.0,
                )
                if not resp.is_success:
                    logger.error("freellmapi error %s: %s", resp.status_code, resp.text[:500])
                return Response(
                    content=resp.content,
                    status_code=resp.status_code,
                    media_type="application/json",
                )
            except Exception as e:
                logger.exception("Direct proxy error")
                raise HTTPException(status_code=500, detail=str(e))

    # ── AIAgent path (agentic / dashboard mode) ───────────────────────────────
    session_id = raw_request.headers.get("x-zed-session-id") or raw_request.headers.get("x-session-id")
    if not session_id:
        session_id = str(uuid.uuid4())

    # Route query to select only matching toolsets (saves ~1,500 tokens per call)
    user_msg = request.messages[-1].content if request.messages else ""
    selected_toolsets = route_query(user_msg) if user_msg else None

    _DISABLED_CORE = ["moa", "discord", "discord_admin", "spotify",
                       "yuanbao", "rl", "homeassistant"]
    if selected_toolsets:
        disabled_toolsets = [t for t in _DISABLED_CORE if t not in selected_toolsets]
    else:
        disabled_toolsets = ["moa", "discord", "discord_admin", "yuanbao", "rl"]

    resolved_model = request.model or "gemini-2.5-flash-lite"
    if resolved_model.lower() in ("zed-pro", "auto"):
        resolved_model = "gemini-2.5-flash-lite"

    if request.stream:
        q = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def stream_delta_cb(token: str):
            if token:
                loop.call_soon_threadsafe(q.put_nowait, ("token", token))

        def reasoning_cb(reasoning: str):
            if reasoning:
                loop.call_soon_threadsafe(q.put_nowait, ("reasoning", reasoning))

        def tool_start_cb(tool_call_id, function_name, function_args):
            try:
                safe_args = json.loads(json.dumps(function_args, default=str))
            except Exception:
                safe_args = str(function_args)[:500]
            loop.call_soon_threadsafe(q.put_nowait, ("tool_start", {"id": tool_call_id, "name": function_name, "args": safe_args}))

        def tool_complete_cb(tool_call_id, function_name, function_args, result):
            loop.call_soon_threadsafe(q.put_nowait, ("tool_complete", {"id": tool_call_id, "name": function_name}))

        agent_ref = [None]

        def run_agent_thread():
            try:
                agent = AIAgent(
                    session_id=session_id,
                    session_db=session_db,
                    stream_delta_callback=stream_delta_cb,
                    reasoning_callback=reasoning_cb,
                    tool_start_callback=tool_start_cb,
                    tool_complete_callback=tool_complete_cb,
                    model=resolved_model,
                    quiet_mode=True,
                    verbose_logging=False,
                    base_url=os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"),
                    api_key=os.getenv("ZED_PRO_API_KEY", ""),
                    enabled_toolsets=selected_toolsets,
                    disabled_toolsets=disabled_toolsets,
                )
                agent_ref[0] = agent

                user_msg_text = request.messages[-1].content
                history = []
                system_msg = None
                for m in request.messages[:-1]:
                    if m.role == "system":
                        system_msg = m.content
                    else:
                        history.append({"role": m.role, "content": m.content})
                system_msg = _enhance_system_prompt(system_msg, dashboard_state=request.dashboard_state)

                result = agent.run_conversation(
                    user_message=user_msg_text,
                    system_message=system_msg,
                    conversation_history=history,
                )
                loop.call_soon_threadsafe(q.put_nowait, ("done", result))
            except Exception as e:
                logger.exception("Error running AIAgent loop")
                loop.call_soon_threadsafe(q.put_nowait, ("error", str(e)))

        agent_task = asyncio.create_task(asyncio.to_thread(run_agent_thread))

        async def event_stream():
            try:
                created_time = int(time.time())
                while True:
                    event_type, val = await q.get()
                    if event_type == "token":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"content": val}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "reasoning":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"reasoning_content": val}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "tool_start":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"tool_usage": {"type": "tool_start", "name": val.get("name", ""), "id": val.get("id", ""), "args": val.get("args", {})}}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "tool_complete":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"tool_usage": {"type": "tool_complete", "name": val.get("name", ""), "id": val.get("id", "")}}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "done":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                        yield "data: [DONE]\n\n"
                        break
                    elif event_type == "error":
                        err_chunk = {"error": {"message": val, "type": "agent_error"}}
                        yield f"data: {json.dumps(err_chunk)}\n\n"
                        yield "data: [DONE]\n\n"
                        break
            except Exception as e:
                logger.exception("Event stream generator error")
                yield f"data: {json.dumps({'error': {'message': str(e), 'type': 'generator_error'}})}\n\n"
                yield "data: [DONE]\n\n"
            finally:
                if agent_ref[0]:
                    try:
                        agent_ref[0].interrupt()
                    except Exception:
                        pass
                await agent_task

        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
                "Access-Control-Allow-Origin": "*",
            },
        )

    else:
        def run_agent_sync():
            agent = AIAgent(
                session_id=session_id,
                session_db=session_db,
                model=resolved_model,
                quiet_mode=True,
                verbose_logging=False,
                base_url=os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"),
                api_key=os.getenv("ZED_PRO_API_KEY", ""),
                enabled_toolsets=selected_toolsets,
                disabled_toolsets=disabled_toolsets,
            )
            user_msg_text = request.messages[-1].content
            history = []
            system_msg = None
            for m in request.messages[:-1]:
                if m.role == "system":
                    system_msg = m.content
                else:
                    history.append({"role": m.role, "content": m.content})
            system_msg = _enhance_system_prompt(system_msg, dashboard_state=request.dashboard_state)
            return agent.run_conversation(
                user_message=user_msg_text,
                system_message=system_msg,
                conversation_history=history,
            )

        try:
            result = await asyncio.to_thread(run_agent_sync)
            final_text = result.get("final_response", "") if isinstance(result, dict) else str(result)
            return {
                "id": f"chatcmpl-{session_id}",
                "object": "chat.completion",
                "created": int(time.time()),
                "model": request.model or "zed-pro",
                "choices": [
                    {
                        "index": 0,
                        "message": {"role": "assistant", "content": final_text},
                        "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": result.get("session_input_tokens", 0),
                    "completion_tokens": result.get("session_output_tokens", 0),
                    "total_tokens": result.get("session_total_tokens", 0)
                }
            }
        except Exception as e:
            logger.exception("Error in non-streaming AIAgent loop")
            raise HTTPException(status_code=500, detail=str(e))





# ── Sessions ──────────────────────────────────────────────────────────────────
@app.get("/api/sessions")
async def list_sessions(limit: int = Query(50, le=200)):
    if session_db is None:
        return {"sessions": []}
    try:
        sessions = session_db.list_sessions_rich(limit=limit)
        return {"sessions": sessions}
    except Exception as e:
        logger.warning("list_sessions error: %s", e)
        return {"sessions": []}


@app.post("/api/sessions")
async def create_session(request: SessionCreateRequest):
    if session_db is None:
        raise HTTPException(status_code=503, detail="Session DB not ready")
    sid = str(uuid.uuid4())
    session_db.create_session(
        session_id=sid,
        source="dashboard",
        model=request.model or "auto",
    )
    return {"session_id": sid, "title": request.title or "New Chat"}


@app.get("/api/sessions/{session_id}")
async def get_session(session_id: str):
    if session_db is None:
        raise HTTPException(status_code=503, detail="Session DB not ready")
    session = session_db.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"session": session}


@app.delete("/api/sessions/{session_id}")
async def delete_session(session_id: str):
    if session_db is None:
        raise HTTPException(status_code=503, detail="Session DB not ready")
    session_db.delete_session(session_id)
    _active_agents.pop(session_id, None)
    return {"status": "deleted"}


@app.get("/api/sessions/{session_id}/messages")
async def get_session_messages(session_id: str, limit: int = Query(100, le=500)):
    if session_db is None:
        return {"messages": []}
    messages = session_db.get_messages(session_id, limit=limit)
    return {"messages": messages}


@app.post("/api/reset")
async def reset_session():
    """Clear all active agent sessions."""
    _active_agents.clear()
    return {"status": "reset", "cleared": len(_active_agents)}


# ── Skills ────────────────────────────────────────────────────────────────────
@app.get("/api/skills")
async def list_skills():
    """List all available skills from all skill directories."""
    skill_dirs = [
        ZED_HOME / "skills",
        _AGENT_DIR / "skills",
        _AGENT_DIR / "optional-skills",
    ]
    skills = []
    for skill_dir in skill_dirs:
        if skill_dir.exists():
            for f in skill_dir.iterdir():
                if f.is_dir() and (f / "SKILL.md").exists():
                    skills.append({
                        "name": f.name,
                        "path": str(f),
                        "source": skill_dir.name,
                    })
    return {"skills": skills, "count": len(skills)}


@app.post("/api/skills/{name}/activate")
async def activate_skill(name: str):
    return {"status": "activated", "skill": name}


# ── Tools ─────────────────────────────────────────────────────────────────────
@app.get("/api/tools")
async def list_tools():
    try:
        tools = get_tool_definitions()
        return {"tools": tools, "count": len(tools)}
    except Exception as e:
        logger.warning("list_tools error: %s", e)
        return {"tools": [], "count": 0}


# ── Config ────────────────────────────────────────────────────────────────────
@app.get("/api/config")
async def get_config():
    """Return current agent config."""
    import yaml
    config_path = ZED_HOME / "config.yaml"
    try:
        with open(config_path) as f:
            config = yaml.safe_load(f)
        # Mask any API keys
        if "providers" in config:
            for p in config["providers"].values():
                if "api_key" in p:
                    p["api_key"] = "***"
        return {"config": config, "config_path": str(config_path)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/config")
async def update_config(request: ConfigUpdateRequest):
    """Update agent config (partial merge)."""
    import yaml
    config_path = ZED_HOME / "config.yaml"
    try:
        with open(config_path) as f:
            config = yaml.safe_load(f) or {}
        config.update(request.data)
        with open(config_path, "w") as f:
            yaml.dump(config, f, default_flow_style=False, allow_unicode=True)
        return {"status": "updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Logs ──────────────────────────────────────────────────────────────────────
@app.get("/api/logs")
async def get_logs(lines: int = Query(100, le=500)):
    """Return last N lines from agent log."""
    log_path = _log_dir / "agent.log"
    if not log_path.exists():
        return {"logs": [], "path": str(log_path)}
    try:
        with open(log_path, encoding="utf-8", errors="replace") as f:
            all_lines = f.readlines()
        tail = all_lines[-lines:]
        return {"logs": [l.rstrip() for l in tail], "total": len(all_lines)}
    except Exception as e:
        return {"logs": [f"Error reading logs: {e}"], "total": 0}


# ── Memory ────────────────────────────────────────────────────────────────────
@app.get("/api/memory")
async def list_memory():
    """List memory files from ZED_HOME/memories/."""
    memories_dir = ZED_HOME / "memories"
    memories = []
    if memories_dir.exists():
        for f in sorted(memories_dir.iterdir()):
            if f.is_file():
                try:
                    content = f.read_text(encoding="utf-8", errors="replace")
                    memories.append({
                        "name": f.name,
                        "size": f.stat().st_size,
                        "preview": content[:200],
                    })
                except Exception:
                    pass
    return {"memories": memories, "count": len(memories)}


# ── Cron ──────────────────────────────────────────────────────────────────────
CRON_JOBS_FILE = ZED_HOME / "cron" / "jobs.json"


def _load_cron_jobs_fallback():
    """Fallback: load jobs from jobs.json without cron.jobs module."""
    if not CRON_JOBS_FILE.exists():
        return []
    try:
        data = json.loads(CRON_JOBS_FILE.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            return data.get("jobs", [])
        if isinstance(data, list):
            return data
    except Exception:
        pass
    return []


def _save_cron_jobs_fallback(jobs):
    """Fallback: save jobs to jobs.json without cron.jobs module."""
    CRON_JOBS_FILE.parent.mkdir(parents=True, exist_ok=True)
    CRON_JOBS_FILE.write_text(json.dumps({"jobs": jobs}, indent=2), encoding="utf-8")


@app.get("/api/cron")
async def list_cron():
    """List cron jobs."""
    if HAS_CRON_JOBS:
        try:
            jobs = _cron_load_jobs()
            return {"jobs": jobs, "count": len(jobs)}
        except Exception as e:
            logger.warning("cron.jobs.load_jobs() failed, using fallback: %s", e)
    jobs = _load_cron_jobs_fallback()
    return {"jobs": jobs, "count": len(jobs)}


@app.post("/api/cron")
async def create_cron(request: CronJobRequest):
    """Create a new cron job with properly-parsed schedule so tick() can fire it."""
    # Prefer cron.jobs.create_job() — it calls parse_schedule() which produces
    # the dict format {kind, expr/minutes/run_at} that get_due_jobs() requires.
    # Jobs saved with a raw schedule string would be silently skipped by tick().
    if HAS_CRON_JOBS:
        try:
            job = _cron_create_job(
                prompt=request.prompt,
                schedule=request.schedule,
                name=request.name,
                deliver="local",
            )
            # Disable if requested
            if request.enabled is False:
                jobs = _cron_load_jobs()
                for j in jobs:
                    if j["id"] == job["id"]:
                        j["enabled"] = False
                        break
                from cron.jobs import save_jobs as _cron_save_jobs
                _cron_save_jobs(jobs)
                job["enabled"] = False
            logger.info("Cron job '%s' created via cron.jobs (id=%s, next=%s)",
                        job.get("name"), job.get("id"), job.get("next_run_at"))
            return {"status": "created", "job": job}
        except Exception as e:
            logger.warning("cron.jobs.create_job() failed (%s), using fallback", e)

    # Fallback: save raw job (scheduler may not fire it, but at least it's stored)
    jobs = _load_cron_jobs_fallback()
    job_id = uuid.uuid4().hex[:12]
    now_iso = __import__("datetime").datetime.utcnow().isoformat()
    job = {
        "id": job_id,
        "name": request.name,
        "schedule": request.schedule,
        "prompt": request.prompt,
        "enabled": request.enabled if request.enabled is not None else True,
        "created_at": now_iso,
    }
    jobs.append(job)
    _save_cron_jobs_fallback(jobs)
    logger.warning("Cron job '%s' created via fallback (no schedule parsing — tick() may not fire it)",
                   request.name)
    return {"status": "created", "job": job}


@app.delete("/api/cron/{job_id}")
async def delete_cron(job_id: str):
    """Delete a cron job."""
    if HAS_CRON_JOBS:
        try:
            removed = _cron_remove_job(job_id)
            if not removed:
                raise HTTPException(status_code=404, detail="Cron job not found")
            return {"status": "deleted", "id": job_id}
        except HTTPException:
            raise
        except Exception as e:
            logger.warning("cron.jobs.remove_job() failed (%s), using fallback", e)

    # Fallback
    jobs = _load_cron_jobs_fallback()
    new_jobs = [j for j in jobs if j.get("id") != job_id]
    if len(new_jobs) == len(jobs):
        raise HTTPException(status_code=404, detail="Cron job not found")
    _save_cron_jobs_fallback(new_jobs)
    return {"status": "deleted", "id": job_id}


@app.patch("/api/cron/{job_id}")
async def update_cron(job_id: str, request: Request):
    """Toggle enabled state or update fields of a cron job."""
    body = await request.json()
    if HAS_CRON_JOBS:
        try:
            from cron.jobs import load_jobs as _lj, save_jobs as _sj
            jobs = _lj()
            found = next((j for j in jobs if j.get("id") == job_id), None)
            if not found:
                raise HTTPException(status_code=404, detail="Cron job not found")
            for key, val in body.items():
                if key in ("enabled", "name", "prompt", "schedule"):
                    found[key] = val
            _sj(jobs)
            return {"status": "updated", "job": found}
        except HTTPException:
            raise
        except Exception as e:
            logger.warning("cron.jobs PATCH failed (%s), using fallback", e)

    # Fallback
    jobs = _load_cron_jobs_fallback()
    found = next((j for j in jobs if j.get("id") == job_id), None)
    if not found:
        raise HTTPException(status_code=404, detail="Cron job not found")
    for key, val in body.items():
        if key in ("enabled", "name", "prompt", "schedule"):
            found[key] = val
    _save_cron_jobs_fallback(jobs)
    return {"status": "updated", "job": found}


@app.get("/api/cron_output/{job_id}")
async def get_cron_output(job_id: str):
    """Get the latest outputs for a cron job."""
    output_dir = ZED_HOME / "cron_output" / job_id
    if not output_dir.exists():
        return {"outputs": [], "count": 0}
    outputs = []
    for f in sorted(output_dir.glob("*.json"), key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            outputs.append(data)
        except Exception:
            pass
    return {"outputs": outputs[:10], "count": len(outputs)}


@app.post("/api/cron/{job_id}/run")
async def run_cron_now(job_id: str):
    """Trigger a cron job to run immediately — fires its prompt via LLM in background."""
    # Load the job
    if HAS_CRON_JOBS:
        try:
            jobs = _cron_load_jobs()
        except Exception:
            jobs = _load_cron_jobs_fallback()
    else:
        jobs = _load_cron_jobs_fallback()

    job = next((j for j in jobs if j.get("id") == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Cron job not found")

    prompt = job.get("prompt", f"Execute scheduled task: {job.get('name', job_id)}")
    llm_model = job.get("model", "auto") or "auto"
    llm_base_url = os.environ.get("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1")
    llm_api_key  = os.environ.get("ZED_PRO_API_KEY", os.environ.get("OPENAI_API_KEY", "no-key"))
    run_id = f"run-{uuid.uuid4().hex[:8]}"

    def _fire():
        output_dir = ZED_HOME / "cron_output" / job_id
        output_dir.mkdir(parents=True, exist_ok=True)
        try:
            base_url = llm_base_url.rstrip("/")
            if not base_url.endswith("/v1"):
                base_url += "/v1"
            resp = httpx.post(
                f"{base_url}/chat/completions",
                json={"model": llm_model, "messages": [{"role": "user", "content": prompt}], "max_tokens": 4096},
                headers={"Authorization": f"Bearer {llm_api_key}", "Content-Type": "application/json"},
                timeout=120.0,
            )
            result = resp.json().get("choices", [{}])[0].get("message", {}).get("content", "No response") if resp.status_code == 200 else f"Error {resp.status_code}: {resp.text[:200]}"
            status = "success" if resp.status_code == 200 else "error"
        except Exception as e:
            result = f"Execution failed: {e}"
            status = "error"

        (output_dir / f"{run_id}.json").write_text(json.dumps({
            "run_id": run_id, "job_id": job_id,
            "job_name": job.get("name"),
            "prompt": prompt, "result": result, "status": status,
            "created_at": time.time(),
        }, indent=2))
        logger.info("Cron job %s manual run %s: %s", job_id, run_id, status)

    threading.Thread(target=_fire, daemon=True).start()
    return {"status": "triggered", "job_id": job_id, "run_id": run_id}


# ── Agents CRUD ──────────────────────────────────────────────────────────────
AGENTS_DIR = ZED_HOME / "agents"


@app.get("/api/agents")
async def list_agents():
    """List all agents from ZED_HOME/agents/."""
    AGENTS_DIR.mkdir(parents=True, exist_ok=True)
    agents = []
    for f in sorted(AGENTS_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text())
            agents.append(data)
        except Exception:
            pass
    return {"agents": agents, "count": len(agents)}


@app.post("/api/agents")
async def create_agent(request: AgentRequest):
    """Create a new agent."""
    AGENTS_DIR.mkdir(parents=True, exist_ok=True)
    agent_id = f"agent-{str(uuid.uuid4())[:8]}"
    agent = {
        "id": agent_id,
        "name": request.name,
        "desc": request.effective_desc,
        "description": request.effective_desc,  # store both keys for compat
        "task": request.effective_task,
        "avatar": request.avatar,
        "model": request.model,
        "provider": request.provider,
        "schedule": request.schedule,
        "status": request.status,
        "skills": request.skills or [],
        "created_at": time.time(),
    }
    (AGENTS_DIR / f"{agent_id}.json").write_text(json.dumps(agent, indent=2))
    return {"status": "created", "agent": agent}


@app.put("/api/agents/{agent_id}")
async def update_agent(agent_id: str, request: AgentRequest):
    """Update an existing agent."""
    agent_file = AGENTS_DIR / f"{agent_id}.json"
    if not agent_file.exists():
        raise HTTPException(status_code=404, detail="Agent not found")
    existing = json.loads(agent_file.read_text())
    existing.update({
        "name": request.name,
        "desc": request.effective_desc,
        "description": request.effective_desc,
        "task": request.effective_task,
        "avatar": request.avatar,
        "model": request.model,
        "provider": request.provider,
        "schedule": request.schedule,
        "status": request.status,
        "skills": request.skills or existing.get("skills", []),
    })
    agent_file.write_text(json.dumps(existing, indent=2))
    return {"status": "updated", "agent": existing}


@app.delete("/api/agents/{agent_id}")
async def delete_agent(agent_id: str):
    """Delete an agent."""
    agent_file = AGENTS_DIR / f"{agent_id}.json"
    if not agent_file.exists():
        raise HTTPException(status_code=404, detail="Agent not found")
    agent_file.unlink()
    return {"status": "deleted", "id": agent_id}


@app.post("/api/agents/{agent_id}/run")
async def run_agent_now(agent_id: str):
    """Trigger an agent to run immediately — executes directly via LLM, not cron."""
    agent_file = AGENTS_DIR / f"{agent_id}.json"
    if not agent_file.exists():
        raise HTTPException(status_code=404, detail="Agent not found")
    agent = json.loads(agent_file.read_text())

    # Build the system prompt from the agent's config
    agent_name = agent.get("name", "Agent")
    agent_desc = agent.get("desc", agent.get("description", ""))
    skills = agent.get("skills", [])

    system_prompt = f"You are {agent_name}."
    if agent_desc:
        system_prompt += f" {agent_desc}"

    # Load real skill content if available
    if skills:
        skill_content = ""
        for s in skills:
            # Map skill IDs to descriptive instructions the LLM can follow
            skill_map = {
                'web-research': 'Use web_search and web_extract to find information. Cite sources.',
                'competitor-analysis': 'Research competitors, compare products/pricing, generate competitive analysis.',
                'data-collection': 'Gather structured data from web sources, organize into CSV/JSON.',
                'report-generator': 'Generate professional reports with analysis and recommendations.',
                'email-drafter': 'Draft professional emails with appropriate tone and call-to-action.',
                'code-analyzer': 'Analyze code for bugs, security issues, and performance problems.',
                'task-automation': 'Create automated workflows combining multiple tools.',
                'document-writer': 'Write technical documentation, READMEs, and user guides.',
                'gmail-organizer': 'Label, archive, and organize Gmail emails based on rules.',
                'google-drive-manager': 'Manage Google Drive files — search, organize, share.',
                'calendar-manager': 'Manage Google Calendar events — create, update, delete.',
                'youtube-research': 'Search YouTube videos, get transcripts, analyze content.',
            }
            desc = skill_map.get(s, s)
            skill_content += f"\n- {s}: {desc}"
        if skill_content:
            system_prompt += "\n\nYour active skills:" + skill_content

    system_prompt += "\n\nExecute your assigned task now. Use all available tools to complete the work. Report what was done."

    # Get the user's prompt from the agent config or use a default task
    prompt = agent.get("task", agent.get("prompt", f"Execute the task for {agent_name}"))
    # If task/prompt is empty, use the description as the task
    if not prompt or prompt == f"Execute the task for {agent_name}":
        if agent_desc:
            prompt = agent_desc

    # Get LLM config — prefer ZED_PRO keys (set at server startup)
    llm_model = agent.get("model", "auto")
    # Normalize legacy model name
    if not llm_model or llm_model in ("Zed Pro", "zed-pro", ""):
        llm_model = "auto"
    llm_base_url = os.environ.get("LLM_BASE_URL", os.environ.get(
        "ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"))
    llm_api_key = os.environ.get("LLM_API_KEY", os.environ.get(
        "ZED_PRO_API_KEY", os.environ.get("OPENAI_API_KEY", "no-key")))

    # Run in background thread so endpoint returns immediately
    run_id = f"run-{uuid.uuid4().hex[:8]}"

    def _execute_agent():
        output_dir = ZED_HOME / "agent_output" / agent_id
        output_dir.mkdir(parents=True, exist_ok=True)
        try:
            base_url = llm_base_url.rstrip("/")
            if not base_url.endswith("/v1"):
                base_url = base_url + "/v1"
            url = f"{base_url}/chat/completions"
            headers = {
                "Authorization": f"Bearer {llm_api_key}",
                "Content-Type": "application/json",
            }
            body = {
                "model": llm_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt},
                ],
                "max_tokens": 4096,
            }
            logger.info("Agent %s calling LLM at %s with model %s", agent_id, url, llm_model)
            resp = httpx.post(url, json=body, headers=headers, timeout=120.0)
            logger.info("Agent %s LLM response status: %s", agent_id, resp.status_code)

            if resp.status_code != 200:
                error_text = resp.text[:500]
                logger.error("Agent %s LLM error: %s %s", agent_id, resp.status_code, error_text)
                result = f"LLM error {resp.status_code}: {error_text}"
                status = "error"
            else:
                data = resp.json()
                result = data.get("choices", [{}])[0].get("message", {}).get("content", "No response")
                status = "success"
                logger.info("Agent %s completed: %s", agent_id, result[:200])

            # Save result (success or error — always write so /api/agent_output shows something)
            (output_dir / f"{run_id}.json").write_text(json.dumps({
                "run_id": run_id,
                "agent_id": agent_id,
                "agent_name": agent_name,
                "prompt": prompt,
                "result": result,
                "model": llm_model,
                "status": status,
                "created_at": time.time(),
            }, indent=2))
        except Exception as e:
            logger.error("Agent %s execution failed: %s", agent_id, e, exc_info=True)
            # Write failure record so the user can see what went wrong
            try:
                (output_dir / f"{run_id}.json").write_text(json.dumps({
                    "run_id": run_id,
                    "agent_id": agent_id,
                    "agent_name": agent_name,
                    "prompt": prompt,
                    "result": f"Execution failed: {e}",
                    "model": llm_model,
                    "status": "error",
                    "created_at": time.time(),
                }, indent=2))
            except Exception:
                pass

    thread = threading.Thread(target=_execute_agent, daemon=True)
    thread.start()

    return {"status": "triggered", "agent": agent, "run_id": run_id}



# ── WebSocket (live events) ────────────────────────────────────────────────────
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket for live agent events (tool calls, status, streaming)."""
    await websocket.accept()
    _ws_clients.append(websocket)
    logger.info("WebSocket client connected (%s total)", len(_ws_clients))
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back for ping/keep-alive
            await websocket.send_text(json.dumps({"type": "pong", "data": data}))
    except WebSocketDisconnect:
        pass
    finally:
        _ws_clients.remove(websocket)
        logger.info("WebSocket client disconnected (%s remaining)", len(_ws_clients))


async def broadcast_ws(event: dict):
    """Broadcast an event to all connected WebSocket clients."""
    if not _ws_clients:
        return
    msg = json.dumps(event)
    for ws in list(_ws_clients):
        try:
            await ws.send_text(msg)
        except Exception:
            _ws_clients.remove(ws)


# ── Stop active session ────────────────────────────────────────────────────────
@app.post("/api/chat/{session_id}/stop")
async def stop_chat(session_id: str):
    if session_id in _active_agents:
        agent = _active_agents.pop(session_id)
        try:
            agent.interrupt()
        except Exception:
            pass
        return {"status": "stopped", "session_id": session_id}
    raise HTTPException(status_code=404, detail="Session not found")


# ── Serve Dashboard static files (after all API routes) ───────────────────
from fastapi.staticfiles import StaticFiles
_DASHBOARD_DIR = Path(__file__).resolve().parent.parent  # Dashboard/
if _DASHBOARD_DIR.joinpath("index.html").exists():
    app.mount("/", StaticFiles(directory=str(_DASHBOARD_DIR), html=True), name="dashboard")
    logger.info("Dashboard frontend mounted from %s", _DASHBOARD_DIR)
else:
    logger.warning("Dashboard frontend not found at %s", _DASHBOARD_DIR)


# ── Entry point ────────────────────────────────────────────────────────────────
def main():
    host = os.getenv("ZED_SERVER_HOST", HOST)
    port = int(os.getenv("ZED_SERVER_PORT", os.getenv("PORT", str(PORT))))
    logger.info("Starting Zed Pro backend on %s:%s", host, port)
    uvicorn.run(
        "server:app",
        host=host,
        port=port,
        reload=False,
        log_level="info",
        access_log=True,
    )


if __name__ == "__main__":
    main()
