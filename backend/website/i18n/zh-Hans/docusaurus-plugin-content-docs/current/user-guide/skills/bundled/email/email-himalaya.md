---
title: "Himalaya â€” Himalaya CLI: IMAP/SMTP email from terminal"
sidebar_label: "Himalaya"
description: "Himalaya CLIï¼šä»Žç»ˆç«¯æ”¶å‘ IMAP/SMTP é‚®ä»¶"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Himalaya

Himalaya CLIï¼šä»Žç»ˆç«¯æ”¶å‘ IMAP/SMTP é‚®ä»¶ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/email/himalaya` |
| ç‰ˆæœ¬ | `1.1.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Email`, `IMAP`, `SMTP`, `CLI`, `Communication` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Himalaya é‚®ä»¶ CLI

Himalaya æ˜¯ä¸€ä¸ª CLI é‚®ä»¶å®¢æˆ·ç«¯ï¼Œæ”¯æŒé€šè¿‡ IMAPã€SMTPã€Notmuch æˆ– Sendmail åŽç«¯ä»Žç»ˆç«¯ç®¡ç†é‚®ä»¶ã€‚

## å‚è€ƒèµ„æ–™

- `references/configuration.md`ï¼ˆé…ç½®æ–‡ä»¶è®¾ç½® + IMAP/SMTP è®¤è¯ï¼‰
- `references/message-composition.md`ï¼ˆç”¨äºŽæ’°å†™é‚®ä»¶çš„ MML è¯­æ³•ï¼‰

## å‰ç½®æ¡ä»¶

1. å·²å®‰è£… Himalaya CLIï¼ˆè¿è¡Œ `himalaya --version` éªŒè¯ï¼‰
2. é…ç½®æ–‡ä»¶ä½äºŽ `~/.config/himalaya/config.toml`
3. å·²é…ç½® IMAP/SMTP å‡­æ®ï¼ˆå¯†ç å®‰å…¨å­˜å‚¨ï¼‰

### å®‰è£…

```bash
# é¢„ç¼–è¯‘äºŒè¿›åˆ¶ï¼ˆLinux/macOS â€” æŽ¨èï¼‰
curl -sSL https://raw.githubusercontent.com/pimalaya/himalaya/master/install.sh | PREFIX=~/.local sh

# macOS é€šè¿‡ Homebrew
brew install himalaya

# æˆ–é€šè¿‡ cargoï¼ˆä»»ä½•æ”¯æŒ Rust çš„å¹³å°ï¼‰
cargo install himalaya --locked
```

## é…ç½®è®¾ç½®

è¿è¡Œäº¤äº’å¼å‘å¯¼ä»¥è®¾ç½®è´¦æˆ·ï¼š

```bash
himalaya account configure
```

æˆ–æ‰‹åŠ¨åˆ›å»º `~/.config/himalaya/config.toml`ï¼š

```toml
[accounts.personal]
email = "you@example.com"
display-name = "Your Name"
default = true

backend.type = "imap"
backend.host = "imap.example.com"
backend.port = 993
backend.encryption.type = "tls"
backend.login = "you@example.com"
backend.auth.type = "password"
backend.auth.cmd = "pass show email/imap"  # or use keyring

message.send.backend.type = "smtp"
message.send.backend.host = "smtp.example.com"
message.send.backend.port = 587
message.send.backend.encryption.type = "start-tls"
message.send.backend.login = "you@example.com"
message.send.backend.auth.type = "password"
message.send.backend.auth.cmd = "pass show email/smtp"

