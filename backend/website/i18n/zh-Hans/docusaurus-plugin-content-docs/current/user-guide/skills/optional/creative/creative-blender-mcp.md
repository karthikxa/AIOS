---
title: "Blender Mcp â€” é€šè¿‡ socket è¿žæŽ¥ blender-mcp æ’ä»¶ï¼Œç›´æŽ¥ä»Ž Zed æŽ§åˆ¶ Blender"
sidebar_label: "Blender Mcp"
description: "é€šè¿‡ socket è¿žæŽ¥ blender-mcp æ’ä»¶ï¼Œç›´æŽ¥ä»Ž Zed æŽ§åˆ¶ Blender"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Blender Mcp

é€šè¿‡ socket è¿žæŽ¥ blender-mcp æ’ä»¶ï¼Œç›´æŽ¥ä»Ž Zed æŽ§åˆ¶ Blenderã€‚å¯åˆ›å»º 3D å¯¹è±¡ã€æè´¨ã€åŠ¨ç”»ï¼Œå¹¶è¿è¡Œä»»æ„ Blender Pythonï¼ˆbpyï¼‰ä»£ç ã€‚å½“ç”¨æˆ·éœ€è¦åœ¨ Blender ä¸­åˆ›å»ºæˆ–ä¿®æ”¹ä»»ä½•å†…å®¹æ—¶ä½¿ç”¨ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/creative/blender-mcp` å®‰è£… |
| è·¯å¾„ | `optional-skills/creative/blender-mcp` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | alireza78a |
| å¹³å° | linux, macos, windows |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Blender MCP

é€šè¿‡ TCP ç«¯å£ 9876 ä¸Šçš„ socketï¼Œä»Ž Zed æŽ§åˆ¶æ­£åœ¨è¿è¡Œçš„ Blender å®žä¾‹ã€‚

## è®¾ç½®ï¼ˆä¸€æ¬¡æ€§ï¼‰

### 1. å®‰è£… Blender æ’ä»¶

    curl -sL https://raw.githubusercontent.com/ahujasid/blender-mcp/main/addon.py -o ~/Desktop/blender_mcp_addon.py

åœ¨ Blender ä¸­ï¼š
    Edit > Preferences > Add-ons > Install > é€‰æ‹© blender_mcp_addon.py
    å¯ç”¨ "Interface: Blender MCP"

### 2. åœ¨ Blender ä¸­å¯åŠ¨ socket æœåŠ¡å™¨

åœ¨ Blender è§†å£ä¸­æŒ‰ N é”®æ‰“å¼€ä¾§è¾¹æ ã€‚
æ‰¾åˆ° "BlenderMCP" æ ‡ç­¾é¡µï¼Œç‚¹å‡» "Start Server"ã€‚

### 3. éªŒè¯è¿žæŽ¥

    nc -z -w2 localhost 9876 && echo "OPEN" || echo "CLOSED"

## åè®®

é€šè¿‡ TCP ä¼ è¾“çº¯ UTF-8 JSON â€” æ— é•¿åº¦å‰ç¼€ã€‚

å‘é€ï¼š    &#123;"type": "&lt;command>", "params": &#123;&lt;kwargs>&#125;&#125;
æŽ¥æ”¶ï¼š    &#123;"status": "success", "result": &lt;value>&#125;
          &#123;"status": "error",   "message": "&lt;reason>"&#125;

## å¯ç”¨å‘½ä»¤

| type                    | params            | è¯´æ˜Ž                            |
|-------------------------|-------------------|---------------------------------|
| execute_code            | code (str)        | è¿è¡Œä»»æ„ bpy Python ä»£ç         |
| get_scene_info          | ï¼ˆæ— ï¼‰            | åˆ—å‡ºåœºæ™¯ä¸­çš„æ‰€æœ‰å¯¹è±¡            |
| get_object_info         | object_name (str) | èŽ·å–ç‰¹å®šå¯¹è±¡çš„è¯¦ç»†ä¿¡æ¯          |
| get_viewport_screenshot | ï¼ˆæ— ï¼‰            | æˆªå–å½“å‰è§†å£æˆªå›¾                |

## Python è¾…åŠ©å‡½æ•°

åœ¨ execute_code å·¥å…·è°ƒç”¨ä¸­ä½¿ç”¨ï¼š

    import socket, json

    def blender_exec(code: str, host="localhost", port=9876, timeout=15):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
        s.settimeout(timeout)
        payload = json.dumps(&#123;"type": "execute_code", "params": &#123;"code": code&#125;&#125;)
        s.sendall(payload.encode("utf-8"))
        buf = b""
        while True:
            try:
                chunk = s.recv(4096)
                if not chunk:
                    break
                buf += chunk
                try:
                    json.loads(buf.decode("utf-8"))
                    break
                except json.JSONDecodeError:
                    continue
            except socket.timeout:
                break
        s.close()
        return json.loads(buf.decode("utf-8"))

## å¸¸ç”¨ bpy æ¨¡å¼

### æ¸…ç©ºåœºæ™¯
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

### æ·»åŠ ç½‘æ ¼å¯¹è±¡
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0, 0, 0))
    bpy.ops.mesh.primitive_cube_add(size=2, location=(3, 0, 0))
    bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=2, location=(-3, 0, 0))

### åˆ›å»ºå¹¶æŒ‡å®šæè´¨
    mat = bpy.data.materials.new(name="MyMat")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (R, G, B, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.3
    bsdf.inputs["Metallic"].default_value = 0.0
    obj.data.materials.append(mat)

### å…³é”®å¸§åŠ¨ç”»
    obj.location = (0, 0, 0)
    obj.keyframe_insert(data_path="location", frame=1)
    obj.location = (0, 0, 3)
    obj.keyframe_insert(data_path="location", frame=60)

### æ¸²æŸ“åˆ°æ–‡ä»¶
    bpy.context.scene.render.filepath = "/tmp/render.png"
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.ops.render.render(write_still=True)

## æ³¨æ„äº‹é¡¹

- è¿è¡Œå‰å¿…é¡»æ£€æŸ¥ socket æ˜¯å¦å·²å¼€æ”¾ï¼ˆnc -z localhost 9876ï¼‰
- æ¯æ¬¡ä¼šè¯éƒ½éœ€è¦åœ¨ Blender å†…éƒ¨å¯åŠ¨æ’ä»¶æœåŠ¡å™¨ï¼ˆN é¢æ¿ > BlenderMCP > Connectï¼‰
- å°†å¤æ‚åœºæ™¯æ‹†åˆ†ä¸ºå¤šä¸ªè¾ƒå°çš„ execute_code è°ƒç”¨ï¼Œä»¥é¿å…è¶…æ—¶
- æ¸²æŸ“è¾“å‡ºè·¯å¾„å¿…é¡»ä¸ºç»å¯¹è·¯å¾„ï¼ˆ/tmp/...ï¼‰ï¼Œä¸èƒ½ä½¿ç”¨ç›¸å¯¹è·¯å¾„
- `shade_smooth()` è¦æ±‚å¯¹è±¡å·²è¢«é€‰ä¸­ä¸”å¤„äºŽå¯¹è±¡æ¨¡å¼
