import { SKILLS_CATALOG, getSkillById } from './skills-catalog.js';
import { showToast } from './toast.js';

const agentPixelAvatars = {
  security: `<img src="assets/models/security_avatar.png" alt="Security Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  research: `<img src="assets/models/research_avatar.png" alt="Research Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  coder: `<img src="assets/models/coder_avatar.png" alt="Coder Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  finance: `<img src="assets/models/finance_avatar.png" alt="Finance Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  social: `<img src="assets/models/social_avatar.png" alt="Social Media Analyst" style="width: 100%; height: 100%; object-fit: cover;">`,
  assistant: `<img src="assets/models/assistant_avatar.png" alt="Assistant Agent" style="width: 100%; height: 100%; object-fit: cover;">`
};

class AgentsStore {
  constructor() {
    this.agents = [];
    this.filter = "all";
    this.searchQuery = "";
    this.listeners = [];
    this.loaded = false;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this));
  }

  setFilter(filter) {
    this.filter = filter;
    this.notify();
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.notify();
  }

  async loadFromBackend() {
    try {
      const res = await fetch('/api/agents');
      if (res.ok) {
        const data = await res.json();
        this.agents = data.agents || [];
        this.loaded = true;
        this.notify();
      }
    } catch (e) {
      console.warn('[Agents] Failed to load from backend:', e);
    }
  }

  async toggleAgentStatus(id) {
    const agent = this.agents.find(a => a.id === id);
    if (!agent) return;
    const newStatus = agent.status === "active" ? "paused" : "active";
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agent.name,
          desc: agent.desc || '',
          avatar: agent.avatar || 'assistant',
          model: agent.model || 'Zed Pro',
          provider: agent.provider || 'zed-pro',
          schedule: agent.schedule || 'Manual',
          status: newStatus
        })
      });
      if (res.ok) {
        agent.status = newStatus;
        this.notify();
      }
    } catch (e) {
      console.warn('[Agents] Toggle failed:', e);
    }
  }

  async updateAgent(id, data) {
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name || '',
          desc: data.desc || '',
          avatar: data.avatar || 'assistant',
          model: data.model || 'Zed Pro',
          provider: data.provider || 'zed-pro',
          schedule: data.schedule || 'Manual',
          status: data.status || 'active'
        })
      });
      if (res.ok) {
        const result = await res.json();
        const idx = this.agents.findIndex(a => a.id === id);
        if (idx !== -1) this.agents[idx] = result.agent;
        this.notify();
      }
    } catch (e) {
      console.warn('[Agents] Update failed:', e);
    }
  }

  async deleteAgent(id) {
    try {
      const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.agents = this.agents.filter(a => a.id !== id);
        this.notify();
      }
    } catch (e) {
      console.warn('[Agents] Delete failed:', e);
    }
  }

  async addAgent(data) {
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name || 'New Agent',
          desc: data.desc || '',
          avatar: data.avatar || 'assistant',
          model: data.model || 'Zed Pro',
          provider: data.provider || 'zed-pro',
          schedule: data.schedule || 'Manual',
          status: data.status || 'active'
        })
      });
      if (res.ok) {
        const result = await res.json();
        this.agents.push(result.agent);
        this.notify();
        return result.agent;
      }
    } catch (e) {
      console.warn('[Agents] Create failed:', e);
    }
  }

  async runAgent(id) {
    try {
      showToast('Agent is running... Check output shortly.', 'info');
      const res = await fetch(`/api/agents/${id}/run`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        showToast(`Agent triggered! Run ID: ${data.run_id || 'started'}`, 'success');
      } else {
        showToast('Failed to run agent.', 'error');
      }
      return res.ok;
    } catch (e) {
      console.warn('[Agents] Run failed:', e);
      showToast('Agent run failed: ' + e.message, 'error');
      return false;
    }
  }
}

const agentsStore = new AgentsStore();
export { agentsStore };

export function initAgentPage() {
  const listWrapper = document.getElementById('agentsListWrapper');
  if (!listWrapper) return;

  const searchInput = document.getElementById('agentListSearchInput');
  const filterPills = document.querySelectorAll('.filter-pill');
  const btnOpenCreateForm = document.getElementById('btnOpenCreateAgentForm');

  // Search bindings
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      agentsStore.setSearchQuery(e.target.value);
    });
  }

  // Filter Pills bindings
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      agentsStore.setFilter(pill.getAttribute('data-filter'));
    });
  });

  // View Toggle bindings
  const btnViewList = document.getElementById('btnViewList');
  const btnViewGrid = document.getElementById('btnViewGrid');
  if (btnViewList && btnViewGrid) {
    btnViewList.addEventListener('click', () => {
      btnViewList.classList.add('active');
      btnViewGrid.classList.remove('active');
      listWrapper.classList.remove('grid-layout');
      listWrapper.classList.add('list-layout');
    });
    btnViewGrid.addEventListener('click', () => {
      btnViewGrid.classList.add('active');
      btnViewList.classList.remove('active');
      listWrapper.classList.remove('list-layout');
      listWrapper.classList.add('grid-layout');
    });
  }

  // Explore Integrations button binding
  const btnExplore = document.getElementById('btnExploreIntegrations');
  if (btnExplore) {
    btnExplore.addEventListener('click', () => {
      const navPlugins = document.getElementById('navPlugins');
      if (navPlugins) navPlugins.click();
    });
  }

  // Hero icon cards – all navigate to Plugins page
  ['heroIconSlack', 'heroIconGithub', 'heroIconDrive', 'heroIconAirtable'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        const navPlugins = document.getElementById('navPlugins');
        if (navPlugins) navPlugins.click();
      });
    }
  });

  // Subscribe to store updates
  agentsStore.subscribe((store) => {
    renderAgentsList(store);
  });

  // Load from backend
  agentsStore.loadFromBackend();
}

function renderAgentsList(store) {
  const listWrapper = document.getElementById('agentsListWrapper');
  const footerLabel = document.getElementById('agentsPageFooter');
  if (!listWrapper) return;

  const { agents, filter, searchQuery } = store;

  // Filter List
  const filtered = agents.filter(a => {
    // 1. Search Query
    if (searchQuery) {
      const matchName = a.name.toLowerCase().includes(searchQuery);
      const matchDesc = (a.desc || '').toLowerCase().includes(searchQuery);
      if (!matchName && !matchDesc) return false;
    }

    // 2. Status Pills
    if (filter === "active" && a.status !== "active") return false;
    if (filter === "paused" && a.status !== "paused") return false;
    if (filter === "inactive") return false; 
    if (filter === "archived") return false;
    if (filter === "favorites") return false;

    return true;
  });

  // Update footer label
  if (footerLabel) {
    footerLabel.innerHTML = `<span>Showing ${filtered.length} of ${agents.length} agents</span>`;
  }

  if (filtered.length === 0) {
    listWrapper.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #6F6F6F; font-size: 14.5px; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 20px;">
        ${agents.length === 0 ? 'No agents yet. Click "Create agent" to get started.' : 'No agents found matching the selected filters.'}
      </div>
    `;
    return;
  }

  listWrapper.innerHTML = filtered.map((agent, idx) => {
    const isAct = agent.status === "active";
    const statusDotColor = isAct ? "#22C55E" : "#F59E0B";
    const statusText = isAct ? "Active" : "Paused";
    
    // Model Provider Logo
    let providerLogoHtml = "";
    const prov = (agent.provider || "").toLowerCase();
    if (prov === "openai") {
      providerLogoHtml = `<img src="assets/models/openai.svg" alt="OpenAI" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "google") {
      providerLogoHtml = `<img src="assets/models/google.svg" alt="Google" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "zed-pro" || prov === "zed pro" || agent.model === "Zed Pro") {
      providerLogoHtml = `<img src="assets/models/zed-pro.svg" alt="Zed Pro" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "anthropic") {
      providerLogoHtml = `<img src="assets/models/anthropic.svg" alt="Anthropic" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "meta" || prov === "meta-llama") {
      providerLogoHtml = `<img src="assets/models/meta.svg" alt="Meta" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "nvidia") {
      providerLogoHtml = `<img src="assets/models/nvidia.svg" alt="NVIDIA" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "mistral" || prov === "mistral ai") {
      providerLogoHtml = `<img src="assets/models/mistral.svg" alt="Mistral" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "deepseek") {
      providerLogoHtml = `<img src="assets/models/deepseek.svg" alt="DeepSeek" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else if (prov === "groq" || prov === "groq (compound)") {
      providerLogoHtml = `<img src="assets/models/groq.svg" alt="Groq" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    } else {
      providerLogoHtml = `<img src="assets/models/zed-pro.svg" alt="AI" class="model-provider-badge-icon" style="width: 18px; height: 18px; object-fit: contain;">`;
    }

    const pixelAvatar = agentPixelAvatars[agent.avatar] || agentPixelAvatars.assistant;

    // Stagger clock animations by index so they point to different timings
    const delayMin = (-(idx * 2.5)).toFixed(1);
    const delayHour = (-(idx * 25)).toFixed(1);

    return `
      <div class="agent-row-card-item" id="agent-row-${agent.id}">
        <!-- Left Section: Avatar, Name & Description -->
        <div class="agent-item-main-col">
          <div class="agent-item-avatar-box">
            ${pixelAvatar}
          </div>
          <div class="agent-item-text-info">
            <h3 class="agent-item-name">${agent.name}</h3>
            <p class="agent-item-desc">${agent.desc}</p>
          </div>
        </div>

        <!-- Center Section: Status Badge -->
        <div class="agent-item-status-col">
          <span class="agent-row-status-pill">
            <span class="status-indicator-dot" style="background-color: ${statusDotColor};"></span>
            <span class="status-label">${statusText}</span>
          </span>
        </div>

        <!-- Schedule Section -->
        <div class="agent-item-schedule-col">
          <div class="schedule-group">
            <div class="schedule-left-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="time-clock-icon">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="12" x2="12" y2="6" style="transform-origin: 12px 12px; animation: spin-hand 12s linear infinite; animation-delay: ${delayMin}s;"/>
                <line x1="12" y1="12" x2="15" y2="14" style="transform-origin: 12px 12px; animation: spin-hand 144s linear infinite; animation-delay: ${delayHour}s;"/>
              </svg>
            </div>
            <div class="schedule-text-lines">
              <div class="sched-line-time">${agent.schedule || 'Manual'}</div>
              <div class="sched-line-next">${agent.status === 'active' ? 'Active' : 'Paused'}</div>
            </div>
          </div>
        </div>

        <!-- Model Badge Section -->
        <div class="agent-item-model-col">
          <div class="agent-model-provider-badge">
            ${providerLogoHtml}
            <span class="agent-model-name-label">${agent.model}</span>
          </div>
        </div>

        <!-- Skills Section -->
        ${(agent.skills && agent.skills.length > 0) ? `
        <div class="agent-item-skills-col" style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap; max-width: 180px;">
          ${agent.skills.slice(0, 3).map(skillId => {
            const skill = getSkillById(skillId);
            if (!skill) return '';
            return `<span style="font-size: 10.5px; color: #4F46E5; background: #EEF2FF; border-radius: 9999px; padding: 2px 8px; font-weight: 500; white-space: nowrap;" title="${skill.name}: ${skill.desc}">${skill.name}</span>`;
          }).join('')}
          ${agent.skills.length > 3 ? `<span style="font-size: 10.5px; color: #6B7280; background: #F3F4F6; border-radius: 9999px; padding: 2px 6px; font-weight: 500;">+${agent.skills.length - 3}</span>` : ''}
        </div>
        ` : ''}

        <!-- Right Section: Actions -->
        <div class="agent-item-actions-col">
          <button class="agent-row-dots-btn" data-id="${agent.id}" aria-label="Agent options">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  bindAgentRowEvents();
}

function bindAgentRowEvents() {
  const dotsBtns = document.querySelectorAll('.agent-row-dots-btn');
  dotsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleAgentRowMenu(btn, id);
    });
  });
}

