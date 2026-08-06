import { agentsStore } from './agent-page.js';
import { modelsStore } from './models-store.js';
import { pluginsStore } from './plugins-page.js';
import { SKILLS_CATALOG, getSkillById } from './skills-catalog.js';
import { showToast } from './toast.js';

let createPageCleanupFns = [];

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

    // Reset URL container & active integration button states
    const urlInputContainer = document.getElementById('caUrlInputContainer');
    if (urlInputContainer) {
      urlInputContainer.style.display = 'none';
    }
    const btns = [
      document.getElementById('btnCaIntegrationNotion'),
      document.getElementById('btnCaIntegrationDrive'),
      document.getElementById('btnCaIntegrationGithub'),
      document.getElementById('btnCaIntegrationUrl')
    ];
    btns.forEach(btn => btn?.classList.remove('active'));

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

  // Knowledge Base: URL Input Toggles
  const btnNotion = document.getElementById('btnCaIntegrationNotion');
  const btnDrive = document.getElementById('btnCaIntegrationDrive');
  const btnGithub = document.getElementById('btnCaIntegrationGithub');
  const btnUrl = document.getElementById('btnCaIntegrationUrl');
  const urlInputContainer = document.getElementById('caUrlInputContainer');
  const urlInputLabel = document.getElementById('caUrlInputLabel');
  const urlInputField = document.getElementById('caUrlInputField');
  const urlInputSubmit = document.getElementById('caUrlInputSubmit');

  const integrations = [
    { btn: btnNotion, label: 'Notion Page/Workspace Link', placeholder: 'https://notion.so/...' },
    { btn: btnDrive, label: 'Google Drive File/Folder Link', placeholder: 'https://drive.google.com/...' },
    { btn: btnGithub, label: 'GitHub Repository Link', placeholder: 'https://github.com/...' },
    { btn: btnUrl, label: 'Website URL', placeholder: 'https://example.com' }
  ];

  integrations.forEach(item => {
    item.btn?.addEventListener('click', () => {
      if (!urlInputContainer || !urlInputLabel || !urlInputField) return;
      
      const wasActive = item.btn.classList.contains('active');
      
      // Deactivate all first
      integrations.forEach(x => x.btn?.classList.remove('active'));
      
      if (wasActive) {
        urlInputContainer.style.display = 'none';
      } else {
        item.btn.classList.add('active');
        urlInputLabel.textContent = item.label;
        urlInputField.placeholder = item.placeholder;
        urlInputField.value = '';
        urlInputContainer.style.display = 'block';
        urlInputField.focus();
      }
    });
  });

  urlInputSubmit?.addEventListener('click', () => {
    if (!urlInputField || !urlInputContainer) return;
    const val = urlInputField.value.trim();
    if (val) {
      showToast(`Link added successfully!`, 'success');
      urlInputField.value = '';
      urlInputContainer.style.display = 'none';
      integrations.forEach(x => x.btn?.classList.remove('active'));
    } else {
      showToast(`Please enter a valid link.`, 'error');
    }
  });

  // Avatar Selector Modal/Dropdown logic
  const changeAvatarBtn = document.getElementById('caChangeAvatarBtn');
  const avatarDropdown = document.getElementById('caAvatarDropdown');
  
  // Clean up previous listeners if re-initialized
  for (const fn of createPageCleanupFns) fn();
  createPageCleanupFns = [];

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
  createPageCleanupFns.push(() => document.removeEventListener('click', onDocClickForAvatar));

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
    // Show/hide custom cron input
    const customCronRow = document.getElementById('customCronRow');
    if (customCronRow) {
      customCronRow.style.display = state.schedule === 'custom' ? 'block' : 'none';
    }
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
    showToast('Custom skill creator coming soon.', 'info');
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

    skillsContainer.innerHTML = SKILLS_CATALOG.map((item, idx) => {
      const isLast = idx === SKILLS_CATALOG.length - 1;
      const isSelected = state.skills.includes(item.id);
      return `
        <div class="ca-skill-item" data-skill-id="${item.id}" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: ${isLast ? 'none' : '1px solid #F3F4F6'}; font-family: 'Inter', sans-serif; cursor: pointer; transition: background 0.15s;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="color: ${isSelected ? '#4F46E5' : '#9CA3AF'}; display: flex; align-items: center; transition: color 0.15s;">
              ${item.icon}
            </div>
            <div>
              <h4 style="font-size: 14px; font-weight: 600; color: #111111; margin: 0;">${item.name}</h4>
              <p style="font-size: 12px; color: #6B7280; margin: 2px 0 0 0;">${item.desc}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 11.5px; color: #4B5563; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 9999px; padding: 2px 8px; font-weight: 500;">
              ${item.toolCount} tools
            </span>
            <span style="font-size: 11px; color: #6B7280; background: #F3F4F6; border-radius: 9999px; padding: 2px 8px; font-weight: 500;">
              ${item.category}
            </span>
            <button type="button" class="skill-detail-btn" data-skill-id="${item.id}" style="background: none; border: none; padding: 4px; color: #9CA3AF; cursor: pointer; display: flex; align-items: center; border-radius: 4px; transition: background 0.15s;" title="View details">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
            <span class="skill-toggle-badge" style="font-size: 11.5px; border-radius: 9999px; padding: 2px 8px; font-weight: 550; ${isSelected ? 'color: #047857; background: #ECFDF5;' : 'color: #9CA3AF; background: #F3F4F6;'}">
              ${isSelected ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Toggle skill only on badge click
    skillsContainer.querySelectorAll('.skill-toggle-badge').forEach(badge => {
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        const skillId = badge.closest('.ca-skill-item').dataset.skillId;
        const idx = state.skills.indexOf(skillId);
        if (idx === -1) {
          state.skills.push(skillId);
        } else {
          state.skills.splice(idx, 1);
        }
        renderCreateAgentSkills();
      });
    });

    // Detail button opens modal
    skillsContainer.querySelectorAll('.skill-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const skillId = btn.dataset.skillId;
        showSkillDetailModal(skillId);
      });
    });
  }

  function showSkillDetailModal(skillId) {
    const skill = getSkillById(skillId);
    if (!skill) return;

    const modal = document.createElement('div');
    modal.className = 'skill-detail-modal-overlay';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);';

    const isSelected = state.skills.includes(skill.id);

    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;width:560px;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.15);font-family:'Inter',sans-serif;">
        <div style="padding:24px 24px 0;display:flex;align-items:flex-start;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:40px;height:40px;border-radius:10px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;color:#000000;">${skill.icon}</div>
            <div>
              <div style="display:flex;align-items:center;gap:8px;">
                <h2 style="margin:0;font-size:18px;font-weight:700;color:#111;">${skill.name}</h2>
                <button class="modal-edit-btn" style="background:none;border:none;cursor:pointer;padding:2px;color:#9CA3AF;border-radius:6px;" title="Edit skill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
                </button>
              </div>
              <span style="font-size:12px;color:#6B7280;">${skill.category}</span>
            </div>
          </div>
          <button class="modal-close-btn" style="background:none;border:none;cursor:pointer;padding:4px;color:#9CA3AF;border-radius:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style="padding:16px 24px;">
          <p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 20px 0;">${skill.desc}</p>

          <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">Tools Used</h4>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
            ${skill.tools.map(t => `<span style="font-size:12px;background:#F3F4F6;color:#000000;padding:3px 10px;border-radius:9999px;font-weight:500;">${t}</span>`).join('')}
          </div>

          <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">How It Works</h4>
          <ol style="font-size:13px;color:#374151;margin:0 0 20px 0;padding-left:20px;line-height:1.8;">
            ${skill.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>

          <h4 style="font-size:13px;font-weight:600;color:#111;margin:0 0 8px 0;">Example Uses</h4>
          <ul style="font-size:13px;color:#374151;margin:0 0 20px 0;padding-left:20px;line-height:1.8;">
            ${skill.examples.map(e => `<li style="color:#6B7280;">"${e}"</li>`).join('')}
          </ul>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #F3F4F6;display:flex;justify-content:flex-end;gap:8px;">
          <button class="modal-close-btn" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">Close</button>
          <button class="modal-toggle-btn" style="padding:8px 16px;border-radius:8px;border:none;background:#000000;color:#fff;font-size:13px;font-weight:600;cursor:pointer;">${isSelected ? 'Remove Skill' : 'Add Skill'}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => modal.remove());
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#000');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = '#9CA3AF');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    const editBtn = modal.querySelector('.modal-edit-btn');
    editBtn?.addEventListener('click', () => {
      modal.remove();
      showEditSkillModal(skill);
    });
    editBtn?.addEventListener('mouseenter', () => editBtn.style.color = '#000');
    editBtn?.addEventListener('mouseleave', () => editBtn.style.color = '#9CA3AF');

    modal.querySelector('.modal-toggle-btn').addEventListener('click', () => {
      const idx = state.skills.indexOf(skill.id);
      if (idx === -1) {
        state.skills.push(skill.id);
      } else {
        state.skills.splice(idx, 1);
      }
      modal.remove();
      renderCreateAgentSkills();
    });
  }

  function showEditSkillModal(skill) {
    const modal = document.createElement('div');
    modal.className = 'skill-edit-modal-overlay';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);';

    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;width:560px;max-height:80vh;overflow-y:auto;box-shadow:0 25px 50px rgba(0,0,0,0.15);font-family:'Inter',sans-serif;">
        <div style="padding:24px 24px 0;display:flex;align-items:center;justify-content:space-between;">
          <h2 style="margin:0;font-size:18px;font-weight:700;color:#111;">Edit Skill</h2>
          <button class="modal-close-btn" style="background:none;border:none;cursor:pointer;padding:4px;color:#9CA3AF;border-radius:6px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style="padding:16px 24px;">
          <div style="margin-bottom:16px;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">Name</label>
            <input type="text" class="edit-skill-name" value="${skill.name}" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;">
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">Category</label>
            <input type="text" class="edit-skill-category" value="${skill.category}" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;">
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">Description</label>
            <textarea class="edit-skill-desc" rows="3" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;resize:vertical;">${skill.desc}</textarea>
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">System Prompt</label>
            <textarea class="edit-skill-prompt" rows="4" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;resize:vertical;">${skill.systemPrompt}</textarea>
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">Steps (one per line)</label>
            <textarea class="edit-skill-steps" rows="4" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;resize:vertical;">${skill.steps.join('\n')}</textarea>
          </div>
          <div style="margin-bottom:0;">
            <label style="font-size:13px;font-weight:600;color:#111;display:block;margin-bottom:6px;">Examples (one per line)</label>
            <textarea class="edit-skill-examples" rows="3" style="width:100%;padding:8px 12px;border:1px solid #E5E7EB;border-radius:8px;font-size:14px;color:#111;box-sizing:border-box;resize:vertical;">${skill.examples.join('\n')}</textarea>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #F3F4F6;display:flex;justify-content:flex-end;gap:8px;">
          <button class="modal-cancel-btn" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;">Cancel</button>
          <button class="modal-save-btn" style="padding:8px 16px;border-radius:8px;border:none;background:#000;color:#fff;font-size:13px;font-weight:600;cursor:pointer;">Save Changes</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-cancel-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    modal.querySelector('.modal-save-btn').addEventListener('click', () => {
      skill.name = modal.querySelector('.edit-skill-name').value;
      skill.category = modal.querySelector('.edit-skill-category').value;
      skill.desc = modal.querySelector('.edit-skill-desc').value;
      skill.systemPrompt = modal.querySelector('.edit-skill-prompt').value;
      skill.steps = modal.querySelector('.edit-skill-steps').value.split('\n').filter(s => s.trim());
      skill.examples = modal.querySelector('.edit-skill-examples').value.split('\n').filter(s => s.trim());
      modal.remove();
      renderCreateAgentSkills();
      showToast('Skill updated successfully.', 'success');
    });
  }

  // Subscribe to updates
  const unsubPlugins = pluginsStore.subscribe(() => {
    renderCreateAgentPlugins();
  });
  createPageCleanupFns.push(unsubPlugins);

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
  const unsubModels = modelsStore.subscribe(() => {
    renderModels();
  });
  createPageCleanupFns.push(unsubModels);

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
      showToast('Please enter an agent name.', 'warning');
      return;
    }

    // Get selected plugins (optional - agent can work without plugins)
    const installed = pluginsStore.installed || [];
    const selectedPlugins = installed.filter(p => {
      const checkbox = document.querySelector(`.ca-plugin-item[data-plugin-id="${p.id}"] input[type="checkbox"]`);
      return checkbox && checkbox.checked;
    });

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

    // Call store with plugins
    agentsStore.addAgent({
      name: state.name,
      desc: state.desc,
      status: 'active',
      schedule: scheduleText,
      nextRun: nextRunText,
      model: state.model,
      avatar: state.avatar,
      provider: state.provider,
      skills: state.skills,
      plugins: selectedPlugins.map(p => p.id)
    });

    // Hide Form, Show Agent list
    createAgentPage.style.display = 'none';
    agentPage.style.display = 'flex';
  });
}
