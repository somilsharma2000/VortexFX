# FORTREX FX — Royal Reference Designs Extraction & High-Tech Cockpit Upgrade Plan

## Executive Summary
This document provides a comprehensive, element-by-element architectural analysis of all six FORTREX royal reference designs (`landing.html`, `dashboard.html`, `tournaments.html`, `leaderboard.html`, `tools.html`, and `admin.html`). It details how the rich royal/sovereign visual motifs, interactive components, and CSS techniques can be translated into FORTREX FX's flagship **dark obsidian (`#06070A`) + gold (`#D4AF37` / `#EACA7A`) high-tech fighter jet cockpit aesthetic**.

---

## 1. Color Palette Comparison: Royal Reference vs. FORTREX FX Cockpit

| Element / Visual Tier | Royal Reference Palette | FORTREX FX Cockpit Palette | Tactical Adaptation & Aesthetic Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Canvas** | Deep OLED Black (`#000000`, `#030303`) | Dark Obsidian (`#06070A`) | Zero-glare stealth cockpit background with deep shadow depth |
| **Secondary Panel Base** | Royal Purple Dark (`#100826`, `#1A0B2E`) | Carbon / Stealth Dark (`#0D0F14`, `#12151D`) | Secondary panel fill providing high contrast with gold reticle borders |
| **Primary Accent Gold** | Regal Gold (`#D4AF37`, `#F5D061`) | Jet Gold (`#D4AF37`, `#EACA7A`) | HUD reticle highlights, active status indicators, primary CTA borders |
| **High-Glow Gold** | Metallic Gold (`#FFD700`, `#FFF1B0`) | Tactical Gold Glow (`#FFE885`, `#F3C649`) | Priority alert state, #1 rank crowns, live yield indicators |
| **Warning / Hazard Accent**| Heraldic Crimson (`#8B0000`, `#4A0E4E`) | Afterburner Red (`#7F1D1D`, `#B45309`) | Anti-fraud warnings, max drawdown risk callouts, negative PnL HUD state |
| **Silver Accent (#2 Rank)** | Sterling Silver (`#E0E0E0`, `#CBD5E1`) | Chrome Titanium (`#D1D5DB`, `#9CA3AF`) | Rank #2 badges, secondary stat sub-labels, inactive HUD toggles |
| **Bronze Accent (#3 Rank)** | Antiqued Bronze (`#CD7F32`, `#8D6E63`) | Tactical Anodized Copper (`#C2410C`, `#9A3412`) | Rank #3 badges, tertiary metrics, baseline tier boundaries |
| **Glow / Glass Ambient** | Purple-Gold Ambient Glows | Gold/Cyan HUD Radial Glow | High-tech HUD glassmorphism with 20px blur and gold inset rings |

---

## 2. Per-Page Breakdown of Best Elements to Extract

### Page 1: Landing Page (`landing.html`) — *The Sovereign Stronghold*

1. **Unique CSS Animations or Effects:**
   - **Double-Border Gold Framing (`.double-border-gold`):** Layered gold borders created using `border: 1px solid rgba(212,175,55,0.5)` with `outline: 1px solid rgba(212,175,55,0.2)` and `outline-offset: -4px` for depth.
   - **Hero Particle Network System:** HTML5 Canvas particle network (`particle-canvas`) generating floating gold nodes connected by dynamic proximity-based lines.
   - **Ambient Royal Purple Glow:** Soft background lighting using radial gradients (`radial-gradient(circle, rgba(74,14,78,0.45) 0%, transparent 75%)`).
   - **Preloader Progress System:** Overlay loader with percentage counter and animated gold glow loading bar.

2. **Layout Patterns & Component Designs:**
   - **Heraldic Shield Polygon Cards (`.heraldic-shield`):** Distinctive polygon clip-path cards (`clip-path: polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)`) framing key features.
   - **4-Step Progression Grid:** Connected workflow path (Select Decree -> Trade & Build FPS -> Ascend Rank -> Claim Treasury) with numeric gold badges.
   - **Sticky Proclamation Bar:** Top floating announcement banner with real-time countdown timer.

3. **Color Schemes, Gradients & Visual Treatments:**
   - Gold gradient text (`linear-gradient(135deg, #FFF8DC 0%, #FFD700 30%, #F0B90B 70%, #AA7C11 100%)`).
   - Dark glassmorphism (`rgba(18, 18, 18, 0.75)` with `backdrop-filter: blur(16px)`).

4. **Interactive Elements:**
   - **Typing Text Headline Loop:** Automated typewriter effect cycling through platform taglines.
   - **Yield & $REX Calculator:** Dual range sliders for Monthly Volume ($M) and Win Rate (%) dynamically recalculating predicted payouts and $REX token yields.

5. **Unique Sections or Features to Adopt:**
   - **$REX Sovereign Vault Rewards Marketplace:** Highlighting concrete tangible redemptions ($100K Funded Pass, $1,000 USDT Cashout, VIP Pass, Rolex Vault Draw).
   - **Live UTC Imperial Clock:** Real-time clock establishing urgency for challenge reset windows.

6. **Typography Treatments:**
   - Fonts: Sora (Bold display headings), Inter (Clean interface body), JetBrains Mono (Financial telemetry).
   - Uppercase tracking (`letter-spacing: 0.15em` / `0.2em`) for a military command header style.

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Double-Line Glassmorphic Cards (`.royal-card`):** Dark frosted cards with gold stroke rings and subtle hover elevation (`transform: translateY(-4px)`).
   - **Active Decree Challenge Grid:** 3-column card array comparing Prop, IB ROI, and Sprint challenges.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Heraldic Shield Cards -> Flight Telemetry Chevrons:** Convert medieval shield clip-paths into tactical fighter jet chevron cards.
   - **Wax Seals -> Sealed Cockpit HUD Verification Badges:** Retain circle badge layouts but style with glowing neon gold reticle rings.

---

### Page 2: Dashboard / Throne Room (`dashboard.html`) — *Command Deck*

1. **Unique CSS Animations or Effects:**
   - **Wax Seal Pop Keyframe (`@keyframes waxSealPop`):** Rotational scale-in pop effect (`scale(0) rotate(45deg)` -> `scale(1) rotate(0deg)`) for achievement unlocks.
   - **Picture Frame Effect (`.royal-frame`):** Glassmorphic frame with corner filigree L-brackets (`.filigree-tl`, `.filigree-tr`, `.filigree-bl`, `.filigree-br`).
   - **Gold Coin Shimmer:** Pulsing radial lighting underneath main balance counters.

2. **Layout Patterns & Component Designs:**
   - **Sovereign Rank Ascension Path:** Horizontal milestone bar displaying rank progression (Squire -> Knight -> Duke -> Sovereign) with active glow nodes.
   - **Command Sidebar Navigation:** Dual-mode vertical navigation with active gold reticle indicator and collapsed icon mode.
   - **Dual Conquest Arena Grid:** Live tournament participation cards featuring active countdown clocks.

3. **Color Schemes, Gradients & Visual Treatments:**
   - Obsidian base (`#030303`) layered with subtle damask radial gradients.
   - Defined CSS variables: `--gold-primary: #D4AF37;`, `--gold-light: #FFD700;`, `--gold-dark: #AA771C;`.

4. **Interactive Elements:**
   - **One-Click Quest Claiming with Confetti:** Interactive quest cards (`claimDecree`) triggering `canvas-confetti` particle explosions and balance increments.
   - **Live Countdown Timers:** Synchronized timer scripts (`arena1-timer`) calculating remaining hours/minutes/seconds.
   - **Referral Code Direct Copy:** One-click clipboard copy and social share shortcuts.

5. **Unique Sections or Features to Adopt:**
   - **Royal Decrees & Quests Module:** Daily login homage, social allegiance tasks, and MT4/MT5 verification quests rewarding instant $REX.
   - **Dynasty Lineage Referral Chart:** 2-tier affiliate lineage tree detailing commission structures and active squad members.
   - **Audit Scroll / Royal Ledger Stream:** Filterable transaction log table with status pill indicators.

6. **Typography Treatments:**
   - Balance totals rendered in bold JetBrains Mono (`font-mono text-3xl font-extrabold tracking-tight`).
   - Category labels in uppercase Sora (`text-xs uppercase tracking-widest text-gold-400`).

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Shield Progress Cards (`.shield-card`):** High-density stat containers featuring glowing horizontal progress meters (`.progress-glow`).
   - **Vault Store Voucher Cards:** Voucher cards displaying token cost, item preview, and claim buttons.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Throne Room Dashboard -> Cockpit Main Flight Deck:** Central dashboard translates into the pilot's primary HUD telemetry screen.
   - **Ascension Path -> Flight Rank Promotion Vector:** Squire/Knight/Duke/Sovereign ranks convert into Flight Cadet -> Wing Commander -> Squadron Ace -> Sovereign Ace.

---

### Page 3: Tournaments / Arena of Kings (`tournaments.html`) — *Tactical Arenas*

1. **Unique CSS Animations or Effects:**
   - **Metallic Gold Button Sweep (`.bg-gold-metallic`):** Smooth background position animation (`background-size: 200%`) creating a metallic sheen on hover.
   - **Parchment Texture Overlay (`.parchment-edict`):** Dark center radial gradient with subtle gold cross-hatching.
   - **Gold Tassel Accents:** Decorative hanging vector accents framing high-tier tournament banners.

2. **Layout Patterns & Component Designs:**
   - **Featured Arena Trio Banner:** Top-tier tournament cards featuring live countdowns, total prize pools, and immediate registration triggers.
   - **The Royal Charter Grid:** 2-column codex grid detailing challenge rules and anti-fraud regulations.
   - **Registration Modal Drawer:** Glassmorphic popup modal with rank selection and oath confirmation checkboxes.

3. **Color Schemes, Gradients & Visual Treatments:**
   - Indigo-Gold radial gradient overlay (`radial-gradient(circle at 50% 0%, rgba(74, 0, 224, 0.15) 0%, transparent 60%)`).
   - Metallic gold gradient text (`linear-gradient(135deg, #FFF1B0 0%, #F5D061 30%, #D4AF37 70%, #996515 100%)`).

4. **Interactive Elements:**
   - **FPS Score & ROI Live Calculator:** Interactive calculator evaluating Start Balance, End Balance, Consistency Score, and Drawdown to compute Fair Performance Score (FPS) and ROI %.
   - **Arena Mode Switcher:** Tab switcher between Prop Challenge Arena and IB Broker ROI Arena.

5. **Unique Sections or Features to Adopt:**
   - **The Royal Charter (Code of Honor):** 6-part operating framework (Verification, Anti-Fraud, Valor, Tribute, Re-entry, Honor Guarantee).
   - **Pure ROI Formula Showcase:** Monospace formula display explaining exact ranking calculations.

6. **Typography Treatments:**
   - Numeric formulas and scoring outputs formatted in monospace (`font-mono text-amber-300`).
   - Charter titles formatted in Sora display headings with golden underline accents.

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Rank Tier Cards (Squire, Knight, Duke):** Metallic gold bordered cards detailing tier access, fee structures, and prize splits.
   - **Scoring System Card:** Math breakdown box explaining FPS formula weights.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Arena of Kings -> Flight Combat Arenas:** Competitions become Sector Dogfights / Tactical Sector Challenges.
   - **Royal Oath -> Flight Operating Directives:** Rules confirmation becomes Pilot Flight Operating Protocol.

---

### Page 4: Leaderboard / Court of Kings (`leaderboard.html`) — *Tactical Standings*

1. **Unique CSS Animations or Effects:**
   - **Crown Floating Animation (`@keyframes crownFloat`):** Smooth vertical float animation (`translateY(0px)` -> `translateY(-8px)`) for top-ranked crown badges.
   - **Gold Row Shimmer (`@keyframes goldShimmer`):** Background position shimmer animation moving across #1 ranked table rows.
   - **Filigree Center Line (`.filigree-divider`):** Horizontal gold gradient line with a center diamond icon.

2. **Layout Patterns & Component Designs:**
   - **The Royal Triad Podium:** 3-tier podium layout (#1 Center High, #2 Left Medium, #3 Right Low) with Gold/Silver/Bronze crowns, flags, and score badges.
   - **Sticky Filter & Search Toolbar:** Unified search bar with tier filter dropdown and verified-only toggle button.
   - **High-Density Trader Table:** Compact table layout with flags, prop firm badges, account capitalization, win rates, and total returns.

3. **Color Schemes, Gradients & Visual Treatments:**
   - Gold, Silver, and Bronze rank gradient styles (`.gold-gradient-text`, `.silver-gradient-text`, `.bronze-gradient-text`).
   - Deep slate-blue glass panels (`.glass-panel-royal`) mixed with gold highlighted panels (`.glass-panel-gold`).

4. **Interactive Elements:**
   - **Dual Dataset Switcher:** One-click tab toggle switching between Prop Challenge Traders (FPS Scoring) and IB Broker Traders (Pure ROI %).
   - **Instant Client-Side Filtering:** Instant search input and tier filter updating the podium and table without page reloads.

5. **Unique Sections or Features to Adopt:**
   - **The Royal Triad Podium Section:** High-impact visual podium showcasing top 3 traders.
   - **Prop Firm Tagging & Verification Seals:** Verified trader badges displaying firm logos (FTMO, FundedNext, MFF) and account scale.

6. **Typography Treatments:**
   - Standings numbers in metallic display typography (`font-extrabold text-amber-300`).
   - Return metrics and FPS ratings in monospace font (`+142.8%`, `94.2 FPS`).

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Podium Cards:** Glowing glass cards with top crown badges, custom rank stroke borders, and float animations.
   - **Wax Seal Rank Badges:** Status pills displaying titles like Sovereign Champion or Apex Duke.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Court of Kings -> Ace Pilot Leaderboard:** Royal Triad becomes Top Gun Flight Podium (#1 Ace Pilot, #2 Wing Commander, #3 Squadron Leader).
   - **Wax Seal Badges -> Tactical Flight Wings:** Pin badges representing verified flight tier status.

---

### Page 5: Tools / Royal Armory (`tools.html`) — *Tactical Cockpit Suite*

1. **Unique CSS Animations or Effects:**
   - **Text Shine Animation (`@keyframes textShine`):** Sweeping shine effect moving across golden header text (`background-position: 200% center`).
   - **Speedometer Dial Rotation:** Dynamic CSS transition animating the Consistency Compass needle rotation (`transform: rotate(...)`).
   - **Crown Corner Brackets (`.crown-corner-tl`, `.crown-corner-tr`, etc.):** L-shaped notched gold corner borders wrapping input cards.

2. **Layout Patterns & Component Designs:**
   - **2x3 Tool Matrix Grid:** Responsive grid housing 6 specialized financial calculators.
   - **Split Input/Output Card Design:** Left-side slider input controls paired with right-side live gauge displays.
   - **Searchable Codex Accordion:** 2-column glossary grid with instant search bar filtering.

3. **Color Schemes, Gradients & Visual Treatments:**
   - Obsidian canvas (`#000000`) with purple ambient backlighting (`rgba(88, 28, 135, 0.2)`).
   - High-contrast gold input borders (`.royal-input`) with golden focus rings.

4. **Interactive Elements:**
   - **Consistency Compass Calculator:** Multi-slider calculator evaluating Account Size, Target Profit %, Max Daily Cap, and Trading Days to compute daily maximum profit limit and compliance safety state.
   - **Position Size & Lot Scaler:** Real-time lot calculator factoring balance, risk %, and stop loss pips.
   - **Pip Crown & Margin Scepter Tools:** Instant pip value and free margin estimators.
   - **Macroeconomic Oracle Calendar:** Filterable economic calendar (NFP, FOMC, ECB) with volatility ratings and countdown badges.

5. **Unique Sections or Features to Adopt:**
   - **The Consistency Compass:** Essential compliance calculator keeping traders within firm drawdown and rule limits.
   - **The Codex of Command:** Interactive dictionary explaining prop firm terminology and market mechanics.

6. **Typography Treatments:**
   - Output numbers formatted in bold JetBrains Mono (`font-mono text-2xl font-bold text-amber-300`).
   - Technical labels in uppercase sub-headers (`text-xs uppercase tracking-widest text-slate-400`).

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Royal Picture Frame Calculator Cards (`.royal-frame`):** Heavy glassmorphic cards with notched corner brackets.
   - **Compliance Dial Gauge:** Semi-circular gauge visualizing rule safety from green safe zone to red violation zone.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Royal Armory -> Tactical Cockpit Telemetry Suite:** Calculators become Flight Computer Ordnance Tools.
   - **Consistency Compass -> Flight Envelope Compliance Dial:** Gauge measures G-force / drawdown tolerance limits.

---

### Page 6: Admin / Royal Court (`admin.html`) — *Sovereign Command Center*

1. **Unique CSS Animations or Effects:**
   - **Crown Pulse Animation (`@keyframes crownPulse`):** Pulsing drop-shadow glow applied to key system alert badges (`drop-shadow(0 0 5px rgba(212,175,55,0.6))`).
   - **Status Banishment Toggle:** Smooth UI transition turning user rows from active gold to dark red slashed state.

2. **Layout Patterns & Component Designs:**
   - **4-Column Kingdom Stat Grid:** High-level metric summary cards with icon badges, total values, growth percentages, and mini sparkline indicators.
   - **Royal Guard Fraud Engine Module:** 3-column alert grid highlighting high-risk automated detections (Subnet IP Match, Order Bursting, EA Signature Duplication).
   - **Grid Chart Dashboard:** 2x2 grid housing embedded Chart.js visualizations (User Growth, $REX Vault Distribution, Tournament Participation, Revenue Streams).

3. **Color Schemes, Gradients & Visual Treatments:**
   - Deep obsidian/purple background (`#020204` base with `#2B1055` radial lighting).
   - Dual gradient text: Pure Gold (`.gold-gradient-text`) and Sovereign Purple Gold (`.royal-gradient-text`).
   - Red Wax Seal Alerts (`.wax-seal-red`) for fraud detection callouts.

4. **Interactive Elements:**
   - **Royal Guard Action Handlers:** Instant "Resolve", "Flag", and "Banish" triggers with toast notifications (`showToast`).
   - **Live User Directory Table:** Dynamic user management table with search, status filtering, $REX balance inline editing, and account status toggling.
   - **Issue Royal Proclamation Modal:** Full interactive workflow for launching new platform tournaments with custom parameters.
   - **Systemic Audit Trigger:** Command button running automated integrity checks across the database.

5. **Unique Sections or Features to Adopt:**
   - **The Royal Guard Anti-Fraud Engine:** High-tech fraud radar interface indispensable for prop firm and IB platforms.
   - **Kingdom Treasury Analytics:** 4-chart financial analytics hub breaking down platform economics.
   - **Guild & Broker Alliance Directory:** Partner firm management panel displaying active integrations.

6. **Typography Treatments:**
   - Live UTC Imperial Clock formatted in bold JetBrains Mono with gold drop shadow (`font-mono text-xl font-bold tracking-widest text-amber-300`).
   - System alert titles formatted in crisp, uppercase Sora display text.

7. **Card Designs, Stat Displays & Data Visualizations:**
   - **Fraud Alert Cards:** Dark violet cards with glowing red warning borders, detail lists, and quick action buttons.
   - **Chart.js Containers:** Glassmorphic cards with custom gold/purple chart line rendering and dark gridlines.

8. **Royal to High-Tech Cockpit UI Adaptation:**
   - **Royal Court Admin -> Flight Command Radar & Anti-Cheat Control:** Admin panel converts into the HQ Early Warning System.
   - **Royal Guard -> Sentinel Anti-Cheat Defense Radar:** Fraud detection becomes automated rogue pilot interception.

---

## 3. Specific CSS Code Snippets Worth Adopting

### Snippet 1: Tactical HUD Frame Container with Corner Notch Brackets (`.hud-cockpit-frame`)
*Source derived from `dashboard.html` & `tools.html` (`.royal-frame`, `.crown-corner-*`)*

```css
/* High-Tech Cockpit HUD Card Frame */
.hud-cockpit-frame {
    position: relative;
    background: rgba(12, 15, 22, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 0.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(212, 175, 55, 0.15);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hud-cockpit-frame::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(212, 175, 55, 0.1);
    border-radius: inherit;
    pointer-events: none;
}

.hud-cockpit-frame:hover {
    border-color: rgba(234, 202, 122, 0.7);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.25), inset 0 0 0 1px rgba(234, 202, 122, 0.3);
    transform: translateY(-2px);
}

/* Corner Reticle L-Brackets */
.hud-corner-tl { position: absolute; top: -1px; left: -1px; width: 12px; height: 12px; border-top: 2px solid #D4AF37; border-left: 2px solid #D4AF37; }
.hud-corner-tr { position: absolute; top: -1px; right: -1px; width: 12px; height: 12px; border-top: 2px solid #D4AF37; border-right: 2px solid #D4AF37; }
.hud-corner-bl { position: absolute; bottom: -1px; left: -1px; width: 12px; height: 12px; border-bottom: 2px solid #D4AF37; border-left: 2px solid #D4AF37; }
.hud-corner-br { position: absolute; bottom: -1px; right: -1px; width: 12px; height: 12px; border-bottom: 2px solid #D4AF37; border-right: 2px solid #D4AF37; }
```

---

### Snippet 2: Gold Text Gradient & Sweeping Light Effect
*Source derived from `leaderboard.html` & `tools.html` (`.gold-gradient-text`, `@keyframes textShine`)*

```css
/* Premium Gold Text Gradient */
.gold-text-gradient {
    background: linear-gradient(135deg, #FFF8DB 0%, #EACA7A 30%, #D4AF37 60%, #AA7A1E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Sweeping Light Effect on Golden Text */
.gold-text-shine {
    background: linear-gradient(90deg, #D4AF37 0%, #FFF8DC 25%, #EACA7A 50%, #FFD700 75%, #D4AF37 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShine 4s linear infinite;
}

@keyframes textShine {
    to { background-position: 200% center; }
}
```

---

### Snippet 3: Cockpit HUD Floating & Row Shimmer Animations
*Source derived from `leaderboard.html` (`@keyframes crownFloat`, `@keyframes goldShimmer`)*

```css
/* Floating HUD Badge Keyframe */
@keyframes hudFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(1deg); }
}

.animate-hud-float {
    animation: hudFloat 3.5s ease-in-out infinite;
}

/* Sweeping Table Row Shimmer Highlight */
@keyframes hudShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.animate-hud-shimmer {
    background: linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(234,202,122,0.2) 50%, rgba(212,175,55,0) 100%);
    background-size: 200% 100%;
    animation: hudShimmer 3s infinite;
}
```

---

### Snippet 4: Polygon Flight Chevron Feature Card (`.cockpit-chevron-card`)
*Source derived from `landing.html` (`.heraldic-shield`)*

```css
/* Tactical Polygon Flight Chevron Card */
.cockpit-chevron-card {
    background: rgba(15, 18, 26, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.3);
    clip-path: polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%);
    padding: 2rem 1.5rem 3rem 1.5rem;
    transition: all 0.3s ease;
}

.cockpit-chevron-card:hover {
    border-color: rgba(234, 202, 122, 0.8);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
}
```

---

### Snippet 5: High-Tech Metallic Gold Action Button (`.btn-cockpit-gold`)
*Source derived from `tournaments.html` (`.bg-gold-metallic`)*

```css
/* High-Tech Gold Metallic Action Button */
.btn-cockpit-gold {
    background: linear-gradient(135deg, #EACA7A 0%, #D4AF37 50%, #996515 100%);
    background-size: 200% 100%;
    color: #06070A;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border: 1px solid rgba(255, 235, 150, 0.5);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-cockpit-gold:hover {
    background-position: 100% 0;
    box-shadow: 0 0 25px rgba(234, 202, 122, 0.6);
    transform: translateY(-1px);
}
```

---

## 4. Unified Design Upgrade Plan for FORTREX FX

This integration matrix outlines the exact elements to adopt across every core page of FORTREX FX to transform standard dashboard layouts into a unified, high-tech fighter jet cockpit FX platform.

```
+-----------------------------------------------------------------------------------+
|                           FORTREX FX COCKPIT ARCHITECTURE                         |
+-----------------------------------------------------------------------------------+
|  [TOP NAVIGATION BAR]                                                             |
|  * Live UTC Mission Clock  * $REX Telemetry Balance  * Flight Rank Pilot Badge    |
+-----------------------------------------------------------------------------------+
|  [SIDEBAR CONTROL STICK]                                                          |
|  * Cockpit HUD Nav Switcher  * Reticle Border Highlight  * Anti-Cheat Sentinel    |
+-----------------------------------------------------------------------------------+
|  [MAIN FLIGHT DECK / PAGE CONTENT]                                                |
|  1. Landing: Particle Network + Flight Chevrons + Yield Telemetry Slider         |
|  2. Dashboard: Flight Rank Progression + Conquest Arenas + One-Click Quests       |
|  3. Tournaments: Edict Rules Charter + Live FPS Formula Calculator + Tier Cards   |
|  4. Leaderboard: Top Gun Ace Podium + Dual FPS/ROI Toggle + Search/Filter Engine   |
|  5. Tools Suite: Consistency Compass Dial + 5 FX Calculators + Term Codex         |
|  6. Admin Command: Sentinel Fraud Interceptor Radar + 4 Chart.js Telemetry Hubs   |
+-----------------------------------------------------------------------------------+
```

### 1. Landing Page Upgrade Plan:
- **Particle Telemetry System:** Embed glowing gold particle canvas system (`particle-canvas`) in the hero backdrop.
- **Typing Tagline Loop:** Implement typewriter headline logic cycling core platform value props.
- **Chevron Cards:** Replace flat grid boxes with polygon flight chevrons (`clip-path`).
- **Interactive Yield Engine:** Integrate dual-slider volume and win rate calculator for projected $REX token earnings.
- **UTC Mission Clock:** Add live clock to top navigation bar.

### 2. Dashboard Upgrade Plan:
- **Flight Rank Ascension Path:** Deploy horizontal milestone vector (Cadet -> Lieutenant -> Commander -> Sovereign Ace) with glowing checkpoint nodes.
- **Conquest Arenas Module:** Adopt active challenge cards featuring synchronized countdown clocks.
- **Quests & Decrees System:** Integrate daily login, social, and verification quest cards with `canvas-confetti` reward claiming.
- **Audit Ledger Stream:** Implement filterable transaction stream table.
- **Squad Lineage Tree:** Add 2-tier affiliate lineage breakdown chart.

### 3. Tournaments Upgrade Plan:
- **Arena Banner Trio:** Build top featured tournament cards with live time counters and instant join buttons.
- **Live FPS & ROI Calculator:** Embed real-time calculator evaluating Start/End Balance, Consistency, and Drawdown to output Fair Performance Score (FPS).
- **Code of Honor Charter:** Adopt 6-part anti-fraud and performance rules codex.
- **Registration Drawer Modal:** Deploy glassmorphic join modal with rank selection and oath confirmation.

### 4. Leaderboard Upgrade Plan:
- **Top Gun Ace Podium:** Build 3-tier podium (#1 Ace Pilot, #2 Wing Commander, #3 Squadron Leader) with floating crowns and Gold/Silver/Bronze metallic borders.
- **Dual-Mode Dataset Toggle:** Implement tab switcher between Prop Challenge FPS Scoring and IB Broker Pure ROI %.
- **Filter Toolbar:** Add client-side search input, tier dropdown filter, and verified-only toggle button.
- **High-Density Leaderboard Table:** Deploy compact table with country flags, prop firm tags, account size badges, win rate meters, and total yield.

### 5. Tools Suite Upgrade Plan:
- **Consistency Compass Gauge:** Deploy rule safety calculator featuring an animated speedometer needle.
- **6-Tool Tactical Cockpit Suite:** Integrate Consistency Compass, Lot Scaler, Pip Crown, Margin Scepter, Target Profit Estimator, and Macro Economic Oracle.
- **Codex of Command Dictionary:** Implement searchable terminology accordion.
- **HUD L-Bracket Containers:** Wrap input cards in double-line HUD frames with notched gold corner brackets.

### 6. Admin Panel Upgrade Plan:
- **Sentinel Fraud Interceptor Radar:** Deploy 3-column alert grid for IP Subnet Matches, Order Bursting, and EA Signature Duplication with instant Resolve/Flag/Banish triggers.
- **4-Chart Telemetry Dashboard:** Implement Chart.js grid (User Growth, $REX Vault Distribution, Proclamation Participation, Revenue Streams).
- **Interactive Proclamation Modal:** Deploy modal workflow for launching new platform tournaments with custom parameters.
- **System Integrity Audit Trigger:** Add command button executing live integrity diagnostics.

---

## Conclusion
By adopting these extracted CSS animation routines, responsive HUD card frames, interactive financial calculators, and high-density telemetry tables, FORTREX FX will successfully merge the prestigious majesty of the royal reference designs with a cutting-edge fighter jet cockpit user interface.
