import re

file_path = '/app/conversations/6a73017211d2460647c8f96e/fortrex-3d/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add data-speed to parallax background elements
text = text.replace('<div class="hero-glow"></div>', '<div class="hero-glow" data-speed="0.12"></div>')
text = text.replace('<canvas id="hero-constellation-canvas" class="hero-constellation"></canvas>', '<canvas id="hero-constellation-canvas" class="hero-constellation" data-speed="0.05"></canvas>')
text = text.replace('<div class="data-stream left" aria-hidden="true">', '<div class="data-stream left" aria-hidden="true" data-speed="0.10">')
text = text.replace('<div class="data-stream right" aria-hidden="true">', '<div class="data-stream right" aria-hidden="true" data-speed="0.10">')
text = text.replace('<div class="perspective-grid-bg" aria-hidden="true">', '<div class="perspective-grid-bg" aria-hidden="true" data-speed="0.08">')
text = text.replace('<div class="hero-content">', '<div class="hero-content" data-speed="-0.03">')

# 2. Add magnetic class to buttons
text = text.replace('class="btn-pill-primary"', 'class="btn-pill-primary magnetic"')
text = text.replace('class="nav-cta"', 'class="nav-cta magnetic"')
text = text.replace('class="waitlist-btn"', 'class="waitlist-btn magnetic"')
text = text.replace('class="discord-btn"', 'class="discord-btn magnetic"')
text = text.replace('class="nav-signin"', 'class="nav-signin magnetic"')

# 3. Add stagger-grid and data-speed to card grids
text = text.replace('<div class="arena-grid">', '<div class="arena-grid stagger-grid" data-speed="0.02">')
text = text.replace('<div class="steps">', '<div class="steps stagger-grid" data-speed="0.02">')
text = text.replace('<div class="rebate-grid">', '<div class="rebate-grid stagger-grid" data-speed="0.02">')
text = text.replace('<div class="rex-section">', '<div class="rex-section stagger-grid" data-speed="0.02">')

# 4. Add data-count attributes to elements
text = text.replace('<div class="value">$3</div>', '<div class="value" data-count="3" data-prefix="$">$3</div>')
text = text.replace('<div class="value">$100+</div>', '<div class="value" data-count="100" data-prefix="$" data-suffix="+">$100+</div>')
text = text.replace('<div class="rex-balance">12,450</div>', '<div class="rex-balance" data-count="12450">12,450</div>')
text = text.replace('<span>1,460 / 2,000 entries</span>', '<span><span data-count="1460">1,460</span> / 2,000 entries</span>')
text = text.replace('<span>820 / 2,000 entries</span>', '<span><span data-count="820">820</span> / 2,000 entries</span>')

# Leaderboard scores data-count
text = text.replace('<span class="lb-score">94.7</span>', '<span class="lb-score" data-count="94.7" data-decimals="1">94.7</span>')
text = text.replace('<span class="lb-score">91.2</span>', '<span class="lb-score" data-count="91.2" data-decimals="1">91.2</span>')
text = text.replace('<span class="lb-score">88.9</span>', '<span class="lb-score" data-count="88.9" data-decimals="1">88.9</span>')
text = text.replace('<span class="lb-score">85.3</span>', '<span class="lb-score" data-count="85.3" data-decimals="1">85.3</span>')
text = text.replace('<span class="lb-score">83.1</span>', '<span class="lb-score" data-count="83.1" data-decimals="1">83.1</span>')

# Leaderboard Rex data-count
text = text.replace('<div class="lb-rex">12,450</div>', '<div class="lb-rex" data-count="12450">12,450</div>')
text = text.replace('<div class="lb-rex">10,820</div>', '<div class="lb-rex" data-count="10820">10,820</div>')
text = text.replace('<div class="lb-rex">9,340</div>', '<div class="lb-rex" data-count="9340">9,340</div>')
text = text.replace('<div class="lb-rex">7,910</div>', '<div class="lb-rex" data-count="7910">7,910</div>')
text = text.replace('<div class="lb-rex">6,450</div>', '<div class="lb-rex" data-count="6450">6,450</div>')

# Scarcity data-count
text = text.replace('<span class="scarcity-value" id="slots-text">0 / 1,000</span>', '<span class="scarcity-value" id="slots-text" data-count="742" data-suffix=" / 1,000">742 / 1,000</span>')

# 5. Add Float Delays to cards
text = text.replace('<div class="arena-card glass glass-hover reveal">', '<div class="arena-card glass glass-hover reveal" style="--float-delay: 0s;">', 1)
text = text.replace('<div class="arena-card glass glass-hover reveal">', '<div class="arena-card glass glass-hover reveal" style="--float-delay: 0.8s;">', 1)
text = text.replace('<div class="arena-card glass glass-hover reveal">', '<div class="arena-card glass glass-hover reveal" style="--float-delay: 1.6s;">', 1)

text = text.replace('<div class="step glass glass-hover reveal">', '<div class="step glass glass-hover reveal" style="--float-delay: 0.3s;">', 1)
text = text.replace('<div class="step glass glass-hover reveal">', '<div class="step glass glass-hover reveal" style="--float-delay: 1.1s;">', 1)
text = text.replace('<div class="step glass glass-hover reveal">', '<div class="step glass glass-hover reveal" style="--float-delay: 1.9s;">', 1)

text = text.replace('<div class="rebate-card glass glass-hover reveal">', '<div class="rebate-card glass glass-hover reveal" style="--float-delay: 0.2s;">', 1)
text = text.replace('<div class="rebate-card glass glass-hover reveal">', '<div class="rebate-card glass glass-hover reveal" style="--float-delay: 0.7s;">', 1)
text = text.replace('<div class="rebate-card glass glass-hover reveal">', '<div class="rebate-card glass glass-hover reveal" style="--float-delay: 1.2s;">', 1)
text = text.replace('<div class="rebate-card glass glass-hover reveal">', '<div class="rebate-card glass glass-hover reveal" style="--float-delay: 1.7s;">', 1)

# 6. Add SVG gradient and progress ring widget before </body>
progress_ring_html = """
<!-- SCROLL PROGRESS RING WIDGET & SVG DEFS -->
<svg width="0" height="0" style="position:absolute; opacity:0; pointer-events:none;">
  <defs>
    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="50%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
</svg>
<div id="scroll-progress-ring-container" class="scroll-progress-ring-wrap" aria-label="Scroll progress">
  <svg class="progress-ring-svg" width="56" height="56" viewBox="0 0 56 56">
    <circle class="ring-bg" cx="28" cy="28" r="22" />
    <circle class="ring-fill" id="ring-fill-circle" cx="28" cy="28" r="22" />
  </svg>
  <span class="ring-text" id="ring-text-pct">0%</span>
</div>
"""

text = text.replace('</body>', f'{progress_ring_html}\n</body>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("HTML modifications written successfully.")
