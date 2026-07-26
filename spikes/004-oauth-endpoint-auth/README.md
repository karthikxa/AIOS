# Spike 004: OAuth endpoint auth

## Question
Can /oauth/token and /oauth/debug be gated by API key without breaking the OAuth callback flow?

## Approach
- Add middleware check for Bearer ZED_DASHBOARD_API_KEY on /oauth/token and /oauth/debug
- Leave /oauth/google/connect and /oauth/google/callback public
- Test with/without header

## Success Criteria
- Bearer present -> returns data/status
- Missing/invalid -> 403
- Google callback still works
