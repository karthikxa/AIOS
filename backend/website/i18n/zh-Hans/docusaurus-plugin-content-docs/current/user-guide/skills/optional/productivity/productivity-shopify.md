---
title: "Shopify â€” é€šè¿‡ curl ä½¿ç”¨ Shopify Admin ä¸Ž Storefront GraphQL API"
sidebar_label: "Shopify"
description: "é€šè¿‡ curl ä½¿ç”¨ Shopify Admin ä¸Ž Storefront GraphQL API"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Shopify

é€šè¿‡ curl ä½¿ç”¨ Shopify Admin ä¸Ž Storefront GraphQL APIã€‚æ¶µç›–å•†å“ã€è®¢å•ã€å®¢æˆ·ã€åº“å­˜ã€metafieldã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/productivity/shopify` å®‰è£… |
| è·¯å¾„ | `optional-skills/productivity/shopify` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | community |
| è®¸å¯è¯ | MIT |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `Shopify`, `E-commerce`, `Commerce`, `API`, `GraphQL` |
| ç›¸å…³ skill | [`airtable`](/user-guide/skills/bundled/productivity/productivity-airtable), [`xurl`](/user-guide/skills/bundled/social-media/social-media-xurl) |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Shopify â€” Admin ä¸Ž Storefront GraphQL API

é€šè¿‡ `curl` ç›´æŽ¥æ“ä½œ Shopify åº—é“ºï¼šåˆ—å‡ºå•†å“ã€ç®¡ç†åº“å­˜ã€æ‹‰å–è®¢å•ã€æ›´æ–°å®¢æˆ·ã€è¯»å– metafieldã€‚æ— éœ€ SDKï¼Œæ— éœ€åº”ç”¨æ¡†æž¶â€”â€”åªéœ€ GraphQL ç«¯ç‚¹å’Œè‡ªå®šä¹‰åº”ç”¨è®¿é—®ä»¤ç‰Œã€‚

REST Admin API è‡ª 2024-04 èµ·å·²è¿›å…¥é—ç•™çŠ¶æ€ï¼Œä»…æŽ¥å—å®‰å…¨ä¿®å¤ã€‚**æ‰€æœ‰ç®¡ç†æ“ä½œè¯·ä½¿ç”¨ GraphQL Admin**ã€‚é¢å‘å®¢æˆ·çš„åªè¯»æŸ¥è¯¢ï¼ˆå•†å“ã€é›†åˆã€è´­ç‰©è½¦ï¼‰è¯·ä½¿ç”¨ **Storefront GraphQL**ã€‚

## å‰ç½®æ¡ä»¶

1. åœ¨ Shopify ç®¡ç†åŽå°ï¼š**Settings â†’ Apps and sales channels â†’ Develop apps â†’ Create an app**ã€‚
2. ç‚¹å‡» **Configure Admin API scopes**ï¼Œé€‰æ‹©æ‰€éœ€æƒé™ï¼ˆè§ä¸‹æ–¹ç¤ºä¾‹ï¼‰ï¼Œä¿å­˜ã€‚
3. **Install app** â†’ Admin API è®¿é—®ä»¤ç‰Œä»…æ˜¾ç¤ºä¸€æ¬¡ã€‚ç«‹å³å¤åˆ¶â€”â€”Shopify ä¸ä¼šå†æ¬¡å±•ç¤ºã€‚ä»¤ç‰Œä»¥ `shpat_` å¼€å¤´ã€‚
4. ä¿å­˜è‡³ `~/.zed/.env`ï¼š
   ```
   SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
   SHOPIFY_STORE_DOMAIN=my-store.myshopify.com
   SHOPIFY_API_VERSION=2026-01
   ```

> **æ³¨æ„ï¼š** è‡ª 2026 å¹´ 1 æœˆ 1 æ—¥èµ·ï¼Œåœ¨ Shopify ç®¡ç†åŽå°æ–°å»º"æ—§ç‰ˆè‡ªå®šä¹‰åº”ç”¨"çš„åŠŸèƒ½å·²åœç”¨ã€‚æ–°é…ç½®åº”ä½¿ç”¨ **Dev Dashboard**ï¼ˆ`shopify.dev/docs/apps/build/dev-dashboard`ï¼‰ã€‚å·²æœ‰çš„ç®¡ç†åŽå°åˆ›å»ºçš„åº”ç”¨ç»§ç»­æœ‰æ•ˆã€‚å¦‚æžœç”¨æˆ·çš„åº—é“ºæ²¡æœ‰çŽ°æœ‰è‡ªå®šä¹‰åº”ç”¨ä¸”æ—¶é—´åœ¨ 2026-01-01 ä¹‹åŽï¼Œè¯·å¼•å¯¼å…¶ä½¿ç”¨ Dev Dashboard è€Œéžç®¡ç†åŽå°æµç¨‹ã€‚

å¸¸ç”¨æƒé™èŒƒå›´ï¼ˆscopeï¼‰æŒ‰ä»»åŠ¡åˆ†ç±»ï¼š
- å•†å“ / é›†åˆï¼š`read_products`ã€`write_products`
- åº“å­˜ï¼š`read_inventory`ã€`write_inventory`ã€`read_locations`
- è®¢å•ï¼š`read_orders`ã€`write_orders`ï¼ˆä¸å« `read_all_orders` æ—¶ä»…è¿”å›žæœ€è¿‘ 30 æ¡ï¼‰
- å®¢æˆ·ï¼š`read_customers`ã€`write_customers`
- è‰ç¨¿è®¢å•ï¼š`read_draft_orders`ã€`write_draft_orders`
- å±¥çº¦ï¼š`read_fulfillments`ã€`write_fulfillments`
- Metafield / metaobjectï¼šç”±å¯¹åº”èµ„æºçš„ scope è¦†ç›–

## API åŸºç¡€

- **ç«¯ç‚¹ï¼š** `https://$SHOPIFY_STORE_DOMAIN/admin/api/$SHOPIFY_API_VERSION/graphql.json`
- **è®¤è¯å¤´ï¼š** `X-Shopify-Access-Token: $SHOPIFY_ACCESS_TOKEN`ï¼ˆ**ä¸æ˜¯** `Authorization: Bearer`ï¼‰
- **æ–¹æ³•ï¼š** å§‹ç»ˆä¸º `POST`ï¼Œå§‹ç»ˆä½¿ç”¨ `Content-Type: application/json`ï¼Œè¯·æ±‚ä½“ä¸º `{"query": "...", "variables": {...}}`
- **HTTP 200 ä¸ä»£è¡¨æˆåŠŸã€‚** GraphQL åœ¨é¡¶å±‚ `errors` æ•°ç»„å’Œå„å­—æ®µçš„ `userErrors` ä¸­è¿”å›žé”™è¯¯ã€‚ä¸¤è€…éƒ½éœ€æ£€æŸ¥ã€‚
- **ID ä¸º GID å­—ç¬¦ä¸²ï¼š** `gid://shopify/Product/10079467700516`ã€`gid://shopify/Variant/...`ã€`gid://shopify/Order/...`ã€‚åŽŸæ ·ä¼ å…¥â€”â€”ä¸è¦åŽ»æŽ‰å‰ç¼€ã€‚
- **é€ŸçŽ‡é™åˆ¶ï¼š** åŸºäºŽæŸ¥è¯¢æ¶ˆè€—ï¼ˆleaky bucketï¼‰è®¡ç®—ã€‚æ¯ä¸ªå“åº”çš„ `extensions.cost` åŒ…å« `requestedQueryCost`ã€`actualQueryCost`ã€`throttleStatus.{currentlyAvailable, maximumAvailable, restoreRate}`ã€‚å½“ `currentlyAvailable` ä½ŽäºŽä¸‹ä¸€æ¬¡æŸ¥è¯¢æ¶ˆè€—æ—¶é€€é¿ã€‚æ ‡å‡†åº—é“º = 100 ç‚¹æ¡¶ï¼Œ50/s æ¢å¤ï¼›Plus = 1000/100ã€‚

