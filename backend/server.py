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
  - Loads config from C:\\Users\\balur\\.zed\\config.yaml (Zed Home)
  - All sessions/memories/skills saved to C:\\Users\\balur\\.zed\\
"""

from __future__ import annotations

import asyncio
import base64
import json
import logging
import os
import shutil
import stat
import subprocess
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
from fastapi import FastAPI, HTTPException, Query, WebSocket, WebSocketDisconnect, Request, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

# ── Zed Home = C:\Users\<user>\.zed (all sessions, config, memories) ────
# CRITICAL: Must set ZED_HOME env var BEFORE importing cron modules,
# because cron/jobs.py resolves get_zed_home() at import time.
_DEFAULT_ZED_HOME = Path.home() / ".zed"
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
# full Zed toolset without requiring a gateway / interactive-CLI session.
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
PORT = int(os.getenv("PORT", "8642"))  # Render sets PORT=10000; local dev uses 8642

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

# Core tools EVERY query should have — delegation, clarification, memory, etc.
_CORE_AGENT_TOOLS = ["delegation", "clarify", "memory", "todo", "session_search", "skills"]


def route_query(query: str) -> list:
    """Route a query to the matching toolsets. Uses keyword heuristic (0 tokens), falls back to LLM."""
    q = query.lower()
    # Quick keyword check first. ALWAYS include swarm so the agent can
    # autonomously decide when multi-agent orchestration helps — like Kimi.
    # Every route gets core agent tools (delegation, clarify, memory) plus specific tools
    core = _CORE_AGENT_TOOLS + _SWARM_ROUTE
    if any(w in q for w in ["email", "inbox", "send mail", "compose"]):
        return core + TOOL_ROUTES["email"]
    if any(w in q for w in ["gmail", "google mail", "read mail"]):
        return core + TOOL_ROUTES["gmail"]
    if any(w in q for w in ["drive", "google drive", "file in drive"]):
        return core + TOOL_ROUTES["drive"]
    if any(w in q for w in ["browse", "open url", "navigate", "website", "go to"]):
        return core + TOOL_ROUTES["browser"]
    if any(w in q for w in ["search", "find", "look up", "google", "research"]):
        return core + TOOL_ROUTES["search"]
    if any(w in q for w in ["run", "execute", "bash", "terminal", "command", "shell"]):
        return core + TOOL_ROUTES["terminal"]
    if any(w in q for w in ["write code", "python", "javascript", "program", "script"]):
        return core + TOOL_ROUTES["code"]
    if any(w in q for w in ["read", "write", "create file", "edit file", "list dir"]):
        return core + TOOL_ROUTES["file"]
    if any(w in q for w in ["delegate", "subagent", "child"]):
        return core + TOOL_ROUTES["delegate"]
    if any(w in q for w in ["swarm", "concurrent", "hierarchical", "orchestrate", "multi-agent", "forest"]):
        return core + TOOL_ROUTES["swarm"]
    if any(w in q for w in ["remember", "memory", "recall", "find session"]):
        return core + TOOL_ROUTES["memory"]
    if any(w in q for w in ["skill", "install", "create skill"]):
        return core + TOOL_ROUTES["skill"]
    if any(w in q for w in ["schedule", "cron", "every day", "every hour", "recurring"]):
        return core + TOOL_ROUTES["cron"]
    if any(w in q for w in ["todo", "task list", "to-do"]):
        return core + TOOL_ROUTES["todo"]
    if any(w in q for w in ["see ", "view ", "image", "photo", "picture", "screenshot"]):
        return core + TOOL_ROUTES["vision"]
    if any(w in q for w in ["generate image", "create image", "draw", "make a picture"]):
        return core + TOOL_ROUTES["image"]
    if any(w in q for w in ["video", "youtube", "watch", "play video"]):
        return core + TOOL_ROUTES["video"]
    if any(w in q for w in ["calendar", "event", "appointment", "schedule"]):
        return core + TOOL_ROUTES["calendar"]
    if any(w in q for w in ["contact", "phonebook", "people", "address book"]):
        return core + TOOL_ROUTES["contacts"]
    if any(w in q for w in ["photo", "picture", "album"]):
        return core + TOOL_ROUTES["photos"]
    if any(w in q for w in ["doc", "google doc", "write doc"]):
        return core + TOOL_ROUTES["docs"]
    if any(w in q for w in ["sheet", "spreadsheet", "excel"]):
        return core + TOOL_ROUTES["sheets"]
    if any(w in q for w in ["slide", "presentation", "powerpoint"]):
        return core + TOOL_ROUTES["slides"]
    if any(w in q for w in ["google chat", "chat space", "chat message"]):
        return core + TOOL_ROUTES["chat"]
    if any(w in q for w in ["meet", "video call", "meeting", "conference"]):
        return core + TOOL_ROUTES["meet"]
    if any(w in q for w in ["fitness", "fit data", "health data", "step count"]):
        return core + TOOL_ROUTES["fit"]
    if any(w in q for w in ["classroom", "course", "class", "student"]):
        return core + TOOL_ROUTES["classroom"]
    # Default: minimal toolset (~20 tools, <1000 tokens)
    # Covers common general-purpose capabilities without the full 76-tool footprint
    return ["web", "file", "terminal", "browser", "delegation", "memory", "skills",
            "cronjob", "todo", "vision", "session_search", "tts", "code_execution", "swarm"]

# ── Google OAuth plugin ───────────────────────────────────────────────────────
from plugins.dashboard_auth.google import router as google_oauth_router
from plugins.dashboard_auth.google import init_db as init_google_db
from plugins.dashboard_auth.google import all_connected, GOOGLE_PLUGIN_IDS

# ── Dashboard API Endpoints ──────────────────────────────────────────────────


def _build_full_system_prompt(system_msg: str, context_files: dict, soul_content: str) -> str:
    """Build 3-tier system prompt like Hermes: SOUL + context files + caller's message."""
    parts = []

    # TIER 1: SOUL (agent identity/personality)
    if soul_content:
        parts.append(soul_content)

    # TIER 2: Context files (AGENTS.md, CLAUDE.md, .cursorrules, etc.)
    for name, content in context_files.items():
        if content and content.strip():
            parts.append(f"## Project Context: {name}\n\n{content}")

    # TIER 3: Caller's system message (from frontend)
    if system_msg:
        parts.append(system_msg)

    return "\n\n".join(p for p in parts if p)


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
memory_store = None
memory_manager = None
credential_pool = None
context_files = {}
soul_content = ""



