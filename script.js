/**
 * ShowCase – Product Showcase Platform
 * script.js: Core application controller, hash-based SPA router, catalog filters,
 * wishlist, comparison matrix, interactive 360 demo, reviews, and admin dashboard.
 *
 * Task ID: WD-SW-003 – Data Alcott Systems
 */

// ==========================================================================
// 1. APPLICATION STATE
// ==========================================================================
const AppState = {
  activeSection: "home",
  catalogFilters: {
    search: "",
    category: "all",
    subcategory: "all",
    brand: "all",
    maxPrice: 1500,
    minRating: 0,
    stock: [],
    badgeFilter: "all",
    sort: "featured",
    viewMode: "grid" // 'grid' | 'list'
  },
  currentDetailProductId: null,
  activeDetailImageIndex: 0,
  activeStarReviewScore: 5
};

// ==========================================================================
// 2. DOM INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Theme
  initTheme();

  // 2. Render Sticky Navigation & Mega-Menu
  renderMegaMenu();
  updateNavBadges();
  renderUserNavWidget();

  // 3. Initialize Hash Router
  window.addEventListener("hashchange", handleHashRouting);
  handleHashRouting(); // Run on initial load

  // 4. Setup Global Event Listeners
  setupGlobalListeners();
  setupCatalogListeners();
  setupDetailListeners();
  setupAdminListeners();
  setupDemoListeners();
});

// ==========================================================================
// 3. HASH-BASED ROUTING SYSTEM
// ==========================================================================
/**
 * Single-Page Router: Parses window.location.hash and switches visible section.
 * Supports query parameters, e.g. #product-detail?id=prod-1 or #catalog?filter=featured
 */
function handleHashRouting() {
  const fullHash = window.location.hash || "#home";
  const [sectionHash, queryString] = fullHash.split("?");
  const sectionId = sectionHash.replace("#", "") || "home";

  // Parse Query Parameters
  const params = new URLSearchParams(queryString || "");

  // Role shortcut for direct testing & automated screenshots
  if (params.get("role") === "admin") {
    const adminUser = getStoredUsers().find(u => u.role === "admin") || INITIAL_USERS[0];
    setCurrentUser(adminUser);
    renderUserNavWidget();
  } else if (params.get("role") === "user") {
    const stdUser = getStoredUsers().find(u => u.role === "user") || INITIAL_USERS[1];
    setCurrentUser(stdUser);
    renderUserNavWidget();
  }

  // Update State
  AppState.activeSection = sectionId;

  // Toggle Section Visibility
  const sections = document.querySelectorAll(".page-section");
  let activeSectionEl = document.getElementById(`section-${sectionId}`);

  if (!activeSectionEl) {
    activeSectionEl = document.getElementById("section-home");
    AppState.activeSection = "home";
  }

  sections.forEach(sec => sec.classList.remove("active"));
  activeSectionEl.classList.add("active");

  // Update Nav Links Active State
  document.querySelectorAll(".nav-link").forEach(link => {
    const targetNav = link.getAttribute("data-nav");
    if (targetNav === AppState.activeSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close Mobile Menu if open
  closeMobileMenu();

  // Window scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Route-Specific Renderers
  switch (AppState.activeSection) {
    case "home":
      renderHomePage();
      break;

    case "catalog":
      // Check query params for preset filters
      if (params.has("category")) {
        AppState.catalogFilters.category = params.get("category");
      }
      if (params.has("subcategory")) {
        AppState.catalogFilters.subcategory = params.get("subcategory");
      }
      if (params.has("brand")) {
        AppState.catalogFilters.brand = params.get("brand");
      }
      if (params.has("filter")) {
        AppState.catalogFilters.badgeFilter = params.get("filter");
      }
      renderCatalogPage();
      break;

    case "product-detail":
      const prodId = params.get("id") || (getStoredProducts()[0] && getStoredProducts()[0].id);
      AppState.currentDetailProductId = prodId;
      renderProductDetailPage(prodId);
      break;

    case "categories":
      renderCategoriesPage();
      break;

    case "compare":
      renderComparePage();
      break;

    case "wishlist":
      renderWishlistPage();
      break;

    case "demo":
      renderDemoPage();
      break;

    case "brands":
      renderBrandsPage();
      break;

    case "contact":
      renderContactPage();
      break;

    case "login":
      renderLoginPage();
      break;

    case "admin":
      renderAdminPage();
      break;
  }
}

// ==========================================================================
// 4. THEME & GLOBAL CONTROLS
// ==========================================================================
function initTheme() {
  const currentTheme = getStoredTheme();
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
    icon.style.color = "#F59E0B";
  } else {
    icon.className = "fa-solid fa-moon";
    icon.style.color = "";
  }
}

function toggleTheme() {
  const currentTheme = getStoredTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setStoredTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  updateThemeIcon(newTheme);
  showToast(`Switched to ${newTheme} mode`, "info");
}

function setupGlobalListeners() {
  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const navMenu = document.getElementById("nav-menu");
      const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("open");
    });
  }

  // Mobile Mega Menu Sub-toggle
  const megaParent = document.getElementById("mega-menu-parent");
  const megaTrigger = document.getElementById("mega-menu-trigger");
  if (megaTrigger && window.innerWidth <= 768) {
    megaTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        megaParent.classList.toggle("mobile-open");
      }
    });
  }

  // Quick Search Keyboard Shortcut (Ctrl+K or Cmd+K)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openQuickSearch();
    }
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Quick Search Modal Trigger
  const searchTrigger = document.getElementById("quick-search-trigger");
  if (searchTrigger) searchTrigger.addEventListener("click", openQuickSearch);

  const searchClose = document.getElementById("quick-search-close");
  if (searchClose) searchClose.addEventListener("click", closeQuickSearch);

  const searchInput = document.getElementById("quick-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleQuickSearch(e.target.value);
    });
  }

  // Reset Demo Data Button
  const resetBtn = document.getElementById("footer-reset-data-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all data to default mock records? Any custom products or reviews will be refreshed.")) {
        resetAllShowCaseData();
        showToast("Demo data reset successfully", "success");
        setTimeout(() => location.reload(), 600);
      }
    });
  }

  // Share Modal Actions
  const shareCopy = document.getElementById("share-copy-btn");
  if (shareCopy) {
    shareCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "success");
      closeAllModals();
    });
  }
  const shareClose = document.getElementById("share-modal-close");
  if (shareClose) shareClose.addEventListener("click", closeAllModals);
}

function closeMobileMenu() {
  const navMenu = document.getElementById("nav-menu");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  if (navMenu && hamburgerBtn) {
    navMenu.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
}

// Quick Search Handlers
function openQuickSearch() {
  const modal = document.getElementById("search-modal");
  const input = document.getElementById("quick-search-input");
  if (modal) {
    modal.classList.add("active");
    if (input) {
      input.value = "";
      input.focus();
      handleQuickSearch("");
    }
  }
}
function closeQuickSearch() {
  const modal = document.getElementById("search-modal");
  if (modal) modal.classList.remove("active");
}
function handleQuickSearch(query) {
  const container = document.getElementById("quick-search-results");
  if (!container) return;

  const q = query.trim().toLowerCase();
  const products = getStoredProducts();

  if (!q) {
    container.innerHTML = `<div class="search-empty-hint">Type keywords to search across all products, brands, or categories...</div>`;
    return;
  }

  const matches = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );

  if (matches.length === 0) {
    container.innerHTML = `<div class="search-empty-hint">No products matched "<strong>${escapeHtml(query)}</strong>".</div>`;
    return;
  }

  container.innerHTML = matches.map(p => `
    <a href="#product-detail?id=${p.id}" class="search-result-item" onclick="closeQuickSearch()">
      <div class="result-emoji">${p.images[0]?.emoji || '📦'}</div>
      <div class="result-info">
        <strong>${escapeHtml(p.name)}</strong>
        <span>${escapeHtml(p.brand)} &bull; $${p.price.toFixed(2)} &bull; ${p.stock_status}</span>
      </div>
      <span class="btn btn-ghost btn-sm">View &rarr;</span>
    </a>
  `).join("");
}

// Toast System
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-circle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
}

function updateNavBadges() {
  const compareBadge = document.getElementById("compare-count-badge");
  const wishlistBadge = document.getElementById("wishlist-count-badge");
  if (compareBadge) compareBadge.textContent = getCompareList().length;
  if (wishlistBadge) wishlistBadge.textContent = getWishlist().length;
}

