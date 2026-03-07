// ── Lightbox ──
(function() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" id="lbClose" aria-label="Close">&#x2715;</button>
    <div class="lightbox-inner">
      <button class="lightbox-btn" id="lbPrev" aria-label="Previous">&#8592;</button>
      <div class="lightbox-img-wrap" id="lbImgWrap">
        <img id="lbImg" src="" alt=""/>
      </div>
      <button class="lightbox-btn" id="lbNext" aria-label="Next">&#8594;</button>
    </div>
    <div class="lightbox-counter" id="lbCounter"></div>
  `;
  document.body.appendChild(overlay);

  let items = [];
  let current = 0;

  function openLightbox(gallery, index) {
    items = Array.from(gallery.querySelectorAll('.gallery-item img'));
    current = index;
    showImage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showImage() {
    const img = document.getElementById('lbImg');
    const wrap = document.getElementById('lbImgWrap');
    wrap.style.animation = 'none';
    wrap.offsetHeight;
    wrap.style.animation = '';
    img.src = items[current].src;
    img.alt = items[current].alt;
    document.getElementById('lbCounter').textContent = (current + 1) + ' / ' + items.length;
    document.getElementById('lbPrev').disabled = current === 0;
    document.getElementById('lbNext').disabled = current === items.length - 1;
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    if (current > 0) { current--; showImage(); }
  });
  document.getElementById('lbNext').addEventListener('click', (e) => {
    e.stopPropagation();
    if (current < items.length - 1) { current++; showImage(); }
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && current > 0) { current--; showImage(); }
    if (e.key === 'ArrowRight' && current < items.length - 1) { current++; showImage(); }
  });

  document.querySelectorAll('.gallery-grid').forEach(gallery => {
    gallery.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(gallery, index));
    });
  });
})();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  if (!document.querySelector('.hero')) {
    navbar.classList.add('scrolled');
  }
}

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Scroll-triggered animations ──
const animEls = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});
