import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { UnifiedComposer } from './components/assistant-ui/unified-composer';
import { PluginConnectDialog } from './components/PluginConnectDialog';
import './index.css';

// Mount the Unified Composer into the chat input area
const container = document.getElementById('composer-trigger-popover-root');
if (container) {
  container.style.display = 'block';
  const root = createRoot(container);
  root.render(React.createElement(UnifiedComposer));
}

// Plugin Connect Dialog mount point
const dialogRoot = document.getElementById('plugin-dialog-root');
if (dialogRoot) {
  const root = createRoot(dialogRoot);
  root.render(React.createElement(PluginConnectDialogShell));
}

function PluginConnectDialogShell() {
  const [open, setOpen] = useState(false);
  const [plugin, setPlugin] = useState(null);

  const handleConnect = useCallback((id) => {
    // Call into vanilla JS plugins store
    if (window.__pluginsStore) {
      window.__pluginsStore.connect(id);
    }
  }, []);

  // Expose open function globally for vanilla JS to call
  React.useEffect(() => {
    window.__openPluginDialog = (pluginData) => {
      setPlugin(pluginData);
      setOpen(true);
    };
    return () => { delete window.__openPluginDialog; };
  }, []);

  return React.createElement(PluginConnectDialog, {
    open,
    onOpenChange: setOpen,
    plugin,
    onConnect: handleConnect,
  });
}
