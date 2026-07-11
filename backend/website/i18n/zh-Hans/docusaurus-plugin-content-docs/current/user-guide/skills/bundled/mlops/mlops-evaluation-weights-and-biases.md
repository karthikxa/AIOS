---
title: "Weights And Biases â€” W&Bï¼šè®°å½• ML å®žéªŒã€sweepsã€æ¨¡åž‹æ³¨å†Œè¡¨ã€ä»ªè¡¨ç›˜"
sidebar_label: "Weights And Biases"
description: "W&Bï¼šè®°å½• ML å®žéªŒã€sweepsã€æ¨¡åž‹æ³¨å†Œè¡¨ã€ä»ªè¡¨ç›˜"
---

{/* This page is auto-generated from the skill's SKILL.md by website/scripts/generate-skill-docs.py. Edit the source SKILL.md, not this page. */}

# Weights And Biases

W&Bï¼šè®°å½• ML å®žéªŒã€sweepsã€æ¨¡åž‹æ³¨å†Œè¡¨ã€ä»ªè¡¨ç›˜ã€‚

## Skill å…ƒæ•°æ®

| | |
|---|---|
| æ¥æº | å†…ç½®ï¼ˆé»˜è®¤å®‰è£…ï¼‰ |
| è·¯å¾„ | `skills/mlops/evaluation/weights-and-biases` |
| ç‰ˆæœ¬ | `1.0.0` |
| ä½œè€… | Orchestra Research |
| è®¸å¯è¯ | MIT |
| ä¾èµ– | `wandb` |
| å¹³å° | linux, macos, windows |
| æ ‡ç­¾ | `MLOps`, `Weights And Biases`, `WandB`, `Experiment Tracking`, `Hyperparameter Tuning`, `Model Registry`, `Collaboration`, `Real-Time Visualization`, `PyTorch`, `TensorFlow`, `HuggingFace` |

## å‚è€ƒï¼šå®Œæ•´ SKILL.md

:::info
ä»¥ä¸‹æ˜¯ Zed åœ¨è§¦å‘æ­¤ skill æ—¶åŠ è½½çš„å®Œæ•´ skill å®šä¹‰ã€‚è¿™æ˜¯ agent åœ¨ skill æ¿€æ´»æ—¶æ‰€çœ‹åˆ°çš„æŒ‡ä»¤å†…å®¹ã€‚
:::

# Weights & Biasesï¼šML å®žéªŒè¿½è¸ªä¸Ž MLOps

## é€‚ç”¨åœºæ™¯

åœ¨ä»¥ä¸‹æƒ…å†µä¸‹ä½¿ç”¨ Weights & Biasesï¼ˆW&Bï¼‰ï¼š
- **è¿½è¸ª ML å®žéªŒ**ï¼Œè‡ªåŠ¨è®°å½•æŒ‡æ ‡
- **å®žæ—¶ä»ªè¡¨ç›˜å¯è§†åŒ–**è®­ç»ƒè¿‡ç¨‹
- **è·¨è¶…å‚æ•°å’Œé…ç½®å¯¹æ¯”è¿è¡Œç»“æžœ**
- **è‡ªåŠ¨åŒ– sweeps ä¼˜åŒ–è¶…å‚æ•°**
- **ç®¡ç†æ¨¡åž‹æ³¨å†Œè¡¨**ï¼Œæ”¯æŒç‰ˆæœ¬æŽ§åˆ¶ä¸Žè¡€ç¼˜è¿½è¸ª
- **å›¢é˜Ÿåä½œå¼€å±• ML é¡¹ç›®**ï¼Œå…±äº«å·¥ä½œåŒº
- **è¿½è¸ª artifacts**ï¼ˆæ•°æ®é›†ã€æ¨¡åž‹ã€ä»£ç ï¼‰åŠå…¶è¡€ç¼˜å…³ç³»

**ç”¨æˆ·æ•°**ï¼š20 ä¸‡+ ML ä»Žä¸šè€… | **GitHub Stars**ï¼š10.5k+ | **é›†æˆæ•°**ï¼š100+

## å®‰è£…

```bash
# å®‰è£… W&B
pip install wandb

# ç™»å½•ï¼ˆåˆ›å»º API keyï¼‰
wandb login

# æˆ–ä»¥ç¼–ç¨‹æ–¹å¼è®¾ç½® API key
export WANDB_API_KEY=your_api_key_here
```

