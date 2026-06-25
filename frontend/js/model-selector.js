import { modelsStore } from './models-store.js';

// Model Selector Dropdown functionality
export function initModelSelector(onModelChange) {
  const modelTriggerBtn = document.getElementById('modelTriggerBtn');
  const modelDropdownContainer = document.getElementById('modelDropdownContainer');
  const modelSearchInput = document.getElementById('modelSearchInput');
  const modelOptionsList = document.getElementById('modelOptionsList');
  const activeModelName = document.getElementById('activeModelName');
  const secondaryFlyoutPanel = document.getElementById('secondaryFlyoutPanel');

  let activeModel = modelsStore.getState().activeModel || "GPT-4o";
  let lastNotifiedModel = activeModel;

  // Toggle main dropdown or trigger connection wizard if disconnected
  if (modelTriggerBtn && modelDropdownContainer) {
    modelTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const state = modelsStore.getState();
      const modelObj = state.models.find(m => m.name === activeModel || m.id === activeModel);
      const isConnected = modelObj ? modelObj.status === 'connected' : false;

      if (modelObj && !isConnected) {
        // Redirect to Models page
        const navModel = document.getElementById('navModel');
        if (navModel) {
          navModel.click();
        }
      } else {
        const isOpen = modelDropdownContainer.classList.contains('show');
        closeAllDropdowns();
        if (!isOpen) {
          if (modelSearchInput) {
            modelSearchInput.value = '';
          }
          renderOptions();
          modelDropdownContainer.classList.add('show');
        }
      }
    });
  }

  // Close dropdowns on clicking outside
  document.addEventListener('click', (e) => {
    if (modelDropdownContainer && !modelDropdownContainer.contains(e.target) && e.target !== modelTriggerBtn) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    if (modelDropdownContainer) modelDropdownContainer.classList.remove('show');
    if (secondaryFlyoutPanel) secondaryFlyoutPanel.classList.remove('show');
  }

  let remainingModelsCount = 0;

  function getModelHtml(m) {
    const isSel = m.name === activeModel || m.id === activeModel;
    const isConnected = m.status === 'connected';
    let logoHtml = '';
    if (m.name.toLowerCase().includes('gemini')) {
      logoHtml = `
        <svg class="logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; flex-shrink: 0; margin-right: 8px;">
          <defs>
            <linearGradient id="geminiSparkleGradOpt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF5B5B" />
              <stop offset="30%" stop-color="#FFC837" />
              <stop offset="70%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#10B981" />
            </linearGradient>
          </defs>
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="url(#geminiSparkleGradOpt)"/>
        </svg>
      `;
    } else if (m.logoSrc) {
      logoHtml = `<img class="logo" src="${m.logoSrc}" alt="${m.name}">`;
    } else if (m.logoSvg) {
      logoHtml = m.logoSvg;
    } else {
      logoHtml = `<svg class="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:#64748B;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
    }

    return `
      <div class="model-option-item ${isSel ? 'selected' : ''}" data-model="${m.name}" data-model-id="${m.id}" data-connected="${isConnected}">
        <div class="model-option-left">
          ${logoHtml}
          <span class="model-name">${m.name}</span>
          ${m.badge ? `<span class="model-tag">${m.badge}</span>` : ''}
        </div>
        <div class="model-option-right">
          ${isConnected ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="checkmark"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
        </div>
      </div>
    `;
  }

  function renderOptions() {
    if (!modelOptionsList || !secondaryFlyoutPanel) return;

    const state = modelsStore.getState();
    const allModels = state.models.filter(m => m.type !== 'provider' && m.status === 'connected');

    if (allModels.length === 0) {
      modelOptionsList.innerHTML = `<div style="padding:12px;color:var(--text-secondary);font-size:13px;text-align:center;">No models connected.</div>`;
      secondaryFlyoutPanel.innerHTML = '';
      secondaryFlyoutPanel.classList.remove('show');
      remainingModelsCount = 0;
      return;
    }

    const firstFive = allModels.slice(0, 5);
    const remaining = allModels.slice(5);
    remainingModelsCount = remaining.length;

    // 1. Build main options list (with "More models" trigger at top)
    let mainHtml = '';
    if (remaining.length > 0) {
      mainHtml += `
        <div class="model-dropdown-flyout" id="flyoutTrigger" style="display:flex;align-items:center;justify-content:space-between;padding:8px var(--space-sm);border-radius:10px;cursor:pointer;transition:var(--transition-smooth);margin-bottom:4px;">
          <div class="flyout-left">
            <span class="model-name">More models</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron" style="color:#8E8E93;"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;
    }

    mainHtml += firstFive.map(getModelHtml).join('');
    modelOptionsList.innerHTML = mainHtml;

    // 2. Build remaining models flyout panel
    if (remaining.length > 0) {
      secondaryFlyoutPanel.innerHTML = `
        <div class="secondary-flyout-models-list" style="display:flex; flex-direction:column; gap:4px; max-height:220px; overflow-y:auto; padding-right:4px;">
          ${remaining.map(getModelHtml).join('')}
        </div>
        <div class="divider" style="margin: 8px 0; border-top: 1px solid rgba(0,0,0,0.06);"></div>
        <div class="flyout-option-item" id="askForModelBtn" data-action="custom-model" style="display:flex;align-items:center;justify-content:space-between;padding:8px var(--space-sm);border-radius:10px;cursor:pointer;transition:var(--transition-smooth);font-size:14px;font-weight:500;color:var(--text);">
          <div class="flyout-option-left" style="display:flex;align-items:center;gap:var(--space-sm);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="question-chat" style="color:#64748B;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="12" cy="10" r="1"/><path d="M12 14v.01"/></svg>
            <span>Ask for a model</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron" style="color:#8E8E93;"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;
    } else {
      secondaryFlyoutPanel.innerHTML = '';
      secondaryFlyoutPanel.classList.remove('show');
    }

    // 3. Bind Flyout Trigger click behavior
    const flyoutTrigger = modelOptionsList.querySelector('#flyoutTrigger');
    if (flyoutTrigger) {
      flyoutTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        secondaryFlyoutPanel.classList.toggle('show');
      });
    }

    // 4. Bind Ask for model button
    const askForModelBtn = secondaryFlyoutPanel.querySelector('#askForModelBtn');
    if (askForModelBtn) {
      askForModelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        const navModel = document.getElementById('navModel');
        if (navModel) {
          navModel.click();
        }
      });
    }

    bindOptionClicks();
  }

  function bindOptionClicks() {
    const items = modelDropdownContainer.querySelectorAll('.model-option-item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const modelName = item.getAttribute('data-model');
        const modelId = item.getAttribute('data-model-id');
        const isConnected = item.getAttribute('data-connected') === 'true';
        if (!modelName) return;

        modelsStore.setActiveModel(modelName);
        closeAllDropdowns();

        if (!isConnected && modelId) {
          // Redirect to Models page
          const navModel = document.getElementById('navModel');
          if (navModel) {
            navModel.click();
          }
        }
      });
    });
  }

  // Search filtering
  if (modelSearchInput) {
    modelSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      if (query.length > 0) {
        if (secondaryFlyoutPanel) secondaryFlyoutPanel.classList.remove('show');
        
        const state = modelsStore.getState();
        const allModels = state.models.filter(m => m.type !== 'provider');
        const filtered = allModels.filter(m => m.name.toLowerCase().includes(query));
        
        if (filtered.length === 0) {
          modelOptionsList.innerHTML = `<div style="padding:12px;color:var(--text-secondary);font-size:13px;text-align:center;">No models found.</div>`;
        } else {
          modelOptionsList.innerHTML = filtered.map(getModelHtml).join('');
          bindOptionClicks();
        }
      } else {
        renderOptions();
      }
    });
  }

  const autoToggle = document.getElementById('autoToggle');
  const multipleModelsToggle = document.getElementById('multipleModelsToggle');
  const tempChatToggle = document.getElementById('tempChatToggle');

  if (autoToggle) {
    autoToggle.addEventListener('change', (e) => {
      console.log(`Auto Model Selection: ${e.target.checked}`);
    });
  }
  if (multipleModelsToggle) {
    multipleModelsToggle.addEventListener('change', (e) => {
      console.log(`Multiple Models Mode: ${e.target.checked}`);
    });
  }
  if (tempChatToggle) {
    tempChatToggle.addEventListener('change', (e) => {
      console.log(`Temporary Chat Mode: ${e.target.checked}`);
    });
  }

  function updateTriggerBtnStyle(modelName) {
    if (!modelTriggerBtn) return;

    const modelObj = modelsStore.getState().models.find(m => m.name === modelName || m.id === modelName);
    const isConnected = modelObj ? modelObj.status === 'connected' : false;

    const logoImg = modelTriggerBtn.querySelector('.model-logo');
    const chevron = modelTriggerBtn.querySelector('.chevron');
    const triggerConnectBadge = document.getElementById('triggerConnectBadge');
    if (triggerConnectBadge) triggerConnectBadge.style.display = 'none';

    if (!isConnected) {
      // Disconnected: style trigger button itself as a black curved rectangle "Connect" button using class
      modelTriggerBtn.classList.add('disconnected');
      
      // Clear inline style overrides so the CSS class rules apply
      modelTriggerBtn.style.backgroundColor = "";
      modelTriggerBtn.style.color = "";
      modelTriggerBtn.style.borderColor = "";
      modelTriggerBtn.style.borderRadius = "";
      modelTriggerBtn.style.padding = "";
      modelTriggerBtn.style.display = "";
      modelTriggerBtn.style.height = "";

      const sparkle = modelTriggerBtn.querySelector('.model-sparkle');
      if (sparkle) sparkle.style.display = "inline-flex";

      if (activeModelName) {
        activeModelName.textContent = "Connect";
        activeModelName.style.color = "";
        activeModelName.style.fontWeight = "";
        activeModelName.style.fontSize = "";
      }
      if (logoImg) logoImg.style.display = "none";
      if (chevron) chevron.style.display = "none";
    } else {
      // Connected: restore normal styling
      modelTriggerBtn.classList.remove('disconnected');
      
      const sparkle = modelTriggerBtn.querySelector('.model-sparkle');
      if (sparkle) sparkle.style.display = "none";

      const isGemini = modelName.toLowerCase().includes('gemini');

      // Create/update Beta badge if model has "BETA" tag
      let betaBadge = modelTriggerBtn.querySelector('.model-beta-badge');
      const hasBeta = modelObj && modelObj.tags && modelObj.tags.includes('BETA');
      
      if (hasBeta) {
        if (!betaBadge) {
          betaBadge = document.createElement('span');
          betaBadge.className = 'model-beta-badge';
          betaBadge.style.background = '#FFFFFF';
          betaBadge.style.color = '#8E8E93';
          betaBadge.style.fontSize = '10px';
          betaBadge.style.padding = '2px 6px';
          betaBadge.style.borderRadius = '10px';
          betaBadge.style.fontWeight = '500';
          betaBadge.style.marginLeft = '6px';
          betaBadge.textContent = 'Beta';
          modelTriggerBtn.appendChild(betaBadge);
        } else {
          betaBadge.style.display = 'inline-block';
        }
      } else {
        if (betaBadge) betaBadge.style.display = 'none';
      }

      if (isGemini) {
        modelTriggerBtn.style.backgroundColor = "#F4F4F5";
        modelTriggerBtn.style.border = "none";
        modelTriggerBtn.style.borderRadius = "20px";
        modelTriggerBtn.style.padding = "4px 10px 4px 8px";
        modelTriggerBtn.style.display = "inline-flex";
        modelTriggerBtn.style.alignItems = "center";
        modelTriggerBtn.style.height = "28px";
        
        if (activeModelName) {
          activeModelName.textContent = modelName;
          activeModelName.style.color = "#111827";
          activeModelName.style.fontWeight = "550";
          activeModelName.style.fontSize = "13px";
        }
        if (chevron) chevron.style.display = 'none';
      } else if (modelName === "Zed Pro") {
        modelTriggerBtn.style.backgroundColor = "#F4F4F5";
        modelTriggerBtn.style.border = "none";
        modelTriggerBtn.style.borderRadius = "20px";
        modelTriggerBtn.style.padding = "4px 10px 4px 8px";
        modelTriggerBtn.style.display = "inline-flex";
        modelTriggerBtn.style.alignItems = "center";
        modelTriggerBtn.style.height = "28px";
        
        if (activeModelName) {
          activeModelName.textContent = modelName;
          activeModelName.style.color = "#111827";
          activeModelName.style.fontWeight = "550";
          activeModelName.style.fontSize = "13px";
        }
        if (chevron) chevron.style.display = 'none';
      } else {
        modelTriggerBtn.style.backgroundColor = "#FFFFFF";
        modelTriggerBtn.style.border = "1px solid rgba(0, 0, 0, 0.08)";
        modelTriggerBtn.style.borderRadius = "999px";
        modelTriggerBtn.style.padding = "0 12px";
        modelTriggerBtn.style.display = "inline-flex";
        modelTriggerBtn.style.alignItems = "center";
        modelTriggerBtn.style.height = "32px";
        
        if (activeModelName) {
          activeModelName.textContent = modelName;
          activeModelName.style.color = "#0F172A";
          activeModelName.style.fontWeight = "550";
          activeModelName.style.fontSize = "13px";
        }
        if (chevron) chevron.style.display = 'block';
      }

      if (logoImg) {
        logoImg.style.display = isGemini ? "none" : "block";
      }
    }
  }

  function updateTriggerIcon(modelName) {
    if (!modelTriggerBtn) return;
    const modelObj = modelsStore.getState().models.find(m => m.name === modelName || m.id === modelName);
    const isConnected = modelObj ? modelObj.status === 'connected' : false;

    const triggerIcon = modelTriggerBtn.querySelector('.model-logo');
    if (!triggerIcon) return;

    if (modelName.toLowerCase().includes('gemini')) {
      const newIconHtml = `
        <svg class="model-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 14px; height: 14px; flex-shrink: 0; margin-right: 4px;">
          <defs>
            <linearGradient id="geminiSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF5B5B" />
              <stop offset="30%" stop-color="#FFC837" />
              <stop offset="70%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#10B981" />
            </linearGradient>
          </defs>
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="url(#geminiSparkleGrad)"/>
        </svg>
      `;
      triggerIcon.outerHTML = newIconHtml;
      return;
    }

    if (modelObj) {
      let newIconHtml = '';
      if (modelObj.logoSrc) {
        newIconHtml = `<img class="model-logo" src="${modelObj.logoSrc}" alt="${modelObj.name}" style="${isConnected ? '' : 'display: none;'}">`;
      } else if (modelObj.logoSvg) {
        newIconHtml = modelObj.logoSvg.replace('width="20"', 'width="16"').replace('height="20"', 'height="16"').replace('class="logo"', 'class="model-logo"');
        if (!isConnected) {
          newIconHtml = newIconHtml.replace('class="model-logo"', 'class="model-logo" style="display: none;"');
        }
      } else {
        newIconHtml = `<svg class="model-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:${isConnected ? 'block' : 'none'};width:16px;height:16px;color:#64748B;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
      }
      triggerIcon.outerHTML = newIconHtml;
    }
  }

  // Subscribe to changes
  modelsStore.subscribe((state) => {
    if (state.activeModel && state.activeModel !== activeModel) {
      activeModel = state.activeModel;
      if (activeModelName) {
        activeModelName.textContent = activeModel;
      }
      updateTriggerBtnStyle(activeModel);
      updateTriggerIcon(activeModel);
      
      if (state.activeModel !== lastNotifiedModel) {
        lastNotifiedModel = state.activeModel;
        if (typeof onModelChange === 'function') {
          onModelChange(state.activeModel);
        }
      }
    }
    renderOptions();
  });

  // Initial render & style setup
  renderOptions();
  updateTriggerBtnStyle(activeModel);
  updateTriggerIcon(activeModel);
}
