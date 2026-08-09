/* ============================================
   FORTEX FX — Morphing Particle Constellation
   Tiny outlined triangles that reform into
   different organic shapes on scroll
   ============================================ */

class MorphingConstellation {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.options = {
      particleCount: options.particleCount || 150,
      ambientCount: options.ambientCount || 50,
      colors: options.colors || ['#8052ff', '#ffb829', '#15846e', '#ffffff', '#a78bfa', '#22d3ee', '#ec4899', '#6366f1'],
      triangleSize: options.triangleSize || 1.8,
      connectionDist: options.connectionDist || 70,
      ...options
    };
    
    this.particles = [];
    this.ambient = [];
    this.shapes = {};
    this.currentShape = 'brain';
    this.targetShape = 'brain';
    this.morphProgress = 1; // 0 = transitioning, 1 = settled
    this.scrollProgress = 0;
    this.mouse = { x: -1000, y: -1000 };
    this.rafId = null;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.generateShapes();
    this.createParticles();
    this.createAmbient();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.cx = this.w / 2;
    this.cy = this.h / 2;
  }
  
  // ===== SHAPE GENERATORS =====
  // Each shape returns an array of {x, y} target positions for particles
  
  generateShapes() {
    const count = this.options.particleCount;
    
    // 1. BRAIN / CLOUD — organic blobby shape (hero)
    this.shapes.brain = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const layer = Math.floor(i / (count / 3));
      const baseR = 120 + layer * 40;
      const noise = Math.sin(t * 3) * 30 + Math.cos(t * 5) * 20 + (Math.random() - 0.5) * 40;
      const r = baseR + noise;
      this.shapes.brain.push({
        x: this.cx + Math.cos(t) * r * 1.1,
        y: this.cy + Math.sin(t) * r * 0.75
      });
    }
    
    // 2. FORTRESS / HEX — hexagonal fortress formation
    this.shapes.fortress = [];
    const sides = 6;
    for (let i = 0; i < count; i++) {
      const ringIdx = Math.floor(i / (count / 4));
      const ringRadius = 80 + ringIdx * 50;
      const angleOffset = ringIdx * 0.3;
      const angle = (i / count) * Math.PI * 2 + angleOffset;
      const hexAngle = Math.round(angle / (Math.PI * 2 / sides)) * (Math.PI * 2 / sides);
      const noise = (Math.random() - 0.5) * 25;
      this.shapes.fortress.push({
        x: this.cx + Math.cos(angle) * (ringRadius + noise) * 0.9,
        y: this.cy + Math.sin(angle) * (ringRadius + noise) * 0.8
      });
    }
    
    // 3. SPIRAL / GALAXY — swirling arms
    this.shapes.spiral = [];
    const arms = 3;
    for (let i = 0; i < count; i++) {
      const armIdx = i % arms;
      const t = (i / count) * Math.PI * 6;
      const r = 20 + (i / count) * 200;
      const angle = t + (armIdx * Math.PI * 2 / arms);
      const noise = (Math.random() - 0.5) * 30;
      this.shapes.spiral.push({
        x: this.cx + Math.cos(angle) * (r + noise),
        y: this.cy + Math.sin(angle) * (r + noise) * 0.7
      });
    }
    
    // 4. WAVE — flowing sine wave
    this.shapes.wave = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const x = (i / count) * this.w * 0.8 + this.w * 0.1;
      const y = this.cy + Math.sin(t) * 80 + Math.sin(t * 2) * 30 + (Math.random() - 0.5) * 40;
      this.shapes.wave.push({ x, y });
    }
    
    // 5. SPHERE / ORBIT — circular cluster
    this.shapes.sphere = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * (i / count) - 1);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 140;
      this.shapes.sphere.push({
        x: this.cx + Math.sin(phi) * Math.cos(theta) * r * 1.2,
        y: this.cy + Math.sin(phi) * Math.sin(theta) * r * 0.8
      });
    }
    
    // 6. DIAMOND / CRYSTAL — geometric diamond
    this.shapes.diamond = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const layer = Math.floor(i / (count / 4));
      const r = 60 + layer * 35;
      // Diamond shape: |x/a| + |y/b| = 1
      const angle = t;
      const diamondR = r / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)) + 0.3);
      const noise = (Math.random() - 0.5) * 20;
      this.shapes.diamond.push({
        x: this.cx + Math.cos(angle) * (diamondR + noise),
        y: this.cy + Math.sin(angle) * (diamondR + noise) * 0.85
      });
    }
    
    // 7. SCATTERED — dispersed across full viewport (for sections between shapes)
    this.shapes.scattered = [];
    for (let i = 0; i < count; i++) {
      this.shapes.scattered.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h
      });
    }
  }
  
  createParticles() {
    const { particleCount, colors, triangleSize } = this.options;
    const initialShape = this.shapes[this.currentShape] || this.shapes.brain;
    
    for (let i = 0; i < particleCount; i++) {
      const target = initialShape[i] || { x: this.cx, y: this.cy };
      this.particles.push({
        x: target.x + (Math.random() - 0.5) * 100,
        y: target.y + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        targetX: target.x,
        targetY: target.y,
        size: triangleSize + Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        opacity: 0.3 + Math.random() * 0.5,
        filled: Math.random() > 0.75,
        index: i
      });
    }
  }
  
  createAmbient() {
    const { ambientCount, colors } = this.options;
    for (let i = 0; i < ambientCount; i++) {
      this.ambient.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: 0.8 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        opacity: 0.04 + Math.random() * 0.12
      });
    }
  }
  
  // ===== MORPH TO NEW SHAPE =====
  morphTo(shapeName) {
    if (shapeName === this.targetShape) return;
    this.currentShape = this.targetShape;
    this.targetShape = shapeName;
    this.morphProgress = 0;
    
    // Set new targets
    const newShape = this.shapes[shapeName] || this.shapes.scattered;
    this.particles.forEach((p, i) => {
      p.fromX = p.x;
      p.fromY = p.y;
      const target = newShape[i] || { x: this.cx, y: this.cy };
      p.targetX = target.x;
      p.targetY = target.y;
    });
  }
  
  // Smooth morph with easing
  updateMorph() {
    if (this.morphProgress < 1) {
      this.morphProgress += 0.012; // ~1.5s transition
      if (this.morphProgress > 1) this.morphProgress = 1;
      const t = this.easeInOutCubic(this.morphProgress);
      this.particles.forEach(p => {
        if (p.fromX !== undefined) {
          p.x = p.fromX + (p.targetX - p.fromX) * t;
          p.y = p.fromY + (p.targetY - p.fromY) * t;
        }
      });
    }
  }
  
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  // ===== DRAW TRIANGLE =====
  drawTriangle(x, y, size, rotation, color, opacity, filled) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.globalAlpha = opacity;
    
    const s = Math.max(0.5, size);
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, -s);
    this.ctx.lineTo(s * 0.866, s * 0.5);
    this.ctx.lineTo(-s * 0.866, s * 0.5);
    this.ctx.closePath();
    
    if (filled) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();
    }
    
    // Subtle glow on brighter particles
    if (opacity > 0.5) {
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = color;
      if (filled) this.ctx.fill();
      else this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }
    
    this.ctx.restore();
  }
  
  // ===== CONNECTION LINES =====
  drawConnections() {
    const { connectionDist } = this.options;
    const maxLines = 80; // performance limit
    let lines = 0;
    
    this.ctx.strokeStyle = 'rgba(128, 82, 255, 0.06)';
    this.ctx.lineWidth = 0.4;
    
    for (let i = 0; i < this.particles.length && lines < maxLines; i++) {
      for (let j = i + 1; j < this.particles.length && lines < maxLines; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < connectionDist * connectionDist) {
          const dist = Math.sqrt(distSq);
          this.ctx.globalAlpha = (1 - dist / connectionDist) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          lines++;
        }
      }
    }
    this.ctx.globalAlpha = 1;
  }
  
  // ===== ANIMATE =====
  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.w, this.h);
    
    // Update morph
    this.updateMorph();
    
    // Draw ambient particles (background layer)
    this.ambient.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      
      // Wrap around viewport
      if (p.x < -10) p.x = this.w + 10;
      if (p.x > this.w + 10) p.x = -10;
      if (p.y < -10) p.y = this.h + 10;
      if (p.y > this.h + 10) p.y = -10;
      
      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, false);
    });
    
    // Draw connection lines
    this.drawConnections();
    
    // Draw main constellation particles
    this.particles.forEach(p => {
      // Gentle drift when settled
      if (this.morphProgress >= 1) {
        // Small organic wobble around target
        const wobbleX = Math.sin(performance.now() * 0.0005 + p.index) * 3;
        const wobbleY = Math.cos(performance.now() * 0.0004 + p.index) * 3;
        p.x += (p.targetX + wobbleX - p.x) * 0.02;
        p.y += (p.targetY + wobbleY - p.y) * 0.02;
      }
      
      // Rotation
      p.rotation += p.rotSpeed;
      
      // Mouse repulsion
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 100 && mdist > 0) {
        const force = (1 - mdist / 100) * 2;
        p.x += (mdx / mdist) * force;
        p.y += (mdy / mdist) * force;
      }
      
      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, p.filled);
    });
    
    this.rafId = requestAnimationFrame(() => this.animate());
  }
  
  // ===== SCROLL-LINKED SHAPE DETECTION =====
  bindScrollShapeDetection() {
    // Map sections to shape names
    const shapeMap = {
      'brain': 'brain',      // hero / default
      'fortress': 'fortress', // arena
      'spiral': 'spiral',     // tournaments
      'wave': 'wave',         // rex ai
      'sphere': 'sphere',     // community
      'diamond': 'diamond',   // stats / cta
      'scattered': 'scattered' // fallback
    };
    
    // Find all sections with data-shape attribute
    const sections = document.querySelectorAll('[data-shape]');
    if (!sections.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const shape = entry.target.dataset.shape;
          if (shape && shapeMap[shape]) {
            this.morphTo(shapeMap[shape]);
          }
        }
      });
    }, { threshold: [0.3, 0.5, 0.7] });
    
    sections.forEach(s => observer.observe(s));
  }
  
  // ===== EVENTS =====
  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.generateShapes();
        // Reassign targets without morphing
        const shape = this.shapes[this.targetShape] || this.shapes.brain;
        this.particles.forEach((p, i) => {
          const target = shape[i] || { x: this.cx, y: this.cy };
          p.targetX = target.x;
          p.targetY = target.y;
        });
      }, 200);
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
    
    this.bindScrollShapeDetection();
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
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

