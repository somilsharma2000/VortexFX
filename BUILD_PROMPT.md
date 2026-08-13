# FORTEX FX — MASTER BUILD SPECIFICATION & PROMPT
> **Project Code:** FORTEX-FX / VORTEX-FX  
> **Value Benchmark:** $50,000 Bespoke Project Specification  
> **Status:** Production-Ready Frontend / Stage 1 Implementation Complete  
> **Target Audience:** Full-Stack Engineers, AI Autonomous Sub-Agents, Product Managers  

---

## 1. PROJECT OVERVIEW

### 1.1 What is Fortex FX?
**Fortex FX** is a premium, skill-based trading tournament platform designed to turn solitary Forex and Crypto trading into a competitive, community-driven arena. Traders register, connect their external broker accounts (specifically XM Broker via IB relationship), and compete in bi-weekly tournaments based purely on Return on Investment (ROI %). 

The platform does NOT handle trade execution or deposit custody directly. Traders retain 100% control of their real trading capital inside their existing MT4/MT5 accounts with XM Broker. Fortex FX serves as the overarching intelligence, gamification, and reward layer that turns daily trading into a high-stakes competitive sport.

### 1.2 Target Market
- **Primary Assets:** Forex currencies (EUR/USD, GBP/USD, USD/JPY, etc.) and major Cryptocurrencies.
- **Geographic Focus:** International / foreign markets (South Asia, Southeast Asia, Middle East, Europe, Latin America).
- **Trader Persona:** Retail traders seeking validation, capital rewards, strategy growth, and community belonging without paying subscription fees or prop firm challenges.

### 1.3 Revenue Model
- **Zero Fees for Traders:** The platform is 100% free for users. No entry fees, no monthly subscriptions, no hidden charges.
- **Introducing Broker (IB) Revenue:** Revenue is generated entirely on the backend through an IB partnership with XM Broker. When traders create or link their XM accounts via Fortex FX's IB link, Fortex FX earns rebate commissions on traded volume (spread/commission share).
- **Mutual Alignment:** Traders pay zero extra spread; in fact, traders earn **REX Rewards** and rebate boosts from Fortex FX, creating a hyper-aligned win-win ecosystem.

