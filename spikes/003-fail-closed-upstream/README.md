# Spike 003: fail-closed upstream config

## Question
Should missing upstream config fail startup instead of silently using a hardcoded external proxy?

## Approach
- Compare current behavior vs strict behavior with a small harness
- Success = strict path aborts/refuses to route when required env missing

