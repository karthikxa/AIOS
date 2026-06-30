// Toast notification utility — replaces ugly browser alert() dialogs

let toastContainer = null;

function ensureContainer() {
  if (toastContainer) return toastContainer;
  toastContainer = document.createElement('div');
  toastContainer.id = 'toastContainer';
  toastContainer.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
  document.body.appendChild(toastContainer);
  return toastContainer;
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {'info'|'success'|'error'|'warning'} type - Toast type
 * @param {number} duration - Auto-dismiss in ms (default 3500)
 */
export function showToast(message, type = 'info', duration = 3500) {
  const container = ensureContainer();

  const colors = {
    info:    { bg: '#F0F4FF', border: '#C7D2FE', text: '#3730A3', icon: 'ℹ' },
    success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '✓' },
    error:   { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B', icon: '✕' },
    warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', icon: '⚠' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    pointer-events: all;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: ${c.bg};
    border: 1px solid ${c.border};
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: ${c.text};
    max-width: 380px;
    animation: toastSlideIn 0.25s ease-out;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  `;
  toast.innerHTML = `
    <span style="font-size:15px;font-weight:700;line-height:1;">${c.icon}</span>
    <span style="flex:1;line-height:1.4;">${message}</span>
  `;

  // Dismiss on click
  toast.addEventListener('click', () => dismiss(toast));

  container.appendChild(toast);

  // Auto-dismiss
  const timer = setTimeout(() => dismiss(toast), duration);
  toast._timer = timer;

  return toast;
}

function dismiss(toast) {
  if (toast._dismissed) return;
  toast._dismissed = true;
  clearTimeout(toast._timer);
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(20px)';
  setTimeout(() => toast.remove(), 200);
}

// Inject keyframes once
if (!document.getElementById('toastStyles')) {
  const style = document.createElement('style');
  style.id = 'toastStyles';
  style.textContent = `
    @keyframes toastSlideIn {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
}
