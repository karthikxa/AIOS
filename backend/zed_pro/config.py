"""Central configuration for the Zed Pro agent.

All paths resolve to ``C:\\Users\\<user>\\.zed`` (the established Zed home
on this machine) unless the ``ZED_HOME`` env var overrides it. This matches
the existing zed-agent server, which uses the same folder for sessions,
memories, and skills.
"""

from __future__ import annotations

import os
from pathlib import Path

# ── Zed home ──────────────────────────────────────────────────────────────────
# Mirrors server.py's resolution: ZED_HOME env var, else ~/.zed.
ZED_HOME: Path = Path(os.environ.get("ZED_HOME", str(Path.home() / ".zed")))
ZED_HOME.mkdir(parents=True, exist_ok=True)

# ── File locations ────────────────────────────────────────────────────────────
SOUL_MD: Path = ZED_HOME / "SOUL.md"
AGENTS_MD: Path = ZED_HOME / "AGENTS.md"            # global agent rules
MEMORY_DB: Path = ZED_HOME / "memory.db"            # persistent memories
SESSIONS_DB: Path = ZED_HOME / "sessions.db"        # conversation history
SKILLS_DIR: Path = ZED_HOME / "skills"              # auto-discovered skills
SKILLS_SNAPSHOT: Path = ZED_HOME / ".zed_pro_skills_snapshot.json"
SESSIONS_DIR: Path = ZED_HOME / "sessions"          # (reserved for per-session exports)
SESSIONS_DIR.mkdir(parents=True, exist_ok=True)

# ── Upstream LLM ──────────────────────────────────────────────────────────────
# freellmapi loopback no-auth port (same one server.py talks to).
FREELLMAPI_BASE_URL: str = os.environ.get(
    "ZED_PRO_BASE_URL", "https://server-llm-1-0r64.onrender.com/v1"
)
FREELLMAPI_API_KEY: str = os.environ.get("ZED_PRO_API_KEY", "no-auth")
# Default model the router will pick when the request says "auto" / "zed-pro".
DEFAULT_MODEL: str = os.environ.get("ZED_PRO_MODEL", "auto")

# ── Loop limits ───────────────────────────────────────────────────────────────
MAX_ITERATIONS: int = int(os.environ.get("ZED_PRO_MAX_ITERATIONS", "15"))
TOOL_TIMEOUT_SEC: int = int(os.environ.get("ZED_PRO_TOOL_TIMEOUT", "30"))
CONTEXT_MESSAGES_LOAD: int = 20   # how many past messages to reload per turn

# ── Prompt limits ─────────────────────────────────────────────────────────────
CONTEXT_FILE_MAX_CHARS: int = int(
    os.environ.get("ZED_PRO_CONTEXT_FILE_MAX_CHARS", "20000")
)
HEAD_RATIO: float = 0.7
TAIL_RATIO: float = 0.2


def ensure_dirs() -> None:
    """Create every directory the agent needs. Safe to call repeatedly."""
    for p in (ZED_HOME, SESSIONS_DIR):
        p.mkdir(parents=True, exist_ok=True)
    SKILLS_DIR.mkdir(parents=True, exist_ok=True)


ensure_dirs()
