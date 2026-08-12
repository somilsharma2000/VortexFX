import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import CountUp from "@/components/landing/CountUp";
import { Trophy, DollarSign, Users, BadgeCheck } from "lucide-react";

export default function SocialProofBar() {
  const [stats, setStats] = useState({ completed: 0, prizePool: 0, traders: 0, verified: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [tn, tx, tr] = await Promise.all([
          base44.entities.Tournament.list("-created_date", 200),
          base44.entities.Transaction.list("-transaction_date", 500),
          base44.entities.Trader.list("-rex_balance", 500)
        ]);
        const completed = tn.filter((t) => t.status === "completed").length;
        const prizePool = tx
          .filter((x) => (x.reason || "").includes("prize"))
          .reduce((s, x) => s + Math.abs(x.amount || 0), 0);
        setStats({ completed, prizePool, traders: tr.length, verified: tr.filter((t) => t.verified).length });
      } catch {}
    })();
  }, []);

  const items = [
    { icon: Trophy, label: "Championships Completed", value: stats.completed, color: "#D4AF37" },
    { icon: DollarSign, label: "Prize Pool Distributed", value: stats.prizePool, prefix: "$", color: "#00C853" },
    { icon: Users, label: "Active Traders", value: stats.traders, color: "#D4AF37" },
    { icon: BadgeCheck, label: "Verified Accounts", value: stats.verified, color: "#00C853" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 fade-in-delay-1">
      {items.map((it) => (
        <div key={it.label} className="card text-center" style={{ padding: "20px 12px" }}>
          <it.icon className="w-5 h-5 mx-auto mb-2" style={{ color: it.color }} />
          <div className="text-2xl md:text-3xl font-bold" style={{ color: it.color }}>
            <CountUp end={it.value} prefix={it.prefix || ""} />
          </div>
          <div className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}