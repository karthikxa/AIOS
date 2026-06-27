"""Windows-native Desktop API server using mss + Win32 APIs.

Replaces container/desktop_server.py on Windows.
No Docker, no Linux tools, no X11 needed.
"""

from __future__ import annotations

import asyncio
import base64
import ctypes
import ctypes.wintypes
import io
import logging
import platform
import tempfile
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_file

logger = logging.getLogger(__name__)

app = Flask(__name__)

_SYSTEM = platform.system()
_SCREENSHOT_DIR = Path(tempfile.gettempdir()) / "agent-screenshots"
_SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Win32 constants
# ---------------------------------------------------------------------------
MOUSEEVENTF_MOVE = 0x0001
MOUSEEVENTF_LEFTDOWN = 0x0002
MOUSEEVENTF_LEFTUP = 0x0004
MOUSEEVENTF_RIGHTDOWN = 0x0008
MOUSEEVENTF_RIGHTUP = 0x0010
MOUSEEVENTF_ABSOLUTE = 0x8000
KEYEVENTF_UNICODE = 0x0004
KEYEVENTF_KEYUP = 0x0002
INPUT_KEYBOARD = 1

user32 = ctypes.windll.user32


def _get_screen_size() -> tuple[int, int]:
    return (user32.GetSystemMetrics(0), user32.GetSystemMetrics(1))


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.route("/health")
def health():
    return jsonify({"status": "ok", "platform": _SYSTEM})


@app.route("/screen_size")
def screen_size():
    w, h = _get_screen_size()
    return jsonify({"width": w, "height": h})


@app.route("/screenshot")
def screenshot():
    try:
        import mss

        with mss.mss() as sct:
            monitor = sct.monitors[1]
            sct_img = sct.grab(monitor)
            from PIL import Image

            img = Image.frombytes("RGB", sct_img.size, sct_img.rgb)
            buf = io.BytesIO()
            img.save(buf, format="PNG")
            buf.seek(0)
            return send_file(buf, mimetype="image/png")
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/click", methods=["POST"])
def click():
    try:
        data = request.get_json(force=True)
        x = int(data["x"])
        y = int(data["y"])
        button = data.get("button", "left")
        _click_impl(x, y, button)
        return jsonify({"status": "ok", "x": x, "y": y, "button": button})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/double_click", methods=["POST"])
def double_click():
    try:
        data = request.get_json(force=True)
        x = int(data["x"])
        y = int(data["y"])
        _click_impl(x, y, "left")
        _click_impl(x, y, "left")
        return jsonify({"status": "ok", "x": x, "y": y})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/type", methods=["POST"])
def type_text():
    try:
        data = request.get_json(force=True)
        text = data["text"]
        _type_impl(text)
        return jsonify({"status": "ok", "chars": len(text)})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/key", methods=["POST"])
def press_keys():
    try:
        data = request.get_json(force=True)
        keys = data.get("keys", "")
        _press_keys_impl(keys)
        return jsonify({"status": "ok", "keys": keys})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/scroll", methods=["POST"])
def scroll():
    try:
        data = request.get_json(force=True)
        x = int(data.get("x", 0))
        y = int(data.get("y", 0))
        direction = data.get("direction", "down")
        amount = int(data.get("amount", 3))
        _scroll_impl(x, y, direction, amount)
        return jsonify({"status": "ok"})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/drag", methods=["POST"])
def drag():
    try:
        data = request.get_json(force=True)
        x1 = int(data["x1"])
        y1 = int(data["y1"])
        x2 = int(data["x2"])
        y2 = int(data["y2"])
        _drag_impl(x1, y1, x2, y2)
        return jsonify({"status": "ok"})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/command", methods=["POST"])
def run_command():
    import subprocess
    data = request.get_json(force=True)
    cmd = data.get("cmd", "")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=30)
        return jsonify({"stdout": result.stdout, "stderr": result.stderr, "returncode": result.returncode})
    except subprocess.TimeoutExpired:
        return jsonify({"stdout": "", "stderr": "Command timed out", "returncode": -1})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# ---------------------------------------------------------------------------
# Implementation helpers
# ---------------------------------------------------------------------------


def _click_impl(x: int, y: int, button: str) -> None:
    w, h = _get_screen_size()
    abs_x = int(x * 65535 / w)
    abs_y = int(y * 65535 / h)

    flags_down = MOUSEEVENTF_LEFTDOWN if button == "left" else MOUSEEVENTF_RIGHTDOWN
    flags_up = MOUSEEVENTF_LEFTUP if button == "left" else MOUSEEVENTF_RIGHTUP

    user32.mouse_event(MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, abs_x, abs_y, 0, 0)
    user32.mouse_event(flags_down, 0, 0, 0, 0)
    user32.mouse_event(flags_up, 0, 0, 0, 0)


