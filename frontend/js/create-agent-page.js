import { agentsStore } from './agent-page.js';
import { modelsStore } from './models-store.js';
import { pluginsStore } from './plugins-page.js';

export function initCreateAgentPage() {
  const createAgentPage = document.getElementById('createAgentPageView');
  const agentPage = document.getElementById('agentPageView');
  const btnOpenForm = document.getElementById('btnOpenCreateAgentForm');
  
  if (!createAgentPage || !btnOpenForm) return;

  // Active form state
  const state = {
    name: '',
    desc: '',
    avatar: 'assistant', // default avatar key
    schedule: 'manual', // manual, hourly, daily, weekly, custom
    skills: [], // array of skill names
    model: 'Zed Pro',
    provider: 'zed-pro'
  };

  // Bind Open Form Button
  btnOpenForm.addEventListener('click', () => {
    // Reset state
    state.name = '';
    state.desc = '';
    state.avatar = 'assistant';
    state.schedule = 'manual';
    state.skills = [];
    state.model = 'Zed Pro';
    state.provider = 'zed-pro';

    // Populate inputs in UI
    document.getElementById('caNameInput').value = '';
    document.getElementById('caDescInput').value = '';
    document.getElementById('caDescCount').textContent = '0/600';
    updateAvatarPreview();
    updateScheduleSelection();
    renderCreateAgentPlugins();
    renderCreateAgentSkills();
    renderModels();

    // Show/Hide Page Views
    agentPage.style.display = 'none';
    createAgentPage.style.display = 'flex';
  });

  // Bind Back & Cancel Buttons
  const backButtons = createAgentPage.querySelectorAll('.btn-ca-back, .btn-ca-cancel');
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      createAgentPage.style.display = 'none';
      agentPage.style.display = 'flex';
    });
  });

  // Form Field: Name
  const nameInput = document.getElementById('caNameInput');
  nameInput?.addEventListener('input', (e) => {
    state.name = e.target.value;
  });

  // Form Field: Description
  const descInput = document.getElementById('caDescInput');
  const descCount = document.getElementById('caDescCount');
  descInput?.addEventListener('input', (e) => {
    state.desc = e.target.value;
    if (descCount) {
      descCount.textContent = `${state.desc.length}/600`;
    }
  });

  // Avatar Selector Modal/Dropdown logic
  const changeAvatarBtn = document.getElementById('caChangeAvatarBtn');
  const avatarDropdown = document.getElementById('caAvatarDropdown');
  
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

  const agentPixelAvatars = {
    security: '<img src="assets/models/security_avatar.png" alt="Security Agent" />',
    research: '<img src="assets/models/research_avatar.png" alt="Research Agent" />',
    coder: '<img src="assets/models/coder_avatar.png" alt="Coder Agent" />',
    finance: '<img src="assets/models/finance_avatar.png" alt="Finance Agent" />',
    social: '<img src="assets/models/social_avatar.png" alt="Social Media Analyst" />',
    assistant: '<img src="assets/models/assistant_avatar.png" alt="Assistant Agent" />'
  };

  function updateAvatarPreview() {
    const previewBox = document.getElementById('caAvatarPreviewBox');
    if (previewBox) {
      previewBox.innerHTML = agentPixelAvatars[state.avatar] || agentPixelAvatars.assistant;
    }
  }

  // Form Field: Schedule Card Selection
  const scheduleCards = createAgentPage.querySelectorAll('.schedule-card');
  scheduleCards.forEach(card => {
    card.addEventListener('click', () => {
      state.schedule = card.dataset.schedule;
      updateScheduleSelection();
    });
  });

  function updateScheduleSelection() {
    scheduleCards.forEach(card => {
      const isSelected = card.dataset.schedule === state.schedule;
      card.classList.toggle('selected', isSelected);
      const dot = card.querySelector('.sched-card-dot');
      if (dot) {
        dot.innerHTML = isSelected ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 10px; height: 10px;"><polyline points="20 6 9 17 4 12" /></svg>' : '';
      }
    });
  }

  // Dynamic rendering of Connected Plugins & Custom Skills
  const pluginsContainer = document.getElementById('caConnectedPluginsList');
  const skillsContainer = document.getElementById('caCustomSkillsList');
  
  // Bind Header Add Button Clicks
  const addPluginBtn = document.getElementById('caAddPluginBtn');
  addPluginBtn?.addEventListener('click', () => {
    const navPlugins = document.getElementById('navPlugins');
    if (navPlugins) {
      // Hide Create Agent page and navigate to Plugins Page
      createAgentPage.style.display = 'none';
      const agentPage = document.getElementById('agentPageView');
      if (agentPage) agentPage.style.display = 'none';
      navPlugins.click();
    }
  });

  const createSkillBtn = document.getElementById('caCreateSkillBtn');
  createSkillBtn?.addEventListener('click', () => {
    alert('Simulation: Open Custom Skill Creator Wizard.');
  });

  function renderCreateAgentPlugins() {
    if (!pluginsContainer) return;
    const installed = pluginsStore.installed || [];

    if (installed.length === 0) {
      pluginsContainer.innerHTML = `
        <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 13.5px; font-family: 'Inter', sans-serif;">
          No apps or plugins connected yet. Click "+ Add Plugin" to link integrations.
        </div>
      `;
      return;
    }

    pluginsContainer.innerHTML = installed.map((item, idx) => {
      const isLast = idx === installed.length - 1;
      return `
        <div class="ca-plugin-item" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: ${isLast ? 'none' : '1px solid #F3F4F6'}; font-family: 'Inter', sans-serif;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${item.logo}" alt="${item.name}" style="width: 32px; height: 32px; object-fit: contain;">
            <div>
              <h4 style="font-size: 14px; font-weight: 600; color: #111111; margin: 0;">${item.name}</h4>
              <p style="font-size: 12px; color: #6B7280; margin: 2px 0 0 0;">${item.desc}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 20px;">
            <span style="font-size: 13px; color: #059669; font-weight: 550; display: flex; align-items: center; gap: 6px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
              Connected
            </span>
            <button type="button" style="background: none; border: none; padding: 0; color: #9CA3AF; cursor: pointer; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button type="button" style="background: none; border: none; padding: 0; color: #9CA3AF; cursor: pointer; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderCreateAgentSkills() {
    if (!skillsContainer) return;
    const defaultCustomSkills = [
      { id: 'research', name: 'Generate Research Report', desc: 'Collect data from multiple sources and create a structured report.', tools: 3 },
      { id: 'competitor', name: 'Competitor Analysis', desc: 'Analyze competitors and generate insights.', tools: 4 },
      { id: 'weekly', name: 'Weekly Summary', desc: 'Summarize key updates and send via email.', tools: 2 }
    ];

    skillsContainer.innerHTML = defaultCustomSkills.map((item, idx) => {
      const isLast = idx === defaultCustomSkills.length - 1;
      return `
        <div class="ca-skill-item" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: ${isLast ? 'none' : '1px solid #F3F4F6'}; font-family: 'Inter', sans-serif;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="color: #9CA3AF; cursor: grab; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
                <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
              </svg>
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 600; color: #111111; margin: 0;">${item.name}</h4>
              <p style="font-size: 12px; color: #6B7280; margin: 2px 0 0 0;">${item.desc}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 11.5px; color: #4B5563; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 9999px; padding: 2px 8px; font-weight: 500;">
              ${item.tools} tools
            </span>
            <span style="font-size: 11.5px; color: #047857; background: #ECFDF5; border-radius: 9999px; padding: 2px 8px; font-weight: 550;">
              Active
            </span>
            <button type="button" style="background: none; border: none; padding: 0; color: #9CA3AF; cursor: pointer; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button type="button" style="background: none; border: none; padding: 0; color: #9CA3AF; cursor: pointer; display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Subscribe to updates
  pluginsStore.subscribe(() => {
    renderCreateAgentPlugins();
  });

  // Form Field: Model Selection Accordion/List
  const modelsListContainer = createAgentPage.querySelector('.ca-models-list');

  function renderModels() {
    if (!modelsListContainer) return;

    const stateModels = modelsStore.getState().models;
    // Filter official models that are connected
    const connectedModels = stateModels.filter(m => m.type === 'official' && m.status === 'connected');

    // If active state.model is not in connectedModels, default to Zed Pro
    const hasActiveModelConnected = connectedModels.some(m => m.name === state.model);
    if (!hasActiveModelConnected && connectedModels.length > 0) {
      const zedProModel = connectedModels.find(m => m.name === 'Zed Pro') || connectedModels[0];
      state.model = zedProModel.name;
      state.provider = zedProModel.provider;
    }

    let html = connectedModels.map(m => {
      const isSelected = m.name === state.model;
      const isZed = m.name === 'Zed Pro';
      
      // Select appropriate logo
      let logoHtml = "";
      if (isZed || (m.logoSrc && m.logoSrc.includes("zed-pro"))) {
        logoHtml = `<img src="assets/models/zed-pro.svg" alt="Zed Pro" style="width: 18px; height: 18px; object-fit: contain; border-radius: 4px;">`;
      } else if (m.logoSrc) {
        logoHtml = `<img src="${m.logoSrc}" alt="${m.name}" style="width: 18px; height: 18px; object-fit: contain; border-radius: 4px;">`;
      } else if (m.logoSvg) {
        logoHtml = m.logoSvg;
      }
      
      return `
        <div class="model-row ${isSelected ? 'selected' : ''}" data-model="${m.name}" data-provider="${m.provider}">
          <div class="model-row-left" style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              ${logoHtml}
              <span class="model-name">${m.name}</span>
            </div>
            <div class="model-radio-dot ${isSelected ? 'active' : ''}"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: auto;">
            ${isZed ? `<span class="model-badge-rec">Recommended</span>` : `<span style="font-size: 11px; color: #6B7280; font-weight: 550;">Connected</span>`}
          </div>
        </div>
      `;
    }).join('');

    // Add Custom Model Button at the end
    html += `
      <div class="model-row-custom" id="caBtnAddCustomModel">
        <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #E5E7EB; color: #4B5563; margin-bottom: 4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <span>Add custom model</span>
      </div>
    `;

    modelsListContainer.innerHTML = html;

    // Bind event listeners to new elements
    const newModelRows = modelsListContainer.querySelectorAll('.model-row');
    newModelRows.forEach(row => {
      row.addEventListener('click', () => {
        state.model = row.dataset.model;
        state.provider = row.dataset.provider;
        updateModelSelection();
      });
    });

    const addCustomBtn = modelsListContainer.querySelector('#caBtnAddCustomModel');
    addCustomBtn?.addEventListener('click', () => {
      // Redirect to models page so they can add custom model there
      const navModel = document.getElementById('navModel');
      if (navModel) navModel.click();
    });
  }

  function updateModelSelection() {
    if (!modelsListContainer) return;
    const rows = modelsListContainer.querySelectorAll('.model-row');
    rows.forEach(row => {
      const isSelected = row.dataset.model === state.model;
      row.classList.toggle('selected', isSelected);
      const radioDot = row.querySelector('.model-radio-dot');
      if (radioDot) {
        radioDot.classList.toggle('active', isSelected);
      }
    });
  }

  // Subscribe to model store changes to update list dynamically
  modelsStore.subscribe(() => {
    renderModels();
  });

  // Step 6: Advanced Settings toggle
  const advHeader = document.getElementById('caAdvHeader');
  const advContent = document.getElementById('caAdvContent');
  advHeader?.addEventListener('click', () => {
    advContent.classList.toggle('open');
    advHeader.querySelector('.ca-adv-chevron').classList.toggle('rotated');
  });

  // Submit Button click
  const btnCreateAgent = document.getElementById('btnCreateAgentSubmit');
  btnCreateAgent?.addEventListener('click', () => {
    if (!state.name.trim()) {
      alert('Please enter an agent name.');
      return;
    }

    // Format schedule text for rendering
    let scheduleText = 'Manual';
    let nextRunText = 'Not scheduled';
    if (state.schedule === 'hourly') {
      scheduleText = 'Hourly';
      nextRunText = 'Next run: in 1 hour';
    } else if (state.schedule === 'daily') {
      scheduleText = 'Daily at 9:00 AM';
      nextRunText = 'Next run: Tomorrow, 9:00 AM';
    } else if (state.schedule === 'weekly') {
      scheduleText = 'Weekly on Monday';
      nextRunText = 'Next run: Monday, 9:00 AM';
    } else if (state.schedule === 'custom') {
      scheduleText = 'Custom Schedule';
      nextRunText = 'Next run: Pending';
    }

    // Call store
    agentsStore.addAgent({
      name: state.name,
      desc: state.desc,
      status: 'active',
      schedule: scheduleText,
      nextRun: nextRunText,
      model: state.model,
      avatar: state.avatar,
      provider: state.provider
    });

    // Hide Form, Show Agent list
    createAgentPage.style.display = 'none';
    agentPage.style.display = 'flex';
  });
}
