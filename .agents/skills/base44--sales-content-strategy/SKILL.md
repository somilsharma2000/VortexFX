---
name: sales-content-maker
description: >-
  Turns a business's own SALES data (not social/engagement analytics) into a month of
  marketing content: it reads what's actually selling, slipping, and worth pushing, then
  writes platform-native posts and builds the designs. The input is the store's revenue —
  QuickBooks/Stripe/PayPal/Plaid or a sales CSV — so the content promotes what the numbers
  say to promote. Two phases — a sales-grounded strategy brief, then the actual content —
  with one quick check-in between. Trigger whenever someone wants
  to plan or create marketing/social content tied to their business: "what should I post
  this month", "build a content plan from my sales", "make me this month's posts", "what's
  selling and what should I promote", "turn my sales into a campaign", "write LinkedIn/X/IG
  posts for my store". Don't wait for the exact words — if there's a store/sales data and
  the person wants content or a posting plan, jump in and take it end to end.
compatibility: >-
  Sales source for Phase 1 (a CSV/sheet export always works; QuickBooks/Stripe/PayPal/Plaid
  connectors optional). A design connector (Canva/Figma/Google Slides) optional for Phase 2.
  Bundled scripts in scripts/ need only Python 3.
---

# Sales Content Maker

This skill helps a business owner go from "I should post something this month" to a finished,
on-strategy set of posts — grounded in what their **sales data** actually says (not social or
engagement analytics, and not generic marketing fluff). It runs in two phases:

- **Phase 1 — the brief:** read the sales data, figure out what to push and what to fix, and
  deliver a tight, opinionated strategy brief.
- **Phase 2 — the content:** turn the approved brief into platform-native posts (with real
  copy variations) and designs, laid out on a dated calendar.

Between them sits exactly **one** lightweight check-in. That's the whole flow.

## The Rule Everything Else Serves: Deliver, Don't Narrate a Process

The job is to hand back finished work. Do the analysis and produce the *complete* brief in one
pass; once the owner approves, produce the *complete* content package in one pass. Don't show a
"here's my process" map, don't stop after each step to ask permission to continue, and don't
trade a rich result for process tidiness.

Why this is the top rule: an assistant that pauses at every phase boundary ("I've pulled the
data — shall I analyze it?") is worse than no assistant, because the owner could do that
themselves. All the value is in the finished thinking and the finished posts. So default hard
toward *shipping the whole thing.* If you're tempted to stop and ask "should I go further?", the
answer is almost always yes — go.

There are only three moments that genuinely warrant a pause, covered below: the **one Phase-2
check-in**, a **needed connection** (a tool isn't connected yet), and **publishing** (you never
do it). Everything else — pulling data, ranking, diagnosing a decline, drafting the brief,
writing copy, building designs — you just do.

## Phase 1 — The Brief (do it all in one go)

1. **Get the numbers.** Run the analyzer rather than eyeballing the data — it computes rankings
   and period-over-period movement deterministically:
   ```bash
   python scripts/sales_analysis.py <source|--file path.csv> [days] --metric revenue|velocity|blend
   ```
   A CSV/spreadsheet export always works and is the common case; `stripe`/`paypal`/`quickbooks`/
   `plaid` are optional live connectors (token via env). The script returns JSON:
   `data_sufficiency`, `top_performers`, `trending_up`, `trending_down`, `slow_movers`,
   `granularity`, and `requested_metric_unavailable`. See `reference.md` for connector setup,
   pre-flight, and fallbacks (rate limits, thin data, margin requests).

   Pick a sensible default and proceed — rank by revenue unless the owner indicated otherwise,
   and infer seasonality from category benchmarks (clearly labelled as a benchmark) if they
   didn't state a pattern. You can offer to re-rank by velocity or a blend in the same breath,
   but don't *block* the brief on that question. Delivering something they can react to beats
   interrogating them first.

2. **Write the brief — and make it earn its keep.** A brief that only lists winners is a victory
   lap, not a strategy. Every brief covers, concretely and with real numbers from the JSON:
   - **Headline** — the one or two things that actually matter this month.
   - **Push** — the items to lean into, each with a specific angle and why (momentum, margin,
     season).
   - **Fix / watch — the part that earns your fee.** Actively surface what's slipping:
     name each decliner, quantify the drop (e.g. "Single-Serve Pods −61%"), give a likely
     cause, and attach a concrete action (reposition, bundle, win-back, retire). Don't let a
     decline hide under the winners.
   - **Hold / reposition** — what to stop pushing or rework.
   - **Seasonal layer** and any **offer** worth running.
   Keep it tight (~250 words is plenty) and confident. The full brief spec is in `reference.md`.

3. **Close with a real choice, not a gate.** End the brief by inviting reaction and naming the
   next step: "Match your read? When you're happy, I'll turn this into the month's posts — and I
   can email you the brief too." That's it — no verbatim recap ceremony.

On an **automation run** (no owner in chat), do Phase 1 only, silently: draft the brief with
`approved: false`, queue it for their next visit, and send nothing. The queued draft *is* the
notification. (See `reference.md` § Automation.)

## The One Check-In (Phase 1 → Phase 2)

When the owner approves the brief and wants the content, confirm the few things you genuinely
can't infer — in two or three plain sentences, not a scripted recap:

> "Great. I'll create ~13 posts over 30 days for [push items + offer]. Platforms — LinkedIn and
> X? I'll write in your usual voice and build the visuals in Canva (connected). Want to change
> the cadence, platforms, items, or build tool before I go?"

Adjust to any answer, then **go** — generate the whole package. The only reason to stop here is
if the chosen design tool isn't connected: ask them to connect it first (or offer to deliver
copy + calendar without designs). This single confirm exists because Phase 2 produces a lot of
creative work against specific platforms and tools — getting those choices right once is worth a
sentence; pausing repeatedly is not.

