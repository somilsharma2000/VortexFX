import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";
import { ArrowDownLeft, ArrowUpRight, Calendar } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const typeStyles = {
  tournament_prize: { label: "Tournament Prize", positive: true },
  referral_reward: { label: "Referral Reward", positive: true },
  checkin_reward: { label: "Check-in Reward", positive: true },
  checkin_milestone: { label: "Milestone Bonus", positive: true },
  rebate: { label: "Rebate", positive: true },
  admin_adjustment: { label: "Adjustment", positive: null },
  deduction: { label: "Deduction", positive: false },
};

export default function Transactions() {
  const { trader, loading } = useCurrentTrader();
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    if (!trader) return;
    (async () => {
      const t = await base44.entities.Transaction.filter({ trader_id: trader.id }, "-transaction_date", 100);
      setTxns(t);
    })();
  }, [trader]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Loading…</div>;
  if (!trader) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="card">
          <h1 className="text-2xl font-bold text-white mb-3">No trader profile yet</h1>
          <p className="text-[#9ca3af]">Connect your Discord to create your Koda trader profile and view transactions.</p>
        </div>
      </div>
    );
  }

  const totalIn = txns
    .filter((t) => (typeStyles[t.type]?.positive ?? true) && (t.amount || 0) > 0)
    .reduce((s, t) => s + (t.amount || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader label="Wallet" title="Transactions" subtitle="Your REX reward and deduction history." />

      <div className="card mb-10 text-center fade-in">
        <div className="section-label mb-3">Total Earned</div>
        <div className="text-5xl font-bold text-white">{totalIn.toLocaleString()} <span className="text-[#7c3aed] text-xl">REX</span></div>
      </div>

      <div className="space-y-3">
        {txns.length === 0 ? (
          <div className="card text-center text-[#9ca3af] py-12">No transactions yet.</div>
        ) : (
          txns.map((t) => {
            const meta = typeStyles[t.type] || { label: t.type || "Transaction", positive: null };
            const positive = meta.positive === null ? (t.amount || 0) >= 0 : meta.positive;
            return (
              <div key={t.id} className="card flex items-center gap-4" style={{ padding: "16px 20px" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: positive ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)" }}>
                  {positive ? <ArrowDownLeft className="w-5 h-5 text-[#22c55e]" /> : <ArrowUpRight className="w-5 h-5 text-[#ef4444]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{meta.label}</div>
                  <div className="text-xs text-[#9ca3af] inline-flex items-center gap-1.5 flex-wrap">
                    <Calendar className="w-3 h-3" /> {t.transaction_date ? new Date(t.transaction_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    {t.reference_id && ` · Ref ${t.reference_id}`}
                  </div>
                  {t.description && <div className="text-xs text-[#9ca3af] mt-1">{t.description}</div>}
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm" style={{ color: positive ? "#22c55e" : "#ef4444" }}>
                    {positive ? "+" : "-"}{Math.abs(t.amount || 0)} REX
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}