class PluginsStore {
  constructor() {
    // Generate or restore a stable user_id for this browser
    this.userId = localStorage.getItem('zed_user_id');
    if (!this.userId) {
      this.userId = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem('zed_user_id', this.userId);
    }

    this.installed = [];
    this.popular = [
      { id: 'gmail', name: 'Gmail', desc: 'Read, send, and manage emails.', logo: 'assets/plugins/gmail.svg' },
      { id: 'google-drive', name: 'Google Drive', desc: 'Access and manage files in Drive.', logo: 'assets/plugins/google-drive.svg' },
      { id: 'notion', name: 'Notion', desc: 'Sync pages, databases, and content.', logo: 'assets/plugins/notion.svg' },
      { id: 'calendar', name: 'Google Calendar', desc: 'View and manage schedules.', logo: 'assets/plugins/calendar.svg' },
      { id: 'slack', name: 'Slack', desc: 'Get notifications and send messages.', logo: 'assets/plugins/slack.svg' },
      { id: 'facebook', name: 'Facebook', desc: 'Connect with your Facebook page.', logo: 'assets/plugins/facebook.svg' },
      { id: 'trello', name: 'Trello', desc: 'Manage boards, lists and cards.', logo: 'assets/plugins/trello.svg' },
      { id: 'dropbox', name: 'Dropbox', desc: 'Store and share your files.', logo: 'assets/plugins/dropbox.svg' },
      { id: 'airtable', name: 'Airtable', desc: 'Organize and sync your data.', logo: 'assets/plugins/airtable.svg' },
      { id: 'github', name: 'GitHub', desc: 'Access repos, issues and pull requests.', logo: 'assets/plugins/github.svg' },
      { id: 'google-docs', name: 'Google Docs', desc: 'Create, edit, and collaborate on documents.', logo: 'assets/plugins/google-docs.png' },
      { id: 'google-sheets', name: 'Google Sheets', desc: 'Create, edit, and collaborate on spreadsheets.', logo: 'assets/plugins/google-sheets.png' },
      { id: 'google-slides', name: 'Google Slides', desc: 'Create, edit, collaborate, and present presentations.', logo: 'assets/plugins/google-slides.png' },
      { id: 'google-tasks', name: 'Google Tasks', desc: 'Create, edit, and manage your tasks.', logo: 'assets/plugins/google-tasks.png' },
      { id: 'google-contacts', name: 'Google Contacts', desc: 'Access, organize, and manage your contacts.', logo: 'assets/plugins/google-contacts.png' },
      { id: 'google-chat', name: 'Google Chat', desc: 'Send messages and collaborate in team spaces.', logo: 'assets/plugins/google-chat.png' },
      { id: 'google-meet', name: 'Google Meet', desc: 'Start, schedule, and join video meetings.', logo: 'assets/plugins/google-meet.png' },
      { id: 'youtube', name: 'YouTube', desc: 'Manage videos, playlists, and channel activity.', logo: 'assets/plugins/youtube.png' },
      { id: 'google-fit', name: 'Google Fitness', desc: 'Track, view, and sync fitness and health data.', logo: 'assets/plugins/google-fit.png' },
      { id: 'google-classroom', name: 'Google Classroom', desc: 'Manage classes, assignments, and grades.', logo: 'assets/plugins/google-classroom.png' },
      { id: 'google-photos', name: 'Google Photos', desc: 'Access, organize, and back up your photos.', logo: 'assets/plugins/google-photos.png' }
    ];
    this.listeners = [];
    this.connected = {};
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  notify() { this.listeners.forEach(l => l(this)); }

  async loadStatus() {
    try {
      const url = `/oauth/status?user_id=${encodeURIComponent(this.userId)}`;
      console.log('[Plugins] loadStatus fetching:', url);
      const resp = await fetch(url);
      console.log('[Plugins] loadStatus response status:', resp.status);
      if (resp.ok) {
        const status = await resp.json();
        console.log('[Plugins] loadStatus raw response:', JSON.stringify(status));
        this.connected = {};
        for (const [id, data] of Object.entries(status)) {
          if (id === 'google') continue;
          if (data && data.connected) this.connected[id] = data;
        }
        // Also load from localStorage as fallback
        const localConnections = JSON.parse(localStorage.getItem('zed_connected_plugins') || '{}');
        for (const [id, data] of Object.entries(localConnections)) {
          if (!this.connected[id]) this.connected[id] = data;
        }
        console.log('[Plugins] connected map:', JSON.stringify(this.connected));
        this.installed = this.popular.filter(p => this.connected[p.id]);
        this.popular = this.popular.filter(p => !this.connected[p.id]);
        console.log('[Plugins] installed:', this.installed.map(p => p.id));
        this.notify();
      } else {
        const text = await resp.text().catch(() => '');
        console.error('[Plugins] loadStatus failed:', resp.status, text);
      }
    } catch (e) {
      console.error('[Plugins] loadStatus error:', e);
    }
  }

  async connect(pluginId) {
    // Save pending connection before redirect
    localStorage.setItem('zed_pending_plugin', pluginId);
    localStorage.setItem('zed_user_id', this.userId);
    // Redirect to OAuth connector
    const redirectTarget = window.location.origin + '/plugins';
    window.location.href = `/oauth/google/connect?user_id=${encodeURIComponent(this.userId)}&plugin_id=${encodeURIComponent(pluginId)}&redirect_to=${encodeURIComponent(redirectTarget)}`;
  }

  async disconnect(pluginId) {
    try {
      const resp = await fetch(
        `/oauth/disconnect?user_id=${encodeURIComponent(this.userId)}&provider=${encodeURIComponent(pluginId)}`,
        { method: 'DELETE' }
      );
      if (resp.ok) {
        delete this.connected[pluginId];
        // Move disconnected plugin back to popular list
        const idx = this.installed.findIndex(p => p.id === pluginId);
        if (idx !== -1) {
          const item = this.installed.splice(idx, 1)[0];
          if (!this.popular.find(p => p.id === item.id)) {
            this.popular.push(item);
          }
        }
        this.notify();
      }
    } catch (err) {
      showToast('Failed to disconnect: ' + err.message, 'error');
    }
  }

  install(id) {
    const itemIndex = this.popular.findIndex(p => p.id === id);
    if (itemIndex > -1) {
      const item = this.popular[itemIndex];
      this.popular.splice(itemIndex, 1);
      this.installed.push(item);
      this.notify();
    }
  }

  uninstall(id) {
    this.disconnect(id);
  }
}

const pluginsStore = new PluginsStore();
export { pluginsStore };

// Expose to React dialog
window.__pluginsStore = pluginsStore;

let currentConfigPluginId = null;

export function initPluginsPage() {
  console.log('[Plugins] initPluginsPage called, URL:', window.location.href);
  const container = document.getElementById('pluginsPageView');
  if (!container) { console.warn('[Plugins] pluginsPageView not found'); return; }

  const btnCreate = document.getElementById('btnCreatePlugin');
  const btnExplore = container.querySelector('.plugins-hero-btn');

  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      showToast('Add custom plugin packages from the Zed marketplace (coming soon).', 'info');
    });
  }
  if (btnExplore) {
    btnExplore.addEventListener('click', () => {
      showToast('Browse the Zed plugin marketplace (coming soon).', 'info');
    });
  }

  pluginsStore.subscribe((store) => {
    renderInstalled(store);
    renderPopular(store);
  });

  renderInstalled(pluginsStore);
  renderPopular(pluginsStore);

  const params = new URLSearchParams(window.location.search);
  const connectedParam = params.get('connected');
  const returnedUserId = params.get('user_id');
  const errorParam = params.get('error');

  if (connectedParam || errorParam) {
    // If callback params present, defer loadStatus until after userId is updated
    // to avoid a race that clears connected state.
    // Show plugins page and activate its nav item
    const pluginsPageView = document.getElementById('pluginsPageView');
    if (pluginsPageView) pluginsPageView.style.display = 'flex';
    const navPlugins = document.getElementById('navPlugins');
    if (navPlugins) {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      navPlugins.classList.add('active');
    }
    // Hide other views
    ['modelsPageView','schedulesPageView','voicePageView','agentPageView',
     'connectPageView','createAgentPageView','editAgentPageView'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const appHeader = document.querySelector('.app-header');
    if (appHeader) appHeader.style.display = 'none';
    const centerContainer = document.querySelector('.center-container');
    if (centerContainer) centerContainer.style.display = 'none';

    const url = new URL(window.location);
    url.searchParams.delete('connected');
    url.searchParams.delete('user_id');
    url.searchParams.delete('error');
    window.history.replaceState({}, '', url);

    // If the callback returned a user_id, persist it
    if (returnedUserId) {
      pluginsStore.userId = returnedUserId;
      localStorage.setItem('zed_user_id', returnedUserId);
    }

    if (errorParam) {
      console.warn('[Plugins] OAuth error:', errorParam);
    } else {
      console.info('[Plugins] OAuth success — reloading status for user:', pluginsStore.userId);
    }
    setTimeout(() => pluginsStore.loadStatus(), 800);
  } else {
    pluginsStore.loadStatus();
  }
}