åŸºç¡€ curl æ¨¡å¼ï¼ˆå¯å¤ç”¨ï¼‰ï¼š

```bash
shop_gql() {
  local query="$1"
  local variables="${2:-{}}"
  curl -sS -X POST \
    "https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION:-2026-01}/graphql.json" \
    -H "Content-Type: application/json" \
    -H "X-Shopify-Access-Token: ${SHOPIFY_ACCESS_TOKEN}" \
    --data "$(jq -nc --arg q "$query" --argjson v "$variables" '{query: $q, variables: $v}')"
}
```

é€šè¿‡ç®¡é“ä¼ ç»™ `jq` ä»¥èŽ·å¾—å¯è¯»è¾“å‡ºã€‚`-sS` ä¿ç•™é”™è¯¯å¯è§æ€§åŒæ—¶éšè—è¿›åº¦æ¡ã€‚

## å‘çŽ°

### åº—é“ºä¿¡æ¯ + å½“å‰ API ç‰ˆæœ¬
```bash
shop_gql '{ shop { name myshopifyDomain primaryDomain { url } currencyCode plan { displayName } } }' | jq
```

### åˆ—å‡ºæ‰€æœ‰æ”¯æŒçš„ API ç‰ˆæœ¬
```bash
shop_gql '{ publicApiVersions { handle supported } }' | jq '.data.publicApiVersions[] | select(.supported)'
```

