# Lightweight Render deployment image for the FastAPI backend.
# Skips playwright, ffmpeg, s6-overlay, and other heavy build deps that are
# only needed in the full production container.
FROM python:3.13-slim

# Disable buffering so logs appear immediately in Render
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install minimal system deps (git for any pip VCS deps, build-essential for
# packages with native extensions like cryptography)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git curl build-essential libffi-dev && \
    rm -rf /var/lib/apt/lists/*

# Install uv for fast dependency resolution
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

WORKDIR /app

# Copy dependency manifests first (layer-cache friendly)
COPY pyproject.toml uv.lock ./

# Install Python dependencies from the lockfile + google extra for OAuth
RUN uv pip install --system --no-cache -e ".[google]" 2>/dev/null || \
    pip install --no-cache-dir -e ".[google]"

# Copy the rest of the source (cache-bust to ensure new code is picked up)
ARG BUILD_ID=1
COPY . .

# Render sets PORT env var; default to 10000 to match
ENV PORT=10000
ENV ZED_SERVER_PORT=10000
# Set ZED_HOME to a writable path on Render (/data is the persistent disk mount,
# but /tmp/.zed works if no disk is attached — both are consistent at import time)
ENV ZED_HOME=/tmp/.zed

EXPOSE 10000

CMD ["python", "server.py"]

