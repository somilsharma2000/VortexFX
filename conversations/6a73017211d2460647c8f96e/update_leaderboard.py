import sys

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tournaments & Leaderboard — FORTEX FX</title>
  <link rel="stylesheet" href="css/dala.css">
  <script src="js/dala.js"></script>
  <script src="js/auth.js"></script>
  <script src="js/psychology.js"></script>

  <style>
    /* Tournament selector tabs & mobile dropdown */
    .tournament-tabs-wrapper {
      display: flex;
      gap: var(--spacing-12);
      overflow-x: auto;
      padding-bottom: var(--spacing-12);
      margin-bottom: var(--spacing-24);
      scrollbar-width: thin;
      scrollbar-color: var(--color-electric-iris) transparent;
    }

    .tournament-tab {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--color-ash-gray);
      padding: 12px 22px;
      border-radius: var(--radius-pill);
      font-size: var(--text-nav-label);
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .tournament-tab:hover {
      border-color: var(--color-electric-iris);
      color: var(--color-bone-white);
      background: rgba(128, 82, 255, 0.08);
    }

    .tournament-tab.active {
      background: linear-gradient(135deg, rgba(128, 82, 255, 0.25), rgba(128, 82, 255, 0.05));
      border-color: var(--color-electric-iris);
      color: var(--color-bone-white);
      box-shadow: 0 0 20px rgba(128, 82, 255, 0.2);
    }

    .tournament-select-mobile {
      display: none;
      width: 100%;
      background: #0a0b10;
      border: 1px solid rgba(128, 82, 255, 0.3);
      color: var(--color-bone-white);
      padding: 14px 18px;
      border-radius: 12px;
      font-size: 16px;
      font-family: var(--font);
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .tournament-tabs-wrapper { display: none; }
      .tournament-select-mobile { display: block; }
    }

    /* Podium styling for top 3 */
    .podium-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-24);
      margin-bottom: var(--spacing-36);
    }

    .podium-card {
      border-radius: 20px;
      padding: 28px;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .podium-card:hover {
      transform: translateY(-4px);
    }

    .podium-gold {
      background: linear-gradient(180deg, rgba(212, 175, 55, 0.12) 0%, rgba(10, 11, 16, 0.95) 100%);
      border: 1px solid #D4AF37;
      box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
    }

    .podium-silver {
      background: linear-gradient(180deg, rgba(192, 192, 192, 0.1) 0%, rgba(10, 11, 16, 0.95) 100%);
      border: 1px solid #C0C0C0;
      box-shadow: 0 0 25px rgba(192, 192, 192, 0.1);
    }

    .podium-bronze {
      background: linear-gradient(180deg, rgba(205, 127, 50, 0.1) 0%, rgba(10, 11, 16, 0.95) 100%);
      border: 1px solid #CD7F32;
      box-shadow: 0 0 25px rgba(205, 127, 50, 0.1);
    }

    .roi-positive { color: #22c55e; font-weight: 600; }
    .roi-negative { color: #ef4444; font-weight: 600; }

    .rex-badge {
      background: rgba(255, 184, 41, 0.12);
      border: 1px solid rgba(255, 184, 41, 0.3);
      color: #FFB829;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* Sealed Banner */
    .sealed-banner-card {
      border: 1px solid rgba(128, 82, 255, 0.35);
      background: linear-gradient(180deg, rgba(15, 12, 28, 0.9) 0%, rgba(6, 7, 10, 0.95) 100%);
      border-radius: 28px;
      padding: 48px 32px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(128, 82, 255, 0.08);
    }

    .sealed-banner-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-electric-iris), var(--color-saffron-spark), transparent);
    }

    .countdown-box {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 700;
      color: var(--color-electric-iris);
      font-variant-numeric: tabular-nums;
      letter-spacing: -1.5px;
      text-shadow: 0 0 20px rgba(128, 82, 255, 0.4);
    }

    /* Spinner Loader */
    .spinner-ring {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(128, 82, 255, 0.15);
      border-top-color: var(--color-electric-iris);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-18);
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .search-input-box {
      width: 100%;
      max-width: 380px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 18px;
      color: var(--color-bone-white);
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .search-input-box:focus {
      border-color: var(--color-electric-iris);
      box-shadow: 0 0 12px rgba(128, 82, 255, 0.25);
      background: rgba(128, 82, 255, 0.05);
    }
  </style>
</head>
<body>

  <canvas id="particle-canvas"></canvas>

  <!-- NAVIGATION -->
  <nav class="nav">
    <div class="nav-brand">
      <a href="index.html" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
        <div class="nav-logo">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" stroke="#8052ff" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
            <polygon points="50,30 65,39 65,61 50,70 35,61 35,39" stroke="#8052ff" stroke-width="1.5" fill="none" stroke-linejoin="round" opacity="0.5"/>
            <path d="M50,42 Q58,45 55,52 Q48,55 45,48 Q47,43 50,42" stroke="#8052ff" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="2" fill="#8052ff"/>
            <circle cx="50" cy="18" r="3" fill="#8052ff"/>
            <circle cx="78" cy="34" r="3" fill="#8052ff"/>
            <circle cx="78" cy="66" r="3" fill="#8052ff"/>
            <circle cx="50" cy="82" r="3" fill="#8052ff"/>
            <circle cx="22" cy="66" r="3" fill="#8052ff"/>
            <circle cx="22" cy="34" r="3" fill="#8052ff"/>
            <line x1="50" y1="18" x2="78" y2="34" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
            <line x1="78" y1="34" x2="78" y2="66" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
            <line x1="78" y1="66" x2="50" y2="82" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
            <line x1="50" y1="82" x2="22" y2="66" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
            <line x1="22" y1="66" x2="22" y2="34" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
            <line x1="22" y1="34" x2="50" y2="18" stroke="#8052ff" stroke-width="0.8" opacity="0.3"/>
          </svg>
        </div>
        <span class="nav-wordmark">FORTEX FX</span>
      </a>
    </div>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="leaderboard.html" class="nav-link active">Tournaments</a></li>
      <li><a href="offers.html" class="nav-link">Rewards</a></li>
      <li><a href="resources.html" class="nav-link">Resources</a></li>
      <li><a href="invite.html" class="nav-link">Invite</a></li>
      <li><a href="profile.html" class="nav-link">Profile</a></li>
      <li><a href="checkin.html" class="nav-link">Check-In</a></li>
    </ul>
    <div class="nav-cta">
      <a href="signin.html" class="nav-link" style="text-transform: uppercase;">Sign In</a>
      <a href="signin.html" class="btn-primary">Enter Arena</a>
      <div class="hamburger" aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <main>
    <!-- HEADER -->
    <section class="section" style="padding-top: 140px; padding-bottom: 40px;" data-shape="galaxy">
      <div class="container reveal">
        <div class="section-label">TOURNAMENT ARENA</div>
        <h1 class="display" style="margin-bottom: var(--spacing-24);">Tournaments & Leaderboard</h1>
        <p class="body-text-muted" style="max-width: 620px;">
          Compete for real prizes. Standings remain 100% sealed until reveal day—no live rank distortion, pure trading skill.
        </p>
      </div>
    </section>

    <!-- TOURNAMENT LEADERBOARD INTERACTIVE SECTION -->
    <section id="leaderboard-section" class="section reveal" style="padding-top: 0;" data-shape="trophy">
      <div class="container">
        <!-- Tournament Selector Tabs / Dropdown -->
        <div style="margin-bottom: var(--spacing-24);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 12px;">
            <div class="section-label" style="margin-bottom: 0;">SELECT TOURNAMENT</div>
            <div style="font-size: 13px; color: var(--color-silver-mist);">
              All live tournaments are locked until reveal
            </div>
          </div>

          <!-- Desktop Tabs -->
          <div id="tournament-tabs" class="tournament-tabs-wrapper">
            <!-- Rendered by JavaScript -->
          </div>

          <!-- Mobile Select Dropdown -->
          <select id="tournament-select" class="tournament-select-mobile">
            <!-- Rendered by JavaScript -->
          </select>
        </div>

        <!-- Leaderboard Output Container (Loading / Sealed Banner / Revealed Leaderboard / Empty State) -->
        <div id="leaderboard-container">
          <!-- Dynamically populated by JavaScript -->
        </div>
      </div>
    </section>

    <!-- SEASONAL STANDINGS (AGGREGATE VIEW) -->
    <section class="section reveal" data-shape="crown">
      <div class="container">
        <div class="section-label" style="margin-bottom: var(--spacing-24);">SEASON 2026 STANDINGS</div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: var(--spacing-36);">
          <div>
            <h2 style="font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: var(--color-bone-white); margin-bottom: 12px;">
              Annual Leaderboard
            </h2>
            <p class="body-text-muted" style="max-width: 600px;">
              Aggregate view across all 2026 tournaments. Points and total REX accumulators determine seeding for the Annual Grand Championship.
            </p>
          </div>
          <div class="badge" style="background: rgba(255, 184, 41, 0.15); border: 1px solid #FFB829; color: #FFB829; font-size: 14px; padding: 8px 18px;">
            ✨ SEASON 2026 ACTIVE
          </div>
        </div>

        <div style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; padding: 28px; background: rgba(10, 11, 16, 0.8); overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 80px;">Season Rank</th>
                <th>Trader</th>
                <th>Total REX Won</th>
                <th>Tournaments Played</th>
                <th>Best ROI</th>
                <th style="text-align: right;">Titles Won</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: rgba(212, 175, 55, 0.05);">
                <td class="rank-1" style="font-weight: 700; font-size: 16px;">🥇 #1</td>
                <td style="font-weight: 600; color: var(--color-bone-white);">TitanMaverick</td>
                <td><span class="rex-badge">💰 35,000 REX</span></td>
                <td style="color: var(--color-silver-mist);">3 Tournaments</td>
                <td class="roi-positive">+182.4%</td>
                <td style="text-align: right; color: var(--color-saffron-spark); font-weight: 600;">2x Champion 🏆</td>
              </tr>
              <tr style="background: rgba(192, 192, 192, 0.03);">
                <td class="rank-2" style="font-weight: 700; font-size: 16px;">🥈 #2</td>
                <td style="font-weight: 600; color: var(--color-bone-white);">RogueViper</td>
                <td><span class="rex-badge">💰 24,000 REX</span></td>
                <td style="color: var(--color-silver-mist);">3 Tournaments</td>
                <td class="roi-positive">+167.8%</td>
                <td style="text-align: right; color: var(--color-saffron-spark); font-weight: 600;">1x Champion 🏆</td>
              </tr>
              <tr style="background: rgba(205, 127, 50, 0.03);">
                <td class="rank-3" style="font-weight: 700; font-size: 16px;">🥉 #3</td>
                <td style="font-weight: 600; color: var(--color-bone-white);">FluxKairos</td>
                <td><span class="rex-badge">💰 18,500 REX</span></td>
                <td style="color: var(--color-silver-mist);">2 Tournaments</td>
                <td class="roi-positive">+134.7%</td>
                <td style="text-align: right; color: var(--color-saffron-spark); font-weight: 600;">1x Champion 🏆</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--color-ash-gray);">#4</td>
                <td style="color: var(--color-bone-white);">ApexBull</td>
                <td><span class="rex-badge">💰 14,200 REX</span></td>
                <td style="color: var(--color-silver-mist);">3 Tournaments</td>
                <td class="roi-positive">+112.3%</td>
                <td style="text-align: right; color: var(--color-ash-gray);">Runner-up</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--color-ash-gray);">#5</td>
                <td style="color: var(--color-bone-white);">ShadowTrader</td>
                <td><span class="rex-badge">💰 11,800 REX</span></td>
                <td style="color: var(--color-silver-mist);">2 Tournaments</td>
                <td class="roi-positive">+98.6%</td>
                <td style="text-align: right; color: var(--color-ash-gray);">Top 5</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--color-ash-gray);">#6</td>
                <td style="color: var(--color-bone-white);">QuantumPips</td>
                <td><span class="rex-badge">💰 9,500 REX</span></td>
                <td style="color: var(--color-silver-mist);">2 Tournaments</td>
                <td class="roi-positive">+88.1%</td>
                <td style="text-align: right; color: var(--color-ash-gray);">Top 5</td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--color-ash-gray);">#7</td>
                <td style="color: var(--color-bone-white);">CyberWhale</td>
                <td><span class="rex-badge">💰 7,800 REX</span></td>
                <td style="color: var(--color-silver-mist);">2 Tournaments</td>
                <td class="roi-positive">+76.4%</td>
                <td style="text-align: right; color: var(--color-ash-gray);">Top 10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- PAST TOURNAMENTS ARCHIVE -->
    <section class="section reveal" data-shape="candlestick">
      <div class="container">
        <div class="section-label" style="margin-bottom: var(--spacing-24);">PAST TOURNAMENTS ARCHIVE</div>
        <h2 style="font-size: 48px; font-weight: 400; letter-spacing: -1.68px; color: var(--color-bone-white); margin-bottom: var(--spacing-36);">
          Previous Completed Tournaments
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-24);">
          <!-- Archive Item 1 -->
          <div class="float-item" style="border-color: rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span class="badge" style="background: rgba(34,197,94,0.15); color:#22c55e; border:1px solid #22c55e;">REVEALED</span>
              <span style="font-size: 13px; color: var(--color-ash-gray);">July 2026</span>
            </div>
            <div style="font-size: 24px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">
              Spring Smash 2026
            </div>
            <div style="font-size: 14px; color: var(--color-silver-mist); margin-bottom: 16px;">
              Prize Pool: <strong style="color: var(--color-saffron-spark);">$40,000 in REX</strong> · 312 Participants
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 13px; color: var(--color-ash-gray);">Champion: <strong style="color:#fff;">TitanMaverick</strong></span>
              <span class="roi-positive">+182.4% ROI</span>
            </div>
            <button class="btn-ghost" style="width: 100%; font-size: 13px; padding: 10px;" data-select-tournament="spring_2026">
              Inspect Leaderboard →
            </button>
          </div>

          <!-- Archive Item 2 -->
          <div class="float-item" style="border-color: rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span class="badge" style="background: rgba(34,197,94,0.15); color:#22c55e; border:1px solid #22c55e;">REVEALED</span>
              <span style="font-size: 13px; color: var(--color-ash-gray);">Dec 2025</span>
            </div>
            <div style="font-size: 24px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">
              Winter Warfare 2025
            </div>
            <div style="font-size: 14px; color: var(--color-silver-mist); margin-bottom: 16px;">
              Prize Pool: <strong style="color: var(--color-saffron-spark);">$30,000 in REX</strong> · 198 Participants
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 13px; color: var(--color-ash-gray);">Champion: <strong style="color:#fff;">RogueViper</strong></span>
              <span class="roi-positive">+167.8% ROI</span>
            </div>
            <button class="btn-ghost" style="width: 100%; font-size: 13px; padding: 10px;" data-select-tournament="winter_2025">
              Inspect Leaderboard →
            </button>
          </div>

          <!-- Archive Item 3 -->
          <div class="float-item" style="border-color: rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <span class="badge" style="background: rgba(34,197,94,0.15); color:#22c55e; border:1px solid #22c55e;">REVEALED</span>
              <span style="font-size: 13px; color: var(--color-ash-gray);">Oct 2025</span>
            </div>
            <div style="font-size: 24px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">
              Autumn Apex 2025
            </div>
            <div style="font-size: 14px; color: var(--color-silver-mist); margin-bottom: 16px;">
              Prize Pool: <strong style="color: var(--color-saffron-spark);">$25,000 in REX</strong> · 175 Participants
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 13px; color: var(--color-ash-gray);">Champion: <strong style="color:#fff;">FluxKairos</strong></span>
              <span class="roi-positive">+134.7% ROI</span>
            </div>
            <button class="btn-ghost" style="width: 100%; font-size: 13px; padding: 10px;" data-select-tournament="autumn_2025">
              Inspect Leaderboard →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- HALL OF FAME -->
    <section class="section reveal" data-shape="pound">
      <div class="container">
        <div class="section-label" style="margin-bottom: var(--spacing-36);">HALL OF FAME</div>
        <h2 style="font-size: 48px; font-weight: 400; letter-spacing: -1.68px; color: var(--color-bone-white); margin-bottom: var(--spacing-36);">
          All-time champions
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-36);">
          <div class="float-item">
            <div class="float-item-label" style="color: var(--color-electric-iris);">3x CHAMPION</div>
            <div style="font-size: 27px; font-weight: 400; color: var(--color-bone-white); margin-bottom: var(--spacing-6);">TitanMaverick</div>
            <div style="font-size: 14px; color: var(--color-silver-mist);">Highest career ROI: +182.4%</div>
          </div>
          <div class="float-item">
            <div class="float-item-label" style="color: var(--color-electric-iris);">2x CHAMPION</div>
            <div style="font-size: 27px; font-weight: 400; color: var(--color-bone-white); margin-bottom: var(--spacing-6);">RogueViper</div>
            <div style="font-size: 14px; color: var(--color-silver-mist);">Highest career ROI: +167.8%</div>
          </div>
          <div class="float-item">
            <div class="float-item-label" style="color: var(--color-electric-iris);">2x CHAMPION</div>
            <div style="font-size: 27px; font-weight: 400; color: var(--color-bone-white); margin-bottom: var(--spacing-6);">FluxKairos</div>
            <div style="font-size: 14px; color: var(--color-silver-mist);">Highest career ROI: +134.7%</div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRADER OF THE MONTH -->
    <section class="section reveal" data-shape="yen">
      <div class="container">
        <div class="section-label" style="margin-bottom: var(--spacing-36);">TRADER OF THE MONTH</div>
        <div class="two-col-asymmetric">
          <div>
            <h2 style="font-size: 48px; font-weight: 400; letter-spacing: -1.68px; color: var(--color-bone-white); margin-bottom: var(--spacing-24);">
              TitanMaverick
            </h2>
            <p class="body-text-muted" style="margin-bottom: var(--spacing-24);">
              Dominated the Spring Smash with a record-breaking +182.4% ROI. 58 trades executed with a 79% win rate. The benchmark for what's possible in a 14-day tournament cycle.
            </p>
            <div style="font-size: 14px; font-weight: 600; letter-spacing: 0.025em; text-transform: uppercase; color: var(--color-saffron-spark);">
              July 2026
            </div>
          </div>
          <div>
            <div class="float-item">
              <div class="float-item-label" style="color: var(--color-electric-iris);">TOURNAMENT ROI</div>
              <div style="font-size: 48px; font-weight: 400; color: var(--color-bone-white);">+182.4%</div>
            </div>
            <div class="float-item">
              <div class="float-item-label" style="color: var(--color-electric-iris);">WIN RATE</div>
              <div style="font-size: 48px; font-weight: 400; color: var(--color-bone-white);">79%</div>
            </div>
            <div class="float-item">
              <div class="float-item-label" style="color: var(--color-electric-iris);">PRIZE WON</div>
              <div style="font-size: 48px; font-weight: 400; color: var(--color-bone-white);">$20,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section reveal" style="text-align: center;" data-shape="dollar">
      <div class="container">
        <div class="section-label" style="justify-content: center;">READY?</div>
        <h2 style="font-size: clamp(36px, 5vw, 78px); font-weight: 400; letter-spacing: -0.04em; color: var(--color-bone-white); margin-bottom: var(--spacing-24);">
          Think you can top the charts?
        </h2>
        <p class="body-text-muted" style="max-width: 500px; margin: 0 auto var(--spacing-36);">
          Join the next tournament. Trade your strategy. Wait for the reveal.
        </p>
        <a href="signin.html" class="btn-primary">Join Next Tournament</a>
      </div>
    </section>

    <!-- RISK DISCLAIMER -->
    <section class="section reveal" style="padding-bottom: 80px;" data-shape="diamond">
      <div class="container" style="max-width: 800px;">
        <div style="border: 1px solid #1a1a1a; border-radius: 24px; padding: 36px;">
          <div class="section-label" style="margin-bottom: var(--spacing-18);">RISK WARNING</div>
          <p style="font-size: 14px; font-weight: 200; color: var(--color-silver-mist); line-height: 1.6;">
            Trading forex and cryptocurrency on margin carries a high level of risk and may not be suitable for all investors. You could lose some or all of your invested capital. Fortex FX is a skill-based trading competition platform and does not execute trades, hold funds, or provide investment advice. All trading occurs on your personal broker account at your own risk. Tournament prizes are distributed as REX reward points, which have no cash value. Never trade with money you cannot afford to lose.
          </p>
          <div style="margin-top: var(--spacing-18); display: flex; gap: var(--spacing-24); flex-wrap: wrap;">
            <a href="terms.html" class="btn-ghost" style="font-size: 14px; text-transform: uppercase;">Terms & Conditions</a>
            <a href="privacy.html" class="btn-ghost" style="font-size: 14px; text-transform: uppercase;">Privacy Policy</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 12px;">
            <polygon points="12,3 22,21 2,21" stroke="#8052ff" stroke-width="2" fill="none" stroke-linejoin="round"/>
          </svg>
          <span class="nav-wordmark">FORTEX FX</span>
        </div>
        <div class="footer-links">
          <a href="index.html" class="footer-link">Home</a>
          <a href="leaderboard.html" class="footer-link">Tournaments</a>
          <a href="offers.html" class="footer-link">Rewards</a>
          <a href="resources.html" class="footer-link">Resources</a>
          <a href="invite.html" class="footer-link">Invite</a>
          <a href="checkin.html" class="footer-link">Check-In</a>
          <a href="terms.html" class="footer-link">Terms</a>
          <a href="privacy.html" class="footer-link">Privacy</a>
          <a href="signin.html" class="footer-link">Sign In</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">© 2026 FORTEX FX — Skill-based trading competitions. Not a financial service.</div>
      </div>
    </div>
  </footer>

  <!-- SCRIPT FOR BACKEND LEADERBOARD INTEGRATION & LOGIC -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Tournament List Config
      const TOURNAMENTS_FALLBACK = [
        {
          id: 'summer_2026',
          name: 'Summer Showdown 2026',
          status: 'sealed',
          prize_pool: '$50,000 in REX',
          participants: 247,
          duration: 'Aug 10 - Aug 23, 2026'
        },
        {
          id: 'spring_2026',
          name: 'Spring Smash 2026',
          status: 'revealed',
          prize_pool: '$40,000 in REX',
          participants: 312,
          duration: 'July 15 - July 30, 2026'
        },
        {
          id: 'winter_2025',
          name: 'Winter Warfare 2025',
          status: 'revealed',
          prize_pool: '$30,000 in REX',
          participants: 198,
          duration: 'Dec 10 - Dec 24, 2025'
        },
        {
          id: 'autumn_2025',
          name: 'Autumn Apex 2025',
          status: 'revealed',
          prize_pool: '$25,000 in REX',
          participants: 175,
          duration: 'Oct 01 - Oct 14, 2025'
        }
      ];

      // Local fallback data for offline/standalone execution or API fallback
      const LEADERBOARD_FALLBACKS = {
        summer_2026: {
          success: true,
          revealed: false,
          tournament_id: 'summer_2026',
          tournament_name: 'Summer Showdown 2026',
          message: 'Results sealed',
          reveal_date: '2026-08-23T23:59:59.000Z',
          prize_pool_rex: 50000,
          participants: 247
        },
        spring_2026: {
          success: true,
          revealed: true,
          tournament_id: 'spring_2026',
          tournament_name: 'Spring Smash 2026',
          revealed_date: 'July 31, 2026',
          prize_pool_rex: 40000,
          participants: 312,
          leaderboard: [
            { rank: 1, trader_id: 't_101', username: 'TitanMaverick', roi: 182.4, final_equity: 28240, prize_won_rex: 15000 },
            { rank: 2, trader_id: 't_102', username: 'FluxKairos', roi: 134.7, final_equity: 23470, prize_won_rex: 10000 },
            { rank: 3, trader_id: 't_103', username: 'RogueViper', roi: 118.2, final_equity: 21820, prize_won_rex: 6000 },
            { rank: 4, trader_id: 't_104', username: 'ApexBull', roi: 94.5, final_equity: 19450, prize_won_rex: 4000 },
            { rank: 5, trader_id: 't_105', username: 'ShadowTrader', roi: 76.1, final_equity: 17610, prize_won_rex: 2500 },
            { rank: 6, trader_id: 't_106', username: 'QuantumPips', roi: 62.8, final_equity: 16280, prize_won_rex: 1500 },
            { rank: 7, trader_id: 't_107', username: 'CyberWhale', roi: 51.3, final_equity: 15130, prize_won_rex: 1000 },
            { rank: 8, trader_id: 't_108', username: 'VeloceFX', roi: 43.0, final_equity: 14300, prize_won_rex: 500 },
            { rank: 9, trader_id: 't_109', username: 'AuraScalper', roi: 31.5, final_equity: 13150, prize_won_rex: 250 },
            { rank: 10, trader_id: 't_110', username: 'NeonGrid', roi: 22.4, final_equity: 12240, prize_won_rex: 250 },
            { rank: 11, trader_id: 't_111', username: 'ZenithAlpha', roi: 14.8, final_equity: 11480, prize_won_rex: 0 },
            { rank: 12, trader_id: 't_112', username: 'KryptoKnight', roi: 5.2, final_equity: 10520, prize_won_rex: 0 },
            { rank: 13, trader_id: 't_113', username: 'VortexRider', roi: -3.8, final_equity: 9620, prize_won_rex: 0 },
            { rank: 14, trader_id: 't_114', username: 'SolarFlare', roi: -12.6, final_equity: 8740, prize_won_rex: 0 }
          ]
        },
        winter_2025: {
          success: true,
          revealed: true,
          tournament_id: 'winter_2025',
          tournament_name: 'Winter Warfare 2025',
          revealed_date: 'December 28, 2025',
          prize_pool_rex: 30000,
          participants: 198,
          leaderboard: [
            { rank: 1, trader_id: 't_103', username: 'RogueViper', roi: 167.8, final_equity: 26780, prize_won_rex: 12000 },
            { rank: 2, trader_id: 't_101', username: 'TitanMaverick', roi: 142.1, final_equity: 24210, prize_won_rex: 8000 },
            { rank: 3, trader_id: 't_105', username: 'ShadowTrader', roi: 98.6, final_equity: 19860, prize_won_rex: 5000 },
            { rank: 4, trader_id: 't_106', username: 'QuantumPips', roi: 88.1, final_equity: 18810, prize_won_rex: 2500 },
            { rank: 5, trader_id: 't_107', username: 'CyberWhale', roi: 64.2, final_equity: 16420, prize_won_rex: 1500 },
            { rank: 6, trader_id: 't_108', username: 'VeloceFX', roi: 49.5, final_equity: 14950, prize_won_rex: 1000 }
          ]
        },
        autumn_2025: {
          success: true,
          revealed: true,
          tournament_id: 'autumn_2025',
          tournament_name: 'Autumn Apex 2025',
          revealed_date: 'October 15, 2025',
          prize_pool_rex: 25000,
          participants: 175,
          leaderboard: [
            { rank: 1, trader_id: 't_102', username: 'FluxKairos', roi: 134.7, final_equity: 23470, prize_won_rex: 10000 },
            { rank: 2, trader_id: 't_104', username: 'ApexBull', roi: 112.3, final_equity: 21230, prize_won_rex: 7000 },
            { rank: 3, trader_id: 't_101', username: 'TitanMaverick', roi: 95.0, final_equity: 19500, prize_won_rex: 4000 },
            { rank: 4, trader_id: 't_109', username: 'AuraScalper', roi: 58.4, final_equity: 15840, prize_won_rex: 2500 },
            { rank: 5, trader_id: 't_110', username: 'NeonGrid', roi: 41.2, final_equity: 14120, prize_won_rex: 1500 }
          ]
        }
      };

      let activeTournamentId = 'summer_2026';
      let countdownTimerId = null;

      // Master Initialization
      async function init() {
        let tournaments = TOURNAMENTS_FALLBACK;

        // Try calling backend function if available
        if (window.FORTEX_AUTH && typeof FORTEX_AUTH.callFunction === 'function') {
          try {
            const tourneyRes = await FORTEX_AUTH.callFunction('getTournaments', {});
            if (tourneyRes && tourneyRes.success && Array.isArray(tourneyRes.tournaments) && tourneyRes.tournaments.length > 0) {
              tournaments = tourneyRes.tournaments;
            }
          } catch (e) {
            console.log('Using default tournament roster:', e);
          }
        }

        renderTabs(tournaments);
        await selectTournament(activeTournamentId);
      }

      // Render Tabs & Dropdown Options
      function renderTabs(tournaments) {
        const tabsContainer = document.getElementById('tournament-tabs');
        const selectContainer = document.getElementById('tournament-select');
        if (!tabsContainer || !selectContainer) return;

        tabsContainer.innerHTML = tournaments.map(t => {
          const isSealed = t.status === 'sealed' || t.revealed === false;
          return `
            <button class="tournament-tab ${t.id === activeTournamentId ? 'active' : ''}" data-id="${t.id}">
              <span>${isSealed ? '🔒' : '🏆'}</span>
              <span>${t.name}</span>
              <span class="badge" style="font-size: 11px; padding: 2px 8px; ${isSealed ? 'background: rgba(255,184,41,0.2); color:#FFB829;' : 'background: rgba(128,82,255,0.2); color:#8052FF;'}">
                ${isSealed ? 'SEALED' : 'REVEALED'}
              </span>
            </button>
          `;
        }).join('');

        selectContainer.innerHTML = tournaments.map(t => {
          const isSealed = t.status === 'sealed' || t.revealed === false;
          return `
            <option value="${t.id}" ${t.id === activeTournamentId ? 'selected' : ''}>
              ${isSealed ? '🔒 [SEALED]' : '🏆 [REVEALED]'} ${t.name}
            </option>
          `;
        }).join('');

        // Tab click listeners
        tabsContainer.querySelectorAll('.tournament-tab').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            selectTournament(id);
          });
        });

        // Mobile select listener
        selectContainer.addEventListener('change', (e) => {
          selectTournament(e.target.value);
        });
      }

      // Select & Load Tournament Leaderboard
      async function selectTournament(tournamentId) {
        activeTournamentId = tournamentId;

        // Update active styling
        document.querySelectorAll('.tournament-tab').forEach(btn => {
          if (btn.getAttribute('data-id') === tournamentId) btn.classList.add('active');
          else btn.classList.remove('active');
        });

        const selectEl = document.getElementById('tournament-select');
        if (selectEl) selectEl.value = tournamentId;

        // Render loading state immediately
        renderLoadingState();

        let data = null;

        // Call backend function getLeaderboard with tournament_id
        if (window.FORTEX_AUTH && typeof FORTEX_AUTH.callFunction === 'function') {
          try {
            const res = await FORTEX_AUTH.callFunction('getLeaderboard', { tournament_id: tournamentId });
            if (res && res.success) {
              data = res;
            }
          } catch (err) {
            console.warn('Backend call failed, loading fallback dataset:', err);
          }
        }

        // Use fallback if response empty or errored
        if (!data || !data.success) {
          data = LEADERBOARD_FALLBACKS[tournamentId] || null;
        }

        // Render appropriate state
        if (!data) {
          renderEmptyState();
        } else if (data.revealed === false) {
          renderSealedState(data);
        } else if (data.revealed === true) {
          if (!data.leaderboard || data.leaderboard.length === 0) {
            renderEmptyState();
          } else {
            renderRevealedState(data);
          }
        } else {
          renderEmptyState();
        }
      }

      // Loading state HTML
      function renderLoadingState() {
        if (countdownTimerId) clearInterval(countdownTimerId);
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        container.innerHTML = `
          <div style="border: 1px solid rgba(128, 82, 255, 0.2); border-radius: 24px; padding: 60px 24px; text-align: center; background: rgba(10, 11, 16, 0.6);">
            <div class="spinner-ring"></div>
            <div style="font-size: 20px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">
              Connecting to Results Vault...
            </div>
            <p style="font-size: 14px; color: var(--color-ash-gray);">
              Checking tournament authorization and encryption seal
            </p>
          </div>
        `;
      }

      // Sealed state HTML
      function renderSealedState(data) {
        if (countdownTimerId) clearInterval(countdownTimerId);
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const revealDateIso = data.reveal_date || '2026-08-23T23:59:59.000Z';
        const tourneyName = data.tournament_name || 'Summer Showdown 2026';

        container.innerHTML = `
          <div class="sealed-banner-card">
            <div style="text-align: center; max-width: 780px; margin: 0 auto;">
              <!-- Vault Lock Icon Visual -->
              <div style="margin-bottom: var(--spacing-24); display: inline-flex; align-items: center; justify-content: center; width: 88px; height: 88px; border-radius: 50%; background: rgba(128, 82, 255, 0.12); border: 1px solid rgba(128, 82, 255, 0.3); box-shadow: 0 0 30px rgba(128, 82, 255, 0.2);">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#8052ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <circle cx="12" cy="16" r="1.5" fill="#8052ff"></circle>
                </svg>
              </div>

              <!-- Vault Sealed Badge -->
              <div style="margin-bottom: var(--spacing-18);">
                <span class="rex-badge" style="background: rgba(255, 184, 41, 0.15); border-color: #FFB829; color: #FFB829; font-size: 14px; padding: 6px 18px;">
                  🔒 RESULTS SEALED IN VAULT
                </span>
              </div>

              <h2 style="font-size: clamp(32px, 5vw, 56px); font-weight: 400; letter-spacing: -0.04em; color: var(--color-bone-white); margin-bottom: var(--spacing-18); line-height: 1.1;">
                Nobody Knows Where They Stand
              </h2>

              <p class="body-text-muted" style="max-width: 640px; margin: 0 auto var(--spacing-36); font-size: 18px; line-height: 1.6;">
                Fortex FX leaderboards are strictly hidden during live tournament play. No live ranks, no position feedback, no psychological mind games. Trade your strategy with total focus—the truth will be revealed when the vault opens.
              </p>

              <!-- Reveal Date Countdown Box -->
              <div style="border: 1px solid rgba(128, 82, 255, 0.25); background: rgba(0, 0, 0, 0.5); border-radius: 20px; padding: 24px; margin-bottom: var(--spacing-36); display: inline-block; min-width: 280px;">
                <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ash-gray); margin-bottom: 8px;">
                  OFFICIAL UNVEILING COUNTDOWN
                </div>
                <div id="sealed-countdown" class="countdown-box">
                  --d : --h : --m : --s
                </div>
                <div style="font-size: 13px; color: var(--color-silver-mist); margin-top: 8px;">
                  Scheduled Reveal Date: <span style="color: var(--color-saffron-spark); font-weight: 600;">${new Date(revealDateIso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              <!-- Anticipation Message -->
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: var(--spacing-24); margin-top: var(--spacing-12);">
                <p style="font-size: 16px; color: var(--color-saffron-spark); font-style: italic; margin-bottom: 0;">
                  "The surprise is worth the wait. All trader positions, final equity, and REX prizes unlock simultaneously on reveal day."
                </p>
              </div>
            </div>

            <!-- Curiosity Gap Psychology Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--spacing-24); margin-top: var(--spacing-60);">
              <div class="float-item" style="border-color: rgba(128, 82, 255, 0.2);">
                <div class="float-item-label" style="color: var(--color-electric-iris);">01 · ABSOLUTE SECRECY</div>
                <div style="font-size: 20px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">No Position Leakage</div>
                <p class="float-item-body">Zero live leaderboards prevent competitors from targeting or copying your positions.</p>
              </div>
              <div class="float-item" style="border-color: rgba(128, 82, 255, 0.2);">
                <div class="float-item-label" style="color: var(--color-electric-iris);">02 · PURE FOCUS</div>
                <div style="font-size: 20px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">Zero Rank Anxiety</div>
                <p class="float-item-body">Execute your trading plan cleanly without chasing high-risk trades out of ranking panic.</p>
              </div>
              <div class="float-item" style="border-color: rgba(128, 82, 255, 0.2);">
                <div class="float-item-label" style="color: var(--color-electric-iris);">03 · THE BIG UNVEIL</div>
                <div style="font-size: 20px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 8px;">Eruptive Reveal Day</div>
                <p class="float-item-body">Experience the ultimate thrill when the clock strikes zero and the winner list drops live.</p>
              </div>
            </div>
          </div>
        `;

        startSealedCountdown(revealDateIso);
      }

      // Countdown Timer Function
      function startSealedCountdown(revealDateIso) {
        const el = document.getElementById('sealed-countdown');
        if (!el) return;

        const target = new Date(revealDateIso).getTime();

        function update() {
          const now = Date.now();
          const diff = target - now;

          if (diff <= 0) {
            el.textContent = 'REVEALING NOW';
            return;
          }

          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);

          el.textContent = `${String(d).padStart(2,'0')}d : ${String(h).padStart(2,'0')}h : ${String(m).padStart(2,'0')}m : ${String(s).padStart(2,'0')}s`;
        }

        update();
        countdownTimerId = setInterval(update, 1000);
      }

      // Revealed state HTML
      function renderRevealedState(data) {
        if (countdownTimerId) clearInterval(countdownTimerId);
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        const tourneyName = data.tournament_name || 'Tournament Results';
        const prizePool = data.prize_pool_rex ? `${data.prize_pool_rex.toLocaleString()} REX` : '$40,000 in REX';
        const revealedDate = data.revealed_date || 'Recently';
        const leaderboard = data.leaderboard || [];

        const top3 = leaderboard.slice(0, 3);
        const rank1 = top3[0] || null;
        const rank2 = top3[1] || null;
        const rank3 = top3[2] || null;

        let podiumHtml = '';
        if (top3.length > 0) {
          podiumHtml = `
            <div class="podium-grid">
              <!-- 1st Place - Gold -->
              ${rank1 ? `
              <div class="podium-card podium-gold">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                  <span class="badge" style="background: rgba(212,175,55,0.2); color:#D4AF37; border: 1px solid #D4AF37; font-weight:700;">
                    👑 CHAMPION · 1ST PLACE
                  </span>
                  <div style="font-size: 28px;">🥇</div>
                </div>
                <div style="font-size: 28px; font-weight: 600; color: var(--color-bone-white); margin-bottom: 6px;">
                  ${rank1.username}
                </div>
                <div class="roi-positive" style="font-size: 32px; font-weight: 700; margin-bottom: 12px;">
                  +${rank1.roi}% ROI
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; border-top: 1px solid rgba(212,175,55,0.2); padding-top: 12px; margin-top: 12px;">
                  <span style="color: var(--color-silver-mist);">Final Equity: <strong style="color:#fff;">$${(rank1.final_equity || 0).toLocaleString()}</strong></span>
                  <span class="rex-badge">💰 ${(rank1.prize_won_rex || 0).toLocaleString()} REX</span>
                </div>
              </div>
              ` : ''}

              <!-- 2nd Place - Silver -->
              ${rank2 ? `
              <div class="podium-card podium-silver">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                  <span class="badge" style="background: rgba(192,192,192,0.2); color:#E5E7EB; border: 1px solid #C0C0C0; font-weight:700;">
                    2ND PLACE
                  </span>
                  <div style="font-size: 28px;">🥈</div>
                </div>
                <div style="font-size: 24px; font-weight: 600; color: var(--color-bone-white); margin-bottom: 6px;">
                  ${rank2.username}
                </div>
                <div class="roi-positive" style="font-size: 28px; font-weight: 700; margin-bottom: 12px;">
                  +${rank2.roi}% ROI
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; border-top: 1px solid rgba(192,192,192,0.2); padding-top: 12px; margin-top: 12px;">
                  <span style="color: var(--color-silver-mist);">Final Equity: <strong style="color:#fff;">$${(rank2.final_equity || 0).toLocaleString()}</strong></span>
                  <span class="rex-badge">💰 ${(rank2.prize_won_rex || 0).toLocaleString()} REX</span>
                </div>
              </div>
              ` : ''}

              <!-- 3rd Place - Bronze -->
              ${rank3 ? `
              <div class="podium-card podium-bronze">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                  <span class="badge" style="background: rgba(205,127,50,0.2); color:#CD7F32; border: 1px solid #CD7F32; font-weight:700;">
                    3RD PLACE
                  </span>
                  <div style="font-size: 28px;">🥉</div>
                </div>
                <div style="font-size: 24px; font-weight: 600; color: var(--color-bone-white); margin-bottom: 6px;">
                  ${rank3.username}
                </div>
                <div class="roi-positive" style="font-size: 28px; font-weight: 700; margin-bottom: 12px;">
                  +${rank3.roi}% ROI
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; border-top: 1px solid rgba(205,127,50,0.2); padding-top: 12px; margin-top: 12px;">
                  <span style="color: var(--color-silver-mist);">Final Equity: <strong style="color:#fff;">$${(rank3.final_equity || 0).toLocaleString()}</strong></span>
                  <span class="rex-badge">💰 ${(rank3.prize_won_rex || 0).toLocaleString()} REX</span>
                </div>
              </div>
              ` : ''}
            </div>
          `;
        }

        container.innerHTML = `
          <div style="margin-bottom: var(--spacing-36);">
            <!-- Revealed Header & Timestamp -->
            <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 18px; margin-bottom: var(--spacing-24);">
              <div>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <span class="badge" style="background: rgba(34,197,94,0.15); border: 1px solid #22c55e; color:#22c55e;">
                    ✓ RESULTS UNLOCKED
                  </span>
                  <span style="font-size: 14px; color: var(--color-ash-gray);">
                    Revealed on <strong style="color: var(--color-bone-white);">${revealedDate}</strong>
                  </span>
                </div>
                <h2 style="font-size: clamp(32px, 4vw, 52px); font-weight: 400; color: var(--color-bone-white); margin: 0;">
                  ${tourneyName}
                </h2>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: var(--color-ash-gray);">Total Distributed Pool</div>
                <div style="font-size: 32px; font-weight: 600; color: var(--color-saffron-spark);">${prizePool}</div>
              </div>
            </div>

            <!-- Top 3 Podium Highlights -->
            ${podiumHtml}

            <!-- Ranked Table Card -->
            <div style="border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px; background: rgba(10, 11, 16, 0.8);">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
                <div style="font-size: 20px; font-weight: 400; color: var(--color-bone-white);">
                  Full Tournament Standings (${leaderboard.length} Traders)
                </div>
                <input type="text" id="trader-search-input" class="search-input-box" placeholder="🔍 Search trader username..." />
              </div>

              <div style="overflow-x: auto;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th style="width: 90px;">Rank</th>
                      <th>Trader Username</th>
                      <th>ROI (%)</th>
                      <th>Final Equity</th>
                      <th style="text-align: right;">Prize Won</th>
                    </tr>
                  </thead>
                  <tbody id="leaderboard-tbody">
                    ${renderTableRows(leaderboard)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;

        // Search filter input event
        const searchInput = document.getElementById('trader-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = leaderboard.filter(item => 
              item.username.toLowerCase().includes(query) || 
              String(item.rank).includes(query)
            );
            const tbody = document.getElementById('leaderboard-tbody');
            if (tbody) tbody.innerHTML = renderTableRows(filtered);
          });
        }
      }

      // Render Table Row Elements
      function renderTableRows(rows) {
        if (!rows || rows.length === 0) {
          return `
            <tr>
              <td colspan="5" style="text-align: center; padding: 36px; color: var(--color-ash-gray);">
                No traders match your search query.
              </td>
            </tr>
          `;
        }

        return rows.map(item => {
          const isTop1 = item.rank === 1;
          const isTop2 = item.rank === 2;
          const isTop3 = item.rank === 3;

          let rankDisplay = `#${item.rank}`;
          let rankClass = '';
          if (isTop1) { rankDisplay = '🥇 #1'; rankClass = 'rank-1'; }
          else if (isTop2) { rankDisplay = '🥈 #2'; rankClass = 'rank-2'; }
          else if (isTop3) { rankDisplay = '🥉 #3'; rankClass = 'rank-3'; }

          const roiVal = parseFloat(item.roi || 0);
          const roiFormatted = (roiVal >= 0 ? `+${roiVal.toFixed(1)}%` : `${roiVal.toFixed(1)}%`);
          const roiClass = roiVal >= 0 ? 'roi-positive' : 'roi-negative';

          const equityFormatted = `$${(item.final_equity || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          const prizeFormatted = item.prize_won_rex && item.prize_won_rex > 0 
            ? `<span class="rex-badge">💰 ${item.prize_won_rex.toLocaleString()} REX</span>` 
            : '<span style="color: var(--color-ash-gray); font-size: 13px;">—</span>';

          const rowStyle = isTop1 
            ? 'background: rgba(212, 175, 55, 0.05);' 
            : (isTop2 ? 'background: rgba(192, 192, 192, 0.03);' 
            : (isTop3 ? 'background: rgba(205, 127, 50, 0.03);' : ''));

          return `
            <tr style="${rowStyle}">
              <td class="${rankClass}" style="font-weight: 600; font-size: 16px;">
                ${rankDisplay}
              </td>
              <td style="font-weight: 400; color: var(--color-bone-white);">
                ${item.username}
              </td>
              <td class="${roiClass}" style="font-size: 16px;">
                ${roiFormatted}
              </td>
              <td style="color: var(--color-silver-mist); font-variant-numeric: tabular-nums;">
                ${equityFormatted}
              </td>
              <td style="text-align: right;">
                ${prizeFormatted}
              </td>
            </tr>
          `;
        }).join('');
      }

      // Empty State HTML
      function renderEmptyState() {
        if (countdownTimerId) clearInterval(countdownTimerId);
        const container = document.getElementById('leaderboard-container');
        if (!container) return;

        container.innerHTML = `
          <div style="border: 1px dashed rgba(128, 82, 255, 0.3); border-radius: 24px; padding: 80px 24px; text-align: center; background: rgba(10, 11, 16, 0.4);">
            <div style="margin-bottom: 20px; font-size: 48px;">✨</div>
            <div class="badge" style="background: rgba(128,82,255,0.15); color:#8052FF; border:1px solid #8052FF; margin-bottom: 16px; font-size: 13px; padding: 6px 16px;">
              UNTOUCHED VAULT
            </div>
            <h3 style="font-size: 32px; font-weight: 400; color: var(--color-bone-white); margin-bottom: 16px;">
              No tournaments have been revealed yet. The first reveal will be epic.
            </h3>
            <p style="max-width: 520px; margin: 0 auto 28px; color: var(--color-silver-mist); font-size: 16px; line-height: 1.6;">
              When an active competition finishes and the vault seal is broken by the administrator, the entire ranking table will instantly appear right here.
            </p>
            <a href="signin.html" class="btn-primary">Compete in Current Tournament</a>
          </div>
        `;
      }

      // Past Archive inspect buttons event listeners
      document.querySelectorAll('[data-select-tournament]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.getAttribute('data-select-tournament');
          selectTournament(id);
          const target = document.getElementById('leaderboard-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      // Run Init
      init();
    });
  </script>
</body>
</html>
"""

with open('./vortex-fx/leaderboard.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Updated ./vortex-fx/leaderboard.html successfully!")
