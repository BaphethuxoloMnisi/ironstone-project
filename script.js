/* ============================================
   IRONSTONE GROUP — Site JavaScript
   ============================================ */

// ── Page Navigation ──────────────────────────
function navigateTo(pageName, anchor) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageName);
  if (target) {
    target.classList.add('active');
  }

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + pageName);
  if (activeNav) activeNav.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // If anchor given, scroll after a short delay
  if (anchor) {
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        const offset = 90;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }

  // Update page title for SEO
  const titles = {
    home:     'Ironstone Group (Pty) Ltd — Multi-Sector Infrastructure & Services',
    about:    'About Us — Ironstone Group (Pty) Ltd',
    services: 'Our Services — Ironstone Group (Pty) Ltd',
    sectors:  'Sectors We Serve — Ironstone Group (Pty) Ltd',
    contact:  'Contact Us — Ironstone Group (Pty) Ltd',
  };
  document.title = titles[pageName] || titles.home;
}

// ── Nav Scroll Effect ──────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile Menu ──────────────────────────
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileDrawer  = document.getElementById('mobileDrawer');
const menuOverlay   = document.getElementById('menuOverlay');
const drawerClose   = document.getElementById('drawerClose');

function openMobile() {
  hamburgerBtn.classList.add('open');
  mobileDrawer.classList.add('open');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  hamburgerBtn.classList.remove('open');
  mobileDrawer.classList.remove('open');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  if (mobileDrawer.classList.contains('open')) {
    closeMobile();
  } else {
    openMobile();
  }
});

drawerClose.addEventListener('click', closeMobile);
menuOverlay.addEventListener('click', closeMobile);

// ── Mobile Submenu Toggle ──────────────────────────
function toggleMobileSub(btn) {
  const sub = btn.nextElementSibling;
  const isOpen = sub.classList.contains('open');

  // Close all
  document.querySelectorAll('.mobile-sub').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.mobile-nav-item button span').forEach(s => s.textContent = '+');

  if (!isOpen) {
    sub.classList.add('open');
    btn.querySelector('span').textContent = '−';
  }
}

// ── Contact Form ──────────────────────────
function handleFormSubmit() {
  const inputs = document.querySelectorAll('#page-contact input, #page-contact textarea, #page-contact select');
  let valid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') || input.placeholder.includes('*')) {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#d94f2b';
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        }, { once: true });
      }
    }
  });

  if (valid) {
    const btn = document.querySelector('#page-contact .btn-gold');
    const original = btn.textContent;
    btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
    btn.style.background = '#4caf50';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      inputs.forEach(i => i.value = '');
    }, 4000);
  }
}

// ── Scroll Animations ──────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initAnimations() {
  const animatable = document.querySelectorAll(
    '.service-card, .market-card, .why-item, .value-item, .stat-item, .mv-card, .feat-item'
  );
  animatable.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

// Re-init animations when page changes
const origNavigateTo = navigateTo;
window.navigateTo = function(page, anchor) {
  origNavigateTo(page, anchor);
  setTimeout(initAnimations, 50);
};

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

// Also init immediately (for non-DOMContentLoaded environments)
initAnimations();