# ── Lifespan ─────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    global session_db, _plugin_manager, _http_client, memory_store, memory_manager, credential_pool, context_files, soul_content

    logger.info("=" * 60)
    logger.info("  Zed Pro Backend starting on port %s", PORT)
    logger.info("  ZED_HOME: %s", ZED_HOME)
    logger.info("  Upstream: %s", FREELLMAPI_URL)
    logger.info("=" * 60)

    _http_client = httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=10.0))

    # Session DB
    session_db_path = ZED_HOME / "sessions.db"
    session_db = SessionDB(session_db_path)

    # ── Memory system (MEMORY.md + USER.md + external providers) ─────────────
    memory_store = None
    memory_manager = None
    try:
        from agent.memory_store import MemoryStore
        memory_store = MemoryStore(ZED_HOME)
        logger.info("Memory store initialized: %s", ZED_HOME)
    except Exception as e:
        logger.warning("Memory store init failed: %s", e)

    try:
        from agent.memory_manager import MemoryManager
        memory_manager = MemoryManager(zed_home=ZED_HOME)
        memory_manager.setup()
        logger.info("Memory manager initialized")
    except Exception as e:
        logger.warning("Memory manager init failed: %s", e)

    # ── Credential pool (multi-key rotation + failover) ─────────────────────
    credential_pool = None
    try:
        from agent.credential_pool import CredentialPool
        credential_pool = CredentialPool(zed_home=ZED_HOME)
        logger.info("Credential pool initialized")
    except Exception as e:
        logger.warning("Credential pool init failed: %s", e)

    # ── Context files (AGENTS.md, CLAUDE.md, .cursorrules) ──────────────────
    context_files = {}
    try:
        from agent.context_engine import load_context_files
        context_files = load_context_files(Path.cwd())
        logger.info("Loaded %d context files", len(context_files))
    except Exception as e:
        logger.warning("Context file loading failed: %s", e)

    # ── SOUL.md (agent identity/personality) ────────────────────────────────
    soul_content = ""
    try:
        soul_path = ZED_HOME / "SOUL.md"
        if soul_path.exists():
            soul_content = soul_path.read_text(encoding="utf-8")
            logger.info("Loaded SOUL.md: %d chars", len(soul_content))
        else:
            logger.info("No SOUL.md found at %s, using default identity", soul_path)
    except Exception as e:
        logger.warning("SOUL.md loading failed: %s", e)

    # Initialize Google OAuth plugin DB
    init_google_db(ZED_HOME / "connections.db")

    # Restore Google tokens from database
    try:
        from plugins.dashboard_auth.google import _restore_google_tokens
        _restore_google_tokens()
    except Exception as e:
        logger.warning("Failed to restore Google tokens: %s", e)

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
                try:
                    output_dir.mkdir(parents=True, exist_ok=True)
                except Exception as mkdir_err:
                    logger.error("Cron daemon: mkdir failed for %s: %s", output_dir, mkdir_err)
                    return

                try:
                    # Use full AIAgent (same as chat endpoint) — skills, memory, tools, 90 rounds
                    resolved = _llm_model if _llm_model.lower() not in ("auto", "zed-pro", "") else "gemini-2.5-flash-lite"

                    agent = AIAgent(
                        session_id=f"cron-{_job_id}",
                        session_db=session_db,
                        model=resolved,
                        quiet_mode=True,
                        verbose_logging=False,
                        base_url=os.environ.get("ZED_PRO_BASE_URL", "https://aios-lovat-two.vercel.app").rstrip("/"),
                        api_key=os.environ.get("ZED_PRO_API_KEY", os.environ.get("OPENAI_API_KEY", "no-key")),
                        credential_pool=credential_pool,
                    )

                    system_msg = _build_full_system_prompt(
                        "Execute this scheduled task accurately. Use available tools as needed.",
                        context_files, soul_content,
                    )

                    agent_result = agent.run_conversation(
                        user_message=_prompt,
                        system_message=system_msg,
                    )

                    if isinstance(agent_result, dict):
                        result = agent_result.get("final_response", str(agent_result))
                        status = "success" if result else "error"
                    else:
                        result = str(agent_result)
                        status = "success"
                except Exception as e:
                    result = f"Execution failed: {e}"
                    status = "error"

                # Save output — wrap in try/except so Render filesystem errors are logged
                output_file = output_dir / f"{_run_id}.json"
                try:
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
                    logger.info("Cron daemon: wrote output to %s", output_file)
                except Exception as write_err:
                    logger.error("Cron daemon: FAILED to write output to %s: %s", output_file, write_err)

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
                except Exception as state_err:
                    logger.error("Cron daemon: failed to update job state: %s", state_err)

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


@app.get("/api/debug/filesystem")
async def debug_filesystem():
    """Diagnostic: show what's actually on disk in ZED_HOME.
    Use this to verify whether output files are being written on Render.
    """
    def _walk(path: Path, depth: int = 0, max_depth: int = 3):
        if depth > max_depth or not path.exists():
            return []
        result = []
        try:
            for child in sorted(path.iterdir()):
                entry = {
                    "name": child.name,
                    "path": str(child),
                    "is_dir": child.is_dir(),
                }
                if child.is_file():
                    try:
                        entry["size_bytes"] = child.stat().st_size
                        entry["mtime"] = child.stat().st_mtime
                    except Exception:
                        pass
                if child.is_dir() and depth < max_depth:
                    entry["children"] = _walk(child, depth + 1, max_depth)
                result.append(entry)
        except PermissionError:
            pass
        return result

    # Also read last 3 output files from each cron job
    cron_output_root = ZED_HOME / "cron_output"
    recent_outputs = {}
    if cron_output_root.exists():
        for job_dir in sorted(cron_output_root.iterdir()):
            if job_dir.is_dir():
                files = sorted(job_dir.glob("*.json"), key=lambda x: x.stat().st_mtime, reverse=True)
                recent_outputs[job_dir.name] = []
                for f in files[:3]:
                    try:
                        recent_outputs[job_dir.name].append(json.loads(f.read_text(encoding="utf-8")))
                    except Exception as e:
                        recent_outputs[job_dir.name].append({"error": str(e), "file": f.name})

    return {
        "zed_home": str(ZED_HOME),
        "zed_home_exists": ZED_HOME.exists(),
        "zed_home_writable": os.access(ZED_HOME, os.W_OK) if ZED_HOME.exists() else False,
        "cron_output_exists": cron_output_root.exists(),
        "tree": _walk(ZED_HOME, max_depth=3),
        "recent_outputs": recent_outputs,
        "tmp_writable": os.access("/tmp", os.W_OK),
    }


