/* ==========================================================================
   ALBERTO WATCH COMPANY — GALLERY MASONRY & FULL-SCREEN LIGHTBOX
   ========================================================================== */

const ALBERTO_GALLERY_ITEMS = [
  {
    src: "https://en-pk.svestonwatches.com/cdn/shop/files/Luxury_Sveston_Valentine_Watch_on_Books.png?v=1794590045",
    title: "Imperator Tourbillon Calibre AL-901",
    caption: "18k Rose Gold Openworked Balance Bridge • Geneva Atelier"
  },
  {
    src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
    title: "Royal Monaco Perpetual Calendar",
    caption: "Platinum 950 Case with Hand-Engineered Moonphase Disc"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyAy2ExciWzGHx8U5mpIlVXN1q6qa1GsKEw3VlItKZrO5-QKNLRtHMBr_L&s=10",
    title: "Valentin Skeleton Architecture",
    caption: "312 Hand-Beveled Components in Grade 5 Titanium"
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    title: "Sovereign Column-Wheel Chronograph",
    caption: "Sunburst Guilloché Dial Crafted by Master Artisans"
  },
  {
    src: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1200&auto=format&fit=crop",
    title: "Heritage 1957 Racing Edition",
    caption: "Domed Hesalite Crystal & Vintage Tachymeter Scale"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74Cd_6jAbaoR3HR6S9Chy6SwmnCgdgSQGe0EKbBOf-nC_x67fkbPuOqo&s=10",
    title: "Abyss Deep Dive 1000M",
    caption: "Helium Escape Valve & Unidirectional Ceramic Bezel"
  },
  {
    src: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop",
    title: "Aurelia High Jewelry Pavé",
    caption: "340 Baguette-Cut VVS Diamonds Set Invisibly in White Gold"
  },
  {
    src: "https://harshaystore.pk/cdn/shop/files/81_ROHG20uL._AC_SX679_720x.jpg?v=1754152069",
    title: "Geneva 1948 Archive Vault",
    caption: "Original Blueprints & Calibre Prototypes from Rue du Rhône"
  },
  {
    src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop",
    title: "Chronos One Titanium Connected",
    caption: "Sapphire Touch Display Meets Swiss Horological Finishing"
  },
  {
    src: "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=1200&auto=format&fit=crop",
    title: "Imperator Moonphase Azure",
    caption: "Natural Aventurine Glass Dial & Solid Gold Lunar Disc"
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    title: "Summit Alpinist Expedition GMT",
    caption: "Tested at 4,800 Meters on Mont Blanc"
  },
  {
    src: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1200&auto=format&fit=crop",
    title: "Chronos Sport Zirconia Ceramic",
    caption: "Scratch-Proof Monobloc Ceramic Case Architecture"
  }
];

class AlbertoGallery {
  constructor() {
    this.grid = document.getElementById('gallery-masonry-grid');
    if (!this.grid) return;

    this.currentIndex = 0;
    this.renderGrid();
    this.initLightbox();
  }

  renderGrid() {
    this.grid.innerHTML = ALBERTO_GALLERY_ITEMS.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span style="font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-champagne); margin-bottom: 0.3rem;">Plate ${String(idx + 1).padStart(2, '0')}</span>
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: var(--text-white); margin-bottom: 0.25rem;">${item.title}</h3>
          <p style="font-size: 0.8rem; color: var(--text-silver);">${item.caption}</p>
        </div>
      </div>
    `).join('');
  }

  initLightbox() {
    const lightboxHTML = `
      <div class="lightbox-modal" id="alberto-lightbox">
        <button class="modal-close" id="lightbox-close" style="top: 1.5rem; right: 1.5rem;"><i class="fa-solid fa-xmark"></i></button>
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="">
          <h3 id="lightbox-title" style="font-family: var(--font-display); font-size: 1.6rem; color: var(--gold-light); margin-bottom: 0.3rem;"></h3>
          <p id="lightbox-caption" style="font-size: 0.9rem; color: var(--text-silver);"></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const modal = document.getElementById('alberto-lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    this.grid.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        this.openLightbox(parseInt(item.dataset.index, 10));
      }
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    prevBtn.addEventListener('click', () => this.navigate(-1));
    nextBtn.addEventListener('click', () => this.navigate(1));

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });

    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') modal.classList.remove('open');
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxView();
    document.getElementById('alberto-lightbox').classList.add('open');
  }

  navigate(dir) {
    this.currentIndex = (this.currentIndex + dir + ALBERTO_GALLERY_ITEMS.length) % ALBERTO_GALLERY_ITEMS.length;
    this.updateLightboxView();
  }

  updateLightboxView() {
    const item = ALBERTO_GALLERY_ITEMS[this.currentIndex];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-title').textContent = item.title;
    document.getElementById('lightbox-caption').textContent = `${item.caption} (${this.currentIndex + 1} / ${ALBERTO_GALLERY_ITEMS.length})`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AlbertoGallery();
});