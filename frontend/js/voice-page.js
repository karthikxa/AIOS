const agentPixelAvatars = {
  security: `<img src="assets/models/security_avatar.png" alt="Security Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  research: `<img src="assets/models/research_avatar.png" alt="Research Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  coder: `<img src="assets/models/coder_avatar.png" alt="Coder Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  finance: `<img src="assets/models/finance_avatar.png" alt="Finance Agent" style="width: 100%; height: 100%; object-fit: cover;">`,
  social: `<img src="assets/models/social_avatar.png" alt="Social Media Analyst" style="width: 100%; height: 100%; object-fit: cover;">`,
  assistant: `<img src="assets/models/assistant_avatar.png" alt="Assistant Agent" style="width: 100%; height: 100%; object-fit: cover;">`
};

const defaultVoiceAgents = [
  {
    id: "voice-agent-supp",
    name: "Support Specialist",
    desc: "Resolves customer inquiries, checks orders, and logs tickets.",
    status: "active",
    phone: "+1 (415) 555-0199",
    region: "United States",
    scriptFile: "Support_Script.txt",
    updatedTime: "updated 2 hours ago",
    avatar: "assistant",
    scriptText: "Hello! Thank you for calling Customer Support. My name is support specialist, how can I help you with your order today?"
  },
  {
    id: "voice-agent-qual",
    name: "Inbound Lead Qualifier",
    desc: "Qualifies inbound sales leads and schedules live demos.",
    status: "active",
    phone: "+1 (650) 555-0142",
    region: "United States",
    scriptFile: "Sales_Qual_v2.txt",
    updatedTime: "updated 1 day ago",
    avatar: "finance",
    scriptText: "Hi there! I saw you requested details about our enterprise solutions. Let's ask a few brief qualification questions."
  },
  {
    id: "voice-agent-out",
    name: "Outbound Trial Followup",
    desc: "Follows up on expired product trials and gathers customer feedback.",
    status: "paused",
    phone: "+44 20 7946 0958",
    region: "United Kingdom",
    scriptFile: "Trial_Followup.txt",
    updatedTime: "updated 3 days ago",
    avatar: "social",
    scriptText: "Hello, this is Outbound Trial Followup calling from the product team. We noticed your trial expired last week and wanted to check in."
  },
  {
    id: "voice-agent-bill",
    name: "Billing Assistant",
    desc: "Handles card updates, invoices, and generic billing questions.",
    status: "inactive",
    phone: "+1 (800) 555-0123",
    region: "United States",
    scriptFile: "Billing_Flow.txt",
    updatedTime: "updated 1 week ago",
    avatar: "security",
    scriptText: "Welcome! To verify your billing query, please confirm the last 4 digits of your active card details."
  }
];

