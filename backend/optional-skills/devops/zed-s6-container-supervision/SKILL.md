---
name: zed-s6-container-supervision
description: Modify, debug, or extend the s6-overlay supervision tree inside the Zed Agent Docker image â€” adding new services, debugging profile gateways, understanding the Architecture B main-program pattern.
version: 1.0.0
author: Zed Agent
license: MIT
platforms: [linux]
environments: [s6]
metadata:
  zed:
    tags: [docker, s6, supervision, gateway, profiles]
    related_skills: [zed-agent, zed-agent-dev]
---

# Zed s6-overlay Container Supervision

## When to use this skill

Load this skill when you're working on:
- Adding or removing a static service in the Zed Docker image (something that should be supervised at every container start, like the dashboard)
- Diagnosing why a per-profile gateway isn't starting, restarting, or surviving `docker restart`
- Understanding why the container's CMD is `/opt/zed/docker/main-wrapper.sh` and how leading-dash args reach the user's program
- Modifying `cont-init.d` boot scripts (UID remap, volume seeding, profile reconciliation)
- Changing the rendered run-script for per-profile gateways (Phase 4)

If you're just running the Zed Agent and want to use Docker, see `website/docs/user-guide/docker.md` instead.

## Architecture at a glance

```
/init                                  â† PID 1 (s6-overlay v3.2.3.0)
â”œâ”€â”€ cont-init.d                        â† oneshot setup, runs as root
â”‚   â”œâ”€â”€ 01-zed-setup                â† docker/stage2-hook.sh
â”‚   â”‚   â”œâ”€â”€ UID/GID remap
â”‚   â”‚   â”œâ”€â”€ chown /opt/data
â”‚   â”‚   â”œâ”€â”€ chown /opt/data/profiles (every boot)
â”‚   â”‚   â”œâ”€â”€ seed .env / config.yaml / SOUL.md
â”‚   â”‚   â””â”€â”€ skills_sync.py
â”‚   â””â”€â”€ 02-reconcile-profiles          â† zed_cli.container_boot
â”‚       â”œâ”€â”€ chown /run/service (zed-writable for runtime register)
â”‚       â””â”€â”€ walk $ZED_HOME/profiles/<name>/gateway_state.json
â”‚           â†’ recreate /run/service/gateway-<name>/
â”‚           â†’ auto-start only those with prior_state == "running"
â”‚
â”œâ”€â”€ s6-rc.d (static services, in /etc/s6-overlay/s6-rc.d/)
â”‚   â”œâ”€â”€ main-zed/run                â† exec sleep infinity (no-op slot)
â”‚   â””â”€â”€ dashboard/run                  â† if ZED_DASHBOARD=1, runs `zed dashboard`
â”‚
â”œâ”€â”€ /run/service (s6-svscan watches; tmpfs)
â”‚   â”œâ”€â”€ gateway-coder/                 â† runtime-registered per-profile
â”‚   â”‚   â”œâ”€â”€ type        ("longrun")
â”‚   â”‚   â”œâ”€â”€ run         ("#!/command/with-contenv sh ... exec s6-setuidgid zed zed -p coder gateway run")
â”‚   â”‚   â”œâ”€â”€ down        (marker â€” present means "registered but don't auto-start")
â”‚   â”‚   â””â”€â”€ log/run     (s6-log â†’ $ZED_HOME/logs/gateways/coder/current)
â”‚   â””â”€â”€ ...
â”‚
â””â”€â”€ CMD ("main program")               â† /opt/zed/docker/main-wrapper.sh
    â””â”€â”€ routes user args: bare exec | zed subcommand | zed (no args)
        â€” exec'd by /init with stdin/stdout/stderr inherited (TTY for --tui)
```

## Key files

