import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Users, Calendar, DollarSign, Crown, Flame, BadgeCheck } from "lucide-react";

export default function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [t, top] = await Promise.all([
          base44.entities.Tournament.get(id),
          base44.entities.Trader.list("-rex_balance", 10),
        ]);
        setTournament(t);
        setLeaders(top);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Loading tournament…</div>;
  if (!tournament) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Tournament not found.</div>;

  const t = tournament;
  const fmt = (d) => (d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/tournaments" className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to tournaments
      </Link>

      {/* Hero card */}
      <div className="card mb-10 fade-in" style={{ backgroundImage: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))" }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="badge">{t.markets === "both" ? "Forex + Crypto" : t.markets ? t.markets[0].toUpperCase() + t.markets.slice(1) : "Tournament"}</span>
              <span className={`badge ${t.status === "live" ? "badge-green" : t.status === "upcoming" ? "badge-muted" : "badge-purple"}`}>{t.status}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.name}</h1>
            <p className="text-[#9ca3af] max-w-2xl">{t.description || "No description provided."}</p>
          </div>
          <div className="text-right">
            <div className="section-label mb-2">Prize Pool</div>
            <div className="text-4xl font-bold text-white">{(t.prize_pool_rex || 0).toLocaleString()} <span className="text-[#7c3aed] text-lg">REX</span></div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Users className="w-4 h-4" /> Participants</div>
          <div className="text-3xl font-bold text-white">{t.participant_count || 0}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><DollarSign className="w-4 h-4" /> Min Deposit</div>
          <div className="text-3xl font-bold text-white">${t.entry_criteria_min_deposit || 0}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Calendar className="w-4 h-4" /> Starts</div>
          <div className="text-lg font-bold text-white">{fmt(t.start_date)}</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-label mb-3"><Calendar className="w-4 h-4" /> Ends</div>
          <div className="text-lg font-bold text-white">{fmt(t.end_date)}</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mb-4">
        <div className="section-label mb-3">Standings</div>
        <h2 className="text-2xl font-bold text-white">Tournament Leaderboard</h2>
      </div>
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <div className="grid grid-cols-12 px-6 py-4 border-b border-[#202028] table-header">
          <div className="col-span-1">Rank</div>
          <div className="col-span-7">Trader</div>
          <div className="col-span-2 text-right">Streak</div>
          <div className="col-span-2 text-right">REX</div>
        </div>
        {leaders.length === 0 ? (
          <div className="px-6 py-8 text-[#9ca3af]">No participants yet.</div>
        ) : (
          leaders.map((tr, i) => (
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
    </div>
  );
}