// ===== COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = performance.now();
        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * eased);
          el.textContent = prefix + value.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
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
      remaining.textContent = left > 0 
        ? `${left.toLocaleString()} traders needed to unlock free tournaments` 
        : 'TARGET REACHED — ALL TOURNAMENTS UNLOCKED';
    }
    // Update lock overlays
    document.querySelectorAll('.lock-overlay-bar-fill').forEach(fill => {
      fill.style.width = (regCount / REG_TARGET * 100) + '%';
    });
    document.querySelectorAll('.lock-overlay-count').forEach(count => {
      count.textContent = `${regCount.toLocaleString()} / 10,000`;
    });
  }
  
  render();
  
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

// ===== COUNTDOWN TIMER =====
function initCountdown(elementId, targetDate) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  function update() {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;
    
    if (diff <= 0) {
      el.textContent = '00:00:00:00';
      return;
    }
    
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    
    el.textContent = `${String(days).padStart(2,'0')}:${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  }
  
  update();
  setInterval(update, 1000);
}

// ===== ADMIN CLOCK =====
function initAdminClock(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  function update() {
    const now = new Date();
    const options = { 
      month: 'short', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };
    el.textContent = now.toLocaleString('en-US', options) + ' IST';
  }
  
  update();
  setInterval(update, 1000);
}

// ===== INIT ALL =====
let constellation = null;

function initFortexFX() {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initCounters();
  initLockedTournaments();
  initAccordion();
  
  const counter = document.getElementById('reg-counter');
  if (counter) initRegCounter('reg-counter');
  
  // Initialize morphing constellation
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    constellation = new MorphingConstellation('particle-canvas', {
      particleCount: 150,
      ambientCount: 50,
      triangleSize: 1.8,
      connectionDist: 70
    });
  }
  
  // Initialize countdowns
  document.querySelectorAll('[data-countdown]').forEach(el => {
    initCountdown(el.id, el.dataset.countdown);
  });
  
  // Initialize admin clock
  const clock = document.getElementById('admin-clock');
  if (clock) initAdminClock('admin-clock');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFortexFX);
} else {
  initFortexFX();
}
