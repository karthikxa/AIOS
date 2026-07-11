"""Skills store -- auto-discover SKILL.md files under ~/.zed/skills/.

Compact index (names + one-line descriptions) is cached to a JSON snapshot
file so the prompt stays small. Full skill content is loaded on demand via
``skill_view(name)`` and injected into the tool result (not the system prompt).
"""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

from .config import SKILLS_DIR, SKILLS_SNAPSHOT
from .threat_scanner import sanitize

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Frontmatter stripping (minimal -- just YAML between --- fences)
# ---------------------------------------------------------------------------

def _strip_frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return text
    end = text.find("\n---", 3)
    if end == -1:
        return text
    return text[end + 4:].lstrip("\n")


# ---------------------------------------------------------------------------
# Parse a single SKILL.md into (name, description, body)
# ---------------------------------------------------------------------------

def _parse_skill_file(path: Path) -> Optional[Dict[str, str]]:
    try:
        raw = path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return None
    if not raw.strip():
        return None
    # Threat scan before anything enters our index
    clean = sanitize(raw, str(path))
    # If blocked, skip this skill silently
    if clean.startswith("[BLOCKED"):
        logger.warning("Skill %s blocked by threat scanner, skipping", path)
        return None
    body = _strip_frontmatter(clean).strip()
    name = path.parent.name  # skill name = immediate parent dir name
    # First non-empty line after frontmatter as description (truncate to ~80 chars)
    desc = ""
    for line in body.splitlines():
        line = line.strip().lstrip("#").strip()
        if line:
            desc = line[:80]
            break
    return {"name": name, "description": desc, "path": str(path)}


# ---------------------------------------------------------------------------
# Scan skills directory
# ---------------------------------------------------------------------------

def scan_skills() -> List[Dict[str, str]]:
    """Walk ~/.zed/skills/ for SKILL.md files, return list of skill dicts."""
    if not SKILLS_DIR.is_dir():
        return []
    skills: List[Dict[str, str]] = []
    for root, _dirs, files in os.walk(SKILLS_DIR):
        for f in files:
            if f.lower() in ("skill.md", "readme.md"):
                entry = _parse_skill_file(Path(root) / f)
                if entry:
                    skills.append(entry)
    return skills


# ---------------------------------------------------------------------------
# Cache management (snapshot JSON)
# ---------------------------------------------------------------------------

def _load_snapshot() -> List[Dict[str, str]]:
    if SKILLS_SNAPSHOT.is_file():
        try:
            data = json.loads(SKILLS_SNAPSHOT.read_text(encoding="utf-8"))
            if isinstance(data, list):
                return data
        except Exception:
            pass
    return []


def save_snapshot(skills: List[Dict[str, str]]) -> None:
    try:
        SKILLS_SNAPSHOT.write_text(
            json.dumps(skills, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    except Exception as e:
        logger.warning("Failed to save skills snapshot: %s", e)


def get_skills_index() -> List[Dict[str, str]]:
    """Return cached skills index; rescan if stale or missing."""
    # Quick staleness check: re-scan if snapshot older than 60s or missing
    needs_scan = True
    if SKILLS_SNAPSHOT.is_file():
        try:
            stat = SKILLS_SNAPSHOT.stat()
            if (os.time() if hasattr(os, "time") else __import__("time").time()) - stat.st_mtime < 60:
                needs_scan = False
        except Exception:
            pass
    if needs_scan:
        skills = scan_skills()
        save_snapshot(skills)
        return skills
    return _load_snapshot()


def force_rescan() -> List[Dict[str, str]]:
    """Force a fresh scan and cache update."""
    skills = scan_skills()
    save_snapshot(skills)
    return skills


# ---------------------------------------------------------------------------
# skill_view -- load full content of a named skill
# ---------------------------------------------------------------------------

def skill_view(name: str) -> Optional[str]:
    """Read the full SKILL.md for *name*. Returns None if not found."""
    if not name:
        return None
    # Check index first for the path
    for skill in get_skills_index():
        if skill["name"].lower() == name.lower():
            p = Path(skill["path"])
            if p.is_file():
                raw = p.read_text(encoding="utf-8", errors="replace")
                return sanitize(raw, str(p))
            break
    # Fallback: walk looking for matching dir
    for root, dirs, files in os.walk(SKILLS_DIR):
        if Path(root).name.lower() == name.lower():
            for f in ("SKILL.md", "skill.md", "README.md", "readme.md"):
                p = Path(root) / f
                if p.is_file():
                    raw = p.read_text(encoding="utf-8", errors="replace")
                    return sanitize(raw, str(p))
            break
    return None
