# syntax=docker/dockerfile:1.7
# Root-level Dockerfile — builds the llm/llm-proxy server for Render
# client/ is not committed to git, so we build server-only

ARG NODE_IMAGE=node:20-bookworm-slim

# ── Stage 1: Install dependencies ─────────────────────────────────────────────
FROM ${NODE_IMAGE} AS deps
WORKDIR /app

# better-sqlite3 needs a C++ toolchain to compile native bindings
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Use a patched package.json that removes 'client' workspace
# (client/ is not committed to git, so plain npm ci would fail)
COPY docker-package.json ./package.json
COPY llm/llm-proxy/package-lock.json ./
COPY llm/llm-proxy/shared/package.json ./shared/
COPY llm/llm-proxy/server/package.json ./server/

RUN npm ci

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM deps AS build
WORKDIR /app

COPY llm/llm-proxy/shared ./shared
COPY llm/llm-proxy/server ./server
RUN mkdir -p server/data

RUN npm run build -w server
RUN npm prune --omit=dev

# ── Stage 3: Runtime ──────────────────────────────────────────────────────────
FROM ${NODE_IMAGE} AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/shared ./shared
COPY --from=build --chown=node:node /app/server/package.json ./server/package.json
COPY --from=build --chown=node:node /app/server/dist ./server/dist
COPY --from=build --chown=node:node /app/server/data ./server/data

RUN chmod 700 /app/server/data

USER node

EXPOSE 3000
VOLUME ["/app/server/data"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/ping').then((r) => { if (!r.ok) process.exit(1); }).catch(() => process.exit(1));"

CMD ["node", "server/dist/index.js"]
