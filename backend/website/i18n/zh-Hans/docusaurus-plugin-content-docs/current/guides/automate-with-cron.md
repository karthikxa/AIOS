---
sidebar_position: 11
title: "ç”¨ Cron è‡ªåŠ¨åŒ–ä¸€åˆ‡"
description: "ä½¿ç”¨ Zed cron çš„çœŸå®žè‡ªåŠ¨åŒ–æ¨¡å¼â€”â€”ç›‘æŽ§ã€æŠ¥å‘Šã€æ•°æ®ç®¡é“ä¸Žå¤šæŠ€èƒ½å·¥ä½œæµ"
---

# ç”¨ Cron è‡ªåŠ¨åŒ–ä¸€åˆ‡

[æ¯æ—¥ç®€æŠ¥æœºå™¨äººæ•™ç¨‹](/guides/daily-briefing-bot)æ¶µç›–äº†åŸºç¡€å†…å®¹ã€‚æœ¬æŒ‡å—æ›´è¿›ä¸€æ­¥â€”â€”äº”ç§çœŸå®žçš„è‡ªåŠ¨åŒ–æ¨¡å¼ï¼Œå¯ç›´æŽ¥æ”¹é€ ç”¨äºŽä½ è‡ªå·±çš„å·¥ä½œæµã€‚

å®Œæ•´åŠŸèƒ½å‚è€ƒè¯·è§ [å®šæ—¶ä»»åŠ¡ï¼ˆCronï¼‰](/user-guide/features/cron)ã€‚

:::info æ ¸å¿ƒæ¦‚å¿µ
Cron ä»»åŠ¡åœ¨å…¨æ–°çš„ agent ä¼šè¯ä¸­è¿è¡Œï¼Œä¸ä¿ç•™å½“å‰å¯¹è¯çš„ä»»ä½•è®°å¿†ã€‚Promptï¼ˆæç¤ºè¯ï¼‰å¿…é¡»**å®Œå…¨è‡ªåŒ…å«**â€”â€”æŠŠ agent éœ€è¦çŸ¥é“çš„ä¸€åˆ‡éƒ½å†™è¿›åŽ»ã€‚
:::

:::tip ä¸éœ€è¦ LLMï¼Ÿä½ æœ‰ä¸¤ç§é›¶ token æ–¹æ¡ˆã€‚
- **å¾ªçŽ¯çœ‹é—¨ç‹—**ï¼šè„šæœ¬æœ¬èº«å·²èƒ½ç”Ÿæˆç²¾ç¡®æ¶ˆæ¯ï¼ˆå†…å­˜å‘Šè­¦ã€ç£ç›˜å‘Šè­¦ã€å¿ƒè·³ï¼‰æ—¶ï¼Œä½¿ç”¨ [çº¯è„šæœ¬ cron ä»»åŠ¡](/guides/cron-script-only)ã€‚ç›¸åŒçš„è°ƒåº¦å™¨ï¼Œæ— éœ€ LLMã€‚ä½ å¯ä»¥åœ¨å¯¹è¯ä¸­è®© Zed å¸®ä½ è®¾ç½®â€”â€”`cronjob` å·¥å…·çŸ¥é“ä½•æ—¶é€‰æ‹© `no_agent=True` å¹¶ä¸ºä½ ç¼–å†™è„šæœ¬ã€‚
- **å·²åœ¨è¿è¡Œçš„è„šæœ¬å‘èµ·çš„ä¸€æ¬¡æ€§é€šçŸ¥**ï¼ˆCI æ­¥éª¤ã€post-commit hookã€éƒ¨ç½²è„šæœ¬ã€å¤–éƒ¨è°ƒåº¦çš„ç›‘æŽ§ï¼‰ï¼šä½¿ç”¨ [`zed send`](/guides/pipe-script-output) å°† stdout æˆ–æ–‡ä»¶ç›´æŽ¥æŽ¨é€åˆ° Telegram / Discord / Slack ç­‰ï¼Œæ— éœ€è®¾ç½® cron æ¡ç›®ã€‚
:::

---

