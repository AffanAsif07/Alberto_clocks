/* ==========================================================================
   ALBERTO WATCH COMPANY — MAIN INITIALIZER & PAGE CONTROLLERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Tilt Effect on Product Cards
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.product-card');
    if (!card || window.innerWidth < 992) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.product-card');
    if (card) {
      card.style.transform = '';
    }
  });

  // 2. Newsletter Form Demo Handler
  const newsletterForm = document.getElementById('newsletter-demo-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        AlbertoUtils.showToast(`Welcome to the Alberto Private Salon. Invitation sent to ${input.value.trim()}.`);
        input.value = '';
      }
    });
  }

  // 3. Pricing Table Page Controller
  const pricingBody = document.getElementById('pricing-table-body');
  if (pricingBody && typeof ALBERTO_WATCHES !== 'undefined') {
    const searchInput = document.getElementById('pricing-search-input');
    const catSelect = document.getElementById('pricing-category-select');
    const sortSelect = document.getElementById('pricing-sort-select');

    const renderPricingTable = () => {
      const q = (searchInput?.value || '').toLowerCase().trim();
      const cat = catSelect?.value || 'all';
      const sort = sortSelect?.value || 'default';

      let list = [...ALBERTO_WATCHES];
      if (cat !== 'all') list = list.filter(w => w.category === cat);
      if (q) {
        list = list.filter(w =>
          w.name.toLowerCase().includes(q) ||
          w.id.toLowerCase().includes(q) ||
          w.collection.toLowerCase().includes(q)
        );
      }
      if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);

      if (list.length === 0) {
        pricingBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2.5rem; color:var(--text-muted);">No timepieces match your price list filter.</td></tr>`;
        return;
      }

      pricingBody.innerHTML = list.map(w => `
        <tr>
          <td><img src="${w.image}" alt="${w.name}" class="pricing-thumb"></td>
          <td>
            <div style="font-family: var(--font-display); font-size: 1.05rem; color: var(--text-white);">${w.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-dim);">${w.id}</div>
          </td>
          <td>${w.brand}</td>
          <td style="text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.12em; color: var(--gold-champagne);">${w.category}</td>
          <td style="font-family: var(--font-editorial); font-size: 1.25rem; color: var(--gold-light); font-weight: 600;">${AlbertoUtils.formatCurrency(w.price)}</td>
          <td>
            <button class="btn btn-outline btn-sm pricing-inspect-btn" data-id="${w.id}">Specs</button>
          </td>
        </tr>
      `).join('');
    };

    renderPricingTable();
    searchInput?.addEventListener('input', renderPricingTable);
    catSelect?.addEventListener('change', renderPricingTable);
    sortSelect?.addEventListener('change', renderPricingTable);

    pricingBody.addEventListener('click', e => {
      const btn = e.target.closest('.pricing-inspect-btn');
      if (btn) {
        const modal = new AlbertoInteractions();
        modal.openProductModal(btn.dataset.id);
      }
    });
  }

  // 4. Store Locator Page Controller
  const storeCards = document.querySelectorAll('.store-card');
  if (storeCards.length > 0) {
    const cityFilter = document.getElementById('store-city-filter');
    const storeSearch = document.getElementById('store-search-input');
    const mapCityTitle = document.getElementById('map-selected-city');
    const mapAddressText = document.getElementById('map-selected-address');
    const mapCoordsText = document.getElementById('map-selected-coords');

    const filterStores = () => {
      const city = cityFilter?.value || 'all';
      const q = (storeSearch?.value || '').toLowerCase().trim();

      storeCards.forEach(card => {
        const cardCity = card.dataset.city;
        const text = card.textContent.toLowerCase();
        const matchCity = city === 'all' || cardCity === city;
        const matchQuery = !q || text.includes(q);
        card.style.display = (matchCity && matchQuery) ? 'block' : 'none';
      });
    };

    cityFilter?.addEventListener('change', filterStores);
    storeSearch?.addEventListener('input', filterStores);

    storeCards.forEach(card => {
      card.addEventListener('click', () => {
        storeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (mapCityTitle) mapCityTitle.textContent = card.dataset.title;
        if (mapAddressText) mapAddressText.textContent = card.dataset.address;
        if (mapCoordsText) mapCoordsText.textContent = card.dataset.coords;
      });
    });
  }

  // 5. Contact Form Validation & Demo Submission
  const contactForm = document.getElementById('alberto-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const subject = document.getElementById('contact-subject');
      const message = document.getElementById('contact-message');

      document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      if (!name.value.trim() || name.value.trim().length < 2) {
        document.getElementById('err-name').textContent = 'Please enter your full name.';
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        document.getElementById('err-email').textContent = 'Please provide a valid email address.';
        valid = false;
      }
      if (!subject.value.trim()) {
        document.getElementById('err-subject').textContent = 'Please select or enter a subject.';
        valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        document.getElementById('err-message').textContent = 'Please enter a message of at least 10 characters.';
        valid = false;
      }

      if (valid) {
        const successBanner = document.getElementById('contact-success-banner');
        if (successBanner) successBanner.style.display = 'block';
        AlbertoUtils.showToast('Your message has been logged with the Geneva Concierge Desk.');
        contactForm.reset();
      }
    });
  }
});