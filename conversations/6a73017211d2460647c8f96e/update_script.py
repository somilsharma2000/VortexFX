import re

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

new_script = """<script>
// ===== 1. BOOT SEQUENCE LOGIC =====
(function initBootSequence() {
  const bootOverlay = document.getElementById('boot-sequence');
  if (!bootOverlay) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bootOverlay.style.display = 'none';
    return;
  }

  const bar = document.getElementById('boot-progress-bar');
  const log = document.getElementById('boot-log');

  const steps = [
    'CONNECTING_TO_FORTREX_COMMAND_NODE...',
    'LOAD_MODULES [CRYPTO, FOREX, REBATES]... OK',
    'VERIFYING_ENCRYPTION_KEYS... OK',
    'SYSTEM_ONLINE :: READY'
  ];

  let stepIdx = 0;
  let progress = 0;

  const interval = setInterval(() => {
    progress += 25;
    if (bar) bar.style.width = progress + '%';
    if (steps[stepIdx] && log) {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = '> ' + steps[stepIdx];
      log.appendChild(line);
      stepIdx++;
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        bootOverlay.classList.add('boot-done');
      }, 300);
    }
  }, 250);
})();

// ===== 2. HERO TIME-BASED GREETING =====
(function initGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good day, Trader';
  if (hour >= 5 && hour < 12) greeting = 'Good morning, Trader';
  else if (hour >= 12 && hour < 18) greeting = 'Good afternoon, Trader';
  else greeting = 'Good evening, Trader';
  const greetingEl = document.getElementById('hero-greeting-text');
  if (greetingEl) {
    greetingEl.textContent = `${greeting} • Founder Passes Active`;
  }
})();

// ===== 3. PARALLAX SCROLL ENGINE =====
let tickingParallax = false;
function handleParallax() {
  if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-speed]').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 0;
    const yPos = -(scrollY * speed);
    el.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
  });
}

// ===== 4. SCROLL PROGRESS BAR & RING INDICATOR =====
const scrollProgress = document.getElementById('scroll-progress');
const ringFill = document.getElementById('ring-fill-circle');
const ringText = document.getElementById('ring-text-pct');
const ringContainer = document.getElementById('scroll-progress-ring-container');
const ringCircumference = 138.23; // 2 * PI * 22

function updateScrollProgress() {
  const winScroll = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? Math.min(Math.max((winScroll / height) * 100, 0), 100) : 0;

  if (scrollProgress) scrollProgress.style.width = scrolled + '%';

  if (ringFill) {
    const offset = ringCircumference - (scrolled / 100) * ringCircumference;
    ringFill.style.strokeDashoffset = offset.toFixed(2);
  }
  if (ringText) {
    ringText.textContent = Math.round(scrolled) + '%';
  }
}

if (ringContainer) {
  ringContainer.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Consolidated Passive Scroll Listener
window.addEventListener('scroll', () => {
  if (!tickingParallax) {
    requestAnimationFrame(() => {
      handleParallax();
      updateScrollProgress();
      updateActiveNav();
      tickingParallax = false;
    });
    tickingParallax = true;
  }
}, { passive: true });

// ===== 5. SMOOTH ANCHOR SCROLLING & NAV HIGHLIGHTING =====
const navLinks = document.querySelectorAll('.nav-links a');
const sectionDots = document.querySelectorAll('.indicator-dot');
const allSections = document.querySelectorAll('.section, .hero');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const navOffset = 80;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

function updateActiveNav() {
  let currentId = '';
  const scrollPos = window.scrollY + 150;

  allSections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentId = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });

  sectionDots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.getAttribute('href') === '#' + currentId) {
      dot.classList.add('active');
    }
  });
}

// ===== 6. MAGNETIC BUTTONS & ENHANCED RIPPLE =====
document.querySelectorAll('.btn, .cta, .magnetic, .btn-pill-primary, .nav-cta, .waitlist-btn, .discord-btn, .nav-signin').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });

  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-span';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ===== 7. 3D CARD TILT & CURSOR SPOTLIGHT LIGHT REFLECTION =====
document.querySelectorAll('.glass, .arena-card, .rebate-card, .step, .calc-card, .rex-holo').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

// ===== 8. KINETIC TYPOGRAPHY LETTER SPLIT =====
document.querySelectorAll('.section-title').forEach(title => {
  if (title.dataset.kinetic === 'true') return;
  title.dataset.kinetic = 'true';
  const text = title.textContent.trim();
  title.textContent = '';
  let charIdx = 0;
  text.split(' ').forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    word.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'title-char';
      span.textContent = char;
      span.style.setProperty('--char-i', charIdx++);
      wordSpan.appendChild(span);
    });
    title.appendChild(wordSpan);
    if (wIdx < text.split(' ').length - 1) {
      const space = document.createTextNode(' ');
      title.appendChild(space);
    }
  });
});

// ===== 9. ANIMATED COUNTERS =====
function animateCounter(el) {
  if (el.dataset.animated === 'true') return;
  const target = parseFloat(el.getAttribute('data-count'));
  if (isNaN(target)) return;

  el.dataset.animated = 'true';
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = ease * target;
    el.textContent = prefix + current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + suffix;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      if (entry.target.hasAttribute('data-count')) animateCounter(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-count], .section, .rebate-card, .leaderboard, .scarcity').forEach(el => counterObserver.observe(el));

// ===== 10. STAGGERED REVEALS & REVEALOBSERVER =====
document.querySelectorAll('.stagger-grid, .arena-grid, .rebate-grid, .steps').forEach(grid => {
  grid.classList.add('stagger-grid');
  Array.from(grid.children).forEach((child, idx) => {
    child.style.setProperty('--stagger-i', idx);
  });
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .section-title, .circuit-divider, .stagger-grid').forEach(el => revealObs.observe(el));

// ===== 11. SCROLL-DRIVEN SECTION ACTIVE TRANSITIONS =====
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-active');
    } else {
      entry.target.classList.remove('section-active');
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.section').forEach(sec => sectionObs.observe(sec));

// ===== 12. LEADERBOARD BAR FILL ANIMATION =====
const lbObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lb-bar-fill').forEach(bar => {
        const pct = bar.getAttribute('data-pct');
        bar.style.width = pct + '%';
      });
      lbObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#leaderboard').forEach(sec => lbObs.observe(sec));

// ===== 13. LIVE TICKER FLICKER ANIMATION =====
(function initLiveTicker() {
  const tickerElements = document.querySelectorAll('.lb-score, .lb-rex, .rex-balance');
  if (!tickerElements.length) return;

  setInterval(() => {
    if (Math.random() > 0.45) {
      const randEl = tickerElements[Math.floor(Math.random() * tickerElements.length)];
      const valStr = randEl.textContent.replace(/[^0-9.]/g, '');
      const numVal = parseFloat(valStr);
      if (!isNaN(numVal) && numVal > 0) {
        const delta = (Math.random() - 0.48) * (numVal * 0.002);
        const newVal = Math.max(1, numVal + delta);
        const isDec = valStr.includes('.');
        const prefix = randEl.getAttribute('data-prefix') || '';
        const suffix = randEl.getAttribute('data-suffix') || '';
        randEl.textContent = prefix + newVal.toLocaleString(undefined, {
          minimumFractionDigits: isDec ? 1 : 0,
          maximumFractionDigits: isDec ? 1 : 0
        }) + suffix;
        randEl.classList.add('ticker-flash');
        setTimeout(() => randEl.classList.remove('ticker-flash'), 800);
      }
    }
  }, 3500);
})();

// ===== 14. HERO PARTICLE CONSTELLATION CANVAS WITH MOUSE REPULSION =====
(function initConstellation() {
  const canvas = document.getElementById('hero-constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const mouse = { x: -1000, y: -1000 };
  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const particles = [];
  const count = 55;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      let p = particles[i];

      // Mouse Repulsion Force
      let mdx = p.x - mouse.x;
      let mdy = p.y - mouse.y;
      let mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 120 && mdist > 0) {
        let force = (120 - mdist) / 120;
        p.x += (mdx / mdist) * force * 2.5;
        p.y += (mdy / mdist) * force * 2.5;
      }

      p.x += p.vx; p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < count; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          let alpha = (1 - dist / 115) * 0.32;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
})();

// ===== 15. REX GENERATIVE CANVAS =====
(function initRexGenArt() {
  const rexCanvas = document.getElementById('rex-canvas');
  if (!rexCanvas) return;
  const ctx = rexCanvas.getContext('2d');
  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 1,
      color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6'
    });
  }

  function drawArt() {
    ctx.clearRect(0, 0, 200, 200);

    for (let i = 0; i < particleCount; i++) {
      let p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 200) p.vx *= -1;
      if (p.y < 0 || p.y > 200) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < particleCount; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x, dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 45) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist / 45})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawArt);
  }
  drawArt();
})();

// ===== 16. DYNAMIC WAITLIST & INVITE LINK GENERATOR =====
let currentSlots = 742;
const totalSlots = 1000;
const slotsText = document.getElementById('slots-text');
const scarcityFill = document.getElementById('scarcity-fill');

if (slotsText) slotsText.textContent = currentSlots.toLocaleString() + ' / 1,000';
if (scarcityFill) scarcityFill.style.width = (currentSlots / totalSlots * 100) + '%';

setInterval(() => {
  if (currentSlots < totalSlots - 5) {
    const inc = Math.floor(Math.random() * 2) + 1;
    currentSlots += inc;
    if (slotsText) slotsText.textContent = currentSlots.toLocaleString() + ' / 1,000';
    if (scarcityFill) scarcityFill.style.width = (currentSlots / totalSlots * 100) + '%';
  }
}, 12000);

const origWaitlistBtn = document.getElementById('waitlist-btn');
const origWaitlistEmail = document.getElementById('waitlist-email');
const origWaitlistWrap = document.getElementById('waitlist-wrap');

if (origWaitlistBtn && origWaitlistEmail) {
  origWaitlistBtn.addEventListener('click', () => {
    if (origWaitlistEmail.value.includes('@')) {
      const refCode = 'FOUNDER-' + Math.floor(1000 + Math.random() * 9000);
      origWaitlistWrap.innerHTML = `
        <div class="waitlist-claimed" style="flex-direction:column; gap:8px; align-items:stretch; text-align:center;">
          <span>✓ You're on the list. Check your inbox.</span>
          <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">Your Personal Founder Invite Link:</div>
          <div style="display:flex; gap:6px;">
            <input type="text" readonly value="https://fortrex.io/invite?ref=${refCode}" id="invite-link-input" style="flex:1; background:rgba(5,5,7,0.8); border:1px solid rgba(139,92,246,0.4); color:#FFF; padding:6px 12px; border-radius:100px; font-size:11px; font-family:'JetBrains Mono', monospace;" />
            <button id="copy-invite-btn" class="magnetic" style="background:linear-gradient(135deg, var(--cyan) 0%, var(--violet) 100%); color:#FFF; border:none; padding:6px 14px; border-radius:100px; font-weight:700; font-size:10px; cursor:pointer; font-family:'JetBrains Mono', monospace;">COPY</button>
          </div>
        </div>`;
      const copyBtn = document.getElementById('copy-invite-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          const input = document.getElementById('invite-link-input');
          input.select();
          navigator.clipboard.writeText(input.value);
          this.textContent = 'COPIED!';
          this.style.background = 'var(--cyan-bright)';
          this.style.color = '#000';
        });
      }
    }
  });
}

// ===== 17. FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('active');
      el.querySelector('.faq-a').style.maxHeight = '0px';
    });
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-a');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== 18. LOT SIZE CALCULATOR LOGIC =====
const calcAccount = document.getElementById('calc-account');
const calcRisk = document.getElementById('calc-risk');
const calcRiskVal = document.getElementById('calc-risk-val');
const calcPair = document.getElementById('calc-pair');
const calcSl = document.getElementById('calc-sl');

const resultRisk = document.getElementById('result-risk');
const resultPip = document.getElementById('result-pip');
const resultLots = document.getElementById('result-lots');
const resultRebate = document.getElementById('result-rebate');

function updateCalculator() {
  if (!calcAccount || !calcRisk || !calcSl) return;
  const account = parseFloat(calcAccount.value) || 1000;
  const riskPct = parseFloat(calcRisk.value) || 2;
  const slPips = parseFloat(calcSl.value) || 20;
  const contractSize = parseFloat(calcPair.value) || 100000;

  if (calcRiskVal) calcRiskVal.textContent = riskPct + '%';

  const riskAmount = (account * riskPct) / 100;
  let pipValuePerLot = 10;
  if (contractSize === 1300) pipValuePerLot = 1; // Gold
  else if (contractSize === 1) pipValuePerLot = 1; // BTC
  else if (contractSize === 1000) pipValuePerLot = 1; // ETH
  else if (contractSize === 150000) pipValuePerLot = 9.1; // USD/JPY approx

  const lots = slPips > 0 ? (riskAmount / (slPips * pipValuePerLot)) : 0;
  const rebate = lots * 3;

  if (resultRisk) resultRisk.textContent = '$' + riskAmount.toFixed(2);
  if (resultPip) resultPip.textContent = '$' + pipValuePerLot.toFixed(2) + '/pip';
  if (resultLots) resultLots.textContent = lots.toFixed(2) + ' lots';
  if (resultRebate) resultRebate.textContent = '$' + rebate.toFixed(2);
}

if (calcAccount) calcAccount.addEventListener('change', updateCalculator);
if (calcRisk) calcRisk.addEventListener('input', updateCalculator);
if (calcPair) calcPair.addEventListener('change', updateCalculator);
if (calcSl) calcSl.addEventListener('input', updateCalculator);
updateCalculator();

</script>"""

# Replace existing script tag in text
script_pattern = re.compile(r'<script>.*?</script>', re.DOTALL)
text = script_pattern.sub(new_script, text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Script updated successfully.")