## Phase 2 — The Content (one pass, complete package)

1. **Write the copy** in the owner's brand voice, natively per platform — 2–4 distinct
   variations per slot (different angles: data-led, contrarian, story), not one paragraph pasted
   everywhere. Pull numbers only from the brief; never invent stats; skip filler like
   "supercharge your workflow." Platform length/hook specs (LinkedIn, X, Newsletter, Instagram)
   are in `reference.md` § Platform bridge. Brand voice is captured once and reused — see
   `reference.md` § Brand voice.

2. **Build the assets** in the connected design tool (Canva/Figma/Google Slides): one design per
   chosen variation, brand colors, return editable links. Want original artwork? Generate it,
   then place it in the design. If the tool errors or isn't connected, deliver the copy +
   calendar and tell the owner to paste it in — **never fake a link.**

3. **Lay out the calendar:** save the approved brief to `approved_brief.json`, then:
   ```bash
   python scripts/content_calendar.py approved_brief.json --per-week N --start YYYY-MM-DD --days 30
   ```
   It returns dated `slots[]` with push items weighted to the most slots. Map each slot to its
   copy + design link.

4. **Present the full package** for review: per post → date · platform · format · copy · design
   link, then the calendar summary. Close with: "Here's the month — tweak anything, then post
   when you're ready. I don't publish for you." Publishing is the owner's; never post on their
   behalf.

## Visuals in Chat

If you add a visual summary of the brief (a hot/cooling chart, a ranking bar), treat it as a
bonus on top of the full written answer — never a substitute. Write the complete brief first; a
visual that fails then costs nothing. Never let internal scaffolding, placeholders, or
"unavailable" notices reach the owner — if something would render empty or broken, just omit it
and keep the text. The words carry the value; the picture is garnish.

## Files & References

- `scripts/sales_analysis.py` — sales source → analysis JSON (run it; don't recompute by hand).
- `scripts/content_calendar.py` — approved brief → dated slots.
- `reference.md` — connectors & pre-flight, metrics & data sufficiency, seasonality benchmarks,
  the brief spec, brand voice capture, platform bridge specs, the calendar, automation runs, and
  fallbacks. Read the relevant section when you hit it; you don't need all of it up front.

## Examples

**"What should I post this month?" (fresh, data connected)**
> Run the analyzer, then deliver a complete brief in one pass — headline, push items with
> angles, the decliners flagged with fixes, seasonal layer, an offer — and close by offering to
> create the posts. No process map, no per-step pauses.

**"Just make me this month's posts." (no brief yet)**
> You still need a brief and the one check-in first, but don't make a thing of it: "Two minutes
> to pull your numbers so the posts reflect what's actually selling, then I'll create them." Run
> a fast Phase 1 → brief → confirm → Phase 2. Don't fabricate a brief to skip the step.

**"Rank my sellers and tell me what to push."**
> A Phase-1 brief: correct ranking, plus the decliner hiding under the winners (named and
> quantified), plus specific push plays with angles. Don't stop at the list — the
> recommendations are the point.