## å•†å“

### æœç´¢å•†å“ï¼ˆå‰ 20 æ¡åŒ¹é…ç»“æžœï¼‰
```bash
shop_gql '
query($q: String!) {
  products(first: 20, query: $q) {
    edges { node { id title handle status totalInventory variants(first: 5) { edges { node { id sku price inventoryQuantity } } } } }
    pageInfo { hasNextPage endCursor }
  }
}' '{"q":"hoodie status:active"}' | jq
```

æŸ¥è¯¢è¯­æ³•æ”¯æŒ `title:`ã€`sku:`ã€`vendor:`ã€`product_type:`ã€`status:active`ã€`tag:`ã€`created_at:>2025-01-01`ã€‚å®Œæ•´è¯­æ³•ï¼šhttps://shopify.dev/docs/api/usage/search-syntax

### åˆ†é¡µèŽ·å–å•†å“ï¼ˆæ¸¸æ ‡ï¼‰
```bash
shop_gql '
query($cursor: String) {
  products(first: 100, after: $cursor) {
    edges { cursor node { id handle } }
    pageInfo { hasNextPage endCursor }
  }
}' '{"cursor":null}'
# åŽç»­è°ƒç”¨ï¼šä¼ å…¥ä¸Šä¸€æ¬¡çš„ endCursor
```

### èŽ·å–å•†å“ï¼ˆå«å˜ä½“ + metafieldï¼‰
```bash
shop_gql '
query($id: ID!) {
  product(id: $id) {
    id title handle descriptionHtml tags status
    variants(first: 20) { edges { node { id sku price compareAtPrice inventoryQuantity selectedOptions { name value } } } }
    metafields(first: 20) { edges { node { namespace key type value } } }
  }
}' '{"id":"gid://shopify/Product/10079467700516"}' | jq
```

### åˆ›å»ºå«ä¸€ä¸ªå˜ä½“çš„å•†å“
```bash
shop_gql '
mutation($input: ProductCreateInput!) {
  productCreate(product: $input) {
    product { id handle }
    userErrors { field message }
  }
}' '{"input":{"title":"Test Hoodie","status":"DRAFT","vendor":"Zed","productType":"Apparel","tags":["test"]}}'
```

æ–°ç‰ˆæœ¬ä¸­å˜ä½“æœ‰ç‹¬ç«‹çš„ mutationï¼š

