import React from 'react';
import { createRoot } from 'react-dom/client';
import { CombinedComposer } from './components/assistant-ui/combined-composer';
import './index.css';

// React composer is available but NOT auto-mounted.
// The vanilla chat input + toolbar handles the UI.
// To enable React composer, uncomment below:
//
// const container = document.getElementById('composer-trigger-popover-root');
// if (container) {
//   const root = createRoot(container);
//   root.render(React.createElement(CombinedComposer));
// }
