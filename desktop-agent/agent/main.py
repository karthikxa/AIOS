import asyncio, json, os, sys, traceback, time, base64, hashlib, subprocess
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.responses import JSONResponse, StreamingResponse, Response, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import httpx
from playwright.async_api import async_playwright, Page, Browser, BrowserContext

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
LLM_MODEL = os.environ.get("LLM_MODEL", "auto")
LLM_BASE = os.environ.get("LLM_BASE_URL", "https://server-llm-1.onrender.com/v1")
clients: list[WebSocket] = []

# ── Playwright browser state ────────────────────────────────────────────────

_playwright = None
_browser: Optional[Browser] = None
_context: Optional[BrowserContext] = None
_page: Optional[Page] = None


async def init_browser():
    global _playwright, _browser, _context, _page
    _playwright = await async_playwright().start()
    _browser = await _playwright.chromium.launch(
        headless=True,
        args=["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
    )
    _context = await _browser.new_context(
        viewport={"width": 1280, "height": 720},
        user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    _page = await _context.new_page()
    # Inject a branded ready page so there's never a black screen
    await _page.set_content("""<!DOCTYPE html>
<html><head><style>
body { margin:0; background:#0a0a0a; display:flex; align-items:center; justify-content:center; height:100vh; font-family:monospace; color:#00ff88; }
.box { text-align:center; }
.box h1 { font-size:28px; margin-bottom:12px; }
.box p { color:#888; font-size:14px; }
.dot { width:12px; height:12px; border-radius:50%; background:#00ff88; display:inline-block; margin-right:8px; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
</style></head><body>
<div class="box">
  <h1><span class="dot"></span>Desktop Agent Ready</h1>
  <p>Send a task to begin</p>
</div>
</body></html>""")
    print("[Desktop Agent] Browser initialized")


async def close_browser():
    global _playwright, _browser, _context, _page
    try:
        if _page:
            await _page.close()
        if _context:
            await _context.close()
        if _browser:
            await _browser.close()
        if _playwright:
            await _playwright.stop()
    except Exception:
        pass
    print("[Desktop Agent] Browser closed")


def get_page() -> Page:
    if _page is None:
        raise RuntimeError("Browser not initialized")
    return _page


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

    def has_repeated(self, action: str, reason: str, threshold: int = 2) -> bool:
        return sum(1 for f in self.failures if f["action"] == action and f["reason"] == reason) >= threshold


# ── Playwright helpers ─────────────────────────────────────────────────────

async def take_screenshot_base64() -> str:
    try:
        screenshot = await get_page().screenshot(type="png")
        return base64.b64encode(screenshot).decode()
    except Exception:
        return ""


async def screenshot_mjpeg_stream(delay: float = 0.5):
    boundary = "desktop-frame"
    while True:
        try:
            frame = await get_page().screenshot(type="jpeg", quality=70)
            yield (
                f"--{boundary}\r\n"
                "Content-Type: image/jpeg\r\n"
                f"Content-Length: {len(frame)}\r\n\r\n"
            ).encode() + frame + b"\r\n"
            await asyncio.sleep(delay)
        except asyncio.CancelledError:
            raise
        except Exception:
            await asyncio.sleep(1.0)


async def get_screenshot_hash(b64: str) -> str:
    return hashlib.md5(b64.encode()).hexdigest()[:12]


async def screenshot_diff(before_b64: str, after_b64: str) -> str:
    if not before_b64 or not after_b64:
        return "Could not capture screenshots for comparison."
    h_before = await get_screenshot_hash(before_b64)
    h_after = await get_screenshot_hash(after_b64)
    if h_before == h_after:
        return "NO_CHANGE: Screenshots are identical — the action may not have had any visible effect."
    return "CHANGED: Screen content changed after the action."


# ── Element extraction (replaces sandbox /v1/browser/page/elements) ──────

async def get_elements() -> list[dict]:
    """Extract all interactive elements with bounding boxes via Playwright."""
    return await get_page().evaluate("""() => {
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
    }""")


# ── Vision-grounded click resolver ──────────────────────────────────────────

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


# ── Set-of-marks annotator ─────────────────────────────────────────────────

async def annotate_screenshot() -> str:
    try:
        els = await get_elements()
        if not els:
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
        page = get_page()
        url = page.url or "unknown"
        title = await page.title() or "unknown"
        return url, title
    except Exception:
        return "unknown", "unknown"


async def get_tabs() -> list[dict]:
    try:
        pages = _context.pages if _context else []
        tabs = []
        for i, p in enumerate(pages):
            tabs.append({
                "index": i,
                "title": await p.title() or "",
                "url": p.url or "",
                "is_active": p == _page,
            })
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

        els = await get_elements()
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


# ── Shell & file helpers ────────────────────────────────────────────────────

async def run_shell(command: str) -> str:
    """Execute a shell command and return output."""
    try:
        proc = await asyncio.create_subprocess_shell(
            command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
        )
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=30)
        return stdout.decode(errors="replace")[-3000:]
    except asyncio.TimeoutError:
        proc.kill()
        return f"Command timed out after 30s"
    except Exception as e:
        return f"Shell error: {e}"


async def run_code_exec(code: str, language: str = "python") -> str:
    """Execute code in a subprocess."""
    try:
        if language == "python":
            proc = await asyncio.create_subprocess_exec(
                sys.executable, "-c", code,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.STDOUT,
            )
        elif language in ("javascript", "node", "nodejs"):
            proc = await asyncio.create_subprocess_exec(
                "node", "-e", code,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.STDOUT,
            )
        else:
            return f"Unsupported language: {language}"
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=30)
        return stdout.decode(errors="replace")[-3000:]
    except asyncio.TimeoutError:
        return "Code execution timed out after 30s"
    except Exception as e:
        return f"Code execution error: {e}"