class VoiceAgentsStore {
  constructor() {
    this.agents = [...defaultVoiceAgents];
    this.filter = "all";
    this.searchQuery = "";
    this.selectedAgentId = "voice-agent-supp"; // default selected
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

  selectAgent(id) {
    this.selectedAgentId = id;
    this.notify();
  }

  toggleAgentStatus(id) {
    const agent = this.agents.find(a => a.id === id);
    if (agent) {
      if (agent.status === "active") {
        agent.status = "paused";
      } else if (agent.status === "paused") {
        agent.status = "inactive";
      } else {
        agent.status = "active";
      }
      this.notify();
    }
  }

  deleteAgent(id) {
    this.agents = this.agents.filter(a => a.id !== id);
    if (this.selectedAgentId === id) {
      this.selectedAgentId = this.agents.length > 0 ? this.agents[0].id : null;
    }
    this.notify();
  }

  updateAgentScript(id, scriptFile, scriptText) {
    const agent = this.agents.find(a => a.id === id);
    if (agent) {
      agent.scriptFile = scriptFile;
      agent.scriptText = scriptText;
      agent.updatedTime = "updated just now";
      this.notify();
    }
  }

  addAgent(data) {
    const id = `voice-agent-${Date.now()}`;
    const agent = {
      id,
      name: data.name || 'New Voice Agent',
      desc: data.desc || '',
      status: data.status || 'active',
      phone: data.phone || '+1 (555) 000-0000',
      region: data.region || 'United States',
      scriptFile: data.scriptFile || 'script.txt',
      updatedTime: "updated just now",
      avatar: data.avatar || 'assistant',
      scriptText: data.scriptText || 'Hi, how can I help you today?'
    };
    this.agents.push(agent);
    this.selectedAgentId = id;
    this.notify();
    return agent;
  }
}

export const voiceAgentsStore = new VoiceAgentsStore();

export function initVoicePage() {
  const listWrapper = document.getElementById('voiceListWrapper');
  if (!listWrapper) return;

  const btnOpenModal = document.getElementById('btnOpenCreateVoiceModal');
  const modalOverlay = document.getElementById('createVoiceModalOverlay');
  const btnCloseModal = document.getElementById('btnCloseVoiceModal');
  const btnCancelCreate = document.getElementById('btnCancelVoiceCreate');
  const createForm = document.getElementById('createVoiceAgentForm');
  const filterPills = document.querySelectorAll('.voice-filter-pill');
  const btnExplore = document.getElementById('btnVoiceExplore');

  const textareaInput = document.getElementById('voiceTextareaInput');
  const charCounter = document.getElementById('voiceCharCount');
  const btnSaveData = document.getElementById('btnVoiceSaveData');
  
  const dropzone = document.getElementById('voiceUploadDropzone');
  const fileInput = document.getElementById('voiceFileInput');

  // Textarea input char counter
  if (textareaInput && charCounter) {
    textareaInput.addEventListener('input', () => {
      const len = textareaInput.value.length;
      charCounter.textContent = `${len}/5000`;
    });
  }

  // Save Data binding
  if (btnSaveData && textareaInput) {
    btnSaveData.addEventListener('click', () => {
      const agentId = voiceAgentsStore.selectedAgentId;
      if (!agentId) {
        showToast("Please select a voice agent first by clicking on a row.", 'warning');
        return;
      }
      const text = textareaInput.value;
      const agent = voiceAgentsStore.agents.find(a => a.id === agentId);
      const filename = agent ? agent.scriptFile : "script.txt";
      voiceAgentsStore.updateAgentScript(agentId, filename, text);
      showToast("Script data saved successfully for " + (agent ? agent.name : "Agent") + "!", 'success');
    });
  }

  // File dropzone trigger click
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        handleFileUpload(file);
      }
    });

    // Drag-drop events
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
      }
    });
  }

  function handleFileUpload(file) {
    const agentId = voiceAgentsStore.selectedAgentId;
    if (!agentId) {
      showToast("Please select a voice agent first.", 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      const text = event.target.result;
      if (textareaInput) {
        textareaInput.value = text;
        const len = text.length;
        if (charCounter) charCounter.textContent = `${len}/5000`;
      }
      voiceAgentsStore.updateAgentScript(agentId, file.name, text);
      showToast(`File "${file.name}" uploaded and saved successfully!`, 'success');
    };
    reader.readAsText(file);
  }

  // Modal open/close
  if (btnOpenModal && modalOverlay) {
    btnOpenModal.addEventListener('click', () => {
      modalOverlay.style.display = 'flex';
    });
  }

  const hideModal = () => {
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
      if (createForm) createForm.reset();
    }
  };

  if (btnCloseModal) btnCloseModal.addEventListener('click', hideModal);
  if (btnCancelCreate) btnCancelCreate.addEventListener('click', hideModal);

  // Form submit
  if (createForm) {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vName').value;
      const desc = document.getElementById('vDesc').value;
      const phone = document.getElementById('vPhone').value;
      const region = document.getElementById('vRegion').value;
      const scriptFile = document.getElementById('vScript').value;
      const status = document.getElementById('vStatus').value;
      const avatar = document.getElementById('vAvatar').value;

      voiceAgentsStore.addAgent({
        name,
        desc,
        phone,
        region,
        scriptFile,
        status,
        avatar,
        scriptText: `Hello! I am ${name}, your voice assistant. How can I help you today?`
      });

      hideModal();
    });
  }

  // Filter Pills binding
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      voiceAgentsStore.setFilter(pill.getAttribute('data-filter'));
    });
  });

  // Explore button to plugins page
  if (btnExplore) {
    btnExplore.addEventListener('click', () => {
      const navPlugins = document.getElementById('navPlugins');
      if (navPlugins) navPlugins.click();
    });
  }

  // Subscribe to updates
  voiceAgentsStore.subscribe((store) => {
    renderVoiceAgentsList(store);
    updateBottomPanelForSelection(store);
  });

  // First render
  renderVoiceAgentsList(voiceAgentsStore);
  updateBottomPanelForSelection(voiceAgentsStore);
}

function updateBottomPanelForSelection(store) {
  const agentId = store.selectedAgentId;
  const textareaInput = document.getElementById('voiceTextareaInput');
  const charCounter = document.getElementById('voiceCharCount');
  
  if (!agentId) {
    if (textareaInput) textareaInput.value = "";
    if (charCounter) charCounter.textContent = "0/5000";
    return;
  }

  const agent = store.agents.find(a => a.id === agentId);
  if (agent && textareaInput) {
    // Fill the textarea with the selected agent's script text
    textareaInput.value = agent.scriptText || "";
    const len = textareaInput.value.length;
    if (charCounter) charCounter.textContent = `${len}/5000`;
  }
}

