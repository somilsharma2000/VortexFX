import os

os.makedirs('vortex-fx', exist_ok=True)

# -----------------------------------------------------------------------------
# COMMON HEAD AND CSS INJECTION FOR ULTRA-RELIABILITY & STYLING
# -----------------------------------------------------------------------------

common_styles = """
<style>
  :root {
    --bg: #050508;
    --violet: #8B5CF6;
    --violet-bright: #A78BFA;
    --violet-deep: #6D28D9;
    --cyan: #06B6D4;
    --cyan-bright: #22D3EE;
    --magenta: #EC4899;
    --text: #FFFFFF;
    --text-dim: #94A3B8;
    --border: rgba(139, 92, 246, 0.2);
    --glow: rgba(139, 92, 246, 0.4);
    --font-heading: 'Orbitron', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    line-height: 1.6;
    position: relative;
    min-height: 100vh;
  }

  /* Particle Canvas */
  .particle-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
  }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(5, 5, 8, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
    align-items: center;
  }

  .nav-link {
    color: var(--text-dim);
    text-decoration: none;
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    padding: 6px 12px;
    border-radius: 6px;
    position: relative;
  }

  .nav-link:hover, .nav-link.active {
    color: #fff;
    text-shadow: 0 0 8px var(--glow);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 12px;
    right: 12px;
    height: 2px;
    background: linear-gradient(90deg, var(--violet), var(--cyan));
    box-shadow: 0 0 10px var(--violet);
    border-radius: 2px;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
  }

  /* Buttons */
  .btn-primary {
    background: linear-gradient(135deg, var(--violet-deep), var(--cyan));
    color: #fff;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.6);
    background: linear-gradient(135deg, var(--violet), var(--cyan-bright));
  }

  .btn-ghost {
    background: rgba(139, 92, 246, 0.05);
    color: var(--text);
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 12px 24px;
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .btn-ghost:hover {
    border-color: var(--cyan);
    background: rgba(6, 182, 212, 0.1);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
    color: #fff;
  }

  .btn-full {
    width: 100%;
  }

  /* Layout Sections */
  .section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 24px 60px;
    position: relative;
    z-index: 1;
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: 2.2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #fff 0%, var(--violet-bright) 50%, var(--cyan-bright) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
    display: inline-block;
  }

  .section-subtitle {
    color: var(--text-dim);
    font-size: 1.05rem;
    margin-bottom: 40px;
    max-width: 650px;
  }

  /* Cards & Panels */
  .glass {
    background: rgba(15, 15, 26, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .glass:hover {
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 8px 32px 0 rgba(139, 92, 246, 0.2);
  }

  .holo-panel {
    background: linear-gradient(135deg, rgba(20, 15, 38, 0.8) 0%, rgba(10, 20, 35, 0.8) 100%);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 16px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(139, 92, 246, 0.1), 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  .holo-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--violet), var(--cyan), transparent);
  }

  .holo-panel::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.015),
      rgba(255, 255, 255, 0.015) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  /* Badges */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .badge-diamond {
    background: rgba(139, 92, 246, 0.2);
    color: var(--violet-bright);
    border: 1px solid var(--violet);
  }

  .badge-cyan {
    background: rgba(6, 182, 212, 0.2);
    color: var(--cyan-bright);
    border: 1px solid var(--cyan);
  }

  .badge-magenta {
    background: rgba(236, 72, 153, 0.2);
    color: var(--magenta);
    border: 1px solid var(--magenta);
  }

  .badge-gold {
    background: rgba(234, 179, 8, 0.2);
    color: #fde047;
    border: 1px solid #eab308;
  }

  .badge-silver {
    background: rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
    border: 1px solid #94a3b8;
  }

  .badge-bronze {
    background: rgba(217, 119, 6, 0.2);
    color: #fdba74;
    border: 1px solid #d97706;
  }

  /* Animations & FX */
  .float {
    animation: floating 4s ease-in-out infinite;
  }

  @keyframes floating {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .glow-pulse {
    animation: glowPulse 2s ease-in-out infinite alternate;
  }

  @keyframes glowPulse {
    from { box-shadow: 0 0 10px rgba(139, 92, 246, 0.3); }
    to { box-shadow: 0 0 25px rgba(34, 211, 238, 0.6); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Glitch Text */
  .glitch-text {
    position: relative;
    font-family: var(--font-heading);
  }

  /* Footer */
  .footer {
    background: #020204;
    border-top: 1px solid var(--border);
    padding: 60px 32px 30px;
    margin-top: 80px;
    position: relative;
    z-index: 10;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  .footer-links {
    display: flex;
    gap: 24px;
    list-style: none;
    flex-wrap: wrap;
  }

  .footer-links a {
    color: var(--text-dim);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: var(--cyan-bright);
  }

  .social-links {
    display: flex;
    gap: 16px;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dim);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    color: #fff;
    border-color: var(--cyan);
    background: rgba(6, 182, 212, 0.2);
    transform: translateY(-2px);
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 30px auto 0;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    color: var(--text-dim);
    font-size: 0.8rem;
    font-family: var(--font-mono);
  }

  /* Responsive Mobile Menu */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: rgba(5, 5, 8, 0.95);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 24px;
      border-bottom: 1px solid var(--border);
    }

    .nav-links.show {
      display: flex;
    }

    .mobile-toggle {
      display: block;
    }

    .section-title {
      font-size: 1.75rem;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
"""

# Logo SVG definition
logo_svg = """
<a href="index.html" class="nav-logo">
  <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8B5CF6"/>
        <stop offset="100%" stop-color="#06B6D4"/>
      </linearGradient>
      <linearGradient id="vortexGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#EC4899"/>
        <stop offset="100%" stop-color="#8B5CF6"/>
      </linearGradient>
      <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" stroke="url(#vortexGrad)" stroke-width="4" fill="rgba(139, 92, 246, 0.1)" filter="url(#logoGlow)"/>
    <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" stroke="url(#vortexGrad2)" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M50 5 L50 22 M90 27.5 L74 36.5 M90 72.5 L74 63.5 M50 95 L50 78 M10 72.5 L26 63.5 M10 27.5 L26 36.5" stroke="url(#vortexGrad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 38 L50 62 L62 38" stroke="url(#vortexGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="50" r="4" fill="#22D3EE"/>
  </svg>
  <span style="font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 1.2rem; letter-spacing: 2px; color: #fff; text-shadow: 0 0 10px rgba(139,92,246,0.5);">VORTEX<span style="color: #06B6D4;">FX</span></span>
</a>
"""