## å¿«é€Ÿå¼€å§‹

### åŸºç¡€å®žéªŒè¿½è¸ª

```python
import wandb

# åˆå§‹åŒ–ä¸€æ¬¡è¿è¡Œ
run = wandb.init(
    project="my-project",
    config={
        "learning_rate": 0.001,
        "epochs": 10,
        "batch_size": 32,
        "architecture": "ResNet50"
    }
)

# è®­ç»ƒå¾ªçŽ¯
for epoch in range(run.config.epochs):
    # ä½ çš„è®­ç»ƒä»£ç 
    train_loss = train_epoch()
    val_loss = validate()

    # è®°å½•æŒ‡æ ‡
    wandb.log({
        "epoch": epoch,
        "train/loss": train_loss,
        "val/loss": val_loss,
        "train/accuracy": train_acc,
        "val/accuracy": val_acc
    })

# ç»“æŸè¿è¡Œ
wandb.finish()
```

### ä¸Ž PyTorch é…åˆä½¿ç”¨

```python
import torch
import wandb

# åˆå§‹åŒ–
wandb.init(project="pytorch-demo", config={
    "lr": 0.001,
    "epochs": 10
})

# è®¿é—®é…ç½®
config = wandb.config

# è®­ç»ƒå¾ªçŽ¯
for epoch in range(config.epochs):
    for batch_idx, (data, target) in enumerate(train_loader):
        # å‰å‘ä¼ æ’­
        output = model(data)
        loss = criterion(output, target)

        # åå‘ä¼ æ’­
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # æ¯ 100 ä¸ª batch è®°å½•ä¸€æ¬¡
        if batch_idx % 100 == 0:
            wandb.log({
                "loss": loss.item(),
                "epoch": epoch,
                "batch": batch_idx
            })

# ä¿å­˜æ¨¡åž‹
torch.save(model.state_dict(), "model.pth")
wandb.save("model.pth")  # ä¸Šä¼ è‡³ W&B

wandb.finish()
```

## æ ¸å¿ƒæ¦‚å¿µ

### 1. Projects ä¸Ž Runs

**Project**ï¼šç›¸å…³å®žéªŒçš„é›†åˆ
**Run**ï¼šè®­ç»ƒè„šæœ¬çš„å•æ¬¡æ‰§è¡Œ

```python
# åˆ›å»º/ä½¿ç”¨ project
run = wandb.init(
    project="image-classification",
    name="resnet50-experiment-1",  # å¯é€‰çš„è¿è¡Œåç§°
    tags=["baseline", "resnet"],    # ä½¿ç”¨æ ‡ç­¾ç»„ç»‡
    notes="First baseline run"      # æ·»åŠ å¤‡æ³¨
)

# æ¯æ¬¡è¿è¡Œéƒ½æœ‰å”¯ä¸€ ID
print(f"Run ID: {run.id}")
print(f"Run URL: {run.url}")
```

### 2. é…ç½®è¿½è¸ª

è‡ªåŠ¨è¿½è¸ªè¶…å‚æ•°ï¼š

```python
config = {
    # æ¨¡åž‹æž¶æž„
    "model": "ResNet50",
    "pretrained": True,

    # è®­ç»ƒå‚æ•°
    "learning_rate": 0.001,
    "batch_size": 32,
    "epochs": 50,
    "optimizer": "Adam",

    # æ•°æ®å‚æ•°
    "dataset": "ImageNet",
    "augmentation": "standard"
}

wandb.init(project="my-project", config=config)

# è®­ç»ƒè¿‡ç¨‹ä¸­è®¿é—®é…ç½®
lr = wandb.config.learning_rate
batch_size = wandb.config.batch_size
```

### 3. æŒ‡æ ‡è®°å½•

```python
# è®°å½•æ ‡é‡
wandb.log({"loss": 0.5, "accuracy": 0.92})

# è®°å½•å¤šä¸ªæŒ‡æ ‡
wandb.log({
    "train/loss": train_loss,
    "train/accuracy": train_acc,
    "val/loss": val_loss,
    "val/accuracy": val_acc,
    "learning_rate": current_lr,
    "epoch": epoch
})

# ä½¿ç”¨è‡ªå®šä¹‰ x è½´è®°å½•
wandb.log({"loss": loss}, step=global_step)

# è®°å½•åª’ä½“ï¼ˆå›¾åƒã€éŸ³é¢‘ã€è§†é¢‘ï¼‰
wandb.log({"examples": [wandb.Image(img) for img in images]})

# è®°å½•ç›´æ–¹å›¾
wandb.log({"gradients": wandb.Histogram(gradients)})

# è®°å½•è¡¨æ ¼
table = wandb.Table(columns=["id", "prediction", "ground_truth"])
wandb.log({"predictions": table})
```

