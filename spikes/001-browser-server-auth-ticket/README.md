# Spike 001: browser-server auth ticket

## Question
Can we require a server-issued ticket before WebSocket attach, without breaking legitimate create/reattach flows?

## Approach
- Add minimal ticket API: POST /api/ticket -> returns {sessionId, ticket}
- Modify WS attach: require ?ticket=<value> validation before attachClient
- Validate with two client flows:
  - happy path: create session, get ticket, attach with ticket
  - fail path: attach without ticket -> rejected

## Success Criteria
- Unauthenticated attach rejected with 4401
- Ticket-bearing attach accepted
- Session state and broadcast still work
