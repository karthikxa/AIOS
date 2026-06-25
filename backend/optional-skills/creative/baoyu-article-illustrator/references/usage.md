# Usage

This skill is triggered by natural language in Zed â€” no slash command or CLI flags.

## Trigger Phrases

- "Illustrate this article" / "ä¸ºæ–‡ç« é…å›¾"
- "Add images to this post"
- "Generate illustrations for [path/to/article.md]"

## Input Modes

| Mode | How to trigger | Output Directory |
|------|----------------|------------------|
| File path | Mention an article path (`path/to/article.md`) | `{article-dir}/imgs/` (default) |
| Pasted content | Paste the article text in the conversation | `illustrations/{topic-slug}/` (cwd) |

## Specifying Options in Natural Language

The user can specify any of the following directly in their request. If not specified, the skill asks via the `clarify` tool.

| Option | Example phrasing |
|--------|------------------|
| Type | "as an infographic", "as a flowchart", "as scenes" |
| Style | "in blueprint style", "use notion style", "ç”¨ watercolor é£Žæ ¼" |
| Preset | "use the tech-explainer preset", "storytelling preset" |
| Palette | "with macaron palette", "warm colors only" |
| Density | "minimal images", "one per section", "rich illustrations" |
| Language | "images in English" / "å›¾ç‰‡æ–‡å­—ç”¨ä¸­æ–‡" |
| Output | "save images alongside the article" / "put them in `illustrations/`" |

## Examples

**Technical article with data**:
> å¸®æˆ‘ä¸º api-design.md é…å›¾ï¼Œç”¨ infographic + blueprint é£Žæ ¼

**Preset shortcut**:
> Illustrate api-design.md with the tech-explainer preset

**Personal story**:
> Illustrate journey.md using the storytelling preset

**Tutorial with rich images**:
> Generate illustrations for how-to-deploy.md â€” tutorial preset, rich density

**Opinion article**:
> Illustrate opinion.md with the opinion-piece preset

**Preset with style override**:
> Use the tech-explainer preset for article.md but swap the style for notion
