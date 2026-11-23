/* ==========================================================================
   ALBERTO WATCH COMPANY — UTILITIES & GLOBAL STATE
   ========================================================================== */

class AlbertoUtils {
  static formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  static showToast(message) {
    let toast = document.getElementById('alberto-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'alberto-toast';
      toast.className = 'alberto-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-gem" style="color: var(--gold-champagne);"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  static getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('alberto_wishlist')) || [];
    } catch (e) {
      return [];
    }
  }

  static toggleWishlist(productId) {
    let list = this.getWishlist();
    const index = list.indexOf(productId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
      added = false;
      this.showToast('Removed timepiece from your Wishlist.');
    } else {
      list.push(productId);
      added = true;
      this.showToast('Added timepiece to your luxury Wishlist.');
    }
    localStorage.setItem('alberto_wishlist', JSON.stringify(list));
    document.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: list } }));
    return added;
  }

  static incrementVisitorCounter() {
    try {
      let count = parseInt(localStorage.getItem('alberto_visitors') || '142850', 10);
      count++;
      localStorage.setItem('alberto_visitors', count);
      return count.toLocaleString();
    } catch (e) {
      return '142,850';
    }
  }

  static initLiveClock() {
    const clockEls = document.querySelectorAll('.live-clock');
    if (clockEls.length === 0) return;

    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      clockEls.forEach(el => {
        el.textContent = `${dateString} | ${timeString} Geneva`;
      });
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  static initGeolocation() {
    const geoEl = document.getElementById('user-geolocation');
    if (!geoEl) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // Approximate or display city status demo
          geoEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> Connected (Bespoke VIP Concierge Active)`;
        },
        error => {
          geoEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> Geneva Boutique HQ`;
        },
        { timeout: 5000 }
      );
    } else {
      geoEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> Geneva Boutique HQ`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  AlbertoUtils.initLiveClock();
  AlbertoUtils.initGeolocation();
});