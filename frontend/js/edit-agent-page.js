import { agentsStore } from './agent-page.js';
import { modelsStore } from './models-store.js';
import { pluginsStore } from './plugins-page.js';
import { SKILLS_CATALOG, getSkillById } from './skills-catalog.js';
import { showToast } from './toast.js';

let currentEditingAgentId = null;
const editPageCleanupFns = [];
const state = {
  name: '',
  desc: '',
  avatar: 'assistant',
  status: 'active',
  model: 'Zed Pro',
  provider: 'zed-pro',
  skills: []
};

const agentPixelAvatars = {
  security: '<img src="assets/models/security_avatar.png" alt="Security Agent" />',
  research: '<img src="assets/models/research_avatar.png" alt="Research Agent" />',
  coder: '<img src="assets/models/coder_avatar.png" alt="Coder Agent" />',
  finance: '<img src="assets/models/finance_avatar.png" alt="Finance Agent" />',
  social: '<img src="assets/models/social_avatar.png" alt="Social Media Analyst" />',
  assistant: '<img src="assets/models/assistant_avatar.png" alt="Assistant Agent" />'
};

export function initEditAgentPage() {
  const editPage = document.getElementById('editAgentPageView');
  const agentPage = document.getElementById('agentPageView');
  if (!editPage || !agentPage) return;

  // Bind Back Button
  const btnBack = document.getElementById('eaBtnBack');
  btnBack?.addEventListener('click', () => {
    editPage.style.display = 'none';
    agentPage.style.display = 'flex';
  });

  // Name Input
  const nameInput = document.getElementById('eaNameInput');
  nameInput?.addEventListener('input', (e) => {
    state.name = e.target.value;
    updateOverviewTab();
  });

  // Description Input
  const descInput = document.getElementById('eaDescInput');
  const descCount = document.getElementById('eaDescCount');
  descInput?.addEventListener('input', (e) => {
    state.desc = e.target.value;
    if (descCount) {
      descCount.textContent = `${state.desc.length}/600`;
    }
    updateOverviewTab();
  });

  // Status Dropdown Selection
  const statusSelect = document.getElementById('eaStatusSelect');
  statusSelect?.addEventListener('change', (e) => {
    state.status = e.target.value;
    updateOverviewTab();
  });

  // Avatar Selection Dropdown toggle
  const changeAvatarBtn = document.getElementById('eaChangeAvatarBtn');
  const avatarDropdown = document.getElementById('eaAvatarDropdown');
  
  // Clean up previous listeners if re-initialized
  for (const fn of editPageCleanupFns) fn();
  editPageCleanupFns.length = 0;

  changeAvatarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarDropdown.classList.toggle('show');
  });

  const onDocClickForAvatar = (e) => {
    if (avatarDropdown && !avatarDropdown.contains(e.target) && e.target !== changeAvatarBtn) {
      avatarDropdown.classList.remove('show');
    }
  };
  document.addEventListener('click', onDocClickForAvatar);
  editPageCleanupFns.push(() => document.removeEventListener('click', onDocClickForAvatar));

  const avatarOptionElements = avatarDropdown?.querySelectorAll('.avatar-option');
  avatarOptionElements?.forEach(opt => {
    opt.addEventListener('click', () => {
      state.avatar = opt.dataset.avatar;
      updateAvatarPreview();
      avatarDropdown.classList.remove('show');
    });
  });

  // Tab switching logic
  const tabButtons = editPage.querySelectorAll('.ea-tab-btn');
  const tabPanes = editPage.querySelectorAll('.ea-tab-pane');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = editPage.querySelector(`#pane-${btn.dataset.tab}`);
      if (targetPane) targetPane.classList.add('active');

      if (btn.dataset.tab === 'desktop') {
        updateDesktopTime();
        runTerminalSimulation();
      }
    });
  });
  // Slider value display
  const tempInput = document.getElementById('eaTemperatureInput');
  const tempValDisplay = document.getElementById('eaTempVal');
  tempInput?.addEventListener('input', (e) => {
    if (tempValDisplay) {
      tempValDisplay.textContent = e.target.value;
    }
  });

  // Primary Model Dropdown Toggle
  const primaryModelTrigger = document.getElementById('eaPrimaryModelTrigger');
  const primaryModelDropdown = document.getElementById('eaPrimaryModelDropdown');

  primaryModelTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (primaryModelDropdown) {
      const isShown = primaryModelDropdown.style.display === 'flex';
      primaryModelDropdown.style.display = isShown ? 'none' : 'flex';
    }
  });

  const onDocClickForModel = (e) => {
    if (primaryModelDropdown && !primaryModelDropdown.contains(e.target) && e.target !== primaryModelTrigger) {
      primaryModelDropdown.style.display = 'none';
    }
  };
  document.addEventListener('click', onDocClickForModel);
  editPageCleanupFns.push(() => document.removeEventListener('click', onDocClickForModel));

  // Save changes button logic
  const btnSave = document.getElementById('btnEditAgentSave');
  btnSave?.addEventListener('click', () => {
    console.log('[Edit] Save clicked, currentEditingAgentId:', currentEditingAgentId);
    console.log('[Edit] State:', JSON.stringify(state));
    
    if (!state.name.trim()) {
      showToast('Please enter an agent name.', 'warning');
      return;
    }

    if (!currentEditingAgentId) {
      console.error('[Edit] No agent ID to update');
      showToast('Error: No agent selected for editing.', 'error');
      return;
    }

    const existingAgent = agentsStore.agents.find(a => a.id === currentEditingAgentId);
    if (!existingAgent) {
      showToast('Error: This agent no longer exists.', 'error');
      currentEditingAgentId = null;
      editPage.style.display = 'none';
      agentPage.style.display = 'flex';
      return;
    }

    const fallbackModel = document.getElementById('eaFallbackModelSelect')?.value || '';
    const modelSettingsType = document.getElementById('eaModelSettingsType')?.value || 'temperature';
    const modelSettingsVal = document.getElementById('eaModelSettingsVal')?.value || '0.7';
    const maxSteps = document.getElementById('eaMaxStepsInput')?.value || '25';
    const maxTools = document.getElementById('eaMaxToolsInput')?.value || '10';
    const memory = document.getElementById('eaMemorySelect')?.value || 'enabled';
    const responseStyle = document.getElementById('eaResponseStyleSelect')?.value || 'balanced';
    const errorHandling = document.getElementById('eaErrorHandlingSelect')?.value || 'retry';

    const chatSystemPrompt = document.getElementById('eaChatSystemPrompt')?.value || '';
    const chatStarterQuestions = document.getElementById('eaChatStarterQuestions')?.value || 'What can you do?;Show security metrics;';
    const chatMaxTokens = document.getElementById('eaChatMaxTokens')?.value || '1024';
    const desktopWorkspaces = document.getElementById('eaDesktopWorkspaces')?.value || '';
    const desktopScreenshotInterval = document.getElementById('eaDesktopScreenshotInterval')?.value || '5';
    const desktopHotkey = document.getElementById('eaDesktopHotkey')?.value || 'Ctrl + Alt + S';
    const desktopShellExecution = document.getElementById('eaDesktopShellExecution')?.value || 'allow';

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const lastUpdated = new Date().toLocaleDateString('en-US', options);

    // Update agent state in store (async, calls backend API)
    agentsStore.updateAgent(currentEditingAgentId, {
      name: state.name,
      desc: state.desc,
      avatar: state.avatar,
      status: state.status,
      model: state.model,
      provider: state.provider,
      skills: state.skills
    });

    // Navigate back to Agent main page view
    editPage.style.display = 'none';
    agentPage.style.display = 'flex';
  });

  // Integrate Plugin & Skill Creation Navigation triggers
  const addPluginBtn = document.getElementById('eaAddPluginBtn');
  addPluginBtn?.addEventListener('click', () => {
    const navPlugins = document.getElementById('navPlugins');
    if (navPlugins) {
      editPage.style.display = 'none';
      agentPage.style.display = 'none';
      navPlugins.click();
    }
  });

  const createSkillBtn = document.getElementById('eaCreateSkillBtn');
  createSkillBtn?.addEventListener('click', () => {
    showToast('Custom skill creator coming soon.', 'info');
  });

  const addModelBtn = document.getElementById('eaBtnAddModel');
  addModelBtn?.addEventListener('click', () => {
    const navModel = document.getElementById('navModel');
    if (navModel) {
      editPage.style.display = 'none';
      agentPage.style.display = 'none';
      navModel.click();
    }
  });

  // Chat Pane send logic
  const chatInput = document.getElementById('eaChatInput');
  const btnChatSend = document.getElementById('btnEaChatSend');
  const chatLog = document.getElementById('eaChatLog');

  function sendChatMessage() {
    if (!chatInput || !chatLog) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user message
    const userMsgHtml = `
      <div class="ea-chat-msg-item user">
        <div class="ea-chat-bubble">${escapeHtml(text)}</div>
        <span class="ea-chat-timestamp">${getCurrentTimeStr()}</span>
      </div>
    `;
    chatLog.insertAdjacentHTML('beforeend', userMsgHtml);
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;

    // Simulate Agent Reply
    setTimeout(() => {
      const avatarHtml = agentPixelAvatars[state.avatar] || agentPixelAvatars.assistant;
      const agentReplyHtml = `
        <div class="ea-chat-msg-item agent">
          <div class="ea-chat-avatar">
            ${avatarHtml}
          </div>
          <div class="ea-chat-bubble-group">
            <div class="ea-chat-bubble">
              I am online and processing your request. Please let me know how else I can assist you with your configuration.
            </div>
            <span class="ea-chat-timestamp">${getCurrentTimeStr()}</span>
          </div>
        </div>
      `;
      chatLog.insertAdjacentHTML('beforeend', agentReplyHtml);
      chatLog.scrollTop = chatLog.scrollHeight;
    }, 1000);
  }

  btnChatSend?.addEventListener('click', sendChatMessage);
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });

  // Desktop Pane refresh logic
  const btnDesktopRefresh = document.getElementById('eaDesktopRefresh');
  btnDesktopRefresh?.addEventListener('click', () => {
    runTerminalSimulation();
  });

  // Register on window object so agent list dots button can call it
  window.openEditAgentPage = openEditAgentPage;

  // Subscriptions to refresh lists when stores change
  const unsubPlugins = pluginsStore.subscribe(() => {
    if (editPage.style.display === 'flex') {
      renderEditAgentPlugins();
    }
  });
  editPageCleanupFns.push(unsubPlugins);

  const unsubModels = modelsStore.subscribe(() => {
    if (editPage.style.display === 'flex') {
      renderModels();
    }
  });
  editPageCleanupFns.push(unsubModels);
}

