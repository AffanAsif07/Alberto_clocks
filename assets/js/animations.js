/* ==========================================================================
   ALBERTO WATCH COMPANY — ZERO-FLICKER CINEMATIC PRELOADER & TRANSITIONS
   ========================================================================== */

// Page load hote hi foran screen lock kar dein taake 1ms ka flash bhi na aaye
document.documentElement.classList.add('is-loading');

class AlbertoAnimations {
  constructor() {
    this.initPreloader();
    this.initSmoothPageTransitions();
    this.initScrollReveal();
    this.initSpotlight();
  }

  initPreloader() {
    // Agar pehle se maujood ho toh dobara na banayein
    let preloader = document.getElementById('alberto-preloader');
    if (!preloader) {
      const preloaderHTML = `
        <div class="preloader" id="alberto-preloader" style="opacity: 1; visibility: visible;">
          <div class="preloader-dial">
            <div class="preloader-hand"></div>
            <div class="preloader-center-dot"></div>
          </div>
          <div class="preloader-logo">ALBERTO</div>
          <div class="preloader-status">
            <div class="preloader-percent" id="preloader-percent">0%</div>
            <div class="preloader-bar">
              <div class="preloader-bar-fill" id="preloader-bar-fill"></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
      preloader = document.getElementById('alberto-preloader');
    }

    const percentEl = document.getElementById('preloader-percent');
    const fillEl = document.getElementById('preloader-bar-fill');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Jab animation 100% ho jaye, tab page ko unhide karein aur preloader hatayein
        setTimeout(() => {
          document.documentElement.classList.remove('is-loading');
          preloader.classList.add('hidden');
          setTimeout(() => {
            if (preloader && preloader.parentNode) preloader.remove();
          }, 600);
        }, 250);
      }
      if (percentEl) percentEl.textContent = `${progress}%`;
      if (fillEl) fillEl.style.width = `${progress}%`;
    }, 55);
  }

  initSmoothPageTransitions() {
    // Link click par direct ALBERTO name + black curtain aayega aur seedha naye page ke preloader par jayega
    let curtain = document.getElementById('page-transition');
    if (!curtain) {
      const curtainHTML = `
        <div class="page-transition-overlay" id="page-transition">
          <div class="page-transition-brand">ALBERTO GENEVA</div>
        </div>
      `;
      document.body.insertAdjacentHTML('afterbegin', curtainHTML);
      curtain = document.getElementById('page-transition');
    }

    document.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.getAttribute('target') &&
        !link.getAttribute('download') &&
        !link.getAttribute('href').startsWith('#')
      ) {
        const url = link.href;
        if (url !== window.location.href) {
          e.preventDefault();

          // Curtain show karein aur purane page ko chhupa dein
          curtain.classList.add('active');
          curtain.style.opacity = '1';
          curtain.style.pointerEvents = 'all';

          setTimeout(() => {
            window.location.href = url;
          }, 350);
        }
      }
    });
  }

  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-scale, .image-mask-reveal').forEach(el => {
      observer.observe(el);
    });

    document.querySelectorAll('.section, .section-sm').forEach(sec => {
      if (!sec.classList.contains('reveal-up')) {
        sec.classList.add('reveal-up');
        observer.observe(sec);
      }
    });
  }

  initSpotlight() {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });
  }
}

// Script load hote hi foran run karein (DOMContentLoaded ka wait kiye baghair agar body ready ho)
if (document.body) {
  new AlbertoAnimations();
} else {
  document.addEventListener('DOMContentLoaded', () => new AlbertoAnimations());
}