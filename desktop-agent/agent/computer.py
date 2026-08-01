"""Desktop Computer Agent — Full Windows desktop capture & control.

Captures the ENTIRE Windows screen (or virtual display) via mss and streams
it live via WebSocket. The agent controls the real desktop: can open Chrome,
Notepad, Explorer, terminal — anything.

This is the "Computer Use" model: full desktop, not just a browser.
"""

import asyncio
import base64
import io
import json
import logging
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

import mss
import mss.tools
import pyautogui
from PIL import Image

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("desktop-computer")

app = FastAPI()

# ── CORS — allow frontend ───────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Auth — skip for health / stream ────────────────────────────────────────
_API_KEY = os.environ.get("AGENT_API_KEY", "")

@app.middleware("http")
async def auth_middleware(request, call_next):
    skip = ("/health", "/stream", "/screenshot", "/stream.mjpeg")
    if any(request.url.path.startswith(p) for p in skip):
        return await call_next(request)
    if _API_KEY:
        if request.headers.get("authorization", "") != f"Bearer {_API_KEY}":
            return JSONResponse(status_code=403, content={"error": "Unauthorized"})
    return await call_next(request)

# ── Screen capture config ───────────────────────────────────────────────────
STREAM_FPS   = 20
STREAM_QUAL  = 75      # JPEG quality (0-100)
MONITOR_IDX  = 1       # 1 = primary monitor (mss uses 1-based)

# pyautogui safety settings
pyautogui.FAILSAFE = False   # Don't throw on corner move
pyautogui.PAUSE    = 0.05   # 50ms between actions

# WebSocket clients for broadcasting agent events
clients = []

LLM_BASE  = os.environ.get("LLM_BASE_URL", "")
LLM_KEY   = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "auto")


# ══════════════════════════════════════════════════════════════════════════════
# Screen helpers
# ══════════════════════════════════════════════════════════════════════════════

def capture_screen_jpeg(quality: int = STREAM_QUAL) -> bytes:
    """Capture full primary monitor and return JPEG bytes."""
    with mss.mss() as sct:
        mon = sct.monitors[MONITOR_IDX]
        img = sct.grab(mon)
        pil = Image.frombytes("RGB", img.size, img.bgra, "raw", "BGRX")
        buf = io.BytesIO()
        pil.save(buf, format="JPEG", quality=quality, optimize=False)
        return buf.getvalue()


def get_screen_size():
    with mss.mss() as sct:
        mon = sct.monitors[MONITOR_IDX]
        return mon["width"], mon["height"]


# ══════════════════════════════════════════════════════════════════════════════
# Desktop action executor
# ══════════════════════════════════════════════════════════════════════════════

