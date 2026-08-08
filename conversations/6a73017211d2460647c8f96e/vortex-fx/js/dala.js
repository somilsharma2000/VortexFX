/* ============================================
   FORTEX FX — Particle Constellation System
   Tiny triangular glyphs forming organic shapes
   Ambient scattered particles across background
   ============================================ */

class ParticleField {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ambient = [];
    this.mouse = { x: -1000, y: -1000 };
    this.options = {
      particleCount: options.particleCount || 120,
      ambientCount: options.ambientCount || 40,
      shape: options.shape || 'cloud', // 'cloud', 'fortress', 'hex'
      colors: options.colors || ['#8052ff', '#ffb829', '#15846e', '#ffffff', '#a78bfa', '#22d3ee', '#ec4899'],
      triangleSize: options.triangleSize || 2,
      driftSpeed: options.driftSpeed || 0.3,
      ...options
    };
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.createAmbient();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
  }

  createParticles() {
    const { shape, particleCount, colors } = this.options;
    for (let i = 0; i < particleCount; i++) {
      let x, y;
      if (shape === 'fortress') {
        // Hexagonal fortress shape
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 150 + Math.random() * 120;
        const noise = (Math.random() - 0.5) * 60;
        x = this.cx + Math.cos(angle) * (radius + noise);
        y = this.cy + Math.sin(angle) * (radius + noise);
      } else if (shape === 'hex') {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 100 + Math.random() * 80;
        x = this.cx + Math.cos(angle) * radius;
        y = this.cy + Math.sin(angle) * radius * 0.7;
      } else {
        // Organic cloud / brain shape
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 200;
        const stretch = 1 + Math.sin(angle * 3) * 0.3;
        x = this.cx + Math.cos(angle) * radius * stretch;
        y = this.cy + Math.sin(angle) * radius * 0.8;
      }

      this.particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: this.options.triangleSize + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.3 + Math.random() * 0.7,
        filled: Math.random() > 0.7
      });
    }
  }

  createAmbient() {
    const { ambientCount, colors } = this.options;
    for (let i = 0; i < ambientCount; i++) {
      this.ambient.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.05 + Math.random() * 0.15
      });
    }
  }

  drawTriangle(x, y, size, rotation, color, opacity, filled) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.globalAlpha = opacity;

    if (filled) {
      this.ctx.fillStyle = color;
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(0, -size);
    this.ctx.lineTo(size * 0.866, size * 0.5);
    this.ctx.lineTo(-size * 0.866, size * 0.5);
    this.ctx.closePath();

    if (filled) {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }

    // Glow
    if (opacity > 0.5) {
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = color;
      if (filled) this.ctx.fill();
      else this.ctx.stroke();
    }

    this.ctx.restore();
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections (subtle)
    this.ctx.strokeStyle = 'rgba(128, 82, 255, 0.04)';
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          this.ctx.globalAlpha = (1 - dist / 80) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
    this.ctx.globalAlpha = 1;

    // Draw ambient particles
    this.ambient.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, false);
    });

    // Draw main constellation particles
    this.particles.forEach(p => {
      // Drift around base position
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      // Pull back toward base
      p.vx += (p.baseX - p.x) * 0.001;
      p.vy += (p.baseY - p.y) * 0.001;

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Mouse repulsion
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 120) {
        const force = (1 - mdist / 120) * 0.5;
        p.x += (mdx / mdist) * force;
        p.y += (mdy / mdist) * force;
      }

      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, p.filled);
    });

    requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.ambient = [];
      this.createParticles();
      this.createAmbient();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ===== NAV SCROLL =====
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ===== COUNTER =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        if (isNaN(target)) return;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0');
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
          el.textContent = prefix + formatted + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

// ===== COUNTDOWN =====
function initCountdowns() {
  const countdowns = document.querySelectorAll('[data-countdown]');
  countdowns.forEach(el => {
    let targetSeconds = parseInt(el.dataset.countdown, 10) || 172800; // default 2 days
    function updateCountdown() {
      if (targetSeconds <= 0) {
        el.textContent = '00d : 00h : 00m : 00s';
        return;
      }
      const days = Math.floor(targetSeconds / 86400);
      const hours = Math.floor((targetSeconds % 86400) / 3600);
      const mins = Math.floor((targetSeconds % 3600) / 60);
      const secs = targetSeconds % 60;
      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(mins).padStart(2, '0');
      const sStr = String(secs).padStart(2, '0');
      el.textContent = `${dStr}d : ${hStr}h : ${mStr}m : ${sStr}s`;
      targetSeconds--;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
}

// ===== REGISTRATION COUNTER =====
const REG_TARGET = 10000;
let regCount = 3742;

function initRegCounter(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function render() {
    const padded = regCount.toString().padStart(5, '0');
    const digits = el.querySelector('.reg-counter-numbers');
    if (digits) {
      digits.innerHTML = padded.split('').map(d => `<span class="reg-digit">${d}</span>`).join('');
    }
    const bar = el.querySelector('.reg-counter-bar-fill');
    if (bar) bar.style.width = (regCount / REG_TARGET * 100) + '%';
    const remaining = el.querySelector('.reg-counter-remaining');
    if (remaining) {
      const left = REG_TARGET - regCount;
      remaining.textContent = left > 0 ? `${left.toLocaleString()} traders needed to unlock free tournaments` : 'TARGET REACHED — ALL TOURNAMENTS UNLOCKED';
    }
  }

  render();

  // Simulate live registrations
  function tick() {
    const inc = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
    if (inc > 0 && regCount < REG_TARGET) {
      regCount = Math.min(regCount + inc, REG_TARGET);
      render();
      if (regCount >= REG_TARGET) {
        document.querySelectorAll('.locked').forEach(el => {
          el.classList.remove('locked');
          const overlay = el.querySelector('.lock-overlay');
          if (overlay) overlay.style.display = 'none';
          const content = el.querySelector('.locked-content');
          if (content) {
            content.style.filter = 'none';
            content.style.opacity = '1';
            content.style.pointerEvents = 'auto';
          }
        });
      }
    }
    setTimeout(tick, 2000 + Math.random() * 4000);
  }
  setTimeout(tick, 3000);
}

// ===== LOCKED TOURNAMENTS =====
function initLockedTournaments() {
  if (regCount < REG_TARGET) {
    document.querySelectorAll('[data-tournament="free"]').forEach(card => {
      if (!card.classList.contains('locked')) {
        card.classList.add('locked');
        const content = card.querySelector('.float-item, .tournament-content, div');
        if (content && !card.querySelector('.locked-content')) {
          content.classList.add('locked-content');
        }
        if (!card.querySelector('.lock-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'lock-overlay';
          overlay.innerHTML = `
            <div class="lock-overlay-label">Locked</div>
            <div class="lock-overlay-text">Unlocks when we reach 10,000 registered traders</div>
            <div class="lock-overlay-bar"><div class="lock-overlay-bar-fill" style="width: ${regCount/REG_TARGET*100}%"></div></div>
            <div class="lock-overlay-count">${regCount.toLocaleString()} / 10,000</div>
          `;
          card.appendChild(overlay);
        }
      }
    });
  }
}

// ===== FAQ ACCORDION =====
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });
}

// ===== INIT ALL =====
function initAll() {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initCounters();
  initCountdowns();
  initLockedTournaments();
  initAccordion();
  const counter = document.getElementById('reg-counter');
  if (counter) initRegCounter('reg-counter');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
