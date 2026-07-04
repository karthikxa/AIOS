# Gemini OAuth Provider â€” Implementation Plan

## Goal
Add a first-class `gemini` provider that authenticates via Google OAuth, using the standard Gemini API (not Cloud Code Assist). Users who have a Google AI subscription or Gemini API access can authenticate through the browser without needing to manually copy API keys.

## Architecture Decision
- **Path A (chosen):** Standard Gemini API at `generativelanguage.googleapis.com/v1beta`
- **NOT Path B:** Cloud Code Assist (`cloudcode-pa.googleapis.com`) â€” rate-limited free tier, internal API, account ban risk
- Standard `chat_completions` api_mode via OpenAI SDK â€” no new api_mode needed
- Our own OAuth credentials â€” NOT sharing tokens with Gemini CLI

## OAuth Flow
- **Type:** Authorization Code + PKCE (S256) â€” same pattern as clawdbot/pi-mono
- **Auth URL:** `https://accounts.google.com/o/oauth2/v2/auth`
- **Token URL:** `https://oauth2.googleapis.com/token`
- **Redirect:** `http://localhost:8085/oauth2callback` (localhost callback server)
- **Fallback:** Manual URL paste for remote/WSL/headless environments
- **Scopes:** `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/userinfo.email`
- **PKCE:** S256 code challenge, 32-byte random verifier

## Client ID
- Need to register a "Desktop app" OAuth client on a Zed Team GCP project
- Ship client_id + client_secret in code (Google considers installed app secrets non-confidential)
- Alternatively: accept user-provided client_id via env vars as override

## Token Lifecycle
- Store at `~/.zed/gemini_oauth.json` (NOT sharing with `~/.gemini/oauth_creds.json`)
- Fields: `client_id`, `client_secret`, `refresh_token`, `access_token`, `expires_at`, `email`
- File permissions: 0o600
- Before each API call: check expiry, refresh if within 5 min of expiration
- Refresh: POST to token URL with `grant_type=refresh_token`
- File locking for concurrent access (multiple agent sessions)

## API Integration
- Base URL: `https://generativelanguage.googleapis.com/v1beta`
- Auth: native Gemini API authentication handled by the provider adapter
- api_mode: `chat_completions` (standard facade over native transport)
- Models: gemini-2.5-pro, gemini-2.5-flash, gemini-2.0-flash, etc.

## Files to Create/Modify

### New files
1. `agent/google_oauth.py` â€” OAuth flow (PKCE, localhost server, token exchange, refresh)
   - `start_oauth_flow()` â€” opens browser, starts callback server
   - `exchange_code()` â€” code â†’ tokens
   - `refresh_access_token()` â€” refresh flow
   - `load_credentials()` / `save_credentials()` â€” file I/O with locking
   - `get_valid_access_token()` â€” check expiry, refresh if needed
   - ~200 lines

### Existing files to modify
2. `zed_cli/auth.py` â€” Add ProviderConfig for "gemini" with auth_type="oauth_google"
3. `zed_cli/models.py` â€” Add Gemini model catalog
4. `zed_cli/runtime_provider.py` â€” Add gemini branch (read OAuth token, build OpenAI client)
5. `zed_cli/main.py` â€” Add `_model_flow_gemini()`, add to provider choices
6. `zed_cli/setup.py` â€” Add gemini auth flow (trigger browser OAuth)
7. `run_agent.py` â€” Token refresh before API calls (like Copilot pattern)
8. `agent/auxiliary_client.py` â€” Add gemini to aux resolution chain
9. `agent/model_metadata.py` â€” Add Gemini model context lengths

### Tests
10. `tests/agent/test_google_oauth.py` â€” OAuth flow unit tests
11. `tests/test_api_key_providers.py` â€” Add gemini provider test

### Docs
12. `website/docs/getting-started/quickstart.md` â€” Add gemini to provider table
13. `website/docs/user-guide/configuration.md` â€” Gemini setup section
14. `website/docs/reference/environment-variables.md` â€” New env vars

## Estimated scope
~400 lines new code, ~150 lines modifications, ~100 lines tests, ~50 lines docs = ~700 lines total

## Prerequisites
- Zed Team GCP project with Desktop OAuth client registered
- OR: accept user-provided client_id via ZED_GEMINI_CLIENT_ID env var

## Reference implementations
- clawdbot: `extensions/google/oauth.flow.ts` (PKCE + localhost server)
- pi-mono: `packages/ai/src/utils/oauth/google-gemini-cli.ts` (same flow)
- zed-agent Copilot OAuth: `zed_cli/main.py` `_copilot_device_flow()` (different flow type but same lifecycle pattern)
