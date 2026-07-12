// Schedules Page View manager and state handler
import { injectModalStyles } from './modal.js';
import { agentsStore } from './agent-page.js';
import { pluginsStore } from './plugins-page.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

function cronToHuman(schedule) {
  if (!schedule) return 'Manual';
  // If it's an object from cron.jobs (parsed schedule dict)
  if (typeof schedule === 'object') {
    if (schedule.display && schedule.display !== '* * * * *') return schedule.display;
    if (schedule.kind === 'cron' && schedule.expr) return parseCronExpression(schedule.expr);
    if (schedule.kind === 'interval' && schedule.minutes) return `Every ${schedule.minutes}m`;
    if (schedule.kind === 'once' && schedule.run_at) return `Once at ${new Date(schedule.run_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
    return JSON.stringify(schedule);
  }
  // Raw string fallbacks
  const s = String(schedule).trim();
  if (s === '* * * * *')   return 'Every minute';
  if (s === '0 * * * *')   return 'Every hour';
  if (s === '0 9 * * *')   return 'Daily at 9:00 AM IST';
  if (s === '0 9 * * 1')   return 'Weekly (Mon 9:00 AM IST)';
  if (s === '0 0 1 * *')   return 'Monthly (1st, midnight)';
  return parseCronExpression(s);
}

function parseCronExpression(expr) {
  const parts = expr.split(' ');
  if (parts.length !== 5) return expr;

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatTime = (h, m) => {
    const hour = parseInt(h);
    const min = parseInt(m);
    if (isNaN(hour) || isNaN(min)) return expr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${min.toString().padStart(2, '0')} ${ampm} IST`;
  };

  // Every minute
  if (minute === '*' && hour === '*') return 'Every minute';

  // Every hour at specific minute
  if (hour === '*') return `Every hour at :${minute.padStart(2, '0')}`;

  // Daily at specific time
  if (dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return `Daily at ${formatTime(hour, minute)}`;
  }

  // Weekly on specific day
  if (dayOfMonth === '*' && month === '*' && dayOfWeek !== '*') {
    const dayNames = dayOfWeek.split(',').map(d => days[parseInt(d)] || d).join(', ');
    return `Every ${dayNames} at ${formatTime(hour, minute)}`;
  }

  // Monthly on specific day
  if (dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') {
    return `Monthly on day ${dayOfMonth} at ${formatTime(hour, minute)}`;
  }

  // Default: show the expression
  return `Cron: ${expr}`;
}

function nextRunHuman(job) {
  const nr = job.next_run_at;
  if (!nr) return cronToHuman(job.schedule);
  try {
    const d = new Date(nr);
    if (isNaN(d)) return cronToHuman(job.schedule);
    const now = new Date();
    const diffMs = d - now;
    if (diffMs < 0) return 'Overdue';
    if (diffMs < 60000) return 'In < 1 min';
    if (diffMs < 3600000) return `In ${Math.round(diffMs / 60000)} min`;
    if (diffMs < 86400000) return `In ${Math.round(diffMs / 3600000)}h`;
    return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return cronToHuman(job.schedule);
  }
}

function freqToCron(frequency, timeStr) {
  // Parse "HH:MM" or "H:MM AM/PM" time string
  let hour = 9, minute = 0;
  if (timeStr) {
    const m = timeStr.match(/(\d+):(\d+)\s*(am|pm)?/i);
    if (m) {
      hour = parseInt(m[1]);
      minute = parseInt(m[2]);
      if (m[3] && m[3].toLowerCase() === 'pm' && hour < 12) hour += 12;
      if (m[3] && m[3].toLowerCase() === 'am' && hour === 12) hour = 0;
    }
  }
  switch (frequency) {
    case 'minutely': return '* * * * *';
    case 'hourly':   return `${minute} * * * *`;
    case 'daily':    return `${minute} ${hour} * * *`;
    case 'weekly':   return `${minute} ${hour} * * 1`;
    case 'monthly':  return `${minute} ${hour} 1 * *`;
    default:         return `${minute} ${hour} * * *`;
  }
}

// ── Store ─────────────────────────────────────────────────────────────────────

class SchedulesStore {
  constructor() {
    this.schedules = [];
    this.activeTab = 'all';
    this.searchQuery = '';
    this.listeners = [];
    this._loading = false;
  }

