document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  document.getElementById('year').textContent = new Date().getFullYear();

  initNavbar();
  initLangToggle();
  initMobileMenu();
  initScrollReveal();
  initTypewriter();
  initProgressBar();
  initActiveNavLink();
  initBackToTop();
  initContactForm();
  loadProjects();
});

// Navbar background on scroll
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Language toggle
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  btn.addEventListener('click', () => {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
  });
}

// Mobile menu
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Scroll reveal via IntersectionObserver
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

// Typewriter effect for hero rotating roles
let typewriterTimeout = null;

function initTypewriter() {
  runTypewriter();
  document.addEventListener('langchange', () => {
    clearTimeout(typewriterTimeout);
    runTypewriter();
  });
}

function runTypewriter() {
  const el = document.getElementById('typedRole');
  const roles = t('hero.roles');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        typewriterTimeout = setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    typewriterTimeout = setTimeout(tick, deleting ? 35 : 65);
  }

  tick();
}

// Scroll progress bar
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
}

// Highlight active nav link based on section in view
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// Back to top button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Contact form submission (Formspree-compatible)
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'Configura tu endpoint de Formspree en index.html (action="...") para activar el envío real.';
      status.className = 'form-status error';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = t('contact.form.sending');
    status.className = 'form-status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        status.textContent = t('contact.form.success');
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      status.textContent = t('contact.form.error');
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
