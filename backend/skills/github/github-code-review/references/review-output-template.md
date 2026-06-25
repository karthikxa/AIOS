# Review Output Template

Use this as the structure for PR review summary comments. Copy and fill in the sections.

## For PR Summary Comment

```markdown
## Code Review Summary

**Verdict: [Approved âœ… | Changes Requested ðŸ”´ | Reviewed ðŸ’¬]** ([N] issues, [N] suggestions)

**PR:** #[number] â€” [title]
**Author:** @[username]
**Files changed:** [N] (+[additions] -[deletions])

### ðŸ”´ Critical
<!-- Issues that MUST be fixed before merge -->
- **file.py:line** â€” [description]. Suggestion: [fix].

### âš ï¸ Warnings
<!-- Issues that SHOULD be fixed, but not strictly blocking -->
- **file.py:line** â€” [description].

### ðŸ’¡ Suggestions
<!-- Non-blocking improvements, style preferences, future considerations -->
- **file.py:line** â€” [description].

### âœ… Looks Good
<!-- Call out things done well â€” positive reinforcement -->
- [aspect that was done well]

---
*Reviewed by Zed Agent*
```

## Severity Guide

| Level | Icon | When to use | Blocks merge? |
|-------|------|-------------|---------------|
| Critical | ðŸ”´ | Security vulnerabilities, data loss risk, crashes, broken core functionality | Yes |
| Warning | âš ï¸ | Bugs in non-critical paths, missing error handling, missing tests for new code | Usually yes |
| Suggestion | ðŸ’¡ | Style improvements, refactoring ideas, performance hints, documentation gaps | No |
| Looks Good | âœ… | Clean patterns, good test coverage, clear naming, smart design decisions | N/A |

## Verdict Decision

- **Approved âœ…** â€” Zero critical/warning items. Only suggestions or all clear.
- **Changes Requested ðŸ”´** â€” Any critical or warning item exists.
- **Reviewed ðŸ’¬** â€” Observations only (draft PRs, uncertain findings, informational).

## For Inline Comments

Prefix inline comments with the severity icon so they're scannable:

```
ðŸ”´ **Critical:** User input passed directly to SQL query â€” use parameterized queries to prevent injection.
```

```
âš ï¸ **Warning:** This error is silently swallowed. At minimum, log it.
```

```
ðŸ’¡ **Suggestion:** This could be simplified with a dict comprehension:
`{k: v for k, v in items if v is not None}`
```

```
âœ… **Nice:** Good use of context manager here â€” ensures cleanup on exceptions.
```

## For Local (Pre-Push) Review

When reviewing locally before push, use the same structure but present it as a message to the user instead of a PR comment. Skip the PR metadata header and just start with the severity sections.