def _type_impl(text: str) -> None:
    class KEYBDINPUT(ctypes.Structure):
        _fields_ = [
            ("wVk", ctypes.wintypes.WORD),
            ("wScan", ctypes.wintypes.WORD),
            ("dwFlags", ctypes.wintypes.DWORD),
            ("time", ctypes.wintypes.DWORD),
            ("dwExtraInfo", ctypes.POINTER(ctypes.c_ulong)),
        ]

    class INPUT(ctypes.Structure):
        class _INPUT(ctypes.Union):
            _fields_ = [("ki", KEYBDINPUT)]
        _anonymous_ = ("_input",)
        _fields_ = [("type", ctypes.wintypes.DWORD), ("_input", _INPUT)]

    inputs = []
    for ch in text:
        code = ord(ch)
        for flag in (KEYEVENTF_UNICODE, KEYEVENTF_UNICODE | KEYEVENTF_KEYUP):
            inp = INPUT()
            inp.type = INPUT_KEYBOARD
            inp.ki.wVk = 0
            inp.ki.wScan = code
            inp.ki.dwFlags = flag
            inputs.append(inp)

    arr = (INPUT * len(inputs))(*inputs)
    user32.SendInput(len(inputs), arr, ctypes.sizeof(INPUT))


def _press_keys_impl(keys: str) -> None:
    import time
    key_map = {
        "ctrl": 0x11, "control": 0x11,
        "alt": 0x12, "shift": 0x10,
        "enter": 0x0D, "return": 0x0D,
        "tab": 0x09, "space": 0x20,
        "backspace": 0x08, "delete": 0x2E,
        "escape": 0x1B, "esc": 0x1B,
        "up": 0x26, "down": 0x28, "left": 0x25, "right": 0x27,
        "home": 0x24, "end": 0x23, "pageup": 0x21, "pagedown": 0x22,
        "a": 0x41, "b": 0x42, "c": 0x43, "d": 0x44, "e": 0x45,
        "f": 0x46, "g": 0x47, "h": 0x48, "i": 0x49, "j": 0x4A,
        "k": 0x4B, "l": 0x4C, "m": 0x4D, "n": 0x4E, "o": 0x4F,
        "p": 0x50, "q": 0x51, "r": 0x52, "s": 0x53, "t": 0x54,
        "u": 0x55, "v": 0x56, "w": 0x57, "x": 0x58, "y": 0x59, "z": 0x5A,
        "f1": 0x70, "f2": 0x71, "f3": 0x72, "f4": 0x73, "f5": 0x74,
        "f6": 0x75, "f7": 0x76, "f8": 0x77, "f9": 0x78, "f10": 0x79,
        "f11": 0x7A, "f12": 0x7B,
    }

    parts = [p.strip().lower() for p in keys.replace("+", " ").split()]
    vk_codes = []
    for p in parts:
        if p in key_map:
            vk_codes.append(key_map[p])
        elif len(p) == 1:
            vk_codes.append(ord(p.upper()))

    # Press all keys down
    for vk in vk_codes:
        user32.keybd_event(vk, 0, 0, 0)
    time.sleep(0.05)
    # Release in reverse
    for vk in reversed(vk_codes):
        user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, 0)


def _scroll_impl(x: int, y: int, direction: str, amount: int) -> None:
    from PIL import Image

    w, h = _get_screen_size()
    abs_x = int(x * 65535 / w) if x else 0
    abs_y = int(y * 65535 / h) if y else 0

    if abs_x or abs_y:
        user32.mouse_event(MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, abs_x, abs_y, 0, 0)

    clicks = amount if direction == "down" else -amount
    user32.mouse_event(0x0800, 0, 0, clicks, 0)


def _drag_impl(x1: int, y1: int, x2: int, y2: int) -> None:
    w, h = _get_screen_size()
    abs_x1 = int(x1 * 65535 / w)
    abs_y1 = int(y1 * 65535 / h)
    abs_x2 = int(x2 * 65535 / w)
    abs_y2 = int(y2 * 65535 / h)

    user32.mouse_event(MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, abs_x1, abs_y1, 0, 0)
    user32.mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
    user32.mouse_event(MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, abs_x2, abs_y2, 0, 0)
    user32.mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def run_server(host: str = "127.0.0.1", port: int = 7777, debug: bool = False) -> None:
    logger.info("Starting Windows Desktop API server on %s:%d", host, port)
    app.run(host=host, port=port, debug=debug, use_reloader=False)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_server()
