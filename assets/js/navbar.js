/* ==========================================================================
   ALBERTO WATCH COMPANY — NAVBAR & HEADER RENDERING ENGINE
   ========================================================================== */

class AlbertoNavbar {
  constructor() {
    this.renderHeader();
    this.initScrollBehavior();
    this.initMobileMenu();
    this.initSearchModal();
  }

  getCurrentPageFilename() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page === '' ? 'index.html' : page;
  }

  renderHeader() {
    const currentPage = this.getCurrentPageFilename();
    const isHome = currentPage === 'index.html';

    const headerHTML = `
      <div class="scroll-progress-bar" id="scroll-progress"></div>
      <header class="site-header ${isHome ? 'transparent-hero' : ''}">
        <div class="container nav-container">
          <a href="index.html" class="brand-logo">
            <span class="brand-logo-main">ALBERTO</span>
            <span class="brand-logo-sub">Geneva 1928</span>
          </a>

          <nav class="nav-menu">
            <div class="nav-item">
              <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
            </div>

            <div class="nav-item">
              <a href="collections.html" class="nav-link ${['collections.html', 'luxury.html', 'vintage.html', 'smartwatches.html'].includes(currentPage) ? 'active' : ''}">
                Collections <i class="fa-solid fa-chevron-down nav-chevron"></i>
              </a>
              <div class="nav-dropdown">
                <a href="collections.html" class="dropdown-link"><span>All Collections</span><span class="dropdown-tag">04</span></a>
                <a href="luxury.html" class="dropdown-link"><span>Luxury Watches</span><span class="dropdown-tag">08</span></a>
                <a href="vintage.html" class="dropdown-link"><span>Vintage Edition</span><span class="dropdown-tag">04</span></a>
                <a href="smartwatches.html" class="dropdown-link"><span>Smart Connected</span><span class="dropdown-tag">04</span></a>
              </div>
            </div>

            <div class="nav-item">
              <a href="products.html" class="nav-link ${['products.html', 'pricing.html'].includes(currentPage) ? 'active' : ''}">
                Watches <i class="fa-solid fa-chevron-down nav-chevron"></i>
              </a>
              <div class="nav-dropdown">
                <a href="products.html" class="dropdown-link"><span>Catalog Grid</span><span class="dropdown-tag">24</span></a>
                <a href="pricing.html" class="dropdown-link"><span>Price List Table</span><span class="dropdown-tag">List</span></a>
              </div>
            </div>

            <div class="nav-item">
              <a href="technology.html" class="nav-link ${currentPage === 'technology.html' ? 'active' : ''}">Technology</a>
            </div>

            <div class="nav-item">
              <a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">Our Story</a>
            </div>

            <div class="nav-item">
              <a href="gallery.html" class="nav-link ${currentPage === 'gallery.html' ? 'active' : ''}">Gallery</a>
            </div>

            <div class="nav-item">
              <a href="stores.html" class="nav-link ${currentPage === 'stores.html' ? 'active' : ''}">Boutiques</a>
            </div>

            <div class="nav-item">
              <a href="support.html" class="nav-link ${currentPage === 'support.html' ? 'active' : ''}">Support</a>
            </div>

            <div class="nav-item">
              <a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
            </div>
          </nav>

          <div class="nav-actions">
            <button class="nav-icon-btn search-trigger-btn" aria-label="Search watches" title="Search Timepieces">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <a href="products.html#wishlist" class="nav-icon-btn" aria-label="Wishlist" title="View Wishlist">
              <i class="fa-solid fa-heart"></i>
              <span class="badge-count" id="wishlist-badge-count">0</span>
            </a>
            <button class="mobile-toggle" aria-label="Toggle mobile menu" id="mobile-menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-nav-list">
          <a href="index.html" class="mobile-nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
          <a href="collections.html" class="mobile-nav-link ${currentPage === 'collections.html' ? 'active' : ''}">Collections</a>
          <div class="mobile-sublinks">
            <a href="luxury.html">Luxury Watches</a>
            <a href="vintage.html">Vintage Edition</a>
            <a href="smartwatches.html">Smart Connected</a>
          </div>
          <a href="products.html" class="mobile-nav-link ${currentPage === 'products.html' ? 'active' : ''}">Watch Catalog (24)</a>
          <a href="pricing.html" class="mobile-nav-link ${currentPage === 'pricing.html' ? 'active' : ''}">Price List</a>
          <a href="technology.html" class="mobile-nav-link ${currentPage === 'technology.html' ? 'active' : ''}">Technology & Craftsmanship</a>
          <a href="about.html" class="mobile-nav-link ${currentPage === 'about.html' ? 'active' : ''}">About Alberto</a>
          <a href="gallery.html" class="mobile-nav-link ${currentPage === 'gallery.html' ? 'active' : ''}">Cinematic Gallery</a>
          <a href="stores.html" class="mobile-nav-link ${currentPage === 'stores.html' ? 'active' : ''}">Store Locator</a>
          <a href="support.html" class="mobile-nav-link ${currentPage === 'support.html' ? 'active' : ''}">Customer Support & FAQ</a>
          <a href="contact.html" class="mobile-nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact Us</a>
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); font-size: 0.76rem; color: var(--text-muted); text-align: center;">
          Alberto Watch Company — Geneva HQ<br>Bespoke Horology Since 1928
        </div>
      </div>
    `;

    // Prepend header to body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    this.updateWishlistCount();
    document.addEventListener('wishlistUpdated', () => this.updateWishlistCount());
  }

  updateWishlistCount() {
    const list = AlbertoUtils.getWishlist();
    const badge = document.getElementById('wishlist-badge-count');
    if (badge) badge.textContent = list.length;
  }

  initScrollBehavior() {
    const header = document.querySelector('.site-header');
    const progressBar = document.getElementById('scroll-progress');
    const isHome = this.getCurrentPageFilename() === 'index.html';

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Header scroll state
      if (scrollY > 40) {
        header.classList.add('scrolled');
        if (isHome) header.classList.remove('transparent-hero');
      } else {
        header.classList.remove('scrolled');
        if (isHome) header.classList.add('transparent-hero');
      }

      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / docHeight) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
    });
  }

  initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');

    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
  }

  initSearchModal() {
    // Search modal HTML injected globally
    const modalHTML = `
      <div class="modal-backdrop" id="search-modal-backdrop">
        <div class="modal-box search-modal-box">
          <button class="modal-close" id="search-modal-close"><i class="fa-solid fa-xmark"></i></button>
          <div class="section-header" style="margin-bottom: 1rem;">
            <span class="eyebrow">Horological Search</span>
            <h3 class="section-title" style="font-size: 1.8rem; margin: 0;">Find a Timepiece</h3>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <input type="text" id="global-search-input" class="luxury-input" placeholder="Type watch name, collection, or reference ID (e.g. Tourbillon, ALB-LX-01)..." style="width: 100%; padding: 1rem;">
          </div>
          <div class="search-results-list" id="global-search-results">
            <div style="text-align: center; color: var(--text-muted); padding: 1.5rem; font-size: 0.85rem;">
              Start typing to explore our 24 luxury masterworks instantly.
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const backdrop = document.getElementById('search-modal-backdrop');
    const closeBtn = document.getElementById('search-modal-close');
    const input = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('global-search-results');

    document.querySelectorAll('.search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        backdrop.classList.add('open');
        setTimeout(() => input.focus(), 150);
      });
    });

    closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });

    input.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem; font-size: 0.85rem;">Start typing to explore our 24 luxury masterworks instantly.</div>`;
        return;
      }

      const matches = ALBERTO_WATCHES.filter(w => 
        w.name.toLowerCase().includes(q) || 
        w.collection.toLowerCase().includes(q) || 
        w.id.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem; font-size: 0.85rem;">No timepieces found matching "${q}".</div>`;
        return;
      }

      resultsContainer.innerHTML = matches.map(w => `
        <a href="products.html?product=${w.id}" class="search-result-item">
          <img src="${w.image}" alt="${w.name}">
          <div style="flex: 1;">
            <div style="font-size: 0.68rem; color: var(--gold-champagne); letter-spacing: 0.12em; text-transform: uppercase;">${w.collection} • ${w.id}</div>
            <div style="font-family: var(--font-display); font-size: 1.05rem; color: var(--text-white);">${w.name}</div>
          </div>
          <div style="font-family: var(--font-editorial); font-size: 1.15rem; color: var(--gold-light);">${AlbertoUtils.formatCurrency(w.price)}</div>
        </a>
      `).join('');
    });
  }
}

