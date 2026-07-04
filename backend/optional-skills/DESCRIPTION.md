# Optional Skills

Official skills maintained by Zed Team that are **not activated by default**.

These skills ship with the zed-agent repository but are not copied to
`~/.zed/skills/` during setup. They are discoverable via the Skills Hub:

```bash
zed skills browse               # browse all skills, official shown first
zed skills browse --source official  # browse only official optional skills
zed skills search <query>       # finds optional skills labeled "official"
zed skills install <identifier> # copies to ~/.zed/skills/ and activates
```

## Why optional?

Some skills are useful but not broadly needed by every user:

- **Niche integrations** â€” specific paid services, specialized tools
- **Experimental features** â€” promising but not yet proven
- **Heavyweight dependencies** â€” require significant setup (API keys, installs)

By keeping them optional, we keep the default skill set lean while still
providing curated, tested, official skills for users who want them.
