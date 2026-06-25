const agentPixelAvatars = {
  security: `<img src="assets/models/security_avatar.png" alt="Security Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  research: `<img src="assets/models/research_avatar.png" alt="Research Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  coder: `<img src="assets/models/coder_avatar.png" alt="Coder Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  finance: `<img src="assets/models/finance_avatar.png" alt="Finance Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  social: `<img src="assets/models/social_avatar.png" alt="Social Media Analyst" style="width: 100%; height: 100%; object-fit: cover;">`,
  assistant: `<img src="assets/models/assistant_avatar.png" alt="Assistant Agent" style="width: 100%; height: 100%; object-fit: cover;">`
};

const defaultAgents = [
  {
    id: "agent-sec",
    name: "Security Agent",
    desc: "Monitor threats, scan vulnerabilities, and ensure system security.",
    status: "active",
    schedule: "Daily at 7:00 AM",
    nextRun: "Next run: Tomorrow, 7:00 AM",
    model: "Zed Pro",
    avatar: "security",
    provider: "zed-pro"
  },
  {
    id: "agent-res",
    name: "Research Agent",
    desc: "Research topics, collect data, and generate detailed reports.",
    status: "active",
    schedule: "Weekly on Monday",
    nextRun: "Next run: Mon, 9:00 AM",
    model: "Zed Pro",
    avatar: "research",
    provider: "zed-pro"
  },
  {
    id: "agent-code",
    name: "Coder Agent",
    desc: "Write code, debug issues, and review pull requests.",
    status: "active",
    schedule: "Daily at 10:00 AM",
    nextRun: "Next run: Today, 10:00 AM",
    model: "Zed Pro",
    avatar: "coder",
    provider: "zed-pro"
  },
  {
    id: "agent-fin",
    name: "Finance Agent",
    desc: "Analyze financial data, track markets, and generate insights.",
    status: "active",
    schedule: "Daily at 8:30 AM",
    nextRun: "Next run: Tomorrow, 8:30 AM",
    model: "Zed Pro",
    avatar: "finance",
    provider: "zed-pro"
  },
  {
    id: "agent-soc",
    name: "Social Media Analyst",
    desc: "Monitor social platforms, analyze trends, and track engagement.",
    status: "active",
    schedule: "Weekly on Friday",
    nextRun: "Next run: Fri, 9:00 AM",
    model: "Zed Pro",
    avatar: "social",
    provider: "zed-pro"
  },
  {
    id: "agent-ast",
    name: "Assistant Agent",
    desc: "Help with daily tasks, reminders, and general assistance.",
    status: "paused",
    schedule: "Manual",
    nextRun: "Not scheduled",
    model: "Zed Pro",
    avatar: "assistant",
    provider: "zed-pro"
  }
];

class AgentsStore {
  constructor() {
    this.agents = [...defaultAgents];
    this.filter = "all";
    this.searchQuery = "";
    this.listeners = [];
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

  toggleAgentStatus(id) {
    const agent = this.agents.find(a => a.id === id);
    if (agent) {
      agent.status = agent.status === "active" ? "paused" : "active";
      this.notify();
    }
  }

  updateAgent(id, data) {
    const agent = this.agents.find(a => a.id === id);
    if (agent) {
      Object.assign(agent, data);
      this.notify();
    }
  }

  deleteAgent(id) {
    this.agents = this.agents.filter(a => a.id !== id);
    this.notify();
  }

  addAgent(data) {
    const id = `agent-${Date.now()}`;
    const agent = {
      id,
      name: data.name || 'New Agent',
      desc: data.desc || '',
      status: data.status || 'active',
      schedule: data.schedule || 'Manual',
      nextRun: data.nextRun || 'Not scheduled',
      model: data.model || 'Zed Pro',
      avatar: data.avatar || 'assistant',
      provider: data.provider || 'zed-pro'
    };
    this.agents.push(agent);
    this.notify();
    return agent;
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

  // Create Button bindings
  // Opened directly via event listener in create-agent-page.js, no alert needed.

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

  // First render
  renderAgentsList(agentsStore);
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
      const matchDesc = a.desc.toLowerCase().includes(searchQuery);
      if (!matchName && !matchDesc) return false;
    }

    // 2. Status Pills
    if (filter === "active" && a.status !== "active") return false;
    if (filter === "paused" && a.status !== "paused") return false;
    // favorites / archived / inactive are empty in default mockup
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
        No agents found matching the selected filters.
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
              <div class="sched-line-time">${agent.schedule}</div>
              <div class="sched-line-next">${agent.nextRun}</div>
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
      if (action === "toggle-status") {
        agentsStore.toggleAgentStatus(id);
      } else if (action === "edit") {
        if (window.openEditAgentPage) {
          window.openEditAgentPage(id);
        }
      } else if (action === "delete") {
        if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
          agentsStore.deleteAgent(id);
        }
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
