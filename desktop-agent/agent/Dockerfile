FROM python:3.12-slim
WORKDIR /app

# ── Full Playwright / Chromium shared-lib deps ─────────────────────────────
# python:slim omits many X11/graphics libs that chromium-headless-shell needs.
# `playwright install-deps chromium` handles the official list automatically;
# the manual apt block below covers any gaps on older/minimal Debian images.
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Core X11 & display
    libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 libxkbcommon0 \
    # Graphics / GPU (SwiftShader software renderer)
    libdrm2 libgbm1 libgl1 \
    # Fonts & text rendering
    libfontconfig1 libfreetype6 libharfbuzz0b libpango-1.0-0 \
    libpangocairo-1.0-0 libcairo2 fonts-liberation \
    # Audio (not strictly needed for headless but avoids init errors)
    libasound2 \
    # Accessibility / ATK bridge
    libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 \
    # NSS / NSPR (TLS, certificates)
    libnss3 libnspr4 \
    # D-Bus (Chromium inter-process)
    libdbus-1-3 \
    # General utilities
    wget ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --quiet -r requirements.txt

# Let Playwright resolve and install any remaining OS-level deps itself
RUN playwright install-deps chromium
RUN playwright install chromium

COPY . .
ENV PORT=4000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