// User Navigation Widget (Sign In vs Profile Dropdown)
function renderUserNavWidget() {
  const widget = document.getElementById("user-widget");
  if (!widget) return;

  const currentUser = getCurrentUser();

  if (!currentUser) {
    widget.innerHTML = `
      <a href="#login" class="btn btn-primary btn-sm" id="nav-login-btn">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Sign In</span>
      </a>
    `;
  } else {
    const initials = currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase();
    const isAdmin = currentUser.role === "admin";

    widget.innerHTML = `
      <div class="user-pill-btn" id="user-menu-toggle" tabindex="0">
        <span class="user-avatar-circle">${initials}</span>
        <span class="user-name-short">${escapeHtml(currentUser.name.split(" ")[0])}</span>
        ${isAdmin ? '<span class="badge badge-featured">Admin</span>' : ''}
        <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
      </div>
      <div class="user-dropdown-menu" id="user-dropdown-menu">
        <div class="user-dropdown-header">
          <div class="user-dropdown-name">${escapeHtml(currentUser.name)}</div>
          <div class="user-dropdown-email">${escapeHtml(currentUser.email)}</div>
        </div>
        ${isAdmin ? `
          <a href="#admin" class="user-dropdown-item">
            <i class="fa-solid fa-shield-halved"></i> Admin Dashboard
          </a>
        ` : ''}
        <a href="#wishlist" class="user-dropdown-item">
          <i class="fa-solid fa-heart"></i> My Wishlist
        </a>
        <a href="#compare" class="user-dropdown-item">
          <i class="fa-solid fa-code-compare"></i> My Comparisons
        </a>
        <div style="border-top: 1px solid var(--border-color); margin: 0.3rem 0;"></div>
        <button class="user-dropdown-item btn-link" id="user-logout-btn" style="width: 100%; text-align: left; color: var(--color-danger);">
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
        </button>
      </div>
    `;

    // Dropdown toggle listener
    const menuToggle = document.getElementById("user-menu-toggle");
    const dropdown = document.getElementById("user-dropdown-menu");
    if (menuToggle && dropdown) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
      });
      document.addEventListener("click", () => dropdown.classList.remove("show"));
    }

    // Logout listener
    const logoutBtn = document.getElementById("user-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        setCurrentUser(null);
        showToast("Signed out successfully", "info");
        renderUserNavWidget();
        if (AppState.activeSection === "admin") {
          window.location.hash = "#home";
        }
      });
    }
  }
}

// ==========================================================================
// 5. MEGA-MENU RENDERING
// ==========================================================================
function renderMegaMenu() {
  const grid = document.getElementById("mega-menu-grid");
  if (!grid) return;

  const categories = getStoredCategories();
  const mainCategories = categories.filter(c => c.parent_id === null);

  grid.innerHTML = mainCategories.map(mainCat => {
    const subCategories = categories.filter(c => c.parent_id === mainCat.id);

    return `
      <div class="mega-col">
        <a href="#catalog?category=${mainCat.id}" class="mega-col-header">
          <span>${mainCat.icon}</span>
          <span>${escapeHtml(mainCat.name)}</span>
        </a>
        <div class="mega-sub-list">
          ${subCategories.map(sub => `
            <a href="#catalog?category=${mainCat.id}&subcategory=${sub.id}" class="mega-sub-link">
              <span>${sub.icon}</span>
              <span>${escapeHtml(sub.name)}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// 6. HOME PAGE RENDERERS
// ==========================================================================
function renderHomePage() {
  const products = getStoredProducts();
  const categories = getStoredCategories().filter(c => c.parent_id === null);
  const brands = getStoredBrands();

  // 1. Categories Strip
  const catGrid = document.getElementById("home-categories-grid");
  if (catGrid) {
    catGrid.innerHTML = categories.map(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      return `
        <div class="category-strip-card" onclick="window.location.hash = '#catalog?category=${cat.id}'">
          <div class="category-card-icon">${cat.icon}</div>
          <h4>${escapeHtml(cat.name)}</h4>
          <span class="category-count">${count} Products</span>
        </div>
      `;
    }).join("");
  }

  // 2. Featured Products Grid (top 4)
  const featuredGrid = document.getElementById("home-featured-grid");
  if (featuredGrid) {
    const featuredProds = products.filter(p => p.badges && p.badges.includes("Featured")).slice(0, 4);
    featuredGrid.innerHTML = featuredProds.map(p => createProductCardHTML(p)).join("");
  }

  // 3. Best Sellers Grid (top 4)
  const bestGrid = document.getElementById("home-bestseller-grid");
  if (bestGrid) {
    const bestProds = products.filter(p => p.badges && p.badges.includes("Best Seller")).slice(0, 4);
    bestGrid.innerHTML = bestProds.map(p => createProductCardHTML(p)).join("");
  }

  // 4. Latest Arrivals Grid (top 4)
  const newGrid = document.getElementById("home-new-grid");
  if (newGrid) {
    const newProds = products.filter(p => p.badges && p.badges.includes("New Arrival")).slice(0, 4);
    newGrid.innerHTML = newProds.map(p => createProductCardHTML(p)).join("");
  }

  // 5. Brands Strip
  const brandsGrid = document.getElementById("home-brands-grid");
  if (brandsGrid) {
    brandsGrid.innerHTML = brands.map(b => `
      <div class="brand-card" onclick="window.location.hash = '#catalog?brand=${encodeURIComponent(b.name)}'">
        <div class="brand-card-top">
          <div class="brand-logo-circle">${b.logo}</div>
          <div>
            <h4>${escapeHtml(b.name)}</h4>
            <span class="text-muted" style="font-size: 0.8rem;">${escapeHtml(b.country)}</span>
          </div>
        </div>
        <p class="text-muted" style="font-size: 0.88rem;">${escapeHtml(b.tagline)}</p>
      </div>
    `).join("");
  }

  // 6. Recently Viewed Shelf
  renderHomeRecentlyViewed();
}

function renderHomeRecentlyViewed() {
  const recentWrapper = document.getElementById("home-recent-wrapper");
  const recentGrid = document.getElementById("home-recent-grid");
  if (!recentWrapper || !recentGrid) return;

  const recentIds = getRecentlyViewed();
  if (recentIds.length === 0) {
    recentWrapper.style.display = "none";
    return;
  }

  recentWrapper.style.display = "block";
  const allProducts = getStoredProducts();
  const recentProducts = recentIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  recentGrid.innerHTML = recentProducts.map(p => createProductCardHTML(p)).join("");

  // Clear history button
  const clearBtn = document.getElementById("clear-recent-btn");
  if (clearBtn) {
    clearBtn.onclick = () => {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify([]));
      recentWrapper.style.display = "none";
      showToast("Browsing history cleared", "info");
    };
  }
}

// ==========================================================================
// 7. PRODUCT CARD TEMPLATE GENERATOR
// ==========================================================================
function createProductCardHTML(product) {
  const wishlist = getWishlist();
  const compareList = getCompareList();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Status Badge Class
  let stockBadgeClass = "badge-stock-in";
  let stockIcon = "🟢";
  if (product.stock_status === "Limited Stock") {
    stockBadgeClass = "badge-stock-limited";
    stockIcon = "🟡";
  } else if (product.stock_status === "Out of Stock") {
    stockBadgeClass = "badge-stock-out";
    stockIcon = "🔴";
  }

  // Primary image
  const primaryImg = product.images[0] || { emoji: "📦", bg: "linear-gradient(135deg, #7C3AED, #4C1D95)" };

  return `
    <div class="product-card" data-product-id="${product.id}">
      <!-- Image Stage -->
      <div class="product-card-img-wrap" style="background: ${primaryImg.bg};" onclick="window.location.hash = '#product-detail?id=${product.id}'">
        <span class="product-card-emoji">${primaryImg.emoji}</span>

        <!-- Badges Overlay -->
        <div class="card-top-badges">
          <span class="badge ${stockBadgeClass}">${stockIcon} ${product.stock_status}</span>
          ${product.badges.map(b => {
            let bClass = "badge-featured";
            if (b === "Best Seller") bClass = "badge-bestseller";
            if (b === "New Arrival") bClass = "badge-new";
            return `<span class="badge ${bClass}">${b}</span>`;
          }).join("")}
        </div>

        <!-- Quick Actions Overlay -->
        <div class="card-quick-actions" onclick="event.stopPropagation()">
          <button class="card-action-btn ${isWishlisted ? 'active-heart' : ''}" 
                  onclick="handleCardWishlistToggle('${product.id}', this)" 
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <button class="card-action-btn ${isCompared ? 'active' : ''}" 
                  onclick="handleCardCompareToggle('${product.id}', this)" 
                  title="${isCompared ? 'Remove from Compare' : 'Add to Compare'}">
            <i class="fa-solid fa-code-compare"></i>
          </button>
        </div>
      </div>

      <!-- Card Body -->
      <div class="product-card-body">
        <span class="card-brand-meta">${escapeHtml(product.brand)}</span>
        <h3 class="product-card-title">
          <a href="#product-detail?id=${product.id}">${escapeHtml(product.name)}</a>
        </h3>

        <div class="card-rating-row">
          <span class="star-score">★ ${product.rating.toFixed(1)}</span>
          <span class="review-count-text">(${getStoredReviews().filter(r => r.product_id === product.id).length} reviews)</span>
        </div>

        <div class="card-footer-flex">
          <div class="card-price-box">$${product.price.toFixed(2)}</div>
          <a href="#product-detail?id=${product.id}" class="btn btn-primary btn-sm">
            View Details
          </a>
        </div>
      </div>
    </div>
  `;
}

// Quick Card Action Handlers
function handleCardWishlistToggle(productId, btnEl) {
  const { added } = toggleWishlist(productId);
  updateNavBadges();
  if (btnEl) {
    btnEl.classList.toggle("active-heart", added);
    btnEl.innerHTML = `<i class="fa-${added ? 'solid' : 'regular'} fa-heart"></i>`;
  }
  showToast(added ? "Added to your wishlist!" : "Removed from wishlist", added ? "success" : "info");
}

function handleCardCompareToggle(productId, btnEl) {
  const result = toggleCompare(productId);
  if (result.error) {
    showToast(result.error, "error");
    return;
  }
  updateNavBadges();
  if (btnEl) {
    btnEl.classList.toggle("active", result.added);
  }
  showToast(result.added ? "Added to comparison list!" : "Removed from comparison", result.added ? "success" : "info");
}

// ==========================================================================
// 8. PRODUCT CATALOG PAGE LOGIC
// ==========================================================================
function setupCatalogListeners() {
  // Search input
  const searchInput = document.getElementById("catalog-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.catalogFilters.search = e.target.value.trim().toLowerCase();
      applyCatalogFilters();
    });
  }
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      AppState.catalogFilters.search = "";
      applyCatalogFilters();
    });
  }

  // Price Slider
  const priceSlider = document.getElementById("price-range-slider");
  const priceIndicator = document.getElementById("price-indicator");
  if (priceSlider && priceIndicator) {
    priceSlider.addEventListener("input", (e) => {
      const val = Number(e.target.value);
      priceIndicator.textContent = `$${val.toLocaleString()}`;
      AppState.catalogFilters.maxPrice = val;
      applyCatalogFilters();
    });
  }

  // Rating Radios
  document.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      AppState.catalogFilters.minRating = Number(e.target.value);
      applyCatalogFilters();
    });
  });

  // Stock Checkboxes
  document.querySelectorAll('input[name="stock-filter"]').forEach(chk => {
    chk.addEventListener("change", () => {
      const checkedBoxes = Array.from(document.querySelectorAll('input[name="stock-filter"]:checked')).map(c => c.value);
      AppState.catalogFilters.stock = checkedBoxes;
      applyCatalogFilters();
    });
  });

  // Sort Dropdown
  const sortSelect = document.getElementById("catalog-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.catalogFilters.sort = e.target.value;
      applyCatalogFilters();
    });
  }

  // Grid / List View Toggle Buttons
  const gridBtn = document.getElementById("view-grid-btn");
  const listBtn = document.getElementById("view-list-btn");
  const container = document.getElementById("catalog-products-container");
  if (gridBtn && listBtn && container) {
    gridBtn.addEventListener("click", () => {
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
      container.classList.remove("list-view");
      AppState.catalogFilters.viewMode = "grid";
    });
    listBtn.addEventListener("click", () => {
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
      container.classList.add("list-view");
      AppState.catalogFilters.viewMode = "list";
    });
  }

  // Clear All Filters
  const clearAllBtn = document.getElementById("clear-filters-btn");
  const emptyResetBtn = document.getElementById("empty-reset-filters-btn");
  const resetHandler = () => {
    AppState.catalogFilters = {
      search: "",
      category: "all",
      subcategory: "all",
      brand: "all",
      maxPrice: 1500,
      minRating: 0,
      stock: [],
      badgeFilter: "all",
      sort: "featured",
      viewMode: AppState.catalogFilters.viewMode
    };
    // Reset inputs
    if (searchInput) searchInput.value = "";
    if (priceSlider) {
      priceSlider.value = 1500;
      priceIndicator.textContent = "$1,500";
    }
    document.querySelectorAll('input[name="stock-filter"]').forEach(c => c.checked = false);
    const defaultRating = document.querySelector('input[name="rating-filter"][value="0"]');
    if (defaultRating) defaultRating.checked = true;
    if (sortSelect) sortSelect.value = "featured";

    renderCatalogPage();
    showToast("Filters reset to default", "info");
  };

  if (clearAllBtn) clearAllBtn.addEventListener("click", resetHandler);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetHandler);
}

