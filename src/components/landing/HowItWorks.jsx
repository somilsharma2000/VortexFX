import { Link2, TrendingUp, Trophy } from "lucide-react";

const steps = [
  { icon: Link2, title: "Sign Up & Link MT4", desc: "Create your free account, connect your MT4/MT5 account, get verified." },
  { icon: TrendingUp, title: "Trade & Compete", desc: "Join monthly championships, trade on your own MT4, climb the leaderboard with verified ROI." },
  { icon: Trophy, title: "Win & Earn", desc: "Top traders win from the prize pool. Everyone earns REX through daily check-ins, referrals, and participation." }
];

export default function HowItWorks() {
  return (
    <div className="mb-12 fade-in-delay-2">
      <div className="text-center mb-8">
        <div className="section-label mb-2">Simple Process</div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">How It Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s, i) => (
          <div key={s.title} className="card card-hover text-center relative">
            <div className="absolute top-4 right-5 text-3xl font-bold" style={{ color: "rgba(212,175,55,0.2)" }}>{i + 1}</div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}>
              <s.icon className="w-7 h-7" style={{ color: "#D4AF37" }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}