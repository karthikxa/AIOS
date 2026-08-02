"""Ubuntu CUA Desktop Agent — uses the CUA ComputerAgent with a Sandbox Ubuntu desktop.

This replaces the Windows-specific computer.py with a proper CUA agent that:
- Spawns an Ubuntu 24.04 sandbox via cua_sandbox.Sandbox
- Uses ComputerAgent with the sandbox as a tool
- Exposes the same WebSocket/HTTP endpoints as the old agent so the frontend
  can connect without changes
- Uses local QEMU/Docker runtime for the Ubuntu VM
"""

import asyncio
import base64
import io
import json
import logging
import os
import sys
import time
from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import JSONResponse, Response, StreamingResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

try:
    from dotenv import load_dotenv
    _env_path = Path(__file__).resolve().parent / ".env"
    if _env_path.exists():
        load_dotenv(_env_path)
except ImportError:
    pass

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ubuntu-cua-agent")

try:
    from cua_agent import ComputerAgent
    from cua_sandbox import Image, Sandbox
except ImportError as e:
    logger.error(f"Failed to import CUA libraries: {e}")
    logger.error("Install with: pip install cua-agent cua-sandbox")
    sys.exit(1)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

STREAM_FPS = int(os.environ.get("STREAM_FPS", "15"))
STREAM_QUAL = int(os.environ.get("STREAM_QUAL", "50"))

clients: list = []

LLM_BASE = os.environ.get("LLM_BASE_URL", "")
LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "openai/gpt-4o")

_sandbox: Sandbox | None = None
_agent: ComputerAgent | None = None
_sandbox_lock = asyncio.Lock()

_frame_buffer = {
    "jpeg": None,
    "b64": None,
    "width": 1360,
    "height": 768,
    "updated_at": 0.0,
}


async def _ensure_sandbox() -> Sandbox:
    global _sandbox, _agent
    async with _sandbox_lock:
        if _sandbox is None:
            logger.info("[Sandbox] Creating Ubuntu 24.04 desktop sandbox...")
            _sandbox = await Sandbox.create(
                Image.linux("ubuntu", "24.04", kind="container"),
                local=True,
                name="avde-ubuntu-desktop",
                cpu=2,
                memory_mb=4096,
            )
            logger.info(f"[Sandbox] Ready: {_sandbox.name}")

            _agent = ComputerAgent(
                model=LLM_MODEL,
                tools=[_sandbox],
                api_key=LLM_KEY if LLM_KEY != "no-auth" else None,
                api_base=LLM_BASE if LLM_BASE else None,
            )
        return _sandbox


async def _capture_frame_loop():
    logger.info(f"[Frame Capture] Starting at {STREAM_FPS} FPS")
    interval = 1.0 / STREAM_FPS
    while True:
        try:
            t0 = time.monotonic()
            sb = await _ensure_sandbox()
            png_bytes = await sb.screenshot(format="png", quality=STREAM_QUAL)
            from PIL import Image as PILImage
            pil = PILImage.open(io.BytesIO(png_bytes))
            buf = io.BytesIO()
            pil.save(buf, format="JPEG", quality=STREAM_QUAL, optimize=False)
            jpg = buf.getvalue()
            b64 = base64.b64encode(jpg).decode()
            w, h = await sb.get_dimensions()
            async with _sandbox_lock:
                _frame_buffer["jpeg"] = jpg
                _frame_buffer["b64"] = b64
                _frame_buffer["width"] = w
                _frame_buffer["height"] = h
                _frame_buffer["updated_at"] = time.time()
            elapsed = time.monotonic() - t0
            await asyncio.sleep(max(0, interval - elapsed))
        except asyncio.CancelledError:
            raise
        except Exception as e:
            logger.warning(f"[Frame Capture] Error: {e}")
            await asyncio.sleep(1)


async def _run_agent(task: str):
    await broadcast({"type": "system", "text": f"Task: {task}"})
    try:
        await _ensure_sandbox()
        agent = _agent
        if agent is None:
            await broadcast({"type": "error", "text": "Agent failed to initialize"})
            return

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": task},
        ]

        async for chunk in agent.run(messages):
            for item in chunk.get("output", []):
                if item.get("type") == "message":
                    for block in item.get("content", []):
                        text = block.get("text", "")
                        if text:
                            await broadcast({"type": "assistant", "text": text})
                elif item.get("type") == "computer_call":
                    action = item.get("action", {})
                    action_type = action.get("type", "unknown")
                    await broadcast({"type": "action", "text": f"-> {action_type}", "action": action_type})

            b64 = _frame_buffer["b64"]
            if b64:
                await broadcast({
                    "type": "frame",
                    "data": b64,
                    "width": _frame_buffer["width"],
                    "height": _frame_buffer["height"],
                })

        await broadcast({"type": "system", "text": "Agent finished."})
        await broadcast({"type": "agent_end", "steps": 0, "summary": "Task complete."})
        await broadcast({"type": "done", "steps": 0, "summary": "Task complete."})
    except Exception as e:
        logger.error(f"[Agent] Error: {e}")
        await broadcast({"type": "error", "text": f"Agent error: {e}"})


