import { Link } from "react-router-dom";
import { Users, Calendar, ArrowRight, Sword } from "lucide-react";

const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

const statusStyles = {
  upcoming: { className: "badge badge-muted", text: "Upcoming" },
  active: { className: "badge badge-green", text: "Active" },
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
    <div className="card card-hover h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="badge">{marketBadge[t.markets] || t.markets || "Tournament"}</span>
        <span className={status.className}>{status.text}</span>
      </div>

      <Link to={`/tournaments/${t.id}`}>
        <h3 className="text-xl font-bold text-white mb-2 transition-colors hover:text-[#D4AF37]">{t.name || "Untitled Tournament"}</h3>
      </Link>
      <p className="text-sm text-[#A0A8C0] line-clamp-2 mb-6 flex-1">
        {t.description || "No description provided."}
      </p>

      <div className="flex items-end justify-between mb-5 pb-5 border-b border-[#D4AF37]/15">
        <div>
          <div className="section-label mb-1.5">Prize Pool</div>
          <div className="text-2xl font-bold text-white">
            {prize} <span className="text-[#D4AF37] text-base font-semibold">REX</span>
          </div>
        </div>
        <div className="text-right">
          <div className="section-label mb-1.5">Min Deposit</div>
          <div className="text-lg font-semibold text-white">${t.entry_criteria_min_deposit || 0}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-[#A0A8C0] mb-4">
        <span className="inline-flex items-center gap-1.5">
          <Users className="w-4 h-4" /> {t.participant_count || 0} traders
        </span>
        {t.start_date && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> {new Date(t.start_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        )}
      </div>

      {(() => {
        const now = Date.now();
        const start = t.start_date ? new Date(t.start_date).getTime() : null;
        const end = t.end_date ? new Date(t.end_date).getTime() : null;
        if (!start || !end) return null;
        let pct = 0;
        if (t.status === "upcoming") pct = 0;
        else if (t.status === "completed" || t.status === "cancelled") pct = 100;
        else pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
        return (
          <div className="mb-5">
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(212,175,55,0.15)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundImage: "linear-gradient(90deg, #D4AF37, #00C853)" }} />
            </div>
            <div className="text-[0.65rem] uppercase tracking-wider text-[#6B7494] mt-1.5">
              {t.status === "upcoming" ? "Starts soon" : t.status === "completed" ? "Finished" : `${Math.round(pct)}% elapsed`}
            </div>
          </div>
        );
      })()}

      <div className="flex items-center justify-between gap-3 mt-auto pt-1">
        <Link to={`/tournaments/${t.id}`} className="inline-flex items-center gap-1.5 text-[#D4AF37] font-semibold text-sm hover:text-[#E5C04D] transition-colors">
          View Details <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm" style={{ padding: "8px 16px" }}>
          <Sword className="w-4 h-4" /> Register
        </a>
      </div>
    </div>
  );
}