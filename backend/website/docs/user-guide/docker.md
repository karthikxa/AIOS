---
sidebar_position: 7
title: "Docker"
description: "Running Zed Agent in Docker and using Docker as a terminal backend"
---

# Zed Agent â€” Docker

There are two distinct ways Docker intersects with Zed Agent:

1. **Running Zed IN Docker** â€” the agent itself runs inside a container (this page's primary focus)
2. **Docker as a terminal backend** â€” the agent runs on your host but executes every command inside a single, persistent Docker sandbox container that survives across tool calls, `/new`, and subagents for the life of the Zed process (see [Configuration â†’ Docker Backend](./configuration.md#docker-backend))

This page covers option 1. The container stores all user data (config, API keys, sessions, skills, memories) in a single directory mounted from the host at `/opt/data`. The image itself is stateless and can be upgraded by pulling a new version without losing any configuration.

## Quick start

If this is your first time running Zed Agent, create a data directory on the host and start the container interactively to run the setup wizard:

:::caution Avoid browser-based VPS consoles for the install commands
Some VPS providers (Hetzner Cloud, and several others) offer a browser-based
console for managing hosts. These consoles transmit special characters
incorrectly â€” `:` may arrive as `;`, `@` may be mis-rendered, and non-English
keyboard layouts fare worse â€” which silently corrupts `docker run` arguments
like `-v ~/.zed:/opt/data`, `-e KEY=value`, and pasted API keys / tokens.

**Connect over SSH instead** (`ssh root@<host>`) for copy-paste-safe command
entry. If you must use the browser console, type the commands manually
instead of pasting, and double-check every `:`, `@`, `=`, and `/` in the
result before hitting Enter.
:::

```sh
mkdir -p ~/.zed
docker run -it --rm \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent setup
```

This drops you into the setup wizard, which will prompt you for your API keys and write them to `~/.zed/.env`. You only need to do this once. It is highly recommended to set up a chat system for the gateway to work with at this point.

:::tip
Inside the container, run `zed setup --portal` once â€” the refresh token persists in the mounted `~/.zed` volume. See [Zed Portal](/integrations/nous-portal).
:::

## Running in gateway mode

Once configured, run the container in the background as a persistent gateway (Telegram, Discord, Slack, WhatsApp, etc.):

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  zedteam/zed-agent gateway run
```

Port 8642 exposes the gateway's [OpenAI-compatible API server](./features/api-server.md) and health endpoint. It's optional if you only use chat platforms (Telegram, Discord, etc.), but required if you want the dashboard or external tools to reach the gateway.

:::tip Gateway runs supervised
Inside the official Docker image, `gateway run` is **automatically supervised by s6-overlay**: if the gateway process crashes it's restarted within a couple of seconds without losing the container, and the dashboard (when `ZED_DASHBOARD=1` is set) is supervised alongside it. The `gateway run` CMD process itself is a `sleep infinity` heartbeat that keeps the container alive while s6 manages the actual gateway process â€” so `docker stop` still shuts everything down cleanly, but `docker logs` shows the supervised gateway's output.

You'll see a one-line breadcrumb in `docker logs` confirming the upgrade. To opt out â€” and get the historical "gateway is the container's main process, container exit = gateway exit" semantics â€” pass `--no-supervise` or set `ZED_GATEWAY_NO_SUPERVISE=1`. The opt-out is useful for CI smoke tests that want the container to exit with the gateway's status code; for production deployments the supervised default is strictly better.

This behavior applies to the s6-based image only. Earlier (tini-based) images still run `gateway run` as the foreground main process.
:::

:::note Where gateway logs go
See the [Where the logs go](#where-the-logs-go) section below for the full routing map (per-profile gateways, dashboard, boot reconciler, container-wide `docker logs`).
:::

Note: the API server is gated on `API_SERVER_ENABLED=true`. To expose it beyond `127.0.0.1` inside the container, also set `API_SERVER_HOST=0.0.0.0` and an `API_SERVER_KEY` (minimum 8 characters â€” generate one with `openssl rand -hex 32`). Example:

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  -e API_SERVER_ENABLED=true \
  -e API_SERVER_HOST=0.0.0.0 \
  -e API_SERVER_KEY="$(openssl rand -hex 32)" \
  -e API_SERVER_CORS_ORIGINS='*' \
  zedteam/zed-agent gateway run
```

Opening any port on an internet facing machine is a security risk. You should not do it unless you understand the risks.

## Running the dashboard

The built-in web dashboard runs as a supervised s6-rc service alongside the gateway in the same container. Set `ZED_DASHBOARD=1` to bring it up:

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  -p 9119:9119 \
  -e ZED_DASHBOARD=1 \
  zedteam/zed-agent gateway run
```

The dashboard is supervised by s6 â€” if it crashes, `s6-supervise` restarts it automatically after a short backoff. Dashboard stdout/stderr is forwarded to `docker logs <container>` (no prefix; the gateway's own output now lives in a per-profile s6-log file â€” see [Where the logs go](#where-the-logs-go) below â€” so the two streams don't clash).

| Environment variable | Description | Default |
|---------------------|-------------|---------|
| `ZED_DASHBOARD` | Set to `1` (or `true` / `yes`) to enable the supervised dashboard service | *(unset â€” service is registered but stays down)* |
| `ZED_DASHBOARD_HOST` | Bind address for the dashboard HTTP server | `0.0.0.0` |
| `ZED_DASHBOARD_PORT` | Port for the dashboard HTTP server | `9119` |
| `ZED_DASHBOARD_INSECURE` | Set to `1` (or `true` / `yes`) to bind without the OAuth auth gate. Only use on trusted networks behind a reverse proxy without the OAuth contract â€” the dashboard exposes API keys and session data | *(unset â€” gate enforced when a `DashboardAuthProvider` is registered)* |

The dashboard inside the container defaults to binding `0.0.0.0` â€” without it, the published `-p 9119:9119` port would not be reachable from the host. To restrict the bind to container loopback (for sidecar / reverse-proxy setups), set `ZED_DASHBOARD_HOST=127.0.0.1`.

The dashboard's auth gate engages automatically when both of the following are true:

1. The bind host is non-loopback (e.g. the default `0.0.0.0` inside the container), **and**
2. A `DashboardAuthProvider` plugin is registered.

There are three bundled ways to satisfy the second condition:

- **Username/password** â€” the simplest for a self-hosted / on-prem / homelab container on a trusted network or behind a VPN: set `ZED_DASHBOARD_BASIC_AUTH_USERNAME` + `ZED_DASHBOARD_BASIC_AUTH_PASSWORD` (and `ZED_DASHBOARD_BASIC_AUTH_SECRET` for restart-stable sessions). Not suitable for direct public-internet exposure.
- **OAuth (Zed Portal)** â€” for hosted/public deploys: the `dashboard_auth/nous` provider activates whenever `ZED_DASHBOARD_OAUTH_CLIENT_ID` is set.
- **Self-hosted OIDC** â€” to authenticate against your own identity provider via standard OpenID Connect: the `dashboard_auth/self_hosted` provider activates when `ZED_DASHBOARD_OIDC_ISSUER` + `ZED_DASHBOARD_OIDC_CLIENT_ID` are set.

Whichever you choose, the gate redirects callers to a login page before they can reach any protected route. See [Web Dashboard â†’ Authentication](features/web-dashboard.md#authentication-gated-mode) for all three providers.

If no provider is registered and the bind is non-loopback, the dashboard **fails closed at startup** with a specific error pointing at the missing env var. The `ZED_DASHBOARD_INSECURE=1` escape hatch disables the gate entirely (the bind host alone never implies `--insecure`), but it serves an unauthenticated dashboard â€” configure a provider instead unless you have your own auth layer in front.

:::warning `ZED_DASHBOARD_INSECURE=1` exposes API keys
Opting out of the OAuth gate serves the dashboard's API surface (including model keys and session data) to anyone who can reach the published port. Only enable it when you have your own auth layer in front, or on a trusted LAN you fully control.
:::

Running the dashboard as a separate container **is** supported when that container shares the host PID and network namespace (e.g. `network_mode: host`, as the repo's own `docker-compose.yml` does â€” see its `dashboard` service). Its gateway-liveness detection requires a shared PID namespace with the gateway process, so the limitation only applies to dashboards run in isolated bridge-network containers without a shared PID namespace.

## Running interactively (CLI chat)

To open an interactive chat session against a running data directory:

```sh
docker run -it --rm \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent
```

Or if you have already opened a terminal in your running container (via Docker Desktop for instance), just run:

```sh
/opt/zed/.venv/bin/zed
```

## Persistent volumes

The `/opt/data` volume is the single source of truth for all Zed state. It maps to your host's `~/.zed/` directory and contains:

| Path | Contents |
|------|----------|
| `.env` | API keys and secrets |
| `config.yaml` | All Zed configuration |
| `SOUL.md` | Agent personality/identity |
| `sessions/` | Conversation history |
| `memories/` | Persistent memory store |
| `skills/` | Installed skills |
| `home/` | Per-profile HOME for Zed tool subprocesses (`git`, `ssh`, `gh`, `npm`, and skill CLIs) |
| `cron/` | Scheduled job definitions |
| `hooks/` | Event hooks |
| `logs/` | Runtime logs |
| `skins/` | Custom CLI skins |

### Immutable install tree

In hosted and published Docker images, `/opt/zed` is the installed application tree. It is root-owned and read-only to the runtime `zed` user, so agent turns, gateway sessions, dashboard actions, and normal `docker exec zed zed ...` commands cannot edit the core source, bundled `.venv`, `node_modules`, or TUI bundle in place.

All mutable Zed state belongs under `/opt/data`: config, `.env`, profiles, skills, memories, sessions, logs, dashboard uploads, plugins, and other user-managed files. The image also disables runtime `.pyc` writes and Zed lazy dependency installs into `/opt/zed`; optional platform dependencies needed by the published image should be baked into the image or installed through a new image build.

On hosted/published images, agent self-improvement is scoped to skills, memory, plugins, and config under `/opt/data`. The installed core source under `/opt/zed` is immutable; core changes are made via PRs to the repo and shipped by updating the image, not by live-editing the running install.

If an operator needs to repair or inspect files outside `/opt/data`, use a root shell intentionally. The `zed` shim normally drops `docker exec zed zed ...` back to the runtime user; set `ZED_DOCKER_EXEC_AS_ROOT=1` for a one-off root invocation when you explicitly need root semantics.

Skill CLIs that store credentials under `~` must be initialized against the subprocess HOME, not just the data-volume root. For example, the [xurl skill](./skills/bundled/social-media/social-media-xurl.md) stores OAuth state in `~/.xurl`; in the official Docker layout, Zed tool calls read that as `/opt/data/home/.xurl`, so run manual xurl auth with `HOME=/opt/data/home` and verify with `HOME=/opt/data/home xurl auth status`.

:::warning
Never run two Zed **gateway** containers against the same data directory simultaneously â€” session files and memory stores are not designed for concurrent write access.
:::

## Multi-profile support

Zed supports [multiple profiles](../reference/profile-commands.md) â€” separate `~/.zed/` subdirectories that let you run independent agents (different SOUL, skills, memory, sessions, credentials) from a single installation. **Inside the official Docker image, the s6 supervision tree treats each profile as a first-class supervised service**, so the recommended deployment is **one container hosting all profiles**.

Each profile created with `zed profile create <name>` gets:

- A dedicated s6 service slot at `/run/service/gateway-<name>/`, registered dynamically by the runtime â€” no container rebuild required.
- Auto-restart on crash, backoff-managed by `s6-supervise`.
- Per-profile rotated logs at `${ZED_HOME}/logs/gateways/<name>/current` (10 archives Ã— 1 MB each).
- State persistence across container restarts: the boot-time reconciler reads `gateway_state.json` from each profile directory and brings the slot back up only for profiles whose last recorded state was `running`. Only a gateway you explicitly stopped (`zed gateway stop`) stays down across a restart â€” a container restart, image upgrade, or unexpected exit leaves the recorded state as `running`, so the gateway auto-starts on the next boot.

The lifecycle commands you'd run on the host work the same way from inside the container:

```sh
# Create a profile â€” registers the gateway-<name> s6 slot.
docker exec zed zed profile create coder

# Start / stop / restart â€” dispatches s6-svc; the gateway lifecycle survives docker restart.
docker exec zed zed -p coder gateway start
docker exec zed zed -p coder gateway stop
docker exec zed zed -p coder gateway restart

# Status â€” reports `Manager: s6 (container supervisor)` inside the container.
docker exec zed zed -p coder gateway status

# Remove a profile â€” tears down the s6 slot too.
docker exec zed zed profile delete coder
```

Under the hood, `zed gateway start/stop/restart` inside the container is intercepted and routed to `s6-svc` against the right service directory; you don't need to learn the s6 commands directly. For raw supervisor state, use `/command/s6-svstat /run/service/gateway-<name>` (note `/command/` is on PATH only for processes spawned by the supervision tree â€” when calling from `docker exec`, pass the absolute path).

### Reaching more than one profile from outside the container

Two different surfaces reach a profile's gateway from outside, and they behave differently â€” don't conflate them:

**Zed Desktop (and the web dashboard).** The Desktop app's **Remote Gateway** connection talks to a `zed dashboard` backend (default **port 9119**, enabled by `ZED_DASHBOARD=1`) â€” *not* the OpenAI API server. One dashboard backend serves **every** co-located profile: the app's profile switcher sends the target profile with each request and the backend opens that profile's `ZED_HOME` on disk. So you do **not** need a second port â€” or a second connection â€” per profile for Desktop; one `:9119` connection covers them all through the switcher.

**OpenAI-compatible API clients (Open WebUI, LobeChat, `/v1/...`).** These talk to each profile's **API server**, which binds **port 8642 for every profile** (resolved from `API_SERVER_PORT` / `platforms.api_server.extra.port` â€” there is no auto-allocation and no `config.yaml`/`gateway.port` key). If you want a client to reach a *specific* second profile, give that profile a distinct `API_SERVER_PORT` in **its own** `.env`, otherwise its gateway tries to bind 8642 too and conflicts with the default profile:

```sh
# Create the profile (registers its gateway-<name> s6 slot)
docker exec zed zed profile create work

# Point its API server at a free port (write to the profile's own .env)
cat >> /opt/data/profiles/work/.env <<'EOF'
API_SERVER_ENABLED=true
API_SERVER_PORT=8643
EOF

docker exec zed zed -p work gateway restart
```

Keep `API_SERVER_PORT` in each profile's **own** `.env`, never in the container-wide `environment:` block â€” a global value would force every profile onto the same port and they would collide. With bridge networking, publish the extra port in `docker-compose.yml` (`- "8643:8643"`); with `network_mode: host` it is already reachable on the host. The default profile's 8642 connection is untouched.

### Why one container with many profiles, not many containers

Before the s6 migration, "one container per profile" was the recommended pattern because there was no in-container supervisor to manage multiple gateways. With s6 as PID 1, that's no longer necessary, and the single-container layout is simpler in almost every dimension:

| | One container, many profiles | One container per profile |
|---|---|---|
| Disk overhead | One image, one bundled venv, one Playwright cache | N images / N caches |
| Memory overhead | Shared Python interpreter cache, shared node_modules | Duplicated per container |
| Profile creation | `docker exec ... zed profile create <name>` (seconds) | New `docker run` invocation + port allocation + bind-mount config |
| Per-profile crash recovery | `s6-supervise` auto-restart | Docker's `--restart unless-stopped` (slower, kills sibling work) |
| Logs | Per-profile rotated file via `s6-log`, plus container-boot audit log | `docker logs <name>` per container â€” no built-in rotation |
| Backup | One `~/.zed` directory | N directories to coordinate |

The default profile (`default`) is always registered on first boot, so a fresh container ships with one supervised gateway out of the box. Additional profiles are pure runtime adds.

### When you DO want a separate container

Profile-in-container is the default. Run a separate container per profile only when you have a specific reason:

- **Resource isolation per workload** â€” e.g. a runaway browser-tool session in profile A shouldn't be able to OOM profile B. Containers give you `--memory` / `--cpus` per profile.
- **Independent image pinning** â€” different upstream image tags per workload.
- **Network segmentation** â€” distinct Docker networks per profile (e.g. one customer-facing, one internal).
- **Compliance / blast radius** â€” distinct credentials never share an OS-level process tree.

In those cases, declare one service per profile with distinct `container_name`, `volumes`, and `ports`:

```yaml
services:
  zed-work:
    image: zedteam/zed-agent:latest
    container_name: zed-work
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed-work:/opt/data

  zed-personal:
    image: zedteam/zed-agent:latest
    container_name: zed-personal
    restart: unless-stopped
    command: gateway run
    ports:
      - "8643:8642"
    volumes:
      - ~/.zed-personal:/opt/data
```

The warning from [Persistent volumes](#persistent-volumes) still applies: never point two containers at the same `~/.zed` directory simultaneously. The s6 supervisor inside each container manages its own profile set; cross-container sharing of a data volume corrupts session files and memory stores.

## Where the logs go

The s6 container has four distinct log surfaces, and "why isn't my gateway showing anything in `docker logs`" is a common surprise. Cheatsheet:

| Source | Where it lands | How to read it |
|---|---|---|
| **Per-profile gateway** (`zed gateway run` and per-profile gateways under s6) | Tee'd to two places: `docker logs <container>` (real time, no extra prefix) **and** `${ZED_HOME}/logs/gateways/<profile>/current` (rotated, ISO-8601 timestamped, 10 archives Ã— 1 MB each) | `docker logs -f zed` or `tail -F ~/.zed/logs/gateways/default/current` on the host |
| **Dashboard** (when `ZED_DASHBOARD=1`) | `docker logs <container>` (no prefix) | `docker logs -f zed` â€” interleaved with gateway lines |
| **Boot reconciler** (records which profile gateways were restored on each container start) | `${ZED_HOME}/logs/container-boot.log` (append-only audit log) | `tail -F ~/.zed/logs/container-boot.log` |
| **Generic Zed logs** (`agent.log`, `errors.log`) | `${ZED_HOME}/logs/` (profile-aware) | `docker exec zed zed logs --follow [--level WARNING] [--session <id>]` |

Two practical consequences worth knowing:

- The file copy at `logs/gateways/<profile>/current` is what survives container restarts. `docker logs` only retains output from the current container's lifetime (and is wiped on `docker rm`); the rotated files persist on the bind-mounted volume.
- The boot reconciler's audit line shape is `<iso-timestamp> profile=<name> prior_state=<state> action=<registered|started>`, so a quick `grep profile=coder ~/.zed/logs/container-boot.log` reveals when a given profile was last restored and whether s6 auto-started it.

## Environment variable forwarding

API keys are read from `/opt/data/.env` inside the container. You can also pass environment variables directly:

```sh
docker run -it --rm \
  -v ~/.zed:/opt/data \
  -e ANTHROPIC_API_KEY="sk-ant-..." \
  -e OPENAI_API_KEY="sk-..." \
  zedteam/zed-agent
```

Direct `-e` flags override values from `.env`. This is useful for CI/CD or secrets-manager integrations where you don't want keys on disk.

:::note Looking for Docker as the **terminal backend**?
This page covers running Zed itself inside Docker. If you want Zed to execute the agent's `terminal` / `execute_code` calls inside a Docker sandbox container (one long-lived container shared across Zed processes â€” see issue #20561), that's a separate config block â€” `terminal.backend: docker` plus `terminal.docker_image`, `terminal.docker_volumes`, `terminal.docker_forward_env`, `terminal.docker_env`, `terminal.docker_run_as_host_user`, `terminal.docker_extra_args`, `terminal.docker_persist_across_processes`, and `terminal.docker_orphan_reaper`. See [Configuration â†’ Docker Backend](configuration.md#docker-backend) for the full set including container-lifecycle rules.
:::

## Docker Compose example

For persistent deployment with both the gateway and dashboard, a `docker-compose.yaml` is convenient:

```yaml
services:
  zed:
    image: zedteam/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"   # gateway API
      - "9119:9119"   # dashboard (only reached when ZED_DASHBOARD=1)
    volumes:
      - ~/.zed:/opt/data
    environment:
      - ZED_DASHBOARD=1
      # Uncomment to forward specific env vars instead of using .env file:
      # - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      # - OPENAI_API_KEY=${OPENAI_API_KEY}
      # - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: "2.0"
```

Start with `docker compose up -d` and view logs with `docker compose logs -f`. The supervised gateway's stdout is also tee'd to `${ZED_HOME}/logs/gateways/<profile>/current` on the volume â€” see [Where the logs go](#where-the-logs-go) for the full routing map.

## Optional: Linux desktop audio bridge

Voice mode in Docker needs two separate things to work: Zed must be allowed to probe audio devices inside the container, and the container must be able to reach your host audio server. The setup below covers the host audio plumbing for Linux desktops that expose a PulseAudio-compatible socket, including many PipeWire setups.

:::caution
This is a Linux desktop workaround, not a general Docker Desktop feature. It is useful when you already have host audio working and want CLI voice mode inside the Zed container. If Zed still reports `Running inside Docker container -- no audio devices`, use a build that includes Docker audio probing support for `PULSE_SERVER` / `PIPEWIRE_REMOTE`.
:::

First, create an ALSA config next to your Compose file:

```conf title="asound.conf"
pcm.!default {
    type pulse
    hint {
        show on
        description "Default ALSA Output (PulseAudio)"
    }
}

pcm.pulse {
    type pulse
}

ctl.!default {
    type pulse
}
```

Then build a small derived image with the ALSA PulseAudio plugin installed:

```dockerfile title="Dockerfile.audio"
FROM zedteam/zed-agent:latest

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends libasound2-plugins \
    && rm -rf /var/lib/apt/lists/*
```

Use that image in Compose and pass through the host user's PulseAudio socket and cookie:

```yaml
services:
  zed:
    build:
      context: .
      dockerfile: Dockerfile.audio
    image: zed-agent-audio
    container_name: zed
    restart: unless-stopped
    command: gateway run
    volumes:
      - ~/.zed:/opt/data
      - /run/user/${ZED_UID}/pulse:/run/user/${ZED_UID}/pulse
      - ~/.config/pulse/cookie:/tmp/pulse-cookie:ro
      - ./asound.conf:/etc/asound.conf:ro
    environment:
      - ZED_UID=${ZED_UID}
      - ZED_GID=${ZED_GID}
      - XDG_RUNTIME_DIR=/run/user/${ZED_UID}
      - PULSE_SERVER=unix:/run/user/${ZED_UID}/pulse/native
      - PULSE_COOKIE=/tmp/pulse-cookie
```

Start it with your host UID/GID so the container process can access the per-user audio socket:

```sh
export ZED_UID="$(id -u)"
export ZED_GID="$(id -g)"
docker compose up -d --build
```

To verify what PortAudio sees inside the container:

```sh
docker exec zed /opt/zed/.venv/bin/python -c "import sounddevice as sd; print(sd.query_devices())"
```

## Resource limits

The Zed container needs moderate resources. Recommended minimums:

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| Memory | 1 GB | 2â€“4 GB |
| CPU | 1 core | 2 cores |
| Disk (data volume) | 500 MB | 2+ GB (grows with sessions/skills) |

Browser automation (Playwright/Chromium) is the most memory-hungry feature. If you don't need browser tools, 1 GB is sufficient. With browser tools active, allocate at least 2 GB.

Set limits in Docker:

```sh
docker run -d \
  --name zed \
  --restart unless-stopped \
  --memory=4g --cpus=2 \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent gateway run
```

## What the Dockerfile does

The official image is based on `debian:13.4` and includes:

- Python 3 with all Zed dependencies (`uv pip install -e ".[all]"`)
- Node.js + npm (for browser automation and WhatsApp bridge)
- Playwright with Chromium (`npx playwright install --with-deps chromium --only-shell`)
- ripgrep, ffmpeg, git, and `xz-utils` as system utilities
- **`docker-cli`** â€” so agents running inside the container can drive the host's Docker daemon (bind-mount `/var/run/docker.sock` to opt in) for `docker build`, `docker run`, container inspection, etc.
- **`openssh-client`** â€” enables the [SSH terminal backend](/user-guide/configuration#ssh-backend) from inside the container. The SSH backend shells out to the system `ssh` binary; without this, it failed silently in containerized installs.
- The WhatsApp bridge (`scripts/whatsapp-bridge/`)
- **[`s6-overlay`](https://github.com/just-containers/s6-overlay) v3** as PID 1 (replaces the older `tini`) â€” supervises the dashboard and per-profile gateways with auto-restart on crash, reaps zombie subprocesses, and forwards signals.

The container's `ENTRYPOINT` is s6-overlay's `/init`. On boot it:
1. Runs `/etc/cont-init.d/01-zed-setup` (= `docker/stage2-hook.sh`) as root: optional UID/GID remap, fixes volume ownership, seeds `.env` / `config.yaml` / `SOUL.md` on first boot, runs non-interactive config-schema migrations unless `ZED_SKIP_CONFIG_MIGRATION=1`, syncs bundled skills.
2. Runs `/etc/cont-init.d/02-reconcile-profiles` (= `zed_cli.container_boot`): walks `$ZED_HOME/profiles/<name>/`, recreates the per-profile gateway s6 service slot under `/run/service/gateway-<profile>/`, and auto-starts only those whose last recorded state was `running` (see [Per-profile gateway supervision](#per-profile-gateway-supervision)).
3. Starts the static `main-zed` and `dashboard` s6-rc services.
4. Exec's the container's CMD as the main program (`/opt/zed/docker/main-wrapper.sh`), which routes the arguments the user passed to `docker run`:
   - no args â†’ `zed` (the default)
   - first arg is an executable on PATH (e.g. `sleep`, `bash`) â†’ exec it directly
   - anything else â†’ `zed <args>` (subcommand passthrough)
   The container exits when this main program exits, with its exit code.

:::warning Breaking change vs. pre-s6 images
The container ENTRYPOINT is now `/init` (s6-overlay), not `/usr/bin/tini`. All five documented `docker run` invocation patterns (no args, `chat -q "â€¦"`, `sleep infinity`, `bash`, `--tui`) behave identically to the tini-based image. If you have a downstream wrapper that depended on tini-specific signal behavior or hard-coded `/usr/bin/tini --` invocation, pin to the previous image tag.
:::

:::warning Privilege model
Do not override the image entrypoint unless you keep `/init` (or, equivalently, the legacy `docker/entrypoint.sh` shim that forwards to the stage2 hook) in the command chain. s6-overlay's `/init` runs as root so it can chown the volume on first boot, then drops to the `zed` user via `s6-setuidgid` for every supervised service AND for the main program. Starting `zed gateway run` as root inside the official image is refused by default because it can leave root-owned files in `/opt/data` and break later dashboard or gateway starts. Set `ZED_ALLOW_ROOT_GATEWAY=1` only when you intentionally accept that risk.
:::

### `docker exec` automatically drops to the `zed` user

`docker exec zed <cmd>` defaults to running as root inside the container, but the image ships a thin shim at `/opt/zed/bin/zed` (earliest on PATH) that detects root callers and transparently re-execs through `s6-setuidgid zed`. So `docker exec zed login`, `docker exec zed profile create â€¦`, `docker exec zed setup`, etc. all write files owned by UID 10000 â€” i.e. readable by the supervised gateway â€” with no extra `--user` flag needed. Non-root callers (the supervised processes themselves, `docker exec --user zed`, kanban subagents inside the container) hit a short-circuit that exec's the venv binary directly, so there's no overhead on the hot paths.

If you specifically need a `docker exec` that retains root semantics (diagnostic sessions, inspecting root-only state, files outside `/opt/data` that root happens to own), opt out per invocation:

```sh
docker exec -e ZED_DOCKER_EXEC_AS_ROOT=1 zed <cmd>
```

The shim accepts `1` / `true` / `yes` (case-insensitive). Anything else â€” including typos like `=0` â€” falls through to the drop, so silent opt-outs aren't possible. If `s6-setuidgid` isn't available (custom builds that stripped s6-overlay), the shim refuses to run as root and exits 126 instead, surfacing the broken privilege model loudly rather than regressing to the historical footgun where `docker exec zed login` would write `auth.json` as `root:root` and break the supervised gateway's auth on every chat platform message.

### Per-profile gateway supervision

Each profile created with `zed profile create <name>` automatically gets an s6-supervised gateway service registered at `/run/service/gateway-<name>/`, with state-persistent auto-restart across container restarts. See [Multi-profile support](#multi-profile-support) above for the user-facing workflow and the lifecycle commands.

**Supervision benefits over the pre-s6 image:**

- Gateway crashes are auto-restarted by `s6-supervise` after a ~1s backoff.
- Dashboard, when enabled with `ZED_DASHBOARD=1`, is supervised on the same supervision tree and gets the same auto-restart treatment.
- `docker restart`, image upgrades (`docker compose up -d --force-recreate`), and unexpected exits preserve running gateways: the cont-init reconciler reads `$ZED_HOME/profiles/<name>/gateway_state.json` and brings the slot back up if the last recorded state was `running`. Only an explicit `zed gateway stop` records `stopped` and keeps the gateway down across the restart; the container/s6 SIGTERM sent on a restart or upgrade is treated as "still running" and auto-starts.
- Per-profile gateway logs persist under `$ZED_HOME/logs/gateways/<profile>/current` (rotated by `s6-log`), and the reconciler's actions are appended to `$ZED_HOME/logs/container-boot.log` per boot. See [Where the logs go](#where-the-logs-go) for the full routing map.

`zed status` inside the container reports `Manager: s6 (container supervisor)`. Use `/command/s6-svstat /run/service/gateway-<name>` for the raw supervisor view (note `/command/` is on PATH for supervision-tree processes only; pass the absolute path when calling from `docker exec`).

## Upgrading

Pull the latest image and recreate the container. Your data directory is
preserved, and the container runs non-interactive config-schema migrations
against the mounted `$ZED_HOME/config.yaml` before starting the gateway.
When a migration is needed, Zed writes timestamped backups next to
`config.yaml` and `.env` first.

```sh
docker pull zedteam/zed-agent:latest
docker rm -f zed
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent gateway run
```

Or with Docker Compose:

```sh
docker compose pull
docker compose up -d
```

Set `ZED_SKIP_CONFIG_MIGRATION=1` only if you need to inspect or migrate the
persisted config manually before letting the new image rewrite it.

## Skills and credential files

When using Docker as the execution environment (not the methods above, but when the agent runs commands inside a Docker sandbox â€” see [Configuration â†’ Docker Backend](./configuration.md#docker-backend)), Zed reuses a single long-lived container for all tool calls and automatically bind-mounts the skills directory (`~/.zed/skills/`) and any credential files declared by skills into that container as read-only volumes. Skill scripts, templates, and references are available inside the sandbox without manual configuration, and because the container persists for the life of the Zed process, any dependencies you install or files you write stay around for the next tool call.

The same syncing happens for SSH and Modal backends â€” skills and credential files are uploaded via rsync or the Modal mount API before each command.

## Installing more tools in the container

The official image ships with a curated set of utilities (see [What the Dockerfile does](#what-the-dockerfile-does)), but not every tool an agent might want is preinstalled. There are five recommended approaches, in increasing order of effort and durability.

### npm or Python tools â€” use `npx` or `uvx`

For any tool published to npm or PyPI, instruct Zed to run it via `npx` (npm) or `uvx` (Python) and to remember that command in its persistent memory. If the tool needs a config file or credentials, instruct it to drop those under `/opt/data` (e.g. `/opt/data/<tool>/config.yaml`).

Dependencies are fetched on demand and cached for the life of the container. Configuration written under `/opt/data` survives container restarts because it lives on the bind-mounted host directory. The package cache itself is rebuilt after a `docker rm`, but `npx` and `uvx` re-fetch transparently the next time the tool runs.

### Other tools (apt packages, binaries) â€” install and remember

For anything outside npm or PyPI â€” `apt` packages, prebuilt binaries, language runtimes not already in the image â€” instruct Zed how to install it (e.g. `apt-get update && apt-get install -y <package>`) and tell it to remember the install command. The tool persists for the rest of the container's lifetime, and Zed will re-run the install command after a container restart when it next needs the tool.

This is a good fit for tools that are quick to install and used occasionally. For tools used constantly, prefer the next approach.

### Durable installs â€” build a derived image

When a tool must be available immediately on every container start with no re-install delay, build a new image that inherits from `zedteam/zed-agent` and installs the tool in a layer:

```dockerfile
FROM zedteam/zed-agent:latest

USER root
RUN apt-get update \
    && apt-get install -y --no-install-recommends <your-package> \
    && rm -rf /var/lib/apt/lists/*
USER zed
```

Build it and use it in place of the official image:

```sh
docker build -t my-zed:latest .
docker run -d \
  --name zed \
  --restart unless-stopped \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  my-zed:latest gateway run
```

The entrypoint script and `/opt/data` semantics are inherited unchanged, so the rest of this page still applies. Remember to rebuild the image when pulling a newer upstream `zedteam/zed-agent`.

### Complex tools or multi-service stacks â€” run a sidecar container

For tools that bring their own service (a database, a web server, a queue, a headless browser farm) or that are too heavy to live inside the Zed container, run them as a separate container on a shared Docker network. Zed reaches the sidecar by container name, the same way it reaches a local inference server (see [Connecting to local inference servers](#connecting-to-local-inference-servers-vllm-ollama-etc)).

```yaml
services:
  zed:
    image: zedteam/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed:/opt/data
    networks:
      - zed-net

  my-tool:
    image: example/my-tool:latest
    container_name: my-tool
    restart: unless-stopped
    networks:
      - zed-net

networks:
  zed-net:
    driver: bridge
```

From inside the Zed container, the sidecar is reachable at `http://my-tool:<port>` (or whatever protocol it serves). This pattern keeps each service's lifecycle, resource limits, and upgrade cadence independent, and avoids bloating the Zed image with dependencies that are only needed by one tool.

### Broadly useful tools â€” open an issue or pull request

If a tool is likely to be useful to most Zed Agent users, consider contributing it upstream rather than carrying it in a private derived image. Open an issue or pull request on the [zed-agent repository](https://github.com/zedteam/zed-agent) describing the tool and its use case. Tools that get bundled into the official image benefit every user and avoid the maintenance overhead of a downstream fork.

## Connecting to local inference servers (vLLM, Ollama, etc.)

When running Zed in Docker and your inference server (vLLM, Ollama, text-generation-inference, etc.) is also running on the host or in another container, networking requires extra attention.

### Docker Compose (recommended)

Put both services on the same Docker network. This is the most reliable approach:

```yaml
services:
  vllm:
    image: vllm/vllm-openai:latest
    container_name: vllm
    command: >
      --model Qwen/Qwen2.5-7B-Instruct
      --served-model-name my-model
      --host 0.0.0.0
      --port 8000
    ports:
      - "8000:8000"
    networks:
      - zed-net
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]

  zed:
    image: zedteam/zed-agent:latest
    container_name: zed
    restart: unless-stopped
    command: gateway run
    ports:
      - "8642:8642"
    volumes:
      - ~/.zed:/opt/data
    networks:
      - zed-net

networks:
  zed-net:
    driver: bridge
```

Then in your `~/.zed/config.yaml`, use the **container name** as the hostname:

```yaml
model:
  provider: custom
  model: my-model
  base_url: http://vllm:8000/v1
  api_key: "none"
```

:::tip Key points
- Use the **container name** (`vllm`) as the hostname â€” not `localhost` or `127.0.0.1`, which refer to the Zed container itself.
- The `model` value must match the `--served-model-name` you passed to vLLM.
- Set `api_key` to any non-empty string (vLLM requires the header but doesn't validate it by default).
- Do **not** include a trailing slash in `base_url`.
:::

### Standalone Docker run (no Compose)

If your inference server runs directly on the host (not in Docker), use `host.docker.internal` on macOS/Windows, or `--network host` on Linux:

**macOS / Windows:**

```sh
docker run -d \
  --name zed \
  -v ~/.zed:/opt/data \
  -p 8642:8642 \
  zedteam/zed-agent gateway run
```

```yaml
# config.yaml
model:
  provider: custom
  model: my-model
  base_url: http://host.docker.internal:8000/v1
  api_key: "none"
```

**Linux (host networking):**

```sh
docker run -d \
  --name zed \
  --network host \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent gateway run
```

```yaml
# config.yaml
model:
  provider: custom
  model: my-model
  base_url: http://127.0.0.1:8000/v1
  api_key: "none"
```

:::warning With `--network host`, the `-p` flag is ignored â€” all container ports are directly exposed on the host.
:::

### Verifying connectivity

From inside the Zed container, confirm the inference server is reachable:

```sh
docker exec zed curl -s http://vllm:8000/v1/models
```

You should see a JSON response listing your served model. If this fails, check:

1. Both containers are on the same Docker network (`docker network inspect zed-net`)
2. The inference server is listening on `0.0.0.0`, not `127.0.0.1`
3. The port number matches

### Ollama

Ollama works the same way. If Ollama runs on the host, use `host.docker.internal:11434` (macOS/Windows) or `127.0.0.1:11434` (Linux with `--network host`). If Ollama runs in its own container on the same Docker network:

```yaml
model:
  provider: custom
  model: llama3
  base_url: http://ollama:11434/v1
  api_key: "none"
```

## Troubleshooting

### Container exits immediately

Check logs: `docker logs zed`. Common causes:
- Missing or invalid `.env` file â€” run interactively first to complete setup
- Port conflicts if running with exposed ports

### "Permission denied" errors

The container's stage2 hook drops privileges to the non-root `zed` user (UID 10000) via `s6-setuidgid` inside each supervised service. If your host `~/.zed/` is owned by a different UID, set `ZED_UID`/`ZED_GID` â€” or their `PUID`/`PGID` aliases, for parity with LinuxServer.io and NAS images â€” to match your host user, or ensure the data directory is writable:

```sh
chmod -R 755 ~/.zed
```

On a NAS (UGOS, Synology, unRAID) the data directory is typically a **bind mount** owned by a host UID the container cannot `chown`. Set `PUID`/`PGID` (or `ZED_UID`/`ZED_GID`) to that host user so the runtime runs as the owner of the mount rather than UID 10000:

```sh
docker run -d \
  --name zed \
  -e PUID=1000 -e PGID=10 \
  -v /volume1/docker/zed:/opt/data \
  zedteam/zed-agent gateway run
```

`docker exec zed <cmd>` automatically drops to UID 10000 too â€” see [`docker exec` automatically drops to the `zed` user](#docker-exec-automatically-drops-to-the-zed-user) for details and the per-invocation opt-out.

### Browser tools not working

Playwright needs shared memory. Add `--shm-size=1g` to your Docker run command:

```sh
docker run -d \
  --name zed \
  --shm-size=1g \
  -v ~/.zed:/opt/data \
  zedteam/zed-agent gateway run
```

### Gateway not reconnecting after network issues

The `--restart unless-stopped` flag handles most transient failures. If the gateway is stuck, restart the container:

```sh
docker restart zed
```

### Checking container health

```sh
docker logs --tail 50 zed          # Recent logs
docker run -it --rm zedteam/zed-agent:latest version     # Verify version
docker stats zed                    # Resource usage
```
