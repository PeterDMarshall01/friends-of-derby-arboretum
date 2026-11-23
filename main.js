// Content is only hidden for the fade-in once we know this script is running
document.documentElement.classList.add('js');

// ── Lightbox ──
(function() {
  // Event pages ship their own lightbox using the same element IDs; running
  // this one as well made both open at once on MayFest.
  if (document.getElementById('lbImg')) return;
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
  document.getElementById('lbPrev').addEventListener('click', function(e) {
    e.stopPropagation();
    if (current > 0) { current--; showImage(); }
  });
  document.getElementById('lbNext').addEventListener('click', function(e) {
    e.stopPropagation();
    if (current < items.length - 1) { current++; showImage(); }
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && current > 0) { current--; showImage(); }
    if (e.key === 'ArrowRight' && current < items.length - 1) { current++; showImage(); }
  });

  // Use event delegation so clicks work regardless of animation state
  document.addEventListener('click', function(e) {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const gallery = item.closest('.gallery-grid');
    if (!gallery) return;
    const allItems = Array.from(gallery.querySelectorAll('.gallery-item'));
    const index = allItems.indexOf(item);
    openLightbox(gallery, index);
  });
})();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function() {
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
  navToggle.addEventListener('click', function() {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ── Scroll-triggered animations ──
// Reveal as soon as any part of a block enters view. A percentage threshold
// left tall blocks (e.g. on phones) permanently invisible as blank space.
const animEls = document.querySelectorAll('.animate-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0 });
  animEls.forEach(function(el) { observer.observe(el); });
} else {
  animEls.forEach(function(el) { el.classList.add('visible'); });
}
// Printing and full-page captures never scroll, so show everything
window.addEventListener('beforeprint', function() {
  animEls.forEach(function(el) { el.classList.add('visible'); });
});
