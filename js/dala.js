/* ============================================
   FORTREX — NEBULA GALAXY PARTICLE SYSTEM
   450+ particles forming a massive galaxy that
   morphs through 20 trading-themed shapes on
   every scroll. Touch/cursor reactive, fills
   the entire viewport with a living nebula.
   ============================================ */

class MorphingConstellation {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.options = {
      particleCount: options.particleCount || 450,
      ambientCount: options.ambientCount || 180,
      colors: options.colors || [
        '#D4AF37', '#ffb829', '#15846e', '#ffffff',
        '#a78bfa', '#22d3ee', '#ec4899', '#6366f1',
        '#fbbf24', '#34d399', '#f472b6', '#60a5fa',
        '#c084fc', '#fb923c', '#2dd4bf', '#e879f9'
      ],
      triangleSize: options.triangleSize || 1.5,
      connectionDist: options.connectionDist || 55,
      mouseRadius: options.mouseRadius || 160,
      mouseForce: options.mouseForce || 3.5,
      ...options
    };
    
    this.particles = [];
    this.ambient = [];
    this.shapes = {};
    this.currentShape = 'galaxy';
    this.targetShape = 'galaxy';
    this.morphProgress = 1;
    this.mouse = { x: -1000, y: -1000, active: false };
    this.touches = [];
    this.rafId = null;
    this.lastScrollY = 0;
    this.scrollAccum = 0;
    this.shapeChangeThreshold = 80; // px of scroll per shape change
    
    this.shapeSequence = [
      'galaxy', 'candlestick', 'euro', 'pound', 'yen',
      'dollar', 'discord', 'metatrader', 'spiral',
      'gold', 'oil', 'bitcoin', 'ethereum',
      'fortress', 'rocket', 'trophy', 'wave',
      'sphere', 'diamond', 'brain', 'scattered'
    ];
    this.shapeIdx = 0;
    
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
  
