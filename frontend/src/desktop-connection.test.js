import { describe, expect, it } from 'vitest';
import { buildAgentWebSocketUrl } from './desktop-connection.js';

describe('buildAgentWebSocketUrl', () => {
  it('uses the agent WebSocket route exposed by the browser agent service', () => {
    expect(buildAgentWebSocketUrl('https://browser-server-2.onrender.com'))
      .toBe('wss://browser-server-2.onrender.com/ws/agent');
  });

  it('does not create a duplicate slash for a trailing-slash endpoint', () => {
    expect(buildAgentWebSocketUrl('http://localhost:8765/'))
      .toBe('ws://localhost:8765/ws/agent');
  });

  it('rejects unsupported endpoint protocols', () => {
    expect(() => buildAgentWebSocketUrl('ftp://example.com')).toThrow('HTTP(S)');
  });
});
