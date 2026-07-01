import asyncio, json, os, sys, traceback
from pathlib import Path
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
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
    """Call the sandbox API and return the JSON response."""
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


# ── Screen state ────────────────────────────────────────────────────────────

async def get_page_url_and_title() -> tuple[str, str]:
    """Get current page URL and title via evaluate."""
    try:
        url_r = await sandbox_post("/v1/browser/page/evaluate", {"expression": "location.href"})
        title_r = await sandbox_post("/v1/browser/page/evaluate", {"expression": "document.title"})
        url = url_r.get("data", "unknown") if url_r.get("success") else "unknown"
        title = title_r.get("data", "unknown") if title_r.get("success") else "unknown"
        return url, title
    except Exception:
        return "unknown", "unknown"


async def get_tabs() -> list[dict]:
    """Get all open tabs."""
    try:
        resp = await sandbox_get("/v1/browser/tabs")
        tabs = resp.get("data", [])
        if not isinstance(tabs, list):
            tabs = []
        return tabs
    except Exception:
        return []


async def get_screen() -> str:
    """Get a structured description of the current screen including tabs and elements."""
    try:
        page_url, page_title = await get_page_url_and_title()
        
        # Get all tabs
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
    """Execute a single action on the sandbox browser and return a result string."""
    a = action.get("action", "")
    try:
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

        elif a == "shell":
            cmd = action.get("command", "")
            r = await sandbox_post("/v1/bash/exec", {"command": cmd})
            output = r.get("data", {})
            if isinstance(output, dict):
                return output.get("output", json.dumps(output))
            return str(output)

        # ── Tab management ─────────────────────────────────────────────────
        elif a == "open_tab":
            url = action.get("url", "about:blank")
            # Create new tab
            r = await sandbox_post("/v1/browser/tabs", {"action": "create"})
            tab_data = r.get("data", {})
            tab_index = tab_data.get("index", "?")
            # Navigate to URL if provided
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
            # Use JavaScript to switch tabs via CDP
            # First, get all tabs to find the target
            tabs = await get_tabs()
            target_tab = None
            for t in tabs:
                if t.get("index") == tab_index:
                    target_tab = t
                    break
            
            if not target_tab:
                return f"Tab {tab_index} not found. Available tabs: {[t.get('index') for t in tabs]}"
            
            # Navigate to the tab's URL to switch to it
            target_url = target_tab.get("url", "")
            if target_url and target_url != "about:blank":
                await sandbox_post("/v1/browser/page/navigate", {"url": target_url}, timeout=30)
                return f"Switched to tab {tab_index}: {target_tab.get('title', 'unknown')}"
            else:
                return f"Tab {tab_index} is blank, cannot switch"

        elif a == "close_tab":
            tab_index = int(action.get("index", -1))
            # Get tabs before closing
            tabs = await get_tabs()
            if len(tabs) <= 1:
                return "Cannot close the last tab"
            
            # Close tab by evaluating JavaScript to close the current tab
            # This is a workaround since there's no direct close tab API
            await sandbox_post("/v1/browser/page/evaluate", {"expression": "window.close()"})
            return f"Closed tab {tab_index}"

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


# ── LLM caller (OpenAI-compatible, function calling) ────────────────────────

