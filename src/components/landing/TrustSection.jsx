import { BarChart3, KeyRound, Receipt, ShieldCheck } from "lucide-react";

const cards = [
  { icon: BarChart3, title: "TWRR Verification", desc: "Time-Weighted Rate of Return prevents manipulation. Every ranking is earned, not bought." },
  { icon: KeyRound, title: "MT4 Investor Password", desc: "We verify through read-only investor passwords. Your funds stay in your control." },
  { icon: Receipt, title: "Public Payout Proofs", desc: "Every prize payout is documented with transaction hashes and winner profiles." },
  { icon: ShieldCheck, title: "Anti-Cheat System", desc: "Multi-account detection, IP verification, and trade pattern analysis keep competitions fair." }
];

export default function TrustSection() {
  return (
    <div className="mb-12 fade-in-delay-3">
      <div className="text-center mb-8">
        <div className="section-label mb-2">Built on Trust</div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Why FORTREX is Different</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.title} className="card card-hover">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0,200,83,0.12)", border: "1px solid rgba(0,200,83,0.25)" }}>
              <c.icon className="w-5 h-5" style={{ color: "#00C853" }} />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}