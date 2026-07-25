// Sidebar functionality
export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navItems = document.querySelectorAll('.nav-item');

  // Desktop sidebar toggle button click handler
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarExpandBtn = document.getElementById('sidebarExpandBtn');

  const updateExpandBtn = () => {
    if (sidebarExpandBtn) {
      sidebarExpandBtn.style.display = sidebar.classList.contains('collapsed') || sidebar.classList.contains('hidden-sidebar') ? 'flex' : 'none';
    }
  };

  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    sidebar.classList.toggle('collapsed');
    updateExpandBtn();
  };

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('hidden-sidebar');
    });
  }
  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('collapsed');
      updateExpandBtn();
    });
  }

  // Expand button - click to restore full sidebar
  if (sidebarExpandBtn && sidebar) {
    sidebarExpandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.remove('collapsed');
      sidebar.classList.remove('hidden-sidebar');
      updateExpandBtn();
    });
  }

  // Keyboard shortcut Ctrl+\ to toggle sidebar
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
      e.preventDefault();
      if (sidebar) {
        if (sidebar.classList.contains('collapsed') || sidebar.classList.contains('hidden-sidebar')) {
          sidebar.classList.remove('collapsed');
          sidebar.classList.remove('hidden-sidebar');
        } else {
          sidebar.classList.add('collapsed');
        }
        updateExpandBtn();
      }
    }
  });

  // Toggle sidebar on mobile/tablet hamburger click
  if (mobileHamburger && sidebar) {
    mobileHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      // Hide status bar when sidebar is open on mobile
      const statusBar = document.getElementById('subagentStatusBar');
      if (statusBar) {
        statusBar.style.display = sidebar.classList.contains('open') ? 'none' : '';
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && e.target !== mobileHamburger) {
          sidebar.classList.remove('open');
          // Restore status bar when sidebar closes
          const statusBar = document.getElementById('subagentStatusBar');
          if (statusBar) statusBar.style.display = '';
        }
      }
    });
  }

  // Router will handle active state toggling and view switching


  // Handle new project button click
  const addProjectBtn = document.getElementById('addProjectBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('New project feature coming soon.', 'info');
    });
  }

  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
      showToast('New project feature coming soon.', 'info');
    });
  }

  const navNewProject = document.getElementById('navNewProject');
  if (navNewProject) {
    navNewProject.addEventListener('click', () => {
      showToast('New project feature coming soon.', 'info');
    });
  }
}