```bash
# åˆ›å»ºå•†å“åŽæ·»åŠ å˜ä½“
shop_gql '
mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants) {
    productVariants { id sku price }
    userErrors { field message }
  }
}' '{"productId":"gid://shopify/Product/...","variants":[{"optionValues":[{"optionName":"Size","name":"M"}],"price":"49.00","inventoryItem":{"sku":"HD-M","tracked":true}}]}'
```

### æ›´æ–°ä»·æ ¼ / SKU
```bash
shop_gql '
mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    productVariants { id sku price }
    userErrors { field message }
  }
}' '{"productId":"gid://shopify/Product/...","variants":[{"id":"gid://shopify/ProductVariant/...","price":"55.00"}]}'
```

## è®¢å•

### åˆ—å‡ºæœ€è¿‘è®¢å•ï¼ˆä¸å« `read_all_orders` æ—¶é»˜è®¤æœ€å¤š 30 æ¡ï¼‰
```bash
shop_gql '
{
  orders(first: 20, reverse: true, query: "financial_status:paid") {
    edges { node {
      id name createdAt displayFinancialStatus displayFulfillmentStatus
      totalPriceSet { shopMoney { amount currencyCode } }
      customer { id displayName email }
      lineItems(first: 10) { edges { node { title quantity sku } } }
    } }
  }
}' | jq
```

å¸¸ç”¨è®¢å•æŸ¥è¯¢è¿‡æ»¤å™¨ï¼š`financial_status:paid|pending|refunded`ã€`fulfillment_status:unfulfilled|fulfilled`ã€`created_at:>2025-01-01`ã€`tag:gift`ã€`email:foo@example.com`ã€‚

### èŽ·å–å•ä¸ªè®¢å•ï¼ˆå«æ”¶è´§åœ°å€ï¼‰
```bash
shop_gql '
query($id: ID!) {
  order(id: $id) {
    id name email
    shippingAddress { name address1 address2 city province country zip phone }
    lineItems(first: 50) { edges { node { title quantity variant { sku } originalUnitPriceSet { shopMoney { amount currencyCode } } } } }
    transactions { id kind status amountSet { shopMoney { amount currencyCode } } }
  }
}' '{"id":"gid://shopify/Order/...."}' | jq
```

## å®¢æˆ·

```bash
# æœç´¢
shop_gql '
{
  customers(first: 10, query: "email:*@example.com") {
    edges { node { id email displayName numberOfOrders amountSpent { amount currencyCode } } }
  }
}'

# åˆ›å»º
shop_gql '
mutation($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer { id email }
    userErrors { field message }
  }
}' '{"input":{"email":"test@example.com","firstName":"Test","lastName":"User","tags":["api-created"]}}'
```

## åº“å­˜

åº“å­˜æŒ‚è½½åœ¨ä¸Žå˜ä½“å…³è”çš„**åº“å­˜é¡¹ç›®**ä¸Šï¼Œæ•°é‡æŒ‰**ä»“åº“ä½ç½®**è·Ÿè¸ªã€‚

```bash
# èŽ·å–æŸå˜ä½“åœ¨æ‰€æœ‰ä»“åº“çš„åº“å­˜
shop_gql '
query($id: ID!) {
  productVariant(id: $id) {
    id sku
    inventoryItem {
      id tracked
      inventoryLevels(first: 10) {
        edges { node { location { id name } quantities(names: ["available","on_hand","committed"]) { name quantity } } }
      }
    }
  }
}' '{"id":"gid://shopify/ProductVariant/..."}'
```

è°ƒæ•´åº“å­˜ï¼ˆå¢žé‡ï¼‰â€” ä½¿ç”¨ `inventoryAdjustQuantities`ï¼š