export function openEditAgentPage(agentId) {
  console.log('[Edit] Opening edit page for agent:', agentId);
  const editPage = document.getElementById('editAgentPageView');
  const agentPage = document.getElementById('agentPageView');
  if (!editPage || !agentPage) {
    console.error('[Edit] Edit page or agent page not found');
    return;
  }

  const agent = agentsStore.agents.find(a => a.id === agentId);
  if (!agent) {
    console.error('[Edit] Agent not found:', agentId);
    return;
  }

  console.log('[Edit] Agent found:', agent.name);
  currentEditingAgentId = agentId;
  state.name = agent.name;
  state.desc = agent.desc;
  state.avatar = agent.avatar;
  state.status = agent.status;
  state.model = agent.model;
  state.provider = agent.provider || 'openai';
  state.skills = agent.skills || [];

  // Pre-fill inputs
  const nameInput = document.getElementById('eaNameInput');
  if (nameInput) nameInput.value = agent.name;

  const descInput = document.getElementById('eaDescInput');
  if (descInput) {
    descInput.value = agent.desc;
    const descCount = document.getElementById('eaDescCount');
    if (descCount) {
      descCount.textContent = `${agent.desc.length}/600`;
    }
  }

  const statusSelect = document.getElementById('eaStatusSelect');
  if (statusSelect) statusSelect.value = agent.status;

  updateAvatarPreview();

  const fallbackSelect = document.getElementById('eaFallbackModelSelect');
  if (fallbackSelect) fallbackSelect.value = agent.fallbackModel || "";

  const settingsTypeSelect = document.getElementById('eaModelSettingsType');
  if (settingsTypeSelect) settingsTypeSelect.value = agent.modelSettingsType || "temperature";

  const settingsValSelect = document.getElementById('eaModelSettingsVal');
  if (settingsValSelect) settingsValSelect.value = agent.modelSettingsVal || "0.7";

  const maxStepsInput = document.getElementById('eaMaxStepsInput');
  if (maxStepsInput) maxStepsInput.value = agent.maxSteps !== undefined ? agent.maxSteps : "25";

  const maxToolsInput = document.getElementById('eaMaxToolsInput');
  if (maxToolsInput) maxToolsInput.value = agent.maxTools !== undefined ? agent.maxTools : "10";

  const memorySelect = document.getElementById('eaMemorySelect');
  if (memorySelect) memorySelect.value = agent.memory || "enabled";

  const responseSelect = document.getElementById('eaResponseStyleSelect');
  if (responseSelect) responseSelect.value = agent.responseStyle || "balanced";

  const errorSelect = document.getElementById('eaErrorHandlingSelect');
  if (errorSelect) errorSelect.value = agent.errorHandling || "retry";

  const chatPromptText = document.getElementById('eaChatSystemPrompt');
  if (chatPromptText) chatPromptText.value = agent.chatSystemPrompt || "";

  const chatStarters = document.getElementById('eaChatStarterQuestions');
  if (chatStarters) chatStarters.value = agent.chatStarterQuestions || "What can you do?;Show security metrics;";

  const chatMax = document.getElementById('eaChatMaxTokens');
  if (chatMax) chatMax.value = agent.chatMaxTokens || "1024";

  const desktopDir = document.getElementById('eaDesktopWorkspaces');
  if (desktopDir) desktopDir.value = agent.desktopWorkspaces || "";

  const desktopInterval = document.getElementById('eaDesktopScreenshotInterval');
  if (desktopInterval) desktopInterval.value = agent.desktopScreenshotInterval !== undefined ? agent.desktopScreenshotInterval : "5";

  const desktopKey = document.getElementById('eaDesktopHotkey');
  if (desktopKey) desktopKey.value = agent.desktopHotkey || "Ctrl + Alt + S";

  const desktopShell = document.getElementById('eaDesktopShellExecution');
  if (desktopShell) desktopShell.value = agent.desktopShellExecution || "allow";

  // Reset tab selection to "Overview"
  const tabButtons = editPage.querySelectorAll('.ea-tab-btn');
  const tabPanes = editPage.querySelectorAll('.ea-tab-pane');
  tabButtons.forEach(b => b.classList.remove('active'));
  tabPanes.forEach(p => p.classList.remove('active'));

  const overviewTab = editPage.querySelector('.ea-tab-btn[data-tab="overview"]');
  const overviewPane = editPage.querySelector('#pane-overview');
  if (overviewTab) overviewTab.classList.add('active');
  if (overviewPane) overviewPane.classList.add('active');

  // Render tabs content
  updateOverviewTab();
  renderActivityTimeline(agent.avatar);
  renderEditAgentPlugins();
  renderEditAgentSkills();
  renderModels();

  // Update dynamic assets & environments
  updateChatAgentAvatars();
  updateTerminalEnvironment();
  updateDesktopTime();

  // Transitions
  agentPage.style.display = 'none';
  editPage.style.display = 'flex';
}

