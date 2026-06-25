# OpenAI-Compatible API Server for Zed Agent

## Motivation

Every major chat frontend (Open WebUI 126kâ˜…, LobeChat 73kâ˜…, LibreChat 34kâ˜…,
AnythingLLM 56kâ˜…, NextChat 87kâ˜…, ChatBox 39kâ˜…, Jan 26kâ˜…, HF Chat-UI 8kâ˜…,
big-AGI 7kâ˜…) connects to backends via the OpenAI-compatible REST API with
SSE streaming. By exposing this endpoint, zed-agent becomes instantly
usable as a backend for all of them â€” no custom adapters needed.

## What It Enables

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Open WebUI      â”‚â”€â”€â”
â”‚  LobeChat        â”‚  â”‚    POST /v1/chat/completions
â”‚  LibreChat       â”‚  â”œâ”€â”€â–º Authorization: Bearer <key>     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  AnythingLLM     â”‚  â”‚    {"messages": [...]}             â”‚  zed-agent   â”‚
â”‚  NextChat        â”‚  â”‚                                    â”‚  gateway        â”‚
â”‚  Any OAI client  â”‚â”€â”€â”˜    â—„â”€â”€ SSE streaming response      â”‚  (API server)   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                                        â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

A user would:
1. Set `API_SERVER_ENABLED=true` in `~/.zed/.env`
2. Run `zed gateway` (API server starts alongside Telegram/Discord/etc.)
3. Point Open WebUI (or any frontend) at `http://localhost:8642/v1`
4. Chat with zed-agent through any OpenAI-compatible UI

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/v1/chat/completions` | Chat with the agent (streaming + non-streaming) |
| GET | `/v1/models` | List available "models" (returns zed-agent as a model) |
| GET | `/health` | Health check |

## Architecture

### Option A: Gateway Platform Adapter (recommended)

Create `gateway/platforms/api_server.py` as a new platform adapter that
extends `BasePlatformAdapter`. This is the cleanest approach because:

- Reuses all gateway infrastructure (session management, auth, context building)
- Runs in the same async loop as other adapters
- Gets message handling, interrupt support, and session persistence for free
- Follows the established pattern (like Telegram, Discord, etc.)
- Uses `aiohttp.web` (already a dependency) for the HTTP server

The adapter would start an `aiohttp.web.Application` server in `connect()`
and route incoming HTTP requests through the standard `handle_message()` pipeline.

### Option B: Standalone Component

A separate HTTP server class in `gateway/api_server.py` that creates its own
AIAgent instances directly. Simpler but duplicates session/auth logic.

**Recommendation: Option A** â€” fits the existing architecture, less code to
maintain, gets all gateway features for free.

## Request/Response Format

### Chat Completions (non-streaming)

```
POST /v1/chat/completions
Authorization: Bearer zed-api-key-here
Content-Type: application/json

{
  "model": "zed-agent",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What files are in the current directory?"}
  ],
  "stream": false,
  "temperature": 0.7
}
```

Response:
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1710000000,
  "model": "zed-agent",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Here are the files in the current directory:\n..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 200,
    "total_tokens": 250
  }
}
```

### Chat Completions (streaming)

Same request with `"stream": true`. Response is SSE:

```
data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant"},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Here "},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"are "},"finish_reason":null}]}

data: {"id":"chatcmpl-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

### Models List

```
GET /v1/models
Authorization: Bearer zed-api-key-here
```

Response:
```json
{
  "object": "list",
  "data": [{
    "id": "zed-agent",
    "object": "model",
    "created": 1710000000,
    "owned_by": "zed-agent"
  }]
}
```

## Key Design Decisions

### 1. Session Management

The OpenAI API is stateless â€” each request includes the full conversation.
But zed-agent sessions have persistent state (memory, skills, tool context).

**Approach: Hybrid**
- Default: Stateless. Each request is independent. The `messages` array IS
  the conversation. No session persistence between requests.
- Opt-in persistent sessions via `X-Session-ID` header. When provided, the
  server maintains session state across requests (conversation history,
  memory context, tool state). This enables richer agent behavior.
- The session ID also enables interrupt support â€” a subsequent request with
  the same session ID while one is running triggers an interrupt.

### 2. Streaming

The agent's `run_conversation()` is synchronous and returns the full response.
For real SSE streaming, we need to emit chunks as they're generated.

**Phase 1 (MVP):** Run agent in a thread, return the complete response as
a single SSE chunk + `[DONE]`. This works with all frontends â€” they just see
a fast single-chunk response. Not true streaming but functional.

**Phase 2:** Add a response callback to AIAgent that emits text chunks as the
LLM generates them. The API server captures these via a queue and streams them
as SSE events. This gives real token-by-token streaming.

**Phase 3:** Stream tool execution progress too â€” emit tool call/result events
as the agent works, giving frontends visibility into what the agent is doing.

### 3. Tool Transparency

Two modes:
- **Opaque (default):** Frontends see only the final response. Tool calls
  happen server-side and are invisible. Best for general-purpose UIs.
- **Transparent (opt-in via header):** Tool calls are emitted as OpenAI-format
  tool_call/tool_result messages in the stream. Useful for agent-aware frontends.

### 4. Authentication

- Bearer token via `Authorization: Bearer <key>` header
- Token configured via `API_SERVER_KEY` env var
- Optional: allow unauthenticated local-only access (127.0.0.1 bind)
- Follows the same pattern as other platform adapters

### 5. Model Mapping

Frontends send `"model": "zed-agent"` (or whatever). The actual LLM model
used is configured server-side in config.yaml. The API server maps any
requested model name to the configured zed-agent model.

Optionally, allow model passthrough: if the frontend sends
`"model": "anthropic/claude-sonnet-4"`, the agent uses that model. Controlled
by a config flag.

## Configuration

```yaml
# In config.yaml
api_server:
  enabled: true
  port: 8642
  host: "127.0.0.1"        # localhost only by default
  key: "your-secret-key"   # or via API_SERVER_KEY env var
  allow_model_override: false  # let clients choose the model
  max_concurrent: 5         # max simultaneous requests
