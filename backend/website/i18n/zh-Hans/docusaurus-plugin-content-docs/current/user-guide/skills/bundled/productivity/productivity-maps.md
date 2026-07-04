---
title: "Maps â€” é€šè¿‡ OpenStreetMap/OSRM è¿›è¡Œåœ°ç†ç¼–ç ã€POIã€è·¯çº¿ã€æ—¶åŒºæŸ¥è¯¢"
sidebar_label: "Maps"
description: "é€šè¿‡ OpenStreetMap/OSRM è¿›è¡Œåœ°ç†ç¼–ç ã€POIã€è·¯çº¿ã€æ—¶åŒºæŸ¥è¯¢"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Maps

é€šè¿‡ OpenStreetMap/OSRM è¿›è¡Œåœ°ç†ç¼–ç ã€POIã€è·¯çº¿ã€æ—¶åŒºæŸ¥è¯¢ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/productivity/maps` |
| ç‰ˆæœ¬ | `1.2.0` |
| ä½œè€… | Mibayy |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `maps`, `geocoding`, `places`, `routing`, `distance`, `directions`, `nearby`, `location`, `openstreetmap`, `nominatim`, `overpass`, `osrm` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Maps Skill

ä½¿ç”¨å…è´¹å¼€æ”¾æ•°æ®æºçš„ä½ç½®æ™ºèƒ½å·¥å…·ã€‚8 ä¸ªå‘½ä»¤ï¼Œ44 ä¸ª POIï¼ˆå…´è¶£ç‚¹ï¼‰åˆ†ç±»ï¼Œé›¶ä¾èµ–ï¼ˆä»… Python æ ‡å‡†åº“ï¼‰ï¼Œæ— éœ€ API å¯†é’¥ã€‚

æ•°æ®æ¥æºï¼šOpenStreetMap/Nominatimã€Overpass APIã€OSRMã€TimeAPI.ioã€‚

æœ¬ skill å–ä»£äº†æ—§ç‰ˆ `find-nearby` skill â€”â€” find-nearby çš„æ‰€æœ‰åŠŸèƒ½å‡ç”±ä¸‹æ–¹çš„ `nearby` å‘½ä»¤è¦†ç›–ï¼Œæ”¯æŒç›¸åŒçš„ `--near "<place>"` å¿«æ·æ–¹å¼å’Œå¤šåˆ†ç±»æŸ¥è¯¢ã€‚

## ä½¿ç”¨åœºæ™¯

- ç”¨æˆ·å‘é€ Telegram ä½ç½®å›¾é’‰ï¼ˆæ¶ˆæ¯ä¸­åŒ…å«ç»çº¬åº¦ï¼‰â†’ `nearby`
- ç”¨æˆ·éœ€è¦æŸåœ°åçš„åæ ‡ â†’ `search`
- ç”¨æˆ·æœ‰åæ ‡å¹¶æƒ³èŽ·å–åœ°å€ â†’ `reverse`
- ç”¨æˆ·è¯¢é—®é™„è¿‘çš„é¤åŽ…ã€åŒ»é™¢ã€è¯åº—ã€é…’åº—ç­‰ â†’ `nearby`
- ç”¨æˆ·éœ€è¦é©¾è½¦/æ­¥è¡Œ/éª‘è¡Œè·ç¦»æˆ–è¡Œç¨‹æ—¶é—´ â†’ `distance`
- ç”¨æˆ·éœ€è¦ä¸¤åœ°ä¹‹é—´çš„é€æ­¥å¯¼èˆª â†’ `directions`
- ç”¨æˆ·éœ€è¦æŸä½ç½®çš„æ—¶åŒºä¿¡æ¯ â†’ `timezone`
- ç”¨æˆ·éœ€è¦åœ¨æŸåœ°ç†åŒºåŸŸå†…æœç´¢ POI â†’ `area` + `bbox`

## å‰ç½®æ¡ä»¶

Python 3.8+ï¼ˆä»…æ ‡å‡†åº“ï¼Œæ— éœ€ pip å®‰è£…ï¼‰ã€‚

è„šæœ¬è·¯å¾„ï¼š`~/.zed/skills/maps/scripts/maps_client.py`

## å‘½ä»¤

```bash
MAPS=~/.zed/skills/maps/scripts/maps_client.py
```

### search â€” åœ°ç†ç¼–ç åœ°å

```bash
python3 $MAPS search "Eiffel Tower"
python3 $MAPS search "1600 Pennsylvania Ave, Washington DC"
```

è¿”å›žï¼šçº¬åº¦ã€ç»åº¦ã€æ˜¾ç¤ºåç§°ã€ç±»åž‹ã€è¾¹ç•Œæ¡†ã€é‡è¦æ€§è¯„åˆ†ã€‚

### reverse â€” åæ ‡è½¬åœ°å€

```bash
python3 $MAPS reverse 48.8584 2.2945
```

è¿”å›žï¼šå®Œæ•´åœ°å€åˆ†è§£ï¼ˆè¡—é“ã€åŸŽå¸‚ã€å·ž/çœã€å›½å®¶ã€é‚®æ”¿ç¼–ç ï¼‰ã€‚

### nearby â€” æŒ‰åˆ†ç±»æŸ¥æ‰¾åœ°ç‚¹

```bash
# æŒ‰åæ ‡ï¼ˆä¾‹å¦‚æ¥è‡ª Telegram ä½ç½®å›¾é’‰ï¼‰
python3 $MAPS nearby 48.8584 2.2945 restaurant --limit 10
python3 $MAPS nearby 40.7128 -74.0060 hospital --radius 2000

