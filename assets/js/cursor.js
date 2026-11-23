/* ==========================================================================
   ALBERTO WATCH COMPANY — CUSTOM CURSOR ENGINE
   ========================================================================== */

class AlbertoCursor {
  constructor() {
    // Only initialize on desktop / pointer devices
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    this.ring = document.createElement('div');
    this.ring.className = 'cursor-ring';
    this.ring.innerHTML = '<span class="cursor-label">Explore</span>';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
    document.documentElement.classList.add('custom-cursor-active');

    this.cursorX = window.innerWidth / 2;
    this.cursorY = window.innerHeight / 2;
    this.ringX = this.cursorX;
    this.ringY = this.cursorY;

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    window.addEventListener('mousemove', e => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
      this.dot.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px) translate(-50%, -50%)`;

      // Throttle trail particles
      if (Math.random() > 0.65) {
        this.createParticle(this.cursorX, this.cursorY);
      }
    });

    // Hover listeners
    document.addEventListener('mouseover', e => {
      const target = e.target.closest('a, button, [role="button"], input, select');
      const mediaTarget = e.target.closest('.product-card, .gallery-item, .collection-card');

      if (mediaTarget) {
        this.ring.classList.add('hover-media');
      } else if (target) {
        this.ring.classList.add('hover-button');
      }
    });

    document.addEventListener('mouseout', e => {
      const target = e.target.closest('a, button, [role="button"], input, select');
      const mediaTarget = e.target.closest('.product-card, .gallery-item, .collection-card');

      if (mediaTarget) {
        this.ring.classList.remove('hover-media');
      } else if (target) {
        this.ring.classList.remove('hover-button');
      }
    });

    document.addEventListener('mousedown', () => {
      this.ring.style.transform = `translate(-50%, -50%) scale(0.85)`;
    });

    document.addEventListener('mouseup', () => {
      this.ring.style.transform = `translate(-50%, -50%) scale(1)`;
    });
  }

  createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-trail-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }

  animate() {
    // Smooth lerp for ring follower
    this.ringX += (this.cursorX - this.ringX) * 0.18;
    this.ringY += (this.cursorY - this.ringY) * 0.18;
    this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AlbertoCursor();
});