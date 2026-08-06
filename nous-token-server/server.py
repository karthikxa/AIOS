"""
Nous Token Server — tiny local helper
Reads the Nous Research access token from hermes auth.json on disk
and exposes it over localhost so the frontend can read it directly.

Runs on http://localhost:7123/nous-token
"""
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

# Candidate paths for hermes auth.json (Windows)
CANDIDATE_PATHS = [
    Path(os.environ.get("HERMES_HOME", "")) / "auth.json" if os.environ.get("HERMES_HOME") else None,
    Path("C:/Users") / os.environ.get("USERNAME", "balur") / "AppData/Local/hermes/auth.json",
    Path.home() / ".hermes" / "auth.json",
    Path.home() / "AppData/Local/hermes/auth.json",
]

PORT = 7123


def get_nous_token() -> dict:
    for p in CANDIDATE_PATHS:
        if p is None:
            continue
        try:
            if p.exists():
                data = json.loads(p.read_text(encoding="utf-8"))
                nous = data.get("providers", {}).get("nous", {})
                token = nous.get("access_token", "") or ""
                base_url = nous.get("inference_base_url", "https://inference-api.nousresearch.com/v1")
                if token:
                    return {"token": token, "base_url": base_url.rstrip("/"), "source": str(p)}
        except Exception:
            pass
    return {"token": "", "base_url": "https://inference-api.nousresearch.com/v1", "source": "none"}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        # Suppress noisy access log
        pass

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path == "/nous-token":
            payload = json.dumps(get_nous_token()).encode()
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        elif self.path == "/health":
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"ok")
        else:
            self.send_response(404)
            self.end_headers()

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Private-Network", "true")


if __name__ == "__main__":
    httpd = HTTPServer(("127.0.0.1", PORT), Handler)
    print(f"[Nous Token Server] Running on http://127.0.0.1:{PORT}", flush=True)
    info = get_nous_token()
    if info["token"]:
        print(f"[Nous Token Server] Token found from: {info['source']}", flush=True)
    else:
        print("[Nous Token Server] WARNING: No Nous token found in any auth.json path", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("[Nous Token Server] Shutting down", flush=True)
        sys.exit(0)
