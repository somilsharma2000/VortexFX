# FORTEX FX — COMPLETE BUILD PROMPT
# Dala-inspired design system · Pure black void · Particle constellation
# Copy-paste this entire file to any AI agent to build the site

---

## PROJECT BRIEF

Build a complete multi-page website ecosystem for **Fortex FX** — a competitive trading tournament platform where traders compete in bi-weekly tournaments for real prize pools. The site has NO trading charts. Instead, it's a high-tech space adventure: traders are "commanders," tournaments are "missions," and the community hub is called "the Citadel" (Discord).

**10 pages needed:**
1. `index.html` — Home (hero, arena, registration counter, tournaments, Rex AI, community CTA, stats, CTA)
2. `leaderboard.html` — Tournament rankings (top 3, full table, prize distribution, countdown)
3. `profile.html` — User profile (stats, achievements, activity timeline, trading style)
4. `offers.html` — Membership tiers (Bronze/Silver/Gold, comparison table, rebate calculator, FAQ)
5. `invite.html` — Invite & Earn (referral link, reward tiers, inviter leaderboard, stats)
6. `resources.html` — Academy (category grid, featured articles, video tutorials, FAQ)
7. `signin.html` — Sign in (access terminal, minimal centered form)
8. `signout.html` — Sign out (session termination with phased transition)
9. `admin.html` — Admin dashboard (mission control, stats, tournament management, user management, quick controls)
10. `leaderboard-alt.html` — Alternate leaderboard (optional, can skip)

**Shared files:**
- `css/dala.css` — Complete design system (write this first)
- `js/dala.js` — Particle constellation + scroll reveal + counters + accordion + reg counter

---

## DESIGN SYSTEM — DALA-INSPIRED

