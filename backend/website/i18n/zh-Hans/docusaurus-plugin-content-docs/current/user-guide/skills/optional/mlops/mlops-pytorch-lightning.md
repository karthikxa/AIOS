---
title: "Pytorch Lightning"
sidebar_label: "Pytorch Lightning"
description: "åŸºäºŽ PyTorch çš„é«˜å±‚æ¡†æž¶ï¼Œæä¾› Trainer ç±»ã€è‡ªåŠ¨åˆ†å¸ƒå¼è®­ç»ƒï¼ˆDDP/FSDP/DeepSpeedï¼‰ã€å›žè°ƒç³»ç»ŸåŠæžç®€æ ·æ¿ä»£ç "
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Pytorch Lightning

åŸºäºŽ PyTorch çš„é«˜å±‚æ¡†æž¶ï¼Œæä¾› Trainer ç±»ã€è‡ªåŠ¨åˆ†å¸ƒå¼è®­ç»ƒï¼ˆDDP/FSDP/DeepSpeedï¼‰ã€å›žè°ƒï¼ˆcallbacksï¼‰ç³»ç»ŸåŠæžç®€æ ·æ¿ä»£ç ã€‚åŒä¸€å¥—ä»£ç å¯ä»Žç¬”è®°æœ¬æ‰©å±•è‡³è¶…çº§è®¡ç®—æœºã€‚é€‚ç”¨äºŽå¸Œæœ›ä»¥å†…ç½®æœ€ä½³å®žè·µç¼–å†™æ•´æ´è®­ç»ƒå¾ªçŽ¯çš„åœºæ™¯ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å¯é€‰ â€” é€šè¿‡ `zed skills install official/mlops/pytorch-lightning` å®‰è£… |
| è·¯å¾„ | `optional-skills/mlops/pytorch-lightning` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ–é¡¹ | `lightning`, `torch`, `transformers` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `PyTorch Lightning`, `Training Framework`, `Distributed Training`, `DDP`, `FSDP`, `DeepSpeed`, `High-Level API`, `Callbacks`, `Best Practices`, `Scalable` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘è¯¥ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ skill æ¿€æ´»æ—¶ agent æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# PyTorch Lightning - é«˜å±‚è®­ç»ƒæ¡†æž¶

## å¿«é€Ÿå¼€å§‹

PyTorch Lightning å¯¹ PyTorch ä»£ç è¿›è¡Œç»„ç»‡ï¼Œåœ¨ä¿æŒçµæ´»æ€§çš„åŒæ—¶æ¶ˆé™¤æ ·æ¿ä»£ç ã€‚

**å®‰è£…**ï¼š
```bash
pip install lightning
```

**å°† PyTorch è½¬æ¢ä¸º Lightning**ï¼ˆ3 æ­¥ï¼‰ï¼š

```python
import lightning as L
import torch
from torch import nn
from torch.utils.data import DataLoader, Dataset

# Step 1: Define LightningModule (organize your PyTorch code)
class LitModel(L.LightningModule):
    def __init__(self, hidden_size=128):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(28 * 28, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, 10)
        )

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self.model(x)
        loss = nn.functional.cross_entropy(y_hat, y)
        self.log('train_loss', loss)  # Auto-logged to TensorBoard
        return loss

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=1e-3)

# Step 2: Create data
train_loader = DataLoader(train_dataset, batch_size=32)

# Step 3: Train with Trainer (handles everything else!)
trainer = L.Trainer(max_epochs=10, accelerator='gpu', devices=2)
model = LitModel()
trainer.fit(model, train_loader)
```

**å°±è¿™äº›ï¼** Trainer è´Ÿè´£å¤„ç†ï¼š
- GPU/TPU/CPU åˆ‡æ¢
- åˆ†å¸ƒå¼è®­ç»ƒï¼ˆDDPã€FSDPã€DeepSpeedï¼‰
- æ··åˆç²¾åº¦ï¼ˆFP16ã€BF16ï¼‰
- æ¢¯åº¦ç´¯ç§¯
- æ£€æŸ¥ç‚¹ä¿å­˜
- æ—¥å¿—è®°å½•
- è¿›åº¦æ¡

