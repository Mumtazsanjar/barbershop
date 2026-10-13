/**
 * THE GENTLEMEN'S CLUB — Premium Barbershop
 * main.js — Navigation, Animations, Interactions
 *
 * Sections:
 *  1. Config & State
 *  2. Utility Helpers
 *  3. Header Scroll Behavior
 *  4. Mobile Navigation
 *  5. Active Nav Link Tracking
 *  6. Smooth Anchor Scrolling
 *  7. Scroll Reveal Animations
 *  8. Hero Image Ken Burns Effect
 *  9. Lazy Image Loading
 * 10. Image Error Fallback
 * 11. Gallery Hover Labels
 * 12. Eager Image Loading
 * 13. Init
 */

'use strict';

/* ============================================================
   1. CONFIG & STATE
   ============================================================ */
const CONFIG = {
  scrolledThreshold: 60,         // px before header gets "scrolled" class
  revealRootMargin:  '0px 0px -80px 0px',
  revealThreshold:   0,
  lazyRootMargin:    '0px 0px 400px 0px', // load images 400px before viewport
  navSections:       ['home', 'services', 'barbers', 'gallery', 'about', 'contact'],
};

const STATE = {
  mobileNavOpen: false,
  ticking:       false,
  lastScrollY:   0,
};

/* ============================================================
   2. UTILITY HELPERS
   ============================================================ */

/**
 * Shorthand querySelector — throws a clear error if not found in strict mode.
 * Returns null gracefully so callers can check.
 */
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/** Throttle via rAF */
function onScroll(callback) {
  window.addEventListener('scroll', () => {
    if (!STATE.ticking) {
      requestAnimationFrame(() => {
        callback(window.scrollY);
        STATE.ticking = false;
      });
      STATE.ticking = true;
    }
  }, { passive: true });
}

/** Prefer reduced motion check */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ============================================================
   3. HEADER SCROLL BEHAVIOR
   ============================================================ */
function initHeaderScroll() {
  const header = qs('.site-header');
  if (!header) return;

  function updateHeader(scrollY) {
    if (scrollY > CONFIG.scrolledThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Set correct state on load (e.g. user refreshed mid-page)
  updateHeader(window.scrollY);

  onScroll(updateHeader);
}

/* ============================================================
   4. MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const toggle   = qs('.nav-toggle');
  const mobileNav = qs('.mobile-nav');
  const mobileLinks = qsa('.mobile-nav .nav-link');

  if (!toggle || !mobileNav) return;

  function openNav() {
    STATE.mobileNavOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('aria-hidden');
    document.body.classList.add('nav-open');
    // Move focus into nav for accessibility
    const firstLink = qs('.mobile-nav .nav-link', mobileNav);
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    STATE.mobileNavOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
    toggle.focus();
  }

  function toggleNav() {
    STATE.mobileNavOpen ? closeNav() : openNav();
  }

  toggle.addEventListener('click', toggleNav);

  // Close when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && STATE.mobileNavOpen) closeNav();
  });

  // Close when clicking the overlay background (not the nav links)
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });

  // Trap focus inside mobile nav when open
  mobileNav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !STATE.mobileNavOpen) return;

    const focusable = qsa(
      'a, button, [tabindex]:not([tabindex="-1"])',
      mobileNav
    ).filter(el => !el.disabled);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ============================================================
   5. ACTIVE NAV LINK TRACKING
   ============================================================ */
function initActiveNav() {
  const navLinks       = qsa('.primary-nav .nav-link[data-section]');
  const mobileNavLinks = qsa('.mobile-nav .nav-link[data-section]');
  const allNavLinks    = [...navLinks, ...mobileNavLinks];

  if (allNavLinks.length === 0) return;

  const sections = CONFIG.navSections
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (sections.length === 0) return;

  function setActive(id) {
    allNavLinks.forEach(link => {
      const isActive = link.dataset.section === id;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  // IntersectionObserver for section detection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   6. SMOOTH ANCHOR SCROLLING
   ============================================================ */
function initSmoothScroll() {
  // Account for fixed header height
  function getHeaderHeight() {
    const header = qs('.site-header');
    return header ? header.offsetHeight : 70;
  }

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const offsetTop = target.getBoundingClientRect().top
      + window.scrollY
      - getHeaderHeight()
      - 16; // small extra breathing room

    if (prefersReducedMotion()) {
      window.scrollTo(0, offsetTop);
    } else {
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }

    // Update URL hash without jumping
    history.pushState(null, '', `#${targetId}`);

    // Set focus to section for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

/* ============================================================
   7. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initReveal() {
  if (prefersReducedMotion()) {
    // Skip animation — make everything visible immediately
    qsa('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const elements = qsa('.reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, {
    rootMargin: CONFIG.revealRootMargin,
    threshold:  CONFIG.revealThreshold,
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   8. HERO IMAGE KEN BURNS EFFECT
   ============================================================ */
function initHeroImage() {
  const heroImg = qs('.hero-bg img');
  if (!heroImg || prefersReducedMotion()) return;

  // Mark as loaded after image finishes loading to trigger CSS scale
  function onLoad() {
    heroImg.classList.add('loaded');
  }

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    onLoad();
  } else {
    heroImg.addEventListener('load', onLoad);
  }
}

/* ============================================================
   9. LAZY IMAGE LOADING
   ============================================================ */
function initLazyImages() {
  const lazyImages = qsa('img[data-src]');
  if (lazyImages.length === 0) return;

  // Native lazy loading support check
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading — just set src
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      const wrap = img.closest('.img-wrap');
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        if (wrap) wrap.classList.add('loaded');
      });
      img.addEventListener('error', () => handleImageError(img));
    });
    return;
  }

  // Fallback: IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;

      const wrap = img.closest('.img-wrap');
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        if (wrap) wrap.classList.add('loaded');
      });
      img.addEventListener('error', () => handleImageError(img));

      observer.unobserve(img);
    });
  }, {
    rootMargin: CONFIG.lazyRootMargin,
  });

  lazyImages.forEach(img => observer.observe(img));
}