## æ¨¡å¼ä¸€ï¼šç½‘ç«™å˜æ›´ç›‘æŽ§

ç›‘è§†æŸä¸ª URL çš„å˜åŒ–ï¼Œä»…åœ¨å†…å®¹å‘ç”Ÿå˜åŒ–æ—¶å‘é€é€šçŸ¥ã€‚

`script` å‚æ•°æ˜¯è¿™é‡Œçš„ç§˜å¯†æ­¦å™¨ã€‚æ¯æ¬¡æ‰§è¡Œå‰ä¼šå…ˆè¿è¡Œä¸€ä¸ª Python è„šæœ¬ï¼Œå…¶ stdout ä½œä¸ºä¸Šä¸‹æ–‡ä¼ ç»™ agentã€‚è„šæœ¬è´Ÿè´£æœºæ¢°æ€§å·¥ä½œï¼ˆæŠ“å–ã€å¯¹æ¯”å·®å¼‚ï¼‰ï¼›agent è´Ÿè´£æŽ¨ç†ï¼ˆè¿™ä¸ªå˜åŒ–æ˜¯å¦å€¼å¾—å…³æ³¨ï¼Ÿï¼‰ã€‚

åˆ›å»ºç›‘æŽ§è„šæœ¬ï¼š

```bash
mkdir -p ~/.zed/scripts
```

```python title="~/.zed/scripts/watch-site.py"
import hashlib, json, os, urllib.request

URL = "https://example.com/pricing"
STATE_FILE = os.path.expanduser("~/.zed/scripts/.watch-site-state.json")

# Fetch current content
req = urllib.request.Request(URL, headers={"User-Agent": "Zed-Monitor/1.0"})
content = urllib.request.urlopen(req, timeout=30).read().decode()
current_hash = hashlib.sha256(content.encode()).hexdigest()

# Load previous state
prev_hash = None
if os.path.exists(STATE_FILE):
    with open(STATE_FILE) as f:
        prev_hash = json.load(f).get("hash")

# Save current state
with open(STATE_FILE, "w") as f:
    json.dump({"hash": current_hash, "url": URL}, f)

# Output for the agent
if prev_hash and prev_hash != current_hash:
    print(f"CHANGE DETECTED on {URL}")
    print(f"Previous hash: {prev_hash}")
    print(f"Current hash: {current_hash}")
    print(f"\nCurrent content (first 2000 chars):\n{content[:2000]}")
else:
    print("NO_CHANGE")
```

è®¾ç½® cron ä»»åŠ¡ï¼š

```bash
/cron add "every 1h" "If the script output says CHANGE DETECTED, summarize what changed on the page and why it might matter. If it says NO_CHANGE, respond with just [SILENT]." --script ~/.zed/scripts/watch-site.py --name "Pricing monitor" --deliver telegram
```

:::tip `[SILENT]` æŠ€å·§
å½“ agent çš„æœ€ç»ˆå“åº”åŒ…å« `[SILENT]` æ—¶ï¼ŒæŠ•é€’ä¼šè¢«æŠ‘åˆ¶ã€‚è¿™æ„å‘³ç€åªæœ‰åœ¨çœŸæ­£å‘ç”Ÿå˜åŒ–æ—¶ä½ æ‰ä¼šæ”¶åˆ°é€šçŸ¥â€”â€”å®‰é™æ—¶æ®µä¸ä¼šäº§ç”Ÿåžƒåœ¾æ¶ˆæ¯ã€‚
:::

---

## æ¨¡å¼äºŒï¼šæ¯å‘¨æŠ¥å‘Š

ä»Žå¤šä¸ªæ¥æºæ±‡æ€»ä¿¡æ¯ï¼Œç”Ÿæˆæ ¼å¼åŒ–æ‘˜è¦ã€‚æ¯å‘¨è¿è¡Œä¸€æ¬¡ï¼ŒæŠ•é€’åˆ°ä½ çš„ä¸»é¢‘é“ã€‚

