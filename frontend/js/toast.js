// Toast notification utility — disabled (no visual popups)
// Actions are silent — no side messages, no green checkmarks

export function showToast(message, type = 'info', duration = 3500) {
  console.log(`[Toast ${type}] ${message}`);
}

export function confirmDialog(message) {
  return Promise.resolve(true);
}

// Expose as globals for files that use showToast() without importing
if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.confirmDialog = confirmDialog;
}
