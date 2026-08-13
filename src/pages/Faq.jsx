import { useState } from "react";
import { Search } from "lucide-react";

const FAQS = [
  { cat: "Tournament Rules", q: "How are winners determined?", a: "Winners are ranked by verified ROI over the tournament period. Standings remain sealed until the official reveal date to keep competition fair and exciting." },
  { cat: "Tournament Rules", q: "Why are standings sealed?", a: "Sealing standings until reveal prevents copy-trading and keeps the competition skill-based. Everyone sees results at the same moment." },
  { cat: "Verification", q: "How do I verify my account?", a: "Connect your MT4 or MT5 trading account through the platform. Only verified accounts appear on leaderboards and qualify for prizes." },
  { cat: "Verification", q: "Why only MT4/MT5?", a: "MT4 and MT5 provide standardized, auditable trade history that we can verify for fair competition." },
  { cat: "Prize Pools", q: "How big is the prize pool?", a: "Prize pools are variable — funded by platform revenue. We never advertise fixed amounts. The pool grows with the community." },
  { cat: "Prize Pools", q: "How are prizes distributed?", a: "Prizes are distributed as REX points to ranked traders after the reveal, based on final standings." },
  { cat: "Registration", q: "When do the gates open?", a: "The full arena unlocks at 10,000 registered traders. Reserve your spot on the landing page to count toward the goal." },
  { cat: "Registration", q: "Is registration free?", a: "Yes. Creating an account and joining the waitlist is completely free." },
  { cat: "REX Economy", q: "What is REX?", a: "REX are closed-loop loyalty points used for arena rankings and prize distributions. They are not a currency and cannot be withdrawn as cash." },
  { cat: "REX Economy", q: "How do I earn REX?", a: "Earn REX by competing in tournaments, daily check-ins, referrals, and community milestones." },
];

const CATS = ["All", "Tournament Rules", "Verification", "Prize Pools", "Registration", "REX Economy"];

function FaqItem({ f }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.12)", backgroundColor: "#0A0A0A" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left px-5 py-4">
        <span className="text-sm font-semibold pr-4" style={{ color: "#fff" }}>{f.q}</span>
        <span style={{ color: "#D4AF37", fontSize: 20, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm" style={{ color: "#A0A0A0" }}>{f.a}</div>}
    </div>
  );
}

export default function Faq() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = FAQS.filter(
    (f) =>
      (cat === "All" || f.cat === cat) &&
      (f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#D4AF37" }}>SUPPORT</p>
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>FAQ</h1>
      </div>
      <div className="relative mb-5">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#A0A0A0" }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search questions…"
          className="w-full pl-11 pr-4 py-3 rounded-full text-sm outline-none"
          style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(212,175,55,0.2)", color: "#fff" }}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={cat === c ? { backgroundColor: "#D4AF37", color: "#0A0E27" } : { border: "1px solid rgba(212,175,55,0.2)", color: "#A0A0A0" }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center py-10" style={{ color: "#A0A0A0" }}>No questions match your search.</p>
        ) : (
          filtered.map((f, i) => <FaqItem key={i} f={f} />)
        )}
      </div>
    </div>
  );
}