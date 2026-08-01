# AVDE (Agentic Virtual Desktop Environment) - Developer & Agent Handoff Guide

**Target Audience:** AI Coding Agents & Developers
**Last Updated:** July 2026

This document serves as the absolute source of truth for the AVDE architecture, specifically written so that any incoming AI coding agent can immediately understand how the system is wired, what files to modify, and how to run it locally.

---

## 1. High-Level Architecture

AVDE is a lightweight, fully localized AI agent platform. It is designed to run entirely locally without Docker, routing heavy LLM computation to a remote cloud proxy.

The system is broken down into three distinct services:

1. **Frontend Dashboard (Vite + React + Vanilla JS)**
   - **Path:** `/frontend`
   - **Port:** `8001` (or 8002 during dev collisions)
   - **Role:** The user-facing ChatGPT-style dashboard for chatting with agents, managing skills, models, and schedules. It includes a live MJPEG viewer for Computer Mode.

2. **Core Backend (Python FastAPI)**
   - **Path:** `/backend`
   - **Port:** `8642`
   - **Role:** Handles agent loop execution (`run_agent.py`), tool execution (`model_tools.py`), and serves the primary REST API.
   - **Database:** Uses a single source of truth at `C:\Users\balur\.hermes\` containing SQLite DBs (`sessions.db`, `state.db`, `memory.db`) and markdown configurations (`SOUL.md`, `AGENTS.md`).

3. **Desktop Agent (Python FastAPI + Playwright)**
   - **Path:** `/desktop-agent`
   - **Port:** `8765`
   - **Role:** Provides "Computer Mode". It runs a headless Chromium browser using Playwright, executing UI navigation commands, and streaming the browser's view (MJPEG) via WebSockets to the frontend.

4. **LLM Proxy (Remote Render Server)**
   - **Role:** To save local resources, AVDE points to a Render deployment for LLM requests (`ZED_PRO_BASE_URL`). The local `/llm` folder's source code is merely for reference; the app does **not** run the LLM proxy locally.

---

## 2. Core Operational Patterns

### 2.1 The "No-Docker" Local Rule
AVDE was completely refactored to remove Docker dependencies:
- **Computer Mode** runs via headless Playwright natively in the `desktop-agent` process.
- If a client wants a fully isolated Ubuntu desktop, they run `/scripts/setup-desktop.bat` to configure a **WSL2** virtual machine natively inside Windows.
- **NEVER** introduce Docker containers or large Node modules if a lightweight Python/WSL2 alternative exists.

### 2.2 Unified Data Path
All configuration, state, API keys, and memory reside in a unified directory: `C:\Users\balur\.hermes\`.
- If you need to manipulate agent memory, edit `memory.db`.
- If you need to read provider keys, read `.env` in the Hermes root.
- The backend is configured to use this path via the `ZED_HOME` environment variable.

### 2.3 Removed Components (Do Not Use)
During a major cleanup phase, the following were permanently deleted and should **not** be referenced or restored:
- `/browser-server` (Replaced entirely by `/desktop-agent`)
- Render/HuggingFace deployment folders inside `desktop-agent`.
- Redundant scratchpads (`calc_schemas3.py`, etc.) and translated Readmes in `/backend`.

---

## 3. How to Start the System

All components run as standard native processes. Do not use Docker.

**1. Start the Python Backend**
```powershell
cd backend
.\.venv\Scripts\python.exe server.py
# Runs on http://localhost:8642
```

**2. Start the Desktop Agent (Computer Mode)**
```powershell
cd desktop-agent
..\backend\.venv\Scripts\python.exe start_agent.py
# Runs on http://localhost:8765
```

**3. Start the Frontend**
```powershell
cd frontend
npm run dev
# Runs on http://localhost:8001 (or 8002)
```

---

## 4. Where to Make Changes

| If you want to change... | Look in this file/folder... |
|--------------------------|-----------------------------|
| **Agent logic, tool calling loop** | `/backend/server.py` and `/backend/run_agent.py` |
| **Adding a new AI Tool** | `/backend/model_tools.py` and `/backend/toolsets.py` |
| **Frontend UI/Design** | `/frontend/app.js` and `/frontend/styles.css` (Note: We use Vanilla JS & CSS primarily, moving away from heavy React components) |
| **Computer Mode browser control** | `/desktop-agent/agent/main.py` |
| **API Keys / LLM Configuration** | `/backend/.env` (Points to Render proxy) |

---

## 5. Coding Standards for Agents

- **File Cleanup:** Always clean up your scratchpads and test files. Keep the repository lean.
- **Vanilla Over Frameworks:** The frontend heavily relies on vanilla JS (`app.js`, `styles.css`) for UI interactions to keep performance blazing fast. Do not introduce heavy React libraries unless explicitly asked.
- **Design Aesthetics:** Any frontend changes MUST be modern, utilizing glassmorphism, rounded corners (`12px` or `16px`), smooth transitions, and polished shadows (e.g., `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`). 
- **Error Handling:** Ensure that cross-origin (CORS) rules in FastAPI (`server.py` and `desktop-agent/agent/main.py`) always allow `http://localhost:8001` and `8002`.

**You are now ready to develop on AVDE!**
