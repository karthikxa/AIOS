"""
Desktop Agent API — Service 2 (Agent-API Orchestrator)
======================================================
Runs the autonomous agent loop using the configured LLM.
Translates LLM tool calls into Chromium CDP commands and proxies them
securely to Service 1 (vnc-desktop).
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import time
import base64
import hashlib
from typing import Any, Optional
from contextlib import asynccontextmanager

import aiohttp
import websockets
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, StreamingResponse, Response, HTMLResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("agent")

# ── Config from environment ──
DESKTOP_URL = os.environ.get("DESKTOP_URL", "https://browser-server-1.onrender.com").rstrip("/")
AGENT_SECRET = os.environ.get("AGENT_SECRET", "")
LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "auto")
LLM_BASE = os.environ.get("LLM_BASE_URL", "https://server-llm-1.onrender.com/v1").rstrip("/")

CDP_HTTP = f"{DESKTOP_URL}/cdp"
SECRET_HEADERS = {"X-Agent-Secret": AGENT_SECRET} if AGENT_SECRET else {}

clients: list[WebSocket] = []
active_task: Optional[asyncio.Task] = None

log.info("Desktop URL : %s", DESKTOP_URL)
log.info("CDP base    : %s", CDP_HTTP)
log.info("LLM model   : %s", LLM_MODEL)
log.info("LLM base URL: %s", LLM_BASE)


# ─────────────────────────────────────────────────────────────────────────────
# 1. Logger, Planner, Failure Memory & Compressor (Ported from main.py)
# ─────────────────────────────────────────────────────────────────────────────
class ActionLogger:
    def __init__(self):
        self.entries: list[dict] = []

    def log(self, action: str, params: dict, result: str, success: bool, screenshot_before: str = None, screenshot_after: str = None, reasoning: str = ""):
        self.entries.append({
            "timestamp": time.time(),
            "action": action,
            "params": params,
            "result": result[:500],
            "success": success,
            "screenshot_before": screenshot_before,
            "screenshot_after": screenshot_after,
            "reasoning": reasoning,
        })

    def get_summary(self, last_n: int = 10) -> str:
        recent = self.entries[-last_n:]
        lines = []
        for i, e in enumerate(recent):
            status = "OK" if e["success"] else "FAIL"
            lines.append(f"[{status}] {e['action']}: {e['result'][:100]}")
        return "\n".join(lines) if lines else "No actions logged yet."

    def to_dict(self) -> list[dict]:
        return self.entries


class DynamicPlanner:
    def __init__(self):
        self.subtasks: list[dict] = []
        self._counter = 0

    def add_subtask(self, description: str) -> dict:
        self._counter += 1
        st = {"id": self._counter, "description": description, "status": "pending", "result": ""}
        self.subtasks.append(st)
        return st

    def update_subtask(self, task_id: int, status: str, result: str = "") -> dict:
        for st in self.subtasks:
            if st["id"] == task_id:
                st["status"] = status
                st["result"] = result
                return st
        return None

    def remove_subtask(self, task_id: int) -> bool:
        before = len(self.subtasks)
        self.subtasks = [s for s in self.subtasks if s["id"] != task_id]
        return len(self.subtasks) < before

    def reorder(self, order: list[int]) -> None:
        id_map = {s["id"]: s for s in self.subtasks}
        self.subtasks = [id_map[tid] for tid in order if tid in id_map]

    def to_dict(self) -> list[dict]:
        return self.subtasks

    def to_text(self) -> str:
        lines = []
        for st in self.subtasks:
            icon = {"pending": "[ ]", "active": "[>]", "completed": "[x]", "failed": "[!]", "skipped": "[-]"}.get(st["status"], "[ ]")
            lines.append(f"{icon} #{st['id']}: {st['description']}")
        return "\n".join(lines) if lines else "No subtasks defined."


class FailureMemory:
    def __init__(self):
        self.failures: list[dict] = []

    def record(self, action: str, reason: str):
        self.failures.append({"action": action, "reason": reason, "timestamp": time.time()})
        if len(self.failures) > 10:
            self.failures = self.failures[-10:]

    def get_context(self) -> str:
        if not self.failures:
            return ""
        lines = ["Previous failures (avoid repeating):"]
        for f in self.failures[-5:]:
            lines.append(f"- {f['action']}: {f['reason']}")
        return "\n".join(lines)


class ContextCompressor:
    def __init__(self, max_messages: int = 30):
        self.max_messages = max_messages
        self.summaries: list[str] = []

    def compress_if_needed(self, messages: list[dict]) -> list[dict]:
        if len(messages) <= self.max_messages:
            return messages
        system = [m for m in messages if m.get("role") == "system"]
        non_system = [m for m in messages if m.get("role") != "system"]
        keep_count = self.max_messages - len(system) - 2
        if keep_count < 4:
            keep_count = 4
        old = non_system[:-keep_count]
        recent = non_system[-keep_count:]
        summary = self._summarize(old)
        self.summaries.append(summary)
        summary_msg = {"role": "system", "content": f"Summary of earlier actions:\n{summary}"}
        return system + [summary_msg] + recent

    def _summarize(self, messages: list[dict]) -> str:
        parts = []
        for m in messages:
            role = m.get("role", "?")
            content = m.get("content", "")
            if isinstance(content, str):
                parts.append(f"[{role}] {content[:150]}")
            elif isinstance(content, list):
                for part in content:
                    if isinstance(part, dict) and part.get("type") == "text":
                        parts.append(f"[{role}] {part['text'][:150]}")
        return "\n".join(parts[-20:])


# ─────────────────────────────────────────────────────────────────────────────
# 2. Robust CDP Client with standard DevTools commands
# ─────────────────────────────────────────────────────────────────────────────
class CDPClient:
    def __init__(self) -> None:
        self._ws: Any = None
        self._msg_id = 0
        self._pending: dict[int, asyncio.Future] = {}
        self._ready = False
        self._id_lock = asyncio.Lock()
        self._session_id = ""

    async def connect(self, retries: int = 25, delay: float = 3.0) -> None:
        for attempt in range(retries):
            try:
                # Discover targets
                async with aiohttp.ClientSession() as s:
                    async with s.get(
                        f"{CDP_HTTP}/json",
                        headers=SECRET_HEADERS,
                        timeout=aiohttp.ClientTimeout(total=10),
                    ) as r:
                        if r.status == 403:
                            raise RuntimeError("AGENT_SECRET mismatch — verify env vars on both services")
                        targets = await r.json()

                pages = [t for t in targets if t.get("type") == "page"]
                if not pages:
                    raise RuntimeError("No page target found in Chromium")

                # Rewrite websocket URL to secure proxied link
                orig_ws_url = pages[0]["webSocketDebuggerUrl"]
                m = re.search(r":\d+(/.*)", orig_ws_url)
                ws_path = m.group(1) if m else "/devtools/page/unknown"
                ws_scheme = "wss" if DESKTOP_URL.startswith("https") else "ws"
                desktop_host = DESKTOP_URL.split("://", 1)[1]
                ws_url = f"{ws_scheme}://{desktop_host}/cdp{ws_path}"

                log.info("Connecting to DevTools proxy WS: %s", ws_url)
                self._ws = await websockets.connect(
                    ws_url,
                    additional_headers=SECRET_HEADERS,
                    max_size=None,
                    ping_interval=20,
                    ping_timeout=20,
                )
                self._ready = True
                asyncio.create_task(self._recv_loop(), name="cdp-recv")
                log.info("CDP Client Connected and Active ✓")
                return

            except Exception as exc:
                log.warning("CDP connection failed: %s (attempt %d/%d)", exc, attempt + 1, retries)
                self._ready = False
                await asyncio.sleep(delay)

        raise RuntimeError("CDP DevTools Server is unreachable.")

    async def _recv_loop(self) -> None:
        try:
            async for raw in self._ws:
                data: dict = json.loads(raw)
                fut = self._pending.pop(data.get("id", -1), None)
                if fut and not fut.done():
                    fut.set_result(data)
        except Exception as exc:
            log.error("CDP event receive stream crashed: %s", exc)
            self._ready = False
            asyncio.create_task(self.connect(), name="cdp-reconnect")

    async def call(self, method: str, params: dict | None = None, timeout: float = 20) -> Any:
        if not self._ready or self._ws is None:
            raise HTTPException(503, "CDP client is offline")
        async with self._id_lock:
            self._msg_id += 1
            mid = self._msg_id
        loop = asyncio.get_running_loop()
        fut: asyncio.Future = loop.create_future()
        self._pending[mid] = fut
        await self._ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        try:
            result = await asyncio.wait_for(asyncio.shield(fut), timeout=timeout)
        except asyncio.TimeoutError:
            self._pending.pop(mid, None)
            raise HTTPException(504, f"CDP Command Timeout: {method}")
        if "error" in result:
            raise HTTPException(500, f"CDP Protocol Error: {result['error']}")
        return result.get("result", {})

    # ── Action helper methods ──
    async def navigate(self, url: str) -> dict:
        return await self.call("Page.navigate", {"url": url}, timeout=35)

    async def click(self, x: float, y: float) -> None:
        # Move first, then press & release
        await self.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": x, "y": y})
        base = {"x": x, "y": y, "button": "left", "clickCount": 1}
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mousePressed"})
        await asyncio.sleep(0.04)
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mouseReleased"})

    async def type_text(self, text: str) -> None:
        for ch in text:
            await self.call("Input.dispatchKeyEvent", {"type": "char", "text": ch})
            await asyncio.sleep(0.01)

    async def key(self, key_name: str) -> None:
        # Helper to dispatch keypress cleanly
        await self.call("Input.dispatchKeyEvent", {"type": "rawKeyDown", "key": key_name})
        await self.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": key_name})

    async def scroll(self, direction: str, amount: int = 3) -> None:
        dy = 300 * amount if direction == "down" else -300 * amount
        await self.call("Input.dispatchMouseEvent", {
            "type": "mouseWheel", "x": 512, "y": 288, "deltaX": 0, "deltaY": dy
        })

    async def eval(self, expression: str) -> Any:
        res = await self.call("Runtime.evaluate", {
            "expression": expression, "returnByValue": True, "awaitPromise": True
        })
        return res.get("result", {})

    async def take_screenshot(self) -> str:
        res = await self.call("Page.captureScreenshot", {"format": "png"})
        return res.get("data", "")


# ─────────────────────────────────────────────────────────────────────────────
# 3. Interactive Element Extraction & Resolution (Ported from main.py)
# ─────────────────────────────────────────────────────────────────────────────
ELEMENT_SCRIPT = """() => {
    const tags = 'a,button,input,textarea,select,[role=button],[role=link],[role=tab],[role=menuitem],label,[tabindex]';
    const els = document.querySelectorAll(tags);
    return Array.from(els).map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
            index: i,
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || el.value || '').slice(0, 200),
            role: el.getAttribute('role') || '',
            href: el.getAttribute('href') || '',
            placeholder: el.getAttribute('placeholder') || '',
            is_visible: r.width > 0 && r.height > 0,
            is_enabled: !el.disabled,
            bounding_box: {x: r.x, y: r.y, width: r.width, height: r.height}
        };
    }).filter(e => e.is_visible);
}"""

async def get_elements() -> list[dict]:
    res = await cdp.eval(ELEMENT_SCRIPT)
    return res.get("value", [])

async def resolve_click_target(description: str) -> dict:
    try:
        els = await get_elements()
        if not els:
            return {"error": "No elements found"}

        desc_lower = description.lower()
        scored = []
        for e in els:
            text = str(e.get("text", "")).lower()
            role = str(e.get("role", "")).lower()
            tag = str(e.get("tag", "")).lower()
            placeholder = str(e.get("placeholder", "")).lower()
            href = str(e.get("href", "")).lower()

            score = 0
            for word in desc_lower.split():
                if word in text: score += 3
                if word in role: score += 2
                if word in tag: score += 1
                if word in placeholder: score += 2
                if word in href: score += 1

            if score > 0:
                bb = e.get("bounding_box", {})
                scored.append({
                    "index": e.get("index"),
                    "tag": e.get("tag"),
                    "text": str(e.get("text", ""))[:80],
                    "role": e.get("role"),
                    "x": bb.get("x", 0) + bb.get("width", 0) / 2,
                    "y": bb.get("y", 0) + bb.get("height", 0) / 2,
                    "score": score,
                })

        if not scored:
            return {"error": f"No element matched description: {description}"}

        scored.sort(key=lambda x: x["score"], reverse=True)
        best = scored[0]
        return {
            "index": best["index"],
            "tag": best["tag"],
            "text": best["text"],
            "x": best["x"],
            "y": best["y"],
            "confidence": best["score"],
            "alternatives": scored[1:3],
        }
    except Exception as e:
        return {"error": str(e)}

async def get_screen() -> str:
    try:
        page_info = await cdp.eval("({url: location.href, title: document.title})")
        val = page_info.get("value", {})
        page_url = val.get("url", "unknown")
        page_title = val.get("title", "unknown")

        # DevTools tab list
        async with aiohttp.ClientSession() as s:
            async with s.get(f"{CDP_HTTP}/json", headers=SECRET_HEADERS) as r:
                targets = await r.json()
        pages = [t for t in targets if t.get("type") == "page"]
        tab_lines = []
        for i, t in enumerate(pages):
            title = t.get("title", "")[:40]
            url = t.get("url", "")[:50]
            active = " [ACTIVE]" if i == 0 else ""
            tab_lines.append(f"  Tab {i}: {title} ({url}){active}")

        tabs_section = f"\nOpen tabs ({len(pages)}):\n" + "\n".join(tab_lines) + "\n" if pages else ""

        els = await get_elements()
        el_lines = []
        for e in els[:60]:
            idx = e.get("index", "?")
            tag = e.get("tag", "?")
            text = str(e.get("text", "")).strip().replace("\n", " ")[:80]
            role = e.get("role", "")
            href = e.get("href", "")
            bb = e.get("bounding_box", {})
            x, y = bb.get("x", 0), bb.get("y", 0)
            placeholder = e.get("placeholder", "")

            parts = [f"[{idx}] <{tag}>"]
            if role: parts.append(f"role={role}")
            if text: parts.append(f'text="{text}"')
            if placeholder: parts.append(f'placeholder="{placeholder}"')
            if href: parts.append(f'href="{href[:60]}"')
            parts.append(f"@({x:.0f},{y:.0f})")
            el_lines.append("  " + " ".join(parts))

        return (
            f"URL: {page_url}\n"
            f"Title: {page_title}\n"
            f"{tabs_section}\n"
            f"Interactive elements ({len(els[:60])} shown of {len(els)}):\n"
            + "\n".join(el_lines)
        )
    except Exception as e:
        return f"Error getting screen details: {e}"


# ─────────────────────────────────────────────────────────────────────────────
# 4. Action Executor (Translates to CDP commands)
# ─────────────────────────────────────────────────────────────────────────────
async def execute_action(action: dict) -> str:
    a = action.get("action", "")
    try:
        if a == "get_screen":
            return await get_screen()

        elif a == "click":
            idx = int(action.get("index", 0))
            els = await get_elements()
            if idx < len(els):
                bb = els[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await cdp.click(x, y)
                return f"Clicked element [{idx}] at ({x:.0f},{y:.0f})"
            return f"Element [{idx}] not found."

        elif a == "type":
            idx = int(action.get("index", 0))
            text = action.get("text", "")
            els = await get_elements()
            if idx < len(els):
                bb = els[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await cdp.click(x, y)
                # Select-all keyboard shortcut simulation
                await cdp.call("Input.dispatchKeyEvent", {"type": "rawKeyDown", "key": "a", "modifiers": 2}) # Ctrl+a
                await cdp.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": "a", "modifiers": 0})
                await cdp.type_text(text)
                return f'Typed "{text}" into element [{idx}]'
            return f"Element [{idx}] not found."

        elif a == "press_key":
            key_name = action.get("key", "Enter")
            await cdp.key(key_name)
            return f"Pressed key: {key_name}"

        elif a == "hotkey":
            keys = action.get("keys", [])
            for key_name in keys:
                await cdp.call("Input.dispatchKeyEvent", {"type": "rawKeyDown", "key": key_name})
            for key_name in reversed(keys):
                await cdp.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": key_name})
            return f"Pressed hotkey: {'+'.join(keys)}"

        elif a == "scroll":
            direction = action.get("direction", "down")
            amount = int(action.get("amount", 3))
            await cdp.scroll(direction, amount)
            return f"Scrolled {direction} by {amount}"

        elif a == "navigate":
            url = action.get("url", "")
            await cdp.navigate(url)
            page_info = await cdp.eval("location.href")
            return f"Navigated to {page_info.get('value', 'url')}"

        elif a == "evaluate":
            expr = action.get("expression", "")
            res = await cdp.eval(expr)
            return json.dumps(res.get("value", ""))

        elif a == "open_tab":
            url = action.get("url", "https://www.google.com")
            async with aiohttp.ClientSession() as s:
                async with s.get(f"{CDP_HTTP}/json/new?{url}", headers=SECRET_HEADERS) as r:
                    res = await r.json()
            return f"Opened new tab focusing target: {res.get('title', 'new')}"

        elif a == "list_tabs":
            async with aiohttp.ClientSession() as s:
                async with s.get(f"{CDP_HTTP}/json", headers=SECRET_HEADERS) as r:
                    targets = await r.json()
            pages = [t for t in targets if t.get("type") == "page"]
            tab_lines = [f"Tab {i}: {t.get('title', '')[:40]} ({t.get('url', '')[:40]})" for i, t in enumerate(pages)]
            return "Open Tabs:\n" + "\n".join(tab_lines)

        elif a == "switch_tab":
            idx = int(action.get("index", 0))
            async with aiohttp.ClientSession() as s:
                async with s.get(f"{CDP_HTTP}/json", headers=SECRET_HEADERS) as r:
                    targets = await r.json()
            pages = [t for t in targets if t.get("type") == "page"]
            if 0 <= idx < len(pages):
                tid = pages[idx]["id"]
                async with aiohttp.ClientSession() as s:
                    await s.get(f"{CDP_HTTP}/json/activate/{tid}", headers=SECRET_HEADERS)
                # Reconnect WebSocket debugger
                await cdp.connect()
                return f"Switched focus to tab {idx}"
            return f"Tab index {idx} out of range."

        elif a == "close_tab":
            idx = int(action.get("index", 0))
            async with aiohttp.ClientSession() as s:
                async with s.get(f"{CDP_HTTP}/json", headers=SECRET_HEADERS) as r:
                    targets = await r.json()
            pages = [t for t in targets if t.get("type") == "page"]
            if len(pages) <= 1:
                return "Cannot close the only open tab."
            if 0 <= idx < len(pages):
                tid = pages[idx]["id"]
                async with aiohttp.ClientSession() as s:
                    await s.get(f"{CDP_HTTP}/json/close/{tid}", headers=SECRET_HEADERS)
                await cdp.connect()
                return f"Closed tab {idx}"
            return f"Tab index {idx} not found."

        elif a == "take_screenshot":
            b64 = await cdp.take_screenshot()
            return f"Screenshot captured (base64, {len(b64)} chars)."

        elif a == "resolve_click":
            desc = action.get("description", "")
            result = await resolve_click_target(desc)
            return json.dumps(result)

        elif a == "done":
            return action.get("summary", "Complete.")

        else:
            return f"Action '{a}' not supported on DevTools proxy."

    except Exception as e:
        return f"Action '{a}' execution failed: {e}"


# ─────────────────────────────────────────────────────────────────────────────
# 5. Autonomous Agent Loop (Orchestration Loop)
# ─────────────────────────────────────────────────────────────────────────────
_planner = DynamicPlanner()
_logger = ActionLogger()
_failures = FailureMemory()
_compressor = ContextCompressor()

COMPUTER_TOOLS = [
    {"type": "function", "function": {"name": "get_screen", "description": "Get the current screen details: URL, title, open tabs, and all interactive elements with their index number, tag, text, and position. Call first and after major changes.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "take_screenshot", "description": "Capture a screenshot of the current screen. Returns base64 PNG.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "resolve_click", "description": "Find the best element to click given a natural-language description.", "parameters": {"type": "object", "properties": {"description": {"type": "string", "description": "Natural language description of the element to click"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "click", "description": "Click an element by its index number (from get_screen).", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "type", "description": "Type text into an input/textarea element by its index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}, "text": {"type": "string"}}, "required": ["index", "text"]}}},
    {"type": "function", "function": {"name": "press_key", "description": "Press a keyboard key.", "parameters": {"type": "object", "properties": {"key": {"type": "string"}}, "required": ["key"]}}},
    {"type": "function", "function": {"name": "hotkey", "description": "Press a keyboard shortcut (e.g. Control+A, Alt+Tab).", "parameters": {"type": "object", "properties": {"keys": {"type": "array", "items": {"type": "string"}}}, "required": ["keys"]}}},
    {"type": "function", "function": {"name": "scroll", "description": "Scroll the page.", "parameters": {"type": "object", "properties": {"direction": {"type": "string", "enum": ["up", "down"]}, "amount": {"type": "integer"}}, "required": ["direction"]}}},
    {"type": "function", "function": {"name": "navigate", "description": "Navigate the browser to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string"}}, "required": ["url"]}}},
    {"type": "function", "function": {"name": "evaluate", "description": "Run JavaScript in the page and return the result.", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}, "required": ["expression"]}}},
    {"type": "function", "function": {"name": "open_tab", "description": "Open a new browser tab and navigate to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "list_tabs", "description": "List all open browser tabs.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "switch_tab", "description": "Switch to a specific tab by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "close_tab", "description": "Close a specific tab by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "add_subtask", "description": "Add a subtask to the dynamic plan.", "parameters": {"type": "object", "properties": {"description": {"type": "string"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "update_subtask", "description": "Update a subtask's status.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer"}, "status": {"type": "string", "enum": ["active", "completed", "failed", "skipped"]}, "result": {"type": "string"}}, "required": ["task_id", "status"]}}},
    {"type": "function", "function": {"name": "remove_subtask", "description": "Remove a subtask from the plan.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer"}}, "required": ["task_id"]}}},
    {"type": "function", "function": {"name": "done", "description": "Mark the task as complete and provide a summary.", "parameters": {"type": "object", "properties": {"summary": {"type": "string"}}, "required": ["summary"]}}},
]

SYSTEM_PROMPT = """You are a computer-use AI agent with browser access.

