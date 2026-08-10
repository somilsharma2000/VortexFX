import { Link } from "react-router-dom";
import { Flame, BadgeCheck, ArrowRight } from "lucide-react";

function initials(name) {
  if (!name) return "T";
  const parts = name.split(/[\s_]+/).filter(Boolean);
  return (parts[0]?.[0] || "T").toUpperCase();
}

export default function TraderCard({ trader, rank }) {
  const tr = trader || {};
  const username = tr.discord_username || tr.referral_code || "Trader";

  return (
    <Link to={`/traders/${tr.id}`} className="block">
      <div className="card card-hover h-full flex flex-col">
        {rank != null && (
          <div className="flex items-center justify-between mb-4">
            <span className="badge badge-purple">RANK #{rank}</span>
            {tr.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-[#3b82f6] font-semibold">
                <BadgeCheck className="w-4 h-4" /> Verified
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
          >
            {initials(username)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-white truncate">{username}</h3>
              {tr.verified && <BadgeCheck className="w-4 h-4 text-[#3b82f6] shrink-0" />}
            </div>
            <p className="text-xs text-[#9ca3af] truncate">{tr.referral_code ? `Ref: ${tr.referral_code}` : "Koda Trader"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-[#202028]">
          <div>
            <div className="section-label mb-1">REX Balance</div>
            <div className="text-lg font-bold text-white">{(tr.rex_balance || 0).toLocaleString()}</div>
          </div>
          <div>
            <div className="section-label mb-1">Streak</div>
            <div className="text-lg font-bold text-white inline-flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#7c3aed]" /> {tr.checkin_streak || 0}
            </div>
          </div>
          <div>
            <div className="section-label mb-1">Check-ins</div>
            <div className="text-lg font-bold text-white">{tr.total_checkins || 0}</div>
          </div>
          <div>
            <div className="section-label mb-1">Role</div>
            <div className="text-lg font-bold text-white capitalize">{tr.role || "trader"}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`badge ${tr.mt4_linked ? "badge-green" : "badge-muted"}`}>
            {tr.mt4_linked ? "MT4 Linked" : "MT4 Not Linked"}
          </span>
        </div>

        <div className="mt-auto inline-flex items-center gap-1.5 text-[#7c3aed] font-semibold text-sm group">
          View Profile
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}