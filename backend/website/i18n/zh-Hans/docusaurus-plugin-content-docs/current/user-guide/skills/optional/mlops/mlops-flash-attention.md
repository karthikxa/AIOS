---
title: "ä¼˜åŒ–æ³¨æ„åŠ› Flash"
sidebar_label: "ä¼˜åŒ–æ³¨æ„åŠ› Flash"
description: "é€šè¿‡ Flash Attention ä¼˜åŒ– Transformer æ³¨æ„åŠ›æœºåˆ¶ï¼Œå®žçŽ° 2-4 å€åŠ é€Ÿå’Œ 10-20 å€å†…å­˜å‡å°‘"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# ä¼˜åŒ–æ³¨æ„åŠ› Flash

é€šè¿‡ Flash Attention ä¼˜åŒ– Transformer æ³¨æ„åŠ›æœºåˆ¶ï¼Œå®žçŽ° 2-4 å€åŠ é€Ÿå’Œ 10-20 å€å†…å­˜å‡å°‘ã€‚é€‚ç”¨äºŽä»¥ä¸‹åœºæ™¯ï¼šä½¿ç”¨é•¿åºåˆ—ï¼ˆ>512 tokenï¼‰è®­ç»ƒ/è¿è¡Œ Transformerã€é‡åˆ°æ³¨æ„åŠ›ç›¸å…³çš„ GPU å†…å­˜é—®é¢˜ï¼Œæˆ–éœ€è¦æ›´å¿«çš„æŽ¨ç†é€Ÿåº¦ã€‚æ”¯æŒ PyTorch åŽŸç”Ÿ SDPAã€flash-attn åº“ã€H100 FP8 ä»¥åŠæ»‘åŠ¨çª—å£æ³¨æ„åŠ›ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/flash-attention` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/flash-attention` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `flash-attn`, `torch`, `transformers` |
| å¹³å° | linux, macos |
| æ ‡ç­¾ | `Optimization`, `Flash Attention`, `Attention Optimization`, `Memory Efficiency`, `Speed Optimization`, `Long Context`, `PyTorch`, `SDPA`, `H100`, `FP8`, `Transformers` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Flash Attention - å¿«é€Ÿå†…å­˜é«˜æ•ˆæ³¨æ„åŠ›

## å¿«é€Ÿå¼€å§‹

Flash Attention é€šè¿‡ IO æ„ŸçŸ¥åˆ†å—ï¼ˆIO-aware tilingï¼‰å’Œé‡è®¡ç®—ï¼ˆrecomputationï¼‰æŠ€æœ¯ï¼Œä¸º Transformer æ³¨æ„åŠ›æä¾› 2-4 å€åŠ é€Ÿå’Œ 10-20 å€å†…å­˜å‡å°‘ã€‚

**PyTorch åŽŸç”Ÿæ–¹å¼ï¼ˆæœ€ç®€å•ï¼ŒPyTorch 2.2+ï¼‰**ï¼š
```python
import torch
import torch.nn.functional as F

q = torch.randn(2, 8, 512, 64, device='cuda', dtype=torch.float16)  # [batch, heads, seq, dim]
k = torch.randn(2, 8, 512, 64, device='cuda', dtype=torch.float16)
v = torch.randn(2, 8, 512, 64, device='cuda', dtype=torch.float16)

# å¦‚æžœå¯ç”¨ï¼Œè‡ªåŠ¨ä½¿ç”¨ Flash Attention
out = F.scaled_dot_product_attention(q, k, v)
```

**flash-attn åº“ï¼ˆåŠŸèƒ½æ›´å¤šï¼‰**ï¼š
```bash
pip install flash-attn --no-build-isolation
```

