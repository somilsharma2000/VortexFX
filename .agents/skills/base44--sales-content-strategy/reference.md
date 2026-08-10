# Sales Content Maker — Reference

Detail behind `SKILL.md`. Read the section you need when you hit it; you don't need all of this
in context at once. The guiding spirit is the same throughout: **deliver the finished result.**
These rules support good output — they are not checkpoints to stop and announce.

## Table of contents
1. Connectors & pre-flight
2. Metrics & data sufficiency
3. Seasonality benchmarks
4. The brief spec
5. Brand voice
6. Platform bridge (per-platform specs)
7. The calendar
8. Automation runs
9. Fallbacks & edge cases

---

## 1. Connectors & pre-flight

**Sales sources (Phase 1).** A CSV/spreadsheet export is the universal path and always works —
just pass `--file path.csv` (or `path.xlsx`). The analyzer auto-detects either a *summary* shape
(one row per product with two period unit columns + price, optional margin/category) or a
*transaction* shape (date + product + amount rows).

Optional live connectors read a token from the environment:

| Source | Token env | Granularity | Note |
|---|---|---|---|
| Stripe | `STRIPE_ACCESS_TOKEN` | product | amounts in cents (÷100); names from charge `description`/`metadata.product`; unlabeled charges roll up as "Uncategorized sale" |
| PayPal | `PAYPAL_ACCESS_TOKEN` | product | built-in retry; on persistent 429 the script exits 2 with `RATE_LIMITED` |
| QuickBooks | `QUICKBOOKS_ACCESS_TOKEN` | product | pre-flight: confirm Industry is set (below) |
| Plaid | `PLAID_ACCESS_TOKEN` (+ client/secret) | revenue_source | bank inflows grouped by payer/merchant — revenue *streams*, not products |

**Pre-flight (QuickBooks only).** If company info shows `Industry: Unknown`, ask the owner their
category and set it before pulling — seasonality and benchmarks depend on it. Stripe/PayPal/Plaid
need no pre-flight; just ask the owner's category if you need it for seasonality.