## å¸¸è§å·¥ä½œæµ

### å·¥ä½œæµ 1ï¼šä»Ž PyTorch è¿ç§»åˆ° Lightning

**åŽŸå§‹ PyTorch ä»£ç **ï¼š
```python
model = MyModel()
optimizer = torch.optim.Adam(model.parameters())
model.to('cuda')

for epoch in range(max_epochs):
    for batch in train_loader:
        batch = batch.to('cuda')
        optimizer.zero_grad()
        loss = model(batch)
        loss.backward()
        optimizer.step()
```

**Lightning ç‰ˆæœ¬**ï¼š
```python
class LitModel(L.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = MyModel()

    def training_step(self, batch, batch_idx):
        loss = self.model(batch)  # No .to('cuda') needed!
        return loss

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters())

# Train
trainer = L.Trainer(max_epochs=10, accelerator='gpu')
trainer.fit(LitModel(), train_loader)
```

**ä¼˜åŠ¿**ï¼š40+ è¡Œ â†’ 15 è¡Œï¼Œæ— éœ€è®¾å¤‡ç®¡ç†ï¼Œè‡ªåŠ¨åˆ†å¸ƒå¼

### å·¥ä½œæµ 2ï¼šéªŒè¯ä¸Žæµ‹è¯•

```python
class LitModel(L.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = MyModel()

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self.model(x)
        loss = nn.functional.cross_entropy(y_hat, y)
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self.model(x)
        val_loss = nn.functional.cross_entropy(y_hat, y)
        acc = (y_hat.argmax(dim=1) == y).float().mean()
        self.log('val_loss', val_loss)
        self.log('val_acc', acc)

    def test_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self.model(x)
        test_loss = nn.functional.cross_entropy(y_hat, y)
        self.log('test_loss', test_loss)

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=1e-3)

# Train with validation
trainer = L.Trainer(max_epochs=10)
trainer.fit(model, train_loader, val_loader)

# Test
trainer.test(model, test_loader)
```

**è‡ªåŠ¨åŠŸèƒ½**ï¼š
- é»˜è®¤æ¯ä¸ª epoch è¿è¡ŒéªŒè¯
- æŒ‡æ ‡è‡ªåŠ¨è®°å½•åˆ° TensorBoard
- åŸºäºŽ val_loss ä¿å­˜æœ€ä¼˜æ¨¡åž‹æ£€æŸ¥ç‚¹

### å·¥ä½œæµ 3ï¼šåˆ†å¸ƒå¼è®­ç»ƒï¼ˆDDPï¼‰

```python
# Same code as single GPU!
model = LitModel()

# 8 GPUs with DDP (automatic!)
trainer = L.Trainer(
    accelerator='gpu',
    devices=8,
    strategy='ddp'  # Or 'fsdp', 'deepspeed'
)

trainer.fit(model, train_loader)
```

**å¯åŠ¨**ï¼š
```bash
# Single command, Lightning handles the rest
python train.py
```

**æ— éœ€ä»»ä½•æ”¹åŠ¨**ï¼š
- è‡ªåŠ¨æ•°æ®åˆ†å‘
- æ¢¯åº¦åŒæ­¥
- å¤šèŠ‚ç‚¹æ”¯æŒï¼ˆåªéœ€è®¾ç½® `num_nodes=2`ï¼‰

### å·¥ä½œæµ 4ï¼šç”¨äºŽç›‘æŽ§çš„å›žè°ƒï¼ˆCallbacksï¼‰

```python
from lightning.pytorch.callbacks import ModelCheckpoint, EarlyStopping, LearningRateMonitor

# Create callbacks
checkpoint = ModelCheckpoint(
    monitor='val_loss',
    mode='min',
    save_top_k=3,
    filename='model-{epoch:02d}-{val_loss:.2f}'
)

early_stop = EarlyStopping(
    monitor='val_loss',
    patience=5,
    mode='min'
)

lr_monitor = LearningRateMonitor(logging_interval='epoch')

# Add to Trainer
trainer = L.Trainer(
    max_epochs=100,
    callbacks=[checkpoint, early_stop, lr_monitor]
)

trainer.fit(model, train_loader, val_loader)
```