# Folder aliases (himalaya v1.2.0+ syntax). Required whenever the
# server's folder names don't match himalaya's canonical names
# (inbox/sent/drafts/trash). Gmail is the common case â€” see
# `references/configuration.md` for the `[Gmail]/Sent Mail` mapping.
folder.aliases.inbox = "INBOX"
folder.aliases.sent = "Sent"
folder.aliases.drafts = "Drafts"
folder.aliases.trash = "Trash"
```

> **å…³äºŽåˆ«åè¯­æ³•çš„æ³¨æ„äº‹é¡¹ã€‚** v1.2.0 ä¹‹å‰çš„æ–‡æ¡£ä½¿ç”¨ `[accounts.NAME.folder.alias]` å­èŠ‚ï¼ˆå•æ•° `alias`ï¼‰ã€‚v1.2.0 ä¼šé™é»˜å¿½ç•¥è¯¥å½¢å¼â€”â€”TOML è§£æžæ­£å¸¸ï¼Œä½†åˆ«åè§£æžå™¨ä»Žä¸è¯»å–å®ƒï¼Œå› æ­¤æ¯æ¬¡æŸ¥æ‰¾éƒ½ä¼šå›žé€€åˆ°è§„èŒƒåç§°ã€‚åœ¨ Gmail ä¸Šï¼Œè¿™æ„å‘³ç€ SMTP æŠ•é€’æˆåŠŸ*ä¹‹åŽ*ä¿å­˜åˆ°å·²å‘é€æ–‡ä»¶å¤¹ä¼šå¤±è´¥ï¼Œä¸” `himalaya message send` ä»¥éžé›¶çŠ¶æ€é€€å‡ºã€‚ä»»ä½•åœ¨è¯¥é€€å‡ºç ä¸Šé‡è¯•çš„è°ƒç”¨æ–¹ï¼ˆagentã€è„šæœ¬ã€ç”¨æˆ·ï¼‰éƒ½ä¼šé‡æ–°æ‰§è¡Œæ•´ä¸ªå‘é€æµç¨‹â€”â€”åŒ…æ‹¬ SMTPâ€”â€”ä»Žè€Œå‘æ”¶ä»¶äººäº§ç”Ÿé‡å¤é‚®ä»¶ã€‚è¯·å§‹ç»ˆä½¿ç”¨ `folder.aliases.X`ï¼ˆå¤æ•°ã€ç‚¹åˆ†é”®ï¼Œç›´æŽ¥ä½äºŽ `[accounts.NAME]` ä¸‹ï¼‰ã€‚

## Zed é›†æˆè¯´æ˜Ž

- **è¯»å–ã€åˆ—å‡ºã€æœç´¢ã€ç§»åŠ¨ã€åˆ é™¤**å‡å¯ç›´æŽ¥é€šè¿‡ç»ˆç«¯å·¥å…·å®Œæˆ
- **æ’°å†™/å›žå¤/è½¬å‘**â€”â€”æŽ¨èä½¿ç”¨ç®¡é“è¾“å…¥ï¼ˆ`cat << EOF | himalaya template send`ï¼‰ä»¥ç¡®ä¿å¯é æ€§ã€‚äº¤äº’å¼ `$EDITOR` æ¨¡å¼å¯é…åˆ `pty=true` + åŽå° + è¿›ç¨‹å·¥å…·ä½¿ç”¨ï¼Œä½†éœ€è¦äº†è§£ç¼–è¾‘å™¨åŠå…¶å‘½ä»¤
- ä½¿ç”¨ `--output json` èŽ·å–ç»“æž„åŒ–è¾“å‡ºï¼Œä¾¿äºŽç¨‹åºåŒ–è§£æž
- `himalaya account configure` å‘å¯¼éœ€è¦äº¤äº’å¼è¾“å…¥â€”â€”è¯·ä½¿ç”¨ PTY æ¨¡å¼ï¼š`terminal(command="himalaya account configure", pty=true)`

## å¸¸ç”¨æ“ä½œ

### åˆ—å‡ºæ–‡ä»¶å¤¹

```bash
himalaya folder list
```

### åˆ—å‡ºé‚®ä»¶

åˆ—å‡º INBOX ä¸­çš„é‚®ä»¶ï¼ˆé»˜è®¤ï¼‰ï¼š

```bash
himalaya envelope list
```

åˆ—å‡ºæŒ‡å®šæ–‡ä»¶å¤¹ä¸­çš„é‚®ä»¶ï¼š

```bash
himalaya envelope list --folder "Sent"
```

åˆ†é¡µåˆ—å‡ºï¼š

```bash
himalaya envelope list --page 1 --page-size 20
```

### æœç´¢é‚®ä»¶

```bash
himalaya envelope list from john@example.com subject meeting
```

### é˜…è¯»é‚®ä»¶

æŒ‰ ID é˜…è¯»é‚®ä»¶ï¼ˆæ˜¾ç¤ºçº¯æ–‡æœ¬ï¼‰ï¼š

```bash
himalaya message read 42
```

å¯¼å‡ºåŽŸå§‹ MIMEï¼š

```bash
himalaya message export 42 --full
```

### å›žå¤é‚®ä»¶

åœ¨ Zed ä¸­éžäº¤äº’å¼å›žå¤ï¼Œè¯·è¯»å–åŽŸå§‹é‚®ä»¶ã€æ’°å†™å›žå¤å¹¶é€šè¿‡ç®¡é“å‘é€ï¼š

```bash
# èŽ·å–å›žå¤æ¨¡æ¿ï¼Œç¼–è¾‘åŽå‘é€
himalaya template reply 42 | sed 's/^$/\nYour reply text here\n/' | himalaya template send
```

æˆ–æ‰‹åŠ¨æž„å»ºå›žå¤ï¼š

```bash
cat << 'EOF' | himalaya template send
From: you@example.com
To: sender@example.com
Subject: Re: Original Subject
In-Reply-To: <original-message-id>