async def execute_action(action: dict) -> str:
    a = action.get("action", "")
    try:
        # ── Screenshot ───────────────────────────────────────────────────
        if a == "screenshot":
            jpg = capture_screen_jpeg(quality=60)
            b64 = base64.b64encode(jpg).decode()
            w, h = get_screen_size()
            return f"Screenshot captured ({w}x{h}, {len(jpg)} bytes)"

        # ── Mouse ────────────────────────────────────────────────────────
        elif a == "move_mouse":
            x, y = int(action.get("x", 0)), int(action.get("y", 0))
            pyautogui.moveTo(x, y, duration=0.1)
            return f"Moved mouse to ({x}, {y})"

        elif a == "click":
            x   = action.get("x")
            y   = action.get("y")
            btn = action.get("button", "left")
            if x is not None and y is not None:
                pyautogui.click(int(x), int(y), button=btn)
                return f"Clicked {btn} at ({x}, {y})"
            # Click current position
            pyautogui.click(button=btn)
            return f"Clicked {btn} at current position"

        elif a == "double_click":
            x, y = int(action.get("x", 0)), int(action.get("y", 0))
            pyautogui.doubleClick(x, y)
            return f"Double-clicked at ({x}, {y})"

        elif a == "right_click":
            x, y = int(action.get("x", 0)), int(action.get("y", 0))
            pyautogui.rightClick(x, y)
            return f"Right-clicked at ({x}, {y})"

        elif a == "drag":
            fx, fy = int(action.get("from_x", 0)), int(action.get("from_y", 0))
            tx, ty = int(action.get("to_x", 0)),   int(action.get("to_y", 0))
            pyautogui.drag(fx, fy, tx - fx, ty - fy, duration=0.3, button="left")
            return f"Dragged ({fx},{fy}) → ({tx},{ty})"

        elif a == "scroll":
            x   = int(action.get("x", pyautogui.position().x))
            y   = int(action.get("y", pyautogui.position().y))
            amt = int(action.get("amount", 3))
            direction = action.get("direction", "down")
            clicks = -amt if direction == "down" else amt
            pyautogui.scroll(clicks, x=x, y=y)
            return f"Scrolled {direction} {amt} clicks at ({x},{y})"

        # ── Keyboard ─────────────────────────────────────────────────────
        elif a == "type":
            text = action.get("text", "")
            pyautogui.write(text, interval=0.02)
            return f"Typed: {text[:80]}"

        elif a == "press_key":
            key = action.get("key", "enter")
            pyautogui.press(key)
            return f"Pressed: {key}"

        elif a == "hotkey":
            keys = action.get("keys", [])
            pyautogui.hotkey(*keys)
            return f"Hotkey: {'+'.join(keys)}"

        # ── Applications ─────────────────────────────────────────────────
        elif a == "open_browser":
            url = action.get("url", "https://www.google.com")
            subprocess.Popen(["start", "chrome", url], shell=True)
            await asyncio.sleep(1.5)
            return f"Opened Chrome at {url}"

        elif a == "open_terminal":
            subprocess.Popen(["start", "cmd"], shell=True)
            await asyncio.sleep(0.8)
            return "Opened terminal (cmd.exe)"

        elif a == "open_explorer":
            path = action.get("path", os.path.expanduser("~"))
            subprocess.Popen(["explorer", path])
            await asyncio.sleep(0.8)
            return f"Opened Explorer at {path}"

        elif a == "open_notepad":
            file = action.get("file", "")
            cmd = ["notepad"] + ([file] if file else [])
            subprocess.Popen(cmd)
            await asyncio.sleep(0.8)
            return f"Opened Notepad{' with ' + file if file else ''}"

        elif a == "run_command":
            cmd   = action.get("command", "")
            shell = action.get("shell", True)
            timeout = int(action.get("timeout", 15))
            proc = await asyncio.create_subprocess_shell(
                cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.STDOUT,
                shell=shell
            )
            stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=timeout)
            return stdout.decode(errors="replace")[-3000:]

        elif a == "launch_app":
            app_path = action.get("path", "")
            args     = action.get("args", [])
            subprocess.Popen([app_path] + args, shell=True)
            await asyncio.sleep(0.8)
            return f"Launched: {app_path}"

        # ── File system ──────────────────────────────────────────────────
        elif a == "read_file":
            return Path(action.get("path", "")).read_text(encoding="utf-8", errors="replace")[:5000]

        elif a == "write_file":
            p = action.get("path", "")
            c = action.get("content", "")
            Path(p).parent.mkdir(parents=True, exist_ok=True)
            Path(p).write_text(c, encoding="utf-8")
            return f"Wrote {len(c)} bytes to {p}"

        elif a == "list_files":
            p = Path(action.get("path", "."))
            entries = sorted(p.iterdir(), key=lambda e: (not e.is_dir(), e.name))
            return "\n".join(f"{'[DIR]' if e.is_dir() else '[FILE]'} {e.name}" for e in entries[:50])

        elif a == "get_cursor_position":
            pos = pyautogui.position()
            return f"Cursor at ({pos.x}, {pos.y})"

        elif a == "get_screen_size":
            w, h = get_screen_size()
            return f"Screen: {w}x{h}"

        elif a == "done":
            return action.get("summary", "Done.")

        else:
            return f"Unknown action: {a}"

    except Exception as e:
        return f"Error in '{a}': {e}"


# ══════════════════════════════════════════════════════════════════════════════
# LLM agent loop
# ══════════════════════════════════════════════════════════════════════════════

W, H = 1920, 1080  # will be set at startup

