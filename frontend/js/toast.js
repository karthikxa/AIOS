// Toast notification utility

export function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText =
      'position:fixed;bottom:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(container);
  }
  const colors = { info: '#2563eb', success: '#16a34a', error: '#dc2626', warning: '#d97706' };
  const el = document.createElement('div');
  el.textContent = message;
  el.style.cssText =
    `background:${colors[type] || colors.info};color:#fff;padding:10px 16px;border-radius:8px;` +
    'font-size:13px;box-shadow:0 4px 12px rgba(0,0,0,.25);max-width:360px;word-wrap:break-word;' +
    'opacity:0;transition:opacity .2s;';
  container.appendChild(el);
  requestAnimationFrame(() => (el.style.opacity = '1'));
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 250);
  }, duration);
}

export function confirmDialog(message) {
  return Promise.resolve(window.confirm(message));
}

// Expose as globals for files that use showToast() without importing
if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.confirmDialog = confirmDialog;
}
