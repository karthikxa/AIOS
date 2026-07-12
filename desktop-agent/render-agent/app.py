"""
Desktop Agent API — Service 2
Connects to Service 1 (vnc-desktop) via CDP proxy through nginx.

Flow:
  1. GET https://{DESKTOP_URL}/cdp/json  (X-Agent-Secret header)
     → Returns list of Chromium targets with WS URLs
  2. Transform WS URL: ws://127.0.0.1:9222/devtools/page/ID
                     → wss://{DESKTOP_URL}/cdp/devtools/page/ID
  3. Connect WebSocket with X-Agent-Secret header
  4. Speak CDP protocol over the proxied WS
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import re
from contextlib import asynccontextmanager
from typing import Any

import aiohttp
import websockets
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("agent")

# ── Config from environment ──
DESKTOP_URL = os.environ.get("DESKTOP_URL", "https://browser-server-1.onrender.com").rstrip("/")
AGENT_SECRET = os.environ.get("AGENT_SECRET", "")

CDP_HTTP = f"{DESKTOP_URL}/cdp"
SECRET_HEADERS = {"X-Agent-Secret": AGENT_SECRET} if AGENT_SECRET else {}

log.info("Desktop URL : %s", DESKTOP_URL)
log.info("CDP base    : %s", CDP_HTTP)
log.info("Secret set  : %s", bool(AGENT_SECRET))


# ─────────────────────────────────────────────────────────────────────────────
# CDP Client — connects to remote Chromium via nginx proxy
# ─────────────────────────────────────────────────────────────────────────────
class CDPClient:
    def __init__(self) -> None:
        self._ws: Any = None
        self._msg_id = 0
        self._pending: dict[int, asyncio.Future] = {}
        self._ready = False
        self._id_lock = asyncio.Lock()

    async def connect(self, retries: int = 25, delay: float = 3.0) -> None:
        for attempt in range(retries):
            try:
                # Step 1: discover targets via CDP HTTP (JSON endpoint)
                async with aiohttp.ClientSession() as s:
                    async with s.get(
                        f"{CDP_HTTP}/json",
                        headers=SECRET_HEADERS,
                        timeout=aiohttp.ClientTimeout(total=10),
                    ) as r:
                        if r.status == 403:
                            raise RuntimeError("AGENT_SECRET mismatch — check env vars in both services")
                        targets = await r.json()

                pages = [t for t in targets if t.get("type") == "page"]
                if not pages:
                    raise RuntimeError("No page target found in Chromium")

                # Step 2: transform the WS URL
                # From: ws://127.0.0.1:9222/devtools/page/ABCDEF
                # To:   wss://browser-server-1.onrender.com/cdp/devtools/page/ABCDEF
                orig_ws_url = pages[0]["webSocketDebuggerUrl"]
                m = re.search(r":\d+(/.*)", orig_ws_url)
                ws_path = m.group(1) if m else "/devtools/page/unknown"
                ws_scheme = "wss" if DESKTOP_URL.startswith("https") else "ws"
                desktop_host = DESKTOP_URL.split("://", 1)[1]
                ws_url = f"{ws_scheme}://{desktop_host}/cdp{ws_path}"

                log.info("CDP WebSocket: %s", ws_url)

                # Step 3: connect WebSocket with secret header
                self._ws = await websockets.connect(
                    ws_url,
                    additional_headers=SECRET_HEADERS,
                    max_size=None,
                    ping_interval=20,
                    ping_timeout=20,
                )
                self._ready = True
                asyncio.create_task(self._recv_loop(), name="cdp-recv")
                log.info("CDP connected ✓")
                return

            except Exception as exc:
                log.warning("CDP attempt %d/%d failed: %s", attempt + 1, retries, exc)
                self._ready = False
                await asyncio.sleep(delay)

        raise RuntimeError("CDP unreachable — is vnc-desktop (Service 1) running?")

    async def _recv_loop(self) -> None:
        try:
            async for raw in self._ws:
                data: dict = json.loads(raw)
                fut = self._pending.pop(data.get("id", -1), None)
                if fut and not fut.done():
                    fut.set_result(data)
        except Exception as exc:
            log.error("CDP recv loop ended: %s", exc)
            self._ready = False
            # Auto-reconnect
            asyncio.create_task(self.connect(), name="cdp-reconnect")

    async def call(self, method: str, params: dict | None = None, timeout: float = 15) -> Any:
        if not self._ready or self._ws is None:
            raise HTTPException(503, "CDP not connected — vnc-desktop may be starting")
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
            raise HTTPException(504, f"CDP timeout: {method}")
        if "error" in result:
            raise HTTPException(500, f"CDP error: {result['error']}")
        return result.get("result", {})

    # ── High-level helpers ──────────────────────────────────────────────────

    async def navigate(self, url: str) -> dict:
        return await self.call("Page.navigate", {"url": url}, timeout=30)

    async def click(self, x: float, y: float) -> None:
        base = {"x": x, "y": y, "button": "left", "clickCount": 1, "modifiers": 0}
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mousePressed"})
        await asyncio.sleep(0.05)
        await self.call("Input.dispatchMouseEvent", {**base, "type": "mouseReleased"})

    async def move(self, x: float, y: float) -> None:
        await self.call("Input.dispatchMouseEvent", {"type": "mouseMoved", "x": x, "y": y})

    async def type_text(self, text: str) -> None:
        for ch in text:
            await self.call("Input.dispatchKeyEvent", {"type": "char", "text": ch})
            await asyncio.sleep(0.02)

    async def key(self, key_name: str) -> None:
        await self.call("Input.dispatchKeyEvent", {"type": "keyDown", "key": key_name})
        await asyncio.sleep(0.05)
        await self.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": key_name})

    async def scroll(self, x: float, y: float, dx: float = 0, dy: float = 300) -> None:
        await self.call("Input.dispatchMouseEvent", {
            "type": "mouseWheel", "x": x, "y": y, "deltaX": dx, "deltaY": dy,
        })

    async def eval(self, expression: str) -> Any:
        return await self.call("Runtime.evaluate", {
            "expression": expression, "returnByValue": True, "awaitPromise": True,
        })

    async def page_info(self) -> dict:
        r = await self.eval("({url: location.href, title: document.title})")
        return r.get("result", {}).get("value", {})


# ─────────────────────────────────────────────────────────────────────────────
# FastAPI app
# ─────────────────────────────────────────────────────────────────────────────
cdp = CDPClient()


@asynccontextmanager
async def lifespan(_: FastAPI):
    await cdp.connect()
    yield


app = FastAPI(title="Desktop Agent API", version="2.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request models ──────────────────────────────────────────────────────────

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
    key: str

class ScrollReq(BaseModel):
    x: float = 640.0
    y: float = 360.0
    delta_x: float = 0.0
    delta_y: float = 300.0

class EvalReq(BaseModel):
    expression: str


# ── Endpoints ───────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "agent-api",
        "cdp_ready": cdp._ready,
        "desktop_url": DESKTOP_URL,
    }

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
    return {"status": "ok", "result": await cdp.eval(req.expression)}

@app.get("/page-info")
async def page_info():
    return await cdp.page_info()