# Common Footer HTML
footer_html = """
<footer class="footer">
  <div class="footer-content">
    <div style="display: flex; align-items: center; gap: 12px;">
      """ + logo_svg + """
    </div>
    <ul class="footer-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="offers.html">Offers</a></li>
      <li><a href="leaderboard.html">Leaderboard</a></li>
      <li><a href="profile.html">Profile</a></li>
      <li><a href="#">Discord</a></li>
      <li><a href="#">Terms</a></li>
      <li><a href="#">Privacy</a></li>
    </ul>
    <div class="social-links">
      <!-- Twitter / X -->
      <a href="#" class="social-icon" aria-label="Twitter">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <!-- Discord -->
      <a href="#" class="social-icon" aria-label="Discord">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
      </a>
      <!-- Telegram -->
      <a href="#" class="social-icon" aria-label="Telegram">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.6 3.98-1.65 4.81-1.94 5.35-1.95.12 0 .38.03.55.17.14.12.18.28.2.43-.02.07-.02.21-.04.38z"/></svg>
      </a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; VORTEX FX 2026. All rights reserved. Competitive Cyber Trading Platform.</span>
    <span>SYSTEM STATUS: <span style="color: #22c55e;">● OPERATIONAL</span></span>
  </div>
</footer>
"""

# Particle Canvas Fallback Script Generator
def get_particle_script(canvas_id):
    return f"""
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      if (typeof window.initParticles === 'function') {{
        window.initParticles('{canvas_id}');
      }} else {{
        // Built-in particle canvas engine
        const canvas = document.getElementById('{canvas_id}');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight || 600;

        window.addEventListener('resize', () => {{
          if (canvas.parentElement) {{
            width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement.offsetHeight || 600;
          }}
        }});

        const particles = Array.from({{ length: 45 }}, () => ({{
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4',
          alpha: Math.random() * 0.5 + 0.2
        }}));

        function animate() {{
          ctx.clearRect(0, 0, width, height);
          particles.forEach((p, i) => {{
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            // Connect lines
            for (let j = i + 1; j < particles.length; j++) {{
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 110) {{
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = '#8B5CF6';
                ctx.globalAlpha = (1 - dist / 110) * 0.18;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }}
            }}
          }});
          requestAnimationFrame(animate);
        }}
        animate();
      }}

      // Scroll Reveal Trigger
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {{
        entries.forEach(entry => {{
          if (entry.isIntersecting) {{
            entry.target.classList.add('active');
          }}
        }});
      }}, {{ threshold: 0.15 }});
      reveals.forEach(el => observer.observe(el));

      // Mobile Menu Toggle
      const mobileBtn = document.querySelector('.mobile-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (mobileBtn && navLinks) {{
        mobileBtn.addEventListener('click', () => {{
          navLinks.classList.toggle('show');
        }});
      }}
    }});
  </script>
"""

# =============================================================================
# FILE 1: PROFILE.HTML
# =============================================================================

