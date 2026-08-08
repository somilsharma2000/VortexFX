/* ============================================
   VORTEX FX — SPACE THEME JS UPGRADES
   Star field, nebula, vortex, avatar rings
   ============================================ */

// Generate twinkling stars dynamically
function generateStars(count = 30) {
  const container = document.querySelector('.starfield') || document.body;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'twinkle';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    const size = 1 + Math.random() * 3;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    container.appendChild(star);
  }
}

// Generate floating glow orbs
function generateGlowOrbs(count = 8) {
  for (let i = 0; i < count; i++) {
    const orb = document.createElement('div');
    orb.className = 'glow-orb';
    orb.style.top = Math.random() * 100 + '%';
    orb.style.left = Math.random() * 100 + '%';
    orb.style.animationDelay = Math.random() * 8 + 's';
    orb.style.animationDuration = (6 + Math.random() * 6) + 's';
    const colors = ['#22D3EE', '#A78BFA', '#EC4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    orb.style.background = color;
    orb.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    document.body.appendChild(orb);
  }
}

// Inject space background layers into a page
function injectSpaceBackground() {
  // Star layers
  if (!document.querySelector('.stars-layer-1')) {
    const l1 = document.createElement('div');
    l1.className = 'stars-layer-1';
    document.body.prepend(l1);
  }
  if (!document.querySelector('.stars-layer-2')) {
    const l2 = document.createElement('div');
    l2.className = 'stars-layer-2';
    document.body.prepend(l2);
  }
  if (!document.querySelector('.stars-layer-3')) {
    const l3 = document.createElement('div');
    l3.className = 'stars-layer-3';
    document.body.prepend(l3);
  }

  // Nebula clouds
  if (!document.querySelector('.nebula')) {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.innerHTML = `
      <div class="nebula-cloud nebula-1"></div>
      <div class="nebula-cloud nebula-2"></div>
      <div class="nebula-cloud nebula-3"></div>
      <div class="nebula-cloud nebula-4"></div>
    `;
    document.body.prepend(nebula);
  }

  // Vortex background (only on hero sections)
  const heroes = document.querySelectorAll('.hero, .hero-section, [data-vortex]');
  heroes.forEach(hero => {
    if (!hero.querySelector('.vortex-bg')) {
      const vortex = document.createElement('div');
      vortex.className = 'vortex-bg';
      hero.prepend(vortex);
    }
  });

  // Twinkling stars
  if (!document.querySelector('.twinkle')) {
    generateStars(25);
  }

  // Floating glow orbs
  if (!document.querySelector('.glow-orb')) {
    generateGlowOrbs(6);
  }

  // Scroll indicator on pages with hero
  if (document.querySelector('.hero, .hero-section') && !document.querySelector('.scroll-indicator')) {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <span class="scroll-indicator-text">Scroll to Explore</span>
      <div class="scroll-indicator-line"></div>
    `;
    document.body.appendChild(indicator);
    // Fade out after first scroll
    let faded = false;
    window.addEventListener('scroll', () => {
      if (!faded && window.scrollY > 100) {
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.5s';
        faded = true;
      }
    }, { passive: true });
  }
}

// Initialize space background on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectSpaceBackground);
} else {
  injectSpaceBackground();
}

// Parallax for star layers on scroll
let parallaxRAF = null;
window.addEventListener('scroll', () => {
  if (parallaxRAF) return;
  parallaxRAF = requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    const l1 = document.querySelector('.stars-layer-1');
    const l2 = document.querySelector('.stars-layer-2');
    const l3 = document.querySelector('.stars-layer-3');
    if (l1) l1.style.transform = `translateY(${scrollY * 0.1}px)`;
    if (l2) l2.style.transform = `translateY(${scrollY * 0.05}px)`;
    if (l3) l3.style.transform = `translateY(${scrollY * 0.02}px)`;
    parallaxRAF = null;
  });
}, { passive: true });
