---
title: "Docker ç®¡ç†"
sidebar_label: "Docker ç®¡ç†"
description: "ç®¡ç† Docker å®¹å™¨ã€é•œåƒã€å·ã€ç½‘ç»œå’Œ Compose æ ˆâ€”â€”ç”Ÿå‘½å‘¨æœŸæ“ä½œã€è°ƒè¯•ã€æ¸…ç†åŠ Dockerfile ä¼˜åŒ–"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Docker ç®¡ç†

ç®¡ç† Docker å®¹å™¨ã€é•œåƒã€å·ã€ç½‘ç»œå’Œ Compose æ ˆâ€”â€”ç”Ÿå‘½å‘¨æœŸæ“ä½œã€è°ƒè¯•ã€æ¸…ç†åŠ Dockerfile ä¼˜åŒ–ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰â€”â€”ä½¿ç”¨ `zed skills install official/devops/docker-management` å®‰è£… |
| è·¯å¾„ | `optional-skills/devops/docker-management` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | sprmn24 |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `docker`, `containers`, `devops`, `infrastructure`, `compose`, `images`, `volumes`, `networks`, `debugging` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Docker ç®¡ç†

ä½¿ç”¨æ ‡å‡† Docker CLI å‘½ä»¤ç®¡ç† Docker å®¹å™¨ã€é•œåƒã€å·ã€ç½‘ç»œå’Œ Compose æ ˆã€‚é™¤ Docker æœ¬èº«å¤–æ— éœ€é¢å¤–ä¾èµ–ã€‚

## é€‚ç”¨åœºæ™¯

- è¿è¡Œã€åœæ­¢ã€é‡å¯ã€åˆ é™¤æˆ–æ£€æŸ¥å®¹å™¨
- æž„å»ºã€æ‹‰å–ã€æŽ¨é€ã€æ ‡è®°æˆ–æ¸…ç† Docker é•œåƒ
- ä½¿ç”¨ Docker Composeï¼ˆå¤šæœåŠ¡æ ˆï¼‰
- ç®¡ç†å·æˆ–ç½‘ç»œ
- è°ƒè¯•å´©æºƒçš„å®¹å™¨æˆ–åˆ†æžæ—¥å¿—
- æ£€æŸ¥ Docker ç£ç›˜ä½¿ç”¨æƒ…å†µæˆ–é‡Šæ”¾ç©ºé—´
- å®¡æŸ¥æˆ–ä¼˜åŒ– Dockerfile

## å‰ææ¡ä»¶

- Docker Engine å·²å®‰è£…å¹¶è¿è¡Œ
- ç”¨æˆ·å·²åŠ å…¥ `docker` ç»„ï¼ˆæˆ–ä½¿ç”¨ `sudo`ï¼‰
- Docker Compose v2ï¼ˆçŽ°ä»£ Docker å®‰è£…å·²åŒ…å«ï¼‰

å¿«é€Ÿæ£€æŸ¥ï¼š

```bash
docker --version && docker compose version
```

## å¿«é€Ÿå‚è€ƒ

| ä»»åŠ¡ | å‘½ä»¤ |
|------|---------|
| è¿è¡Œå®¹å™¨ï¼ˆåŽå°ï¼‰ | `docker run -d --name NAME IMAGE` |
| åœæ­¢å¹¶åˆ é™¤ | `docker stop NAME && docker rm NAME` |
| æŸ¥çœ‹æ—¥å¿—ï¼ˆè·Ÿè¸ªï¼‰ | `docker logs --tail 50 -f NAME` |
| è¿›å…¥å®¹å™¨ Shell | `docker exec -it NAME /bin/sh` |
| åˆ—å‡ºæ‰€æœ‰å®¹å™¨ | `docker ps -a` |
| æž„å»ºé•œåƒ | `docker build -t TAG .` |
| Compose å¯åŠ¨ | `docker compose up -d` |
| Compose åœæ­¢ | `docker compose down` |
| ç£ç›˜ä½¿ç”¨æƒ…å†µ | `docker system df` |
| æ¸…ç†æ‚¬ç©ºèµ„æº | `docker image prune && docker container prune` |