/* ============================================================
   10. IMAGE ERROR FALLBACK
   ============================================================ */

/**
 * Replace a failed image with a styled placeholder.
 * Uses an inline SVG data URI so there's no external dependency.
 */
function handleImageError(img) {
  img.removeEventListener('error', () => handleImageError(img));

  const label = img.alt || 'Image';

  // Inline SVG placeholder — dark background, scissors icon + label
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#1a1a1a"/>
      <rect x="1" y="1" width="398" height="398" fill="none" stroke="rgba(201,168,76,0.2)" stroke-width="1"/>
      <g transform="translate(200,180)" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5">
        <line x1="-25" y1="-30" x2="25" y2="30"/>
        <line x1="25" y1="-30" x2="-25" y2="30"/>
        <circle cx="-27" cy="-32" r="8"/>
        <circle cx="27" cy="-32" r="8"/>
        <circle cx="0" cy="0" r="3" fill="#C9A84C"/>
      </g>
      <text x="200" y="240" text-anchor="middle"
            font-family="Georgia, serif" font-size="13" fill="rgba(201,168,76,0.5)"
            letter-spacing="2">${label}</text>
      <text x="200" y="265" text-anchor="middle"
            font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.2)"
            letter-spacing="1">IMAGE PLACEHOLDER</text>
    </svg>
  `.trim();

  const encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
  img.src = encoded;
  img.classList.add('loaded');

  const wrap = img.closest('.img-wrap');
  if (wrap) wrap.classList.add('loaded');
}

/**
 * Attach error handlers to all images on the page (eager + lazy).
 */
function initImageErrorHandlers() {
  qsa('img').forEach(img => {
    // Skip data URIs and already-broken images
    if (!img.src || img.src.startsWith('data:')) return;

    if (!img.complete || img.naturalWidth === 0) {
      img.addEventListener('error', () => handleImageError(img), { once: true });
    } else if (img.naturalWidth === 0) {
      handleImageError(img);
    }
  });
}

/* ============================================================
   11. GALLERY — KEYBOARD NAVIGATION
   ============================================================ */
function initGallery() {
  const items = qsa('.gallery-item');
  items.forEach(item => {
    // Make items focusable for keyboard users
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'img');
    if (!item.getAttribute('aria-label')) {
      const label = item.querySelector('.gallery-item-label');
      if (label) item.setAttribute('aria-label', label.textContent.trim());
    }

    // Keyboard activation (Enter/Space triggers same visual as hover)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('focused');
      }
    });
  });
}

/* ============================================================
   12. EAGER IMAGES — apply loaded class once they resolve
   ============================================================ */
function initEagerImages() {
  qsa('img:not([data-src])').forEach(img => {
    const wrap = img.closest('.img-wrap');

    function markLoaded() {
      img.classList.add('loaded');
      if (wrap) wrap.classList.add('loaded');
    }

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', () => handleImageError(img), { once: true });
    }
  });
}

/* ============================================================
   13. INIT — Wire everything up on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNav();
  initSmoothScroll();
  initReveal();
  initHeroImage();
  initLazyImages();
  initImageErrorHandlers();
  initEagerImages();
  initGallery();

  // Log demo notice to console (not a real booking system)
  console.info(
    '%c THE GENTLEMEN\'S CLUB — DEMO SITE ',
    'background:#0d0d0d;color:#C9A84C;font-family:Georgia,serif;font-size:13px;padding:6px 12px;border:1px solid #C9A84C;border-radius:4px;',
    '\nThis is a portfolio demo. All content, pricing, and contact details are fictional.'
  );
});