function updateAvatarPreview() {
  const previewBox = document.getElementById('eaAvatarPreviewBox');
  if (previewBox) {
    previewBox.innerHTML = agentPixelAvatars[state.avatar] || agentPixelAvatars.assistant;
  }
}

function updateOverviewTab() {
  const oName = document.getElementById('eaOverviewName');
  const oStatus = document.getElementById('eaOverviewStatus');
  const oModel = document.getElementById('eaOverviewModel');
  const oSchedule = document.getElementById('eaOverviewSchedule');
  const oDesc = document.getElementById('eaOverviewDesc');
  const oCreated = document.getElementById('eaOverviewCreated');
  const oLastUpdated = document.getElementById('eaOverviewLastUpdated');

  const agent = agentsStore.agents.find(a => a.id === currentEditingAgentId);
  if (!agent) return;

  if (oName) oName.textContent = state.name || 'Unnamed Agent';
  if (oStatus) {
    const isAct = state.status === 'active';
    oStatus.innerHTML = `
      <span class="agent-row-status-pill" style="margin: 0; padding: 2px 8px; font-size: 12px;">
        <span class="status-indicator-dot" style="background-color: ${isAct ? '#22C55E' : '#F59E0B'};"></span>
        <span class="status-label">${isAct ? 'Active' : 'Paused'}</span>
      </span>
    `;
  }

  if (oModel) {
    const stateModels = modelsStore.getState().models;
    const currentModel = stateModels.find(m => m.name === state.model);

    let logoHtml = "";
    if (state.model === 'Zed Pro') {
      logoHtml = `<img src="assets/models/zed-pro.svg" alt="Zed Pro" style="width: 16px; height: 16px; object-fit: contain; border-radius: 50%;" />`;
    } else if (currentModel && currentModel.logoSrc) {
      logoHtml = `<img src="${currentModel.logoSrc}" alt="${escapeHtml(state.model)}" style="width: 16px; height: 16px; object-fit: contain; border-radius: 3px;" />`;
    } else if (currentModel && currentModel.logoSvg) {
      logoHtml = currentModel.logoSvg;
    } else {
      logoHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
          <circle cx="12" cy="12" r="12" fill="#000000"/>
          <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
        </svg>
      `;
    }

    oModel.innerHTML = `
      <div style="display: flex; align-items: center; gap: 6px;">
        ${logoHtml}
        <span>${escapeHtml(state.model)}</span>
      </div>
    `;
  }

  if (oSchedule) oSchedule.textContent = agent.schedule || 'Manual';
  if (oDesc) oDesc.textContent = state.desc || 'No description provided.';
  
  if (oCreated) oCreated.textContent = agent.created || "—";
  if (oLastUpdated) oLastUpdated.textContent = agent.lastUpdated || "—";
}

async function renderActivityTimeline(avatarKey) {
  const cardsContainer = document.getElementById('eaMetricCards');
  const chartContainer = document.getElementById('eaChartContainer');
  const tableBody = document.getElementById('eaActivityTableBody');
  if (!cardsContainer || !chartContainer || !tableBody) return;

  // Fetch real session history from the backend; no fabricated demo data.
  let sessions = [];
  try {
    const r = await fetch('/api/sessions');
    if (r.ok) {
      const data = await r.json();
      sessions = Array.isArray(data) ? data : (data.sessions || []);
    }
  } catch (_) { /* backend unreachable — show empty state */ }

  const total = sessions.length;
  const metrics = [
    { label: 'Sessions', value: String(total) },
    { label: 'Messages', value: String(sessions.reduce((n, s) => n + (s.message_count || 0), 0)) },
  ];
  cardsContainer.innerHTML = metrics.map(m => `
    <div class="ea-metric-card">
      <h4 class="ea-metric-card-title">${m.label}</h4>
      <div class="ea-metric-card-value">${m.value}</div>
    </div>
  `).join('');

  chartContainer.innerHTML = '';
  if (!total) {
    tableBody.innerHTML = `
      <tr><td colspan="6" style="padding: 24px 16px; text-align: center; color: #6B7280; font-size: 13.5px;">
        No activity yet. Run this agent to see its history here.
      </td></tr>`;
    return;
  }
  tableBody.innerHTML = sessions.slice(0, 10).map(s => `
    <tr style="border-bottom: 1px solid #F3F4F6;">
      <td style="padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #111827;">${(s.title || s.id || 'Session')}</td>
      <td style="padding: 12px 16px; font-size: 13px; color: #4B5563;">Session</td>
      <td style="padding: 12px 16px;"><span class="ea-status-pill success">Completed</span></td>
      <td style="padding: 12px 16px; font-size: 13px; color: #4B5563;">${s.message_count || 0} messages</td>
      <td style="padding: 12px 16px; font-size: 13px; color: #6B7280; white-space: nowrap;">${s.updated_at || s.created_at || ''}</td>
      <td></td>
    </tr>
  `).join('');
}

function renderEditAgentPlugins() {
  const container = document.getElementById('eaConnectedPluginsList');
  if (!container) return;

  const installed = pluginsStore.installed || [];

  if (installed.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 13.5px;">
        No connected plugins yet. Click "+ Add Plugin" to install.
      </div>
    `;
    return;
  }

  container.innerHTML = installed.map((item) => {
    return `
      <div class="ea-list-item-row">
        <div class="ea-item-left-col">
          <div class="ea-item-icon-box">
            <img src="${item.logo}" alt="${escapeHtml(item.name)}">
          </div>
          <div class="ea-item-name">${escapeHtml(item.name)}</div>
        </div>
        <div class="ea-item-desc">${escapeHtml(item.desc)}</div>
        <div class="ea-item-right-actions">
          <span class="ea-badge-connected">
            <span class="ea-badge-connected-dot"></span>
            Connected
          </span>
          <button type="button" class="ea-item-chevron-btn" aria-label="Configure plugin">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button type="button" class="ea-item-dots-btn" aria-label="Plugin options">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderEditAgentSkills() {
  const container = document.getElementById('eaCustomSkillsList');
  if (!container) return;

  container.innerHTML = SKILLS_CATALOG.map((item) => {
    const isSelected = state.skills.includes(item.id);
    return `
      <div class="ea-list-item-row" data-skill-id="${item.id}" style="cursor:pointer;">
        <div class="ea-item-left-col">
          <div style="color:${isSelected ? '#4F46E5' : '#9CA3AF'};display:flex;align-items:center;margin-right:8px;">${item.icon}</div>
          <div class="ea-item-name">${escapeHtml(item.name)}</div>
        </div>
        <div class="ea-item-desc">${escapeHtml(item.desc)}</div>
        <div class="ea-item-right-actions">
          <span class="ea-badge-tools">${item.toolCount} tools</span>
          <span class="ea-badge-active" style="${isSelected ? 'color:#047857;background:#ECFDF5;' : 'color:#9CA3AF;background:#F3F4F6;'}">${isSelected ? 'Active' : 'Inactive'}</span>
          <button type="button" class="ea-skill-detail-btn" data-skill-id="${item.id}" aria-label="View skill details" style="background:none;border:none;padding:4px;color:#9CA3AF;cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.ea-list-item-row').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.ea-skill-detail-btn')) return;
      const skillId = el.dataset.skillId;
      const idx = state.skills.indexOf(skillId);
      if (idx === -1) {
        state.skills.push(skillId);
      } else {
        state.skills.splice(idx, 1);
      }
      renderEditAgentSkills();
    });
  });

  container.querySelectorAll('.ea-skill-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const skillId = btn.dataset.skillId;
      showEditSkillDetailModal(skillId);
    });
  });
}