## æ“ä½œæµç¨‹

### 1. ç¡®å®šæ“ä½œåŸŸ

åˆ¤æ–­è¯·æ±‚å±žäºŽå“ªä¸ªé¢†åŸŸï¼š

- **å®¹å™¨ç”Ÿå‘½å‘¨æœŸ** â†’ runã€stopã€startã€restartã€rmã€pause/unpause
- **å®¹å™¨äº¤äº’** â†’ execã€cpã€logsã€inspectã€stats
- **é•œåƒç®¡ç†** â†’ buildã€pullã€pushã€tagã€rmiã€save/load
- **Docker Compose** â†’ upã€downã€psã€logsã€execã€buildã€config
- **å·ä¸Žç½‘ç»œ** â†’ createã€inspectã€rmã€pruneã€connect
- **æ•…éšœæŽ’æŸ¥** â†’ æ—¥å¿—åˆ†æžã€é€€å‡ºç ã€èµ„æºé—®é¢˜

### 2. å®¹å™¨æ“ä½œ

**è¿è¡Œæ–°å®¹å™¨ï¼š**

```bash
# åŽå°æœåŠ¡ï¼Œå¸¦ç«¯å£æ˜ å°„
docker run -d --name web -p 8080:80 nginx

# å¸¦çŽ¯å¢ƒå˜é‡
docker run -d -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=mydb --name db postgres:16

# å¸¦æŒä¹…åŒ–æ•°æ®ï¼ˆå‘½åå·ï¼‰
docker run -d -v pgdata:/var/lib/postgresql/data --name db postgres:16

# å¼€å‘çŽ¯å¢ƒï¼ˆç»‘å®šæŒ‚è½½æºç ï¼‰
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 --name dev my-app

# äº¤äº’å¼è°ƒè¯•ï¼ˆé€€å‡ºåŽè‡ªåŠ¨åˆ é™¤ï¼‰
docker run -it --rm ubuntu:22.04 /bin/bash

# å¸¦èµ„æºé™åˆ¶å’Œé‡å¯ç­–ç•¥
docker run -d --memory=512m --cpus=1.5 --restart=unless-stopped --name app my-app
```

å…³é”®å‚æ•°ï¼š`-d` åŽå°è¿è¡Œï¼Œ`-it` äº¤äº’å¼+ttyï¼Œ`--rm` è‡ªåŠ¨åˆ é™¤ï¼Œ`-p` ç«¯å£ï¼ˆå®¿ä¸»æœº:å®¹å™¨ï¼‰ï¼Œ`-e` çŽ¯å¢ƒå˜é‡ï¼Œ`-v` å·ï¼Œ`--name` åç§°ï¼Œ`--restart` é‡å¯ç­–ç•¥ã€‚

**ç®¡ç†è¿è¡Œä¸­çš„å®¹å™¨ï¼š**

```bash
docker ps                        # è¿è¡Œä¸­çš„å®¹å™¨
docker ps -a                     # æ‰€æœ‰å®¹å™¨ï¼ˆåŒ…æ‹¬å·²åœæ­¢çš„ï¼‰
docker stop NAME                 # ä¼˜é›…åœæ­¢
docker start NAME                # å¯åŠ¨å·²åœæ­¢çš„å®¹å™¨
docker restart NAME              # åœæ­¢å¹¶é‡å¯
docker rm NAME                   # åˆ é™¤å·²åœæ­¢çš„å®¹å™¨
docker rm -f NAME                # å¼ºåˆ¶åˆ é™¤è¿è¡Œä¸­çš„å®¹å™¨
docker container prune           # åˆ é™¤æ‰€æœ‰å·²åœæ­¢çš„å®¹å™¨
```

**ä¸Žå®¹å™¨äº¤äº’ï¼š**

