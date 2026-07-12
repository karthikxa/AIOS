FROM debian:bookworm-slim

# ── Service 2: Agent API (pure FastAPI — no X11/VNC at all) ──
ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt
COPY app.py .

ENV PORT=10000
ENV DESKTOP_URL=https://browser-server-1.onrender.com
ENV AGENT_SECRET=changeme

EXPOSE 10000
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT} --log-level warning"]
