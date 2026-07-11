---
sidebar_position: 3
title: "Nix & NixOS å®‰è£…é…ç½®"
description: "ä½¿ç”¨ Nix å®‰è£…å’Œéƒ¨ç½² Zed Agentâ€”â€”ä»Žå¿«é€Ÿ `nix run` åˆ°å®Œå…¨å£°æ˜Žå¼çš„ NixOS æ¨¡å—ï¼ˆå«å®¹å™¨æ¨¡å¼ï¼‰"
---

# Nix & NixOS å®‰è£…é…ç½®

Zed Agent æä¾›äº†ä¸€ä¸ª Nix flakeï¼Œæ”¯æŒä¸‰ä¸ªå±‚çº§çš„é›†æˆï¼š

| å±‚çº§ | é€‚ç”¨å¯¹è±¡ | æä¾›å†…å®¹ |
|-------|-------------|--------------|
| **`nix run` / `nix profile install`** | ä»»æ„ Nix ç”¨æˆ·ï¼ˆmacOSã€Linuxï¼‰ | åŒ…å«æ‰€æœ‰ä¾èµ–çš„é¢„æž„å»ºäºŒè¿›åˆ¶æ–‡ä»¶â€”â€”ç„¶åŽä½¿ç”¨æ ‡å‡† CLI å·¥ä½œæµ |
| **NixOS æ¨¡å—ï¼ˆåŽŸç”Ÿï¼‰** | NixOS æœåŠ¡å™¨éƒ¨ç½² | å£°æ˜Žå¼é…ç½®ã€åŠ å›ºçš„ systemd æœåŠ¡ã€æ‰˜ç®¡å¯†é’¥ |
| **NixOS æ¨¡å—ï¼ˆå®¹å™¨ï¼‰** | éœ€è¦è‡ªæˆ‘ä¿®æ”¹èƒ½åŠ›çš„ Agent | ä»¥ä¸Šæ‰€æœ‰åŠŸèƒ½ï¼ŒåŠ ä¸Šä¸€ä¸ªæŒä¹…åŒ– Ubuntu å®¹å™¨ï¼ŒAgent å¯åœ¨å…¶ä¸­æ‰§è¡Œ `apt`/`pip`/`npm install` |

