import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import TournamentCard from "@/components/TournamentCard";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";
import { Plus } from "lucide-react";

const filters = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

export default function Tournaments() {
  const { user } = useCurrentTrader();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    (async () => {
      try {
        const tn = await base44.entities.Tournament.list("-created_date", 100);
        setTournaments(tn);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const list = filter === "all" ? tournaments : tournaments.filter((t) => t.status === filter);
    return [...list].sort((a, b) => {
      const order = { active: 0, upcoming: 1, revealing: 2, completed: 3, cancelled: 4 };
      return (order[a.status] ?? 9) - (order[b.status] ?? 9);
    });
  }, [tournaments, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="section-label mb-3">Compete</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">All Championships</h2>
          <p className="text-[#A0A8C0] mt-2 max-w-2xl">Browse every active and upcoming competition. Filter by status to find your next arena.</p>
        </div>
        {isAdmin && (
          <Link to="/admin" className="btn-primary shrink-0">
            <Plus className="w-4 h-4" /> Create Tournament
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`nav-pill ${filter === f.key ? "nav-pill-active" : ""}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-[#A0A8C0]">Loading tournaments…</div>
      ) : filtered.length === 0 ? (
        <div className="card text-center text-[#A0A8C0] py-16">No tournaments match this filter.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <div key={t.id} className={`fade-in-delay-${(i % 4) + 1}`}>
              <TournamentCard tournament={t} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}