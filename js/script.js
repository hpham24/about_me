/* script.js — ICS 499 About Me */

// ── Scroll-reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // stagger children if present
        entry.target.querySelectorAll('.reveal-child').forEach((child, i) => {
          child.style.transitionDelay = `${i * 80}ms`;
          child.classList.add('visible');
        });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Active nav link on scroll ─────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));

// Style for active nav link (injected once)
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: var(--teal); background: var(--teal-dim); }';
document.head.appendChild(style);

// ── Current year in footer ────────────────────────────────────
const yrEl = document.getElementById('year');
if (yrEl) yrEl.textContent = new Date().getFullYear();
