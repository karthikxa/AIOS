// Sidebar functionality
export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navItems = document.querySelectorAll('.nav-item');

  // Toggle sidebar on mobile/tablet hamburger click
  if (mobileHamburger && sidebar) {
    mobileHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && e.target !== mobileHamburger) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // Router will handle active state toggling and view switching


  // Handle new project button click simulation
  const addProjectBtn = document.getElementById('addProjectBtn');
  const newProjectBtn = document.getElementById('newProjectBtn');
  
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert('Simulation: Create new project dialog.');
    });
  }

  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
      alert('Simulation: Create new project dialog.');
    });
  }

  const navNewProject = document.getElementById('navNewProject');
  if (navNewProject) {
    navNewProject.addEventListener('click', () => {
      alert('Simulation: Create new project dialog.');
    });
  }
}