```bash
/cron add "0 9 * * 1" "Generate a weekly report covering:

1. Search the web for the top 5 AI news stories from the past week
2. Search GitHub for trending repositories in the 'machine-learning' topic
3. Check Hacker News for the most discussed AI/ML posts

Format as a clean summary with sections for each source. Include links.
Keep it under 500 words â€” highlight only what matters." --name "Weekly AI digest" --deliver telegram
```

é€šè¿‡ CLIï¼š

```bash
zed cron create "0 9 * * 1" \
  "Generate a weekly report covering the top AI news, trending ML GitHub repos, and most-discussed HN posts. Format with sections, include links, keep under 500 words." \
  --name "Weekly AI digest" \
  --deliver telegram
```

`0 9 * * 1` æ˜¯æ ‡å‡† cron è¡¨è¾¾å¼ï¼šæ¯å‘¨ä¸€ä¸Šåˆ 9:00ã€‚

---

## æ¨¡å¼ä¸‰ï¼šGitHub ä»“åº“ç›‘æŽ§

ç›‘æŽ§æŸä¸ªä»“åº“çš„æ–° issueã€PR æˆ– releaseã€‚

```bash
/cron add "every 6h" "Check the GitHub repository NousResearch/zed-agent for:
- New issues opened in the last 6 hours
- New PRs opened or merged in the last 6 hours
- Any new releases

Use the terminal to run gh commands:
  gh issue list --repo NousResearch/zed-agent --state open --json number,title,author,createdAt --limit 10
  gh pr list --repo NousResearch/zed-agent --state all --json number,title,author,createdAt,mergedAt --limit 10

Filter to only items from the last 6 hours. If nothing new, respond with [SILENT].
Otherwise, provide a concise summary of the activity." --name "Repo watcher" --deliver discord
```

:::warning è‡ªåŒ…å«çš„ Prompt
æ³¨æ„ prompt ä¸­åŒ…å«äº†ç²¾ç¡®çš„ `gh` å‘½ä»¤ã€‚cron agent ä¸è®°å¾—ä¹‹å‰çš„è¿è¡Œè®°å½•æˆ–ä½ çš„åå¥½â€”â€”æŠŠæ‰€æœ‰å†…å®¹éƒ½æ˜Žç¡®å†™å‡ºæ¥ã€‚
:::

---

## æ¨¡å¼å››ï¼šæ•°æ®é‡‡é›†ç®¡é“

å®šæœŸæŠ“å–æ•°æ®ã€ä¿å­˜åˆ°æ–‡ä»¶ï¼Œå¹¶éšæ—¶é—´æ£€æµ‹è¶‹åŠ¿ã€‚æ­¤æ¨¡å¼å°†è„šæœ¬ï¼ˆç”¨äºŽé‡‡é›†ï¼‰ä¸Ž agentï¼ˆç”¨äºŽåˆ†æžï¼‰ç»“åˆä½¿ç”¨ã€‚

```python title="~/.zed/scripts/collect-prices.py"
import json, os, urllib.request
from datetime import datetime

DATA_DIR = os.path.expanduser("~/.zed/data/prices")
os.makedirs(DATA_DIR, exist_ok=True)

# Fetch current data (example: crypto prices)
url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
data = json.loads(urllib.request.urlopen(url, timeout=30).read())

# Append to history file
entry = {"timestamp": datetime.now().isoformat(), "prices": data}
history_file = os.path.join(DATA_DIR, "history.jsonl")
with open(history_file, "a") as f:
    f.write(json.dumps(entry) + "\n")

# Load recent history for analysis
lines = open(history_file).readlines()
recent = [json.loads(l) for l in lines[-24:]]  # Last 24 data points

# Output for the agent
print(f"Current: BTC=${data['bitcoin']['usd']}, ETH=${data['ethereum']['usd']}")
print(f"Data points collected: {len(lines)} total, showing last {len(recent)}")
print(f"\nRecent history:")
for r in recent[-6:]:
    print(f"  {r['timestamp']}: BTC=${r['prices']['bitcoin']['usd']}, ETH=${r['prices']['ethereum']['usd']}")
```