```bash
docker exec -it NAME /bin/sh          # Shell è®¿é—®ï¼ˆå¦‚å¯ç”¨åˆ™ä½¿ç”¨ /bin/bashï¼‰
docker exec NAME env                   # æŸ¥çœ‹çŽ¯å¢ƒå˜é‡
docker exec -u root NAME apt update    # ä»¥æŒ‡å®šç”¨æˆ·è¿è¡Œ
docker logs --tail 100 -f NAME         # è·Ÿè¸ªæœ€åŽ 100 è¡Œæ—¥å¿—
docker logs --since 2h NAME            # æœ€è¿‘ 2 å°æ—¶çš„æ—¥å¿—
docker cp NAME:/path/file ./local      # ä»Žå®¹å™¨å¤åˆ¶æ–‡ä»¶
docker cp ./file NAME:/path/           # å‘å®¹å™¨å¤åˆ¶æ–‡ä»¶
docker inspect NAME                    # å®Œæ•´å®¹å™¨è¯¦æƒ…ï¼ˆJSONï¼‰
docker stats --no-stream               # èµ„æºä½¿ç”¨å¿«ç…§
docker top NAME                        # è¿è¡Œä¸­çš„è¿›ç¨‹
```

### 3. é•œåƒç®¡ç†

```bash
# æž„å»º
docker build -t my-app:latest .
docker build -t my-app:prod -f Dockerfile.prod .
docker build --no-cache -t my-app .              # å…¨é‡é‡æ–°æž„å»º
DOCKER_BUILDKIT=1 docker build -t my-app .       # ä½¿ç”¨ BuildKit åŠ é€Ÿ

# æ‹‰å–ä¸ŽæŽ¨é€
docker pull node:20-alpine
docker login ghcr.io
docker tag my-app:latest registry/my-app:v1.0
docker push registry/my-app:v1.0

# æ£€æŸ¥
docker images                          # åˆ—å‡ºæœ¬åœ°é•œåƒ
docker history IMAGE                   # æŸ¥çœ‹å±‚ä¿¡æ¯
docker inspect IMAGE                   # å®Œæ•´è¯¦æƒ…

# æ¸…ç†
docker image prune                     # åˆ é™¤æ‚¬ç©ºï¼ˆæœªæ ‡è®°ï¼‰é•œåƒ
docker image prune -a                  # åˆ é™¤æ‰€æœ‰æœªä½¿ç”¨é•œåƒï¼ˆè°¨æ…Žï¼ï¼‰
docker image prune -a --filter "until=168h"   # åˆ é™¤ 7 å¤©å‰æœªä½¿ç”¨çš„é•œåƒ
```

### 4. Docker Compose

```bash
# å¯åŠ¨/åœæ­¢
docker compose up -d                   # åŽå°å¯åŠ¨æ‰€æœ‰æœåŠ¡
docker compose up -d --build           # å¯åŠ¨å‰é‡æ–°æž„å»ºé•œåƒ
docker compose down                    # åœæ­¢å¹¶åˆ é™¤å®¹å™¨
docker compose down -v                 # åŒæ—¶åˆ é™¤å·ï¼ˆä¼šé”€æ¯æ•°æ®ï¼‰

# ç›‘æŽ§
docker compose ps                      # åˆ—å‡ºæœåŠ¡
docker compose logs -f api             # è·Ÿè¸ªæŒ‡å®šæœåŠ¡çš„æ—¥å¿—
docker compose logs --tail 50          # æ‰€æœ‰æœåŠ¡æœ€åŽ 50 è¡Œæ—¥å¿—

# äº¤äº’
docker compose exec api /bin/sh        # è¿›å…¥è¿è¡Œä¸­æœåŠ¡çš„ Shell
docker compose run --rm api npm test   # ä¸€æ¬¡æ€§å‘½ä»¤ï¼ˆæ–°å®¹å™¨ï¼‰
docker compose restart api             # é‡å¯æŒ‡å®šæœåŠ¡

# éªŒè¯
docker compose config                  # éªŒè¯å¹¶æŸ¥çœ‹è§£æžåŽçš„é…ç½®
```

**æœ€ç®€ compose.yml ç¤ºä¾‹ï¼š**

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

### 5. å·ä¸Žç½‘ç»œ

