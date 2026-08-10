#!/usr/bin/env python3
"""
content_calendar.py — turn an approved brief into a dated posting calendar.

Usage:
    python content_calendar.py <approved_brief.json> --per-week N --start YYYY-MM-DD [--days 30]

The brief JSON should contain the items to schedule. Flexible shape — it reads:
    {
      "push_items": ["Team Plan", "Pro Plan", ...],   # get the most slots
      "hold_items": [...],                              # optional, get a single slot or none
      "offer": "annual discount on Team",               # optional, scheduled as its own slot(s)
      "platforms": ["LinkedIn", "X"]                     # optional, rotated across slots
    }

Output: JSON with a flat, dated slots[] list on stdout. Each slot:
    {"date","weekday","item","kind","platform","slot_index"}

Slots are spread evenly across the window at the requested cadence, and push items are
weighted to appear more often than the offer/hold items — because the calendar should
reflect the strategy, not give every item equal airtime. The model maps each slot to the
copy + asset it already wrote; this script only handles dates and allocation.
"""
import sys, json, argparse, datetime as dt


def weighted_sequence(push, offer, hold, n):
    """Build an ordered item list of length n: push items dominate, offer sprinkled in,
    hold items get at most a token presence. Round-robin within each tier so no single
    push item hogs the calendar."""
    seq = []
    # target mix: ~70% push, ~20% offer, ~10% hold (only if those exist)
    n_offer = round(n * 0.2) if offer else 0
    n_hold = min(len(hold), round(n * 0.1)) if hold else 0
    n_push = n - n_offer - n_hold
    if push:
        for i in range(n_push):
            seq.append(("push", push[i % len(push)]))
    else:
        n_offer += n_push  # nothing to push; give slots to the offer/announcements
    for i in range(n_offer):
        seq.append(("offer", offer if isinstance(offer, str) else "Offer"))
    for i in range(n_hold):
        seq.append(("hold", hold[i % len(hold)]))
    # interleave so push/offer/hold aren't clumped at the ends
    seq.sort(key=lambda x: {"push": 0, "offer": 1, "hold": 2}[x[0]])
    out, tiers = [], {"push": [], "offer": [], "hold": []}
    for kind, item in seq:
        tiers[kind].append((kind, item))
    # weave: take from push twice as often as offer/hold
    while any(tiers.values()):
        for kind, every in (("push", 1), ("offer", 1), ("hold", 1)):
            if tiers[kind]:
                out.append(tiers[kind].pop(0))
    return out[:n]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("brief")
    ap.add_argument("--per-week", type=int, default=3)
    ap.add_argument("--start", required=True)
    ap.add_argument("--days", type=int, default=30)
    a = ap.parse_args()

    try:
        brief = json.load(open(a.brief))
    except Exception as e:
        sys.stderr.write(f"Could not read brief JSON: {e}\n")
        sys.exit(2)

    push = brief.get("push_items") or brief.get("push") or []
    hold = brief.get("hold_items") or brief.get("hold") or []
    offer = brief.get("offer")
    platforms = brief.get("platforms") or []

    start = dt.date.fromisoformat(a.start)
    total = max(1, round(a.days / 7 * a.per_week))

    # spread dates evenly across the window
    step = a.days / total
    dates = [start + dt.timedelta(days=round(i * step)) for i in range(total)]

    items = weighted_sequence(push, offer, hold, total)
    slots = []
    for i, (d, (kind, item)) in enumerate(zip(dates, items)):
        slots.append({
            "slot_index": i + 1,
            "date": d.isoformat(),
            "weekday": d.strftime("%a"),
            "item": item,
            "kind": kind,
            "platform": platforms[i % len(platforms)] if platforms else None,
        })

    json.dump({
        "start": a.start, "days": a.days, "per_week": a.per_week,
        "total_slots": len(slots),
        "platforms": platforms,
        "slots": slots,
    }, sys.stdout, indent=2)
    print()


if __name__ == "__main__":
    main()
