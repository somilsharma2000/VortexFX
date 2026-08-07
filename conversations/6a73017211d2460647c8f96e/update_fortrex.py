import re
import sys

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Prepare new styles
new_css = """
/* ===== FORTREX ENHANCED MOTION ENGINE ===== */
:root {
  --ring-circ: 138.23;
}

/* 1. PARALLAX GPU OPTIMIZATION */
[data-speed] {
  will-change: transform;
}

/* 2. MAGNETIC BUTTONS & CTA ENHANCEMENTS */
.btn, .cta, .magnetic, .btn-pill-primary, .nav-cta, .waitlist-btn, .discord-btn, .nav-signin, #copy-invite-btn {
  position: relative;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}

.magnetic:hover, .btn-pill-primary:hover, .nav-cta:hover, .waitlist-btn:hover, .discord-btn:hover {
  box-shadow: 0 0 25px rgba(6, 182, 212, 0.5), 0 0 10px rgba(139, 92, 246, 0.4);
}

/* Enhanced Ripple Span */
.ripple-span {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.85) 0%, rgba(139, 92, 246, 0.65) 50%, transparent 75%);
  box-shadow: 0 0 18px rgba(6, 182, 212, 0.8);
  transform: scale(0);
  animation: ripple-anim 0.65s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
}

@keyframes ripple-anim {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

/* 3. REVEAL ANIMATIONS ON SCROLL (FOR ALL ELEMENTS) */
.reveal, .reveal-heading, .reveal-sub, .reveal-card, .reveal-btn, .reveal-media {
  opacity: 0;
  will-change: transform, opacity, filter;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s ease;
}

.reveal {
  transform: translateY(35px) scale(0.96);
  filter: blur(6px);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.section-sub.reveal {
  transition-delay: 0.12s;
}

/* 4. STAGGERED CARD REVEALS */
.stagger-grid {
  display: grid;
}

.stagger-grid > * {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.75s ease,
              border-color 0.4s ease,
              box-shadow 0.4s ease;
  transition-delay: calc(var(--stagger-i, 0) * 110ms);
  will-change: transform, opacity;
}

.stagger-grid.visible > *, .stagger-grid > *.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 5. KINETIC TYPOGRAPHY */
.section-title {
  perspective: 1000px;
}

.title-char, .title-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(28px) rotateX(-25deg) scale(0.9);
  filter: blur(8px);
  will-change: transform, opacity, filter;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.6s ease;
  transition-delay: calc(var(--char-i, 0) * 28ms);
}

.section-title.visible .title-char,
.section-title.visible .title-word {
  opacity: 1;
  transform: translateY(0) rotateX(0) scale(1);
  filter: blur(0);
}

/* 6. SCROLL-DRIVEN SECTION TRANSITIONS */
.section {
  position: relative;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s ease;
}

.section:not(.section-active) {
  opacity: 0.82;
  transform: scale(0.982);
  filter: blur(2px);
}

.section.section-active {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}

/* 7. FLOATING ANIMATION FOR GLASS CARDS */
@keyframes floatContinuous {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.arena-card, .rebate-card, .step, .calc-card, .rex-holo, .glass-float {
  animation: floatContinuous 5s ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

.arena-card:hover, .rebate-card:hover, .step:hover, .calc-card:hover, .rex-holo:hover, .glass-float:hover {
  animation-play-state: paused;
}

/* 8. HOVER GLOW EXPANSION & SPOTLIGHT EFFECT */
.glass {
  position: relative;
  overflow: hidden;
  background: rgba(18, 18, 28, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  transform-style: preserve-3d;
}

/* Cursor Spotlight Radial Overlay */
.glass::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: radial-gradient(
    450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(139, 92, 246, 0.22),
    rgba(6, 182, 212, 0.12) 40%,
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

/* 3D Glare Light Reflection Overlay */
.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.18),
    transparent 65%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 2;
}

.glass:hover::before,
.glass:hover::after {
  opacity: 1;
}

.glass:hover {
  border-color: rgba(6, 182, 212, 0.65);
  box-shadow: 0 12px 45px -10px rgba(139, 92, 246, 0.45),
              0 0 25px rgba(6, 182, 212, 0.3),
              inset 0 0 20px rgba(139, 92, 246, 0.18);
}

/* 9. SECTION DIVIDER DRAW ANIMATION */
.circuit-divider {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 32px auto;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 20%, var(--violet) 50%, rgba(6,182,212,0.3) 80%, transparent 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
}

.circuit-divider.visible {
  transform: scaleX(1);
}

.circuit-node {
  width: 10px;
  height: 9px;
  background: var(--cyan);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--cyan), 0 0 20px var(--violet);
  transition: transform 0.5s ease 0.4s;
  transform: scale(0);
}

.circuit-divider.visible .circuit-node {
  transform: scale(1);
  animation: pulse-node 2s infinite alternate ease-in-out 0.8s;
}

@keyframes pulse-node {
  0% { box-shadow: 0 0 8px var(--cyan), 0 0 12px var(--violet); }
  100% { box-shadow: 0 0 20px var(--cyan-bright), 0 0 30px var(--magenta); }
}

/* 10. SCROLL-LINKED PROGRESS RING WIDGET */
.scroll-progress-ring-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 10, 18, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: 50%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(139, 92, 246, 0.25);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
}

.scroll-progress-ring-wrap:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 28px rgba(6, 182, 212, 0.45), 0 0 22px rgba(139, 92, 246, 0.45);
}

.progress-ring-svg {
  transform: rotate(-90deg);
  width: 56px;
  height: 56px;
}

.progress-ring-svg circle.ring-bg {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 3.5;
  fill: transparent;
}

.progress-ring-svg circle.ring-fill {
  stroke: url(#ring-gradient);
  stroke-width: 3.5;
  stroke-linecap: round;
  fill: transparent;
  stroke-dasharray: 138.23;
  stroke-dashoffset: 138.23;
  transition: stroke-dashoffset 0.1s linear;
}

.ring-text {
  position: absolute;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: var(--cyan-bright);
  text-shadow: 0 0 8px rgba(6, 182, 212, 0.8);
}

/* 11. NAV ACTIVE HIGHLIGHT */
.nav-links a {
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--cyan) 0%, var(--violet) 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 8px var(--cyan);
}

.nav-links a:hover::after, .nav-links a.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-links a.active {
  color: #FFF;
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
}

/* 12. TICKER FLASH GLOW */
.ticker-flash {
  animation: tickerGlow 0.8s ease;
}

@keyframes tickerGlow {
  0% { color: var(--cyan-bright); text-shadow: 0 0 15px var(--cyan-bright); transform: scale(1.05); }
  50% { color: var(--magenta); text-shadow: 0 0 12px var(--magenta); }
  100% { color: inherit; text-shadow: none; transform: scale(1); }
}

/* 13. ACCESSIBILITY & PREFERS-REDUCED-MOTION */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-speed] { transform: none !important; }
}

/* 14. MOBILE RESPONSIVE OVERRIDES */
@media (max-width: 768px) {
  [data-speed] { transform: none !important; }
  .glass { transform: none !important; }
  .arena-card, .rebate-card, .step, .calc-card, .rex-holo { animation: none !important; }
  .scroll-progress-ring-wrap { bottom: 16px; right: 16px; width: 48px; height: 48px; }
  .progress-ring-svg { width: 48px; height: 48px; }
}
"""

# Insert CSS into style block
content = content.replace('</style>', f'{new_css}\n</style>')

print("CSS appended successfully.")