```bash
# å·
docker volume ls                       # åˆ—å‡ºå·
docker volume create mydata            # åˆ›å»ºå‘½åå·
docker volume inspect mydata           # è¯¦æƒ…ï¼ˆæŒ‚è½½ç‚¹ç­‰ï¼‰
docker volume rm mydata                # åˆ é™¤ï¼ˆä½¿ç”¨ä¸­åˆ™å¤±è´¥ï¼‰
docker volume prune                    # åˆ é™¤æœªä½¿ç”¨çš„å·

# ç½‘ç»œ
docker network ls                      # åˆ—å‡ºç½‘ç»œ
docker network create mynet            # åˆ›å»ºæ¡¥æŽ¥ç½‘ç»œ
docker network inspect mynet           # è¯¦æƒ…ï¼ˆå·²è¿žæŽ¥çš„å®¹å™¨ï¼‰
docker network connect mynet NAME      # å°†å®¹å™¨è¿žæŽ¥åˆ°ç½‘ç»œ
docker network disconnect mynet NAME   # æ–­å¼€å®¹å™¨è¿žæŽ¥
docker network rm mynet                # åˆ é™¤ç½‘ç»œ
docker network prune                   # åˆ é™¤æœªä½¿ç”¨çš„ç½‘ç»œ
```

### 6. ç£ç›˜ä½¿ç”¨ä¸Žæ¸…ç†

æ¸…ç†å‰å§‹ç»ˆå…ˆè¿›è¡Œè¯Šæ–­ï¼š

```bash
# æ£€æŸ¥ç©ºé—´å ç”¨
docker system df                       # æ‘˜è¦
docker system df -v                    # è¯¦ç»†åˆ†è§£

# é’ˆå¯¹æ€§æ¸…ç†ï¼ˆå®‰å…¨ï¼‰
docker container prune                 # å·²åœæ­¢çš„å®¹å™¨
docker image prune                     # æ‚¬ç©ºé•œåƒ
docker volume prune                    # æœªä½¿ç”¨çš„å·
docker network prune                   # æœªä½¿ç”¨çš„ç½‘ç»œ

# æ¿€è¿›æ¸…ç†ï¼ˆè¯·å…ˆä¸Žç”¨æˆ·ç¡®è®¤ï¼ï¼‰
docker system prune                    # å®¹å™¨ + é•œåƒ + ç½‘ç»œ
docker system prune -a                 # åŒæ—¶åŒ…å«æœªä½¿ç”¨é•œåƒ
docker system prune -a --volumes       # å…¨éƒ¨æ¸…é™¤â€”â€”åŒ…æ‹¬å‘½åå·
```

**è­¦å‘Šï¼š** æœªç»ç”¨æˆ·ç¡®è®¤ï¼Œåˆ‡å‹¿è¿è¡Œ `docker system prune -a --volumes`ã€‚æ­¤å‘½ä»¤ä¼šåˆ é™¤å¯èƒ½åŒ…å«é‡è¦æ•°æ®çš„å‘½åå·ã€‚

## å¸¸è§é—®é¢˜

| é—®é¢˜ | åŽŸå›  | è§£å†³æ–¹æ³• |
|---------|-------|-----|
| å®¹å™¨ç«‹å³é€€å‡º | ä¸»è¿›ç¨‹ç»“æŸæˆ–å´©æºƒ | æ£€æŸ¥ `docker logs NAME`ï¼Œå°è¯• `docker run -it --entrypoint /bin/sh IMAGE` |
| "port is already allocated" | è¯¥ç«¯å£å·²è¢«å…¶ä»–è¿›ç¨‹å ç”¨ | ä½¿ç”¨ `docker ps` æˆ– `lsof -i :PORT` æŸ¥æ‰¾ |
| "no space left on device" | Docker ç£ç›˜å·²æ»¡ | æ‰§è¡Œ `docker system df` åŽé’ˆå¯¹æ€§æ¸…ç† |
| æ— æ³•è¿žæŽ¥åˆ°å®¹å™¨ | å®¹å™¨å†…åº”ç”¨ç»‘å®šåˆ° 127.0.0.1 | åº”ç”¨é¡»ç»‘å®šåˆ° `0.0.0.0`ï¼Œæ£€æŸ¥ `-p` æ˜ å°„ |
| å·æƒé™è¢«æ‹’ç» | å®¿ä¸»æœºä¸Žå®¹å™¨ UID/GID ä¸åŒ¹é… | ä½¿ç”¨ `--user $(id -u):$(id -g)` æˆ–ä¿®å¤æƒé™ |
| Compose æœåŠ¡é—´æ— æ³•äº’é€š | ç½‘ç»œé”™è¯¯æˆ–æœåŠ¡åç§°é”™è¯¯ | æœåŠ¡ä½¿ç”¨æœåŠ¡åä½œä¸ºä¸»æœºåï¼Œæ£€æŸ¥ `docker compose config` |
| æž„å»ºç¼“å­˜å¤±æ•ˆ | Dockerfile å±‚é¡ºåºé”™è¯¯ | å°†ä¸å¸¸å˜åŠ¨çš„å±‚æ”¾åœ¨å‰é¢ï¼ˆä¾èµ–åœ¨æºç ä¹‹å‰ï¼‰ |
| é•œåƒè¿‡å¤§ | æœªä½¿ç”¨å¤šé˜¶æ®µæž„å»ºï¼Œç¼ºå°‘ .dockerignore | ä½¿ç”¨å¤šé˜¶æ®µæž„å»ºï¼Œæ·»åŠ  `.dockerignore` |

