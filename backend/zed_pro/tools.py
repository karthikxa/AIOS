"""Tool definitions + executors for the Zed Pro agent loop.

8 tools in OpenAI function-calling schema format, each with a matching
executor that returns a string result. The conversation_loop dispatches by
function name.

Tools: web_search, read_file, write_file, execute_code, terminal_command,
       save_memory, delete_memory, list_memories, skill_view
"""

from __future__ import annotations

import json
import logging
import os
import subprocess
import tempfile
import urllib.parse
from pathlib import Path
from typing import Any, Dict, List, Optional

import httpx

from .config import TOOL_TIMEOUT_SEC
from . import memory_store
from . import skills_store

logger = logging.getLogger(__name__)


# =========================================================================
# Tool schemas (OpenAI function-calling format)
# =========================================================================

TOOL_SCHEMAS: List[Dict[str, Any]] = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Search the web using DuckDuckGo. Returns titles and snippet text.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query string",
                    }
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read a file's contents. Returns up to 2000 lines.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Absolute path to the file",
                    },
                    "offset": {
                        "type": "integer",
                        "description": "Line number to start from (0-based)",
                        "default": 0,
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Max lines to read",
                        "default": 500,
                    },
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Write content to a file. Creates parent dirs. Overwrites if exists.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Absolute path to the file",
                    },
                    "content": {
                        "type": "string",
                        "description": "Content to write",
                    },
                },
                "required": ["path", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "execute_code",
            "description": "Execute Python code in a subprocess. Returns stdout/stderr.",
            "parameters": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": "Python code to execute",
                    },
                    "cwd": {
                        "type": "string",
                        "description": "Working directory (defaults to user home)",
                    },
                },
                "required": ["code"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "terminal_command",
            "description": "Run a shell command via cmd.exe/PowerShell. Returns stdout+stderr.",
            "parameters": {
                "type": "object",
                "properties": {
                    "command": {
                        "type": "string",
                        "description": "Shell command to execute",
                    },
                    "cwd": {
                        "type": "string",
                        "description": "Working directory",
                    },
                    "timeout": {
                        "type": "integer",
                        "description": "Timeout in seconds (default 30)",
                        "default": 30,
                    },
                },
                "required": ["command"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "save_memory",
            "description": "Save a persistent memory (fact, preference, convention) for future sessions.",
            "parameters": {
                "type": "object",
                "properties": {
                    "content": {
                        "type": "string",
                        "description": "Memory text (declarative fact, not an instruction)",
                    },
                },
                "required": ["content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "delete_memory",
            "description": "Delete a memory by its ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "memory_id": {
                        "type": "integer",
                        "description": "The memory ID to delete",
                    },
                },
                "required": ["memory_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_memories",
            "description": "List all saved memories with their IDs.",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "skill_view",
            "description": "Load a skill's full instructions by name.",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Skill name (case-insensitive)",
                    },
                },
                "required": ["name"],
            },
        },
    },
]


# =========================================================================
# Executors -- one function per tool, returns a string
# =========================================================================

async def exec_web_search(arguments: Dict[str, Any]) -> str:
    query = arguments.get("query", "")
    if not query:
        return "Error: no query provided."
    try:
        # DuckDuckGo lite HTML endpoint (no API key needed)
        params = urllib.parse.urlencode({"q": query})
        url = f"https://lite.duckduckgo.com/lite/?{params}"
        async with httpx.AsyncClient(timeout=TOOL_TIMEOUT_SEC) as client:
            resp = await client.get(url, follow_redirects=True)
            resp.raise_for_status()
        # Parse the lite HTML: results are in <a class="result-link">
        text = resp.text
        results = []
        # Simple regex extraction from lite DDG
        import re
        # Extract result snippets between <td class="result-snippet">
        snippets = re.findall(
            r'<a[^>]*class="result-link"[^>]*>(.*?)</a>.*?<td[^>]*class="result-snippet"[^>]*>(.*?)</td>',
            text, re.DOTALL | re.I,
        )
        if snippets:
            for title, snippet in snippets[:8]:
                clean_t = re.sub(r"<[^>]+>", "", title).strip()
                clean_s = re.sub(r"<[^>]+>", "", snippet).strip()
                results.append(f"- {clean_t}\n  {clean_s}")
            return "\n".join(results) if results else "No results found."
        else:
            # Fallback: just return cleaned text (first 3000 chars)
            clean = re.sub(r"<[^>]+>", " ", text)
            clean = re.sub(r"\s+", " ", clean).strip()
            return clean[:3000] or "No results found."
    except Exception as e:
        return f"Search error: {e}"


