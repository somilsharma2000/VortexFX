part1 = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Trading Tools & Calculators — FORTREX</title>
  <meta name="description" content="Eight free forex, metals, and crypto trading calculators. Pip value, lot size, margin, P&L, position size, risk/reward, compounding simulator, and drawdown recovery. Zero fees, instant results.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/dala.css?v=5">
  <script src="js/dala.js"></script>
  <script src="js/auth.js"></script>

  <style>
    /* DESIGN SYSTEM OVERRIDES & EXTENSIONS */
    body {
      background-color: #06070A;
      color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
    }

    .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }

    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    /* NAV LOGO & LINKS CONTROL */
    .nav-internal {
      display: none; /* hidden by default for logged-out users */
    }
    body.is-logged-in .nav-internal {
      display: inline-block;
    }

    /* GOLD ACCENTS */
    .text-gold { color: #E5C158; }
    .text-purple { color: #E5C158; }

    .uppercase-label {
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 12px;
      font-weight: 600;
    }

    /* HERO BADGES */
    .hero-badge-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
    }

    .hero-badge {
      background: rgba(229, 193, 88, 0.08);
      border: 1px solid rgba(229, 193, 88, 0.25);
      color: #E5C158;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* SECTION HEADERS */
    .section-header-block {
      margin-top: 50px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(229, 193, 88, 0.15);
      padding-bottom: 16px;
    }

    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-subtitle {
      font-size: 14px;
      color: #9A9A9A;
      margin-top: 6px;
    }

    /* CARD DESIGN SYSTEM */
    .tool-card {
      background: linear-gradient(145deg, #0C0E15 0%, #121520 100%);
      border: 1px solid rgba(229, 193, 88, 0.12);
      border-radius: 16px;
      padding: 28px;
      position: relative;
      transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .tool-card:hover {
      border-color: rgba(229, 193, 88, 0.4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(229, 193, 88, 0.08);
      transform: translateY(-2px);
    }

    .tool-header {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #1E2330;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tool-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .tool-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }

    .tool-desc {
      font-size: 12px;
      color: #7A8299;
      margin-top: 4px;
      margin-bottom: 16px;
      line-height: 1.4;
    }

    .tool-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(229, 193, 88, 0.1);
      border: 1px solid rgba(229, 193, 88, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #E5C158;
      flex-shrink: 0;
    }

    .btn-reset {
      background: transparent;
      border: 1px solid rgba(229, 193, 88, 0.3);
      color: #E5C158;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
    }

    .btn-reset:hover {
      background: rgba(229, 193, 88, 0.15);
      border-color: #E5C158;
    }

    /* INPUTS & CONTROLS */
    .form-group {
      margin-bottom: 16px;
    }

    .form-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .form-label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9A9A9A;
      font-weight: 600;
      margin-bottom: 0;
    }

    .quick-lots {
      display: flex;
      gap: 4px;
    }

    .quick-lot-btn {
      background: #141822;
      border: 1px solid #242A3A;
      color: #A0AEC0;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.2s ease;
    }

    .quick-lot-btn:hover {
      background: rgba(229, 193, 88, 0.15);
      border-color: #E5C158;
      color: #E5C158;
    }

    .form-control, .form-select {
      width: 100%;
      background: #0A0C12;
      border: 1px solid #1E2330;
      border-radius: 8px;
      padding: 10px 14px;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-control:focus, .form-select:focus {
      outline: none;
      border-color: #E5C158;
      box-shadow: 0 0 12px rgba(229, 193, 88, 0.25);
      background: #0F121A;
    }

    .form-select option {
      background: #0C0E15;
      color: #ffffff;
    }

    /* RANGE SLIDERS */
    .range-slider {
      width: 100%;
      accent-color: #E5C158;
      height: 6px;
      background: #1E2330;
      border-radius: 3px;
      cursor: pointer;
    }

    /* OUTPUT PANELS */
    .output-box {
      background: rgba(6, 8, 12, 0.7);
      border: 1px solid rgba(229, 193, 88, 0.15);
      border-radius: 12px;
      padding: 18px;
      margin-top: 20px;
    }

    .output-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #181C28;
    }

    .output-row:last-child {
      border-bottom: none;
    }

    .output-label {
      font-size: 12px;
      color: #9A9A9A;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .output-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
    }

    .output-val.gold {
      color: #E5C158;
    }

    .output-val.green {
      color: #4ADE80;
    }

    .output-val.red {
      color: #F87171;
    }

    .verdict-badge {
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: inline-block;
    }

    /* TOGGLE BUTTON GROUPS */
    .toggle-group {
      display: flex;
      background: #0A0C12;
      border: 1px solid #1E2330;
      border-radius: 8px;
      padding: 3px;
      gap: 4px;
    }

    .toggle-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: #9A9A9A;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
    }

    .toggle-btn.active {
      background: #E5C158;
      color: #06070A;
    }

    /* TABLE STYLES FOR COMPOUNDING */
    .sim-table-container {
      max-height: 220px;
      overflow-y: auto;
      margin-top: 16px;
      border: 1px solid #1E2330;
      border-radius: 8px;
    }

    .sim-table-container::-webkit-scrollbar {
      width: 6px;
    }
    .sim-table-container::-webkit-scrollbar-thumb {
      background: #282E3D;
      border-radius: 3px;
    }

    .sim-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }

    .sim-table th {
      background: #0A0C12;
      color: #9A9A9A;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 8px 12px;
      position: sticky;
      top: 0;
      border-bottom: 1px solid #1E2330;
    }

    .sim-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #141822;
      font-family: 'JetBrains Mono', monospace;
    }

    /* BUTTONS */
    .btn-pill-gold {
      background: #E5C158;
      color: #06070A;
      font-weight: 700;
      padding: 14px 32px;
      border-radius: 9999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 14px;
      transition: all 0.25s ease;
      border: none;
      cursor: pointer;
    }

    .btn-pill-gold:hover {
      background: #E5C158;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(229, 193, 88, 0.35);
    }

    /* GRID LAYOUTS */
    .calc-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .calc-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    @media (max-width: 1100px) {
      .calc-grid-3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .calc-grid-2, .calc-grid-3 { grid-template-columns: 1fr; }
    }

    /* CTA SECTION */
    .cta-banner {
      background: linear-gradient(135deg, #080A10 0%, #151824 50%, #080A10 100%);
      border: 1px solid rgba(229, 193, 88, 0.3);
      border-radius: 24px;
      padding: 48px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
      margin-top: 60px;
    }

    .cta-banner::before {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(circle, rgba(229, 193, 88, 0.08) 0%, transparent 60%);
      pointer-events: none;
    }

    /* MOBILE RESPONSIVE */
    @media (max-width: 768px) {
      .nav-links { display: none; position: fixed; top: 0; right: 0; width: 280px; height: 100vh; background: #0A0B0F; flex-direction: column; padding: 100px 24px 24px; gap: 8px; z-index: 999; border-left: 1px solid rgba(229,193,88,0.15); transform: translateX(100%); transition: transform 0.3s ease; }
      .nav-links.active { display: flex; transform: translateX(0); }
      .nav-cta > a:not(.hamburger) { display: none; }
      .hamburger { display: flex !important; cursor: pointer; }
      .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      .hamburger.active span:nth-child(2) { opacity: 0; }
      .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
      .footer-content { flex-direction: column; gap: 24px; text-align: center; }
      .footer-links { flex-wrap: wrap; justify-content: center; gap: 12px !important; }
      .container { padding-left: 16px; padding-right: 16px; }
      main { padding-top: 100px !important; padding-bottom: 40px !important; }
      h1, .section-headline { font-size: 28px !important; }
      h2 { font-size: 22px !important; }
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr !important; }
      .auth-card, .card, .panel { width: 100% !important; max-width: 100% !important; }
      table { font-size: 12px; }
      .hide-mobile { display: none !important; }
    }
    @media (max-width: 480px) {
      .nav-wordmark { font-size: 16px; }
      .footer-links { gap: 8px !important; }
      h1, .section-headline { font-size: 24px !important; }
      .container { padding-left: 12px; padding-right: 12px; }
    }
  </style>

  <link rel="icon" type="image/png" sizes="32x32" href="assets/fortrex-icon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/fortrex-icon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/fortrex-icon-180.png">
  <link rel="apple-touch-icon" sizes="192x192" href="assets/fortrex-icon-512.png">
  <meta property="og:image" content="https://somilsharma2000.github.io/VortexFX/assets/fortrex-icon-512.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://somilsharma2000.github.io/VortexFX/assets/fortrex-icon-512.png">
</head>
<body>

  <canvas id="particle-canvas"></canvas>

  <!-- NAVIGATION -->
  <nav class="nav">
    <div class="nav-brand">
      <a href="index.html" class="navbar-brand">
        <div class="nav-logo"><img src="assets/fortrex-icon-nav.png" alt="FORTREX" style="width: 36px; height: 36px; object-fit: contain;"></div>
      </a>
    </div>
    <ul class="nav-links" id="nav-links-main">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="tools.html" class="nav-link active">Tools</a></li>
      <li><a href="contests.html" class="nav-link">Tournaments</a></li>
      <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
      <li><a href="rex.html" class="nav-link">REX</a></li>
      <li><a href="journal.html" class="nav-link">Journal</a></li>
      <li><a href="community.html" class="nav-link">Community</a></li>
      
      <li><a href="dashboard.html" class="nav-link nav-internal" style="display:none">Dashboard</a></li>
      <li><a href="invite.html" class="nav-link nav-internal" style="display:none">Invite</a></li>
      <li><a href="profile.html" class="nav-link nav-internal" style="display:none">Profile</a></li>
      <li><a href="checkin.html" class="nav-link nav-internal" style="display:none">Check-In</a></li>
    </ul>
    <div class="nav-cta">
      <a href="signin.html" class="nav-link" style="text-transform: uppercase;">Sign In</a>
      <a href="signin.html" class="btn-primary" style="border-radius: 9999px;">Enter Arena</a>
      <div class="hamburger" aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <main class="container" style="max-width: 1240px; margin: 0 auto; padding-top: 120px; padding-bottom: 80px; position: relative; z-index: 1;">
    
    <!-- HERO HEADER -->
    <div style="text-align: center; max-width: 800px; margin: 0 auto 40px;">
      <div class="uppercase-label text-gold" style="margin-bottom: 12px; font-weight: 700;">PRO-GRADE TRADING CALCULATORS</div>
      <h1 class="font-display" style="font-size: 42px; font-weight: 700; line-height: 1.15; margin-bottom: 16px;">
        Institutional Precision. Zero Cost.
      </h1>
      <p style="font-size: 16px; color: #9A9A9A; line-height: 1.6;">
        Master your risk management with FORTREX's suite of trading tools. Instant calculations for 44 forex, commodity, and crypto pairs across 11 account currencies.
      </p>
      
      <div class="hero-badge-container">
        <span class="hero-badge">⚡ 44 TRADING PAIRS</span>
        <span class="hero-badge">🌍 11 ACCOUNT CURRENCIES</span>
        <span class="hero-badge">💎 100% FREE & INSTANT</span>
        <span class="hero-badge">🛡️ REAL-TIME RISK METRICS</span>
      </div>
    </div>

    <!-- SECTION 1: ESSENTIAL CALCULATORS -->
    <div class="section-header-block">
      <div class="section-title">
        <span style="color: #E5C158;">01.</span> Essential Calculators
      </div>
      <div class="section-subtitle">Core risk management, position sizing, and trade execution calculators for active traders.</div>
    </div>

    <div class="calc-grid-3">

      <!-- 1. PIP VALUE CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">📊</div>
              <h3 class="tool-title">Pip Value</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetPipValue()">Reset</button>
          </div>
          <div class="tool-desc">Calculate exact cash value per pip based on lot size, pair, and account currency.</div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="pip-pair" class="form-select pair-select" onchange="handlePairChange('pip-pair', 'pip-rate', 'calculatePipValue')"></select>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Lot Size (Lots)</label>
              <div class="quick-lots">
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pip-lots', 1.0, 'calculatePipValue')">1.0 Std</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pip-lots', 0.1, 'calculatePipValue')">0.1 Mini</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pip-lots', 0.01, 'calculatePipValue')">0.01 Micro</button>
              </div>
            </div>
            <input type="number" id="pip-lots" class="form-control font-mono" value="1.0" step="0.01" min="0.01" oninput="calculatePipValue()">
          </div>

          <div class="form-group">
            <label class="form-label">Custom Pip Movement</label>
            <input type="number" id="pip-pips-custom" class="form-control font-mono" value="10" step="1" min="1" oninput="calculatePipValue()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="pip-acc-ccy" class="form-select acc-ccy-select" onchange="calculatePipValue()"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Exchange Rate (Editable)</label>
            <input type="number" id="pip-rate" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculatePipValue()">
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">Pip Value (1 Pip)</span>
            <span class="output-val gold" id="pip-out-val">$10.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Per Standard Lot</span>
            <span class="output-val" id="pip-out-std">$10.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Custom Pips Value</span>
            <span class="output-val" id="pip-out-custom">$100.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Position Value</span>
            <span class="output-val" id="pip-out-notional">$108,500.00</span>
          </div>
        </div>
      </div>

      <!-- 2. LOT SIZE CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">⚖️</div>
              <h3 class="tool-title">Lot Size</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetLotSize()">Reset</button>
          </div>
          <div class="tool-desc">Determine exact lot size to trade based on your risk tolerance and stop loss.</div>

          <div class="form-group">
            <label class="form-label">Account Balance</label>
            <input type="number" id="lot-balance" class="form-control font-mono" value="10000" step="100" oninput="calculateLotSize()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="lot-acc-ccy" class="form-select acc-ccy-select" onchange="calculateLotSize()"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Risk Model</label>
            <div class="toggle-group">
              <button type="button" id="lot-btn-pct" class="toggle-btn active" onclick="setLotRiskType('pct')">Risk %</button>
              <button type="button" id="lot-btn-fixed" class="toggle-btn" onclick="setLotRiskType('fixed')">Fixed $</button>
            </div>
          </div>

          <div id="lot-pct-group" class="form-group">
            <div class="form-label-row">
              <label class="form-label">Risk Percentage</label>
              <span id="lot-risk-pct-disp" class="font-mono text-gold" style="font-weight: 700; font-size: 13px;">1.0%</span>
            </div>
            <input type="range" id="lot-risk-pct-slider" class="range-slider" min="0.1" max="10" step="0.1" value="1.0" oninput="syncLotRiskPct('slider')">
          </div>

          <div id="lot-fixed-group" class="form-group" style="display: none;">
            <label class="form-label">Fixed Risk Amount</label>
            <input type="number" id="lot-risk-fixed" class="form-control font-mono" value="100" step="10" oninput="calculateLotSize()">
          </div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="lot-pair" class="form-select pair-select" onchange="handlePairChange('lot-pair', 'lot-rate', 'calculateLotSize')"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Stop Loss (Pips)</label>
            <input type="number" id="lot-sl" class="form-control font-mono" value="20" step="1" min="1" oninput="calculateLotSize()">
          </div>

          <div class="form-group">
            <label class="form-label">Exchange Rate (Editable)</label>
            <input type="number" id="lot-rate" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculateLotSize()">
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">Recommended Lot Size</span>
            <span class="output-val gold" id="lot-out-size">0.50 Lots</span>
          </div>
          <div class="output-row">
            <span class="output-label">Lot Breakdown</span>
            <span class="output-val" id="lot-out-breakdown" style="font-size: 13px;">0.50 Std | 5.0 Mini | 50 Micro</span>
          </div>
          <div class="output-row">
            <span class="output-label">Risk Amount</span>
            <span class="output-val red" id="lot-out-risk">$100.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Pip Value for Lot</span>
            <span class="output-val" id="lot-out-pipval">$5.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Position Value</span>
            <span class="output-val" id="lot-out-notional">$54,250.00</span>
          </div>
        </div>
      </div>

      <!-- 3. MARGIN CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">🏦</div>
              <h3 class="tool-title">Margin</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetMargin()">Reset</button>
          </div>
          <div class="tool-desc">Calculate required margin required to open a position at chosen leverage.</div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="margin-pair" class="form-select pair-select" onchange="handlePairChange('margin-pair', 'margin-rate', 'calculateMargin')"></select>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Position Size (Lots)</label>
              <div class="quick-lots">
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('margin-lots', 1.0, 'calculateMargin')">1.0 Std</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('margin-lots', 0.1, 'calculateMargin')">0.1 Mini</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('margin-lots', 0.01, 'calculateMargin')">0.01 Micro</button>
              </div>
            </div>
            <input type="number" id="margin-lots" class="form-control font-mono" value="1.0" step="0.01" min="0.01" oninput="calculateMargin()">
          </div>

          <div class="form-group">
            <label class="form-label">Leverage</label>
            <select id="margin-leverage" class="form-select" onchange="calculateMargin()">
              <option value="1">1:1</option>
              <option value="2">1:2</option>
              <option value="5">1:5</option>
              <option value="10">1:10</option>
              <option value="20">1:20</option>
              <option value="30">1:30</option>
              <option value="50">1:50</option>
              <option value="100" selected>1:100</option>
              <option value="200">1:200</option>
              <option value="400">1:400</option>
              <option value="500">1:500</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="margin-acc-ccy" class="form-select acc-ccy-select" onchange="calculateMargin()"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Exchange Rate (Editable)</label>
            <input type="number" id="margin-rate" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculateMargin()">
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">Required Margin</span>
            <span class="output-val gold" id="margin-out-req">$1,085.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Position Value</span>
            <span class="output-val" id="margin-out-notional">$108,500.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Margin Requirement</span>
            <span class="output-val" id="margin-out-pct">1.00% (1:100)</span>
          </div>
          <div class="output-row">
            <span class="output-label">Pip Value</span>
            <span class="output-val" id="margin-out-pipval">$10.00</span>
          </div>
        </div>
      </div>

      <!-- 4. PROFIT/LOSS CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">💰</div>
              <h3 class="tool-title">Profit / Loss</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetPL()">Reset</button>
          </div>
          <div class="tool-desc">Calculate expected profit or loss in cash and pips for long or short positions.</div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="pl-pair" class="form-select pair-select" onchange="handlePLPairChange()"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Trade Direction</label>
            <div class="toggle-group">
              <button type="button" id="pl-btn-long" class="toggle-btn active" onclick="setPLDirection('long')">Long (Buy)</button>
              <button type="button" id="pl-btn-short" class="toggle-btn" onclick="setPLDirection('short')">Short (Sell)</button>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Position Size (Lots)</label>
              <div class="quick-lots">
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pl-lots', 1.0, 'calculatePL')">1.0 Std</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pl-lots', 0.1, 'calculatePL')">0.1 Mini</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('pl-lots', 0.01, 'calculatePL')">0.01 Micro</button>
              </div>
            </div>
            <input type="number" id="pl-lots" class="form-control font-mono" value="1.0" step="0.01" min="0.01" oninput="calculatePL()">
          </div>

          <div class="form-group">
            <label class="form-label">Entry Price</label>
            <input type="number" id="pl-entry" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculatePL()">
          </div>

          <div class="form-group">
            <label class="form-label">Exit Price</label>
            <input type="number" id="pl-exit" class="form-control font-mono" value="1.0870" step="0.0001" oninput="calculatePL()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="pl-acc-ccy" class="form-select acc-ccy-select" onchange="calculatePL()"></select>
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">Net Profit / Loss</span>
            <span class="output-val green" id="pl-out-pnl">+$200.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Pips Gained / Lost</span>
            <span class="output-val" id="pl-out-pips">+20.0 pips</span>
          </div>
          <div class="output-row">
            <span class="output-label">Return on Position</span>
            <span class="output-val" id="pl-out-ret">+0.18%</span>
          </div>
          <div class="output-row">
            <span class="output-label">Position Value</span>
            <span class="output-val" id="pl-out-notional">$108,500.00</span>
          </div>
        </div>
      </div>

      <!-- 5. POSITION SIZE CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">📐</div>
              <h3 class="tool-title">Position Size</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetPositionSize()">Reset</button>
          </div>
          <div class="tool-desc">Calculate exact units and lot breakdown based on risk percent and stop distance.</div>

          <div class="form-group">
            <label class="form-label">Account Balance</label>
            <input type="number" id="pos-balance" class="form-control font-mono" value="10000" step="100" oninput="calculatePositionSize()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="pos-acc-ccy" class="form-select acc-ccy-select" onchange="calculatePositionSize()"></select>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Risk Percentage</label>
              <span id="pos-risk-pct-disp" class="font-mono text-gold" style="font-weight: 700; font-size: 13px;">1.0%</span>
            </div>
            <input type="range" id="pos-risk-pct-slider" class="range-slider" min="0.1" max="10" step="0.1" value="1.0" oninput="syncPosRiskPct()">
          </div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="pos-pair" class="form-select pair-select" onchange="handlePairChange('pos-pair', 'pos-rate', 'calculatePositionSize')"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Stop Loss (Pips)</label>
            <input type="number" id="pos-sl" class="form-control font-mono" value="25" step="1" min="1" oninput="calculatePositionSize()">
          </div>

          <div class="form-group">
            <label class="form-label">Exchange Rate (Editable)</label>
            <input type="number" id="pos-rate" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculatePositionSize()">
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">Recommended Size</span>
            <span class="output-val gold" id="pos-out-lots">0.40 Lots</span>
          </div>
          <div class="output-row">
            <span class="output-label">Position Units</span>
            <span class="output-val" id="pos-out-units">40,000 Units</span>
          </div>
          <div class="output-row">
            <span class="output-label">Lot Breakdown</span>
            <span class="output-val" id="pos-out-breakdown" style="font-size: 13px;">4.0 Mini | 40 Micro</span>
          </div>
          <div class="output-row">
            <span class="output-label">Risk Amount</span>
            <span class="output-val red" id="pos-out-risk">$100.00</span>
          </div>
          <div class="output-row">
            <span class="output-label">Pip Value (Total)</span>
            <span class="output-val" id="pos-out-pipval">$4.00</span>
          </div>
        </div>
      </div>

      <!-- 6. RISK/REWARD CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">🎯</div>
              <h3 class="tool-title">Risk / Reward</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetRR()">Reset</button>
          </div>
          <div class="tool-desc">Analyze risk-to-reward ratio, monetary risk/reward, and break-even win rate.</div>

          <div class="form-group">
            <label class="form-label">Currency Pair</label>
            <select id="rr-pair" class="form-select pair-select" onchange="handleRRPairChange()"></select>
          </div>

          <div class="form-group">
            <label class="form-label">Trade Direction</label>
            <div class="toggle-group">
              <button type="button" id="rr-btn-long" class="toggle-btn active" onclick="setRRDirection('long')">Long (Buy)</button>
              <button type="button" id="rr-btn-short" class="toggle-btn" onclick="setRRDirection('short')">Short (Sell)</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Entry Price</label>
            <input type="number" id="rr-entry" class="form-control font-mono" value="1.0850" step="0.0001" oninput="calculateRR()">
          </div>

          <div class="form-group">
            <label class="form-label">Stop Loss Price</label>
            <input type="number" id="rr-sl" class="form-control font-mono" value="1.0830" step="0.0001" oninput="calculateRR()">
          </div>

          <div class="form-group">
            <label class="form-label">Take Profit Price</label>
            <input type="number" id="rr-tp" class="form-control font-mono" value="1.0900" step="0.0001" oninput="calculateRR()">
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Position Size (Lots)</label>
              <div class="quick-lots">
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('rr-lots', 1.0, 'calculateRR')">1.0 Std</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('rr-lots', 0.1, 'calculateRR')">0.1 Mini</button>
                <button type="button" class="quick-lot-btn" onclick="setQuickLot('rr-lots', 0.01, 'calculateRR')">0.01 Micro</button>
              </div>
            </div>
            <input type="number" id="rr-lots" class="form-control font-mono" value="1.0" step="0.01" min="0.01" oninput="calculateRR()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="rr-acc-ccy" class="form-select acc-ccy-select" onchange="calculateRR()"></select>
          </div>
        </div>

        <div class="output-box">
          <div class="output-row">
            <span class="output-label">R:R Ratio</span>
            <span class="output-val gold" id="rr-out-ratio">1 : 2.50</span>
          </div>
          <div class="output-row">
            <span class="output-label">Verdict</span>
            <span id="rr-out-verdict"><span class="verdict-badge" style="background: rgba(74, 222, 128, 0.15); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.4);">EXCELLENT</span></span>
          </div>
          <div class="output-row">
            <span class="output-label">Risk Amount</span>
            <span class="output-val red" id="rr-out-risk">$200.00 (20.0 pips)</span>
          </div>
          <div class="output-row">
            <span class="output-label">Reward Amount</span>
            <span class="output-val green" id="rr-out-reward">$500.00 (50.0 pips)</span>
          </div>
          <div class="output-row">
            <span class="output-label">Break-Even Win Rate</span>
            <span class="output-val" id="rr-out-breakeven">28.6%</span>
          </div>
        </div>
      </div>

    </div>

    <!-- SECTION 2: ADVANCED STRATEGY TOOLS -->
    <div class="section-header-block">
      <div class="section-title">
        <span style="color: #E5C158;">02.</span> Advanced Strategy Tools
      </div>
      <div class="section-subtitle">Long-term compound interest projection and capital drawdown recovery analytics.</div>
    </div>

    <div class="calc-grid-2">

      <!-- 7. COMPOUNDING SIMULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">📈</div>
              <h3 class="tool-title">Compounding Simulator</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetCompounding()">Reset</button>
          </div>
          <div class="tool-desc">Project growth over time with monthly compounding interest and detailed breakdowns.</div>

          <div class="form-group">
            <label class="form-label">Starting Balance</label>
            <input type="number" id="comp-balance" class="form-control font-mono" value="10000" step="500" oninput="calculateCompounding()">
          </div>

          <div class="form-group">
            <label class="form-label">Monthly Return (%)</label>
            <input type="number" id="comp-return" class="form-control font-mono" value="5.0" step="0.5" min="0.1" oninput="calculateCompounding()">
          </div>

          <div class="form-group">
            <label class="form-label">Duration (Months)</label>
            <input type="number" id="comp-duration" class="form-control font-mono" value="12" step="1" min="1" max="120" oninput="calculateCompounding()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="comp-acc-ccy" class="form-select acc-ccy-select" onchange="calculateCompounding()"></select>
          </div>
        </div>

        <div>
          <div class="output-box">
            <div class="output-row">
              <span class="output-label">Final Projected Balance</span>
              <span class="output-val gold" id="comp-out-final">$17,958.56</span>
            </div>
            <div class="output-row">
              <span class="output-label">Total Growth %</span>
              <span class="output-val green" id="comp-out-pct">+79.6%</span>
            </div>
            <div class="output-row">
              <span class="output-label">Growth Multiple</span>
              <span class="output-val" id="comp-out-mult">1.80x</span>
            </div>
            <div class="output-row">
              <span class="output-label">Total Profit Earned</span>
              <span class="output-val green" id="comp-out-profit">+$7,958.56</span>
            </div>
          </div>

          <!-- TABLE BREAKDOWN -->
          <div class="sim-table-container">
            <table class="sim-table" id="comp-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Start</th>
                  <th>Profit</th>
                  <th>End</th>
                  <th>Gain %</th>
                </tr>
              </thead>
              <tbody>
                <!-- Populated dynamically via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 8. DRAWDOWN RECOVERY CALCULATOR -->
      <div class="tool-card">
        <div>
          <div class="tool-header">
            <div class="tool-title-group">
              <div class="tool-icon">🛡️</div>
              <h3 class="tool-title">Drawdown Recovery</h3>
            </div>
            <button type="button" class="btn-reset" onclick="resetDrawdown()">Reset</button>
          </div>
          <div class="tool-desc">Calculate required gain percentage to break even after account drawdowns.</div>

          <div class="form-group">
            <label class="form-label">Starting Account Balance</label>
            <input type="number" id="dd-balance" class="form-control font-mono" value="10000" step="500" oninput="calculateDrawdown()">
          </div>

          <div class="form-group">
            <label class="form-label">Account Currency</label>
            <select id="dd-acc-ccy" class="form-select acc-ccy-select" onchange="calculateDrawdown()"></select>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label">Drawdown Percentage</label>
              <span id="dd-pct-disp" class="font-mono red" style="font-weight: 700; font-size: 13px;">20%</span>
            </div>
            <input type="range" id="dd-pct-slider" class="range-slider" min="1" max="90" step="1" value="20" oninput="syncDrawdownPct()">
          </div>
        </div>

        <div>
          <div class="output-box">
            <div class="output-row">
              <span class="output-label">Loss Amount</span>
              <span class="output-val red" id="dd-out-lost">-$2,000.00</span>
            </div>
            <div class="output-row">
              <span class="output-label">Remaining Balance</span>
              <span class="output-val" id="dd-out-remaining">$8,000.00</span>
            </div>
            <div class="output-row">
              <span class="output-label">Required Gain to Recover</span>
              <span class="output-val gold" id="dd-out-recovery">+25.0%</span>
            </div>
          </div>

          <!-- MATHEMATICAL REALITY WARNING BOX -->
          <div id="dd-out-warning" style="margin-top: 16px; padding: 14px 16px; border-radius: 10px; font-size: 13px; line-height: 1.5; border: 1px solid rgba(248, 113, 113, 0.3); background: rgba(248, 113, 113, 0.08); color: #F87171;">
            A 20% drawdown requires a 25.0% gain just to break even. Protect your capital.
          </div>
        </div>
      </div>

    </div>

    <!-- CTA BANNER -->
    <div class="cta-banner">
      <div class="uppercase-label text-gold" style="margin-bottom: 12px; font-weight: 700;">TEST YOUR SKILLS IN THE ARENA</div>
      <h2 class="font-display" style="font-size: 32px; font-weight: 700; margin-bottom: 16px;">
        Ready to Put Your Risk Calculations into Action?
      </h2>
      <p style="font-size: 15px; color: #9A9A9A; max-width: 640px; margin: 0 auto 28px; line-height: 1.6;">
        Join FORTREX simulated trading tournaments. Test your trading strategies under real market conditions, compete on global leaderboards, and win REX reward points.
      </p>
      <a href="contests.html" class="btn-pill-gold">
        ENTER ARENA TOURNAMENTS &rarr;
      </a>
    </div>

  </main>

  <!-- RISK DISCLAIMER -->
  <section style="padding: 40px 0; border-top: 1px solid #1A1A1A;">
    <div class="container" style="max-width: 900px; text-align: center; margin: 0 auto;">
      <div class="uppercase-label" style="color: #666; margin-bottom: 12px;">RISK WARNING</div>
      <p style="font-size: 12px; color: #777; line-height: 1.7; font-weight: 300;">
        Trading foreign exchange, cryptocurrencies, and commodities carries a high level of risk and may not be suitable for all investors. Leveraged trading can work against you as well as for you. FORTREX provides analytical tools and trading competitions for educational and entertainment purposes. We do not execute trades, manage funds, or provide financial advice. All calculation tools are theoretical models based on user inputs. Past results do not guarantee future performance. Never trade with capital you cannot afford to lose.
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="assets/fortrex-icon-nav.png" alt="FORTREX" style="width: 28px; height: 28px; object-fit: contain; margin-right: 12px; filter: drop-shadow(0 0 4px rgba(234, 202, 122, 0.2));">
          <span class="nav-wordmark" style="color: #EACA7A; font-weight: 700;">FORTREX</span>
        </div>
        <div class="footer-links">
          <a href="index.html" class="footer-link">Home</a>
          <a href="tools.html" class="footer-link">Tools</a>
          <a href="contests.html" class="footer-link">Tournaments</a>
          <a href="leaderboard.html" class="footer-link">Leaderboard</a>
          <a href="community.html" class="footer-link">Community</a>
          <a href="terms.html" class="footer-link">Terms</a>
          <a href="privacy.html" class="footer-link">Privacy</a>
          <a href="signin.html" class="footer-link">Sign In</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">© 2026 FORTREX — Skill-based trading competitions. Not a financial service.</div>
        <div class="footer-disclaimer" style="font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 8px; line-height: 1.5;">
          Trading forex and cryptocurrency on margin carries a high level of risk. FORTREX is a skill-based competition platform and does not execute trades, hold funds, or provide financial advice. Tournament prizes are distributed as REX reward points with no cash value.
        </div>
      </div>
    </div>
  </footer>
"""

with open('vortex-fx/tools.html', 'w', encoding='utf-8') as f:
    f.write(part1)
print("Part 1 written successfully")