```bash
/cron add "every 1h" "Analyze the price data from the script output. Report:
1. Current prices
2. Trend direction over the last 6 data points (up/down/flat)
3. Any notable movements (>5% change)

If prices are flat and nothing notable, respond with [SILENT].
If there's a significant move, explain what happened." \
  --script ~/.zed/scripts/collect-prices.py \
  --name "Price tracker" \
  --deliver telegram
```

è„šæœ¬è´Ÿè´£æœºæ¢°æ€§çš„æ•°æ®é‡‡é›†ï¼›agent åœ¨æ­¤ä¹‹ä¸Šæ·»åŠ æŽ¨ç†å±‚ã€‚

---

## æ¨¡å¼äº”ï¼šå¤šæŠ€èƒ½å·¥ä½œæµ

å°†å¤šä¸ª skillï¼ˆæŠ€èƒ½ï¼‰ä¸²è”èµ·æ¥ï¼Œå®Œæˆå¤æ‚çš„å®šæ—¶ä»»åŠ¡ã€‚Skill æŒ‰é¡ºåºåŠ è½½ï¼Œç„¶åŽæ‰§è¡Œ promptã€‚

```bash
# ä½¿ç”¨ arxiv skill æŸ¥æ‰¾è®ºæ–‡ï¼Œå†ç”¨ obsidian skill ä¿å­˜ç¬”è®°
/cron add "0 8 * * *" "Search arXiv for the 3 most interesting papers on 'language model reasoning' from the past day. For each paper, create an Obsidian note with the title, authors, abstract summary, and key contribution." \
  --skill arxiv \
  --skill obsidian \
  --name "Paper digest"
```

ç›´æŽ¥é€šè¿‡å·¥å…·è°ƒç”¨ï¼š

```python
cronjob(
    action="create",
    skills=["arxiv", "obsidian"],
    prompt="Search arXiv for papers on 'language model reasoning' from the past day. Save the top 3 as Obsidian notes.",
    schedule="0 8 * * *",
    name="Paper digest",
    deliver="local"
)
```

Skill æŒ‰é¡ºåºåŠ è½½â€”â€”å…ˆåŠ è½½ `arxiv`ï¼ˆæ•™ agent å¦‚ä½•æœç´¢è®ºæ–‡ï¼‰ï¼Œå†åŠ è½½ `obsidian`ï¼ˆæ•™ agent å¦‚ä½•å†™ç¬”è®°ï¼‰ã€‚Prompt å°†äºŒè€…ä¸²è”èµ·æ¥ã€‚

---

## ç®¡ç†ä½ çš„ä»»åŠ¡

```bash
# åˆ—å‡ºæ‰€æœ‰æ´»è·ƒä»»åŠ¡
/cron list

# ç«‹å³è§¦å‘æŸä¸ªä»»åŠ¡ï¼ˆç”¨äºŽæµ‹è¯•ï¼‰
/cron run <job_id>

# æš‚åœä»»åŠ¡è€Œä¸åˆ é™¤
/cron pause <job_id>

# ç¼–è¾‘è¿è¡Œä¸­ä»»åŠ¡çš„è°ƒåº¦æˆ– prompt
/cron edit <job_id> --schedule "every 4h"
/cron edit <job_id> --prompt "Updated task description"

# ä¸ºçŽ°æœ‰ä»»åŠ¡æ·»åŠ æˆ–ç§»é™¤ skill
/cron edit <job_id> --skill arxiv --skill obsidian
/cron edit <job_id> --clear-skills

# æ°¸ä¹…åˆ é™¤ä»»åŠ¡
/cron remove <job_id>
```

---

## æŠ•é€’ç›®æ ‡

`--deliver` æ ‡å¿—æŽ§åˆ¶ç»“æžœå‘é€åˆ°å“ªé‡Œï¼š

