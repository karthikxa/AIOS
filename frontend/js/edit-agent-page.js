import { agentsStore } from './agent-page.js';
import { modelsStore } from './models-store.js';
import { pluginsStore } from './plugins-page.js';

let currentEditingAgentId = null;
const state = {
  name: '',
  desc: '',
  avatar: 'assistant',
  status: 'active',
  model: 'Zed Pro',
  provider: 'zed-pro'
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
  
  changeAvatarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (avatarDropdown && !avatarDropdown.contains(e.target) && e.target !== changeAvatarBtn) {
      avatarDropdown.classList.remove('show');
    }
  });

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

  document.addEventListener('click', (e) => {
    if (primaryModelDropdown && !primaryModelDropdown.contains(e.target) && e.target !== primaryModelTrigger) {
      primaryModelDropdown.style.display = 'none';
    }
  });

  // Save changes button logic
  const btnSave = document.getElementById('btnEditAgentSave');
  btnSave?.addEventListener('click', () => {
    if (!state.name.trim()) {
      alert('Please enter an agent name.');
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
    const desktopWorkspaces = document.getElementById('eaDesktopWorkspaces')?.value || 'c:\\Users\\balur\\Downloads\\AVDE';
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
      schedule: agent.schedule || 'Manual'
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
    alert('Simulation: Open Custom Skill Creator Wizard.');
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
  pluginsStore.subscribe(() => {
    if (editPage.style.display === 'flex') {
      renderEditAgentPlugins();
    }
  });

  modelsStore.subscribe(() => {
    if (editPage.style.display === 'flex') {
      renderModels();
    }
  });
}

export function openEditAgentPage(agentId) {
  const editPage = document.getElementById('editAgentPageView');
  const agentPage = document.getElementById('agentPageView');
  if (!editPage || !agentPage) return;

  const agent = agentsStore.agents.find(a => a.id === agentId);
  if (!agent) return;

  currentEditingAgentId = agentId;
  state.name = agent.name;
  state.desc = agent.desc;
  state.avatar = agent.avatar;
  state.status = agent.status;
  state.model = agent.model;
  state.provider = agent.provider || 'openai';

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
  if (desktopDir) desktopDir.value = agent.desktopWorkspaces || "c:\\Users\\balur\\Downloads\\AVDE";

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
      logoHtml = `<img src="${currentModel.logoSrc}" alt="${state.model}" style="width: 16px; height: 16px; object-fit: contain; border-radius: 3px;" />`;
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
        <span>${state.model}</span>
      </div>
    `;
  }

  if (oSchedule) oSchedule.textContent = agent.schedule || 'Manual';
  if (oDesc) oDesc.textContent = state.desc || 'No description provided.';
  
  if (oCreated) oCreated.textContent = agent.created || "May 12, 2025";
  if (oLastUpdated) oLastUpdated.textContent = agent.lastUpdated || "May 20, 2025";
}

function getAgentActivityData(avatarKey) {
  if (avatarKey === 'security') {
    return {
      metrics: [
        { label: 'Tasks Executed', value: '128', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Successful', value: '112', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Failed', value: '16', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Success Rate', value: '87.5%', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Avg. Response Time', value: '2.4s', sub: 'vs May 7 - May 13, 2025' }
      ],
      chartPoints: [25, 40, 50, 33, 55, 61, 37],
      tableRows: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
          title: 'Threat Detected',
          subtitle: 'Malware signature detected in /usr/bin/oldapp',
          type: 'Security Scan',
          status: 'High',
          statusClass: 'high',
          details: 'Quarantined file and notified admin',
          time: '2 minutes ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
          title: 'Vulnerability Scan Completed',
          subtitle: 'Scanned 142 packages',
          type: 'Vulnerability Scan',
          status: 'Success',
          statusClass: 'success',
          details: '3 vulnerabilities found',
          time: '15 minutes ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
          title: 'Security Rules Updated',
          subtitle: 'Updated intrusion detection rules',
          type: 'Configuration',
          status: 'Success',
          statusClass: 'success',
          details: 'Added 12 new rules',
          time: '1 hour ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
          title: 'System Backup Verified',
          subtitle: 'Daily backup integrity check',
          type: 'System',
          status: 'Success',
          statusClass: 'success',
          details: 'All files verified successfully',
          time: '3 hours ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
          title: 'Admin Login',
          subtitle: 'User admin@company.com logged in',
          type: 'Access',
          status: 'Success',
          statusClass: 'success',
          details: 'IP: 192.168.1.45',
          time: '5 hours ago'
        }
      ]
    };
  } else if (avatarKey === 'coder') {
    return {
      metrics: [
        { label: 'Tasks Executed', value: '412', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Successful', value: '394', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Failed', value: '18', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Success Rate', value: '95.6%', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Avg. Response Time', value: '1.8s', sub: 'vs May 7 - May 13, 2025' }
      ],
      chartPoints: [45, 62, 58, 70, 64, 78, 72],
      tableRows: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
          title: 'Automated Review Completed',
          subtitle: 'PR Review completed for styling fixes',
          type: 'PR Review',
          status: 'Success',
          statusClass: 'success',
          details: 'PR #102: 2 suggestions written',
          time: '4 minutes ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
          title: 'Workspace Index Completed',
          subtitle: 'Indexed workspace JS files',
          type: 'Workspace Index',
          status: 'Success',
          statusClass: 'success',
          details: 'Indexed 15 files in workspace',
          time: '1 hour ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
          title: 'Codebase Scan completed',
          subtitle: 'Linter rules verification',
          type: 'Linter',
          status: 'Warning',
          statusClass: 'warning',
          details: '4 unused variables found',
          time: '2 hours ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`,
          title: 'Branch Merged',
          subtitle: 'Merged remote repository branch',
          type: 'Git Merge',
          status: 'Success',
          statusClass: 'success',
          details: 'Merged main branch into dev',
          time: '4 hours ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>`,
          title: 'Auto-Commit pushed',
          subtitle: 'Automatic formatting push to GitHub',
          type: 'Git Commit',
          status: 'Success',
          statusClass: 'success',
          details: 'Pushed styling fixes to main',
          time: '6 hours ago'
        }
      ]
    };
  } else {
    return {
      metrics: [
        { label: 'Tasks Executed', value: '180', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Successful', value: '168', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Failed', value: '12', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Success Rate', value: '93.3%', sub: 'vs May 7 - May 13, 2025' },
        { label: 'Avg. Response Time', value: '2.8s', sub: 'vs May 7 - May 13, 2025' }
      ],
      chartPoints: [30, 45, 42, 50, 48, 55, 50],
      tableRows: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
          title: 'Sync Executed Successfully',
          subtitle: 'Database caching clean-up completed',
          type: 'System clean',
          status: 'Success',
          statusClass: 'success',
          details: 'Removed expired temp files from database',
          time: '3 hours ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
          title: 'Inbox Sync Complete',
          subtitle: 'Sync emails with external providers',
          type: 'Email scan',
          status: 'Success',
          statusClass: 'success',
          details: 'Checked mail folder: 0 new alerts',
          time: '5 hours ago'
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
          title: 'Backup generated',
          subtitle: 'Workspace daily backup routine',
          type: 'System backup',
          status: 'Success',
          statusClass: 'success',
          details: 'All data files saved successfully',
          time: '8 hours ago'
        }
      ]
    };
  }
}