| Path | Role |
|---|---|
| `Dockerfile` | s6-overlay install + cont-init.d wiring + `ENTRYPOINT ["/init", "/opt/zed/docker/main-wrapper.sh"]` |
| `docker/stage2-hook.sh` | The "old entrypoint logic" â€” UID remap, chown, seed, skills sync. Runs as cont-init.d/01-zed-setup. |
| `docker/cont-init.d/02-reconcile-profiles` | Calls `zed_cli.container_boot` on every boot to restore profile gateway slots from the persistent volume. |
| `docker/main-wrapper.sh` | The container's CMD. Routes user args, drops to zed via `s6-setuidgid`, exec's the chosen program. |
| `docker/s6-rc.d/main-zed/run` | No-op `sleep infinity` â€” slot exists so the s6-rc user bundle is valid; main zed runs as the CMD, not as a supervised service. |
| `docker/s6-rc.d/dashboard/run` | Conditional service â€” `exec sleep infinity` unless `ZED_DASHBOARD` is truthy. |
| `docker/entrypoint.sh` | Back-compat shim that `exec`s the stage2 hook. External scripts that hard-coded the old entrypoint path still work. |
| `zed_cli/service_manager.py` | `S6ServiceManager`: `register_profile_gateway`, `unregister_profile_gateway`, `start/stop/restart/is_running`, `list_profile_gateways`. |
| `zed_cli/container_boot.py` | `reconcile_profile_gateways()` â€” walks persistent profiles, regenerates s6 slots, emits `container-boot.log`. |
| `zed_cli/gateway.py::_dispatch_via_service_manager_if_s6` | Intercepts `zed gateway start/stop/restart` and routes to s6 when running in a container. |

## Why Architecture B (CMD as main program, not s6-supervised)

The original plan (v1â€“v3) called for main zed to run as a supervised s6-rc service. Two real s6-overlay v3 mechanics blocked that:

1. **cont-init.d scripts receive no CMD args** â€” so the stage2 hook can't parse `docker run <image> chat -q "hi"` to set `ZED_ARGS` for a service `run` script to consume.
2. **`/run/s6/basedir/bin/halt` does NOT propagate the exit code** written to `/run/s6-linux-init-container-results/exitcode`. Containers always exit 143 (SIGTERM) regardless. Confirmed by skarnet (s6 author) in [issue #477](https://github.com/just-containers/s6-overlay/issues/477): _"if you want a container shutdown, you need to either have your CMD exit, or, if you have no CMD, write the container exit code you want then call halt"_.

So we use the s6-overlay-native CMD pattern: `ENTRYPOINT ["/init", "/opt/zed/docker/main-wrapper.sh"]`. /init prepends the wrapper to user args automatically â€” so `docker run <image> --version` becomes `/init main-wrapper.sh --version`, and `--version` doesn't get intercepted by /init's POSIX shell. The wrapper drops to zed via `s6-setuidgid`, then exec's the chosen program. The program's exit code becomes the container exit code, exactly matching the pre-s6 tini contract.

Trade-off: main zed is unsupervised under s6. That exactly matches its behavior under tini (the pre-s6 image). Dashboard supervision is the only **new** guarantee â€” and per-profile gateways under `/run/service/` get full supervision.

## Quick recipes

### Verify s6 is PID 1 in a running container

```sh
docker exec <c> sh -c 'cat /proc/1/comm; readlink /proc/1/exe'
# Expect: s6-svscan or init / /package/admin/s6/.../s6-svscan
```

### Inspect a profile gateway service

```sh
# /command/ isn't on docker-exec PATH â€” use absolute path
docker exec <c> /command/s6-svstat /run/service/gateway-<name>
# "up (pid â€¦) â€¦ seconds"            â†’ running
# "down (exitcode N) â€¦ seconds, normally up, want up, â€¦" â†’ s6 wants it up but the process keeps exiting (crash loop)
# "down â€¦ normally up, ready â€¦"     â†’ user stopped it
```

### Bring a service up/down manually

```sh
docker exec <c> /command/s6-svc -u /run/service/gateway-<name>   # up
docker exec <c> /command/s6-svc -d /run/service/gateway-<name>   # down
docker exec <c> /command/s6-svc -t /run/service/gateway-<name>   # SIGTERM (restart)
```

### Watch the cont-init reconciler log

```sh
docker exec <c> tail -n 50 /opt/data/logs/container-boot.log
# 2026-05-21T06:18:05+0000 profile=coder prior_state=running action=started
# 2026-05-21T06:18:05+0000 profile=writer prior_state=stopped action=registered
```

### Add a new static service

1. Create `docker/s6-rc.d/<name>/type` with `longrun\n` and `docker/s6-rc.d/<name>/run` (use `#!/command/with-contenv sh` + `# shellcheck shell=sh`).
2. Drop to zed via `s6-setuidgid zed` at the top of run (unless you specifically need root).
3. Create empty `docker/s6-rc.d/<name>/dependencies.d/base` so it waits for the base bundle.
4. Create empty `docker/s6-rc.d/user/contents.d/<name>` so it joins the user bundle.
5. The `COPY docker/s6-rc.d/` in the Dockerfile picks it up automatically â€” no other changes.

### Change the per-profile gateway run command

Edit `S6ServiceManager._render_run_script` in `zed_cli/service_manager.py`. The function is also called by `zed_cli/container_boot.py::_register_service` during boot reconciliation, so it's the single source of truth. Update the corresponding assertion in `tests/zed_cli/test_service_manager.py::test_s6_register_creates_service_dir_and_triggers_scan`.

### Run the docker test harness

```sh
docker build -t zed-agent-harness:latest .
ZED_TEST_IMAGE=zed-agent-harness:latest scripts/run_tests.sh tests/docker/ -v
# Expect 19 passed, 0 xfailed against the s6 image
```

The harness lives in `tests/docker/` and skips when Docker isn't available. The per-test timeout is bumped to 180s (see `tests/docker/conftest.py`).

## Common pitfalls

### "command not found" via `docker exec`

`/command/` (where s6-overlay puts its binaries) is on PATH only for processes spawned by the supervision tree â€” services, cont-init.d, main-wrapper.sh. `docker exec <c> s6-svstat â€¦` will fail with "command not found"; always use the absolute path `/command/s6-svstat`. The `zed` binary works because the Dockerfile adds `/opt/zed/.venv/bin` to the runtime `ENV PATH`.

### Profile directory ownership

The cont-init reconciler runs as zed (`s6-setuidgid zed` in `02-reconcile-profiles`). If a profile dir ends up root-owned (e.g. because `docker exec <c> zed profile create â€¦` ran as root by default), the reconciler can't read SOUL.md and fails with `PermissionError`. Mitigation: `stage2-hook.sh` chowns `$ZED_HOME/profiles` to zed on **every** boot, idempotently. Don't remove that block.

### Files written by `docker exec` are root-owned

`docker exec` defaults to root. Either pass `--user zed` or rely on the stage2 chown sweep next reboot. Don't write files under `$ZED_HOME/profiles/<name>/` as root manually â€” the next reconcile pass will sweep them but in-flight operations may hit perm errors.

### Service slot exists but s6-svstat says "s6-supervise not running"

The service directory is on tmpfs and was wiped on container restart. Either the cont-init reconciler hasn't run yet (give it a moment after `docker restart`) or it failed. Check `docker logs <c> | grep '02-reconcile'`.

### Gateway starts then immediately exits (`down (exitcode 1)` in svstat)

Most likely the profile has no model or auth configured. The service slot is correct â€” the gateway itself is unconfigured. Run `zed -p <profile> setup` first. The s6 supervisor will keep restarting it; that's the desired behavior (when you fix the config, the next attempt succeeds and stays up).

### Reconciler skipped a profile

The reconciler keys on the **presence of `SOUL.md`** as the "real profile" marker. `zed profile create` always seeds it. If a profile dir is missing SOUL.md (stray directory, partial restore, backup-in-progress), the reconciler skips it intentionally. Add a `SOUL.md` (even empty) to opt back in.

### "Help, the container exits 143!"

Check whether something is invoking `s6-svscanctl -t` or `/run/s6/basedir/bin/halt` â€” both cause /init to begin stage 3 shutdown but return 143 (SIGTERM) rather than the desired exit code. This was the Phase 2 architecture pivot from A to B. For container shutdown with a real exit code, you must let the CMD (main-wrapper.sh) exit normally; do **not** try to control exit from a finish script.

## Related skills

- `zed-agent-dev`: General zed-agent codebase navigation
- `zed-tool-quirks`: Specific Zed-tool workarounds (sed/grep/etc.) â€” load when debugging the s6 stack's interaction with zed built-in tools.