@app.get("/api/debug/logs")
async def debug_logs():
    """Return the last 200 lines of the server log for diagnosing issues on Render."""
    log_file = ZED_HOME / "logs" / "server.log"
    # Try common log paths
    candidates = [
        log_file,
        ZED_HOME / "logs" / "zed.log",
        Path(__file__).resolve().parent / "logs" / "server.log",
    ]
    for candidate in candidates:
        if candidate.exists():
            try:
                lines = candidate.read_text(encoding="utf-8", errors="replace").splitlines()
                return {"log_file": str(candidate), "lines": lines[-200:], "total_lines": len(lines)}
            except Exception as e:
                return {"error": str(e), "log_file": str(candidate)}
    return {"error": "No log file found", "checked": [str(c) for c in candidates]}


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
    Always runs through the full AIAgent loop with tools, memory, skills,
    context files, and retry — same as Hermes. Falls back to direct proxy
    only if AIAgent initialization fails.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="No messages provided")

    # ── Always use AIAgent (unified path like Hermes) ────────────────────────
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
                    credential_pool=credential_pool,
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

                # Build full 3-tier system prompt (SOUL + context + memory)
                system_msg = _build_full_system_prompt(system_msg, context_files, soul_content)
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
                    elif event_type == "delegate_start":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"delegation": {"type": "delegate_start", "id": val.get("id", ""), "goal": val.get("goal", ""), "context": val.get("context", "")}}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "delegate_stream":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"delegation": {"type": "delegate_stream", "id": val.get("id", ""), "token": val.get("token", "")}}, "finish_reason": None}]
                        }
                        yield f"data: {json.dumps(chunk)}\n\n"
                    elif event_type == "delegate_complete":
                        chunk = {
                            "id": f"chatcmpl-{session_id}",
                            "object": "chat.completion.chunk",
                            "created": created_time,
                            "model": request.model or "zed-pro",
                            "choices": [{"index": 0, "delta": {"delegation": {"type": "delegate_complete", "id": val.get("id", ""), "result": val.get("result", "")}}, "finish_reason": None}]
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
                credential_pool=credential_pool,
            )
            user_msg_text = request.messages[-1].content
            history = []
            system_msg = None
            for m in request.messages[:-1]:
                if m.role == "system":
                    system_msg = m.content
                else:
                    history.append({"role": m.role, "content": m.content})
            system_msg = _build_full_system_prompt(system_msg, context_files, soul_content)
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
            logger.exception("Error in non-streaming AIAgent loop, trying fallback")
            # Fallback: retry with simpler model
            try:
                fallback_model = "gemini-2.5-flash-lite"
                fallback_agent = AIAgent(
                    session_id=session_id,
                    session_db=session_db,
                    model=fallback_model,
                    quiet_mode=True,
                    verbose_logging=False,
                    base_url=os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"),
                    api_key=os.getenv("ZED_PRO_API_KEY", ""),
                    credential_pool=credential_pool,
                )
                user_msg_text = request.messages[-1].content
                result = fallback_agent.run_conversation(user_message=user_msg_text)
                final_text = result.get("final_response", str(result))
                return {
                    "id": f"chatcmpl-{session_id}",
                    "object": "chat.completion",
                    "created": int(time.time()),
                    "model": fallback_model,
                    "choices": [{"index": 0, "message": {"role": "assistant", "content": final_text}, "finish_reason": "stop"}],
                    "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
                }
            except Exception as fallback_err:
                logger.exception("Fallback also failed")
                raise HTTPException(status_code=500, detail=f"Primary: {e}; Fallback: {fallback_err}")





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


@app.get("/api/sessions/search")
async def search_sessions(q: str = Query(..., min_length=1), limit: int = Query(20, le=100)):
    """Search sessions by query string. Must be before /{session_id} route."""
    if session_db is None:
        return {"sessions": [], "count": 0}
    try:
        if hasattr(session_db, 'search_sessions'):
            results = session_db.search_sessions(q, limit=limit)
        else:
            results = session_db.list_sessions_rich(limit=limit)
        return {"sessions": results, "count": len(results), "query": q}
    except Exception as e:
        logger.warning("search_sessions error: %s", e)
        return {"sessions": [], "count": 0, "error": str(e)}


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


@app.post("/api/tools/execute")
async def execute_tool_endpoint(request: Request):
    """Execute a tool by name and arguments. Used by cron scheduler and agents."""
    try:
        body = await request.json()
        tool_name = body.get("tool", "")
        tool_args = body.get("args", {})
        
        if not tool_name:
            return {"error": "tool name required"}
        
        # Import and use handle_function_call
        from model_tools import handle_function_call
        result = handle_function_call(
            function_name=tool_name,
            function_args=tool_args,
            task_id=body.get("task_id"),
        )
        return {"result": result}
    except Exception as e:
        logger.error("Tool execution error: %s", e)
        return {"error": str(e)}


# ── Priority 1: LLM Providers ────────────────────────────────────────────────
@app.get("/api/providers")
async def list_llm_providers():
    """List all available LLM providers (OpenAI, Anthropic, Gemini, etc.)."""
    try:
        from providers import list_providers
        providers = list_providers()
        result = []
        for p in providers:
            result.append({
                "id": p.name,
                "name": getattr(p, 'display_name', p.name),
                "requires_key": bool(getattr(p, 'api_key_env', None)),
                "supports_tools": getattr(p, 'supports_tools', True),
                "base_url": getattr(p, 'base_url', None),
            })
        return {"providers": result, "count": len(result)}
    except Exception as e:
        logger.warning("list_providers error: %s", e)
        return {"providers": [], "count": 0, "error": str(e)}


