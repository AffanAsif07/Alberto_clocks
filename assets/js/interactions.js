/* ==========================================================================
   ALBERTO WATCH COMPANY — PRODUCT MODALS, WISHLIST & INTERACTIVE UI
   ========================================================================== */

class AlbertoInteractions {
  constructor() {
    this.initProductModal();
    this.initFAQAccordion();
  }

  initProductModal() {
    // Inject Product Modal HTML globally
    const modalHTML = `
      <div class="modal-backdrop" id="product-detail-modal">
        <div class="modal-box">
          <button class="modal-close" id="product-modal-close"><i class="fa-solid fa-xmark"></i></button>
          <div class="product-modal-grid" id="product-modal-content">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const backdrop = document.getElementById('product-detail-modal');
    const closeBtn = document.getElementById('product-modal-close');

    closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });

    // Global listener for product card clicks / detail buttons
    document.addEventListener('click', e => {
      const detailBtn = e.target.closest('.view-details-btn');
      const card = e.target.closest('.product-card');

      if (detailBtn || (card && !e.target.closest('.wishlist-toggle'))) {
        const targetCard = detailBtn ? detailBtn.closest('.product-card') : card;
        if (targetCard && targetCard.dataset.productId) {
          this.openProductModal(targetCard.dataset.productId);
        }
      }
    });
  }

  openProductModal(productId) {
    const product = ALBERTO_WATCHES.find(w => w.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('product-modal-content');
    const isWishlisted = AlbertoUtils.getWishlist().includes(product.id);

    const specsRows = Object.entries(product.specs).map(([key, val]) => `
      <tr><td>${key}</td><td>${val}</td></tr>
    `).join('');

    modalContent.innerHTML = `
      <div class="product-modal-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-modal-info">
        <div class="product-meta-top">
          <span>${product.brand}</span>
          <span class="product-id">${product.id}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--text-white);">${product.name}</h2>
        <div style="font-family: var(--font-editorial); font-size: 1.85rem; color: var(--gold-light); font-weight: 600;">
          ${AlbertoUtils.formatCurrency(product.price)}
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${product.shortDesc}</p>
        
        <table class="spec-table">
          ${specsRows}
        </table>

        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button class="btn btn-primary modal-reserve-btn" style="flex: 1;" data-id="${product.id}">
            <span>Reserve Timepiece</span> <i class="fa-solid fa-arrow-right btn-arrow"></i>
          </button>
          <button class="btn btn-outline modal-wish-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}">
            <i class="fa-solid fa-heart"></i> ${isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    `;

    // Bind modal buttons
    modalContent.querySelector('.modal-reserve-btn').addEventListener('click', () => {
      AlbertoUtils.showToast(`Reservation inquiry submitted for ${product.name} (${product.id}). Our Geneva Concierge will contact you.`);
      document.getElementById('product-detail-modal').classList.remove('open');
    });

    modalContent.querySelector('.modal-wish-btn').addEventListener('click', e => {
      const added = AlbertoUtils.toggleWishlist(product.id);
      e.currentTarget.classList.toggle('active', added);
      e.currentTarget.innerHTML = `<i class="fa-solid fa-heart"></i> ${added ? 'Wishlisted' : 'Wishlist'}`;
    });

    document.getElementById('product-detail-modal').classList.add('open');
  }

  initFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AlbertoInteractions();
});