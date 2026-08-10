import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Flame, Zap, Calendar, BadgeCheck, Link2, Gift, Trophy, CheckCircle2 } from "lucide-react";

export default function TraderProfile() {
  const { id } = useParams();
  const [trader, setTrader] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [tr, txns, checkins] = await Promise.all([
          base44.entities.Trader.get(id),
          base44.entities.Transaction.filter({ trader_id: id }, "-transaction_date", 50),
          base44.entities.CheckIn.filter({ trader_id: id }, "-checkin_date", 50),
        ]);
        const merged = [
          ...txns.map((x) => ({ type: "transaction", date: x.transaction_date, ...x })),
          ...checkins.map((x) => ({ type: "checkin", date: x.checkin_date, ...x })),
        ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setTrader(tr);
        setActivity(merged);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Loading profile…</div>;
  if (!trader) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Trader not found.</div>;

  const tr = trader;
  const username = tr.discord_username || tr.referral_code || "Trader";

  const stats = [
    { label: "REX Balance", value: (tr.rex_balance || 0).toLocaleString(), icon: Zap, color: "#7c3aed" },
    { label: "Current Streak", value: tr.checkin_streak || 0, icon: Flame, color: "#7c3aed" },
    { label: "Best Streak", value: tr.best_streak || 0, icon: Trophy, color: "#3b82f6" },
    { label: "Total Check-ins", value: tr.total_checkins || 0, icon: CheckCircle2, color: "#22c55e" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/traders" className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to traders
      </Link>

      {/* Profile card */}
      <div className="card mb-10 fade-in">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
            {username[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{username}</h1>
              {tr.verified && <BadgeCheck className="w-5 h-5 text-[#3b82f6]" />}
              {tr.banned && <span className="badge" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#ef4444" }}>Banned</span>}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {tr.joined_date ? new Date(tr.joined_date).toLocaleDateString() : "—"}</span>
              <span className="inline-flex items-center gap-1.5"><Link2 className="w-4 h-4" /> MT4 {tr.mt4_linked ? "Linked" : "Not linked"}</span>
              {tr.referral_code && <span className="badge badge-muted">Ref: {tr.referral_code}</span>}
            </div>
          </div>
          <div className="text-right">
            <div className="section-label mb-1">Role</div>
            <div className="text-lg font-bold text-white capitalize">{tr.role || "trader"}</div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="flex items-center gap-2 section-label mb-3">
              <s.icon className="w-4 h-4" style={{ color: s.color }} /> {s.label}
            </div>
            <div className="text-3xl font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Activity history */}
      <div className="mb-4">
        <div className="section-label mb-3">History</div>
        <h2 className="text-2xl font-bold text-white">Activity Timeline</h2>
      </div>
      <div className="space-y-3">
        {activity.length === 0 ? (
          <div className="card text-center text-[#9ca3af] py-12">No activity yet.</div>
        ) : (
          activity.map((a) => {
            const isCheckin = a.type === "checkin";
            const positive = !isCheckin && a.type !== "deduction";
            return (
              <div key={a.id} className="card flex items-center gap-4" style={{ padding: "16px 20px" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: isCheckin ? "rgba(124,58,237,0.15)" : positive ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)" }}>
                  {isCheckin ? <Flame className="w-5 h-5 text-[#7c3aed]" /> : positive ? <Gift className="w-5 h-5 text-[#22c55e]" /> : <Zap className="w-5 h-5 text-[#ef4444]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">
                    {isCheckin ? `Daily check-in — streak ${a.new_streak}` : a.description || a.type?.replace(/_/g, " ")}
                  </div>
                  <div className="text-xs text-[#9ca3af]">
                    {a.date ? new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    {isCheckin && a.milestone_reached && a.milestone_reached !== "none" && ` · Milestone ${a.milestone_reached} days`}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm" style={{ color: isCheckin || positive ? "#22c55e" : "#ef4444" }}>
                    {isCheckin ? `+${a.rex_earned || 0}` : `${positive ? "+" : "-"}${Math.abs(a.amount || 0)}`} REX
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