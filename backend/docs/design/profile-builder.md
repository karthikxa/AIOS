# Profile Builder â€” Dashboard-Native, Full-Featured Profile Creation

Status: design proposal (not yet implemented)
Author: drafted for Teknium
Supersedes: PR #31781 (prompt_toolkit `zed profile wizard`)

## Why this, not the CLI wizard

PR #31781 added a keyboard-driven `zed profile wizard` in the terminal.
The decision is to **not** build the profile-creation experience in the CLI.
The dashboard already owns mature, separate pages for every element a profile
needs, and a profile is just a ZED_HOME directory â€” so the dashboard is the
right home for a full-featured builder, and it can reuse everything that
already exists.

A profile = a full `~/.zed/profiles/<name>/` directory with its own:
- `config.yaml` â€” holds `model`/`provider`, `mcp_servers`, enabled skills
- `skills/` â€” physical SKILL.md files (built-in seed + optional + hub installs)
- `.env` â€” secrets
- `SOUL.md` / `USER.md` â€” identity

So per-profile scoping of Model, MCPs, and Skills is **native** â€” no data-model
change needed. The gap is purely UX: creation today is a thin modal
(name + clone + model + description), and you can only compose skills/MCPs
*after* the profile exists, by visiting other pages and remembering to scope
them.

## What already exists (reuse, don't rebuild)

| Element | Existing page | Existing API | Profile-scopable? |
|---|---|---|---|
| Name / Description | ProfilesPage create modal | `POST /api/profiles` (`create_profile`) | yes (args) |
| Model + Provider | ModelsPage | `_write_profile_model(profile_dir, â€¦)` | yes â€” ZED_HOME override, already wired into create endpoint |
| MCPs | McpPage | `mcp_config._save_mcp_server` + `/api/mcp/catalog` | yes â€” wrap with ZED_HOME override |
| Skills (built-in/optional) | SkillsPage | `GET /api/skills`, `/api/skills/toggle` | yes â€” config write |
| Skills (hub) | SkillsPage | `/api/skills/hub/search`, `/api/skills/hub/install` | **only via subprocess** â€” see seam #1 |

## Two architectural seams found while grounding this design

These are load-bearing â€” they change the implementation, not just the polish.

### Seam #1 â€” hub-skill install cannot use the ZED_HOME override

`tools/skills_hub.py` binds `SKILLS_DIR = ZED_HOME / "skills"` at **module
import time**. The context-local `set_zed_home_override()` swap (which makes
`_write_profile_model` and the MCP write land in the target profile) does NOT
retroactively rebind that already-imported module global. So a data-layer wrap
of hub install would write into the dashboard's *own* active profile, not the
new one.

The correct mechanism is the existing subprocess path: `_spawn_zed_action`
runs `python -m zed_cli.main <subcommand>`, and `_apply_profile_override()`
re-reads `sys.argv` at import in the fresh child. Prepend `-p <profile>`:

```python
_spawn_zed_action(["-p", profile, "skills", "install", identifier], "skills-install")
```

A fresh subprocess re-imports `skills_hub` with the profile's ZED_HOME bound
from the start, so `SKILLS_DIR` resolves to `<profile>/skills/`. Correct by
construction.

### Seam #2 â€” hub installs are async, so create cannot be fully atomic

Built-in/optional skill enabling and MCP writes are **synchronous config ops**
and can be part of the create call. Hub installs are long-running git fetches
spawned detached (`_spawn_zed_action` returns a PID immediately). So the
create flow is:

1. `create_profile()` â€” make the dir (synchronous)
2. write model (synchronous, ZED_HOME override)
3. write selected MCP servers (synchronous, ZED_HOME override)
4. seed/enable selected built-in + optional skills (synchronous)
5. spawn `zed -p <profile> skills install <id>` per hub skill (async, returns PIDs)

Steps 1â€“4 commit before the response; step 5 returns a list of action PIDs the
UI polls (same pattern as today's SkillsPage hub install). The builder's
"Review â†’ Create" returns `{ok, name, path, hub_installs: [{id, pid}]}` and the
final screen shows live install progress for the hub skills.

## Proposed backend change (small, follows existing patterns)

Extend `ProfileCreate` and the create endpoint â€” no new endpoints, no rewrite:

```python
class ProfileCreate(BaseModel):
    name: str
    clone_from: Optional[str] = None
    # Backward compatibility for older dashboard/desktop clients.
    clone_from_default: bool = False
    clone_all: bool = False
    no_skills: bool = False
    description: Optional[str] = None
    provider: Optional[str] = None
    model: Optional[str] = None
    # NEW â€” all optional, all best-effort post-create (profile already exists)
    mcp_servers: List[MCPServerCreate] = []      # synchronous, ZED_HOME override
    builtin_skills: List[str] = []               # synchronous enable/seed
    hub_skills: List[str] = []                   # async spawn, returns PIDs
```

The endpoint already does best-effort post-create steps (`seed_profile_skills`,
`_write_profile_model`). Add two more best-effort blocks (MCP write, hub-skill
spawn) in the same style â€” a failure in any of them must not 500 the create,
since the profile dir already exists and the user can fix it from the relevant
page afterward. Mirror `_write_profile_model`'s ZED_HOME-override helper for
the MCP write (`_write_profile_mcp_servers(profile_dir, servers)`).

## Proposed frontend â€” dedicated builder page `/profiles/new`

A full page (not the cramped modal), stepped, each step reusing the existing
page's component + API, targeted at the new profile:

```
â‘  Identity   Name + Description (+ optional clone-from existing profile)
â‘¡ Model      Provider + model picker  (reuse ModelsPage picker)
â‘¢ Skills     Tabs: Built-in Â· Optional Â· Hub-search
             multi-select; "Start from default bundle" preset button
â‘£ MCPs       Tabs: Catalog browse Â· Manual add  (reuse McpPage form)
â‘¤ Review     Blueprint preview â†’ Create
             â†’ progress screen for async hub installs
```

Nothing writes to disk until â‘¤.

## Open product decisions (need Teknium)

1. **Skills seeding default.** Fresh profiles auto-seed the default bundle
   today. In the builder, should the skill step **replace** the bundle (pick
   exactly what you want; offer a "start from default bundle" preset) or
   **augment** it? Recommendation: replace + preset button.

2. **Page vs richer modal.** Dedicated `/profiles/new` page (room to grow:
   SOUL editing, multi-agent fleets later) vs a bigger create modal on
   ProfilesPage. Recommendation: dedicated page â€” matches "full-featured / way
   more options."

## Verification plan (when built)

- Backend E2E with isolated ZED_HOME: POST a full create body
  (name + model + 2 MCPs + 3 builtin skills + 1 hub skill), assert the new
  profile dir has the model in config.yaml, both MCP servers in config.yaml,
  the builtin skills enabled, and a spawned PID for the hub skill. Negative:
  a bad MCP entry must not 500 the create.
- `cd web && npm run build` (no JS test suite in web/).
- Targeted: `pytest tests/<web_server profile tests> -k profile_create`.
