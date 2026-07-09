// Server Registry - Manages multiple browser servers
// Deploy this as a separate small Render service or Vercel serverless

const servers = [
  {
    id: 'browser-1',
    url: process.env.BROWSER_SERVER_1 || 'https://browser-1.onrender.com',
    status: 'idle',
    currentSession: null,
    lastHealthCheck: null
  },
  {
    id: 'browser-2',
    url: process.env.BROWSER_SERVER_2 || 'https://browser-2.onrender.com',
    status: 'idle',
    currentSession: null,
    lastHealthCheck: null
  },
  {
    id: 'browser-3',
    url: process.env.BROWSER_SERVER_3 || 'https://browser-3.onrender.com',
    status: 'idle',
    currentSession: null,
    lastHealthCheck: null
  }
];

// Check health of all servers
async function checkHealth() {
  for (const server of servers) {
    try {
      const resp = await fetch(`${server.url}/health`, {
        signal: AbortSignal.timeout(5000)
      });
      if (resp.ok) {
        const data = await resp.json();
        server.status = data.activeSessions === 0 ? 'idle' : 'busy';
        server.lastHealthCheck = Date.now();
      } else {
        server.status = 'error';
      }
    } catch (e) {
      server.status = 'offline';
    }
  }
}

// Get available server
function getAvailableServer() {
  return servers.find(s => s.status === 'idle');
}

// Allocate server to user
async function allocateServer(userId) {
  await checkHealth();

  const server = getAvailableServer();
  if (!server) return null;

  server.status = 'allocating';
  server.currentSession = userId;

  return {
    id: server.id,
    url: server.url,
    wsUrl: server.url.replace('https://', 'wss://').replace('http://', 'ws://')
  };
}

// Release server
function releaseServer(serverId) {
  const server = servers.find(s => s.id === serverId);
  if (server) {
    server.status = 'idle';
    server.currentSession = null;
  }
}

// Get all servers status
function getServersStatus() {
  return servers.map(s => ({
    id: s.id,
    status: s.status,
    url: s.url
  }));
}

module.exports = {
  allocateServer,
  releaseServer,
  getServersStatus,
  checkHealth
};