### 1.4 Founder & Leadership
- **Founder:** Somil Sharma — 22-year-old serial entrepreneur ([ishaansharma.com](https://ishaansharma.com)).
- **Founder Philosophy:** Extreme execution speed, high resource efficiency, credit conservation, prototype-first engineering, sub-agent delegation, and bespoke, premium design language over generic web templates.

---

## 2. PLATFORM ARCHITECTURE DECISIONS

All platform decisions are locked, verified, and active across the system:

1. **NO Trading Interface:** Traders perform all executions on their native desktop/mobile MetaTrader 4 (MT4), MetaTrader 5 (MT5), or XM mobile terminals. Fortex FX provides zero charting or order placement widgets to keep the platform lean, ultra-fast, and zero-latency.
2. **NO MetaApi Integration (Budget Optimization):** Third-party live account scraping tools like MetaApi incur recurring monthly costs per account. To maximize margins and preserve capital, account sync is executed via manual data entry and lightweight admin verification tools.
3. **NO EA / MQL Scripts for Live Sync:** Eliminates security vulnerabilities and trader hesitation associated with running custom Expert Advisors on local terminals.
4. **NO Discord Bot (Phase 1):** Community interaction lives on Discord ("The Citadel"), but automated bot sync (roles/announcements) is deferred to Phase 5.
5. **NO Subscription Model:** Access is 100% free forever. Value capture happens via IB volume rebates.
6. **Wallet Exclusively in REX Currency:** All tournament prizes, daily check-in streaks, and referral bonuses are denominated in **REX** — Fortex FX's internal loyalty reward points system. REX is currently off-chain points, engineered for seamless transition to an on-chain utility cryptocurrency in the future.
7. **Discord OAuth Authentication:** Primary login mechanism is Discord OAuth. Discord usernames must match account profiles to maintain Citadel community integrity.
8. **Markets Covered:** Forex and Crypto, with primary focus on Forex majors, minors, and gold (XAU/USD).
9. **Broker Architecture:** Real capital remains in broker accounts (XM), linked via Fortex FX IB affiliate code during onboarding.
10. **Tournament Rule Engine:** Highest percentage Return on Investment (ROI %) over the bi-weekly cycle wins. Standardized formula: `ROI % = (Net Profit / Starting Equity) * 100`.
11. **Admin Tournament Scheduling & Thresholds:** Admin creates/schedules tournaments with custom auto-start rules when deposit thresholds (e.g., minimum $200 equity in linked XM account) are satisfied.
12. **Gated Referral Rewards:** Referral commissions and REX bonuses are awarded ONLY to verified users with linked, funded accounts who have completed the minimum deposit ($200). Enforced via T&C to prevent fraud and multi-account sybil attacks without cluttering public UI.
13. **NO Tier-Based Tiering (Bronze/Silver/Gold Removed):** Removed complex multi-tiered subscription levels. All traders get full VIP access from day one.
14. **Seasonal Rankings & Leaderboards:** Bi-weekly tournaments aggregate into quarterly seasonal leaderboards with grand prize pools.
15. **Tournament Replays & Strategy Content:** Winning trade setups and top trader performance profiles are codified into educational replays for the Fortex Academy.
16. **KYC Offloaded to Broker:** All identity verification and compliance (AML/KYC) are handled directly by XM Broker. Fortex FX holds zero sensitive identity documents.
17. **Bi-Weekly Tournament Cycle:** 14-day execution cycles, providing regular momentum, fresh starts, and continuous engagement.

---

## 3. THE SEALED RESULTS CONCEPT

The cornerstone of Fortex FX's competitive gameplay is the **Sealed Results Mechanism**:

* **Zero Live Rankings During Active Tournaments:** Unlike traditional leaderboards that broadcast live equity curves, Fortex FX seals all trader performance during the 14-day competition window.
* **Psychological Hype & Curiosity Gap:** Live leaderboards encourage toxic strategy manipulation (e.g., revenge trading to overtake a rival on day 12) or premature surrender. Sealed results create suspense, anticipation, and sustained effort until the final minute.
* **Admin Manual Data Processing:** At the conclusion of the bi-weekly cycle, the Admin Mission Control ingests broker ROI reports and populates trader standings.
* **The Unveiling Event:** Results are unlocked in a synchronized "Reveal Ceremony" on the platform and Citadel community, sparking massive engagement, viral sharing, and event-driven community surges.

---

## 4. THE ECOSYSTEM

The Fortex FX ecosystem consists of 7 interconnected pillars:

```
                  +-----------------------------------+
                  |          FORTEX FX WEB            |
                  |     (Dala Design Architecture)    |
                  +-----------------+-----------------+
                                    |
        +---------------------------+---------------------------+
        |                           |                           |
+-------v-------+           +-------v-------+           +-------v-------+
|  REX CURRENCY |           |    REX AI     |           |  THE CITADEL  |
|  (Loyalty ->  |           | (Personalized |           |   (Discord    |
|  Crypto Token)|           |  Intel & Coach|           |  Community)   |
+-------+-------+           +-------+-------+           +-------+-------+
        |                           |                           |
        +---------------------------+---------------------------+
                                    |
        +---------------------------+---------------------------+
        |                           |                           |
+-------v-------+           +-------v-------+           +-------v-------+
| DAILY CHECKIN |           |REFERRAL ENGINE|           | MISSION CTR   |
| (Streak Loss  |           | (Growth &     |           | (Admin System |
|  Aversion)    |           |  Rebate Boost)|           |  & Controls)  |
+---------------+           +---------------+           +---------------+
```

1. **Fortex FX Web Platform:** High-converting, Dala-styled web application.
2. **REX Currency:** Proprietary reward token powering payouts, shop redemptions, and future crypto liquidity.
3. **Rex AI:** AI-driven personalized mentor providing trade review, behavior feedback, and risk scoring (educational only).
4. **The Citadel:** Discord community center for trader interaction, tournament reveal parties, and market analysis.
5. **Daily Check-In System:** Gamified calendar building habit loops through streak multipliers and loss aversion.
6. **Referral Engine:** Viral growth mechanism offering rebate boosts and milestone REX rewards for verified trader invites.
7. **Admin Mission Control:** Master command interface for complete control over tournaments, ROI ingestion, rewards, and user management.

---

## 5. PSYCHOLOGY-DRIVEN DESIGN

Every pixel, heading, callout, and layout choice leverages established behavioral psychology triggers:

| Psychological Trigger | Core Narrative / Copy Implementation | Platform Mechanism |
|-----------------------|--------------------------------------|--------------------|
| **Ego & Identity** | *"You already have the skill. Now prove it on the master stage."* | Badges, Hall of Fame, Trader of the Month |
| **Loss Aversion** | *"Every tournament you skip is prize money you'll never earn back."* | Daily Check-In streak resets on missed days |
| **Curiosity Gap** | *"No one knows who's leading. The reveal is everything."* | Sealed Results mechanism during active tournaments |
| **Social Proof** | *"247 traders competing right now in Tournament #14."* | Live registration counters, champion testimonials |
| **Reciprocity** | *"Free. Genuinely free. No subscription. No entry fee."* | 100% free access, funded entirely by broker IB rebates |
| **Scarcity / FOMO** | *"Registration closes in 04h 12m 33s. Limited tournament slots."* | Real-time countdown timers and capped seats |
| **Reduced Friction** | *"Three steps. That's it. Link, Trade, Win."* | Minimal Discord OAuth registration flow |
| **Belonging** | *"You're not trading alone anymore. Welcome to The Citadel."* | Direct Discord integration & community hubs |
| **Sunk Cost Effect** | *"You're on a 14-day check-in streak. Don't break the chain now."* | Progressive streak multipliers |
| **Commitment & Consistency** | *"Milestone 3 Unlocked: 5 Referred Traders Verified."* | Step-by-step progress bars |
| **Endowment Effect** | *"Your REX Wallet Balance: 2,450 REX ($245 Value)."* | Real-time balance counters |
| **Achievement** | *"Trader of the Month: Crowned in the Citadel."* | Permanent badges, Hall of Fame cards |

### Psychology Rotation Engine (`js/psychology.js`)
To prevent ad fatigue and keep returning traders engaged:
- `js/psychology.js` automatically randomizes key psychological hero copy, subtitles, callouts, and urgency badges on every page visit.
- *Future Enhancement:* Rex AI will track individual user engagement metrics to display the exact psychological trigger (e.g., Loss Aversion vs. Ego) that maximizes conversion for each specific trader profile.

---

## 6. DAILY CHECK-IN SYSTEM

Designed to drive habit formation, daily active user (DAU) retention, and long-term platform loyalty:

* **Visual Calendar Interface:** Interactive 30-day grid tracking active streaks.
* **Base Reward:** +10 REX for every daily check-in.
* **Milestone Multipliers (Admin-Configurable):**
  - **7-Day Streak:** +50 REX bonus
  - **14-Day Streak:** +150 REX bonus
  - **30-Day Streak:** +500 REX bonus
  - **90-Day Streak:** +2,000 REX bonus + Exclusive Citadel Badge
* **Loss Aversion Penalty:** Missing a single day resets the streak counter back to Day 1.
* **Streak Leaderboard:** Displays top 20 most disciplined traders on `checkin.html`.
* **Rex AI Correlation:** Rex AI analyzes check-in consistency alongside ROI performance, proving to traders that daily discipline directly correlates with tournament success.

---

## 7. REX AI PERSONALIZATION ENGINE

Rex AI is the platform's proprietary intelligence layer designed to coach, analyze, and personalize:

* **Behavioral Analytics:** Monitors check-in frequency, tournament entry history, and risk behavior.
* **Educational Analysis (Non-Financial Advice):**
  - Post-tournament trade reviews.
  - Risk exposure evaluation (e.g., over-leveraging warnings).
  - Custom educational guides recommended from the Fortex Academy based on trader weaknesses.
* **Dynamic UI Personalization (Future):** Adapts page emphasis based on trader type (e.g., aggressive scalper vs. disciplined swing trader).
* **Copy Optimization:** Learns which psychological triggers produce highest activity per user.
* **Relationship Building:** Transforms Fortex FX from a static tool into an adaptive, intelligent trading partner.

---

## 8. LEGAL FRAMEWORK & RISK MITIGATION

Fortex FX is specifically engineered to operate safely within global legal standards for skill-based gaming and referral platforms:

```
+-------------------------------------------------------------------------+
|                        LEGAL COMPLIANCE MATRIX                          |
+----------------------+--------------------------------------------------+
| Domain               | Operational Safeguard & Strategy                 |
+----------------------+--------------------------------------------------+
| Gambling / Wagering  | Skill-based competition. ZERO entry fees.        |
|                      | No wagering or risk of loss on platform.          |
+----------------------+--------------------------------------------------+
| Financial Services   | NOT a financial institution. No trade execution, |
|                      | no fund custody, no investment advice given.     |
+----------------------+--------------------------------------------------+
| REX Token Status     | Loyalty reward points. Off-chain, zero guaranteed|
|                      | monetary value, non-transferable between users.  |
+----------------------+--------------------------------------------------+
| IB Rebate Structure  | Standard industry practice. Regulated broker     |
|                      | commission sharing model via XM Broker.          |
+----------------------+--------------------------------------------------+
| Referral System      | Single-level referral. Earns only on real,       |
|                      | verified trading activity (not MLM/pyramid).     |
+----------------------+--------------------------------------------------+
| Governing Jurisdiction| St. Vincent and the Grenadines / Offshore setup. |
| Compliance Pages     | Comprehensive Terms (18 sections on terms.html)  |
|                      | Privacy Policy (11 sections on privacy.html)     |
+----------------------+--------------------------------------------------+
```

---

## 9. PAGE-BY-PAGE SPECIFICATION

### 1. `index.html` — Master Landing Page
- **Hero Section:** Dala particle morphing art, bold monolithic typography, primary CTA ("Enter Next Tournament"), live countdown.
- **Problem vs. Solution:** Solitary trading vs. Gamified Fortex FX ecosystem.
- **How It Works:** 3-step friction-free onboarding (Connect XM, Trade MT4/MT5, Win REX).
- **Sealed Results Feature:** Teaser section explaining the surprise reveal system.
- **Live Tournament Feed:** Active & upcoming bi-weekly tournaments with real-time registration counter (`js/reg-counter.js`).
- **Rex AI Spotlight:** Demonstrating personalized trader intelligence.
- **The Ecosystem Grid:** Platform, REX, Citadel, Rex AI, Check-In, Referrals.
- **Social Proof & Stats:** $120K+ paid in REX, 14,000+ active traders, 99.4% satisfaction.
- **Final Urgency CTA:** Low-friction registration trigger.

### 2. `leaderboard.html` — Tournament Command Center
- **Sealed Results State:** Displays locked leaderboard during active competition with animated lock icons and reveal countdown.
- **Past Champions Grid:** Unlocked historical leaderboards showing winners, ROI %, and REX prizes won.
- **Hall of Fame:** Legendary top-performing traders of all time.
- **Trader of the Month:** Featured spotlight interview and strategy breakdown.

### 3. `offers.html` — Rewards & REX Currency
- **REX Utility Breakdown:** How to earn, redeem, and boost REX points.
- **Rebate Calculator:** Interactive tool estimating monthly REX earnings based on traded lot volume.
- **Referral Booster Details:** Unlocking up to +25% rebate boosts through invites.
- **FAQ Section:** Direct answers addressing safety, payouts, and broker integration.

### 4. `resources.html` — Fortex Academy
- **4 Learning Paths:** Beginner Forex, Advanced Technicals, Risk Management, Crypto Trading.
- **6 Featured Guides:** Interactive articles with reading time and difficulty badges.
- **Tournament Replays:** Breakdown of winning strategies from past champions.
- **Trading Tools:** Downloadable risk calculators and position sizing spreadsheets.

### 5. `invite.html` — Viral Growth Engine
- **Unique Referral Link Generator:** Instant click-to-copy link.
- **Progressive Milestones:** Tiered rewards (1 User = 100 REX; 5 Users = 500 REX + Rebate Boost; 25 Users = 3,000 REX + VIP Badge).
- **Inviter Leaderboard:** Top monthly growth partners.
- **Live Activity Feed:** Real-time social proof of new referrals joining.

### 6. `checkin.html` — Daily Discipline Center
- **Streak Counter & Calendar:** Visual 30-day streak tracker.
- **Check-In Action Button:** One-click daily claim trigger.
- **Streak Leaderboard:** Top consistent traders.
- **Rex AI Performance Insight:** Real-time correlation between streak length and trading performance.

### 7. `profile.html` — Trader Identity Hub
- **Trader Overview:** Avatar, linked XM account number, verification badge, Citadel status.
- **REX Wallet Panel:** Available balance, total earned, claim history.
- **Tournament Performance History:** Historical ROI %, ranks, and rewards.
- **Personal Referral Stats:** Total invited, active funded traders, bonus earned.

### 8. `signin.html` — Access Terminal
- **Discord OAuth Entry:** Clean, high-converting login screen.
- **Urgency & Social Proof Sidebar:** Highlighting active tournament prize pools and live participant numbers.

### 9. `terms.html` — Terms & Conditions
- **18 Detailed Legal Sections:** Full legal shielding (Skill-based rules, non-custodial operations, REX non-cash status, IB compliance, jurisdiction details).

### 10. `privacy.html` — Privacy Policy
- **11 Data Protection Sections:** GDPR-compliant data collection disclosures, cookies, broker isolation.

### 11. `admin.html` — Mission Control Dashboard
- **Tournament Management:** Create, schedule, pause, seal, and calculate payouts.
- **Manual ROI Ingestion:** Batch upload or direct form entry for trader ROI data.
- **User Management:** Verify XM accounts, manage bans, view linked profiles.
- **Financial & REX Control:** Live stats on distributed REX, total traded volumes, estimated IB commissions.
- **System Config:** Tweak daily check-in rewards, milestone bonuses, and deposit thresholds.

---

## 10. DESIGN SYSTEM — DALA ARCHITECTURE

### 10.1 Visual Philosophy
Pure black void (`#000000`). Zero bloated containers. Ultra-clean typography separated by generous whitespace. Geometric particle constellations form the primary visual accent.

### 10.2 Color Palette
```css
:root {
  --color-void:        #000000; /* Primary background */
  --color-bone-white:  #ffffff; /* Primary headings & body text */
  --color-ash-gray:    #9a9a9a; /* Secondary text & subtle borders */
  --color-silver-mist: #bdbdbd; /* Tertiary labels & captions */
  --color-electric-iris:#8052ff;/* Primary Brand Accent (Buttons, Highlights) */
  --color-gold-accent: #FFD700;/* Champion highlights & special badges */
  --color-surface-dark:#0a0a0c;/* Subtle dark surface fill */
  --color-border-hair: #1a1a22;/* Ultra-thin hairline borders */
}
```

### 10.3 Generative Particle Morphing System (`js/dala.js`)
An interactive, GPU-accelerated Canvas particle background that morphs dynamically based on page context and scroll position into 7 distinct spatial shapes:
1. **Brain:** Rex AI sections.
2. **Fortress:** Hero & Brand headers.
3. **Spiral:** Daily check-in & streak screens.
4. **Wave:** Tournament ROI charts & leaderboards.
5. **Sphere:** Ecosystem overview.
6. **Diamond:** REX Wallet & Rewards.
7. **Scattered:** Background passive ambient state.

### 10.4 Typography & Logo
- **Font Family:** `Inter`, sans-serif (Weights: 200, 300, 400, 600, 700, 800).
- **Ecosystem Logo (`assets/fortex-logo.svg`):** Hexagonal fortress outline enclosing interconnected ecosystem nodes rendered in Electric Iris (`#8052ff`) and Gold (`#FFD700`).

---

## 11. TECH STACK

- **Frontend Core:** Semantic HTML5, Vanilla CSS3 (Custom Dala Variables), Pure ES6+ JavaScript (Zero heavyweight dependencies/frameworks for maximum load speed).
- **Hosting & CDN:** GitHub Pages / Cloudflare Edge Static Network.
- **Backend Infrastructure (Planned Phase 1/2):** Base44 Serverless Entities and Backend Functions.
- **Authentication:** Discord OAuth 2.0 API.
- **Database Schemas:** Base44 Managed Mongo Entities (`Users`, `Tournaments`, `Participants`, `Transactions`, `Referrals`, `CheckIns`, `Settings`).
- **Community Engine:** Discord API & Custom Citadel Bot.

---

## 12. BUILD PHASES & ROADMAP

```
  PHASE 1 (NEXT)           PHASE 2                  PHASE 3                  PHASE 4                  PHASE 5
+----------------+       +----------------+       +----------------+       +----------------+       +----------------+
| Database &     | ----> | Tournament     | ----> | Wallet &       | ----> | Rex AI &       | ----> | Discord Bot    |
| Discord Auth   |       | Manual Engine  |       | Growth Engine  |       | Content System |       | Integration    |
+----------------+       +----------------+       +----------------+       +----------------+       +----------------+
```

### Phase 1 — Database Schemas & Discord Auth (IMMEDIATE)
- Deploy Base44 entities: `Users`, `Tournaments`, `Participants`, `Transactions`, `Referrals`, `CheckIns`, `Settings`.
- Implement Discord OAuth authorization code flow.
- Link XM Account Number input modal and save verification state.
- Implement daily check-in server backend function to validate 24h timer and prevent spoofing.

### Phase 2 — Tournament & Sealed Results Backend
- Build Admin Mission Control tournament creator (start/end date, deposit threshold, prize pool).
- Implement ROI batch submission endpoint for Admin.
- Build sealed results lock/unlock trigger logic.
- Automated prize distribution in REX upon tournament finalization.

### Phase 3 — Wallet & Referral Engine
- Real-time REX ledger calculation (Check-in rewards + Tournament wins + Referral bonuses).
- Dynamic referral link generation and tracking logic.
- Rebate boost calculation backend based on verified user invites.

### Phase 4 — Rex AI & Content Management
- Integrate AI completion endpoints to review trading performance metrics.
- Replay manager inside Admin panel to publish top trader setups to `resources.html`.
- Automated Hall of Fame and Trader of the Month updates.

### Phase 5 — Discord Citadel Bot
- Auto-sync platform accounts with Discord roles (e.g., "Verified Trader", "Tournament Champion").
- Automated tournament announcement broadcasts and sealed reveal event triggers inside Discord channels.

---

## 13. ADMIN MISSION CONTROL SPECIFICATION

The Admin Dashboard (`admin.html`) gives the platform operator 100% control over all numbers and operations:

1. **Tournament Controls:**
   - Create new bi-weekly tournament.
   - Edit duration, entry deposit criteria (e.g., set minimum deposit from $200 to $100).
   - Manually start, pause, seal, or finalize tournaments.
   - Payout engine: One-click batch distribution of REX prizes to top winners.
2. **Manual ROI Entry & Override:**
   - Batch upload CSV or manually input trader account numbers and final ROI % figures.
   - Instant verification and standings preview prior to public reveal.
3. **User Management:**
   - View linked XM broker account numbers.
   - Manually toggle account verification status (`Unverified` -> `Verified Funded`).
   - Suspend/Ban users suspected of fraudulent activity or multi-account abuse.
4. **Financial & Reward Calibration:**
   - Adjust daily check-in base amounts (+10 REX default) and streak milestone bonuses.
   - Configure referral bonus rates and rebate boost caps.
   - Monitor aggregate platform volume and estimated XM IB earnings.
5. **Anti-Fraud Control:**
   - Flag duplicate IP address check-ins or identical XM account numbers across multiple Discord IDs.

---

## 14. KEY FILE DIRECTORY

All files are located in `/app/conversations/6a73017211d2460647c8f96e/vortex-fx/`:

| File Path | Description / Role |
|-----------|--------------------|
| `index.html` | Master Home Landing Page (Psychology-driven hero, Ecosystem, Live Feed) |
| `leaderboard.html` | Tournament Command Center (Sealed Results, Champions, Hall of Fame) |
| `offers.html` | Rewards & REX Currency Page (Rebate Calculator, Boosters, Utility) |
| `resources.html` | Fortex Academy (Learning Paths, Strategy Guides, Tournament Replays) |
| `invite.html` | Referral Growth Engine (Link Generator, Milestones, Inviter Leaderboard) |
| `checkin.html` | Daily Check-In Center (Streak Tracker, Rewards Grid, Rex AI Correlation) |
| `profile.html` | Trader Identity Dashboard (Stats, REX Wallet, Account Link Status) |
| `signin.html` | Sign In Access Terminal (Discord OAuth Integration) |
| `signout.html` | Session Termination Screen |
| `admin.html` | Master Mission Control Dashboard (Full Admin Control & ROI Entry) |
| `terms.html` | Terms & Conditions (18 Full Legal Sections) |
| `privacy.html` | Privacy Policy (11 Data Shielding Sections) |
| `css/dala.css` | Complete Dala Design System CSS (1275+ lines, CSS variables, dark layout) |
| `js/dala.js` | Generative Particle Morphing System (Canvas geometry switcher) |
| `js/psychology.js` | Dynamic Psychology Copy Rotation Engine |
| `assets/fortex-logo.svg` | Hexagonal Ecosystem Logo Graphic |
| `LEGAL_STRATEGY.md` | Deep Legal & Regulatory Research Specification Document |
| `BUILD_PROMPT.md` | **This Master Document** — The $50K Complete Build Prompt |

---

## 15. OPERATIONAL NOTES & FOUNDER PRINCIPLES

- **$50,000 Project Standard:** This specification and codebase are crafted to the standard of a high-end, custom enterprise software build. Avoid cookie-cutter templates, generic UI libraries, or unverified claims.
- **Trader-First Priority:** Every architecture choice preserves trader safety, fund autonomy, and emotional engagement.
- **REX Crypto Vision:** Design every database schema and wallet interface assuming REX will transition to an ERC-20 / SPL utility token on a major L2 blockchain in a future release.
- **Cohesive Ecosystem:** Ensure all 7 ecosystem pillars continually reinforce each other (e.g., Daily Check-Ins feed REX -> REX unlocks Tournament Boosts -> Tournaments drive Citadel activity -> Citadel activity increases XM broker trading volume).
- **Somil Sharma Principles:** Fast execution, high credit/cost efficiency, prototype-first engineering, clean sub-agent delegation, and total operational flexibility.

---
*End of Master Build Prompt — Fortex FX Specification Document.*