```bash
shop_gql '
mutation($input: InventoryAdjustQuantitiesInput!) {
  inventoryAdjustQuantities(input: $input) {
    inventoryAdjustmentGroup { reason changes { name delta } }
    userErrors { field message }
  }
}' '{
  "input": {
    "reason": "correction",
    "name": "available",
    "changes": [{"delta": 5, "inventoryItemId": "gid://shopify/InventoryItem/...", "locationId": "gid://shopify/Location/..."}]
  }
}'
```

è®¾ç½®ç»å¯¹åº“å­˜ï¼ˆéžå¢žé‡ï¼‰â€” `inventorySetQuantities`ï¼š

```bash
shop_gql '
mutation($input: InventorySetQuantitiesInput!) {
  inventorySetQuantities(input: $input) {
    inventoryAdjustmentGroup { id }
    userErrors { field message }
  }
}' '{"input":{"reason":"correction","name":"available","ignoreCompareQuantity":true,"quantities":[{"inventoryItemId":"gid://shopify/InventoryItem/...","locationId":"gid://shopify/Location/...","quantity":100}]}}'
```

## Metafield ä¸Ž Metaobject

Metafield ç”¨äºŽä¸ºèµ„æºï¼ˆå•†å“ã€å®¢æˆ·ã€è®¢å•ã€åº—é“ºï¼‰é™„åŠ è‡ªå®šä¹‰æ•°æ®ã€‚

```bash
# è¯»å–
shop_gql '
query($id: ID!) {
  product(id: $id) {
    metafields(first: 10, namespace: "custom") {
      edges { node { key type value } }
    }
  }
}' '{"id":"gid://shopify/Product/..."}'

# å†™å…¥ï¼ˆé€‚ç”¨äºŽä»»æ„ owner ç±»åž‹ï¼‰
shop_gql '
mutation($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields { id key namespace }
    userErrors { field message code }
  }
}' '{"metafields":[{"ownerId":"gid://shopify/Product/...","namespace":"custom","key":"care_instructions","type":"multi_line_text_field","value":"Wash cold. Tumble dry low."}]}'
```

## Storefront APIï¼ˆå…¬å¼€åªè¯»ï¼‰

ä½¿ç”¨ä¸åŒçš„ç«¯ç‚¹å’Œä»¤ç‰Œï¼Œé€‚ç”¨äºŽé¢å‘å®¢æˆ·çš„åº”ç”¨æˆ– Hydrogen é£Žæ ¼çš„ headless é…ç½®ã€‚è¯·æ±‚å¤´æœ‰æ‰€ä¸åŒï¼š

- **ç«¯ç‚¹ï¼š** `https://$SHOPIFY_STORE_DOMAIN/api/$SHOPIFY_API_VERSION/graphql.json`
- **è®¤è¯å¤´ï¼ˆå…¬å¼€ï¼‰ï¼š** `X-Shopify-Storefront-Access-Token: <public token>` â€” å¯åµŒå…¥æµè§ˆå™¨
- **è®¤è¯å¤´ï¼ˆç§æœ‰ï¼‰ï¼š** `Shopify-Storefront-Private-Token: <private token>` â€” ä»…é™æœåŠ¡ç«¯

```bash
curl -sS -X POST \
  "https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION:-2026-01}/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: ${SHOPIFY_STOREFRONT_TOKEN}" \
  -d '{"query":"{ shop { name } products(first: 5) { edges { node { id title handle } } } }"}' | jq
```

## æ‰¹é‡æ“ä½œ

é€‚ç”¨äºŽè¶…å‡ºé€ŸçŽ‡é™åˆ¶çš„å¤§æ‰¹é‡æ•°æ®å¯¼å‡ºï¼ˆå®Œæ•´å•†å“ç›®å½•ã€å…¨å¹´è®¢å•ï¼‰ï¼š

```bash
# 1. å¯åŠ¨æ‰¹é‡æŸ¥è¯¢
shop_gql '
mutation {
  bulkOperationRunQuery(query: """
    { products { edges { node { id title handle variants { edges { node { sku price } } } } } } }
  """) {
    bulkOperation { id status }
    userErrors { field message }
  }
}'

# 2. è½®è¯¢çŠ¶æ€
shop_gql '{ currentBulkOperation { id status errorCode objectCount fileSize url partialDataUrl } }'

# 3. çŠ¶æ€ä¸º COMPLETED æ—¶ä¸‹è½½ JSONL æ–‡ä»¶
curl -sS "$URL" > products.jsonl
```

