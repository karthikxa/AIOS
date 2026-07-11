"""Google OAuth plugin — token state, tool registration, and route wiring.

Exports:
  - ``_google_tokens`` / ``set_tokens`` / ``is_connected`` — shared in-memory state
    that tool ``check_fn`` functions read to gate availability.
  - ``register(ctx)`` — plugin entry point, registered tools via ctx.
  - ``router`` — FastAPI APIRouter with /oauth/* endpoints for the server to mount.
"""

from __future__ import annotations

import json
import logging
import os
import urllib.parse
from typing import Any, Dict

from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import RedirectResponse

logger = logging.getLogger("plugins.google")

# ── Shared token state ────────────────────────────────────────────────────────
import sys

_google_tokens: dict = {}
_oauth_states: dict = {}  # user_id -> code_verifier for PKCE

# Share state if this module is imported under different names (double-import guard)
for mod_name, mod in list(sys.modules.items()):
    if (mod_name.endswith("dashboard_auth__google") or mod_name.endswith("plugins.dashboard_auth.google")) and mod_name != __name__:
        if hasattr(mod, "_google_tokens"):
            _google_tokens = mod._google_tokens
        if hasattr(mod, "_oauth_states"):
            _oauth_states = mod._oauth_states
        break

def _update_all_instances(attr_name, value):
    for mod_name, mod in list(sys.modules.items()):
        if mod_name.endswith("dashboard_auth__google") or mod_name.endswith("plugins.dashboard_auth.google"):
            try:
                setattr(mod, attr_name, value)
            except Exception:
                pass

def set_tokens(plugin_id: str, tokens: dict) -> None:
    _google_tokens[plugin_id] = tokens

def get_tokens(plugin_id: str) -> dict:
    return _google_tokens.get(plugin_id, {})

def is_connected(plugin_id: str) -> bool:
    return plugin_id in _google_tokens

def disconnect_state(plugin_id: str) -> None:
    _google_tokens.pop(plugin_id, None)

def all_connected() -> list:
    return list(_google_tokens.keys())

# ── Config ─────────────────────────────────────────────────────────────────────
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "")  # Dynamic — built from request at runtime

GOOGLE_SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/tasks",
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/photoslibrary.readonly",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/documents.readonly",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/presentations.readonly",
    "https://www.googleapis.com/auth/chat.messages.readonly",
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/meetings.space.readonly",
]

GOOGLE_PLUGIN_IDS = [
    "gmail", "google-drive", "calendar", "google-docs", "google-sheets",
    "google-slides", "google-tasks", "google-contacts", "google-chat",
    "google-meet", "youtube", "google-fit", "google-classroom", "google-photos",
]

HAS_GOOGLE_AUTH = False
try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import Flow
    HAS_GOOGLE_AUTH = True
except ImportError:
    pass

# Map DB provider names to plugin keys used by check_fn and creds_for
_PROVIDER_TO_PLUGIN = {
    "gmail": "gmail",
    "google-drive": "google-drive",
    "calendar": "calendar",
    "google-tasks": "google-tasks",
    "google-contacts": "google-contacts",
    "google-photos": "google-photos",
    "youtube": "youtube",
    "google-docs": "google-docs",
    "google-sheets": "google-sheets",
    "google-slides": "google-slides",
    "google-chat": "google-chat",
    "google-meet": "google-meet",
    "google-fit": "google-fit",
    "google-classroom": "google-classroom",
}

# ── OAuth Routes ───────────────────────────────────────────────────────────────
router = APIRouter()

def _make_google_flow(redirect_uri: str):
    return Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [redirect_uri],
            }
        },
        scopes=GOOGLE_SCOPES,
        redirect_uri=redirect_uri,
    )


@router.get("/oauth/google/connect")
async def google_connect(
    request: Request,
    user_id: str = Query(..., description="Unique user identifier"),
    plugin_id: str = Query("google", description="Plugin ID to connect (e.g. gmail, google-drive)"),
    redirect_to: str = Query("/plugins", description="URL to redirect after OAuth callback"),
):
    if not HAS_GOOGLE_AUTH:
        raise HTTPException(status_code=500, detail="google-auth-oauthlib not installed.")
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="GOOGLE_CLIENT_ID not configured in .env")

    # Build redirect URI for Google OAuth
    # Priority: 1. GOOGLE_REDIRECT_URI env var, 2. DASHBOARD_BASE_URL + path, 3. request host
    env_redirect = os.getenv("GOOGLE_REDIRECT_URI", "").rstrip("/")
    env_dashboard_base = os.getenv("DASHBOARD_BASE_URL", "").rstrip("/")
    if env_redirect:
        redirect_uri = env_redirect
    elif env_dashboard_base:
        redirect_uri = f"{env_dashboard_base}/oauth/google/callback"
    else:
        scheme = request.headers.get("x-forwarded-proto", request.url.scheme)
        redirect_uri = f"{scheme}://{request.url.netloc}/oauth/google/callback"

    flow = _make_google_flow(redirect_uri)
    auth_url, _ = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        state=f"{user_id}:{plugin_id}",
    )
    # Store PKCE code_verifier + redirect target for callback to use
    _oauth_states[user_id] = (flow.code_verifier, plugin_id, redirect_to)
    logger.info("Google OAuth connect initiated for user: %s plugin: %s redirect_uri: %s", user_id, plugin_id, redirect_uri)
    return RedirectResponse(url=auth_url)


@router.get("/oauth/google/callback")
async def google_callback(
    request: Request,
    code: str = Query(None),
    state: str = Query(None),
    error: str = Query(None),
):
    # Dynamically determine the frontend dashboard base domain
    # Priority: 1. DASHBOARD_BASE_URL env var, 2. origin/referer header, 3. backend's own host
    env_dashboard_base = os.getenv("DASHBOARD_BASE_URL", "").rstrip("/")
    origin = request.headers.get("origin") or request.headers.get("referer")
    if env_dashboard_base:
        dashboard_base = env_dashboard_base
    elif origin:
        dashboard_base = origin.rstrip("/")
        if "/oauth/" in dashboard_base:
            dashboard_base = dashboard_base.split("/oauth/")[0]
    else:
        scheme = request.headers.get("x-forwarded-proto", request.url.scheme)
        dashboard_base = f"{scheme}://{request.url.netloc}"

    if error:
        logger.warning("OAuth error for user %s: %s", state, error)
        return RedirectResponse(url=f"{dashboard_base}/plugins?error={error}")
    if not code or not state:
        return RedirectResponse(url=f"{dashboard_base}/plugins?error=missing_code_or_state")
    if not HAS_GOOGLE_AUTH:
        return RedirectResponse(url=f"{dashboard_base}/plugins?error=missing_lib")

    user_id = state  # state = "user_id:plugin_id"
    plugin_id = "google"
    if ":" in state:
        parts = state.split(":", 1)
        user_id = parts[0]
        plugin_id = parts[1]

    try:
        # Build redirect_uri using the same priority as connect endpoint
        env_redirect = os.getenv("GOOGLE_REDIRECT_URI", "").rstrip("/")
        if env_redirect:
            redirect_uri = env_redirect
        elif env_dashboard_base:
            redirect_uri = f"{env_dashboard_base}/oauth/google/callback"
        else:
            scheme = request.headers.get("x-forwarded-proto", request.url.scheme)
            redirect_uri = f"{scheme}://{request.url.netloc}/oauth/google/callback"
        logger.info("Exchanging code for user %s plugin %s with redirect_uri %s", user_id, plugin_id, redirect_uri)
        flow = _make_google_flow(redirect_uri)
        # Restore PKCE code_verifier + redirect_to from connect step
        redirect_target = f"{dashboard_base}/plugins?connected={urllib.parse.quote(plugin_id)}&user_id={urllib.parse.quote(user_id)}"
        stored = _oauth_states.pop(user_id, None)
        if stored:
            code_verifier, orig_plugin = stored[0], stored[1]
            flow.code_verifier = code_verifier
            plugin_id = orig_plugin
            if len(stored) >= 3 and stored[2]:
                # Append connection status query params to the stored redirect URL
                base_url = stored[2].rstrip('/')
                redirect_target = f"{base_url}?connected={urllib.parse.quote(plugin_id)}&user_id={urllib.parse.quote(user_id)}"
        flow.fetch_token(code=code)
        logger.info("Token fetched successfully for user %s plugin %s", user_id, plugin_id)
        creds = flow.credentials

        import httpx
        email, name = None, None
        try:
            async with httpx.AsyncClient() as client:
                r = await client.get(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    headers={"Authorization": f"Bearer {creds.token}"},
                    timeout=5.0,
                )
                if r.status_code == 200:
                    ui = r.json()
                    email = ui.get("email")
                    name = ui.get("name")
        except Exception as e:
            logger.warning("Could not fetch user info: %s", e)

        import time
        expires_at = time.time() + 3600
        scopes_str = " ".join(list(creds.scopes)) if creds.scopes else " ".join(GOOGLE_SCOPES)

        # Save tokens only for the specific plugin the user requested
        _save_conn(
            user_id=user_id,
            provider=plugin_id,
            access_token=creds.token,
            refresh_token=creds.refresh_token,
            expires_at=expires_at,
            scopes=scopes_str,
            email=email,
            name=name,
        )
        # Also save under generic "google" provider for get_valid_token()/check_fn
        _save_conn(
            user_id=user_id,
            provider="google",
            access_token=creds.token,
            refresh_token=creds.refresh_token,
            expires_at=expires_at,
            scopes=scopes_str,
            email=email,
            name=name,
        )

        set_tokens("google-drive", {
            "token": creds.token,
            "refresh_token": creds.refresh_token,
            "token_uri": "https://oauth2.googleapis.com/token",
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "scopes": list(creds.scopes) if creds.scopes else GOOGLE_SCOPES,
        })

        from tools.registry import invalidate_check_fn_cache
        invalidate_check_fn_cache()
        from model_tools import _clear_tool_defs_cache
        _clear_tool_defs_cache()

        logger.info("Google OAuth tokens saved for user %s (%s)", user_id, email)

    except Exception as e:
        err_msg = urllib.parse.quote(str(e))
        logger.error("OAuth token exchange failed for user %s: %s", user_id, e)
        return RedirectResponse(url=redirect_target + "&error=token_exchange_failed&detail=" + err_msg)

    return RedirectResponse(url=redirect_target)