function toggleAgentRowMenu(triggerBtn, id) {
  let menu = document.getElementById('zedAgentRowMenu');
  if (menu) {
    const existingId = menu.getAttribute('data-id');
    menu.remove();
    if (existingId === id) return;
  }

  const agent = agentsStore.agents.find(a => a.id === id);
  if (!agent) return;

  const isAct = agent.status === "active";

  menu = document.createElement('div');
  menu.id = 'zedAgentRowMenu';
  menu.setAttribute('data-id', id);
  menu.style.cssText = `
    position: absolute;
    background: #FFFFFF;
    border: 1px solid #EAEAEA;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    padding: 6px;
    min-width: 140px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'Inter', sans-serif;
  `;

  const rect = triggerBtn.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 6}px`;
  menu.style.left = `${rect.right - 140 + window.scrollX}px`;

  menu.innerHTML = `
    <button class="agent-menu-item" data-action="run-now" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #059669; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      Run Now
    </button>
    <button class="agent-menu-item" data-action="toggle-status" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #111111; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      ${isAct ? 'Stop Agent' : 'Start Agent'}
    </button>
    <button class="agent-menu-item" data-action="edit" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #111111; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      Edit Agent
    </button>
    <button class="agent-menu-item" data-action="delete" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #E11D48; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      Delete Agent
    </button>
  `;

  document.body.appendChild(menu);

  const items = menu.querySelectorAll('.agent-menu-item');
  items.forEach(btnEl => {
    btnEl.addEventListener('mouseenter', () => {
      const action = btnEl.getAttribute('data-action');
      btnEl.style.backgroundColor = action === 'delete' ? '#FFF5F5' : '#FAFAFA';
    });
    btnEl.addEventListener('mouseleave', () => {
      btnEl.style.backgroundColor = 'transparent';
    });

    btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btnEl.getAttribute('data-action');
      if (action === "run-now") {
        agentsStore.runAgent(id);
      } else if (action === "toggle-status") {
        agentsStore.toggleAgentStatus(id);
      } else if (action === "edit") {
        if (window.openEditAgentPage) {
          window.openEditAgentPage(id);
        }
      } else if (action === "delete") {
        agentsStore.deleteAgent(id);
      }
      menu.remove();
    });
  });

  const closeMenu = (e) => {
    if (!triggerBtn.contains(e.target) && !menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    }
  };
  document.addEventListener('click', closeMenu);
}

// Auto Init
document.addEventListener('DOMContentLoaded', () => {
  initAgentPage();
});
