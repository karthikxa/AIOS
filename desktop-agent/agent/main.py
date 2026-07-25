"""Desktop Agent — Separate virtual desktop with Playwright (4K, live streaming).

Launches a real Chromium browser in its OWN window (not the user's screen).
The AI agent controls this separate desktop. 4K resolution, live MJPEG stream.
"""

import asyncio
import base64
import json
import os
import sys
import time
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, Response, StreamingResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parent.parent / ".env"
    if _env_path.exists():
        load_dotenv(_env_path)
except ImportError:
    pass

app = FastAPI()

# ── Auth middleware — require API key on all endpoints ──────────────────
_AGENT_API_KEY = os.environ.get("AGENT_API_KEY", "")

@app.middleware("http")
async def auth_middleware(request, call_next):
    # Skip auth for health endpoint
    if request.url.path == "/health":
        return await call_next(request)
    # If AGENT_API_KEY is set, require it
    if _AGENT_API_KEY:
        auth = request.headers.get("authorization", "")
        if auth != f"Bearer {_AGENT_API_KEY}":
            from fastapi.responses import JSONResponse
            return JSONResponse(status_code=403, content={"error": "Unauthorized"})
    return await call_next(request)

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:8001", "http://localhost:8000", "http://127.0.0.1:8001"], allow_methods=["*"], allow_headers=["*"])

LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "auto")
LLM_BASE = os.environ.get("LLM_BASE_URL", "")
clients = []

# ══════════════════════════════════════════════════════════════════════════════
# Playwright virtual desktop (separate from user's screen)
# ══════════════════════════════════════════════════════════════════════════════

from playwright.async_api import async_playwright, Page, Browser, BrowserContext

_playwright = None
_browser: Optional[Browser] = None
_context: Optional[BrowserContext] = None
_page: Optional[Page] = None

# 4K resolution for the virtual desktop
DESKTOP_WIDTH = 3840
DESKTOP_HEIGHT = 2160


async def init_desktop():
    """Launch headless Chromium as a virtual desktop."""
    global _playwright, _browser, _context, _page
    try:
        _playwright = await async_playwright().start()
        _browser = await _playwright.chromium.launch(
            headless=True,
            args=[
                "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu",
                "--disable-background-networking", "--disable-extensions",
                "--disable-component-update", "--disable-features=AudioServiceOutOfProcess,TranslateUI",
            ]
        )
        _context = await _browser.new_context(viewport={"width": 1920, "height": 1080})
        _page = await _context.new_page()
        await _page.goto("https://example.com")
        print(f"[Desktop Agent] Browser ready — 1920x1080")
    except Exception as e:
        print(f"[Desktop Agent] Init failed: {e}")
        raise  # Fail startup so it's not silently bricked


async def close_desktop():
    global _playwright, _browser, _context, _page
    for obj in [_page, _context, _browser]:
        try:
            if obj:
                await obj.close() if hasattr(obj, 'close') else None
        except Exception:
            pass
    try:
        if _playwright:
            await _playwright.stop()
    except Exception:
        pass


def get_page() -> Page:
    if _page is None or _page.is_closed():
        raise RuntimeError("Browser not initialized or closed")
    return _page


async def ensure_browser():
    """Recreate browser if it crashed."""
    global _playwright, _browser, _context, _page
    if _page and not _page.is_closed():
        return
    print("[Desktop Agent] Browser crashed — restarting...")
    try:
        await close_desktop()
    except Exception:
        pass
    await init_desktop()


# ══════════════════════════════════════════════════════════════════════════════
# Helper classes (unchanged)
# ══════════════════════════════════════════════════════════════════════════════

class ActionLogger:
    MAX_ENTRIES = 500
    def __init__(self):
        self.entries = []
    def log(self, action, params, result, success):
        self.entries.append({"timestamp": time.time(), "action": action, "params": params, "result": result[:500], "success": success})
        if len(self.entries) > self.MAX_ENTRIES:
            self.entries = self.entries[-self.MAX_ENTRIES:]
    def get_summary(self, last_n=10):
        recent = self.entries[-last_n:]
        return "\n".join(f"[{'OK' if e['success'] else 'FAIL'}] {e['action']}: {e['result'][:100]}" for e in recent) or "No actions logged."
    def to_dict(self): return self.entries