@app.get("/api/providers/{provider_name}")
async def get_llm_provider(provider_name: str):
    """Get details for a specific LLM provider."""
    try:
        from providers import get_provider_profile
        profile = get_provider_profile(provider_name)
        if not profile:
            raise HTTPException(status_code=404, detail=f"Provider '{provider_name}' not found")
        return {
            "id": profile.name,
            "name": getattr(profile, 'display_name', profile.name),
            "base_url": getattr(profile, 'base_url', None),
            "models": getattr(profile, 'models', []),
            "requires_key": bool(getattr(profile, 'api_key_env', None)),
            "api_key_env": getattr(profile, 'api_key_env', None),
            "supports_tools": getattr(profile, 'supports_tools', True),
            "supports_vision": getattr(profile, 'supports_vision', False),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Priority 3: Gmail Service (standalone fallback) ──────────────────────────
@app.get("/api/gmail/status")
async def gmail_status():
    """Check Gmail connection status via standalone gmail_service."""
    try:
        from gmail_service import gmail_service
        connected = gmail_service.is_connected("default")
        return {"connected": connected, "provider": "gmail_service"}
    except Exception as e:
        return {"connected": False, "error": str(e)}


@app.post("/api/gmail/send-direct")
async def gmail_send_direct(request: Request):
    """Send email via standalone gmail_service (fallback when OAuth plugin fails)."""
    try:
        from gmail_service import gmail_service
        body = await request.json()
        to = body.get("to", "")
        subject = body.get("subject", "")
        msg_body = body.get("body", "")
        if not to or not subject:
            raise HTTPException(400, "to and subject are required")
        result = gmail_service.send_email("default", to, subject, msg_body)
        return result
    except HTTPException:
        raise
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/gmail/list-direct")
async def gmail_list_direct(max_results: int = 10):
    """List emails via standalone gmail_service."""
    try:
        from gmail_service import gmail_service
        result = gmail_service.list_emails("default", max_results=max_results)
        return result
    except Exception as e:
        return {"error": str(e)}


# ── Priority 4: Gateway Status ───────────────────────────────────────────────
@app.get("/api/gateway/status")
async def gateway_status():
    """Show messaging gateway status and available platforms."""
    platforms = []
    gateway_dir = Path(__file__).resolve().parent / "gateway" / "platforms"
    if gateway_dir.exists():
        for f in sorted(gateway_dir.glob("*.py")):
            if f.name.startswith("_") or f.name == "base.py":
                continue
            platforms.append({
                "name": f.stem,
                "file": f.name,
                "status": "available",
            })
    # Check if gateway process is running
    import subprocess
    gateway_running = False
    try:
        result = subprocess.run(
            ["pgrep", "-f", "gateway.run"],
            capture_output=True, timeout=2
        )
        gateway_running = result.returncode == 0
    except Exception:
        pass
    return {
        "gateway_running": gateway_running,
        "platforms": platforms,
        "count": len(platforms),
    }


# ── Priority 5: Batch Runner ────────────────────────────────────────────────
_batch_jobs: Dict[str, Any] = {}

@app.post("/api/batch/run")
async def start_batch_run(request: Request):
    """Start a batch agent run on a JSONL dataset."""
    try:
        body = await request.json()
        dataset_file = body.get("dataset_file", "")
        run_name = body.get("run_name", f"batch-{int(time.time())}")
        max_workers = body.get("max_workers", 4)

        if not dataset_file:
            raise HTTPException(400, "dataset_file is required")

        import threading
        from batch_runner import BatchRunner

        job_id = f"batch-{uuid.uuid4().hex[:8]}"
        _batch_jobs[job_id] = {"status": "starting", "run_name": run_name, "started_at": time.time()}

        def _run_batch():
            try:
                _batch_jobs[job_id]["status"] = "running"
                runner = BatchRunner(
                    dataset_file=dataset_file,
                    run_name=run_name,
                    max_workers=max_workers,
                )
                runner.run()
                _batch_jobs[job_id]["status"] = "completed"
            except Exception as e:
                _batch_jobs[job_id]["status"] = "failed"
                _batch_jobs[job_id]["error"] = str(e)

        t = threading.Thread(target=_run_batch, daemon=True)
        t.start()

        return {"job_id": job_id, "status": "started", "run_name": run_name}
    except HTTPException:
        raise
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/batch/status")
async def batch_status():
    """List all batch run statuses."""
    return {"jobs": _batch_jobs, "count": len(_batch_jobs)}


@app.get("/api/batch/status/{job_id}")
async def batch_job_status(job_id: str):
    """Get status of a specific batch run."""
    job = _batch_jobs.get(job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return job


# ── Public API Tools (from public-api-lists) ────────────────────────────────────
# Fetches 775+ free public APIs across 48 categories and makes them callable as tools
_PUBLIC_API_LIST_URL = "https://public-api-lists.github.io/public-api-lists/api/all.json"
_public_api_cache: Optional[Dict[str, Any]] = None
_public_api_cache_time: float = 0
_PUBLIC_API_CACHE_TTL = 3600  # 1 hour


def _fetch_public_apis() -> Dict[str, Any]:
    """Fetch and cache the public API list."""
    global _public_api_cache, _public_api_cache_time
    now = time.time()
    if _public_api_cache and now - _public_api_cache_time < _PUBLIC_API_CACHE_TTL:
        return _public_api_cache
    try:
        resp = httpx.get(_PUBLIC_API_LIST_URL, timeout=10.0)
        if resp.status_code == 200:
            _public_api_cache = resp.json()
            _public_api_cache_time = now
            logger.info("Fetched %s public APIs from %s", 
                       _public_api_cache.get("count", 0), _PUBLIC_API_LIST_URL)
    except Exception as e:
        logger.warning("Failed to fetch public APIs: %s", e)
        _public_api_cache = {"count": 0, "entries": []}
    return _public_api_cache


def _get_public_apis_by_category(category: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get public APIs, optionally filtered by category."""
    data = _fetch_public_apis()
    entries = data.get("entries", [])
    if category:
        entries = [e for e in entries if e.get("category") == category]
    return entries


def _get_public_api_categories() -> List[str]:
    """Get all unique categories from public APIs."""
    data = _fetch_public_apis()
    entries = data.get("entries", [])
    categories = sorted(set(e.get("category") for e in entries if e.get("category")))
    return categories


@app.get("/api/public_apis")
async def list_public_apis(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(100, le=500, description="Max results")
):
    """List public APIs from public-api-lists, optionally filtered by category."""
    entries = _get_public_apis_by_category(category)
    if category:
        return {"apis": entries[:limit], "count": len(entries), "category": category}
    return {"apis": entries[:limit], "count": len(entries)}


@app.get("/api/public_apis/categories")
async def list_public_api_categories():
    """List all available public API categories."""
    categories = _get_public_api_categories()
    return {"categories": categories, "count": len(categories)}


# Curated mapping: API name (case-insensitive) -> actual API base URL with path
# Many entries in public-api-lists have docs URLs, not API endpoints
# These are verified working URLs where the base URL returns JSON, not HTML
_PUBLIC_API_BASE_URLS = {
    # Animals (no auth)
    "cat facts": "https://catfact.ninja/fact",
    "cataas": "https://cataas.com/api/cat",
    "cats": "https://api.thecatapi.com/v1/images/search",
    "dog api": "https://dogapi.dog/api/v2/facts",
    "dogs": "https://dog.ceo/api/breeds/list/all",
    "http dogs": "https://http.dog/200",
    "httpcat": "https://http.cat/200",
    "randomdog": "https://random.dog/woof.json",
    "randomfox": "https://randomfox.ca/floof/",
    # Anime (no auth)
    "anilist": "https://graphql.anilist.co",
    "jikan": "https://api.jikan.moe/v4",
    "mangadex": "https://api.mangadex.org",
    # Development (no auth)
    "github": "https://api.github.com",
    "gitlab": "https://gitlab.com/api/v4",
    "ipify": "https://api.ipify.org",
    "ipinfo": "https://ipinfo.io/json",
    "jsonbin.io": "https://api.jsonbin.io/v3",
    # Weather (no auth - openweathermap needs key)
    "openweathermap": "https://api.openweathermap.org/data/2.5",
    # News (needs API key)
    "newsapi": "https://newsapi.org/v2",
    # Currency (no auth)
    "coingecko": "https://api.coingecko.com/api/v3",
    "coinmarketcap": "https://pro-api.coinmarketcap.com/v1",
    "exchangerate-api": "https://v6.exchangerate-api.com/v6",
    "frankfurter": "https://api.frankfurter.app/latest",
    # Books (no auth)
    "open library": "https://openlibrary.org/api",
    # Calendar (no auth)
    "nager.date": "https://date.nager.at/api/v3/publicholidays",
    # Games (no auth)
    "rawg": "https://api.rawg.io/api",
    # Music (no auth)
    "lyrics.ovh": "https://api.lyrics.ovh/v1",
    # Social (no auth)
    "reddit": "https://www.reddit.com/r",
    # Shopping (no auth)
    "dummyjson": "https://dummyjson.com",
    # Test Data (no auth)
    "jsonplaceholder": "https://jsonplaceholder.typicode.com",
    "reqres": "https://reqres.in/api",
}


@app.post("/api/public_apis/call/{api_name}")
async def call_public_api(
    api_name: str,
    endpoint: Optional[str] = Query(None, description="API endpoint path (appended to base URL)"),
    method: str = Query("GET", description="HTTP method"),
    url: Optional[str] = Query(None, description="Full URL override (if docs URL is wrong)"),
    body: Optional[Dict[str, Any]] = Body(None, description="Request body for POST/PUT/PATCH")
):
    """Call a public API by name. Finds the API by name, resolves the base URL, and makes the request.
    
    The public-api-lists 'url' field often points to documentation, not the API endpoint.
    This endpoint uses a curated mapping for known APIs, or you can provide a full URL override.
    """
    # Find the API by name (case-insensitive)
    entries = _fetch_public_apis().get("entries", [])
    api = next((e for e in entries if e.get("name").lower() == api_name.lower()), None)
    if not api:
        raise HTTPException(status_code=404, detail=f"Public API '{api_name}' not found")
    
    # Resolve base URL: use override, then curated mapping, then docs URL as fallback
    # Curated mapping contains full API endpoints (e.g., https://catfact.ninja/fact)
    # Docs URLs are often documentation pages, not API endpoints
    if url:
        # User provided a full URL override — use it as-is
        full_url = url.rstrip("/")
    else:
        # Check curated mapping (case-insensitive)
        curated = _PUBLIC_API_BASE_URLS.get(api_name.lower())
        if curated:
            if endpoint:
                # User wants to append a sub-path to the curated base
                full_url = f"{curated.rstrip('/')}/{endpoint}"
            else:
                # Use the curated endpoint as-is (it's a complete API URL)
                full_url = curated
        else:
            # Fallback to the docs URL from the dataset (may not work as API)
            base_url = api.get("url", "").rstrip("/")
            full_url = f"{base_url}/{endpoint}" if endpoint else base_url
    
    # Make the HTTP request
    try:
        headers = {"Content-Type": "application/json"}
        kwargs = {"headers": headers, "timeout": 30.0, "follow_redirects": True}
        
        if method.upper() == "GET":
            resp = httpx.get(full_url, **kwargs)
        elif method.upper() == "POST":
            resp = httpx.post(full_url, json=body, **kwargs)
        elif method.upper() == "PUT":
            resp = httpx.put(full_url, json=body, **kwargs)
        elif method.upper() == "DELETE":
            resp = httpx.delete(full_url, **kwargs)
        elif method.upper() == "PATCH":
            resp = httpx.patch(full_url, json=body, **kwargs)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported method: {method}")
        
        # Parse response — handle non-JSON gracefully
        try:
            data = resp.json()
        except ValueError:
            data = resp.text[:5000]
        
        return {
            "api": api.get("name"),
            "url": full_url,
            "method": method,
            "status": resp.status_code,
            "data": data,
            "headers": dict(resp.headers)
        }
    except httpx.HTTPStatusError as e:
        try:
            error_data = e.response.json()
        except ValueError:
            error_data = e.response.text[:1000]
        return {
            "api": api.get("name"),
            "url": full_url,
            "method": method,
            "status": e.response.status_code,
            "error": str(e),
            "data": error_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Config ────────────────────────────────────────────────────────────────────
@app.get("/api/config")
async def get_config():
    """Return current agent config. Creates default if missing."""
    config_path = ZED_HOME / "config.yaml"
    default_config = {
        "model": "auto",
        "agent": {"max_iterations": 90},
        "memory": {"enabled": True},
        "compression": {"enabled": True},
    }
    try:
        import yaml
        if config_path.exists():
            with open(config_path) as f:
                config = yaml.safe_load(f) or default_config
        else:
            config = default_config
            # Create default config
            try:
                config_path.parent.mkdir(parents=True, exist_ok=True)
                with open(config_path, "w") as f:
                    yaml.dump(config, f, default_flow_style=False)
            except Exception:
                pass
        # Mask any API keys
        if "providers" in config:
            for p in config["providers"].values():
                if isinstance(p, dict) and "api_key" in p:
                    p["api_key"] = "***"
        return {"config": config, "config_path": str(config_path)}
    except Exception as e:
        return {"config": default_config, "config_path": str(config_path), "error": str(e)}


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

    # Get LLM config — use backend server which has tools
    llm_model = agent.get("model", "auto")
    # Normalize legacy model name
    if not llm_model or llm_model in ("Zed Pro", "zed-pro", ""):
        llm_model = "auto"
    llm_base_url = os.environ.get("LLM_BASE_URL", os.environ.get(
        "ZED_PRO_BASE_URL", "https://aios-lovat-two.vercel.app"))
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
            
            # Tool calling loop
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ]
            max_tool_rounds = 5
            result = "No response"
            status = "error"
            
            logger.info("Agent %s calling LLM at %s with model %s", agent_id, url, llm_model)
            
            for tool_round in range(max_tool_rounds):
                body = {
                    "model": llm_model,
                    "messages": messages,
                    "max_tokens": 4096,
                }
                resp = httpx.post(url, json=body, headers=headers, timeout=120.0)
                logger.info("Agent %s LLM response status: %s", agent_id, resp.status_code)
                
                if resp.status_code != 200:
                    error_text = resp.text[:500]
                    logger.error("Agent %s LLM error: %s %s", agent_id, resp.status_code, error_text)
                    result = f"LLM error {resp.status_code}: {error_text}"
                    status = "error"
                    break
                
                data = resp.json()
                choice = data.get("choices", [{}])[0]
                assistant_msg = choice.get("message", {})
                
                # If no tool calls, we're done
                if not assistant_msg.get("tool_calls"):
                    result = assistant_msg.get("content", "No response")
                    status = "success"
                    logger.info("Agent %s completed: %s", agent_id, result[:200])
                    break
                
                # Add assistant message with tool calls
                messages.append(assistant_msg)
                
                # Execute each tool call
                for tool_call in assistant_msg["tool_calls"]:
                    func = tool_call.get("function", {})
                    func_name = func.get("name", "")
                    func_args = json.loads(func.get("arguments", "{}"))
                    
                    # Call the backend's tool execution endpoint
                    try:
                        tool_resp = httpx.post(
                            f"{base_url.replace('/v1', '')}/api/tools/execute",
                            json={
                                "tool": func_name,
                                "args": func_args
                            },
                            headers={
                                "Authorization": f"Bearer {llm_api_key}",
                                "Content-Type": "application/json",
                            },
                            timeout=30.0,
                        )
                        tool_result = tool_resp.json() if tool_resp.status_code == 200 else {"error": f"Tool failed: {tool_resp.status_code}"}
                    except Exception as tool_err:
                        tool_result = {"error": str(tool_err)}
                    
                    # Add tool result to messages
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.get("id", ""),
                        "content": json.dumps(tool_result)
                    })
            
            else:
                # Max rounds reached
                result = "Max tool rounds reached"
                status = "error"
            
            logger.info("Agent %s completed with %d tool rounds", agent_id, tool_round + 1)

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
    """WebSocket for live agent events (tool calls, status, streaming, sub-agents)."""
    await websocket.accept()
    _ws_clients.append(websocket)
    logger.info("WebSocket client connected (%s total)", len(_ws_clients))
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            # Handle sub-agent commands from frontend
            if msg.get("type") == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
            elif msg.get("type") == "get_tools":
                from model_tools import get_tool_definitions
                tools = get_tool_definitions()
                tool_list = [{"name": t["function"]["name"], "description": t["function"].get("description", "")} for t in tools]
                await websocket.send_text(json.dumps({"type": "tools_list", "tools": tool_list}))
            elif msg.get("type") == "delegation_status":
                # Forward to active agent
                session_id = msg.get("session_id")
                if session_id and session_id in _active_agents:
                    agent = _active_agents[session_id]
                    try:
                        agent.request_delegation_status()
                    except Exception:
                        pass
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


# ── Computer Desktop Agent (proxy to standalone agent at port 8765) ─────────
DESKTOP_AGENT_URL = os.getenv("DESKTOP_AGENT_URL", "http://localhost:8765")

@app.post("/api/desktop/task")
async def desktop_task(request: Request):
    """Submit a task to the computer-use desktop agent."""
    try:
        body = await request.json()
        async with _http_client.post(f"{DESKTOP_AGENT_URL}/agent/inject", json=body, timeout=120.0) as resp:
            return Response(content=resp.content, status_code=resp.status_code, media_type="application/json")
    except Exception as e:
        return {"error": str(e), "hint": "Desktop agent not running. Start with: python desktop-agent/start_agent.py"}

@app.post("/api/desktop/execute")
async def desktop_execute(request: Request):
    """Execute a single action on the desktop agent."""
    try:
        body = await request.json()
        async with _http_client.post(f"{DESKTOP_AGENT_URL}/agent/execute", json=body, timeout=30.0) as resp:
            return Response(content=resp.content, status_code=resp.status_code, media_type="application/json")
    except Exception as e:
        return {"error": str(e), "hint": "Desktop agent not running"}

@app.get("/api/desktop/screen")
async def desktop_screen():
    """Get current desktop screenshot."""
    try:
        async with _http_client.get(f"{DESKTOP_AGENT_URL}/agent/screen", timeout=10.0) as resp:
            return Response(content=resp.content, status_code=resp.status_code, media_type="application/json")
    except Exception as e:
        return {"error": str(e), "hint": "Desktop agent not running"}

@app.get("/api/desktop/plan")
async def desktop_plan():
    """Get current task plan from desktop agent."""
    try:
        async with _http_client.get(f"{DESKTOP_AGENT_URL}/agent/plan", timeout=10.0) as resp:
            return Response(content=resp.content, status_code=resp.status_code, media_type="application/json")
    except Exception as e:
        return {"error": str(e), "hint": "Desktop agent not running"}

@app.get("/api/desktop/status")
async def desktop_status():
    """Check if desktop agent is running."""
    try:
        resp = await _http_client.get(f"{DESKTOP_AGENT_URL}/health", timeout=5.0)
        return {"running": resp.status_code == 200, "url": DESKTOP_AGENT_URL}
    except Exception:
        return {"running": False, "url": DESKTOP_AGENT_URL}


# ── Browser Server (proxy to KasmVNC server at port 3000) ───────────────────
BROWSER_SERVER_URL = os.getenv("BROWSER_SERVER_URL", "http://localhost:3000")

@app.get("/api/browser/status")
async def browser_status():
    """Check if browser server is running."""
    try:
        resp = await _http_client.get(f"{BROWSER_SERVER_URL}/health", timeout=5.0)
        return {"running": resp.status_code == 200, "url": BROWSER_SERVER_URL}
    except Exception:
        return {"running": False, "url": BROWSER_SERVER_URL}


# ── Tool Calling Fallback ───────────────────────────────────────────────────
@app.post("/api/chat/{session_id}/retry")
async def retry_chat(session_id: str, request: Request):
    """Retry a failed chat with fallback model."""
    try:
        body = await request.json()
        user_msg = body.get("message", "")
        fallback_model = body.get("fallback_model", "gemini-2.5-flash-lite")

        agent = AIAgent(
            session_id=session_id,
            session_db=session_db,
            model=fallback_model,
            quiet_mode=True,
            verbose_logging=False,
            base_url=os.getenv("ZED_PRO_BASE_URL", "https://server-llm-1.onrender.com/v1"),
            api_key=os.getenv("ZED_PRO_API_KEY", ""),
            credential_pool=credential_pool,
        )

        result = agent.run_conversation(user_message=user_msg)
        final_text = result.get("final_response", str(result))
        return {"response": final_text, "model": fallback_model, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── File Management ───────────────────────────────────────────────────────────
@app.get("/api/files")
async def list_directory(path: Optional[str] = None):
    """List directory contents."""
    target = Path(path) if path else ZED_HOME
    if not target.is_dir():
        raise HTTPException(status_code=400, detail="Path is not a directory")
    entries = []
    for child in sorted(target.iterdir()):
        try:
            st = child.stat()
            entries.append({
                "name": child.name,
                "path": str(child),
                "is_directory": child.is_dir(),
                "size": st.st_size if child.is_file() else None,
                "mtime": st.st_mtime,
            })
        except PermissionError:
            entries.append({"name": child.name, "path": str(child), "error": "permission denied"})
    return {"path": str(target), "entries": entries, "count": len(entries)}


@app.get("/api/files/{file_path:path}")
async def read_file(file_path: str):
    """Read a file's contents."""
    target = Path(file_path)
    if not target.exists():
        raise HTTPException(status_code=404, detail="File not found")
    if not target.is_file():
        raise HTTPException(status_code=400, detail="Path is not a file")
    try:
        content = target.read_text(encoding="utf-8", errors="replace")
        return {"path": str(target), "content": content, "size": target.stat().st_size}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/files/{file_path:path}")
async def write_file(file_path: str, request: Request):
    """Write content to a file."""
    body = await request.json()
    content = body.get("content", "")
    target = Path(file_path)
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        return {"ok": True, "path": str(target), "size": len(content.encode("utf-8"))}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/files/{file_path:path}")
async def delete_file(file_path: str):
    """Delete a file or directory."""
    target = Path(file_path)
    if not target.exists():
        raise HTTPException(status_code=404, detail="Path not found")
    try:
        if target.is_dir():
            shutil.rmtree(target)
        else:
            target.unlink()
        return {"ok": True, "path": str(target)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Git Integration ───────────────────────────────────────────────────────────
def _git_run(args: list, cwd: str = None) -> dict:
    """Run a git command and return result."""
    try:
        result = subprocess.run(
            ["git"] + args,
            capture_output=True, text=True, timeout=10,
            cwd=cwd or str(ZED_HOME),
        )
        return {"stdout": result.stdout.strip(), "stderr": result.stderr.strip(), "code": result.returncode}
    except Exception as e:
        return {"stdout": "", "stderr": str(e), "code": 1}


@app.get("/api/git/status")
async def git_status(path: Optional[str] = None):
    """Get git status for a repository."""
    cwd = path or str(ZED_HOME)
    result = _git_run(["status", "--porcelain"], cwd=cwd)
    return {"status": result["stdout"], "code": result["code"]}


@app.get("/api/git/log")
async def git_log(path: Optional[str] = None, limit: int = Query(20, le=100)):
    """Get git log entries."""
    cwd = path or str(ZED_HOME)
    result = _git_run(["log", f"--max-count={limit}", "--pretty=format:%H|%an|%ae|%ai|%s"], cwd=cwd)
    entries = []
    if result["code"] == 0 and result["stdout"]:
        for line in result["stdout"].splitlines():
            parts = line.split("|", 4)
            if len(parts) == 5:
                entries.append({
                    "hash": parts[0], "author": parts[1], "email": parts[2],
                    "date": parts[3], "message": parts[4],
                })
    return {"entries": entries, "count": len(entries)}


@app.get("/api/git/branches")
async def git_branches(path: Optional[str] = None):
    """List git branches."""
    cwd = path or str(ZED_HOME)
    result = _git_run(["branch", "-a"], cwd=cwd)
    branches = []
    current = None
    if result["code"] == 0:
        for line in result["stdout"].splitlines():
            line = line.strip()
            if line.startswith("* "):
                current = line[2:]
                branches.append(current)
            elif line:
                branches.append(line)
    return {"branches": branches, "current": current, "count": len(branches)}


@app.post("/api/git/commit")
async def git_commit(path: Optional[str] = None, request: Request = None):
    """Create a git commit."""
    body = await request.json() if request else {}
    message = body.get("message", "Dashboard commit")
    cwd = path or str(ZED_HOME)
    _git_run(["add", "-A"], cwd=cwd)
    result = _git_run(["commit", "-m", message], cwd=cwd)
    return {"stdout": result["stdout"], "code": result["code"]}


# ── Memory Providers ──────────────────────────────────────────────────────────
@app.get("/api/memory/providers")
async def list_memory_providers():
    """List available memory providers."""
    providers = []
    try:
        from agent.memory_manager import MemoryManager
        mgr = MemoryManager(zed_home=ZED_HOME)
        available = mgr.list_providers() if hasattr(mgr, 'list_providers') else []
        for p in available:
            providers.append({"name": p.get("name", str(p)), "status": "available"})
    except Exception:
        pass
    # Fallback: scan plugins/memory/ directory
    if not providers:
        mem_plugins_dir = Path(__file__).resolve().parent / "plugins" / "memory"
        if mem_plugins_dir.exists():
            for d in sorted(mem_plugins_dir.iterdir()):
                if d.is_dir() and not d.name.startswith("_"):
                    providers.append({"name": d.name, "status": "available"})
    return {"providers": providers, "count": len(providers)}


@app.post("/api/memory/providers/{name}/setup")
async def setup_memory_provider(name: str, request: Request):
    """Setup/configure a memory provider."""
    body = await request.json() if request else {}
    try:
        from agent.memory_manager import MemoryManager
        mgr = MemoryManager(zed_home=ZED_HOME)
        if hasattr(mgr, 'setup_provider'):
            mgr.setup_provider(name, config=body)
        return {"status": "configured", "provider": name}
    except Exception as e:
        return {"status": "error", "provider": name, "error": str(e)}


# ── Environment Variables ─────────────────────────────────────────────────────
_SECRET_PATTERNS = {"key", "token", "secret", "password", "auth", "credential", "api"}

def _mask_secret(key: str, value: str) -> str:
    """Mask a value if the key looks like a secret."""
    lower = key.lower()
    if any(p in lower for p in _SECRET_PATTERNS):
        if len(value) > 8:
            return value[:4] + "*" * (len(value) - 8) + value[-4:]
        return "****"
    return value


@app.get("/api/env")
async def list_env_vars():
    """List environment variables, masking secrets."""
    env_vars = {}
    for key, value in sorted(os.environ.items()):
        env_vars[key] = _mask_secret(key, value)
    return {"env": env_vars, "count": len(env_vars)}


@app.post("/api/env")
async def set_env_var(request: Request):
    """Set an environment variable."""
    body = await request.json()
    key = body.get("key", "").strip()
    value = body.get("value", "")
    if not key:
        raise HTTPException(status_code=400, detail="Key is required")
    os.environ[key] = value
    return {"ok": True, "key": key}


@app.delete("/api/env/{key}")
async def delete_env_var(key: str):
    """Delete an environment variable."""
    if key in os.environ:
        del os.environ[key]
        return {"ok": True, "key": key}
    raise HTTPException(status_code=404, detail=f"Env var '{key}' not found")


# ── Provider Validation ───────────────────────────────────────────────────────
@app.post("/api/providers/{name}/validate")
async def validate_provider(name: str):
    """Validate that a provider is reachable and has a valid key."""
    try:
        from providers import get_provider_profile
        profile = get_provider_profile(name)
        if not profile:
            return {"valid": False, "error": f"Provider '{name}' not found"}
        api_key_env = getattr(profile, 'api_key_env', None)
        if api_key_env and not os.environ.get(api_key_env):
            return {"valid": False, "error": f"Missing env var: {api_key_env}"}
        return {"valid": True, "provider": name}
    except Exception as e:
        return {"valid": False, "error": str(e)}


# ── Session Bulk Operations ───────────────────────────────────────────────────
@app.post("/api/sessions/bulk-delete")
async def bulk_delete_sessions(request: Request):
    """Delete multiple sessions at once."""
    body = await request.json()
    session_ids = body.get("session_ids", [])
    if not session_ids:
        raise HTTPException(status_code=400, detail="session_ids is required")
    deleted = 0
    for sid in session_ids:
        try:
            if session_db:
                session_db.delete_session(sid)
                deleted += 1
            _active_agents.pop(sid, None)
        except Exception:
            pass
    return {"deleted": deleted, "total": len(session_ids)}


@app.post("/api/sessions/empty/{session_id}")
async def empty_session(session_id: str):
    """Clear all messages from a session (keep the session shell)."""
    if session_db is None:
        raise HTTPException(status_code=503, detail="Session DB not ready")
    try:
        if hasattr(session_db, 'delete_messages'):
            session_db.delete_messages(session_id)
        return {"status": "emptied", "session_id": session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── MCP Server Management ─────────────────────────────────────────────────────
@app.get("/api/mcp/servers")
async def list_mcp_servers():
    """List configured MCP servers."""
    mcp_config = ZED_HOME / "mcp.json"
    servers = []
    if mcp_config.exists():
        try:
            data = json.loads(mcp_config.read_text(encoding="utf-8"))
            servers = data.get("mcpServers", data.get("servers", []))
            if isinstance(servers, dict):
                servers = [{"name": k, **v} for k, v in servers.items()]
        except Exception:
            pass
    return {"servers": servers, "count": len(servers)}


@app.post("/api/mcp/servers")
async def add_mcp_server(request: Request):
    """Add or update an MCP server configuration."""
    body = await request.json()
    name = body.get("name", "").strip()
    if not name:
        raise HTTPException(status_code=400, detail="Server name is required")
    mcp_config = ZED_HOME / "mcp.json"
    data = {}
    if mcp_config.exists():
        try:
            data = json.loads(mcp_config.read_text(encoding="utf-8"))
        except Exception:
            pass
    servers = data.get("mcpServers", data.get("servers", {}))
    if isinstance(servers, list):
        servers = {s.get("name", str(i)): s for i, s in enumerate(servers)}
    servers[name] = {k: v for k, v in body.items() if k != "name"}
    data["mcpServers"] = servers
    mcp_config.parent.mkdir(parents=True, exist_ok=True)
    mcp_config.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return {"ok": True, "name": name}


@app.delete("/api/mcp/servers/{name}")
async def remove_mcp_server(name: str):
    """Remove an MCP server configuration."""
    mcp_config = ZED_HOME / "mcp.json"
    if not mcp_config.exists():
        raise HTTPException(status_code=404, detail="No MCP config found")
    try:
        data = json.loads(mcp_config.read_text(encoding="utf-8"))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to read MCP config")
    servers = data.get("mcpServers", data.get("servers", {}))
    if isinstance(servers, list):
        servers = {s.get("name", str(i)): s for i, s in enumerate(servers)}
    if name not in servers:
        raise HTTPException(status_code=404, detail=f"MCP server '{name}' not found")
    del servers[name]
    data["mcpServers"] = servers
    mcp_config.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return {"ok": True, "deleted": name}


# ── System Stats ──────────────────────────────────────────────────────────────
@app.get("/api/system/stats")
async def system_stats():
    """Return system resource stats."""
    import platform
    stats = {
        "platform": platform.system(),
        "platform_release": platform.release(),
        "python_version": platform.python_version(),
        "pid": os.getpid(),
        "zed_home": str(ZED_HOME),
    }
    # Memory usage (best-effort)
    try:
        import resource
        usage = resource.getrusage(resource.RUSAGE_SELF)
        stats["memory_rss_mb"] = usage.ru_maxrss / 1024  # Linux: bytes -> MB
    except Exception:
        pass
    # Disk usage
    try:
        usage = shutil.disk_usage(str(ZED_HOME))
        stats["disk_total_gb"] = round(usage.total / (1024**3), 2)
        stats["disk_used_gb"] = round(usage.used / (1024**3), 2)
        stats["disk_free_gb"] = round(usage.free / (1024**3), 2)
    except Exception:
        pass
    # Session DB size
    try:
        db_path = ZED_HOME / "sessions.db"
        if db_path.exists():
            stats["session_db_size_mb"] = round(db_path.stat().st_size / (1024**2), 2)
    except Exception:
        pass
    # Active sessions count
    try:
        if session_db:
            sessions = session_db.list_sessions_rich(limit=500)
            stats["total_sessions"] = len(sessions)
            stats["active_sessions"] = sum(
                1 for s in sessions
                if s.get("ended_at") is None
                and (time.time() - s.get("last_active", s.get("started_at", 0))) < 300
            )
    except Exception:
        pass
    return stats


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
