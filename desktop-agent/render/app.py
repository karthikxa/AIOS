"""
Desktop Agent — Render deployment
Live stream via x11vnc + noVNC WebSocket (ZERO screenshot endpoints)
CDP browser control: navigate, click, type, key, scroll, eval
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
from contextlib import asynccontextmanager
from typing import Any

import aiohttp
import websockets
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("agent")

CDP_HTTP = "http://127.0.0.1:9222"


# ── CDP client ────────────────────────────────────────────────────────────────

class CDPClient:
    """Minimal CDP WebSocket client — no screenshot, no image transfer."""

    def __init__(self):
        self._ws: websockets.WebSocketClientProtocol | None = None
        self._msg_id = 0
        self._pending: dict[int, asyncio.Future] = {}
        self._ready = False
        self._id_lock = asyncio.Lock()

    # ── Connection ────────────────────────────────────────────────────────────

    async def connect(self, retries: int = 20, delay: float = 2.0) -> None:
        for attempt in range(retries):
            try:
                async with aiohttp.ClientSession() as s:
                    async with s.get(f"{CDP_HTTP}/json") as r:
                        targets = await r.json()
                pages = [t for t in targets if t.get("type") == "page"]
                if not pages:
                    raise RuntimeError("No page target found")
                ws_url = pages[0]["webSocketDebuggerUrl"]

                self._ws = await websockets.connect(
                    ws_url,
                    max_size=None,
                    ping_interval=20,
                    ping_timeout=20,
                )
                self._ready = True
                asyncio.create_task(self._recv_loop(), name="cdp-recv")
                log.info("CDP connected → %s", ws_url)
                return
            except Exception as exc:
                log.warning("CDP attempt %d/%d failed: %s", attempt + 1, retries, exc)
                await asyncio.sleep(delay)
        raise RuntimeError("CDP unreachable — is Chromium running?")

    async def _recv_loop(self) -> None:
        try:
            async for raw in self._ws:  # type: ignore[union-attr]
                data: dict = json.loads(raw)
                fut = self._pending.pop(data.get("id", -1), None)
                if fut and not fut.done():
                    fut.set_result(data)
        except Exception as exc:
            log.error("CDP recv loop ended: %s", exc)
            self._ready = False

    # ── Low-level call ────────────────────────────────────────────────────────

    async def call(self, method: str, params: dict | None = None, timeout: float = 15) -> Any:
        if not self._ready or self._ws is None:
            raise HTTPException(status_code=503, detail="CDP not connected")

        async with self._id_lock:
            self._msg_id += 1
            mid = self._msg_id

        loop = asyncio.get_running_loop()
        fut: asyncio.Future = loop.create_future()
        self._pending[mid] = fut

        await self._ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        try:
            result = await asyncio.wait_for(fut, timeout=timeout)
        except asyncio.TimeoutError:
            self._pending.pop(mid, None)
            raise HTTPException(status_code=504, detail=f"CDP timeout: {method}")
        finally:
            self._pending.pop(mid, None)

        if "error" in result:
            raise HTTPException(status_code=500, detail=f"CDP error: {result['error']}")
        return result.get("result", {})

    # ── High-level actions ────────────────────────────────────────────────────

    async def navigate(self, url: str) -> dict:
        return await self.call("Page.navigate", {"url": url}, timeout=30)

    async def click(self, x: float, y: float) -> None:
        base = {"x": x, "y": y, "button": "left", "clickCount": 1}
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mousePressed"})
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mouseReleased"})

    async def move(self, x: float, y: float) -> None:
        await self.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": x, "y": y})

    async def type_text(self, text: str) -> None:
        for ch in text:
            await self.call("Input.dispatchKeyEvent", {"type": "char", "text": ch})

    async def key(self, key: str) -> None:
        """Press a named key (Enter, Backspace, Tab, ArrowDown, …)"""
        await self.call("Input.dispatchKeyEvent", {"type": "keyDown", "key": key})
        await self.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": key})

    async def scroll(self, x: float, y: float, delta_x: float = 0, delta_y: float = 300) -> None:
        await self.call("Input.dispatchMouseEvent", {
            "type": "mouseWheel",
            "x": x, "y": y,
            "deltaX": delta_x, "deltaY": delta_y,
        })

    async def eval(self, expression: str) -> Any:
        return await self.call("Runtime.evaluate", {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": True,
        })

    async def page_info(self) -> dict:
        result = await self.eval("({url: location.href, title: document.title})")
        return result.get("result", {}).get("value", {})


# ── App lifespan ──────────────────────────────────────────────────────────────

cdp = CDPClient()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await cdp.connect()
    yield


app = FastAPI(title="Desktop Agent — Render", lifespan=lifespan)


# ── Request models ────────────────────────────────────────────────────────────

class NavigateReq(BaseModel):
    url: str

class ClickReq(BaseModel):
    x: float
    y: float

class MoveReq(BaseModel):
    x: float
    y: float

class TypeReq(BaseModel):
    text: str

class KeyReq(BaseModel):
    key: str  # e.g. "Enter", "Backspace", "Tab", "ArrowDown"

class ScrollReq(BaseModel):
    x: float = 640.0
    y: float = 360.0
    delta_x: float = 0.0
    delta_y: float = 300.0

class EvalReq(BaseModel):
    expression: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "cdp_ready": cdp._ready}

@app.post("/navigate")
async def navigate(req: NavigateReq):
    result = await cdp.navigate(req.url)
    return {"status": "ok", "result": result}

@app.post("/click")
async def click(req: ClickReq):
    await cdp.click(req.x, req.y)
    return {"status": "ok"}

@app.post("/move")
async def move(req: MoveReq):
    await cdp.move(req.x, req.y)
    return {"status": "ok"}

@app.post("/type")
async def type_text(req: TypeReq):
    await cdp.type_text(req.text)
    return {"status": "ok"}

@app.post("/key")
async def press_key(req: KeyReq):
    await cdp.key(req.key)
    return {"status": "ok"}

@app.post("/scroll")
async def scroll(req: ScrollReq):
    await cdp.scroll(req.x, req.y, req.delta_x, req.delta_y)
    return {"status": "ok"}

@app.post("/eval")
async def evaluate(req: EvalReq):
    result = await cdp.eval(req.expression)
    return {"status": "ok", "result": result}

@app.get("/page-info")
async def page_info():
    return await cdp.page_info()
