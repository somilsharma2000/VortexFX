/* ============================================
   FORTREX — DEEP SPACE THEME JS
   Auto-injects star fields, nebula, glow orbs on ALL pages
   Scroll-triggered particle burst effects
   ============================================ */

// Generate twinkling stars
function generateStars(count = 30) {
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
    document.body.appendChild(star);
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

// Inject full-page space background
function injectSpaceBackground() {
  // Star layers (always inject — covers ENTIRE page)
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

  // Nebula clouds (always inject — covers ENTIRE page)
  if (!document.querySelector('.nebula')) {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.innerHTML = `
      <div class="nebula-cloud nebula-1"></div>
      <div class="nebula-cloud nebula-2"></div>
      <div class="nebula-cloud nebula-3"></div>
      <div class="nebula-cloud nebula-4"></div>
      <div class="nebula-cloud nebula-5"></div>
    `;
    document.body.prepend(nebula);
  }

  // Vortex swirl in hero sections only
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

// ===== SCROLL-TRIGGERED PARTICLE BURSTS =====
let lastBurstSection = null;
function initScrollParticleBursts() {
  const sections = document.querySelectorAll('section, .section, [data-burst]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target !== lastBurstSection) {
        lastBurstSection = entry.target;
        triggerParticleBurst(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

function triggerParticleBurst(container) {
  const rect = container.getBoundingClientRect();
  const colors = ['#8B5CF6', '#06B6D4', '#EC4899', '#A78BFA', '#22D3EE'];
  const burstCount = 12;

  for (let i = 0; i < burstCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px; height: 4px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 5;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + 100}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow: 0 0 8px currentColor;
      opacity: 1;
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.5;
    const distance = 80 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${dx}px, ${dy}px)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => particle.remove(), 1300);
  }
}

// ===== SCROLL-LINKED NEBULA INTENSITY =====
function initScrollNebulaIntensity() {
  const nebula = document.querySelector('.nebula');
  if (!nebula) return;

  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      const clouds = nebula.querySelectorAll('.nebula-cloud');
      clouds.forEach((cloud, i) => {
        const offset = (scrollPercent * (i + 1) * 50) % 100;
        cloud.style.transform = `translateY(${offset}px)`;
      });
      raf = null;
    });
  }, { passive: true });
}

// ===== PARALLAX STAR LAYERS =====
let starParallaxRAF = null;
function initStarParallax() {
  window.addEventListener('scroll', () => {
    if (starParallaxRAF) return;
    starParallaxRAF = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const l1 = document.querySelector('.stars-layer-1');
      const l2 = document.querySelector('.stars-layer-2');
      const l3 = document.querySelector('.stars-layer-3');
      if (l1) l1.style.transform = `translateY(${scrollY * 0.1}px)`;
      if (l2) l2.style.transform = `translateY(${scrollY * 0.05}px)`;
      if (l3) l3.style.transform = `translateY(${scrollY * 0.02}px)`;
      starParallaxRAF = null;
    });
  }, { passive: true });
}

// ===== INIT EVERYTHING =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectSpaceBackground();
    initScrollParticleBursts();
    initScrollNebulaIntensity();
    initStarParallax();
  });
} else {
  injectSpaceBackground();
  initScrollParticleBursts();
  initScrollNebulaIntensity();
  initStarParallax();
}