**Plaid is revenue-by-source, not products.** Phrase the brief for streams/clients ("your biggest
revenue is Stripe payouts and ACH from Acme; Etsy deposits are fading") and recommend which
channels/clients to nurture. Be honest about the limit and note that product-level content needs
QuickBooks/Stripe/PayPal.

---

## 2. Metrics & data sufficiency

**Metric** (`--metric`): `revenue` (default), `velocity` (units/week — "what's moving"), or
`blend`. Default to revenue and proceed; offer to re-rank rather than blocking on the choice.

**Margin is not supported.** The feeds carry sale price, not unit cost, so the script sets
`requested_metric_unavailable: "margin"` and falls back to revenue. Tell the owner plainly: "I
can't do true margin yet — your transactions don't include unit costs. I'll rank by revenue,
velocity, or a blend." Then proceed on their pick — don't stall.

**Data sufficiency.** The JSON's `data_sufficiency` reports `days_of_data` and `sufficient`
(< ~90 days → `recommend_benchmarks: true`). With thin data, still deliver a full brief — just
open with a one-line honesty flag: "Heads-up: only ~7 weeks of data, so this leans on category
benchmarks alongside your early numbers — treat it as directional." Thin data is a caveat, never
a reason to withhold the brief.

---

## 3. Seasonality benchmarks

If the owner states a seasonal pattern, use it. If not, infer from their category and the current
month, and **label it as a benchmark** so they know it's not their own history (e.g. "January →
SaaS new-year planning season (category benchmark)"). The seasonal layer shapes the angle and
timing of pushes; it's one input, not the whole brief. Never present a benchmark as the owner's
measured data.

---

## 4. The brief spec

Aim for ~250 words, skimmable, opinionated. Structure:

```
**Headline** — the 1–2 things that matter most this month.

**Push** (the items to lean into)
- <Item> — angle + why (momentum / margin / season), with a real number

**Fix / Watch** (decliners — never skip this)
- <Item> — the drop quantified, likely cause → the concrete action

**Hold / Reposition**
- <Item> — stop pushing / rework how

**Seasonal layer** — the timing/angle the month calls for (label benchmarks)
**Offer** — a specific promotion worth running, if any
```

Then close by inviting reaction and naming the next step (create the posts; optionally email the
brief). Pull every number from the analyzer JSON; don't invent figures. The non-negotiable
substance is the **Fix/Watch** section — a brief that ignores decliners has skipped the most
actionable half of the job.

When the owner approves, persist the decisions to `approved_brief.json` for the calendar step:
```json
{
  "push_items": ["..."], "hold_items": ["..."], "offer": "...",
  "platforms": ["LinkedIn","X"], "approved": true
}
```

---

## 5. Brand voice

Capture once, reuse silently thereafter. First run, keep it light — three questions: who they're
talking to, three words for the brand, formal or casual. Optionally analyze 1–2 posts they love
and extract the pattern (sentence length, person, humor, emoji use) and confirm. Note any
terminology rules ("say members, never users"). Save as a `brand_profile` with
`status: ready`; on later runs reuse it without re-asking, and let the owner say "update my brand
voice" to revisit. All Phase-2 copy is written in this voice.

---

## 6. Platform bridge (per-platform specs)

Write each platform natively — same voice, same angle, different shape. Never paste one paragraph
across all of them.

- **LinkedIn** — 1–3 short paragraphs, a strong hook before the "…see more" fold, ~3 hashtags,
  authority/insight tone.
- **X** — a single ≤280-char post with a sharp hook; optionally a 3–5 tweet thread for a
  data/story angle.
- **Newsletter** — subject ≤50 chars, scannable body, exactly one CTA.
- **Instagram** — caption with a hook in the first line, line breaks for readability, a small
  cluster of relevant hashtags; pair with a strong visual.

Per slot, offer 2–4 variations using different angles (data-led, contrarian, story,
question-led). No invented stats; numbers only from the brief; no generic filler.

---

## 7. The calendar

After saving `approved_brief.json`:
```bash
python scripts/content_calendar.py approved_brief.json --per-week N --start YYYY-MM-DD --days 30
```
Returns `slots[]` (dated, weekday, item, kind, platform), with push items weighted to the most
slots, the offer sprinkled in, and hold items given only a token presence. Map each slot to the
copy variation + design link you produced. The script handles dates/allocation only — the
creative is yours.

---

## 8. Automation runs

If a monthly refresh fires with no owner in chat: run **Phase 1 only**, silently. Draft the brief
with `approved: false` and queue it for the owner's next visit. Send no out-of-band message, run
no Phase 2, build nothing, email nothing — the queued draft *is* the notification. The gate and
Phase 2 happen later, in chat, only after the owner reviews and approves.

---

## 9. Fallbacks & edge cases

- **Connector error / rate limit (exit 2).** The analyzer exits 2 (e.g. stderr `RATE_LIMITED`)
  rather than looping. Offer an alternative: try another connector, or build the brief from a CSV
  export / the chunks already pulled. If proceeding on partial data, say so in the brief.
- **Thin data (< ~90 days).** Deliver anyway with the directional caveat (§2); offer a monthly
  refresh so the brief sharpens as data accrues.
- **Uncategorized revenue (Stripe).** If a big share of charges have no product label, flag it and
  tell the owner to add descriptions/metadata in Stripe for sharper future briefs.
- **Design tool errors or disconnected.** Deliver copy + calendar and tell the owner to paste it
  in. Never fabricate a design link.
- **Owner asks you to publish.** You don't. Hand over the finished posts and let them publish on
  their own schedule.
- **Owner wants to skip to creation.** Run a fast Phase 1 first (a brief grounded in real numbers
  is the whole point); don't fabricate a brief to shortcut.