æ¯è¡Œ JSONL ä¸ºä¸€ä¸ªèŠ‚ç‚¹ï¼ŒåµŒå¥—è¿žæŽ¥ä»¥ç‹¬ç«‹è¡Œè¾“å‡ºå¹¶é™„å¸¦ `__parentId`ã€‚å¦‚æœ‰éœ€è¦ï¼Œåœ¨å®¢æˆ·ç«¯é‡æ–°ç»„è£…ã€‚

## Webhook

è®¢é˜…äº‹ä»¶ä»¥é¿å…è½®è¯¢ï¼š

```bash
shop_gql '
mutation($topic: WebhookSubscriptionTopic!, $sub: WebhookSubscriptionInput!) {
  webhookSubscriptionCreate(topic: $topic, webhookSubscription: $sub) {
    webhookSubscription { id topic endpoint { __typename ... on WebhookHttpEndpoint { callbackUrl } } }
    userErrors { field message }
  }
}' '{"topic":"ORDERS_CREATE","sub":{"callbackUrl":"https://example.com/webhook","format":"JSON"}}'
```

ä½¿ç”¨åº”ç”¨çš„ client secretï¼ˆéžè®¿é—®ä»¤ç‰Œï¼‰éªŒè¯ä¼ å…¥ webhook çš„ HMACï¼š

```bash
echo -n "$REQUEST_BODY" | openssl dgst -sha256 -hmac "$APP_SECRET" -binary | base64
# ä¸Ž X-Shopify-Hmac-Sha256 è¯·æ±‚å¤´æ¯”å¯¹
```

## å¸¸è§é™·é˜±

