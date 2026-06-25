---
sidebar_position: 18
---

# Photon iMessage

Connect Zed to **iMessage** through [Photon][photon], a managed
service that handles the Apple line allocation and abuse-prevention
layer so you don't have to run your own Mac relay.

The free tier uses Photon's shared iMessage line pool â€” different
recipients may see different sending numbers, but each conversation
stays stable. The paid Business tier gives every user the same
dedicated number; the plugin supports both, and the free tier is the
recommended starting point.

:::info Free to start
Photon's shared-line pool is free. No subscription is required to send
your first iMessage from Zed â€” just a phone number we can bind to
your account.
:::

## Architecture

Photon is a **persistent-connection** channel, like Discord or Slack â€”
**no webhook, no public URL, no signing secret to manage.**

The `spectrum-ts` SDK holds a long-lived **gRPC stream** to Photon for
both directions. Because the SDK is TypeScript-only, Zed runs it in a
small supervised **Node sidecar** and talks to it over loopback:

- **Inbound** â€” the sidecar consumes the SDK's `app.messages` gRPC
  stream and forwards each message to the Python adapter over a loopback
  `GET /inbound` (NDJSON). The adapter dedupes and dispatches it to the
  agent, reconnecting automatically if the stream drops.
- **Outbound** â€” replies are loopback POSTs to the sidecar, which calls
  `space.send(...)` on the SDK.

The Python plugin starts, supervises, and shuts down the sidecar
automatically.

## Prerequisites

- A Photon account â€” sign up at [app.photon.codes][app]
- **Node.js 18.17 or newer** on PATH (`node --version`)
- A phone number that can receive iMessage (used to bind your account)

That's it â€” there is no public URL or tunnel to set up.

## First-time setup

Either run the unified gateway wizard and pick **Photon iMessage**:

```bash
zed gateway setup
```

â€¦or run the Photon setup directly (the wizard calls the same flow):

```bash
# Device-code login + project + user + sidecar deps, all in one
zed photon setup --phone +15551234567
```

The setup, in order:

1. **Device login** (`client_id=photon-cli`) â€” opens
   `https://app.photon.codes/` for approval and stores the bearer token.
2. **Finds or creates** the `Zed Agent` project on your account.
3. **Enables Spectrum**, reads the project's Spectrum id, and rotates
   the project secret.
4. **Registers your phone number** as a Spectrum user â€” skipped if a
   user with that number already exists, so re-running is safe.
5. **Prints your assigned iMessage line** â€” the number you text to reach
   your agent.
6. **Runs `npm install`** inside the plugin's sidecar directory.

Runtime credentials are written to `~/.zed/.env`
(`PHOTON_PROJECT_ID` = the Spectrum project id, `PHOTON_PROJECT_SECRET`),
the same place every other channel keeps its token. Management metadata
(device token, dashboard project id) lives in `~/.zed/auth.json` under
`credential_pool.photon` / `credential_pool.photon_project`.

## Authorizing users

Photon uses the same authorization model as every other Zed
channel. Choose one approach:

**DM pairing (default).** When an unknown number messages your Photon
line, Zed replies with a pairing code. Approve it with:

```bash
zed pairing approve photon <CODE>
```

Use `zed pairing list` to see pending codes and approved users.

**Pre-authorize specific numbers** (in `~/.zed/.env`):

```bash
PHOTON_ALLOWED_USERS=+15551234567,+15559876543
```

**Open access** (dev only, in `~/.zed/.env`):

```bash
PHOTON_ALLOW_ALL_USERS=true
```

When `PHOTON_ALLOWED_USERS` is set, unknown senders are silently
ignored rather than offered a pairing code (the allowlist signals you
deliberately restricted access).

### Require mentions in group chats

By default Zed responds to every authorized DM and group message.
To make group chats opt-in, enable mention gating (DMs still always
work):

```yaml
gateway:
  platforms:
    photon:
      enabled: true
      require_mention: true
```

With `require_mention: true`, group-chat messages are ignored unless
they match a wake-word pattern. The defaults match `Zed` and
`@Zed agent` variants. For a custom agent name, set regex patterns:

```yaml
gateway:
  platforms:
    photon:
      require_mention: true
      mention_patterns:
        - '(?<![\w@])@?amos\b[,:\-]?'
```

Both keys also accept env vars (`PHOTON_REQUIRE_MENTION`,
`PHOTON_MENTION_PATTERNS`). This is the same mention-gating model the
BlueBubbles iMessage channel uses.

## Start the gateway

```bash
zed gateway start
```

You'll see something like:

```
[photon] connected â€” sidecar on 127.0.0.1:8789, streaming inbound over gRPC
```

Send an iMessage to your assigned number and Zed will reply.

## Status & troubleshooting

```bash
zed photon status
```

Prints saved credentials, sidecar health, your registered number, and the
assigned iMessage line Zed uses. When a Photon token and dashboard project
are available, `status` refreshes missing number rows from the dashboard
without provisioning new lines.

```
Photon iMessage status
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  device token        : âœ“ stored
  dashboard project   : 3c90c3cc-0d44-4b50-...
  spectrum project id : sp-...
  project secret      : âœ“ stored
  my number           : +15551234567
  assigned number     : +16282679185
  node binary         : /usr/bin/node
  sidecar deps        : âœ“ installed
```

Common issues:

- **`sidecar deps : âœ— run zed photon install-sidecar`** â€” Node is
  installed but `spectrum-ts` isn't. Run the suggested command.
- **`device token : âœ— missing`** â€” run `zed photon setup` to log in.
- **`No iMessage line assigned yet`** â€” Spectrum is enabled but no line
  has been provisioned; re-run `zed photon setup` or check the
  [dashboard][app].
- **Sidecar won't start** â€” confirm `node --version` is 18.17+ and that
  `zed photon install-sidecar` completed without errors.

## Limits today

- **Inbound attachments are metadata-only.** Inbound events carry the
  filename + MIME type; the agent sees a marker but can't yet read the
  bytes. The SDK exposes attachment bytes via `content.read()`, so this
  is a sidecar follow-up.
- **Outbound attachments are supported.** Zed sends images, voice
  notes, video, and documents through spectrum-ts' `attachment()` /
  `voice()` content builders via the sidecar's `/send-attachment`
  endpoint. Captions arrive as a separate iMessage bubble after the
  media.
- **Photon's free quotas:** 5,000 messages per server per day,
  50 new-conversation initiations per shared line per day. Increases
  available â€” email `help@photon.codes`.

## Env vars

| Variable                  | Default            | Notes                                      |
|---------------------------|--------------------|--------------------------------------------|
| `PHOTON_PROJECT_ID`       | from `.env`        | Spectrum project id (the SDK's `projectId`); set by setup |
| `PHOTON_PROJECT_SECRET`   | from `.env`        | Project secret; set by setup               |
| `PHOTON_SIDECAR_PORT`     | `8789`             | Loopback port for the sidecar control + inbound channel |
| `PHOTON_SIDECAR_AUTOSTART`| `true`             | Whether the adapter spawns the sidecar     |
| `PHOTON_NODE_BIN`         | `which node`       | Override the Node binary path              |
| `PHOTON_HOME_CHANNEL`     | (unset)            | Default space id for cron / notifications  |
| `PHOTON_HOME_CHANNEL_NAME`| (unset)            | Human label for the home channel           |
| `PHOTON_ALLOWED_USERS`    | (unset)            | Comma-separated E.164 allowlist            |
| `PHOTON_ALLOW_ALL_USERS`  | `false`            | Dev only â€” accept any sender               |
| `PHOTON_REQUIRE_MENTION`  | `false`            | Require a wake word before responding in groups |
| `PHOTON_MENTION_PATTERNS` | Zed wake words  | JSON list / comma / newline regex patterns for group mentions |
| `PHOTON_DASHBOARD_HOST`   | `app.photon.codes` | Override the dashboard / device-login host |
| `PHOTON_SPECTRUM_HOST`    | `spectrum.photon.codes` | Override the Spectrum API host |

[photon]: https://photon.codes/
[app]: https://app.photon.codes/