:::info ä¸Žæ ‡å‡†å®‰è£…çš„åŒºåˆ«
`curl | bash` å®‰è£…ç¨‹åºè‡ªè¡Œç®¡ç† Pythonã€Node åŠä¾èµ–é¡¹ã€‚Nix flake æ›¿ä»£äº†æ‰€æœ‰è¿™äº›â€”â€”æ¯ä¸ª Python ä¾èµ–éƒ½æ˜¯ç”± [uv2nix](https://github.com/pyproject-nix/uv2nix) æž„å»ºçš„ Nix derivationï¼Œè¿è¡Œæ—¶å·¥å…·ï¼ˆNode.jsã€gitã€ripgrepã€ffmpegï¼‰å·²å°è£…è¿›äºŒè¿›åˆ¶æ–‡ä»¶çš„ PATH ä¸­ã€‚ä¸éœ€è¦è¿è¡Œæ—¶ pipï¼Œä¸éœ€è¦æ¿€æ´» venvï¼Œä¸éœ€è¦ `npm install`ã€‚

**å¯¹äºŽéž NixOS ç”¨æˆ·**ï¼Œè¿™åªå½±å“å®‰è£…æ­¥éª¤ã€‚ä¹‹åŽçš„æ“ä½œï¼ˆ`zed setup`ã€`zed gateway install`ã€ç¼–è¾‘é…ç½®ï¼‰ä¸Žæ ‡å‡†å®‰è£…å®Œå…¨ç›¸åŒã€‚

**å¯¹äºŽ NixOS æ¨¡å—ç”¨æˆ·**ï¼Œæ•´ä¸ªç”Ÿå‘½å‘¨æœŸæœ‰æ‰€ä¸åŒï¼šé…ç½®å­˜æ”¾åœ¨ `configuration.nix` ä¸­ï¼Œå¯†é’¥é€šè¿‡ sops-nix/agenix ç®¡ç†ï¼ŒæœåŠ¡æ˜¯ä¸€ä¸ª systemd å•å…ƒï¼ŒCLI é…ç½®å‘½ä»¤è¢«å±è”½ã€‚ç®¡ç† zed çš„æ–¹å¼ä¸Žç®¡ç†å…¶ä»– NixOS æœåŠ¡ç›¸åŒã€‚
:::

## å‰ææ¡ä»¶

- **å·²å¯ç”¨ flakes çš„ Nix** â€” æŽ¨èä½¿ç”¨ [Determinate Nix](https://install.determinate.systems)ï¼ˆé»˜è®¤å¯ç”¨ flakesï¼‰
- **API å¯†é’¥**ï¼Œç”¨äºŽä½ æƒ³ä½¿ç”¨çš„æœåŠ¡ï¼ˆè‡³å°‘éœ€è¦ä¸€ä¸ª OpenRouter æˆ– Anthropic å¯†é’¥ï¼‰

---

## å¿«é€Ÿå¼€å§‹ï¼ˆä»»æ„ Nix ç”¨æˆ·ï¼‰

æ— éœ€å…‹éš†ä»“åº“ã€‚Nix ä¼šè‡ªåŠ¨èŽ·å–ã€æž„å»ºå¹¶è¿è¡Œæ‰€æœ‰å†…å®¹ï¼š

```bash
# ç›´æŽ¥è¿è¡Œï¼ˆé¦–æ¬¡ä½¿ç”¨æ—¶æž„å»ºï¼Œä¹‹åŽä½¿ç”¨ç¼“å­˜ï¼‰
nix run github:zedteam/zed-agent -- setup
nix run github:zedteam/zed-agent -- chat

# æˆ–æŒä¹…åŒ–å®‰è£…
nix profile install github:zedteam/zed-agent
zed setup
zed chat
```

æ‰§è¡Œ `nix profile install` åŽï¼Œ`zed`ã€`zed-agent` å’Œ `zed-acp` å°†å‡ºçŽ°åœ¨ä½ çš„ PATH ä¸­ã€‚ä¹‹åŽçš„å·¥ä½œæµä¸Ž[æ ‡å‡†å®‰è£…](./installation.md)å®Œå…¨ç›¸åŒâ€”â€”`zed setup` å¼•å¯¼ä½ å®Œæˆæä¾›å•†é€‰æ‹©ï¼Œ`zed gateway install` è®¾ç½® launchdï¼ˆmacOSï¼‰æˆ– systemd ç”¨æˆ·æœåŠ¡ï¼Œé…ç½®å­˜æ”¾åœ¨ `~/.zed/`ã€‚

<details>
<summary><strong>ä»Žæœ¬åœ°å…‹éš†æž„å»º</strong></summary>

```bash
git clone https://github.com/zedteam/zed-agent.git
cd zed-agent
nix build
./result/bin/zed setup
```

</details>

---

## NixOS æ¨¡å—

è¯¥ flake å¯¼å‡º `nixosModules.default`â€”â€”ä¸€ä¸ªå®Œæ•´çš„ NixOS æœåŠ¡æ¨¡å—ï¼Œä»¥å£°æ˜Žå¼æ–¹å¼ç®¡ç†ç”¨æˆ·åˆ›å»ºã€ç›®å½•ã€é…ç½®ç”Ÿæˆã€å¯†é’¥ã€æ–‡æ¡£å’ŒæœåŠ¡ç”Ÿå‘½å‘¨æœŸã€‚

:::note
æ­¤æ¨¡å—éœ€è¦ NixOSã€‚å¯¹äºŽéž NixOS ç³»ç»Ÿï¼ˆmacOSã€å…¶ä»– Linux å‘è¡Œç‰ˆï¼‰ï¼Œè¯·ä½¿ç”¨ `nix profile install` å’Œä¸Šè¿°æ ‡å‡† CLI å·¥ä½œæµã€‚
:::

### æ·»åŠ  Flake è¾“å…¥

```nix
# /etc/nixos/flake.nixï¼ˆæˆ–ä½ çš„ç³»ç»Ÿ flakeï¼‰
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    zed-agent.url = "github:zedteam/zed-agent";
  };

  outputs = { nixpkgs, zed-agent, ... }: {
    nixosConfigurations.your-host = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        zed-agent.nixosModules.default
        ./configuration.nix
      ];
    };
  };
}
```

### æœ€å°åŒ–é…ç½®

```nix
# configuration.nix
{ config, ... }: {
  services.zed-agent = {
    enable = true;
    settings.model.default = "anthropic/claude-sonnet-4";
    environmentFiles = [ config.sops.secrets."zed-env".path ];
    addToSystemPackages = true;
  };
}
```

å°±è¿™äº›ã€‚`nixos-rebuild switch` ä¼šåˆ›å»º `zed` ç”¨æˆ·ã€ç”Ÿæˆ `config.yaml`ã€è¿žæŽ¥å¯†é’¥å¹¶å¯åŠ¨ gatewayâ€”â€”è¿™æ˜¯ä¸€ä¸ªé•¿æœŸè¿è¡Œçš„æœåŠ¡ï¼Œå°† Agent è¿žæŽ¥åˆ°æ¶ˆæ¯å¹³å°ï¼ˆTelegramã€Discord ç­‰ï¼‰å¹¶ç›‘å¬ä¼ å…¥æ¶ˆæ¯ã€‚

:::warning å¯†é’¥æ˜¯å¿…éœ€çš„
ä¸Šé¢çš„ `environmentFiles` è¡Œå‡è®¾ä½ å·²é…ç½® [sops-nix](https://github.com/Mic92/sops-nix) æˆ– [agenix](https://github.com/ryantm/agenix)ã€‚è¯¥æ–‡ä»¶è‡³å°‘åº”åŒ…å«ä¸€ä¸ª LLM æä¾›å•†å¯†é’¥ï¼ˆä¾‹å¦‚ `OPENROUTER_API_KEY=sk-or-...`ï¼‰ã€‚å®Œæ•´è®¾ç½®è¯·å‚é˜…[å¯†é’¥ç®¡ç†](#secrets-management)ã€‚å¦‚æžœä½ è¿˜æ²¡æœ‰å¯†é’¥ç®¡ç†å™¨ï¼Œå¯ä»¥å…ˆä½¿ç”¨æ™®é€šæ–‡ä»¶â€”â€”åªéœ€ç¡®ä¿å®ƒä¸æ˜¯å…¨å±€å¯è¯»çš„ï¼š

```bash
echo "OPENROUTER_API_KEY=sk-or-your-key" | sudo install -m 0600 -o zed /dev/stdin /var/lib/zed/env
```

```nix
services.zed-agent.environmentFiles = [ "/var/lib/zed/env" ];
```
:::

:::tip addToSystemPackages
è®¾ç½® `addToSystemPackages = true` æœ‰ä¸¤ä¸ªä½œç”¨ï¼šå°† `zed` CLI æ·»åŠ åˆ°ç³»ç»Ÿ PATHï¼Œ**å¹¶**åœ¨ç³»ç»ŸèŒƒå›´å†…è®¾ç½® `ZED_HOME`ï¼Œä½¿äº¤äº’å¼ CLI ä¸Ž gateway æœåŠ¡å…±äº«çŠ¶æ€ï¼ˆä¼šè¯ã€æŠ€èƒ½ã€cronï¼‰ã€‚ä¸è®¾ç½®æ­¤é¡¹æ—¶ï¼Œåœ¨ shell ä¸­è¿è¡Œ `zed` ä¼šåˆ›å»ºç‹¬ç«‹çš„ `~/.zed/` ç›®å½•ã€‚
:::

### å®¹å™¨æ„ŸçŸ¥ CLI

:::info
å½“ `container.enable = true` ä¸” `addToSystemPackages = true` æ—¶ï¼Œä¸»æœºä¸Šçš„**æ‰€æœ‰** `zed` å‘½ä»¤éƒ½ä¼šè‡ªåŠ¨è·¯ç”±åˆ°æ‰˜ç®¡å®¹å™¨ä¸­æ‰§è¡Œã€‚è¿™æ„å‘³ç€ä½ çš„äº¤äº’å¼ CLI ä¼šè¯åœ¨ä¸Ž gateway æœåŠ¡ç›¸åŒçš„çŽ¯å¢ƒä¸­è¿è¡Œâ€”â€”å¯ä»¥è®¿é—®æ‰€æœ‰å®¹å™¨å†…å®‰è£…çš„åŒ…å’Œå·¥å…·ã€‚

- è·¯ç”±æ˜¯é€æ˜Žçš„ï¼š`zed chat`ã€`zed sessions list`ã€`zed version` ç­‰å‘½ä»¤éƒ½ä¼šåœ¨åº•å±‚ exec è¿›å®¹å™¨
- æ‰€æœ‰ CLI å‚æ•°åŽŸæ ·è½¬å‘
- å¦‚æžœå®¹å™¨æœªè¿è¡Œï¼ŒCLI ä¼šçŸ­æš‚é‡è¯•ï¼ˆäº¤äº’å¼ä½¿ç”¨æ—¶æ˜¾ç¤º 5 ç§’ spinnerï¼Œè„šæœ¬ä¸­é™é»˜ç­‰å¾… 10 ç§’ï¼‰ï¼Œç„¶åŽä»¥æ˜Žç¡®çš„é”™è¯¯é€€å‡ºâ€”â€”ä¸ä¼šé™é»˜å›žé€€
- å¯¹äºŽåœ¨ zed ä»£ç åº“ä¸Šå·¥ä½œçš„å¼€å‘è€…ï¼Œè®¾ç½® `ZED_DEV=1` å¯ç»•è¿‡å®¹å™¨è·¯ç”±ï¼Œç›´æŽ¥è¿è¡Œæœ¬åœ°æ£€å‡ºç‰ˆæœ¬

è®¾ç½® `container.hostUsers` å¯åˆ›å»º `~/.zed` åˆ°æœåŠ¡çŠ¶æ€ç›®å½•çš„ç¬¦å·é“¾æŽ¥ï¼Œä½¿ä¸»æœº CLI å’Œå®¹å™¨å…±äº«ä¼šè¯ã€é…ç½®å’Œè®°å¿†ï¼š

```nix
services.zed-agent = {
  container.enable = true;
  container.hostUsers = [ "your-username" ];
  addToSystemPackages = true;
};
```

`hostUsers` ä¸­åˆ—å‡ºçš„ç”¨æˆ·ä¼šè‡ªåŠ¨åŠ å…¥ `zed` ç»„ä»¥èŽ·å¾—æ–‡ä»¶æƒé™è®¿é—®ã€‚

**Podman ç”¨æˆ·ï¼š** NixOS æœåŠ¡ä»¥ root èº«ä»½è¿è¡Œå®¹å™¨ã€‚Docker ç”¨æˆ·é€šè¿‡ `docker` ç»„ socket èŽ·å¾—è®¿é—®æƒé™ï¼Œä½† Podman çš„ rootful å®¹å™¨éœ€è¦ sudoã€‚ä¸ºä½ çš„å®¹å™¨è¿è¡Œæ—¶æŽˆäºˆå…å¯† sudoï¼š

```nix
security.sudo.extraRules = [{
  users = [ "your-username" ];
  commands = [{
    command = "/run/current-system/sw/bin/podman";
    options = [ "NOPASSWD" ];
  }];
}];
```

CLI ä¼šè‡ªåŠ¨æ£€æµ‹ä½•æ—¶éœ€è¦ sudo å¹¶é€æ˜Žåœ°ä½¿ç”¨å®ƒã€‚æ²¡æœ‰æ­¤é…ç½®ï¼Œä½ éœ€è¦æ‰‹åŠ¨è¿è¡Œ `sudo zed chat`ã€‚
:::

### éªŒè¯è¿è¡ŒçŠ¶æ€

æ‰§è¡Œ `nixos-rebuild switch` åŽï¼Œæ£€æŸ¥æœåŠ¡æ˜¯å¦æ­£åœ¨è¿è¡Œï¼š

```bash
# æ£€æŸ¥æœåŠ¡çŠ¶æ€
systemctl status zed-agent

# æŸ¥çœ‹æ—¥å¿—ï¼ˆCtrl+C åœæ­¢ï¼‰
journalctl -u zed-agent -f

# å¦‚æžœ addToSystemPackages ä¸º trueï¼Œæµ‹è¯• CLI
zed version
zed config       # æ˜¾ç¤ºç”Ÿæˆçš„é…ç½®
```

### é€‰æ‹©éƒ¨ç½²æ¨¡å¼

æ¨¡å—æ”¯æŒä¸¤ç§æ¨¡å¼ï¼Œç”± `container.enable` æŽ§åˆ¶ï¼š

| | **åŽŸç”Ÿ**ï¼ˆé»˜è®¤ï¼‰ | **å®¹å™¨** |
|---|---|---|
| è¿è¡Œæ–¹å¼ | ä¸»æœºä¸ŠåŠ å›ºçš„ systemd æœåŠ¡ | æŒä¹…åŒ– Ubuntu å®¹å™¨ï¼Œ`/nix/store` ä»¥åªè¯»æ–¹å¼ç»‘å®šæŒ‚è½½ |
| å®‰å…¨æ€§ | `NoNewPrivileges`ã€`ProtectSystem=strict`ã€`PrivateTmp` | å®¹å™¨éš”ç¦»ï¼Œå†…éƒ¨ä»¥éžç‰¹æƒç”¨æˆ·è¿è¡Œ |
| Agent å¯è‡ªè¡Œå®‰è£…åŒ… | å¦â€”â€”ä»…é™ Nix æä¾›çš„ PATH ä¸Šçš„å·¥å…· | æ˜¯â€”â€”`apt`ã€`pip`ã€`npm` å®‰è£…çš„åŒ…åœ¨é‡å¯åŽæŒä¹…ä¿ç•™ |
| é…ç½®ç•Œé¢ | ç›¸åŒ | ç›¸åŒ |
| é€‚ç”¨åœºæ™¯ | æ ‡å‡†éƒ¨ç½²ã€æœ€é«˜å®‰å…¨æ€§ã€å¯é‡çŽ°æ€§ | Agent éœ€è¦è¿è¡Œæ—¶å®‰è£…åŒ…ã€å¯å˜çŽ¯å¢ƒã€å®žéªŒæ€§å·¥å…· |

å¯ç”¨å®¹å™¨æ¨¡å¼åªéœ€æ·»åŠ ä¸€è¡Œï¼š

```nix
{
  services.zed-agent = {
    enable = true;
    container.enable = true;
    # ... å…¶ä½™é…ç½®ç›¸åŒ
  };
}
```

:::info
å®¹å™¨æ¨¡å¼é€šè¿‡ `mkDefault` è‡ªåŠ¨å¯ç”¨ `virtualisation.docker.enable`ã€‚å¦‚æžœä½ ä½¿ç”¨ Podmanï¼Œè¯·è®¾ç½® `container.backend = "podman"` å¹¶å°† `virtualisation.docker.enable` è®¾ä¸º `false`ã€‚
:::

---

## é…ç½®

### å£°æ˜Žå¼è®¾ç½®

`settings` é€‰é¡¹æŽ¥å—ä»»æ„ attrsetï¼Œå¹¶å°†å…¶æ¸²æŸ“ä¸º `config.yaml`ã€‚å®ƒæ”¯æŒè·¨å¤šä¸ªæ¨¡å—å®šä¹‰çš„æ·±åº¦åˆå¹¶ï¼ˆé€šè¿‡ `lib.recursiveUpdate`ï¼‰ï¼Œå› æ­¤ä½ å¯ä»¥å°†é…ç½®æ‹†åˆ†åˆ°å¤šä¸ªæ–‡ä»¶ä¸­ï¼š

```nix
# base.nix
services.zed-agent.settings = {
  model.default = "anthropic/claude-sonnet-4";
  toolsets = [ "all" ];
  terminal = { backend = "local"; timeout = 180; };
};

# personality.nix
services.zed-agent.settings = {
  display = { compact = false; personality = "kawaii"; };
  memory = { memory_enabled = true; user_profile_enabled = true; };
};
```

ä¸¤è€…åœ¨æ±‚å€¼æ—¶æ·±åº¦åˆå¹¶ã€‚Nix å£°æ˜Žçš„é”®å§‹ç»ˆä¼˜å…ˆäºŽç£ç›˜ä¸ŠçŽ°æœ‰ `config.yaml` ä¸­çš„é”®ï¼Œä½† **Nix æœªæ¶‰åŠçš„ç”¨æˆ·æ·»åŠ é”®ä¼šè¢«ä¿ç•™**ã€‚è¿™æ„å‘³ç€å¦‚æžœ Agent æˆ–æ‰‹åŠ¨ç¼–è¾‘æ·»åŠ äº† `skills.disabled` æˆ– `streaming.enabled` ç­‰é”®ï¼Œå®ƒä»¬åœ¨ `nixos-rebuild switch` åŽä»ä¼šä¿ç•™ã€‚

:::note æ¨¡åž‹å‘½å
`settings.model.default` ä½¿ç”¨ä½ çš„æä¾›å•†æ‰€æœŸæœ›çš„æ¨¡åž‹æ ‡è¯†ç¬¦ã€‚ä½¿ç”¨ [OpenRouter](https://openrouter.ai)ï¼ˆé»˜è®¤ï¼‰æ—¶ï¼Œæ ¼å¼å¦‚ `"anthropic/claude-sonnet-4"` æˆ– `"google/gemini-3-flash"`ã€‚å¦‚æžœç›´æŽ¥ä½¿ç”¨æä¾›å•†ï¼ˆAnthropicã€OpenAIï¼‰ï¼Œè¯·å°† `settings.model.base_url` æŒ‡å‘å…¶ APIï¼Œå¹¶ä½¿ç”¨å…¶åŽŸç”Ÿæ¨¡åž‹ IDï¼ˆä¾‹å¦‚ `"claude-sonnet-4-20250514"`ï¼‰ã€‚æœªè®¾ç½® `base_url` æ—¶ï¼ŒZed é»˜è®¤ä½¿ç”¨ OpenRouterã€‚
:::

:::tip æŸ¥æ‰¾å¯ç”¨é…ç½®é”®
è¿è¡Œ `nix build .#configKeys && cat result` å¯æŸ¥çœ‹ä»Ž Python `DEFAULT_CONFIG` ä¸­æå–çš„æ‰€æœ‰å¶é…ç½®é”®ã€‚ä½ å¯ä»¥å°†çŽ°æœ‰çš„ `config.yaml` ç²˜è´´åˆ° `settings` attrset ä¸­â€”â€”ç»“æž„æ˜¯ 1:1 å¯¹åº”çš„ã€‚
:::

<details>
<summary><strong>å®Œæ•´ç¤ºä¾‹ï¼šæ‰€æœ‰å¸¸ç”¨è‡ªå®šä¹‰è®¾ç½®</strong></summary>

```nix
{ config, ... }: {
  services.zed-agent = {
    enable = true;
    container.enable = true;

    # â”€â”€ æ¨¡åž‹ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    settings = {
      model = {
        base_url = "https://openrouter.ai/api/v1";
        default = "anthropic/claude-opus-4.6";
      };
      toolsets = [ "all" ];
      max_turns = 100;
      terminal = { backend = "local"; cwd = "."; timeout = 180; };
      compression = {
        enabled = true;
        threshold = 0.85;
        summary_model = "google/gemini-3-flash-preview";
      };
      memory = { memory_enabled = true; user_profile_enabled = true; };
      display = { compact = false; personality = "kawaii"; };
      agent = { max_turns = 60; verbose = false; };
    };

    # â”€â”€ å¯†é’¥ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    environmentFiles = [ config.sops.secrets."zed-env".path ];

    # â”€â”€ æ–‡æ¡£ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    documents = {
      "USER.md" = ./documents/USER.md;
    };

    # â”€â”€ MCP æœåŠ¡å™¨ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    mcpServers.filesystem = {
      command = "npx";
      args = [ "-y" "@modelcontextprotocol/server-filesystem" "/data/workspace" ];
    };

    # â”€â”€ å®¹å™¨é€‰é¡¹ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    container = {
      image = "ubuntu:24.04";
      backend = "docker";
      hostUsers = [ "your-username" ];
      extraVolumes = [ "/home/user/projects:/projects:rw" ];
      extraOptions = [ "--gpus" "all" ];
    };

    # â”€â”€ æœåŠ¡è°ƒä¼˜ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    addToSystemPackages = true;
    extraArgs = [ "--verbose" ];
    restart = "always";
    restartSec = 5;
  };
}
```

</details>

### é€ƒç”Ÿèˆ±ï¼šè‡ªå¸¦é…ç½®æ–‡ä»¶

å¦‚æžœä½ å¸Œæœ›å®Œå…¨åœ¨ Nix ä¹‹å¤–ç®¡ç† `config.yaml`ï¼Œè¯·ä½¿ç”¨ `configFile`ï¼š

```nix
services.zed-agent.configFile = /etc/zed/config.yaml;
```

è¿™ä¼šå®Œå…¨ç»•è¿‡ `settings`â€”â€”ä¸åˆå¹¶ï¼Œä¸ç”Ÿæˆã€‚æ¯æ¬¡æ¿€æ´»æ—¶ï¼Œè¯¥æ–‡ä»¶ä¼šåŽŸæ ·å¤åˆ¶åˆ° `$ZED_HOME/config.yaml`ã€‚

### è‡ªå®šä¹‰é€ŸæŸ¥è¡¨

Nix ç”¨æˆ·æœ€å¸¸è§è‡ªå®šä¹‰éœ€æ±‚çš„å¿«é€Ÿå‚è€ƒï¼š

| æˆ‘æƒ³è¦... | é€‰é¡¹ | ç¤ºä¾‹ |
|---|---|---|
| æ›´æ”¹ LLM æ¨¡åž‹ | `settings.model.default` | `"anthropic/claude-sonnet-4"` |
| ä½¿ç”¨ä¸åŒçš„æä¾›å•†ç«¯ç‚¹ | `settings.model.base_url` | `"https://openrouter.ai/api/v1"` |
| æ·»åŠ  API å¯†é’¥ | `environmentFiles` | `[ config.sops.secrets."zed-env".path ]` |
| ç»™ Agent è®¾ç½®ä¸ªæ€§ | `${services.zed-agent.stateDir}/.zed/SOUL.md` | ç›´æŽ¥ç®¡ç†è¯¥æ–‡ä»¶ |
| æ·»åŠ  MCP å·¥å…·æœåŠ¡å™¨ | `mcpServers.<name>` | å‚è§ [MCP æœåŠ¡å™¨](#mcp-servers) |
| å°†ä¸»æœºç›®å½•æŒ‚è½½åˆ°å®¹å™¨ | `container.extraVolumes` | `[ "/data:/data:rw" ]` |
| ä¸ºå®¹å™¨ä¼ å…¥ GPU è®¿é—® | `container.extraOptions` | `[ "--gpus" "all" ]` |
| ä½¿ç”¨ Podman æ›¿ä»£ Docker | `container.backend` | `"podman"` |
| åœ¨ä¸»æœº CLI å’Œå®¹å™¨é—´å…±äº«çŠ¶æ€ | `container.hostUsers` | `[ "sidbin" ]` |
| ä¸º Agent æä¾›é¢å¤–å·¥å…· | `extraPackages` | `[ pkgs.pandoc pkgs.imagemagick ]` |
| ä½¿ç”¨è‡ªå®šä¹‰åŸºç¡€é•œåƒ | `container.image` | `"ubuntu:24.04"` |
| è¦†ç›– zed åŒ… | `package` | `inputs.zed-agent.packages.${system}.default.override { ... }` |
| æ›´æ”¹çŠ¶æ€ç›®å½• | `stateDir` | `"/opt/zed"` |
| è®¾ç½® Agent çš„å·¥ä½œç›®å½• | `workingDirectory` | `"/home/user/projects"` |

---

## å¯†é’¥ç®¡ç†

:::danger åˆ‡å‹¿å°† API å¯†é’¥æ”¾å…¥ `settings` æˆ– `environment`
Nix è¡¨è¾¾å¼ä¸­çš„å€¼ä¼šè¿›å…¥ `/nix/store`ï¼Œè¯¥ç›®å½•æ˜¯å…¨å±€å¯è¯»çš„ã€‚è¯·å§‹ç»ˆä½¿ç”¨å¸¦æœ‰å¯†é’¥ç®¡ç†å™¨çš„ `environmentFiles`ã€‚
:::

`environment`ï¼ˆéžå¯†é’¥å˜é‡ï¼‰å’Œ `environmentFiles`ï¼ˆå¯†é’¥æ–‡ä»¶ï¼‰åœ¨æ¿€æ´»æ—¶ï¼ˆ`nixos-rebuild switch`ï¼‰éƒ½ä¼šåˆå¹¶åˆ° `$ZED_HOME/.env` ä¸­ã€‚Zed åœ¨æ¯æ¬¡å¯åŠ¨æ—¶è¯»å–æ­¤æ–‡ä»¶ï¼Œå› æ­¤æ›´æ”¹åœ¨ `systemctl restart zed-agent` åŽç”Ÿæ•ˆâ€”â€”æ— éœ€é‡å»ºå®¹å™¨ã€‚

### sops-nix

```nix
{
  sops = {
    defaultSopsFile = ./secrets/zed.yaml;
    age.keyFile = "/home/user/.config/sops/age/keys.txt";
    secrets."zed-env" = { format = "yaml"; };
  };

  services.zed-agent.environmentFiles = [
    config.sops.secrets."zed-env".path
  ];
}
```

å¯†é’¥æ–‡ä»¶åŒ…å«é”®å€¼å¯¹ï¼š

```yaml
# secrets/zed.yamlï¼ˆä½¿ç”¨ sops åŠ å¯†ï¼‰
zed-env: |
    OPENROUTER_API_KEY=sk-or-...
    TELEGRAM_BOT_TOKEN=123456:ABC...
    ANTHROPIC_API_KEY=sk-ant-...
```

### agenix

```nix
{
  age.secrets.zed-env.file = ./secrets/zed-env.age;

  services.zed-agent.environmentFiles = [
    config.age.secrets.zed-env.path
  ];
}
```

### OAuth / è®¤è¯é¢„ç½®

å¯¹äºŽéœ€è¦ OAuth çš„å¹³å°ï¼ˆä¾‹å¦‚ Discordï¼‰ï¼Œä½¿ç”¨ `authFile` åœ¨é¦–æ¬¡éƒ¨ç½²æ—¶é¢„ç½®å‡­æ®ï¼š

```nix
{
  services.zed-agent = {
    authFile = config.sops.secrets."zed/auth.json".path;
    # authFileForceOverwrite = true;  # æ¯æ¬¡æ¿€æ´»æ—¶å¼ºåˆ¶è¦†ç›–
  };
}
```

ä»…å½“ `auth.json` ä¸å­˜åœ¨æ—¶æ‰å¤åˆ¶è¯¥æ–‡ä»¶ï¼ˆé™¤éž `authFileForceOverwrite = true`ï¼‰ã€‚è¿è¡Œæ—¶ OAuth token åˆ·æ–°ä¼šå†™å…¥çŠ¶æ€ç›®å½•ï¼Œå¹¶åœ¨é‡å»ºåŽä¿ç•™ã€‚

---

## æ–‡æ¡£

`documents` é€‰é¡¹å°†æ–‡ä»¶å®‰è£…åˆ° Agent çš„å·¥ä½œç›®å½•ï¼ˆå³ `workingDirectory`ï¼ŒAgent å°†å…¶ä½œä¸ºå·¥ä½œåŒºè¯»å–ï¼‰ã€‚Zed æŒ‰çº¦å®šæŸ¥æ‰¾ç‰¹å®šæ–‡ä»¶åï¼š

- **`USER.md`** â€” å…³äºŽ Agent æ­£åœ¨äº¤äº’çš„ç”¨æˆ·çš„ä¸Šä¸‹æ–‡ä¿¡æ¯ã€‚
- ä½ æ”¾ç½®åœ¨æ­¤å¤„çš„ä»»ä½•å…¶ä»–æ–‡ä»¶å¯¹ Agent éƒ½å¯è§ï¼Œä½œä¸ºå·¥ä½œåŒºæ–‡ä»¶ã€‚

Agent èº«ä»½æ–‡ä»¶æ˜¯ç‹¬ç«‹çš„ï¼šZed ä»Ž `$ZED_HOME/SOUL.md` åŠ è½½å…¶ä¸»è¦ `SOUL.md`ï¼Œåœ¨ NixOS æ¨¡å—ä¸­å¯¹åº” `${services.zed-agent.stateDir}/.zed/SOUL.md`ã€‚å°† `SOUL.md` æ”¾å…¥ `documents` åªä¼šåˆ›å»ºä¸€ä¸ªå·¥ä½œåŒºæ–‡ä»¶ï¼Œä¸ä¼šæ›¿æ¢ä¸»è§’è‰²æ–‡ä»¶ã€‚

```nix
{
  services.zed-agent.documents = {
    "USER.md" = ./documents/USER.md;  # è·¯å¾„å¼•ç”¨ï¼Œä»Ž Nix store å¤åˆ¶
  };
}
```

å€¼å¯ä»¥æ˜¯å†…è”å­—ç¬¦ä¸²æˆ–è·¯å¾„å¼•ç”¨ã€‚æ–‡ä»¶åœ¨æ¯æ¬¡ `nixos-rebuild switch` æ—¶å®‰è£…ã€‚

---

## MCP æœåŠ¡å™¨

`mcpServers` é€‰é¡¹ä»¥å£°æ˜Žå¼æ–¹å¼é…ç½® [MCPï¼ˆModel Context Protocolï¼Œæ¨¡åž‹ä¸Šä¸‹æ–‡åè®®ï¼‰](https://modelcontextprotocol.io)æœåŠ¡å™¨ã€‚æ¯ä¸ªæœåŠ¡å™¨ä½¿ç”¨ **stdio**ï¼ˆæœ¬åœ°å‘½ä»¤ï¼‰æˆ– **HTTP**ï¼ˆè¿œç¨‹ URLï¼‰ä¼ è¾“æ–¹å¼ã€‚

### stdio ä¼ è¾“ï¼ˆæœ¬åœ°æœåŠ¡å™¨ï¼‰

```nix
{
  services.zed-agent.mcpServers = {
    filesystem = {
      command = "npx";
      args = [ "-y" "@modelcontextprotocol/server-filesystem" "/data/workspace" ];
    };
    github = {
      command = "npx";
      args = [ "-y" "@modelcontextprotocol/server-github" ];
      env.GITHUB_PERSONAL_ACCESS_TOKEN = "\${GITHUB_TOKEN}"; # ä»Ž .env è§£æž
    };
  };
}
```

:::tip
`env` å€¼ä¸­çš„çŽ¯å¢ƒå˜é‡åœ¨è¿è¡Œæ—¶ä»Ž `$ZED_HOME/.env` è§£æžã€‚ä½¿ç”¨ `environmentFiles` æ³¨å…¥å¯†é’¥â€”â€”åˆ‡å‹¿å°† token ç›´æŽ¥æ”¾å…¥ Nix é…ç½®ã€‚
:::

### HTTP ä¼ è¾“ï¼ˆè¿œç¨‹æœåŠ¡å™¨ï¼‰

```nix
{
  services.zed-agent.mcpServers.remote-api = {
    url = "https://mcp.example.com/v1/mcp";
    headers.Authorization = "Bearer \${MCP_REMOTE_API_KEY}";
    timeout = 180;
  };
}
```

### å¸¦ OAuth çš„ HTTP ä¼ è¾“

å¯¹äºŽä½¿ç”¨ OAuth 2.1 çš„æœåŠ¡å™¨ï¼Œè®¾ç½® `auth = "oauth"`ã€‚Zed å®žçŽ°äº†å®Œæ•´çš„ PKCE æµç¨‹â€”â€”å…ƒæ•°æ®å‘çŽ°ã€åŠ¨æ€å®¢æˆ·ç«¯æ³¨å†Œã€token äº¤æ¢å’Œè‡ªåŠ¨åˆ·æ–°ã€‚

```nix
{
  services.zed-agent.mcpServers.my-oauth-server = {
    url = "https://mcp.example.com/mcp";
    auth = "oauth";
  };
}
```

Token å­˜å‚¨åœ¨ `$ZED_HOME/mcp-tokens/<server-name>.json` ä¸­ï¼Œåœ¨é‡å¯å’Œé‡å»ºåŽæŒä¹…ä¿ç•™ã€‚

<details>
<summary><strong>æ— å¤´æœåŠ¡å™¨ä¸Šçš„åˆå§‹ OAuth æŽˆæƒ</strong></summary>

é¦–æ¬¡ OAuth æŽˆæƒéœ€è¦åŸºäºŽæµè§ˆå™¨çš„åŒæ„æµç¨‹ã€‚åœ¨æ— å¤´éƒ¨ç½²ä¸­ï¼ŒZed å°†æŽˆæƒ URL æ‰“å°åˆ° stdout/æ—¥å¿—ï¼Œè€Œä¸æ˜¯æ‰“å¼€æµè§ˆå™¨ã€‚

**æ–¹æ¡ˆ Aï¼šäº¤äº’å¼å¼•å¯¼** â€” é€šè¿‡ `docker exec`ï¼ˆå®¹å™¨ï¼‰æˆ– `sudo -u zed`ï¼ˆåŽŸç”Ÿï¼‰è¿è¡Œä¸€æ¬¡æµç¨‹ï¼š

```bash
# å®¹å™¨æ¨¡å¼
docker exec -it zed-agent \
  zed mcp add my-oauth-server --url https://mcp.example.com/mcp --auth oauth

# åŽŸç”Ÿæ¨¡å¼
sudo -u zed ZED_HOME=/var/lib/zed/.zed \
  zed mcp add my-oauth-server --url https://mcp.example.com/mcp --auth oauth
```

å®¹å™¨ä½¿ç”¨ `--network=host`ï¼Œå› æ­¤ `127.0.0.1` ä¸Šçš„ OAuth å›žè°ƒç›‘å¬å™¨å¯ä»Žä¸»æœºæµè§ˆå™¨è®¿é—®ã€‚

**æ–¹æ¡ˆ Bï¼šé¢„ç½® token** â€” åœ¨å·¥ä½œç«™ä¸Šå®Œæˆæµç¨‹ï¼Œç„¶åŽå¤åˆ¶ tokenï¼š

```bash
zed mcp add my-oauth-server --url https://mcp.example.com/mcp --auth oauth
scp ~/.zed/mcp-tokens/my-oauth-server{,.client}.json \
    server:/var/lib/zed/.zed/mcp-tokens/
# ç¡®ä¿ï¼šchown zed:zedï¼Œchmod 0600
```

</details>

### Samplingï¼ˆæœåŠ¡å™¨å‘èµ·çš„ LLM è¯·æ±‚ï¼‰

éƒ¨åˆ† MCP æœåŠ¡å™¨å¯ä»¥å‘ Agent è¯·æ±‚ LLM è¡¥å…¨ï¼š

```nix
{
  services.zed-agent.mcpServers.analysis = {
    command = "npx";
    args = [ "-y" "analysis-server" ];
    sampling = {
      enabled = true;
      model = "google/gemini-3-flash";
      max_tokens_cap = 4096;
      timeout = 30;
      max_rpm = 10;
    };
  };
}
```

---

## æ‰˜ç®¡æ¨¡å¼

å½“ zed é€šè¿‡ NixOS æ¨¡å—è¿è¡Œæ—¶ï¼Œä»¥ä¸‹ CLI å‘½ä»¤ä¼šè¢«**å±è”½**ï¼Œå¹¶æ˜¾ç¤ºæŒ‡å‘ `configuration.nix` çš„æè¿°æ€§é”™è¯¯ï¼š

| è¢«å±è”½çš„å‘½ä»¤ | åŽŸå›  |
|---|---|
| `zed setup` | é…ç½®æ˜¯å£°æ˜Žå¼çš„â€”â€”è¯·åœ¨ Nix é…ç½®ä¸­ç¼–è¾‘ `settings` |
| `zed config edit` | é…ç½®ç”± `settings` ç”Ÿæˆ |
| `zed config set <key> <value>` | é…ç½®ç”± `settings` ç”Ÿæˆ |
| `zed gateway install` | systemd æœåŠ¡ç”± NixOS ç®¡ç† |
| `zed gateway uninstall` | systemd æœåŠ¡ç”± NixOS ç®¡ç† |

è¿™å¯ä»¥é˜²æ­¢ Nix å£°æ˜Žçš„å†…å®¹ä¸Žç£ç›˜ä¸Šå®žé™…å†…å®¹ä¹‹é—´äº§ç”Ÿæ¼‚ç§»ã€‚æ£€æµ‹ä½¿ç”¨ä¸¤ä¸ªä¿¡å·ï¼š

1. **`ZED_MANAGED=true`** çŽ¯å¢ƒå˜é‡â€”â€”ç”± systemd æœåŠ¡è®¾ç½®ï¼Œå¯¹ gateway è¿›ç¨‹å¯è§
2. **`.managed` æ ‡è®°æ–‡ä»¶**ï¼Œä½äºŽ `ZED_HOME` ä¸­â€”â€”ç”±æ¿€æ´»è„šæœ¬è®¾ç½®ï¼Œå¯¹äº¤äº’å¼ shell å¯è§ï¼ˆä¾‹å¦‚ `docker exec -it zed-agent zed config set ...` ä¹Ÿä¼šè¢«å±è”½ï¼‰

è¦æ›´æ”¹é…ç½®ï¼Œè¯·ç¼–è¾‘ä½ çš„ Nix é…ç½®å¹¶è¿è¡Œ `sudo nixos-rebuild switch`ã€‚

---

## å®¹å™¨æž¶æž„

:::info
æœ¬èŠ‚ä»…åœ¨ä½¿ç”¨ `container.enable = true` æ—¶ç›¸å…³ã€‚åŽŸç”Ÿæ¨¡å¼éƒ¨ç½²å¯è·³è¿‡ã€‚
:::

å¯ç”¨å®¹å™¨æ¨¡å¼åŽï¼Œzed åœ¨æŒä¹…åŒ– Ubuntu å®¹å™¨å†…è¿è¡Œï¼ŒNix æž„å»ºçš„äºŒè¿›åˆ¶æ–‡ä»¶ä»¥åªè¯»æ–¹å¼ä»Žä¸»æœºç»‘å®šæŒ‚è½½ï¼š

```
ä¸»æœº                                    å®¹å™¨
â”€â”€â”€â”€                                    â”€â”€â”€â”€â”€â”€â”€â”€â”€
/nix/store/...-zed-agent-0.1.0  â”€â”€â–º  /nix/store/... (ro)
~/.zed -> /var/lib/zed/.zed       ï¼ˆç¬¦å·é“¾æŽ¥æ¡¥æŽ¥ï¼ŒæŒ‰ hostUsersï¼‰
/var/lib/zed/                    â”€â”€â–º  /data/          (rw)
  â”œâ”€â”€ current-package -> /nix/store/...    ï¼ˆç¬¦å·é“¾æŽ¥ï¼Œæ¯æ¬¡é‡å»ºæ›´æ–°ï¼‰
  â”œâ”€â”€ .gc-root -> /nix/store/...           ï¼ˆé˜²æ­¢ nix-collect-garbageï¼‰
  â”œâ”€â”€ .container-identity                  ï¼ˆsha256 å“ˆå¸Œï¼Œè§¦å‘é‡å»ºï¼‰
  â”œâ”€â”€ .zed/                             ï¼ˆZED_HOMEï¼‰
  â”‚   â”œâ”€â”€ .env                             ï¼ˆä»Ž environment + environmentFiles åˆå¹¶ï¼‰
  â”‚   â”œâ”€â”€ config.yaml                      ï¼ˆNix ç”Ÿæˆï¼Œæ¿€æ´»æ—¶æ·±åº¦åˆå¹¶ï¼‰
  â”‚   â”œâ”€â”€ .managed                         ï¼ˆæ ‡è®°æ–‡ä»¶ï¼‰
  â”‚   â”œâ”€â”€ .container-mode                  ï¼ˆè·¯ç”±å…ƒæ•°æ®ï¼šbackendã€exec_user ç­‰ï¼‰
  â”‚   â”œâ”€â”€ state.db, sessions/, memories/   ï¼ˆè¿è¡Œæ—¶çŠ¶æ€ï¼‰
  â”‚   â””â”€â”€ mcp-tokens/                      ï¼ˆMCP æœåŠ¡å™¨çš„ OAuth tokenï¼‰
  â”œâ”€â”€ home/                                â”€â”€â–º  /home/zed    (rw)
  â””â”€â”€ workspace/                           ï¼ˆMESSAGING_CWDï¼‰
      â”œâ”€â”€ SOUL.md                          ï¼ˆæ¥è‡ª documents é€‰é¡¹ï¼‰
      â””â”€â”€ ï¼ˆAgent åˆ›å»ºçš„æ–‡ä»¶ï¼‰

å®¹å™¨å¯å†™å±‚ï¼ˆapt/pip/npmï¼‰ï¼š   /usr, /usr/local, /tmp
```

Nix æž„å»ºçš„äºŒè¿›åˆ¶æ–‡ä»¶èƒ½åœ¨ Ubuntu å®¹å™¨å†…è¿è¡Œï¼Œæ˜¯å› ä¸º `/nix/store` è¢«ç»‘å®šæŒ‚è½½â€”â€”å®ƒæºå¸¦è‡ªå·±çš„è§£é‡Šå™¨å’Œæ‰€æœ‰ä¾èµ–ï¼Œä¸ä¾èµ–å®¹å™¨çš„ç³»ç»Ÿåº“ã€‚å®¹å™¨å…¥å£ç‚¹é€šè¿‡ `current-package` ç¬¦å·é“¾æŽ¥è§£æžï¼š`/data/current-package/bin/zed gateway run --replace`ã€‚æ‰§è¡Œ `nixos-rebuild switch` æ—¶ï¼Œåªæ›´æ–°ç¬¦å·é“¾æŽ¥â€”â€”å®¹å™¨ç»§ç»­è¿è¡Œã€‚

### å„äº‹ä»¶çš„æŒä¹…æ€§

| äº‹ä»¶ | å®¹å™¨é‡å»ºï¼Ÿ | `/data`ï¼ˆçŠ¶æ€ï¼‰ | `/home/zed` | å¯å†™å±‚ï¼ˆ`apt`/`pip`/`npm`ï¼‰ |
|---|---|---|---|---|
| `systemctl restart zed-agent` | å¦ | ä¿ç•™ | ä¿ç•™ | ä¿ç•™ |
| `nixos-rebuild switch`ï¼ˆä»£ç å˜æ›´ï¼‰ | å¦ï¼ˆæ›´æ–°ç¬¦å·é“¾æŽ¥ï¼‰ | ä¿ç•™ | ä¿ç•™ | ä¿ç•™ |
| ä¸»æœºé‡å¯ | å¦ | ä¿ç•™ | ä¿ç•™ | ä¿ç•™ |
| `nix-collect-garbage` | å¦ï¼ˆGC rootï¼‰ | ä¿ç•™ | ä¿ç•™ | ä¿ç•™ |
| é•œåƒå˜æ›´ï¼ˆ`container.image`ï¼‰ | **æ˜¯** | ä¿ç•™ | ä¿ç•™ | **ä¸¢å¤±** |
| å·/é€‰é¡¹å˜æ›´ | **æ˜¯** | ä¿ç•™ | ä¿ç•™ | **ä¸¢å¤±** |
| `environment`/`environmentFiles` å˜æ›´ | å¦ | ä¿ç•™ | ä¿ç•™ | ä¿ç•™ |

ä»…å½“å®¹å™¨çš„**èº«ä»½å“ˆå¸Œ**å‘ç”Ÿå˜åŒ–æ—¶æ‰ä¼šé‡å»ºå®¹å™¨ã€‚å“ˆå¸Œæ¶µç›–ï¼šschema ç‰ˆæœ¬ã€é•œåƒã€`extraVolumes`ã€`extraOptions` å’Œå…¥å£ç‚¹è„šæœ¬ã€‚çŽ¯å¢ƒå˜é‡ã€settingsã€æ–‡æ¡£æˆ– zed åŒ…æœ¬èº«çš„å˜æ›´**ä¸ä¼š**è§¦å‘é‡å»ºã€‚

:::warning å¯å†™å±‚ä¸¢å¤±
å½“èº«ä»½å“ˆå¸Œå‘ç”Ÿå˜åŒ–ï¼ˆé•œåƒå‡çº§ã€æ–°å·ã€æ–°å®¹å™¨é€‰é¡¹ï¼‰æ—¶ï¼Œå®¹å™¨ä¼šè¢«é”€æ¯å¹¶ä»Ž `container.image` çš„å…¨æ–°æ‹‰å–é‡å»ºã€‚å¯å†™å±‚ä¸­é€šè¿‡ `apt install`ã€`pip install` æˆ– `npm install` å®‰è£…çš„åŒ…å°†ä¸¢å¤±ã€‚`/data` å’Œ `/home/zed` ä¸­çš„çŠ¶æ€ä¼šä¿ç•™ï¼ˆè¿™äº›æ˜¯ç»‘å®šæŒ‚è½½ï¼‰ã€‚

å¦‚æžœ Agent ä¾èµ–ç‰¹å®šåŒ…ï¼Œè€ƒè™‘å°†å…¶çƒ˜ç„™åˆ°è‡ªå®šä¹‰é•œåƒä¸­ï¼ˆ`container.image = "my-registry/zed-base:latest"`ï¼‰ï¼Œæˆ–åœ¨ Agent çš„ SOUL.md ä¸­ç¼–å†™å®‰è£…è„šæœ¬ã€‚
:::

### GC Root ä¿æŠ¤

`preStart` è„šæœ¬åœ¨ `${stateDir}/.gc-root` åˆ›å»ºä¸€ä¸ªæŒ‡å‘å½“å‰ zed åŒ…çš„ GC rootã€‚è¿™å¯ä»¥é˜²æ­¢ `nix-collect-garbage` åˆ é™¤æ­£åœ¨è¿è¡Œçš„äºŒè¿›åˆ¶æ–‡ä»¶ã€‚å¦‚æžœ GC root æŸåï¼Œé‡å¯æœåŠ¡ä¼šé‡æ–°åˆ›å»ºå®ƒã€‚

---

## æ’ä»¶

NixOS æ¨¡å—æ”¯æŒå£°æ˜Žå¼æ’ä»¶å®‰è£…â€”â€”æ— éœ€å‘½ä»¤å¼çš„ `zed plugins install`ã€‚

### ç›®å½•æ’ä»¶ï¼ˆ`extraPlugins`ï¼‰

å¯¹äºŽåªåŒ…å« `plugin.yaml` + `__init__.py` çš„æºç æ ‘æ’ä»¶ï¼ˆä¾‹å¦‚ [zed-lcm](https://github.com/stephenschoettler/zed-lcm)ï¼‰ï¼š

```nix
services.zed-agent.extraPlugins = [
  (pkgs.fetchFromGitHub {
    owner = "stephenschoettler";
    repo = "zed-lcm";
    rev = "v0.7.0";
    hash = "sha256-...";
  })
];
```

æ’ä»¶åœ¨æ¿€æ´»æ—¶ä»¥ç¬¦å·é“¾æŽ¥æ–¹å¼å®‰è£…åˆ° `$ZED_HOME/plugins/`ã€‚Zed é€šè¿‡å…¶æ­£å¸¸çš„ç›®å½•æ‰«æå‘çŽ°å®ƒä»¬ã€‚ä»Žåˆ—è¡¨ä¸­ç§»é™¤æ’ä»¶å¹¶è¿è¡Œ `nixos-rebuild switch` ä¼šåˆ é™¤ç¬¦å·é“¾æŽ¥ã€‚

### å…¥å£ç‚¹æ’ä»¶ï¼ˆ`extraPythonPackages`ï¼‰

å¯¹äºŽé€šè¿‡ `[project.entry-points."zed_agent.plugins"]` æ³¨å†Œçš„ pip æ‰“åŒ…æ’ä»¶ï¼ˆä¾‹å¦‚ [rtk-zed](https://github.com/ogallotti/rtk-zed)ï¼‰ï¼š

```nix
services.zed-agent.extraPythonPackages = [
  (pkgs.python312Packages.buildPythonPackage {
    pname = "rtk-zed";
    version = "1.0.0";
    src = pkgs.fetchFromGitHub {
      owner = "ogallotti";
      repo = "rtk-zed";
      rev = "v1.0.0";
      hash = "sha256-...";
    };
    format = "pyproject";
    build-system = [ pkgs.python312Packages.setuptools ];
  })
];
```

è¯¥åŒ…çš„ `site-packages` ä¼šæ·»åŠ åˆ° zed wrapper çš„ PYTHONPATH ä¸­ã€‚`importlib.metadata` åœ¨ä¼šè¯å¯åŠ¨æ—¶å‘çŽ°å…¥å£ç‚¹ã€‚

### å¯é€‰ä¾èµ–ç»„ï¼ˆ`extraDependencyGroups`ï¼‰

å¯¹äºŽå·²åœ¨ zed-agent çš„ `pyproject.toml` ä¸­å£°æ˜Žçš„å¯é€‰ extrasï¼ˆä¾‹å¦‚ `hindsight` æˆ– `honcho` ç­‰è®°å¿†æä¾›å•†ï¼‰ï¼Œä½¿ç”¨ `extraDependencyGroups` åœ¨æž„å»ºæ—¶å°†å…¶åŒ…å«åˆ°å°é—­çš„ venv ä¸­ï¼š

```nix
services.zed-agent = {
  extraDependencyGroups = [ "hindsight" ];
  settings.memory.provider = "hindsight";
};
```

è¿™ç”± uv ä¸Žæ ¸å¿ƒä¾èµ–åœ¨å•æ¬¡è§£æžä¸­å®Œæˆâ€”â€”ä¸éœ€è¦ PYTHONPATH è¡¥ä¸ï¼Œæ²¡æœ‰å†²çªé£Žé™©ã€‚å¯ç”¨çš„ç»„ä¸Ž `pyproject.toml` ä¸­ `[project.optional-dependencies]` çš„é”®å¯¹åº”ï¼ˆä¾‹å¦‚ `"hindsight"`ã€`"honcho"`ã€`"voice"`ã€`"matrix"`ã€`"mistral"`ã€`"bedrock"`ï¼‰ã€‚

**ä½•æ—¶ä½¿ç”¨å“ªä¸ªï¼š**

| éœ€æ±‚ | é€‰é¡¹ |
|------|--------|
| å¯ç”¨ pyproject.toml å¯é€‰ extra | `extraDependencyGroups` |
| æ·»åŠ ä¸åœ¨ pyproject.toml ä¸­çš„å¤–éƒ¨ Python æ’ä»¶ | `extraPythonPackages` |
| æ·»åŠ ç³»ç»ŸäºŒè¿›åˆ¶æ–‡ä»¶ï¼ˆpandocã€jq ç­‰ï¼‰ | `extraPackages` |
| æ·»åŠ åŸºäºŽç›®å½•çš„æ’ä»¶æºç æ ‘ | `extraPlugins` |

### ç»„åˆä½¿ç”¨

å¸¦æœ‰ç¬¬ä¸‰æ–¹ Python ä¾èµ–çš„ç›®å½•æ’ä»¶éœ€è¦åŒæ—¶ä½¿ç”¨ä¸¤ä¸ªé€‰é¡¹ï¼š

```nix
services.zed-agent = {
  extraPlugins = [ my-plugin-src ];          # æ’ä»¶æºç 
  extraPythonPackages = [ pkgs.python312Packages.redis ];  # å…¶ Python ä¾èµ–
  extraPackages = [ pkgs.redis ];            # å…¶éœ€è¦çš„ç³»ç»ŸäºŒè¿›åˆ¶æ–‡ä»¶
};
```

### ä½¿ç”¨ Overlay

å¤–éƒ¨ flake å¯ä»¥ç›´æŽ¥è¦†ç›–åŒ…ï¼š

```nix
{
  inputs.zed-agent.url = "github:zedteam/zed-agent";
  outputs = { zed-agent, nixpkgs, ... }: {
    nixpkgs.overlays = [ zed-agent.overlays.default ];
    # ç„¶åŽï¼š
    #   pkgs.zed-agent.override { extraPythonPackages = [...]; }
    #   pkgs.zed-agent.override { extraDependencyGroups = [ "hindsight" ]; }
  };
}
```

### æ’ä»¶é…ç½®

æ’ä»¶ä»éœ€åœ¨ `config.yaml` ä¸­å¯ç”¨ã€‚é€šè¿‡å£°æ˜Žå¼ settings æ·»åŠ ï¼š

```nix
services.zed-agent.settings.plugins.enabled = [
  "zed-lcm"
  "rtk-rewrite"
];
```

:::note
æž„å»ºæ—¶å†²çªæ£€æŸ¥å¯é˜²æ­¢æ’ä»¶åŒ…è¦†ç›–æ ¸å¿ƒ zed ä¾èµ–ã€‚å¦‚æžœæ’ä»¶æä¾›äº†å°é—­ venv ä¸­å·²æœ‰çš„åŒ…ï¼Œ`nixos-rebuild` ä¼šä»¥æ˜Žç¡®çš„é”™è¯¯å¤±è´¥ã€‚
:::

---

## å¼€å‘

### å¼€å‘ Shell

è¯¥ flake æä¾›äº†ä¸€ä¸ªåŒ…å« Python 3.12ã€uvã€Node.js å’Œæ‰€æœ‰è¿è¡Œæ—¶å·¥å…·çš„å¼€å‘ shellï¼š

```bash
cd zed-agent
nix develop

# Shell æä¾›ï¼š
#   - Python 3.12 + uvï¼ˆé¦–æ¬¡è¿›å…¥æ—¶å°†ä¾èµ–å®‰è£…åˆ° .venvï¼‰
#   - Node.js 22ã€ripgrepã€gitã€opensshã€ffmpeg åœ¨ PATH ä¸Š
#   - æˆ³è®°æ–‡ä»¶ä¼˜åŒ–ï¼šä¾èµ–æœªå˜æ›´æ—¶é‡æ–°è¿›å…¥å‡ ä¹Žå³æ—¶

zed setup
zed chat
```

### direnvï¼ˆæŽ¨èï¼‰

åŒ…å«çš„ `.envrc` ä¼šè‡ªåŠ¨æ¿€æ´»å¼€å‘ shellï¼š

```bash
cd zed-agent
direnv allow    # ä»…éœ€ä¸€æ¬¡
# åŽç»­è¿›å…¥å‡ ä¹Žå³æ—¶ï¼ˆæˆ³è®°æ–‡ä»¶è·³è¿‡ä¾èµ–å®‰è£…ï¼‰
```

### Flake æ£€æŸ¥

è¯¥ flake åŒ…å«åœ¨ CI å’Œæœ¬åœ°è¿è¡Œçš„æž„å»ºæ—¶éªŒè¯ï¼š

```bash
# è¿è¡Œæ‰€æœ‰æ£€æŸ¥
nix flake check

# å•ç‹¬æ£€æŸ¥
nix build .#checks.x86_64-linux.package-contents   # äºŒè¿›åˆ¶æ–‡ä»¶å­˜åœ¨ + ç‰ˆæœ¬
nix build .#checks.x86_64-linux.entry-points-sync  # pyproject.toml â†” Nix åŒ…åŒæ­¥
nix build .#checks.x86_64-linux.cli-commands        # gateway/config å­å‘½ä»¤
nix build .#checks.x86_64-linux.managed-guard       # ZED_MANAGED å±è”½å˜æ›´æ“ä½œ
nix build .#checks.x86_64-linux.bundled-skills      # åŒ…ä¸­å­˜åœ¨ skills
nix build .#checks.x86_64-linux.config-roundtrip    # åˆå¹¶è„šæœ¬ä¿ç•™ç”¨æˆ·é”®
```

<details>
<summary><strong>æ¯é¡¹æ£€æŸ¥çš„éªŒè¯å†…å®¹</strong></summary>

| æ£€æŸ¥ | æµ‹è¯•å†…å®¹ |
|---|---|
| `package-contents` | `zed` å’Œ `zed-agent` äºŒè¿›åˆ¶æ–‡ä»¶å­˜åœ¨ä¸” `zed version` å¯è¿è¡Œ |
| `entry-points-sync` | `pyproject.toml` ä¸­ `[project.scripts]` çš„æ¯ä¸ªæ¡ç›®åœ¨ Nix åŒ…ä¸­éƒ½æœ‰å¯¹åº”çš„å°è£…äºŒè¿›åˆ¶æ–‡ä»¶ |
| `cli-commands` | `zed --help` æš´éœ² `gateway` å’Œ `config` å­å‘½ä»¤ |
| `managed-guard` | `ZED_MANAGED=true zed config set ...` æ‰“å° NixOS é”™è¯¯ |
| `bundled-skills` | skills ç›®å½•å­˜åœ¨ï¼ŒåŒ…å« SKILL.md æ–‡ä»¶ï¼Œwrapper ä¸­è®¾ç½®äº† `ZED_BUNDLED_SKILLS` |
| `config-roundtrip` | 7 ç§åˆå¹¶åœºæ™¯ï¼šå…¨æ–°å®‰è£…ã€Nix è¦†ç›–ã€ç”¨æˆ·é”®ä¿ç•™ã€æ··åˆåˆå¹¶ã€MCP ç´¯åŠ åˆå¹¶ã€åµŒå¥—æ·±åº¦åˆå¹¶ã€å¹‚ç­‰æ€§ |

</details>

---

## é€‰é¡¹å‚è€ƒ

### æ ¸å¿ƒ

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `enable` | `bool` | `false` | å¯ç”¨ zed-agent æœåŠ¡ |
| `package` | `package` | `zed-agent` | ä½¿ç”¨çš„ zed-agent åŒ… |
| `user` | `str` | `"zed"` | ç³»ç»Ÿç”¨æˆ· |
| `group` | `str` | `"zed"` | ç³»ç»Ÿç»„ |
| `createUser` | `bool` | `true` | è‡ªåŠ¨åˆ›å»ºç”¨æˆ·/ç»„ |
| `stateDir` | `str` | `"/var/lib/zed"` | çŠ¶æ€ç›®å½•ï¼ˆ`ZED_HOME` çš„çˆ¶ç›®å½•ï¼‰ |
| `workingDirectory` | `str` | `"${stateDir}/workspace"` | Agent å·¥ä½œç›®å½•ï¼ˆ`MESSAGING_CWD`ï¼‰ |
| `addToSystemPackages` | `bool` | `false` | å°† `zed` CLI æ·»åŠ åˆ°ç³»ç»Ÿ PATH å¹¶åœ¨ç³»ç»ŸèŒƒå›´å†…è®¾ç½® `ZED_HOME` |

### é…ç½®

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `settings` | `attrs`ï¼ˆæ·±åº¦åˆå¹¶ï¼‰ | `{}` | å£°æ˜Žå¼é…ç½®ï¼Œæ¸²æŸ“ä¸º `config.yaml`ã€‚æ”¯æŒä»»æ„åµŒå¥—ï¼›å¤šä¸ªå®šä¹‰é€šè¿‡ `lib.recursiveUpdate` åˆå¹¶ |
| `configFile` | `null` æˆ– `path` | `null` | çŽ°æœ‰ `config.yaml` çš„è·¯å¾„ã€‚è®¾ç½®åŽå®Œå…¨è¦†ç›– `settings` |

### å¯†é’¥ä¸ŽçŽ¯å¢ƒ

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `environmentFiles` | `listOf str` | `[]` | åŒ…å«å¯†é’¥çš„ env æ–‡ä»¶è·¯å¾„ã€‚æ¿€æ´»æ—¶åˆå¹¶åˆ° `$ZED_HOME/.env` |
| `environment` | `attrsOf str` | `{}` | éžå¯†é’¥çŽ¯å¢ƒå˜é‡ã€‚**åœ¨ Nix store ä¸­å¯è§**â€”â€”è¯·å‹¿åœ¨æ­¤æ”¾ç½®å¯†é’¥ |
| `authFile` | `null` æˆ– `path` | `null` | OAuth å‡­æ®é¢„ç½®æ–‡ä»¶ã€‚ä»…åœ¨é¦–æ¬¡éƒ¨ç½²æ—¶å¤åˆ¶ |
| `authFileForceOverwrite` | `bool` | `false` | æ¯æ¬¡æ¿€æ´»æ—¶å§‹ç»ˆä»Ž `authFile` è¦†ç›– `auth.json` |

### æ–‡æ¡£

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `documents` | `attrsOf (either str path)` | `{}` | å·¥ä½œåŒºæ–‡ä»¶ã€‚é”®ä¸ºæ–‡ä»¶åï¼Œå€¼ä¸ºå†…è”å­—ç¬¦ä¸²æˆ–è·¯å¾„ã€‚æ¿€æ´»æ—¶å®‰è£…åˆ° `workingDirectory` |

### MCP æœåŠ¡å™¨

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `mcpServers` | `attrsOf submodule` | `{}` | MCP æœåŠ¡å™¨å®šä¹‰ï¼Œåˆå¹¶åˆ° `settings.mcp_servers` |
| `mcpServers.<name>.command` | `null` æˆ– `str` | `null` | æœåŠ¡å™¨å‘½ä»¤ï¼ˆstdio ä¼ è¾“ï¼‰ |
| `mcpServers.<name>.args` | `listOf str` | `[]` | å‘½ä»¤å‚æ•° |
| `mcpServers.<name>.env` | `attrsOf str` | `{}` | æœåŠ¡å™¨è¿›ç¨‹çš„çŽ¯å¢ƒå˜é‡ |
| `mcpServers.<name>.url` | `null` æˆ– `str` | `null` | æœåŠ¡å™¨ç«¯ç‚¹ URLï¼ˆHTTP/StreamableHTTP ä¼ è¾“ï¼‰ |
| `mcpServers.<name>.headers` | `attrsOf str` | `{}` | HTTP å¤´ï¼Œä¾‹å¦‚ `Authorization` |
| `mcpServers.<name>.auth` | `null` æˆ– `"oauth"` | `null` | è®¤è¯æ–¹å¼ã€‚`"oauth"` å¯ç”¨ OAuth 2.1 PKCE |
| `mcpServers.<name>.enabled` | `bool` | `true` | å¯ç”¨æˆ–ç¦ç”¨æ­¤æœåŠ¡å™¨ |
| `mcpServers.<name>.timeout` | `null` æˆ– `int` | `null` | å·¥å…·è°ƒç”¨è¶…æ—¶ï¼ˆç§’ï¼Œé»˜è®¤ï¼š120ï¼‰ |
| `mcpServers.<name>.connect_timeout` | `null` æˆ– `int` | `null` | è¿žæŽ¥è¶…æ—¶ï¼ˆç§’ï¼Œé»˜è®¤ï¼š60ï¼‰ |
| `mcpServers.<name>.tools` | `null` æˆ– `submodule` | `null` | å·¥å…·è¿‡æ»¤ï¼ˆ`include`/`exclude` åˆ—è¡¨ï¼‰ |
| `mcpServers.<name>.sampling` | `null` æˆ– `submodule` | `null` | æœåŠ¡å™¨å‘èµ· LLM è¯·æ±‚çš„ sampling é…ç½® |

### æœåŠ¡è¡Œä¸º

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `extraArgs` | `listOf str` | `[]` | `zed gateway` çš„é¢å¤–å‚æ•° |
| `extraPackages` | `listOf package` | `[]` | Agent å¯ç”¨çš„é¢å¤–åŒ…ã€‚æ·»åŠ åˆ° zed ç”¨æˆ·çš„æ¯ç”¨æˆ· profileï¼Œç»ˆç«¯å‘½ä»¤ã€skills å’Œ cron ä»»åŠ¡å‡å¯è§ |
| `extraPlugins` | `listOf package` | `[]` | ä»¥ç¬¦å·é“¾æŽ¥æ–¹å¼å®‰è£…åˆ° `$ZED_HOME/plugins/` çš„ç›®å½•æ’ä»¶åŒ…ã€‚æ¯ä¸ªåŒ…å¿…é¡»åŒ…å« `plugin.yaml` |
| `extraPythonPackages` | `listOf package` | `[]` | æ·»åŠ åˆ° PYTHONPATH ç”¨äºŽå…¥å£ç‚¹æ’ä»¶å‘çŽ°çš„ Python åŒ…ã€‚ä½¿ç”¨ `python312Packages` æž„å»º |
| `extraDependencyGroups` | `listOf str` | `[]` | åŒ…å«åˆ°å°é—­ venv ä¸­çš„ pyproject.toml å¯é€‰ extrasï¼ˆä¾‹å¦‚ `["hindsight"]`ï¼‰ã€‚ç”± uv è§£æžâ€”â€”æ— å†²çª |
| `restart` | `str` | `"always"` | systemd `Restart=` ç­–ç•¥ |
| `restartSec` | `int` | `5` | systemd `RestartSec=` å€¼ |

### å®¹å™¨

| é€‰é¡¹ | ç±»åž‹ | é»˜è®¤å€¼ | æè¿° |
|---|---|---|---|
| `container.enable` | `bool` | `false` | å¯ç”¨ OCI å®¹å™¨æ¨¡å¼ |
| `container.backend` | `enum ["docker" "podman"]` | `"docker"` | å®¹å™¨è¿è¡Œæ—¶ |
| `container.image` | `str` | `"ubuntu:24.04"` | åŸºç¡€é•œåƒï¼ˆè¿è¡Œæ—¶æ‹‰å–ï¼‰ |
| `container.extraVolumes` | `listOf str` | `[]` | é¢å¤–å·æŒ‚è½½ï¼ˆ`host:container:mode`ï¼‰ |
| `container.extraOptions` | `listOf str` | `[]` | ä¼ é€’ç»™ `docker create` çš„é¢å¤–å‚æ•° |
| `container.hostUsers` | `listOf str` | `[]` | èŽ·å¾— `~/.zed` ç¬¦å·é“¾æŽ¥ï¼ˆæŒ‡å‘æœåŠ¡ stateDirï¼‰çš„äº¤äº’å¼ç”¨æˆ·ï¼Œè‡ªåŠ¨åŠ å…¥ `zed` ç»„ |

---

## ç›®å½•ç»“æž„

### åŽŸç”Ÿæ¨¡å¼

```
/var/lib/zed/                     # stateDirï¼ˆå½’ zed:zed æ‰€æœ‰ï¼Œæƒé™ 0750ï¼‰
â”œâ”€â”€ .zed/                         # ZED_HOME
â”‚   â”œâ”€â”€ config.yaml                  # Nix ç”Ÿæˆï¼ˆæ¯æ¬¡é‡å»ºæ·±åº¦åˆå¹¶ï¼‰
â”‚   â”œâ”€â”€ .managed                     # æ ‡è®°ï¼šCLI é…ç½®å˜æ›´è¢«å±è”½
â”‚   â”œâ”€â”€ .env                         # ä»Ž environment + environmentFiles åˆå¹¶
â”‚   â”œâ”€â”€ auth.json                    # OAuth å‡­æ®ï¼ˆé¢„ç½®åŽè‡ªæˆ‘ç®¡ç†ï¼‰
â”‚   â”œâ”€â”€ gateway.pid
â”‚   â”œâ”€â”€ state.db
â”‚   â”œâ”€â”€ mcp-tokens/                  # MCP æœåŠ¡å™¨çš„ OAuth token
â”‚   â”œâ”€â”€ sessions/
â”‚   â”œâ”€â”€ memories/
â”‚   â”œâ”€â”€ skills/
â”‚   â”œâ”€â”€ cron/
â”‚   â””â”€â”€ logs/
â”œâ”€â”€ home/                            # Agent HOME
â””â”€â”€ workspace/                       # MESSAGING_CWD
    â”œâ”€â”€ SOUL.md                      # æ¥è‡ª documents é€‰é¡¹
    â””â”€â”€ ï¼ˆAgent åˆ›å»ºçš„æ–‡ä»¶ï¼‰
```

### å®¹å™¨æ¨¡å¼

ç›¸åŒçš„å¸ƒå±€ï¼ŒæŒ‚è½½åˆ°å®¹å™¨ä¸­ï¼š

| å®¹å™¨è·¯å¾„ | ä¸»æœºè·¯å¾„ | æ¨¡å¼ | è¯´æ˜Ž |
|---|---|---|---|
| `/nix/store` | `/nix/store` | `ro` | Zed äºŒè¿›åˆ¶æ–‡ä»¶ + æ‰€æœ‰ Nix ä¾èµ– |
| `/data` | `/var/lib/zed` | `rw` | æ‰€æœ‰çŠ¶æ€ã€é…ç½®ã€å·¥ä½œåŒº |
| `/home/zed` | `${stateDir}/home` | `rw` | æŒä¹…åŒ– Agent homeâ€”â€”`pip install --user`ã€å·¥å…·ç¼“å­˜ |
| `/usr`ã€`/usr/local`ã€`/tmp` | ï¼ˆå¯å†™å±‚ï¼‰ | `rw` | `apt`/`pip`/`npm` å®‰è£…â€”â€”é‡å¯åŽæŒä¹…ï¼Œé‡å»ºåŽä¸¢å¤± |

---

## æ›´æ–°

```bash
# æ›´æ–° flake è¾“å…¥ï¼ˆåœ¨åŒ…å« flake.nix çš„ç›®å½•ä¸­è¿è¡Œï¼‰
cd /etc/nixos && nix flake update zed-agent

# é‡å»º
sudo nixos-rebuild switch
```

åœ¨å®¹å™¨æ¨¡å¼ä¸‹ï¼Œ`current-package` ç¬¦å·é“¾æŽ¥ä¼šæ›´æ–°ï¼ŒAgent åœ¨é‡å¯æ—¶èŽ·å–æ–°çš„äºŒè¿›åˆ¶æ–‡ä»¶ã€‚ä¸ä¼šé‡å»ºå®¹å™¨ï¼Œä¸ä¼šä¸¢å¤±å·²å®‰è£…çš„åŒ…ã€‚

---

## æ•…éšœæŽ’æŸ¥

:::tip Podman ç”¨æˆ·
ä»¥ä¸‹æ‰€æœ‰ `docker` å‘½ä»¤åœ¨ `podman` ä¸­åŒæ ·é€‚ç”¨ã€‚å¦‚æžœä½ è®¾ç½®äº† `container.backend = "podman"`ï¼Œè¯·ç›¸åº”æ›¿æ¢ã€‚
:::

### æœåŠ¡æ—¥å¿—

```bash
# ä¸¤ç§æ¨¡å¼ä½¿ç”¨ç›¸åŒçš„ systemd å•å…ƒ
journalctl -u zed-agent -f

# å®¹å™¨æ¨¡å¼ï¼šä¹Ÿå¯ç›´æŽ¥æŸ¥çœ‹
docker logs -f zed-agent
```

### å®¹å™¨æ£€æŸ¥

```bash
systemctl status zed-agent
docker ps -a --filter name=zed-agent
docker inspect zed-agent --format='{{.State.Status}}'
docker exec -it zed-agent bash
docker exec zed-agent readlink /data/current-package
docker exec zed-agent cat /data/.container-identity
```

### å¼ºåˆ¶é‡å»ºå®¹å™¨

å¦‚æžœéœ€è¦é‡ç½®å¯å†™å±‚ï¼ˆå…¨æ–° Ubuntuï¼‰ï¼š

```bash
sudo systemctl stop zed-agent
docker rm -f zed-agent
sudo rm /var/lib/zed/.container-identity
sudo systemctl start zed-agent
```

### éªŒè¯å¯†é’¥å·²åŠ è½½

å¦‚æžœ Agent å¯åŠ¨ä½†æ— æ³•å‘ LLM æä¾›å•†è®¤è¯ï¼Œæ£€æŸ¥ `.env` æ–‡ä»¶æ˜¯å¦æ­£ç¡®åˆå¹¶ï¼š

```bash
# åŽŸç”Ÿæ¨¡å¼
sudo -u zed cat /var/lib/zed/.zed/.env

# å®¹å™¨æ¨¡å¼
docker exec zed-agent cat /data/.zed/.env
```

### GC Root éªŒè¯

```bash
nix-store --query --roots $(docker exec zed-agent readlink /data/current-package)
```

### å¸¸è§é—®é¢˜

| çŽ°è±¡ | åŽŸå›  | è§£å†³æ–¹æ³• |
|---|---|---|
| `Cannot save configuration: managed by NixOS` | CLI å®ˆå«å·²æ¿€æ´» | ç¼–è¾‘ `configuration.nix` å¹¶æ‰§è¡Œ `nixos-rebuild switch` |
| å®¹å™¨æ„å¤–é‡å»º | `extraVolumes`ã€`extraOptions` æˆ– `image` å‘ç”Ÿå˜æ›´ | é¢„æœŸè¡Œä¸ºâ€”â€”å¯å†™å±‚é‡ç½®ã€‚é‡æ–°å®‰è£…åŒ…æˆ–ä½¿ç”¨è‡ªå®šä¹‰é•œåƒ |
| `zed version` æ˜¾ç¤ºæ—§ç‰ˆæœ¬ | å®¹å™¨æœªé‡å¯ | `systemctl restart zed-agent` |
| `/var/lib/zed` æƒé™æ‹’ç» | çŠ¶æ€ç›®å½•ä¸º `0750 zed:zed` | ä½¿ç”¨ `docker exec` æˆ– `sudo -u zed` |
| `nix-collect-garbage` åˆ é™¤äº† zed | GC root ç¼ºå¤± | é‡å¯æœåŠ¡ï¼ˆpreStart ä¼šé‡æ–°åˆ›å»º GC rootï¼‰ |
| `no container with name or ID "zed-agent"`ï¼ˆPodmanï¼‰ | Podman rootful å®¹å™¨å¯¹æ™®é€šç”¨æˆ·ä¸å¯è§ | ä¸º podman æ·»åŠ å…å¯† sudoï¼ˆå‚è§[å®¹å™¨æ¨¡å¼](#container-mode)ç« èŠ‚ï¼‰ |
| `unable to find user zed` | å®¹å™¨ä»åœ¨å¯åŠ¨ä¸­ï¼ˆå…¥å£ç‚¹å°šæœªåˆ›å»ºç”¨æˆ·ï¼‰ | ç­‰å¾…å‡ ç§’åŽé‡è¯•â€”â€”CLI ä¼šè‡ªåŠ¨é‡è¯• |
| é€šè¿‡ `extraPackages` æ·»åŠ çš„å·¥å…·åœ¨ç»ˆç«¯ä¸­æ‰¾ä¸åˆ° | éœ€è¦ `nixos-rebuild switch` æ›´æ–°æ¯ç”¨æˆ· profile | é‡å»ºå¹¶é‡å¯ï¼š`nixos-rebuild switch && systemctl restart zed-agent` |