# æŒ‰åœ°å€/åŸŽå¸‚/é‚®ç¼–/åœ°æ ‡ â€”â€” --near è‡ªåŠ¨è¿›è¡Œåœ°ç†ç¼–ç 
python3 $MAPS nearby --near "Times Square, New York" --category cafe
python3 $MAPS nearby --near "90210" --category pharmacy

# å¤šä¸ªåˆ†ç±»åˆå¹¶ä¸ºä¸€æ¬¡æŸ¥è¯¢
python3 $MAPS nearby --near "downtown austin" --category restaurant --category bar --limit 10
```

46 ä¸ªåˆ†ç±»ï¼šrestaurantã€cafeã€barã€hospitalã€pharmacyã€hotelã€guest_houseã€
camp_siteã€supermarketã€atmã€gas_stationã€parkingã€museumã€parkã€schoolã€
universityã€bankã€policeã€fire_stationã€libraryã€airportã€train_stationã€
bus_stopã€churchã€mosqueã€synagogueã€dentistã€doctorã€cinemaã€theatreã€gymã€
swimming_poolã€post_officeã€convenience_storeã€bakeryã€bookshopã€laundryã€
car_washã€car_rentalã€bicycle_rentalã€taxiã€veterinaryã€zooã€playgroundã€
stadiumã€nightclubã€‚

æ¯æ¡ç»“æžœåŒ…å«ï¼š`name`ã€`address`ã€`lat`/`lon`ã€`distance_m`ã€
`maps_url`ï¼ˆå¯ç‚¹å‡»çš„ Google Maps é“¾æŽ¥ï¼‰ã€`directions_url`ï¼ˆä»Žæœç´¢ç‚¹å‡ºå‘çš„ Google Maps å¯¼èˆªé“¾æŽ¥ï¼‰ï¼Œä»¥åŠå¯ç”¨æ—¶çš„æ‰©å±•æ ‡ç­¾ â€”â€”
`cuisine`ã€`hours`ï¼ˆè¥ä¸šæ—¶é—´ï¼‰ã€`phone`ã€`website`ã€‚

### distance â€” è¡Œç¨‹è·ç¦»ä¸Žæ—¶é—´

```bash
python3 $MAPS distance "Paris" --to "Lyon"
python3 $MAPS distance "New York" --to "Boston" --mode driving
python3 $MAPS distance "Big Ben" --to "Tower Bridge" --mode walking
```

æ¨¡å¼ï¼šdrivingï¼ˆé©¾è½¦ï¼Œé»˜è®¤ï¼‰ã€walkingï¼ˆæ­¥è¡Œï¼‰ã€cyclingï¼ˆéª‘è¡Œï¼‰ã€‚è¿”å›žé“è·¯è·ç¦»ã€è¡Œç¨‹æ—¶é•¿åŠç›´çº¿è·ç¦»ä»¥ä¾›å¯¹æ¯”ã€‚

### directions â€” é€æ­¥å¯¼èˆª

```bash
python3 $MAPS directions "Eiffel Tower" --to "Louvre Museum" --mode walking
python3 $MAPS directions "JFK Airport" --to "Times Square" --mode driving
```

è¿”å›žå¸¦ç¼–å·çš„æ­¥éª¤ï¼ŒåŒ…å«æŒ‡ä»¤ã€è·ç¦»ã€æ—¶é•¿ã€é“è·¯åç§°åŠæ“ä½œç±»åž‹ï¼ˆè½¬å¼¯ã€å‡ºå‘ã€åˆ°è¾¾ç­‰ï¼‰ã€‚

### timezone â€” åæ ‡å¯¹åº”æ—¶åŒº

```bash
python3 $MAPS timezone 48.8584 2.2945
python3 $MAPS timezone 35.6762 139.6503
```

è¿”å›žæ—¶åŒºåç§°ã€UTC åç§»é‡åŠå½“å‰æœ¬åœ°æ—¶é—´ã€‚

### area â€” åœ°ç‚¹çš„è¾¹ç•Œæ¡†ä¸Žé¢ç§¯

```bash
python3 $MAPS area "Manhattan, New York"
python3 $MAPS area "London"
```

è¿”å›žè¾¹ç•Œæ¡†åæ ‡ã€å®½åº¦/é«˜åº¦ï¼ˆåƒç±³ï¼‰åŠè¿‘ä¼¼é¢ç§¯ã€‚å¯ä½œä¸º bbox å‘½ä»¤çš„è¾“å…¥ä½¿ç”¨ã€‚

### bbox â€” åœ¨è¾¹ç•Œæ¡†å†…æœç´¢

```bash
python3 $MAPS bbox 40.75 -74.00 40.77 -73.98 restaurant --limit 20
```

åœ¨åœ°ç†çŸ©å½¢åŒºåŸŸå†…æŸ¥æ‰¾ POIã€‚å¯å…ˆä½¿ç”¨ `area` å‘½ä»¤èŽ·å–å‘½ååœ°ç‚¹çš„è¾¹ç•Œæ¡†åæ ‡ã€‚

## å¤„ç† Telegram ä½ç½®å›¾é’‰

å½“ç”¨æˆ·å‘é€ä½ç½®å›¾é’‰æ—¶ï¼Œæ¶ˆæ¯ä¸­åŒ…å« `latitude:` å’Œ `longitude:` å­—æ®µã€‚æå–è¿™äº›å­—æ®µå¹¶ç›´æŽ¥ä¼ å…¥ `nearby`ï¼š

```bash
# ç”¨æˆ·åœ¨ 36.17, -115.14 å‘é€äº†å›¾é’‰å¹¶è¯¢é—®"é™„è¿‘æœ‰å“ªäº›å’–å•¡é¦†"
python3 $MAPS nearby 36.17 -115.14 cafe --radius 1500
```

ä»¥ç¼–å·åˆ—è¡¨å½¢å¼å‘ˆçŽ°ç»“æžœï¼ŒåŒ…å«åç§°ã€è·ç¦»åŠ `maps_url` å­—æ®µï¼Œä½¿ç”¨æˆ·åœ¨èŠå¤©ä¸­èŽ·å¾—å¯ç‚¹å‡»é“¾æŽ¥ã€‚å¯¹äºŽ"çŽ°åœ¨æ˜¯å¦è¥ä¸šï¼Ÿ"çš„é—®é¢˜ï¼Œæ£€æŸ¥ `hours` å­—æ®µï¼›è‹¥ç¼ºå¤±æˆ–ä¸æ˜Žç¡®ï¼Œè¯·é€šè¿‡ `web_search` æ ¸å®žï¼Œå› ä¸º OSM è¥ä¸šæ—¶é—´ç”±ç¤¾åŒºç»´æŠ¤ï¼Œä¸ä¸€å®šæ˜¯æœ€æ–°çš„ã€‚

## å·¥ä½œæµç¤ºä¾‹

**"æŸ¥æ‰¾æ–—å…½åœºé™„è¿‘çš„æ„å¤§åˆ©é¤åŽ…"ï¼š**
1. `nearby --near "Colosseum Rome" --category restaurant --radius 500`
   â€”â€” ä¸€æ¡å‘½ä»¤ï¼Œè‡ªåŠ¨åœ°ç†ç¼–ç 

**"ç”¨æˆ·å‘é€äº†ä½ç½®å›¾é’‰ï¼Œé™„è¿‘æœ‰ä»€ä¹ˆï¼Ÿ"ï¼š**
1. ä»Ž Telegram æ¶ˆæ¯ä¸­æå–ç»çº¬åº¦
2. `nearby LAT LON cafe --radius 1500`

**"å¦‚ä½•ä»Žé…’åº—æ­¥è¡Œåˆ°ä¼šè®®ä¸­å¿ƒï¼Ÿ"ï¼š**
1. `directions "Hotel Name" --to "Conference Center" --mode walking`

**"è¥¿é›…å›¾å¸‚ä¸­å¿ƒæœ‰å“ªäº›é¤åŽ…ï¼Ÿ"ï¼š**
1. `area "Downtown Seattle"` â†’ èŽ·å–è¾¹ç•Œæ¡†
2. `bbox S W N E restaurant --limit 30`

## æ³¨æ„äº‹é¡¹

- Nominatim æœåŠ¡æ¡æ¬¾ï¼šæœ€å¤š 1 æ¬¡è¯·æ±‚/ç§’ï¼ˆè„šæœ¬è‡ªåŠ¨å¤„ç†ï¼‰
- `nearby` éœ€è¦ç»çº¬åº¦æˆ– `--near "<address>"` â€”â€” äºŒè€…å¿…é¡»æä¾›å…¶ä¸€
- OSRM è·¯çº¿è§„åˆ’åœ¨æ¬§æ´²å’ŒåŒ—ç¾Žè¦†ç›–æœ€ä½³
- Overpass API åœ¨é«˜å³°æ—¶æ®µå¯èƒ½è¾ƒæ…¢ï¼›è„šæœ¬ä¼šè‡ªåŠ¨åœ¨é•œåƒç«™ä¹‹é—´åˆ‡æ¢ï¼ˆoverpass-api.de â†’ overpass.kumi.systemsï¼‰
- `distance` å’Œ `directions` ä½¿ç”¨ `--to` æ ‡å¿—æŒ‡å®šç›®çš„åœ°ï¼ˆéžä½ç½®å‚æ•°ï¼‰
- è‹¥å•ç‹¬ä½¿ç”¨é‚®æ”¿ç¼–ç åœ¨å…¨çƒèŒƒå›´å†…ç»“æžœæ¨¡ç³Šï¼Œè¯·é™„ä¸Šå›½å®¶/å·žä¿¡æ¯

## éªŒè¯

```bash
python3 ~/.zed/skills/maps/scripts/maps_client.py search "Statue of Liberty"
# åº”è¿”å›žçº¬åº¦çº¦ 40.689ï¼Œç»åº¦çº¦ -74.044

python3 ~/.zed/skills/maps/scripts/maps_client.py nearby --near "Times Square" --category restaurant --limit 3
# åº”è¿”å›ž Times Square çº¦ 500 ç±³èŒƒå›´å†…çš„é¤åŽ…åˆ—è¡¨
```