async def exec_read_file(arguments: Dict[str, Any]) -> str:
    path = arguments.get("path", "")
    if not path:
        return "Error: no path provided."
    p = Path(path)
    if not p.is_file():
        return f"Error: file not found: {path}"
    try:
        offset = arguments.get("offset", 0)
        limit = arguments.get("limit", 500)
        lines = p.read_text(encoding="utf-8", errors="replace").splitlines()
        chunk = lines[offset: offset + limit]
        # Show line numbers like cat -n
        numbered = [f"{offset + i + 1}\t{line}" for i, line in enumerate(chunk)]
        total = len(lines)
        shown = len(numbered)
        suffix = f"\n({shown}/{total} lines shown)" if shown < total else ""
        return "\n".join(numbered) + suffix
    except Exception as e:
        return f"Error reading file: {e}"


async def exec_write_file(arguments: Dict[str, Any]) -> str:
    path = arguments.get("path", "")
    content = arguments.get("content", "")
    if not path:
        return "Error: no path provided."
    p = Path(path)
    try:
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding="utf-8")
        lines = content.count("\n") + (1 if content and not content.endswith("\n") else 0)
        return f"Wrote {lines} lines to {path}"
    except Exception as e:
        return f"Error writing file: {e}"


async def exec_execute_code(arguments: Dict[str, Any]) -> str:
    code = arguments.get("code", "")
    if not code:
        return "Error: no code provided."
    cwd = arguments.get("cwd") or str(Path.home())
    try:
        result = subprocess.run(
            ["python", "-c", code],
            capture_output=True, text=True,
            timeout=TOOL_TIMEOUT_SEC, cwd=cwd,
            shell=False,
        )
        out = []
        if result.stdout:
            out.append(result.stdout.rstrip())
        if result.stderr:
            out.append(f"[stderr]\n{result.stderr.rstrip()}")
        if result.returncode != 0:
            out.append(f"[exit code {result.returncode}]")
        return "\n".join(out) if out else "(no output)"
    except subprocess.TimeoutExpired:
        return f"Code execution timed out after {TOOL_TIMEOUT_SEC}s"
    except Exception as e:
        return f"Error: {e}"


async def exec_terminal_command(arguments: Dict[str, Any]) -> str:
    command = arguments.get("command", "")
    if not command:
        return "Error: no command provided."
    cwd = arguments.get("cwd") or str(Path.home())
    timeout = arguments.get("timeout", TOOL_TIMEOUT_SEC)
    try:
        # On Windows use cmd.exe /c
        result = subprocess.run(
            ["cmd.exe", "/c", command],
            capture_output=True, text=True,
            timeout=timeout, cwd=cwd,
            shell=False,
        )
        out = []
        if result.stdout:
            out.append(result.stdout.rstrip())
        if result.stderr:
            out.append(f"[stderr]\n{result.stderr.rstrip()}")
        if result.returncode != 0:
            out.append(f"[exit code {result.returncode}]")
        return "\n".join(out) if out else "(no output)"
    except subprocess.TimeoutExpired:
        return f"Command timed out after {timeout}s"
    except Exception as e:
        return f"Error: {e}"


async def exec_save_memory(arguments: Dict[str, Any]) -> str:
    content = arguments.get("content", "")
    if not content.strip():
        return "Error: empty memory content."
    mid = memory_store.save_memory(content.strip())
    return f"Saved memory #{mid}"


async def exec_delete_memory(arguments: Dict[str, Any]) -> str:
    mid = arguments.get("memory_id")
    if mid is None:
        return "Error: no memory_id provided."
    ok = memory_store.delete_memory(int(mid))
    return f"Deleted memory #{mid}" if ok else f"Memory #{mid} not found."


async def exec_list_memories(arguments: Dict[str, Any]) -> str:
    mems = memory_store.list_memories()
    if not mems:
        return "No memories saved."
    lines = []
    for m in mems:
        lines.append(f"[{m['id']}] {m['content']}")
    return "\n".join(lines)


async def exec_skill_view(arguments: Dict[str, Any]) -> str:
    name = arguments.get("name", "")
    if not name:
        return "Error: no skill name provided."
    content = skills_store.skill_view(name)
    if content is None:
        return f"Skill '{name}' not found. Use list_memories or check ~/.hermes/skills/"
    # Truncate very long skill files to avoid bloating the context
    if len(content) > 8000:
        content = content[:8000] + "\n\n[... truncated, " + str(len(content)) + " total chars]"
    return content


# =========================================================================
# Dispatch table
# =========================================================================

EXECUTORS: Dict[str, Any] = {
    "web_search": exec_web_search,
    "read_file": exec_read_file,
    "write_file": exec_write_file,
    "execute_code": exec_execute_code,
    "terminal_command": exec_terminal_command,
    "save_memory": exec_save_memory,
    "delete_memory": exec_delete_memory,
    "list_memories": exec_list_memories,
    "skill_view": exec_skill_view,
}


async def execute_tool(name: str, arguments: Dict[str, Any]) -> str:
    """Dispatch a tool call to its executor. Returns string result."""
    fn = EXECUTORS.get(name)
    if fn is None:
        return f"Unknown tool: {name}"
    try:
        return await fn(arguments)
    except Exception as e:
        logger.exception("Tool %s failed", name)
        return f"Tool error ({name}): {e}"