## éªŒè¯

æ¯æ¬¡ Docker æ“ä½œåŽï¼ŒéªŒè¯ç»“æžœï¼š

- **å®¹å™¨å·²å¯åŠ¨ï¼Ÿ** â†’ `docker ps`ï¼ˆæ£€æŸ¥çŠ¶æ€ä¸º "Up"ï¼‰
- **æ—¥å¿—æ— å¼‚å¸¸ï¼Ÿ** â†’ `docker logs --tail 20 NAME`ï¼ˆæ— æŠ¥é”™ï¼‰
- **ç«¯å£å¯è®¿é—®ï¼Ÿ** â†’ `curl -s http://localhost:PORT` æˆ– `docker port NAME`
- **é•œåƒå·²æž„å»ºï¼Ÿ** â†’ `docker images | grep TAG`
- **Compose æ ˆå¥åº·ï¼Ÿ** â†’ `docker compose ps`ï¼ˆæ‰€æœ‰æœåŠ¡çŠ¶æ€ä¸º "running" æˆ– "healthy"ï¼‰
- **ç£ç›˜å·²é‡Šæ”¾ï¼Ÿ** â†’ `docker system df`ï¼ˆå¯¹æ¯”æ¸…ç†å‰åŽï¼‰

## Dockerfile ä¼˜åŒ–å»ºè®®

å®¡æŸ¥æˆ–åˆ›å»º Dockerfile æ—¶ï¼Œå»ºè®®ä»¥ä¸‹æ”¹è¿›ï¼š

1. **å¤šé˜¶æ®µæž„å»º** â€” å°†æž„å»ºçŽ¯å¢ƒä¸Žè¿è¡Œæ—¶åˆ†ç¦»ï¼Œå‡å°æœ€ç»ˆé•œåƒä½“ç§¯
2. **å±‚é¡ºåº** â€” å°†ä¾èµ–æ”¾åœ¨æºç ä¹‹å‰ï¼Œé¿å…å˜æ›´ä½¿ç¼“å­˜å±‚å¤±æ•ˆ
3. **åˆå¹¶ RUN å‘½ä»¤** â€” å‡å°‘å±‚æ•°ï¼Œç¼©å°é•œåƒä½“ç§¯
4. **ä½¿ç”¨ .dockerignore** â€” æŽ’é™¤ `node_modules`ã€`.git`ã€`__pycache__` ç­‰
5. **å›ºå®šåŸºç¡€é•œåƒç‰ˆæœ¬** â€” ä½¿ç”¨ `node:20-alpine` è€Œéž `node:latest`
6. **ä»¥éž root ç”¨æˆ·è¿è¡Œ** â€” æ·»åŠ  `USER` æŒ‡ä»¤ä»¥æå‡å®‰å…¨æ€§
7. **ä½¿ç”¨ slim/alpine åŸºç¡€é•œåƒ** â€” ä½¿ç”¨ `python:3.12-slim` è€Œéž `python:3.12`