@router.get("/oauth/status")
async def oauth_status(user_id: str = Query(...)):
    result = {}
    if _connections_db is not None:
        try:
            # Check all connected providers (including google)
            rows = _connections_db.execute(
                "SELECT provider, email, name FROM connections WHERE user_id=?",
                (user_id,)
            ).fetchall()
            for r in rows:
                result[r["provider"]] = {
                    "connected": True,
                    "email": r["email"],
                    "name": r["name"],
                }
        except Exception:
            pass
    result["google"] = result.get("google", {}).get("connected", False)
    return result


@router.get("/oauth/token")
async def oauth_get_token(user_id: str = Query(...), provider: str = Query("google")):
    token = await get_valid_token(user_id, provider)
    if not token:
        raise HTTPException(status_code=404, detail=f"No token found for user {user_id} provider {provider}")
    return {"access_token": token, "user_id": user_id, "provider": provider}


@router.delete("/oauth/disconnect")
async def oauth_disconnect(user_id: str = Query(...), provider: str = Query(...)):
    _delete_conn(user_id, provider)
    if provider != "google":
        _delete_conn(user_id, "google")  # also clean up generic google entry
    disconnect_state(provider)
    logger.info("Provider %s disconnected for user %s", provider, user_id)
    from tools.registry import invalidate_check_fn_cache
    invalidate_check_fn_cache()
    from model_tools import _clear_tool_defs_cache
    _clear_tool_defs_cache()
    return {"ok": True, "user_id": user_id, "provider": provider}


@router.get("/oauth/debug")
async def oauth_debug(user_id: str = Query(None)):
    if _connections_db is None:
        return {"error": "DB not initialized"}
    try:
        if user_id:
            rows = _connections_db.execute(
                "SELECT user_id, provider, email, name, updated_at FROM connections WHERE user_id=?",
                (user_id,)
            ).fetchall()
        else:
            rows = _connections_db.execute(
                "SELECT user_id, provider, email, name, updated_at FROM connections"
            ).fetchall()
        return {"connections": [dict(r) for r in rows]}
    except Exception as e:
        return {"error": str(e)}


# ── DB helpers (uses server.py's global _connections_db) ──────────────────────

_connections_db = None
CONNECTIONS_DB_PATH = None

def init_db(db_path):
    global _connections_db, CONNECTIONS_DB_PATH
    CONNECTIONS_DB_PATH = db_path
    import sqlite3
    db = sqlite3.connect(str(db_path), check_same_thread=False)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("""
        CREATE TABLE IF NOT EXISTS connections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            provider TEXT NOT NULL,
            access_token TEXT NOT NULL,
            refresh_token TEXT,
            expires_at REAL,
            scopes TEXT,
            email TEXT,
            name TEXT,
            created_at REAL DEFAULT (unixepoch()),
            updated_at REAL DEFAULT (unixepoch()),
            UNIQUE(user_id, provider)
        )
    """)
    db.commit()
    _connections_db = db
    _update_all_instances("_connections_db", db)
    # Reload tokens from DB into in-memory cache so tools are available
    _reload_tokens_from_db()
    logger.info("Connections DB ready: %s", db_path)
    return db

def _reload_tokens_from_db():
    """Restore _google_tokens from DB after server restart."""
    if _connections_db is None:
        return
    try:
        _google_tokens.clear()
        rows = _connections_db.execute(
            "SELECT provider, access_token, refresh_token, scopes FROM connections"
        ).fetchall()
        generic_row = None
        first_google_row = None
        for r in rows:
            provider = r["provider"]
            if provider == "google":
                generic_row = r
                continue
            plugin_key = _PROVIDER_TO_PLUGIN.get(provider, provider)
            token_data = {
                "token": r["access_token"],
                "refresh_token": r["refresh_token"],
                "token_uri": "https://oauth2.googleapis.com/token",
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "scopes": (r["scopes"] or "").split(),
            }
            set_tokens(plugin_key, token_data)
            if first_google_row is None and plugin_key in (
                "gmail", "google-drive", "calendar", "google-contacts",
                "google-photos", "youtube", "google-docs", "google-sheets",
                "google-slides", "google-chat", "google-meet", "google-fit",
                "google-classroom", "google-tasks",
            ):
                first_google_row = token_data

        # Always populate "google-drive" — ALL tool handlers use _creds_for("google-drive")
        # regardless of which specific Google service was connected
        fallback = generic_row or first_google_row
        if fallback:
            set_tokens("google-drive", {
                "token": fallback["access_token"] if "access_token" in fallback else fallback["token"],
                "refresh_token": fallback["refresh_token"],
                "token_uri": "https://oauth2.googleapis.com/token",
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "scopes": (fallback.get("scopes") or "").split() if isinstance(fallback.get("scopes"), str) else fallback.get("scopes", []),
            })

        count = _connections_db.execute("SELECT COUNT(*) as c FROM connections").fetchone()
        logger.info("Restored %s connection(s) from DB into memory", count["c"] if count else 0)
    except Exception as e:
        logger.warning("Failed to reload tokens from DB: %s", e)

def _get_conn(user_id: str, provider: str):
    if _connections_db is None:
        return None
    try:
        row = _connections_db.execute(
            "SELECT * FROM connections WHERE user_id=? AND provider=?",
            (user_id, provider)
        ).fetchone()
        return dict(row) if row else None
    except Exception as e:
        logger.warning("_get_conn error: %s", e)
        return None

def _save_conn(
    user_id: str, provider: str, access_token: str,
    refresh_token: str, expires_at: float,
    scopes: str, email: str, name: str,
):
    if _connections_db is None:
        return
    try:
        _connections_db.execute("""
            INSERT INTO connections
              (user_id, provider, access_token, refresh_token, expires_at, scopes, email, name, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
            ON CONFLICT(user_id, provider) DO UPDATE SET
              access_token=excluded.access_token,
              refresh_token=COALESCE(excluded.refresh_token, refresh_token),
              expires_at=excluded.expires_at,
              scopes=excluded.scopes,
              email=excluded.email,
              name=excluded.name,
              updated_at=unixepoch()
        """, (user_id, provider, access_token, refresh_token, expires_at, scopes, email, name))
        _connections_db.commit()
    except Exception as e:
        logger.error("_save_conn error: %s", e)

def _delete_conn(user_id: str, provider: str):
    if _connections_db is None:
        return
    try:
        _connections_db.execute(
            "DELETE FROM connections WHERE user_id=? AND provider=?",
            (user_id, provider)
        )
        _connections_db.commit()
    except Exception as e:
        logger.error("_delete_conn error: %s", e)

async def get_valid_token(user_id: str, provider: str) -> str:
    conn = _get_conn(user_id, provider)
    if not conn:
        return ""
    access_token = conn.get("access_token", "")
    refresh_token = conn.get("refresh_token", "")
    expires_at = conn.get("expires_at", 0)
    import time
    if time.time() < expires_at - 60:
        return access_token
    if refresh_token:
        try:
            creds = Credentials(
                token=access_token,
                refresh_token=refresh_token,
                token_uri="https://oauth2.googleapis.com/token",
                client_id=GOOGLE_CLIENT_ID,
                client_secret=GOOGLE_CLIENT_SECRET,
            )
            from google.auth.transport.requests import Request
            creds.refresh(Request())
            _save_conn(
                user_id=user_id, provider=provider,
                access_token=creds.token,
                refresh_token=creds.refresh_token,
                expires_at=creds.expiry.timestamp() if creds.expiry else (time.time() + 3600),
                scopes=" ".join(creds.scopes) if creds.scopes else "",
                email=conn.get("email", ""),
                name=conn.get("name", ""),
            )
            return creds.token
        except Exception as e:
            logger.error("Token refresh failed for user %s: %s", user_id, e)
    return ""