function renderCatalogPage() {
  buildSidebarCategoryFilters();
  buildSidebarBrandFilters();
  applyCatalogFilters();
}

function buildSidebarCategoryFilters() {
  const container = document.getElementById("category-filter-list");
  if (!container) return;

  const categories = getStoredCategories().filter(c => c.parent_id === null);
  const products = getStoredProducts();

  container.innerHTML = `
    <label class="radio-option">
      <input type="radio" name="cat-filter" value="all" ${AppState.catalogFilters.category === 'all' ? 'checked' : ''} />
      <span>All Categories</span>
      <span class="count-pill">${products.length}</span>
    </label>
    ${categories.map(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      const isChecked = AppState.catalogFilters.category === cat.id;
      return `
        <label class="radio-option">
          <input type="radio" name="cat-filter" value="${cat.id}" ${isChecked ? 'checked' : ''} />
          <span>${cat.icon} ${escapeHtml(cat.name)}</span>
          <span class="count-pill">${count}</span>
        </label>
      `;
    }).join("")}
  `;

  container.querySelectorAll('input[name="cat-filter"]').forEach(r => {
    r.addEventListener("change", (e) => {
      AppState.catalogFilters.category = e.target.value;
      AppState.catalogFilters.subcategory = "all";
      applyCatalogFilters();
    });
  });
}

function buildSidebarBrandFilters() {
  const container = document.getElementById("brand-filter-list");
  if (!container) return;

  const brands = getStoredBrands();
  const products = getStoredProducts();

  container.innerHTML = `
    <label class="radio-option">
      <input type="radio" name="brand-filter" value="all" ${AppState.catalogFilters.brand === 'all' ? 'checked' : ''} />
      <span>All Brands</span>
      <span class="count-pill">${products.length}</span>
    </label>
    ${brands.map(b => {
      const count = products.filter(p => p.brand === b.name).length;
      const isChecked = AppState.catalogFilters.brand === b.name;
      return `
        <label class="radio-option">
          <input type="radio" name="brand-filter" value="${escapeHtml(b.name)}" ${isChecked ? 'checked' : ''} />
          <span>${b.logo} ${escapeHtml(b.name)}</span>
          <span class="count-pill">${count}</span>
        </label>
      `;
    }).join("")}
  `;

  container.querySelectorAll('input[name="brand-filter"]').forEach(r => {
    r.addEventListener("change", (e) => {
      AppState.catalogFilters.brand = e.target.value;
      applyCatalogFilters();
    });
  });
}