```python
from flash_attn import flash_attn_func

# q, k, v: [batch, seqlen, nheads, headdim]
out = flash_attn_func(q, k, v, dropout_p=0.0, causal=True)
```

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šåœ¨çŽ°æœ‰ PyTorch æ¨¡åž‹ä¸­å¯ç”¨

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
Flash Attention é›†æˆï¼š
- [ ] æ­¥éª¤ 1ï¼šæ£€æŸ¥ PyTorch ç‰ˆæœ¬ï¼ˆâ‰¥2.2ï¼‰
- [ ] æ­¥éª¤ 2ï¼šå¯ç”¨ Flash Attention åŽç«¯
- [ ] æ­¥éª¤ 3ï¼šé€šè¿‡æ€§èƒ½åˆ†æžéªŒè¯åŠ é€Ÿæ•ˆæžœ
- [ ] æ­¥éª¤ 4ï¼šæµ‹è¯•ç²¾åº¦ä¸ŽåŸºçº¿ä¸€è‡´
```

**æ­¥éª¤ 1ï¼šæ£€æŸ¥ PyTorch ç‰ˆæœ¬**

```bash
python -c "import torch; print(torch.__version__)"
# åº”ä¸º â‰¥2.2.0
```

å¦‚æžœ &lt;2.2ï¼Œè¯·å‡çº§ï¼š
```bash
pip install --upgrade torch
```

**æ­¥éª¤ 2ï¼šå¯ç”¨ Flash Attention åŽç«¯**

æ›¿æ¢æ ‡å‡†æ³¨æ„åŠ›ï¼š
```python
# ä¹‹å‰ï¼ˆæ ‡å‡†æ³¨æ„åŠ›ï¼‰
attn_weights = torch.softmax(q @ k.transpose(-2, -1) / math.sqrt(d_k), dim=-1)
out = attn_weights @ v

# ä¹‹åŽï¼ˆFlash Attentionï¼‰
import torch.nn.functional as F
out = F.scaled_dot_product_attention(q, k, v, attn_mask=mask)
```

å¼ºåˆ¶ä½¿ç”¨ Flash Attention åŽç«¯ï¼š
```python
with torch.backends.cuda.sdp_kernel(
    enable_flash=True,
    enable_math=False,
    enable_mem_efficient=False
):
    out = F.scaled_dot_product_attention(q, k, v)
```

**æ­¥éª¤ 3ï¼šé€šè¿‡æ€§èƒ½åˆ†æžéªŒè¯åŠ é€Ÿæ•ˆæžœ**

```python
import torch.utils.benchmark as benchmark

def test_attention(use_flash):
    q, k, v = [torch.randn(2, 8, 2048, 64, device='cuda', dtype=torch.float16) for _ in range(3)]

    if use_flash:
        with torch.backends.cuda.sdp_kernel(enable_flash=True):
            return F.scaled_dot_product_attention(q, k, v)
    else:
        attn = (q @ k.transpose(-2, -1) / 8.0).softmax(dim=-1)
        return attn @ v

# åŸºå‡†æµ‹è¯•
t_flash = benchmark.Timer(stmt='test_attention(True)', globals=globals())
t_standard = benchmark.Timer(stmt='test_attention(False)', globals=globals())

print(f"Flash: {t_flash.timeit(100).mean:.3f}s")
print(f"Standard: {t_standard.timeit(100).mean:.3f}s")
```

é¢„æœŸæ•ˆæžœï¼šåºåˆ—é•¿åº¦ >512 token æ—¶æœ‰ 2-4 å€åŠ é€Ÿã€‚

**æ­¥éª¤ 4ï¼šæµ‹è¯•ç²¾åº¦ä¸ŽåŸºçº¿ä¸€è‡´**

```python
# æ¯”è¾ƒè¾“å‡º
q, k, v = [torch.randn(1, 8, 512, 64, device='cuda', dtype=torch.float16) for _ in range(3)]

# Flash Attention
out_flash = F.scaled_dot_product_attention(q, k, v)

# æ ‡å‡†æ³¨æ„åŠ›
attn_weights = torch.softmax(q @ k.transpose(-2, -1) / 8.0, dim=-1)
out_standard = attn_weights @ v

