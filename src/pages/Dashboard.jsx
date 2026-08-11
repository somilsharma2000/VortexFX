import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Flame, ArrowRight, Crown, BadgeCheck, Users, Trophy, Zap, Gift, TrendingUp, ShieldCheck, MessageCircle } from "lucide-react";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";
import StatusDot from "@/components/StatusDot";

export default function Dashboard() {
  const { trader } = useCurrentTrader();
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
        ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 6);
        setActivity(merged);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentContest = tournaments.find((t) => t.status === "live") || tournaments.find((t) => t.status === "upcoming");
  const topTraders = traders.slice(0, 5);
  const totalPrize = tournaments.filter((t) => t.status === "live" || t.status === "upcoming").reduce((s, t) => s + (t.prize_pool_rex || 0), 0);
  const username = trader?.discord_username || "Trader";

  const countdown = (() => {
    if (!currentContest?.end_date) return null;
    const diff = new Date(currentContest.end_date).getTime() - Date.now();
    if (diff <= 0) return "Ended";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    return `${d}d ${h}h left`;
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mb-10 fade-in" style={{ backgroundImage: "linear-gradient(135deg, #0A0E27 0%, #111634 50%, #1A2050 100%)", border: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="absolute inset-0 bg-grid-faint opacity-60" />
        <div className="relative px-6 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <StatusDot color="#00C853" label="Live championships running" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Trade. Compete. <span className="text-gradient">Win.</span>
          </h1>
          <p className="text-[#A0A8C0] text-lg mt-5 max-w-2xl mx-auto">
            Join the FORTREX Trading Community. Free education, monthly trading championships, and real cash prizes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button className="btn-primary"><MessageCircle className="w-4 h-4" /> Join Free Discord</button>
            <Link to="/tournaments" className="btn-secondary">View Championships <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-10 text-sm text-[#A0A8C0]">
            <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4 text-[#D4AF37]" /> 500+ Traders</span>
            <span className="hidden md:inline text-[#6B7494]">|</span>
            <span className="inline-flex items-center gap-1.5"><Trophy className="w-4 h-4 text-[#D4AF37]" /> ${totalPrize.toLocaleString()}+ in Prizes</span>
            <span className="hidden md:inline text-[#6B7494]">|</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00C853]" /> XM Partner</span>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="section-label mb-2">Dashboard</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome back, {username}</h2>
        </div>
        <Link to="/check-in" className="btn-primary"><Flame className="w-4 h-4" /> Daily Check-in</Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Zap className="w-4 h-4 text-[#D4AF37]" /> REX Balance</div>
          <div className="text-3xl font-bold text-[#D4AF37]">{(trader?.rex_balance || 0).toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Flame className="w-4 h-4 text-[#D4AF37]" /> Current Streak</div>
          <div className="text-3xl font-bold text-white">{trader?.checkin_streak || 0}<span className="text-base text-[#A0A8C0] ml-1">days</span></div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Trophy className="w-4 h-4 text-[#D4AF37]" /> Contest Rank</div>
          <div className="text-3xl font-bold text-white">—</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><TrendingUp className="w-4 h-4 text-[#00C853]" /> Total Earnings</div>
          <div className="text-3xl font-bold text-[#00C853]">{(trader?.rex_balance || 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Active contest + referral share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 card card-hover">
          <div className="flex items-center justify-between mb-5">
            <div className="section-title-accent">Current Contest</div>
            {currentContest && <span className={`badge ${currentContest.status === "live" ? "badge-green" : "badge-muted"}`}>{currentContest.status}</span>}
          </div>
          {loading ? (
            <div className="text-[#A0A8C0]">Loading…</div>
          ) : !currentContest ? (
            <div className="text-[#A0A8C0]">No active contest right now. Check back soon.</div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-2">{currentContest.name}</h3>
              <div className="text-4xl font-bold text-[#D4AF37] mb-1">{(currentContest.prize_pool_rex || 0).toLocaleString()} <span className="text-lg text-[#D4AF37]">REX</span></div>
              <div className="text-sm text-[#A0A8C0] mb-5">{countdown} · {currentContest.participant_count || 0} traders entered</div>
              <Link to={`/tournaments/${currentContest.id}`} className="btn-primary">Enter Now <ArrowRight className="w-4 h-4 btn-arrow" /></Link>
            </>
          )}
        </div>
        <div className="card card-hover">
          <div className="section-title-accent mb-5">Quick Share</div>
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-white font-semibold">Your Referral Code</span>
          </div>
          <div className="card-container px-4 py-3 mb-4 text-center">
            <span className="text-lg font-mono font-bold text-[#D4AF37]">{trader?.referral_code || "—"}</span>
          </div>
          <Link to="/referrals" className="btn-secondary w-full">Share & Earn REX</Link>
        </div>
      </div>

      {/* Mini leaderboard */}
      <div className="mb-4">
        <div className="section-label mb-2">Top Performers</div>
        <h2 className="text-xl font-bold text-white">Leaderboard Preview</h2>
      </div>
      <div className="card mb-10 overflow-hidden" style={{ padding: 0 }}>
        {topTraders.length === 0 ? (
          <div className="px-6 py-8 text-[#A0A8C0]">No traders yet.</div>
        ) : (
          topTraders.map((tr, i) => (
            <Link key={tr.id} to={`/traders/${tr.id}`} className="data-row grid grid-cols-12 items-center px-6 py-4 border-b last:border-0" style={{ borderColor: "rgba(212,175,55,0.12)" }}>
              <div className="col-span-1 flex items-center">
                {i < 3 ? <Crown className="w-5 h-5" style={{ color: i === 0 ? "#D4AF37" : i === 1 ? "#C0C0C0" : "#CD7F32" }} /> : <span className="text-[#A0A8C0] font-semibold">{i + 1}</span>}
              </div>
              <div className="col-span-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-[#0A0E27]" style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #00C853)" }}>
                  {(tr.discord_username || "T")[0].toUpperCase()}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold">{tr.discord_username || "Trader"}</span>
                  {tr.verified && <BadgeCheck className="w-4 h-4 text-[#00C853]" />}
                </div>
              </div>
              <div className="col-span-3 text-right text-[#D4AF37] font-bold">{(tr.rex_balance || 0).toLocaleString()} REX</div>
            </Link>
          ))
        )}
        <div className="px-6 py-3 text-right">
          <Link to="/leaderboard" className="text-[#D4AF37] hover:text-[#E5C04D] font-semibold text-sm inline-flex items-center gap-1.5">View Full Leaderboard <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mb-4">
        <div className="section-label mb-2">Live</div>
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
      </div>
      <div className="card" style={{ padding: 0 }}>
        {activity.length === 0 ? (
          <div className="px-6 py-8 text-[#A0A8C0]">No recent activity.</div>
        ) : (
          activity.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b last:border-0" style={{ borderColor: "rgba(212,175,55,0.12)" }}>
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.kind === "checkin" ? "#D4AF37" : "#00C853", boxShadow: "0 0 8px rgba(212,175,55,0.5)" }} />
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm capitalize truncate">{a.title}</div>
                <div className="text-xs text-[#A0A8C0]">{a.date ? new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—"}</div>
              </div>
              {a.value != null && (
                <div className="font-bold text-sm shrink-0" style={{ color: (a.value || 0) >= 0 ? "#00C853" : "#FF3B3B" }}>
                  {(a.value || 0) >= 0 ? "+" : "-"}{Math.abs(a.value || 0)} REX
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}