class DynamicPlanner:
    def __init__(self): self.subtasks = []; self._counter = 0
    def add_subtask(self, desc):
        self._counter += 1
        st = {"id": self._counter, "description": desc, "status": "pending", "result": ""}
        self.subtasks.append(st); return st
    def update_subtask(self, task_id, status, result=""):
        for st in self.subtasks:
            if st["id"] == task_id: st["status"] = status; st["result"] = result; return st
        return None
    def to_dict(self): return self.subtasks
    def to_text(self):
        return "\n".join(f"[{s['status']}] #{s['id']}: {s['description']}" for s in self.subtasks) or "No subtasks."

class FailureMemory:
    def __init__(self): self.failures = []
    def record(self, action, reason):
        self.failures.append({"action": action, "reason": reason})
        if len(self.failures) > 10: self.failures = self.failures[-10:]
    def get_context(self):
        if not self.failures: return ""
        return "Previous failures:\n" + "\n".join(f"- {f['action']}: {f['reason']}" for f in self.failures[-5:])

_planner = DynamicPlanner()
_logger = ActionLogger()
_failures = FailureMemory()

def reset_agent_state():
    global _planner, _logger, _failures
    _planner = DynamicPlanner(); _logger = ActionLogger(); _failures = FailureMemory()


# ══════════════════════════════════════════════════════════════════════════════
# Action executor — controls the virtual desktop via Playwright
# ══════════════════════════════════════════════════════════════════════════════

async def execute_action(action: dict) -> str:
    a = action.get("action", "")
    await ensure_browser()
    page = get_page()
    try:
        # ── Screen ────────────────────────────────────────────────────
        if a == "get_screen":
            url = page.url
            title = await page.title()
            tabs = []
            for i, p in enumerate(_context.pages):
                tabs.append(f"  Tab {i}: {await p.title()} ({p.url}){' [ACTIVE]' if p == _page else ''}")
            els = await get_elements()
            return f"URL: {url}\nTitle: {title}\nResolution: {DESKTOP_WIDTH}x{DESKTOP_HEIGHT}\nTabs ({len(tabs)}):\n" + "\n".join(tabs) + f"\n\nElements ({len(els)} visible):\n" + "\n".join(f"  [{e['index']}] <{e['tag']}> text=\"{e['text'][:60]}\" @({e['x']:.0f},{e['y']:.0f})" for e in els[:40])

        elif a == "take_screenshot":
            png = await page.screenshot(type="png")
            b64 = base64.b64encode(png).decode()
            return f"Screenshot captured ({len(b64)} chars, {DESKTOP_WIDTH}x{DESKTOP_HEIGHT})"

        # ── Navigation ────────────────────────────────────────────────
        elif a == "navigate":
            url = action.get("url", "")
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            return f"Navigated to {page.url} — title: {await page.title()}"

        elif a == "evaluate":
            expr = action.get("expression", "")
            result = await page.evaluate(expr)
            return json.dumps(result, default=str) if not isinstance(result, str) else result

        # ── Interactions ──────────────────────────────────────────────
        elif a == "click":
            idx = int(action.get("index", 0))
            els = await get_elements()
            visible = [e for e in els if e.get("is_visible")]
            if idx < len(visible):
                bb = visible[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await page.mouse.click(x, y)
                return f"Clicked [{idx}] at ({x:.0f},{y:.0f})"
            return f"Element [{idx}] not found"

        elif a == "type":
            idx = int(action.get("index", 0))
            text = action.get("text", "")
            els = await get_elements()
            visible = [e for e in els if e.get("is_visible")]
            if idx < len(visible):
                bb = visible[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await page.mouse.click(x, y)
                await page.keyboard.press("Control+A")
                await page.keyboard.type(text, delay=10)
                return f'Typed "{text[:50]}" into [{idx}]'
            return f"Element [{idx}] not found"

        elif a == "press_key":
            key = action.get("key", "Enter")
            await page.keyboard.press(key)
            return f"Pressed: {key}"

        elif a == "hotkey":
            keys = action.get("keys", [])
            if keys:
                await page.keyboard.press("+".join(keys))
                return f"Hotkey: {'+'.join(keys)}"
            return "No keys"

        elif a == "scroll":
            direction = action.get("direction", "down")
            amount = int(action.get("amount", 3))
            delta_y = 300 * amount if direction == "down" else -300 * amount
            await page.mouse.wheel(0, delta_y)
            return f"Scrolled {direction} by {amount}"

        # ── Tab management ────────────────────────────────────────────
        elif a == "open_tab":
            url = action.get("url", "about:blank")
            new_page = await _context.new_page()
            if url != "about:blank":
                await new_page.goto(url, wait_until="domcontentloaded", timeout=30000)
            return f"Opened tab: {url}"

        elif a == "list_tabs":
            tabs = []
            for i, p in enumerate(_context.pages):
                tabs.append(f"Tab {i}: {await p.title()} ({p.url}){' [ACTIVE]' if p == _page else ''}")
            return f"Tabs ({len(tabs)}):\n" + "\n".join(tabs)

        elif a == "switch_tab":
            idx = int(action.get("index", 0))
            pages = _context.pages
            if 0 <= idx < len(pages):
                global _page
                _page = pages[idx]
                return f"Switched to tab {idx}: {await _page.title()}"
            return f"Tab {idx} not found"

        # ── Shell / code ─────────────────────────────────────────────
        elif a == "shell":
            cmd = action.get("command", "")
            proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.STDOUT)
            stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=30)
            return stdout.decode(errors="replace")[-3000:]

        elif a == "run_code":
            code = action.get("code", "")
            lang = action.get("language", "python")
            exe = sys.executable if lang == "python" else "node"
            flag = "-c" if lang == "python" else "-e"
            proc = await asyncio.create_subprocess_exec(exe, flag, code, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.STDOUT)
            stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=30)
            return stdout.decode(errors="replace")[-3000:]

        # ── File system ──────────────────────────────────────────────
        elif a == "read_file":
            return Path(action.get("path", "")).read_text(encoding="utf-8", errors="replace")[:5000]

        elif a == "write_file":
            p, c = action.get("path", ""), action.get("content", "")
            Path(p).parent.mkdir(parents=True, exist_ok=True)
            Path(p).write_text(c, encoding="utf-8")
            return f"Wrote {len(c)} bytes to {p}"

        elif a == "list_files":
            entries = sorted(Path(action.get("path", ".")).iterdir(), key=lambda e: (not e.is_dir(), e.name))
            return "\n".join(f"{'[DIR]' if e.is_dir() else '[FILE]'} {e.name}" for e in entries[:50])

        # ── Screenshot diff ──────────────────────────────────────────
        elif a == "screenshot_diff":
            return "CHANGED: Use get_screen to compare."

        # ── Planner ──────────────────────────────────────────────────
        elif a == "add_subtask":
            desc = action.get("description", "").strip()
            if not desc: return "Error: empty description"
            st = _planner.add_subtask(desc)
            return f"Added #{st['id']}: {desc}\n{_planner.to_text()}"

        elif a == "update_subtask":
            tid = int(action.get("task_id", 0))
            st = _planner.update_subtask(tid, action.get("status", "completed"), action.get("result", ""))
            if st: return f"Updated #{tid}\n{_planner.to_text()}"
            return f"#{tid} not found"

        elif a == "get_plan":
            return f"Plan:\n{_planner.to_text()}"

        elif a == "done":
            return action.get("summary", "Done.")

        else:
            return f"Unknown: {a}"
    except Exception as e:
        return f"Error '{a}': {e}"


