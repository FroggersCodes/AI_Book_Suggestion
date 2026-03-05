// ===================================
// Top-Level Navigation Controller
// ===================================
const NAV_PAGES = ["simple", "advanced", "track", "contact"];

function switchTab(tabId) {
  // Hide all page containers
  NAV_PAGES.forEach((id) => {
    const page = document.getElementById(`page-${id}`);
    if (page) page.classList.remove("page-active");
  });

  // Deactivate all tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected page
  const page = document.getElementById(`page-${tabId}`);
  if (page) page.classList.add("page-active");

  // Activate selected tab
  const tab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
  if (tab) tab.classList.add("active");

  // Hide both progress headers when switching tabs
  const progressHeader = document.getElementById("progress-header");
  if (progressHeader) progressHeader.classList.add("hidden");
  const simpleProgressHeader = document.getElementById("simple-progress-header");
  if (simpleProgressHeader) simpleProgressHeader.classList.add("hidden");

  // Scroll to top
  window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  // Attach click handlers to nav tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });

  // Default to Simple mode
  switchTab("simple");
});
