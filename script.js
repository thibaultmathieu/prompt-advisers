// ─── NAV: glassmorphism on scroll ────────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── NAV: mobile burger ──────────────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── HERO: bokeh floating circles ──────────────────────────────────────────
const bokehContainer = document.getElementById('heroBokeh');

function createBokeh() {
  const elements = [
    // Large background discs — semi-transparent, visible edges, minimal blur
    { type: 'disc', size: 450, left: -10, top: -12, opacity: 0.9,  delay: 0   },
    { type: 'disc', size: 330, left: 8,   top: 52,  opacity: 0.7,  delay: -4  },
    { type: 'disc', size: 270, left: 83,  top: 48,  opacity: 0.65, delay: -7  },
    { type: 'disc', size: 220, left: 90,  top: -2,  opacity: 0.45, delay: -9  },
    { type: 'disc', size: 200, left: 55,  top: 74,  opacity: 0.35, delay: -3  },

    // Bright accent disc near subtitle — frosted orb, positioned left of "We architect"
    { type: 'disc', size: 65,  left: 32,  top: 63,  opacity: 1,    delay: -6, bright: true },

    // Ring outlines — thin stroked circles near bright disc
    { type: 'ring', size: 38,  left: 35,  top: 56,  opacity: 0.9,  delay: -2  },
    { type: 'ring', size: 22,  left: 33,  top: 54,  opacity: 0.6,  delay: -10 },

    // Lens flare — small soft horizontal glow near bright disc
    { type: 'flare', size: 50, left: 30,  top: 66,  opacity: 0.4,  delay: -8,
      color: 'radial-gradient(ellipse 120% 50%, rgba(210, 215, 230, 0.25) 0%, transparent 70%)' },

    // Green accent dot
    { type: 'dot',  size: 6,   left: 35,  top: 68,  opacity: 1,    delay: -5, color: 'rgba(0, 210, 160, 0.8)' },
  ];

  elements.forEach(c => {
    const el = document.createElement('div');
    el.classList.add('bokeh-' + c.type);
    if (c.bright) el.classList.add('bokeh-disc--bright');
    el.style.width = c.size + 'px';
    el.style.height = c.size + 'px';
    el.style.left = c.left + '%';
    el.style.top = c.top + '%';
    el.style.opacity = c.opacity;
    el.style.animationDelay = c.delay + 's';
    el.style.animationDuration = (14 + Math.random() * 4) + 's';
    if (c.color) el.style.background = c.color;
    bokehContainer.appendChild(el);
  });
}

if (bokehContainer) createBokeh();

// ─── HERO: mouse parallax ───────────────────────────────────────────────────
const heroContent = document.getElementById('heroContent');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroContent.style.transform = `translate(${x}px, ${y}px)`;
});

// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ─── ABOUT: stat counter animation ──────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat__number[data-target]');
let statsCounted = false;

function animateCounters() {
  if (statsCounted) return;
  statsCounted = true;

  statNumbers.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const aboutStats = document.getElementById('aboutStats');
if (aboutStats) statsObserver.observe(aboutStats);

// ─── CONTACT FORM: validation & submission ───────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    [form.name, form.email, form.message].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4444';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  setTimeout(() => {
    form.reset();
    btn.style.display = 'none';
    formSuccess.classList.add('visible');
  }, 900);
});
