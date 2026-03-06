// ─── NAV: scroll effect ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── NAV: mobile burger ───────────────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── CONTACT FORM: basic client-side handling ─────────────────────────────────
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    // Highlight empty required fields
    [form.name, form.email, form.message].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#f87171';
        field.addEventListener('input', () => field.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  // Simulate submission
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    btn.style.display = 'none';
    formSuccess.classList.add('visible');
  }, 900);
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.card, .about__inner, .contact__form');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
