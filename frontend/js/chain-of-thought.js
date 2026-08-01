function createSVG(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, String(val));
  }
  return el;
}

export function ChainOfThought({ defaultOpen = false } = {}, ...children) {
  const container = document.createElement('div');
  container.className = 'chain-of-thought';

  let headerEl = null;
  let contentEl = null;
  const rest = [];

  for (const child of children) {
    if (child instanceof Node) {
      if (child.classList.contains('cot-header')) {
        headerEl = child;
      } else if (child.classList.contains('cot-content')) {
        contentEl = child;
      } else {
        rest.push(child);
      }
    }
  }

  const stepCount = [...(contentEl?.querySelectorAll('.cot-step') ?? []), ...rest.filter(c => c.classList?.contains('cot-step'))].length;

  if (!headerEl) {
    headerEl = ChainOfThoughtHeader({}, 'Thought process', stepCount > 0 ? ChainOfThoughtStepCount({}, stepCount) : null);
  }
  container.appendChild(headerEl);

  if (!contentEl) {
    contentEl = document.createElement('div');
    contentEl.className = 'cot-content';
    for (const r of rest) {
      if (r instanceof Node) contentEl.appendChild(r);
    }
    container.appendChild(contentEl);
  } else {
    container.appendChild(contentEl);
  }

  if (defaultOpen) {
    container.dataset.open = 'true';
    headerEl.classList.add('open');
  } else {
    container.dataset.open = 'false';
  }

  headerEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop-propagation]')) return;
    const isOpen = container.dataset.open === 'true';
    container.dataset.open = String(!isOpen);
    headerEl.classList.toggle('open', !isOpen);
  });

  return container;
}