  // ===== HELPERS =====
  lp(x1, y1, x2, y2, count) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    }
    return pts;
  }
  
  ap(cx, cy, r, a1, a2, count) {
    const pts = [];
    const safeR = Math.max(1, r);
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      const a = a1 + (a2 - a1) * t;
      pts.push({ x: cx + Math.cos(a) * safeR, y: cy + Math.sin(a) * safeR });
    }
    return pts;
  }
  
  cp(cx, cy, r, count) {
    return this.ap(cx, cy, r, 0, Math.PI * 2, count);
  }
  
  // ===== 21 SHAPES (galaxy is new hero) =====
  generateShapes() {
    const n = this.options.particleCount;
    const cx = this.cx, cy = this.cy;
    const sc = Math.min(this.w, this.h) * 0.004;
    const S = (v) => v * sc * 60;
    
    // 0. GALAXY / NEBULA — massive hero spiral (initial shape)
    this.shapes.galaxy = [];
    {
      const arms = 5;
      const armWidth = 0.4;
      for (let i = 0; i < n; i++) {
        const armIdx = i % arms;
        const progress = (i / n);
        const t = progress * Math.PI * 8;
        const r = S(0.2) + progress * S(5.5);
        const angle = t + (armIdx * Math.PI * 2 / arms);
        // Spread particles across arm width
        const spread = (Math.random() - 0.5) * S(0.8) * (1 + progress * 2);
        const perpAngle = angle + Math.PI / 2;
        const x = cx + Math.cos(angle) * r + Math.cos(perpAngle) * spread;
        const y = cy + Math.sin(angle) * r * 0.65 + Math.sin(perpAngle) * spread;
        this.shapes.galaxy.push({ x, y });
      }
      // Add dense core
      const coreCount = Math.floor(n * 0.15);
      for (let i = 0; i < coreCount; i++) {
        const r = Math.random() * S(0.8);
        const a = Math.random() * Math.PI * 2;
        this.shapes.galaxy.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.65 });
      }
    }
    
    // 1. BRAIN / CLOUD
    this.shapes.brain = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const layer = Math.floor(i / (n / 3));
      const baseR = S(2 + layer * 0.7);
      const noise = Math.sin(t * 3) * S(0.5) + Math.cos(t * 5) * S(0.35) + (Math.random() - 0.5) * S(0.7);
      const r = baseR + noise;
      this.shapes.brain.push({ x: cx + Math.cos(t) * r * 1.1, y: cy + Math.sin(t) * r * 0.75 });
    }
    
    // 2. CANDLESTICK
    this.shapes.candlestick = [];
    {
      const candleX = [-S(2.2), -S(0.8), S(0.6), S(2.0), S(3.4)];
      const bodies = [
        { top: -S(1.0), bot: S(0.4), wickTop: -S(1.6), wickBot: S(0.9) },
        { top: -S(0.4), bot: S(1.0), wickTop: -S(0.8), wickBot: S(1.5) },
        { top: -S(1.2), bot: -S(0.1), wickTop: -S(1.8), wickBot: S(0.3) },
        { top: -S(0.6), bot: S(0.8), wickTop: -S(1.1), wickBot: S(1.2) },
        { top: -S(0.9), bot: S(0.2), wickTop: -S(1.4), wickBot: S(0.6) }
      ];
      const per = Math.floor(n / 15);
      bodies.forEach((c, idx) => {
        if (idx >= candleX.length) return;
        const x = cx + candleX[idx];
        const bw = S(0.4);
        this.shapes.candlestick.push(...this.lp(x, cy + c.wickTop, x, cy + c.wickBot, per));
        this.shapes.candlestick.push(...this.lp(x - bw, cy + c.top, x - bw, cy + c.bot, per));
        this.shapes.candlestick.push(...this.lp(x + bw, cy + c.top, x + bw, cy + c.bot, per));
      });
      while (this.shapes.candlestick.length < n) this.shapes.candlestick.push({ x: cx + (Math.random() - 0.5) * S(8), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 3. EURO (€)
    this.shapes.euro = [];
    {
      const per = Math.floor(n / 5);
      this.shapes.euro.push(...this.ap(cx - S(0.3), cy, S(1.8), Math.PI * 0.3, Math.PI * 1.7, per * 2));
      this.shapes.euro.push(...this.lp(cx - S(1.5), cy - S(0.4), cx + S(1.0), cy - S(0.4), per));
      this.shapes.euro.push(...this.lp(cx - S(1.5), cy + S(0.4), cx + S(1.0), cy + S(0.4), per));
      while (this.shapes.euro.length < n) this.shapes.euro.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 4. POUND (£)
    this.shapes.pound = [];
    {
      const per = Math.floor(n / 6);
      this.shapes.pound.push(...this.lp(cx + S(0.1), cy - S(1.4), cx + S(0.1), cy + S(1.0), per));
      this.shapes.pound.push(...this.lp(cx - S(1.0), cy - S(0.3), cx + S(0.7), cy - S(0.3), per));
      this.shapes.pound.push(...this.ap(cx + S(0.1), cy - S(1.2), S(0.6), Math.PI * 0.5, Math.PI * 1.8, per));
      this.shapes.pound.push(...this.ap(cx - S(0.2), cy + S(0.7), S(0.5), 0, Math.PI * 1.2, per));
      while (this.shapes.pound.length < n) this.shapes.pound.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 5. YEN (¥)
    this.shapes.yen = [];
    {
      const per = Math.floor(n / 6);
      this.shapes.yen.push(...this.lp(cx - S(1.2), cy - S(1.2), cx, cy - S(0.1), per));
      this.shapes.yen.push(...this.lp(cx + S(1.2), cy - S(1.2), cx, cy - S(0.1), per));
      this.shapes.yen.push(...this.lp(cx, cy - S(0.1), cx, cy + S(1.4), per));
      this.shapes.yen.push(...this.lp(cx - S(0.9), cy + S(0.2), cx + S(0.9), cy + S(0.2), per));
      while (this.shapes.yen.length < n) this.shapes.yen.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 6. DOLLAR ($)
    this.shapes.dollar = [];
    {
      const per = Math.floor(n / 4);
      for (let i = 0; i < per * 2; i++) {
        const t = i / (per * 2 - 1);
        const angle = t * Math.PI * 2 - Math.PI / 2;
        const r = S(0.6);
        this.shapes.dollar.push({ x: cx + Math.sin(angle) * r, y: cy + (t - 0.5) * S(3.0) });
      }
      this.shapes.dollar.push(...this.lp(cx, cy - S(1.5), cx, cy + S(1.5), per));
      while (this.shapes.dollar.length < n) this.shapes.dollar.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 7. DISCORD
    this.shapes.discord = [];
    {
      const per = Math.floor(n / 6);
      const w = S(2.0), h = S(1.6);
      this.shapes.discord.push(...this.ap(cx, cy - h * 0.3, w * 0.75, Math.PI * 1.1, Math.PI * 1.9, per * 2));
      this.shapes.discord.push(...this.ap(cx - w * 0.45, cy + h * 0.5, w * 0.4, Math.PI * 1.3, Math.PI * 2.2, per));
      this.shapes.discord.push(...this.ap(cx + w * 0.45, cy + h * 0.5, w * 0.4, Math.PI * 0.8, Math.PI * 1.7, per));
      this.shapes.discord.push(...this.cp(cx - w * 0.3, cy - h * 0.1, S(0.2), per));
      this.shapes.discord.push(...this.cp(cx + w * 0.3, cy - h * 0.1, S(0.2), per));
      while (this.shapes.discord.length < n) this.shapes.discord.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 8. METATRADER
    this.shapes.metatrader = [];
    {
      const bars = [
        { x: -S(2.0), h: S(0.7) },
        { x: -S(1.0), h: S(1.1) },
        { x: S(0.0), h: S(1.5) },
        { x: S(1.0), h: S(1.9) },
        { x: S(2.0), h: S(1.3) },
        { x: S(3.0), h: S(0.9) }
      ];
      const per = Math.floor(n / (bars.length * 3));
      bars.forEach(b => {
        const bw = S(0.35);
        const x = cx + b.x;
        const top = cy - b.h, bot = cy + S(1.0);
        this.shapes.metatrader.push(...this.lp(x - bw, top, x - bw, bot, per));
        this.shapes.metatrader.push(...this.lp(x + bw, top, x + bw, bot, per));
        this.shapes.metatrader.push(...this.lp(x - bw, top, x + bw, top, per));
      });
      while (this.shapes.metatrader.length < n) this.shapes.metatrader.push({ x: cx + (Math.random() - 0.5) * S(6), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 9. SPIRAL
    this.shapes.spiral = [];
    {
      const arms = 3;
      for (let i = 0; i < n; i++) {
        const armIdx = i % arms;
        const t = (i / n) * Math.PI * 6;
        const r = S(0.3) + (i / n) * S(4.0);
        const angle = t + (armIdx * Math.PI * 2 / arms);
        const noise = (Math.random() - 0.5) * S(0.5);
        this.shapes.spiral.push({ x: cx + Math.cos(angle) * (r + noise), y: cy + Math.sin(angle) * (r + noise) * 0.7 });
      }
    }
    
    // 10. GOLD BAR
    this.shapes.gold = [];
    {
      const per = Math.floor(n / 8);
      const w = S(2.5), h = S(1.0);
      const inset = S(0.35);
      this.shapes.gold.push(...this.lp(cx - w, cy - h, cx + w, cy - h, per));
      this.shapes.gold.push(...this.lp(cx - w - inset, cy + h, cx + w + inset, cy + h, per));
      this.shapes.gold.push(...this.lp(cx - w, cy - h, cx - w - inset, cy + h, per));
      this.shapes.gold.push(...this.lp(cx + w, cy - h, cx + w + inset, cy + h, per));
      this.shapes.gold.push(...this.lp(cx - w, cy - h, cx - w + inset, cy - h - inset, per));
      this.shapes.gold.push(...this.lp(cx + w, cy - h, cx + w + inset, cy - h - inset, per));
      this.shapes.gold.push(...this.lp(cx - w + inset, cy - h - inset, cx + w + inset, cy - h - inset, per));
      while (this.shapes.gold.length < n) this.shapes.gold.push({ x: cx + (Math.random() - 0.5) * S(6), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 11. OIL DROP
    this.shapes.oil = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const r = S(1.5) * (1 - 0.6 * Math.cos(t)) * (1 + 0.1 * Math.sin(t * 3));
        const x = cx + Math.sin(t) * r;
        const y = cy - Math.cos(t) * r * (t < Math.PI ? 1.4 : 0.8);
        this.shapes.oil.push({ x, y });
      }
    }
    
    // 12. BITCOIN (₿)
    this.shapes.bitcoin = [];
    {
      const per = Math.floor(n / 8);
      this.shapes.bitcoin.push(...this.lp(cx, cy - S(1.6), cx, cy + S(1.6), per));
      this.shapes.bitcoin.push(...this.ap(cx + S(0.1), cy - S(0.8), S(0.7), Math.PI * 1.5, Math.PI * 0.5, per));
      this.shapes.bitcoin.push(...this.ap(cx + S(0.1), cy + S(0.8), S(0.7), Math.PI * 1.5, Math.PI * 0.5, per));
      this.shapes.bitcoin.push(...this.lp(cx, cy - S(0.8), cx + S(0.8), cy - S(0.8), per));
      this.shapes.bitcoin.push(...this.lp(cx, cy, cx + S(0.75), cy, per));
      this.shapes.bitcoin.push(...this.lp(cx, cy + S(0.8), cx + S(0.8), cy + S(0.8), per));
      this.shapes.bitcoin.push(...this.lp(cx - S(0.2), cy - S(1.8), cx + S(0.1), cy - S(1.3), per));
      this.shapes.bitcoin.push(...this.lp(cx - S(0.2), cy + S(1.3), cx + S(0.1), cy + S(1.8), per));
      while (this.shapes.bitcoin.length < n) this.shapes.bitcoin.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 13. ETHEREUM (Ξ)
    this.shapes.ethereum = [];
    {
      const per = Math.floor(n / 6);
      const w = S(1.6);
      this.shapes.ethereum.push(...this.lp(cx, cy - S(1.7), cx - w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.lp(cx - w, cy - S(0.3), cx + w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.lp(cx + w, cy - S(0.3), cx, cy - S(1.7), per));
      this.shapes.ethereum.push(...this.lp(cx - w, cy - S(0.3), cx + w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.lp(cx, cy + S(1.7), cx - w, cy + S(0.3), per));
      this.shapes.ethereum.push(...this.lp(cx - w, cy + S(0.3), cx + w, cy + S(0.3), per));
      this.shapes.ethereum.push(...this.lp(cx + w, cy + S(0.3), cx, cy + S(1.7), per));
      while (this.shapes.ethereum.length < n) this.shapes.ethereum.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 14. FORTRESS
    this.shapes.fortress = [];
    {
      const sides = 6;
      for (let i = 0; i < n; i++) {
        const ringIdx = Math.floor(i / (n / 4));
        const ringRadius = S(1.5) + ringIdx * S(0.9);
        const angleOffset = ringIdx * 0.3;
        const angle = (i / n) * Math.PI * 2 + angleOffset;
        const noise = (Math.random() - 0.5) * S(0.4);
        this.shapes.fortress.push({ x: cx + Math.cos(angle) * (ringRadius + noise) * 0.9, y: cy + Math.sin(angle) * (ringRadius + noise) * 0.8 });
      }
    }
    
    // 15. ROCKET
    this.shapes.rocket = [];
    {
      const per = Math.floor(n / 9);
      this.shapes.rocket.push(...this.lp(cx, cy - S(2.2), cx - S(0.45), cy - S(1.3), per));
      this.shapes.rocket.push(...this.lp(cx, cy - S(2.2), cx + S(0.45), cy - S(1.3), per));
      this.shapes.rocket.push(...this.lp(cx - S(0.45), cy - S(1.3), cx - S(0.45), cy + S(0.9), per));
      this.shapes.rocket.push(...this.lp(cx + S(0.45), cy - S(1.3), cx + S(0.45), cy + S(0.9), per));
      this.shapes.rocket.push(...this.lp(cx - S(0.45), cy + S(0.9), cx + S(0.45), cy + S(0.9), per));
      this.shapes.rocket.push(...this.lp(cx - S(0.45), cy + S(0.3), cx - S(1.0), cy + S(1.3), per));
      this.shapes.rocket.push(...this.lp(cx - S(1.0), cy + S(1.3), cx - S(0.45), cy + S(0.9), per));
      this.shapes.rocket.push(...this.lp(cx + S(0.45), cy + S(0.3), cx + S(1.0), cy + S(1.3), per));
      this.shapes.rocket.push(...this.lp(cx + S(1.0), cy + S(1.3), cx + S(0.45), cy + S(0.9), per));
      this.shapes.rocket.push(...this.cp(cx, cy - S(0.5), S(0.22), per));
      while (this.shapes.rocket.length < n) this.shapes.rocket.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 16. TROPHY
    this.shapes.trophy = [];
    {
      const per = Math.floor(n / 11);
      const w = S(1.1);
      this.shapes.trophy.push(...this.lp(cx - w, cy - S(1.3), cx - w, cy - S(0.3), per));
      this.shapes.trophy.push(...this.lp(cx + w, cy - S(1.3), cx + w, cy - S(0.3), per));
      this.shapes.trophy.push(...this.lp(cx - w, cy - S(1.3), cx + w, cy - S(1.3), per));
      this.shapes.trophy.push(...this.ap(cx, cy - S(0.3), w, 0, Math.PI, per));
      this.shapes.trophy.push(...this.ap(cx - w, cy - S(0.8), S(0.4), -Math.PI * 0.5, Math.PI * 0.5, per));
      this.shapes.trophy.push(...this.ap(cx + w, cy - S(0.8), S(0.4), Math.PI * 0.5, Math.PI * 1.5, per));
      this.shapes.trophy.push(...this.lp(cx, cy + S(0.5), cx, cy + S(1.1), per));
      this.shapes.trophy.push(...this.lp(cx - S(0.5), cy + S(1.1), cx + S(0.5), cy + S(1.1), per));
      this.shapes.trophy.push(...this.lp(cx - S(0.5), cy + S(1.1), cx - S(0.8), cy + S(1.4), per));
      this.shapes.trophy.push(...this.lp(cx + S(0.5), cy + S(1.1), cx + S(0.8), cy + S(1.4), per));
      this.shapes.trophy.push(...this.lp(cx - S(0.8), cy + S(1.4), cx + S(0.8), cy + S(1.4), per));
      while (this.shapes.trophy.length < n) this.shapes.trophy.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(5) });
    }
    
    // 17. WAVE
    this.shapes.wave = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 5;
        const x = (i / n) * this.w * 0.85 + this.w * 0.075;
        const y = cy + Math.sin(t) * S(1.5) + Math.sin(t * 2.5) * S(0.6) + (Math.random() - 0.5) * S(0.7);
        this.shapes.wave.push({ x, y });
      }
    }
    
    // 18. SPHERE
    this.shapes.sphere = [];
    {
      for (let i = 0; i < n; i++) {
        const phi = Math.acos(2 * (i / n) - 1);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = S(2.5);
        this.shapes.sphere.push({ x: cx + Math.sin(phi) * Math.cos(theta) * r * 1.2, y: cy + Math.sin(phi) * Math.sin(theta) * r * 0.8 });
      }
    }
    
    // 19. DIAMOND
    this.shapes.diamond = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const layer = Math.floor(i / (n / 4));
        const r = S(1.2) + layer * S(0.7);
        const angle = t;
        const diamondR = r / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)) + 0.3);
        const noise = (Math.random() - 0.5) * S(0.35);
        this.shapes.diamond.push({ x: cx + Math.cos(angle) * (diamondR + noise), y: cy + Math.sin(angle) * (diamondR + noise) * 0.85 });
      }
    }
    
    // 20. SCATTERED
    this.shapes.scattered = [];
    for (let i = 0; i < n; i++) {
      this.shapes.scattered.push({ x: Math.random() * this.w, y: Math.random() * this.h });
    }
  }
  
  createParticles() {
    const { particleCount, colors, triangleSize } = this.options;
    const initialShape = this.shapes[this.currentShape] || this.shapes.galaxy;
    
    for (let i = 0; i < particleCount; i++) {
      const target = initialShape[i] || { x: this.cx, y: this.cy };
      const sizeVar = Math.random();
      this.particles.push({
        x: target.x + (Math.random() - 0.5) * 200,
        y: target.y + (Math.random() - 0.5) * 200,
        vx: 0, vy: 0,
        targetX: target.x, targetY: target.y,
        size: triangleSize + sizeVar * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.25 + Math.random() * 0.6,
        filled: Math.random() > 0.7,
        index: i,
        glow: sizeVar > 0.85
      });
    }
  }
  
  createAmbient() {
    const { ambientCount, colors } = this.options;
    for (let i = 0; i < ambientCount; i++) {
      this.ambient.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.6 + Math.random() * 2.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.03 + Math.random() * 0.15
      });
    }
  }
  
  morphTo(shapeName) {
    if (shapeName === this.targetShape || !this.shapes[shapeName]) return;
    this.currentShape = this.targetShape;
    this.targetShape = shapeName;
    this.morphProgress = 0;
    
    const newShape = this.shapes[shapeName];
    this.particles.forEach((p, i) => {
      p.fromX = p.x;
      p.fromY = p.y;
      const target = newShape[i] || { x: this.cx, y: this.cy };
      p.targetX = target.x;
      p.targetY = target.y;
    });
  }
  
  updateMorph() {
    if (this.morphProgress < 1) {
      this.morphProgress += 0.008; // ~2s smooth morph
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
  
  drawTriangle(x, y, size, rotation, color, opacity, filled, glow) {
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
    
    if (glow || opacity > 0.5) {
      this.ctx.shadowBlur = glow ? 12 : 5;
      this.ctx.shadowColor = color;
      if (filled) this.ctx.fill();
      else this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }
    
    this.ctx.restore();
  }
  
  drawConnections() {
    const { connectionDist } = this.options;
    const maxLines = 120;
    let lines = 0;
    const cdSq = connectionDist * connectionDist;
    
    this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
    this.ctx.lineWidth = 0.35;
    
    for (let i = 0; i < this.particles.length && lines < maxLines; i++) {
      for (let j = i + 1; j < this.particles.length && lines < maxLines; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < cdSq) {
          const dist = Math.sqrt(distSq);
          this.ctx.globalAlpha = (1 - dist / connectionDist) * 0.10;
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
  
  // ===== NEBULA GLOW BACKGROUND =====
  drawNebulaGlow() {
    const now = performance.now() * 0.0003;
    const { colors } = this.options;
    
    // 3 floating nebula blobs behind particles
    for (let i = 0; i < 3; i++) {
      const t = now + i * 2.1;
      const x = this.cx + Math.sin(t) * this.w * 0.3;
      const y = this.cy + Math.cos(t * 0.7) * this.h * 0.2;
      const r = Math.max(50, 200 + Math.sin(t * 1.3) * 80);
      const color = colors[i * 5 % colors.length];
      
      const grad = this.ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, color.replace(')', ', 0.08)').replace('#', 'rgba(').replace(/(.{2})(.{2})(.{2})/, (m, r, g, b) => {
        return parseInt(r, 16) + ',' + parseInt(g, 16) + ',' + parseInt(b, 16);
      }));
      
      // Simpler: just use the color with low alpha
      this.ctx.save();
      this.ctx.globalAlpha = 0.06;
      this.ctx.fillStyle = color;
      this.ctx.filter = 'blur(60px)';
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  
  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.w, this.h);
    
    // Nebula glow background
    this.drawNebulaGlow();
    
    this.updateMorph();
    
    // Ambient particles
    this.ambient.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.x < -10) p.x = this.w + 10;
      if (p.x > this.w + 10) p.x = -10;
      if (p.y < -10) p.y = this.h + 10;
      if (p.y > this.h + 10) p.y = -10;
      
      // Ambient particles also react to mouse
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 80 && mdist > 0) {
        const f = (1 - mdist / 80) * 1.5;
        p.x += (mdx / mdist) * f;
        p.y += (mdy / mdist) * f;
      }
      
      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, false, false);
    });
    
    this.drawConnections();
    
    // Main constellation particles
    const now = performance.now();
    const { mouseRadius, mouseForce } = this.options;
    
    this.particles.forEach(p => {
      // Settle wobble when morph complete
      if (this.morphProgress >= 1) {
        const wobbleX = Math.sin(now * 0.0005 + p.index) * 4;
        const wobbleY = Math.cos(now * 0.0004 + p.index) * 4;
        p.x += (p.targetX + wobbleX - p.x) * 0.018;
        p.y += (p.targetY + wobbleY - p.y) * 0.018;
      }
      
      p.rotation += p.rotSpeed;
      
      // Mouse repulsion (stronger)
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouseRadius && mdist > 0) {
        const f = (1 - mdist / mouseRadius) * mouseForce;
        p.x += (mdx / mdist) * f;
        p.y += (mdy / mdist) * f;
      }
      
      // Touch repulsion (mobile)
      this.touches.forEach(touch => {
        const tdx = p.x - touch.x;
        const tdy = p.y - touch.y;
        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
        if (tdist < mouseRadius && tdist > 0) {
          const f = (1 - tdist / mouseRadius) * mouseForce;
          p.x += (tdx / tdist) * f;
          p.y += (tdy / tdist) * f;
        }
      });
      
      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, p.filled, p.glow);
    });
    
    this.rafId = requestAnimationFrame(() => this.animate());
  }
  
  // ===== SCROLL DETECTION — changes shape on every small scroll =====
  bindScrollShapeDetection() {
    const shapeMap = {};
    this.shapeSequence.forEach(s => { shapeMap[s] = s; });
    
    const sections = document.querySelectorAll('[data-shape]');
    
    // Method 1: data-shape section interception
    if (sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            const shape = entry.target.dataset.shape;
            if (shape && shapeMap[shape]) {
              this.morphTo(shapeMap[shape]);
              // Sync shapeIdx with the shape
              const idx = this.shapeSequence.indexOf(shape);
              if (idx >= 0) this.shapeIdx = idx;
            }
          }
        });
      }, { threshold: [0.25, 0.4, 0.6] });
      sections.forEach(s => observer.observe(s));
    }
    
    // Method 2: scroll-accumulated shape cycling
    // Changes shape every ~80px of scroll for continuous variety
    let scrollRAF = null;
    
    window.addEventListener('scroll', () => {
      if (scrollRAF) return;
      scrollRAF = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - this.lastScrollY;
        this.lastScrollY = scrollY;
        
        // Accumulate scroll distance
        this.scrollAccum += Math.abs(delta);
        
        // Only auto-cycle if no data-shape sections
        if (!sections.length && this.scrollAccum >= this.shapeChangeThreshold) {
          this.scrollAccum = 0;
          this.shapeIdx = (this.shapeIdx + 1) % this.shapeSequence.length;
          this.morphTo(this.shapeSequence[this.shapeIdx]);
        }
        
        scrollRAF = null;
      });
    }, { passive: true });
  }
  
  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.generateShapes();
        const shape = this.shapes[this.targetShape] || this.shapes.galaxy;
        this.particles.forEach((p, i) => {
          const target = shape[i] || { x: this.cx, y: this.cy };
          p.targetX = target.x;
          p.targetY = target.y;
        });
      }, 200);
    });
    
    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.active = false;
    });
    
    // Touch tracking for mobile interaction
    window.addEventListener('touchstart', (e) => {
      this.touches = Array.from(e.touches).map(t => ({ x: t.clientX, y: t.clientY }));
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      this.touches = Array.from(e.touches).map(t => ({ x: t.clientX, y: t.clientY }));
    }, { passive: true });
    
    window.addEventListener('touchend', () => {
      this.touches = [];
    }, { passive: true });
    
    this.bindScrollShapeDetection();
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -10px 0px' });
  reveals.forEach(el => observer.observe(el));
  
  // FALLBACK: Make all reveal elements visible after 2.5s, even if observer didn't fire
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('visible'));
  }, 2500);
  
  // Also immediately mark elements already in viewport
  requestAnimationFrame(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  });
}

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

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

