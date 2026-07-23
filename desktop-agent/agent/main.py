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
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "auto")
LLM_BASE = os.environ.get("LLM_BASE_URL", "https://server-llm-1-0r64.onrender.com/v1")
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
    """Launch a SEPARATE Chromium window as a virtual desktop."""
    global _playwright, _browser, _context, _page
    _playwright = await async_playwright().start()
    _browser = await _playwright.chromium.launch(
        headless=False,  # Visible window — separate from user's screen
        args=[
            f"--window-size={DESKTOP_WIDTH},{DESKTOP_HEIGHT}",
            "--start-maximized",
            "--no-sandbox",
            "--disable-dev-shm-usage",
        ]
    )
    _context = await _browser.new_context(
        viewport={"width": DESKTOP_WIDTH, "height": DESKTOP_HEIGHT},
    )
    _page = await _context.new_page()
    # Open a desktop-like page with app shortcuts
    await _page.set_content("""<!DOCTYPE html>
<html><head><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
       height:100vh; display:flex; flex-direction:column; font-family:'Segoe UI',sans-serif; color:#fff; }
.taskbar { height:48px; background:rgba(0,0,0,0.7); backdrop-filter:blur(20px);
           display:flex; align-items:center; padding:0 16px; gap:12px; border-top:1px solid rgba(255,255,255,0.1); }
.taskbar .start-btn { background:#0078d4; border:none; color:#fff; padding:6px 16px;
                       border-radius:4px; cursor:pointer; font-weight:600; font-size:13px; }
.desktop { flex:1; display:flex; flex-wrap:wrap; padding:24px; gap:16px; align-content:flex-start; }
.app-shortcut { width:90px; text-align:center; cursor:pointer; padding:8px; border-radius:8px; }
.app-shortcut:hover { background:rgba(255,255,255,0.1); }
.app-shortcut .icon { width:48px; height:48px; border-radius:12px; margin:0 auto 6px;
                       display:flex; align-items:center; justify-content:center; font-size:24px; }
.app-shortcut .name { font-size:11px; color:rgba(255,255,255,0.85); }
.browser-icon { background:linear-gradient(135deg,#4285f4,#34a853); }
.terminal-icon { background:#1a1a1a; border:1px solid #333; }
.files-icon { background:#f5ba42; }
.code-icon { background:#007acc; }
.settings-icon { background:#444; }
</style></head><body>
<div class="desktop">
  <div class="app-shortcut" onclick="navigate('chrome')"><div class="icon browser-icon">🌐</div><div class="name">Browser</div></div>
  <div class="app-shortcut" onclick="navigate('terminal')"><div class="icon terminal-icon">⌨️</div><div class="name">Terminal</div></div>
  <div class="app-shortcut" onclick="navigate('files')"><div class="icon files-icon">📁</div><div class="name">Files</div></div>
  <div class="app-shortcut" onclick="navigate('code')"><div class="icon code-icon">📝</div><div class="name">Code Editor</div></div>
  <div class="app-shortcut" onclick="navigate('settings')"><div class="icon settings-icon">⚙️</div><div class="name">Settings</div></div>
</div>
<div class="taskbar">
  <button class="start-btn">⊞ Start</button>
  <span style="color:#aaa; font-size:12px;">Desktop Agent — 4K Virtual Desktop</span>
  <span style="margin-left:auto; color:#aaa; font-size:12px;" id="clock"></span>
</div>
<script>
function navigate(app) {
  const urls = { chrome:'https://google.com', terminal:'about:blank', files:'about:blank', code:'about:blank', settings:'about:blank' };
  window.location.href = urls[app] || 'about:blank';
}
setInterval(()=>{ document.getElementById('clock').textContent=new Date().toLocaleTimeString(); }, 1000);
</script>
</body></html>""")
    print(f"[Desktop Agent] Virtual desktop ready — {DESKTOP_WIDTH}x{DESKTOP_HEIGHT}")


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
    if _page is None:
        raise RuntimeError("Desktop not initialized")
    return _page


# ══════════════════════════════════════════════════════════════════════════════
# Helper classes (unchanged)
# ══════════════════════════════════════════════════════════════════════════════

class ActionLogger:
    def __init__(self):
        self.entries = []
    def log(self, action, params, result, success):
        self.entries.append({"timestamp": time.time(), "action": action, "params": params, "result": result[:500], "success": success})
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
                tab_page = pages[idx]
                return f"Switched to tab {idx}: {await tab_page.title()}"
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


async def call_llm_with_tools(messages):
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"
    async with httpx.AsyncClient(timeout=120) as c:
        resp = await c.post(f"{LLM_BASE}/chat/completions", headers=headers,
                           json={"model": LLM_MODEL, "messages": messages,
                                  "tools": COMPUTER_TOOLS, "tool_choice": "auto",
                                  "temperature": 0.1, "max_tokens": 2048})
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]


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
            except: args = {}
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
            except: await asyncio.sleep(0.5)
    return StreamingResponse(gen(), media_type="multipart/x-mixed-replace; boundary=frame",
                             headers={"Cache-Control": "no-store"})

@app.get("/health")
def health(): return {"status": "ok", "desktop": f"{DESKTOP_WIDTH}x{DESKTOP_HEIGHT}", "platform": sys.platform}

@app.on_event("startup")
async def startup(): await init_desktop()

@app.on_event("shutdown")
async def shutdown(): await close_desktop()