# æ£€æŸ¥å·®å¼‚
diff = (out_flash - out_standard).abs().max()
print(f"Max difference: {diff:.6f}")
# float16 ä¸‹åº” <1e-3
```

### å·¥ä½œæµ 2ï¼šä½¿ç”¨ flash-attn åº“å®žçŽ°é«˜çº§åŠŸèƒ½

é€‚ç”¨äºŽå¤šæŸ¥è¯¢æ³¨æ„åŠ›ï¼ˆmulti-query attentionï¼‰ã€æ»‘åŠ¨çª—å£æˆ– H100 FP8ã€‚

å¤åˆ¶æ­¤æ£€æŸ¥æ¸…å•ï¼š

```
flash-attn åº“å®‰è£…ï¼š
- [ ] æ­¥éª¤ 1ï¼šå®‰è£… flash-attn åº“
- [ ] æ­¥éª¤ 2ï¼šä¿®æ”¹æ³¨æ„åŠ›ä»£ç 
- [ ] æ­¥éª¤ 3ï¼šå¯ç”¨é«˜çº§åŠŸèƒ½
- [ ] æ­¥éª¤ 4ï¼šåŸºå‡†æµ‹è¯•æ€§èƒ½
```

**æ­¥éª¤ 1ï¼šå®‰è£… flash-attn åº“**

```bash
# NVIDIA GPUï¼ˆCUDA 12.0+ï¼‰
pip install flash-attn --no-build-isolation

# éªŒè¯å®‰è£…
python -c "from flash_attn import flash_attn_func; print('Success')"
```

**æ­¥éª¤ 2ï¼šä¿®æ”¹æ³¨æ„åŠ›ä»£ç **

```python
from flash_attn import flash_attn_func

# è¾“å…¥ï¼š[batch_size, seq_len, num_heads, head_dim]
# å¦‚éœ€è¦ï¼Œä»Ž [batch, heads, seq, dim] è½¬ç½®
q = q.transpose(1, 2)  # [batch, seq, heads, dim]
k = k.transpose(1, 2)
v = v.transpose(1, 2)

out = flash_attn_func(
    q, k, v,
    dropout_p=0.1,
    causal=True,  # ç”¨äºŽè‡ªå›žå½’æ¨¡åž‹
    window_size=(-1, -1),  # æ— æ»‘åŠ¨çª—å£
    softmax_scale=None  # è‡ªåŠ¨ç¼©æ”¾
)

out = out.transpose(1, 2)  # è½¬å›ž [batch, heads, seq, dim]
```

**æ­¥éª¤ 3ï¼šå¯ç”¨é«˜çº§åŠŸèƒ½**

å¤šæŸ¥è¯¢æ³¨æ„åŠ›ï¼ˆè·¨ head å…±äº« K/Vï¼‰ï¼š
```python
from flash_attn import flash_attn_func

# q: [batch, seq, num_q_heads, dim]
# k, v: [batch, seq, num_kv_heads, dim]  # æ›´å°‘çš„ KV head
out = flash_attn_func(q, k, v)  # è‡ªåŠ¨å¤„ç† MQA
```

æ»‘åŠ¨çª—å£æ³¨æ„åŠ›ï¼ˆå±€éƒ¨æ³¨æ„åŠ›ï¼‰ï¼š
```python
# ä»…å…³æ³¨å‰åŽ 256 ä¸ª token çš„çª—å£
out = flash_attn_func(
    q, k, v,
    window_size=(256, 256),  # (å·¦, å³) çª—å£
    causal=True
)
```

**æ­¥éª¤ 4ï¼šåŸºå‡†æµ‹è¯•æ€§èƒ½**

```python
import torch
from flash_attn import flash_attn_func
import time

q, k, v = [torch.randn(4, 4096, 32, 64, device='cuda', dtype=torch.float16) for _ in range(3)]

# é¢„çƒ­
for _ in range(10):
    _ = flash_attn_func(q, k, v)

# åŸºå‡†æµ‹è¯•
torch.cuda.synchronize()
start = time.time()
for _ in range(100):
    out = flash_attn_func(q, k, v)
    torch.cuda.synchronize()
end = time.time()

