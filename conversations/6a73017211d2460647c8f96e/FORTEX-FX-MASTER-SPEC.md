# FORTEX FX — MASTER BUILD SPECIFICATION
## Complete Project Brief for AI Agent Build

---

## 1. PLATFORM OVERVIEW

**What is Fortex FX?**
A free forex trading tournament platform where traders compete for highest ROI. No subscriptions, no real-money prizes. Winners get paid in REX (platform currency). Community lives on Discord ("the Citadel").

**Target Audience:** Forex traders on XM broker, ages 18-40, competitive mindset, trade on MT4/MT5 terminals.

**Core Loop:** Sign up (Discord) → Link MT4 → Join Tournament → Trade on own terminal → Admin reveals results on final day → Winners get REX → Spend REX on rewards

**Revenue Model:** Fully free. Real funds stay in XM broker accounts (IB arrangement). No subscriptions ever.

---

## 2. KEY ARCHITECTURE DECISIONS

1. **NO trading interface** — users trade on their own MT4/MT5 terminals
2. **NO live data syncing** — no MetaApi, no EA/MQL scripts, no real-time rankings
3. **Sealed results** — admin manually enters trader ROI data on reveal day. Results kept secret until the last day. This builds curiosity and hype.
4. **Tournament = highest ROI wins**, announced on final day as a surprise
5. **Discord OAuth for auth** — username must match
6. **Markets:** Forex and Crypto (mainly Forex)
7. **Wallet only in REX** (platform's own currency)
8. **Tournaments run bi-weekly** within every month
9. **Admin controls everything** — tournament creation, scheduling, ROI entry, prize distribution, user banning, settings
10. **Referral rewards only to verified users** with linked accounts who made a deposit (in T&T, not public)
11. **NO level-based ranking** (bronze/silver/gold/diamond removed) — seasonal rankings only
12. **KYC handled by broker** (XM), not platform
13. **Prize distribution in REX currency**

---

## 3. DESIGN SYSTEM

**Palette:**
- Background: `#06070A` (obsidian black)
- Accent: `#D4AF37` (gold)
- Secondary accent: `#8052FF` (electric iris)
- Text: `#FFFFFF` (white), `#888888` (ash gray)
- Cards: `rgba(10, 10, 10, 0.85)` with `1px solid #1a1a1a` borders

**Fonts:** Inter (200, 400, 600, 700 weights)

**Vibe:** Dark, realistic, futuristic. Not a template. Think Bloomberg Terminal meets luxury trading floor.

**Particle System:** Nebula galaxy with 450+ particles that morph into 21 trading-themed constellation shapes (candlestick, euro, pound, yen, dollar, discord, metatrader, gold, oil, bitcoin, ethereum, rocket, trophy, etc.) on scroll. Touch-reactive.

---

## 4. PSYCHOLOGICAL DESIGN PRINCIPLES

Every page must incorporate these psychological triggers:

1. **Loss Aversion** — Frame as "don't miss out" not "win money"
2. **Social Proof** — Show registration count, active traders, REX distributed
3. **Scarcity** — "Limited tournament spots", "Registration closes in X days"
4. **Curiosity Gap** — "247 traders competing. None know where they stand. Do you?"
5. **Achievement/Ego** — "You already have the skill. Now prove it."
6. **Commitment Ladder** — Sign up → link account → deposit → enter tournament → invite friends (each step increases commitment)
7. **Reciprocity** — Give free value first (education, resources) so they feel they owe participation
8. **FOMO** — Show what others are winning, what tournaments are happening
9. **Endowment Effect** — Give them a profile, referral code, position — make them feel they "own" something
10. **Identity** — "You're not just a trader. You're a Fortex FX competitor."
11. **The "Free" Effect** — "No subscription. No fees. No catch." removes friction
12. **Community/Belonging** — The Citadel (Discord) creates belonging

**Copy Rules:**
- Frame everything as "your benefit" not "our platform"
- Use "you" and "your" heavily
- Make it feel exclusive but accessible
- Create urgency without being pushy
- Every section should make the trader think "this was built for ME"

---

## 5. DATABASE ENTITIES (7 tables)

All entities are stored in Base44. Use `manage_entity_schemas` to create them. Every record auto-includes: `id`, `created_date`, `updated_date`, `created_by`.

### 5.1 Trader
```json
{
  "properties": {
    "discord_id": { "type": "string" },
    "discord_username": { "type": "string" },
    "avatar": { "type": "string" },
    "verified": { "type": "boolean" },
    "mt4_linked": { "type": "boolean" },
    "mt4_account": { "type": "string" },
    "rex_balance": { "type": "number" },
    "checkin_streak": { "type": "number" },
    "best_streak": { "type": "number" },
    "total_checkins": { "type": "number" },
    "last_checkin_date": { "type": "string" },
    "joined_date": { "type": "string" },
    "role": { "type": "string", "enum": ["trader", "admin"] },
    "banned": { "type": "boolean" },
    "banned_reason": { "type": "string" },
    "referral_code": { "type": "string" },
    "referred_by": { "type": "string" }
  }
}
```

### 5.2 Tournament
```json
{
  "properties": {
    "name": { "type": "string" },
    "description": { "type": "string" },
    "start_date": { "type": "string" },
    "end_date": { "type": "string" },
    "reveal_date": { "type": "string" },
    "prize_pool_rex": { "type": "number" },
    "entry_criteria_min_deposit": { "type": "number" },
    "participant_count": { "type": "number" },
    "status": { "type": "string", "enum": ["draft", "active", "paused", "completed", "revealed"] },
    "is_active": { "type": "boolean" },
    "markets": { "type": "string" },
    "created_by": { "type": "string" },
    "admin_notes": { "type": "string" }
  }
}
```

### 5.3 Participant
```json
{
  "properties": {
    "trader_id": { "type": "string" },
    "trader_username": { "type": "string" },
    "tournament_id": { "type": "string" },
    "tournament_name": { "type": "string" },
    "starting_balance": { "type": "number" },
    "final_equity": { "type": "number" },
    "roi": { "type": "number" },
    "rank": { "type": "number" },
    "prize_won_rex": { "type": "number" },
    "status": { "type": "string", "enum": ["registered", "active", "completed", "disqualified"] },
    "revealed": { "type": "boolean" }
  }
}
```

### 5.4 Transaction
```json
{
  "properties": {
    "trader_id": { "type": "string" },
    "type": { "type": "string", "enum": ["checkin_reward", "checkin_milestone", "tournament_prize", "referral_bonus", "admin_adjustment", "redemption"] },
    "amount": { "type": "number" },
    "description": { "type": "string" },
    "reason": { "type": "string" },
    "transaction_date": { "type": "string" },
    "reference_id": { "type": "string" }
  }
}
```

### 5.5 Referral
```json
{
  "properties": {
    "referrer_id": { "type": "string" },
    "referrer_username": { "type": "string" },
    "referred_id": { "type": "string" },
    "referred_username": { "type": "string" },
    "referral_date": { "type": "string" },
    "status": { "type": "string", "enum": ["pending", "qualified", "rewarded", "disqualified"] },
    "qualified": { "type": "boolean" },
    "qualified_date": { "type": "string" },
    "reward_amount_rex": { "type": "number" }
  }
}
```

### 5.6 CheckIn
```json
{
  "properties": {
    "trader_id": { "type": "string" },
    "trader_username": { "type": "string" },
    "checkin_date": { "type": "string" },
    "new_streak": { "type": "number" },
    "rex_earned": { "type": "number" },
    "milestone_reached": { "type": "string" },
    "milestone_bonus_rex": { "type": "number" }
  }
}
```

### 5.7 PlatformSetting
```json
{
  "properties": {
    "key": { "type": "string" },
    "value": { "type": "string" },
    "category": { "type": "string" },
    "description": { "type": "string" },
    "last_updated": { "type": "string" },
    "updated_by": { "type": "string" }
  }
}
```

### Default Platform Settings (create these on first run):
```
key: registration_count, value: "3742", category: "stats"
key: checkin_daily_reward, value: "10", category: "checkin"
key: checkin_milestone_7, value: "50", category: "checkin"
key: checkin_milestone_14, value: "150", category: "checkin"
key: checkin_milestone_30, value: "500", category: "checkin"
key: checkin_milestone_90, value: "2000", category: "checkin"
key: referral_reward, value: "100", category: "referral"
key: tournament_min_deposit, value: "100", category: "tournament"
key: max_tournament_participants, value: "500", category: "tournament"
```

---

## 6. BACKEND FUNCTIONS (Correct Deno.serve Pattern)

**CRITICAL:** Base44 backend functions MUST use this exact pattern:

```typescript
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return Response.json({ success: false, error: "Invalid request body" });
  }
  
  // ... your logic ...
  
  return Response.json({ success: true, data: result });
});
```

**Rules:**
- Use `Deno.serve()` — NO Express-style `export default function(req, res)`
- Import `createClientFromRequest` from `npm:@base44/sdk@0.8.31` — NO other import pattern
- Create base44 client with `createClientFromRequest(req)` inside the handler
- Return `Response.json()` — never `res.json()` or plain objects
- Parse params from `await req.json()` — not URL params
- Use `fetch()` for external API calls (Deno has native fetch)
- No local imports between function files — each file is independent

### 6.1 discordAuth
**Purpose:** Verify Discord token, create/update trader record
**Input:** `{ access_token, referral_code }`
**Logic:**
1. Call Discord API `https://discord.com/api/users/@me` with Bearer token
2. Get discord_id, username, avatar
3. Check if Trader exists by discord_id
4. If exists: update username/avatar, return trader data
5. If new: create Trader record with generated referral_code, handle referral chain, increment registration_count
6. Return trader object with all fields

### 6.2 dailyCheckin
**Purpose:** Process daily check-in, calculate streak, award REX
**Input:** `{ trader_id }`
**Logic:**
1. Get trader by ID
2. Check if already checked in today (last_checkin_date === today)
3. Calculate new streak: if last checkin was yesterday, +1; if gap >1 day, reset to 1
4. Get reward settings from PlatformSetting (checkin_daily_reward, milestone bonuses)
5. Check milestones (7, 14, 30, 90 days)
6. Update trader: checkin_streak, last_checkin_date, total_checkins, best_streak, rex_balance
7. Create CheckIn record
8. Create Transaction record
9. Return new streak, REX earned, milestone info

### 6.3 linkMT4
**Purpose:** Link trader's MT4/MT5 account
**Input:** `{ trader_id, mt4_account }`
**Logic:**
1. Get trader by ID
2. Update mt4_account field
3. Set mt4_linked = false (admin verifies manually)
4. Return success

### 6.4 adminCreateTournament
**Purpose:** Admin creates a new tournament
**Input:** `{ name, description, start_date, end_date, reveal_date, prize_pool_rex, entry_criteria_min_deposit, markets }`
**Logic:**
1. Verify caller is admin (check trader role)
2. Create Tournament record with status "draft"
3. Return tournament data

### 6.5 adminTournamentControl
**Purpose:** Admin controls tournament lifecycle
**Input:** `{ tournament_id, action, roi_data }` where action = "activate" | "pause" | "complete" | "reveal" | "distribute"
**Logic:**
- activate: set status="active", is_active=true
- pause: set status="paused", is_active=false
- complete: set status="completed"
- reveal: set status="revealed", take roi_data array [{trader_id, roi, final_equity}], update Participant records, calculate ranks, set revealed=true
- distribute: calculate prizes based on rank, update Participant prize_won_rex, add REX to Trader balances, create Transaction records

### 6.6 getLeaderboard
**Purpose:** Fetch leaderboard data
**Input:** `{ tournament_id, season }`
**Logic:**
1. Get tournament by ID
2. If tournament status !== "revealed": return placeholder message ("Results sealed. Reveal on [date]")
3. If revealed: get Participants sorted by roi descending
4. Return ranked list with trader usernames, ROI, rank, prize_won

### 6.7 adminUpdateSettings
**Purpose:** Admin updates platform settings
**Input:** `{ settings: [{ key, value }] }`
**Logic:**
1. Verify caller is admin
2. For each setting: find by key, update value and last_updated
3. Return updated settings

### 6.8 getTraderProfile
**Purpose:** Fetch full trader profile for profile page
**Input:** `{ trader_id }`
**Logic:**
1. Get trader by ID
2. Get recent transactions (last 20)
3. Get tournament participation history
4. Get referral stats
5. Get check-in history
6. Return complete profile bundle

### 6.9 getPlatformStats
**Purpose:** Fetch platform-wide stats for homepage counters
**Input:** `{}`
**Logic:**
1. Get registration_count from PlatformSetting
2. Count active tournaments
3. Sum all REX distributed (from Transactions where type = tournament_prize or checkin_reward)
4. Get next tournament start date
5. Return stats object

---

## 7. FRONTEND PAGES (13 pages)

All pages share:
- `css/dala.css` — design system
- `js/dala.js` — particle system + interactions
- `js/auth.js` — shared auth module (Discord OAuth, localStorage session, nav updates)
- `js/psychology.js` — psychology-driven animations and reveals

### 7.1 index.html — Home
**Sections:**
1. Hero: "You already have the skill. Now prove it." + CTA to signin
2. Live stats bar (registration count, REX distributed, days to next tournament) — calls `getPlatformStats`
3. The Problem: "Trading alone. No recognition. No competition. Sound familiar?"
4. The Solution: Fortex FX as the answer (free tournaments, prizes, community)
5. How it works: 3 steps (Sign up → Link MT4 → Compete)
6. Why it's free: "No subscription. No fees. No catch." removes objection
7. Sealed results explainer: "Results stay secret until reveal day. Nobody knows where they stand."
8. Registration counter: Animated counter from 3,742 to 10,000
9. Tournament preview card: Next tournament info, countdown timer
10. REX explainer: What REX is, how to earn it, what it buys
11. Community: Discord Citadel pitch
12. Final CTA: "Your seat is waiting." → signin

### 7.2 signin.html — Discord Auth
**Functionality:**
- Discord OAuth implicit flow (response_type=token, scope=identify)
- On callback: send access_token to `discordAuth` backend function
- Loading spinner during verification
- Success screen: "Welcome to the Arena!" → redirect to profile
- Error handling with retry
- Already logged in? Redirect to index
- Reassurance list (free, Discord verified, no trading on platform)
- Social proof grid (traders registered, REX distributed, days to launch)
- FAQ accordion

### 7.3 leaderboard.html — Tournaments & Rankings
**Functionality:**
- Tournament selector tabs (current, past, seasonal)
- Current tournament: "Results Sealed" banner with reveal date countdown
- Past tournaments: Full rankings table (trader, ROI, rank, prize) — calls `getLeaderboard`
- Seasonal standings: Aggregate leaderboard across tournaments
- No real-time data — only revealed results shown
- "When will results be revealed?" explainer

### 7.4 offers.html — REX Rewards
**Functionality:**
- REX balance display (from localStorage trader data)
- "How to earn REX" section: tournaments, daily check-ins, referrals
- Transaction history (calls backend to get recent transactions)
- Redemption catalog (what REX can buy) — static for now
- REX earning rate visualization

### 7.5 resources.html — Academy
**Functionality:**
- Trading guides (forex basics, risk management, psychology)
- Tournament replays (video embeds — placeholder)
- Trade setup breakdowns
- "Coming soon" badges for unreleased content
- Category filter

### 7.6 invite.html — Referral Engine
**Functionality:**
- Personal referral link with copy button
- Referral stats: total invited, qualified, REX earned from referrals
- "How referrals work" explainer (referee must verify + deposit)
- Referral tier visualization (first 5 friends = X REX each)
- Share buttons (Discord, Twitter, WhatsApp, Copy link)
- Calls backend to get referral data

### 7.7 checkin.html — Daily Check-In
**Functionality:**
- Big check-in button (calls `dailyCheckin` backend function)
- Current streak display with fire animation
- Streak calendar (visual of last 30 days)
- Milestone progress (next milestone at 7/14/30/90 days)
- REX earned today
- Best streak record
- Already checked in today? Show "Come back tomorrow" state
- Streak leaderboard (top streaks across platform)

### 7.8 profile.html — Trader Profile
**Functionality:**
- Trader avatar, username, role badge
- MT4 linking form (account number input → calls `linkMT4`)
- Verification status badge (pending/verified)
- REX balance
- Check-in streak + best streak
- Tournament history (joined, results, prizes)
- Referral code display
- Transaction history
- "Edit profile" disabled (Discord username is identity)
- Calls `getTraderProfile` backend function for all data

### 7.9 admin.html — Admin Dashboard
**Access control:** Only traders with role="admin" can access
**Tabs:**
1. **Tournaments:** Create/edit/activate/pause/reveal tournaments. Tournament list with status badges.
2. **Participants:** View all participants in a tournament. Enter ROI data manually (table with inputs). Reveal button.
3. **Prize Distribution:** Auto-calculate prizes based on rank. Distribute REX button.
4. **Traders:** Full trader list. Ban/unban. Verify MT4. Edit REX balance (manual adjustment).
5. **Referrals:** View all referral chains. Mark qualified. Award REX.
6. **Transactions:** All platform transactions. Filter by type.
7. **Settings:** Edit all platform settings (checkin rewards, referral rewards, tournament config).
**Every action calls a backend function. No direct database access from frontend.**

### 7.10 signout.html — Logout
**Functionality:**
- Clear localStorage
- "You've left the Arena" message
- Redirect to index after 2 seconds

### 7.11 terms.html — Terms & Conditions
**Content:** Legal text covering tournament rules, REX currency terms, referral qualification (verified + deposited), liability, etc.

### 7.12 privacy.html — Privacy Policy
**Content:** What data is collected (Discord ID, username, avatar, MT4 account number), how it's used, no trading data access.

---

## 8. SHARED JAVASCRIPT MODULES

### 8.1 js/auth.js — Auth Module
```javascript
const FORTEX_AUTH = {
  API_BASE: 'https://api.base44.com/v1/apps/{APP_ID}/functions',
  DISCORD_CLIENT_ID: '{DISCORD_CLIENT_ID}',
  DISCORD_REDIRECT_URI: 'https://somilsharma2000.github.io/VortexFX/signin.html',
  DISCORD_SCOPES: 'identify',
  TRADER_KEY: 'fortex_trader',
  TOKEN_KEY: 'fortex_discord_token',
  
  isLoggedIn() { /* check localStorage */ },
  loginWithDiscord(referralCode) { /* redirect to Discord OAuth */ },
  async handleCallback() { /* process OAuth callback, call discordAuth function */ },
  logout() { /* clear localStorage, redirect */ },
  async callFunction(name, payload) { /* fetch to backend function */ },
  updateNav() { /* update nav based on login state */ }
};
```

### 8.2 js/dala.js — Particle System + UI
- Nebula galaxy particle system (450+ particles)
- 21 trading-themed constellation shapes
- Scroll-based morphing (every 80px)
- Touch reactive
- Cursor repulsion
- Reveal animations on scroll
- Nav hamburger menu
- Countdown timers

### 8.3 js/psychology.js — Psychology Triggers
- Scroll-triggered reveals (commitment ladder)
- Social proof counters (animated count-up)
- Urgency timers
- Exit intent detection
- Progress visualization

---

## 9. API ENDPOINT PATTERN

All backend functions are called via:
```
POST {API_BASE}/{function_name}
Content-Type: application/json
Body: { ...parameters }
```

Response format:
```json
{ "success": true, ...data }
// or
{ "success": false, "error": "Error message" }
```

---

## 10. DISCORD OAUTH SETUP

1. Go to https://discord.com/developers/applications
2. Create New Application → name "Fortex FX"
3. OAuth2 → Redirects → add: `https://somilsharma2000.github.io/VortexFX/signin.html`
4. Copy Client ID → put in `js/auth.js` `DISCORD_CLIENT_ID`
5. OAuth2 URL Generator: select scope `identify`, set redirect URL
6. The frontend uses implicit grant flow (response_type=token)

---

## 11. DEPLOYMENT

**Frontend:** GitHub Pages
- Repository: `somilsharma2000/VortexFX`
- Branch: `main`
- Live URL: `https://somilsharma2000.github.io/VortexFX/`
- Push to deploy

**Backend:** Base44 platform
- Deploy functions using `deploy_backend_function` tool
- Functions use Deno.serve pattern
- Database entities managed via `manage_entity_schemas` tool

---

## 12. COMPLETE TASK LIST (in order)

### Phase 1: Foundation ✅ (Already Done)
- [x] Create all 7 entity schemas
- [x] Deploy discordAuth backend function
- [x] Build signin.html with Discord OAuth
- [x] Create js/auth.js shared module
- [x] Add auth.js to all 13 pages
- [x] Set Discord Client ID

### Phase 2: Backend Functions (Rewrite ALL to Deno.serve pattern)
- [ ] Rewrite `dailyCheckin` with Deno.serve pattern + deploy
- [ ] Rewrite `linkMT4` with Deno.serve pattern + deploy
- [ ] Rewrite `adminCreateTournament` with Deno.serve pattern + deploy
- [ ] Rewrite `adminTournamentControl` with Deno.serve pattern + deploy
- [ ] Rewrite `getLeaderboard` with Deno.serve pattern + deploy
- [ ] Rewrite `adminUpdateSettings` with Deno.serve pattern + deploy
- [ ] Create `getTraderProfile` function + deploy
- [ ] Create `getPlatformStats` function + deploy
- [ ] Create `getReferralData` function + deploy
- [ ] Create `getCheckinHistory` function + deploy
- [ ] Create default PlatformSetting records (checkin rewards, etc.)

### Phase 3: Frontend Wiring — Core User Flow
- [ ] Wire `profile.html` to call `getTraderProfile` + `linkMT4`
- [ ] Wire `checkin.html` to call `dailyCheckin`
- [ ] Wire `offers.html` to display real REX balance + transaction history
- [ ] Wire `invite.html` to display referral link + referral stats
- [ ] Wire `leaderboard.html` to call `getLeaderboard` + handle sealed/revealed states
- [ ] Wire `index.html` to call `getPlatformStats` for live counters

### Phase 4: Admin Dashboard (Full Control Panel)
- [ ] Build admin auth check (redirect non-admins)
- [ ] Tournament management UI (create, activate, pause, complete, reveal)
- [ ] Participant ROI entry table (manual input on reveal day)
- [ ] Prize distribution calculator + REX distribution
- [ ] Trader management (ban, verify MT4, adjust REX)
- [ ] Referral management (mark qualified, award REX)
- [ ] Transaction viewer with filters
- [ ] Settings panel (edit all PlatformSetting values)
- [ ] Dashboard overview stats (total traders, tournaments, REX distributed)

### Phase 5: Polish & Psychology
- [ ] Add exit-intent popup on home page ("Wait — your free seat is reserved")
- [ ] Add animated count-up for registration counter
- [ ] Add urgency timer countdown for next tournament
- [ ] Add "X traders joined in the last hour" social proof notification
- [ ] Add progress bar for tournament registration (3,742/10,000)
- [ ] Add commitment ladder visualization on profile page
- [ ] Add "Your rank will be revealed on [date]" teaser on profile
- [ ] Add referral progress visualization (qualified vs pending)
- [ ] Add streak fire animation on check-in page
- [ ] Add "Share your victory" buttons on revealed leaderboard
- [ ] Add loading states for all API calls
- [ ] Add error states with retry buttons for all API calls
- [ ] Add empty states with CTAs for all data-dependent sections
- [ ] Add mobile responsiveness checks for all pages
- [ ] Add SEO meta tags (title, description, og:tags) for all pages

### Phase 6: Testing & Launch
- [ ] Test Discord OAuth flow end-to-end
- [ ] Test check-in streak calculation (day 1, day 2, skip day, milestone)
- [ ] Test admin tournament lifecycle (create → activate → reveal → distribute)
- [ ] Test referral chain (sign up with code → verify → deposit → qualify)
- [ ] Test REX balance updates across all actions
- [ ] Test sealed leaderboard (before reveal = hidden, after reveal = ranked)
- [ ] Test admin settings updates (change rewards → verify on check-in page)
- [ ] Test mobile experience on all 13 pages
- [ ] Test error handling (expired token, banned user, double check-in)
- [ ] Performance audit (page load, particle system, API response times)

---

## 13. MASTER PROMPT FOR ANOTHER AGENT

Copy-paste this prompt to start the build with another AI agent:

---

**PROJECT:** Build Fortex FX — a free forex trading tournament platform.

**WHAT TO BUILD:** A complete web platform with 13 frontend pages (static HTML/CSS/JS) hosted on GitHub Pages, backed by Base44 backend functions (Deno.serve pattern) and 7 database entities.

**ARCHITECTURE:**
- Frontend: Static HTML/CSS/JS, no framework. Vanilla JavaScript only.
- Backend: Base44 backend functions using `import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';` and `Deno.serve(async (req) => { ... })` pattern. Return `Response.json()`.
- Database: Base44 entities (Trader, Tournament, Participant, Transaction, Referral, CheckIn, PlatformSetting)
- Auth: Discord OAuth implicit flow (response_type=token, scope=identify)
- Hosting: GitHub Pages for frontend, Base44 for backend

**DESIGN:** Dark obsidian (#06070A) + gold (#D4AF37) + electric iris (#8052FF). Inter font. Nebula galaxy particle background that morphs into 21 trading-themed constellation shapes on scroll. Futuristic, luxury, not a template.

**PSYCHOLOGY:** Apply behavioral psychology throughout: loss aversion, social proof, scarcity, curiosity gap, FOMO, achievement/ego, commitment ladder, reciprocity, endowment effect, identity. Every page should make the trader think "this was built for ME" and feel compelled to join.

**KEY RULES:**
1. NO live data syncing, NO real-time leaderboards. Results are sealed until admin reveals them on the final day.
2. NO trading interface. Users trade on their own MT4/MT5 terminals.
3. Everything is FREE. No subscriptions. Prizes in REX (platform currency).
4. Admin manually enters trader ROI data on reveal day.
5. Tournaments run bi-weekly. Highest ROI wins.
6. Discord OAuth for auth. Username = identity.
7. Referral rewards only to verified + deposited users.
8. NO level-based ranking. Seasonal rankings only.

**BUILD ORDER:**
1. Create all 7 entity schemas in Base44
2. Deploy all backend functions (Deno.serve pattern)
3. Wire all 13 frontend pages to backend APIs
4. Build admin dashboard with full controls
5. Apply psychological design triggers
6. Test end-to-end and deploy

**DELIVERABLE:** A production-ready platform where traders sign in with Discord, link their MT4, join tournaments, and compete for REX prizes — all managed by an admin dashboard.

---

## 14. IMPORTANT NOTES FOR THE BUILDING AGENT

1. **Base44 backend function pattern is CRITICAL.** The correct pattern is:
   ```typescript
   import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
   Deno.serve(async (req) => {
     const base44 = createClientFromRequest(req);
     const body = await req.json();
     return Response.json({ success: true });
   });
   ```
   Any other pattern (Express-style, export default, etc.) will throw 500 errors.

2. **The frontend is static HTML on GitHub Pages.** No server-side rendering. All dynamic data comes from fetch() calls to Base44 backend functions.

3. **Auth uses Discord OAuth implicit flow.** The access token comes in the URL fragment (#access_token=xxx). Frontend sends it to the backend for verification. Backend uses it to call Discord API and get user info.

4. **Admin role check:** Store role in localStorage after login. On admin.html, check if role === "admin" and redirect if not. Backend functions should also verify role for admin actions.

5. **CORS:** Base44 backend functions should handle CORS for cross-origin requests from GitHub Pages. Add appropriate headers if needed.

6. **Rate limiting:** The frontend should avoid unnecessary API calls. Cache data in localStorage where possible. Only re-fetch when data changes.

7. **Error handling:** Every API call needs error states. Show user-friendly messages, not raw errors.

8. **Mobile-first:** All pages must work perfectly on mobile. The majority of traders will visit on their phones.

9. **Psychology in copy:** Every headline, CTA, and description should apply the psychological principles listed in Section 4. The goal is to make every visitor feel they NEED to join.

10. **Credit conservation:** If using Base44 credits, batch operations, cache data, limit API calls, and prioritize efficiency.
