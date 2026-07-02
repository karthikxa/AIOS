import asyncio, json, os, sys, traceback, time, base64, hashlib
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

# Load .env from desktop-agent root
try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parent.parent / ".env"
    if _env_path.exists():
        load_dotenv(_env_path)
except ImportError:
    pass

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "zed-pro")
LLM_BASE = os.environ.get("LLM_BASE_URL", "https://server-llm-1.onrender.com/v1")
SANDBOX = os.environ.get("SANDBOX_URL", "http://localhost:8080")
clients: list[WebSocket] = []

# ── Sandbox API client ──────────────────────────────────────────────────────

async def sandbox_api(method: str, path: str, data: dict = None, timeout: int = 30) -> dict:
    async with httpx.AsyncClient(timeout=timeout) as c:
        url = f"{SANDBOX}{path}"
        if method == "POST":
            r = await c.post(url, json=data or {})
        else:
            r = await c.get(url)
        r.raise_for_status()
        return r.json()

async def sandbox_get(path: str) -> dict:
    return await sandbox_api("GET", path)

async def sandbox_post(path: str, data: dict = None, timeout: int = 30) -> dict:
    return await sandbox_api("POST", path, data, timeout)


# ── Action logger ───────────────────────────────────────────────────────────

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

    def get_failures(self) -> list[dict]:
        return [e for e in self.entries if not e["success"]]

    def to_dict(self) -> list[dict]:
        return self.entries


# ── Dynamic planner ─────────────────────────────────────────────────────────

class DynamicPlanner:
    def __init__(self):
        self.subtasks: list[dict] = []  # [{id, description, status, result}]
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

    def get_current(self) -> dict:
        for st in self.subtasks:
            if st["status"] == "pending":
                return st
        return None

    def to_dict(self) -> list[dict]:
        return self.subtasks

    def to_text(self) -> str:
        lines = []
        for st in self.subtasks:
            icon = {"pending": "[ ]", "active": "[>]", "completed": "[x]", "failed": "[!]", "skipped": "[-]"}.get(st["status"], "[ ]")
            lines.append(f"{icon} #{st['id']}: {st['description']}")
        return "\n".join(lines) if lines else "No subtasks defined."


# ── Context compressor ──────────────────────────────────────────────────────

class ContextCompressor:
    def __init__(self, max_messages: int = 30):
        self.max_messages = max_messages
        self.summaries: list[str] = []

    def compress_if_needed(self, messages: list[dict]) -> list[dict]:
        if len(messages) <= self.max_messages:
            return messages
        # Keep system prompt + last N messages, summarize the rest
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


# ── Failure memory ──────────────────────────────────────────────────────────

class FailureMemory:
    def __init__(self):
        self.failures: list[dict] = []  # [{action, reason, timestamp}]

    def record(self, action: str, reason: str):
        self.failures.append({"action": action, "reason": reason, "timestamp": time.time()})
        # Keep last 10
        if len(self.failures) > 10:
            self.failures = self.failures[-10:]

    def get_context(self) -> str:
        if not self.failures:
            return ""
        lines = ["Previous failures (avoid repeating):"]
        for f in self.failures[-5:]:
            lines.append(f"- {f['action']}: {f['reason']}")
        return "\n".join(lines)

    def has_repeated(self, action: str, reason: str, threshold: int = 2) -> bool:
        return sum(1 for f in self.failures if f["action"] == action and f["reason"] == reason) >= threshold


# ── Screenshot helper ───────────────────────────────────────────────────────

async def take_screenshot_base64() -> str:
    """Take a screenshot and return as base64 PNG."""
    try:
        async with httpx.AsyncClient(timeout=15) as c:
            r = await c.get(f"{SANDBOX}/v1/browser/screenshot")
            r.raise_for_status()
            return base64.b64encode(r.content).decode()
    except Exception:
        return ""

async def get_screenshot_hash(b64: str) -> str:
    return hashlib.md5(b64.encode()).hexdigest()[:12]


async def screenshot_diff(before_b64: str, after_b64: str) -> str:
    """Simple screenshot diff: compare hashes and describe change."""
    if not before_b64 or not after_b64:
        return "Could not capture screenshots for comparison."
    h_before = await get_screenshot_hash(before_b64)
    h_after = await get_screenshot_hash(after_b64)
    if h_before == h_after:
        return "NO_CHANGE: Screenshots are identical — the action may not have had any visible effect."
    return "CHANGED: Screen content changed after the action."


# ── Vision-grounded click resolver ──────────────────────────────────────────

async def resolve_click_target(description: str) -> dict:
    """Given a natural-language description, find the best matching element."""
    try:
        resp = await sandbox_get("/v1/browser/page/elements")
        els = resp.get("data", [])
        if not isinstance(els, list):
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


