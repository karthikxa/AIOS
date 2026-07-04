// Modal UI Component for Settings, Connection Flows, and Custom Providers

/**
 * Creates and appends a stylesheet containing modal styles dynamically
 * to keep the styling scoped and self-contained, but matching the main app design system.
 */
export function injectModalStyles() {
  if (document.getElementById('zed-modal-styles')) return;

  const styleEl = document.createElement('style');
  styleEl.id = 'zed-modal-styles';
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :root {
      --bg: #FCFCFC;
      --sidebar: #F5F5F5;
      --card: #FFFFFF;

      --text-primary: #111111;
      --text-secondary: #6B7280;
      --text-muted: #9CA3AF;

      --border: #E5E7EB;

      --accent: #4DA3FF;
      --accent-hover: #3B8EF3;
    }

    .zed-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.3);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: none;
    }

    .zed-sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      z-index: 9999;
      pointer-events: none;
      animation: none;
      transition: none;
    }

    .zed-connect-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 420px;
      max-width: 95vw;
      height: 100vh;
      background: var(--card);
      border-left: 1px solid var(--border);
      box-shadow: -10px 0 40px rgba(0, 0, 0, 0.06);
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      z-index: 10000;
      pointer-events: auto;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      animation: none;
      transition: none;
      overflow-y: auto;
    }

    .zed-sidebar-close-abs {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    @keyframes zedSlideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .zed-modal-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 28px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      width: 440px;
      max-width: 90%;
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      animation: none;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    @keyframes zedFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zedSlideUp {
      from { transform: translateY(20px) scale(0.97); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .zed-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .zed-modal-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .zed-modal-close-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 50%;
      transition: all 0.2s;
    }

    .zed-modal-close-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--text-primary);
    }

    .zed-modal-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .zed-modal-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .zed-modal-field label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
      letter-spacing: normal;
      text-transform: none;
      display: block;
      margin-bottom: 6px;
    }

    .zed-modal-field input,
    .zed-modal-field input[type="text"],
    .zed-modal-field input[type="password"] {
      height: 38px;
      padding: 0 12px;
      border-radius: 14px;
      border: 1px solid var(--border);
      font-size: 14px;
      font-weight: 400;
      outline: none;
      font-family: 'Inter', sans-serif;
      background-color: var(--card);
      color: var(--text-primary);
      transition: border-color 0.25s, box-shadow 0.25s;
    }

    .zed-modal-field input:focus,
    .zed-modal-field input[type="text"]:focus,
    .zed-modal-field input[type="password"]:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.15);
    }

    /* Connected Logos Header */
    .zed-brand-connection-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .brand-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--card);
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .brand-circle.zed-logo-circle {
      background-color: var(--card);
    }

    .brand-link-line {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .zed-sidebar-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      letter-spacing: -0.3px;
    }

    .zed-sidebar-subtitle {
      font-size: 13px;
      font-weight: 400;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* Password Input Eye wrapper */
    .zed-password-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .zed-password-wrapper input {
      width: 100%;
      padding-right: 40px !important;
    }

    .zed-password-toggle {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      transition: color 0.2s;
    }

    .zed-password-toggle:hover {
      color: var(--text-primary);
    }

    /* Prefix Wrapper URL field */
    .zed-input-prefix-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: 14px;
      height: 38px;
      background-color: var(--card);
      overflow: hidden;
      transition: border-color 0.25s, box-shadow 0.25s;
    }

    .zed-input-prefix-wrapper:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.15);
    }

    .zed-input-prefix-wrapper .input-prefix {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 400;
      color: var(--text-secondary);
      background-color: var(--sidebar);
      border-right: 1px solid var(--border);
      height: 100%;
      display: flex;
      align-items: center;
    }

    .zed-input-prefix-wrapper input {
      border: none !important;
      outline: none !important;
      height: 100% !important;
      flex: 1;
      box-shadow: none !important;
      padding: 0 12px !important;
    }

    /* B&W Checkboxes list */
    .zed-checkbox-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 6px;
      background: rgba(0, 0, 0, 0.01);
      padding: 12px;
      border-radius: 14px;
      border: 1px solid var(--border);
    }

    .zed-checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: var(--text-primary);
      cursor: pointer;
      font-weight: 500;
      position: relative;
      user-select: none;
    }

    .zed-checkbox-label input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .custom-checkbox {
      height: 16px;
      width: 16px;
      background-color: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      transition: all 0.2s;
      display: inline-block;
      position: relative;
    }

    .zed-checkbox-label:hover input ~ .custom-checkbox {
      border-color: #000000;
    }

    .zed-checkbox-label input:checked ~ .custom-checkbox {
      background-color: #000000 !important;
      border-color: #000000 !important;
    }

    .custom-checkbox:after {
      content: "";
      position: absolute;
      display: none;
    }

    .zed-checkbox-label input:checked ~ .custom-checkbox:after {
      display: block;
    }

    .zed-checkbox-label .custom-checkbox:after {
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    /* Divider star */
    .zed-divider-star {
      text-align: center;
      font-size: 14px;
      color: var(--text-muted);
      margin: 2px 0;
    }

    /* Security card */
    .zed-sidebar-security-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 2px;
    }

    .security-card {
      display: flex;
      gap: 10px;
      background-color: rgba(0, 0, 0, 0.015);
      border: 1px dashed var(--border);
      border-radius: 12px;
      padding: 12px;
    }

    .security-card-icon {
      color: var(--text-secondary);
      display: flex;
      align-items: flex-start;
      padding-top: 2px;
    }

    .security-card-text h4 {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 2px 0;
    }

    .security-card-text p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.35;
    }

    .security-notice-text {
      font-size: 11.5px;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    .security-notice-text a {
      color: var(--accent);
      text-decoration: underline;
      font-weight: 500;
    }

    /* Brand Accent Buttons styling */
    .zed-sidebar-actions-row {
      margin-top: auto;
      border-top: 1px solid var(--border);
      padding-top: 16px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
    }

    .zed-btn-bw-primary {
      background-color: var(--accent);
      color: #FFFFFF;
      border: none;
      border-radius: 14px;
      height: 38px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
      padding: 0 18px;
      text-align: center;
    }

    .zed-btn-bw-primary:hover {
      background-color: var(--accent-hover);
    }

    .zed-btn-bw-secondary {
      background-color: var(--card);
      color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: 14px;
      height: 38px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
      padding: 0 16px;
      text-align: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .zed-btn-bw-secondary:hover {
      background-color: var(--bg);
    }


    .zed-modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    .zed-modal-footer-right {
      display: flex;
      gap: 10px;
    }

    .zed-btn-modal-cancel {
      height: 38px;
      padding: 0 16px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background-color: var(--card);
      color: var(--text-primary);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .zed-btn-modal-cancel:hover {
      background-color: var(--bg);
    }

    .zed-btn-modal-save {
      height: 38px;
      padding: 0 16px;
      border-radius: 14px;
      border: none;
      background-color: var(--accent);
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .zed-btn-modal-save:hover {
      background-color: var(--accent-hover);
    }

    .zed-btn-modal-disconnect {
      height: 38px;
      padding: 0 16px;
      border-radius: 14px;
      border: 1px solid rgba(225, 29, 72, 0.15);
      background-color: rgba(254, 242, 242, 0.6);
      color: #E11D48;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .zed-btn-modal-disconnect:hover {
      background-color: rgba(254, 242, 242, 0.95);
      border-color: rgba(225, 29, 72, 0.3);
    }

    .zed-connect-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
      text-align: center;
    }

    .zed-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(77, 163, 255, 0.1);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: zedSpin 0.8s linear infinite;
      margin-bottom: 20px;
    }

    .zed-connect-status-text {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .zed-connect-subtext {
      font-size: 13px;
      font-weight: 400;
      color: var(--text-secondary);
      margin: 0;
    }

    /* WIZARD LAYOUT SIDEBAR & WIZARD CARD */
    #connectSidebarOverlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.35);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      animation: none;
      transition: none;
    }

    .zed-connect-sidebar.wizard-layout {
      position: relative;
      top: auto;
      right: auto;
      width: 860px;
      max-width: 95vw;
      height: 85vh;
      max-height: 780px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 28px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: row;
      padding: 0;
      overflow: hidden;
      animation: none;
      transition: none;
    }

    .connect-page-view.wizard-layout {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #FFFFFF !important;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      padding: 40px 50px !important;
      overflow-y: auto;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      z-index: 10 !important;
    }

    .wizard-card {
      background: transparent !important;
      border: none !important;
      border-radius: 0px !important;
      box-shadow: none !important;
      width: 100%;
      max-width: 100%;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      gap: 28px;
      position: relative;
      box-sizing: border-box;
      margin-bottom: 40px;
    }

    .wizard-close-btn {
      position: absolute;
      top: 0px;
      right: 0px;
      background: none;
      border: none;
      color: #9CA3AF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.2s;
    }

    .wizard-close-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #111111;
    }

    .wizard-brand-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 4px;
    }

    .logo-node.provider-logo-node {
      background-color: #FFFFFF !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 12px !important;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .logo-node.provider-logo-node img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    .logo-node.zed-logo {
      background-color: #000000 !important;
      border-color: #000000 !important;
      border-radius: 50% !important;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-connect-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .wizard-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #111111;
      margin: 0 0 6px 0;
      letter-spacing: -0.02em;
    }

    .wizard-header p {
      font-size: 14px;
      color: #6B7280;
      margin: 0;
    }

    .wizard-card .zed-modal-field label {
      font-size: 14px;
      font-weight: 600;
      color: #111111;
      margin-bottom: 6px;
    }

    .wizard-card .zed-modal-field input[type="text"],
    .wizard-card .zed-modal-field input[type="password"] {
      height: 44px !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 12px !important;
      padding: 0 16px !important;
      font-size: 14px !important;
      background-color: #FFFFFF !important;
      color: #111111 !important;
      box-sizing: border-box !important;
      width: 100%;
    }

    .wizard-card .zed-modal-field input[type="text"]:focus,
    .wizard-card .zed-modal-field input[type="password"]:focus {
      border-color: #000000 !important;
      box-shadow: 0 0 0 1px #000000 !important;
    }

    /* Custom Checkbox Styling */
    .custom-checkbox-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      position: relative;
    }

    .custom-checkbox-wrapper input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .custom-checkmark {
      width: 18px;
      height: 18px;
      background-color: #FFFFFF;
      border: 1.5px solid #D1D5DB;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .custom-checkbox-wrapper input[type="checkbox"]:checked ~ .custom-checkmark {
      background-color: #000000 !important;
      border-color: #000000 !important;
    }

    .custom-checkmark::after {
      content: "";
      width: 4px;
      height: 8px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      display: none;
      margin-bottom: 2px;
    }

    .custom-checkbox-wrapper input[type="checkbox"]:checked ~ .custom-checkmark::after {
      display: block;
    }

    /* Fetch models button circular arrow */
    .wizard-fetch-btn {
      background: #FFFFFF !important;
      border: 1px solid #E5E7EB !important;
      border-radius: 10px !important;
      padding: 8px 16px !important;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13.5px !important;
      font-weight: 600 !important;
      color: #111111 !important;
      cursor: pointer;
      transition: all 0.2s !important;
      height: auto !important;
    }

    .wizard-fetch-btn:hover {
      background-color: #F9FAFB !important;
      border-color: #9CA3AF !important;
    }

    /* Available models list box container */
    .models-list-box {
      background-color: #F8FAFC !important;
      border-radius: 16px !important;
      border: 1px solid #F1F5F9 !important;
      padding: 20px !important;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 12px;
    }

    .model-row-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .model-name-label {
      font-size: 14.5px;
      font-weight: 600;
      color: #111111;
      margin-left: 10px;
    }

    .model-badge-latest {
      font-size: 11px;
      font-weight: 600;
      color: #4B5563;
      background-color: #E5E7EB;
      padding: 2px 8px;
      border-radius: 20px;
      margin-left: 8px;
    }

    .model-type-label {
      font-size: 13.5px;
      color: #6B7280;
      font-weight: 500;
    }

    /* Agents Checklist Row Styling */
    .agent-checkbox-card {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 550;
      color: #111111;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      position: relative;
    }

    .agent-checkbox-card:hover {
      background-color: #F9FAFB;
      border-color: #9CA3AF;
    }

    .agent-checkbox-card input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .agent-checkbox-card .custom-checkmark {
      width: 18px;
      height: 18px;
      background-color: #FFFFFF;
      border: 1.5px solid #D1D5DB;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .agent-checkbox-card input[type="checkbox"]:checked ~ .custom-checkmark {
      background-color: #000000 !important;
      border-color: #000000 !important;
    }

    .agent-checkbox-card .custom-checkmark::after {
      content: "";
      width: 4px;
      height: 8px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      display: none;
      margin-bottom: 2px;
    }

    .agent-checkbox-card input[type="checkbox"]:checked ~ .custom-checkmark::after {
      display: block;
    }

    /* +2 more dropdown pill */
    .agent-more-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 20px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      color: #6B7280;
      cursor: pointer;
      transition: all 0.2s;
      outline: none;
      height: auto !important;
    }

    .agent-more-pill:hover {
      background-color: #F9FAFB;
      border-color: #9CA3AF;
      color: #111111;
    }

    .agent-dropdown-menu {
      display: none;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      padding: 12px;
      min-width: 180px;
      z-index: 1000;
      flex-direction: column;
      gap: 8px;
    }

    .agent-dropdown-menu.show {
      display: flex !important;
    }

    .agent-dropdown-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: #111111;
      cursor: pointer;
      font-weight: 550;
      position: relative;
    }

    .agent-dropdown-item input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .agent-dropdown-item .custom-checkmark {
      width: 18px;
      height: 18px;
      background-color: #FFFFFF;
      border: 1.5px solid #D1D5DB;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .agent-dropdown-item input[type="checkbox"]:checked ~ .custom-checkmark {
      background-color: #000000 !important;
      border-color: #000000 !important;
    }

    .agent-dropdown-item .custom-checkmark::after {
      content: "";
      width: 4px;
      height: 8px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      display: none;
      margin-bottom: 2px;
    }

    .agent-dropdown-item input[type="checkbox"]:checked ~ .custom-checkmark::after {
      display: block;
    }

    /* Action buttons in footer */
    .wizard-footer-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--border);
      padding-top: 20px;
      margin-top: 24px;
    }
    
    .wizard-footer-actions button {
      border-radius: 12px !important;
      height: 44px !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      padding: 0 24px !important;
      transition: all 0.2s ease !important;
      box-sizing: border-box !important;
    }
    
    .wizard-footer-actions .zed-btn-bw-secondary {
      background-color: #FFFFFF !important;
      color: #111111 !important;
      border: 1px solid #E5E7EB !important;
      box-shadow: none !important;
    }
    
    .wizard-footer-actions .zed-btn-bw-secondary:hover {
      background-color: #F9FAFB !important;
      border-color: #9CA3AF !important;
    }
    
    .wizard-footer-actions .zed-btn-bw-primary {
      background-color: #000000 !important;
      color: #FFFFFF !important;
      border: none !important;
    }
    
    .wizard-footer-actions .zed-btn-bw-primary:hover {
      background-color: #1F2937 !important;
    }

    @media (max-width: 768px) {
      .connect-page-view.wizard-layout {
        padding: 24px 20px !important;
      }
      .wizard-header h2 {
        font-size: 22px !important;
      }
      .zed-checkbox-list .checkbox-text,
      .models-list-box .model-name-label {
        max-width: 180px !important;
      }
    }
    @media (max-width: 480px) {
      .connect-page-view.wizard-layout {
        padding: 16px 12px !important;
      }
      .wizard-header h2 {
        font-size: 18px !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

/**
 * Smart URL normalizer — preserves http:// for localhost, adds https:// otherwise.
 * Prevents double-prefixing when user types a full URL.
 */
function normalizeBaseUrl(input) {
  const raw = (input || '').trim().replace(/\/$/, '');
  if (!raw) return '';
  // Already has a scheme — use as-is
  if (/^https?:\/\//i.test(raw)) return raw;
  // Localhost / 127.0.0.1 should use http
  if (/^localhost[:\/]?|^127\.0\.0\.1[:\/]?/i.test(raw)) return `http://${raw}`;
  return `https://${raw}`;
}

/**
 * Returns a clean, user-friendly error message.
 * Hides raw JS parse errors like "Unexpected token '<'..." and replaces them with clear text.
 */
function friendlyError(err, baseUrl = '') {
  const msg = (err && err.message) || String(err);
  const hasUiPort = /[:\/](5173|5174)/.test(baseUrl);
  if (
    msg.startsWith('Unexpected token') ||
    msg.includes('is not valid JSON') ||
    msg.includes('JSON Parse error') ||
    msg.includes('SyntaxError')
  ) {
    if (hasUiPort) {
      return 'Server returned HTML instead of JSON. You used port 5173/5174 (the UI port). Please use the API port http://localhost:3001/ instead!';
    }
    return 'Server returned an invalid response (not JSON). Check that the URL is correct and the server is running.';
  }
  if (msg === 'Failed to fetch' || (err && err.name === 'TypeError')) {
    if (hasUiPort) {
      return 'Cannot reach server. Please verify that the API server is running on http://localhost:3001/.';
    }
    return 'Cannot reach server. Make sure it is running and CORS is enabled.';
  }
  return msg;
}

async function validateAndFetchModels(providerName, apiKey, baseUrlRaw) {
  const baseUrl = normalizeBaseUrl(baseUrlRaw);
  const prov = (providerName || '').toLowerCase();
  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  
  if (prov === 'google') {
    url = 'https://generativelanguage.googleapis.com/v1beta/models';
    headers['x-goog-api-key'] = apiKey;
  } else if (prov === 'anthropic') {
    url = baseUrl ? `${baseUrl}/v1/models` : 'https://api.anthropic.com/v1/models';
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
  } else if (prov === 'openai') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.openai.com/v1/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (prov === 'xai') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.x.ai/v1/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (prov === 'groq') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.groq.com/openai/v1/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (prov === 'deepseek') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.deepseek.com/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (prov === 'mistral ai' || prov === 'mistral') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.mistral.ai/v1/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (prov === 'cohere') {
    url = baseUrl ? `${baseUrl}/models` : 'https://api.cohere.com/v1/models';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else {
    // Custom
    url = `${baseUrl}/models`;
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const j = await response.json().catch(() => ({}));
    throw new Error(j.error?.message || `HTTP ${response.status}`);
  }
  const data = await response.json();
  
  // Parse models list
  let modelList = [];
  if (data.data && Array.isArray(data.data)) {
    modelList = data.data.map(m => m.id || m.name).filter(Boolean);
  } else if (Array.isArray(data)) {
    modelList = data.map(m => m.id || m.name || m).filter(Boolean);
  } else if (data.models && Array.isArray(data.models)) {
    modelList = data.models.map(m => m.name || m.id || m).filter(Boolean);
  } else if (data.object === 'list' && data.data) {
    modelList = data.data.map(m => m.id).filter(Boolean);
  }
  
  if (prov === 'google') {
    modelList = modelList.map(name => name.replace('models/', ''));
  }

  return modelList;
}

/**
 * Helper to close current active modal.
 */
export function closeModal() {
  const overlay = document.querySelector('.zed-modal-overlay');
  if (overlay) overlay.remove();
}

/**
 * Opens Settings Modal for a connected model.
 * @param {string} id - Model ID.
 * @param {Object} store - central models store.
 */
/**
 * Opens Settings Modal for a connected model.
 * @param {string} id - Model ID.
 * @param {Object} store - central models store.
 */
export function openSettingsModal(id, store) {
  openConnectFlow(id, store);
}

const defaultProviderModelsMap = {
  "openai": [
    { id: "gpt-4o", name: "GPT-4o", badge: "Latest", type: "Text Generation" },
    { id: "gpt-4.1-github", name: "GPT-4.1 (GitHub)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-120b-free", name: "GPT-OSS 120B (free)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-120b-groq", name: "GPT-OSS 120B (Groq)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-20b-free", name: "GPT-OSS 20B (free)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-20b-groq", name: "GPT-OSS 20B (Groq)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-20b-pollinations", name: "GPT-OSS 20B (Pollinations)", badge: null, type: "Text Generation" },
    { id: "gpt-oss-safeguard-20b-groq", name: "GPT-OSS Safeguard 20B (Groq)", badge: null, type: "Text Generation" }
  ],
  "google": [
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", badge: null, type: "Text Generation" },
    { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash-Lite", badge: null, type: "Text Generation" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview", badge: "Preview", type: "Text Generation" },
    { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash-Lite Preview", badge: "Preview", type: "Text Generation" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", badge: "Latest", type: "Text Generation" },
    { id: "gemma-4-26b-a4b-free", name: "Gemma 4 26B-A4B (free)", badge: null, type: "Text Generation" },
    { id: "gemma-4-26b-it", name: "Gemma 4 26B IT", badge: null, type: "Text Generation" },
    { id: "gemma-4-31b-it", name: "Gemma 4 31B IT", badge: null, type: "Text Generation" }
  ],
  "meta": [
    { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", badge: null, type: "Text Generation" },
    { id: "llama-3.2-3b-free", name: "Llama 3.2 3B (free)", badge: null, type: "Text Generation" },
    { id: "llama-3.3-70b", name: "Llama 3.3 70B", badge: "Latest", type: "Text Generation" },
    { id: "llama-3.3-70b-or-free", name: "Llama 3.3 70B (OR free)", badge: null, type: "Text Generation" },
    { id: "llama-4-scout", name: "Llama 4 Scout", badge: "BETA", type: "Text Generation" }
  ],
  "qwen": [
    { id: "qwen3-coder-480b-free", name: "Qwen3 Coder 480B (free)", badge: null, type: "Text Generation" },
    { id: "qwen3-32b-groq", name: "Qwen3 32B (Groq)", badge: null, type: "Text Generation" },
    { id: "qwen3-next-80b-free", name: "Qwen3-Next 80B (free)", badge: "Latest", type: "Text Generation" }
  ],
  "nvidia": [
    { id: "nemotron-3-super-120b-free", name: "Nemotron 3 Super 120B (free)", badge: null, type: "Text Generation" },
    { id: "nemotron-3-super-120b-kilo", name: "Nemotron 3 Super 120B (Kilo)", badge: null, type: "Text Generation" },
    { id: "nemotron-3-nano-30b-free", name: "Nemotron 3 Nano 30B (free)", badge: null, type: "Text Generation" },
    { id: "nemotron-3-nano-30b-reasoning-free", name: "Nemotron 3 Nano 30B Reasoning (free)", badge: "Reasoning", type: "Text Generation" },
    { id: "nemotron-nano-9b-v2-free", name: "Nemotron Nano 9B v2 (free)", badge: null, type: "Text Generation" },
    { id: "nemotron-nano-12b-vl-free", name: "Nemotron Nano 12B VL (free)", badge: "Vision", type: "Text Generation" }
  ],
  "zhipu": [
    { id: "glm-4.5-air-free", name: "GLM-4.5 Air (free)", badge: null, type: "Text Generation" },
    { id: "glm-4.7-cerebras", name: "GLM-4.7 (Cerebras)", badge: "Latest", type: "Text Generation" }
  ],
  "liquidai": [
    { id: "liquid-lfm-2.5-1.2b-free", name: "Liquid LFM 2.5 1.2B (free)", badge: null, type: "Text Generation" },
    { id: "liquid-lfm-2.5-1.2b-thinking-free", name: "Liquid LFM 2.5 1.2B Thinking (free)", badge: "Reasoning", type: "Text Generation" }
  ],
  "poolside": [
    { id: "poolside-laguna-m.1-free", name: "Poolside Laguna M.1 (free)", badge: null, type: "Text Generation" },
    { id: "poolside-laguna-m.1-kilo", name: "Poolside Laguna M.1 (Kilo)", badge: null, type: "Text Generation" },
    { id: "poolside-laguna-xs.2-free", name: "Poolside Laguna XS.2 (free)", badge: null, type: "Text Generation" },
    { id: "poolside-laguna-xs.2-kilo", name: "Poolside Laguna XS.2 (Kilo)", badge: "Latest", type: "Text Generation" }
  ],
  "moonshot": [
    { id: "kimi-k2.6-or-free", name: "Kimi K2.6 (OR free)", badge: "Latest", type: "Text Generation" }
  ],
  "mistral": [
    { id: "dolphin-mistral-24b-venice-free", name: "Dolphin Mistral 24B Venice (free)", badge: "Free", type: "Text Generation" }
  ],
  "stepfun": [
    { id: "stepfun-step-3.7-flash-kilo", name: "StepFun Step 3.7 Flash (Kilo)", badge: "Latest", type: "Text Generation" }
  ],
  "groq": [
    { id: "compound-groq", name: "Compound (Groq)", badge: "Ensemble", type: "Text Generation" },
    { id: "compound-mini-groq", name: "Compound Mini (Groq)", badge: "Ensemble", type: "Text Generation" }
  ],
  "nousresearch": [
    { id: "hermes-3-405b-free", name: "Hermes 3 405B (free)", badge: "Latest", type: "Text Generation" }
  ]
};

/**
 * Opens Setup & Connection Wizard for disconnected models.
 * @param {string} id - Model ID.
 * @param {Object} store - models store.
 */
export function openConnectFlow(id, store) {
  injectModalStyles();
  const model = store.getState().models.find(m => m.id === id);
  if (!model) return;

  const currentSettings = model.settings || { apiKey: "", baseUrl: "", orgId: "", overrides: "" };

  // Get other models from same provider for "model selection" checkbox list!
  const providerModels = store.getState().models.filter(m => m.provider === model.provider);

  // Logo setup
  let logoHtml = '';
  if (model.logoSrc) {
    logoHtml = `<img src="${model.logoSrc}" alt="${model.name}" style="width: 24px; height: 24px; object-fit: contain;">`;
  } else if (model.logoSvg) {
    logoHtml = model.logoSvg;
  } else if (model.logoText) {
    logoHtml = `<span style="font-weight: 700; color: #000; font-size: 13px;">${model.logoText}</span>`;
  } else {
    logoHtml = `<svg class="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;color:#64748B;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
  }

  // Determine Workspace URL input layout based on model type
  let urlFieldHtml = '';
  if (model.type === 'provider') {
    let placeholderUrl = 'https://api.cohere.com/v1';
    if (model.provider === 'OpenAI') placeholderUrl = 'https://api.openai.com/v1';
    else if (model.provider === 'Anthropic') placeholderUrl = 'https://api.anthropic.com';
    else if (model.provider === 'Google') placeholderUrl = 'https://generativelanguage.googleapis.com';
    else if (model.provider === 'xAI') placeholderUrl = 'https://api.x.ai/v1';
    else if (model.provider === 'DeepSeek') placeholderUrl = 'https://api.deepseek.com';
    else if (model.provider === 'Mistral AI') placeholderUrl = 'https://api.mistral.ai/v1';
    else if (model.provider === 'Groq') placeholderUrl = 'https://api.groq.com/openai/v1';

    urlFieldHtml = `
      <div class="zed-modal-field">
        <label for="sidebarBaseUrl">Base URL <span style="font-weight:400; color:#9CA3AF;">(optional)</span></label>
        <input type="text" id="sidebarBaseUrl" value="${currentSettings.baseUrl || ''}" placeholder="${placeholderUrl}">
        <span style="font-size: 13px; color: #6B7280; margin-top: 6px; display: block;">Enter the full URL including protocol. Local servers: <code style="background:#F1F5F9;padding:2px 4px;border-radius:4px;font-family:monospace;font-size:12px;color:#111;">http://localhost:PORT/v1</code></span>
      </div>
    `;
  } else {
    urlFieldHtml = `
      <div class="zed-modal-field">
        <label for="sidebarBaseUrl">Workspace URL</label>
        <input type="text" id="sidebarBaseUrl" value="${currentSettings.baseUrl || ''}" placeholder="example@website.com">
      </div>
    `;
  }

  // Determine Model Selection checkboxes layout based on model type
  let modelSelectionHtml = '';
  if (model.type === 'provider') {
    const defKey = model.id.toLowerCase();
    const defModels = defaultProviderModelsMap[defKey] || [];
    let innerHtml = '';
    if (defModels.length > 0) {
      innerHtml = `
        <div class="models-list-box">
          ${defModels.map(dm => `
            <div class="model-row-item">
              <label class="custom-checkbox-wrapper">
                <input type="checkbox" class="model-select-checkbox" data-model-id="${dm.id}" checked>
                <span class="custom-checkmark"></span>
                <span class="model-name-label">${dm.name}</span>
                ${dm.badge ? `<span class="model-badge-latest">${dm.badge}</span>` : ''}
              </label>
              <span class="model-type-label">${dm.type}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      innerHtml = `
        <p style="font-size:12.5px;color:#6B7280;padding:12px;background:#F8FAFC;border-radius:12px;margin:0;border:1px solid #F1F5F9;">Enter the Base URL above then click <strong>Fetch Models</strong> to load real models from the endpoint.</p>
      `;
    }
    modelSelectionHtml = `
      <div id="zedProviderModelsContainer" style="margin-top: 12px;">
        ${innerHtml}
      </div>
    `;
  } else {
    modelSelectionHtml = `
      <div id="zedProviderModelsContainer" style="margin-top: 12px;">
        <div class="models-list-box">
          ${providerModels.map(pm => `
            <div class="model-row-item">
              <label class="custom-checkbox-wrapper">
                <input type="checkbox" class="model-select-checkbox" data-model-id="${pm.id}" checked>
                <span class="custom-checkmark"></span>
                <span class="model-name-label">${pm.name}</span>
              </label>
              <span class="model-type-label">Text Generation</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const pageContentHtml = `
    <div class="wizard-card">
      <!-- Close button -->
      <button class="wizard-close-btn" id="zedSidebarClose" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Logo Visual Row -->
      <div class="wizard-brand-row">
        <div class="logo-node zed-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="logo">
            <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
          </svg>
        </div>
        
        <div class="brand-connect-arrow">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="12" x2="34" y2="12" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M10 8L6 12L10 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 8L34 12L30 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="logo-node provider-logo-node">
          ${logoHtml}
        </div>
      </div>

      <!-- Heading -->
      <div class="wizard-header" style="margin-bottom: 0;">
        <h2 style="font-size: 28px; font-weight: 700; color: #111111; margin: 0 0 6px 0; letter-spacing: -0.02em;">Connect ${model.name || model.provider} to Zed</h2>
        <p style="font-size: 14px; color: #6B7280; margin: 0;">Configure your connection and select which models to enable.</p>
      </div>

      <!-- Inputs Container -->
      <div class="zed-modal-field">
        <label for="sidebarApiKey">API Key <span style="font-weight:400; color:#9CA3AF;">(optional for local)</span></label>
        <div class="zed-password-wrapper">
          <input type="password" id="sidebarApiKey" value="${currentSettings.apiKey || ''}" placeholder="sk-...">
          <button class="zed-password-toggle" type="button" aria-label="Toggle password visibility">
            <svg class="eye-open" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-closed" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
        <span style="font-size: 13px; color: #6B7280; margin-top: 6px; display: inline-flex; align-items: center; gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; display: inline-block; vertical-align: middle;">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Your API key is stored in your browser's local storage.
        </span>
      </div>

      ${urlFieldHtml}

      <!-- Available Models Box -->
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: #111111; margin: 0 0 4px 0;">Available Models</h4>
            <p style="font-size: 13.5px; color: #6B7280; margin: 0;">Fetch and select the models you want to enable.</p>
          </div>
          <button id="zedFetchModelsBtn" class="wizard-fetch-btn">
            <svg class="refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            Fetch Models
          </button>
        </div>
        ${modelSelectionHtml}
      </div>

      <!-- Enable for Agents Box -->
      <div class="agents-section" style="margin-top: 10px;">
        <h4 style="font-size: 16px; font-weight: 700; color: #111111; margin: 0 0 4px 0;">Enable for Agents</h4>
        <p style="font-size: 13.5px; color: #6B7280; margin: 0 0 12px 0;">Choose which agents can use these models.</p>
        <div class="agents-row-container" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="research" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/research_avatar.png" alt="Research Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Research Agent</span>
          </label>
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="coding" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/coder_avatar.png" alt="Coding Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Coding Agent</span>
          </label>
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="assistant" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/assistant_avatar.png" alt="Assistant Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Assistant Agent</span>
          </label>
          
          <!-- +2 more dropdown pill -->
          <div class="agent-dropdown-wrapper" style="position: relative;">
            <button type="button" class="agent-more-pill" id="agentMorePillBtn">
              <span>+2 more</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="agent-dropdown-menu" id="agentMoreMenu">
              <label class="agent-dropdown-item" style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #111111; cursor: pointer; font-weight: 550;">
                <input type="checkbox" class="agent-select-checkbox" data-agent-id="data-analyst">
                <span class="custom-checkmark"></span>
                <img src="assets/models/finance_avatar.png" alt="Data Analyst" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
                <span>Data Analyst</span>
              </label>
              <label class="agent-dropdown-item" style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #111111; cursor: pointer; font-weight: 550;">
                <input type="checkbox" class="agent-select-checkbox" data-agent-id="content-writer">
                <span class="custom-checkmark"></span>
                <img src="assets/models/social_avatar.png" alt="Content Writer" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
                <span>Content Writer</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="wizard-footer-actions" style="margin-top: 10px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
        <div id="zedTestConnStatus" style="font-size: 13px; font-weight: 550; min-height: 18px; margin-right: auto; color: #16A34A;"></div>
        ${model.status === 'connected' ? `
          <button class="zed-btn-bw-secondary" id="zedSidebarDisconnect" style="border-color: #E11D48; color: #E11D48; font-weight: 600;">Disconnect</button>
        ` : ''}
        <button class="zed-btn-bw-secondary" id="zedSidebarCancel">Cancel</button>
        <button class="zed-btn-bw-secondary" id="zedSidebarTestConn">Test Connection</button>
        <button class="zed-btn-bw-primary" id="connectOrNextBtn" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${model.status === 'connected' ? 'Save' : `Connect to ${model.name || model.provider}`}</button>
      </div>
    </div>
  `;

  const connectPageView = document.getElementById('connectPageView');
  if (!connectPageView) return;
  connectPageView.innerHTML = pageContentHtml;

  const closeBtn = connectPageView.querySelector('#zedSidebarClose');
  const cancelBtn = connectPageView.querySelector('#zedSidebarCancel');
  const connectBtn = connectPageView.querySelector('#connectOrNextBtn');
  const testBtn = connectPageView.querySelector('#zedSidebarTestConn');
  const statusDiv = connectPageView.querySelector('#zedTestConnStatus');
  const disconnectBtn = connectPageView.querySelector('#zedSidebarDisconnect');

  const modelsPageView = document.getElementById('modelsPageView');
  
  // Transition to full-page Connect view
  if (modelsPageView) modelsPageView.style.display = 'none';
  connectPageView.style.display = 'flex';

  const closeSidebar = () => {
    connectPageView.style.display = 'none';
    if (modelsPageView) modelsPageView.style.display = 'block';
  };

  closeBtn.addEventListener('click', closeSidebar);
  cancelBtn.addEventListener('click', closeSidebar);

  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', () => {
      store.updateModelStatus(model.id, 'disconnected');
      closeSidebar();
    });
  }

  // Toggle Password visibility
  const apiToggle = connectPageView.querySelector('.zed-password-toggle');
  if (apiToggle) {
    apiToggle.addEventListener('click', () => {
      const apiInput = connectPageView.querySelector('#sidebarApiKey');
      if (apiInput) {
        const isPassword = apiInput.type === 'password';
        apiInput.type = isPassword ? 'text' : 'password';
        const eyeOpen = apiToggle.querySelector('.eye-open');
        const eyeClosed = apiToggle.querySelector('.eye-closed');
        if (eyeOpen && eyeClosed) {
          eyeOpen.style.display = isPassword ? 'none' : 'block';
          eyeClosed.style.display = isPassword ? 'block' : 'none';
        }
      }
    });
  }

  // Dynamic models fetcher binding if it exists
  const fetchModelsBtn = connectPageView.querySelector('#zedFetchModelsBtn');
  const modelsContainer = connectPageView.querySelector('#zedProviderModelsContainer');
  if (fetchModelsBtn && modelsContainer) {
    fetchModelsBtn.addEventListener('click', async () => {
      const baseUrlRaw = connectPageView.querySelector('#sidebarBaseUrl').value.trim();
      const apiKey = connectPageView.querySelector('#sidebarApiKey').value.trim();

      if (!baseUrlRaw) {
        modelsContainer.innerHTML = `<p style="color:#E11D48;font-size:12px;font-weight:600;">⚠ Enter a Base URL first.</p>`;
        return;
      }

      const baseUrl = normalizeBaseUrl(baseUrlRaw);
      fetchModelsBtn.disabled = true;
      fetchModelsBtn.innerHTML = `<span style="opacity:0.6;">Loading...</span>`;
      modelsContainer.innerHTML = `<p style="font-size:12px;color:#64748B;padding:10px;background:#F8FAFC;border-radius:8px;margin:0;">⏳ Fetching models from ${baseUrl}...</p>`;

      const headers = { 'Content-Type': 'application/json' };
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

      try {
        const r = await fetch(`${baseUrl}/models`, { headers });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          throw new Error(j.error?.message || `HTTP ${r.status}`);
        }
        const data = await r.json();

        // Parse multiple response formats
        let modelList = [];
        if (data.data && Array.isArray(data.data)) {
          modelList = data.data.map(m => m.id || m.name).filter(Boolean);
        } else if (Array.isArray(data)) {
          modelList = data.map(m => m.id || m.name || m).filter(Boolean);
        } else if (data.models && Array.isArray(data.models)) {
          modelList = data.models.map(m => m.name || m.id || m).filter(Boolean);
        } else if (data.object === 'list' && data.data) {
          modelList = data.data.map(m => m.id).filter(Boolean);
        }

        if (modelList.length === 0) {
          throw new Error('No models found in response. Try entering a model ID manually.');
        }

        // Render as selectable checkboxes
        modelsContainer.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:11px;color:#64748B;font-weight:600;">${modelList.length} model${modelList.length !== 1 ? 's' : ''} found</span>
            <button id="zedSelectAllModels" style="font-size:11px;color:#4F46E5;background:none;border:none;cursor:pointer;font-weight:600;">Select all</button>
          </div>
          <div class="zed-checkbox-list" style="max-height:200px;overflow-y:auto;gap:8px;">
          ${modelList.slice(0, 30).map(id => `
            <label class="zed-checkbox-label" title="${id}">
              <input type="checkbox" class="model-select-checkbox" data-model-id="${id}" checked>
              <span class="custom-checkbox"></span>
              <span class="checkbox-text" style="font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px;" title="${id}">${id}</span>
            </label>
          `).join('')}
          </div>
          ${modelList.length > 30 ? `<p style="font-size:11px;color:#94A3B8;margin-top:6px;text-align:center;">Showing first 30 of ${modelList.length} models <button id="zedShowAllModels" style="background:none;border:none;color:#4F46E5;cursor:pointer;font-weight:600;text-decoration:underline;font-size:11px;margin-left:4px;">Show all</button></p>` : ''}
        `;

        const selectAllBtn = modelsContainer.querySelector('#zedSelectAllModels');
        if (selectAllBtn) {
          selectAllBtn.addEventListener('click', () => {
            const cbs = modelsContainer.querySelectorAll('.model-select-checkbox');
            const allChecked = Array.from(cbs).every(c => c.checked);
            cbs.forEach(c => { c.checked = !allChecked; });
            selectAllBtn.textContent = allChecked ? 'Select all' : 'Deselect all';
          });
        }

        const showAllBtn = modelsContainer.querySelector('#zedShowAllModels');
        if (showAllBtn) {
          showAllBtn.addEventListener('click', () => {
            const checkboxList = modelsContainer.querySelector('.zed-checkbox-list');
            const remaining = modelList.slice(30).map(id => `
              <label class="zed-checkbox-label" title="${id}">
                <input type="checkbox" class="model-select-checkbox" data-model-id="${id}" checked>
                <span class="custom-checkbox"></span>
                <span class="checkbox-text" style="font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px;" title="${id}">${id}</span>
              </label>
            `).join('');
            checkboxList.insertAdjacentHTML('beforeend', remaining);
            showAllBtn.closest('p').remove();
          });
        }

        statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ ${modelList.length} models loaded — select which to enable</span>`;

      } catch (err) {
        const isNetError = err.message === 'Failed to fetch' || err.name === 'TypeError';
        const cleanMsg = friendlyError(err, baseUrl);
        modelsContainer.innerHTML = `
          <div style="padding:10px;background:#FFF8F8;border:1px solid rgba(225,29,72,0.1);border-radius:8px;">
            <p style="color:#E11D48;font-size:12px;font-weight:600;margin:0 0 6px;">Could not fetch models</p>
            <p style="font-size:11px;color:#64748B;margin:0 0 8px;">${cleanMsg}</p>
            ${isNetError ? `<p style="font-size:11px;color:#64748B;margin:0 0 8px;">URL: <code style="background:#F1F5F9;padding:1px 4px;border-radius:3px;">${baseUrl}</code></p>` : ''}
            <label style="font-size:12px;color:#475569;font-weight:600;display:block;margin-bottom:4px;">Enter model ID manually:</label>
            <input type="text" id="sidebarProviderManualModel" placeholder="e.g. llama3:8b, mistral, gpt-4" style="width:100%;height:36px;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:0 12px;font-family:Inter,sans-serif;font-size:13px;outline:none;box-sizing:border-box;">
          </div>
        `;
      } finally {
        fetchModelsBtn.disabled = false;
        fetchModelsBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>Refresh`;
      }
    });
  }

  // Test Connection Event — real API ping
  testBtn.addEventListener('click', async () => {
    const apiKey = connectPageView.querySelector('#sidebarApiKey').value.trim();
    if (!apiKey && model.type !== 'provider') {
      statusDiv.innerHTML = `<span style="color: #E11D48; font-weight:600;">✗ Must enter an API key to test</span>`;
      return;
    }

    testBtn.disabled = true;
    testBtn.style.opacity = '0.6';
    testBtn.innerText = 'Testing...';
    statusDiv.innerHTML = `<span style="color:#64748B;">⏳ Connecting to ${model.provider}...</span>`;

    const baseUrlInput = connectPageView.querySelector('#sidebarBaseUrl')?.value.trim() || '';
    const baseUrl = normalizeBaseUrl(baseUrlInput) || normalizeBaseUrl(model.settings?.baseUrl);
    const t0 = Date.now();

    try {
      let r;
      if (model.provider === 'Google') {
        r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1', {
          headers: { 'x-goog-api-key': apiKey }
        });
      } else if (model.provider === 'Anthropic') {
        r = await fetch('https://api.anthropic.com/v1/models', {
          headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }
        });
      } else if (model.provider === 'OpenAI') {
        r = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
      } else if (model.provider === 'xAI') {
        r = await fetch('https://api.x.ai/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
      } else if (model.provider === 'Groq' || model.provider === 'GroqCloud') {
        r = await fetch('https://api.groq.com/openai/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
      } else {
        // Generic / Custom — ping /models then fallback to /chat/completions
        const testUrl = baseUrl || 'https://api.openai.com/v1';
        const headers = { 'Content-Type': 'application/json' };
        if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
        try {
          r = await fetch(`${testUrl}/models`, { headers });
        } catch (_) {
          // try chat/completions ping
          r = await fetch(`${testUrl}/chat/completions`, {
            method: 'POST', headers,
            body: JSON.stringify({ model: 'test', messages: [{ role: 'user', content: 'ping' }], max_tokens: 1 })
          });
        }
      }

      const latency = Date.now() - t0;
      if (r.ok) {
        statusDiv.innerHTML = `<span style="color:#16A34A; font-weight:600;">✓ Connection successful — ${latency}ms</span>`;
      } else {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error?.message || `HTTP ${r.status}`);
      }
    } catch (err) {
      const isNetError = err.message === 'Failed to fetch' || err.name === 'TypeError';
      statusDiv.innerHTML = isNetError
        ? `<span style="color:#E11D48; font-weight:600;">✗ Cannot reach server</span><br><span style="font-size:11px;color:#64748B;">Check URL and ensure CORS is enabled. Local servers: <code>http://localhost:PORT/v1</code></span>`
        : `<span style="color:#E11D48; font-weight:600;">✗ ${err.message}</span>`;
    } finally {
      testBtn.disabled = false;
      testBtn.style.opacity = '1';
      testBtn.innerText = 'Test Connection';
    }
  });

  // Connect / Next Button Event
  connectBtn.addEventListener('click', async () => {
    const apiKey = connectPageView.querySelector('#sidebarApiKey').value.trim();
    const baseUrlRaw = connectPageView.querySelector('#sidebarBaseUrl')?.value.trim() || '';
    const baseUrl = normalizeBaseUrl(baseUrlRaw) || normalizeBaseUrl(model.settings?.baseUrl) || '';

    // Determine if this is a local server (no API key needed)
    const isLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(baseUrl);

    // Well-known providers have built-in default base URLs — don't require explicit one
    const wellKnownProviders = ['OpenAI', 'Anthropic', 'Google', 'xAI', 'Groq', 'DeepSeek', 'Mistral AI', 'Mistral', 'Cohere', 'HuggingFace', 'Meta'];
    const isWellKnown = wellKnownProviders.includes(model.provider);

    // Validate API key requirement
    if (!apiKey && !isLocal) {
      if (model.type !== 'provider' || isWellKnown) {
        statusDiv.innerHTML = `<span style="color:#E11D48; font-weight:600;">✗ Please enter an API Key.</span>`;
        return;
      }
    }

    if (!baseUrl && !isWellKnown && model.type === 'provider') {
      statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">✗ Please enter a Base URL.</span>`;
      return;
    }

    connectBtn.disabled = true;
    connectBtn.innerText = 'Connecting...';
    statusDiv.innerHTML = `<span>⏳ Checking API connection and fetching models...</span>`;

    let fetchedModels = [];
    try {
      fetchedModels = await validateAndFetchModels(model.provider || model.name, apiKey, baseUrl);
    } catch (err) {
      const isNetError = err.message === 'Failed to fetch' || err.name === 'TypeError';
      const provLower = (model.provider || model.name || '').toLowerCase();
      if (isNetError && (isWellKnown || provLower === 'openai' || provLower === 'anthropic' || provLower === 'google')) {
        // CORS fallback
        const defKey = provLower.replace(' ai', '');
        const defModels = defaultProviderModelsMap[defKey] || [];
        fetchedModels = defModels.map(dm => dm.id);
        console.warn(`Connection warning: Network/CORS block. Using offline models fallback:`, err);
        statusDiv.innerHTML = `<span style="color:#E28743;font-weight:600;">✓ Connected (CORS offline fallback)</span>`;
      } else {
        statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">Could not connect: ${friendlyError(err, baseUrl)}</span>`;
        connectBtn.disabled = false;
        connectBtn.innerText = model.status === 'connected' ? 'Save' : `Connect to ${model.name || model.provider}`;
        return;
      }
    }

    if (model.type === 'provider') {
      const checkedBoxes = modelsContainer?.querySelectorAll('.model-select-checkbox:checked') || [];
      const manualModel = connectPageView.querySelector('#sidebarProviderManualModel')?.value.trim();
      const effectiveBaseUrl = baseUrl || model.settings?.baseUrl || '';
      const providerData = { name: model.name, baseUrl: effectiveBaseUrl, apiKey };

      let modelIds = [];
      if (checkedBoxes.length > 0) {
        modelIds = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-model-id'));
      } else if (manualModel) {
        modelIds = [manualModel];
      } else if (fetchedModels.length > 0) {
        modelIds = fetchedModels;
      }

      if (modelIds.length > 0) {
        store.addProviderWithModels(providerData, modelIds);
        store.updateModelStatus(model.id, 'connected');
        store.updateModelSettings(model.id, { apiKey, baseUrl: effectiveBaseUrl });
        statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ Connected ${modelIds.length} model${modelIds.length !== 1 ? 's' : ''}!</span>`;
        
        // Auto-select the first connected model
        const selectedModel = store.getState().models.find(m => m.id === modelIds[0] || m.name === modelIds[0]);
        if (selectedModel) {
          store.setActiveModel(selectedModel.name);
        } else {
          const fallback = store.getState().models.find(m => m.id === modelIds[0]);
          store.setActiveModel(fallback ? fallback.name : modelIds[0]);
        }

        setTimeout(() => {
          closeSidebar();
        }, 600);
      } else {
        store.updateModelStatus(model.id, 'connected');
        store.updateModelSettings(model.id, { apiKey, baseUrl: effectiveBaseUrl });
        statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ Connected ${model.name}!</span>`;
        setTimeout(() => {
          closeSidebar();
        }, 600);
      }
    } else {
      // Official model connection
      const checkboxes = connectPageView.querySelectorAll('.model-select-checkbox');
      checkboxes.forEach(cb => {
        const pmId = cb.getAttribute('data-model-id');
        const isChecked = cb.checked;
        store.updateModelSettings(pmId, { apiKey, baseUrl });
        store.updateModelStatus(pmId, isChecked ? 'connected' : 'disconnected');
      });
      // Also save to the current model if not in the checkboxes
      store.updateModelSettings(model.id, { apiKey, baseUrl });
      store.updateModelStatus(model.id, 'connected');
      
      store.setActiveModel(model.name || model.id);

      setTimeout(() => {
        closeSidebar();
      }, 600);
    }
  });
}

export function openAddProviderModal(store) {
  injectModalStyles();

  const connectPageView = document.getElementById('connectPageView');
  if (!connectPageView) return;

  const pageContentHtml = `
    <div class="wizard-card">
      <!-- Close button -->
      <button class="wizard-close-btn" id="zedSidebarClose" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Logo Visual Row -->
      <div class="wizard-brand-row">
        <div class="logo-node zed-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="logo">
            <path d="M 7.5,7 H 16.5 V 9.5 L 11.0,14.5 H 16.5 V 17 H 7.5 V 14.5 L 13.0,9.5 H 7.5 Z" fill="#FFFFFF"/>
          </svg>
        </div>
        
        <div class="brand-connect-arrow">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="12" x2="34" y2="12" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 3"/>
            <path d="M10 8L6 12L10 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 8L34 12L30 16" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="logo-node provider-logo-node">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      </div>

      <!-- Heading -->
      <div class="wizard-header" style="margin-bottom: 0;">
        <h2 style="font-size: 28px; font-weight: 700; color: #111111; margin: 0 0 6px 0; letter-spacing: -0.02em;">Connect Custom Provider to Zed</h2>
        <p style="font-size: 14px; color: #6B7280; margin: 0;">Configure your custom provider connection credentials and select which models to enable.</p>
      </div>

      <!-- Inputs Container -->
      <div class="zed-modal-field">
        <label for="sidebarProviderName">Provider Name</label>
        <input type="text" id="sidebarProviderName" placeholder="e.g. Ollama, LM Studio, OpenRouter">
      </div>

      <div class="zed-modal-field">
        <label for="sidebarProviderBaseUrl">Base URL</label>
        <input type="text" id="sidebarProviderBaseUrl" placeholder="http://localhost:11434/v1 or https://api.example.com/v1">
        <span style="font-size: 13px; color: #6B7280; margin-top: 6px; display: block;">Enter the full URL with protocol. Local: <code style="background:#F1F5F9;padding:2px 4px;border-radius:4px;font-family:monospace;font-size:12px;color:#111;">http://localhost:PORT/v1</code></span>
      </div>

      <div class="zed-modal-field">
        <label for="sidebarProviderApiKey">API Key <span style="font-weight:400; color:#9CA3AF;">(optional for local servers)</span></label>
        <div class="zed-password-wrapper">
          <input type="password" id="sidebarProviderApiKey" placeholder="sk-... or leave empty for local">
          <button class="zed-password-toggle" type="button" aria-label="Toggle password visibility">
            <svg class="eye-open" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-closed" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
        <span style="font-size: 13px; color: #6B7280; margin-top: 6px; display: inline-flex; align-items: center; gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #6B7280; display: inline-block; vertical-align: middle;">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Your API key is stored in your browser's local storage.
        </span>
      </div>

      <!-- Available Models Box -->
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: #111111; margin: 0 0 4px 0;">Available Models</h4>
            <p style="font-size: 13.5px; color: #6B7280; margin: 0;">Fetch and select the models you want to enable.</p>
          </div>
          <button id="zedFetchModelsBtn" class="wizard-fetch-btn">
            <svg class="refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            Fetch Models
          </button>
        </div>
        <div id="zedProviderModelsContainer" style="margin-top: 12px;">
          <p style="font-size:12.5px;color:#6B7280;padding:12px;background:#F8FAFC;border-radius:12px;margin:0;border: 1px solid #F1F5F9;">Enter the Base URL above then click <strong>Fetch Models</strong> to load real models from the endpoint.</p>
        </div>
      </div>

      <!-- Enable for Agents Box -->
      <div class="agents-section" style="margin-top: 10px;">
        <h4 style="font-size: 16px; font-weight: 700; color: #111111; margin: 0 0 4px 0;">Enable for Agents</h4>
        <p style="font-size: 13.5px; color: #6B7280; margin: 0 0 12px 0;">Choose which agents can use these models.</p>
        <div class="agents-row-container" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="research" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/research_avatar.png" alt="Research Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Research Agent</span>
          </label>
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="coding" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/coder_avatar.png" alt="Coding Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Coding Agent</span>
          </label>
          <label class="agent-checkbox-card">
            <input type="checkbox" class="agent-select-checkbox" data-agent-id="assistant" checked>
            <span class="custom-checkmark"></span>
            <img src="assets/models/assistant_avatar.png" alt="Assistant Agent" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
            <span class="agent-name-label">Assistant Agent</span>
          </label>
          
          <!-- +2 more dropdown pill -->
          <div class="agent-dropdown-wrapper" style="position: relative;">
            <button type="button" class="agent-more-pill" id="agentMorePillBtn">
              <span>+2 more</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; display: inline-block; vertical-align: middle;">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="agent-dropdown-menu" id="agentMoreMenu">
              <label class="agent-dropdown-item" style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #111111; cursor: pointer; font-weight: 550;">
                <input type="checkbox" class="agent-select-checkbox" data-agent-id="data-analyst">
                <span class="custom-checkmark"></span>
                <img src="assets/models/finance_avatar.png" alt="Data Analyst" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
                <span>Data Analyst</span>
              </label>
              <label class="agent-dropdown-item" style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #111111; cursor: pointer; font-weight: 550;">
                <input type="checkbox" class="agent-select-checkbox" data-agent-id="content-writer">
                <span class="custom-checkmark"></span>
                <img src="assets/models/social_avatar.png" alt="Content Writer" style="width: 18px; height: 18px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
                <span>Content Writer</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="wizard-footer-actions" style="margin-top: 10px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
        <div id="zedTestConnStatus" style="font-size: 13px; font-weight: 550; min-height: 18px; margin-right: auto; color: #16A34A;"></div>
        <button class="zed-btn-bw-secondary" id="zedSidebarCancel">Cancel</button>
        <button class="zed-btn-bw-secondary" id="zedSidebarTestConn">Test Connection</button>
        <button class="zed-btn-bw-primary" id="zedSidebarAddAction">Connect Custom Provider</button>
      </div>
    </div>
  `;

  connectPageView.innerHTML = pageContentHtml;

  const closeBtn = connectPageView.querySelector('#zedSidebarClose');
  const cancelBtn = connectPageView.querySelector('#zedSidebarCancel');
  const addBtn = connectPageView.querySelector('#zedSidebarAddAction');
  const testBtn = connectPageView.querySelector('#zedSidebarTestConn');
  const fetchModelsBtn = connectPageView.querySelector('#zedFetchModelsBtn');
  const modelsContainer = connectPageView.querySelector('#zedProviderModelsContainer');
  const statusDiv = connectPageView.querySelector('#zedTestConnStatus');

  const modelsPageView = document.getElementById('modelsPageView');
  if (modelsPageView) modelsPageView.style.display = 'none';
  connectPageView.style.display = 'flex';

  const closeSidebar = () => {
    connectPageView.style.display = 'none';
    if (modelsPageView) modelsPageView.style.display = 'block';
  };

  closeBtn.addEventListener('click', closeSidebar);
  cancelBtn.addEventListener('click', closeSidebar);

  // Dynamic connect button label based on input
  const providerNameInput = connectPageView.querySelector('#sidebarProviderName');
  if (providerNameInput) {
    providerNameInput.addEventListener('input', () => {
      const val = providerNameInput.value.trim();
      addBtn.textContent = val ? `Connect to ${val}` : 'Connect Custom Provider';
    });
  }

  // Password toggle
  const apiToggle = connectPageView.querySelector('.zed-password-toggle');
  if (apiToggle) {
    apiToggle.addEventListener('click', () => {
      const inp = connectPageView.querySelector('#sidebarProviderApiKey');
      if (inp) {
        const isPass = inp.type === 'password';
        inp.type = isPass ? 'text' : 'password';
        apiToggle.querySelector('.eye-open').style.display = isPass ? 'none' : 'block';
        apiToggle.querySelector('.eye-closed').style.display = isPass ? 'block' : 'none';
      }
    });
  }

  // Agent Dropdown toggle binding
  const agentMorePillBtn = connectPageView.querySelector('#agentMorePillBtn');
  const agentMoreMenu = connectPageView.querySelector('#agentMoreMenu');
  if (agentMorePillBtn && agentMoreMenu) {
    agentMorePillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      agentMoreMenu.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      agentMoreMenu.classList.remove('show');
    });
    agentMoreMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // --- FETCH REAL MODELS from the API ---
  fetchModelsBtn.addEventListener('click', async () => {
    const baseUrlRaw = connectPageView.querySelector('#sidebarProviderBaseUrl').value.trim();
    const apiKey = connectPageView.querySelector('#sidebarProviderApiKey').value.trim();

    if (!baseUrlRaw) {
      modelsContainer.innerHTML = `<p style="color:#E11D48;font-size:12.5px;font-weight:600;margin-top:12px;">⚠ Enter a Base URL first.</p>`;
      return;
    }

    const baseUrl = normalizeBaseUrl(baseUrlRaw);
    fetchModelsBtn.disabled = true;
    fetchModelsBtn.innerHTML = `<span style="opacity:0.6;">Loading...</span>`;
    modelsContainer.innerHTML = `<p style="font-size:12.5px;color:#6B7280;padding:12px;background:#F8FAFC;border-radius:12px;margin:12px 0 0 0;border:1px solid #F1F5F9;">⏳ Fetching models from ${baseUrl}...</p>`;

    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    try {
      const r = await fetch(`${baseUrl}/models`, { headers });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error?.message || `HTTP ${r.status}`);
      }
      const data = await r.json();

      // Parse multiple response formats
      let modelList = [];
      if (data.data && Array.isArray(data.data)) {
        modelList = data.data.map(m => m.id || m.name).filter(Boolean);
      } else if (Array.isArray(data)) {
        modelList = data.map(m => m.id || m.name || m).filter(Boolean);
      } else if (data.models && Array.isArray(data.models)) {
        modelList = data.models.map(m => m.name || m.id || m).filter(Boolean);
      } else if (data.object === 'list' && data.data) {
        modelList = data.data.map(m => m.id).filter(Boolean);
      }

      if (modelList.length === 0) {
        throw new Error('No models found in response. Try entering a model ID manually.');
      }

      // Render as selectable checkboxes
      modelsContainer.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;margin-bottom:8px;">
          <span style="font-size:13px;color:#6B7280;font-weight:600;">${modelList.length} model${modelList.length !== 1 ? 's' : ''} found</span>
          <button id="zedSelectAllModels" style="font-size:13px;color:#111111;background:none;border:none;cursor:pointer;font-weight:600;text-decoration:underline;">Select all</button>
        </div>
        <div class="models-list-box" style="max-height:240px;overflow-y:auto;margin-top:0;">
          ${modelList.slice(0, 30).map(id => `
            <div class="model-row-item">
              <label class="custom-checkbox-wrapper" title="${id}">
                <input type="checkbox" class="model-select-checkbox" data-model-id="${id}" checked>
                <span class="custom-checkmark"></span>
                <span class="model-name-label" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px;">${id}</span>
              </label>
              <span class="model-type-label">Text Generation</span>
            </div>
          `).join('')}
        </div>
        ${modelList.length > 30 ? `<p style="font-size:12px;color:#94A3B8;margin-top:8px;text-align:center;">Showing first 30 of ${modelList.length} models <button id="zedShowAllModels" style="background:none;border:none;color:#111111;cursor:pointer;font-weight:600;text-decoration:underline;font-size:12px;margin-left:4px;">Show all</button></p>` : ''}
      `;

      const selectAllBtn = modelsContainer.querySelector('#zedSelectAllModels');
      if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
          const cbs = modelsContainer.querySelectorAll('.model-select-checkbox');
          const allChecked = Array.from(cbs).every(c => c.checked);
          cbs.forEach(c => { c.checked = !allChecked; });
          selectAllBtn.textContent = allChecked ? 'Select all' : 'Deselect all';
        });
      }

      const showAllBtn = modelsContainer.querySelector('#zedShowAllModels');
      if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
          const checkboxList = modelsContainer.querySelector('.models-list-box');
          const remaining = modelList.slice(30).map(id => `
            <div class="model-row-item">
              <label class="custom-checkbox-wrapper" title="${id}">
                <input type="checkbox" class="model-select-checkbox" data-model-id="${id}" checked>
                <span class="custom-checkmark"></span>
                <span class="model-name-label" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px;">${id}</span>
              </label>
              <span class="model-type-label">Text Generation</span>
            </div>
          `).join('');
          checkboxList.insertAdjacentHTML('beforeend', remaining);
          showAllBtn.closest('p').remove();
        });
      }

      statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ ${modelList.length} models loaded — select which to enable</span>`;

    } catch (err) {
      const isNetError = err.message === 'Failed to fetch' || err.name === 'TypeError';
      const cleanMsg = friendlyError(err);
      modelsContainer.innerHTML = `
        <div style="padding:16px;background:#FFF8F8;border:1px solid rgba(225,29,72,0.1);border-radius:12px;margin-top:12px;">
          <p style="color:#E11D48;font-size:13px;font-weight:600;margin:0 0 6px;">Could not fetch models</p>
          <p style="font-size:12px;color:#6B7280;margin:0 0 10px;">${cleanMsg}</p>
          ${isNetError ? `<p style="font-size:12px;color:#6B7280;margin:0 0 10px;">URL: <code style="background:#F1F5F9;padding:2px 4px;border-radius:4px;font-family:monospace;font-size:12px;color:#111;">${baseUrl}</code></p>` : ''}
          <label style="font-size:13px;color:#111111;font-weight:600;display:block;margin-bottom:6px;">Enter model ID manually:</label>
          <input type="text" id="sidebarProviderManualModel" placeholder="e.g. llama3:8b, mistral, gpt-4" style="width:100%;height:36px;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:0 12px;font-family:Inter,sans-serif;font-size:13px;outline:none;box-sizing:border-box;">
        </div>
      `;
    } finally {
      fetchModelsBtn.disabled = false;
      fetchModelsBtn.innerHTML = `
        <svg class="refresh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
        Refresh
      `;
    }
  });

  // Test Connection
  testBtn.addEventListener('click', async () => {
    const baseUrlRaw = connectPageView.querySelector('#sidebarProviderBaseUrl').value.trim();
    const apiKey = connectPageView.querySelector('#sidebarProviderApiKey').value.trim();
    const name = connectPageView.querySelector('#sidebarProviderName').value.trim() || 'provider';

    if (!baseUrlRaw) {
      statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">✗ Base URL is required</span>`;
      return;
    }

    testBtn.disabled = true;
    testBtn.style.opacity = '0.6';
    testBtn.innerText = 'Testing...';
    statusDiv.innerHTML = `<span style="color:#64748B;">⏳ Connecting to ${name}...</span>`;

    const baseUrl = normalizeBaseUrl(baseUrlRaw);
    const t0 = Date.now();
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    try {
      const r = await fetch(`${baseUrl}/models`, { headers });
      const latency = Date.now() - t0;
      if (r.ok) {
        statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ Server reachable — ${latency}ms</span>`;
      } else {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error?.message || `HTTP ${r.status}`);
      }
    } catch (err) {
      const isNetError = err.message === 'Failed to fetch' || err.name === 'TypeError';
      statusDiv.innerHTML = isNetError
        ? `<span style="color:#E11D48;font-weight:600;">✗ Cannot reach server</span><br><span style="font-size:11px;color:#64748B;">Check URL: <code>${normalizeBaseUrl(baseUrlRaw)}</code></span>`
        : `<span style="color:#E11D48;font-weight:600;">✗ ${err.message}</span>`;
    } finally {
      testBtn.disabled = false;
      testBtn.style.opacity = '1';
      testBtn.innerText = 'Test Connection';
    }
  });

  // Connect — register real models in store
  addBtn.addEventListener('click', async () => {
    const name = connectPageView.querySelector('#sidebarProviderName').value.trim();
    const baseUrlRaw = connectPageView.querySelector('#sidebarProviderBaseUrl').value.trim();
    const apiKey = connectPageView.querySelector('#sidebarProviderApiKey').value.trim();
    const baseUrl = normalizeBaseUrl(baseUrlRaw);

    if (!name) {
      statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">✗ Provider Name is required.</span>`;
      return;
    }
    if (!baseUrlRaw) {
      statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">✗ Base URL is required.</span>`;
      return;
    }

    addBtn.disabled = true;
    addBtn.innerText = 'Connecting...';
    statusDiv.innerHTML = `<span>⏳ Checking API connection and fetching models...</span>`;

    let modelIds = [];
    try {
      modelIds = await validateAndFetchModels(name, apiKey, baseUrl);
    } catch (err) {
      statusDiv.innerHTML = `<span style="color:#E11D48;font-weight:600;">Could not connect: ${friendlyError(err, baseUrl)}</span>`;
      addBtn.disabled = false;
      addBtn.innerText = `Connect to ${name}`;
      return;
    }

    // Collect selected checkboxes (real fetched models)
    const checkedBoxes = modelsContainer.querySelectorAll('.model-select-checkbox:checked');
    const manualModel = connectPageView.querySelector('#sidebarProviderManualModel')?.value.trim();

    const providerData = { name, baseUrl, apiKey };

    let connectedIds = [];
    if (checkedBoxes.length > 0) {
      connectedIds = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-model-id'));
    } else if (manualModel) {
      connectedIds = [manualModel];
    } else if (modelIds.length > 0) {
      connectedIds = modelIds;
    }

    if (connectedIds.length > 0) {
      store.addProviderWithModels(providerData, connectedIds);
      statusDiv.innerHTML = `<span style="color:#16A34A;font-weight:600;">✓ Connected ${connectedIds.length} model${connectedIds.length !== 1 ? 's' : ''}!</span>`;
      
      store.setActiveModel(connectedIds[0]);

      setTimeout(() => {
        closeSidebar();
      }, 600);
    } else {
      // Fallback: No models found, add custom provider with a default
      store.addCustomProvider({ name, baseUrl, apiKey });
      statusDiv.innerHTML = `<span style="color:#64748B;font-weight:600;">ℹ Custom provider added.</span>`;
      setTimeout(() => {
        closeSidebar();
      }, 600);
    }
  });
}


