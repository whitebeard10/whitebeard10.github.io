// =============================================
// JARVIS UI — Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function () {
  initParticles();
  initNav();
  initMobileMenu();
  initSmoothScroll();
  initSkillBars();
  initContactForm();
  initNavActive();
  initProjectFilter();
  initTypingEffect();
  initScrollReveal();
});

// =============================================
// PARTICLES.JS — Arc Reactor Style
// =============================================
function initParticles() {
  if (typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: '#00d4ff' },
      shape: { type: 'circle' },
      opacity: {
        value: 0.15,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false }
      },
      size: {
        value: 2,
        random: true,
        anim: { enable: false }
      },
      line_linked: {
        enable: true,
        distance: 160,
        color: '#00d4ff',
        opacity: 0.07,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

// =============================================
// NAVIGATION — Scroll Effect
// =============================================
function initNav() {
  const nav = document.getElementById('jarvis-nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// =============================================
// MOBILE MENU
// =============================================
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
    // Animate hamburger
    const spans = toggle.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =============================================
// SKILL BARS — Animated Fill
// =============================================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (bars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          entry.target.style.width = entry.target.getAttribute('data-width') + '%';
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

// =============================================
// CONTACT FORM
// =============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const btn = form.querySelector('button[type="submit"]');

    // Disable
    [...form.elements].forEach(el => el.disabled = true);
    btn.innerHTML = '<i class="fas fa-satellite-dish"></i> TRANSMITTING...';

    fetch('https://formspree.io/f/mblgoqny', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
      .then(res => res.json())
      .then(() => {
        form.innerHTML = `
          <div style="padding:2rem; border:1px solid #00ff88; background:rgba(0,255,136,0.05); text-align:center;">
            <div style="font-family:'Orbitron',sans-serif; font-size:0.7rem; letter-spacing:3px; color:#00ff88; margin-bottom:1rem;">
              ◆ TRANSMISSION SUCCESSFUL ◆
            </div>
            <p style="font-family:'Rajdhani',sans-serif; color:rgba(180,230,255,0.7); font-size:1rem;">
              Thank you, ${name}! Message received. I'll respond shortly.
            </p>
          </div>
        `;
      })
      .catch(() => {
        form.innerHTML = `
          <div style="padding:2rem; border:1px solid #ff4444; background:rgba(255,68,68,0.05); text-align:center;">
            <div style="font-family:'Orbitron',sans-serif; font-size:0.7rem; letter-spacing:3px; color:#ff4444; margin-bottom:1rem;">
              ◆ TRANSMISSION FAILED ◆
            </div>
            <p style="font-family:'Rajdhani',sans-serif; color:rgba(180,230,255,0.7); font-size:1rem;">
              Something went wrong. Please try again or email directly.
            </p>
          </div>
        `;
      });
  });
}

// =============================================
// NAV ACTIVE STATE on Scroll
// =============================================
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

// =============================================
// PROJECT FILTER
// =============================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cats = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeSlideUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// =============================================
// TYPING EFFECT — Hero Status Text
// =============================================
function initTypingEffect() {
  const statusEl = document.querySelector('.hero-status');
  if (!statusEl) return;

  const messages = [
    'SYSTEM ONLINE // PORTFOLIO v2.0',
    'LOADING MODULES // PLEASE STANDBY',
    'ALL SYSTEMS NOMINAL // READY',
    'JARVIS INTERFACE // INITIALIZED'
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = messages[msgIndex];

    if (!isDeleting) {
      statusEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(() => { isDeleting = true; type(); }, 3000);
        return;
      }
    } else {
      statusEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
      }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  }

  setTimeout(type, 2000);
}

// =============================================
// SCROLL REVEAL — Staggered card animations
// =============================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.jarvis-card, .skill-card, .project-card, .timeline-item, .stat-box, .edu-card, .interest-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