# ── Set-of-marks annotator ─────────────────────────────────────────────────

async def annotate_screenshot() -> str:
    """Take a screenshot and overlay numbered markers on interactive elements. Returns description."""
    try:
        resp = await sandbox_get("/v1/browser/page/elements")
        els = resp.get("data", [])
        if not isinstance(els, list):
            return "No elements to annotate"

        visible = [e for e in els if e.get("is_visible", True) and e.get("is_enabled", True)]
        annotations = []
        for i, e in enumerate(visible[:30], 1):
            bb = e.get("bounding_box", {})
            x = bb.get("x", 0) + bb.get("width", 0) / 2
            y = bb.get("y", 0) + bb.get("height", 0) / 2
            tag = e.get("tag", "?")
            text = str(e.get("text", ""))[:40]
            role = e.get("role", "")
            idx = e.get("index", "?")
            annotations.append(f"#{i} [{idx}] <{tag}> role={role} text=\"{text}\" @({x:.0f},{y:.0f})")

        return f"Annotated {len(annotations)} elements:\n" + "\n".join(annotations)
    except Exception as e:
        return f"Annotation error: {e}"


# ── Screen state ────────────────────────────────────────────────────────────

async def get_page_url_and_title() -> tuple[str, str]:
    try:
        url_r = await sandbox_post("/v1/browser/page/evaluate", {"expression": "location.href"})
        title_r = await sandbox_post("/v1/browser/page/evaluate", {"expression": "document.title"})
        url = url_r.get("data", "unknown") if url_r.get("success") else "unknown"
        title = title_r.get("data", "unknown") if title_r.get("success") else "unknown"
        return url, title
    except Exception:
        return "unknown", "unknown"


async def get_tabs() -> list[dict]:
    try:
        resp = await sandbox_get("/v1/browser/tabs")
        tabs = resp.get("data", [])
        if not isinstance(tabs, list):
            tabs = []
        return tabs
    except Exception:
        return []


async def get_screen() -> str:
    try:
        page_url, page_title = await get_page_url_and_title()
        tabs = await get_tabs()
        tab_lines = []
        for t in tabs:
            idx = t.get("index", "?")
            title = t.get("title", "")[:40]
            url = t.get("url", "")[:50]
            active = " [ACTIVE]" if t.get("is_active") else ""
            tab_lines.append(f"  Tab {idx}: {title} ({url}){active}")

        tabs_section = ""
        if tabs:
            tabs_section = f"\nOpen tabs ({len(tabs)}):\n" + "\n".join(tab_lines) + "\n"

        elements_resp = await sandbox_get("/v1/browser/page/elements")
        els = elements_resp.get("data", [])
        if not isinstance(els, list):
            els = []

        visible_els = [e for e in els if e.get("is_visible", True) and e.get("is_enabled", True)]
        el_lines = []
        for e in visible_els[:60]:
            idx = e.get("index", "?")
            tag = e.get("tag", "?")
            text = str(e.get("text", ""))[:80].replace("\n", " ")
            role = e.get("role", "")
            href = e.get("href", "")
            bb = e.get("bounding_box", {})
            x, y = bb.get("x", 0), bb.get("y", 0)
            placeholder = e.get("placeholder", "")

            parts = [f"[{idx}] <{tag}>"]
            if role:
                parts.append(f"role={role}")
            if text:
                parts.append(f'text="{text}"')
            if placeholder:
                parts.append(f'placeholder="{placeholder}"')
            if href:
                parts.append(f'href="{href[:60]}"')
            parts.append(f"@({x:.0f},{y:.0f})")
            el_lines.append("  " + " ".join(parts))

        return (
            f"URL: {page_url}\n"
            f"Title: {page_title}\n"
            f"{tabs_section}\n"
            f"Interactive elements ({len(visible_els)} shown of {len(els)}):\n"
            + "\n".join(el_lines)
        )
    except Exception as e:
        return f"Error getting screen: {e}"


# ── Action executor ─────────────────────────────────────────────────────────

