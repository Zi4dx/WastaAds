// WASTA — lightweight interactions
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Subtle 3D tilt for desktop package cards
if (window.matchMedia('(min-width: 900px)').matches) {
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg) translateY(-8px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

// Package buttons open WhatsApp with the selected package.
const whatsappNumber = '218928512617';
document.querySelectorAll('[data-package]').forEach(btn => {
  btn.addEventListener('click', () => {
    const pkg = btn.dataset.package;
    const message = `السلام عليكم، أريد الاستفسار عن باقة ${pkg}.`;
    btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    btn.target = '_blank';
    btn.rel = 'noopener';
  });
});