  getSchedules() { return this.schedules; }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  notify() { this.listeners.forEach(l => l(this)); }

  setTab(tab)    { this.activeTab = tab; this.notify(); }
  setSearch(q)   { this.searchQuery = q.toLowerCase(); this.notify(); }

  async loadFromBackend() {
    if (this._loading) return;
    this._loading = true;
    try {
      const res = await fetch('/api/cron');
      if (res.ok) {
        const data = await res.json();
        this.schedules = (data.jobs || []).map(job => this._mapJob(job));
        this.notify();
      }
    } catch (e) {
      console.warn('[Schedules] Failed to load from backend:', e);
    } finally {
      this._loading = false;
    }
  }

  _mapJob(job) {
    return {
      id: job.id,
      name: job.name || 'Unnamed Schedule',
      nextRun: nextRunHuman(job),
      scheduleDisplay: cronToHuman(job.schedule),
      scheduleRaw: job.schedule,
      role: job.agent_name || job.agent || '',
      agentId: job.agent_id || '',
      status: job.enabled === false ? 'paused' : 'active',
      prompt: job.prompt || '',
      lastRun: job.last_run_at ? new Date(job.last_run_at * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never',
      lastStatus: job.last_status || null,
      frequency: 'custom',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    };
  }

  async toggleStatus(id) {
    const item = this.schedules.find(s => s.id === id);
    if (!item) return;
    const newEnabled = item.status !== 'active';
    try {
      // Use PATCH to toggle; server updates jobs.json
      const res = await fetch(`/api/cron/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newEnabled }),
      });
      if (res.ok) {
        item.status = newEnabled ? 'active' : 'paused';
        this.notify();
        window.showToast && window.showToast(`Schedule ${newEnabled ? 'activated' : 'paused'}.`, 'success');
      } else {
        // Fallback: optimistic update (PATCH may not be implemented on server yet)
        item.status = newEnabled ? 'active' : 'paused';
        this.notify();
        window.showToast && window.showToast(`Schedule ${newEnabled ? 'activated' : 'paused'} (local only).`, 'info');
      }
    } catch (e) {
      // Still update locally
      item.status = newEnabled ? 'active' : 'paused';
      this.notify();
    }
  }

  async runNow(id) {
    const item = this.schedules.find(s => s.id === id);
    if (!item) return;
    try {
      window.showToast && window.showToast(`Triggering "${item.name}"…`, 'info');
      // If the schedule has an associated agent, use agent run endpoint
      if (item.agentId) {
        const res = await fetch(`/api/agents/${item.agentId}/run`, { method: 'POST' });
        if (res.ok) {
          window.showToast && window.showToast(`"${item.name}" started.`, 'success');
        } else {
          window.showToast && window.showToast(`Run failed (${res.status}).`, 'error');
        }
      } else {
        // No agent — create a one-shot cron tick for this specific job
        const res = await fetch(`/api/cron/${id}/run`, { method: 'POST' });
        if (res.ok) {
          window.showToast && window.showToast(`"${item.name}" triggered.`, 'success');
        } else {
          window.showToast && window.showToast(`Run failed (${res.status}).`, 'error');
        }
      }
    } catch (e) {
      window.showToast && window.showToast(`Run failed: ${e.message}`, 'error');
    }
  }

  async deleteSchedule(id) {
    const item = this.schedules.find(s => s.id === id);
    try {
      const res = await fetch(`/api/cron/${id}`, { method: 'DELETE' });
      if (res.ok) {
        this.schedules = this.schedules.filter(s => s.id !== id);
        this.notify();
        window.showToast && window.showToast(`Schedule deleted.`, 'success');
      } else {
        window.showToast && window.showToast(`Delete failed (${res.status}).`, 'error');
      }
    } catch (e) {
      window.showToast && window.showToast(`Delete failed: ${e.message}`, 'error');
    }
  }

  async addSchedule({ name, agentId, agentName, frequency, timeStr, taskBrief, plugins, customCron }) {
    const cronSchedule = (frequency === 'custom' && customCron)
      ? customCron.trim()
      : freqToCron(frequency, timeStr);

    const prompt = taskBrief
      ? `You are${agentName ? ` ${agentName},` : ''} running a scheduled task.\n\nTask: ${taskBrief}\n\nUse all your skills and tools to complete this task. Report what was done.${plugins.length ? `\n\nEnabled plugins: ${plugins.map(p => p.name).join(', ')}` : ''}`
      : `Scheduled task: ${name}`;

    try {
      const res = await fetch('/api/cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          schedule: cronSchedule,
          prompt,
          enabled: true,
          agent_id: agentId || undefined,
          agent_name: agentName || undefined,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        const job = result.job;
        this.schedules.push(this._mapJob({
          ...job,
          agent_name: agentName,
          agent_id: agentId,
        }));
        this.notify();
        window.showToast && window.showToast(`Schedule "${name}" created!`, 'success');
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        window.showToast && window.showToast(`Failed to create: ${err.detail || res.status}`, 'error');
        return false;
      }
    } catch (e) {
      window.showToast && window.showToast(`Failed to create schedule: ${e.message}`, 'error');
      return false;
    }
  }
}

const schedulesStore = new SchedulesStore();
export { schedulesStore };

// ── Init ──────────────────────────────────────────────────────────────────────

export function initSchedulesPage() {
  injectModalStyles();
  const container = document.getElementById('schedulesPageView');
  if (!container) return;

  const searchInput = document.getElementById('scheduleSearchInput');
  const tabs = container.querySelectorAll('.schedule-tab');
  const btnCreate = document.getElementById('btnCreateSchedule');
  const heroBtnCreate = document.getElementById('heroBtnCreateSchedule');

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', e => schedulesStore.setSearch(e.target.value));
  }

  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      schedulesStore.setTab(tab.getAttribute('data-status'));
    });
  });

  // Create buttons
  [btnCreate, heroBtnCreate].forEach(btn => {
    if (btn) btn.addEventListener('click', openCreateScheduleSidebar);
  });

  // Frequency selector on hero card
  const freqOptions = container.querySelectorAll('.freq-option');
  freqOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      freqOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      renderPremiumVisualGrid(opt.getAttribute('data-freq'));
    });
  });

  // Subscribe
  schedulesStore.subscribe(store => {
    renderTable(store);
    updateKPIs(store);
  });

  // Initial load
  schedulesStore.loadFromBackend();
  renderPremiumVisualGrid('daily');

  // Auto-refresh every 30s
  setInterval(() => schedulesStore.loadFromBackend(), 30000);
}

// ── Hero Grid ─────────────────────────────────────────────────────────────────

function renderPremiumVisualGrid(freq = 'daily') {
  const gridContainer = document.getElementById('premiumHeroGridRows');
  if (!gridContainer) return;

  const nextRunText = document.getElementById('premiumHeroNextRunText');
  const configs = {
    daily:    { nextRun: 'Today, 09:00 AM',       tasks: [{ time: '09:00', color: 'task-purple', icon: 'refresh',  title: 'Daily Report' }, { time: '12:00', color: 'task-green',  icon: 'database', title: 'Data Sync' }, { time: '15:00', color: 'task-orange', icon: 'chart',    title: 'Market Analysis' }] },
    weekly:   { nextRun: 'Next Mon, 10:00 AM',    tasks: [{ time: '09:00', color: 'task-purple', icon: 'email',    title: 'Newsletter' }] },
    monthly:  { nextRun: 'Next Month, 09:00 AM',  tasks: [{ time: '09:00', color: 'task-orange', icon: 'chart',    title: 'Monthly Audit' }] },
    custom:   { nextRun: 'Next run in 45 min',    tasks: [{ time: '12:00', color: 'task-purple', icon: 'settings', title: 'Custom Trigger' }] },
  };

  const iconSvgs = {
    refresh:  `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    database: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
    chart:    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    email:    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:3px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  };

  const cfg = configs[freq] || configs.daily;
  const times = ['09:00', '12:00', '15:00', '18:00'];
  const taskMap = {};
  cfg.tasks.forEach(t => { taskMap[t.time] = t; });

  gridContainer.innerHTML = times.map(time => {
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

  if (nextRunText) nextRunText.textContent = cfg.nextRun;
}

// ── KPIs ──────────────────────────────────────────────────────────────────────

function updateKPIs(store) {
  const list = store.getSchedules();
  const activeCount = list.filter(s => s.status === 'active').length;
  const pausedCount = list.filter(s => s.status === 'paused').length;

  const el = id => document.getElementById(id);
  if (el('kpiNumRunning'))   el('kpiNumRunning').textContent   = activeCount;
  if (el('kpiNumScheduled')) el('kpiNumScheduled').textContent = list.length;
  if (el('kpiNumCompleted')) el('kpiNumCompleted').textContent = 0;
  if (el('kpiNumPaused'))    el('kpiNumPaused').textContent    = pausedCount;
}

// ── Table ─────────────────────────────────────────────────────────────────────

function renderTable(store) {
  const tableBody = document.getElementById('schedulesTableBody');
  if (!tableBody) return;

  const { activeTab, searchQuery, schedules } = store;

  const filtered = schedules.filter(item => {
    if (activeTab === 'active' && item.status !== 'active') return false;
    if (activeTab === 'paused' && item.status !== 'paused') return false;
    if (searchQuery) {
      return item.name.toLowerCase().includes(searchQuery) ||
             (item.role || '').toLowerCase().includes(searchQuery) ||
             (item.scheduleDisplay || '').toLowerCase().includes(searchQuery);
    }
    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <div style="padding: 48px 24px; text-align: center; color: #6B7280; font-size: 14px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 12px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        No schedules found. <button onclick="document.getElementById('btnCreateSchedule').click()" style="color:#111;font-weight:600;background:none;border:none;cursor:pointer;font-size:14px;">Create one →</button>
      </div>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(item => {
    const isAct = item.status === 'active';
    const statusPill = isAct
      ? `<span class="status-pill active">Active <span class="dot-green"></span></span>`
      : `<span class="status-pill paused">Paused</span>`;

    const lastRunBadge = '';

    const agentBadge = (item.agentName || item.role)
      ? `<span style="font-size:12px;color:#6B7280;display:flex;align-items:center;gap:4px;">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           ${item.agentName || item.role}
         </span>`
      : '';

    return `
      <div class="schedules-table-row" id="row-${item.id}">
        <div class="col-sched">
          <div class="sched-title-group">
            <div class="sched-icon-wrapper">${item.icon}</div>
            <div>
              <span class="sched-name">${item.name}</span>${lastRunBadge}
              <div style="font-size:11px;color:#9CA3AF;margin-top:2px;">${item.scheduleDisplay}</div>
            </div>
          </div>
        </div>
        <div class="col-next">
          <div style="font-size:13px;font-weight:500;color:#111;">${item.nextRun}</div>
          <div style="font-size:11px;color:#9CA3AF;">Last: ${item.lastRun}</div>
        </div>
        <div class="col-agent">
          ${agentBadge || '<span style="color:#D1D5DB;font-size:12px;">No agent</span>'}
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

  bindRowEvents();
}

// ── Row actions ───────────────────────────────────────────────────────────────

function bindRowEvents() {
  document.querySelectorAll('.sched-row-action-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleRowMenu(btn, btn.getAttribute('data-id'));
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
    position: fixed;
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    padding: 4px;
    min-width: 160px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'Inter', -apple-system, sans-serif;
  `;

  const rect = triggerBtn.getBoundingClientRect();
  menu.style.top  = `${rect.bottom + 6}px`;
  menu.style.left = `${Math.max(4, rect.right - 180)}px`;

  const actions = [
    { action: 'run-now',       label: 'Run now',    icon: '▶',  color: '#059669' },
    { action: 'edit',          label: 'Edit',        icon: '✏', color: '#18181B' },
    { action: 'toggle-status', label: isAct ? 'Pause' : 'Activate', icon: isAct ? '⏸' : '▶', color: '#18181B' },
    { action: 'delete',        label: 'Delete',      icon: '🗑', color: '#DC2626' },
  ];

  menu.innerHTML = actions.map((a, i) => `
    ${i === actions.length - 1 ? '<div style="height: 1px; background: #E4E4E7; margin: 2px 8px;"></div>' : ''}
    <button class="sched-menu-item" data-action="${a.action}" style="
      display: flex; align-items: center; gap: 8px;
      background: none; border: none; text-align: left; padding: 8px 12px;
      font-size: 13px; color: ${a.color}; cursor: pointer; border-radius: 8px;
      font-weight: 500; width: 100%; transition: background 0.1s;
    "><span style="font-size: 12px;">${a.icon}</span> ${a.label}</button>
  `).join('');

  document.body.appendChild(menu);

  menu.querySelectorAll('.sched-menu-item').forEach(btnEl => {
    btnEl.addEventListener('mouseenter', () => btnEl.style.backgroundColor = '#F4F4F5');
    btnEl.addEventListener('mouseleave', () => btnEl.style.backgroundColor = 'transparent');
    btnEl.addEventListener('click', e => {
      e.stopPropagation();
      const action = btnEl.getAttribute('data-action');
      if (action === 'run-now')       schedulesStore.runNow(id);
      if (action === 'edit')          openEditSchedule(id);
      if (action === 'toggle-status') schedulesStore.toggleStatus(id);
      if (action === 'delete') {
        if (confirm(`Delete schedule "${item.name}"?`)) schedulesStore.deleteSchedule(id);
      }
      menu.remove();
      document.removeEventListener('click', closeMenu);
    });
  });

  const closeMenu = e => {
    if (!menu.contains(e.target) && !triggerBtn.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    }
  };
  setTimeout(() => document.addEventListener('click', closeMenu), 0);
}

// ── Create Sidebar ────────────────────────────────────────────────────────────

function openCreateScheduleSidebar() {
  if (document.getElementById('createScheduleSidebarOverlay')) return;

  const agents = agentsStore.agents || [];

  const sidebarHtml = `
    <div class="zed-sidebar-overlay" id="createScheduleSidebarOverlay">
      <div class="zed-connect-sidebar">
        <button class="zed-modal-close-btn zed-sidebar-close-abs" id="zedSchedSidebarClose" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <h2 class="zed-sidebar-title">Create Schedule</h2>
        <p class="zed-sidebar-subtitle">Automate an agent task on a recurring schedule.</p>

        <div class="zed-modal-body">

          <div class="zed-modal-field">
            <label for="schedName">Schedule Name <span style="color:#E11D48">*</span></label>
            <input type="text" id="schedName" placeholder="e.g. Daily SEO Check">
          </div>

          <div class="zed-modal-field">
            <label>Agent</label>
            <div class="sched-agent-search" id="agentSearchWrapper">
              <input type="text" id="schedAgentInput" placeholder="Search or type agent name…" autocomplete="off">
              <div class="sched-agent-dropdown" id="schedAgentOptions">
                ${agents.length === 0
                  ? `<div class="sched-agent-empty">No agents yet. <a href="#" id="schedGoAgents" style="color:#111;font-weight:600;">Create one →</a></div>`
                  : agents.map(a => `
                      <div class="sched-agent-option" data-agent-id="${a.id}" data-agent-name="${a.name}">
                        <span class="sched-agent-opt-name">${a.name}</span>
                        <span class="sched-agent-opt-desc">${a.desc || a.description || ''}</span>
                      </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="zed-modal-field">
            <label for="schedFrequency">Frequency</label>
            <select id="schedFrequency" style="height:38px;padding:0 10px;border-radius:10px;border:1px solid rgba(0,0,0,0.08);font-size:13px;font-family:'Inter',sans-serif;background:#FFF;outline:none;width:100%;">
              <option value="minutely">Every minute (testing)</option>
              <option value="hourly">Every hour</option>
              <option value="daily" selected>Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom cron expression</option>
            </select>
          </div>

          <div class="zed-modal-field" id="schedTimeRow">
            <label for="schedTime">Time (HH:MM or "9:00 AM")</label>
            <input type="text" id="schedTime" placeholder="e.g. 9:00 AM" value="9:00 AM">
          </div>

          <div class="zed-modal-field" id="schedCustomCronRow" style="display:none;">
            <label for="schedCustomCron">Cron Expression</label>
            <input type="text" id="schedCustomCron" placeholder="e.g. 0 9 * * 1-5 (weekdays at 9am)">
            <div style="font-size:11px;color:#9CA3AF;margin-top:4px;">
              Format: minute hour day month weekday &nbsp;|&nbsp;
              <a href="https://crontab.guru" target="_blank" rel="noopener" style="color:#6366F1;">crontab.guru ↗</a>
            </div>
          </div>

          <div class="zed-modal-field">
            <label for="schedTask">Task Brief <span style="color:#E11D48">*</span></label>
            <textarea id="schedTask" placeholder="Describe what the agent should do each run…" rows="4"
              style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(0,0,0,0.08);font-size:13px;font-family:'Inter',sans-serif;background:#FFF;outline:none;resize:vertical;box-sizing:border-box;"></textarea>
          </div>

          <div class="zed-modal-field" id="schedPluginsSection">
            <label>Plugins</label>
            <div class="sched-plugins-list" id="schedPluginsList">
              ${pluginsStore.installed.length === 0
                ? `<div style="color:#9CA3AF;font-size:13px;">No plugins installed.</div>`
                : ''}
            </div>
          </div>

        </div>

        <div class="zed-sidebar-actions-row">
          <button class="zed-btn-bw-secondary" id="zedSchedSidebarCancel">Cancel</button>
          <button class="zed-btn-bw-primary" id="zedSchedSidebarSubmit" style="background:#111;color:#fff;min-width:100px;">
            <span id="schedSubmitLabel">Create</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = sidebarHtml;
  document.body.appendChild(wrapper.firstElementChild);

  const overlay   = document.getElementById('createScheduleSidebarOverlay');
  const closeBtn  = overlay.querySelector('#zedSchedSidebarClose');
  const cancelBtn = overlay.querySelector('#zedSchedSidebarCancel');
  const submitBtn = overlay.querySelector('#zedSchedSidebarSubmit');
  const agentInput    = overlay.querySelector('#schedAgentInput');
  const agentDropdown = overlay.querySelector('#schedAgentOptions');
  const freqSelect    = overlay.querySelector('#schedFrequency');
  const timeRow       = overlay.querySelector('#schedTimeRow');
  const customCronRow = overlay.querySelector('#schedCustomCronRow');

  // ── Frequency change ──
  freqSelect.addEventListener('change', () => {
    const v = freqSelect.value;
    timeRow.style.display       = (v === 'custom' || v === 'minutely') ? 'none' : '';
    customCronRow.style.display = (v === 'custom') ? '' : 'none';
  });

  // ── Agent search ──
  let selectedAgentId = '', selectedAgentName = '';

  function filterAgents(q) {
    agentDropdown.querySelectorAll('.sched-agent-option').forEach(opt => {
      const name = opt.dataset.agentName.toLowerCase();
      const desc = (opt.querySelector('.sched-agent-opt-desc')?.textContent || '').toLowerCase();
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

  agentInput.addEventListener('focus', () => agentDropdown.classList.add('open'));
  agentInput.addEventListener('input', e => {
    agentInput.dataset.selected = '';
    selectedAgentId = '';
    selectedAgentName = '';
    filterAgents(e.target.value.toLowerCase());
    agentDropdown.classList.add('open');
  });
  agentInput.addEventListener('blur', () => setTimeout(() => agentDropdown.classList.remove('open'), 200));

  agentDropdown.querySelectorAll('.sched-agent-option').forEach(opt => {
    opt.addEventListener('mousedown', e => {
      e.preventDefault();
      selectAgent(opt.dataset.agentId, opt.dataset.agentName);
    });
  });

  const goAgentsLink = overlay.querySelector('#schedGoAgents');
  if (goAgentsLink) {
    goAgentsLink.addEventListener('click', e => {
      e.preventDefault();
      closeSidebar();
      document.getElementById('navAgents')?.click();
    });
  }

  // ── Plugins ──
  const pluginsList = overlay.querySelector('#schedPluginsList');
  if (pluginsStore.installed.length > 0) {
    pluginsList.innerHTML = pluginsStore.installed.map(p => `
      <label class="sched-plugin-item">
        <input type="checkbox" class="sched-plugin-cb" data-plugin-id="${p.id}" data-plugin-name="${p.name.replace(/"/g, '&quot;')}">
        <img src="${p.logo}" alt="${p.name}" class="sched-plugin-logo">
        <span class="sched-plugin-name">${p.name}</span>
      </label>
    `).join('');
  }

  // ── Sidebar open/close ──
  const schedulesPage = document.querySelector('.schedules-page-view');
  if (schedulesPage) schedulesPage.classList.add('sidebar-active');

  function closeSidebar() {
    const sidebarEl = overlay.querySelector('.zed-connect-sidebar');
    if (sidebarEl) sidebarEl.style.transform = 'translateX(100%)';
    overlay.style.opacity = '0';
    if (schedulesPage) schedulesPage.classList.remove('sidebar-active');
    setTimeout(() => overlay.remove(), 250);
  }

  closeBtn.addEventListener('click', closeSidebar);
  cancelBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('mousedown', e => {
    const sidebar = overlay.querySelector('.zed-connect-sidebar');
    if (sidebar && !sidebar.contains(e.target)) closeSidebar();
  });

  // ── Submit ──
  submitBtn.addEventListener('click', async () => {
    const name      = overlay.querySelector('#schedName').value.trim();
    const taskBrief = overlay.querySelector('#schedTask').value.trim();
    const frequency = freqSelect.value;
    const timeStr   = overlay.querySelector('#schedTime').value.trim();
    const customCron = overlay.querySelector('#schedCustomCron')?.value.trim() || '';
    const agentName = selectedAgentName || agentInput.value.trim();
    const agentId   = selectedAgentId;

    const plugins = Array.from(overlay.querySelectorAll('.sched-plugin-cb:checked')).map(cb => ({
      id: cb.dataset.pluginId,
      name: cb.dataset.pluginName,
    }));

    if (!name) {
      window.showToast && window.showToast('Schedule name is required.', 'warning');
      overlay.querySelector('#schedName').focus();
      return;
    }
    if (!agentId) {
      window.showToast && window.showToast('Please select an agent.', 'warning');
      overlay.querySelector('#schedAgentInput').focus();
      return;
    }
    // Check if this agent already has a schedule
    const existingSchedule = schedulesStore.schedules.find(s => s.agentId === agentId);
    if (existingSchedule) {
      window.showToast && window.showToast(`This agent already has a schedule: "${existingSchedule.name}".`, 'warning');
      overlay.querySelector('#schedAgentInput').focus();
      return;
    }
    if (!taskBrief) {
      window.showToast && window.showToast('Task brief is required.', 'warning');
      overlay.querySelector('#schedTask').focus();
      return;
    }
    if (frequency === 'custom' && !customCron) {
      window.showToast && window.showToast('Enter a cron expression.', 'warning');
      overlay.querySelector('#schedCustomCron').focus();
      return;
    }

    // Disable button while submitting
    submitBtn.disabled = true;
    overlay.querySelector('#schedSubmitLabel').textContent = 'Creating…';

    const ok = await schedulesStore.addSchedule({
      name, agentId, agentName, frequency, timeStr, taskBrief, plugins, customCron,
    });

    if (ok) {
      closeSidebar();
    } else {
      submitBtn.disabled = false;
      const label = overlay.querySelector('#schedSubmitLabel');
      if (label) label.textContent = submitBtn.dataset.editId ? 'Update' : 'Create';
    }
  });
}

// ── Edit Schedule ──

function openEditSchedule(scheduleId) {
  const schedule = schedulesStore.getSchedules().find(s => s.id === scheduleId);
  if (!schedule) return;

  // Pre-fill create form with existing data
  const createBtn = document.getElementById('btnCreateSchedule');
  if (createBtn) createBtn.click();

  setTimeout(() => {
    const overlay = document.getElementById('createScheduleSidebarOverlay');
    if (!overlay) return;

    // Update title
    const title = overlay.querySelector('.zed-sidebar-title');
    if (title) title.textContent = 'Edit Schedule';

    // Pre-fill name
    const nameInput = overlay.querySelector('#schedName');
    if (nameInput) nameInput.value = schedule.name;

    // Pre-fill task
    const taskInput = overlay.querySelector('#schedTask');
    if (taskInput) taskInput.value = schedule.prompt || '';

    // Pre-fill agent
    const agentInput = overlay.querySelector('#schedAgentInput');
    if (agentInput && schedule.agentName) {
      agentInput.value = schedule.agentName;
      agentInput.dataset.selected = 'true';
    }

    // Update submit button
    const submitBtn = overlay.querySelector('#zedSchedSidebarSubmit');
    if (submitBtn) {
      submitBtn.dataset.editId = scheduleId;
      const label = overlay.querySelector('#schedSubmitLabel');
      if (label) label.textContent = 'Update';
    }
  }, 100);
}

// ── Auto-init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { initSchedulesPage(); });
