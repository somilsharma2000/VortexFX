import re

with open('vortex-fx/index.html', 'r') as f:
    content = f.read()

# === 1. REPLACE HERO CSS ===
old_css_marker = "    .brand-logo {"
new_css_marker = "    /* 1. SOCIAL PROOF BAR */"

start_idx = content.find(old_css_marker)
end_idx = content.find(new_css_marker)

if start_idx == -1 or end_idx == -1:
    print("ERROR: Could not find hero CSS block")
    print(f"start_idx={start_idx}, end_idx={end_idx}")
    exit(1)

new_hero_css = """    .brand-logo {
      width: 80px;
      height: 80px;
      filter: drop-shadow(0 0 20px rgba(234, 202, 122, 0.3)) drop-shadow(0 0 60px rgba(234, 202, 122, 0.12));
      animation: logo-glow 4s ease-in-out infinite;
      transition: transform 0.3s ease;
    }
    .brand-logo:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 30px rgba(234, 202, 122, 0.45)) drop-shadow(0 0 80px rgba(234, 202, 122, 0.18));
    }
    @keyframes logo-glow {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(234, 202, 122, 0.2)); }
      50% { filter: drop-shadow(0 0 24px rgba(234, 202, 122, 0.5)); }
    }

    .hero-headline {
      font-size: clamp(32px, 6vw, 64px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.08;
      color: #FFFFFF;
      max-width: 800px;
      margin: 0 auto;
    }
    .hero-headline .gold {
      background: linear-gradient(135deg, #EACA7A 0%, #D4AF37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-sub {
      font-size: clamp(15px, 1.8vw, 18px);
      font-weight: 400;
      color: #E2E8F0;
      max-width: 580px;
      margin: 16px auto 0;
      line-height: 1.5;
    }
    .hero-sub .gold { color: #EACA7A; font-weight: 600; }

    /* INLINE EMAIL CAPTURE */
    .hero-cta-row {
      display: flex;
      gap: 0;
      max-width: 520px;
      margin: 28px auto 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(234, 202, 122, 0.12), 0 4px 24px rgba(0,0,0,0.4);
    }
    .hero-email-input {
      flex: 1;
      padding: 16px 20px;
      background: rgba(10, 11, 15, 0.8);
      border: 1px solid rgba(234, 202, 122, 0.2);
      border-right: none;
      color: #E2E8F0;
      font-size: 15px;
      font-family: inherit;
      outline: none;
      border-radius: 12px 0 0 12px;
      backdrop-filter: blur(8px);
      transition: border-color 0.3s;
    }
    .hero-email-input::placeholder { color: #64748B; }
    .hero-email-input:focus { border-color: rgba(234, 202, 122, 0.5); }
    .hero-cta-btn {
      padding: 16px 28px;
      background: linear-gradient(135deg, #EACA7A, #D4AF37);
      color: #06070A;
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 0 12px 12px 0;
      transition: all 0.3s;
    }
    .hero-cta-btn:hover {
      filter: brightness(1.1);
      box-shadow: 0 0 24px rgba(234, 202, 122, 0.3);
    }

    /* GLASSMORPHISM STATS BAR */
    .hero-stats {
      display: flex;
      gap: 0;
      max-width: 680px;
      margin: 24px auto 0;
      padding: 18px 28px;
      background: rgba(10, 11, 15, 0.6);
      border: 1px solid rgba(234, 202, 122, 0.15);
      border-radius: 16px;
      backdrop-filter: blur(16px);
      box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 0 20px rgba(234, 202, 122, 0.03);
    }
    .hero-stat {
      flex: 1;
      text-align: center;
      position: relative;
    }
    .hero-stat:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(234, 202, 122, 0.12);
    }
    .hero-stat-num {
      font-size: clamp(22px, 2.5vw, 32px);
      font-weight: 700;
      color: #FFFFFF;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .hero-stat-num.gold { color: #EACA7A; }
    .hero-stat-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #94A3B8;
      margin-top: 6px;
    }

    /* COMPACT COUNTDOWN */
    .hero-countdown {
      display: flex;
      gap: clamp(16px, 3vw, 28px);
      margin: 20px 0 0;
    }
    .hero-count-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero-count-num {
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 300;
      color: #FFFFFF;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em;
      line-height: 1;
    }
    .hero-count-label {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #94A3B8;
      margin-top: 4px;
    }

    /* LIVE PULSE DOT */
    .live-pulse {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #E2E8F0;
      margin-top: 16px;
    }
    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ADE80;
      animation: live-pulse 2s infinite;
    }
    @keyframes live-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
      50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
    }
    .live-pulse .gold { color: #EACA7A; font-weight: 600; }

    .scroll-hint {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #64748B;
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.3; }
      50% { transform: translateX(-50%) translateY(8px); opacity: 0.8; }
    }

    """

content = content[:start_idx] + new_hero_css + content[end_idx:]

# === 2. REPLACE HERO HTML ===
old_hero_marker = "<!-- STEALTH HERO -->"
new_hero_marker = "<!-- 1. SOCIAL PROOF BAR"

start_idx = content.find(old_hero_marker)
end_idx = content.find(new_hero_marker)

if start_idx == -1 or end_idx == -1:
    print("ERROR: Could not find hero HTML block")
    exit(1)