async def execute_action(action: dict) -> str:
    a = action.get("action", "")
    try:
        # ── Browser actions ─────────────────────────────────────────────
        if a == "get_screen":
            return await get_screen()

        elif a == "click":
            idx = int(action.get("index", action.get("ref", 0)))
            await sandbox_post("/v1/browser/page/click", {"index": idx})
            return f"Clicked element [{idx}]"

        elif a == "type":
            idx = int(action.get("index", action.get("ref", 0)))
            text = action.get("text", "")
            await sandbox_post("/v1/browser/page/fill", {"index": idx, "text": text})
            return f'Typed "{text}" into element [{idx}]'

        elif a == "press_key":
            key = action.get("key", "Enter")
            await sandbox_post("/v1/browser/page/press_key", {"key": key})
            return f"Pressed key: {key}"

        elif a == "hotkey":
            keys = action.get("keys", [])
            await sandbox_post("/v1/browser/page/hot_key", {"keys": keys})
            return f"Pressed hotkey: {'+'.join(keys)}"

        elif a == "scroll":
            direction = action.get("direction", "down")
            amount = int(action.get("amount", 3))
            await sandbox_post("/v1/browser/page/scroll", {"direction": direction, "amount": amount})
            return f"Scrolled {direction} by {amount}"

        elif a == "navigate":
            url = action.get("url", "")
            r = await sandbox_post("/v1/browser/page/navigate", {"url": url}, timeout=30)
            d = r.get("data", {})
            return f"Navigated to {d.get('url', url)} — title: {d.get('title', 'unknown')}"

        elif a == "evaluate":
            expr = action.get("expression", action.get("code", ""))
            r = await sandbox_post("/v1/browser/page/evaluate", {"expression": expr})
            return json.dumps(r.get("data", r), default=str)

        # ── Tab management ─────────────────────────────────────────────
        elif a == "open_tab":
            url = action.get("url", "about:blank")
            r = await sandbox_post("/v1/browser/tabs", {"action": "create"})
            tab_data = r.get("data", {})
            tab_index = tab_data.get("index", "?")
            if url and url != "about:blank":
                await sandbox_post("/v1/browser/page/navigate", {"url": url}, timeout=30)
            return f"Opened new tab #{tab_index} and navigated to {url}"

        elif a == "list_tabs":
            tabs = await get_tabs()
            if not tabs:
                return "No tabs open"
            tab_lines = []
            for t in tabs:
                idx = t.get("index", "?")
                title = t.get("title", "")[:50]
                url = t.get("url", "")[:60]
                active = " [ACTIVE]" if t.get("is_active") else ""
                tab_lines.append(f"Tab {idx}: {title} ({url}){active}")
            return f"Open tabs ({len(tabs)}):\n" + "\n".join(tab_lines)

        elif a == "switch_tab":
            tab_index = int(action.get("index", 0))
            tabs = await get_tabs()
            target_tab = None
            for t in tabs:
                if t.get("index") == tab_index:
                    target_tab = t
                    break
            if not target_tab:
                return f"Tab {tab_index} not found. Available tabs: {[t.get('index') for t in tabs]}"
            target_url = target_tab.get("url", "")
            if target_url and target_url != "about:blank":
                await sandbox_post("/v1/browser/page/navigate", {"url": target_url}, timeout=30)
                return f"Switched to tab {tab_index}: {target_tab.get('title', 'unknown')}"
            else:
                return f"Tab {tab_index} is blank, cannot switch"

        elif a == "close_tab":
            tab_index = int(action.get("index", -1))
            tabs = await get_tabs()
            if len(tabs) <= 1:
                return "Cannot close the last tab"
            await sandbox_post("/v1/browser/page/evaluate", {"expression": "window.close()"})
            return f"Closed tab {tab_index}"

        # ── Shell & code execution ─────────────────────────────────────
        elif a == "shell":
            cmd = action.get("command", "")
            r = await sandbox_post("/v1/bash/exec", {"command": cmd})
            output = r.get("data", {})
            if isinstance(output, dict):
                return output.get("output", json.dumps(output))
            return str(output)

        elif a == "run_code":
            code = action.get("code", "")
            language = action.get("language", "python")
            if language == "python":
                r = await sandbox_post("/v1/jupyter/execute", {"code": code, "session_id": "agent"})
            elif language in ("javascript", "node", "nodejs"):
                r = await sandbox_post("/v1/nodejs/execute", {"code": code})
            else:
                r = await sandbox_post("/v1/code/execute", {"code": code, "language": language})
            output = r.get("data", {})
            if isinstance(output, dict):
                return output.get("output", json.dumps(output))
            return str(output)

        # ── File system ────────────────────────────────────────────────
        elif a == "read_file":
            path = action.get("path", "")
            r = await sandbox_post("/v1/file/read", {"path": path})
            data = r.get("data", {})
            if isinstance(data, dict):
                return data.get("content", json.dumps(data))
            return str(data)

        elif a == "write_file":
            path = action.get("path", "")
            content = action.get("content", "")
            await sandbox_post("/v1/file/write", {"path": path, "content": content})
            return f"Wrote {len(content)} bytes to {path}"

        elif a == "list_files":
            path = action.get("path", "/")
            r = await sandbox_post("/v1/file/list", {"path": path})
            data = r.get("data", {})
            if isinstance(data, dict):
                entries = data.get("entries", [])
                return "\n".join([f"{'[DIR]' if e.get('is_dir') else '[FILE]'} {e.get('name', '?')}" for e in entries[:50]])
            return str(data)

        elif a == "find_files":
            pattern = action.get("pattern", "*")
            path = action.get("path", "/")
            r = await sandbox_post("/v1/file/find", {"pattern": pattern, "path": path})
            data = r.get("data", {})
            if isinstance(data, dict):
                files = data.get("files", [])
                return "\n".join(files[:50]) if files else "No files found"
            return str(data)

        elif a == "search_files":
            query = action.get("query", "")
            path = action.get("path", "/")
            r = await sandbox_post("/v1/file/grep", {"query": query, "path": path})
            data = r.get("data", {})
            if isinstance(data, dict):
                matches = data.get("matches", [])
                lines = []
                for m in matches[:30]:
                    lines.append(f"{m.get('file', '?')}:{m.get('line', '?')}: {m.get('text', '')[:100]}")
                return "\n".join(lines) if lines else "No matches found"
            return str(data)

        # ── Package installation ───────────────────────────────────────
        elif a == "install_package":
            package = action.get("package", "")
            manager = action.get("manager", "auto")
            if manager == "auto":
                if package.startswith("python") or package in ("pandas", "numpy", "requests", "flask", "django", "scipy", "matplotlib", "pillow", "beautifulsoup4", "selenium", "httpx", "aiohttp", "fastapi", "uvicorn"):
                    manager = "pip"
                elif package.startswith("node") or package in ("express", "lodash", "axios", "react", "next"):
                    manager = "npm"
                else:
                    manager = "apt"
            if manager == "pip":
                cmd = f"pip install {package}"
            elif manager == "npm":
                cmd = f"npm install -g {package}"
            else:
                cmd = f"apt-get install -y {package}"
            r = await sandbox_post("/v1/bash/exec", {"command": cmd})
            output = r.get("data", {})
            if isinstance(output, dict):
                return output.get("output", json.dumps(output))
            return str(output)

        # ── Screenshot & vision ────────────────────────────────────────
        elif a == "take_screenshot":
            b64 = await take_screenshot_base64()
            return f"Screenshot captured (base64, {len(b64)} chars). Use get_screen for element details."

        elif a == "screenshot_diff":
            before_b64 = action.get("before", "")
            after_b64 = action.get("after", "")
            if not before_b64:
                before_b64 = await take_screenshot_base64()
            if not after_b64:
                after_b64 = await take_screenshot_base64()
            return await screenshot_diff(before_b64, after_b64)

        elif a == "resolve_click":
            desc = action.get("description", "")
            result = await resolve_click_target(desc)
            return json.dumps(result)

        elif a == "annotate_screen":
            return await annotate_screenshot()

        # ── Page perception ────────────────────────────────────────────
        elif a == "get_page_html":
            r = await sandbox_get("/v1/browser/page/html")
            data = r.get("data", "")
            if isinstance(data, str):
                return data[:5000]
            return json.dumps(data)[:5000]

        elif a == "get_page_text":
            r = await sandbox_get("/v1/browser/page/text")
            data = r.get("data", "")
            if isinstance(data, str):
                return data[:5000]
            return json.dumps(data)[:5000]

        elif a == "get_page_markdown":
            r = await sandbox_get("/v1/browser/page/markdown")
            data = r.get("data", "")
            if isinstance(data, str):
                return data[:5000]
            return json.dumps(data)[:5000]

        elif a == "find_text":
            text = action.get("text", "")
            r = await sandbox_post("/v1/browser/page/find_text", {"text": text})
            data = r.get("data", {})
            return json.dumps(data, default=str)[:2000]

        elif a == "wait_for":
            wait_type = action.get("type", "load")
            value = action.get("value", "")
            timeout_s = action.get("timeout", 10)
            r = await sandbox_post("/v1/browser/page/wait", {"type": wait_type, "value": value, "timeout": timeout_s})
            return f"Wait completed: {r.get('data', {})}"

        # ── Dynamic planner actions ────────────────────────────────────
        elif a == "add_subtask":
            desc = action.get("description", "").strip()
            if not desc:
                return "Error: subtask description cannot be empty"
            st = _planner.add_subtask(desc)
            return f"Added subtask #{st['id']}: {desc}\nPlan:\n{_planner.to_text()}"

        elif a == "update_subtask":
            task_id = int(action.get("task_id", 0))
            status = action.get("status", "completed")
            result = action.get("result", "")
            st = _planner.update_subtask(task_id, status, result)
            if st:
                return f"Updated subtask #{task_id} to {status}\nPlan:\n{_planner.to_text()}"
            return f"Subtask #{task_id} not found"

        elif a == "remove_subtask":
            task_id = int(action.get("task_id", 0))
            if _planner.remove_subtask(task_id):
                return f"Removed subtask #{task_id}\nPlan:\n{_planner.to_text()}"
            return f"Subtask #{task_id} not found"

        elif a == "reorder_subtasks":
            order = action.get("order", [])
            _planner.reorder(order)
            return f"Reordered subtasks\nPlan:\n{_planner.to_text()}"

        elif a == "get_plan":
            return f"Current plan:\n{_planner.to_text()}"

        # ── Done ──────────────────────────────────────────────────────
        elif a == "done":
            return action.get("summary", "Done.")

        else:
            return f"Unknown action: {a}"

    except httpx.TimeoutException:
        return f"Action '{a}' timed out"
    except httpx.HTTPStatusError as e:
        return f"Action '{a}' HTTP error: {e.response.status_code} — {e.response.text[:200]}"
    except Exception as e:
        return f"Action '{a}' error: {e}"


