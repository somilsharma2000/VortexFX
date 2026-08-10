import { Link } from "react-router-dom";
import { Users, Calendar, ArrowRight } from "lucide-react";

const statusStyles = {
  upcoming: { className: "badge badge-muted", text: "Upcoming" },
  live: { className: "badge badge-green", text: "Live" },
  revealing: { className: "badge badge-purple", text: "Revealing" },
  completed: { className: "badge badge-muted", text: "Completed" },
  cancelled: { className: "badge badge-muted", text: "Cancelled" },
};

const marketBadge = {
  forex: "Forex",
  crypto: "Crypto",
  both: "Forex + Crypto",
};

export default function TournamentCard({ tournament }) {
  const t = tournament || {};
  const status = statusStyles[t.status] || statusStyles.upcoming;
  const prize = (t.prize_pool_rex ?? 0).toLocaleString();

  return (
    <Link to={`/tournaments/${t.id}`} className="block">
      <div className="card card-hover h-full flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <span className="badge">{marketBadge[t.markets] || "Tournament"}</span>
          <span className={status.className}>{status.text}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{t.name || "Untitled Tournament"}</h3>
        <p className="text-sm text-[#9ca3af] line-clamp-2 mb-6 flex-1">
          {t.description || "No description provided."}
        </p>

        <div className="flex items-end justify-between mb-5 pb-5 border-b border-[#202028]">
          <div>
            <div className="section-label mb-1.5">Prize Pool</div>
            <div className="text-2xl font-bold text-white">
              {prize} <span className="text-[#7c3aed] text-base font-semibold">REX</span>
            </div>
          </div>
          <div className="text-right">
            <div className="section-label mb-1.5">Min Deposit</div>
            <div className="text-lg font-semibold text-white">${t.entry_criteria_min_deposit || 0}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-[#9ca3af] mb-5">
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4" /> {t.participant_count || 0} traders
          </span>
          {t.start_date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {new Date(t.start_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 text-[#7c3aed] font-semibold text-sm group">
          View Details
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}