new_hero_html = """  <!-- HIGH-CONVERSION HERO -->
  <section class="stealth-hero" data-shape="galaxy" style="padding-top: 100px; padding-bottom: 40px; min-height: 100vh;">

    <!-- BRAND LOGO -->
    <div style="margin-bottom: 20px;">
      <img src="assets/fortrex-icon-512.png" alt="FORTREX" class="brand-logo">
    </div>

    <!-- SEAL BADGE -->
    <div class="seal-badge" style="margin-bottom: 20px;">
      <span>Gates Open August 23</span>
    </div>

    <!-- HEADLINE -->
    <h1 class="hero-headline">
      Master the Charts.<br>
      Reclaim Your <span class="gold">Throne.</span>
    </h1>

    <!-- SUBHEADLINE -->
    <p class="hero-sub">
      The competitive arena where <span class="gold">skill meets real rewards.</span><br>
      No subscriptions. No fees. No catch.
    </p>

    <!-- INLINE EMAIL CAPTURE -->
    <form class="hero-cta-row" onsubmit="joinWaitlist(event)">
      <input type="email" class="hero-email-input" placeholder="your@email.com" required>
      <button type="submit" class="hero-cta-btn">Join Waitlist</button>
    </form>

    <!-- GLASSMORPHISM STATS BAR -->
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hero-stat-num gold">0<span style="font-size: 0.6em; opacity: 0.7;"> / 2,500</span></div>
        <div class="hero-stat-label">Genesis Spots</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">50K</div>
        <div class="hero-stat-label">Prize Pool (REX)</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">847</div>
        <div class="hero-stat-label">On Waitlist</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-num">Bi-Weekly</div>
        <div class="hero-stat-label">Tournaments</div>
      </div>
    </div>

    <!-- COMPACT COUNTDOWN -->
    <div class="hero-countdown" id="countdown">
      <div class="hero-count-unit">
        <div class="hero-count-num" id="cd-days">--</div>
        <div class="hero-count-label">Days</div>
      </div>
      <div class="hero-count-unit">
        <div class="hero-count-num" id="cd-hours">--</div>
        <div class="hero-count-label">Hours</div>
      </div>
      <div class="hero-count-unit">
        <div class="hero-count-num" id="cd-mins">--</div>
        <div class="hero-count-label">Minutes</div>
      </div>
      <div class="hero-count-unit">
        <div class="hero-count-num" id="cd-secs">--</div>
        <div class="hero-count-label">Seconds</div>
      </div>
    </div>

    <!-- LIVE PULSE -->
    <div class="live-pulse">
      <span class="live-pulse-dot"></span>
      <span><span class="gold">847</span> traders waiting &middot; <span class="gold">0</span> / 2,500 Genesis spots claimed</span>
    </div>

    <div class="scroll-hint">Scroll</div>
  </section>

  """

content = content[:start_idx] + new_hero_html + content[end_idx:]

# === 3. REMOVE OLD SOCIAL PROOF SECTION ===
old_social_marker = "<!-- 1. SOCIAL PROOF BAR (right after hero section, before cryptic hints) -->"
old_cryptic_marker = "<!-- CRYPTIC HINTS"

start_idx = content.find(old_social_marker)
end_idx = content.find(old_cryptic_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# === 4. CONDENSE CRYPTIC HINTS ===
old_genesis_marker = "<!-- 2. GENESIS TRADER PROGRAM"

start_idx = content.find(old_cryptic_marker)
end_idx = content.find(old_genesis_marker)

if start_idx != -1 and end_idx != -1:
    new_cryptic = """  <!-- COMPACT VALUE PROPOSITION -->
  <section class="cryptic-section reveal" data-shape="spiral" style="padding: 40px 24px; text-align: center;">
    <div class="cryptic-line" style="font-size: clamp(18px, 3vw, 28px); font-weight: 300; color: #E2E8F0; line-height: 1.5; max-width: 720px; margin: 0 auto;">
      You watch the charts. You take the trades. You manage the risk.<br>
      But nobody sees your skill &mdash; <span class="gold">until now.</span>
    </div>
  </section>

  """
    content = content[:start_idx] + new_cryptic + content[end_idx:]

# === 5. Fix joinWaitlist function ===
old_func_marker = "function joinWaitlist(e) {"
old_animate_marker = "function animateWaitlist() {"

start_idx = content.find(old_func_marker)
end_idx = content.find(old_animate_marker)

if start_idx != -1 and end_idx != -1:
    new_func = """function joinWaitlist(e) {
      if (e) e.preventDefault();
      const form = e ? e.target : null;
      const emailInput = form ? form.querySelector('input[type="email"]') : null;
      const email = emailInput ? emailInput.value : '';
      if (!email) {
        window.location.href = 'signin.html';
        return;
      }

      // Submit to waitlist backend
      if (window.FORTREX_AUTH && typeof FORTREX_AUTH.callFunction === 'function') {
        try {
          FORTREX_AUTH.callFunction('joinWaitlist', { email: email, source: 'landing_hero' });
        } catch(err) {}
      }

      // Visual feedback
      const btn = form ? form.querySelector('.hero-cta-btn') : null;
      if (btn) {
        btn.textContent = "\\u2713 You're In!";
        btn.style.background = 'linear-gradient(135deg, #4ADE80, #22C55E)';
        btn.style.color = '#06070A';
      }
      if (emailInput) {
        emailInput.value = '';
        emailInput.placeholder = 'Welcome to FORTREX. Check your email.';
      }

      // Increment counter
      currentCount++;
      const wc = document.getElementById('waitlist-count');
      if (wc) wc.textContent = currentCount.toLocaleString();
      const fill = document.querySelector('.waitlist-fill');
      if (fill) fill.style.width = Math.min((currentCount / 2500) * 100, 100) + '%';

      // Redirect after delay
      setTimeout(function() { window.location.href = 'signin.html'; }, 1500);
    }

    """
    content = content[:start_idx] + new_func + content[end_idx:]

with open('vortex-fx/index.html', 'w') as f:
    f.write(content)

print("DONE: Hero redesigned successfully")
