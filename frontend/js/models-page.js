// Models Page orchestrator and renderer
import { modelsStore } from './models-store.js';
import { openSettingsModal, openConnectFlow, openAddProviderModal } from './modal.js';
import { showToast } from './toast.js';

// Static agent usage dataset to match mockup exactly
const agentUsageData = [
  {
    name: "Research Agent",
    role: "Web research & analysis",
    provider: "OpenAI",
    model: "GPT-4o",
    logoSrc: "assets/models/openai.svg",
    avatarSrc: "assets/models/research_avatar.png",
    status: "Active",
    statusClass: "active",
    lastUsed: "2h ago"
  },
  {
    name: "Data Analyst",
    role: "Data analysis & visualization",
    provider: "Google",
    model: "Gemini 1.5 Pro",
    logoSrc: "assets/models/google.svg",
    avatarSrc: "assets/models/finance_avatar.png",
    status: "Active",
    statusClass: "active",
    lastUsed: "5h ago"
  },
  {
    name: "Content Writer",
    role: "Writing & editing",
    provider: "Anthropic",
    model: "Claude 3.5 Sonnet",
    logoSrc: "assets/models/claude.png",
    avatarSrc: "assets/models/assistant_avatar.png",
    status: "Active",
    statusClass: "active",
    lastUsed: "1d ago"
  },
  {
    name: "Code Assistant",
    role: "Coding & debugging",
    provider: "DeepSeek",
    model: "DeepSeek-V2.5",
    logoSrc: "assets/models/deepseek.svg",
    avatarSrc: "assets/models/coder_avatar.png",
    status: "Active",
    statusClass: "active",
    lastUsed: "3h ago"
  },
  {
    name: "Marketing Agent",
    role: "Marketing content & strategy",
    provider: "xAI",
    model: "Grok-1.5",
    logoSrc: "assets/models/grok.png",
    avatarSrc: "assets/models/social_avatar.png",
    status: "Idle",
    statusClass: "idle",
    lastUsed: "2d ago"
  }
];

export function initModelsPage() {
  const modelsPageView = document.getElementById('modelsPageView');
  if (!modelsPageView) return;

  // Cache elements
  const tabButtons = document.querySelectorAll('.models-tab-btn');
  const agentSearchInput = document.getElementById('agentSearchInput');
  const connectHeaderBtn = document.getElementById('headerConnectModelBtn');
  const addCustomProviderCard = document.getElementById('bottomAddCustomProviderCard');
  const learnHowBtn = document.getElementById('byomLearnHowBtn');

  // Bind Header Connect button
  if (connectHeaderBtn) {
    connectHeaderBtn.addEventListener('click', () => {
      openAddProviderModal(modelsStore);
    });
  }

  // Bind Add Custom Provider card
  if (addCustomProviderCard) {
    addCustomProviderCard.addEventListener('click', () => {
      openAddProviderModal(modelsStore);
    });
  }

  // Bind BYOM Learn How link
  if (learnHowBtn) {
    learnHowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Add a custom API base URL, API key, and model names to connect any OpenAI-compatible endpoint.', 'info', 5000);
    });
  }

  // Bind Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      modelsStore.setTab(targetTab);

      // Show/hide content panels
      const tabContentProviders = document.getElementById('tabContentProviders');
      const tabContentModels = document.getElementById('tabContentModels');

      if (targetTab === 'providers') {
        if (tabContentProviders) tabContentProviders.style.display = 'block';
        if (tabContentModels) tabContentModels.style.display = 'none';
      } else {
        if (tabContentProviders) tabContentProviders.style.display = 'none';
        if (tabContentModels) tabContentModels.style.display = 'block';
      }
    });
  });

  // Bind Agent Search
  if (agentSearchInput) {
    agentSearchInput.addEventListener('input', (e) => {
      modelsStore.setSearchQuery(e.target.value);
    });
  }

  // Subscribe to store
  modelsStore.subscribe((state) => {
    renderView(state);
  });

  // Initial render
  renderView(modelsStore.getState());
}