function applyCatalogFilters() {
  const allProducts = getStoredProducts();
  const { search, category, subcategory, brand, maxPrice, minRating, stock, badgeFilter, sort } = AppState.catalogFilters;

  let filtered = allProducts.filter(p => {
    // 1. Search filter
    if (search) {
      const textMatch = p.name.toLowerCase().includes(search) ||
                        p.brand.toLowerCase().includes(search) ||
                        p.description.toLowerCase().includes(search) ||
                        p.tags.some(t => t.toLowerCase().includes(search));
      if (!textMatch) return false;
    }

    // 2. Category filter
    if (category !== "all" && p.category !== category) return false;
    if (subcategory !== "all" && p.subcategory !== subcategory) return false;

    // 3. Brand filter
    if (brand !== "all" && p.brand !== brand) return false;

    // 4. Price slider filter
    if (p.price > maxPrice) return false;

    // 5. Star rating filter
    if (minRating > 0 && p.rating < minRating) return false;

    // 6. Stock status filter
    if (stock.length > 0 && !stock.includes(p.stock_status)) return false;

    // 7. Badge preset filter (e.g. from home page links)
    if (badgeFilter === "featured" && (!p.badges || !p.badges.includes("Featured"))) return false;
    if (badgeFilter === "bestseller" && (!p.badges || !p.badges.includes("Best Seller"))) return false;
    if (badgeFilter === "new" && (!p.badges || !p.badges.includes("New Arrival"))) return false;

    return true;
  });

  // Sorting
  if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Featured first
    filtered.sort((a, b) => {
      const aScore = (a.badges?.includes("Featured") ? 2 : 0) + (a.badges?.includes("Best Seller") ? 1 : 0);
      const bScore = (b.badges?.includes("Featured") ? 2 : 0) + (b.badges?.includes("Best Seller") ? 1 : 0);
      return bScore - aScore;
    });
  }

  // Render Result Cards
  const container = document.getElementById("catalog-products-container");
  const emptyState = document.getElementById("catalog-empty-state");
  const countText = document.getElementById("results-count-text");

  if (countText) {
    countText.innerHTML = `Showing <strong>${filtered.length}</strong> of ${allProducts.length} products`;
  }

  if (filtered.length === 0) {
    if (container) container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (container) {
      container.innerHTML = filtered.map(p => createProductCardHTML(p)).join("");
    }
  }

  // Render Active Filter Chips
  renderActiveFilterTags();
}

function renderActiveFilterTags() {
  const bar = document.getElementById("active-tags-bar");
  if (!bar) return;

  const chips = [];
  const { search, category, brand, maxPrice, minRating, stock, badgeFilter } = AppState.catalogFilters;

  if (search) {
    chips.push({ label: `Search: "${search}"`, onRemove: () => { AppState.catalogFilters.search = ""; document.getElementById("catalog-search-input").value = ""; applyCatalogFilters(); } });
  }
  if (category !== "all") {
    const catObj = getStoredCategories().find(c => c.id === category);
    chips.push({ label: `Category: ${catObj ? catObj.name : category}`, onRemove: () => { AppState.catalogFilters.category = "all"; applyCatalogFilters(); buildSidebarCategoryFilters(); } });
  }
  if (brand !== "all") {
    chips.push({ label: `Brand: ${brand}`, onRemove: () => { AppState.catalogFilters.brand = "all"; applyCatalogFilters(); buildSidebarBrandFilters(); } });
  }
  if (maxPrice < 1500) {
    chips.push({ label: `Under $${maxPrice}`, onRemove: () => { AppState.catalogFilters.maxPrice = 1500; document.getElementById("price-range-slider").value = 1500; document.getElementById("price-indicator").textContent = "$1,500"; applyCatalogFilters(); } });
  }
  if (minRating > 0) {
    chips.push({ label: `★ ${minRating}+`, onRemove: () => { AppState.catalogFilters.minRating = 0; document.querySelector('input[name="rating-filter"][value="0"]').checked = true; applyCatalogFilters(); } });
  }
  stock.forEach(s => {
    chips.push({ label: `Stock: ${s}`, onRemove: () => {
      AppState.catalogFilters.stock = AppState.catalogFilters.stock.filter(item => item !== s);
      const chk = document.querySelector(`input[name="stock-filter"][value="${s}"]`);
      if (chk) chk.checked = false;
      applyCatalogFilters();
    }});
  });
  if (badgeFilter !== "all") {
    chips.push({ label: `Tag: ${badgeFilter}`, onRemove: () => { AppState.catalogFilters.badgeFilter = "all"; applyCatalogFilters(); } });
  }

  bar.innerHTML = chips.map((c, i) => `
    <span class="filter-tag-chip">
      <span>${escapeHtml(c.label)}</span>
      <span class="filter-tag-remove" data-chip-index="${i}">&times;</span>
    </span>
  `).join("");

  // Attach chip remove listeners
  bar.querySelectorAll(".filter-tag-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-chip-index"));
      if (chips[index]) chips[index].onRemove();
    });
  });
}