function renderInstalled(store) {
  const grid = document.getElementById('installedPluginsGrid');
  if (!grid) return;

  if (store.installed.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #6F6F6F; font-size: 14px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 20px;">
        No plugins connected. Browse popular plugins below.
      </div>
    `;
    return;
  }

  grid.innerHTML = store.installed.map(item => {
    const conn = store.connected[item.id];
    const userInfo = conn?.user_info;
    let detailHtml = '';
    if (userInfo) {
      if (userInfo.email) detailHtml = `<div style="font-size:12px;color:#6B7280;margin-top:8px;">${userInfo.email}</div>`;
      else if (userInfo.login) detailHtml = `<div style="font-size:12px;color:#6B7280;margin-top:8px;">@${userInfo.login}</div>`;
      else if (userInfo.name) detailHtml = `<div style="font-size:12px;color:#6B7280;margin-top:8px;">${userInfo.name}</div>`;
    }
    return `
    <div class="plugin-card connected" data-id="${item.id}">
      <div class="plugin-card-header">
        <img class="plugin-card-logo" src="${item.logo}" alt="${item.name}">
        <button class="plugin-card-dots" data-id="${item.id}" aria-label="Plugin options">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>
      <h4 class="plugin-card-title">${item.name}</h4>
      <p class="plugin-card-desc">${item.desc}</p>
      ${detailHtml}
      <div class="plugin-card-footer">
        <span class="plugin-status connected"><span class="dot-green"></span> Connected</span>
      </div>
    </div>`;
  }).join('');

  bindInstalledActions();
}

function renderPopular(store) {
  const grid = document.getElementById('popularPluginsGrid');
  if (!grid) return;

  if (store.popular.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 30px; text-align: center; color: #6F6F6F; font-size: 14px; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 16px;">
        All available plugins are installed!
      </div>
    `;
    return;
  }

  grid.innerHTML = store.popular.map(item => `
    <div class="plugin-row-card" data-id="${item.id}">
      <img class="plugin-row-logo" src="${item.logo}" alt="${item.name}">
      <div class="plugin-row-info">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <button class="plugin-btn-install" data-id="${item.id}">Install</button>
    </div>
  `).join('');

  bindPopularActions();
}