async def broadcast(msg: dict):
    dead = []
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.remove(ws)


SYSTEM_PROMPT = f"""You are a computer-use AI agent with full control of an Ubuntu 24.04 desktop.
You can see the screen via screenshot and control it with mouse/keyboard.
You can open Chromium, File Manager, Terminal — anything.

RULES:
1. Always take a screenshot first to see the current desktop state.
2. Use pixel coordinates (x, y) for clicks -- read them from the screenshot.
3. After each action, take another screenshot to verify the result.
4. For web tasks: open Chromium, then use click/type to interact.
"""


def get_latest_frame():
    return _frame_buffer["jpeg"]


def get_latest_frame_b64():
    return _frame_buffer["b64"]


@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    p = Path(__file__).resolve().parent / "frontend" / "index.html"
    if p.exists():
        return HTMLResponse(p.read_text(encoding="utf-8"))
    return HTMLResponse("<h1>Ubuntu CUA Desktop Agent Ready</h1>")


@app.get("/health")
async def health():
    w = _frame_buffer["width"]
    h = _frame_buffer["height"]
    return {
        "status": "ok" if _sandbox else "starting",
        "desktop": f"{w}x{h}",
        "mode": "cua-ubuntu-desktop",
        "platform": "linux",
        "fps": STREAM_FPS,
        "stream": "live-buffer",
        "sandbox": _sandbox.name if _sandbox else None,
        "model": LLM_MODEL,
    }


@app.get("/screenshot")
async def screenshot_endpoint():
    jpg = get_latest_frame()
    if jpg:
        return Response(jpg, media_type="image/jpeg", headers={"Cache-Control": "no-store"})
    async with _sandbox_lock:
        if _sandbox:
            png_bytes = await _sandbox.screenshot(format="png", quality=STREAM_QUAL)
            from PIL import Image as PILImage
            pil = PILImage.open(io.BytesIO(png_bytes))
            buf = io.BytesIO()
            pil.save(buf, format="JPEG", quality=STREAM_QUAL, optimize=False)
            return Response(buf.getvalue(), media_type="image/jpeg", headers={"Cache-Control": "no-store"})
    return Response(b"", media_type="image/jpeg", headers={"Cache-Control": "no-store"})


@app.get("/stream.mjpeg")
async def mjpeg():
    async def gen():
        bnd = "frame"
        while True:
            try:
                jpg = get_latest_frame()
                if jpg:
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


def _extract_task(data: dict) -> str:
    """Pull a task instruction from a WebSocket message.

    The frontend sends several shapes depending on the code path:
    - {"type": "task", "text": "..."}
    - {"type": "message", "text": "..."}   (agentic loop fast path)
    - {"type": "message", "content": "..."}
    """
    text = data.get("text") or data.get("content") or data.get("instruction")
    if not text and isinstance(data.get("message"), str):
        text = data["message"]
    return str(text or "")