| ç›®æ ‡ | ç¤ºä¾‹ | ä½¿ç”¨åœºæ™¯ |
|--------|---------|----------|
| `origin` | `--deliver origin` | åˆ›å»ºè¯¥ä»»åŠ¡çš„å¯¹è¯ï¼ˆé»˜è®¤ï¼‰ |
| `local` | `--deliver local` | ä»…ä¿å­˜åˆ°æœ¬åœ°æ–‡ä»¶ |
| `telegram` | `--deliver telegram` | ä½ çš„ Telegram ä¸»é¢‘é“ |
| `discord` | `--deliver discord` | ä½ çš„ Discord ä¸»é¢‘é“ |
| `slack` | `--deliver slack` | ä½ çš„ Slack ä¸»é¢‘é“ |
| æŒ‡å®šå¯¹è¯ | `--deliver telegram:-1001234567890` | ç‰¹å®š Telegram ç¾¤ç»„ |
| çº¿ç¨‹æŠ•é€’ | `--deliver telegram:-1001234567890:17585` | ç‰¹å®š Telegram è¯é¢˜çº¿ç¨‹ |

---

## ä½¿ç”¨æŠ€å·§

**è®© prompt å®Œå…¨è‡ªåŒ…å«ã€‚** Cron ä»»åŠ¡ä¸­çš„ agent ä¸è®°å¾—ä½ çš„ä»»ä½•å¯¹è¯ã€‚æŠŠ URLã€ä»“åº“åã€æ ¼å¼åå¥½å’ŒæŠ•é€’è¯´æ˜Žç›´æŽ¥å†™è¿› promptã€‚

**å¤§é‡ä½¿ç”¨ `[SILENT]`ã€‚** å¯¹äºŽç›‘æŽ§ç±»ä»»åŠ¡ï¼Œå§‹ç»ˆåŠ ä¸Šç±»ä¼¼"å¦‚æžœæ²¡æœ‰å˜åŒ–ï¼Œå›žå¤ `[SILENT]`"çš„æŒ‡ä»¤ï¼Œé˜²æ­¢é€šçŸ¥å™ªéŸ³ã€‚

**ç”¨è„šæœ¬åšæ•°æ®é‡‡é›†ã€‚** `script` å‚æ•°è®© Python è„šæœ¬å¤„ç†æž¯ç‡¥çš„éƒ¨åˆ†ï¼ˆHTTP è¯·æ±‚ã€æ–‡ä»¶ I/Oã€çŠ¶æ€è¿½è¸ªï¼‰ã€‚Agent åªçœ‹åˆ°è„šæœ¬çš„ stdoutï¼Œå¹¶å¯¹å…¶è¿›è¡ŒæŽ¨ç†ã€‚è¿™æ¯”è®© agent è‡ªå·±æŠ“å–æ›´çœé’±ã€æ›´å¯é ã€‚

**ç”¨ `/cron run` æµ‹è¯•ã€‚** ä¸è¦ç­‰è°ƒåº¦è§¦å‘ï¼Œä½¿ç”¨ `/cron run <job_id>` ç«‹å³æ‰§è¡Œï¼ŒéªŒè¯è¾“å‡ºæ˜¯å¦ç¬¦åˆé¢„æœŸã€‚

**è°ƒåº¦è¡¨è¾¾å¼ã€‚** æ”¯æŒçš„æ ¼å¼ï¼šç›¸å¯¹å»¶è¿Ÿï¼ˆ`30m`ï¼‰ã€é—´éš”ï¼ˆ`every 2h`ï¼‰ã€æ ‡å‡† cron è¡¨è¾¾å¼ï¼ˆ`0 9 * * *`ï¼‰ã€ISO æ—¶é—´æˆ³ï¼ˆ`2025-06-15T09:00:00`ï¼‰ã€‚ä¸æ”¯æŒè‡ªç„¶è¯­è¨€å¦‚ `daily at 9am`â€”â€”è¯·æ”¹ç”¨ `0 9 * * *`ã€‚

---

*å®Œæ•´çš„ cron å‚è€ƒâ€”â€”æ‰€æœ‰å‚æ•°ã€è¾¹ç•Œæƒ…å†µå’Œå†…éƒ¨æœºåˆ¶â€”â€”è¯·è§ [å®šæ—¶ä»»åŠ¡ï¼ˆCronï¼‰](/user-guide/features/cron)ã€‚*