### Philosophy
Pure black void. Monolithic typography. Zero containers. The particle constellation is the ONLY visual decoration. Everything else is typography on black, separated by whitespace. No cards. No borders (except hairline #111 dividers). No shadows. No glass morphism. No holographic panels. No gradients (except the avatar and logo). The design trusts that black + massive type + one accent color is enough.

### Colors (ONLY these 7 — no others)

| Name | Hex | Role |
|------|-----|------|
| Void | `#000000` | EVERY background. Pure black. Not dark gray. The void is the design. |
| Bone White | `#ffffff` | All headlines, primary body text, nav active state |
| Ash Gray | `#9a9a9a` | Nav links, ghost link color, secondary labels |
| Silver Mist | `#bdbdbd` | Tertiary body text, captions, supporting copy |
| Electric Iris | `#8052ff` | THE single accent. Buttons, labels, links, logo. Never used as a large background block. |
| Saffron Spark | `#ffb829` | Section labels, highlight emphasis, live badges. Creates chromatic tension with violet. |
| Deep Verdant | `#15846e` | Logo gradient stop only. Appears in avatar gradient. |

### Typography

**Single typeface: Inter** (Google Fonts: `Inter:wght@200;400;600;700`)

| Role | Size | Weight | Line Height | Letter Spacing | Color |
|------|------|--------|-------------|----------------|-------|
| Display | 113px | 400 | 0.81 | -0.04em (-4.52px) | #ffffff |
| Heading LG | 78px | 400 | 1.1 | -0.04em (-3.12px) | #ffffff |
| Heading | 48px | 400 | 1.1 | -1.68px | #ffffff |
| Heading SM | 42px | 400 | 1.2 | -1.68px | #ffffff |
| Subheading | 36px | 400 | 1.2 | normal | #ffffff |
| Heading XS | 27px | 400 | 1.0 | -0.48px | #ffffff |
| Heading 2XS | 24px | 400 | 1.25 | -0.48px | #ffffff |
| Body | 18px | 200 | 1.5 | normal | #bdbdbd |
| Nav Label | 14px | 600 | 1.2 | 0.025em, uppercase | #9a9a9a |
| Caption | 12px | 400 | 1.5 | normal | #bdbdbd or #9a9a9a |

**CRITICAL TYPOGRAPHY RULES:**
- Headlines are ALWAYS weight 400 (never bold/600/700). Hierarchy comes from SCALE, not weight.
- Body text is ALWAYS weight 200 (ultra-light). This is the signature — do NOT use weight 400 for body.
- Nav and small labels are weight 600, uppercase, 0.025em tracking.
- On mobile, use clamp() to scale display down: `font-size: clamp(48px, 8vw, 113px)`
- Apply -0.04em letter-spacing on all sizes 42px and above

### Spacing

Base unit: 6px. Scale: 6, 12, 18, 24, 30, 36, 60, 96, 120px.
Section padding: 96px top and bottom. Section gap: 60-120px.
Page max-width: 1280px. Card padding: 24-38px (but there are NO cards — this is for form inputs).

### Border Radius
- Buttons: 24px (creates pill shape on ~45px height buttons)
- Tags/badges: 9999px (full pill)
- Inputs: 12px
- Everything else: 24px or none

### Layout
- Two-column asymmetric: `grid-template-columns: 1.2fr 0.8fr` with 60px gap
- Two-column equal: `grid-template-columns: 1fr 1fr` with 60px gap
- Float items: separated by 60px margin-bottom, NO containers
- On mobile: all grids collapse to single column

---

## COMPONENTS (all minimal — no containers)

### Primary Button (violet pill)
```
background: #8052ff
color: #ffffff
padding: 14.4px 31.92px
border-radius: 24px
font: Inter 14px weight 600, uppercase, 0.025em tracking
hover: background #6b3fef, translateY(-1px), box-shadow: 0 8px 24px rgba(128,82,255,0.3)
```

### Ghost Link (bare text)
```
background: none, border: none
color: #9a9a9a (or #ffffff for important links)
font: Inter 14px weight 400 (or 600 for nav)
hover: color #8052ff (or #ffffff)
```

### Logo Lockup
Small outlined triangle SVG in #8052ff with gradient fade to #15846e (deep verdant).
Paired with 'FORTEX FX' wordmark in Inter 14px weight 600, uppercase, 0.025em tracking, white.

### Navigation
Transparent background on black. Logo left. Links center/right. CTA right.
No border, no backdrop blur (only add subtle `rgba(0,0,0,0.6)` + blur on scroll).
Links: Inter 14px 600 uppercase, #9a9a9a inactive, #ffffff hover/active.
Mobile: hamburger menu, full-screen black overlay.

### Footer
Logo + wordmark left. Links right. Hairline #111 top border.
Links: 14px #9a9a9a, hover #ffffff.
Bottom: '© 2026 FORTEX FX' in 12px #4a4a4a.

### Stat Display (NO card — pure type on black)
```
Value: Inter 78px weight 400, -3.12px tracking, #ffffff
Label: Inter 14px weight 600, uppercase, 0.025em tracking, #9a9a9a
Separated from next stat by 60px whitespace
```

### Data Table (no borders except #111 hairlines)
```
th: 14px weight 600 uppercase, #9a9a9a, border-bottom: 1px solid #1a1a1a, padding 12px 0
td: 18px weight 200, #ffffff, border-bottom: 1px solid #111, padding 18px 0
tr:hover td: color #8052ff
```

### Section Label (amber, above headlines)
```
Inter 14px weight 600, uppercase, 0.025em tracking, color #ffb829
With a 24px horizontal line before it: width 24px, height 1px, background #ffb829
```

### Registration Counter
Large digits (clamp 48px to 96px, weight 400, -0.04em tracking, #ffffff) showing live count.
2px progress bar (violet #8052ff fill on #1a1a1a track).
Target text: 'TARGET: 10,000 TRADERS' (14px 600 uppercase #9a9a9a).
JS: starts at 3,742, randomly increments every 2-5 seconds, unlocks tournaments at 10,000.

### Locked Tournament (blurred content + overlay)
```
.locked .locked-content: filter blur(6px), opacity 0.4, pointer-events none
.lock-overlay: absolute, centered, with label (#ffb829), text (#bdbdbd), progress bar, count
```

### Avatar
64px circle, gradient background (#8052ff → #15846e), initials centered (27px weight 400 white).
Optional rotating ring (conic-gradient violet→amber→teal→violet, 8s rotation).

### Accordion (FAQ)
```
.accordion-item: border-bottom 1px solid #111
.accordion-header: flex space-between, padding 24px 0, cursor pointer
.accordion-question: 18px weight 400, #ffffff
.accordion-toggle: + icon, rotates 45deg when open, color #8052ff
.accordion-body: max-height 0 → 300px, overflow hidden, smooth transition
.accordion-answer: 18px weight 200, #bdbdbd
```

### Admin Dashboard
Two-column: 220px sidebar + 1fr content. Sidebar has #111 right border.
Toggles: 40px × 22px pill, #1a1a1a off / #8052ff on, 18px white circle slides.
Inputs: transparent bg, 1px #1a1a1a border, 12px radius, violet focus border.
Clock: monospace tabular-nums, updates every second.

---

## PARTICLE CONSTELLATION (the signature visual)

Canvas-based system. The ONLY visual decoration on the site.

**What it draws:**
- Tiny outlined triangles (1-3px), NOT circles or squares
- Colors: #8052ff (violet), #ffb829 (amber), #15846e (teal), #ffffff, #a78bfa, #22d3ee, #ec4899
- ~30% of triangles are filled, 70% are outlined
- Particles form an organic shape in the center (fortress/hex for hero, cloud for other pages)
- ~40-50 ambient particles scattered across the entire background at low opacity (0.05-0.15)
- Subtle connection lines between nearby particles (opacity 0.04, max distance 80px)

**Animation:**
- Particles drift slowly around their base position (damping + pull-back)
- Rotation: each particle rotates slowly on its axis
- Mouse repulsion: particles within 120px of cursor get pushed away gently
- Ambient particles drift across the full viewport and wrap around edges
- Subtle glow on higher-opacity particles (shadowBlur 6, shadowColor matches particle color)

**Implementation:**
```javascript
class ParticleField {
  constructor(canvasId, options = {}) {
    // canvasId: id of <canvas> element
    // options.shape: 'fortress' | 'cloud' | 'hex'
    // options.particleCount: 50-140
    // options.ambientCount: 20-50
    // options.colors: array of hex strings
    // options.triangleSize: 1.5-3
  }
}
```

Call on each page:
```html
<canvas id="particle-canvas"></canvas>
<script>new ParticleField('particle-canvas', { shape: 'fortress', particleCount: 140, ambientCount: 50 });</script>
```

Canvas is `position: fixed`, full viewport, `z-index: 0`, `pointer-events: none`.
All page content has `position: relative; z-index: 10`.

---

## DO'S AND DON'TS

### DO:
- Use #000000 pure black for EVERY background — sections, nav, footer, inputs, everything
- Set every headline at weight 400 — hierarchy through scale (78-113px), not weight
- Use Inter weight 200 for all 18px body text — ultra-light is the signature
- Apply -0.04em letter-spacing on all display sizes 42px and above
- Use #8052ff exclusively for filled buttons and active labels
- Use #ffb829 for section labels, live badges, and highlight emphasis
- Let the particle constellation be the only hero visual — no images, no illustrations
- Use 24px border-radius on buttons (creates pill shape)
- Let whitespace be the separator between content blocks — not borders or containers
- Use hairline #111 dividers only for table rows and footer/accordion borders
- Make every page feel spacious — 96px section padding, 60px between float items
- Show content as pure typographic composition on black

### DON'T:
- Do NOT use #8052ff for large background blocks or full sections — it's a button/accent color only
- Do NOT set body text at weight 400 — always weight 200
- Do NOT use cards with borders, shadows, or background fills — content floats on black
- Do NOT use Orbitron, Space Grotesk, JetBrains Mono, or any font other than Inter
- Do NOT use multiple accent colors — ONE violet (#8052ff) and ONE amber (#ffb829), that's it
- Do NOT use glass morphism, backdrop-filter on content (only subtle on scrolled nav)
- Do NOT use holographic panels, conic gradients, scanlines, or sci-fi decorations
- Do NOT use emojis as icons — use text labels or minimal inline SVGs (violet triangle for logo)
- Do NOT introduce photography, illustrations, or product screenshots
- Do NOT use colored text for data values — white (#ffffff) only, with rank colors (#FFD700, #E5E7EB, #CD7F32) ONLY for rank medals
- Do NOT use border-radius on sections or layout containers — only on buttons and inputs
- Do NOT add visual effects beyond the particle canvas — no star fields, no nebula, no gradients on content

---

## PAGE STRUCTURE DETAILS

### Every public page shares:
1. `<canvas id="particle-canvas">` as first body element
2. Nav (transparent, logo + links + CTA)
3. Main content sections (each with `.reveal` class for scroll animation)
4. Footer (logo + links + copyright)
5. `<script src="js/dala.js">` + inline ParticleField init

### Home page (index.html) sections:
1. Hero: amber label → massive headline → ultra-light body → violet pill + ghost link
2. The Arena (two-col): headline left → 3 float items right (Bi-Weekly, Live Rankings, Zero Charts)
3. Registration Counter: live counter with progress bar, "unlocks at 10,000"
4. Tournaments (two-col): headline left → 3 float items (1 LIVE, 1 UPCOMING, 1 LOCKED)
5. Rex AI (two-col): headline left → 3 float items (Analysis, Strategy, Rebates)
6. Community: centered headline "Join the Citadel" + body + violet pill
7. Stats row: 4 stats as pure type (Volume, Traders, Tournaments, Payouts) with data-count animation
8. CTA: "Ready to enter the arena?" + violet pill + ghost link

### Leaderboard page sections:
1. Header: amber label + "Leaderboard" headline + tournament info
2. Tournament stats (two-col): Prize pool, Participants, Live countdown
3. Top 3 (three items, NO podium): avatar, username, profit %, win rate, trades
4. Full rankings table (12 rows, rank medals for top 3)
5. Prize distribution (3 float items: 1st $25K, 2nd $15K, 3rd $10K)
6. CTA

### Profile page sections:
1. Profile header (two-col): avatar + username + rank + bio | 4 stats as pure type
2. Performance (two-col): headline | 4 float items (best rank, avg profit, total trades, risk score)
3. Trading style: 3 thin 2px bars (Scalper 45%, Day 30%, Swing 25%)
4. Achievements grid (8 items, 2 locked, NO cards)
5. Recent activity timeline (4 items, NO cards, just type + timestamps)

### Offers page sections:
1. Header: "Choose your arena" headline
2. Three tiers side by side (Bronze Free, Silver $29, Gold $79) — pure type, separated by #111 vertical lines
3. Comparison table (9 rows × 4 columns)
4. Rebate calculator (range slider + tier select → calculated rebate)
5. FAQ accordion (5 items)
6. CTA

### Invite page sections:
1. Header: "Recruit your fleet"
2. Referral link (NO card, just text + Copy button + share links)
3. Reward tiers (4 float items 2x2: Recruit → Squad Leader → Commander → Fleet Admiral)
4. Inviter leaderboard table (8 rows)
5. Your stats (two-col): headline | 3 float items
6. CTA

### Resources page sections:
1. Header: "Master the arena"
2. Category grid (6 float items 3x2, NO cards)
3. Featured articles (3 float items, NO cards)
4. Video tutorials (4 float items, NO thumbnails — just text + duration + Watch link)
5. FAQ accordion (6 items)
6. CTA

### Sign in page:
NO nav. NO footer. Centered, minimal, intimate.
Logo → "Access Terminal" title → subtitle → form (underline inputs) → violet pill → social text links → security note

### Sign out page:
NO nav. NO footer. Centered. Two phases with JS transition:
Phase 1 (0-2s): "Signing out..." + thank you text + pulsing dots
Phase 2 (after 2s): "Session Terminated" + "Sign Back In" pill + "Return Home" ghost link

### Admin dashboard:
NO public nav. Uses admin-layout (sidebar + content).
Sidebar: "MISSION CONTROL" title + 8 nav items
Content: header with live clock → 4 stat items → registration counter → tournament table → activity feed → quick controls (toggles + inputs) → user management table → footer

---

## BUILD INSTRUCTIONS

1. Write `css/dala.css` first — all tokens, reset, typography, layout, components, responsive
2. Write `js/dala.js` — ParticleField class, scroll reveal, nav scroll, mobile menu, counters, reg counter, locked tournaments, accordion
3. Write all 10 HTML pages — each linking ONLY dala.css and dala.js
4. Every page: `<canvas id="particle-canvas">` + inline `new ParticleField(...)` 
5. Test: pure black background, no cards, massive type, particle constellation working, mobile responsive