print(f"Time per iteration: {(end-start)/100*1000:.2f}ms")
print(f"Memory allocated: {torch.cuda.max_memory_allocated()/1e9:.2f}GB")
```

### å·¥ä½œæµ 3ï¼šH100 FP8 ä¼˜åŒ–ï¼ˆFlashAttention-3ï¼‰

åœ¨ H100 GPU ä¸ŠèŽ·å¾—æœ€å¤§æ€§èƒ½ã€‚

```
FP8 è®¾ç½®ï¼š
- [ ] æ­¥éª¤ 1ï¼šç¡®è®¤ H100 GPU å¯ç”¨
- [ ] æ­¥éª¤ 2ï¼šå®‰è£…æ”¯æŒ FP8 çš„ flash-attn
- [ ] æ­¥éª¤ 3ï¼šå°†è¾“å…¥è½¬æ¢ä¸º FP8
- [ ] æ­¥éª¤ 4ï¼šä½¿ç”¨ FP8 æ³¨æ„åŠ›è¿è¡Œ
```

**æ­¥éª¤ 1ï¼šç¡®è®¤ H100 GPU**

```bash
nvidia-smi --query-gpu=name --format=csv
# åº”æ˜¾ç¤º "H100" æˆ– "H800"
```

**æ­¥éª¤ 2ï¼šå®‰è£…æ”¯æŒ FP8 çš„ flash-attn**

```bash
pip install flash-attn --no-build-isolation
# H100 çš„ FP8 æ”¯æŒå·²åŒ…å«åœ¨å†…
```

**æ­¥éª¤ 3ï¼šå°†è¾“å…¥è½¬æ¢ä¸º FP8**

```python
import torch

q = torch.randn(2, 4096, 32, 64, device='cuda', dtype=torch.float16)
k = torch.randn(2, 4096, 32, 64, device='cuda', dtype=torch.float16)
v = torch.randn(2, 4096, 32, 64, device='cuda', dtype=torch.float16)

# è½¬æ¢ä¸º float8_e4m3ï¼ˆFP8ï¼‰
q_fp8 = q.to(torch.float8_e4m3fn)
k_fp8 = k.to(torch.float8_e4m3fn)
v_fp8 = v.to(torch.float8_e4m3fn)
```

**æ­¥éª¤ 4ï¼šä½¿ç”¨ FP8 æ³¨æ„åŠ›è¿è¡Œ**

```python
from flash_attn import flash_attn_func