export function ChainOfThoughtHeader({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-header';

  const chevron = createSVG('svg', { width: '14', height: '14', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', class: 'cot-chevron' });
  chevron.appendChild(createSVG('path', { d: 'M6 3l5 5-5 5' }));
  el.appendChild(chevron);

  const icon = createSVG('svg', { width: '14', height: '14', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round', class: 'cot-header-icon' });
  icon.appendChild(createSVG('circle', { cx: '8', cy: '8', r: '6' }));
  icon.appendChild(createSVG('path', { d: 'M8 4v4l2.5 1.5' }));
  el.appendChild(icon);

  const titleSpan = document.createElement('span');
  titleSpan.className = 'cot-header-title';
  el.appendChild(titleSpan);

  for (const child of children) {
    if (typeof child === 'string') {
      titleSpan.textContent = child;
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}

export function ChainOfThoughtStepCount({} = {}, count) {
  const el = document.createElement('span');
  el.className = 'cot-step-count';
  el.textContent = `${count} step${count !== 1 ? 's' : ''}`;
  return el;
}

export function ChainOfThoughtContent({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-content';
  for (const child of children) {
    if (child instanceof Node) el.appendChild(child);
  }
  return el;
}
export function ChainOfThoughtStep({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-step collapsed';

  let triggerEl = null;
  let contentEl = null;

  for (const child of children) {
    if (child instanceof Node) {
      if (child.classList.contains('cot-step-trigger')) {
        triggerEl = child;
      } else if (child.classList.contains('cot-step-content')) {
        contentEl = child;
      }
    }
  }

  if (triggerEl) {
    el.appendChild(triggerEl);
  } else {
    triggerEl = ChainOfThoughtTrigger({ label: 'Step' });
    el.appendChild(triggerEl);
  }

  if (contentEl) {
    el.appendChild(contentEl);
  }

  if (triggerEl && contentEl) {
    triggerEl.addEventListener('click', (e) => {
      const isCollapsed = el.classList.toggle('collapsed');
      triggerEl.classList.toggle('open', !isCollapsed);
    });
  }

  return el;
}
export function ChainOfThoughtTrigger({ icon = '', label = '', status = 'complete' } = {}, ...children) {
  const el = document.createElement('div');
  el.className = `cot-step-trigger cot-step-${status}`;
  el.dataset.open = 'true';

  const iconEl = document.createElement('span');
  iconEl.className = 'cot-step-icon';

  if (status === 'in_progress') {
    const spinner = document.createElement('span');
    spinner.className = 'cot-spinner';
    iconEl.appendChild(spinner);
  } else if (status === 'complete') {
    const checkSvg = createSVG('svg', { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round', class: 'cot-check-icon' });
    checkSvg.appendChild(createSVG('polyline', { points: '20 6 9 17 4 12' }));
    iconEl.appendChild(checkSvg);
  } else if (icon && typeof icon === 'object' && icon.render) {
    iconEl.appendChild(icon);
  } else if (icon) {
    iconEl.innerHTML = typeof icon === 'string' ? icon : '';
  }

  el.appendChild(iconEl);

  const labelEl = document.createElement('span');
  labelEl.className = 'cot-step-label';
  labelEl.textContent = label;
  el.appendChild(labelEl);

  if (children.length > 0) {
    const stepChevron = createSVG('svg', { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', class: 'cot-step-chevron' });
    stepChevron.appendChild(createSVG('path', { d: 'M6 3l5 5-5 5' }));
    el.appendChild(stepChevron);
  }

  for (const child of children) {
    if (typeof child === 'string' && child) {
      const textEl = document.createElement('span');
      textEl.className = 'cot-trigger-text';
      textEl.textContent = child;
      el.appendChild(textEl);
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}

export function ChainOfThoughtStepContent({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-step-content';
  for (const child of children) {
    if (child instanceof Node) el.appendChild(child);
  }
  return el;
}

export function ChainOfThoughtItem({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-item';
  for (const child of children) {
    if (typeof child === 'string') {
      el.textContent = child;
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }
  return el;
}

export function ChainOfThoughtSearchResults({} = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-search-results';
  for (const child of children) {
    if (child instanceof Node) el.appendChild(child);
  }
  return el;
}

export function ChainOfThoughtSearchResult({} = {}, ...children) {
  const el = document.createElement('a');
  el.className = 'cot-search-result';
  el.target = '_blank';
  el.rel = 'noopener noreferrer';

  const searchIcon = createSVG('svg', { width: '12', height: '12', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round', class: 'cot-search-result-icon' });
  searchIcon.appendChild(createSVG('circle', { cx: '7', cy: '7', r: '4.5' }));
  searchIcon.appendChild(createSVG('path', { d: 'M10.5 10.5L14 14' }));
  el.appendChild(searchIcon);

  const textDiv = document.createElement('div');
  textDiv.className = 'cot-search-result-text';

  for (const child of children) {
    if (typeof child === 'string') {
      if (/^https?:\/\//.test(child)) {
        el.href = child;
        const hostnameEl = document.createElement('div');
        hostnameEl.className = 'cot-search-result-hostname';
        try { hostnameEl.textContent = new URL(child).hostname; } catch { hostnameEl.textContent = child; }
        textDiv.appendChild(hostnameEl);
      } else {
        const titleEl = document.createElement('div');
        titleEl.className = 'cot-search-result-title';
        titleEl.textContent = child;
        textDiv.appendChild(titleEl);
      }
    } else if (child instanceof Node) {
      textDiv.appendChild(child);
    }
  }

  el.appendChild(textDiv);
  return el;
}

export function ChainOfThoughtImage({ caption = '' } = {}, ...children) {
  const el = document.createElement('div');
  el.className = 'cot-image-container';
  for (const child of children) {
    if (child instanceof Node) el.appendChild(child);
  }
  if (caption) {
    const capEl = document.createElement('div');
    capEl.className = 'cot-image-caption';
    capEl.textContent = caption;
    el.appendChild(capEl);
  }
  return el;
}

export function Image({ base64 = '', mediaType = 'image/png', alt = '', className = '' } = {}) {
  const el = document.createElement('img');
  el.className = `cot-image${className ? ' ' + className : ''}`;
  el.src = base64.startsWith('data:') ? base64 : `data:${mediaType};base64,${base64}`;
  el.alt = alt;
  el.loading = 'lazy';
  return el;
}

export function parseReasoningToCoT(reasoningText) {
  if (!reasoningText || !reasoningText.trim()) return null;

  const lines = reasoningText.split('\n');
  const steps = [];
  let currentLabel = 'Thinking';
  let currentItems = [];
  let currentSearchResults = [];
  let currentImages = [];

  function flushStep(status = 'complete') {
    if (currentItems.length === 0 && currentSearchResults.length === 0 && currentImages.length === 0) return null;
    const step = {
      label: currentLabel,
      status,
      items: [...currentItems],
      searchResults: [...currentSearchResults],
      images: [...currentImages],
    };
    currentItems = [];
    currentSearchResults = [];
    currentImages = [];
    return step;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const headerMatch = trimmed.match(/^##\s+(.+)/);
    const boldMatch = trimmed.match(/^\*\*(.+?)\*\*/);
    if (headerMatch || boldMatch) {
      const flushed = flushStep();
      if (flushed) steps.push(flushed);
      currentLabel = headerMatch?.[1] ?? boldMatch?.[1] ?? 'Thinking';
      continue;
    }

    const searchListMatch = trimmed.match(/^\s*-\s*\[(.+?)\]\((.+?)\)/);
    if (searchListMatch) {
      currentSearchResults.push({ title: searchListMatch[1], url: searchListMatch[2] });
      continue;
    }

    const inlineUrlMatch = trimmed.match(/^\[(.+?)\]\((.+?)\)/);
    if (inlineUrlMatch && /^https?:\/\//.test(inlineUrlMatch[2])) {
      currentSearchResults.push({ title: inlineUrlMatch[1], url: inlineUrlMatch[2] });
      continue;
    }

    const imgMatch = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      currentImages.push({ alt: imgMatch[1] || '', src: imgMatch[2] });
      continue;
    }

    currentItems.push(trimmed);
  }

  const last = flushStep();
  if (last) steps.push(last);

  if (steps.length === 0) {
    const textEl = document.createElement('div');
    textEl.className = 'cot-reasoning-text';
    textEl.textContent = reasoningText.trim();
    return textEl;
  }

  const header = ChainOfThoughtHeader({}, 'Thought process', ChainOfThoughtStepCount({}, steps.length));
  const content = ChainOfThoughtContent({});

  for (const step of steps) {
    const children = [];

    for (const item of step.items) {
      children.push(ChainOfThoughtItem({}, item));
    }

    if (step.searchResults.length > 0) {
      const resultsEl = ChainOfThoughtSearchResults({});
      for (const sr of step.searchResults) {
        resultsEl.appendChild(ChainOfThoughtSearchResult({}, sr.title, sr.url));
      }
      children.push(resultsEl);
    }

    if (step.images.length > 0) {
      for (const img of step.images) {
        const imgContainer = ChainOfThoughtImage({ caption: img.alt });
        imgContainer.appendChild(Image({ base64: img.src, alt: img.alt }));
        children.push(imgContainer);
      }
    }

    const lower = step.label.toLowerCase();
    let iconHtml = '';
    if (lower.includes('search') || lower.includes('look') || lower.includes('find') || lower.includes('query')) {
      iconHtml = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>';
    } else if (lower.includes('analyz') || lower.includes('review') || lower.includes('reason') || lower.includes('think')) {
      iconHtml = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>';
    } else {
      iconHtml = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
    }

    const trigger = ChainOfThoughtTrigger({ icon: iconHtml, label: step.label, status: step.status });
    const stepContent = children.length > 0 ? ChainOfThoughtStepContent({}, ...children) : null;
    const stepEl = ChainOfThoughtStep({}, trigger, ...(stepContent ? [stepContent] : []));
    content.appendChild(stepEl);
  }

  return ChainOfThought({ defaultOpen: false }, header, content);
}

export const SEARCH_INTENT_PATTERNS = [
  /^(search|find|look\s*up|query|google|research)\s+(for|about|the|a|an)?\s*/i,
  /^(what|who|where|when|why|how)\s+(is|are|was|were|does|do|can|could|would|will|did)\s+/i,
  /^(tell\s+me\s+about|show\s+me|give\s+me\s+information\s+(about|on)|i\s+want\s+to\s+know)\s+/i,
  /\b(search|find|look\s*up|research)\b.*\b(web|internet|online|google|information|data|news|article|website|source)\b/i,
];

export function detectSearchIntent(userMessage) {
  if (!userMessage) return null;
  for (const pattern of SEARCH_INTENT_PATTERNS) {
    if (pattern.test(userMessage)) {
      return {
        label: 'Searching the web',
        icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>',
        status: 'in_progress',
        items: ['Searching for relevant information...'],
      };
    }
  }
  return null;
}

export function createCoTLiveRenderer() {
  let containerEl = null;
  let headerEl = null;
  let contentEl = null;
  let stepEls = [];
  let buffer = '';
  let finalized = false;
  let lastProcessedOffset = 0;
  let currentStepIndex = -1;

  function ensureContainer() {
    if (containerEl) return containerEl;
    containerEl = document.createElement('div');
    containerEl.className = 'chain-of-thought';
    containerEl.dataset.open = 'false';

    headerEl = ChainOfThoughtHeader({}, 'Thought process');
    headerEl.classList.remove('open');
    containerEl.appendChild(headerEl);

    contentEl = ChainOfThoughtContent({});
    containerEl.appendChild(contentEl);

    return containerEl;
  }

  function addStep(label, status, iconHtml) {
    const trigger = ChainOfThoughtTrigger({ icon: iconHtml || '', label, status });
    trigger.classList.add('open');
    const stepContent = ChainOfThoughtStepContent({});
    const stepEl = ChainOfThoughtStep({}, trigger, stepContent);

    contentEl.appendChild(stepEl);
    stepEls.push({ el: stepEl, trigger, content: stepContent, items: [] });
    updateCount();
    return { stepEl, trigger, content: stepContent };
  }

  function updateCount() {
    const existing = headerEl.querySelector('.cot-step-count');
    const count = stepEls.length;
    if (existing) {
      existing.textContent = `${count} step${count !== 1 ? 's' : ''}`;
    } else {
      headerEl.appendChild(ChainOfThoughtStepCount({}, count));
    }
  }

  function setStepStatus(index, status) {
    const s = stepEls[index];
    if (!s) return;
    s.trigger.classList.remove('cot-step-complete', 'cot-step-in_progress');
    s.trigger.classList.add(`cot-step-${status}`);
    const iconEl = s.trigger.querySelector('.cot-step-icon');
    if (iconEl) {
      iconEl.innerHTML = '';
      if (status === 'complete') {
        iconEl.innerHTML = '<svg class="cot-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
      } else if (status === 'in_progress') {
        const spinner = document.createElement('span');
        spinner.className = 'cot-spinner';
        iconEl.appendChild(spinner);
      }
    }
  }

  function appendItem(index, text) {
    const s = stepEls[index];
    if (!s) return;
    const itemEl = ChainOfThoughtItem({}, text);
    s.content.appendChild(itemEl);
    s.items.push(itemEl);
  }

  function processBufferSlice(slice) {
    const lines = slice.split('\n').map(l => l.trim()).filter(l => l);
    for (const trimmed of lines) {
      const headerMatch = trimmed.match(/^##\s+(.+)/);
      const boldMatch = trimmed.match(/^\*\*(.+?)\*\*/);
      if (headerMatch || boldMatch) {
        if (currentStepIndex >= 0 && currentStepIndex < stepEls.length) {
          setStepStatus(currentStepIndex, 'complete');
        }
        const label = headerMatch?.[1] ?? boldMatch?.[1] ?? 'Thinking';
        currentStepIndex++;
        if (currentStepIndex >= stepEls.length) {
          addStep(label, 'in_progress');
        } else {
          stepEls[currentStepIndex].trigger.querySelector('.cot-step-label').textContent = label;
          setStepStatus(currentStepIndex, 'in_progress');
        }
      } else if (currentStepIndex >= 0 && currentStepIndex < stepEls.length) {
        appendItem(currentStepIndex, trimmed);
      }
    }
  }

  return {
    get element() { return containerEl; },

    appendReasoning(token) {
      if (finalized) return;
      buffer += token;
      ensureContainer();
      if (currentStepIndex < 0) {
        currentStepIndex = 0;
        addStep('Thinking', 'in_progress');
      }
    },

    parseAndRender() {
      if (finalized || !buffer.trim()) return;

      const lastNewline = buffer.lastIndexOf('\n');
      if (lastNewline < 0) return;

      const processable = buffer.slice(lastProcessedOffset, lastNewline);
      lastProcessedOffset = lastNewline + 1;

      if (processable.trim()) {
        processBufferSlice(processable);
      }
    },

    addInitialStep(stepInfo) {
      ensureContainer();
      currentStepIndex++;
      const s = addStep(stepInfo.label || 'Thinking', stepInfo.status || 'in_progress', stepInfo.icon || '');
      if (stepInfo.items) {
        for (const item of stepInfo.items) {
          appendItem(currentStepIndex, item);
        }
      }
    },

    finalize() {
      finalized = true;

      if (lastProcessedOffset < buffer.length) {
        const remaining = buffer.slice(lastProcessedOffset).trim();
        if (remaining) {
          if (currentStepIndex < 0) {
            addStep('Thinking', 'complete');
            currentStepIndex = 0;
          }
          appendItem(currentStepIndex, remaining);
        }
      }

      // If there's only one step with many items (plain prose, no ## headers),
      // split into multiple steps using sentence-grouping
      if (stepEls.length === 1 && stepEls[0].items.length > 3) {
        const items = stepEls[0].items.map(el => el.textContent || '');
        let combined = items.join(' ');
        // Split into sentences
        const sentences = combined.split(/(?<=[.!?])\s+/).filter(s => s.trim());
        if (sentences.length > 2) {
          contentEl.innerHTML = '';
          stepEls = [];
          currentStepIndex = -1;
          const chunkSize = Math.max(2, Math.ceil(sentences.length / 3));
          for (let i = 0; i < sentences.length; i += chunkSize) {
            const chunk = sentences.slice(i, i + chunkSize);
            const label = i === 0 ? 'Thinking' : `Step ${Math.floor(i / chunkSize) + 1}`;
            addStep(label, 'complete');
            for (const sentence of chunk) {
              appendItem(currentStepIndex, sentence);
            }
          }
        }
      }

      for (let i = 0; i < stepEls.length; i++) {
        setStepStatus(i, 'complete');
      }
      if (stepEls.length === 0 && buffer.trim()) {
        addStep('Thinking', 'complete');
        appendItem(0, buffer.trim());
      }
      // If no reasoning items were produced, add a brief placeholder
      // (e.g. when the model doesn't send reasoning_content at all)
      if (stepEls.length > 0 && stepEls[stepEls.length - 1].items.length === 0) {
        appendItem(stepEls.length - 1, 'Completed');
      }
    },

    addParsedStep(stepData, isLast) {
      ensureContainer();
      if (currentStepIndex < 0) currentStepIndex = 0;
      // Mark previous last step as complete
      if (stepEls.length > 0) {
        setStepStatus(stepEls.length - 1, 'complete');
      }
      const status = isLast ? 'in_progress' : 'complete';
      const s = addStep(stepData.title || 'Step', status);
      currentStepIndex = stepEls.length - 1;
      if (stepData.items) {
        for (const item of stepData.items) {
          appendItem(currentStepIndex, item);
        }
      }
    },

    clearSteps() {
      if (contentEl) {
        contentEl.innerHTML = '';
      }
      stepEls = [];
      currentStepIndex = -1;
    },

    get stepCount() { return stepEls.length; },
    get isFinalized() { return finalized; },
  };
}
