/* ============================================
   FORTEX FX — Morphing Particle Constellation
   20 trading-themed constellation shapes that
   reform smoothly on scroll. Particles form
   recognizable symbols: forex pairs, commodities,
   crypto, community apps, and platform icons.
   ============================================ */

class MorphingConstellation {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.options = {
      particleCount: options.particleCount || 200,
      ambientCount: options.ambientCount || 60,
      colors: options.colors || ['#8052ff', '#ffb829', '#15846e', '#ffffff', '#a78bfa', '#22d3ee', '#ec4899', '#6366f1', '#fbbf24', '#34d399'],
      triangleSize: options.triangleSize || 1.6,
      connectionDist: options.connectionDist || 65,
      ...options
    };
    
    this.particles = [];
    this.ambient = [];
    this.shapes = {};
    this.currentShape = 'brain';
    this.targetShape = 'brain';
    this.morphProgress = 1;
    this.scrollProgress = 0;
    this.mouse = { x: -1000, y: -1000 };
    this.rafId = null;
    this.shapeSequence = [
      'brain', 'candlestick', 'euro', 'pound', 'yen',
      'dollar', 'discord', 'metatrader', 'spiral',
      'gold', 'oil', 'bitcoin', 'ethereum',
      'fortress', 'rocket', 'trophy', 'wave',
      'sphere', 'diamond', 'scattered'
    ];
    
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
  linePoints(x1, y1, x2, y2, count) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    }
    return pts;
  }
  
  arcPoints(cx, cy, r, a1, a2, count) {
    const pts = [];
    const safeR = Math.max(1, r);
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(count - 1, 1);
      const a = a1 + (a2 - a1) * t;
      pts.push({ x: cx + Math.cos(a) * safeR, y: cy + Math.sin(a) * safeR });
    }
    return pts;
  }
  
  rectPoints(cx, cy, w, h, count) {
    const perSide = Math.floor(count / 4);
    const hw = w / 2, hh = h / 2;
    return [
      ...this.linePoints(cx - hw, cy - hh, cx + hw, cy - hh, perSide),
      ...this.linePoints(cx + hw, cy - hh, cx + hw, cy + hh, perSide),
      ...this.linePoints(cx + hw, cy + hh, cx - hw, cy + hh, perSide),
      ...this.linePoints(cx - hw, cy + hh, cx - hw, cy - hh, perSide),
    ];
  }
  
  circlePoints(cx, cy, r, count) {
    return this.arcPoints(cx, cy, r, 0, Math.PI * 2, count);
  }
  
  // ===== 20 TRADING-THEMED SHAPES =====
  generateShapes() {
    const n = this.options.particleCount;
    const cx = this.cx, cy = this.cy;
    const scale = Math.min(this.w, this.h) * 0.0035;
    const S = (v) => v * scale * 60;
    
    // 1. BRAIN / CLOUD — AI suite, hero
    this.shapes.brain = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const layer = Math.floor(i / (n / 3));
      const baseR = S(2 + layer * 0.7);
      const noise = Math.sin(t * 3) * S(0.5) + Math.cos(t * 5) * S(0.35) + (Math.random() - 0.5) * S(0.7);
      const r = baseR + noise;
      this.shapes.brain.push({ x: cx + Math.cos(t) * r * 1.1, y: cy + Math.sin(t) * r * 0.75 });
    }
    
    // 2. CANDLESTICK — forex price chart
    this.shapes.candlestick = [];
    {
      const candleX = [-S(1.5), -S(0.3), S(0.9), S(2.1)];
      const bodies = [
        { top: -S(0.8), bot: S(0.3), wickTop: -S(1.3), wickBot: S(0.7) },
        { top: -S(0.3), bot: S(0.8), wickTop: -S(0.7), wickBot: S(1.2) },
        { top: -S(1.0), bot: -S(0.1), wickTop: -S(1.5), wickBot: S(0.3) },
        { top: -S(0.5), bot: S(0.6), wickTop: -S(0.9), wickBot: S(1.0) }
      ];
      const per = Math.floor(n / 12);
      bodies.forEach((c, idx) => {
        const x = cx + candleX[idx];
        const bw = S(0.35);
        this.shapes.candlestick.push(...this.linePoints(x, cy + c.wickTop, x, cy + c.wickBot, per));
        this.shapes.candlestick.push(...this.linePoints(x - bw, cy + c.top, x - bw, cy + c.bot, per));
        this.shapes.candlestick.push(...this.linePoints(x + bw, cy + c.top, x + bw, cy + c.bot, per));
      });
      while (this.shapes.candlestick.length < n) this.shapes.candlestick.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 3. EURO (€) — EUR/USD pair
    this.shapes.euro = [];
    {
      const per = Math.floor(n / 5);
      this.shapes.euro.push(...this.arcPoints(cx - S(0.3), cy, S(1.5), Math.PI * 0.3, Math.PI * 1.7, per * 2));
      this.shapes.euro.push(...this.linePoints(cx - S(1.2), cy - S(0.3), cx + S(0.8), cy - S(0.3), per));
      this.shapes.euro.push(...this.linePoints(cx - S(1.2), cy + S(0.3), cx + S(0.8), cy + S(0.3), per));
      while (this.shapes.euro.length < n) this.shapes.euro.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 4. POUND (£) — GBP/USD pair
    this.shapes.pound = [];
    {
      const per = Math.floor(n / 6);
      this.shapes.pound.push(...this.linePoints(cx + S(0.1), cy - S(1.2), cx + S(0.1), cy + S(0.8), per));
      this.shapes.pound.push(...this.linePoints(cx - S(0.8), cy - S(0.3), cx + S(0.6), cy - S(0.3), per));
      this.shapes.pound.push(...this.arcPoints(cx + S(0.1), cy - S(1.0), S(0.5), Math.PI * 0.5, Math.PI * 1.8, per));
      this.shapes.pound.push(...this.arcPoints(cx - S(0.2), cy + S(0.6), S(0.4), 0, Math.PI * 1.2, per));
      while (this.shapes.pound.length < n) this.shapes.pound.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 5. YEN (¥) — USD/JPY pair
    this.shapes.yen = [];
    {
      const per = Math.floor(n / 6);
      this.shapes.yen.push(...this.linePoints(cx - S(1.0), cy - S(1.0), cx, cy - S(0.1), per));
      this.shapes.yen.push(...this.linePoints(cx + S(1.0), cy - S(1.0), cx, cy - S(0.1), per));
      this.shapes.yen.push(...this.linePoints(cx, cy - S(0.1), cx, cy + S(1.2), per));
      this.shapes.yen.push(...this.linePoints(cx - S(0.7), cy + S(0.2), cx + S(0.7), cy + S(0.2), per));
      while (this.shapes.yen.length < n) this.shapes.yen.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 6. DOLLAR ($) — USD major pairs
    this.shapes.dollar = [];
    {
      const per = Math.floor(n / 4);
      for (let i = 0; i < per * 2; i++) {
        const t = i / (per * 2 - 1);
        const angle = t * Math.PI * 2 - Math.PI / 2;
        const r = S(0.5);
        this.shapes.dollar.push({ x: cx + Math.sin(angle) * r * 0.8, y: cy + (t - 0.5) * S(2.5) });
      }
      this.shapes.dollar.push(...this.linePoints(cx, cy - S(1.3), cx, cy + S(1.3), per));
      while (this.shapes.dollar.length < n) this.shapes.dollar.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 7. DISCORD — community hub logo
    this.shapes.discord = [];
    {
      const per = Math.floor(n / 6);
      const w = S(1.8), h = S(1.4);
      this.shapes.discord.push(...this.arcPoints(cx, cy - h * 0.3, w * 0.7, Math.PI * 1.1, Math.PI * 1.9, per * 2));
      this.shapes.discord.push(...this.arcPoints(cx - w * 0.45, cy + h * 0.5, w * 0.35, Math.PI * 1.3, Math.PI * 2.2, per));
      this.shapes.discord.push(...this.arcPoints(cx + w * 0.45, cy + h * 0.5, w * 0.35, Math.PI * 0.8, Math.PI * 1.7, per));
      this.shapes.discord.push(...this.circlePoints(cx - w * 0.3, cy - h * 0.1, S(0.18), per));
      this.shapes.discord.push(...this.circlePoints(cx + w * 0.3, cy - h * 0.1, S(0.18), per));
      while (this.shapes.discord.length < n) this.shapes.discord.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 8. METATRADER — MT4/MT5 chart bars
    this.shapes.metatrader = [];
    {
      const bars = [
        { x: -S(1.5), h: S(0.6) },
        { x: -S(0.7), h: S(0.9) },
        { x: S(0.1), h: S(1.2) },
        { x: S(0.9), h: S(1.5) },
        { x: S(1.7), h: S(1.0) }
      ];
      const per = Math.floor(n / (bars.length * 3));
      bars.forEach(b => {
        const bw = S(0.3);
        const x = cx + b.x;
        const top = cy - b.h, bot = cy + S(0.8);
        this.shapes.metatrader.push(...this.linePoints(x - bw, top, x - bw, bot, per));
        this.shapes.metatrader.push(...this.linePoints(x + bw, top, x + bw, bot, per));
        this.shapes.metatrader.push(...this.linePoints(x - bw, top, x + bw, top, per));
      });
      while (this.shapes.metatrader.length < n) this.shapes.metatrader.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 9. SPIRAL / GALAXY — tournament swirl
    this.shapes.spiral = [];
    {
      const arms = 3;
      for (let i = 0; i < n; i++) {
        const armIdx = i % arms;
        const t = (i / n) * Math.PI * 6;
        const r = S(0.3) + (i / n) * S(3.5);
        const angle = t + (armIdx * Math.PI * 2 / arms);
        const noise = (Math.random() - 0.5) * S(0.5);
        this.shapes.spiral.push({ x: cx + Math.cos(angle) * (r + noise), y: cy + Math.sin(angle) * (r + noise) * 0.7 });
      }
    }
    
    // 10. GOLD BAR — commodity
    this.shapes.gold = [];
    {
      const per = Math.floor(n / 8);
      const w = S(2.0), h = S(0.8);
      const inset = S(0.3);
      this.shapes.gold.push(...this.linePoints(cx - w, cy - h, cx + w, cy - h, per));
      this.shapes.gold.push(...this.linePoints(cx - w - inset, cy + h, cx + w + inset, cy + h, per));
      this.shapes.gold.push(...this.linePoints(cx - w, cy - h, cx - w - inset, cy + h, per));
      this.shapes.gold.push(...this.linePoints(cx + w, cy - h, cx + w + inset, cy + h, per));
      this.shapes.gold.push(...this.linePoints(cx - w, cy - h, cx - w + inset, cy - h - inset, per));
      this.shapes.gold.push(...this.linePoints(cx + w, cy - h, cx + w + inset, cy - h - inset, per));
      this.shapes.gold.push(...this.linePoints(cx - w + inset, cy - h - inset, cx + w + inset, cy - h - inset, per));
      while (this.shapes.gold.length < n) this.shapes.gold.push({ x: cx + (Math.random() - 0.5) * S(5), y: cy + (Math.random() - 0.5) * S(3) });
    }
    
    // 11. OIL DROP — crude oil commodity
    this.shapes.oil = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const r = S(1.2) * (1 - 0.6 * Math.cos(t)) * (1 + 0.1 * Math.sin(t * 3));
        const x = cx + Math.sin(t) * r;
        const y = cy - Math.cos(t) * r * (t < Math.PI ? 1.3 : 0.8);
        this.shapes.oil.push({ x, y });
      }
    }
    
    // 12. BITCOIN (₿) — crypto
    this.shapes.bitcoin = [];
    {
      const per = Math.floor(n / 8);
      this.shapes.bitcoin.push(...this.linePoints(cx, cy - S(1.4), cx, cy + S(1.4), per));
      this.shapes.bitcoin.push(...this.arcPoints(cx + S(0.1), cy - S(0.7), S(0.6), Math.PI * 1.5, Math.PI * 0.5, per));
      this.shapes.bitcoin.push(...this.arcPoints(cx + S(0.1), cy + S(0.7), S(0.6), Math.PI * 1.5, Math.PI * 0.5, per));
      this.shapes.bitcoin.push(...this.linePoints(cx, cy - S(0.7), cx + S(0.7), cy - S(0.7), per));
      this.shapes.bitcoin.push(...this.linePoints(cx, cy, cx + S(0.65), cy, per));
      this.shapes.bitcoin.push(...this.linePoints(cx, cy + S(0.7), cx + S(0.7), cy + S(0.7), per));
      this.shapes.bitcoin.push(...this.linePoints(cx - S(0.15), cy - S(1.6), cx + S(0.05), cy - S(1.2), per));
      this.shapes.bitcoin.push(...this.linePoints(cx - S(0.15), cy + S(1.2), cx + S(0.05), cy + S(1.6), per));
      while (this.shapes.bitcoin.length < n) this.shapes.bitcoin.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 13. ETHEREUM (Ξ) — crypto
    this.shapes.ethereum = [];
    {
      const per = Math.floor(n / 6);
      const w = S(1.4);
      this.shapes.ethereum.push(...this.linePoints(cx, cy - S(1.5), cx - w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.linePoints(cx - w, cy - S(0.3), cx + w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.linePoints(cx + w, cy - S(0.3), cx, cy - S(1.5), per));
      this.shapes.ethereum.push(...this.linePoints(cx - w, cy - S(0.3), cx + w, cy - S(0.3), per));
      this.shapes.ethereum.push(...this.linePoints(cx, cy + S(1.5), cx - w, cy + S(0.3), per));
      this.shapes.ethereum.push(...this.linePoints(cx - w, cy + S(0.3), cx + w, cy + S(0.3), per));
      this.shapes.ethereum.push(...this.linePoints(cx + w, cy + S(0.3), cx, cy + S(1.5), per));
      while (this.shapes.ethereum.length < n) this.shapes.ethereum.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 14. FORTRESS / HEX — Citadel / community
    this.shapes.fortress = [];
    {
      const sides = 6;
      for (let i = 0; i < n; i++) {
        const ringIdx = Math.floor(i / (n / 4));
        const ringRadius = S(1.5) + ringIdx * S(0.8);
        const angleOffset = ringIdx * 0.3;
        const angle = (i / n) * Math.PI * 2 + angleOffset;
        const noise = (Math.random() - 0.5) * S(0.4);
        this.shapes.fortress.push({ x: cx + Math.cos(angle) * (ringRadius + noise) * 0.9, y: cy + Math.sin(angle) * (ringRadius + noise) * 0.8 });
      }
    }
    
    // 15. ROCKET — space adventure / launch
    this.shapes.rocket = [];
    {
      const per = Math.floor(n / 8);
      this.shapes.rocket.push(...this.linePoints(cx, cy - S(2.0), cx - S(0.4), cy - S(1.2), per));
      this.shapes.rocket.push(...this.linePoints(cx, cy - S(2.0), cx + S(0.4), cy - S(1.2), per));
      this.shapes.rocket.push(...this.linePoints(cx - S(0.4), cy - S(1.2), cx - S(0.4), cy + S(0.8), per));
      this.shapes.rocket.push(...this.linePoints(cx + S(0.4), cy - S(1.2), cx + S(0.4), cy + S(0.8), per));
      this.shapes.rocket.push(...this.linePoints(cx - S(0.4), cy + S(0.8), cx + S(0.4), cy + S(0.8), per));
      this.shapes.rocket.push(...this.linePoints(cx - S(0.4), cy + S(0.3), cx - S(0.9), cy + S(1.2), per));
      this.shapes.rocket.push(...this.linePoints(cx - S(0.9), cy + S(1.2), cx - S(0.4), cy + S(0.8), per));
      this.shapes.rocket.push(...this.linePoints(cx + S(0.4), cy + S(0.3), cx + S(0.9), cy + S(1.2), per));
      this.shapes.rocket.push(...this.linePoints(cx + S(0.9), cy + S(1.2), cx + S(0.4), cy + S(0.8), per));
      this.shapes.rocket.push(...this.circlePoints(cx, cy - S(0.5), S(0.2), per));
      while (this.shapes.rocket.length < n) this.shapes.rocket.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 16. TROPHY — tournament winner cup
    this.shapes.trophy = [];
    {
      const per = Math.floor(n / 10);
      const w = S(1.0);
      this.shapes.trophy.push(...this.linePoints(cx - w, cy - S(1.2), cx - w, cy - S(0.3), per));
      this.shapes.trophy.push(...this.linePoints(cx + w, cy - S(1.2), cx + w, cy - S(0.3), per));
      this.shapes.trophy.push(...this.linePoints(cx - w, cy - S(1.2), cx + w, cy - S(1.2), per));
      this.shapes.trophy.push(...this.arcPoints(cx, cy - S(0.3), w, 0, Math.PI, per));
      this.shapes.trophy.push(...this.arcPoints(cx - w, cy - S(0.8), S(0.35), -Math.PI * 0.5, Math.PI * 0.5, per));
      this.shapes.trophy.push(...this.arcPoints(cx + w, cy - S(0.8), S(0.35), Math.PI * 0.5, Math.PI * 1.5, per));
      this.shapes.trophy.push(...this.linePoints(cx, cy + S(0.5), cx, cy + S(1.0), per));
      this.shapes.trophy.push(...this.linePoints(cx - S(0.5), cy + S(1.0), cx + S(0.5), cy + S(1.0), per));
      this.shapes.trophy.push(...this.linePoints(cx - S(0.5), cy + S(1.0), cx - S(0.7), cy + S(1.3), per));
      this.shapes.trophy.push(...this.linePoints(cx + S(0.5), cy + S(1.0), cx + S(0.7), cy + S(1.3), per));
      this.shapes.trophy.push(...this.linePoints(cx - S(0.7), cy + S(1.3), cx + S(0.7), cy + S(1.3), per));
      while (this.shapes.trophy.length < n) this.shapes.trophy.push({ x: cx + (Math.random() - 0.5) * S(4), y: cy + (Math.random() - 0.5) * S(4) });
    }
    
    // 17. WAVE — market movement
    this.shapes.wave = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 4;
        const x = (i / n) * this.w * 0.8 + this.w * 0.1;
        const y = cy + Math.sin(t) * S(1.2) + Math.sin(t * 2) * S(0.5) + (Math.random() - 0.5) * S(0.6);
        this.shapes.wave.push({ x, y });
      }
    }
    
    // 18. SPHERE / ORBIT — global market
    this.shapes.sphere = [];
    {
      for (let i = 0; i < n; i++) {
        const phi = Math.acos(2 * (i / n) - 1);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = S(2.2);
        this.shapes.sphere.push({ x: cx + Math.sin(phi) * Math.cos(theta) * r * 1.2, y: cy + Math.sin(phi) * Math.sin(theta) * r * 0.8 });
      }
    }
    
    // 19. DIAMOND / CRYSTAL — REX rewards
    this.shapes.diamond = [];
    {
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const layer = Math.floor(i / (n / 4));
        const r = S(1.0) + layer * S(0.6);
        const angle = t;
        const diamondR = r / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)) + 0.3);
        const noise = (Math.random() - 0.5) * S(0.35);
        this.shapes.diamond.push({ x: cx + Math.cos(angle) * (diamondR + noise), y: cy + Math.sin(angle) * (diamondR + noise) * 0.85 });
      }
    }
    
    // 20. SCATTERED — dispersed fallback
    this.shapes.scattered = [];
    for (let i = 0; i < n; i++) {
      this.shapes.scattered.push({ x: Math.random() * this.w, y: Math.random() * this.h });
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
        vx: 0, vy: 0,
        targetX: target.x, targetY: target.y,
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
      this.morphProgress += 0.01;
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
    
    if (opacity > 0.5) {
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = color;
      if (filled) this.ctx.fill();
      else this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }
    
    this.ctx.restore();
  }
  
  drawConnections() {
    const { connectionDist } = this.options;
    const maxLines = 100;
    let lines = 0;
    const cdSq = connectionDist * connectionDist;
    
    this.ctx.strokeStyle = 'rgba(128, 82, 255, 0.06)';
    this.ctx.lineWidth = 0.4;
    
    for (let i = 0; i < this.particles.length && lines < maxLines; i++) {
      for (let j = i + 1; j < this.particles.length && lines < maxLines; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < cdSq) {
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
  
  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.w, this.h);
    
    this.updateMorph();
    
    this.ambient.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.x < -10) p.x = this.w + 10;
      if (p.x > this.w + 10) p.x = -10;
      if (p.y < -10) p.y = this.h + 10;
      if (p.y > this.h + 10) p.y = -10;
      this.drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.opacity, false);
    });
    
    this.drawConnections();
    
    const now = performance.now();
    this.particles.forEach(p => {
      if (this.morphProgress >= 1) {
        const wobbleX = Math.sin(now * 0.0005 + p.index) * 3;
        const wobbleY = Math.cos(now * 0.0004 + p.index) * 3;
        p.x += (p.targetX + wobbleX - p.x) * 0.02;
        p.y += (p.targetY + wobbleY - p.y) * 0.02;
      }
      
      p.rotation += p.rotSpeed;
      
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
  
  bindScrollShapeDetection() {
    const shapeMap = {};
    this.shapeSequence.forEach(s => { shapeMap[s] = s; });
    
    const sections = document.querySelectorAll('[data-shape]');
    
    // Method 1: data-shape attributes on sections
    if (sections.length) {
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
    
    // Method 2: auto-cycle through all 20 shapes based on scroll progress
    let scrollRAF = null;
    let lastScrollShape = null;
    
    window.addEventListener('scroll', () => {
      if (scrollRAF) return;
      scrollRAF = requestAnimationFrame(() => {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? window.scrollY / docHeight : 0;
        const shapeIdx = Math.floor(scrollPercent * (this.shapeSequence.length - 1));
        const newShape = this.shapeSequence[shapeIdx] || 'brain';
        
        if (newShape !== lastScrollShape && newShape !== this.targetShape) {
          lastScrollShape = newShape;
          if (!sections.length) {
            this.morphTo(newShape);
          }
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
      if (entry.isIntersecting) entry.target.classList.add('visible');
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
      header.parentElement.classList.toggle('open');
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
  
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    constellation = new MorphingConstellation('particle-canvas', {
      particleCount: 200,
      ambientCount: 60,
      triangleSize: 1.6,
      connectionDist: 65
    });
  }
  
  document.querySelectorAll('[data-countdown]').forEach(el => {
    initCountdown(el.id, el.dataset.countdown);
  });
  
  const clock = document.getElementById('admin-clock');
  if (clock) initAdminClock('admin-clock');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFortexFX);
} else {
  initFortexFX();
}