// Global Footer Renderer
class AlbertoFooter {
  constructor() {
    this.renderFooter();
  }

  renderFooter() {
    const visitorCount = AlbertoUtils.incrementVisitorCounter();
    const footerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="brand-logo" style="margin-bottom: 1.25rem;">
                <span class="brand-logo-main">ALBERTO</span>
                <span class="brand-logo-sub">Geneva 1928</span>
              </a>
              <p style="font-size: 0.86rem; color: var(--text-muted); max-width: 320px; line-height: 1.6; margin-bottom: 1.25rem;">
                Mastering the sacred geometry of horology. Hand-crafted mechanical complications and pioneering connected timepieces from Geneva, Switzerland.
              </p>
              <div class="footer-socials">
                <a href="https://instagram.com" target="_blank" class="social-circle" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://facebook.com" target="_blank" class="social-circle" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" class="social-circle" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://youtube.com" target="_blank" class="social-circle" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>

            <div>
              <h4 class="footer-heading">Collections</h4>
              <div class="footer-links">
                <a href="luxury.html">Grand Complications</a>
                <a href="luxury.html">Sovereign Series</a>
                <a href="vintage.html">Heritage 1957</a>
                <a href="smartwatches.html">Chronos Connected</a>
                <a href="products.html">All 24 Timepieces</a>
              </div>
            </div>

            <div>
              <h4 class="footer-heading">The Manufacture</h4>
              <div class="footer-links">
                <a href="technology.html">Horological Calibres</a>
                <a href="about.html">Our Legacy & Story</a>
                <a href="gallery.html">Cinematic Gallery</a>
                <a href="stores.html">Boutique Locator</a>
                <a href="pricing.html">Official Price List</a>
              </div>
            </div>

            <div>
              <h4 class="footer-heading">VIP Concierge</h4>
              <div class="footer-links">
                <a href="support.html">Warranty & Repairs</a>
                <a href="support.html">Customer FAQ</a>
                <a href="contact.html">Private Appointment</a>
                <a href="contact.html">Press & Media</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>© 1928–2026 Alberto Watch Company S.A. All Rights Reserved. Geneva, Switzerland.</div>
            <div class="footer-telemetry">
              <span class="telemetry-pill live-clock"><i class="fa-solid fa-clock"></i> Loading Geneva...</span>
              <span class="telemetry-pill" id="user-geolocation"><i class="fa-solid fa-location-dot"></i> Geneva Boutique HQ</span>
              <span class="telemetry-pill"><i class="fa-solid fa-eye"></i> ${visitorCount} VIP Visits</span>
            </div>
          </div>
        </div>
      </footer>

      <!-- Bottom Information Ticker -->
      <div class="bottom-ticker">
        <div class="ticker-track">
          <div class="ticker-item"><i class="fa-solid fa-gem"><b>ALBERTO MANUFACTURE</b></i> • <span class="gold">GENEVA, SWITZERLAND</span></div>
          <div class="ticker-item"><i class="fa-solid fa-clock"></i> <span class="gold">FREE WORLDWIDE INSURED SHIPPING</span> ON ALL MASTERWORKS</div>
          <div class="ticker-item"><i class="fa-solid fa-shield-halved"></i> <span class="gold">5-YEAR INTERNATIONAL GUARANTEE</span></div>
          <div class="ticker-item"><i class="fa-solid fa-certificate"></i> <span class="gold">SWISS CERTIFIED CHRONOMETER (COSC)</span></div>
          <div class="ticker-item"><i class="fa-solid fa-gem"><b>ALBERTO MANUFACTURE</b></i> • <span class="gold">GENEVA, SWITZERLAND</span></div>
          <div class="ticker-item"><i class="fa-solid fa-clock"></i> <span class="gold">FREE WORLDWIDE INSURED SHIPPING</span> ON ALL MASTERWORKS</div>
          <div class="ticker-item"><i class="fa-solid fa-shield-halved"></i> <span class="gold">5-YEAR INTERNATIONAL GUARANTEE</span></div>
          <div class="ticker-item"><i class="fa-solid fa-certificate"></i> <span class="gold">SWISS CERTIFIED CHRONOMETER (COSC)</span></div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <button class="back-to-top" id="back-to-top-btn" aria-label="Back to top" title="Scroll to top">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);

    const backBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AlbertoNavbar();
  new AlbertoFooter();
});