### 4. æ¨¡åž‹æ£€æŸ¥ç‚¹

```python
import torch
import wandb

# ä¿å­˜æ¨¡åž‹æ£€æŸ¥ç‚¹
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}

torch.save(checkpoint, 'checkpoint.pth')

# ä¸Šä¼ è‡³ W&B
wandb.save('checkpoint.pth')

# æˆ–ä½¿ç”¨ Artifactsï¼ˆæŽ¨èï¼‰
artifact = wandb.Artifact('model', type='model')
artifact.add_file('checkpoint.pth')
wandb.log_artifact(artifact)
```

## è¶…å‚æ•° Sweeps

è‡ªåŠ¨æœç´¢æœ€ä¼˜è¶…å‚æ•°ã€‚

### å®šä¹‰ Sweep é…ç½®

```python
sweep_config = {
    'method': 'bayes',  # æˆ– 'grid'ã€'random'
    'metric': {
        'name': 'val/accuracy',
        'goal': 'maximize'
    },
    'parameters': {
        'learning_rate': {
            'distribution': 'log_uniform',
            'min': 1e-5,
            'max': 1e-1
        },
        'batch_size': {
            'values': [16, 32, 64, 128]
        },
        'optimizer': {
            'values': ['adam', 'sgd', 'rmsprop']
        },
        'dropout': {
            'distribution': 'uniform',
            'min': 0.1,
            'max': 0.5
        }
    }
}

# åˆå§‹åŒ– sweep
sweep_id = wandb.sweep(sweep_config, project="my-project")
```

### å®šä¹‰è®­ç»ƒå‡½æ•°

```python
def train():
    # åˆå§‹åŒ–è¿è¡Œ
    run = wandb.init()

    # è®¿é—® sweep å‚æ•°
    lr = wandb.config.learning_rate
    batch_size = wandb.config.batch_size
    optimizer_name = wandb.config.optimizer

    # ä½¿ç”¨ sweep é…ç½®æž„å»ºæ¨¡åž‹
    model = build_model(wandb.config)
    optimizer = get_optimizer(optimizer_name, lr)

    # è®­ç»ƒå¾ªçŽ¯
    for epoch in range(NUM_EPOCHS):
        train_loss = train_epoch(model, optimizer, batch_size)
        val_acc = validate(model)

        # è®°å½•æŒ‡æ ‡
        wandb.log({
            "train/loss": train_loss,
            "val/accuracy": val_acc
        })

# è¿è¡Œ sweep
wandb.agent(sweep_id, function=train, count=50)  # è¿è¡Œ 50 æ¬¡è¯•éªŒ
```

### Sweep ç­–ç•¥

```python
# ç½‘æ ¼æœç´¢ - ç©·ä¸¾
sweep_config = {
    'method': 'grid',
    'parameters': {
        'lr': {'values': [0.001, 0.01, 0.1]},
        'batch_size': {'values': [16, 32, 64]}
    }
}

# éšæœºæœç´¢
sweep_config = {
    'method': 'random',
    'parameters': {
        'lr': {'distribution': 'uniform', 'min': 0.0001, 'max': 0.1},
        'dropout': {'distribution': 'uniform', 'min': 0.1, 'max': 0.5}
    }
}

# è´å¶æ–¯ä¼˜åŒ–ï¼ˆæŽ¨èï¼‰
sweep_config = {
    'method': 'bayes',
    'metric': {'name': 'val/loss', 'goal': 'minimize'},
    'parameters': {
        'lr': {'distribution': 'log_uniform', 'min': 1e-5, 'max': 1e-1}
    }
}
```

## Artifacts

è¿½è¸ªæ•°æ®é›†ã€æ¨¡åž‹åŠå…¶ä»–æ–‡ä»¶çš„è¡€ç¼˜å…³ç³»ã€‚

### è®°å½• Artifacts

```python
# åˆ›å»º artifact
artifact = wandb.Artifact(
    name='training-dataset',
    type='dataset',
    description='ImageNet training split',
    metadata={'size': '1.2M images', 'split': 'train'}
)

# æ·»åŠ æ–‡ä»¶
artifact.add_file('data/train.csv')
artifact.add_dir('data/images/')

# è®°å½• artifact
wandb.log_artifact(artifact)
```