function bindInstalledActions() {
  document.querySelectorAll('.plugin-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.plugin-card-dots')) return;
    });
  });

  document.querySelectorAll('.plugin-card-dots').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPluginMenu(btn, btn.getAttribute('data-id'));
    });
  });
}

function bindPopularActions() {
  document.querySelectorAll('.plugin-btn-install').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const item = pluginsStore.popular.find(p => p.id === id);
      if (!item) return;
      openPluginConnectModal(item);
    });
  });
}

let pluginModalOpen = false;

async function openPluginConnectModal(item) {
  if (pluginModalOpen) return;
  pluginModalOpen = true;
  currentConfigPluginId = item.id;

  // Use React dialog if available
  if (window.__openPluginDialog) {
    window.__openPluginDialog({
      id: item.id,
      name: item.name,
      logo: item.logo,
    });
    pluginModalOpen = false;
    return;
  }

  // Fallback to vanilla modal
  try {
    const resp = await fetch(`/api/plugins/${item.id}/config`);
    const config = resp.ok ? await resp.json() : { client_id: '' };
    showConfigModal(item, config);
  } catch {
    showConfigModal(item, { client_id: '' });
  }
}

const PLUGIN_DETAILS = {
  'gmail': {
    redirectProvider: 'Google',
    desc: 'Connect your Gmail account to manage and search your emails.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and read emails',
        sub: 'Let the agent search, read, and organize your emails.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        title: 'Send and reply to messages',
        sub: 'Allow the agent to send emails and draft replies.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your credentials and emails are encrypted safely.'
      }
    ]
  },
  'google-drive': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Drive account to allow access to your files and folders.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and access files',
        sub: 'Let the agent search and read your files.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2.3-1.7-4.2-4-4.5A7 7 0 1 0 5 10.5a4.5 4.5 0 0 0 .5 9H17.5z"/><polyline points="12 13 12 17"/><polyline points="9 16 12 13 15 16"/></svg>`,
        title: 'Upload and manage files',
        sub: 'Allow the agent to upload and organize files.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your data is encrypted and never shared.'
      }
    ]
  },
  'notion': {
    redirectProvider: 'Notion',
    desc: 'Connect your Notion workspace to read, write, and sync your pages.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and read workspace',
        sub: 'Let the agent query database items and pages.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Create and edit pages',
        sub: 'Allow the agent to update databases and append content.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Workspace tokens are encrypted and handled safely.'
      }
    ]
  },
  'calendar': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Calendar to manage schedules, events, and meetings.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        title: 'Read calendar schedules',
        sub: 'Let the agent view upcoming events and conflicts.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        title: 'Create and edit events',
        sub: 'Allow the agent to schedule meetings and invitees.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Calendar data is encrypted and private to you.'
      }
    ]
  },
  'slack': {
    redirectProvider: 'Slack',
    desc: 'Connect your Slack workspace to read channels and post messages.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read workspace channels',
        sub: 'Let the agent monitor and search message history.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
        title: 'Post messages and replies',
        sub: 'Allow the agent to write updates and reply to threads.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Slack tokens are encrypted and secured.'
      }
    ]
  },
  'facebook': {
    redirectProvider: 'Facebook',
    desc: 'Connect your Facebook account to manage pages, posts, and feeds.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read page metrics & feeds',
        sub: 'Let the agent search and view page comments and activity.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Publish posts & updates',
        sub: 'Allow the agent to post status updates and reply to comments.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your personal account data remains private.'
      }
    ]
  },
  'trello': {
    redirectProvider: 'Trello',
    desc: 'Connect your Trello account to organize boards, lists, and cards.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search boards & cards',
        sub: 'Let the agent search cards, lists, and checklists.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        title: 'Create and move cards',
        sub: 'Allow the agent to add tasks, checklists, and assign members.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Trello boards credentials are fully encrypted.'
      }
    ]
  },
  'dropbox': {
    redirectProvider: 'Dropbox',
    desc: 'Connect your Dropbox account to store, access, and share files.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and access files',
        sub: 'Let the agent search and preview your Dropbox files.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2.3-1.7-4.2-4-4.5A7 7 0 1 0 5 10.5a4.5 4.5 0 0 0 .5 9H17.5z"/><polyline points="12 13 12 17"/><polyline points="9 16 12 13 15 16"/></svg>`,
        title: 'Upload and manage folders',
        sub: 'Allow the agent to create folders and upload documents.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your files remain private and encrypted in transfer.'
      }
    ]
  },
  'airtable': {
    redirectProvider: 'Airtable',
    desc: 'Connect your Airtable account to sync, read, and write base records.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search records & tables',
        sub: 'Let the agent filter and view table entries.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        title: 'Insert and update rows',
        sub: 'Allow the agent to create records and run workflows.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Personal access tokens are encrypted securely.'
      }
    ]
  },
  'github': {
    redirectProvider: 'GitHub',
    desc: 'Connect your GitHub account to access repositories, code, issues, and PRs.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and read code',
        sub: 'Let the agent read repository code, issues, and pull requests.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
        title: 'Create issues and PRs',
        sub: 'Allow the agent to comment, open issues, and request review.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Repository access is strictly scoped and encrypted.'
      }
    ]
  },
  'google-docs': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Docs account to create and edit documents.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and read documents',
        sub: 'Let the agent find and read your docs.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Create and edit documents',
        sub: 'Allow the agent to create and update document contents.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your document tokens are encrypted and kept safe.'
      }
    ]
  },
  'google-sheets': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Sheets account to read and write spreadsheets.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read spreadsheets',
        sub: 'Let the agent extract rows and read table information.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Write and edit sheets',
        sub: 'Allow the agent to insert rows and edit sheet cells.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Spreadsheet credentials are fully encrypted.'
      }
    ]
  },
  'google-slides': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Slides account to manage and edit presentations.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read presentations',
        sub: 'Let the agent read and display your presentation slides.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Create and edit slides',
        sub: 'Allow the agent to format, write, and create slides.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your slide presentations remain secure and private.'
      }
    ]
  },
  'google-tasks': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Tasks account to organize and sync your task lists.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read task lists',
        sub: 'Let the agent fetch and search task lists.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        title: 'Manage tasks',
        sub: 'Allow the agent to create, complete, and modify tasks.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Task access is fully encrypted.'
      }
    ]
  },
  'google-contacts': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Contacts account to manage and sync contacts.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search contacts info',
        sub: 'Let the agent find email addresses, phones, and metadata.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        title: 'Add & edit contacts',
        sub: 'Allow the agent to create, update, and organize contacts.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your contact details are encrypted and kept safe.'
      }
    ]
  },
  'google-chat': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Chat workspace to read spaces and send messages.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read space channels',
        sub: 'Let the agent read messages in spaces.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        title: 'Post messages',
        sub: 'Allow the agent to write updates and respond.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Chat tokens are encrypted safely.'
      }
    ]
  },
  'google-meet': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Meet account to schedule and manage video calls.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'View scheduled meetings',
        sub: 'Let the agent access meeting rooms and links.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
        title: 'Schedule video calls',
        sub: 'Allow the agent to schedule meeting events.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Conference links are private and encrypted.'
      }
    ]
  },
  'youtube': {
    redirectProvider: 'Google',
    desc: 'Connect your YouTube channel to manage videos, comments, and playlists.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read playlist & video info',
        sub: 'Let the agent view video analytics and metadata.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
        title: 'Manage playlists',
        sub: 'Allow the agent to update and create playlists.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your channel access token remains encrypted.'
      }
    ]
  },
  'google-fit': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Fit account to view activity and health data.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Read activity logs',
        sub: 'Let the agent view steps, active time, and logs.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        title: 'Track wellness records',
        sub: 'Allow the agent to view historical wellness patterns.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your fit credentials are private to you.'
      }
    ]
  },
  'google-classroom': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Classroom account to manage course assignments.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'View enrolled courses',
        sub: 'Let the agent view list of active classes.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z"/></svg>`,
        title: 'Classwork management',
        sub: 'Allow the agent to view course assignments and grades.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Your course information is encrypted.'
      }
    ]
  },
  'google-photos': {
    redirectProvider: 'Google',
    desc: 'Connect your Google Photos library to view and manage media.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search library',
        sub: 'Let the agent browse your photos and albums.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
        title: 'View media info',
        sub: 'Allow the agent to read image details and tags.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'Photo access tokens are fully encrypted.'
      }
    ]
  }
};

