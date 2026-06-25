"""Persistent memory + session history, both in SQLite under ~/.hermes.

Two tables, two databases (so memory and session storage can be backed up /
cleared independently):

  memory.db   — `memories` (id, content, created_at)
  sessions.db — `sessions` (id, title, created_at, updated_at)
                 `messages` (id, session_id, role, content, tool_calls_json,
                             created_at)

The agent injects every memory into the system prompt on each turn, and
reloads the last N messages of the current session so multi-turn context
survives a browser refresh.
"""

from __future__ import annotations

import json
import sqlite3
import threading
import time
import uuid
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Dict, Iterator, List, Optional

from .config import (
    CONTEXT_MESSAGES_LOAD,
    MEMORY_DB,
    SESSIONS_DB,
)


# SQLite connection objects can't be shared across threads without
# check_same_thread=False, and even then writes must be serialised. A single
# process-global lock per DB keeps things simple and correct for the
# FastAPI/uvicorn single-worker case this server runs in.
_memory_lock = threading.Lock()
_sessions_lock = threading.Lock()


# ──────────────────────────────────────────────────────────────────────────────
#  Connection helpers
# ──────────────────────────────────────────────────────────────────────────────

@contextmanager
def _memory_conn() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(str(MEMORY_DB), timeout=10.0)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