### ä½¿ç”¨ Artifacts

```python
# ä¸‹è½½å¹¶ä½¿ç”¨ artifact
run = wandb.init(project="my-project")

# ä¸‹è½½ artifact
artifact = run.use_artifact('training-dataset:latest')
artifact_dir = artifact.download()

# ä½¿ç”¨æ•°æ®
data = load_data(f"{artifact_dir}/train.csv")
```

### æ¨¡åž‹æ³¨å†Œè¡¨

```python
# å°†æ¨¡åž‹è®°å½•ä¸º artifact
model_artifact = wandb.Artifact(
    name='resnet50-model',
    type='model',
    metadata={'architecture': 'ResNet50', 'accuracy': 0.95}
)

model_artifact.add_file('model.pth')
wandb.log_artifact(model_artifact, aliases=['best', 'production'])

# é“¾æŽ¥åˆ°æ¨¡åž‹æ³¨å†Œè¡¨
run.link_artifact(model_artifact, 'model-registry/production-models')
```

## é›†æˆç¤ºä¾‹

### HuggingFace Transformers

```python
from transformers import Trainer, TrainingArguments
import wandb

# åˆå§‹åŒ– W&B
wandb.init(project="hf-transformers")

# å¸¦ W&B çš„è®­ç»ƒå‚æ•°
training_args = TrainingArguments(
    output_dir="./results",
    report_to="wandb",  # å¯ç”¨ W&B æ—¥å¿—
    run_name="bert-finetuning",
    logging_steps=100,
    save_steps=500
)

# Trainer è‡ªåŠ¨è®°å½•è‡³ W&B
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)

trainer.train()
```

### PyTorch Lightning

```python
from pytorch_lightning import Trainer
from pytorch_lightning.loggers import WandbLogger
import wandb

# åˆ›å»º W&B logger
wandb_logger = WandbLogger(
    project="lightning-demo",
    log_model=True  # è®°å½•æ¨¡åž‹æ£€æŸ¥ç‚¹
)

# ä¸Ž Trainer é…åˆä½¿ç”¨
trainer = Trainer(
    logger=wandb_logger,
    max_epochs=10
)

trainer.fit(model, datamodule=dm)
```

### Keras/TensorFlow

```python
import wandb
from wandb.keras import WandbCallback

# åˆå§‹åŒ–
wandb.init(project="keras-demo")

# æ·»åŠ å›žè°ƒ
model.fit(
    x_train, y_train,
    validation_data=(x_val, y_val),
    epochs=10,
    callbacks=[WandbCallback()]  # è‡ªåŠ¨è®°å½•æŒ‡æ ‡
)
```

## å¯è§†åŒ–ä¸Žåˆ†æž

### è‡ªå®šä¹‰å›¾è¡¨

```python
# è®°å½•è‡ªå®šä¹‰å¯è§†åŒ–
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot(x, y)
wandb.log({"custom_plot": wandb.Image(fig)})

# è®°å½•æ··æ·†çŸ©é˜µ
wandb.log({"conf_mat": wandb.plot.confusion_matrix(
    probs=None,
    y_true=ground_truth,
    preds=predictions,
    class_names=class_names
)})
```

### Reports

åœ¨ W&B UI ä¸­åˆ›å»ºå¯åˆ†äº«çš„æŠ¥å‘Šï¼š
- ç»„åˆè¿è¡Œç»“æžœã€å›¾è¡¨ä¸Žæ–‡æœ¬
- æ”¯æŒ Markdown
- å¯åµŒå…¥çš„å¯è§†åŒ–å†…å®¹
- å›¢é˜Ÿåä½œ

## æœ€ä½³å®žè·µ

### 1. ä½¿ç”¨æ ‡ç­¾å’Œåˆ†ç»„è¿›è¡Œç»„ç»‡

```python
wandb.init(
    project="my-project",
    tags=["baseline", "resnet50", "imagenet"],
    group="resnet-experiments",  # å¯¹ç›¸å…³è¿è¡Œåˆ†ç»„
    job_type="train"             # ä»»åŠ¡ç±»åž‹
)
```

### 2. è®°å½•æ‰€æœ‰ç›¸å…³ä¿¡æ¯