function renderVoiceAgentsList(store) {
  const listWrapper = document.getElementById('voiceListWrapper');
  if (!listWrapper) return;

  const { agents, filter, searchQuery, selectedAgentId } = store;

  // Filter List
  const filtered = agents.filter(a => {
    // 1. Search Query
    if (searchQuery) {
      const matchName = a.name.toLowerCase().includes(searchQuery);
      const matchDesc = a.desc.toLowerCase().includes(searchQuery);
      if (!matchName && !matchDesc) return false;
    }

    // 2. Status Pills
    if (filter !== "all") {
      if (filter === "favorites") {
        // default mockup has no favorites, but can return empty
        return false;
      }
      if (a.status !== filter) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    listWrapper.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #6F6F6F; font-size: 14.5px; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 20px;">
        No voice agents found matching the selected filters.
      </div>
    `;
    return;
  }

  listWrapper.innerHTML = filtered.map((agent) => {
    const isSelected = agent.id === selectedAgentId;
    const isAct = agent.status === "active";
    
    // Status color
    let statusClass = "inactive";
    if (agent.status === "active") statusClass = "active";
    else if (agent.status === "paused") statusClass = "paused";
    else if (agent.status === "draft") statusClass = "draft";
    else if (agent.status === "archived") statusClass = "archived";

    const pixelAvatar = agentPixelAvatars[agent.avatar] || agentPixelAvatars.assistant;
    
    // Custom style if selected row
    const selectedStyle = isSelected ? 'border-color: #5B8AFF; background-color: rgba(91, 138, 255, 0.02);' : '';

    return `
      <div class="voice-agent-row" id="voice-row-${agent.id}" style="${selectedStyle} cursor: pointer;">
        
        <!-- Left Section: Avatar, Name & Description -->
        <div class="voice-agent-main-col">
          <div class="voice-agent-avatar-box">
            ${pixelAvatar}
          </div>
          <div class="voice-agent-text-info">
            <h3 class="voice-agent-name">${agent.name}</h3>
            <p class="voice-agent-desc">${agent.desc}</p>
          </div>
        </div>

        <!-- Status Column -->
        <div class="voice-agent-status-col">
          <div class="voice-status-badge ${statusClass}">
            <span class="voice-status-dot"></span>
            <span>${agent.status}</span>
          </div>
        </div>

        <!-- Phone Column -->
        <div class="voice-agent-phone-col">
          <div class="voice-phone-number-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81 7A2 2 0 0 1 22 16.92z"/></svg>
            <span>${agent.phone}</span>
          </div>
          <span class="voice-phone-region">${agent.region}</span>
        </div>

        <!-- File Column -->
        <div class="voice-agent-file-col">
          <div class="voice-file-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${agent.scriptFile}</span>
          </div>
          <span class="voice-file-time">${agent.updatedTime}</span>
        </div>

        <!-- Actions Column -->
        <div class="voice-agent-actions-col">
          <button class="btn-voice-row-options" data-id="${agent.id}" aria-label="Voice agent options">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>

      </div>
    `;
  }).join('');

  bindVoiceRowEvents();
}

function bindVoiceRowEvents() {
  const rows = document.querySelectorAll('.voice-agent-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const id = row.id.replace('voice-row-', '');
      voiceAgentsStore.selectAgent(id);
    });
  });

  const optionsBtns = document.querySelectorAll('.btn-voice-row-options');
  optionsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleVoiceRowMenu(btn, id);
    });
  });
}

function toggleVoiceRowMenu(triggerBtn, id) {
  let menu = document.getElementById('zedVoiceRowMenu');
  if (menu) {
    const existingId = menu.getAttribute('data-id');
    menu.remove();
    if (existingId === id) return;
  }

  const agent = voiceAgentsStore.agents.find(a => a.id === id);
  if (!agent) return;

  menu = document.createElement('div');
  menu.id = 'zedVoiceRowMenu';
  menu.setAttribute('data-id', id);
  menu.style.cssText = `
    position: absolute;
    background: #FFFFFF;
    border: 1px solid #EAEAEA;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    padding: 6px;
    min-width: 140px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'Inter', sans-serif;
  `;

  const rect = triggerBtn.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 6}px`;
  menu.style.left = `${rect.right - 140 + window.scrollX}px`;

  menu.innerHTML = `
    <button class="voice-menu-item" data-action="toggle-status" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #111111; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      Cycle Status
    </button>
    <button class="voice-menu-item" data-action="delete" style="
      background: none; border: none; text-align: left; padding: 8px 12px; font-size: 13px; color: #E11D48; cursor: pointer; border-radius: 8px; font-weight: 550; font-family: inherit; width: 100%;
    ">
      Delete Agent
    </button>
  `;

  document.body.appendChild(menu);

  const items = menu.querySelectorAll('.voice-menu-item');
  items.forEach(btnEl => {
    btnEl.addEventListener('mouseenter', () => {
      const action = btnEl.getAttribute('data-action');
      btnEl.style.backgroundColor = action === 'delete' ? '#FFF5F5' : '#FAFAFA';
    });
    btnEl.addEventListener('mouseleave', () => {
      btnEl.style.backgroundColor = 'transparent';
    });

    btnEl.addEventListener('click', async (e) => {
      e.stopPropagation();
      const action = btnEl.getAttribute('data-action');
      if (action === "toggle-status") {
        voiceAgentsStore.toggleAgentStatus(id);
      } else if (action === "delete") {
        if (await confirmDialog(`Are you sure you want to delete ${agent.name}?`)) {
          voiceAgentsStore.deleteAgent(id);
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