```

Environment variables:
```bash
API_SERVER_ENABLED=true
API_SERVER_PORT=8642
API_SERVER_HOST=127.0.0.1
API_SERVER_KEY=your-secret-key
```

## Implementation Plan

### Phase 1: MVP (non-streaming) â€” PR

1. `gateway/platforms/api_server.py` â€” new adapter
   - aiohttp.web server with endpoints:
     - `POST /v1/chat/completions` â€” Chat Completions API (universal compat)
     - `POST /v1/responses` â€” Responses API (server-side state, tool preservation)
     - `GET /v1/models` â€” list available models
     - `GET /health` â€” health check
   - Bearer token auth middleware
   - Non-streaming responses (run agent, return full result)
   - Chat Completions: stateless, messages array is the conversation
   - Responses API: server-side conversation storage via previous_response_id
     - Store full internal conversation (including tool calls) keyed by response ID
     - On subsequent requests, reconstruct full context from stored chain
   - Frontend system prompt layered on top of zed-agent's core prompt

2. `gateway/config.py` â€” add `Platform.API_SERVER` enum + config

3. `gateway/run.py` â€” register adapter in `_create_adapter()`

4. Tests in `tests/gateway/test_api_server.py`

### Phase 2: SSE Streaming

1. Add response streaming to both endpoints
   - Chat Completions: `choices[0].delta.content` SSE format
   - Responses API: semantic events (response.output_text.delta, etc.)
   - Run agent in thread, collect output via callback queue
   - Handle client disconnect (cancel agent)

2. Add `stream_callback` parameter to `AIAgent.run_conversation()`

### Phase 3: Enhanced Features

1. Tool call transparency mode (opt-in)
2. Model passthrough/override
3. Concurrent request limiting
4. Usage tracking / rate limiting
5. CORS headers for browser-based frontends
6. GET /v1/responses/{id} â€” retrieve stored response
7. DELETE /v1/responses/{id} â€” delete stored response

## Files Changed

| File | Change |
|------|--------|
| `gateway/platforms/api_server.py` | NEW â€” main adapter (~300 lines) |
| `gateway/config.py` | Add Platform.API_SERVER + config (~20 lines) |
| `gateway/run.py` | Register adapter in _create_adapter() (~10 lines) |
| `tests/gateway/test_api_server.py` | NEW â€” tests (~200 lines) |
| `cli-config.yaml.example` | Add api_server section |
| `README.md` | Mention API server in platform list |

## Compatibility Matrix

Once implemented, zed-agent works as a drop-in backend for:

| Frontend | Stars | How to Connect |
|----------|-------|---------------|
| Open WebUI | 126k | Settings â†’ Connections â†’ Add OpenAI API, URL: `http://localhost:8642/v1` |
| NextChat | 87k | BASE_URL env var |
| LobeChat | 73k | Custom provider endpoint |
| AnythingLLM | 56k | LLM Provider â†’ Generic OpenAI |
| Oobabooga | 42k | Already a backend, not a frontend |
| ChatBox | 39k | API Host setting |
| LibreChat | 34k | librechat.yaml custom endpoint |
| Chatbot UI | 29k | Custom API endpoint |
| Jan | 26k | Remote model config |
| AionUI | 18k | Custom API endpoint |
| HF Chat-UI | 8k | OPENAI_BASE_URL env var |
| big-AGI | 7k | Custom endpoint |
