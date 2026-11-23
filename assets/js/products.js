/* ==========================================================================
   ALBERTO WATCH COMPANY — CATALOG GRID, FILTERING, SEARCH & SORTING (FIXED)
   ========================================================================== */

class AlbertoCatalog {
  constructor(options = {}) {
    this.container = document.getElementById(options.containerId || 'products-grid-container');
    if (!this.container) return;

    this.fixedCategory = options.fixedCategory || null; 
    this.limit = options.limit || null;
    this.onlyBestSellers = options.onlyBestSellers || false;

    this.state = {
      category: this.fixedCategory || 'all',
      search: '',
      sort: 'featured',
      wishlistOnly: false
    };

    this.initControls();
    this.checkUrlParams();
    this.updateCategoryCounts();
    this.render();

    document.addEventListener('wishlistUpdated', () => {
      if (this.state.wishlistOnly) {
        this.render();
      } else {
        this.syncWishlistButtons();
      }
    });
  }

  checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    if (productParam) {
      setTimeout(() => {
        const modalTrigger = new AlbertoInteractions();
        modalTrigger.openProductModal(productParam);
      }, 600);
    }
    if (window.location.hash === '#wishlist') {
      this.state.wishlistOnly = true;
      const wishPill = document.querySelector('[data-filter="wishlist"]');
      if (wishPill) {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        wishPill.classList.add('active');
      }
    }
  }

  updateCategoryCounts() {
    const totalCount = ALBERTO_WATCHES.length;
    const luxuryCount = ALBERTO_WATCHES.filter(w => w.category === 'luxury').length;
    const vintageCount = ALBERTO_WATCHES.filter(w => w.category === 'vintage').length;
    const smartCount = ALBERTO_WATCHES.filter(w => w.category === 'smartwatches').length;
    const classicCount = ALBERTO_WATCHES.filter(w => w.category === 'classic').length;
    const sportsCount = ALBERTO_WATCHES.filter(w => w.category === 'sports').length;

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.textContent = `All (${totalCount})`;

    const luxBtn = document.querySelector('[data-filter="luxury"]');
    if (luxBtn) luxBtn.textContent = `Luxury (${luxuryCount})`;

    const vintBtn = document.querySelector('[data-filter="vintage"]');
    if (vintBtn) vintBtn.textContent = `Vintage (${vintageCount})`;

    const smartBtn = document.querySelector('[data-filter="smartwatches"]');
    if (smartBtn) smartBtn.textContent = `Smart (${smartCount})`;

    const classicBtn = document.querySelector('[data-filter="classic"]');
    if (classicBtn) classicBtn.textContent = `Classic (${classicCount})`;

    const sportsBtn = document.querySelector('[data-filter="sports"]');
    if (sportsBtn) sportsBtn.textContent = `Sports (${sportsCount})`;
  }

  initControls() {
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.dataset.filter;
        if (filterVal === 'wishlist') {
          this.state.wishlistOnly = true;
          this.state.category = 'all';
        } else {
          this.state.wishlistOnly = false;
          this.state.category = filterVal;
        }
        this.render();
      });
    });

    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        this.state.search = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        this.state.sort = e.target.value;
        this.render();
      });
    }

    this.container.addEventListener('click', e => {
      const wishBtn = e.target.closest('.wishlist-toggle');
      if (wishBtn) {
        e.stopPropagation();
        const id = wishBtn.dataset.id;
        const added = AlbertoUtils.toggleWishlist(id);
        wishBtn.classList.toggle('active', added);
      }
    });
  }

  getFilteredWatches() {
    let list = [...ALBERTO_WATCHES];

    if (this.onlyBestSellers) {
      list = list.filter(w => w.bestSeller);
    }

    if (this.state.wishlistOnly) {
      const wishlist = AlbertoUtils.getWishlist();
      list = list.filter(w => wishlist.includes(w.id));
    } else if (this.state.category && this.state.category !== 'all') {
      list = list.filter(w => w.category === this.state.category);
    }

    if (this.state.search) {
      list = list.filter(w =>
        w.name.toLowerCase().includes(this.state.search) ||
        w.collection.toLowerCase().includes(this.state.search) ||
        w.id.toLowerCase().includes(this.state.search) ||
        w.shortDesc.toLowerCase().includes(this.state.search)
      );
    }

    switch (this.state.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    if (this.limit) {
      list = list.slice(0, this.limit);
    }

    return list;
  }

  syncWishlistButtons() {
    const wishlist = AlbertoUtils.getWishlist();
    this.container.querySelectorAll('.wishlist-toggle').forEach(btn => {
      btn.classList.toggle('active', wishlist.includes(btn.dataset.id));
    });
  }

  render() {
    const watches = this.getFilteredWatches();
    const countLabel = document.getElementById('catalog-result-count');
    if (countLabel) {
      countLabel.textContent = `Showing ${watches.length} Available Timepiece${watches.length === 1 ? '' : 's'}`;
    }

    if (watches.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle);">
          <i class="fa-regular fa-clock" style="font-size: 2.5rem; color: var(--gold-champagne); margin-bottom: 1rem;"></i>
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">No Timepieces Found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 440px; margin: 0 auto 1.5rem;">
            No available watches match your current filter or search criteria. Reset filters to explore the full Geneva Manufacture catalog.
          </p>
          <button class="btn btn-outline btn-sm" id="reset-catalog-btn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-catalog-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.state = { category: this.fixedCategory || 'all', search: '', sort: 'featured', wishlistOnly: false };
          const searchInput = document.getElementById('catalog-search-input');
          if (searchInput) searchInput.value = '';
          document.querySelectorAll('.filter-pill').forEach((p, idx) => p.classList.toggle('active', idx === 0));
          this.render();
        });
      }
      return;
    }

    const wishlist = AlbertoUtils.getWishlist();

    this.container.innerHTML = watches.map((w, idx) => {
      const isWished = wishlist.includes(w.id);
      return `
        <article class="product-card light-sweep-container" data-product-id="${w.id}" style="animation-delay: ${idx * 35}ms;">
          <div class="product-card-media">
            <span class="product-badge">${w.collection}</span>
            <button class="wishlist-toggle ${isWished ? 'active' : ''}" data-id="${w.id}" aria-label="Add to Wishlist" title="Save to Wishlist">
              <i class="fa-solid fa-heart"></i>
            </button>
            <img src="${w.image}" alt="${w.name}" loading="lazy">
          </div>
          <div class="product-card-body">
            <div class="product-meta-top">
              <span>${w.brand}</span>
              <span class="product-id">${w.id}</span>
            </div>
            <h3 class="product-title">${w.name}</h3>
            <p class="product-desc">${w.shortDesc}</p>
            <div class="product-card-footer">
              <span class="product-price">${AlbertoUtils.formatCurrency(w.price)}</span>
              <div class="product-card-actions">
                <button class="btn btn-outline btn-sm view-details-btn">Details</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}