```python
# è®°å½•ç³»ç»ŸæŒ‡æ ‡
wandb.log({
    "gpu/util": gpu_utilization,
    "gpu/memory": gpu_memory_used,
    "cpu/util": cpu_utilization
})

# è®°å½•ä»£ç ç‰ˆæœ¬
wandb.log({"git_commit": git_commit_hash})

# è®°å½•æ•°æ®åˆ’åˆ†
wandb.log({
    "data/train_size": len(train_dataset),
    "data/val_size": len(val_dataset)
})
```

### 3. ä½¿ç”¨æè¿°æ€§åç§°

```python
# âœ… å¥½ï¼šæè¿°æ€§è¿è¡Œåç§°
wandb.init(
    project="nlp-classification",
    name="bert-base-lr0.001-bs32-epoch10"
)

# âŒ å·®ï¼šé€šç”¨åç§°
wandb.init(project="nlp", name="run1")
```

### 4. ä¿å­˜é‡è¦ Artifacts

```python
# ä¿å­˜æœ€ç»ˆæ¨¡åž‹
artifact = wandb.Artifact('final-model', type='model')
artifact.add_file('model.pth')
wandb.log_artifact(artifact)

# ä¿å­˜é¢„æµ‹ç»“æžœä»¥ä¾›åˆ†æž
predictions_table = wandb.Table(
    columns=["id", "input", "prediction", "ground_truth"],
    data=predictions_data
)
wandb.log({"predictions": predictions_table})
```

### 5. åœ¨ç½‘ç»œä¸ç¨³å®šæ—¶ä½¿ç”¨ç¦»çº¿æ¨¡å¼

```python
import os

# å¯ç”¨ç¦»çº¿æ¨¡å¼
os.environ["WANDB_MODE"] = "offline"

wandb.init(project="my-project")
# ... ä½ çš„ä»£ç  ...

# ç¨åŽåŒæ­¥
# wandb sync <run_directory>
```

## å›¢é˜Ÿåä½œ

### åˆ†äº«è¿è¡Œç»“æžœ

```python
# è¿è¡Œç»“æžœå¯é€šè¿‡ URL è‡ªåŠ¨åˆ†äº«
run = wandb.init(project="team-project")
print(f"Share this URL: {run.url}")
```

### å›¢é˜Ÿé¡¹ç›®

- åœ¨ wandb.ai åˆ›å»ºå›¢é˜Ÿè´¦å·
- æ·»åŠ å›¢é˜Ÿæˆå‘˜
- è®¾ç½®é¡¹ç›®å¯è§æ€§ï¼ˆç§æœ‰/å…¬å¼€ï¼‰
- ä½¿ç”¨å›¢é˜Ÿçº§ artifacts å’Œæ¨¡åž‹æ³¨å†Œè¡¨

## å®šä»·

- **å…è´¹ç‰ˆ**ï¼šæ— é™å…¬å¼€é¡¹ç›®ï¼Œ100GB å­˜å‚¨
- **å­¦æœ¯ç‰ˆ**ï¼šå­¦ç”Ÿ/ç ”ç©¶äººå‘˜å…è´¹ä½¿ç”¨
- **å›¢é˜Ÿç‰ˆ**ï¼š$50/å¸­ä½/æœˆï¼Œç§æœ‰é¡¹ç›®ï¼Œæ— é™å­˜å‚¨
- **ä¼ä¸šç‰ˆ**ï¼šå®šåˆ¶å®šä»·ï¼Œæ”¯æŒæœ¬åœ°éƒ¨ç½²

## èµ„æº

- **æ–‡æ¡£**ï¼šhttps://docs.wandb.ai
- **GitHub**ï¼šhttps://github.com/wandb/wandbï¼ˆ10.5k+ starsï¼‰
- **ç¤ºä¾‹**ï¼šhttps://github.com/wandb/examples
- **ç¤¾åŒº**ï¼šhttps://wandb.ai/community
- **Discord**ï¼šhttps://wandb.me/discord

## å¦è¯·å‚é˜…

- `references/sweeps.md` â€” è¶…å‚æ•°ä¼˜åŒ–ç»¼åˆæŒ‡å—
- `references/artifacts.md` â€” æ•°æ®ä¸Žæ¨¡åž‹ç‰ˆæœ¬æŽ§åˆ¶æ¨¡å¼
- `references/integrations.md` â€” æ¡†æž¶ä¸“é¡¹ç¤ºä¾‹
