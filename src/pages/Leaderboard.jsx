import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Crown, Flame, BadgeCheck, Search } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export default function Leaderboard() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const t = await base44.entities.Trader.list("-rex_balance", 100);
        setTraders(t);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = query.trim()
    ? traders.filter((tr) => (tr.discord_username || "").toLowerCase().includes(query.toLowerCase()))
    : traders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader label="Rankings" title="Platform Leaderboard" subtitle="The top Koda traders ranked by total REX earned across all tournaments and rewards." />

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
        <input className="input-field pl-11" placeholder="Search traders…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <div className="grid grid-cols-12 px-6 py-4 border-b border-[#202028] table-header">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6 md:col-span-5">Trader</div>
          <div className="col-span-2 text-right hidden md:block">Check-ins</div>
          <div className="col-span-3 md:col-span-2 text-right">Streak</div>
          <div className="col-span-2 text-right">REX Balance</div>
        </div>
        {loading ? (
          <div className="px-6 py-8 text-[#9ca3af]">Loading leaderboard…</div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-8 text-[#9ca3af]">No traders found.</div>
        ) : (
          filtered.map((tr, i) => (
            <Link key={tr.id} to={`/traders/${tr.id}`} className="data-row grid grid-cols-12 items-center px-6 py-4 border-b border-[#202028] last:border-0">
              <div className="col-span-1 flex items-center">
                {i < 3 ? (
                  <Crown className="w-5 h-5" style={{ color: i === 0 ? "#7c3aed" : i === 1 ? "#8b5cf6" : "#3b82f6" }} />
                ) : (
                  <span className="text-[#9ca3af] font-semibold">{i + 1}</span>
                )}
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                  {(tr.discord_username || "T")[0].toUpperCase()}
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-white font-semibold truncate">{tr.discord_username || "Trader"}</span>
                  {tr.verified && <BadgeCheck className="w-4 h-4 text-[#3b82f6] shrink-0" />}
                </div>
              </div>
              <div className="col-span-2 text-right text-[#9ca3af] hidden md:block">{tr.total_checkins || 0}</div>
              <div className="col-span-3 md:col-span-2 text-right">
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