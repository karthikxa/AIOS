// Schedules Page View manager and state handler
import { injectModalStyles } from './modal.js';
import { agentsStore } from './agent-page.js';
import { pluginsStore } from './plugins-page.js';

class SchedulesStore {
  constructor() {
    this.schedules = [];
    this.activeTab = 'all';
    this.searchQuery = '';
    this.listeners = [];
  }

  getSchedules() {
    return this.schedules;
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

  setTab(tab) {
    this.activeTab = tab;
    this.notify();
  }

  setSearch(query) {
    this.searchQuery = query.toLowerCase();
    this.notify();
  }

  async loadFromBackend() {
    try {
      const res = await fetch('/api/cron');
      if (res.ok) {
        const data = await res.json();
        this.schedules = (data.jobs || []).map(job => ({
          id: job.id,
          name: job.name,
          nextRun: job.schedule || 'Manual',
          role: job.name,
          avatarKey: 'analyst',
          status: job.enabled ? 'active' : 'paused',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="sched-type-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
          prompt: job.prompt || '',
          frequency: 'custom'
        }));
        this.notify();
      }
    } catch (e) {
      console.warn('[Schedules] Failed to load from backend:', e);
    }
  }

  async toggleStatus(id) {
    const item = this.schedules.find(s => s.id === id);
    if (!item) return;
    const newStatus = item.status === 'active' ? 'paused' : 'active';
    item.status = newStatus;
    this.notify();
  }

  async deleteSchedule(id) {
    try {
      const res = await fetch(`/api/cron/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.schedules = this.schedules.filter(s => s.id !== id);
        this.notify();
      }
    } catch (e) {
      console.warn('[Schedules] Delete failed:', e);
    }
  }

  async addSchedule(name, role, timeStr, frequency, status = 'active', taskBrief = '', plugins = []) {
    const cronSchedule = frequency === 'hourly' ? '* * * * *' : frequency === 'daily' ? '0 9 * * *' : '0 9 * * 1';

    try {
      const res = await fetch('/api/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          schedule: cronSchedule,
          prompt: taskBrief || `Scheduled task: ${name}`,
          enabled: true
        })
      });
      if (res.ok) {
        const result = await res.json();
        this.schedules.push({
          id: result.job.id,
          name: name,
          nextRun: cronSchedule,
          role: role,
          avatarKey: 'analyst',
          status: 'active',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="sched-type-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
          prompt: taskBrief,
          frequency: frequency
        });
        this.notify();
      }
    } catch (e) {
      console.warn('[Schedules] Create failed:', e);
    }
  }
}

const schedulesStore = new SchedulesStore();
export { schedulesStore };

export function initSchedulesPage() {
  injectModalStyles();
  const container = document.getElementById('schedulesPageView');
  if (!container) return;

  const tableBody = document.getElementById('schedulesTableBody');
  const searchInput = document.getElementById('scheduleSearchInput');
  const tabs = container.querySelectorAll('.schedule-tab');
  const btnCreate = document.getElementById('btnCreateSchedule');
  const heroBtnCreate = document.getElementById('heroBtnCreateSchedule');

  // Search box binding
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      schedulesStore.setSearch(e.target.value);
    });
  }

  // Tabs binding
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      schedulesStore.setTab(tab.getAttribute('data-status'));
    });
  });

  // Create Button bindings
  if (btnCreate) {
    btnCreate.addEventListener('click', () => {
      openCreateScheduleSidebar();
    });
  }
  if (heroBtnCreate) {
    heroBtnCreate.addEventListener('click', () => {
      openCreateScheduleSidebar();
    });
  }

  // Frequency Selector interactive binding
  const freqOptions = container.querySelectorAll('.freq-option');
  freqOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      freqOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const freq = opt.getAttribute('data-freq');
      renderPremiumVisualGrid(freq);
      
      // Filter list below by frequency (search query)
      if (searchInput) {
        if (freq === 'daily') {
          searchInput.value = '';
          schedulesStore.setSearch('');
        } else {
          searchInput.value = freq;
          schedulesStore.setSearch(freq);
        }
      }
    });
  });

  // Subscribe to store updates
  schedulesStore.subscribe((store) => {
    renderTable(store);
    updateKPIs(store);
  });

  // Load from backend
  schedulesStore.loadFromBackend();

  renderPremiumVisualGrid('daily');
}

function renderPremiumVisualGrid(freq = 'daily') {
  const gridContainer = document.getElementById('premiumHeroGridRows');
  if (!gridContainer) return;

  const nextRunText = document.getElementById('premiumHeroNextRunText');
  const configs = {
    daily:   { nextRun: 'Today, 09:00 AM', tasks: [ { time: '09:00', color: 'task-purple',  icon: 'refresh',   title: 'Daily Report' }, { time: '12:00', color: 'task-green',  icon: 'database',  title: 'Data Sync' }, { time: '15:00', color: 'task-orange', icon: 'chart',     title: 'Market Analysis' } ] },
    weekly:  { nextRun: 'Next Mon, 10:00 AM', tasks: [ { time: '09:00', color: 'task-purple',  icon: 'email',     title: 'Newsletter' } ] },
    monthly: { nextRun: 'Next Month, 09:00 AM', tasks: [ { time: '09:00', color: 'task-orange', icon: 'chart',     title: 'Monthly Audit' } ] },
    custom:  { nextRun: 'Next run in 45 min', tasks: [ { time: '12:00', color: 'task-purple',  icon: 'settings',  title: 'Custom Trigger' } ] }
  };

  const iconSvgs = {
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  };

  const cfg = configs[freq] || configs.daily;
  const times = ['09:00', '12:00', '15:00', '18:00'];
  const taskMap = {};
  cfg.tasks.forEach(t => { taskMap[t.time] = t; });

  const rowsHtml = times.map(time => {
    const t = taskMap[time];
    let cells = `<div class="grid-cell cell-time">${time}</div>`;
    for (let i = 0; i < 7; i++) {
      if (t && i === 0) {
        cells += `<div class="grid-cell"><div class="grid-task-card ${t.color}" style="left: 4px; right: -30px;"><div class="task-card-icon-row">${iconSvgs[t.icon]}<span class="task-title">${t.title}</span></div><span class="task-time">${time}</span></div></div>`;
      } else {
        cells += '<div class="grid-cell"></div>';
      }
    }
    return `<div class="grid-row">${cells}</div>`;
  }).join('');

  gridContainer.innerHTML = rowsHtml;
  if (nextRunText) nextRunText.textContent = cfg.nextRun;
}

function updateKPIs(store) {
  const list = store.getSchedules();
  const activeCount = list.filter(s => s.status === 'active').length;
  const pausedCount = list.filter(s => s.status === 'paused').length;

  const running = activeCount;
  const paused = pausedCount;
  const scheduled = list.length;
  const completed = 0;

  const kpiNumRunning = document.getElementById('kpiNumRunning');
  const kpiNumScheduled = document.getElementById('kpiNumScheduled');
  const kpiNumCompleted = document.getElementById('kpiNumCompleted');
  const kpiNumPaused = document.getElementById('kpiNumPaused');

  if (kpiNumRunning) kpiNumRunning.textContent = running;
  if (kpiNumScheduled) kpiNumScheduled.textContent = scheduled;
  if (kpiNumCompleted) kpiNumCompleted.textContent = completed;
  if (kpiNumPaused) kpiNumPaused.textContent = paused;
}

function renderTable(store) {
  const tableBody = document.getElementById('schedulesTableBody');
  if (!tableBody) return;

  const { activeTab, searchQuery, schedules } = store;

  // Filter
  const filtered = schedules.filter(item => {
    // 1. Filter by Tab
    if (activeTab === 'active' && item.status !== 'active') return false;
    if (activeTab === 'paused' && item.status !== 'paused') return false;

    // 2. Filter by Search
    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery);
      const matchRole = item.role.toLowerCase().includes(searchQuery);
      return matchName || matchRole;
    }

    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #6B7280; font-size: 14px;">
        No schedules found matching the filters.
      </div>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(item => {
    const isAct = item.status === 'active';
    const statusPill = isAct
      ? `<span class="status-pill active">Active <span class="dot-green"></span></span>`
      : `<span class="status-pill paused">Paused</span>`;

    // Map schedule items to their new custom pixel avatars
    const customAvatars = {
      "sched-1": "assets/models/green_boy.png",
      "sched-2": "assets/models/avatar_2.png",
      "sched-3": "assets/models/avatar_3.png",
      "sched-4": "assets/models/avatar_4.png",
      "sched-5": "assets/models/avatar_5.png"
    };

    const avatarHtml = customAvatars[item.id]
      ? `<img src="${customAvatars[item.id]}" alt="${item.role}" style="width: 100%; height: 100%; object-fit: cover;">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="#E0F2FE"/><rect x="3" y="2" width="10" height="3" fill="#0F172A"/><rect x="4" y="5" width="8" height="7" fill="#FED7AA"/><rect x="5" y="7" width="2" height="2" fill="#0284C7"/><rect x="9" y="7" width="2" height="2" fill="#0284C7"/></svg>`;

    return `
      <div class="schedules-table-row" id="row-${item.id}">
        <div class="col-sched">
          <div class="sched-title-group">
            <div class="sched-icon-wrapper">
              ${item.icon}
            </div>
            <span class="sched-name">${item.name}</span>
          </div>
        </div>
        <div class="col-next">${item.nextRun}</div>
        <div class="col-agent">
          <div class="sched-agent-group">
            <div class="pixel-avatar-wrapper">
              ${avatarHtml}
            </div>
            <span class="agent-role-name">${item.role}</span>
          </div>
        </div>
        <div class="col-status">${statusPill}</div>
        <div class="col-action">
          <button class="sched-row-action-btn" data-id="${item.id}" aria-label="Actions">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Bind actions
  bindRowEvents();
}

function bindRowEvents() {
  const btns = document.querySelectorAll('.sched-row-action-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleRowMenu(btn, id);
    });
  });
}

function toggleRowMenu(triggerBtn, id) {
  let menu = document.getElementById('zedSchedRowMenu');
  if (menu) {
    const existingId = menu.getAttribute('data-id');
    menu.remove();
    if (existingId === id) return;
  }

  const item = schedulesStore.getSchedules().find(s => s.id === id);
  if (!item) return;

  const isAct = item.status === 'active';

  menu = document.createElement('div');
  menu.id = 'zedSchedRowMenu';
  menu.setAttribute('data-id', id);
  menu.style.cssText = `
    position: absolute;
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
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
    <button class="sched-menu-item" data-action="toggle-status" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #111111; cursor: pointer; border-radius: 8px; font-weight: 500;
    ">
      ${isAct ? 'Pause Schedule' : 'Activate Schedule'}
    </button>
    <button class="sched-menu-item" data-action="delete" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #E11D48; cursor: pointer; border-radius: 8px; font-weight: 500;
    ">
      Delete Schedule
    </button>
  `;

  document.body.appendChild(menu);

  // Bind clicks
  const items = menu.querySelectorAll('.sched-menu-item');
  items.forEach(btnEl => {
    btnEl.addEventListener('mouseenter', () => {
      btnEl.style.backgroundColor = '#FAFAFA';
    });
    btnEl.addEventListener('mouseleave', () => {
      btnEl.style.backgroundColor = 'transparent';
    });
    btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btnEl.getAttribute('data-action');
      if (action === 'toggle-status') {
        schedulesStore.toggleStatus(id);
      } else if (action === 'delete') {
        schedulesStore.deleteSchedule(id);
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

function openCreateScheduleSidebar() {
  const existing = document.getElementById('createScheduleSidebarOverlay');
  if (existing) return;

  const agents = agentsStore.agents || [];

  const sidebarHtml = `
    <div class="zed-sidebar-overlay" id="createScheduleSidebarOverlay">
      <div class="zed-connect-sidebar">
        <button class="zed-modal-close-btn zed-sidebar-close-abs" id="zedSchedSidebarClose" aria-label="Close sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <h2 class="zed-sidebar-title">Create Schedule</h2>
        <p class="zed-sidebar-subtitle">Configure an agent to execute automatically on a time schedule.</p>
        
        <div class="zed-modal-body">
          <div class="zed-modal-field">
            <label for="schedName">Schedule Name</label>
            <input type="text" id="schedName" placeholder="e.g. Daily SEO Check">
          </div>

          <div class="zed-modal-field">
            <label>Agent</label>
            <div class="sched-agent-search" id="agentSearchWrapper">
              <input type="text" id="schedAgentInput" placeholder="Search agents..." autocomplete="off" value="">
              <div class="sched-agent-dropdown" id="schedAgentOptions">
                ${agents.map(a => `
                  <div class="sched-agent-option" data-agent-id="${a.id}" data-agent-name="${a.name}">
                    <span class="sched-agent-opt-name">${a.name}</span>
                    <span class="sched-agent-opt-desc">${a.desc}</span>
                  </div>
                `).join('')}
                ${agents.length === 0 ? '<div class="sched-agent-empty">No agents available. Create one first.</div>' : ''}
              </div>
            </div>
          </div>

          <div class="zed-modal-field">
            <label for="schedFrequency">Frequency</label>
            <select id="schedFrequency" style="
              height: 38px; padding: 0 10px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); font-size: 13px; font-family: 'Inter', sans-serif; background: #FFF; outline: none;
            ">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>

          <div class="zed-modal-field">
            <label for="schedTime">Scheduled Time</label>
            <input type="text" id="schedTime" placeholder="e.g. 8:00 AM, 11:30 PM" value="9:00 AM">
          </div>

          <div class="zed-modal-field">
            <label for="schedTask">Task Brief</label>
            <textarea id="schedTask" placeholder="Describe what the agent should do at each run..." rows="3" style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(0,0,0,0.08);font-size:13px;font-family:'Inter',sans-serif;background:#FFF;outline:none;resize:vertical;box-sizing:border-box;"></textarea>
          </div>

          <div class="zed-modal-field">
            <label>Plugins</label>
            <div class="sched-plugins-list" id="schedPluginsList">
              ${pluginsStore.installed.length === 0 ? '<div style="color:#9CA3AF;font-size:13px;padding:8px 0;">No plugins installed. <a href="#" id="schedGoPlugins" style="color:#111;font-weight:600;">Go to Plugins</a></div>' : ''}
            </div>
          </div>
        </div>

        <div class="zed-sidebar-actions-row">
          <button class="zed-btn-bw-secondary" id="zedSchedSidebarCancel">Cancel</button>
          <button class="zed-btn-bw-primary" id="zedSchedSidebarSubmit" style="background:#111111; color:#ffffff;">Create</button>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = sidebarHtml;
  document.body.appendChild(wrapper.firstElementChild);

  const overlay = document.getElementById('createScheduleSidebarOverlay');
  const closeBtn = overlay.querySelector('#zedSchedSidebarClose');
  const cancelBtn = overlay.querySelector('#zedSchedSidebarCancel');
  const submitBtn = overlay.querySelector('#zedSchedSidebarSubmit');
  const agentInput = overlay.querySelector('#schedAgentInput');
  const agentDropdown = overlay.querySelector('#schedAgentOptions');

  // Searchable agent dropdown logic
  let selectedAgentId = '';
  let selectedAgentName = '';

  function filterAgents(query) {
    const options = agentDropdown.querySelectorAll('.sched-agent-option');
    const q = query.toLowerCase().trim();
    options.forEach(opt => {
      const name = opt.dataset.agentName.toLowerCase();
      const desc = opt.querySelector('.sched-agent-opt-desc')?.textContent.toLowerCase() || '';
      opt.style.display = (!q || name.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  }

  function selectAgent(id, name) {
    selectedAgentId = id;
    selectedAgentName = name;
    agentInput.value = name;
    agentDropdown.classList.remove('open');
    agentInput.dataset.selected = 'true';
  }

  if (agentInput) {
    agentInput.addEventListener('focus', () => {
      agentDropdown.classList.add('open');
    });
    agentInput.addEventListener('input', (e) => {
      agentInput.dataset.selected = '';
      selectedAgentId = '';
      selectedAgentName = '';
      filterAgents(e.target.value);
      agentDropdown.classList.add('open');
    });
    agentInput.addEventListener('blur', () => {
      setTimeout(() => agentDropdown.classList.remove('open'), 200);
    });

    const options = agentDropdown.querySelectorAll('.sched-agent-option');
    options.forEach(opt => {
      opt.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectAgent(opt.dataset.agentId, opt.dataset.agentName);
      });
    });
  }

  // Push main layout shift
  const schedulesPage = document.querySelector('.schedules-page-view');
  if (schedulesPage) schedulesPage.classList.add('sidebar-active');

  const closeSidebar = () => {
    const sidebarEl = overlay.querySelector('.zed-connect-sidebar');
    if (sidebarEl) sidebarEl.style.transform = 'translateX(100%)';
    overlay.style.opacity = '0';
    if (schedulesPage) schedulesPage.classList.remove('sidebar-active');
    setTimeout(() => overlay.remove(), 250);
  };

  closeBtn.addEventListener('click', closeSidebar);
  cancelBtn.addEventListener('click', closeSidebar);

  // Outside click to close
  const outsideClick = (e) => {
    if (!document.body.contains(overlay)) {
      document.removeEventListener('mousedown', outsideClick);
      return;
    }
    const sidebarEl = overlay.querySelector('.zed-connect-sidebar');
    if (sidebarEl && !sidebarEl.contains(e.target) && !e.target.closest('#btnCreateSchedule')) {
      closeSidebar();
      document.removeEventListener('mousedown', outsideClick);
    }
  };
  document.addEventListener('mousedown', outsideClick);

  // Render installed plugins with checkboxes
  const pluginsList = overlay.querySelector('#schedPluginsList');
  function renderSchedulePlugins() {
    if (!pluginsList) return;
    if (pluginsStore.installed.length === 0) return;
    pluginsList.innerHTML = pluginsStore.installed.map(p => `
      <label class="sched-plugin-item">
        <input type="checkbox" class="sched-plugin-cb" data-plugin-id="${p.id}" data-plugin-name="${p.name.replace(/"/g, '&quot;')}">
        <img src="${p.logo}" alt="${p.name}" class="sched-plugin-logo">
        <span class="sched-plugin-name">${p.name}</span>
      </label>
    `).join('');
  }
  renderSchedulePlugins();

  // Go to Plugins link
  const goPluginsLink = overlay.querySelector('#schedGoPlugins');
  if (goPluginsLink) {
    goPluginsLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
      const navPlugins = document.getElementById('navPlugins');
      if (navPlugins) navPlugins.click();
    });
  }

  // Create Submit
  submitBtn.addEventListener('click', () => {
    const name = overlay.querySelector('#schedName').value.trim();
    const agentName = selectedAgentName || (agentInput ? agentInput.value.trim() : '');
    const frequency = overlay.querySelector('#schedFrequency').value;
    const timeStr = overlay.querySelector('#schedTime').value.trim();
    const taskBrief = overlay.querySelector('#schedTask').value.trim();

    // Collect selected plugins
    const cbChecked = overlay.querySelectorAll('.sched-plugin-cb:checked');
    const selectedPlugins = Array.from(cbChecked).map(cb => ({
      id: cb.dataset.pluginId,
      name: cb.dataset.pluginName
    }));

    if (!name) {
      alert("Schedule Name is required.");
      return;
    }
    if (!agentName) {
      alert("Please select an agent.");
      return;
    }

    // Register on the backend cron system
    const cronSchedule = frequency === 'hourly' ? '* * * * *' : frequency === 'daily' ? '0 9 * * *' : '0 9 * * 1';
    fetch('/api/cron', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        schedule: cronSchedule,
        prompt: `You are ${agentName}, running a scheduled task: ${taskBrief || name}.\n\nUse all your tools and skills to complete this task. Save results to memory via memory_save. Report what was done.\n\nSelected plugins: ${selectedPlugins.map(p => p.name).join(', ') || 'none'}`,
        enabled: true
      })
    }).catch(err => console.warn('[Schedule] Backend cron creation failed:', err));

    schedulesStore.addSchedule(name, agentName, timeStr, frequency, 'active', taskBrief, selectedPlugins);
    closeSidebar();
  });
}

// Auto Initialize if active
document.addEventListener('DOMContentLoaded', () => {
  initSchedulesPage();
});
