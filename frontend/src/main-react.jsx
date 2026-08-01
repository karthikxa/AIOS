import React from 'react';
import { createRoot } from 'react-dom/client';
import { PluginConnectDialog } from './components/PluginConnectDialog';
import './index.css';

// 1. Mount PluginConnectDialog if container is present
const pluginDialogContainer = document.getElementById('plugin-dialog-root');
if (pluginDialogContainer) {
  const root = createRoot(pluginDialogContainer);
  root.render(React.createElement(PluginConnectDialog));
}