function showEditSkillDetailModal(skillId) {
  const skill = getSkillById(skillId);
  if (!skill) return;

  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);';
  const isSelected = state.skills.includes(skill.id);

  modal.innerHTML = `
    <div style="background:#fff;border-radius:16px;width:560px;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.15);font-family:'Inter',sans-serif;">
      <div style="padding:24px 24px 0;display:flex;align-items:flex-start;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;color:#4F46E5;">${skill.icon}</div>
          <div>
            <h2 style="margin:0;font-size:18px;font-weight:700;color:#111;">${escapeHtml(skill.name)}</h2>
            <span style="font-size:12px;color:#6B7280;">${escapeHtml(skill.category)}</span>
          </div>
        </div>
        <button class="modal-close-btn" style="background:none;border:none;cursor:pointer;padding:4px;color:#9CA3AF;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <div style="padding:16px 24px;">
        <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 20px 0;">${escapeHtml(skill.desc)}</p>
        <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">Tools Used</h4>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
          ${skill.tools.map(t => `<span style="font-size:12px;background:#EFF6FF;color:#4F46E5;padding:3px 10px;border-radius:9999px;font-weight:500;">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">How It Works</h4>
        <ol style="font-size:13px;color:#374151;margin:0 0 20px 0;padding-left:20px;line-height:1.8;">
          ${skill.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ol>
        <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">Example Uses</h4>
        <ul style="font-size:13px;color:#374151;margin:0 0 20px 0;padding-left:20px;line-height:1.8;">
          ${skill.examples.map(e => `<li style="color:#6B7280;">"${escapeHtml(e)}"</li>`).join('')}
        </ul>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #F3F4F6;display:flex;justify-content:flex-end;gap:8px;">
        <button class="modal-close-btn" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">Close</button>
        <button class="modal-toggle-btn" style="padding:8px 16px;border-radius:8px;border:none;background:${isSelected ? '#FEE2E2' : '#4F46E5'};color:${isSelected ? '#DC2626' : '#fff'};font-size:13px;font-weight:600;cursor:pointer;">${isSelected ? 'Remove Skill' : 'Add Skill'}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector('.modal-close-btn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  modal.querySelector('.modal-toggle-btn').addEventListener('click', () => {
    const idx = state.skills.indexOf(skill.id);
    if (idx === -1) { state.skills.push(skill.id); } else { state.skills.splice(idx, 1); }
    modal.remove();
    renderEditAgentSkills();
  });
}

