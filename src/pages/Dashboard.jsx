import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Flame, ArrowRight, Crown, BadgeCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import StatCounter from "@/components/StatCounter";
import TournamentCard from "@/components/TournamentCard";
import StatusDot from "@/components/StatusDot";

export default function Dashboard() {
  const [traders, setTraders] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [t, tn, ck, tx] = await Promise.all([
          base44.entities.Trader.list("-rex_balance", 100),
          base44.entities.Tournament.list("-created_date", 100),
          base44.entities.CheckIn.list("-checkin_date", 10),
          base44.entities.Transaction.list("-transaction_date", 10),
        ]);
        setTraders(t);
        setTournaments(tn);
        const merged = [
          ...ck.map((c) => ({ kind: "checkin", date: c.checkin_date, title: `${c.trader_username || "Trader"} checked in`, value: c.rex_earned })),
          ...tx.map((x) => ({ kind: "transaction", date: x.transaction_date, title: x.description || (x.type || "transaction").replace(/_/g, " "), value: x.amount })),
        ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 8);
        setActivity(merged);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const activeTournaments = tournaments.filter((x) => x.status === "live" || x.status === "upcoming");
  const featured = [...tournaments].sort((a, b) => {
    const order = { live: 0, upcoming: 1, revealing: 2, completed: 3, cancelled: 4 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  }).slice(0, 3);
  const totalPrize = activeTournaments.reduce((s, x) => s + (x.prize_pool_rex || 0), 0);
  const totalRex = traders.reduce((s, x) => s + (x.rex_balance || 0), 0);
  const topTraders = traders.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center py-20 md:py-28">
        <div className="fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: "#14141c", border: "1px solid #202028" }}>
          <StatusDot label="Live tournaments running" />
        </div>
        <h1 className="fade-in-delay-1 text-4xl md:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Trade. Compete. <span className="text-gradient">Dominate.</span>
        </h1>
        <p className="fade-in-delay-2 text-[#9ca3af] text-lg mt-6 max-w-2xl mx-auto">
          The competitive trading tournament platform. Climb the leaderboard, earn REX rewards, and prove your edge across forex and crypto markets.
        </p>
        <div className="fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to="/tournaments" className="btn-primary">
            Explore Tournaments
            <ArrowRight className="w-4 h-4 btn-arrow" />
          </Link>
          <Link to="/leaderboard" className="btn-secondary">
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-y border-[#202028]">
        <StatCounter value={loading ? "—" : traders.length} label="Active Traders" />
        <StatCounter value={loading ? "—" : activeTournaments.length} label="Live Tournaments" />
        <StatCounter value={loading ? "—" : totalPrize.toLocaleString()} label="REX Prize Pool" />
        <StatCounter value={loading ? "—" : totalRex.toLocaleString()} label="REX Distributed" />
      </section>

      {/* Featured tournaments */}
      <section className="py-16">
        <SectionHeader label="Featured" title="Active Tournaments" viewAllTo="/tournaments" />
        {loading ? (
          <div className="text-[#9ca3af]">Loading tournaments…</div>
        ) : featured.length === 0 ? (
          <div className="card text-center text-[#9ca3af] py-12">No tournaments yet. Check back soon.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <div key={t.id} className={`fade-in-delay-${(i % 4) + 1}`}>
                <TournamentCard tournament={t} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top traders */}
      <section className="py-16">
        <SectionHeader label="Top Performers" title="Leaderboard Preview" viewAllTo="/leaderboard" />
        <div className="card overflow-hidden" style={{ padding: 0 }}>
          <div className="grid grid-cols-12 px-6 py-4 border-b border-[#202028] table-header">
            <div className="col-span-1">#</div>
            <div className="col-span-7">Trader</div>
            <div className="col-span-2 text-right">Streak</div>
            <div className="col-span-2 text-right">REX Balance</div>
          </div>
          {loading ? (
            <div className="px-6 py-8 text-[#9ca3af]">Loading…</div>
          ) : topTraders.length === 0 ? (
            <div className="px-6 py-8 text-[#9ca3af]">No traders yet.</div>
          ) : (
            topTraders.map((tr, i) => (
              <Link key={tr.id} to={`/traders/${tr.id}`} className="data-row grid grid-cols-12 items-center px-6 py-4 border-b border-[#202028] last:border-0">
                <div className="col-span-1 flex items-center">
                  {i === 0 ? <Crown className="w-5 h-5 text-[#7c3aed]" /> : <span className="text-[#9ca3af] font-semibold">{i + 1}</span>}
                </div>
                <div className="col-span-7 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                    {(tr.discord_username || "T")[0].toUpperCase()}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold">{tr.discord_username || "Trader"}</span>
                    {tr.verified && <BadgeCheck className="w-4 h-4 text-[#3b82f6]" />}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 text-white font-medium"><Flame className="w-4 h-4 text-[#7c3aed]" />{tr.checkin_streak || 0}</span>
                </div>
                <div className="col-span-2 text-right text-white font-bold">{(tr.rex_balance || 0).toLocaleString()}</div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Recent activity */}
      <section className="pb-16">
        <SectionHeader label="Live" title="Recent Activity" subtitle="The latest check-ins, rewards, and tournament activity across Koda." />
        {activity.length === 0 ? (
          <div className="card text-center text-[#9ca3af] py-12">No recent activity.</div>
        ) : (
          <div className="card" style={{ padding: 0 }}>
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-[#202028] last:border-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.kind === "checkin" ? "#7c3aed" : "#3b82f6", boxShadow: "0 0 8px rgba(124,58,237,0.5)" }} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm capitalize truncate">{a.title}</div>
                  <div className="text-xs text-[#9ca3af]">{a.date ? new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—"}</div>
                </div>
                {a.value != null && (
                  <div className="font-bold text-sm shrink-0" style={{ color: (a.value || 0) >= 0 ? "#22c55e" : "#ef4444" }}>
                    {(a.value || 0) >= 0 ? "+" : "-"}{Math.abs(a.value || 0)} REX
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}