@contextmanager
def _sessions_conn() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(str(SESSIONS_DB), timeout=10.0)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_dbs() -> None:
    """Create tables if they don't exist. Idempotent."""
    with _memory_lock, _memory_conn() as c:
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS memories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
    with _sessions_lock, _sessions_conn() as c:
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL DEFAULT 'New Chat',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL DEFAULT '',
                tool_calls_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
            )
            """
        )
        c.execute(
            "CREATE INDEX IF NOT EXISTS idx_messages_session "
            "ON messages(session_id, id)"
        )


# ──────────────────────────────────────────────────────────────────────────────
#  Memories
# ──────────────────────────────────────────────────────────────────────────────

def save_memory(content: str) -> int:
    """Insert a memory, return its new id."""
    content = (content or "").strip()
    if not content:
        return -1
    with _memory_lock, _memory_conn() as c:
        cur = c.execute(
            "INSERT INTO memories (content) VALUES (?)", (content,)
        )
        return int(cur.lastrowid)


def delete_memory(memory_id: int) -> bool:
    with _memory_lock, _memory_conn() as c:
        cur = c.execute("DELETE FROM memories WHERE id = ?", (int(memory_id),))
        return cur.rowcount > 0


def list_memories() -> List[Dict[str, Any]]:
    """Return all memories, newest first."""
    with _memory_lock, _memory_conn() as c:
        rows = c.execute(
            "SELECT id, content, created_at FROM memories ORDER BY id DESC"
        ).fetchall()
    return [
        {"id": r["id"], "content": r["content"], "created_at": r["created_at"]}
        for r in rows
    ]


def format_memories_block() -> str:
    """Render all memories as the <memory> block injected into the prompt."""
    mems = list_memories()
    if not mems:
        return ""
    lines = ["<memory>"]
    for m in mems:
        lines.append(f"- [{m['id']}] {m['content']}")
    lines.append("</memory>")
    return "\n".join(lines)


# ──────────────────────────────────────────────────────────────────────────────
#  Sessions + messages
# ──────────────────────────────────────────────────────────────────────────────

def _new_session_id() -> str:
    return uuid.uuid4().hex[:16]


def create_session(title: str = "New Chat") -> str:
    sid = _new_session_id()
    with _sessions_lock, _sessions_conn() as c:
        c.execute(
            "INSERT INTO sessions (id, title) VALUES (?, ?)", (sid, title)
        )
    return sid


def ensure_session(session_id: Optional[str], title: str = "New Chat") -> str:
    """Return a valid session id, creating one if None or unknown."""
    if session_id:
        with _sessions_lock, _sessions_conn() as c:
            row = c.execute(
                "SELECT id FROM sessions WHERE id = ?", (session_id,)
            ).fetchone()
        if row:
            return session_id
    return create_session(title)


def list_sessions(limit: int = 100) -> List[Dict[str, Any]]:
    with _sessions_lock, _sessions_conn() as c:
        rows = c.execute(
            "SELECT id, title, created_at, updated_at "
            "FROM sessions ORDER BY updated_at DESC LIMIT ?",
            (int(limit),),
        ).fetchall()
    return [dict(r) for r in rows]


def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    with _sessions_lock, _sessions_conn() as c:
        sess = c.execute(
            "SELECT id, title, created_at, updated_at FROM sessions WHERE id = ?",
            (session_id,),
        ).fetchone()
        if not sess:
            return None
        msgs = c.execute(
            "SELECT role, content, tool_calls_json, created_at "
            "FROM messages WHERE session_id = ? ORDER BY id ASC",
            (session_id,),
        ).fetchall()
    messages = []
    for m in msgs:
        tc = None
        if m["tool_calls_json"]:
            try:
                tc = json.loads(m["tool_calls_json"])
            except Exception:
                tc = None
        messages.append(
            {"role": m["role"], "content": m["content"], "tool_calls": tc}
        )
    out = dict(sess)
    out["messages"] = messages
    return out


def rename_session(session_id: str, title: str) -> bool:
    with _sessions_lock, _sessions_conn() as c:
        cur = c.execute(
            "UPDATE sessions SET title = ?, updated_at = ? WHERE id = ?",
            (title, int(time.time()), session_id),
        )
        return cur.rowcount > 0


def delete_session(session_id: str) -> bool:
    with _sessions_lock, _sessions_conn() as c:
        c.execute("DELETE FROM messages WHERE session_id = ?", (session_id,))
        cur = c.execute("DELETE FROM sessions WHERE id = ?", (session_id,))
        return cur.rowcount > 0


def append_message(
    session_id: str,
    role: str,
    content: str,
    tool_calls: Optional[List[Dict[str, Any]]] = None,
) -> int:
    """Persist one message + bump the session's updated_at. Returns row id."""
    tc_json = json.dumps(tool_calls) if tool_calls else None
    with _sessions_lock, _sessions_conn() as c:
        # Auto-create the session row if the agent is using a brand-new id.
        exists = c.execute(
            "SELECT 1 FROM sessions WHERE id = ?", (session_id,)
        ).fetchone()
        if not exists:
            title = (content or "New Chat")[:40].replace("\n", " ").strip()
            c.execute(
                "INSERT INTO sessions (id, title, updated_at) VALUES (?, ?, ?)",
                (session_id, title or "New Chat", int(time.time())),
            )
        cur = c.execute(
            "INSERT INTO messages (session_id, role, content, tool_calls_json) "
            "VALUES (?, ?, ?, ?)",
            (session_id, role, content, tc_json),
        )
        c.execute(
            "UPDATE sessions SET updated_at = ? WHERE id = ?",
            (int(time.time()), session_id),
        )
        return int(cur.lastrowid)


def load_recent_messages(
    session_id: str, limit: int = CONTEXT_MESSAGES_LOAD
) -> List[Dict[str, Any]]:
    """Return the last N messages of a session as plain chat dicts."""
    with _sessions_lock, _sessions_conn() as c:
        rows = c.execute(
            "SELECT role, content, tool_calls_json FROM messages "
            "WHERE session_id = ? ORDER BY id DESC LIMIT ?",
            (session_id, int(limit)),
        ).fetchall()
    out: List[Dict[str, Any]] = []
    for r in reversed(rows):  # DB gave newest-first; flip to chronological
        msg: Dict[str, Any] = {"role": r["role"], "content": r["content"] or ""}
        if r["tool_calls_json"]:
            try:
                msg["tool_calls"] = json.loads(r["tool_calls_json"])
            except Exception:
                pass
        out.append(msg)
    return out


# Run schema creation on import so the very first request is never blocked
# by a missing-table error.
init_dbs()