## CRITICAL RULES
1. When asked to OPEN a website, VISIT a site, or BROWSE — you MUST use the "navigate" tool to go to the URL in the browser.
2. After navigating, use "get_screen" to see what's on the page, then interact with elements using "click", "type", etc.
3. You do not have direct terminal access, do everything inside Chromium.

## DYNAMIC PLANNING
Use add_subtask/update_subtask to manage your plan for complex tasks."""

async def broadcast(msg: dict):
    dead = []
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.remove(ws)

async def call_llm_with_tools(messages: list[dict]) -> dict:
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"

    compressed = _compressor.compress_if_needed(messages)
    async with aiohttp.ClientSession() as s:
        async with s.post(
            f"{LLM_BASE}/chat/completions",
            headers=headers,
            json={
                "model": LLM_MODEL,
                "messages": compressed,
                "tools": COMPUTER_TOOLS,
                "tool_choice": "auto",
                "temperature": 0.1,
                "max_tokens": 2048,
            },
            timeout=120
        ) as r:
            r.raise_for_status()
            data = await r.json()
            return data["choices"][0]["message"]

async def run_agent(task: str):
    global _planner, _logger, _failures, _compressor
    started_at = time.time()
    final_summary = "The task reached its step limit before it could finish."
    completed = False
    _planner = DynamicPlanner()
    _logger = ActionLogger()
    _failures = FailureMemory()
    _compressor = ContextCompressor()

    await broadcast({"type": "system", "text": f"Task: {task}"})
    await broadcast({"type": "plan", "plan": _planner.to_dict()})
    messages = [{"role": "user", "content": task}]

    for step in range(25):
        await broadcast({"type": "thinking", "text": f"Step {step + 1}: Thinking..."})
        failure_ctx = _failures.get_context()
        if failure_ctx and step > 0:
            messages.append({"role": "system", "content": failure_ctx})

        try:
            assistant_msg = await call_llm_with_tools([
                {"role": "system", "content": SYSTEM_PROMPT},
                *messages,
            ])
        except Exception as e:
            await broadcast({"type": "error", "text": f"LLM client call failed: {e}"})
            final_summary = f"I couldn't complete the task because the language model request failed: {e}"
            break

        tool_calls = assistant_msg.get("tool_calls") or []
        if not tool_calls:
            text = assistant_msg.get("content", "Done.")
            await broadcast({"type": "assistant", "text": text})
            await broadcast({"type": "system", "text": "Agent finished task execution."})
            final_summary = text
            completed = True
            break

        messages.append(assistant_msg)

        for tc in tool_calls:
            fn = tc.get("function", {})
            fn_name = fn.get("name", "")
            try:
                fn_args = json.loads(fn.get("arguments", "{}"))
            except Exception:
                fn_args = {}

            await broadcast({"type": "action", "text": f"Executing: {fn_name}", "action": fn_name, "params": fn_args})

            if fn_name == "done":
                final_summary = fn_args.get("summary") or "Task complete."
                completed = True
                break

            # Screenshots are not loaded as streams, but we capture base64 before/after for logging
            t0 = time.time()
            result = await execute_action({"action": fn_name, **fn_args})
            elapsed = round(time.time() - t0, 2)

            success = "error" not in result.lower() and "timed out" not in result.lower()
            if not success:
                _failures.record(fn_name, result[:200])

            _logger.log(fn_name, fn_args, result, success)

            await broadcast({
                "type": "screen",
                "text": result[:2000],
                "action": fn_name,
                "success": success,
                "elapsed": elapsed,
                "step": step + 1,
            })
            await broadcast({"type": "plan", "plan": _planner.to_dict()})
            await broadcast({"type": "action_log", "log": _logger.get_summary()})

            messages.append({
                "role": "tool",
                "tool_call_id": tc.get("id"),
                "name": fn_name,
                "content": result,
            })

        if completed:
            break

    total_ms = round((time.time() - started_at) * 1000)
    await broadcast({"type": "done", "summary": final_summary, "total_ms": total_ms})
    await broadcast({"type": "agent_end", "total_ms": total_ms})


# ─────────────────────────────────────────────────────────────────────────────
# 6. FastAPI Web Framework Setup
# ─────────────────────────────────────────────────────────────────────────────
cdp = CDPClient()

@asynccontextmanager
async def lifespan(_: FastAPI):
    if not AGENT_SECRET or AGENT_SECRET == "changeme":
        raise RuntimeError("AGENT_SECRET must be set to a non-default value on both browser services")
    await cdp.connect()
    yield

app = FastAPI(title="Orchestrated Desktop Agent API", version="2.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request models ──
class ExecuteReq(BaseModel):
    action: str
    params: dict = {}

class InjectReq(BaseModel):
    instruction: str


# ── Rest Endpoints ──
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "agent-api",
        "cdp_ready": cdp._ready,
        "desktop_url": DESKTOP_URL,
    }

@app.post("/agent/inject")
async def agent_inject(req: InjectReq):
    global active_task
    # Cancel previous task if running
    if active_task and not active_task.done():
        active_task.cancel()
    active_task = asyncio.create_task(run_agent(req.instruction))
    return {"status": "accepted", "instruction": req.instruction}

@app.post("/agent/execute")
async def agent_execute(req: ExecuteReq):
    # Runs standard single CDP actions directly
    res = await execute_action({"action": req.action, **req.params})
    return {"status": "ok", "action": req.action, "result": res}

@app.get("/agent/screen")
async def agent_screen():
    # Keep-alive screenshot endpoint
    data = await cdp.take_screenshot()
    return Response(content=base64.b64decode(data), media_type="image/png")

@app.get("/agent/plan")
async def agent_plan():
    return _planner.to_dict()

@app.get("/agent/log")
async def agent_log():
    return _logger.to_dict()
@app.get("/stream")
@app.get("/stream/")
async def get_stream():
    return RedirectResponse(url=DESKTOP_URL + "/")


# ── WebSocket server ──
@app.websocket("/ws/agent")
async def ws_agent(websocket: WebSocket):
    global active_task
    await websocket.accept()
    clients.append(websocket)
    # Send current state immediately on connect
    await websocket.send_json({"type": "plan", "plan": _planner.to_dict()})
    await websocket.send_json({"type": "action_log", "log": _logger.get_summary()})
    try:
        while True:
            raw = await websocket.receive_text()
            try:
                msg = json.loads(raw)
                # Frontend sends {type: 'message', text: '<task>'} to start the agent
                if msg.get("type") == "message" and msg.get("text"):
                    if active_task and not active_task.done():
                        active_task.cancel()
                    active_task = asyncio.create_task(run_agent(msg["text"]))
            except Exception:
                pass
    except WebSocketDisconnect:
        if websocket in clients:
            clients.remove(websocket)