# ── Global agent state (per-run) ────────────────────────────────────────────

_planner = DynamicPlanner()
_logger = ActionLogger()
_compressor = ContextCompressor()
_failures = FailureMemory()

# Screenshots for diff comparison
_screenshot_before = ""
_screenshot_after = ""


# ── LLM caller (OpenAI-compatible, function calling) ────────────────────────

COMPUTER_TOOLS = [
    # ── Screen & perception ─────────────────────────────────────────
    {"type": "function", "function": {"name": "get_screen", "description": "Get the current screen: URL, title, open tabs, and all interactive elements with their index number, tag, text, role, and position. Call first and after major changes.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "take_screenshot", "description": "Capture a screenshot of the current screen. Returns base64 PNG.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "annotate_screen", "description": "Overlay numbered markers on all interactive elements in the current view. Use to identify elements by number.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "resolve_click", "description": "Find the best element to click given a natural-language description (e.g. 'the search button', 'the email input'). Returns element index and coordinates.", "parameters": {"type": "object", "properties": {"description": {"type": "string", "description": "Natural language description of the element to click"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "screenshot_diff", "description": "Compare before/after screenshots to check if an action had visible effect. Pass 'before' and 'after' base64 strings, or leave empty to use current screen.", "parameters": {"type": "object", "properties": {"before": {"type": "string", "description": "Base64 screenshot before action (optional)"}, "after": {"type": "string", "description": "Base64 screenshot after action (optional)"}}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_html", "description": "Get the full HTML of the current page.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_text", "description": "Get all visible text from the current page.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_markdown", "description": "Get the current page content converted to Markdown.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "find_text", "description": "Find occurrences of text on the page.", "parameters": {"type": "object", "properties": {"text": {"type": "string", "description": "Text to find"}}, "required": ["text"]}}},
    {"type": "function", "function": {"name": "wait_for", "description": "Wait for a condition: selector, load, url, network_idle.", "parameters": {"type": "object", "properties": {"type": {"type": "string", "enum": ["selector", "load", "url", "network_idle"], "description": "Wait type"}, "value": {"type": "string", "description": "Value to wait for (selector, url pattern)"}, "timeout": {"type": "integer", "description": "Timeout in seconds (default 10)"}}, "required": ["type"]}}},

    # ── Browser actions ─────────────────────────────────────────────
    {"type": "function", "function": {"name": "click", "description": "Click an element by its index number (from get_screen).", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Element index from get_screen"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "type", "description": "Type text into an input/textarea element by its index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Element index from get_screen"}, "text": {"type": "string", "description": "Text to type"}}, "required": ["index", "text"]}}},
    {"type": "function", "function": {"name": "press_key", "description": "Press a keyboard key.", "parameters": {"type": "object", "properties": {"key": {"type": "string", "description": "Key name: Enter, Tab, Escape, Backspace, ArrowDown, etc."}}, "required": ["key"]}}},
    {"type": "function", "function": {"name": "hotkey", "description": "Press a keyboard shortcut (e.g. ctrl+c, alt+tab).", "parameters": {"type": "object", "properties": {"keys": {"type": "array", "items": {"type": "string"}, "description": "Keys to press together"}}, "required": ["keys"]}}},
    {"type": "function", "function": {"name": "scroll", "description": "Scroll the page.", "parameters": {"type": "object", "properties": {"direction": {"type": "string", "enum": ["up", "down"]}, "amount": {"type": "integer", "description": "Scroll amount (default 3)"}}, "required": ["direction"]}}},
    {"type": "function", "function": {"name": "navigate", "description": "Navigate the browser to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string", "description": "Full URL including https://"}}, "required": ["url"]}}},
    {"type": "function", "function": {"name": "evaluate", "description": "Run JavaScript in the page and return the result.", "parameters": {"type": "object", "properties": {"expression": {"type": "string", "description": "JavaScript expression to evaluate"}}, "required": ["expression"]}}},

    # ── Tab management ─────────────────────────────────────────────
    {"type": "function", "function": {"name": "open_tab", "description": "Open a new browser tab and navigate to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string", "description": "URL to open"}}, "required": []}}},
    {"type": "function", "function": {"name": "list_tabs", "description": "List all open browser tabs.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "switch_tab", "description": "Switch to a specific tab by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Tab index"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "close_tab", "description": "Close a specific tab by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Tab index to close"}}, "required": ["index"]}}},

    # ── Shell & code execution ─────────────────────────────────────
    {"type": "function", "function": {"name": "shell", "description": "Execute a shell command (bash). Use for system operations, installing packages, running scripts, etc.", "parameters": {"type": "object", "properties": {"command": {"type": "string", "description": "Shell command to run"}}, "required": ["command"]}}},
    {"type": "function", "function": {"name": "run_code", "description": "Execute code in a sandboxed runtime. Supports Python (Jupyter kernel) or JavaScript (Node.js).", "parameters": {"type": "object", "properties": {"code": {"type": "string", "description": "Code to execute"}, "language": {"type": "string", "enum": ["python", "javascript"], "description": "Language (default: python)"}}, "required": ["code"]}}},

    # ── File system ────────────────────────────────────────────────
    {"type": "function", "function": {"name": "read_file", "description": "Read the contents of a file in the sandbox.", "parameters": {"type": "object", "properties": {"path": {"type": "string", "description": "Absolute file path"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "write_file", "description": "Write content to a file in the sandbox (creates or overwrites).", "parameters": {"type": "object", "properties": {"path": {"type": "string", "description": "Absolute file path"}, "content": {"type": "string", "description": "File content to write"}}, "required": ["path", "content"]}}},
    {"type": "function", "function": {"name": "list_files", "description": "List files and directories at a path.", "parameters": {"type": "object", "properties": {"path": {"type": "string", "description": "Directory path (default: /)"}}, "required": []}}},
    {"type": "function", "function": {"name": "find_files", "description": "Find files by name pattern (glob).", "parameters": {"type": "object", "properties": {"pattern": {"type": "string", "description": "Glob pattern (e.g. *.py, **/*.json)"}, "path": {"type": "string", "description": "Search root path"}}, "required": ["pattern"]}}},
    {"type": "function", "function": {"name": "search_files", "description": "Search for text within files (grep).", "parameters": {"type": "object", "properties": {"query": {"type": "string", "description": "Text or regex to search for"}, "path": {"type": "string", "description": "Directory to search in"}}, "required": ["query"]}}},

    # ── Package installation ───────────────────────────────────────
    {"type": "function", "function": {"name": "install_package", "description": "Install a package via pip, npm, or apt. Auto-detects manager from package name.", "parameters": {"type": "object", "properties": {"package": {"type": "string", "description": "Package name to install"}, "manager": {"type": "string", "enum": ["auto", "pip", "npm", "apt"], "description": "Package manager (default: auto)"}}, "required": ["package"]}}},

    # ── Dynamic planner ────────────────────────────────────────────
    {"type": "function", "function": {"name": "add_subtask", "description": "Add a subtask to the dynamic plan. Use to break complex tasks into steps.", "parameters": {"type": "object", "properties": {"description": {"type": "string", "description": "Subtask description"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "update_subtask", "description": "Update a subtask's status (pending/active/completed/failed/skipped).", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer", "description": "Subtask ID"}, "status": {"type": "string", "enum": ["active", "completed", "failed", "skipped"], "description": "New status"}, "result": {"type": "string", "description": "Result or notes"}}, "required": ["task_id", "status"]}}},
    {"type": "function", "function": {"name": "remove_subtask", "description": "Remove a subtask from the plan.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer", "description": "Subtask ID to remove"}}, "required": ["task_id"]}}},
    {"type": "function", "function": {"name": "reorder_subtasks", "description": "Reorder subtasks by providing IDs in the desired order.", "parameters": {"type": "object", "properties": {"order": {"type": "array", "items": {"type": "integer"}, "description": "List of subtask IDs in desired order"}}, "required": ["order"]}}},
    {"type": "function", "function": {"name": "get_plan", "description": "View the current task plan and subtask statuses.", "parameters": {"type": "object", "properties": {}, "required": []}}},

    # ── Done ──────────────────────────────────────────────────────
    {"type": "function", "function": {"name": "done", "description": "Mark the task as complete and provide a summary.", "parameters": {"type": "object", "properties": {"summary": {"type": "string", "description": "Detailed summary of what was accomplished"}}, "required": ["summary"]}}},
]


SYSTEM_PROMPT = """You are a highly capable AI agent with full computer control — browser, terminal, file system, code execution, and desktop.

## STRATEGY SELECTION (Critical)
Before acting on ANY task, ask yourself:
1. Is there an API or CLI tool for this? (Use shell/API — fastest and most reliable)
2. Is this a file operation? (Use read_file/write_file — not browser)
3. Is this a code execution task? (Use run_code — not GUI)
4. Only fall back to GUI/browser clicking if neither API, shell, nor code execution applies.

This eliminates 50%+ of unnecessary browser automation, which is your slowest and most fragile path.

## FULL OS ACCESS
You have access to:
- Full desktop (not just browser): use hotkey for alt+tab, window management
- Terminal (shell): run any bash command, install packages, manage files
- File system: read, write, find, search files anywhere in the sandbox
- Code execution: Python (Jupyter) and JavaScript (Node.js)
- Browser: navigate, click, type, scroll, evaluate JS
- Package installation: pip, npm, apt

## SELF-EXTENSION
You can write and run scripts on the fly:
- Write a Python script to process data, then run it
- Chain tools: shell("curl ...") → write_file(...) → read_file(...)
- Use primitives (shell, file I/O, HTTP) to compose new capabilities

## DYNAMIC PLANNING
Use add_subtask/update_subtask to manage your plan:
- Break complex tasks into subtasks at the start
- Update subtask status as you complete them
- Reorder if you discover a better path
- Remove unnecessary steps

## STEP BUDGET
- Soft limit: aim for 10-15 steps maximum for complex tasks
- Periodically check: "Am I on track? Should I adjust my plan?"
- If you're stuck after 3 failed attempts on the same step, try a different approach

## FAILURE MEMORY
When an approach fails:
1. Record WHY it failed (wrong element? timing? permissions?)
2. Don't repeat the same failed approach
3. Try an alternative strategy

## CONTEXT MANAGEMENT
- Keep your reasoning concise
- Focus on what matters for the current step
- Summarize completed work briefly

## AMBIGUITY HANDLING
When instructions are underspecified:
- State your assumptions: "I'll assume you want X since no specifics were given"
- Proceed with reasonable defaults
- Don't freeze or hallucinate

## RISKY ACTIONS
For irreversible actions (payments, sends, deletes, large file operations):
- Describe what you're about to do
- Wait for user confirmation before proceeding

## FOR CHAT
For simple greetings, questions, or conversation — just respond with text directly. Only use tools when the user asks you to DO something.

## EXECUTION PATTERN
1. Call get_screen or get_page_text to understand the current state
2. Plan your approach (use add_subtask for complex tasks)
3. Execute actions efficiently
4. Verify with screenshot_diff after important actions
5. Call done with a comprehensive summary when finished"""


# ── Per-run state reset ─────────────────────────────────────────────────────

def reset_agent_state():
    global _planner, _logger, _compressor, _failures, _screenshot_before, _screenshot_after
    _planner = DynamicPlanner()
    _logger = ActionLogger()
    _compressor = ContextCompressor()
    _failures = FailureMemory()
    _screenshot_before = ""
    _screenshot_after = ""


async def maximize_browser():
    """Try to maximize the browser window in the sandbox to fill the desktop."""
    try:
        await sandbox_post("/v1/browser/page/evaluate", {
            "expression": "try { window.moveTo(0, 0); window.resizeTo(screen.availWidth, screen.availHeight); 'maximized'; } catch(e) { 'error: ' + e.message; }"
        })
    except Exception:
        pass


# ── LLM caller ──────────────────────────────────────────────────────────────

async def call_llm_with_tools(messages: list[dict]) -> dict:
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"

    # Compress context if too long
    messages = _compressor.compress_if_needed(messages)

    async with httpx.AsyncClient(timeout=120) as c:
        resp = await c.post(
            f"{LLM_BASE}/chat/completions",
            headers=headers,
            json={
                "model": LLM_MODEL,
                "messages": messages,
                "tools": COMPUTER_TOOLS,
                "tool_choice": "auto",
                "temperature": 0.1,
                "max_tokens": 2048,
            },
        )
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]


# ── Broadcast to WebSocket clients ──────────────────────────────────────────

async def broadcast(msg: dict):
    dead = []
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.remove(ws)


# ── Autonomous agent loop ──────────────────────────────────────────────────

async def run_agent(task: str):
    reset_agent_state()
    await maximize_browser()
    await broadcast({"type": "system", "text": f"Task: {task}"})
    await broadcast({"type": "plan", "plan": _planner.to_dict()})
    messages = [{"role": "user", "content": task}]

    max_steps = 20  # Soft limit — agent decides when to stop

    for step in range(max_steps):
        await broadcast({"type": "thinking", "text": f"Step {step + 1}: Thinking..."})

        # Add failure context if any
        failure_ctx = _failures.get_context()
        if failure_ctx and step > 0:
            messages.append({"role": "system", "content": failure_ctx})

        try:
            assistant_msg = await call_llm_with_tools([
                {"role": "system", "content": SYSTEM_PROMPT},
                *messages,
            ])
        except Exception as e:
            await broadcast({"type": "error", "text": f"LLM error: {e}"})
            break

        tool_calls = assistant_msg.get("tool_calls") or []

        if not tool_calls:
            text = assistant_msg.get("content", "Done.")
            await broadcast({"type": "assistant", "text": text})
            await broadcast({"type": "system", "text": "Agent finished."})
            break

        messages.append(assistant_msg)

        for tc in tool_calls:
            fn = tc.get("function", {})
            fn_name = fn.get("name", "")
            try:
                fn_args = json.loads(fn.get("arguments", "{}"))
            except json.JSONDecodeError:
                fn_args = {}

            await broadcast({"type": "action", "text": f"Executing: {fn_name}", "action": fn_name, "params": fn_args})

            # Take screenshot before action for diff
            _screenshot_before = await take_screenshot_base64()

            # Execute
            t0 = time.time()
            result = await execute_action({"action": fn_name, **fn_args})
            elapsed = round(time.time() - t0, 2)

            # Take screenshot after
            _screenshot_after = await take_screenshot_base64()

            # Log action
            success = "error" not in result.lower() and "timed out" not in result.lower()
            _logger.log(fn_name, fn_args, result, success, _screenshot_before, _screenshot_after)

            # Record failures
            if not success:
                _failures.record(fn_name, result[:200])

            # Broadcast result
            await broadcast({
                "type": "screen",
                "text": result[:2000],
                "action": fn_name,
                "success": success,
                "elapsed": elapsed,
                "step": step + 1,
            })

            # Broadcast updated plan
            await broadcast({"type": "plan", "plan": _planner.to_dict()})

            # Broadcast action log
            await broadcast({"type": "action_log", "log": _logger.get_summary()})

            # Feed result back to LLM
            messages.append({
                "role": "tool",
                "tool_call_id": tc.get("id", ""),
                "content": result or "Action executed.",
            })

            if fn_name == "done":
                await broadcast({"type": "system", "text": fn_args.get("summary", "Done.")})
                await broadcast({"type": "system", "text": "Agent finished."})
                return

    await broadcast({"type": "system", "text": "Agent loop ended (step budget reached)."})


# ── WebSocket endpoint ──────────────────────────────────────────────────────

@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") == "task":
                text = data.get("text", "")
                if text.startswith("execute:"):
                    action_json = text[len("execute:"):]
                    try:
                        action = json.loads(action_json)
                        result = await execute_action(action)
                        await ws.send_json({"type": "screen", "text": result or "Action executed."})
                    except Exception as e:
                        await ws.send_json({"type": "screen", "text": f"Error: {e}"})
                else:
                    asyncio.create_task(run_agent(text))
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        if ws in clients:
            clients.remove(ws)


# ── REST endpoints ──────────────────────────────────────────────────────────

@app.post("/agent/inject")
async def agent_inject(request: dict):
    instruction = request.get("instruction", "")
    if not instruction:
        raise HTTPException(status_code=400, detail="No instruction provided")
    asyncio.create_task(run_agent(instruction))
    return {"status": "accepted", "instruction": instruction}


@app.post("/agent/execute")
async def agent_execute(request: dict):
    action = request.get("action", "")
    if not action:
        raise HTTPException(status_code=400, detail="No action provided")
    try:
        result = await execute_action(request)
        return {"status": "ok", "action": action, "result": result}
    except Exception as e:
        return {"status": "error", "action": action, "result": str(e)}


@app.get("/agent/screen")
async def agent_screen():
    screen = await get_screen()
    return {"screen": screen}


@app.get("/agent/plan")
async def agent_plan():
    return {"plan": _planner.to_dict(), "text": _planner.to_text()}


@app.get("/agent/log")
async def agent_log():
    return {"log": _logger.to_dict(), "summary": _logger.get_summary(), "failures": _logger.get_failures()}


@app.get("/health")
def health():
    return JSONResponse({"status": "ok"})
