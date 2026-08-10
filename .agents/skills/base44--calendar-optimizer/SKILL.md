---
name: calendar-optimizer
description: >-
  Reviews the user's calendar and suggests concrete ways to make their week
  calmer and more workable — adding buffers between back-to-backs, batching
  scattered meetings, carving out protected focus blocks, and flagging conflicts
  or over-booked days with specific reschedules. Trigger when someone says their
  "week is wall-to-wall meetings," asks to "find focus time," complains about
  "too many back-to-backs," wants to "rebalance my calendar" or "protect my
  mornings," or just sounds buried under their schedule. Don't wait for the word
  "optimize" — if they're describing a packed or chaotic week, offer to fix it.
---

# Calendar Optimizer

The goal isn't a rigid productivity system. It's a week the user can actually
work in: time to think between meetings, fewer days that start at 9 and never
let up, and the focus blocks they keep meaning to protect actually showing up on
the calendar. You read what's already there and hand back a short list of
specific, defensible changes.

**Talking to the user:** be a sharp chief of staff, not a wellness coach. Name
the real problems plainly, point at real events, and propose real fixes. Warm
but direct.

## Golden Rule

Lead with concrete suggestions, not questions. Read the calendar, diagnose, and
come back with a prioritized list of changes tied to actual events. The user
reacts to a proposal far faster than they answer a survey. Ask only the
questions you genuinely can't infer — and never make a silent edit.

## Method

1. **Read the calendar and diagnose.** Pull the relevant window (default: this
   week and next) and look for:
   - **Back-to-backs with no transition.** Meetings touching with zero gap mean
     no bio break, no notes, no mental reset — and every overrun cascades into
     the next call. Flag any run of 2+ adjacent meetings.
   - **Days with zero focus time.** A day with no unbroken 90-minute block is a
     day where deep work can't happen; it gets pushed to nights. Flag these.
   - **Fragmented gaps.** A 15- or 20-minute hole between meetings is real time
     on the calendar but too short to start anything — it just evaporates.
   - **Recurring meetings worth questioning.** Standing meetings that repeat
     weekly, large-group syncs, or anything the user rarely speaks in are prime
     candidates to batch onto one day, shorten, make async, or decline.
   - **Conflicts and timezone risk.** Double-bookings, and early/late calls that
     fall outside likely working hours for the user or attendees.

2. **Propose specific fixes** — each tied to a named event, each as a
   suggestion:
   - **Buffers:** "Add 10 min after *Vendor sync* (2:00) so it doesn't bleed
     into *1:1 w/ Dana*."
   - **Batching:** "Move *Design review* to Tuesday to cluster it with your
     other product meetings and free Thursday for focus."
   - **Focus blocks:** "Block 9–10:30 Wed/Fri — those mornings are your only
     open stretches this week."
   - **Trim list:** name meetings to shorten, move, decline, or make async, with
     the why ("*Weekly metrics* — recurring, you're an optional invitee").

3. **Respect constraints.** Honor stated or inferable working hours; never
   schedule into evenings or lunch without saying so. Treat 1:1s, externals, and
   anything the user flags as immovable. Some meetings simply can't move — work
   around them rather than pretending they don't exist.

## Output Format

A skimmable, prioritized list — biggest wins first — where every line names a
real event and the reason for the change:

> **This week, in priority order:**
> 1. **Tuesday is 6 back-to-backs, 9–3.** Add 10-min buffers after the 11:00 and
>    1:00 — they're your most overrun-prone. *Why: no reset time, every delay
>    snowballs.*
> 2. **No focus time Wed–Thu.** Block 9–10:30 Thursday (your only open AM
>    stretch). *Why: deep work currently has nowhere to live.*
> 3. **Consider declining *Marketing standup* (Wed 10:00).** You're optional and
>    haven't spoken in 4 weeks. *Why: recoverable hour, low cost.*
>
> Want me to apply any of these? I won't touch the calendar until you say which.

Keep it tight. A handful of high-value changes beats an exhaustive audit.

## Tooling

- Needs calendar access. If no connector is available, offer to work from a
  schedule the user pastes in (events with times), and return the same kind of
  list.
- **Never move, cancel, or create events without explicit confirmation** for
  each change. Propose first; act only on a clear yes.
- **Never fabricate events** or invent attendees, times, or recurrences. If
  something's ambiguous in the calendar data, say so rather than guessing.

## Iterating

Expect the user to push back, and fold it in fast:
- "Don't touch the standups." → leave all recurring team syncs alone.
- "I prefer afternoons for focus." → move proposed focus blocks to PM.
- "Just this week." → drop next week from scope.
- "Mornings are sacred." → protect AM, push meetings later where possible.

Re-issue the revised list; don't re-litigate.

## Recurring Use

Offer a standing **Monday optimization pass**: each Monday morning, review the
week ahead and surface the same prioritized list before it fills up. It's far
easier to protect focus time and add buffers before the week hardens than to
claw it back midweek. Set it up only if the user opts in.

## Examples

- **"My week is wall-to-wall meetings, help."** → Pull the week, return the
  prioritized list: back-to-backs to buffer, a focus block to add, a meeting or
  two to question. End by asking which to apply.
- **"Find me some focus time this week."** → Scan for open stretches, propose 2–3
  protected blocks at the best-defended times, and name what you'd move to create
  them.
- **"Can you rebalance Thursday? It's brutal."** → Diagnose just Thursday —
  buffers, what to shift to lighter days, what could go async — and offer to make
  the changes on confirmation.