DESKTOP_TOOLS = [
    {"type": "function", "function": {"name": "screenshot",        "description": "Take a screenshot to see the current desktop state.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "move_mouse",        "description": "Move mouse to (x, y).", "parameters": {"type": "object", "properties": {"x": {"type": "integer"}, "y": {"type": "integer"}}, "required": ["x", "y"]}}},
    {"type": "function", "function": {"name": "click",             "description": "Click at (x, y). button: left/right/middle.", "parameters": {"type": "object", "properties": {"x": {"type": "integer"}, "y": {"type": "integer"}, "button": {"type": "string", "enum": ["left", "right", "middle"]}}, "required": []}}},
    {"type": "function", "function": {"name": "double_click",      "description": "Double-click at (x, y).", "parameters": {"type": "object", "properties": {"x": {"type": "integer"}, "y": {"type": "integer"}}, "required": ["x", "y"]}}},
    {"type": "function", "function": {"name": "right_click",       "description": "Right-click at (x, y).", "parameters": {"type": "object", "properties": {"x": {"type": "integer"}, "y": {"type": "integer"}}, "required": ["x", "y"]}}},
    {"type": "function", "function": {"name": "drag",              "description": "Drag from (from_x, from_y) to (to_x, to_y).", "parameters": {"type": "object", "properties": {"from_x": {"type": "integer"}, "from_y": {"type": "integer"}, "to_x": {"type": "integer"}, "to_y": {"type": "integer"}}, "required": ["from_x", "from_y", "to_x", "to_y"]}}},
    {"type": "function", "function": {"name": "scroll",            "description": "Scroll at (x, y). direction: up/down.", "parameters": {"type": "object", "properties": {"x": {"type": "integer"}, "y": {"type": "integer"}, "direction": {"type": "string", "enum": ["up", "down"]}, "amount": {"type": "integer"}}, "required": []}}},
    {"type": "function", "function": {"name": "type",              "description": "Type text.", "parameters": {"type": "object", "properties": {"text": {"type": "string"}}, "required": ["text"]}}},
    {"type": "function", "function": {"name": "press_key",         "description": "Press a keyboard key (e.g. enter, tab, escape, ctrl, win).", "parameters": {"type": "object", "properties": {"key": {"type": "string"}}, "required": ["key"]}}},
    {"type": "function", "function": {"name": "hotkey",            "description": "Press key combination (e.g. ['ctrl','c']).", "parameters": {"type": "object", "properties": {"keys": {"type": "array", "items": {"type": "string"}}}, "required": ["keys"]}}},
    {"type": "function", "function": {"name": "open_browser",      "description": "Open Chrome at a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "open_terminal",     "description": "Open cmd terminal.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "open_explorer",     "description": "Open File Explorer.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "open_notepad",      "description": "Open Notepad.", "parameters": {"type": "object", "properties": {"file": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "run_command",       "description": "Run a shell command and get output.", "parameters": {"type": "object", "properties": {"command": {"type": "string"}, "timeout": {"type": "integer"}}, "required": ["command"]}}},
    {"type": "function", "function": {"name": "launch_app",        "description": "Launch any executable app.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}, "args": {"type": "array", "items": {"type": "string"}}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "read_file",         "description": "Read a file.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "write_file",        "description": "Write a file.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}, "content": {"type": "string"}}, "required": ["path", "content"]}}},
    {"type": "function", "function": {"name": "list_files",        "description": "List directory contents.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "get_cursor_position","description": "Get current mouse cursor position.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "get_screen_size",   "description": "Get screen resolution.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "done",              "description": "Mark task complete.", "parameters": {"type": "object", "properties": {"summary": {"type": "string"}}, "required": ["summary"]}}},
]

SYSTEM_PROMPT = f"""You are a computer-use AI agent with full control of a Windows desktop ({W}x{H}).
You can see the screen via screenshot and control it with mouse/keyboard.
You can open Chrome, File Explorer, Notepad, run commands, and any app.

RULES:
1. Always take a screenshot first to see the current desktop state.
2. Use pixel coordinates (x, y) for clicks — read them from the screenshot.
3. After each action, take another screenshot to verify the result.
4. For web tasks: open_browser, then use click/type to interact.
5. Be precise with coordinates. The screen is {W}x{H} pixels.
"""


async def broadcast(msg: dict):
    dead = []
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.remove(ws)


async def call_llm(messages: list) -> dict:
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"
    async with httpx.AsyncClient(timeout=60) as c:
        resp = await c.post(
            f"{LLM_BASE}/chat/completions",
            headers=headers,
            json={
                "model": LLM_MODEL,
                "messages": messages,
                "tools": DESKTOP_TOOLS,
                "tool_choice": "auto",
                "temperature": 0.1,
                "max_tokens": 2048,
            },
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]


async def run_agent(task: str):
    await broadcast({"type": "system", "text": f"Task: {task}"})
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": task},
    ]
    for step in range(25):
        await broadcast({"type": "thinking", "text": f"Step {step+1}…"})
        try:
            msg = await call_llm(messages)
        except Exception as e:
            await broadcast({"type": "error", "text": f"LLM error: {e}"}); break

        tcs = msg.get("tool_calls") or []
        if not tcs:
            await broadcast({"type": "assistant", "text": msg.get("content", "Done.")})
            await broadcast({"type": "system", "text": "Agent finished."}); break

        messages.append(msg)
        for tc in tcs:
            fn   = tc.get("function", {})
            name = fn.get("name", "")
            try:
                args = json.loads(fn.get("arguments", "{}"))
            except Exception:
                args = {}

            await broadcast({"type": "action", "text": f"→ {name}", "action": name})
            t0     = time.time()
            result = await execute_action({"action": name, **args})
            elapsed = round(time.time() - t0, 2)

            # After every action, broadcast the new screenshot as a frame
            try:
                jpg = capture_screen_jpeg(quality=70)
                b64 = base64.b64encode(jpg).decode()
                w, h = get_screen_size()
                await broadcast({"type": "frame", "data": b64, "width": w, "height": h})
            except Exception:
                pass

            await broadcast({
                "type": "screen", "text": result[:2000],
                "action": name, "elapsed": elapsed,
                "success": "error" not in result.lower(), "step": step + 1,
            })
            messages.append({
                "role": "tool",
                "tool_call_id": tc.get("id", ""),
                "content": result,
            })
            if name == "done":
                await broadcast({"type": "system", "text": args.get("summary", "Done.")})
                await broadcast({"type": "system", "text": "Agent finished."}); return

    await broadcast({"type": "system", "text": "Agent loop ended."})


# ══════════════════════════════════════════════════════════════════════════════
# Endpoints
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/health")
def health():
    w, h = get_screen_size()
    return {"status": "ok", "desktop": f"{w}x{h}", "mode": "full-desktop", "platform": sys.platform}


@app.get("/screenshot")
async def screenshot_endpoint():
    """Single JPEG screenshot of the desktop."""
    jpg = capture_screen_jpeg()
    return Response(jpg, media_type="image/jpeg", headers={"Cache-Control": "no-store"})


@app.get("/stream.mjpeg")
async def mjpeg():
    """MJPEG live stream of the full desktop at ~20fps."""
    async def gen():
        bnd = "frame"
        while True:
            try:
                jpg = await asyncio.get_event_loop().run_in_executor(None, capture_screen_jpeg)
                yield (
                    f"--{bnd}\r\nContent-Type: image/jpeg\r\n"
                    f"Content-Length: {len(jpg)}\r\n\r\n"
                ).encode() + jpg + b"\r\n"
                await asyncio.sleep(1.0 / STREAM_FPS)
            except asyncio.CancelledError:
                raise
            except Exception:
                await asyncio.sleep(0.5)
    return StreamingResponse(
        gen(),
        media_type="multipart/x-mixed-replace; boundary=frame",
        headers={"Cache-Control": "no-store", "Access-Control-Allow-Origin": "*"},
    )


@app.websocket("/stream")
async def stream_ws(ws: WebSocket):
    """WebSocket live stream — pushes full-desktop JPEG frames at 20fps + agent events."""
    await ws.accept()
    clients.append(ws)
    # Background frame push task
    async def push_frames():
        while True:
            try:
                jpg = await asyncio.get_event_loop().run_in_executor(None, capture_screen_jpeg)
                b64 = base64.b64encode(jpg).decode()
                w, h = get_screen_size()
                await ws.send_json({"type": "frame", "data": b64, "width": w, "height": h})
                await asyncio.sleep(1.0 / STREAM_FPS)
            except asyncio.CancelledError:
                raise
            except Exception:
                await asyncio.sleep(0.5)

    frame_task = asyncio.create_task(push_frames())
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") == "task":
                text = data.get("text", "")
                asyncio.create_task(run_agent(text))
    except WebSocketDisconnect:
        pass
    finally:
        frame_task.cancel()
        if ws in clients:
            clients.remove(ws)


@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    """Agent control WebSocket (tasks + events, no frame push)."""
    await ws.accept()
    clients.append(ws)
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") == "task":
                asyncio.create_task(run_agent(data.get("text", "")))
    except WebSocketDisconnect:
        pass
    finally:
        if ws in clients:
            clients.remove(ws)


@app.post("/agent/inject")
async def inject(request: dict):
    instruction = request.get("instruction", "")
    if not instruction:
        raise HTTPException(400, "No instruction")
    asyncio.create_task(run_agent(instruction))
    return {"status": "accepted"}


@app.on_event("startup")
async def startup():
    global W, H
    W, H = get_screen_size()
    logger.info(f"[Desktop Computer] Ready — full desktop {W}x{H} on {sys.platform}")
    logger.info("[Desktop Computer] MJPEG stream at /stream.mjpeg")
    logger.info("[Desktop Computer] WebSocket stream at /stream")