# FlashAttention-3 åœ¨ H100 ä¸Šè‡ªåŠ¨ä½¿ç”¨ FP8 å†…æ ¸
out = flash_attn_func(q_fp8, k_fp8, v_fp8)
# ç»“æžœï¼šçº¦ 1.2 PFLOPSï¼Œæ¯” FP16 å¿« 1.5-2 å€
```

## ä½•æ—¶ä½¿ç”¨ä¸Žæ›¿ä»£æ–¹æ¡ˆ

**ä½¿ç”¨ Flash Attention çš„åœºæ™¯ï¼š**
- ä½¿ç”¨ >512 token çš„åºåˆ—è®­ç»ƒ Transformer
- ä½¿ç”¨é•¿ä¸Šä¸‹æ–‡ï¼ˆ>2K tokenï¼‰è¿›è¡ŒæŽ¨ç†
- GPU å†…å­˜å—é™ï¼ˆæ ‡å‡†æ³¨æ„åŠ› OOMï¼‰
- éœ€è¦ 2-4 å€åŠ é€Ÿä¸”ä¸æŸå¤±ç²¾åº¦
- ä½¿ç”¨ PyTorch 2.2+ æˆ–å¯å®‰è£… flash-attn

**æ”¹ç”¨æ›¿ä»£æ–¹æ¡ˆçš„åœºæ™¯ï¼š**
- **æ ‡å‡†æ³¨æ„åŠ›**ï¼šåºåˆ— &lt;256 tokenï¼ˆå¼€é”€ä¸å€¼å¾—ï¼‰
- **xFormers**ï¼šéœ€è¦æ›´å¤šæ³¨æ„åŠ›å˜ä½“ï¼ˆä¸ä»…ä»…æ˜¯é€Ÿåº¦ï¼‰
- **å†…å­˜é«˜æ•ˆæ³¨æ„åŠ›**ï¼šCPU æŽ¨ç†ï¼ˆFlash Attention éœ€è¦ GPUï¼‰

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šImportError: cannot import flash_attn**

ä½¿ç”¨ no-build-isolation æ ‡å¿—å®‰è£…ï¼š
```bash
pip install flash-attn --no-build-isolation
```

æˆ–å…ˆå®‰è£… CUDA toolkitï¼š
```bash
conda install cuda -c nvidia
pip install flash-attn --no-build-isolation
```

**é—®é¢˜ï¼šé€Ÿåº¦ä½ŽäºŽé¢„æœŸï¼ˆæ— åŠ é€Ÿæ•ˆæžœï¼‰**

Flash Attention çš„æ”¶ç›Šéšåºåˆ—é•¿åº¦å¢žåŠ è€Œæå‡ï¼š
- &lt;512 tokenï¼šåŠ é€Ÿæžå°ï¼ˆ10-20%ï¼‰
- 512-2K tokenï¼š2-3 å€åŠ é€Ÿ
- >2K tokenï¼š3-4 å€åŠ é€Ÿ

è¯·ç¡®è®¤åºåˆ—é•¿åº¦æ˜¯å¦è¶³å¤Ÿã€‚

**é—®é¢˜ï¼šRuntimeError: CUDA error**

éªŒè¯ GPU æ˜¯å¦æ”¯æŒ Flash Attentionï¼š
```python
import torch
print(torch.cuda.get_device_capability())
# åº”ä¸º â‰¥(7, 5)ï¼Œå³ Turing åŠä»¥ä¸Š
```

Flash Attention è¦æ±‚ï¼š
- Ampereï¼ˆA100ã€A10ï¼‰ï¼šâœ… å®Œå…¨æ”¯æŒ
- Turingï¼ˆT4ï¼‰ï¼šâœ… æ”¯æŒ
- Voltaï¼ˆV100ï¼‰ï¼šâŒ ä¸æ”¯æŒ

**é—®é¢˜ï¼šç²¾åº¦ä¸‹é™**

æ£€æŸ¥ dtype æ˜¯å¦ä¸º float16 æˆ– bfloat16ï¼ˆè€Œéž float32ï¼‰ï¼š
```python
q = q.to(torch.float16)  # æˆ– torch.bfloat16
```

Flash Attention ä½¿ç”¨ float16/bfloat16 ä»¥æå‡é€Ÿåº¦ï¼Œä¸æ”¯æŒ float32ã€‚

## é«˜çº§ä¸»é¢˜

**ä¸Ž HuggingFace Transformers é›†æˆ**ï¼šå‚è§ [references/transformers-integration.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/flash-attention/references/transformers-integration.md)ï¼Œäº†è§£å¦‚ä½•åœ¨ BERTã€GPTã€Llama æ¨¡åž‹ä¸­å¯ç”¨ Flash Attentionã€‚

**æ€§èƒ½åŸºå‡†æµ‹è¯•**ï¼šå‚è§ [references/benchmarks.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/flash-attention/references/benchmarks.md)ï¼ŒæŸ¥çœ‹è·¨ GPU å’Œåºåˆ—é•¿åº¦çš„è¯¦ç»†é€Ÿåº¦ä¸Žå†…å­˜å¯¹æ¯”ã€‚

## ç¡¬ä»¶è¦æ±‚

- **GPU**ï¼šNVIDIA Ampere åŠä»¥ä¸Šï¼ˆA100ã€A10ã€A30ï¼‰æˆ– AMD MI200 åŠä»¥ä¸Š
- **æ˜¾å­˜**ï¼šä¸Žæ ‡å‡†æ³¨æ„åŠ›ç›¸åŒï¼ˆFlash Attention ä¸å¢žåŠ å†…å­˜å ç”¨ï¼‰
- **CUDA**ï¼š12.0+ï¼ˆæœ€ä½Ž 11.8ï¼‰
- **PyTorch**ï¼š2.2+ ä»¥èŽ·å¾—åŽŸç”Ÿæ”¯æŒ

**ä¸æ”¯æŒ**ï¼šV100ï¼ˆVoltaï¼‰ã€CPU æŽ¨ç†

## èµ„æº

- è®ºæ–‡ï¼š"FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"ï¼ˆNeurIPS 2022ï¼‰
- è®ºæ–‡ï¼š"FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"ï¼ˆICLR 2024ï¼‰
- åšå®¢ï¼šhttps://tridao.me/blog/2024/flash3/
- GitHubï¼šhttps://github.com/Dao-AILab/flash-attention
- PyTorch æ–‡æ¡£ï¼šhttps://pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html