**æ•ˆæžœ**ï¼š
- è‡ªåŠ¨ä¿å­˜æœ€ä¼˜çš„ 3 ä¸ªæ¨¡åž‹
- è‹¥ 5 ä¸ª epoch å†…æ— æ”¹å–„åˆ™æå‰åœæ­¢
- å°†å­¦ä¹ çŽ‡è®°å½•åˆ° TensorBoard

### å·¥ä½œæµ 5ï¼šå­¦ä¹ çŽ‡è°ƒåº¦

```python
class LitModel(L.LightningModule):
    # ... (training_step, etc.)

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=1e-3)

        # Cosine annealing
        scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
            optimizer,
            T_max=100,
            eta_min=1e-5
        )

        return {
            'optimizer': optimizer,
            'lr_scheduler': {
                'scheduler': scheduler,
                'interval': 'epoch',  # Update per epoch
                'frequency': 1
            }
        }

# Learning rate auto-logged!
trainer = L.Trainer(max_epochs=100)
trainer.fit(model, train_loader)
```

## ä½•æ—¶ä½¿ç”¨ä¸Žæ›¿ä»£æ–¹æ¡ˆå¯¹æ¯”

**é€‚åˆä½¿ç”¨ PyTorch Lightning çš„åœºæ™¯**ï¼š
- å¸Œæœ›ä»£ç æ•´æ´ã€ç»“æž„æ¸…æ™°
- éœ€è¦ç”Ÿäº§çº§è®­ç»ƒå¾ªçŽ¯
- åœ¨å• GPUã€å¤š GPUã€TPU ä¹‹é—´åˆ‡æ¢
- å¸Œæœ›ä½¿ç”¨å†…ç½®å›žè°ƒå’Œæ—¥å¿—è®°å½•
- å›¢é˜Ÿåä½œï¼ˆæ ‡å‡†åŒ–ç»“æž„ï¼‰

**æ ¸å¿ƒä¼˜åŠ¿**ï¼š
- **æœ‰ç»„ç»‡**ï¼šå°†ç ”ç©¶ä»£ç ä¸Žå·¥ç¨‹ä»£ç åˆ†ç¦»
- **è‡ªåŠ¨åŒ–**ï¼šä¸€è¡Œä»£ç å¯ç”¨ DDPã€FSDPã€DeepSpeed
- **å›žè°ƒ**ï¼šæ¨¡å—åŒ–è®­ç»ƒæ‰©å±•
- **å¯å¤çŽ°**ï¼šæ ·æ¿ä»£ç æ›´å°‘ = æ›´å°‘ bug
- **ç»è¿‡éªŒè¯**ï¼šæ¯æœˆä¸‹è½½é‡ 100 ä¸‡+ï¼Œä¹…ç»è€ƒéªŒ

**æ”¹ç”¨å…¶ä»–æ–¹æ¡ˆçš„åœºæ™¯**ï¼š
- **Accelerate**ï¼šå¯¹çŽ°æœ‰ä»£ç æ”¹åŠ¨æœ€å°ï¼Œçµæ´»æ€§æ›´é«˜
- **Ray Train**ï¼šå¤šèŠ‚ç‚¹ç¼–æŽ’ã€è¶…å‚æ•°è°ƒä¼˜
- **åŽŸç”Ÿ PyTorch**ï¼šæœ€å¤§æŽ§åˆ¶æƒï¼Œé€‚åˆå­¦ä¹ ç›®çš„
- **Keras**ï¼šTensorFlow ç”Ÿæ€ç³»ç»Ÿ

## å¸¸è§é—®é¢˜

**é—®é¢˜ï¼šæŸå¤±ä¸ä¸‹é™**

æ£€æŸ¥æ•°æ®å’Œæ¨¡åž‹è®¾ç½®ï¼š
```python
# Add to training_step
def training_step(self, batch, batch_idx):
    if batch_idx == 0:
        print(f"Batch shape: {batch[0].shape}")
        print(f"Labels: {batch[1]}")
    loss = ...
    return loss
```