- **REST ç«¯ç‚¹ä»ç„¶å­˜åœ¨ä½†å·²å†»ç»“ã€‚** ä¸è¦é’ˆå¯¹ `/admin/api/.../products.json` ç¼–å†™æ–°é›†æˆï¼Œè¯·ä½¿ç”¨ GraphQLã€‚
- **ä»¤ç‰Œæ ¼å¼æ£€æŸ¥ã€‚** Admin ä»¤ç‰Œä»¥ `shpat_` å¼€å¤´ï¼ŒStorefront å…¬å¼€ä»¤ç‰Œä»¥ `shpua_` å¼€å¤´ã€‚è‹¥ä»¤ç‰Œæ­£ç¡®ä½†è¯·æ±‚å¤´é”™è¯¯ï¼Œæ¯æ¬¡è¯·æ±‚éƒ½ä¼šè¿”å›ž 401 ä¸”æ— æœ‰æ•ˆé”™è¯¯ä¿¡æ¯ã€‚
- **ä»¤ç‰Œæœ‰æ•ˆä½†è¿”å›ž 403 = ç¼ºå°‘ scopeã€‚** Shopify è¿”å›ž `{"errors":[{"message":"Access denied for ..."}]}`ã€‚åœ¨åº”ç”¨ä¸Šé‡æ–°é…ç½® Admin API scopeï¼Œç„¶åŽé‡æ–°å®‰è£…ä»¥é‡æ–°ç”Ÿæˆä»¤ç‰Œã€‚
- **`userErrors` ä¸ºç©º â‰  æˆåŠŸã€‚** è¿˜éœ€æ£€æŸ¥ `data.<mutation>.<resource>` æ˜¯å¦éžç©ºã€‚æŸäº›å¤±è´¥ä¸¤è€…å‡ä¸å¡«å……â€”â€”è¯·æ£€æŸ¥å®Œæ•´å“åº”ã€‚
- **GID ä¸Žæ•°å­— IDã€‚** æ—§ç‰ˆ REST è¿”å›žæ•°å­— IDï¼›GraphQL éœ€è¦å®Œæ•´ GID å­—ç¬¦ä¸²ã€‚è½¬æ¢æ–¹å¼ï¼š`gid://shopify/Product/<numeric>`ã€‚
- **é€ŸçŽ‡é™åˆ¶æ„å¤–ã€‚** å•æ¬¡æ·±åº¦åµŒå¥—çš„ `products(first: 250)` å¯èƒ½æ¶ˆè€— 1000+ ç‚¹ï¼Œåœ¨æ ‡å‡†å¥—é¤åº—é“ºä¸Šç«‹å³è§¦å‘é™æµã€‚ä»Žå°èŒƒå›´å¼€å§‹ï¼Œè¯»å– `extensions.cost`ï¼Œå†åšè°ƒæ•´ã€‚
- **åˆ†é¡µæŽ’åºã€‚** `products(first: N, reverse: true)` æŒ‰ `id DESC` æŽ’åºï¼Œè€Œéž `created_at`ã€‚è‹¥éœ€"æœ€æ–°ä¼˜å…ˆ"ï¼Œè¯·ä½¿ç”¨ `sortKey: CREATED_AT, reverse: true`ã€‚
- **åŽ†å²æ•°æ®éœ€è¦ `read_all_orders`ã€‚** ä¸å«æ­¤ scope æ—¶ï¼Œ`orders(...)` ä¼šé™é»˜é™åˆ¶åœ¨ 60 å¤©çª—å£å†…ã€‚ä¸ä¼šæŠ¥é”™ï¼Œåªæ˜¯ç»“æžœæ¯”é¢„æœŸå°‘ã€‚å¯¹äºŽè®¢å•é‡å¤§çš„ Shopify Plus å•†æˆ·ï¼Œè¯·é€šè¿‡åº”ç”¨çš„å—ä¿æŠ¤æ•°æ®è®¾ç½®ç”³è¯·æ­¤ scopeã€‚
- **è´§å¸é‡‘é¢ä¸ºå­—ç¬¦ä¸²ã€‚** é‡‘é¢ä»¥ `"49.00"` è€Œéž `49.0` è¿”å›žã€‚è‹¥å…³å¿ƒé›¶å¡«å……ï¼Œä¸è¦ç›²ç›®ä½¿ç”¨ `jq tonumber`ã€‚
- **å¤šè´§å¸ Money å­—æ®µ** åŒæ—¶åŒ…å« `shopMoney`ï¼ˆåº—é“ºè´§å¸ï¼‰å’Œ `presentmentMoney`ï¼ˆå®¢æˆ·è´§å¸ï¼‰ã€‚è¯·ä¿æŒä¸€è‡´åœ°é€‰æ‹©å…¶ä¸­ä¸€ä¸ªã€‚

## å®‰å…¨é¡»çŸ¥

Shopify ä¸­çš„ mutation æ“ä½œæ˜¯çœŸå®žç”Ÿæ•ˆçš„â€”â€”å®ƒä»¬ä¼šåˆ›å»ºå•†å“ã€æ‰§è¡Œé€€æ¬¾ã€å–æ¶ˆè®¢å•ã€å‘è´§ã€‚åœ¨æ‰§è¡Œ `productDelete`ã€`orderCancel`ã€`refundCreate` æˆ–ä»»ä½•æ‰¹é‡ mutation ä¹‹å‰ï¼šè¯·æ˜Žç¡®è¯´æ˜Žå˜æ›´å†…å®¹ã€æ‰€åœ¨åº—é“ºï¼Œå¹¶ä¸Žç”¨æˆ·ç¡®è®¤ã€‚é™¤éžç”¨æˆ·æœ‰ç‹¬ç«‹çš„å¼€å‘åº—é“ºï¼Œå¦åˆ™ä¸å­˜åœ¨ç”Ÿäº§æ•°æ®çš„æš‚å­˜å‰¯æœ¬ã€‚