@app.websocket("/stream")
async def stream_ws(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    interval = 1.0 / STREAM_FPS

    async def push_frames():
        while True:
            try:
                jpg = get_latest_frame()
                if jpg:
                    b64 = base64.b64encode(jpg).decode()
                    await ws.send_json({"type": "frame", "data": b64, "width": _frame_buffer["width"], "height": _frame_buffer["height"]})
                await asyncio.sleep(interval)
            except asyncio.CancelledError:
                raise
            except Exception:
                await asyncio.sleep(0.5)

    frame_task = asyncio.create_task(push_frames())
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") in ("task", "message"):
                text = _extract_task(data)
                if text:
                    asyncio.create_task(_run_agent(text))
    except WebSocketDisconnect:
        pass
    finally:
        frame_task.cancel()
        if ws in clients:
            clients.remove(ws)


@app.websocket("/ws/video")
async def ws_video(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    interval = 1.0 / STREAM_FPS
    try:
        while True:
            jpg = get_latest_frame()
            if jpg:
                await ws.send_bytes(jpg)
            await asyncio.sleep(interval)
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        if ws in clients:
            clients.remove(ws)


@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") in ("task", "message"):
                text = _extract_task(data)
                if text:
                    asyncio.create_task(_run_agent(text))
    except WebSocketDisconnect:
        pass
    finally:
        if ws in clients:
            clients.remove(ws)


@app.websocket("/ws/agent")
async def ws_agent(ws: WebSocket):
    await ws_endpoint(ws)


async def sandbox_execute_action(action: dict) -> str:
    """Execute a single action directly on the Ubuntu sandbox.

    Supports the same action names the old Windows agent used, mapped onto
    the cua_sandbox interface (mouse / keyboard / shell).
    """
    try:
        sb = await _ensure_sandbox()
        a = action.get("action", "")
        if a == "screenshot":
            b64 = get_latest_frame_b64()
            return f"Screenshot available ({_frame_buffer['width']}x{_frame_buffer['height']})" if b64 else "No frame yet"
        if a == "move_mouse":
            await sb.mouse.move(int(action.get("x", 0)), int(action.get("y", 0)))
            return f"Moved mouse to ({action.get('x')}, {action.get('y')})"
        if a == "click":
            x, y = action.get("x"), action.get("y")
            button = action.get("button", "left")
            if x is None or y is None:
                return "Click requires x and y coordinates."
            await sb.mouse.click(int(x), int(y), button=button)
            return f"Clicked {button} at ({x}, {y})"
        if a == "double_click":
            await sb.mouse.double_click(int(action.get("x", 0)), int(action.get("y", 0)))
            return f"Double-clicked at ({action.get('x')}, {action.get('y')})"
        if a == "right_click":
            await sb.mouse.right_click(int(action.get("x", 0)), int(action.get("y", 0)))
            return f"Right-clicked at ({action.get('x')}, {action.get('y')})"
        if a == "type":
            await sb.keyboard.type(action.get("text", ""))
            return f"Typed: {action.get('text', '')[:80]}"
        if a == "press_key":
            await sb.keyboard.keypress([action.get("key", "enter")])
            return f"Pressed: {action.get('key')}"
        if a == "hotkey":
            keys = action.get("keys", [])
            await sb.keyboard.keypress(list(keys))
            return f"Hotkey: {'+'.join(keys)}"
        if a == "scroll":
            await sb.mouse.scroll(
                int(action.get("x", 0)),
                int(action.get("y", 0)),
                scroll_x=0,
                scroll_y=int(action.get("amount", 3)) * (-1 if action.get("direction") == "down" else 1),
            )
            return "Scrolled"
        if a == "run_command":
            result = await sb.shell.run(action.get("command", ""))
            return result.stdout[:3000]
        if a == "open_browser":
            result = await sb.shell.run(
                f"chromium --no-sandbox {action.get('url', 'https://www.google.com')}",
                background=True,
            )
            return f"Opened browser (pid {result.stdout.strip()})"
        if a == "open_terminal":
            result = await sb.shell.run("gnome-terminal", background=True)
            return f"Opened terminal (pid {result.stdout.strip()})"
        if a == "open_explorer":
            result = await sb.shell.run("pcmanfm", background=True)
            return f"Opened file manager (pid {result.stdout.strip()})"
        if a == "get_cursor_position":
            return "Cursor position query not supported on this sandbox."
        if a == "get_screen_size":
            w, h = await sb.get_dimensions()
            return f"Screen: {w}x{h}"
        if a == "read_file":
            result = await sb.shell.run(f"cat {action.get('path', '')}")
            return result.stdout[:5000]
        if a == "list_files":
            result = await sb.shell.run(f"ls -la {action.get('path', '.')}")
            return result.stdout[:3000]
        if a == "done":
            return action.get("summary", "Done.")
        return f"Unknown action: {a}"
    except Exception as e:
        return f"Error in '{action.get('action')}': {e}"


@app.post("/agent/inject")
async def inject(request: dict):
    instruction = request.get("instruction", "") or request.get("task", "")
    if not instruction:
        raise HTTPException(400, "No instruction")
    asyncio.create_task(_run_agent(instruction))
    return {"status": "accepted"}


@app.post("/agent/execute")
async def agent_execute(request: dict):
    result = await sandbox_execute_action(request)
    return {"result": result}


@app.get("/agent/screen")
async def agent_screen():
    title = "Ubuntu 24.04 Desktop"
    url = ""
    if _sandbox:
        try:
            info = await _sandbox.shell.run("wmctrl -l 2>/dev/null | head -5")
            if info.stdout.strip():
                title = info.stdout.strip().splitlines()[0][:200]
        except Exception:
            pass
    return {"title": title, "url": url, "width": _frame_buffer["width"], "height": _frame_buffer["height"]}


@app.get("/agent/plan")
async def agent_plan():
    return {"steps": [], "status": "idle", "model": LLM_MODEL}


@app.on_event("startup")
async def startup():
    asyncio.create_task(_capture_frame_loop())
    logger.info("[Ubuntu CUA Desktop Agent] Ready — WebSocket stream at /stream")
    logger.info("[Ubuntu CUA Desktop Agent] Frontend at http://localhost:6901")


@app.on_event("shutdown")
async def shutdown():
    global _sandbox
    if _sandbox:
        await _sandbox.disconnect()
        _sandbox = None
    logger.info("[Ubuntu CUA Desktop Agent] Shutting down...")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "6901"))
    uvicorn.run(app, host="0.0.0.0", port=port)
