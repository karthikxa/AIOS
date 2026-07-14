export function buildAgentWebSocketUrl(agentBaseUrl) {
  const url = new URL(agentBaseUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Agent WebSocket endpoint must use HTTP(S).');
  }

  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = `${url.pathname.replace(/\/$/, '')}/ws/agent`;
  url.search = '';
  url.hash = '';
  return url.href;
}