# ── Plugin Tools (handlers + check_fn) ────────────────────────────────────────

def _creds_for(plugin_id: str):
    cached = _TOKEN_CACHE.get(plugin_id)
    if cached:
        return cached
    tokens = get_tokens(plugin_id)
    # Fallback: if "google-drive" not found, try any available Google connection
    if not tokens and plugin_id == "google-drive":
        for fallback_key in ("gmail", "google-drive", "calendar", "youtube",
                             "google-contacts", "google-docs", "google-sheets"):
            tokens = get_tokens(fallback_key)
            if tokens:
                break
    if not tokens:
        return None
    try:
        creds = Credentials(
            token=tokens.get("token"),
            refresh_token=tokens.get("refresh_token"),
            token_uri=tokens.get("token_uri", "https://oauth2.googleapis.com/token"),
            client_id=tokens.get("client_id"),
            client_secret=tokens.get("client_secret"),
            scopes=tokens.get("scopes"),
        )
        _TOKEN_CACHE[plugin_id] = creds
        return creds
    except Exception as e:
        logger.error("Failed to build credentials for %s: %s", plugin_id, e)
        return None

_TOKEN_CACHE: Dict[str, Any] = {}

def _check_connected(plugin: str = None) -> bool:
    """check_fn for tools — returns True only if the specific plugin is connected."""
    if _google_tokens:
        return True
    if _connections_db is None:
        return False
    try:
        q = "SELECT 1 FROM connections WHERE provider=? LIMIT 1"
        row = _connections_db.execute(q, (plugin,)).fetchone() if plugin else None
        return row is not None
    except Exception:
        return False

def _check_gmail() -> bool:
    return _check_connected("gmail")

def _check_drive() -> bool:
    return _check_connected("google-drive")

def _check_calendar() -> bool:
    return _check_connected("calendar")

def _check_tasks() -> bool:
    return _check_connected("google-tasks")

def _check_contacts() -> bool:
    return _check_connected("google-contacts")

def _check_photos() -> bool:
    return _check_connected("google-photos")

def _check_youtube() -> bool:
    return _check_connected("youtube")

def _check_docs() -> bool:
    return _check_connected("google-docs")

def _check_sheets() -> bool:
    return _check_connected("google-sheets")

def _check_slides() -> bool:
    return _check_connected("google-slides")

def _check_chat() -> bool:
    return _check_connected("google-chat")

def _check_meet() -> bool:
    return _check_connected("google-meet")

def _check_fit() -> bool:
    return _check_connected("google-fit")

def _check_classroom() -> bool:
    return _check_connected("google-classroom")


# ── Gmail Handlers ────────────────────────────────────────────────────────────