const REG_TARGET = 10000;
let regCount = 847;

function initRegCounter(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  function render() {
    const padded = regCount.toString().padStart(5, '0');
    const digits = el.querySelector('.reg-counter-numbers');
    if (digits) digits.innerHTML = padded.split('').map(d => `<span class="reg-digit">${d}</span>`).join('');
    const bar = el.querySelector('.reg-counter-bar-fill');
    if (bar) bar.style.width = (regCount / REG_TARGET * 100) + '%';
    const remaining = el.querySelector('.reg-counter-remaining');
    if (remaining) {
      const left = REG_TARGET - regCount;
      remaining.textContent = left > 0 
        ? `${left.toLocaleString()} traders needed to unlock free tournaments` 
        : 'TARGET REACHED — ALL TOURNAMENTS UNLOCKED';
    }
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

function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });
}

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

let constellation = null;

function initFORTREXFX() {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initCounters();
  initLockedTournaments();
  initAccordion();
  
  const counter = document.getElementById('reg-counter');
  if (counter) initRegCounter('reg-counter');
  
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    constellation = new MorphingConstellation('particle-canvas', {
      particleCount: 450,
      ambientCount: 180,
      triangleSize: 1.5,
      connectionDist: 55,
      mouseRadius: 160,
      mouseForce: 3.5
    });
  }
  
  document.querySelectorAll('[data-countdown]').forEach(el => {
    initCountdown(el.id, el.dataset.countdown);
  });
  
  const clock = document.getElementById('admin-clock');
  if (clock) initAdminClock('admin-clock');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFORTREXFX);
} else {
  initFORTREXFX();
}
