/* ═══════════════════════════════════════════
   SUJAL THAKUR PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

/* ── 1. NAV SCROLL EFFECT ── */
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();


/* ── 2. SMOOTH ACTIVE NAV LINK ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.style.color = '');
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.style.color = '#A78BFA';
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();


/* ── 3. AOS — ANIMATE ON SCROLL ── */
(function () {
  const elements = document.querySelectorAll('[data-aos]');

  function applyDelay(el) {
    const delay = el.getAttribute('data-aos-delay');
    if (delay) el.style.transitionDelay = delay + 'ms';
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          applyDelay(entry.target);
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ── 4. SKILL BAR ANIMATION ── */
(function () {
  const fills = document.querySelectorAll('.sb-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el  = entry.target;
          const pct = el.getAttribute('data-width') || '0';
          // Small delay so it feels intentional
          setTimeout(() => { el.style.width = pct + '%'; }, 200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(f => observer.observe(f));
})();


/* ── 5. CONTACT FORM HANDLER ── */
function handleForm(event) {
  event.preventDefault();
  const btn     = event.target.querySelector('.form-submit');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  // Simulate async send (swap with real fetch/EmailJS in production)
  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    btn.style.background = 'linear-gradient(135deg,#34D399,#059669)';
    btn.style.boxShadow  = '0 0 20px rgba(52,211,153,0.5)';
    success.style.display = 'block';
    event.target.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      btn.style.background = '';
      btn.style.boxShadow  = '';
      success.style.display = 'none';
    }, 4000);
  }, 1400);
}


/* ── 6. ORBS PARALLAX ON MOUSE MOVE ── */
(function () {
  const orbs = document.querySelectorAll('.orb');

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const strength = (i + 1) * 12;
      orb.style.transform =
        `translate(${dx * strength}px, ${dy * strength}px) scale(1.04)`;
    });
  });
})();


/* ── 7. TYPING CURSOR IN HERO ROLE ── */
(function () {
  const roleEl = document.querySelector('.hero-role');
  if (!roleEl) return;

  const originalText = roleEl.textContent;
  roleEl.textContent = '';
  roleEl.style.borderRight = '2px solid #7C5EFC';
  roleEl.style.paddingRight = '4px';

  let i = 0;
  const type = () => {
    if (i < originalText.length) {
      roleEl.textContent += originalText[i++];
      setTimeout(type, 38);
    } else {
      // Blink cursor then stop
      let blinks = 0;
      const blink = setInterval(() => {
        roleEl.style.borderColor =
          blinks % 2 === 0 ? 'transparent' : '#7C5EFC';
        if (++blinks > 6) {
          clearInterval(blink);
          roleEl.style.borderRight = 'none';
        }
      }, 500);
    }
  };

  // Start after a short delay
  setTimeout(type, 800);
})();