# Langfuse Observability Plugin

This plugin ships bundled with Zed but is **opt-in** â€” it only loads when
you explicitly enable it.

## Enable

Pick one:

```bash
# Interactive: walks you through credentials + SDK install + enable
zed tools  # â†’ Langfuse Observability

# Manual
pip install langfuse
zed plugins enable observability/langfuse
```

## Required credentials

Set these in `~/.zed/.env` (or via `zed tools`):

```bash
ZED_LANGFUSE_PUBLIC_KEY=pk-lf-...
ZED_LANGFUSE_SECRET_KEY=sk-lf-...
ZED_LANGFUSE_BASE_URL=https://cloud.langfuse.com   # or your self-hosted URL
```

Without the SDK or credentials the hooks no-op silently â€” the plugin fails
open.

## Verify

```bash
zed plugins list                 # observability/langfuse should show "enabled"
zed chat -q "hello"              # then check Langfuse for a "Zed turn" trace
```

## Optional tuning

```bash
ZED_LANGFUSE_ENV=production       # environment tag
ZED_LANGFUSE_RELEASE=v1.0.0       # release tag
ZED_LANGFUSE_SAMPLE_RATE=0.5      # sample 50% of traces
ZED_LANGFUSE_MAX_CHARS=12000      # max chars per field (default: 12000)
ZED_LANGFUSE_DEBUG=true           # verbose plugin logging
```

## Disable

```bash
zed plugins disable observability/langfuse
```