# ── Action executor ─────────────────────────────────────────────────────────

async def execute_action(action: dict) -> str:
    a = action.get("action", "")
    page = get_page()
    try:
        # ── Browser actions ─────────────────────────────────────────────
        if a == "get_screen":
            return await get_screen()

        elif a == "click":
            idx = int(action.get("index", action.get("ref", 0)))
            els = await get_elements()
            visible = [e for e in els if e.get("is_visible", True) and e.get("is_enabled", True)]
            if idx < len(visible):
                bb = visible[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await page.mouse.click(x, y)
                return f"Clicked element [{idx}] at ({x:.0f},{y:.0f})"
            return f"Element [{idx}] not found in visible elements"

        elif a == "type":
            idx = int(action.get("index", action.get("ref", 0)))
            text = action.get("text", "")
            els = await get_elements()
            visible = [e for e in els if e.get("is_visible", True) and e.get("is_enabled", True)]
            if idx < len(visible):
                bb = visible[idx].get("bounding_box", {})
                x = bb.get("x", 0) + bb.get("width", 0) / 2
                y = bb.get("y", 0) + bb.get("height", 0) / 2
                await page.mouse.click(x, y)
                await page.keyboard.press("Control+A")
                await page.keyboard.type(text, delay=10)
                return f'Typed "{text}" into element [{idx}]'
            return f"Element [{idx}] not found"

        elif a == "press_key":
            key = action.get("key", "Enter")
            await page.keyboard.press(key)
            return f"Pressed key: {key}"

        elif a == "hotkey":
            keys = action.get("keys", [])
            if len(keys) == 1:
                await page.keyboard.press(keys[0])
            else:
                combo = "+".join(keys)
                await page.keyboard.press(combo)
            return f"Pressed hotkey: {'+'.join(keys)}"

        elif a == "scroll":
            direction = action.get("direction", "down")
            amount = int(action.get("amount", 3))
            delta_y = 300 * amount if direction == "down" else -300 * amount
            await page.mouse.wheel(0, delta_y)
            return f"Scrolled {direction} by {amount}"

        elif a == "navigate":
            url = action.get("url", "")
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            return f"Navigated to {page.url} — title: {await page.title()}"

        elif a == "evaluate":
            expr = action.get("expression", action.get("code", ""))
            result = await page.evaluate(expr)
            return json.dumps(result, default=str) if not isinstance(result, str) else result

        # ── Tab management ─────────────────────────────────────────────
        elif a == "open_tab":
            url = action.get("url", "about:blank")
            new_page = await _context.new_page()
            if url and url != "about:blank":
                await new_page.goto(url, wait_until="domcontentloaded", timeout=30000)
            tab_idx = _context.pages.index(new_page)
            return f"Opened new tab #{tab_idx} and navigated to {url}"

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
            pages = _context.pages if _context else []
            if 0 <= tab_index < len(pages):
                target = pages[tab_index]
                url = target.url or "about:blank"
                if url != "about:blank":
                    global _page
                    _page = target
                    return f"Switched to tab {tab_index}: {await target.title()}"
                return f"Tab {tab_index} is blank, cannot switch"
            return f"Tab {tab_index} not found. Available: {list(range(len(pages)))}"

        elif a == "close_tab":
            pages = _context.pages if _context else []
            if len(pages) <= 1:
                return "Cannot close the last tab"
            tab_index = int(action.get("index", -1))
            if 0 <= tab_index < len(pages):
                target = pages[tab_index]
                await target.close()
                return f"Closed tab {tab_index}"
            return f"Tab {tab_index} not found"

        # ── Shell & code execution ─────────────────────────────────────
        elif a == "shell":
            cmd = action.get("command", "")
            return await run_shell(cmd)

        elif a == "run_code":
            code = action.get("code", "")
            language = action.get("language", "python")
            return await run_code_exec(code, language)

        # ── File system ────────────────────────────────────────────────
        elif a == "read_file":
            path = action.get("path", "")
            try:
                content = Path(path).read_text(encoding="utf-8", errors="replace")
                return content[:5000]
            except Exception as e:
                return f"Error reading {path}: {e}"

        elif a == "write_file":
            path = action.get("path", "")
            content = action.get("content", "")
            try:
                Path(path).parent.mkdir(parents=True, exist_ok=True)
                Path(path).write_text(content, encoding="utf-8")
                return f"Wrote {len(content)} bytes to {path}"
            except Exception as e:
                return f"Error writing {path}: {e}"

        elif a == "list_files":
            path = action.get("path", ".")
            try:
                entries = list(Path(path).iterdir())[:50]
                lines = []
                for e in sorted(entries, key=lambda x: (not x.is_dir(), x.name)):
                    prefix = "[DIR]" if e.is_dir() else "[FILE]"
                    lines.append(f"{prefix} {e.name}")
                return "\n".join(lines) if lines else "Empty directory"
            except Exception as e:
                return f"Error listing {path}: {e}"

        elif a == "find_files":
            pattern = action.get("pattern", "*")
            path = action.get("path", ".")
            try:
                files = list(Path(path).glob(pattern))[:50]
                return "\n".join(str(f) for f in files) if files else "No files found"
            except Exception as e:
                return f"Error finding files: {e}"

        elif a == "search_files":
            query = action.get("query", "")
            path = action.get("path", ".")
            try:
                result = await run_shell(f'find "{path}" -type f -exec grep -l "{query}" {{}} \\; 2>/dev/null | head -20')
                return result if result.strip() else "No matches found"
            except Exception as e:
                return f"Error searching: {e}"

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
            return await run_shell(cmd)

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
            html = await page.content()
            return html[:5000]

        elif a == "get_page_text":
            text = await page.inner_text("body")
            return text[:5000]

        elif a == "get_page_markdown":
            text = await page.inner_text("body")
            return text[:5000]

        elif a == "find_text":
            text = action.get("text", "")
            count = await page.get_by_text(text).count()
            return json.dumps({"found": count > 0, "count": count})

        elif a == "wait_for":
            wait_type = action.get("type", "load")
            value = action.get("value", "")
            timeout_s = action.get("timeout", 10) * 1000
            try:
                if wait_type == "selector":
                    await page.wait_for_selector(value, timeout=timeout_s)
                elif wait_type == "load":
                    await page.wait_for_load_state("load", timeout=timeout_s)
                elif wait_type == "url":
                    await page.wait_for_url(value, timeout=timeout_s)
                elif wait_type == "network_idle":
                    await page.wait_for_load_state("networkidle", timeout=timeout_s)
                return f"Wait completed: {wait_type}"
            except Exception as e:
                return f"Wait timed out: {e}"

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

    except Exception as e:
        return f"Action '{a}' error: {e}"


# ── Global agent state (per-run) ────────────────────────────────────────────

_planner = DynamicPlanner()
_logger = ActionLogger()
_compressor = ContextCompressor()
_failures = FailureMemory()

_screenshot_before = ""
_screenshot_after = ""


# ── LLM caller (OpenAI-compatible, function calling) ────────────────────────

COMPUTER_TOOLS = [
    {"type": "function", "function": {"name": "get_screen", "description": "Get the current screen: URL, title, open tabs, and all interactive elements with their index number, tag, text, role, and position. Call first and after major changes.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "take_screenshot", "description": "Capture a screenshot of the current screen. Returns base64 PNG.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "annotate_screen", "description": "Overlay numbered markers on all interactive elements in the current view. Use to identify elements by number.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "resolve_click", "description": "Find the best element to click given a natural-language description.", "parameters": {"type": "object", "properties": {"description": {"type": "string", "description": "Natural language description of the element to click"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "screenshot_diff", "description": "Compare before/after screenshots to check if an action had visible effect.", "parameters": {"type": "object", "properties": {"before": {"type": "string"}, "after": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_html", "description": "Get the full HTML of the current page.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_text", "description": "Get all visible text from the current page.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "get_page_markdown", "description": "Get the current page content converted to Markdown.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "find_text", "description": "Find occurrences of text on the page.", "parameters": {"type": "object", "properties": {"text": {"type": "string"}}, "required": ["text"]}}},
    {"type": "function", "function": {"name": "wait_for", "description": "Wait for a condition: selector, load, url, network_idle.", "parameters": {"type": "object", "properties": {"type": {"type": "string", "enum": ["selector", "load", "url", "network_idle"]}, "value": {"type": "string"}, "timeout": {"type": "integer"}}, "required": ["type"]}}},
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
    {"type": "function", "function": {"name": "shell", "description": "Execute a shell command (bash). Use for system operations, installing packages, running scripts.", "parameters": {"type": "object", "properties": {"command": {"type": "string"}}, "required": ["command"]}}},
    {"type": "function", "function": {"name": "run_code", "description": "Execute code. Supports Python or JavaScript.", "parameters": {"type": "object", "properties": {"code": {"type": "string"}, "language": {"type": "string", "enum": ["python", "javascript"]}}, "required": ["code"]}}},
    {"type": "function", "function": {"name": "read_file", "description": "Read the contents of a file.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "write_file", "description": "Write content to a file (creates or overwrites).", "parameters": {"type": "object", "properties": {"path": {"type": "string"}, "content": {"type": "string"}}, "required": ["path", "content"]}}},
    {"type": "function", "function": {"name": "list_files", "description": "List files and directories at a path.", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": []}}},
    {"type": "function", "function": {"name": "find_files", "description": "Find files by name pattern (glob).", "parameters": {"type": "object", "properties": {"pattern": {"type": "string"}, "path": {"type": "string"}}, "required": ["pattern"]}}},
    {"type": "function", "function": {"name": "search_files", "description": "Search for text within files (grep).", "parameters": {"type": "object", "properties": {"query": {"type": "string"}, "path": {"type": "string"}}, "required": ["query"]}}},
    {"type": "function", "function": {"name": "install_package", "description": "Install a package via pip, npm, or apt.", "parameters": {"type": "object", "properties": {"package": {"type": "string"}, "manager": {"type": "string", "enum": ["auto", "pip", "npm", "apt"]}}, "required": ["package"]}}},
    {"type": "function", "function": {"name": "add_subtask", "description": "Add a subtask to the dynamic plan.", "parameters": {"type": "object", "properties": {"description": {"type": "string"}}, "required": ["description"]}}},
    {"type": "function", "function": {"name": "update_subtask", "description": "Update a subtask's status.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer"}, "status": {"type": "string", "enum": ["active", "completed", "failed", "skipped"]}, "result": {"type": "string"}}, "required": ["task_id", "status"]}}},
    {"type": "function", "function": {"name": "remove_subtask", "description": "Remove a subtask from the plan.", "parameters": {"type": "object", "properties": {"task_id": {"type": "integer"}}, "required": ["task_id"]}}},
    {"type": "function", "function": {"name": "reorder_subtasks", "description": "Reorder subtasks by providing IDs in the desired order.", "parameters": {"type": "object", "properties": {"order": {"type": "array", "items": {"type": "integer"}}}, "required": ["order"]}}},
    {"type": "function", "function": {"name": "get_plan", "description": "View the current task plan and subtask statuses.", "parameters": {"type": "object", "properties": {}, "required": []}}},
    {"type": "function", "function": {"name": "done", "description": "Mark the task as complete and provide a summary.", "parameters": {"type": "object", "properties": {"summary": {"type": "string"}}, "required": ["summary"]}}},
]


SYSTEM_PROMPT = """You are a computer-use AI agent with browser, terminal, and file system access.

## CRITICAL RULES
1. When asked to OPEN a website, VISIT a site, or BROWSE — you MUST use the "navigate" tool to go to the URL in the browser. NEVER use shell commands like curl/wget for this.
2. After navigating, use "get_screen" to see what's on the page, then interact with elements using "click", "type", etc.
3. Use "shell" ONLY for: installing packages, running system commands, checking disk/network, file operations NOT available via browser.
4. Use "run_code" for: data processing, calculations, script execution.

## TOOLS
- navigate: Go to a URL in the browser (USE THIS for opening websites!)
- get_screen: See current page URL, title, and interactive elements
- click: Click an element by its index number
- type: Type text into an input field
- press_key: Press Enter, Tab, Escape, etc.
- scroll: Scroll the page up/down
- shell: Run bash commands (NOT for opening websites)
- run_code: Execute Python or JavaScript code
- done: Mark task complete with summary

## EXAMPLE — "open flipkart":
1. navigate(url: "https://www.flipkart.com")
2. get_screen() — see what's on the page
3. Interact as needed
4. done(summary: "Opened Flipkart successfully")

## DYNAMIC PLANNING
Use add_subtask/update_subtask to manage your plan for complex tasks.

## FAILURE MEMORY
When an approach fails, try a different strategy. Don't repeat the same failed approach.

## RISKY ACTIONS
For irreversible actions (payments, sends, deletes), describe what you're about to do and wait for confirmation.

For simple greetings or questions — respond with text. Plan first, execute efficiently, verify with screenshot_diff, call done when finished."""


# ── Per-run state reset ─────────────────────────────────────────────────────

def reset_agent_state():
    global _planner, _logger, _compressor, _failures, _screenshot_before, _screenshot_after
    _planner = DynamicPlanner()
    _logger = ActionLogger()
    _compressor = ContextCompressor()
    _failures = FailureMemory()
    _screenshot_before = ""
    _screenshot_after = ""


# ── LLM caller ──────────────────────────────────────────────────────────────

async def call_llm_with_tools(messages: list[dict]) -> dict:
    headers = {"Content-Type": "application/json"}
    if LLM_KEY and LLM_KEY != "no-auth":
        headers["Authorization"] = f"Bearer {LLM_KEY}"

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
    await broadcast({"type": "system", "text": f"Task: {task}"})
    await broadcast({"type": "plan", "plan": _planner.to_dict()})
    messages = [{"role": "user", "content": task}]

    max_steps = 20

    for step in range(max_steps):
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

            _screenshot_before = await take_screenshot_base64()

            t0 = time.time()
            result = await execute_action({"action": fn_name, **fn_args})
            elapsed = round(time.time() - t0, 2)

            _screenshot_after = await take_screenshot_base64()

            success = "error" not in result.lower() and "timed out" not in result.lower()
            _logger.log(fn_name, fn_args, result, success, _screenshot_before, _screenshot_after)

            if not success:
                _failures.record(fn_name, result[:200])

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
                "tool_call_id": tc.get("id", ""),
                "content": result or "Action executed.",
            })

            if fn_name == "done":
                await broadcast({"type": "system", "text": fn_args.get("summary", "Done.")})
                await broadcast({"type": "system", "text": "Agent finished."})
                return

    await broadcast({"type": "system", "text": "Agent loop ended (step budget reached)."})


