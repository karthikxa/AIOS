"""System prompt assembly -- 8-layer, token-efficient.

Mirrors the Hermes prompt_builder approach: compact identity, terse guidance,
skills as names-only, memory as flat list. Total prompt guidance is ~25 lines,
not 100+. Every context file is threat-scanned and capped at 20K chars.

Layers (injected in this order):
  1. Identity (2-3 sentences)
  2. SOUL.md (user personality file, optional)
  3. .zed.md (project context, optional)
  4. AGENTS.md (agent rules, optional)
  5. Memory block (flat list of facts)
  6. Skills index (names + one-line desc only)
  7. Guidance (merged: memory+tools+completion+parallel ≈ 20 lines)
  8. Environment hint (OS, cwd, one line)
"""

from __future__ import annotations

import logging
import os
import platform
from pathlib import Path
from typing import List, Optional

from .config import (
    AGENTS_MD,
    CONTEXT_FILE_MAX_CHARS,
    HEAD_RATIO,
    SOUL_MD,
    TAIL_RATIO,
    ZED_HOME,
)
from . import memory_store
from . import skills_store
from .threat_scanner import sanitize

logger = logging.getLogger(__name__)


# =========================================================================
# Constants -- all kept SHORT for low token cost
# =========================================================================

IDENTITY = (
    "You are Zed Pro, an autonomous AI agent by Zed Team. "
    "You are helpful, direct, and tool-capable. "
    "You take action via your tools instead of describing what you would do."
)

GUIDANCE = (
    "# Operating rules\n"
    "- Use tools to act -- never just describe intended actions.\n"
    "- Keep working until the task is actually complete, verified by tool output.\n"
    "- Never fabricate output (made-up data, fake file contents, invented API results).\n"
    "- If a tool/install fails, say so and try an alternative or ask the user.\n"
    "- Batch independent reads/searches/lookups into one response.\n"
    "- Save durable facts (preferences, conventions, environment) to memory.\n"
    "  Do NOT save task progress, session outcomes, PR numbers, or stale artifacts.\n"
    "  Write memories as declarative facts, not instructions to yourself.\n"
    "- After complex tasks (5+ tool calls), save reusable workflows as skills.\n"
    "- Deliver working artifacts backed by real execution, not descriptions of plans."
)


# =========================================================================
# File loaders -- each returns empty string if file missing
# =========================================================================

def _load_file(path: Path, label: str) -> str:
    """Read and sanitize a context file, capped at CONTEXT_FILE_MAX_CHARS."""
    if not path.is_file():
        return ""
    try:
        raw = path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""
    if not raw.strip():
        return ""
    clean = sanitize(raw, label)
    return _truncate(clean, CONTEXT_FILE_MAX_CHARS)


def _truncate(text: str, max_chars: int) -> str:
    if len(text) <= max_chars:
        return text
    head = int(max_chars * HEAD_RATIO)
    tail = int(max_chars * TAIL_RATIO)
    mid = max_chars - head - tail
    return (
        text[:head]
        + f"\n\n... [{len(text)} total chars, {mid} chars omitted] ...\n\n"
        + text[-tail:]
    )


def _find_zed_md(cwd: Optional[str] = None) -> Optional[Path]:
    """Find nearest .zed.md walking up from cwd."""
    start = Path(cwd or os.getcwd()).resolve()
    for d in [start, *start.parents]:
        for name in (".zed.md", "ZED.md"):
            p = d / name
            if p.is_file():
                return p
        if (d / ".git").is_dir():
            break
    return None


# =========================================================================
# 8-layer assembly
# =========================================================================

def build_system_prompt(cwd: Optional[str] = None) -> str:
    """Assemble the full system prompt. Returns the complete string."""
    layers: List[str] = []

    # Layer 1: Identity
    layers.append(IDENTITY)

    # Layer 2: SOUL.md (optional personality/config)
    soul = _load_file(SOUL_MD, "SOUL.md")
    if soul:
        layers.append(f"<soul>\n{soul}\n</soul>")

    # Layer 3: .zed.md (optional project context)
    zed_md_path = _find_zed_md(cwd)
    if zed_md_path:
        zed = _load_file(zed_md_path, str(zed_md_path))
        if zed:
            layers.append(f"<project>\n{zed}\n</project>")

    # Layer 4: AGENTS.md (optional agent rules)
    agents = _load_file(AGENTS_MD, "AGENTS.md")
    if agents:
        layers.append(f"<agents>\n{agents}\n</agents>")

    # Layer 5: Memory
    mem_block = memory_store.format_memories_block()
    if mem_block:
        layers.append(mem_block)

    # Layer 6: Skills index (names + one-line descriptions only)
    skills = skills_store.get_skills_index()
    if skills:
        skill_lines = [f"  {s['name']}: {s['description']}" for s in skills]
        layers.append(
            "<available_skills>\n"
            + "Load full instructions with skill_view(name='...')\n"
            + "\n".join(skill_lines)
            + "\n</available_skills>"
        )

    # Layer 7: Guidance (merged, ~10 lines)
    layers.append(GUIDANCE)

    # Layer 8: Environment hint (single line)
    env = f"OS={platform.system()} CWD={cwd or os.getcwd()} Home={Path.home()}"
    layers.append(f"<env>{env}</env>")

    return "\n\n".join(layers)