function showConfigModal(item, config) {
  const details = PLUGIN_DETAILS[item.id] || {
    redirectProvider: item.name,
    desc: `Connect your ${item.name} account to allow the agent to read and write data.`,
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: 'Search and access data',
        sub: `Let the agent search and read data from ${item.name}.`
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        title: 'Modify workspace',
        sub: `Allow the agent to edit and upload data to ${item.name}.`
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>`,
        title: 'Secure & private',
        sub: 'All credentials and access tokens are encrypted securely.'
      }
    ]
  };

  const isGoogle = [
    'gmail', 'google-drive', 'calendar', 'google-docs', 'google-sheets',
    'google-slides', 'google-tasks', 'google-contacts', 'google-chat',
    'google-meet', 'youtube', 'google-fit', 'google-classroom', 'google-photos'
  ].includes(item.id);
  const buttonLogoHtml = isGoogle ? `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="flex-shrink:0;">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  ` : `<img src="${item.logo}" alt="${item.name}" style="width:16px;height:16px;object-fit:contain;border-radius:2px;flex-shrink:0;">`;

  const buttonText = isGoogle ? 'Connect with Google' : `Connect ${item.name}`;

  const modalHtml = `
    <div class="zed-dialog-overlay" id="pluginConfigOverlay">
      <div class="zed-dialog" style="position:relative;">
        <button id="cfgCancelBtn" class="zed-dialog-close" title="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="zed-dialog-header">
          <h2 class="zed-dialog-title">Connect ${item.name}</h2>
          <p class="zed-dialog-description">${details.desc}</p>
        </div>
        <div class="zed-dialog-body">
          <div class="zed-dialog-features">
            ${details.features.map(f => `
              <div class="zed-dialog-feature">
                <div class="zed-dialog-feature-icon">${f.icon}</div>
                <div>
                  <div class="zed-dialog-feature-title">${f.title}</div>
                  <div class="zed-dialog-feature-sub">${f.sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="zed-dialog-footer" style="flex-direction:column;gap:10px;">
          <button id="cfgMainConnectBtn" class="zed-dialog-btn-connect">
            ${buttonLogoHtml}
            ${buttonText}
          </button>
          <span style="font-size:12px;color:#A1A1AA;text-align:center;">You'll be redirected to ${details.redirectProvider} to sign in.</span>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalHtml;
  document.body.appendChild(div);

  const overlay = div.querySelector('#pluginConfigOverlay');
  const closeBtn = div.querySelector('#cfgCancelBtn');
  const mainConnectBtn = div.querySelector('#cfgMainConnectBtn');

  const destroyModal = () => { pluginModalOpen = false; div.remove(); };

  closeBtn.addEventListener('click', destroyModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) destroyModal(); });

  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') { destroyModal(); document.removeEventListener('keydown', onEsc); }
  });

  mainConnectBtn.addEventListener('click', () => {
    destroyModal();
    pluginsStore.connect(item.id);
  });
}

function showPluginMenu(triggerBtn, id) {
  let menu = document.getElementById('pluginActionMenu');
  if (menu) {
    const activeId = menu.getAttribute('data-id');
    menu.remove();
    if (activeId === id) return;
  }

  const item = pluginsStore.installed.find(p => p.id === id);
  if (!item) return;

  menu = document.createElement('div');
  menu.id = 'pluginActionMenu';
  menu.setAttribute('data-id', id);
  menu.style.cssText = 'position:absolute;background:#FFFFFF;border:1px solid #E8E8E8;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.06);padding:6px;min-width:140px;z-index:1000;display:flex;flex-direction:column;gap:2px;font-family:Inter,sans-serif;';

  const rect = triggerBtn.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 6}px`;
  menu.style.left = `${rect.right - 140 + window.scrollX}px`;

  menu.innerHTML = `
    <button class="plugin-menu-item" data-action="disconnect" style="background:none;border:none;text-align:left;padding:8px 12px;font-size:13px;color:#E11D48;cursor:pointer;border-radius:8px;font-weight:500;font-family:inherit;width:100%;">
      Uninstall / Disconnect
    </button>
  `;

  document.body.appendChild(menu);

  const menuItem = menu.querySelector('.plugin-menu-item');
  menuItem.addEventListener('mouseenter', () => { menuItem.style.backgroundColor = '#FFF5F5'; });
  menuItem.addEventListener('mouseleave', () => { menuItem.style.backgroundColor = 'transparent'; });

  menuItem.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (await confirmDialog(`Are you sure you want to disconnect ${item.name}?`)) {
      pluginsStore.uninstall(id);
    }
    menu.remove();
  });

  const closeMenu = (e) => {
    if (!triggerBtn.contains(e.target) && !menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    }
  };
  document.addEventListener('click', closeMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  initPluginsPage();
});
