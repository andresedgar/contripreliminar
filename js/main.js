/* ============================================
   El Contribuyente — Main JavaScript
   Interacciones mínimas: menú móvil, sticky
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // ─────────────────────────────────────────
  // NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────────
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
  }

  // ─────────────────────────────────────────
  // MOBILE MENU TOGGLE
  // ─────────────────────────────────────────
  const menuToggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('navbar__mobile-menu--open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('navbar__mobile-menu--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ─────────────────────────────────────────
  // SEARCH TOGGLE
  // ─────────────────────────────────────────
  const searchToggle = document.querySelector('.navbar__search-btn');
  const searchContainer = document.querySelector('.navbar__search');
  const searchInput = document.querySelector('.navbar__search-input');

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener('click', () => {
      const isOpen = searchContainer.classList.toggle('navbar__search--open');

      if (isOpen && searchInput) {
        searchInput.focus();
      } else if (searchInput) {
        searchInput.value = '';
      }
    });

    // Close search when pressing Escape
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchContainer.classList.remove('navbar__search--open');
          searchInput.value = '';
          searchToggle.focus();
        }
      });
    }
  }

  // ─────────────────────────────────────────
  // TICKER ANIMATION (if not using CSS)
  // ─────────────────────────────────────────
  const tickerTrack = document.querySelector('.topbar__ticker-track');

  if (tickerTrack) {
    // Duplicate ticker items for seamless loop
    const tickerItems = tickerTrack.innerHTML;
    tickerTrack.innerHTML = tickerItems + tickerItems;
  }

  // ─────────────────────────────────────────
  // NEWSLETTER FORM
  // ─────────────────────────────────────────
  const newsletterForms = document.querySelectorAll('.newsletter__form, .mini-newsletter__form');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const email = input?.value;

      if (email && email.includes('@')) {
        // Show success message
        const successEl = document.createElement('div');
        successEl.className = 'newsletter__success';
        successEl.textContent = '¡Listo! Revisa tu correo para confirmar tu suscripción.';

        form.parentNode.replaceChild(successEl, form);
      }
    });
  });

  // ─────────────────────────────────────────
  // SHARE BUTTONS
  // ─────────────────────────────────────────
  const shareButtons = document.querySelectorAll('.share-btn');

  shareButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const network = this.dataset.network;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);

      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      };

      if (network === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const label = this.querySelector('.share-btn__label');
          if (label) {
            const originalText = label.textContent;
            label.textContent = '¡Copiado!';
            setTimeout(() => {
              label.textContent = originalText;
            }, 2000);
          }
        });
      } else if (shareUrls[network]) {
        window.open(shareUrls[network], '_blank', 'width=600,height=400');
      }
    });
  });

  // ─────────────────────────────────────────
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ─────────────────────────────────────────
  // LAZY LOADING IMAGES
  // ─────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ─────────────────────────────────────────
  // ACTIVE NAV LINK
  // ─────────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('navbar__link--active');
    }
  });
});

// ─────────────────────────────────────────
// UTILITY: Format date in Spanish
// ─────────────────────────────────────────
function formatDateSpanish(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('es-MX', options);
}

// ─────────────────────────────────────────
// UTILITY: Debounce function
// ─────────────────────────────────────────
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