# ── WebSocket endpoints ─────────────────────────────────────────────────────

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


@app.websocket("/ws/video")
async def ws_video(ws: WebSocket):
    """Live video stream — pushes Playwright JPEG frames at 15fps over WebSocket binary."""
    await ws.accept()
    fps = 15
    interval = 1.0 / fps
    last_good_frame = None
    try:
        while True:
            try:
                if _page:
                    frame = await _page.screenshot(type="jpeg", quality=60)
                    last_good_frame = frame
                    await ws.send_bytes(frame)
                elif last_good_frame:
                    await ws.send_bytes(last_good_frame)
            except Exception:
                if last_good_frame:
                    try:
                        await ws.send_bytes(last_good_frame)
                    except Exception:
                        break
            await asyncio.sleep(interval)
    except WebSocketDisconnect:
        pass
    except Exception:
        pass


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


@app.get("/stream.mjpeg")
@app.get("/video_feed")
@app.get("/live.mjpeg")
async def live_desktop_stream():
    return StreamingResponse(
        screenshot_mjpeg_stream(),
        media_type="multipart/x-mixed-replace; boundary=desktop-frame",
        headers={
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            "Pragma": "no-cache",
        },
    )


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
    return JSONResponse({"status": "ok", "browser": _browser is not None})


# ── Serve frontend ──────────────────────────────────────────────────────────

_FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    index = _FRONTEND_DIR / "index.html"
    if index.exists():
        return HTMLResponse(content=index.read_text(encoding="utf-8"))
    return HTMLResponse(content="<h1>Frontend not found</h1>", status_code=404)


# ── Lifecycle hooks ─────────────────────────────────────────────────────────

@app.on_event("startup")
async def on_startup():
    try:
        await init_browser()
    except Exception as e:
        print(f"[Desktop Agent] Failed to init browser: {e}")


@app.on_event("shutdown")
async def on_shutdown():
    await close_browser()
