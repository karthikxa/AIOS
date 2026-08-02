# AVDE Unified Single-Port Setup

**Everything runs through port 8001** ✨

## Quick Start

```bash
# Run this from the AVDE root directory:
.\start-unified.bat
```

This launches:
1. **Desktop Agent** (port 6901) — Ubuntu CUA sandbox
2. **Backend** (port 8001) — API + frontend
3. **Browser** — Opens http://localhost:8001

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  Browser: http://localhost:8001             │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Backend (FastAPI) — Port 8001              │
│  ├─ Serves frontend (/)                     │
│  ├─ API endpoints (/api/*)                  │
│  ├─ Proxies /api/desktop/* → 6901           │
│  └─ Health check (/health)                  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Desktop Agent (FastAPI) — Port 6901        │
│  ├─ Ubuntu CUA sandbox                      │
│  ├─ Live streaming (/stream)                │
│  ├─ MJPEG feed (/stream.mjpeg)              │
│  └─ Agent execution (/ws/agent)             │
└─────────────────────────────────────────────┘
```

---

## API Endpoints (all via port 8001)

### Dashboard
- `GET http://localhost:8001/` — Frontend UI

### Backend APIs
- `GET http://localhost:8001/health` — Backend health
- `GET http://localhost:8001/api/` — API root

### Desktop Agent (proxied)
- `GET http://localhost:8001/api/desktop/status` — Desktop status
- `POST http://localhost:8001/api/desktop/task` — Run task
- `POST http://localhost:8001/api/desktop/execute` — Execute action
- `GET http://localhost:8001/api/desktop/stream.mjpeg` — Video feed
- `WS http://localhost:8001/api/desktop/stream` — WebSocket stream

### Direct Desktop Agent (alternative)
- `GET http://localhost:6901/health` — Direct health check
- `WS http://localhost:6901/stream` — Direct WebSocket stream

---

## Testing

### Health Check
```bash
curl http://localhost:8001/health
```

Expected output:
```json
{
  "status": "ok",
  "desktop": "1360x768",
  "runtime": "docker-container" | "qemu-vm",
  "fps": 10,
  "quality": 40
}
```

### Desktop Status
```bash
curl http://localhost:8001/api/desktop/status
```

### Run a Task
```bash
curl -X POST http://localhost:8001/api/desktop/task \
  -H "Content-Type: application/json" \
  -d '{"instruction": "Take a screenshot and describe the desktop"}'
```

---

## Environment Variables

### Backend (server.py)
```bash
PORT=8001                    # Main port (default)
DESKTOP_AGENT_URL=http://localhost:6901  # Desktop agent URL
```

### Desktop Agent (ubuntu_agent.py)
```bash
PORT=6901                    # Desktop agent port
LLM_MODEL=openai/gpt-4o     # Model
LLM_API_KEY=...             # API key
LLM_BASE_URL=...            # API endpoint
STREAM_FPS=10               # Frames per second (default)
STREAM_QUAL=40              # JPEG quality (1-100, default 40)
```

---

## Troubleshooting

### "Address already in use"
- Kill existing processes: `netstat -ano | findstr 8001` → `taskkill /PID <PID> /F`
- Or use different port: `set PORT=9001` before running

### Desktop Agent fails to start
- Check Docker: `docker info` (optional)
- Fallback to QEMU: logs will show "Using QEMU VM"
- Requires 2GB RAM

### Frontend not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check backend is running: `curl http://localhost:8001/health`

### WebSocket connection fails
- CORS should be enabled on backend
- Verify desktop agent is running: `curl http://localhost:6901/health`

---

## Stopping Services

Close the terminal windows started by the script. Or use:

```bash
taskkill /F /IM python.exe
```

