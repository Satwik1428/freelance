const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});
const ham   = document.getElementById('hamburger');
const mMenu = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
  mMenu.classList.toggle('open');
});

function scrollTo(id) {
  mMenu.classList.remove('open');
  const el = document.getElementById(id);
  if (el) {
    const offset = 80; // navbar height
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─── SCROLL REVEAL ANIMATIONS ───────────────────── */
const reveals  = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ─── STAGGER CARD ANIMATIONS ────────────────────── */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.review-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

/* ─── SET MIN DATE ON DATE INPUT ─────────────────── */
const dateInput = document.getElementById('f-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/* ─── WHATSAPP BOOKING FORM ──────────────────────── */
function submitForm() {
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const date    = document.getElementById('f-date').value;
  const time    = document.getElementById('f-time').value;
  const service = document.getElementById('f-service').value;
  const msg     = document.getElementById('f-msg').value.trim();

  // Validation
  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  if (phone.length < 10 || !/^[0-9]+$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  // Format date nicely
  let dateStr = 'Not specified';
  if (date) {
    const d      = new Date(date + 'T00:00:00');
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    dateStr      = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  // Format time nicely  (e.g. "10:30 AM")
  let timeStr = 'Not specified';
  if (time) {
    const parts = time.split(':');
    const hr    = parseInt(parts[0]);
    timeStr     = (hr > 12 ? hr - 12 : hr || 12) + ':' + parts[1] + ' ' + (hr >= 12 ? 'PM' : 'AM');
  }

  // Build WhatsApp message
  const waText = encodeURIComponent(
    '\uD83E\uDDB7 *New Appointment Request*\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
    '*Name:* '      + name                    + '\n' +
    '*Phone:* '     + phone                   + '\n' +
    '*Date:* '      + dateStr                 + '\n' +
    '*Time:* '      + timeStr                 + '\n' +
    '*Treatment:* ' + (service || 'Not specified') + '\n' +
    '*Message:* '   + (msg     || 'None')     + '\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
    '_Sent from Hayat Dental Clinic website_'
  );

  // Update button state
  const btn     = document.querySelector('.btn-submit');
  btn.textContent = 'Opening WhatsApp...';
  btn.disabled  = true;

  // Open WhatsApp
  window.open('https://wa.me/919505060689?text=' + waText, '_blank');

  // Show success + reset form after short delay
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    ['f-name', 'f-phone', 'f-date', 'f-time', 'f-service', 'f-msg'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }, 800);
}