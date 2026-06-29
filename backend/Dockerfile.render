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

# Install Python dependencies from the lockfile (no extras that need playwright/ffmpeg)
RUN uv pip install --system --no-cache -e "." 2>/dev/null || \
    pip install --no-cache-dir -e "."

# Copy the rest of the source
COPY . .

# Render sets PORT env var; default to 10000 to match
ENV PORT=10000

EXPOSE 10000

CMD ["python", "server.py"]
