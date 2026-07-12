FROM python:3.12-slim
WORKDIR /app

# Install Chromium system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 \
    libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2 libatspi2.0-0 \
    fonts-liberation wget && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --quiet -r requirements.txt
RUN playwright install chromium

COPY . .
ENV PORT=4000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4000"]