def _handle_gmail_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        max_results = min(args.get("max_results", 10), 50)
        query = args.get("query", "")
        results = service.users().messages().list(
            userId="me", maxResults=max_results, q=query
        ).execute()
        messages = results.get("messages", [])
        emails = []
        for msg in messages[:max_results]:
            meta = service.users().messages().get(
                userId="me", id=msg["id"], format="metadata",
                metadataHeaders=["From", "Subject", "Date"]
            ).execute()
            headers = {h["name"]: h["value"] for h in meta.get("payload", {}).get("headers", [])}
            emails.append({
                "id": msg["id"],
                "from": headers.get("From", ""),
                "subject": headers.get("Subject", ""),
                "date": headers.get("Date", ""),
                "snippet": meta.get("snippet", ""),
            })
        return json.dumps({"emails": emails})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_gmail_read(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        msg_id = args.get("message_id", "")
        if not msg_id:
            return json.dumps({"error": "message_id required"})
        msg = service.users().messages().get(userId="me", id=msg_id, format="full").execute()
        headers = {h["name"]: h["value"] for h in msg.get("payload", {}).get("headers", [])}
        payload = msg.get("payload", {})
        body = ""
        if "parts" in payload:
            for part in payload["parts"]:
                if part.get("mimeType") == "text/plain" and part.get("body", {}).get("data"):
                    import base64
                    body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8", errors="replace")
                    break
        elif payload.get("body", {}).get("data"):
            import base64
            body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8", errors="replace")
        return json.dumps({
            "id": msg_id,
            "from": headers.get("From", ""),
            "subject": headers.get("Subject", ""),
            "date": headers.get("Date", ""),
            "body": body[:50000],
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_gmail_send(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        import base64
        from email.message import EmailMessage
        from googleapiclient.discovery import build

        to = args.get("to", "")
        subject = args.get("subject", "")
        body_text = args.get("body", "")
        if not to or not subject:
            return json.dumps({"error": "to and subject are required"})

        message = EmailMessage()
        message.set_content(body_text)
        message["To"] = to
        message["Subject"] = subject
        encoded = base64.urlsafe_b64encode(message.as_bytes()).decode()

        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        sent = service.users().messages().send(userId="me", body={"raw": encoded}).execute()
        return json.dumps({"success": True, "message_id": sent.get("id")})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Drive Handlers ────────────────────────────────────────────────────────────

def _handle_drive_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        page_size = min(args.get("page_size", 20), 100)
        query = args.get("query", "")
        q = query if query else None
        results = service.files().list(
            pageSize=page_size, q=q,
            fields="files(id, name, mimeType, size, modifiedTime, webViewLink)"
        ).execute()
        files = [
            {
                "id": f["id"],
                "name": f["name"],
                "mimeType": f.get("mimeType", ""),
                "size": f.get("size", "0"),
                "modifiedTime": f.get("modifiedTime", ""),
                "link": f.get("webViewLink", ""),
            }
            for f in results.get("files", [])
        ]
        return json.dumps({"files": files})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_drive_search(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        query = args.get("query", "")
        if not query:
            return json.dumps({"error": "query is required"})
        results = service.files().list(
            q=f"name contains '{query}'",
            pageSize=20,
            fields="files(id, name, mimeType, size, modifiedTime, webViewLink)"
        ).execute()
        files = [
            {
                "id": f["id"],
                "name": f["name"],
                "mimeType": f.get("mimeType", ""),
                "size": f.get("size", "0"),
                "modifiedTime": f.get("modifiedTime", ""),
                "link": f.get("webViewLink", ""),
            }
            for f in results.get("files", [])
        ]
        return json.dumps({"files": files})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_drive_read(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google Drive not connected"})
    try:
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaIoBaseDownload
        import io

        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        file_id = args.get("file_id", "")
        if not file_id:
            return json.dumps({"error": "file_id required"})

        file_meta = service.files().get(fileId=file_id, fields="name, mimeType").execute()
        mime = file_meta.get("mimeType", "")

        if mime.startswith("application/vnd.google-apps"):
            if mime == "application/vnd.google-apps.document":
                content = service.files().export(fileId=file_id, mimeType="text/plain").execute()
            elif mime == "application/vnd.google-apps.spreadsheet":
                content = service.files().export(fileId=file_id, mimeType="text/csv").execute()
            else:
                content = service.files().export(fileId=file_id, mimeType="text/plain").execute()
            text = content.decode("utf-8", errors="replace") if isinstance(content, bytes) else content
        else:
            request = service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                _, done = downloader.next_chunk()
            text = fh.getvalue().decode("utf-8", errors="replace")[:100000]

        return json.dumps({
            "file_id": file_id,
            "name": file_meta.get("name", ""),
            "mimeType": mime,
            "content": text,
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Calendar Handlers ────────────────────────────────────────────────────────

def _handle_calendar_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        max_results = min(args.get("max_results", 10), 50)
        results = service.events().list(
            calendarId="primary", maxResults=max_results,
            singleEvents=True, orderBy="startTime"
        ).execute()
        events = []
        for ev in results.get("items", []):
            start = ev.get("start", {}).get("dateTime") or ev.get("start", {}).get("date", "")
            events.append({
                "id": ev["id"],
                "summary": ev.get("summary", ""),
                "start": start,
                "location": ev.get("location", ""),
            })
        return json.dumps({"events": events})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_calendar_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        from datetime import datetime, timedelta
        service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        summary = args.get("summary", "")
        description = args.get("description", "")
        location = args.get("location", "")
        start_str = args.get("start", "")
        end_str = args.get("end", "")
        if not summary or not start_str:
            return json.dumps({"error": "summary and start are required"})
        ev = {
            "summary": summary,
            "description": description,
            "location": location,
            "start": {"dateTime": start_str, "timeZone": "UTC"},
            "end": {"dateTime": end_str or (datetime.fromisoformat(start_str) + timedelta(hours=1)).isoformat(), "timeZone": "UTC"},
        }
        created = service.events().insert(calendarId="primary", body=ev).execute()
        return json.dumps({"success": True, "event_id": created.get("id"), "link": created.get("htmlLink", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_calendar_update(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        event_id = args.get("event_id", "")
        if not event_id:
            return json.dumps({"error": "event_id is required"})
        ev = service.events().get(calendarId="primary", eventId=event_id).execute()
        if "summary" in args:
            ev["summary"] = args["summary"]
        if "description" in args:
            ev["description"] = args["description"]
        if "location" in args:
            ev["location"] = args["location"]
        if "start" in args:
            ev["start"] = {"dateTime": args["start"], "timeZone": "UTC"}
        if "end" in args:
            ev["end"] = {"dateTime": args["end"], "timeZone": "UTC"}
        updated = service.events().update(calendarId="primary", eventId=event_id, body=ev).execute()
        return json.dumps({"success": True, "event_id": updated.get("id"), "link": updated.get("htmlLink", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_calendar_delete(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("calendar", "v3", credentials=creds, cache_discovery=False)
        event_id = args.get("event_id", "")
        if not event_id:
            return json.dumps({"error": "event_id is required"})
        service.events().delete(calendarId="primary", eventId=event_id).execute()
        return json.dumps({"success": True, "deleted": event_id})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Tasks Handlers ────────────────────────────────────────────────────────────

def _handle_tasks_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("tasks", "v1", credentials=creds, cache_discovery=False)
        max_results = min(args.get("max_results", 20), 100)
        tasklists = service.tasklists().list(maxResults=10).execute()
        all_tasks = []
        for tl in tasklists.get("items", []):
            tasks_resp = service.tasks().list(tasklist=tl["id"], maxResults=max_results).execute()
            for t in tasks_resp.get("items", []):
                all_tasks.append({
                    "id": t["id"],
                    "title": t.get("title", ""),
                    "notes": t.get("notes", ""),
                    "due": t.get("due", ""),
                    "status": t.get("status", ""),
                    "list": tl.get("title", ""),
                })
        return json.dumps({"tasks": all_tasks})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_tasks_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("tasks", "v1", credentials=creds, cache_discovery=False)
        title = args.get("title", "")
        notes = args.get("notes", "")
        due = args.get("due", "")
        if not title:
            return json.dumps({"error": "title is required"})
        tasklists = service.tasklists().list(maxResults=10).execute()
        default_list = tasklists.get("items", [{}])[0].get("id", "@default")
        body = {"title": title}
        if notes:
            body["notes"] = notes
        if due:
            body["due"] = due
        created = service.tasks().insert(tasklist=default_list, body=body).execute()
        return json.dumps({"success": True, "task_id": created.get("id"), "title": created.get("title")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_tasks_update(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("tasks", "v1", credentials=creds, cache_discovery=False)
        task_id = args.get("task_id", "")
        task_list_id = args.get("task_list_id", "@default")
        if not task_id:
            return json.dumps({"error": "task_id is required"})
        body = service.tasks().get(tasklist=task_list_id, task=task_id).execute()
        if "title" in args:
            body["title"] = args["title"]
        if "notes" in args:
            body["notes"] = args["notes"]
        if "due" in args:
            body["due"] = args["due"]
        if "status" in args:
            body["status"] = args["status"]
        updated = service.tasks().update(tasklist=task_list_id, task=task_id, body=body).execute()
        return json.dumps({"success": True, "task_id": updated.get("id"), "title": updated.get("title")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_tasks_delete(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("tasks", "v1", credentials=creds, cache_discovery=False)
        task_id = args.get("task_id", "")
        task_list_id = args.get("task_list_id", "@default")
        if not task_id:
            return json.dumps({"error": "task_id is required"})
        service.tasks().delete(tasklist=task_list_id, task=task_id).execute()
        return json.dumps({"success": True, "deleted": task_id})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Contacts Handlers ─────────────────────────────────────────────────────────

def _handle_contacts_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        page_size = min(args.get("page_size", 20), 100)
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.get(
                    "https://people.googleapis.com/v1/people/me/connections",
                    params={"personFields": "names,emailAddresses,phoneNumbers", "pageSize": page_size},
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        connections = data.get("connections", [])
        contacts = []
        for conn in connections:
            name = conn.get("names", [{}])[0].get("displayName", "") if conn.get("names") else ""
            email = conn.get("emailAddresses", [{}])[0].get("value", "") if conn.get("emailAddresses") else ""
            phone = conn.get("phoneNumbers", [{}])[0].get("value", "") if conn.get("phoneNumbers") else ""
            contacts.append({"name": name, "email": email, "phone": phone, "resourceName": conn.get("resourceName", "")})
        return json.dumps({"contacts": contacts})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_contacts_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        name = args.get("name", "")
        email = args.get("email", "")
        phone = args.get("phone", "")
        if not name:
            return json.dumps({"error": "name is required"})
        body = {"names": [{"givenName": name}]}
        if email:
            body["emailAddresses"] = [{"value": email}]
        if phone:
            body["phoneNumbers"] = [{"value": phone}]
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    "https://people.googleapis.com/v1/people:createContact",
                    json=body,
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        return json.dumps({"success": True, "resourceName": data.get("resourceName", ""), "name": name})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_contacts_delete(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        resource_name = args.get("resource_name", "")
        if not resource_name:
            return json.dumps({"error": "resource_name is required (e.g. people/c12345)"})
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.delete(
                    f"https://people.googleapis.com/v1/{resource_name}:deleteContact",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=5.0,
                )
                return r.status_code
        import asyncio
        status = asyncio.run(_fetch())
        return json.dumps({"success": status == 200, "deleted": resource_name})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Photos Handlers ───────────────────────────────────────────────────────────

def _handle_photos_list_albums(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        page_size = min(args.get("page_size", 20), 50)
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    "https://photoslibrary.googleapis.com/v1/albums",
                    json={"pageSize": page_size},
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        albums = [{
            "id": a["id"],
            "title": a.get("title", ""),
            "mediaItemsCount": a.get("mediaItemsCount", "0"),
            "coverUrl": a.get("coverPhotoBaseUrl", ""),
        } for a in data.get("albums", [])]
        return json.dumps({"albums": albums})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_photos_list_media(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        album_id = args.get("album_id", "")
        page_size = min(args.get("page_size", 20), 100)
        body = {"pageSize": page_size}
        if album_id:
            body["albumId"] = album_id
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    "https://photoslibrary.googleapis.com/v1/mediaItems:search",
                    json=body,
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        items = [{
            "id": m["id"],
            "filename": m.get("filename", ""),
            "mimeType": m.get("mimeType", ""),
            "baseUrl": m.get("baseUrl", ""),
            "creationTime": (m.get("mediaMetadata") or {}).get("creationTime", ""),
        } for m in data.get("mediaItems", [])]
        return json.dumps({"mediaItems": items})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_photos_create_album(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        title = args.get("title", "")
        if not title:
            return json.dumps({"error": "title is required"})
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    "https://photoslibrary.googleapis.com/v1/albums",
                    json={"album": {"title": title}},
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        return json.dumps({"success": True, "album_id": data.get("id", ""), "title": data.get("title", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── YouTube Handlers ──────────────────────────────────────────────────────────

def _handle_youtube_search(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("youtube", "v3", credentials=creds, cache_discovery=False)
        query = args.get("query", "")
        max_results = min(args.get("max_results", 10), 50)
        if not query:
            return json.dumps({"error": "query is required"})
        results = service.search().list(
            q=query, part="snippet", type="video", maxResults=max_results
        ).execute()
        videos = [{
            "id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "channel": item["snippet"]["channelTitle"],
            "publishedAt": item["snippet"]["publishedAt"],
            "description": item["snippet"]["description"][:200],
        } for item in results.get("items", [])]
        return json.dumps({"videos": videos})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_youtube_video_details(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("youtube", "v3", credentials=creds, cache_discovery=False)
        video_id = args.get("video_id", "")
        if not video_id:
            return json.dumps({"error": "video_id is required"})
        results = service.videos().list(
            part="snippet,statistics,contentDetails", id=video_id
        ).execute()
        items = results.get("items", [])
        if not items:
            return json.dumps({"error": "Video not found"})
        v = items[0]
        return json.dumps({
            "id": v["id"],
            "title": v["snippet"]["title"],
            "channel": v["snippet"]["channelTitle"],
            "publishedAt": v["snippet"]["publishedAt"],
            "description": v["snippet"]["description"][:500],
            "viewCount": v["statistics"].get("viewCount", "0"),
            "likeCount": v["statistics"].get("likeCount", "0"),
            "duration": v["contentDetails"].get("duration", ""),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Docs/Sheets/Slides Handlers (via Drive MIME filter) ───────────────────────

def _handle_docs_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        page_size = min(args.get("page_size", 20), 100)
        results = service.files().list(
            q="mimeType='application/vnd.google-apps.document'",
            pageSize=page_size,
            fields="files(id, name, mimeType, modifiedTime, webViewLink)"
        ).execute()
        docs = [{
            "id": f["id"],
            "name": f["name"],
            "modifiedTime": f.get("modifiedTime", ""),
            "link": f.get("webViewLink", ""),
        } for f in results.get("files", [])]
        return json.dumps({"documents": docs})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_docs_read(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        doc_id = args.get("doc_id", "")
        if not doc_id:
            return json.dumps({"error": "doc_id is required"})
        meta = service.files().get(fileId=doc_id, fields="name,mimeType").execute()
        content = service.files().export(fileId=doc_id, mimeType="text/plain").execute()
        text = content.decode("utf-8", errors="replace") if isinstance(content, bytes) else content
        return json.dumps({"doc_id": doc_id, "name": meta.get("name", ""), "content": text[:50000]})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_docs_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("docs", "v1", credentials=creds, cache_discovery=False)
        title = args.get("title", "Untitled")
        body = {"title": title}
        created = service.documents().create(body=body).execute()
        return json.dumps({"success": True, "doc_id": created.get("documentId", ""), "title": created.get("title", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_sheets_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        page_size = min(args.get("page_size", 20), 100)
        results = service.files().list(
            q="mimeType='application/vnd.google-apps.spreadsheet'",
            pageSize=page_size,
            fields="files(id, name, mimeType, modifiedTime, webViewLink)"
        ).execute()
        sheets = [{
            "id": f["id"],
            "name": f["name"],
            "modifiedTime": f.get("modifiedTime", ""),
            "link": f.get("webViewLink", ""),
        } for f in results.get("files", [])]
        return json.dumps({"spreadsheets": sheets})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_sheets_read(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("sheets", "v4", credentials=creds, cache_discovery=False)
        spreadsheet_id = args.get("spreadsheet_id", "")
        range_str = args.get("range", "Sheet1")
        if not spreadsheet_id:
            return json.dumps({"error": "spreadsheet_id is required"})
        result = service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id, range=range_str
        ).execute()
        return json.dumps({
            "spreadsheet_id": spreadsheet_id,
            "range": range_str,
            "values": result.get("values", []),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_sheets_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("sheets", "v4", credentials=creds, cache_discovery=False)
        title = args.get("title", "Untitled")
        body = {"properties": {"title": title}}
        sheet = service.spreadsheets().create(body=body).execute()
        return json.dumps({
            "success": True,
            "spreadsheet_id": sheet.get("spreadsheetId", ""),
            "url": sheet.get("spreadsheetUrl", ""),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_sheets_update(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("sheets", "v4", credentials=creds, cache_discovery=False)
        spreadsheet_id = args.get("spreadsheet_id", "")
        range_str = args.get("range", "Sheet1!A1")
        values = args.get("values", [])
        if not spreadsheet_id or not values:
            return json.dumps({"error": "spreadsheet_id and values are required"})
        body = {"values": values}
        result = service.spreadsheets().values().update(
            spreadsheetId=spreadsheet_id, range=range_str,
            valueInputOption="USER_ENTERED", body=body
        ).execute()
        return json.dumps({
            "success": True,
            "updatedCells": result.get("updatedCells", 0),
            "updatedRange": result.get("updatedRange", ""),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_slides_list(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        page_size = min(args.get("page_size", 20), 100)
        results = service.files().list(
            q="mimeType='application/vnd.google-apps.presentation'",
            pageSize=page_size,
            fields="files(id, name, mimeType, modifiedTime, webViewLink)"
        ).execute()
        slides = [{
            "id": f["id"],
            "name": f["name"],
            "modifiedTime": f.get("modifiedTime", ""),
            "link": f.get("webViewLink", ""),
        } for f in results.get("files", [])]
        return json.dumps({"presentations": slides})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_slides_read(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        pres_id = args.get("presentation_id", "")
        if not pres_id:
            return json.dumps({"error": "presentation_id is required"})
        meta = service.files().get(fileId=pres_id, fields="name,mimeType").execute()
        content = service.files().export(fileId=pres_id, mimeType="text/plain").execute()
        text = content.decode("utf-8", errors="replace") if isinstance(content, bytes) else content
        return json.dumps({"presentation_id": pres_id, "name": meta.get("name", ""), "content": text[:50000]})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_slides_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("slides", "v1", credentials=creds, cache_discovery=False)
        title = args.get("title", "Untitled")
        body = {"title": title}
        created = service.presentations().create(body=body).execute()
        return json.dumps({
            "success": True,
            "presentation_id": created.get("presentationId", ""),
            "url": created.get("presentationUrl", ""),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Chat Handlers ─────────────────────────────────────────────────────────────

def _handle_chat_list_spaces(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        page_size = min(args.get("page_size", 20), 100)
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.get(
                    "https://chat.googleapis.com/v1/spaces",
                    params={"pageSize": page_size},
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        spaces = [{
            "name": s.get("name", ""),
            "displayName": s.get("displayName", ""),
            "spaceType": s.get("spaceType", ""),
            "spaceThreadingState": s.get("spaceThreadingState", ""),
        } for s in data.get("spaces", [])]
        return json.dumps({"spaces": spaces})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_chat_send_message(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        space_name = args.get("space_name", "")
        text = args.get("text", "")
        if not space_name or not text:
            return json.dumps({"error": "space_name and text are required"})
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    f"https://chat.googleapis.com/v1/{space_name}/messages",
                    json={"text": text},
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        return json.dumps({
            "success": True,
            "message_name": data.get("name", ""),
            "text": data.get("text", ""),
        })
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Meet Handlers ─────────────────────────────────────────────────────────────

def _handle_meet_create(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        title = args.get("title", "Meeting")
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.post(
                    "https://meet.googleapis.com/v2/spaces",
                    json={"config": {"accessType": "OPEN", "entryPointAccess": "ALLOWED"}},
                    headers={
                        "Authorization": f"Bearer {token}",
                        "Content-Type": "application/json",
                    },
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        space_name = data.get("name", "")
        meeting_uri = data.get("meetingUri", "")
        return json.dumps({"success": True, "space_name": space_name, "meeting_uri": meeting_uri, "title": title})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Fit Handlers ──────────────────────────────────────────────────────────────

def _handle_fit_data_sources(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("fitness", "v1", credentials=creds, cache_discovery=False)
        data_sources = service.users().dataSources().list(userId="me").execute()
        sources = [{
            "dataStreamId": ds.get("dataStreamId", ""),
            "dataStreamName": ds.get("dataStreamName", ""),
            "type": ds.get("dataType", {}).get("name", ""),
            "device": (ds.get("device") or {}).get("model", ""),
        } for ds in data_sources.get("dataSource", [])]
        return json.dumps({"dataSources": sources})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_fit_get_dataset(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        import time as ttime
        service = build("fitness", "v1", credentials=creds, cache_discovery=False)
        data_source_id = args.get("data_source_id", "")
        if not data_source_id:
            return json.dumps({"error": "data_source_id is required"})
        end_ns = int(ttime.time() * 1e9)
        start_ns = end_ns - (int(args.get("duration_days", 7)) * 86400 * 1_000_000_000)
        dataset = service.users().dataSources().datasets().get(
            userId="me", dataSourceId=data_source_id,
            datasetId=f"{start_ns}-{end_ns}"
        ).execute()
        points = [{
            "value": p.get("value", [{}])[0].get("fpVal", p.get("value", [{}])[0].get("intVal", "")),
            "startTimeNanos": p.get("startTimeNanos", ""),
        } for p in dataset.get("point", [])]
        return json.dumps({"dataSourceId": data_source_id, "points": points})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Classroom Handlers ────────────────────────────────────────────────────────

def _handle_classroom_list_courses(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("classroom", "v1", credentials=creds, cache_discovery=False)
        page_size = min(args.get("page_size", 20), 100)
        results = service.courses().list(pageSize=page_size).execute()
        courses = [{
            "id": c.get("id", ""),
            "name": c.get("name", ""),
            "section": c.get("section", ""),
            "courseState": c.get("courseState", ""),
            "enrollmentCode": c.get("enrollmentCode", ""),
        } for c in results.get("courses", [])]
        return json.dumps({"courses": courses})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_classroom_list_assignments(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("classroom", "v1", credentials=creds, cache_discovery=False)
        course_id = args.get("course_id", "")
        page_size = min(args.get("page_size", 20), 100)
        if not course_id:
            return json.dumps({"error": "course_id is required"})
        results = service.courses().courseWork().list(courseId=course_id, pageSize=page_size).execute()
        works = [{
            "id": w.get("id", ""),
            "title": w.get("title", ""),
            "description": w.get("description", ""),
            "dueDate": w.get("dueDate", {}),
            "state": w.get("state", ""),
        } for w in results.get("courseWork", [])]
        return json.dumps({"assignments": works})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_classroom_list_students(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("classroom", "v1", credentials=creds, cache_discovery=False)
        course_id = args.get("course_id", "")
        page_size = min(args.get("page_size", 20), 100)
        if not course_id:
            return json.dumps({"error": "course_id is required"})
        results = service.courses().students().list(courseId=course_id, pageSize=page_size).execute()
        students = [{
            "userId": s.get("userId", ""),
            "name": s.get("profile", {}).get("name", {}).get("fullName", ""),
            "emailAddress": s.get("profile", {}).get("emailAddress", ""),
        } for s in results.get("students", [])]
        return json.dumps({"students": students})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Additional CRUD Handlers ─────────────────────────────────────────────────

def _handle_contacts_update(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        resource_name = args.get("resource_name", "")
        name = args.get("name", "")
        email = args.get("email", "")
        phone = args.get("phone", "")
        if not resource_name:
            return json.dumps({"error": "resource_name is required"})
        body = {"names": [{"givenName": name}], "emailAddresses": [{"value": email}], "phoneNumbers": [{"value": phone}]}
        update_mask = "names,emailAddresses,phoneNumbers"
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.patch(
                    f"https://people.googleapis.com/v1/{resource_name}:updateContact",
                    params={"updatePersonFields": update_mask},
                    json=body,
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    timeout=5.0,
                )
                return r.json()
        import asyncio
        data = asyncio.run(_fetch())
        return json.dumps({"success": True, "resourceName": data.get("resourceName", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_youtube_rate_video(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("youtube", "v3", credentials=creds, cache_discovery=False)
        video_id = args.get("video_id", "")
        rating = args.get("rating", "like")
        if not video_id:
            return json.dumps({"error": "video_id is required"})
        service.videos().rate(id=video_id, rating=rating).execute()
        return json.dumps({"success": True, "video_id": video_id, "rating": rating})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_youtube_add_comment(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("youtube", "v3", credentials=creds, cache_discovery=False)
        video_id = args.get("video_id", "")
        text = args.get("text", "")
        if not video_id or not text:
            return json.dumps({"error": "video_id and text are required"})
        body = {"snippet": {"videoId": video_id, "topLevelComment": {"snippet": {"textOriginal": text}}}}
        created = service.commentThreads().insert(part="snippet", body=body).execute()
        return json.dumps({"success": True, "comment_id": created.get("id", "")})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_docs_update(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("docs", "v1", credentials=creds, cache_discovery=False)
        doc_id = args.get("doc_id", "")
        text = args.get("text", "")
        if not doc_id or not text:
            return json.dumps({"error": "doc_id and text are required"})
        doc = service.documents().get(documentId=doc_id).execute()
        end_index = doc.get("body", {}).get("content", [{}])[-1].get("endIndex", 1)
        requests = [{"insertText": {"location": {"index": end_index - 1}, "text": text}}]
        service.documents().batchUpdate(documentId=doc_id, body={"requests": requests}).execute()
        return json.dumps({"success": True, "doc_id": doc_id})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_docs_delete(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        doc_id = args.get("doc_id", "")
        if not doc_id:
            return json.dumps({"error": "doc_id is required"})
        service.files().update(fileId=doc_id, body={"trashed": True}).execute()
        return json.dumps({"success": True, "trashed": doc_id})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_slides_delete(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("drive", "v3", credentials=creds, cache_discovery=False)
        pres_id = args.get("presentation_id", "")
        if not pres_id:
            return json.dumps({"error": "presentation_id is required"})
        service.files().update(fileId=pres_id, body={"trashed": True}).execute()
        return json.dumps({"success": True, "trashed": pres_id})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_sheets_clear(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        from googleapiclient.discovery import build
        service = build("sheets", "v4", credentials=creds, cache_discovery=False)
        spreadsheet_id = args.get("spreadsheet_id", "")
        range_str = args.get("range", "Sheet1!A1:Z1000")
        if not spreadsheet_id:
            return json.dumps({"error": "spreadsheet_id is required"})
        service.spreadsheets().values().clear(
            spreadsheetId=spreadsheet_id, range=range_str
        ).execute()
        return json.dumps({"success": True, "cleared": range_str})
    except Exception as e:
        return json.dumps({"error": str(e)})


def _handle_chat_delete_message(args: Dict[str, Any], **kwargs) -> str:
    creds = _creds_for("google-drive")
    if not creds:
        return json.dumps({"error": "Google not connected"})
    try:
        import httpx
        token = creds.token
        message_name = args.get("message_name", "")
        if not message_name:
            return json.dumps({"error": "message_name is required (e.g. spaces/xxx/messages/yyy)"})
        async def _fetch():
            async with httpx.AsyncClient() as c:
                r = await c.delete(
                    f"https://chat.googleapis.com/v1/{message_name}",
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=5.0,
                )
                return r.status_code
        import asyncio
        status = asyncio.run(_fetch())
        return json.dumps({"success": status == 200, "deleted": message_name})
    except Exception as e:
        return json.dumps({"error": str(e)})


# ── Tool Schema Definitions ────────────────────────────────────────────────────

GMAIL_LIST_SCHEMA = {
    "name": "gmail_list",
    "description": "List Gmail emails",
    "parameters": {
        "type": "object",
        "properties": {
            "max_results": {"type": "integer", "description": "Count"},
            "query": {"type": "string", "description": "Filter"},
        },
        "required": [],
    },
}

GMAIL_READ_SCHEMA = {
    "name": "gmail_read",
    "description": "Read a Gmail message",
    "parameters": {
        "type": "object",
        "properties": {
            "message_id": {"type": "string", "description": "MsgID"},
        },
        "required": ["message_id"],
    },
}

GMAIL_SEND_SCHEMA = {
    "name": "gmail_send",
    "description": "Send an email",
    "parameters": {
        "type": "object",
        "properties": {
            "to": {"type": "string", "description": "To"},
            "subject": {"type": "string", "description": "Email subject"},
            "body": {"type": "string", "description": "Body"},
        },
        "required": ["to", "subject"],
    },
}

DRIVE_LIST_SCHEMA = {
    "name": "drive_list",
    "description": "List Drive files",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max files to return (1-100, default 20)"},
            "query": {"type": "string", "description": "Optional Drive query (e.g. \"mimeType='application/vnd.google-apps.folder'\")"},
        },
        "required": [],
    },
}

DRIVE_SEARCH_SCHEMA = {
    "name": "drive_search",
    "description": "Search Drive by name",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Name"},
        },
        "required": ["query"],
    },
}

DRIVE_READ_SCHEMA = {
    "name": "drive_read",
    "description": "Read file content",
    "parameters": {
        "type": "object",
        "properties": {
            "file_id": {"type": "string", "description": "The Drive file ID to read"},
        },
        "required": ["file_id"],
    },
}
CALENDAR_LIST_SCHEMA = {
    "name": "calendar_list_events",
    "description": "List calendar events",
    "parameters": {
        "type": "object",
        "properties": {
            "max_results": {"type": "integer", "description": "Max events to return (1-50, default 10)"},
        },
        "required": [],
    },
}

CALENDAR_CREATE_SCHEMA = {
    "name": "calendar_create_event",
    "description": "Create a calendar event",
    "parameters": {
        "type": "object",
        "properties": {
            "summary": {"type": "string", "description": "Event title"},
            "description": {"type": "string", "description": "Desc"},
            "start": {"type": "string", "description": "Start"},
            "end": {"type": "string", "description": "End"},
        },
        "required": ["summary", "start"],
    },
}

TASKS_LIST_SCHEMA = {
    "name": "tasks_list",
    "description": "List all tasks",
    "parameters": {
        "type": "object",
        "properties": {
            "max_results": {"type": "integer", "description": "Max tasks per list (1-100, default 20)"},
        },
        "required": [],
    },
}

TASKS_CREATE_SCHEMA = {
    "name": "tasks_create",
    "description": "Create a task",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Task title"},
            "notes": {"type": "string", "description": "Task notes/description (optional)"},
            "due": {"type": "string", "description": "ISO 8601 due date (optional, e.g. 2026-06-25T23:59:00)"},
        },
        "required": ["title"],
    },
}

CONTACTS_LIST_SCHEMA = {
    "name": "contacts_list",
    "description": "List contacts",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max contacts to return (1-100, default 20)"},
        },
        "required": [],
    },
}

PHOTOS_LIST_ALBUMS_SCHEMA = {
    "name": "photos_list_albums",
    "description": "List photo albums",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max albums to return (1-50, default 20)"},
        },
        "required": [],
    },
}

PHOTOS_LIST_MEDIA_SCHEMA = {
    "name": "photos_list_media",
    "description": "List photos/albums",
    "parameters": {
        "type": "object",
        "properties": {
            "album_id": {"type": "string", "description": "AlbumID"},
            "page_size": {"type": "integer", "description": "Max items to return (1-100, default 20)"},
        },
        "required": [],
    },
}

YOUTUBE_SEARCH_SCHEMA = {
    "name": "youtube_search",
    "description": "Search YouTube",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Search query"},
            "max_results": {"type": "integer", "description": "Max videos to return (1-50, default 10)"},
        },
        "required": ["query"],
    },
}

DOCS_LIST_SCHEMA = {
    "name": "docs_list",
    "description": "List documents",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max docs to return (1-100, default 20)"},
        },
        "required": [],
    },
}

SHEETS_LIST_SCHEMA = {
    "name": "sheets_list",
    "description": "List spreadsheets",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max sheets to return (1-100, default 20)"},
        },
        "required": [],
    },
}

SLIDES_LIST_SCHEMA = {
    "name": "slides_list",
    "description": "List presentations",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max presentations to return (1-100, default 20)"},
        },
        "required": [],
    },
}

CHAT_LIST_SPACES_SCHEMA = {
    "name": "chat_list_spaces",
    "description": "List chat spaces",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max spaces to return (1-100, default 20)"},
        },
        "required": [],
    },
}

MEET_CREATE_SCHEMA = {
    "name": "meet_create",
    "description": "Create a meeting",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Meeting title (optional, default 'Meeting')"},
        },
        "required": [],
    },
}

FIT_DATA_SOURCES_SCHEMA = {
    "name": "fit_list_data_sources",
    "description": "List Fit sources",
    "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
    },
}

CLASSROOM_LIST_COURSES_SCHEMA = {
    "name": "classroom_list_courses",
    "description": "List courses",
    "parameters": {
        "type": "object",
        "properties": {
            "page_size": {"type": "integer", "description": "Max courses to return (1-100, default 20)"},
        },
        "required": [],
    },
}

CALENDAR_UPDATE_SCHEMA = {
    "name": "calendar_update_event",
    "description": "Update a calendar event",
    "parameters": {
        "type": "object",
        "properties": {
            "event_id": {"type": "string", "description": "The event ID to update"},
            "summary": {"type": "string", "description": "Title"},
            "description": {"type": "string", "description": "Desc"},
            "location": {"type": "string", "description": "Loc"},
            "start": {"type": "string", "description": "Start"},
            "end": {"type": "string", "description": "End"},
        },
        "required": ["event_id"],
    },
}

CALENDAR_DELETE_SCHEMA = {
    "name": "calendar_delete_event",
    "description": "Delete a calendar event",
    "parameters": {
        "type": "object",
        "properties": {
            "event_id": {"type": "string", "description": "The event ID to delete"},
        },
        "required": ["event_id"],
    },
}

TASKS_UPDATE_SCHEMA = {
    "name": "tasks_update",
    "description": "Update a task",
    "parameters": {
        "type": "object",
        "properties": {
            "task_id": {"type": "string", "description": "The task ID to update"},
            "task_list_id": {"type": "string", "description": "List"},
            "title": {"type": "string", "description": "New title (optional)"},
            "notes": {"type": "string", "description": "New notes (optional)"},
            "due": {"type": "string", "description": "New due date ISO 8601 (optional)"},
            "status": {"type": "string", "description": "Status"},
        },
        "required": ["task_id"],
    },
}

TASKS_DELETE_SCHEMA = {
    "name": "tasks_delete",
    "description": "Delete a task",
    "parameters": {
        "type": "object",
        "properties": {
            "task_id": {"type": "string", "description": "The task ID to delete"},
            "task_list_id": {"type": "string", "description": "List"},
        },
        "required": ["task_id"],
    },
}

CONTACTS_CREATE_SCHEMA = {
    "name": "contacts_create",
    "description": "Create a contact",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {"type": "string", "description": "Contact's full name"},
            "email": {"type": "string", "description": "Email address (optional)"},
            "phone": {"type": "string", "description": "Phone number (optional)"},
        },
        "required": ["name"],
    },
}

CONTACTS_DELETE_SCHEMA = {
    "name": "contacts_delete",
    "description": "Delete a contact",
    "parameters": {
        "type": "object",
        "properties": {
            "resource_name": {"type": "string", "description": "Resource"},
        },
        "required": ["resource_name"],
    },
}

PHOTOS_CREATE_ALBUM_SCHEMA = {
    "name": "photos_create_album",
    "description": "Create an album",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Album title"},
        },
        "required": ["title"],
    },
}

YOUTUBE_VIDEO_DETAILS_SCHEMA = {
    "name": "youtube_video_details",
    "description": "Get video details",
    "parameters": {
        "type": "object",
        "properties": {
            "video_id": {"type": "string", "description": "The YouTube video ID"},
        },
        "required": ["video_id"],
    },
}

DOCS_READ_SCHEMA = {
    "name": "docs_read",
    "description": "Read document",
    "parameters": {
        "type": "object",
        "properties": {
            "doc_id": {"type": "string", "description": "The Google Doc document ID"},
        },
        "required": ["doc_id"],
    },
}

DOCS_CREATE_SCHEMA = {
    "name": "docs_create",
    "description": "Create document",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Document title (optional, default 'Untitled')"},
        },
        "required": [],
    },
}

SHEETS_READ_SCHEMA = {
    "name": "sheets_read",
    "description": "Read cells",
    "parameters": {
        "type": "object",
        "properties": {
            "spreadsheet_id": {"type": "string", "description": "The spreadsheet ID"},
            "range": {"type": "string", "description": "Range in A1 notation (e.g. 'Sheet1!A1:D10', default 'Sheet1')"},
        },
        "required": ["spreadsheet_id"],
    },
}

SHEETS_CREATE_SCHEMA = {
    "name": "sheets_create",
    "description": "Create spreadsheet",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Spreadsheet title (optional, default 'Untitled')"},
        },
        "required": [],
    },
}

SHEETS_UPDATE_SCHEMA = {
    "name": "sheets_update",
    "description": "Write cells",
    "parameters": {
        "type": "object",
        "properties": {
            "spreadsheet_id": {"type": "string", "description": "The spreadsheet ID"},
            "range": {"type": "string", "description": "Range in A1 notation (e.g. 'Sheet1!A1', default 'Sheet1!A1')"},
            "values": {"type": "array", "items": {"type": "array", "items": {"type": "string"}}, "description": "2D array of cell values (e.g. [[\"Name\",\"Age\"],[\"Alice\",\"30\"]])"},
        },
        "required": ["spreadsheet_id", "values"],
    },
}

SLIDES_READ_SCHEMA = {
    "name": "slides_read",
    "description": "Read presentation",
    "parameters": {
        "type": "object",
        "properties": {
            "presentation_id": {"type": "string", "description": "The presentation ID"},
        },
        "required": ["presentation_id"],
    },
}

SLIDES_CREATE_SCHEMA = {
    "name": "slides_create",
    "description": "Create presentation",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Presentation title (optional, default 'Untitled')"},
        },
        "required": [],
    },
}

CHAT_SEND_MESSAGE_SCHEMA = {
    "name": "chat_send_message",
    "description": "Send a chat msg",
    "parameters": {
        "type": "object",
        "properties": {
            "space_name": {"type": "string", "description": "The space name (e.g. 'spaces/AAAAxxx')"},
            "text": {"type": "string", "description": "Message text"},
        },
        "required": ["space_name", "text"],
    },
}

FIT_GET_DATASET_SCHEMA = {
    "name": "fit_get_dataset",
    "description": "Get Fit data",
    "parameters": {
        "type": "object",
        "properties": {
            "data_source_id": {"type": "string", "description": "ID"},
            "duration_days": {"type": "integer", "description": "Days"},
        },
        "required": ["data_source_id"],
    },
}

CLASSROOM_LIST_ASSIGNMENTS_SCHEMA = {
    "name": "classroom_list_assignments",
    "description": "List assignments",
    "parameters": {
        "type": "object",
        "properties": {
            "course_id": {"type": "string", "description": "The course ID"},
            "page_size": {"type": "integer", "description": "Max assignments to return (1-100, default 20)"},
        },
        "required": ["course_id"],
    },
}

CLASSROOM_LIST_STUDENTS_SCHEMA = {
    "name": "classroom_list_students",
    "description": "List students",
    "parameters": {
        "type": "object",
        "properties": {
            "course_id": {"type": "string", "description": "The course ID"},
            "page_size": {"type": "integer", "description": "Max students to return (1-100, default 20)"},
        },
        "required": ["course_id"],
    },
}

CONTACTS_UPDATE_SCHEMA = {
    "name": "contacts_update",
    "description": "Update a contact",
    "parameters": {
        "type": "object",
        "properties": {
            "resource_name": {"type": "string", "description": "Resource"},
            "name": {"type": "string", "description": "New full name (optional)"},
            "email": {"type": "string", "description": "New email address (optional)"},
            "phone": {"type": "string", "description": "New phone number (optional)"},
        },
        "required": ["resource_name"],
    },
}

YOUTUBE_RATE_VIDEO_SCHEMA = {
    "name": "youtube_rate_video",
    "description": "Like/dislike video",
    "parameters": {
        "type": "object",
        "properties": {
            "video_id": {"type": "string", "description": "The YouTube video ID"},
            "rating": {"type": "string", "description": "Rating"},
        },
        "required": ["video_id"],
    },
}

YOUTUBE_ADD_COMMENT_SCHEMA = {
    "name": "youtube_add_comment",
    "description": "Comment on video",
    "parameters": {
        "type": "object",
        "properties": {
            "video_id": {"type": "string", "description": "The YouTube video ID"},
            "text": {"type": "string", "description": "Comment text"},
        },
        "required": ["video_id", "text"],
    },
}

DOCS_UPDATE_SCHEMA = {
    "name": "docs_update",
    "description": "Append text",
    "parameters": {
        "type": "object",
        "properties": {
            "doc_id": {"type": "string", "description": "The document ID"},
            "text": {"type": "string", "description": "Text to append to the document"},
        },
        "required": ["doc_id", "text"],
    },
}

DOCS_DELETE_SCHEMA = {
    "name": "docs_delete",
    "description": "Delete document",
    "parameters": {
        "type": "object",
        "properties": {
            "doc_id": {"type": "string", "description": "The document ID to delete"},
        },
        "required": ["doc_id"],
    },
}

SLIDES_DELETE_SCHEMA = {
    "name": "slides_delete",
    "description": "Delete presentation",
    "parameters": {
        "type": "object",
        "properties": {
            "presentation_id": {"type": "string", "description": "The presentation ID to delete"},
        },
        "required": ["presentation_id"],
    },
}

SHEETS_CLEAR_SCHEMA = {
    "name": "sheets_clear",
    "description": "Clear cells",
    "parameters": {
        "type": "object",
        "properties": {
            "spreadsheet_id": {"type": "string", "description": "The spreadsheet ID"},
            "range": {"type": "string", "description": "Range to clear (e.g. 'Sheet1!A1:Z1000', default 'Sheet1!A1:Z1000')"},
        },
        "required": ["spreadsheet_id"],
    },
}

CHAT_DELETE_MESSAGE_SCHEMA = {
    "name": "chat_delete_message",
    "description": "Delete a chat msg",
    "parameters": {
        "type": "object",
        "properties": {
            "message_name": {"type": "string", "description": "Name"},
        },
        "required": ["message_name"],
    },
}

# ── Register Tools at import time ──────────────────────────────────────────────
# The plugin scanner doesn't reach depth-2 dirs (dashboard_auth/google/),
# so we register directly with the tool registry.
try:
    if True:
        from tools.registry import registry

        _GOOGLE_TOOL_DEFS = [
            # Gmail (3)
            ("gmail_list", GMAIL_LIST_SCHEMA, _handle_gmail_list, "📧", _check_gmail),
            ("gmail_read", GMAIL_READ_SCHEMA, _handle_gmail_read, "📧", _check_gmail),
            ("gmail_send", GMAIL_SEND_SCHEMA, _handle_gmail_send, "📧", _check_gmail),
            # Drive (3)
            ("drive_list", DRIVE_LIST_SCHEMA, _handle_drive_list, "📁", _check_drive),
            ("drive_search", DRIVE_SEARCH_SCHEMA, _handle_drive_search, "📁", _check_drive),
            ("drive_read", DRIVE_READ_SCHEMA, _handle_drive_read, "📁", _check_drive),
            # Calendar (4)
            ("calendar_list_events", CALENDAR_LIST_SCHEMA, _handle_calendar_list, "📅", _check_calendar),
            ("calendar_create_event", CALENDAR_CREATE_SCHEMA, _handle_calendar_create, "📅", _check_calendar),
            ("calendar_update_event", CALENDAR_UPDATE_SCHEMA, _handle_calendar_update, "📅", _check_calendar),
            ("calendar_delete_event", CALENDAR_DELETE_SCHEMA, _handle_calendar_delete, "📅", _check_calendar),
            # Tasks (4)
            ("tasks_list", TASKS_LIST_SCHEMA, _handle_tasks_list, "✅", _check_tasks),
            ("tasks_create", TASKS_CREATE_SCHEMA, _handle_tasks_create, "✅", _check_tasks),
            ("tasks_update", TASKS_UPDATE_SCHEMA, _handle_tasks_update, "✅", _check_tasks),
            ("tasks_delete", TASKS_DELETE_SCHEMA, _handle_tasks_delete, "✅", _check_tasks),
            # Contacts (4)
            ("contacts_list", CONTACTS_LIST_SCHEMA, _handle_contacts_list, "👤", _check_contacts),
            ("contacts_create", CONTACTS_CREATE_SCHEMA, _handle_contacts_create, "👤", _check_contacts),
            ("contacts_update", CONTACTS_UPDATE_SCHEMA, _handle_contacts_update, "👤", _check_contacts),
            ("contacts_delete", CONTACTS_DELETE_SCHEMA, _handle_contacts_delete, "👤", _check_contacts),
            # Photos (3)
            ("photos_list_albums", PHOTOS_LIST_ALBUMS_SCHEMA, _handle_photos_list_albums, "🖼️", _check_photos),
            ("photos_list_media", PHOTOS_LIST_MEDIA_SCHEMA, _handle_photos_list_media, "🖼️", _check_photos),
            ("photos_create_album", PHOTOS_CREATE_ALBUM_SCHEMA, _handle_photos_create_album, "🖼️", _check_photos),
            # YouTube (4)
            ("youtube_search", YOUTUBE_SEARCH_SCHEMA, _handle_youtube_search, "▶️", _check_youtube),
            ("youtube_video_details", YOUTUBE_VIDEO_DETAILS_SCHEMA, _handle_youtube_video_details, "▶️", _check_youtube),
            ("youtube_rate_video", YOUTUBE_RATE_VIDEO_SCHEMA, _handle_youtube_rate_video, "▶️", _check_youtube),
            ("youtube_add_comment", YOUTUBE_ADD_COMMENT_SCHEMA, _handle_youtube_add_comment, "▶️", _check_youtube),
            # Docs (5)
            ("docs_list", DOCS_LIST_SCHEMA, _handle_docs_list, "📝", _check_docs),
            ("docs_read", DOCS_READ_SCHEMA, _handle_docs_read, "📝", _check_docs),
            ("docs_create", DOCS_CREATE_SCHEMA, _handle_docs_create, "📝", _check_docs),
            ("docs_update", DOCS_UPDATE_SCHEMA, _handle_docs_update, "📝", _check_docs),
            ("docs_delete", DOCS_DELETE_SCHEMA, _handle_docs_delete, "📝", _check_docs),
            # Sheets (5)
            ("sheets_list", SHEETS_LIST_SCHEMA, _handle_sheets_list, "📊", _check_sheets),
            ("sheets_read", SHEETS_READ_SCHEMA, _handle_sheets_read, "📊", _check_sheets),
            ("sheets_create", SHEETS_CREATE_SCHEMA, _handle_sheets_create, "📊", _check_sheets),
            ("sheets_update", SHEETS_UPDATE_SCHEMA, _handle_sheets_update, "📊", _check_sheets),
            ("sheets_clear", SHEETS_CLEAR_SCHEMA, _handle_sheets_clear, "📊", _check_sheets),
            # Slides (4)
            ("slides_list", SLIDES_LIST_SCHEMA, _handle_slides_list, "📽️", _check_slides),
            ("slides_read", SLIDES_READ_SCHEMA, _handle_slides_read, "📽️", _check_slides),
            ("slides_create", SLIDES_CREATE_SCHEMA, _handle_slides_create, "📽️", _check_slides),
            ("slides_delete", SLIDES_DELETE_SCHEMA, _handle_slides_delete, "📽️", _check_slides),
            # Chat (3)
            ("chat_list_spaces", CHAT_LIST_SPACES_SCHEMA, _handle_chat_list_spaces, "💬", _check_chat),
            ("chat_send_message", CHAT_SEND_MESSAGE_SCHEMA, _handle_chat_send_message, "💬", _check_chat),
            ("chat_delete_message", CHAT_DELETE_MESSAGE_SCHEMA, _handle_chat_delete_message, "💬", _check_chat),
            # Meet (1)
            ("meet_create", MEET_CREATE_SCHEMA, _handle_meet_create, "🎥", _check_meet),
            # Fit (2)
            ("fit_list_data_sources", FIT_DATA_SOURCES_SCHEMA, _handle_fit_data_sources, "🏃", _check_fit),
            ("fit_get_dataset", FIT_GET_DATASET_SCHEMA, _handle_fit_get_dataset, "🏃", _check_fit),
            # Classroom (3)
            ("classroom_list_courses", CLASSROOM_LIST_COURSES_SCHEMA, _handle_classroom_list_courses, "🏫", _check_classroom),
            ("classroom_list_assignments", CLASSROOM_LIST_ASSIGNMENTS_SCHEMA, _handle_classroom_list_assignments, "🏫", _check_classroom),
            ("classroom_list_students", CLASSROOM_LIST_STUDENTS_SCHEMA, _handle_classroom_list_students, "🏫", _check_classroom),
        ]

        for name, schema, handler, emoji, check in _GOOGLE_TOOL_DEFS:
            registry.register(
                name=name,
                toolset=name.split("_")[0] if "_" in name else name,
                schema=schema,
                handler=handler,
                check_fn=check,
                emoji=emoji,
            )

        logger.info("google plugin: registered %d tools at import time", len(_GOOGLE_TOOL_DEFS))
except Exception as e:
    logger.warning("google plugin: failed to register tools: %s", e)