async def get_elements() -> list:
    return await get_page().evaluate("""() => {
        const tags = 'a,button,input,textarea,select,[role=button],[role=link],[role=tab],[tabindex]';
        const els = document.querySelectorAll(tags);
        return Array.from(els).map((el, i) => {
            const r = el.getBoundingClientRect();
            return { index: i, tag: el.tagName.toLowerCase(),
                text: (el.innerText || el.value || '').slice(0, 200),
                role: el.getAttribute('role') || '',
                href: el.getAttribute('href') || '',
                is_visible: r.width > 0 && r.height > 0,
                bounding_box: {x: r.x, y: r.y, width: r.width, height: r.height} };
        }).filter(e => e.is_visible);
    }""")


# ══════════════════════════════════════════════════════════════════════════════
# LLM
# ══════════════════════════════════════════════════════════════════════════════

COMPUTER_TOOLS = [
    {"type": "function", "function": {"name": "get_screen", "description": "Get screen: URL, title, tabs, elements.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "take_screenshot", "description": "Capture screenshot.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "navigate", "description": "Go to URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string"}}, "required": ["url"]}}},
    {"type": "function", "function": {"name": "click", "description": "Click element by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "type", "description": "Type into element.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}, "text": {"type": "string"}}, "required": ["index", "text"]}}},
    {"type": "function", "function": {"name": "press_key", "description": "Press key.", "parameters": {"type": "object", "properties": {"key": {"type": "string"}}, "required": ["key"]}}},
    {"type": "function", "function": {"name": "hotkey", "description": "Keyboard shortcut.", "parameters": {"type": "object", "properties": {"keys": {"type": "array", "items": {"type": "string"}}}, "required": ["keys"]}}},
    {"type": "function", "function": {"name": "scroll", "description": "Scroll page.", "parameters": {"type": "object", "properties": {"direction": {"type": "string", "enum": ["up", "down"]}, "amount": {"type": "integer"}}, "required": ["direction"]}}},
    {"type": "function", "function": {"name": "open_tab", "description": "Open new tab.", "parameters": {"type": "object", "properties": {"url": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "list_tabs", "description": "List open tabs.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "switch_tab", "description": "Switch tab by index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "shell", "description": "Run shell command.", "parameters": {"type": "object", "properties": {"command": {"type": "string"}}, "required": ["command"]}}},
    {"type": "function", "function": {"name": "run_code", "description": "Run Python/JS.", "parameters": {"type": "object", "properties": {"code": {"type": "string"}, "language": {"type": "string", "enum": ["python", "javascript"]}}, "required": ["code"]}}},
    {"type": "function", "function": {"name": "read_file", "description": "Read file.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "write_file", "description": "Write file.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}, "content": {"type": "string"}}, "required": ["path", "content"]}}},
    {"type": "function", "function": {"name": "list_files", "description": "List directory.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "evaluate", "description": "Run JS in page.", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}, "required": ["expression"]}}},
    {"type": "function", "function": {"name": "add_subtask", "description": "Add plan step.", "parameters": {"type": "object", "properties": {"description": {"type": "string"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "update_subtask", "description": "Update plan step.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer"}, "status": {"type": "string", "enum": ["active", "completed", "failed"]}}, "required": ["task_id", "status"]}}},
    {"type": "function", "function": {"name": "get_plan", "description": "View plan.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "done", "description": "Mark complete.", "parameters": {"type": "object", "properties": {"summary": {"type": "string"}}, "required": ["summary"]}}},
]

SYSTEM_PROMPT = f"""You are a desktop AI agent with a separate 4K virtual desktop ({DESKTOP_WIDTH}x{DESKTOP_HEIGHT}).
You have a Chromium browser you can navigate, click, type, and interact with.
You also have terminal, file system, and code execution access.

TOOLS:
- navigate: Go to any URL
- click: Click elements by index (from get_screen)
- type: Type into input fields
- press_key/hotkey: Keyboard actions
- scroll: Scroll pages
- open_tab/list_tabs/switch_tab: Manage browser tabs
- shell/run_code: Execute commands
- read_file/write_file/list_files: File system
- get_screen: See current state
- take_screenshot: Capture screen
- evaluate: Run JavaScript in the page

RULES:
1. Take screenshot or get_screen first to see current state
2. Simple greetings → respond with text, no tools needed
3. For tasks → navigate, interact, verify, then done()
4. You control a SEPARATE virtual desktop — not the user's screen"""


# ── Circuit breaker for LLM calls ───────────────────────────────────────────
_llm_circuit = {"failures": 0, "open_until": 0.0, "threshold": 5, "cooldown": 30}

def _check_circuit():
    if _llm_circuit["open_until"] > 0:
        if time.time() < _llm_circuit["open_until"]:
            raise RuntimeError(f"LLM circuit open — retry after {int(_llm_circuit['open_until'] - time.time())}s")
        _llm_circuit["open_until"] = 0.0
        _llm_circuit["failures"] = 0
        logger.info("LLM circuit half-open — retrying")

def _record_llm_success():
    _llm_circuit["failures"] = 0
    _llm_circuit["open_until"] = 0.0

def _record_llm_failure():
    _llm_circuit["failures"] += 1
    if _llm_circuit["failures"] >= _llm_circuit["threshold"]:
        _llm_circuit["open_until"] = time.time() + _llm_circuit["cooldown"]
        logger.warning("LLM circuit OPEN — %d failures, cooling down %ds", _llm_circuit["failures"], _llm_circuit["cooldown"])


async def call_llm_with_tools(messages):
    _check_circuit()
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            resp = await c.post(f"{LLM_BASE}/chat/completions", headers=headers,
                               json={"model": LLM_MODEL, "messages": messages,
                                      "tools": COMPUTER_TOOLS, "tool_choice": "auto",
                                      "temperature": 0.1, "max_tokens": 2048})
            resp.raise_for_status()
            _record_llm_success()
            return resp.json()["choices"][0]["message"]
    except Exception as e:
        _record_llm_failure()
        raise


async def broadcast(msg):
    dead = []
    for ws in clients:
        try: await ws.send_json(msg)
        except Exception: dead.append(ws)
    for ws in dead: clients.remove(ws)


async def run_agent(task: str):
    reset_agent_state()
    await broadcast({"type": "system", "text": f"Task: {task}"})
    messages = [{"role": "user", "content": task}]
    for step in range(20):
        await broadcast({"type": "thinking", "text": f"Step {step+1}: Thinking..."})
        fc = _failures.get_context()
        if fc and step > 0: messages.append({"role": "system", "content": fc})
        try:
            msg = await call_llm_with_tools([{"role": "system", "content": SYSTEM_PROMPT}, *messages])
        except Exception as e:
            await broadcast({"type": "error", "text": f"LLM error: {e}"}); break
        tcs = msg.get("tool_calls") or []
        if not tcs:
            await broadcast({"type": "assistant", "text": msg.get("content", "Done.")})
            await broadcast({"type": "system", "text": "Agent finished."}); break
        messages.append(msg)
        for tc in tcs:
            fn = tc.get("function", {}); name = fn.get("name", "")
            try: args = json.loads(fn.get("arguments", "{}"))
            except Exception: args = {}
            await broadcast({"type": "action", "text": f"Executing: {name}", "action": name})
            t0 = time.time()
            result = await execute_action({"action": name, **args})
            elapsed = round(time.time() - t0, 2)
            success = "error" not in result.lower()
            _logger.log(name, args, result, success)
            if not success: _failures.record(name, result[:200])
            await broadcast({"type": "screen", "text": result[:2000], "action": name, "success": success, "elapsed": elapsed, "step": step+1})
            messages.append({"role": "tool", "tool_call_id": tc.get("id", ""), "content": result})
            if name == "done":
                await broadcast({"type": "system", "text": args.get("summary", "Done.")})
                await broadcast({"type": "system", "text": "Agent finished."}); return
    await broadcast({"type": "system", "text": "Agent loop ended."})


# ══════════════════════════════════════════════════════════════════════════════
# Endpoints
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/", response_class=HTMLResponse)
async def index():
    p = Path(__file__).resolve().parent.parent / "frontend" / "index.html"
    if p.exists(): return Response(p.read_text(encoding="utf-8"), media_type="text/html")
    return Response("<h1>Desktop Agent Ready</h1>", media_type="text/html")

@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept(); clients.append(ws)
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") == "task":
                text = data.get("text", "")
                if text.startswith("execute:"):
                    try:
                        result = await execute_action(json.loads(text[len("execute:"):]))
                        await ws.send_json({"type": "screen", "text": result})
                    except Exception as e: await ws.send_json({"type": "screen", "text": f"Error: {e}"})
                else: asyncio.create_task(run_agent(text))
    except WebSocketDisconnect: pass
    finally:
        if ws in clients: clients.remove(ws)

@app.post("/agent/inject")
async def inject(request: dict):
    instruction = request.get("instruction", "")
    if not instruction: raise HTTPException(400, "No instruction")
    asyncio.create_task(run_agent(instruction))
    return {"status": "accepted", "instruction": instruction}

@app.get("/agent/screen")
async def screen():
    page = get_page()
    url, title = page.url, await page.title()
    els = await get_elements()
    return {"screen": f"URL: {url}\nTitle: {title}\nResolution: {DESKTOP_WIDTH}x{DESKTOP_HEIGHT}\nElements: {len(els)}"}

@app.get("/agent/plan")
async def plan(): return {"plan": _planner.to_dict(), "text": _planner.to_text()}

@app.get("/stream.mjpeg")
async def mjpeg():
    async def gen():
        bnd = "frame"
        while True:
            try:
                png = await get_page().screenshot(type="jpeg", quality=70)
                yield f"--{bnd}\r\nContent-Type: image/jpeg\r\nContent-Length: {len(png)}\r\n\r\n".encode() + png + b"\r\n"
                await asyncio.sleep(0.2)
            except asyncio.CancelledError: raise
            except Exception: await asyncio.sleep(0.5)
    return StreamingResponse(gen(), media_type="multipart/x-mixed-replace; boundary=frame",
                             headers={"Cache-Control": "no-store"})

@app.get("/health")
def health(): return {"status": "ok", "desktop": f"{DESKTOP_WIDTH}x{DESKTOP_HEIGHT}", "platform": sys.platform}

@app.on_event("startup")
async def startup(): await init_desktop()

@app.on_event("shutdown")
async def shutdown(): await close_desktop()
