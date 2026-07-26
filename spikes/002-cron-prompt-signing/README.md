# Spike 002: cron job prompt signing

## Question
Can we reject unsigned/forged job prompts in the cron daemon before execution?

## Approach
- Compute HMAC per job at save time
- Verify HMAC in daemon before `AIAgent.run_conversation(...)`
- Failure path: missing/bad signature → skip job + log

## Success Criteria
- Signed job runs
- Tampered prompt rejected