function renderView(state) {
  const { activeTab, searchQuery, models } = state;

  // 1. Render Providers Tab Grid
  const providersGrid = document.getElementById('connectedProvidersGrid');
  if (providersGrid) {
    const providersList = models.filter(m => m.type === 'provider' && m.provider !== 'Zed Pro');
    providersGrid.innerHTML = providersList.map(p => {
      const isConnected = p.status === 'connected';
      
      // Render logo
      let logoHtml = '';
      if (p.logoSrc) {
        logoHtml = `<img src="${p.logoSrc}" alt="${p.name}">`;
      } else if (p.logoSvg) {
        logoHtml = p.logoSvg;
      } else if (p.logoText) {
        logoHtml = `<span class="logo-text-badge">${p.logoText}</span>`;
      }

      // Action block (options dot button or outline connect button)
      let actionHtml = '';
      if (isConnected) {
        actionHtml = `
          <button class="provider-options-btn" data-id="${p.id}" aria-label="More options">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        `;
      } else {
        actionHtml = `
          <button class="provider-connect-btn" data-id="${p.id}">Connect</button>
        `;
      }

      return `
        <div class="provider-card- Zed-style state-${p.status}">
          <div class="provider-card-header">
            <div class="provider-card-header-left">
              <div class="provider-logo-wrap ${p.logoClass || ''}">
                ${logoHtml}
              </div>
              <div class="provider-info-wrap">
                <h3>${p.name}</h3>
                <p>${p.modelCount || 0} models</p>
              </div>
            </div>
            <div class="provider-action-wrap">
              ${actionHtml}
            </div>
          </div>
          <div class="provider-card-footer">
            <span class="status-dot ${isConnected ? 'connected' : 'disconnected'}"></span>
            <span class="status-text">${isConnected ? 'Connected' : 'Not connected'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Bind events for providers
    providersGrid.querySelectorAll('.provider-connect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        openConnectFlow(pid, modelsStore);
      });
    });

    providersGrid.querySelectorAll('.provider-options-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        openSettingsModal(pid, modelsStore);
      });
    });
  }

  // 2. Render Agent Usage Table
  const tableBody = document.getElementById('agentUsageTableBody');
  if (tableBody) {
    const query = searchQuery.toLowerCase();
    const filteredAgents = agentUsageData.filter(a => 
      a.name.toLowerCase().includes(query) || 
      a.role.toLowerCase().includes(query) ||
      a.model.toLowerCase().includes(query)
    );

    if (filteredAgents.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-secondary);">
            No agents found matching "${searchQuery}"
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = filteredAgents.map(a => {
        // Find corresponding provider status
        const providerObj = models.find(m => m.id === a.provider.toLowerCase() || m.name.toLowerCase() === a.provider.toLowerCase());
        const isConnected = providerObj ? providerObj.status === 'connected' : false;

        let logoHtml = '';
        if (a.logoSrc) {
          logoHtml = `<img src="${a.logoSrc}" alt="${a.provider}" class="agent-model-logo-img">`;
        } else if (a.logoSvg) {
          logoHtml = a.logoSvg;
        } else if (a.logoText) {
          logoHtml = `<span class="logo-text-badge" style="width:16px;height:16px;font-size:9px;border-radius:3px;">${a.logoText}</span>`;
        } else {
          logoHtml = `<svg class="agent-model-logo-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;color:#64748B;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
        }

        let avatarHtml = `<div class="agent-avatar-mini">${a.name.charAt(0)}</div>`;
        if (a.avatarSrc) {
          avatarHtml = `<div class="agent-avatar-mini"><img src="${a.avatarSrc}" alt="${a.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;"></div>`;
        }

        return `
          <tr>
            <td>
              <div class="agent-cell-main">
                ${avatarHtml}
                <div class="agent-info-meta">
                  <span class="agent-name-txt">${a.name}</span>
                  <span class="agent-role-txt">${a.role}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="agent-model-pill">
                ${logoHtml}
                <span>${a.model}</span>
              </div>
            </td>
            <td>${a.provider}</td>
            <td>${a.model}</td>
            <td>
              <span class="agent-status-badge ${isConnected ? a.statusClass : 'idle'}">
                <span class="status-dot"></span>
                <span>${isConnected ? a.status : 'Idle'}</span>
              </span>
            </td>
            <td>${a.lastUsed}</td>
            <td>
              <button class="agent-row-menu-btn" aria-label="Agent options">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      tableBody.querySelectorAll('.agent-row-menu-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          showToast('Agent options coming soon.', 'info');
        });
      });
    }
  }

  // 3. Render Models Tab content
  const modelsGrid = document.getElementById('allModelsGrid');
  if (modelsGrid) {
    const modelsList = models.filter(m => m.type === 'official' && m.provider !== 'Zed Pro');
    modelsGrid.innerHTML = modelsList.map(m => {
      const isConnected = m.status === 'connected';
      let logoHtml = '';
      if (m.logoSrc) {
        logoHtml = `<img src="${m.logoSrc}" alt="${m.name}">`;
      } else if (m.logoSvg) {
        logoHtml = m.logoSvg;
      } else if (m.logoText) {
        logoHtml = `<span class="logo-text-badge">${m.logoText}</span>`;
      } else {
        logoHtml = `<svg class="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;color:#64748B;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
      }

      return `
        <div class="model-item-card state-${m.status}">
          <div class="model-item-header">
            <div class="model-item-logo-wrap">
              ${logoHtml}
            </div>
            <div class="model-item-info">
              <h3>${m.name}</h3>
              <p>${m.provider}</p>
            </div>
            <div class="model-item-status-badge">
              <span class="status-dot ${isConnected ? 'connected' : 'disconnected'}"></span>
              <span>${isConnected ? 'Ready' : 'Not Connected'}</span>
            </div>
          </div>
          <p class="model-item-desc">${m.desc}</p>
          <div class="model-item-tags">
            ${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
}
