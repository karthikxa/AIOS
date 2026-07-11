---
sidebar_position: 9
---

# æ·»åŠ å¹³å°é€‚é…å™¨

æœ¬æŒ‡å—ä»‹ç»å¦‚ä½•å‘ Zed gateway æ·»åŠ æ–°çš„æ¶ˆæ¯å¹³å°ã€‚å¹³å°é€‚é…å™¨å°† Zed è¿žæŽ¥åˆ°å¤–éƒ¨æ¶ˆæ¯æœåŠ¡ï¼ˆTelegramã€Discordã€WeCom ç­‰ï¼‰ï¼Œä½¿ç”¨æˆ·å¯ä»¥é€šè¿‡è¯¥æœåŠ¡ä¸Ž agent äº¤äº’ã€‚

:::tip
æ·»åŠ å¹³å°æœ‰ä¸¤ç§æ–¹å¼ï¼š
- **Plugin**ï¼ˆæŽ¨èç”¨äºŽç¤¾åŒº/ç¬¬ä¸‰æ–¹ï¼‰ï¼šå°† plugin ç›®å½•æ”¾å…¥ `~/.zed/plugins/` â€” æ— éœ€ä¿®æ”¹ä»»ä½•æ ¸å¿ƒä»£ç ã€‚å‚è§ä¸‹æ–¹ [Plugin è·¯å¾„](#plugin-path-recommended)ã€‚
- **å†…ç½®**ï¼šéœ€ä¿®æ”¹ä»£ç ã€é…ç½®å’Œæ–‡æ¡£å…± 20+ ä¸ªæ–‡ä»¶ã€‚å‚è§ä¸‹æ–¹ [å†…ç½®æ¸…å•](#step-by-step-checklist)ã€‚
:::

## æž¶æž„æ¦‚è§ˆ

```
ç”¨æˆ· â†” æ¶ˆæ¯å¹³å° â†” å¹³å°é€‚é…å™¨ â†” Gateway Runner â†” AIAgent
```

æ¯ä¸ªé€‚é…å™¨éƒ½ç»§æ‰¿è‡ª `gateway/platforms/base.py` ä¸­çš„ `BasePlatformAdapter`ï¼Œå¹¶å®žçŽ°ä»¥ä¸‹æ–¹æ³•ï¼š

- **`connect()`** â€” å»ºç«‹è¿žæŽ¥ï¼ˆWebSocketã€é•¿è½®è¯¢ã€HTTP æœåŠ¡å™¨ç­‰ï¼‰*(æŠ½è±¡æ–¹æ³•)*
- **`disconnect()`** â€” æ¸…ç†å…³é—­ *(æŠ½è±¡æ–¹æ³•)*
- **`send()`** â€” å‘èŠå¤©å‘é€æ–‡æœ¬æ¶ˆæ¯ *(æŠ½è±¡æ–¹æ³•)*
- **`send_typing()`** â€” æ˜¾ç¤ºæ­£åœ¨è¾“å…¥æŒ‡ç¤ºå™¨ï¼ˆå¯é€‰è¦†ç›–ï¼‰
- **`get_chat_info()`** â€” è¿”å›žèŠå¤©å…ƒæ•°æ®ï¼ˆå¯é€‰è¦†ç›–ï¼‰

é€‚é…å™¨æŽ¥æ”¶å…¥ç«™æ¶ˆæ¯åŽï¼Œé€šè¿‡ `self.handle_message(event)` è½¬å‘ï¼ŒåŸºç±»å°†å…¶è·¯ç”±åˆ° gateway runnerã€‚

## Plugin è·¯å¾„ï¼ˆæŽ¨èï¼‰{#plugin-path-recommended}

Plugin ç³»ç»Ÿå…è®¸ä½ åœ¨ä¸ä¿®æ”¹ä»»ä½• Zed æ ¸å¿ƒä»£ç çš„æƒ…å†µä¸‹æ·»åŠ å¹³å°é€‚é…å™¨ã€‚ä½ çš„ plugin æ˜¯ä¸€ä¸ªåŒ…å«ä¸¤ä¸ªæ–‡ä»¶çš„ç›®å½•ï¼š

```
~/.zed/plugins/my-platform/
  plugin.yaml      # Plugin å…ƒæ•°æ®
  adapter.py       # é€‚é…å™¨ç±» + register() å…¥å£ç‚¹
```

### plugin.yaml

Plugin å…ƒæ•°æ®ã€‚`requires_env` å’Œ `optional_env` å—ä¼šè‡ªåŠ¨å¡«å…… `zed config` UI æ¡ç›®ï¼ˆå‚è§ä¸‹æ–¹[åœ¨ zed config ä¸­æš´éœ²çŽ¯å¢ƒå˜é‡](#surfacing-env-vars-in-zed-config)ï¼‰ã€‚

```yaml
name: my-platform
label: My Platform
kind: platform
version: 1.0.0
description: My custom messaging platform adapter
author: Your Name
requires_env:
  - MY_PLATFORM_TOKEN          # è£¸å­—ç¬¦ä¸²æœ‰æ•ˆ
  - name: MY_PLATFORM_CHANNEL  # æˆ–ä½¿ç”¨å¯Œå­—å…¸ä»¥èŽ·å¾—æ›´å¥½çš„ UX
    description: "Channel to join"
    prompt: "Channel"
    password: false
optional_env:
  - name: MY_PLATFORM_HOME_CHANNEL
    description: "Default channel for cron delivery"
    password: false
```

### adapter.py

```python
import os
from gateway.platforms.base import (
    BasePlatformAdapter, SendResult, MessageEvent, MessageType,
)
from gateway.config import Platform, PlatformConfig


class MyPlatformAdapter(BasePlatformAdapter):
    def __init__(self, config: PlatformConfig):
        super().__init__(config, Platform("my_platform"))
        extra = config.extra or {}
        self.token = os.getenv("MY_PLATFORM_TOKEN") or extra.get("token", "")

    async def connect(self) -> bool:
        # è¿žæŽ¥åˆ°å¹³å° APIï¼Œå¯åŠ¨ç›‘å¬å™¨
        self._mark_connected()
        return True

    async def disconnect(self) -> None:
        self._mark_disconnected()

    async def send(self, chat_id, content, reply_to=None, metadata=None):
        # é€šè¿‡å¹³å° API å‘é€æ¶ˆæ¯
        return SendResult(success=True, message_id="...")

    async def get_chat_info(self, chat_id):
        return {"name": chat_id, "type": "dm"}


def check_requirements() -> bool:
    return bool(os.getenv("MY_PLATFORM_TOKEN"))


def validate_config(config) -> bool:
    extra = getattr(config, "extra", {}) or {}
    return bool(os.getenv("MY_PLATFORM_TOKEN") or extra.get("token"))


def _env_enablement() -> dict | None:
    token = os.getenv("MY_PLATFORM_TOKEN", "").strip()
    channel = os.getenv("MY_PLATFORM_CHANNEL", "").strip()
    if not (token and channel):
        return None
    seed = {"token": token, "channel": channel}
    home = os.getenv("MY_PLATFORM_HOME_CHANNEL")
    if home:
        seed["home_channel"] = {"chat_id": home, "name": "Home"}
    return seed


def register(ctx):
    """Plugin å…¥å£ç‚¹ â€” ç”± Zed plugin ç³»ç»Ÿè°ƒç”¨ã€‚"""
    ctx.register_platform(
        name="my_platform",
        label="My Platform",
        adapter_factory=lambda cfg: MyPlatformAdapter(cfg),
        check_fn=check_requirements,
        validate_config=validate_config,
        required_env=["MY_PLATFORM_TOKEN"],
        install_hint="pip install my-platform-sdk",
        # çŽ¯å¢ƒå˜é‡é©±åŠ¨çš„è‡ªåŠ¨é…ç½® â€” åœ¨é€‚é…å™¨æž„å»ºå‰ä»ŽçŽ¯å¢ƒå˜é‡
        # å¡«å…… PlatformConfig.extraã€‚å‚è§ä¸‹æ–¹"çŽ¯å¢ƒå˜é‡é©±åŠ¨çš„è‡ªåŠ¨é…ç½®"ç« èŠ‚ã€‚
        env_enablement_fn=_env_enablement,
        # Cron ä¸»é¢‘é“æŠ•é€’æ”¯æŒã€‚å…è®¸ deliver=my_platform çš„ cron ä»»åŠ¡
        # æ— éœ€ç¼–è¾‘ cron/scheduler.py å³å¯è·¯ç”±ã€‚å‚è§ä¸‹æ–¹"Cron æŠ•é€’"ç« èŠ‚ã€‚
        cron_deliver_env_var="MY_PLATFORM_HOME_CHANNEL",
        # æ¯å¹³å°ç”¨æˆ·æŽˆæƒçŽ¯å¢ƒå˜é‡
        allowed_users_env="MY_PLATFORM_ALLOWED_USERS",
        allow_all_env="MY_PLATFORM_ALLOW_ALL_USERS",
        # æ™ºèƒ½åˆ†å—çš„æ¶ˆæ¯é•¿åº¦é™åˆ¶ï¼ˆ0 = æ— é™åˆ¶ï¼‰
        max_message_length=4000,
        # æ³¨å…¥ç³»ç»Ÿ promptï¼ˆæç¤ºè¯ï¼‰çš„ LLM æŒ‡å¯¼
        platform_hint=(
            "You are chatting via My Platform. "
            "It supports markdown formatting."
        ),
        # æ˜¾ç¤º
        emoji="ðŸ’¬",
    )

    # å¯é€‰ï¼šæ³¨å†Œå¹³å°ä¸“å±žå·¥å…·
    ctx.register_tool(
        name="my_platform_search",
        toolset="my_platform",
        schema={...},
        handler=my_search_handler,
    )
```

### é…ç½®

ç”¨æˆ·åœ¨ `config.yaml` ä¸­é…ç½®å¹³å°ï¼š

```yaml
gateway:
  platforms:
    my_platform:
      enabled: true
      extra:
        token: "..."
        channel: "#general"
```

æˆ–é€šè¿‡çŽ¯å¢ƒå˜é‡ï¼ˆé€‚é…å™¨åœ¨ `__init__` ä¸­è¯»å–ï¼‰ã€‚

### Plugin ç³»ç»Ÿè‡ªåŠ¨å¤„ç†çš„å†…å®¹

è°ƒç”¨ `ctx.register_platform()` æ—¶ï¼Œä»¥ä¸‹é›†æˆç‚¹å°†è‡ªåŠ¨å¤„ç† â€” æ— éœ€ä¿®æ”¹æ ¸å¿ƒä»£ç ï¼š

| é›†æˆç‚¹ | å·¥ä½œæ–¹å¼ |
|---|---|
| Gateway é€‚é…å™¨åˆ›å»º | åœ¨å†…ç½® if/elif é“¾ä¹‹å‰æ£€æŸ¥æ³¨å†Œè¡¨ |
| é…ç½®è§£æž | `Platform._missing_()` æŽ¥å—ä»»æ„å¹³å°åç§° |
| å·²è¿žæŽ¥å¹³å°éªŒè¯ | è°ƒç”¨æ³¨å†Œè¡¨ä¸­çš„ `validate_config()` |
| ç”¨æˆ·æŽˆæƒ | æ£€æŸ¥ `allowed_users_env` / `allow_all_env` |
| ä»…çŽ¯å¢ƒå˜é‡è‡ªåŠ¨å¯ç”¨ | `env_enablement_fn` å¡«å…… `PlatformConfig.extra` + `home_channel` |
| YAML é…ç½®æ¡¥æŽ¥ | `apply_yaml_config_fn` å°† `config.yaml` é”®è½¬æ¢ä¸ºçŽ¯å¢ƒå˜é‡/extras |
| Cron æŠ•é€’ | `cron_deliver_env_var` ä½¿ `deliver=<name>` ç”Ÿæ•ˆ |
| `zed config` UI æ¡ç›® | `plugin.yaml` ä¸­çš„ `requires_env` / `optional_env` è‡ªåŠ¨å¡«å…… |
| send_message å·¥å…· | é€šè¿‡å®žæ—¶ gateway é€‚é…å™¨è·¯ç”± |
| Webhook è·¨å¹³å°æŠ•é€’ | æ£€æŸ¥æ³¨å†Œè¡¨ä¸­çš„å·²çŸ¥å¹³å° |
| `/update` å‘½ä»¤è®¿é—® | `allow_update_command` æ ‡å¿— |
| é¢‘é“ç›®å½• | Plugin å¹³å°åŒ…å«åœ¨æžšä¸¾ä¸­ |
| ç³»ç»Ÿ prompt æç¤º | `platform_hint` æ³¨å…¥ LLM ä¸Šä¸‹æ–‡ |
| æ¶ˆæ¯åˆ†å— | `max_message_length` ç”¨äºŽæ™ºèƒ½åˆ†å‰² |
| PII è„±æ• | `pii_safe` æ ‡å¿— |
| `zed status` | æ˜¾ç¤ºå¸¦ `(plugin)` æ ‡ç­¾çš„ plugin å¹³å° |
| `zed gateway setup` | Plugin å¹³å°å‡ºçŽ°åœ¨è®¾ç½®èœå•ä¸­ |
| `zed tools` / `zed skills` | Plugin å¹³å°å‡ºçŽ°åœ¨æ¯å¹³å°é…ç½®ä¸­ |
| Token é”ï¼ˆå¤šé…ç½®æ–‡ä»¶ï¼‰ | åœ¨ `connect()` ä¸­ä½¿ç”¨ `acquire_scoped_lock()` |
| å­¤ç«‹é…ç½®è­¦å‘Š | Plugin ç¼ºå¤±æ—¶è¾“å‡ºæè¿°æ€§æ—¥å¿— |

## çŽ¯å¢ƒå˜é‡é©±åŠ¨çš„è‡ªåŠ¨é…ç½®

å¤§å¤šæ•°ç”¨æˆ·é€šè¿‡å°†çŽ¯å¢ƒå˜é‡å†™å…¥ `~/.zed/.env` æ¥é…ç½®å¹³å°ï¼Œè€Œä¸æ˜¯ç¼–è¾‘ `config.yaml`ã€‚`env_enablement_fn` hook å…è®¸ä½ çš„ plugin åœ¨é€‚é…å™¨æž„å»º**ä¹‹å‰**è¯»å–è¿™äº›çŽ¯å¢ƒå˜é‡ï¼Œä½¿ `zed gateway status`ã€`get_connected_platforms()` å’Œ cron æŠ•é€’æ— éœ€å®žä¾‹åŒ–å¹³å° SDK å³å¯çœ‹åˆ°æ­£ç¡®çŠ¶æ€ã€‚

```python
def _env_enablement() -> dict | None:
    """ä»ŽçŽ¯å¢ƒå˜é‡å¡«å…… PlatformConfig.extraã€‚

    åœ¨ load_gateway_config() æœŸé—´ç”±å¹³å°æ³¨å†Œè¡¨è°ƒç”¨ã€‚
    å½“å¹³å°æœªå®Œæˆæœ€ä½Žé…ç½®æ—¶è¿”å›ž None â€” è°ƒç”¨æ–¹å°†è·³è¿‡è‡ªåŠ¨å¯ç”¨ã€‚
    è¿”å›žå­—å…¸ä»¥å¡«å…… extrasã€‚

    ç‰¹æ®Šé”® 'home_channel' ä¼šè¢«æå–å¹¶æˆä¸º PlatformConfig ä¸Šçš„
    HomeChannel dataclassï¼›å…¶ä»–æ‰€æœ‰é”®åˆå¹¶åˆ° PlatformConfig.extra ä¸­ã€‚
    """
    token = os.getenv("MY_PLATFORM_TOKEN", "").strip()
    channel = os.getenv("MY_PLATFORM_CHANNEL", "").strip()
    if not (token and channel):
        return None
    seed = {"token": token, "channel": channel}
    home = os.getenv("MY_PLATFORM_HOME_CHANNEL")
    if home:
        seed["home_channel"] = {
            "chat_id": home,
            "name": os.getenv("MY_PLATFORM_HOME_CHANNEL_NAME", "Home"),
        }
    return seed


def register(ctx):
    ctx.register_platform(
        name="my_platform",
        label="My Platform",
        adapter_factory=lambda cfg: MyPlatformAdapter(cfg),
        check_fn=check_requirements,
        validate_config=validate_config,
        env_enablement_fn=_env_enablement,
        # ... å…¶ä»–å­—æ®µ
    )
```


## YAMLâ†’env é…ç½®æ¡¥æŽ¥

éƒ¨åˆ†ç”¨æˆ·æ›´å€¾å‘äºŽè®¾ç½® `config.yaml` é”®ï¼ˆ`my_platform.require_mention`ã€`my_platform.allowed_channels` ç­‰ï¼‰è€ŒéžçŽ¯å¢ƒå˜é‡ã€‚`apply_yaml_config_fn` hook å…è®¸ä½ çš„ plugin è‡ªè¡Œå¤„ç†è¿™ä¸€è½¬æ¢ï¼Œè€Œæ— éœ€å¼ºåˆ¶æ ¸å¿ƒ `gateway/config.py` äº†è§£ä½ å¹³å°çš„ YAML schemaã€‚

```python
import os

def _apply_yaml_config(yaml_cfg: dict, platform_cfg: dict) -> dict | None:
    """å°† config.yaml ä¸­çš„ `my_platform:` é”®è½¬æ¢ä¸ºçŽ¯å¢ƒå˜é‡/extrasã€‚

    yaml_cfg     â€” å®Œæ•´çš„é¡¶å±‚è§£æžåŽ config.yaml å­—å…¸
    platform_cfg â€” å¹³å°è‡ªèº«çš„å­å­—å…¸ï¼ˆyaml_cfg.get("my_platform", {})ï¼‰

    å¯ç›´æŽ¥ä¿®æ”¹ os.environï¼ˆä½¿ç”¨ `not os.getenv(...)` å®ˆå«ä»¥ä¿æŒ
    çŽ¯å¢ƒå˜é‡ > YAML çš„ä¼˜å…ˆçº§ï¼‰ï¼Œä¹Ÿå¯è¿”å›žå­—å…¸åˆå¹¶åˆ° PlatformConfig.extra ä¸­ã€‚
    è¿”å›ž None æˆ– {} è¡¨ç¤ºæ— é¢å¤–å†…å®¹ã€‚
    """
    if "require_mention" in platform_cfg and not os.getenv("MY_PLATFORM_REQUIRE_MENTION"):
        os.environ["MY_PLATFORM_REQUIRE_MENTION"] = str(platform_cfg["require_mention"]).lower()
    allowed = platform_cfg.get("allowed_channels")
    if allowed is not None and not os.getenv("MY_PLATFORM_ALLOWED_CHANNELS"):
        if isinstance(allowed, list):
            allowed = ",".join(str(v) for v in allowed)
        os.environ["MY_PLATFORM_ALLOWED_CHANNELS"] = str(allowed)
    return None  # æ— éœ€åˆå¹¶åˆ° PlatformConfig.extra çš„é¢å¤–å†…å®¹

def register(ctx):
    ctx.register_platform(
        name="my_platform",
        ...,
        apply_yaml_config_fn=_apply_yaml_config,
    )
```

è¯¥ hook åœ¨ `load_gateway_config()` æœŸé—´ï¼ŒäºŽé€šç”¨å…±äº«é”®å¾ªçŽ¯ï¼ˆå¤„ç† `unauthorized_dm_behavior`ã€`notice_delivery`ã€`reply_prefix`ã€`require_mention` ç­‰å…¬å…±é”®ï¼‰ä¹‹åŽã€`_apply_env_overrides()` ä¹‹å‰è°ƒç”¨ï¼Œå› æ­¤ä½ çš„ plugin åªéœ€æ¡¥æŽ¥**å¹³å°ä¸“å±ž**é”®ã€‚

hook å†…æŠ›å‡ºçš„å¼‚å¸¸ä¼šè¢«æ•èŽ·å¹¶ä»¥ debug çº§åˆ«è®°å½• â€” è¡Œä¸ºå¼‚å¸¸çš„ plugin ä¸ä¼šä¸­æ­¢ gateway é…ç½®åŠ è½½ã€‚


## Cron æŠ•é€’

è¦è®© `deliver=my_platform` çš„ cron ä»»åŠ¡è·¯ç”±åˆ°å·²é…ç½®çš„ä¸»é¢‘é“ï¼Œå°† `cron_deliver_env_var` è®¾ç½®ä¸ºæŒæœ‰é»˜è®¤èŠå¤©/æˆ¿é—´/é¢‘é“ ID çš„çŽ¯å¢ƒå˜é‡åï¼š

```python
ctx.register_platform(
    name="my_platform",
    ...
    cron_deliver_env_var="MY_PLATFORM_HOME_CHANNEL",
)
```

è°ƒåº¦å™¨åœ¨è§£æž `deliver=my_platform` ä»»åŠ¡çš„ä¸»ç›®æ ‡æ—¶ä¼šè¯»å–æ­¤çŽ¯å¢ƒå˜é‡ï¼Œå¹¶å°†è¯¥å¹³å°è§†ä¸º `_KNOWN_DELIVERY_PLATFORMS` é£Žæ ¼æ£€æŸ¥ä¸­çš„æœ‰æ•ˆ cron ç›®æ ‡ã€‚å¦‚æžœä½ çš„ `env_enablement_fn` å¡«å……äº† `home_channel` å­—å…¸ï¼ˆè§ä¸Šæ–‡ï¼‰ï¼Œåˆ™ä¼˜å…ˆä½¿ç”¨è¯¥å€¼ â€” `cron_deliver_env_var` æ˜¯åœ¨çŽ¯å¢ƒå˜é‡å¡«å……ä¹‹å‰è¿è¡Œçš„ cron ä»»åŠ¡çš„å›žé€€æ–¹æ¡ˆã€‚

### è¿›ç¨‹å¤– cron æŠ•é€’

`cron_deliver_env_var` ä½¿ä½ çš„å¹³å°æˆä¸ºå¯è¯†åˆ«çš„ `deliver=` ç›®æ ‡ã€‚è¦åœ¨ cron ä»»åŠ¡è¿è¡ŒäºŽç‹¬ç«‹è¿›ç¨‹ï¼ˆå³ `zed cron run` ä¸Ž `zed gateway` åˆ†ç¦»ï¼‰æ—¶ä½¿å®žé™…å‘é€æˆåŠŸï¼Œéœ€æ³¨å†Œ `standalone_sender_fn`ï¼š

```python
async def _standalone_send(
    pconfig,
    chat_id,
    message,
    *,
    thread_id=None,
    media_files=None,
    force_document=False,
):
    """å»ºç«‹ä¸´æ—¶è¿žæŽ¥/èŽ·å–æ–° tokenï¼Œå‘é€æ¶ˆæ¯ï¼Œç„¶åŽå…³é—­ã€‚"""
    # ... å»ºç«‹è¿žæŽ¥ï¼Œå‘é€æ¶ˆæ¯ï¼Œè¿”å›žç»“æžœ ...
    return {"success": True, "message_id": "..."}
    # æˆ– {"error": "..."}

ctx.register_platform(
    name="my_platform",
    ...
    cron_deliver_env_var="MY_PLATFORM_HOME_CHANNEL",
    standalone_sender_fn=_standalone_send,
)
```

ä¸ºä½•éœ€è¦æ­¤ hookï¼šå†…ç½®å¹³å°ï¼ˆTelegramã€Discordã€Slack ç­‰ï¼‰åœ¨ `tools/send_message_tool.py` ä¸­å†…ç½®äº†ç›´æŽ¥ REST è¾…åŠ©å‡½æ•°ï¼Œä½¿ cron æ— éœ€åœ¨åŒä¸€è¿›ç¨‹ä¸­æŒæœ‰ gateway å³å¯æŠ•é€’ã€‚Plugin å¹³å°åŽ†å²ä¸Šä¾èµ– `_gateway_runner_ref()`ï¼Œè¯¥å‡½æ•°åœ¨ gateway è¿›ç¨‹å¤–è¿”å›ž `None`ï¼Œå› æ­¤è‹¥æ²¡æœ‰ `standalone_sender_fn`ï¼Œcron ç«¯å‘é€ä¼šå¤±è´¥å¹¶æŠ¥ `No live adapter for platform '<name>'`ã€‚

è¯¥å‡½æ•°æŽ¥æ”¶ä¸Žå®žæ—¶é€‚é…å™¨ç›¸åŒçš„ `pconfig` å’Œ `chat_id`ï¼Œä»¥åŠå¯é€‰çš„ `thread_id`ã€`media_files` å’Œ `force_document` å…³é”®å­—å‚æ•°ã€‚è¿”å›ž `{"success": True, "message_id": ...}` è§†ä¸ºæˆåŠŸæŠ•é€’ï¼›è¿”å›ž `{"error": "..."}` ä¼šå°†æ¶ˆæ¯è®°å½•åˆ° cron çš„ `delivery_errors` ä¸­ã€‚å‡½æ•°å†…æŠ›å‡ºçš„å¼‚å¸¸ç”±è°ƒåº¦å™¨æ•èŽ·å¹¶æŠ¥å‘Šä¸º `Plugin standalone send failed: <reason>`ã€‚å‚è€ƒå®žçŽ°ä½äºŽ `plugins/platforms/{irc,teams,google_chat}/adapter.py`ã€‚

## åœ¨ `zed config` ä¸­æš´éœ²çŽ¯å¢ƒå˜é‡ {#surfacing-env-vars-in-zed-config}

`zed_cli/config.py` åœ¨å¯¼å…¥æ—¶æ‰«æ `plugins/platforms/*/plugin.yaml`ï¼Œå¹¶ä»Ž `requires_env` å’Œï¼ˆå¯é€‰çš„ï¼‰`optional_env` å—è‡ªåŠ¨å¡«å…… `OPTIONAL_ENV_VARS`ã€‚ä½¿ç”¨å¯Œå­—å…¸å½¢å¼å¯æä¾›å®Œæ•´çš„æè¿°ã€promptã€password æ ‡å¿—å’Œ URL â€” CLI è®¾ç½® UI ä¼šè‡ªåŠ¨è¯†åˆ«ã€‚

```yaml
# plugins/platforms/my_platform/plugin.yaml
name: my_platform-platform
label: My Platform
kind: platform
version: 1.0.0
description: >
  My Platform gateway adapter for Zed Agent.
author: Your Name
requires_env:
  - name: MY_PLATFORM_TOKEN
    description: "Bot API token from the My Platform console"
    prompt: "My Platform bot token"
    url: "https://my-platform.example.com/bots"
    password: true
  - name: MY_PLATFORM_CHANNEL
    description: "Channel to join (e.g. #zed)"
    prompt: "Channel"
    password: false
optional_env:
  - name: MY_PLATFORM_HOME_CHANNEL
    description: "Default channel for cron delivery (defaults to MY_PLATFORM_CHANNEL)"
    prompt: "Home channel (or empty)"
    password: false
  - name: MY_PLATFORM_ALLOWED_USERS
    description: "Comma-separated user IDs allowed to talk to the bot"
    prompt: "Allowed users (comma-separated)"
    password: false
```

**æ”¯æŒçš„å­—å…¸é”®ï¼š** `name`ï¼ˆå¿…å¡«ï¼‰ã€`description`ã€`prompt`ã€`url`ã€`password`ï¼ˆå¸ƒå°”å€¼ï¼›å½“çœç•¥æ—¶æ ¹æ® `*_TOKEN` / `*_SECRET` / `*_KEY` / `*_PASSWORD` / `*_JSON` åŽç¼€è‡ªåŠ¨æ£€æµ‹ï¼‰ã€`category`ï¼ˆé»˜è®¤ä¸º `"messaging"`ï¼‰ã€‚

è£¸å­—ç¬¦ä¸²æ¡ç›®ï¼ˆ`- MY_PLATFORM_TOKEN`ï¼‰ä»ç„¶æœ‰æ•ˆ â€” ä¼šæ ¹æ® plugin çš„ `label` è‡ªåŠ¨ç”Ÿæˆé€šç”¨æè¿°ã€‚å¦‚æžœ `OPTIONAL_ENV_VARS` ä¸­å·²å­˜åœ¨åŒåå˜é‡çš„ç¡¬ç¼–ç æ¡ç›®ï¼Œåˆ™ä»¥ç¡¬ç¼–ç ä¸ºå‡†ï¼ˆå‘åŽå…¼å®¹ï¼‰ï¼›plugin.yaml å½¢å¼ä½œä¸ºå›žé€€ã€‚

## å¹³å°ä¸“å±žæ…¢é€Ÿ LLM ç”¨æˆ·ä½“éªŒ

æŸäº›å¹³å°å­˜åœ¨çº¦æŸï¼Œå½±å“æ…¢é€Ÿ LLM å“åº”çš„å‘ˆçŽ°æ–¹å¼ï¼š

- **LINE** å‘å‡ºå•æ¬¡ä½¿ç”¨çš„*å›žå¤ token*ï¼Œåœ¨å…¥ç«™äº‹ä»¶åŽçº¦ 60 ç§’è¿‡æœŸã€‚ä½¿ç”¨è¯¥ token å›žå¤æ˜¯å…è´¹çš„ï¼›å›žé€€åˆ°è®¡è´¹çš„ Push API åˆ™ä¸ç„¶ã€‚å¦‚æžœ LLM åœ¨æˆªæ­¢æ—¶é—´å‰æœªå®Œæˆï¼Œé€‰æ‹©æ˜¯"æ¶ˆè€—ä»˜è´¹ Push é…é¢"æˆ–"åœ¨å›žå¤ token è¿‡æœŸå‰ç”¨å®ƒåšäº›æ›´èªæ˜Žçš„äº‹"ã€‚
- **WhatsApp** åœ¨ 24 å°æ—¶ä¸æ´»è·ƒåŽå°†ä¼šè¯æ ‡è®°ä¸ºéžæ´»è·ƒï¼Œæ­¤åŽåªæŽ¥å—æ¨¡æ¿æ¶ˆæ¯ã€‚
- **SMS** æ²¡æœ‰æ­£åœ¨è¾“å…¥æŒ‡ç¤ºå™¨æˆ–æ¸è¿›å¼æ›´æ–°çš„æ¦‚å¿µ â€” é•¿å“åº”çœ‹èµ·æ¥å°±åƒ bot ç¦»çº¿äº†ã€‚

è¿™äº›æ˜¯ `BasePlatformAdapter` æ— æ³•é¢„åˆ¤çš„çœŸå®žçº¦æŸã€‚Plugin æŽ¥å£æœ‰æ„ä¸ºé€‚é…å™¨åœ¨åŸºç¡€è¾“å…¥å¾ªçŽ¯ä¹‹ä¸Šå åŠ å¹³å°ä¸“å±ž UX ç•™å‡ºç©ºé—´ï¼Œè€Œæ— éœ€æ‰©å±• kwarg åˆ—è¡¨ã€‚

### æ¨¡å¼ï¼šå­ç±»åŒ– `_keep_typing` ä»¥å åŠ é£žè¡Œä¸­ UX

`BasePlatformAdapter._keep_typing` æ˜¯æ­£åœ¨è¾“å…¥æŒ‡ç¤ºå™¨çš„å¿ƒè·³ â€” å®ƒåœ¨ LLM ç”Ÿæˆæ—¶ä½œä¸ºåŽå°ä»»åŠ¡è¿è¡Œï¼Œå“åº”æŠ•é€’åŽè¢«å–æ¶ˆã€‚è¦åœ¨æŸä¸ªé˜ˆå€¼æ—¶å åŠ å¹³å°ä¸“å±žè¡Œä¸ºï¼ˆä¾‹å¦‚åœ¨ 45 ç§’æ—¶å‘é€"ä»åœ¨æ€è€ƒ"æ°”æ³¡ï¼‰ï¼Œåœ¨ä½ çš„é€‚é…å™¨ä¸­è¦†ç›– `_keep_typing`ï¼Œåœ¨ `super()._keep_typing()` æ—è¾¹è°ƒåº¦ä½ è‡ªå·±çš„ä»»åŠ¡ï¼Œå¹¶åœ¨ `finally` ä¸­æ¸…ç†ï¼š

```python
class LineAdapter(BasePlatformAdapter):
    async def _keep_typing(self, chat_id: str, *args, **kwargs) -> None:
        if self.slow_response_threshold <= 0:
            await super()._keep_typing(chat_id, *args, **kwargs)
            return

        async def _fire_at_threshold() -> None:
            try:
                await asyncio.sleep(self.slow_response_threshold)
            except asyncio.CancelledError:
                raise
            # å¹³å°ä¸“å±žæ“ä½œ â€” å¯¹äºŽ LINEï¼Œä½¿ç”¨ç¼“å­˜çš„å›žå¤ token å‘é€
            # Template Buttons "èŽ·å–ç­”æ¡ˆ"æ°”æ³¡ï¼Œç”¨æˆ·å¯é€šè¿‡ postback
            # å›žè°ƒä¸­çš„æ–°ï¼ˆå…è´¹ï¼‰å›žå¤ token ç¨åŽèŽ·å–ç¼“å­˜çš„å“åº”ã€‚
            await self._send_slow_response_button(chat_id)

        side_task = asyncio.create_task(_fire_at_threshold())
        try:
            await super()._keep_typing(chat_id, *args, **kwargs)
        finally:
            if not side_task.done():
                side_task.cancel()
                try:
                    await side_task
                except (asyncio.CancelledError, Exception):
                    pass
```

å…³é”®ç‚¹ï¼š

- **å§‹ç»ˆ `await super()._keep_typing(...)`ã€‚** è¾“å…¥å¿ƒè·³æœ¬èº«æœ‰ç‹¬ç«‹ä»·å€¼ â€” ä¸è¦æ›¿æ¢å®ƒï¼Œè€Œæ˜¯åœ¨å…¶ä¸Šå åŠ ã€‚
- **åœ¨ `finally` ä¸­æ¸…ç†å‰¯ä»»åŠ¡ã€‚** å½“ LLM å®Œæˆï¼ˆæˆ– `/stop` å–æ¶ˆè¿è¡Œï¼‰æ—¶ï¼Œgateway ä¼šå–æ¶ˆè¾“å…¥ä»»åŠ¡ã€‚ä½ çš„å‰¯ä»»åŠ¡ä¹Ÿå¿…é¡»å“åº”è¯¥å–æ¶ˆï¼Œå¦åˆ™å®ƒä¼šæ®‹ç•™å¹¶å¯èƒ½åœ¨å“åº”å·²æŠ•é€’åŽè§¦å‘ã€‚
- **é…åˆ `interrupt_session_activity`** åœ¨ç”¨æˆ·å‘å‡º `/stop` æ—¶è§£å†³ä»»ä½•å­¤ç«‹ UX çŠ¶æ€ã€‚å¯¹äºŽ LINEï¼Œè¿™æ„å‘³ç€å°† postback ç¼“å­˜æ¡ç›®ä»Ž `PENDING` è½¬æ¢ä¸º `ERROR`ï¼Œä½¿æŒä¹…çš„"èŽ·å–ç­”æ¡ˆ"æŒ‰é’®æŠ•é€’"è¿è¡Œå·²ä¸­æ–­"æ¶ˆæ¯è€Œéžå¾ªçŽ¯ã€‚

### æ¨¡å¼ï¼šå­ç±»åŒ– `send` ä»¥é€šè¿‡ç¼“å­˜è·¯ç”±è€Œéžç«‹å³å‘é€

å¦‚æžœä½ çš„æ…¢é€Ÿå“åº” UX ç¼“å­˜å“åº”ä»¥ä¾›ç¨åŽæ£€ç´¢ï¼ˆLINE çš„ postback æµç¨‹ï¼‰ï¼Œä½ çš„ `send` è¦†ç›–éœ€è¦è¯†åˆ«ä¸‰ç§æ¨¡å¼ï¼š

1. **æ­¤èŠå¤©å­˜åœ¨å¾…å¤„ç†çš„ postback** â†’ å°†å“åº”ç¼“å­˜åœ¨ request_id ä¸‹ï¼Œä¸å‘é€ä»»ä½•å¯è§å†…å®¹ã€‚
2. **ç³»ç»Ÿå¿™ç¢Œç¡®è®¤**ï¼ˆ`âš¡ Interrupting`ã€`â³ Queued`ã€`â© Steered`ï¼‰â†’ ç»•è¿‡ç¼“å­˜ç›´æŽ¥å‘é€ï¼Œä½¿ç”¨æˆ·çœ‹åˆ° gateway å¯¹å…¶è¾“å…¥çš„å“åº”ã€‚
3. **æ­£å¸¸å“åº”** â†’ æŒ‰å¸¸è§„é€šè¿‡å›žå¤ token æˆ– Push å‘é€ã€‚

```python
async def send(self, chat_id: str, content: str, **kw) -> SendResult:
    if _is_system_bypass(content):
        return await self._send_text_chunks(chat_id, content, force_push=False)
    pending_rid = self._pending_buttons.get(chat_id)
    if pending_rid:
        self._cache.set_ready(pending_rid, content)
        return SendResult(success=True, message_id=pending_rid)
    return await self._send_text_chunks(chat_id, content, force_push=False)
```

`_SYSTEM_BYPASS_PREFIXES` æ˜¯ gateway è‡ªèº«çš„å¿™ç¢Œç¡®è®¤å‰ç¼€ï¼ˆ`âš¡`ã€`â³`ã€`â©`ã€`ðŸ’¾`ï¼‰ã€‚æ— è®ºç¼“å­˜ UX çŠ¶æ€å¦‚ä½•ï¼Œå§‹ç»ˆè®©è¿™äº›å‰ç¼€å¯è§åœ°é€šè¿‡ã€‚

### ä½•æ—¶é€‚ç”¨æ­¤æ¨¡å¼

åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨è¾“å…¥å¾ªçŽ¯è¦†ç›–æ–¹å¼ï¼š

- å¹³å°çš„å‡ºç«™ API å­˜åœ¨ç¡¬æ€§æ—¶é—´çª—å£çº¦æŸï¼ˆå•æ¬¡ä½¿ç”¨å›žå¤ tokenã€è¿‡æœŸçš„ç²˜æ€§ä¼šè¯ç­‰ï¼‰ï¼Œ**ä¸”**
- åœ¨è¯¥å¹³å°ä¸Š*å¯è§çš„é£žè¡Œä¸­æ°”æ³¡*æ˜¯å¯æŽ¥å—çš„ UXã€‚

åœ¨ä»¥ä¸‹æƒ…å†µä½¿ç”¨æ›´ç®€å•çš„ `slow_response_threshold = 0` å§‹ç»ˆ Push è·¯å¾„ï¼š

- å¹³å°æ²¡æœ‰æœ‰æ„ä¹‰çš„å…è´¹ä¸Žä»˜è´¹åŒºåˆ«ï¼Œ**æˆ–**
- ç”¨æˆ·ç¤¾åŒºæ›´å€¾å‘äºŽ"åŠ è½½ä¸­â€¦â€¦åŠ è½½ä¸­â€¦â€¦å®Œæˆ"çš„é™é»˜åŽå“åº”ï¼Œè€Œéžäº¤äº’å¼ä¸­é—´æ°”æ³¡ã€‚

LINE ä¸¤è€…éƒ½æ”¯æŒï¼šé˜ˆå€¼é»˜è®¤ä¸º 45 ç§’ç”¨äºŽå…è´¹ postback èŽ·å–ï¼Œ`LINE_SLOW_RESPONSE_THRESHOLD=0` æ¢å¤ä¸º"å§‹ç»ˆ Push å›žé€€"ã€‚

### å‚è€ƒå®žçŽ°

å®Œæ•´çš„ LINE postback å®žçŽ°å‚è§ `plugins/platforms/line/adapter.py` â€” åŒ…å« `RequestCache` çŠ¶æ€æœºï¼ˆ`PENDING â†’ READY â†’ DELIVERED`ï¼Œä»¥åŠ `/stop` çš„ `ERROR`ï¼‰ã€åœ¨é˜ˆå€¼æ—¶è§¦å‘ Template Buttons æ°”æ³¡çš„ `_keep_typing` è¦†ç›–ã€é€šè¿‡ç¼“å­˜è·¯ç”±çš„ `send` è¦†ç›–ï¼Œä»¥åŠè§£å†³å­¤ç«‹ PENDING æ¡ç›®çš„ `interrupt_session_activity` è¦†ç›–ã€‚

### å‚è€ƒå®žçŽ°ï¼ˆPlugin è·¯å¾„ï¼‰

å®Œæ•´çš„å·¥ä½œç¤ºä¾‹å‚è§ä»“åº“ä¸­çš„ `plugins/platforms/irc/` â€” ä¸€ä¸ªæ— å¤–éƒ¨ä¾èµ–çš„å®Œæ•´å¼‚æ­¥ IRC é€‚é…å™¨ã€‚`plugins/platforms/teams/` æ¶µç›– Bot Framework / Adaptive Cardsï¼Œ`plugins/platforms/google_chat/` æ¶µç›–åŸºäºŽ OAuth çš„ REST APIï¼Œ`plugins/platforms/line/` æ¶µç›–å¸¦å¹³å°ä¸“å±žæ…¢é€Ÿ LLM UX çš„ webhook é©±åŠ¨æ¶ˆæ¯ APIã€‚

---

## åˆ†æ­¥æ¸…å•ï¼ˆå†…ç½®è·¯å¾„ï¼‰{#step-by-step-checklist}

:::note
æ­¤æ¸…å•ç”¨äºŽå°†å¹³å°ç›´æŽ¥æ·»åŠ åˆ° Zed æ ¸å¿ƒä»£ç åº“ â€” é€šå¸¸ç”±æ ¸å¿ƒè´¡çŒ®è€…ä¸ºå®˜æ–¹æ”¯æŒçš„å¹³å°æ‰§è¡Œã€‚ç¤¾åŒº/ç¬¬ä¸‰æ–¹å¹³å°åº”ä½¿ç”¨ä¸Šæ–¹çš„ [Plugin è·¯å¾„](#plugin-path-recommended)ã€‚
:::

### 1. Platform æžšä¸¾

åœ¨ `gateway/config.py` çš„ `Platform` æžšä¸¾ä¸­æ·»åŠ ä½ çš„å¹³å°ï¼š

```python
class Platform(str, Enum):
    # ... çŽ°æœ‰å¹³å° ...
    NEWPLAT = "newplat"
```

### 2. é€‚é…å™¨æ–‡ä»¶

åˆ›å»º `gateway/platforms/newplat.py`ï¼š

```python
from gateway.config import Platform, PlatformConfig
from gateway.platforms.base import (
    BasePlatformAdapter, MessageEvent, MessageType, SendResult,
)

def check_newplat_requirements() -> bool:
    """å¦‚æžœä¾èµ–å¯ç”¨åˆ™è¿”å›ž Trueã€‚"""
    return SOME_SDK_AVAILABLE

class NewPlatAdapter(BasePlatformAdapter):
    def __init__(self, config: PlatformConfig):
        super().__init__(config, Platform.NEWPLAT)
        # ä»Ž config.extra å­—å…¸è¯»å–é…ç½®
        extra = config.extra or {}
        self._api_key = extra.get("api_key") or os.getenv("NEWPLAT_API_KEY", "")

    async def connect(self) -> bool:
        # å»ºç«‹è¿žæŽ¥ï¼Œå¯åŠ¨è½®è¯¢/webhook
        self._mark_connected()
        return True

    async def disconnect(self) -> None:
        self._running = False
        self._mark_disconnected()

    async def send(self, chat_id, content, reply_to=None, metadata=None):
        # é€šè¿‡å¹³å° API å‘é€æ¶ˆæ¯
        return SendResult(success=True, message_id="...")

    async def get_chat_info(self, chat_id):
        return {"name": chat_id, "type": "dm"}
```

å¯¹äºŽå…¥ç«™æ¶ˆæ¯ï¼Œæž„å»º `MessageEvent` å¹¶è°ƒç”¨ `self.handle_message(event)`ï¼š

```python
source = self.build_source(
    chat_id=chat_id,
    chat_name=name,
    chat_type="dm",  # æˆ– "group"
    user_id=user_id,
    user_name=user_name,
)
event = MessageEvent(
    text=content,
    message_type=MessageType.TEXT,
    source=source,
    message_id=msg_id,
)
await self.handle_message(event)
```

### 3. Gateway é…ç½®ï¼ˆ`gateway/config.py`ï¼‰

ä¸‰ä¸ªæŽ¥è§¦ç‚¹ï¼š

1. **`get_connected_platforms()`** â€” æ·»åŠ å¯¹ä½ å¹³å°æ‰€éœ€å‡­æ®çš„æ£€æŸ¥
2. **`load_gateway_config()`** â€” æ·»åŠ  token çŽ¯å¢ƒå˜é‡æ˜ å°„æ¡ç›®ï¼š`Platform.NEWPLAT: "NEWPLAT_TOKEN"`
3. **`_apply_env_overrides()`** â€” å°†æ‰€æœ‰ `NEWPLAT_*` çŽ¯å¢ƒå˜é‡æ˜ å°„åˆ°é…ç½®

### 4. Gateway Runnerï¼ˆ`gateway/run.py`ï¼‰

äº”ä¸ªæŽ¥è§¦ç‚¹ï¼š

1. **`_create_adapter()`** â€” æ·»åŠ  `elif platform == Platform.NEWPLAT:` åˆ†æ”¯
2. **`_is_user_authorized()` allowed_users æ˜ å°„** â€” `Platform.NEWPLAT: "NEWPLAT_ALLOWED_USERS"`
3. **`_is_user_authorized()` allow_all æ˜ å°„** â€” `Platform.NEWPLAT: "NEWPLAT_ALLOW_ALL_USERS"`
4. **æ—©æœŸçŽ¯å¢ƒæ£€æŸ¥ `_any_allowlist` å…ƒç»„** â€” æ·»åŠ  `"NEWPLAT_ALLOWED_USERS"`
5. **æ—©æœŸçŽ¯å¢ƒæ£€æŸ¥ `_allow_all` å…ƒç»„** â€” æ·»åŠ  `"NEWPLAT_ALLOW_ALL_USERS"`
6. **`_UPDATE_ALLOWED_PLATFORMS` frozenset** â€” æ·»åŠ  `Platform.NEWPLAT`

### 5. è·¨å¹³å°æŠ•é€’

1. **`gateway/platforms/webhook.py`** â€” å°† `"newplat"` æ·»åŠ åˆ°æŠ•é€’ç±»åž‹å…ƒç»„
2. **`cron/scheduler.py`** â€” æ·»åŠ åˆ° `_KNOWN_DELIVERY_PLATFORMS` frozenset å’Œ `_deliver_result()` å¹³å°æ˜ å°„

### 6. CLI é›†æˆ

1. **`zed_cli/config.py`** â€” å°†æ‰€æœ‰ `NEWPLAT_*` å˜é‡æ·»åŠ åˆ° `_EXTRA_ENV_KEYS`
2. **`zed_cli/gateway.py`** â€” åœ¨ `_PLATFORMS` åˆ—è¡¨ä¸­æ·»åŠ æ¡ç›®ï¼ŒåŒ…å« keyã€labelã€emojiã€token_varã€setup_instructions å’Œ vars
3. **`zed_cli/platforms.py`** â€” æ·»åŠ å¸¦ label å’Œ default_toolset çš„ `PlatformInfo` æ¡ç›®ï¼ˆä¾› `skills_config` å’Œ `tools_config` TUI ä½¿ç”¨ï¼‰
4. **`zed_cli/setup.py`** â€” æ·»åŠ  `_setup_newplat()` å‡½æ•°ï¼ˆå¯å§”æ‰˜ç»™ `gateway.py`ï¼‰å¹¶å°†å…ƒç»„æ·»åŠ åˆ°æ¶ˆæ¯å¹³å°åˆ—è¡¨
5. **`zed_cli/status.py`** â€” æ·»åŠ å¹³å°æ£€æµ‹æ¡ç›®ï¼š`"NewPlat": ("NEWPLAT_TOKEN", "NEWPLAT_HOME_CHANNEL")`
6. **`zed_cli/dump.py`** â€” å°† `"newplat": "NEWPLAT_TOKEN"` æ·»åŠ åˆ°å¹³å°æ£€æµ‹å­—å…¸

### 7. å·¥å…·

1. **`tools/send_message_tool.py`** â€” å°† `"newplat": Platform.NEWPLAT` æ·»åŠ åˆ°å¹³å°æ˜ å°„
2. **`tools/cronjob_tools.py`** â€” å°† `newplat` æ·»åŠ åˆ°æŠ•é€’ç›®æ ‡æè¿°å­—ç¬¦ä¸²

### 8. Toolset

1. **`toolsets.py`** â€” æ·»åŠ å¸¦ `_ZED_CORE_TOOLS` çš„ `"zed-newplat"` toolset å®šä¹‰
2. **`toolsets.py`** â€” å°† `"zed-newplat"` æ·»åŠ åˆ° `"zed-gateway"` çš„ includes åˆ—è¡¨

### 9. å¯é€‰ï¼šå¹³å°æç¤º

**`agent/prompt_builder.py`** â€” å¦‚æžœä½ çš„å¹³å°æœ‰ç‰¹å®šæ¸²æŸ“é™åˆ¶ï¼ˆä¸æ”¯æŒ markdownã€æ¶ˆæ¯é•¿åº¦é™åˆ¶ç­‰ï¼‰ï¼Œåœ¨ `_PLATFORM_HINTS` å­—å…¸ä¸­æ·»åŠ æ¡ç›®ã€‚è¿™ä¼šå°†å¹³å°ä¸“å±žæŒ‡å¯¼æ³¨å…¥ç³»ç»Ÿ promptï¼š

```python
_PLATFORM_HINTS = {
    # ...
    "newplat": (
        "You are chatting via NewPlat. It supports markdown formatting "
        "but has a 4000-character message limit."
    ),
}
```

å¹¶éžæ‰€æœ‰å¹³å°éƒ½éœ€è¦æç¤º â€” ä»…åœ¨ agent è¡Œä¸ºåº”æœ‰æ‰€ä¸åŒæ—¶æ·»åŠ ã€‚

### 10. æµ‹è¯•

åˆ›å»º `tests/gateway/test_newplat.py`ï¼Œè¦†ç›–ï¼š

- ä»Žé…ç½®æž„å»ºé€‚é…å™¨
- æ¶ˆæ¯äº‹ä»¶æž„å»º
- å‘é€æ–¹æ³•ï¼ˆmock å¤–éƒ¨ APIï¼‰
- å¹³å°ä¸“å±žåŠŸèƒ½ï¼ˆåŠ å¯†ã€è·¯ç”±ç­‰ï¼‰

### 11. æ–‡æ¡£

| æ–‡ä»¶ | éœ€æ·»åŠ å†…å®¹ |
|------|-------------|
| `website/docs/user-guide/messaging/newplat.md` | å®Œæ•´çš„å¹³å°è®¾ç½®é¡µé¢ |
| `website/docs/user-guide/messaging/index.md` | å¹³å°å¯¹æ¯”è¡¨ã€æž¶æž„å›¾ã€toolset è¡¨ã€å®‰å…¨ç« èŠ‚ã€ä¸‹ä¸€æ­¥é“¾æŽ¥ |
| `website/docs/reference/environment-variables.md` | æ‰€æœ‰ NEWPLAT_* çŽ¯å¢ƒå˜é‡ |
| `website/docs/reference/toolsets-reference.md` | zed-newplat toolset |
| `website/docs/integrations/index.md` | å¹³å°é“¾æŽ¥ |
| `website/sidebars.ts` | æ–‡æ¡£é¡µé¢çš„ä¾§è¾¹æ æ¡ç›® |
| `website/docs/developer-guide/architecture.md` | é€‚é…å™¨æ•°é‡ + åˆ—è¡¨ |
| `website/docs/developer-guide/gateway-internals.md` | é€‚é…å™¨æ–‡ä»¶åˆ—è¡¨ |

## ä¸€è‡´æ€§å®¡è®¡

åœ¨å°†æ–°å¹³å° PR æ ‡è®°ä¸ºå®Œæˆä¹‹å‰ï¼Œå¯¹ç…§å·²æœ‰å¹³å°è¿›è¡Œä¸€è‡´æ€§å®¡è®¡ï¼š

```bash
# æŸ¥æ‰¾æ‰€æœ‰æåŠå‚è€ƒå¹³å°çš„ .py æ–‡ä»¶
search_files "bluebubbles" output_mode="files_only" file_glob="*.py"

# æŸ¥æ‰¾æ‰€æœ‰æåŠæ–°å¹³å°çš„ .py æ–‡ä»¶
search_files "newplat" output_mode="files_only" file_glob="*.py"

# åœ¨ç¬¬ä¸€ä¸ªé›†åˆä¸­ä½†ä¸åœ¨ç¬¬äºŒä¸ªé›†åˆä¸­çš„æ–‡ä»¶æ˜¯æ½œåœ¨çš„é—æ¼ç‚¹
```

å¯¹ `.md` å’Œ `.ts` æ–‡ä»¶é‡å¤ä¸Šè¿°æ“ä½œã€‚é€ä¸€æŽ’æŸ¥æ¯ä¸ªé—æ¼ç‚¹ â€” æ˜¯å¹³å°æžšä¸¾ï¼ˆéœ€è¦æ›´æ–°ï¼‰è¿˜æ˜¯å¹³å°ä¸“å±žå¼•ç”¨ï¼ˆå¯è·³è¿‡ï¼‰ï¼Ÿ

## å¸¸è§æ¨¡å¼

### é•¿è½®è¯¢é€‚é…å™¨

å¦‚æžœä½ çš„é€‚é…å™¨ä½¿ç”¨é•¿è½®è¯¢ï¼ˆå¦‚ Telegram æˆ– Weixinï¼‰ï¼Œä½¿ç”¨è½®è¯¢å¾ªçŽ¯ä»»åŠ¡ï¼š

```python
async def connect(self):
    self._poll_task = asyncio.create_task(self._poll_loop())
    self._mark_connected()

async def _poll_loop(self):
    while self._running:
        messages = await self._fetch_updates()
        for msg in messages:
            await self.handle_message(self._build_event(msg))
```

### å›žè°ƒ/Webhook é€‚é…å™¨

å¦‚æžœå¹³å°å°†æ¶ˆæ¯æŽ¨é€åˆ°ä½ çš„ç«¯ç‚¹ï¼ˆå¦‚ WeCom å›žè°ƒï¼‰ï¼Œè¿è¡Œ HTTP æœåŠ¡å™¨ï¼š

```python
async def connect(self):
    self._app = web.Application()
    self._app.router.add_post("/callback", self._handle_callback)
    # ... å¯åŠ¨ aiohttp æœåŠ¡å™¨
    self._mark_connected()

async def _handle_callback(self, request):
    event = self._build_event(await request.text())
    await self._message_queue.put(event)
    return web.Response(text="success")  # ç«‹å³ç¡®è®¤
```

å¯¹äºŽæœ‰ä¸¥æ ¼å“åº”æˆªæ­¢æ—¶é—´çš„å¹³å°ï¼ˆä¾‹å¦‚ WeCom çš„ 5 ç§’é™åˆ¶ï¼‰ï¼Œå§‹ç»ˆç«‹å³ç¡®è®¤ï¼Œç¨åŽé€šè¿‡ API ä¸»åŠ¨æŠ•é€’ agent çš„å›žå¤ã€‚Agent ä¼šè¯è¿è¡Œ 3â€“30 åˆ†é’Ÿ â€” åœ¨å›žè°ƒå“åº”çª—å£å†…å†…è”å›žå¤æ˜¯ä¸å¯è¡Œçš„ã€‚

### Token é”

å¦‚æžœé€‚é…å™¨æŒæœ‰å¸¦å”¯ä¸€å‡­æ®çš„æŒä¹…è¿žæŽ¥ï¼Œæ·»åŠ ä½œç”¨åŸŸé”ä»¥é˜²æ­¢ä¸¤ä¸ªé…ç½®æ–‡ä»¶ä½¿ç”¨ç›¸åŒå‡­æ®ï¼š

```python
from gateway.status import acquire_scoped_lock, release_scoped_lock

async def connect(self):
    if not acquire_scoped_lock("newplat", self._token):
        logger.error("Token already in use by another profile")
        return False
    # ... è¿žæŽ¥

async def disconnect(self):
    release_scoped_lock("newplat", self._token)
```

## å‚è€ƒå®žçŽ°

| é€‚é…å™¨ | æ¨¡å¼ | å¤æ‚åº¦ | é€‚åˆå‚è€ƒçš„åœºæ™¯ |
|---------|---------|------------|-------------------|
| `bluebubbles.py` | REST + webhook | ä¸­ | ç®€å• REST API é›†æˆ |
| `weixin.py` | é•¿è½®è¯¢ + CDN | é«˜ | åª’ä½“å¤„ç†ã€åŠ å¯† |
| `wecom_callback.py` | å›žè°ƒ/webhook | ä¸­ | HTTP æœåŠ¡å™¨ã€AES åŠ å¯†ã€å¤šåº”ç”¨ |
| `telegram.py` | é•¿è½®è¯¢ + Bot API | é«˜ | æ”¯æŒç¾¤ç»„ã€çº¿ç¨‹çš„å…¨åŠŸèƒ½é€‚é…å™¨ |
