/**
 * VORTEX FX — COMPREHENSIVE CYBERSPACE JASVASCRIPT CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  Fortex FX.initAll();
});

const Fortex FX = {
  // --- Auto-Initialize All Systems ---
  initAll() {
    this.initBootSequence();
    this.initNavScroll();
    this.initScrollReveal();
    this.initParallax();
    this.initCardTilt();
    this.initCounters();
    this.initCardGlow();
    this.initMagnetic();
    this.initRipple();
    this.initGlitch();
    this.initSmoothScroll();
    this.initNumberTicker();
    this.initSectionDividers();
    this.initRexCanvas();
    this.initCountdowns();
  },

  // 1. PARTICLE CONSTELLATION SYSTEM
  initParticles(canvasId, particleCount = 60) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    const particles = [];
    const colors = ['#8B5CF6', '#A78BFA', '#06B6D4', '#22D3EE', '#EC4899'];

    let mouse = { x: null, y: null, radius: 130 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse Repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    return { canvas, cancel: () => cancelAnimationFrame(animationFrameId) };
  },

  // 2. SCROLL REVEAL (IntersectionObserver)
  initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .stagger');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
              entry.target.style.transitionDelay = `${delay}ms`;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  },

  // 3. PARALLAX EFFECT
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    if (!parallaxElements.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxElements.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
            const yPos = scrollY * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  // 4. 3D TILT EFFECT FOR CARDS
  initCardTilt() {
    const tiltElements = document.querySelectorAll('.tilt-3d');
    tiltElements.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / (rect.height / 2)) * 8;
        const rotateY = (x / (rect.width / 2)) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  },

  // 5. ANIMATED COUNTERS
  initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-count'));
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            const duration = 2000;
            let startTime = null;

            function animateCounter(currentTime) {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              const easeProgress = easeOutExpo(progress);
              const currentValue = easeProgress * target;

              let formatted = currentValue.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });

              el.textContent = `${prefix}${formatted}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(animateCounter);
              } else {
                let finalFormatted = target.toLocaleString('en-US', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                });
                el.textContent = `${prefix}${finalFormatted}${suffix}`;
              }
            }

            requestAnimationFrame(animateCounter);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    counters.forEach((c) => observer.observe(c));
  },

  // 6. CARD CURSOR GLOW
  initCardGlow() {
    const glassCards = document.querySelectorAll('.glass, .holo-panel');
    glassCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
      });
    });
  },

  // 7. NAV SCROLL & HAMBURGER
  initNavScroll() {
    const nav = document.querySelector('.nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
      });
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('mobile-active');
      });

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinks.classList.remove('mobile-active');
        });
      });
    }
  },

  // 8. MAGNETIC BUTTONS
  initMagnetic() {
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
        el.style.transition = 'transform 0.1s ease-out';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  },

  // 9. BUTTON RIPPLE EFFECT
  initRipple() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-ghost');
    buttons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const diameter = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${x - diameter / 2}px`;
        ripple.style.top = `${y - diameter / 2}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  },

  // 10. PERIODIC GLITCH EFFECT
  initGlitch() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    if (!glitchTexts.length) return;

    setInterval(() => {
      const randomEl = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
      randomEl.style.animation = 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both';
      setTimeout(() => {
        randomEl.style.animation = 'none';
      }, 300);
    }, 4000);
  },

  // 11. SMOOTH SCROLL WITH NAV OFFSET
  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navOffset = 80;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: 'smooth',
          });
        }
      });
    });
  },

  // 12. NUMBER TICKERS (LIVE TRADING FEEL)
  initNumberTicker() {
    const tickers = document.querySelectorAll('[data-ticker]');
    if (!tickers.length) return;

    setInterval(() => {
      const randomTicker = tickers[Math.floor(Math.random() * tickers.length)];
      const currentVal = parseFloat(randomTicker.textContent.replace(/[^0-9.-]/g, ''));
      if (isNaN(currentVal)) return;

      const deltaPercent = (Math.random() * 0.4 - 0.18) / 100;
      const newVal = currentVal * (1 + deltaPercent);
      const isUp = newVal >= currentVal;

      const prefix = randomTicker.getAttribute('data-prefix') || '';
      const suffix = randomTicker.getAttribute('data-suffix') || '';
      const decimals = parseInt(randomTicker.getAttribute('data-decimals') || '2', 10);

      randomTicker.textContent = `${prefix}${newVal.toFixed(decimals)}${suffix}`;
      randomTicker.style.color = isUp ? '#10B981' : '#EC4899';
      randomTicker.style.textShadow = isUp ? '0 0 10px rgba(16, 185, 129, 0.5)' : '0 0 10px rgba(236, 72, 153, 0.5)';

      setTimeout(() => {
        randomTicker.style.color = '';
        randomTicker.style.textShadow = '';
      }, 1200);
    }, 2800);
  },

  // 13. SECTION DIVIDERS (SCALE DRAW)
  initSectionDividers() {
    const dividers = document.querySelectorAll('.section-divider');
    if (!dividers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('draw');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    dividers.forEach((d) => observer.observe(d));
  },

  // 14. BOOT SEQUENCE OVERLAY
  initBootSequence() {
    const bootOverlay = document.getElementById('boot-sequence');
    if (!bootOverlay) return;

    const progressFill = bootOverlay.querySelector('.boot-progress-fill');
    const bootStatus = bootOverlay.querySelector('.boot-status');

    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 25) + 15;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        if (progressFill) progressFill.style.width = '100%';
        if (bootStatus) bootStatus.textContent = 'SYSTEM ONLINE // 100%';

        setTimeout(() => {
          bootOverlay.classList.add('loaded');
        }, 400);
      } else {
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (bootStatus) bootStatus.textContent = `LOADING MODULES // ${percent}%`;
      }
    }, 150);
  },

  // 15. REX AI GENERATIVE CANVAS VISUALIZER
  initRexCanvas() {
    const canvas = document.getElementById('rex-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth || 500);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 380);

    const nodes = [];
    const nodeCount = 35;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 3 + 2;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.05;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        const pulseRadius = this.radius + Math.sin(this.pulse) * 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#06B6D4';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    function animateRex() {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with cyber neural net
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      nodes.forEach((n) => {
        n.update();
        n.draw();
      });

      requestAnimationFrame(animateRex);
    }

    animateRex();

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || 500;
      height = canvas.height = canvas.parentElement.offsetHeight || 380;
    });
  },

  // 16. TOURNAMENT COUNTDOWNS
  initCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');
    if (!countdowns.length) return;

    countdowns.forEach((container) => {
      let totalSeconds = parseInt(container.getAttribute('data-countdown'), 10) || 221528;

      const daysEl = container.querySelector('.days');
      const hoursEl = container.querySelector('.hours');
      const minsEl = container.querySelector('.mins');
      const secsEl = container.querySelector('.secs');

      setInterval(() => {
        if (totalSeconds <= 0) return;
        totalSeconds--;

        const d = Math.floor(totalSeconds / (3600 * 24));
        const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
      }, 1000);
    });
  },
};

// Export initParticles to global scope as requested
window.initParticles = (canvasId, count) => Fortex FX.initParticles(canvasId, count);
window.Fortex FX = Fortex FX;