// ==========================================================================
// 9. PRODUCT DETAIL PAGE
// ==========================================================================
function setupDetailListeners() {
  // Star rating picker interactions
  const starPicker = document.getElementById("star-picker");
  const starScoreText = document.getElementById("star-score-text");
  if (starPicker) {
    const stars = starPicker.querySelectorAll(".star-pick");

    stars.forEach(star => {
      // Hover event
      star.addEventListener("mouseenter", () => {
        const val = Number(star.getAttribute("data-val"));
        stars.forEach(s => {
          s.classList.toggle("hovered", Number(s.getAttribute("data-val")) <= val);
        });
      });

      // Click event
      star.addEventListener("click", () => {
        const val = Number(star.getAttribute("data-val"));
        AppState.activeStarReviewScore = val;
        stars.forEach(s => {
          s.classList.toggle("active", Number(s.getAttribute("data-val")) <= val);
        });
        if (starScoreText) starScoreText.textContent = `${val}.0 Out of 5 Stars`;
      });
    });

    starPicker.addEventListener("mouseleave", () => {
      stars.forEach(s => s.classList.remove("hovered"));
    });
  }

  // Submit Review Form
  const reviewForm = document.getElementById("submit-review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleReviewSubmit();
    });
  }

  // Jump to review button
  const jumpBtn = document.getElementById("jump-to-review-btn");
  if (jumpBtn) {
    jumpBtn.addEventListener("click", () => {
      const card = document.getElementById("write-review-card");
      if (card) card.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function renderProductDetailPage(productId) {
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId) || products[0];
  if (!product) return;

  AppState.currentDetailProductId = product.id;
  AppState.activeDetailImageIndex = 0;

  // Add to Recently Viewed
  addRecentlyViewed(product.id);

  // 1. Breadcrumbs
  const catObj = getStoredCategories().find(c => c.id === product.category);
  const breadcrumbCat = document.getElementById("breadcrumb-category");
  const breadcrumbName = document.getElementById("breadcrumb-product-name");
  if (breadcrumbCat) breadcrumbCat.textContent = catObj ? catObj.name : "Category";
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // 2. Main Detail Card
  const detailCard = document.getElementById("product-detail-card");
  if (detailCard) {
    const wishlist = getWishlist();
    const compareList = getCompareList();
    const isWishlisted = wishlist.includes(product.id);
    const isCompared = compareList.includes(product.id);

    detailCard.innerHTML = `
      <!-- Gallery Column -->
      <div class="detail-gallery-col">
        <div class="detail-main-stage" id="detail-stage" style="background: ${product.images[0]?.bg};">
          <span class="detail-stage-emoji" id="detail-stage-emoji">${product.images[0]?.emoji || '📦'}</span>
          ${product.images.length > 1 ? `
            <button class="carousel-nav-btn carousel-prev" id="carousel-prev-btn" title="Previous image">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="carousel-nav-btn carousel-next" id="carousel-next-btn" title="Next image">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          ` : ''}
        </div>
        <!-- Thumbnails -->
        <div class="detail-thumb-strip">
          ${product.images.map((img, idx) => `
            <div class="detail-thumb-item ${idx === 0 ? 'active' : ''}" 
                 style="background: ${img.bg};" 
                 data-img-index="${idx}" 
                 onclick="switchDetailImage(${idx})">
              <span>${img.emoji}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Information Column -->
      <div class="detail-info-col">
        <div class="detail-brand-title-wrap">
          <span class="detail-brand-badge">${escapeHtml(product.brand)}</span>
          <h1 class="detail-product-name">${escapeHtml(product.name)}</h1>
        </div>

        <div class="detail-rating-stock-row">
          <span class="star-score" style="font-size: 1.1rem;">★ ${product.rating.toFixed(1)}</span>
          <span class="review-count-text">(${getStoredReviews().filter(r => r.product_id === product.id).length} customer ratings)</span>
          <span class="badge ${product.stock_status === 'In Stock' ? 'badge-stock-in' : (product.stock_status === 'Limited Stock' ? 'badge-stock-limited' : 'badge-stock-out')}">
            ${product.stock_status}
          </span>
        </div>

        <div class="detail-price-box">
          <span class="detail-price-val">$${product.price.toFixed(2)}</span>
        </div>

        <p class="detail-desc-text">${escapeHtml(product.description)}</p>

        <!-- Features List -->
        <div class="detail-features-list">
          ${product.features.map(f => `
            <div class="detail-feature-item">
              <i class="fa-solid fa-circle-check"></i>
              <span>${escapeHtml(f)}</span>
            </div>
          `).join("")}
        </div>

        <!-- Action Buttons -->
        <div class="detail-actions-row">
          <button class="btn btn-primary btn-lg" id="detail-wishlist-btn" onclick="toggleDetailWishlist('${product.id}')">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
            <span>${isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
          </button>
          <button class="btn btn-outline btn-lg" id="detail-compare-btn" onclick="toggleDetailCompare('${product.id}')">
            <i class="fa-solid fa-code-compare"></i>
            <span>${isCompared ? 'In Comparison' : 'Add to Compare'}</span>
          </button>
          <button class="btn btn-ghost btn-lg" onclick="openShareModal('${escapeHtml(product.name)}')">
            <i class="fa-solid fa-share-nodes"></i> Share
          </button>
        </div>
      </div>
    `;

    // Attach Carousel Prev/Next listeners
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIdx = AppState.activeDetailImageIndex - 1;
        if (newIdx < 0) newIdx = product.images.length - 1;
        switchDetailImage(newIdx);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIdx = AppState.activeDetailImageIndex + 1;
        if (newIdx >= product.images.length) newIdx = 0;
        switchDetailImage(newIdx);
      });
    }
  }

  // 3. Technical Specifications Table
  renderDetailSpecs(product);

  // 4. Reviews Summary & List
  renderDetailReviews(product);

  // 5. Related Products (Same category)
  renderDetailRelatedProducts(product);
}

function switchDetailImage(index) {
  const products = getStoredProducts();
  const product = products.find(p => p.id === AppState.currentDetailProductId);
  if (!product || !product.images[index]) return;

  AppState.activeDetailImageIndex = index;
  const stage = document.getElementById("detail-stage");
  const stageEmoji = document.getElementById("detail-stage-emoji");
  if (stage && stageEmoji) {
    stage.style.background = product.images[index].bg;
    stageEmoji.textContent = product.images[index].emoji;
  }

  document.querySelectorAll(".detail-thumb-item").forEach((thumb, idx) => {
    thumb.classList.toggle("active", idx === index);
  });
}

function toggleDetailWishlist(productId) {
  const { added } = toggleWishlist(productId);
  updateNavBadges();
  const btn = document.getElementById("detail-wishlist-btn");
  if (btn) {
    btn.innerHTML = `
      <i class="fa-${added ? 'solid' : 'regular'} fa-heart"></i>
      <span>${added ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
    `;
  }
  showToast(added ? "Saved to your wishlist!" : "Removed from wishlist", added ? "success" : "info");
}

function toggleDetailCompare(productId) {
  const result = toggleCompare(productId);
  if (result.error) {
    showToast(result.error, "error");
    return;
  }
  updateNavBadges();
  const btn = document.getElementById("detail-compare-btn");
  if (btn) {
    btn.innerHTML = `
      <i class="fa-solid fa-code-compare"></i>
      <span>${result.added ? 'In Comparison' : 'Add to Compare'}</span>
    `;
  }
  showToast(result.added ? "Added to comparison queue!" : "Removed from comparison", result.added ? "success" : "info");
}

function renderDetailSpecs(product) {
  const container = document.getElementById("detail-specs-table-container");
  if (!container) return;

  const entries = Object.entries(product.specifications || {});
  container.innerHTML = `
    <table class="specs-table">
      <tbody>
        ${entries.map(([key, val]) => `
          <tr>
            <th>${escapeHtml(key)}</th>
            <td>${escapeHtml(val)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderDetailReviews(product) {
  const reviews = getStoredReviews().filter(r => r.product_id === product.id);
  const summaryCard = document.getElementById("reviews-summary-card");
  const reviewsList = document.getElementById("detail-reviews-list");

  // Summary Metrics
  if (summaryCard) {
    const totalCount = reviews.length;
    const avgScore = totalCount > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount) : 5.0;

    // Star distributions
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      starCounts[rounded] = (starCounts[rounded] || 0) + 1;
    });

    summaryCard.innerHTML = `
      <div class="avg-score-col" style="text-align: center;">
        <div class="avg-score-big">${avgScore.toFixed(1)}</div>
        <div class="stars-display-row">
          ${renderStarIcons(avgScore)}
        </div>
        <span class="text-muted" style="font-size: 0.88rem;">Based on ${totalCount} verified reviews</span>
      </div>

      <div class="rating-bars-col">
        ${[5, 4, 3, 2, 1].map(starNum => {
          const count = starCounts[starNum] || 0;
          const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
          return `
            <div class="bar-row">
              <span class="bar-label">${starNum} ★</span>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${pct}%;"></div>
              </div>
              <span style="width: 40px; text-align: right;">${pct}%</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // Reviews List
  if (reviewsList) {
    if (reviews.length === 0) {
      reviewsList.innerHTML = `<div class="empty-state-box" style="padding: 2rem;">No reviews yet. Be the first to share your thoughts!</div>`;
    } else {
      reviewsList.innerHTML = reviews.map(r => `
        <div class="review-item-card">
          <div class="review-item-header">
            <span class="review-user-name">${escapeHtml(r.user)}</span>
            <span class="review-item-date">${r.date}</span>
          </div>
          <div class="review-item-stars">${renderStarIcons(r.rating)}</div>
          <p class="review-item-body">${escapeHtml(r.comment)}</p>
        </div>
      `).join("");
    }
  }

  // Prefill review form with logged-in user if available
  const currentUser = getCurrentUser();
  const nameInput = document.getElementById("review-user-name");
  const emailInput = document.getElementById("review-user-email");
  if (currentUser && nameInput && emailInput) {
    nameInput.value = currentUser.name;
    emailInput.value = currentUser.email;
  }
}

function renderStarIcons(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<i class="fa-solid fa-star"></i> ';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '<i class="fa-solid fa-star-half-stroke"></i> ';
    } else {
      html += '<i class="fa-regular fa-star"></i> ';
    }
  }
  return html;
}

function handleReviewSubmit() {
  const nameInput = document.getElementById("review-user-name");
  const emailInput = document.getElementById("review-user-email");
  const commentInput = document.getElementById("review-comment");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const comment = commentInput.value.trim();
  const rating = AppState.activeStarReviewScore || 5;

  if (!name || !email || !comment) {
    showToast("Please fill in all required review fields", "error");
    return;
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    product_id: AppState.currentDetailProductId,
    user: name,
    rating: rating,
    comment: comment,
    date: new Date().toISOString().split("T")[0]
  };

  const reviews = getStoredReviews();
  reviews.unshift(newReview);
  saveStoredReviews(reviews);

  // Recalculate product rating
  const prodReviews = reviews.filter(r => r.product_id === AppState.currentDetailProductId);
  const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;

  const products = getStoredProducts();
  const targetProd = products.find(p => p.id === AppState.currentDetailProductId);
  if (targetProd) {
    targetProd.rating = Number(avg.toFixed(1));
    saveStoredProducts(products);
  }

  // Reset form
  commentInput.value = "";
  showToast("Thank you! Your verified review has been submitted.", "success");

  // Re-render reviews
  renderDetailReviews(targetProd);
}

function renderDetailRelatedProducts(product) {
  const grid = document.getElementById("detail-related-grid");
  if (!grid) return;

  const products = getStoredProducts();
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  grid.innerHTML = related.map(p => createProductCardHTML(p)).join("");
}

function openShareModal(productTitle) {
  const modal = document.getElementById("share-modal");
  const titleEl = document.getElementById("share-product-title");
  const whatsappBtn = document.getElementById("share-whatsapp-btn");
  const twitterBtn = document.getElementById("share-twitter-btn");

  if (titleEl) titleEl.textContent = `Share "${productTitle}" with your network:`;

  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out ${productTitle} on ShowCase!`);

  if (whatsappBtn) whatsappBtn.href = `https://api.whatsapp.com/send?text=${text}%20${url}`;
  if (twitterBtn) twitterBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

  if (modal) modal.classList.add("active");
}

// ==========================================================================
// 10. PRODUCT COMPARISON MATRIX (#compare)
// ==========================================================================
function renderComparePage() {
  const container = document.getElementById("compare-table-container");
  const emptyState = document.getElementById("compare-empty-state");
  const clearBtn = document.getElementById("clear-all-compare-btn");
  if (!container || !emptyState) return;

  const compareIds = getCompareList();
  const allProducts = getStoredProducts();
  const products = compareIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  if (clearBtn) {
    clearBtn.onclick = () => {
      clearCompare();
      updateNavBadges();
      renderComparePage();
      showToast("Comparison table cleared", "info");
    };
  }

  if (products.length < 2) {
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  container.style.display = "block";
  emptyState.style.display = "none";

  // Identify Best Price & Highest Rating
  const minPrice = Math.min(...products.map(p => p.price));
  const maxRating = Math.max(...products.map(p => p.rating));

  container.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th class="compare-prop-col">Product Overview</th>
          ${products.map(p => `
            <th class="compare-product-col ${p.price === minPrice ? 'best-price' : ''}">
              <div class="compare-img-box" style="background: ${p.images[0]?.bg || '#7C3AED'};">
                ${p.images[0]?.emoji || '📦'}
              </div>
              <h4>${escapeHtml(p.name)}</h4>
              <span class="text-muted" style="font-size: 0.82rem;">${escapeHtml(p.brand)}</span>
              <div>
                <button class="btn btn-ghost btn-sm" onclick="removeCompareItem('${p.id}')" style="color: var(--color-danger); margin-top: 0.5rem;">
                  <i class="fa-solid fa-trash"></i> Remove
                </button>
              </div>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="compare-prop-col">Price</th>
          ${products.map(p => `
            <td class="compare-product-col ${p.price === minPrice ? 'best-price' : ''}">
              <strong style="font-size: 1.25rem;">$${p.price.toFixed(2)}</strong>
              ${p.price === minPrice ? '<br/><span class="highlight-pill price-pill"><i class="fa-solid fa-tag"></i> Lowest Price</span>' : ''}
            </td>
          `).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Verified Rating</th>
          ${products.map(p => `
            <td class="compare-product-col ${p.rating === maxRating ? 'best-rating' : ''}">
              <span class="star-score">★ ${p.rating.toFixed(1)}</span>
              ${p.rating === maxRating ? '<br/><span class="highlight-pill rating-pill"><i class="fa-solid fa-crown"></i> Highest Rated</span>' : ''}
            </td>
          `).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Stock Availability</th>
          ${products.map(p => `
            <td class="compare-product-col">
              <span class="badge ${p.stock_status === 'In Stock' ? 'badge-stock-in' : (p.stock_status === 'Limited Stock' ? 'badge-stock-limited' : 'badge-stock-out')}">
                ${p.stock_status}
              </span>
            </td>
          `).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Department</th>
          ${products.map(p => {
            const cat = getStoredCategories().find(c => c.id === p.category);
            return `<td class="compare-product-col">${cat ? cat.name : p.category}</td>`;
          }).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Key Highlights</th>
          ${products.map(p => `
            <td class="compare-product-col" style="text-align: left; font-size: 0.88rem;">
              <ul style="padding-left: 1.2rem; list-style-type: disc;">
                ${p.features.slice(0, 3).map(f => `<li>${escapeHtml(f)}</li>`).join("")}
              </ul>
            </td>
          `).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Specifications</th>
          ${products.map(p => `
            <td class="compare-product-col" style="text-align: left; font-size: 0.84rem;">
              ${Object.entries(p.specifications || {}).map(([k, v]) => `
                <div><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</div>
              `).join("")}
            </td>
          `).join("")}
        </tr>
        <tr>
          <th class="compare-prop-col">Direct Action</th>
          ${products.map(p => `
            <td class="compare-product-col">
              <a href="#product-detail?id=${p.id}" class="btn btn-primary btn-sm">
                View Full Page
              </a>
            </td>
          `).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function removeCompareItem(productId) {
  removeFromCompare(productId);
  updateNavBadges();
  renderComparePage();
  showToast("Removed product from comparison", "info");
}

// ==========================================================================
// 11. WISHLIST PAGE (#wishlist)
// ==========================================================================
function renderWishlistPage() {
  const grid = document.getElementById("wishlist-products-grid");
  const emptyState = document.getElementById("wishlist-empty-state");
  if (!grid || !emptyState) return;

  const wishlistIds = getWishlist();
  const allProducts = getStoredProducts();
  const products = wishlistIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  if (products.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    grid.innerHTML = products.map(p => createProductCardHTML(p)).join("");
  }
}

// ==========================================================================
// 12. INTERACTIVE 360 PRODUCT DEMO (#demo)
// ==========================================================================
function setupDemoListeners() {
  // Swatch color selection
  document.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");

      const bg = swatch.getAttribute("data-bg");
      const name = swatch.getAttribute("data-name");

      const canvas = document.getElementById("demo-canvas");
      const label = document.getElementById("demo-finish-name");
      if (canvas) canvas.style.background = bg;
      if (label) label.textContent = name;
    });
  });

  // Product Model Selector
  const selector = document.getElementById("demo-product-selector");
  if (selector) {
    selector.addEventListener("change", (e) => {
      const prodId = e.target.value;
      const products = getStoredProducts();
      const product = products.find(p => p.id === prodId);
      if (product) updateDemoPresentation(product);
    });
  }
}

function renderDemoPage() {
  const products = getStoredProducts();
  const defaultProd = products.find(p => p.id === "prod-1") || products[0];
  if (defaultProd) updateDemoPresentation(defaultProd);
}

function updateDemoPresentation(product) {
  const emojiEl = document.getElementById("demo-emoji");
  const titleEl = document.getElementById("demo-model-title");
  const descEl = document.getElementById("demo-model-desc");
  const viewBtn = document.getElementById("demo-view-product-btn");
  const iframe = document.getElementById("demo-video-iframe");

  if (emojiEl) emojiEl.textContent = product.images[0]?.emoji || '📦';
  if (titleEl) titleEl.textContent = `${product.name} Showcase`;
  if (descEl) descEl.textContent = product.description;
  if (viewBtn) viewBtn.href = `#product-detail?id=${product.id}`;

  if (iframe) {
    iframe.src = product.demoVideo || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  }
}

// ==========================================================================
// 13. CATEGORIES DIRECTORY & BRANDS PAGES
// ==========================================================================
function renderCategoriesPage() {
  const grid = document.getElementById("categories-full-grid");
  if (!grid) return;

  const categories = getStoredCategories();
  const mainCategories = categories.filter(c => c.parent_id === null);
  const products = getStoredProducts();

  grid.innerHTML = mainCategories.map(cat => {
    const subCategories = categories.filter(c => c.parent_id === cat.id);
    const catProducts = products.filter(p => p.category === cat.id);

    return `
      <div class="cat-detail-card">
        <div>
          <div class="cat-detail-header">
            <span class="cat-detail-icon">${cat.icon}</span>
            <div>
              <h3>${escapeHtml(cat.name)}</h3>
              <span class="text-muted" style="font-size: 0.85rem;">${catProducts.length} Products Available</span>
            </div>
          </div>
          <p class="text-muted" style="font-size: 0.92rem;">${escapeHtml(cat.description)}</p>

          <div class="cat-sub-chips">
            ${subCategories.map(sub => `
              <span class="cat-sub-chip" onclick="window.location.hash = '#catalog?category=${cat.id}&subcategory=${sub.id}'">
                ${sub.icon} ${escapeHtml(sub.name)}
              </span>
            `).join("")}
          </div>
        </div>

        <a href="#catalog?category=${cat.id}" class="btn btn-outline btn-block" style="margin-top: 1.5rem;">
          Browse ${escapeHtml(cat.name)} &rarr;
        </a>
      </div>
    `;
  }).join("");
}

function renderBrandsPage() {
  const grid = document.getElementById("brands-directory-grid");
  if (!grid) return;

  const brands = getStoredBrands();
  const products = getStoredProducts();

  grid.innerHTML = brands.map(b => {
    const brandProducts = products.filter(p => p.brand === b.name);
    return `
      <div class="brand-card">
        <div class="brand-card-top">
          <div class="brand-logo-circle">${b.logo}</div>
          <div>
            <h3>${escapeHtml(b.name)}</h3>
            <span class="badge badge-featured">${escapeHtml(b.country)}</span>
          </div>
        </div>
        <p class="text-muted" style="font-size: 0.92rem; margin-bottom: 1.25rem;">${escapeHtml(b.description)}</p>
        <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary-purple);">${brandProducts.length} Catalog Models</span>
          <a href="#catalog?brand=${encodeURIComponent(b.name)}" class="btn btn-primary btn-sm">
            View Products &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// 14. CONTACT & INQUIRIES (#contact)
// ==========================================================================
function renderContactPage() {
  const select = document.getElementById("contact-product");
  if (!select) return;

  const products = getStoredProducts();
  select.innerHTML = `
    <option value="">-- General Platform Inquiry --</option>
    ${products.map(p => `
      <option value="${p.id}">${escapeHtml(p.name)} (${escapeHtml(p.brand)})</option>
    `).join("")}
  `;

  const form = document.getElementById("contact-inquiry-form");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const prodId = document.getElementById("contact-product").value;
      const subject = document.getElementById("contact-subject").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      const prod = products.find(p => p.id === prodId);

      const newInquiry = {
        id: `inq-${Date.now()}`,
        name,
        email,
        product_id: prodId || "none",
        product_name: prod ? prod.name : "General",
        subject,
        message,
        date: new Date().toISOString().split("T")[0],
        status: "Pending"
      };

      const inquiries = getStoredInquiries();
      inquiries.unshift(newInquiry);
      saveStoredInquiries(inquiries);

      form.reset();
      showToast("Your inquiry has been dispatched to administrators!", "success");
    };
  }
}

// ==========================================================================
// 15. AUTHENTICATION (LOGIN / REGISTER)
// ==========================================================================
function renderLoginPage() {
  const tabLogin = document.getElementById("tab-login-btn");
  const tabReg = document.getElementById("tab-register-btn");
  const formLogin = document.getElementById("login-form");
  const formReg = document.getElementById("register-form");

  if (tabLogin && tabReg && formLogin && formReg) {
    tabLogin.onclick = () => {
      tabLogin.classList.add("active");
      tabReg.classList.remove("active");
      formLogin.style.display = "block";
      formReg.style.display = "none";
    };
    tabReg.onclick = () => {
      tabReg.classList.add("active");
      tabLogin.classList.remove("active");
      formLogin.style.display = "none";
      formReg.style.display = "block";
    };
  }

  // 1-Click Demo Login Admin
  const demoAdminBtn = document.getElementById("quick-demo-admin");
  if (demoAdminBtn) {
    demoAdminBtn.onclick = () => {
      document.getElementById("login-email").value = "admin@showcase.com";
      document.getElementById("login-password").value = "admin123";
      submitLoginForm();
    };
  }

  // 1-Click Demo Login User
  const demoUserBtn = document.getElementById("quick-demo-user");
  if (demoUserBtn) {
    demoUserBtn.onclick = () => {
      document.getElementById("login-email").value = "user@showcase.com";
      document.getElementById("login-password").value = "user123";
      submitLoginForm();
    };
  }

  if (formLogin) {
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      submitLoginForm();
    };
  }

  if (formReg) {
    formReg.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value.trim();

      const users = getStoredUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast("An account with this email already exists", "error");
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        role: "user"
      };

      users.push(newUser);
      saveStoredUsers(users);
      setCurrentUser(newUser);

      showToast(`Welcome aboard, ${name}!`, "success");
      renderUserNavWidget();
      window.location.hash = "#home";
    };
  }
}

function submitLoginForm() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = getStoredUsers();
  const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (matched) {
    setCurrentUser(matched);
    showToast(`Welcome back, ${matched.name}!`, "success");
    renderUserNavWidget();
    if (matched.role === "admin") {
      window.location.hash = "#admin";
    } else {
      window.location.hash = "#home";
    }
  } else {
    showToast("Invalid email or password", "error");
  }
}

// ==========================================================================
// 16. ADMIN DASHBOARD CONTROL DECK (#admin)
// ==========================================================================
function setupAdminListeners() {
  // Admin tab switching
  document.querySelectorAll(".admin-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-tab-panel").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      const targetPanel = document.getElementById(`admin-panel-${tabId}`);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Quick sign in button on access denied
  const quickLoginBtn = document.getElementById("admin-quick-login-btn");
  if (quickLoginBtn) {
    quickLoginBtn.onclick = () => {
      const users = getStoredUsers();
      const admin = users.find(u => u.role === "admin") || INITIAL_USERS[0];
      setCurrentUser(admin);
      renderUserNavWidget();
      renderAdminPage();
      showToast("Signed in as Admin Moderator", "success");
    };
  }

  // Export to CSV
  const csvBtn = document.getElementById("admin-export-csv-btn");
  if (csvBtn) csvBtn.onclick = exportCatalogCSV;

  // Export to PDF
  const pdfBtn = document.getElementById("admin-export-pdf-btn");
  if (pdfBtn) {
    pdfBtn.onclick = () => {
      window.print();
    };
  }

  // Add Product Button
  const addBtn = document.getElementById("admin-add-product-btn");
  if (addBtn) addBtn.onclick = openAddProductModal;

  // Product CRUD Form submit
  const crudForm = document.getElementById("product-crud-form");
  if (crudForm) {
    crudForm.onsubmit = (e) => {
      e.preventDefault();
      handleProductCRUDSave();
    };
  }

  const modalClose = document.getElementById("product-modal-close");
  const modalCancel = document.getElementById("product-modal-cancel");
  if (modalClose) modalClose.onclick = closeAllModals;
  if (modalCancel) modalCancel.onclick = closeAllModals;
}

function renderAdminPage() {
  const currentUser = getCurrentUser();
  const deniedBox = document.getElementById("admin-access-denied");
  const authorizedDeck = document.getElementById("admin-authorized-deck");

  if (!currentUser || currentUser.role !== "admin") {
    if (deniedBox) deniedBox.style.display = "block";
    if (authorizedDeck) authorizedDeck.style.display = "none";
    return;
  }

  if (deniedBox) deniedBox.style.display = "none";
  if (authorizedDeck) authorizedDeck.style.display = "block";

  // Telemetry KPIs
  const products = getStoredProducts();
  const categories = getStoredCategories().filter(c => c.parent_id === null);
  const reviews = getStoredReviews();
  const inquiries = getStoredInquiries();
  const wishlist = getWishlist();

  document.getElementById("kpi-total-products").textContent = products.length;
  document.getElementById("kpi-total-categories").textContent = categories.length;
  document.getElementById("kpi-total-reviews").textContent = reviews.length;
  document.getElementById("kpi-total-inquiries").textContent = inquiries.length;
  document.getElementById("kpi-total-wishlist").textContent = wishlist.length;

  // Render Admin Panels
  renderAdminProductsTable();
  renderAdminAnalytics();
  renderAdminInquiriesTable();
  renderAdminReviewsTable();
}

function renderAdminProductsTable() {
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;

  const products = getStoredProducts();
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.5rem;">${p.images[0]?.emoji || '📦'}</span>
          <div>
            <strong>${escapeHtml(p.name)}</strong>
            <div class="text-muted" style="font-size: 0.75rem;">ID: ${p.id}</div>
          </div>
        </div>
      </td>
      <td>${p.category.replace("cat-", "")}</td>
      <td>${escapeHtml(p.brand)}</td>
      <td><strong>$${p.price.toFixed(2)}</strong></td>
      <td>★ ${p.rating.toFixed(1)}</td>
      <td>
        <span class="badge ${p.stock_status === 'In Stock' ? 'badge-stock-in' : (p.stock_status === 'Limited Stock' ? 'badge-stock-limited' : 'badge-stock-out')}">
          ${p.stock_status}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-outline btn-sm" onclick="openEditProductModal('${p.id}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn btn-ghost btn-sm" onclick="deleteProduct('${p.id}')" style="color: var(--color-danger);">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderAdminAnalytics() {
  // Chart 1: Categories breakdown
  const catChart = document.getElementById("chart-categories-container");
  const products = getStoredProducts();
  const categories = getStoredCategories().filter(c => c.parent_id === null);

  if (catChart) {
    const total = products.length || 1;
    catChart.innerHTML = categories.map(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      const pct = Math.round((count / total) * 100);
      return `
        <div class="bar-chart-row">
          <div class="bar-chart-meta">
            <span>${cat.icon} ${escapeHtml(cat.name)}</span>
            <span>${count} items (${pct}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Chart 2: Top Rated Leaderboard
  const leaderBoard = document.getElementById("chart-top-rated-container");
  if (leaderBoard) {
    const sorted = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
    leaderBoard.innerHTML = sorted.map((p, idx) => `
      <div class="leaderboard-item">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-weight: 700; color: var(--primary-purple); width: 20px;">#${idx + 1}</span>
          <span>${p.images[0]?.emoji || '📦'}</span>
          <strong>${escapeHtml(p.name)}</strong>
        </div>
        <span class="star-score">★ ${p.rating.toFixed(1)}</span>
      </div>
    `).join("");
  }
}

function renderAdminInquiriesTable() {
  const tbody = document.getElementById("admin-inquiries-tbody");
  if (!tbody) return;

  const inquiries = getStoredInquiries();
  tbody.innerHTML = inquiries.map(inq => `
    <tr>
      <td>${inq.date}</td>
      <td>
        <strong>${escapeHtml(inq.name)}</strong><br />
        <span class="text-muted" style="font-size: 0.78rem;">${escapeHtml(inq.email)}</span>
      </td>
      <td>${escapeHtml(inq.product_name)}</td>
      <td>
        <strong>${escapeHtml(inq.subject)}</strong><br />
        <span class="text-muted" style="font-size: 0.8rem;">${escapeHtml(inq.message)}</span>
      </td>
      <td>
        <span class="badge ${inq.status === 'Answered' ? 'badge-stock-in' : 'badge-stock-limited'}">
          ${inq.status}
        </span>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="toggleInquiryStatus('${inq.id}')">
          Mark ${inq.status === 'Answered' ? 'Pending' : 'Answered'}
        </button>
      </td>
    </tr>
  `).join("");
}

function toggleInquiryStatus(inquiryId) {
  const inquiries = getStoredInquiries();
  const inq = inquiries.find(i => i.id === inquiryId);
  if (inq) {
    inq.status = inq.status === "Answered" ? "Pending" : "Answered";
    saveStoredInquiries(inquiries);
    renderAdminInquiriesTable();
    showToast(`Inquiry status updated to ${inq.status}`, "info");
  }
}

function renderAdminReviewsTable() {
  const tbody = document.getElementById("admin-reviews-tbody");
  if (!tbody) return;

  const reviews = getStoredReviews();
  const products = getStoredProducts();

  tbody.innerHTML = reviews.map(r => {
    const prod = products.find(p => p.id === r.product_id);
    return `
      <tr>
        <td>${r.date}</td>
        <td><strong>${prod ? escapeHtml(prod.name) : r.product_id}</strong></td>
        <td>${escapeHtml(r.user)}</td>
        <td>★ ${r.rating}</td>
        <td style="max-width: 300px; font-size: 0.85rem;">${escapeHtml(r.comment)}</td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="deleteReview('${r.id}')" style="color: var(--color-danger);">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function deleteReview(reviewId) {
  if (!confirm("Are you sure you want to permanently delete this user review?")) return;
  let reviews = getStoredReviews();
  reviews = reviews.filter(r => r.id !== reviewId);
  saveStoredReviews(reviews);
  renderAdminReviewsTable();
  document.getElementById("kpi-total-reviews").textContent = reviews.length;
  showToast("Review deleted by moderator", "info");
}

// Product CRUD Modal Logic
function openAddProductModal() {
  const modal = document.getElementById("product-modal");
  const title = document.getElementById("product-modal-title");
  const form = document.getElementById("product-crud-form");
  if (!modal || !form) return;

  title.textContent = "Add New Showcase Product";
  form.reset();
  document.getElementById("crud-product-id").value = "";

  populateBrandAndCategorySelects();
  modal.classList.add("active");
}

function openEditProductModal(productId) {
  const modal = document.getElementById("product-modal");
  const title = document.getElementById("product-modal-title");
  if (!modal) return;

  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  title.textContent = `Edit Product: ${product.name}`;
  populateBrandAndCategorySelects();

  document.getElementById("crud-product-id").value = product.id;
  document.getElementById("crud-name").value = product.name;
  document.getElementById("crud-brand").value = product.brand;
  document.getElementById("crud-category").value = product.category;
  document.getElementById("crud-price").value = product.price;
  document.getElementById("crud-stock").value = product.stock_status;
  document.getElementById("crud-description").value = product.description;
  document.getElementById("crud-features").value = product.features.join("\n");
  document.getElementById("crud-emoji").value = product.images[0]?.emoji || "📦";
  document.getElementById("crud-badges").value = product.badges ? product.badges.join(", ") : "";

  modal.classList.add("active");
}

function populateBrandAndCategorySelects() {
  const brandSelect = document.getElementById("crud-brand");
  const catSelect = document.getElementById("crud-category");
  if (!brandSelect || !catSelect) return;

  const brands = getStoredBrands();
  const categories = getStoredCategories().filter(c => c.parent_id === null);

  brandSelect.innerHTML = brands.map(b => `<option value="${escapeHtml(b.name)}">${escapeHtml(b.name)}</option>`).join("");
  catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.icon} ${escapeHtml(c.name)}</option>`).join("");
}

function handleProductCRUDSave() {
  const id = document.getElementById("crud-product-id").value;
  const name = document.getElementById("crud-name").value.trim();
  const brand = document.getElementById("crud-brand").value;
  const category = document.getElementById("crud-category").value;
  const price = Number(document.getElementById("crud-price").value);
  const stock = document.getElementById("crud-stock").value;
  const desc = document.getElementById("crud-description").value.trim();
  const features = document.getElementById("crud-features").value.split("\n").map(f => f.trim()).filter(Boolean);
  const emoji = document.getElementById("crud-emoji").value.trim() || "📦";
  const badges = document.getElementById("crud-badges").value.split(",").map(b => b.trim()).filter(Boolean);

  let products = getStoredProducts();

  if (id) {
    // Edit existing
    const existing = products.find(p => p.id === id);
    if (existing) {
      existing.name = name;
      existing.brand = brand;
      existing.category = category;
      existing.price = price;
      existing.stock_status = stock;
      existing.description = desc;
      existing.features = features;
      existing.badges = badges;
      if (existing.images[0]) existing.images[0].emoji = emoji;
    }
    showToast("Product updated successfully", "success");
  } else {
    // Add new
    const newProd = {
      id: `prod-${Date.now()}`,
      name,
      brand,
      category,
      subcategory: "sub-audio",
      price,
      rating: 5.0,
      stock_status: stock,
      badges,
      description: desc,
      features,
      specifications: { "Warranty": "1 Year", "Origin": "Official Distributor" },
      images: [
        { emoji, bg: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)", label: "Standard" }
      ],
      tags: ["showcase", "new"],
      demoVideo: ""
    };
    products.unshift(newProd);
    showToast("New product created in catalog", "success");
  }

  saveStoredProducts(products);
  closeAllModals();
  renderAdminPage();
}

function deleteProduct(productId) {
  if (!confirm("Are you sure you want to delete this product from the catalog?")) return;
  let products = getStoredProducts();
  products = products.filter(p => p.id !== productId);
  saveStoredProducts(products);
  renderAdminPage();
  showToast("Product deleted from catalog", "info");
}

// Export to CSV
function exportCatalogCSV() {
  const products = getStoredProducts();
  const headers = ["ID", "Name", "Brand", "Category", "Price (USD)", "Rating", "Stock Status", "Badges"];

  const rows = products.map(p => [
    `"${p.id}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.brand}"`,
    `"${p.category}"`,
    p.price.toFixed(2),
    p.rating.toFixed(1),
    `"${p.stock_status}"`,
    `"${(p.badges || []).join('; ')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `showcase_catalog_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast("Catalog CSV exported successfully", "success");
}

// ==========================================================================
// 17. UTILITY HELPERS
// ==========================================================================
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
