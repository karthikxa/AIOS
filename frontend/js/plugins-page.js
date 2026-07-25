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

  // Use React shadcn dialog
  if (window.__openPluginDialog) {
    window.__openPluginDialog({
      id: item.id,
      name: item.name,
      logo: item.logo,
    });
    pluginModalOpen = false;
    return;
  }

  // Fallback: just connect directly
  pluginModalOpen = false;
  pluginsStore.connect(item.id);
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