Your reply here.
EOF
```

å…¨éƒ¨å›žå¤ï¼ˆäº¤äº’å¼â€”â€”éœ€è¦ $EDITORï¼Œå»ºè®®æ”¹ç”¨ä¸Šè¿°æ¨¡æ¿æ–¹å¼ï¼‰ï¼š

```bash
himalaya message reply 42 --all
```

### è½¬å‘é‚®ä»¶

```bash
# èŽ·å–è½¬å‘æ¨¡æ¿å¹¶é€šè¿‡ç®¡é“ä¿®æ”¹åŽå‘é€
himalaya template forward 42 | sed 's/^To:.*/To: newrecipient@example.com/' | himalaya template send
```

### æ’°å†™æ–°é‚®ä»¶

**éžäº¤äº’å¼ï¼ˆåœ¨ Zed ä¸­ä½¿ç”¨æ­¤æ–¹å¼ï¼‰**â€”â€”é€šè¿‡ stdin ç®¡é“ä¼ å…¥é‚®ä»¶ï¼š

```bash
cat << 'EOF' | himalaya template send
From: you@example.com
To: recipient@example.com
Subject: Test Message

Hello from Himalaya!
EOF
```

æˆ–ä½¿ç”¨ headers æ ‡å¿—ï¼š

```bash
himalaya message write -H "To:recipient@example.com" -H "Subject:Test" "Message body here"
```

æ³¨æ„ï¼šä¸å¸¦ç®¡é“è¾“å…¥çš„ `himalaya message write` ä¼šæ‰“å¼€ `$EDITOR`ã€‚é…åˆ `pty=true` + åŽå°æ¨¡å¼å¯ä»¥ä½¿ç”¨ï¼Œä½†ç®¡é“æ–¹å¼æ›´ç®€å•å¯é ã€‚

### ç§»åŠ¨/å¤åˆ¶é‚®ä»¶

ç§»åŠ¨åˆ°æ–‡ä»¶å¤¹ï¼š

```bash
himalaya message move 42 "Archive"
```

å¤åˆ¶åˆ°æ–‡ä»¶å¤¹ï¼š

```bash
himalaya message copy 42 "Important"
```

### åˆ é™¤é‚®ä»¶

```bash
himalaya message delete 42
```

### ç®¡ç†æ ‡å¿—

æ·»åŠ æ ‡å¿—ï¼š

```bash
himalaya flag add 42 --flag seen
```

ç§»é™¤æ ‡å¿—ï¼š

```bash
himalaya flag remove 42 --flag seen
```

## å¤šè´¦æˆ·

åˆ—å‡ºè´¦æˆ·ï¼š

```bash
himalaya account list
```

ä½¿ç”¨æŒ‡å®šè´¦æˆ·ï¼š

```bash
himalaya --account work envelope list
```

## é™„ä»¶

ä¿å­˜é‚®ä»¶é™„ä»¶ï¼š

```bash
himalaya attachment download 42
```

ä¿å­˜åˆ°æŒ‡å®šç›®å½•ï¼š

```bash
himalaya attachment download 42 --dir ~/Downloads
```

## è¾“å‡ºæ ¼å¼

å¤§å¤šæ•°å‘½ä»¤æ”¯æŒ `--output` ä»¥èŽ·å–ç»“æž„åŒ–è¾“å‡ºï¼š

```bash
himalaya envelope list --output json
himalaya envelope list --output plain
```

## è°ƒè¯•

å¯ç”¨è°ƒè¯•æ—¥å¿—ï¼š

```bash
RUST_LOG=debug himalaya envelope list
```

å®Œæ•´è¿½è¸ªä¸Žå›žæº¯ï¼š

```bash
RUST_LOG=trace RUST_BACKTRACE=1 himalaya envelope list
```

## æç¤º

- ä½¿ç”¨ `himalaya --help` æˆ– `himalaya <command> --help` æŸ¥çœ‹è¯¦ç»†ç”¨æ³•ã€‚
- æ¶ˆæ¯ ID ç›¸å¯¹äºŽå½“å‰æ–‡ä»¶å¤¹ï¼›åˆ‡æ¢æ–‡ä»¶å¤¹åŽè¯·é‡æ–°åˆ—å‡ºã€‚
- å¦‚éœ€æ’°å†™å¸¦é™„ä»¶çš„å¯Œæ–‡æœ¬é‚®ä»¶ï¼Œè¯·ä½¿ç”¨ MML è¯­æ³•ï¼ˆå‚è§ `references/message-composition.md`ï¼‰ã€‚
- ä½¿ç”¨ `pass`ã€ç³»ç»Ÿå¯†é’¥çŽ¯æˆ–è¾“å‡ºå¯†ç çš„å‘½ä»¤å®‰å…¨å­˜å‚¨å¯†ç ã€‚