COMPUTER_TOOLS = [
    {"type": "function", "function": {"name": "get_screen", "description": "Get the current screen: URL, title, open tabs, and all interactive elements with their index number, tag, text, role, and position. Always call this first and after every action.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "click", "description": "Click an element by its index number (the number in square brackets from get_screen).", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Element index from get_screen"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "type", "description": "Type text into an input/textarea element by its index.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Element index from get_screen"}, "text": {"type": "string", "description": "Text to type"}}, "required": ["index", "text"]}}},
    {"type": "function", "function": {"name": "press_key", "description": "Press a keyboard key.", "parameters": {"type": "object", "properties": {"key": {"type": "string", "description": "Key name: Enter, Tab, Escape, Backspace, ArrowDown, etc."}}, "required": ["key"]}}},
    {"type": "function", "function": {"name": "hotkey", "description": "Press a keyboard shortcut.", "parameters": {"type": "object", "properties": {"keys": {"type": "array", "items": {"type": "string"}, "description": "Keys to press together, e.g. [\"ctrl\",\"a\"]"}}, "required": ["keys"]}}},
    {"type": "function", "function": {"name": "scroll", "description": "Scroll the page.", "parameters": {"type": "object", "properties": {"direction": {"type": "string", "enum": ["up", "down"]}, "amount": {"type": "integer", "description": "Scroll amount (default 3)"}}, "required": ["direction"]}}},
    {"type": "function", "function": {"name": "navigate", "description": "Navigate the browser to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string", "description": "Full URL including https://"}}, "required": ["url"]}}},
    {"type": "function", "function": {"name": "evaluate", "description": "Run JavaScript in the page and return the result.", "parameters": {"type": "object", "properties": {"expression": {"type": "string", "description": "JavaScript expression to evaluate"}}, "required": ["expression"]}}},
    {"type": "function", "function": {"name": "shell", "description": "Execute a shell command in the sandbox.", "parameters": {"type": "object", "properties": {"command": {"type": "string", "description": "Shell command to run"}}, "required": ["command"]}}},
    {"type": "function", "function": {"name": "open_tab", "description": "Open a new browser tab and optionally navigate to a URL.", "parameters": {"type": "object", "properties": {"url": {"type": "string", "description": "URL to open in the new tab (default: about:blank)"}}, "required": []}}},
    {"type": "function", "function": {"name": "list_tabs", "description": "List all open browser tabs with their index, title, URL, and active status.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "switch_tab", "description": "Switch to a specific tab by its index number.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Tab index number from list_tabs"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "close_tab", "description": "Close a specific tab by its index number.", "parameters": {"type": "object", "properties": {"index": {"type": "integer", "description": "Tab index number to close"}}, "required": ["index"]}}},
    {"type": "function", "function": {"name": "done", "description": "Mark the task as complete and provide a summary.", "parameters": {"type": "object", "properties": {"summary": {"type": "string", "description": "Detailed summary of what was accomplished"}}, "required": ["summary"]}}},
]

SYSTEM_PROMPT = """You are a helpful AI assistant with optional computer control.

For simple greetings, questions, or conversation - just respond with text directly. Only use computer tools when the user explicitly asks you to DO something on the computer.

For computer tasks:
1. Call get_screen ONCE at the start
2. Execute actions efficiently in sequence
3. Only call get_screen again after major page changes
4. Aim for 3-5 steps maximum
5. Call done IMMEDIATELY when finished

For chat: just respond naturally without any tools."""


async def call_llm_with_tools(messages: list[dict]) -> dict:
    """Call the LLM with function-calling tools. Returns the full assistant message."""
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"

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
                "max_tokens": 1024,
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


# ── Autonomous agent loop (used by /agent/inject and plain text WebSocket) ──

async def run_agent(task: str):
    await broadcast({"type": "system", "text": f"Task: {task}"})
    messages = [{"role": "user", "content": task}]

    for step in range(7):
        await broadcast({"type": "thinking", "text": f"Step {step + 1}: Thinking..."})
        try:
            assistant_msg = await call_llm_with_tools([
                {"role": "system", "content": SYSTEM_PROMPT},
                *messages,
            ])
        except Exception as e:
            await broadcast({"type": "error", "text": f"LLM error: {e}"})
            break

        tool_calls = assistant_msg.get("tool_calls") or []

        # If no tool calls, the LLM is done talking
        if not tool_calls:
            text = assistant_msg.get("content", "Done.")
            await broadcast({"type": "assistant", "text": text})
            await broadcast({"type": "system", "text": "Agent finished."})
            break

        # Append assistant message (with tool_calls) to history
        messages.append(assistant_msg)

        # Execute each tool call
        for tc in tool_calls:
            fn = tc.get("function", {})
            fn_name = fn.get("name", "")
            try:
                fn_args = json.loads(fn.get("arguments", "{}"))
            except json.JSONDecodeError:
                fn_args = {}

            await broadcast({"type": "action", "text": f"Executing: {fn_name}"})

            action = {"action": fn_name, **fn_args}
            result = await execute_action(action)

            # Feed result back to LLM
            messages.append({
                "role": "tool",
                "tool_call_id": tc.get("id", ""),
                "content": result or "Action executed.",
            })

            if result:
                await broadcast({"type": "screen", "text": result[:2000]})

            # If done, stop
            if fn_name == "done":
                await broadcast({"type": "system", "text": fn_args.get("summary", "Done.")})
                await broadcast({"type": "system", "text": "Agent finished."})
                return

    await broadcast({"type": "system", "text": "Agent loop ended."})


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


@app.get("/health")
def health():
    return JSONResponse({"status": "ok"})