function renderActivityTimeline(avatarKey) {
  const cardsContainer = document.getElementById('eaMetricCards');
  const chartContainer = document.getElementById('eaChartContainer');
  const tableBody = document.getElementById('eaActivityTableBody');

  if (!cardsContainer || !chartContainer || !tableBody) return;

  const data = getAgentActivityData(avatarKey);

  // 1. Render Metrics Cards
  cardsContainer.innerHTML = data.metrics.map(m => `
    <div class="ea-metric-card">
      <h4 class="ea-metric-card-title">${m.label}</h4>
      <div class="ea-metric-card-value">${m.value}</div>
      <p class="ea-metric-card-sub">${m.sub}</p>
    </div>
  `).join('');

  // 2. Render SVG Line Chart
  const pts = data.chartPoints;
  const width = 680;
  const height = 140;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 20;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const stepX = chartW / 6;

  // Generate path points (Y-axis range is 0 to 80)
  const pointsCoords = pts.map((val, idx) => {
    const x = paddingLeft + idx * stepX;
    const y = paddingTop + chartH - (val / 80) * chartH;
    return { x, y, val };
  });

  const linePath = pointsCoords.map((p, idx) => {
    return `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(' ');

  const areaPath = `
    ${linePath} 
    L ${pointsCoords[pointsCoords.length - 1].x.toFixed(1)} ${(height - paddingBottom).toFixed(1)} 
    L ${pointsCoords[0].x.toFixed(1)} ${(height - paddingBottom).toFixed(1)} Z
  `;

  // Draw grid lines
  const gridLines = [0, 20, 40, 60, 80].map(val => {
    const y = paddingTop + chartH - (val / 80) * chartH;
    return `
      <g>
        <text x="5" y="${y + 4}" fill="#9CA3AF" font-size="10" font-family="'Inter', sans-serif" text-anchor="start">${val}</text>
        <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="#F3F4F6" stroke-width="1.2" />
      </g>
    `;
  }).join('');

  // Draw X labels
  const days = ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'];
  const xLabels = pointsCoords.map((p, idx) => `
    <text x="${p.x}" y="${height - 2}" fill="#9CA3AF" font-size="10" font-family="'Inter', sans-serif" text-anchor="middle">${days[idx]}</text>
  `).join('');

  // Draw circles at data points
  const circles = pointsCoords.map(p => `
    <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#4B5563" stroke="#FFFFFF" stroke-width="1.5" />
  `).join('');

  chartContainer.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
      <defs>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#9CA3AF" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#9CA3AF" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <!-- Grid -->
      ${gridLines}
      <!-- Gradient Fill -->
      <path d="${areaPath}" fill="url(#chartAreaGrad)" />
      <!-- Line Path -->
      <path d="${linePath}" fill="none" stroke="#4B5563" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Data Points Circles -->
      ${circles}
      <!-- X labels -->
      ${xLabels}
    </svg>
  `;

  // 3. Render Table Rows
  tableBody.innerHTML = data.tableRows.map(r => `
    <tr style="border-bottom: 1px solid #F3F4F6;">
      <td style="padding: 12px 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: #FAFBFC; border: 1px solid #E5E7EB; border-radius: 6px; color: #4B5563; flex-shrink: 0;">
            ${r.icon}
          </div>
          <div style="display: flex; flex-direction: column; overflow: hidden;">
            <span style="font-size: 13.5px; font-weight: 600; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.title}</span>
            <span style="font-size: 11.5px; color: #6B7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;">${r.subtitle}</span>
          </div>
        </div>
      </td>
      <td style="padding: 12px 16px; font-size: 13px; color: #4B5563;">${r.type}</td>
      <td style="padding: 12px 16px;">
        <span class="ea-status-pill ${r.statusClass}">${r.status}</span>
      </td>
      <td style="padding: 12px 16px; font-size: 13px; color: #4B5563;">${r.details}</td>
      <td style="padding: 12px 16px; font-size: 13px; color: #6B7280; white-space: nowrap;">${r.time}</td>
      <td style="padding: 12px 16px; text-align: right;">
        <button type="button" style="background: none; border: none; padding: 0; color: #9CA3AF; cursor: pointer; display: inline-flex; align-items: center;" aria-label="Row options">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </td>
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
            <img src="${item.logo}" alt="${item.name}">
          </div>
          <div class="ea-item-name">${item.name}</div>
        </div>
        <div class="ea-item-desc">${item.desc}</div>
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

  const defaultCustomSkills = [
    { id: 'research', name: 'Generate Research Report', desc: 'Collect data from multiple sources and create a structured report.', tools: 3 },
    { id: 'competitor', name: 'Competitor Analysis', desc: 'Analyze competitors and generate insights.', tools: 4 },
    { id: 'weekly', name: 'Weekly Summary', desc: 'Summarize key updates and send via email.', tools: 2 }
  ];

  container.innerHTML = defaultCustomSkills.map((item) => {
    return `
      <div class="ea-list-item-row">
        <div class="ea-item-left-col">
          <div class="ea-item-drag-handle" style="margin-right: 4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
              <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
            </svg>
          </div>
          <div class="ea-item-name">${item.name}</div>
        </div>
        <div class="ea-item-desc">${item.desc}</div>
        <div class="ea-item-right-actions">
          <span class="ea-badge-tools">${item.tools} tools</span>
          <span class="ea-badge-active">Active</span>
          <button type="button" class="ea-item-chevron-btn" aria-label="Configure skill">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button type="button" class="ea-item-dots-btn" aria-label="Skill options">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
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
      logoHtml = `<img src="${m.logoSrc}" alt="${m.name}" style="width: 18px; height: 18px; object-fit: contain; border-radius: 4px; flex-shrink: 0;">`;
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
          <span style="font-size: 13.5px; font-weight: 550; color: #111827; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.name}</span>
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
    { type: 'input', text: `${prompt} scan --all`, delay: 0 },
    { type: 'text', text: 'Scanning system...', delay: 800 },
    { type: 'text', text: 'Checking for vulnerabilities...', delay: 1500 },
    { type: 'success', text: '[r] System packages are up to date', delay: 2200 },
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
