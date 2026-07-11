---
title: Home Assistant
description: é€šè¿‡ Home Assistant é›†æˆï¼Œä½¿ç”¨ Zed Agent æŽ§åˆ¶æ‚¨çš„æ™ºèƒ½å®¶å±…ã€‚
sidebar_label: Home Assistant
sidebar_position: 5
---

# Home Assistant é›†æˆ

Zed Agent é€šè¿‡ä»¥ä¸‹ä¸¤ç§æ–¹å¼ä¸Ž [Home Assistant](https://www.home-assistant.io/) é›†æˆï¼š

1. **Gateway å¹³å°** â€” é€šè¿‡ WebSocket è®¢é˜…å®žæ—¶çŠ¶æ€å˜æ›´å¹¶å“åº”äº‹ä»¶
2. **æ™ºèƒ½å®¶å±…å·¥å…·** â€” å››ä¸ªå¯ä¾› LLM è°ƒç”¨çš„å·¥å…·ï¼Œé€šè¿‡ REST API æŸ¥è¯¢å’ŒæŽ§åˆ¶è®¾å¤‡

## é…ç½®

### 1. åˆ›å»ºé•¿æœŸè®¿é—®ä»¤ç‰Œ

1. æ‰“å¼€æ‚¨çš„ Home Assistant å®žä¾‹
2. è¿›å…¥**ä¸ªäººèµ„æ–™**ï¼ˆç‚¹å‡»ä¾§è¾¹æ ä¸­çš„ç”¨æˆ·åï¼‰
3. æ»šåŠ¨è‡³**é•¿æœŸè®¿é—®ä»¤ç‰Œ**
4. ç‚¹å‡»**åˆ›å»ºä»¤ç‰Œ**ï¼Œå‘½åä¸º"Zed Agent"
5. å¤åˆ¶ä»¤ç‰Œ

### 2. é…ç½®çŽ¯å¢ƒå˜é‡

```bash
# Add to ~/.zed/.env

# Required: your Long-Lived Access Token
HASS_TOKEN=your-long-lived-access-token

# Optional: HA URL (default: http://homeassistant.local:8123)
HASS_URL=http://192.168.1.100:8123
```

:::info
è®¾ç½® `HASS_TOKEN` åŽï¼Œ`homeassistant` å·¥å…·é›†å°†è‡ªåŠ¨å¯ç”¨ã€‚Gateway å¹³å°å’Œè®¾å¤‡æŽ§åˆ¶å·¥å…·å‡é€šè¿‡è¿™ä¸€ä¸ªä»¤ç‰Œæ¿€æ´»ã€‚
:::

### 3. å¯åŠ¨ Gateway

```bash
zed gateway
```

Home Assistant å°†ä½œä¸ºå·²è¿žæŽ¥å¹³å°å‡ºçŽ°ï¼Œä¸Žå…¶ä»–æ¶ˆæ¯å¹³å°ï¼ˆTelegramã€Discord ç­‰ï¼‰å¹¶åˆ—æ˜¾ç¤ºã€‚

## å¯ç”¨å·¥å…·

Zed Agent æ³¨å†Œäº†å››ä¸ªæ™ºèƒ½å®¶å±…æŽ§åˆ¶å·¥å…·ï¼š

### `ha_list_entities`

åˆ—å‡º Home Assistant å®žä½“ï¼Œå¯æŒ‰åŸŸï¼ˆdomainï¼‰æˆ–åŒºåŸŸï¼ˆareaï¼‰è¿‡æ»¤ã€‚

**å‚æ•°ï¼š**
- `domain` *ï¼ˆå¯é€‰ï¼‰* â€” æŒ‰å®žä½“åŸŸè¿‡æ»¤ï¼š`light`ã€`switch`ã€`climate`ã€`sensor`ã€`binary_sensor`ã€`cover`ã€`fan`ã€`media_player` ç­‰ã€‚
- `area` *ï¼ˆå¯é€‰ï¼‰* â€” æŒ‰åŒºåŸŸ/æˆ¿é—´åç§°è¿‡æ»¤ï¼ˆä¸Žå‹å¥½åç§°åŒ¹é…ï¼‰ï¼š`living room`ã€`kitchen`ã€`bedroom` ç­‰ã€‚

**ç¤ºä¾‹ï¼š**
```
List all lights in the living room
```

è¿”å›žå®žä½“ IDã€çŠ¶æ€åŠå‹å¥½åç§°ã€‚

### `ha_get_state`

èŽ·å–å•ä¸ªå®žä½“çš„è¯¦ç»†çŠ¶æ€ï¼ŒåŒ…æ‹¬æ‰€æœ‰å±žæ€§ï¼ˆäº®åº¦ã€é¢œè‰²ã€æ¸©åº¦è®¾å®šå€¼ã€ä¼ æ„Ÿå™¨è¯»æ•°ç­‰ï¼‰ã€‚

**å‚æ•°ï¼š**
- `entity_id` *ï¼ˆå¿…å¡«ï¼‰* â€” è¦æŸ¥è¯¢çš„å®žä½“ï¼Œä¾‹å¦‚ `light.living_room`ã€`climate.thermostat`ã€`sensor.temperature`

**ç¤ºä¾‹ï¼š**
```
What's the current state of climate.thermostat?
```

è¿”å›žï¼šçŠ¶æ€ã€æ‰€æœ‰å±žæ€§ã€æœ€åŽå˜æ›´/æ›´æ–°æ—¶é—´æˆ³ã€‚

### `ha_list_services`

åˆ—å‡ºå¯ç”¨äºŽè®¾å¤‡æŽ§åˆ¶çš„æœåŠ¡ï¼ˆæ“ä½œï¼‰ã€‚æ˜¾ç¤ºæ¯ç§è®¾å¤‡ç±»åž‹å¯æ‰§è¡Œçš„æ“ä½œåŠå…¶æŽ¥å—çš„å‚æ•°ã€‚

**å‚æ•°ï¼š**
- `domain` *ï¼ˆå¯é€‰ï¼‰* â€” æŒ‰åŸŸè¿‡æ»¤ï¼Œä¾‹å¦‚ `light`ã€`climate`ã€`switch`

**ç¤ºä¾‹ï¼š**
```
What services are available for climate devices?
```

### `ha_call_service`

è°ƒç”¨ Home Assistant æœåŠ¡ä»¥æŽ§åˆ¶è®¾å¤‡ã€‚

**å‚æ•°ï¼š**
- `domain` *ï¼ˆå¿…å¡«ï¼‰* â€” æœåŠ¡åŸŸï¼š`light`ã€`switch`ã€`climate`ã€`cover`ã€`media_player`ã€`fan`ã€`scene`ã€`script`
- `service` *ï¼ˆå¿…å¡«ï¼‰* â€” æœåŠ¡åç§°ï¼š`turn_on`ã€`turn_off`ã€`toggle`ã€`set_temperature`ã€`set_hvac_mode`ã€`open_cover`ã€`close_cover`ã€`set_volume_level`
- `entity_id` *ï¼ˆå¯é€‰ï¼‰* â€” ç›®æ ‡å®žä½“ï¼Œä¾‹å¦‚ `light.living_room`
- `data` *ï¼ˆå¯é€‰ï¼‰* â€” ä»¥ JSON å¯¹è±¡å½¢å¼ä¼ å…¥çš„é™„åŠ å‚æ•°

**ç¤ºä¾‹ï¼š**

```
Turn on the living room lights
â†’ ha_call_service(domain="light", service="turn_on", entity_id="light.living_room")
```

```
Set the thermostat to 22 degrees in heat mode
â†’ ha_call_service(domain="climate", service="set_temperature",
    entity_id="climate.thermostat", data={"temperature": 22, "hvac_mode": "heat"})
```

```
Set living room lights to blue at 50% brightness
â†’ ha_call_service(domain="light", service="turn_on",
    entity_id="light.living_room", data={"brightness": 128, "color_name": "blue"})
```

## Gateway å¹³å°ï¼šå®žæ—¶äº‹ä»¶

Home Assistant gateway é€‚é…å™¨é€šè¿‡ WebSocket è¿žæŽ¥å¹¶è®¢é˜… `state_changed` äº‹ä»¶ã€‚å½“è®¾å¤‡çŠ¶æ€å‘ç”Ÿå˜æ›´ä¸”ç¬¦åˆè¿‡æ»¤æ¡ä»¶æ—¶ï¼Œè¯¥äº‹ä»¶å°†ä½œä¸ºæ¶ˆæ¯è½¬å‘ç»™ agentã€‚

### äº‹ä»¶è¿‡æ»¤

:::warning å¿…è¦é…ç½®
é»˜è®¤æƒ…å†µä¸‹ï¼Œ**ä¸è½¬å‘ä»»ä½•äº‹ä»¶**ã€‚æ‚¨å¿…é¡»é…ç½® `watch_domains`ã€`watch_entities` æˆ– `watch_all` ä¸­çš„è‡³å°‘ä¸€é¡¹æ‰èƒ½æŽ¥æ”¶äº‹ä»¶ã€‚è‹¥æœªè®¾ç½®è¿‡æ»¤å™¨ï¼Œå¯åŠ¨æ—¶å°†è®°å½•è­¦å‘Šæ—¥å¿—ï¼Œæ‰€æœ‰çŠ¶æ€å˜æ›´å°†è¢«é™é»˜ä¸¢å¼ƒã€‚
:::

åœ¨ `~/.zed/config.yaml` ä¸­ï¼ŒäºŽ Home Assistant å¹³å°çš„ `extra` éƒ¨åˆ†é…ç½® agent æŽ¥æ”¶çš„äº‹ä»¶ï¼š

```yaml
platforms:
  homeassistant:
    enabled: true
    extra:
      watch_domains:
        - climate
        - binary_sensor
        - alarm_control_panel
        - light
      watch_entities:
        - sensor.front_door_battery
      ignore_entities:
        - sensor.uptime
        - sensor.cpu_usage
        - sensor.memory_usage
      cooldown_seconds: 30
```

| è®¾ç½® | é»˜è®¤å€¼ | è¯´æ˜Ž |
|---------|---------|-------------|
| `watch_domains` | *ï¼ˆæ— ï¼‰* | ä»…ç›‘å¬è¿™äº›å®žä½“åŸŸï¼ˆä¾‹å¦‚ `climate`ã€`light`ã€`binary_sensor`ï¼‰ |
| `watch_entities` | *ï¼ˆæ— ï¼‰* | ä»…ç›‘å¬è¿™äº›ç‰¹å®šå®žä½“ ID |
| `watch_all` | `false` | è®¾ä¸º `true` ä»¥æŽ¥æ”¶**æ‰€æœ‰**çŠ¶æ€å˜æ›´ï¼ˆä¸æŽ¨èç”¨äºŽå¤§å¤šæ•°åœºæ™¯ï¼‰ |
| `ignore_entities` | *ï¼ˆæ— ï¼‰* | å§‹ç»ˆå¿½ç•¥è¿™äº›å®žä½“ï¼ˆåœ¨åŸŸ/å®žä½“è¿‡æ»¤å™¨ä¹‹å‰åº”ç”¨ï¼‰ |
| `cooldown_seconds` | `30` | åŒä¸€å®žä½“ä¸¤æ¬¡äº‹ä»¶ä¹‹é—´çš„æœ€å°é—´éš”ç§’æ•° |

:::tip
ä»Žä¸€ç»„ç²¾ç®€çš„åŸŸå¼€å§‹ â€” `climate`ã€`binary_sensor` å’Œ `alarm_control_panel` å·²è¦†ç›–æœ€å¸¸ç”¨çš„è‡ªåŠ¨åŒ–åœºæ™¯ã€‚æŒ‰éœ€æ·»åŠ æ›´å¤šåŸŸã€‚ä½¿ç”¨ `ignore_entities` å±è”½ CPU æ¸©åº¦æˆ–è¿è¡Œæ—¶é—´è®¡æ•°å™¨ç­‰å™ªå£°ä¼ æ„Ÿå™¨ã€‚
:::

### äº‹ä»¶æ ¼å¼åŒ–

çŠ¶æ€å˜æ›´å°†æ ¹æ®åŸŸæ ¼å¼åŒ–ä¸ºäººç±»å¯è¯»çš„æ¶ˆæ¯ï¼š

| åŸŸ | æ ¼å¼ |
|--------|--------|
| `climate` | "HVAC mode changed from 'off' to 'heat' (current: 21, target: 23)" |
| `sensor` | "changed from 21Â°C to 22Â°C" |
| `binary_sensor` | "triggered" / "cleared" |
| `light`ã€`switch`ã€`fan` | "turned on" / "turned off" |
| `alarm_control_panel` | "alarm state changed from 'armed_away' to 'triggered'" |
| *ï¼ˆå…¶ä»–ï¼‰* | "changed from 'old' to 'new'" |

### Agent å“åº”

Agent å‘å‡ºçš„æ¶ˆæ¯å°†ä»¥ **Home Assistant æŒä¹…é€šçŸ¥**çš„å½¢å¼æŽ¨é€ï¼ˆé€šè¿‡ `persistent_notification.create`ï¼‰ï¼Œæ ‡é¢˜ä¸º"Zed Agent"ï¼Œæ˜¾ç¤ºåœ¨ HA é€šçŸ¥é¢æ¿ä¸­ã€‚

### è¿žæŽ¥ç®¡ç†

- **WebSocket** æ¯ 30 ç§’å‘é€ä¸€æ¬¡å¿ƒè·³ï¼Œç”¨äºŽå®žæ—¶äº‹ä»¶
- **è‡ªåŠ¨é‡è¿ž**ï¼Œé€€é¿ç­–ç•¥ï¼š5s â†’ 10s â†’ 30s â†’ 60s
- **REST API** ç”¨äºŽå‡ºç«™é€šçŸ¥ï¼ˆç‹¬ç«‹ä¼šè¯ï¼Œé¿å…ä¸Ž WebSocket å†²çªï¼‰
- **é‰´æƒ** â€” HA äº‹ä»¶å§‹ç»ˆå·²æŽˆæƒï¼ˆæ— éœ€ç”¨æˆ·ç™½åå•ï¼Œ`HASS_TOKEN` è´Ÿè´£éªŒè¯è¿žæŽ¥ï¼‰

## å®‰å…¨æ€§

Home Assistant å·¥å…·å¼ºåˆ¶æ‰§è¡Œå®‰å…¨é™åˆ¶ï¼š

:::warning å·²å±è”½çš„åŸŸ
ä»¥ä¸‹æœåŠ¡åŸŸå·²è¢«**å±è”½**ï¼Œä»¥é˜²æ­¢åœ¨ HA ä¸»æœºä¸Šæ‰§è¡Œä»»æ„ä»£ç ï¼š

- `shell_command` â€” ä»»æ„ shell å‘½ä»¤
- `command_line` â€” æ‰§è¡Œå‘½ä»¤çš„ä¼ æ„Ÿå™¨/å¼€å…³
- `python_script` â€” è„šæœ¬åŒ– Python æ‰§è¡Œ
- `pyscript` â€” æ›´å¹¿æ³›çš„è„šæœ¬é›†æˆ
- `hassio` â€” æ’ä»¶æŽ§åˆ¶ã€ä¸»æœºå…³æœº/é‡å¯
- `rest_command` â€” æ¥è‡ª HA æœåŠ¡å™¨çš„ HTTP è¯·æ±‚ï¼ˆSSRF å‘é‡ï¼‰

å°è¯•è°ƒç”¨è¿™äº›åŸŸä¸­çš„æœåŠ¡å°†è¿”å›žé”™è¯¯ã€‚
:::

å®žä½“ ID å°†é€šè¿‡æ­£åˆ™è¡¨è¾¾å¼ `^[a-z_][a-z0-9_]*\.[a-z0-9_]+$` è¿›è¡ŒéªŒè¯ï¼Œä»¥é˜²æ­¢æ³¨å…¥æ”»å‡»ã€‚

## è‡ªåŠ¨åŒ–ç¤ºä¾‹

### æ™¨é—´ä¾‹ç¨‹

```
User: Start my morning routine

Agent:
1. ha_call_service(domain="light", service="turn_on",
     entity_id="light.bedroom", data={"brightness": 128})
2. ha_call_service(domain="climate", service="set_temperature",
     entity_id="climate.thermostat", data={"temperature": 22})
3. ha_call_service(domain="media_player", service="turn_on",
     entity_id="media_player.kitchen_speaker")
```

### å®‰å…¨æ£€æŸ¥

```
User: Is the house secure?

Agent:
1. ha_list_entities(domain="binary_sensor")
     â†’ checks door/window sensors
2. ha_get_state(entity_id="alarm_control_panel.home")
     â†’ checks alarm status
3. ha_list_entities(domain="lock")
     â†’ checks lock states
4. Reports: "All doors closed, alarm is armed_away, all locks engaged."
```

### å“åº”å¼è‡ªåŠ¨åŒ–ï¼ˆé€šè¿‡ Gateway äº‹ä»¶ï¼‰

ä½œä¸º gateway å¹³å°è¿žæŽ¥åŽï¼Œagent å¯å¯¹äº‹ä»¶ä½œå‡ºå“åº”ï¼š

```
[Home Assistant] Front Door: triggered (was cleared)

Agent automatically:
1. ha_get_state(entity_id="binary_sensor.front_door")
2. ha_call_service(domain="light", service="turn_on",
     entity_id="light.hallway")
3. Sends notification: "Front door opened. Hallway lights turned on."
```