profile_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberTrader_92 Profile | VORTEX FX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
  {common_styles}
  <style>
    /* Profile Page Specific Styles */
    .profile-header-grid {{
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 32px;
      align-items: center;
      position: relative;
      z-index: 2;
    }}

    .avatar-hex {{
      width: 130px;
      height: 130px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .avatar-svg {{
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 12px var(--violet));
    }}

    .profile-info {{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }}

    .profile-username {{
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: 1px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }}

    .profile-stats-row {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(139, 92, 246, 0.2);
    }}

    .stat-card-inline {{
      background: rgba(10, 10, 18, 0.5);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      text-align: center;
    }}

    .stat-val {{
      font-family: var(--font-mono);
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--cyan-bright);
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.4);
    }}

    .stat-lbl {{
      font-size: 0.8rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }}

    /* Grid Dashboard */
    .dashboard-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-top: 40px;
    }}

    /* Circular SVG Ring */
    .ring-container {{
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 20px;
      padding: 20px 0;
    }}

    /* Achievements Grid */
    .achievements-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }}

    .badge-card {{
      display: flex;
      gap: 16px;
      align-items: flex-start;
      position: relative;
    }}

    .badge-card.locked {{
      opacity: 0.45;
      filter: grayscale(1);
    }}

    .badge-icon-wrap {{
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: rgba(139, 92, 246, 0.15);
      border: 1px solid var(--violet);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--cyan-bright);
    }}

    /* Timeline */
    .timeline {{
      position: relative;
      padding-left: 32px;
      margin-top: 24px;
    }}

    .timeline::before {{
      content: '';
      position: absolute;
      left: 11px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--violet), var(--cyan), transparent);
    }}

    .timeline-item {{
      position: relative;
      margin-bottom: 24px;
    }}

    .timeline-node {{
      position: absolute;
      left: -32px;
      top: 4px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--cyan-bright);
      box-shadow: 0 0 10px var(--cyan);
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    @media (max-width: 900px) {{
      .profile-header-grid {{
        grid-template-columns: 1fr;
        text-align: center;
        justify-items: center;
      }}
      .dashboard-grid {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="nav">
    {logo_svg}
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="offers.html" class="nav-link">Offers</a></li>
      <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
      <li><a href="profile.html" class="nav-link active">Profile</a></li>
    </ul>
    <div class="nav-actions">
      <a href="leaderboard.html" class="btn-primary">Enter Arena</a>
      <button class="mobile-toggle" aria-label="Toggle Menu">☰</button>
    </div>
  </nav>

  <!-- PROFILE HEADER SECTION -->
  <section class="section" style="padding-top: 130px;">
    <canvas id="particles-profile" class="particle-canvas"></canvas>

    <div class="holo-panel tilt-3d float">
      <div class="profile-header-grid">
        <!-- SVG Geometric Hex Avatar -->
        <div class="avatar-hex">
          <svg class="avatar-svg" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 93,28 93,72 50,95 7,72 7,28" stroke="url(#vortexGrad)" stroke-width="3" fill="rgba(139,92,246,0.15)"/>
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="#22D3EE" stroke-width="1.5" fill="none" opacity="0.6"/>
            <circle cx="50" cy="42" r="16" fill="rgba(6,182,212,0.3)" stroke="#8B5CF6" stroke-width="2"/>
            <path d="M28 78 C 35 62, 65 62, 72 78" stroke="#22D3EE" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="42" stroke="url(#vortexGrad)" stroke-width="1" stroke-dasharray="4 4"/>
          </svg>
        </div>

        <div class="profile-info">
          <div class="profile-username">
            <span class="glitch-text" data-text="CyberTrader_92">CyberTrader_92</span>
            <span class="badge badge-diamond">💎 Diamond III</span>
            <span class="badge badge-cyan">PRO TRADER</span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.95rem;">
            Cybernetic scalper specializing in high-volatility FX & Crypto events. Rank #42 Global Arena.
          </p>
          <div style="display: flex; gap: 12px; font-size: 0.85rem; color: var(--text-dim); font-family: var(--font-mono);">
            <span>MEMBER SINCE: Jan 2026</span> • <span>SERVER: VORTEX-ALPHA-01</span>
          </div>
        </div>
      </div>

      <!-- Stats Row with Animated Counters -->
      <div class="profile-stats-row">
        <div class="stat-card-inline">
          <div class="stat-val" data-count="342.8" data-prefix="+" data-suffix="%">+342.8%</div>
          <div class="stat-lbl">Total Profit</div>
        </div>
        <div class="stat-card-inline">
          <div class="stat-val" data-count="68.4" data-suffix="%">68.4%</div>
          <div class="stat-lbl">Win Rate</div>
        </div>
        <div class="stat-card-inline">
          <div class="stat-val" data-count="12">12</div>
          <div class="stat-lbl">Tournaments Won</div>
        </div>
        <div class="stat-card-inline">
          <div class="stat-val" data-count="7" data-suffix="W">7W</div>
          <div class="stat-lbl">Current Streak</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TRADING STATS DASHBOARD -->
  <section class="section">
    <h2 class="section-title reveal">Trading Stats Dashboard</h2>
    <p class="section-subtitle reveal">Live performance metrics & historical combat records.</p>

    <div class="dashboard-grid">
      <!-- Card 1: P/L Chart Placeholder -->
      <div class="glass tilt-3d reveal">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff;">Profit / Loss Trajectory</h3>
          <span class="badge badge-cyan">6 MONTHS</span>
        </div>
        <!-- Bar Chart CSS SVG -->
        <div style="height: 180px; display: flex; align-items: flex-end; gap: 12px; padding-top: 20px; border-bottom: 1px solid var(--border);">
          <div style="flex: 1; height: 35%; background: linear-gradient(0deg, var(--violet), var(--cyan)); border-radius: 4px 4px 0 0;" title="Jan: +35%"></div>
          <div style="flex: 1; height: 50%; background: linear-gradient(0deg, var(--violet), var(--cyan)); border-radius: 4px 4px 0 0;" title="Feb: +50%"></div>
          <div style="flex: 1; height: 42%; background: linear-gradient(0deg, var(--violet), var(--cyan)); border-radius: 4px 4px 0 0;" title="Mar: +42%"></div>
          <div style="flex: 1; height: 75%; background: linear-gradient(0deg, var(--violet), var(--cyan)); border-radius: 4px 4px 0 0;" title="Apr: +75%"></div>
          <div style="flex: 1; height: 60%; background: linear-gradient(0deg, var(--violet), var(--cyan)); border-radius: 4px 4px 0 0;" title="May: +60%"></div>
          <div style="flex: 1; height: 95%; background: linear-gradient(0deg, var(--violet-bright), var(--cyan-bright)); border-radius: 4px 4px 0 0; box-shadow: 0 0 15px var(--cyan);" title="Jun: +95%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px; color: var(--text-dim); font-size: 0.75rem; font-family: var(--font-mono);">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
        </div>
      </div>

      <!-- Card 2: Win/Loss Ratio Progress Ring -->
      <div class="glass tilt-3d reveal">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 16px;">Win / Loss Ratio</h3>
        <div class="ring-container">
          <div style="position: relative; width: 120px; height: 120px;">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" stroke-width="10" fill="none"/>
              <circle cx="60" cy="60" r="50" stroke="url(#vortexGrad)" stroke-width="10" fill="none"
                      stroke-dasharray="314" stroke-dashoffset="99" stroke-linecap="round"
                      style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 1.5s ease;"/>
            </svg>
            <div style="position: absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
              <span style="font-family: var(--font-mono); font-weight: 700; font-size: 1.3rem; color: #fff;">68.4%</span>
              <span style="font-size: 0.65rem; color: var(--text-dim);">WIN RATE</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-family: var(--font-mono); font-size: 0.9rem;">
            <div><span style="color: #22c55e;">● WINS:</span> 182 Trades</div>
            <div><span style="color: #ef4444;">● LOSSES:</span> 84 Trades</div>
            <div><span style="color: var(--cyan-bright);">● PROFIT FACTOR:</span> 2.84</div>
          </div>
        </div>
      </div>

      <!-- Card 3: Tournament History -->
      <div class="glass tilt-3d reveal">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 16px;">Tournament History</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px;">
            <div>
              <div style="font-weight: 700; color: #fff;">Summer Showdown 2026</div>
              <div style="color: var(--text-dim); font-size: 0.75rem;">Finished #1 • +$2,400</div>
            </div>
            <span class="badge badge-gold">🥇 1st Place</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px;">
            <div>
              <div style="font-weight: 700; color: #fff;">Cyber Clash #14</div>
              <div style="color: var(--text-dim); font-size: 0.75rem;">Finished #2 • +$1,200</div>
            </div>
            <span class="badge badge-silver">🥈 2nd Place</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px;">
            <div>
              <div style="font-weight: 700; color: #fff;">Neon Scalper Cup</div>
              <div style="color: var(--text-dim); font-size: 0.75rem;">Finished #3 • +$450</div>
            </div>
            <span class="badge badge-bronze">🥉 3rd Place</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Trading Style Breakdown -->
      <div class="glass tilt-3d reveal">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 16px;">Trading Style Breakdown</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Scalper (1-5 min)</span>
              <span style="font-family: var(--font-mono); color: var(--violet-bright);">45%</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: 45%; height: 100%; background: linear-gradient(90deg, var(--violet), var(--violet-bright));"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Day Trader (15m - 4h)</span>
              <span style="font-family: var(--font-mono); color: var(--cyan-bright);">30%</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: 30%; height: 100%; background: linear-gradient(90deg, var(--cyan), var(--cyan-bright));"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
              <span>Swing Trader (> 1D)</span>
              <span style="font-family: var(--font-mono); color: var(--magenta);">25%</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
              <div style="width: 25%; height: 100%; background: var(--magenta);"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ACHIEVEMENTS SECTION -->
  <section class="section">
    <h2 class="section-title reveal">Cyber Badges & Achievements</h2>
    <p class="section-subtitle reveal">Unlocked honor honors from tournament battlegrounds.</p>

    <div class="achievements-grid">
      <!-- 1 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">🏆</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">First Victory</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Win your first official tournament.</p>
        </div>
      </div>
      <!-- 2 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">⚡</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Lightning Strike</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Maintain a 10 wins streak.</p>
        </div>
      </div>
      <!-- 3 (Locked) -->
      <div class="glass badge-card locked tilt-3d reveal">
        <div class="badge-icon-wrap">👑</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Profit Master 🔒</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Achieve +500% overall ROI.</p>
        </div>
      </div>
      <!-- 4 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">🌟</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Tournament Champion</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Finish 1st in a Premier Event.</p>
        </div>
      </div>
      <!-- 5 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">🚀</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Early Adopter</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Joined during Genesis phase.</p>
        </div>
      </div>
      <!-- 6 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">🛡️</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Community Pillar</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Top contributor in Discord.</p>
        </div>
      </div>
      <!-- 7 -->
      <div class="glass badge-card tilt-3d reveal">
        <div class="badge-icon-wrap">🎯</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Risk Manager</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">Max drawdown under 5%.</p>
        </div>
      </div>
      <!-- 8 (Locked) -->
      <div class="glass badge-card locked tilt-3d reveal">
        <div class="badge-icon-wrap">💎</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 4px;">Perfect Week 🔒</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">100% win rate across 20+ trades.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- RECENT ACTIVITY TIMELINE -->
  <section class="section">
    <h2 class="section-title reveal">Recent Activity Stream</h2>
    <p class="section-subtitle reveal">Audit log of tactical actions and rank advancements.</p>

    <div class="timeline">
      <div class="timeline-item reveal">
        <div class="timeline-node">🥇</div>
        <div class="glass" style="padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="color: #fff; font-size: 0.95rem;">Won Tournament #47</strong>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">2 HOURS AGO</span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Claimed 1st place in Summer Showdown 2026. Added +$2,400 to account balance.</p>
        </div>
      </div>

      <div class="timeline-item reveal">
        <div class="timeline-node">💎</div>
        <div class="glass" style="padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="color: #fff; font-size: 0.95rem;">Reached Diamond III Rank</strong>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">1 DAY AGO</span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Promoted from Platinum I after crossing 1,200 total trades benchmark.</p>
        </div>
      </div>

      <div class="timeline-item reveal">
        <div class="timeline-node">🔥</div>
        <div class="glass" style="padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="color: #fff; font-size: 0.95rem;">7-Win Streak Triggered</strong>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">2 DAYS AGO</span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">7 consecutive profitable trades on EUR/USD & NAS100 volatile breakouts.</p>
        </div>
      </div>

      <div class="timeline-item reveal">
        <div class="timeline-node">⚔️</div>
        <div class="glass" style="padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="color: #fff; font-size: 0.95rem;">Joined 'Summer Showdown' Tournament</strong>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">3 DAYS AGO</span>
          </div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Registered entry key into $50,000 prize pool arena.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PERFORMANCE METRICS -->
  <section class="section">
    <div class="holo-panel reveal">
      <h3 style="font-family: var(--font-heading); font-size: 1.3rem; color: #fff; margin-bottom: 24px; text-transform: uppercase;">Advanced Performance Metrics</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
        <div>
          <div style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase;">Best Rank</div>
          <div style="font-family: var(--font-mono); font-size: 1.8rem; color: var(--cyan-bright);" data-ticker="#2">#2</div>
        </div>
        <div>
          <div style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase;">Avg Profit / Event</div>
          <div style="font-family: var(--font-mono); font-size: 1.8rem; color: var(--violet-bright);" data-ticker="+18.4%">+18.4%</div>
        </div>
        <div>
          <div style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase;">Total Trades</div>
          <div style="font-family: var(--font-mono); font-size: 1.8rem; color: #fff;" data-count="1247">1,247</div>
        </div>
        <div>
          <div style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase;">Risk Score</div>
          <div style="margin-top: 6px;"><span class="badge badge-cyan">MODERATE (3.2/10)</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  {footer_html}

  {get_particle_script('particles-profile')}
</body>
</html>
"""

# Save profile.html
with open('vortex-fx/profile.html', 'w', encoding='utf-8') as f:
    f.write(profile_content)

print("Created vortex-fx/profile.html successfully.")

# =============================================================================
# FILE 2: OFFERS.HTML
# =============================================================================

offers_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trading Arena Offers & Tiers | VORTEX FX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
  {common_styles}
  <style>
    /* Offers Page Specific Styles */
    .pricing-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      align-items: stretch;
      margin-top: 40px;
    }}

    .tier-card {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
    }}

    .tier-card.featured {{
      border-color: var(--cyan);
      box-shadow: 0 0 35px rgba(6, 182, 212, 0.3);
      transform: scale(1.03);
      z-index: 2;
    }}

    .popular-tag {{
      position: absolute;
      top: -14px;
      right: 24px;
      background: linear-gradient(90deg, var(--violet), var(--cyan));
      color: #fff;
      font-family: var(--font-heading);
      font-size: 0.7rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: 12px;
      letter-spacing: 1px;
    }}

    .tier-price {{
      font-family: var(--font-heading);
      font-size: 2.8rem;
      font-weight: 900;
      color: #fff;
      margin: 16px 0;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }}

    .tier-price span {{
      font-size: 1rem;
      color: var(--text-dim);
      font-family: var(--font-body);
    }}

    .tier-features {{
      list-style: none;
      margin: 24px 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 0.9rem;
    }}

    .tier-features li {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .feature-check {{
      color: var(--cyan-bright);
      font-weight: bold;
    }}

    .feature-x {{
      color: var(--text-dim);
      opacity: 0.5;
    }}

    /* Table Styling */
    .compare-table-wrap {{
      overflow-x: auto;
      margin-top: 32px;
    }}

    .compare-table {{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }}

    .compare-table th, .compare-table td {{
      padding: 16px 20px;
      border-bottom: 1px solid rgba(139, 92, 246, 0.15);
    }}

    .compare-table th {{
      font-family: var(--font-heading);
      font-size: 0.85rem;
      color: var(--cyan-bright);
      text-transform: uppercase;
      letter-spacing: 1px;
    }}

    .compare-table tr:hover td {{
      background: rgba(139, 92, 246, 0.05);
    }}

    /* Calculator */
    .calc-box {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }}

    .calc-slider {{
      width: 100%;
      accent-color: var(--cyan);
      margin: 16px 0;
    }}

    /* Accordion */
    .faq-grid {{
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 32px;
    }}

    .faq-item {{
      cursor: pointer;
      transition: all 0.3s ease;
    }}

    .faq-title {{
      font-family: var(--font-heading);
      font-size: 1rem;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .faq-content {{
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.4s ease;
      color: var(--text-dim);
      font-size: 0.9rem;
    }}

    .faq-item.open .faq-content {{
      max-height: 200px;
      padding-top: 12px;
    }}

    .faq-item.open .faq-icon {{
      transform: rotate(45deg);
      color: var(--cyan);
    }}

    @media (max-width: 992px) {{
      .pricing-grid {{
        grid-template-columns: 1fr;
      }}
      .tier-card.featured {{
        transform: none;
      }}
      .calc-box {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="nav">
    {logo_svg}
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="offers.html" class="nav-link active">Offers</a></li>
      <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
      <li><a href="profile.html" class="nav-link">Profile</a></li>
    </ul>
    <div class="nav-actions">
      <a href="leaderboard.html" class="btn-primary">Enter Arena</a>
      <button class="mobile-toggle" aria-label="Toggle Menu">☰</button>
    </div>
  </nav>

  <!-- OFFERS HEADER SECTION -->
  <section class="section" style="padding-top: 130px;">
    <canvas id="particles-offers" class="particle-canvas"></canvas>
    
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 class="section-title reveal">Trading Arena Offers</h1>
      <p class="section-subtitle reveal" style="margin: 0 auto;">
        Unlock maximum tournament access, Rex AI market analytics, and instant cash rebate multipliers.
      </p>
    </div>

    <!-- TIER CARDS -->
    <div class="pricing-grid">
      <!-- BRONZE TIER -->
      <div class="holo-panel tier-card tilt-3d float reveal" style="animation-delay: 0s;">
        <div>
          <span class="badge badge-bronze">BRONZE ARENA</span>
          <div class="tier-price">$0 <span>/ month</span></div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Essential tier for rookie competitive traders.</p>
          <ul class="tier-features">
            <li><span class="feature-check">✓</span> Public Tournaments (2/mo)</li>
            <li><span class="feature-check">✓</span> Basic Leaderboard Tracking</li>
            <li><span class="feature-check">✓</span> Community Discord Access</li>
            <li><span class="feature-check">✓</span> Standard Rebate Rate (10%)</li>
            <li><span class="feature-x">✗ Rex AI Basic Analysis</span></li>
            <li><span class="feature-x">✗ Private Arena Access</span></li>
          </ul>
        </div>
        <a href="#" class="btn-ghost btn-full">Start Free</a>
      </div>

      <!-- SILVER TIER (FEATURED) -->
      <div class="holo-panel tier-card featured tilt-3d float reveal" style="animation-delay: 0.3s;">
        <span class="popular-tag">MOST POPULAR</span>
        <div>
          <span class="badge badge-cyan">SILVER ARENA</span>
          <div class="tier-price">$29 <span>/ month</span></div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Enhanced power & analytics for dedicated scalp traders.</p>
          <ul class="tier-features">
            <li><span class="feature-check">✓</span> Priority Tournaments (6/mo)</li>
            <li><span class="feature-check">✓</span> Enhanced Rebate Rate (15%)</li>
            <li><span class="feature-check">✓</span> Rex AI Basic Signal Suite</li>
            <li><span class="feature-check">✓</span> Advanced Leaderboard Analytics</li>
            <li><span class="feature-check">✓</span> V.I.P Discord Lounge</li>
            <li><span class="feature-x">✗ Private Arena Access</span></li>
          </ul>
        </div>
        <a href="#" class="btn-primary btn-full">Go Silver</a>
      </div>

      <!-- GOLD TIER -->
      <div class="holo-panel tier-card tilt-3d float reveal" style="animation-delay: 0.6s;">
        <div>
          <span class="badge badge-gold">GOLD ELITE</span>
          <div class="tier-price">$79 <span>/ month</span></div>
          <p style="color: var(--text-dim); font-size: 0.85rem;">Unrestricted dominance for high-volume institutional pros.</p>
          <ul class="tier-features">
            <li><span class="feature-check">✓</span> UNLIMITED Tournaments</li>
            <li><span class="feature-check">✓</span> Maximum Rebate Rate (25%)</li>
            <li><span class="feature-check">✓</span> Full Rex AI Master Suite</li>
            <li><span class="feature-check">✓</span> Private Arena Access Keys</li>
            <li><span class="feature-check">✓</span> Custom Automated Strategies</li>
            <li><span class="feature-check">✓</span> Priority Instant Payouts</li>
          </ul>
        </div>
        <a href="#" class="btn-primary btn-full">Go Gold</a>
      </div>
    </div>
  </section>

  <!-- FEATURE COMPARISON TABLE -->
  <section class="section">
    <h2 class="section-title reveal">Feature Comparison Table</h2>
    <p class="section-subtitle reveal">Detailed breakdown of privileges across membership tiers.</p>

    <div class="glass compare-table-wrap reveal">
      <table class="compare-table">
        <thead>
          <tr>
            <th>Platform Feature</th>
            <th>Bronze (Free)</th>
            <th>Silver ($29/mo)</th>
            <th>Gold ($79/mo)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Monthly Tournament Access</strong></td>
            <td>2 / month</td>
            <td>6 / month</td>
            <td><span style="color: var(--cyan-bright); font-weight: bold;">UNLIMITED</span></td>
          </tr>
          <tr>
            <td><strong>Rebate Rate</strong></td>
            <td>10%</td>
            <td>15%</td>
            <td><span style="color: var(--cyan-bright); font-weight: bold;">25%</span></td>
          </tr>
          <tr>
            <td><strong>Rex AI Signal Analytics</strong></td>
            <td><span class="feature-x">✗ None</span></td>
            <td>✓ Basic Engine</td>
            <td><span style="color: var(--violet-bright); font-weight: bold;">✓ Full Neural Suite</span></td>
          </tr>
          <tr>
            <td><strong>Leaderboard Stats Depth</strong></td>
            <td>Basic</td>
            <td>Advanced</td>
            <td>Pro Deep Metrics</td>
          </tr>
          <tr>
            <td><strong>Discord Access</strong></td>
            <td>Public Hub</td>
            <td>V.I.P Lounge</td>
            <td>Elite Mastermind</td>
          </tr>
          <tr>
            <td><strong>Payout Processing Speed</strong></td>
            <td>48 Hours</td>
            <td>12 Hours</td>
            <td><span style="color: #22c55e; font-weight: bold;">Instant (1h)</span></td>
          </tr>
          <tr>
            <td><strong>Custom Strategy Backtests</strong></td>
            <td><span class="feature-x">✗</span></td>
            <td><span class="feature-x">✗</span></td>
            <td>✓ Included</td>
          </tr>
          <tr>
            <td><strong>Private Arena Keys</strong></td>
            <td><span class="feature-x">✗</span></td>
            <td><span class="feature-x">✗</span></td>
            <td>✓ Full Access</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- REBATE CALCULATOR -->
  <section class="section">
    <h2 class="section-title reveal">Instant Rebate Calculator</h2>
    <p class="section-subtitle reveal">Estimate your monthly cashback based on volume and tier selection.</p>

    <div class="glass calc-box reveal">
      <div>
        <label style="font-family: var(--font-heading); font-size: 0.9rem; color: #fff;">
          Monthly Trading Volume: <span id="vol-display" style="color: var(--cyan-bright); font-family: var(--font-mono); font-size: 1.2rem;">$250,000</span>
        </label>
        <input type="range" id="vol-slider" class="calc-slider" min="10000" max="2000000" step="10000" value="250000">

        <div style="margin-top: 20px;">
          <label style="font-family: var(--font-heading); font-size: 0.9rem; color: #fff; display: block; margin-bottom: 10px;">
            Select Arena Tier:
          </label>
          <div style="display: flex; gap: 12px;">
            <button class="btn-ghost tier-btn" data-rate="0.10" style="flex: 1;">Bronze (10%)</button>
            <button class="btn-ghost tier-btn active" data-rate="0.15" style="flex: 1; border-color: var(--cyan);">Silver (15%)</button>
            <button class="btn-ghost tier-btn" data-rate="0.25" style="flex: 1;">Gold (25%)</button>
          </div>
        </div>
      </div>

      <div class="holo-panel" style="text-align: center; padding: 24px;">
        <div style="color: var(--text-dim); font-size: 0.85rem; text-transform: uppercase;">Estimated Monthly Cashback</div>
        <div id="rebate-result" style="font-family: var(--font-mono); font-weight: 900; font-size: 2.8rem; color: var(--cyan-bright); margin: 12px 0;">$375.00</div>
        <p style="color: var(--text-dim); font-size: 0.8rem;">
          Annual Projection: <span id="annual-result" style="color: var(--violet-bright); font-weight: bold;">$4,500.00 / yr</span>
        </p>
      </div>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section class="section">
    <h2 class="section-title reveal">Frequently Asked Questions</h2>
    <p class="section-subtitle reveal">Everything you need to know about Vortex FX membership.</p>

    <div class="faq-grid">
      <div class="glass faq-item reveal">
        <div class="faq-title">
          <span>How do rebates work?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-content">
          Rebates are automatically calculated based on your monthly trading volume and credited directly to your Vortex wallet on the 1st of every month in USDC or USD.
        </div>
      </div>

      <div class="glass faq-item reveal">
        <div class="faq-title">
          <span>Can I upgrade or downgrade anytime?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-content">
          Yes, switch tiers at any point. Upgrades take effect immediately with prorated pricing, while downgrades apply smoothly at the end of your billing cycle.
        </div>
      </div>

      <div class="glass faq-item reveal">
        <div class="faq-title">
          <span>What payment methods are accepted?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-content">
          We accept Credit/Debit cards (Visa, Mastercard, AMEX), Crypto (BTC, ETH, USDT, USDC), and direct wire transfers for Gold tier accounts.
        </div>
      </div>

      <div class="glass faq-item reveal">
        <div class="faq-title">
          <span>Are tournaments real or simulated?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-content">
          We host both simulated paper-trading tournaments (zero risk) and live funded account tournaments with cash prize pools exceeding $50,000.
        </div>
      </div>

      <div class="glass faq-item reveal">
        <div class="faq-title">
          <span>How are tournament winners determined?</span>
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-content">
          Traders are ranked by net percentage return on investment (ROI) during the event, with drawdown safeguards enforced by smart contracts.
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="section" style="text-align: center;">
    <div class="holo-panel reveal" style="padding: 48px;">
      <h2 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin-bottom: 12px;">Ready to Start Competing?</h2>
      <p style="color: var(--text-dim); max-width: 500px; margin: 0 auto 24px;">
        Join thousands of cyber traders battling for supremacy and cash prize pools.
      </p>
      <a href="leaderboard.html" class="btn-primary" style="padding: 14px 36px; font-size: 1rem;">Join Now</a>
    </div>
  </section>

  <!-- FOOTER -->
  {footer_html}

  {get_particle_script('particles-offers')}

  <!-- OFFERS PAGE JS LOGIC -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      // Rebate Calculator Logic
      const slider = document.getElementById('vol-slider');
      const volDisplay = document.getElementById('vol-display');
      const rebateResult = document.getElementById('rebate-result');
      const annualResult = document.getElementById('annual-result');
      const tierBtns = document.querySelectorAll('.tier-btn');
      let currentRate = 0.15;

      function updateCalc() {{
        const vol = parseFloat(slider.value);
        volDisplay.textContent = '$' + vol.toLocaleString();
        const monthly = (vol * 0.01) * currentRate; // 1% spread * tier rate
        const annual = monthly * 12;
        rebateResult.textContent = '$' + monthly.toFixed(2);
        annualResult.textContent = '$' + annual.toFixed(2) + ' / yr';
      }}

      if (slider) slider.addEventListener('input', updateCalc);

      tierBtns.forEach(btn => {{
        btn.addEventListener('click', () => {{
          tierBtns.forEach(b => {{
            b.classList.remove('active');
            b.style.borderColor = 'var(--border)';
          }});
          btn.classList.add('active');
          btn.style.borderColor = 'var(--cyan)';
          currentRate = parseFloat(btn.dataset.rate);
          updateCalc();
        }});
      }});

      // FAQ Accordion Toggle
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {{
        item.addEventListener('click', () => {{
          const isOpen = item.classList.contains('open');
          faqItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        }});
      }});
    }});
  </script>
</body>
</html>
"""

# Save offers.html
with open('vortex-fx/offers.html', 'w', encoding='utf-8') as f:
    f.write(offers_content)

print("Created vortex-fx/offers.html successfully.")

# =============================================================================
# FILE 3: LEADERBOARD-ALT.HTML
# =============================================================================

leaderboard_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tournament Leaderboard | VORTEX FX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/main.js" defer></script>
  {common_styles}
  <style>
    /* Leaderboard Page Specific Styles */
    .podium-grid {{
      display: grid;
      grid-template-columns: 1fr 1.15fr 1fr;
      gap: 24px;
      align-items: flex-end;
      margin-top: 32px;
    }}

    .podium-card {{
      text-align: center;
      padding: 32px 20px;
      position: relative;
    }}

    .podium-card.rank-1 {{
      border-color: #eab308;
      box-shadow: 0 0 35px rgba(234, 179, 8, 0.3);
      padding-bottom: 48px;
    }}

    .podium-rank-tag {{
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      font-family: var(--font-heading);
      font-weight: 900;
      font-size: 0.85rem;
      padding: 4px 16px;
      border-radius: 20px;
    }}

    /* Ranking Table Layout */
    .leaderboard-layout {{
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 32px;
      margin-top: 40px;
    }}

    .rank-table {{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }}

    .rank-table th, .rank-table td {{
      padding: 14px 18px;
      border-bottom: 1px solid rgba(139, 92, 246, 0.15);
      font-size: 0.9rem;
    }}

    .rank-table th {{
      font-family: var(--font-heading);
      color: var(--text-dim);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}

    .rank-table tr {{
      transition: all 0.25s ease;
    }}

    .rank-table tr:hover {{
      background: rgba(139, 92, 246, 0.1);
      transform: translateX(4px);
    }}

    .tab-btn {{
      padding: 8px 20px;
      border-radius: 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border);
      color: var(--text-dim);
      font-family: var(--font-heading);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }}

    .tab-btn.active {{
      background: var(--violet);
      color: #fff;
      border-color: var(--violet-bright);
      box-shadow: 0 0 15px var(--glow);
    }}

    /* Countdown Display */
    .countdown-timer {{
      display: flex;
      justify-content: center;
      gap: 12px;
      font-family: var(--font-mono);
      margin: 16px 0;
    }}

    .timer-block {{
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border);
      padding: 8px 12px;
      border-radius: 6px;
      text-align: center;
      min-width: 50px;
    }}

    .timer-num {{
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--cyan-bright);
    }}

    .timer-lbl {{
      font-size: 0.6rem;
      color: var(--text-dim);
    }}

    @media (max-width: 992px) {{
      .podium-grid {{
        grid-template-columns: 1fr;
        align-items: stretch;
      }}
      .leaderboard-layout {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="nav">
    {logo_svg}
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="offers.html" class="nav-link">Offers</a></li>
      <li><a href="leaderboard.html" class="nav-link active">Leaderboard</a></li>
      <li><a href="profile.html" class="nav-link">Profile</a></li>
    </ul>
    <div class="nav-actions">
      <a href="leaderboard.html" class="btn-primary">Enter Arena</a>
      <button class="mobile-toggle" aria-label="Toggle Menu">☰</button>
    </div>
  </nav>

  <!-- LEADERBOARD HEADER SECTION -->
  <section class="section" style="padding-top: 130px;">
    <canvas id="particles-leaderboard" class="particle-canvas"></canvas>

    <div style="text-align: center; margin-bottom: 24px;">
      <h1 class="section-title reveal">Tournament Leaderboard</h1>
      <p class="section-subtitle reveal" style="margin: 0 auto 24px;">
        Live competitive combat standings for Summer Showdown 2026. $50,000 Cash Prize Pool.
      </p>

      <!-- Filter Tabs -->
      <div style="display: flex; justify-content: center; gap: 12px;" class="reveal">
        <button class="tab-btn active" data-tab="current">CURRENT SHOWDOWN</button>
        <button class="tab-btn" data-tab="previous">PREVIOUS TOURNAMENT</button>
        <button class="tab-btn" data-tab="alltime">ALL-TIME LEGENDS</button>
      </div>
    </div>

    <!-- TOP 3 PODIUM -->
    <div class="podium-grid">
      <!-- #2 PODIUM -->
      <div class="holo-panel podium-card tilt-3d float reveal" style="animation-delay: 0.3s;">
        <span class="podium-rank-tag badge-silver">#2 SILVER</span>
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🥈</div>
        <h3 class="glitch-text" style="color: #fff; font-size: 1.2rem;" data-text="NeonSniper">NeonSniper</h3>
        <div style="font-family: var(--font-mono); font-size: 1.6rem; color: var(--cyan-bright); margin: 8px 0;" data-ticker="+98.4%">+98.4%</div>
        <div style="font-size: 0.8rem; color: var(--text-dim);">Win Rate: 71% • 52 Trades</div>
      </div>

      <!-- #1 PODIUM (CENTER & ELEVATED) -->
      <div class="holo-panel podium-card rank-1 tilt-3d float reveal" style="animation-delay: 0s;">
        <span class="podium-rank-tag badge-gold">👑 #1 CHAMPION</span>
        <div style="font-size: 3.2rem; margin-bottom: 8px;">🏆</div>
        <h3 class="glitch-text" style="color: #fff; font-size: 1.5rem;" data-text="VoidMaster">VoidMaster</h3>
        <div style="font-family: var(--font-mono); font-size: 2.2rem; color: #fde047; margin: 8px 0;" data-ticker="+156.2%">+156.2%</div>
        <div style="font-size: 0.85rem; color: var(--text-dim);">Win Rate: 82% • 47 Trades</div>
      </div>

      <!-- #3 PODIUM -->
      <div class="holo-panel podium-card tilt-3d float reveal" style="animation-delay: 0.6s;">
        <span class="podium-rank-tag badge-bronze">#3 BRONZE</span>
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🥉</div>
        <h3 class="glitch-text" style="color: #fff; font-size: 1.2rem;" data-text="QuantumKnight">QuantumKnight</h3>
        <div style="font-family: var(--font-mono); font-size: 1.6rem; color: var(--violet-bright); margin: 8px 0;" data-ticker="+76.1%">+76.1%</div>
        <div style="font-size: 0.8rem; color: var(--text-dim);">Win Rate: 69% • 38 Trades</div>
      </div>
    </div>
  </section>

  <!-- MAIN LEADERBOARD LAYOUT -->
  <section class="section">
    <div class="leaderboard-layout">
      <!-- LEFT: FULL RANKING TABLE -->
      <div class="glass reveal" style="overflow-x: auto;">
        <table class="rank-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Trader</th>
              <th>Profit %</th>
              <th>Win Rate</th>
              <th>Trades</th>
              <th>Streak</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-gold">#1</span></td>
              <td><strong style="color: #fff;">VoidMaster</strong></td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+156.2%">+156.2%</td>
              <td style="font-family: var(--font-mono);">82%</td>
              <td>47</td>
              <td style="font-family: var(--font-mono); color: var(--cyan-bright);">12W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td><span class="badge badge-silver">#2</span></td>
              <td><strong style="color: #fff;">NeonSniper</strong></td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+98.4%">+98.4%</td>
              <td style="font-family: var(--font-mono);">71%</td>
              <td>52</td>
              <td style="font-family: var(--font-mono); color: var(--cyan-bright);">8W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td><span class="badge badge-bronze">#3</span></td>
              <td><strong style="color: #fff;">QuantumKnight</strong></td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+76.1%">+76.1%</td>
              <td style="font-family: var(--font-mono);">69%</td>
              <td>38</td>
              <td style="font-family: var(--font-mono); color: var(--cyan-bright);">5W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#4</td>
              <td>CyberViper</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+64.5%">+64.5%</td>
              <td style="font-family: var(--font-mono);">65%</td>
              <td>61</td>
              <td style="font-family: var(--font-mono);">4W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#5</td>
              <td>NovaTrader</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+58.9%">+58.9%</td>
              <td style="font-family: var(--font-mono);">63%</td>
              <td>44</td>
              <td style="font-family: var(--font-mono);">3W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#6</td>
              <td>ZeroCool</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+52.1%">+52.1%</td>
              <td style="font-family: var(--font-mono);">60%</td>
              <td>89</td>
              <td style="font-family: var(--font-mono);">2W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#7</td>
              <td>AeroTrader</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+47.3%">+47.3%</td>
              <td style="font-family: var(--font-mono);">58%</td>
              <td>35</td>
              <td style="font-family: var(--font-mono);">1W</td>
              <td><span style="color: #ef4444;">● OUT</span></td>
            </tr>
            <tr>
              <td>#8</td>
              <td>ShadowScalp</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+41.8%">+41.8%</td>
              <td style="font-family: var(--font-mono);">57%</td>
              <td>72</td>
              <td style="font-family: var(--font-mono);">4W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#9</td>
              <td>PulseX</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+39.2%">+39.2%</td>
              <td style="font-family: var(--font-mono);">55%</td>
              <td>40</td>
              <td style="font-family: var(--font-mono);">2W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#10</td>
              <td>VortexKing</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+35.0%">+35.0%</td>
              <td style="font-family: var(--font-mono);">54%</td>
              <td>53</td>
              <td style="font-family: var(--font-mono);">1W</td>
              <td><span style="color: #ef4444;">● OUT</span></td>
            </tr>
            <tr>
              <td>#11</td>
              <td>Hyperion9</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+31.4%">+31.4%</td>
              <td style="font-family: var(--font-mono);">52%</td>
              <td>29</td>
              <td style="font-family: var(--font-mono);">3W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#12</td>
              <td>SynthWave</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+28.7%">+28.7%</td>
              <td style="font-family: var(--font-mono);">51%</td>
              <td>66</td>
              <td style="font-family: var(--font-mono);">1W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#13</td>
              <td>ByteRider</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+24.1%">+24.1%</td>
              <td style="font-family: var(--font-mono);">49%</td>
              <td>81</td>
              <td style="font-family: var(--font-mono);">2W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
            <tr>
              <td>#14</td>
              <td>DarkAura</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+19.8%">+19.8%</td>
              <td style="font-family: var(--font-mono);">48%</td>
              <td>33</td>
              <td style="font-family: var(--font-mono);">1W</td>
              <td><span style="color: #ef4444;">● OUT</span></td>
            </tr>
            <tr>
              <td>#15</td>
              <td>FluxTrader</td>
              <td style="font-family: var(--font-mono); color: #22c55e;" data-ticker="+15.3%">+15.3%</td>
              <td style="font-family: var(--font-mono);">46%</td>
              <td>42</td>
              <td style="font-family: var(--font-mono);">1W</td>
              <td><span style="color: #22c55e;">● LIVE</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- RIGHT: SIDEBAR & PRIZE INFO -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Tournament Info Sidebar -->
        <div class="holo-panel reveal">
          <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 12px;">
            Summer Showdown 2026
          </h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">TOTAL PRIZE POOL</div>
              <div style="font-family: var(--font-mono); font-size: 1.8rem; color: var(--cyan-bright);" data-count="50000" data-prefix="$">$50,000</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">ACTIVE PARTICIPANTS</div>
              <div style="font-family: var(--font-mono); font-size: 1.4rem; color: #fff;" data-count="247">247</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">TIME REMAINING</div>
              <div class="countdown-timer">
                <div class="timer-block"><div class="timer-num" id="cd-days">02</div><div class="timer-lbl">DAYS</div></div>
                <div class="timer-block"><div class="timer-num" id="cd-hours">14</div><div class="timer-lbl">HRS</div></div>
                <div class="timer-block"><div class="timer-num" id="cd-mins">38</div><div class="timer-lbl">MINS</div></div>
                <div class="timer-block"><div class="timer-num" id="cd-secs">45</div><div class="timer-lbl">SECS</div></div>
              </div>
            </div>
            <div style="padding-top: 12px; border-top: 1px solid var(--border);">
              <div style="font-size: 0.75rem; color: var(--text-dim);">YOUR STANDING</div>
              <div style="font-family: var(--font-mono); font-size: 1.2rem; color: var(--violet-bright);">
                #42 (Top 17%)
              </div>
            </div>
          </div>
        </div>

        <!-- Prize Distribution Cards -->
        <div class="glass reveal">
          <h4 style="font-family: var(--font-heading); font-size: 0.95rem; color: #fff; margin-bottom: 16px;">Prize Pool Split</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.3); border-radius: 8px;">
              <span>🥇 1st Place</span>
              <strong style="font-family: var(--font-mono); color: #fde047;">$25,000 + Title</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(148,163,184,0.1); border: 1px solid rgba(148,163,184,0.3); border-radius: 8px;">
              <span>🥈 2nd Place</span>
              <strong style="font-family: var(--font-mono); color: #e2e8f0;">$15,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(217,119,6,0.1); border: 1px solid rgba(217,119,6,0.3); border-radius: 8px;">
              <span>🥉 3rd Place</span>
              <strong style="font-family: var(--font-mono); color: #fdba74;">$10,000</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="section" style="text-align: center;">
    <div class="holo-panel reveal" style="padding: 40px;">
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: #fff; margin-bottom: 12px;">Climb the Rankings</h2>
      <p style="color: var(--text-dim); margin-bottom: 20px;">Join the next tournament wave starting in 48 hours.</p>
      <a href="#" class="btn-primary" style="padding: 12px 32px;">Join Next Tournament</a>
    </div>
  </section>

  <!-- FOOTER -->
  {footer_html}

  {get_particle_script('particles-leaderboard')}

  <!-- LEADERBOARD LIVE COUNTDOWN & TAB JS -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      // Live Countdown Timer
      let totalSeconds = 2 * 86400 + 14 * 3600 + 38 * 60 + 45;
      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-mins');
      const sEl = document.getElementById('cd-secs');

      setInterval(() => {{
        if (totalSeconds > 0) totalSeconds--;
        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        if (dEl) dEl.textContent = String(d).padStart(2, '0');
        if (hEl) hEl.textContent = String(h).padStart(2, '0');
        if (mEl) mEl.textContent = String(m).padStart(2, '0');
        if (sEl) sEl.textContent = String(s).padStart(2, '0');
      }}, 1000);

      // Tab Switcher
      const tabBtns = document.querySelectorAll('.tab-btn');
      tabBtns.forEach(btn => {{
        btn.addEventListener('click', () => {{
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }});
      }});
    }});
  </script>
</body>
</html>
"""

# Save leaderboard-alt.html
with open('vortex-fx/leaderboard-alt.html', 'w', encoding='utf-8') as f:
    f.write(leaderboard_content)

print("Created vortex-fx/leaderboard-alt.html successfully.")
