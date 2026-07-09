# Browser Live Stream Server

Real-time browser streaming for zed Computer mode using KasmVNC.

## Architecture

```
┌─────────────────────────────────────────────┐
│              zed Frontend (Vercel)           │
│         React + WebSocket Client            │
└─────────────┬───────────────────────────────┘
              │ WebSocket (wss://)
    ┌─────────┴─────────┐
    ▼                   ▼
┌─────────┐       ┌─────────┐
│Render #1│       │Render #2│  (512MB each)
│KasmVNC  │       │KasmVNC  │
│Chromium │       │Chromium │
└─────────┘       └─────────┘
```

## Deployment on Render

### Step 1: Push to GitHub
```bash
cd browser-server
git init
git add .
git commit -m "Initial browser server"
git remote add origin https://github.com/yourusername/zed-browser-server.git
git push -u origin main
```

### Step 2: Create Render Services
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Select the `browser-server` directory
5. Choose "Docker" as the runtime
6. Set environment variables:
   - `VNC_PW` = your password
   - `WIDTH` = 1280
   - `HEIGHT` = 720
7. Select "Free" tier (512MB)
8. Click "Create Web Service"

### Step 3: Repeat for each server
Create 2-5 identical services with different names (browser-1, browser-2, etc.)

### Step 4: Update Registry
In your zed frontend, update the server URLs:

```javascript
// In your Computer mode code
const BROWSER_SERVERS = [
  'https://browser-1.onrender.com',
  'https://browser-2.onrender.com',
  'https://browser-3.onrender.com'
];
```

## Local Development

```bash
# Build and run single server
docker build -t browser-server .
docker run -p 3000:3000 -p 6901:6901 -p 6902:6902 -e VNC_PW=password123 browser-server

# Or use docker-compose for multiple servers
docker-compose up -d
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/session` | POST | Create new session |
| `/session/:id` | GET | Get session info |

## WebSocket Messages

### Client → Server
```json
{ "type": "navigate", "url": "https://google.com" }
{ "type": "mouse", "event": "down", "x": 100, "y": 200, "button": 0 }
{ "type": "keyboard", "event": "down", "key": "Enter", "code": "Enter" }
{ "type": "scroll", "deltaY": 100 }
{ "type": "ping" }
```

### Server → Client
```json
{ "type": "frame", "data": "base64...", "timestamp": 1234567890 }
{ "type": "ready", "sessionId": "abc-123" }
{ "type": "pong", "timestamp": 1234567890 }
```

## Cost Estimate

| Servers | Concurrent Users | Monthly Cost |
|---------|-----------------|--------------|
| 1 | 1 | Free |
| 3 | 3 | Free |
| 5 | 5 | Free |
| 10 | 10 | Free |

All Render free tier — no credit card needed.
