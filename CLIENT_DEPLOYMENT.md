# AVDE Client Deployment Guide

**Choose your setup based on available resources and bandwidth.**

---

## Quick Comparison

| Mode | Download | Speed | RAM | Docker | GUI | Best For |
|------|----------|-------|-----|--------|-----|----------|
| **Auto** (Recommended) | ~500MB–4GB | Fast | 2GB | Optional | Yes | Any setup |
| **Docker** | ~4GB | Very Fast | 2GB | Required | Yes | Fast internet, Docker available |
| **QEMU** | ~500MB | Medium | 2GB | ❌ No | Yes | Limited bandwidth, no Docker |
| **Minimal** | ~200MB | Fast | 1GB | Optional | ❌ CLI only | Low resources, terminal tasks |

---

## Setup Instructions by Client Type

### 🚀 **Fast Internet + Docker Available → Use "auto" (Docker mode)**

```bash
# .env
CUA_MODE=auto
```

**Result:**
- ✅ First run: Downloads 4GB Docker image (~10-20 min)
- ✅ Subsequent runs: Instant startup
- ✅ Full desktop with GUI
- ✅ Best performance

---

### 🐢 **Slow Internet or No Docker → Use "qemu"**

```bash
# .env
CUA_MODE=qemu
```

**Result:**
- ✅ First run: Downloads ~500MB QEMU image (~2-5 min)
- ✅ Subsequent runs: 30-60s boot
- ✅ Full desktop with GUI
- ✅ No Docker required
- ⚠️ Slightly slower than Docker

**Requirements:**
- 2GB RAM per agent
- 10GB disk space for image cache

---

### 💰 **Limited Resources → Use "minimal"**

```bash
# .env
CUA_MODE=minimal
```

**Result:**
- ✅ Download: ~200MB (~1-2 min)
- ✅ Boot time: ~10s
- ✅ Headless Ubuntu (terminal/CLI only)
- ✅ Uses 1GB RAM
- ⚠️ No graphical desktop

**Good for:**
- Automated tasks (shell commands, file ops)
- Terminal-based applications
- Very resource-constrained systems

---

## First-Time Setup by Scenario

### Scenario 1: "I have Docker and good internet"
```bash
# Edit desktop-agent/.env
CUA_MODE=docker
STREAM_FPS=15
STREAM_QUAL=50

# Run
.\start-unified.bat
# Wait ~15 min for Docker image pull
```

### Scenario 2: "No Docker, decent internet"
```bash
# Edit desktop-agent/.env
CUA_MODE=qemu
STREAM_FPS=10
STREAM_QUAL=40

# Run
.\start-unified.bat
# Wait ~3 min for QEMU image download
```

### Scenario 3: "Very limited resources/bandwidth"
```bash
# Edit desktop-agent/.env
CUA_MODE=minimal
STREAM_FPS=5
STREAM_QUAL=30

# Run
.\start-unified.bat
# Wait ~1 min for minimal image
```

---

## Troubleshooting

### "Download too slow"
→ Use `CUA_MODE=minimal` or `CUA_MODE=qemu` instead of docker

### "Out of memory"
→ Use `CUA_MODE=minimal` (1GB instead of 2GB)

### "Takes too long to boot"
→ Use `CUA_MODE=docker` if Docker available, or `CUA_MODE=minimal`

### "I need GUI but have no Docker"
→ Use `CUA_MODE=qemu` (~500MB download, full desktop)

---

## Environment Variables Cheat Sheet

```bash
# Mode selection
CUA_MODE=auto|docker|qemu|minimal

# Streaming quality (adjust for bandwidth)
STREAM_FPS=5|10|15|20    # Frames per second (default: 10)
STREAM_QUAL=20|40|50|80  # JPEG quality 1-100 (default: 40)

# LLM Configuration
LLM_API_KEY=your-key
LLM_MODEL=openai/gpt-4o
LLM_BASE_URL=https://server-llm-1.onrender.com/v1

# Port
PORT=6901
```

---

## Network Optimization for Slow Connections

For clients on slow networks, optimize bandwidth:

```bash
# .env - Minimal bandwidth mode
CUA_MODE=minimal           # Smallest download
STREAM_FPS=5              # Lower frame rate
STREAM_QUAL=30            # Lower quality (30% compression)
```

This reduces:
- Initial download: ~200MB (instead of 4GB)
- Per-frame bandwidth: ~50KB (instead of 500KB)
- Startup time: ~10s (instead of 1+ min)

---

## Production Deployment Tips

### For SaaS / Multi-User Setup:

1. **Pre-download images on server**
   ```bash
   docker pull trycua/cua-xfce:latest  # Docker mode
   # or
   python -c "from cua_sandbox import Sandbox, Image; ..." # QEMU mode
   ```

2. **Use "minimal" mode by default**
   - Lower per-user resource cost
   - Faster deployments

3. **Scale with STREAM_FPS and STREAM_QUAL**
   - Lower for many concurrent users
   - Higher for individual power users

4. **Monitor disk space**
   - QEMU: ~10GB per image
   - Docker: ~4GB per image
   - Minimal: ~500MB per image

---

## Support Decision Tree

```
Is Docker installed?
├─ YES → Use "auto" (will pick docker)
│        Expect ~15 min first-run setup
│
└─ NO → Do you need GUI?
   ├─ YES → Use "qemu"
   │        Expect ~3 min first-run setup
   │
   └─ NO → Use "minimal"
            Expect ~1 min first-run setup
```

---

## Quick Reference: Bandwidth Calculator

| Mode | Download | Per-Minute Stream | 1-Hour Cost |
|------|----------|-------------------|------------|
| Docker (15 FPS, 50% qual) | 4GB | 30MB | 1.8GB |
| QEMU (10 FPS, 40% qual) | 500MB | 20MB | 1.2GB |
| Minimal (5 FPS, 30% qual) | 200MB | 10MB | 600MB |

