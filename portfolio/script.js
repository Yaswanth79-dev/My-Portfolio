/* ================================================
   script.js — Portfolio Interactions & Animations
   Paridala Yaswanth Kumar
================================================ */

/* --------------------------------
   CUSTOM CURSOR
-------------------------------- */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Smooth lagging ring follow
function animateCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Grow cursor on hoverable elements
document.querySelectorAll('a, button, .skill-badge, .project-card, .cert-card, .stat-card, .contact-link, .tl-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width       = '20px';
    cursor.style.height      = '20px';
    cursorRing.style.width   = '60px';
    cursorRing.style.height  = '60px';
    cursorRing.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width       = '12px';
    cursor.style.height      = '12px';
    cursorRing.style.width   = '40px';
    cursorRing.style.height  = '40px';
    cursorRing.style.opacity = '0.5';
  });
});

/* --------------------------------
   NAVBAR: SCROLL SHADOW + ACTIVE LINKS
-------------------------------- */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Add shadow when scrolled
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Highlight active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* --------------------------------
   MOBILE MENU TOGGLE
-------------------------------- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity   = '';
  });
}

/* --------------------------------
   SCROLL REVEAL ANIMATIONS
-------------------------------- */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* --------------------------------
   ANIMATED COUNTERS
-------------------------------- */
function animateCount(el, target, isDecimal) {
  let startTime = null;
  const duration = 1600;

  const step = timestamp => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    el.textContent = isDecimal
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : target;
    }
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (el.dataset.count) {
        animateCount(el, parseInt(el.dataset.count), false);
        counterObserver.unobserve(el);
      }
      if (el.dataset.countDecimal) {
        animateCount(el, parseFloat(el.dataset.countDecimal), true);
        counterObserver.unobserve(el);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count], [data-count-decimal]').forEach(el => {
  counterObserver.observe(el);
});

/* --------------------------------
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
-------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetEl = document.querySelector(link.getAttribute('href'));
    if (targetEl) {
      e.preventDefault();
      window.scrollTo({ top: targetEl.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* --------------------------------
   PAGE FADE-IN ON LOAD
   + Trigger hero reveals immediately
-------------------------------- */
document.body.style.opacity    = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  // Trigger hero section reveals right away (no scroll needed)
  setTimeout(() => {
    document.querySelectorAll('#home .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 200);
});
