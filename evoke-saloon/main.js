/* ══════════════════════════════════════════
   EVOKE HAIR & BEAUTY SALON — main.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor    = document.getElementById('cursor');
  const ring      = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '48px'; ring.style.height = '48px'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '32px'; ring.style.height = '32px'; });
  });


  /* ── STICKY HEADER ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });


  /* ── MOBILE NAV ── */
  const mobileNav = document.getElementById('mobileNav');

  document.getElementById('hamburger').addEventListener('click', () => {
    mobileNav.classList.add('open');
  });

  document.getElementById('mobileClose').addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });


  /* ── SMOOTH SCROLL (all anchor links) ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        mobileNav.classList.remove('open');   // close nav if open
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── SCROLL REVEAL ── */
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

});