**é—®é¢˜ï¼šå†…å­˜ä¸è¶³**

å‡å° batch size æˆ–ä½¿ç”¨æ¢¯åº¦ç´¯ç§¯ï¼š
```python
trainer = L.Trainer(
    accumulate_grad_batches=4,  # Effective batch = batch_size Ã— 4
    precision='bf16'  # Or 'fp16', reduces memory 50%
)
```

**é—®é¢˜ï¼šéªŒè¯æœªè¿è¡Œ**

ç¡®ä¿ä¼ å…¥äº† val_loaderï¼š
```python
# WRONG
trainer.fit(model, train_loader)

# CORRECT
trainer.fit(model, train_loader, val_loader)
```

**é—®é¢˜ï¼šDDP æ„å¤–å¯åŠ¨å¤šä¸ªè¿›ç¨‹**

Lightning ä¼šè‡ªåŠ¨æ£€æµ‹ GPUã€‚è¯·æ˜¾å¼è®¾ç½® devicesï¼š
```python
# Test on CPU first
trainer = L.Trainer(accelerator='cpu', devices=1)

# Then GPU
trainer = L.Trainer(accelerator='gpu', devices=1)
```

## è¿›é˜¶ä¸»é¢˜

**å›žè°ƒ**ï¼šå‚è§ [references/callbacks.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/pytorch-lightning/references/callbacks.md)ï¼Œäº†è§£ EarlyStoppingã€ModelCheckpointã€è‡ªå®šä¹‰å›žè°ƒåŠå›žè°ƒé’©å­ï¼ˆhookï¼‰ã€‚

**åˆ†å¸ƒå¼ç­–ç•¥**ï¼šå‚è§ [references/distributed.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/pytorch-lightning/references/distributed.md)ï¼Œäº†è§£ DDPã€FSDPã€DeepSpeed ZeRO é›†æˆåŠå¤šèŠ‚ç‚¹é…ç½®ã€‚

**è¶…å‚æ•°è°ƒä¼˜**ï¼šå‚è§ [references/hyperparameter-tuning.md](https://github.com/zedteam/zed-agent/blob/main/optional-skills/mlops/pytorch-lightning/references/hyperparameter-tuning.md)ï¼Œäº†è§£ä¸Ž Optunaã€Ray Tune åŠ WandB sweeps çš„é›†æˆã€‚

## ç¡¬ä»¶è¦æ±‚

- **CPU**ï¼šæ”¯æŒï¼ˆé€‚åˆè°ƒè¯•ï¼‰
- **å• GPU**ï¼šæ”¯æŒ
- **å¤š GPU**ï¼šDDPï¼ˆé»˜è®¤ï¼‰ã€FSDP æˆ– DeepSpeed
- **å¤šèŠ‚ç‚¹**ï¼šDDPã€FSDPã€DeepSpeed
- **TPU**ï¼šæ”¯æŒï¼ˆ8 æ ¸ï¼‰
- **Apple MPS**ï¼šæ”¯æŒ

**ç²¾åº¦é€‰é¡¹**ï¼š
- FP32ï¼ˆé»˜è®¤ï¼‰
- FP16ï¼ˆV100 åŠè¾ƒæ—§ GPUï¼‰
- BF16ï¼ˆA100/H100ï¼ŒæŽ¨èï¼‰
- FP8ï¼ˆH100ï¼‰

## èµ„æº

- æ–‡æ¡£ï¼šhttps://lightning.ai/docs/pytorch/stable/
- GitHubï¼šhttps://github.com/Lightning-AI/pytorch-lightning â­ 29,000+
- ç‰ˆæœ¬ï¼š2.5.5+
- ç¤ºä¾‹ï¼šhttps://github.com/Lightning-AI/pytorch-lightning/tree/master/examples
- Discordï¼šhttps://discord.gg/lightning-ai
- ä½¿ç”¨è€…ï¼šKaggle èŽ·å¥–è€…ã€ç§‘ç ”å®žéªŒå®¤ã€ç”Ÿäº§å›¢é˜Ÿ
