import asyncio, json, os, sys
from pathlib import Path
from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.responses import JSONResponse
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

LLM_KEY = os.environ.get("LLM_API_KEY", "no-auth")
LLM_MODEL = os.environ.get("LLM_MODEL", "zed-pro")
LLM_BASE = os.environ.get("LLM_BASE_URL", "http://127.0.0.1:3002/v1")
SANDBOX = os.environ.get("SANDBOX_URL", "http://localhost:8080")
clients: list[WebSocket] = []

SYSTEM_PROMPT = """You are a computer-use agent controlling a Linux desktop via a sandbox API.
You see the screen as structured text (interactive elements with positions).

ALWAYS follow this pattern:
1. First call get_screen to see what's on screen
2. Describe what you see
3. Pick exactly ONE action
4. After the action, call get_screen again to verify

Available actions (output as JSON, one line only):
{"action":"get_screen"}
{"action":"click","ref":"element_ref"}
{"action":"type","ref":"element_ref","text":"hello"}
{"action":"press_key","key":"Enter"}
{"action":"hotkey","keys":["ctrl","c"]}
{"action":"scroll","direction":"down","amount":3}
{"action":"navigate","url":"https://example.com"}
{"action":"evaluate","code":"document.title"}
{"action":"shell","command":"ls -la"}
{"action":"done","summary":"Task completed."}

IMPORTANT: Always start with get_screen. After every action, call get_screen again."""


async def sandbox_get(path: str, data: dict = None) -> dict:
    async with httpx.AsyncClient(timeout=30) as c:
        if data:
            r = await c.post(f"{SANDBOX}{path}", json=data)
        else:
            r = await c.get(f"{SANDBOX}{path}")
        return r.json()


async def get_screen() -> str:
    try:
        info = await sandbox_get("/v1/browser/info")
        elements = await sandbox_get("/v1/browser/page/elements")
        page_url = info.get("data", {}).get("url", "unknown")
        page_title = info.get("data", {}).get("title", "unknown")
        els = elements.get("data", {}).get("elements", [])
        el_text = "\n".join(
            f"  [{e.get('ref','?')}] <{e.get('tag','?')}> "
            f"text=\"{e.get('text','')[:80]}\" "
            f"role={e.get('role','')} "
            f"pos=({e.get('x',0):.0f},{e.get('y',0):.0f})"
            for e in els[:50]
        )
        return f"URL: {page_url}\nTitle: {page_title}\n\nInteractive elements ({len(els)}):\n{el_text}"
    except Exception as e:
        return f"Error getting screen: {e}"


async def execute_action(action: dict) -> str:
    a = action["action"]
    if a == "get_screen":
        return await get_screen()
    elif a == "click":
        await sandbox_get("/v1/browser/page/click", {"ref": action["ref"]})
    elif a == "type":
        await sandbox_get("/v1/browser/page/fill", {"ref": action["ref"], "value": action["text"]})
    elif a == "press_key":
        await sandbox_get("/v1/browser/page/press_key", {"key": action["key"]})
    elif a == "hotkey":
        await sandbox_get("/v1/browser/page/hot_key", {"keys": action["keys"]})
    elif a == "scroll":
        await sandbox_get("/v1/browser/page/scroll", {"direction": action["direction"], "amount": action.get("amount", 3)})
    elif a == "navigate":
        await sandbox_get("/v1/browser/page/navigate", {"url": action["url"]})
    elif a == "evaluate":
        r = await sandbox_get("/v1/browser/page/evaluate", {"code": action["code"]})
        return json.dumps(r.get("data", r), default=str)
    elif a == "shell":
        r = await sandbox_get("/v1/bash/exec", {"command": action["command"]})
        return r.get("data", {}).get("output", json.dumps(r))
    return ""


async def broadcast(msg: dict):
    dead = []
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception:
            dead.append(ws)
    for ws in dead:
        clients.remove(ws)


async def call_llm(messages: list[dict]) -> str:
    """Call the llm-proxy (OpenAI-compatible, no API key needed on localhost)."""
    headers = {"Content-Type": "application/json"}
    # Only add Authorization header if we have a real key (not "no-auth")
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"

    async with httpx.AsyncClient(timeout=120) as c:
        resp = await c.post(
            f"{LLM_BASE}/chat/completions",
            headers=headers,
            json={
                "model": LLM_MODEL,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *messages,
                ],
                "temperature": 0.1,
                "max_tokens": 1024,
            },
        )
        data = resp.json()
        return data["choices"][0]["message"]["content"]


async def run_agent(task: str):
    await broadcast({"type": "system", "text": f"Task: {task}"})
    messages = [{"role": "user", "content": task}]

    for step in range(30):
        await broadcast({"type": "thinking", "text": f"Step {step+1}: Thinking..."})
        reply = await call_llm(messages)
        await broadcast({"type": "assistant", "text": reply})

        try:
            action = json.loads(reply.strip().split("\n")[-1])
        except json.JSONDecodeError:
            action = {"action": "get_screen"}

        if action["action"] == "done":
            await broadcast({"type": "system", "text": action.get("summary", "Done.")})
            break

        await broadcast({"type": "action", "text": f"Executing: {action['action']}"})
        result = await execute_action(action)

        if result:
            await broadcast({"type": "screen", "text": result})

        outcome = f"Action '{action['action']}' executed."
        if result:
            outcome += f"\nResult:\n{result}"

        messages.append({"role": "assistant", "content": reply})
        messages.append({"role": "user", "content": outcome})

    await broadcast({"type": "system", "text": "Agent loop finished."})


@app.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        async for raw in ws.iter_text():
            data = json.loads(raw)
            if data.get("type") == "task":
                text = data.get("text", "")
                # Handle direct action execution: "execute:{...action JSON...}"
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
    except Exception:
        pass
    finally:
        if ws in clients:
            clients.remove(ws)


@app.post("/agent/inject")
async def agent_inject(request: dict):
    """Accept instruction from the frontend chatbox and run the agent."""
    instruction = request.get("instruction", "")
    if not instruction:
        raise HTTPException(status_code=400, detail="No instruction provided")
    asyncio.create_task(run_agent(instruction))
    return {"status": "accepted", "instruction": instruction}


@app.post("/agent/execute")
async def agent_execute(request: dict):
    """Execute a single action against the sandbox and return the result.
    Used by the frontend when the LLM outputs a computer action JSON."""
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
    """Get current screen state from the sandbox."""
    screen = await get_screen()
    return {"screen": screen}


@app.get("/health")
def health():
    return JSONResponse({"status": "ok"})