function renderModels() {
  const dropdownContainer = document.getElementById('eaPrimaryModelDropdown');
  if (!dropdownContainer) return;

  const stateModels = modelsStore.getState().models;
  const connectedModels = stateModels.filter(m => m.type === 'official' && m.status === 'connected');

  // ensure selected model is valid
  const hasActiveModelConnected = connectedModels.some(m => m.name === state.model);
  if (!hasActiveModelConnected && connectedModels.length > 0) {
    const zedProModel = connectedModels.find(m => m.name === 'Zed Pro') || connectedModels[0];
    state.model = zedProModel.name;
    state.provider = zedProModel.provider;
  }

  // Populate dropdown options
  dropdownContainer.innerHTML = connectedModels.map(m => {
    const isSelected = m.name === state.model;
    const isZed = m.name === 'Zed Pro';
    
    let logoHtml = "";
    if (isZed || (m.logoSrc && m.logoSrc.includes("zed-pro"))) {
      logoHtml = `<img src="assets/models/zed-pro.svg" alt="Zed Pro" style="width: 18px; height: 18px; object-fit: contain; border-radius: 50%; flex-shrink: 0;">`;
    } else if (m.logoSrc) {
      logoHtml = `<img src="${m.logoSrc}" alt="${escapeHtml(m.name)}" style="width: 18px; height: 18px; object-fit: contain; border-radius: 4px; flex-shrink: 0;">`;
    } else if (m.logoSvg) {
      logoHtml = m.logoSvg;
    } else {
      logoHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
          <circle cx="12" cy="12" r="12" fill="#000000"/>
          <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
        </svg>
      `;
    }

    return `
      <div class="ea-dropdown-option-row ${isSelected ? 'selected' : ''}" data-model="${m.name}" data-provider="${m.provider}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: background 0.15s; background: ${isSelected ? '#F3F4F6' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
          ${logoHtml}
          <span style="font-size: 13.5px; font-weight: 550; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(m.name)}</span>
        </div>
        <span style="font-size: 11px; font-weight: 550; color: #047857; background: #ECFDF5; padding: 2px 6px; border-radius: 6px; flex-shrink: 0;">Active</span>
      </div>
    `;
  }).join('');

  // Add click handlers for the option rows
  const optionRows = dropdownContainer.querySelectorAll('.ea-dropdown-option-row');
  optionRows.forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      state.model = row.dataset.model;
      state.provider = row.dataset.provider;
      updatePrimaryModelValDisplay();
      updateOverviewTab();
      dropdownContainer.style.display = 'none';
      
      // Update selected class in dropdown options
      optionRows.forEach(r => {
        const isSel = r.dataset.model === state.model;
        r.style.background = isSel ? '#F3F4F6' : 'transparent';
        r.classList.toggle('selected', isSel);
      });
    });
  });

  // Add hover effect via JS since it is dynamic
  optionRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      if (row.dataset.model !== state.model) {
        row.style.background = '#F9FAFB';
      }
    });
    row.addEventListener('mouseleave', () => {
      if (row.dataset.model !== state.model) {
        row.style.background = 'transparent';
      }
    });
  });

  // Also update primary model trigger display
  updatePrimaryModelValDisplay();

  // Populate Fallback Model Select options
  const fallbackSelect = document.getElementById('eaFallbackModelSelect');
  if (fallbackSelect) {
    const currentVal = fallbackSelect.value;
    fallbackSelect.innerHTML = '<option value="">Select a model</option>' + 
      connectedModels.map(m => `<option value="${m.name}">${m.name}</option>`).join('');
    fallbackSelect.value = currentVal;
  }
}

function updatePrimaryModelValDisplay() {
  const valContainer = document.getElementById('eaPrimaryModelVal');
  if (!valContainer) return;

  const stateModels = modelsStore.getState().models;
  const currentModel = stateModels.find(m => m.name === state.model);

  let logoHtml = "";
  if (state.model === 'Zed Pro') {
    logoHtml = `<img src="assets/models/zed-pro.svg" alt="Zed Pro" style="width: 18px; height: 18px; object-fit: contain; border-radius: 50%; flex-shrink: 0;" />`;
  } else if (currentModel && currentModel.logoSrc) {
    logoHtml = `<img src="${currentModel.logoSrc}" alt="${state.model}" style="width: 18px; height: 18px; object-fit: contain; border-radius: 4px; flex-shrink: 0;" />`;
  } else if (currentModel && currentModel.logoSvg) {
    logoHtml = currentModel.logoSvg;
  } else {
    // default Z logo
    logoHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
        <circle cx="12" cy="12" r="12" fill="#000000"/>
        <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
      </svg>
    `;
  }

  valContainer.innerHTML = `
    ${logoHtml}
    <span class="ea-select-text" style="font-size: 13.5px; font-weight: 550; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${state.model}</span>
    <span class="ea-select-status-badge" style="font-size: 11px; font-weight: 550; color: #047857; background: #ECFDF5; padding: 2px 6px; border-radius: 6px; flex-shrink: 0;">Active</span>
  `;
}

function updateChatAgentAvatars() {
  const av1 = document.getElementById('eaChatAgentAvatar1');
  const av2 = document.getElementById('eaChatAgentAvatar2');
  const imgHtml = agentPixelAvatars[state.avatar] || agentPixelAvatars.assistant;
  if (av1) av1.innerHTML = imgHtml;
  if (av2) av2.innerHTML = imgHtml;
}

function updateTerminalEnvironment() {
  const host = state.name.toLowerCase().replace(/\s+/g, '-');
  const termTitle = document.getElementById('eaTerminalTitle');
  if (termTitle) {
    termTitle.textContent = `root@${host}:~`;
  }
}

function updateDesktopTime() {
  const desktopTime = document.getElementById('eaDesktopTime');
  if (desktopTime) {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const dateStr = new Date().toLocaleString('en-US', options);
    desktopTime.textContent = dateStr.replace(',', '');
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function getCurrentTimeStr() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

let terminalTimeoutIds = [];

function runTerminalSimulation() {
  const terminalBody = document.getElementById('eaTerminalBody');
  if (!terminalBody) return;

  terminalTimeoutIds.forEach(id => clearTimeout(id));
  terminalTimeoutIds = [];

  const host = state.name.toLowerCase().replace(/\s+/g, '-');
  const prompt = `root@${host}:~#`;

  const lines = [
    { type: 'input', text: `${prompt} echo "Agent ${state.name} ready"`, delay: 0 },
    { type: 'text', text: `Agent ${state.name} is ready for deployment.`, delay: 500 },
    { type: 'success', text: '[OK] Agent configuration loaded', delay: 1000 },
    { type: 'success', text: '[r] No weak passwords found', delay: 2800 },
    { type: 'success', text: '[r] Firewall is active', delay: 3400 },
    { type: 'warning', text: '[!] 3 suspicious files detected', delay: 4200 },
    { type: 'indent', text: '/usr/bin/oldapp (malware signature detected)', delay: 4800 },
    { type: 'text', text: 'Quarantining file...', delay: 5600 },
    { type: 'success', text: 'File quarantined successfully', delay: 6400 },
    { type: 'text', text: 'Generating report...', delay: 7200 },
    { type: 'info', text: 'Report saved to /var/log/security/report-2025-05-20.log', delay: 8000 },
    { type: 'text', text: 'Scan completed', delay: 8800 },
    { type: 'active-input', text: prompt, delay: 9500 }
  ];

  terminalBody.innerHTML = '';

  lines.forEach((line) => {
    const tid = setTimeout(() => {
      if (line.type === 'input') {
        terminalBody.innerHTML += `<div class="terminal-line"><span class="terminal-prompt">${escapeHtml(prompt)}</span> ${escapeHtml(line.text.replace(prompt, '').trim())}</div>`;
      } else if (line.type === 'text') {
        terminalBody.innerHTML += `<div class="terminal-line">${escapeHtml(line.text)}</div>`;
      } else if (line.type === 'success') {
        terminalBody.innerHTML += `<div class="terminal-line success">${escapeHtml(line.text)}</div>`;
      } else if (line.type === 'warning') {
        terminalBody.innerHTML += `<div class="terminal-line warning">${escapeHtml(line.text)}</div>`;
      } else if (line.type === 'info') {
        terminalBody.innerHTML += `<div class="terminal-line info">${escapeHtml(line.text)}</div>`;
      } else if (line.type === 'indent') {
        terminalBody.innerHTML += `<div class="terminal-line indent">${escapeHtml(line.text)}</div>`;
      } else if (line.type === 'active-input') {
        terminalBody.innerHTML += `<div class="terminal-line active-line"><span class="terminal-prompt">${escapeHtml(line.text)}</span><span class="ea-terminal-cursor"></span></div>`;
      }
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, line.delay);
    terminalTimeoutIds.push(tid);
  });
}
