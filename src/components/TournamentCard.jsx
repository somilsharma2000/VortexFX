import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, ShieldCheck, Bell } from "lucide-react";
import { toast } from "sonner";

const DISCORD = "https://discord.gg/z2qVgJgCg4";

const STATUS_STYLE = {
  registration_open: { label: "REGISTRATION OPEN", color: "#00C853" },
  upcoming: { label: "UPCOMING", color: "#D4AF37" },
  active: { label: "LIVE NOW", color: "#00C853" },
  revealing: { label: "REVEALING", color: "#D4AF37" },
  revealed: { label: "REVEALED", color: "#00C853" },
  completed: { label: "COMPLETED", color: "#A0A0A0" },
  cancelled: { label: "CANCELLED", color: "#ff5a5a" },
};

function fmtDate(d) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return d;
  }
}

export default function TournamentCard({ t }) {
  const status = STATUS_STYLE[t.status] || { label: (t.status || "INFO").toUpperCase(), color: "#A0A0A0" };
  const registered = t.participant_count || 0;
  const max = t.maxParticipants || 0;
  const format = t.type ? t.type.charAt(0).toUpperCase() + t.type.slice(1) : "Monthly";
  const isReg = t.status === "registration_open";
  const isUpcoming = t.status === "upcoming";

  return (
    <div
      className="rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold pr-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{t.name || "Tournament"}</h3>
        <span
          className="text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ color: status.color, border: `1px solid ${status.color}55`, backgroundColor: `${status.color}11` }}
        >
          {status.label}
        </span>
      </div>
      <p className="text-sm mb-5" style={{ color: "#A0A0A0" }}>{t.description || ""}</p>
      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
        <div className="flex items-center gap-2" style={{ color: "#A0A0A0" }}>
          <Calendar size={15} style={{ color: "#D4AF37" }} /> {fmtDate(t.start_date)}
        </div>
        <div className="flex items-center gap-2" style={{ color: "#A0A0A0" }}>
          <Trophy size={15} style={{ color: "#D4AF37" }} /> {format}
        </div>
        <div className="flex items-center gap-2" style={{ color: "#A0A0A0" }}>
          <Users size={15} style={{ color: "#D4AF37" }} /> {registered}{max ? ` / ${max}` : ""} registered
        </div>
        <div className="flex items-center gap-2" style={{ color: "#A0A0A0" }}>
          <ShieldCheck size={15} style={{ color: "#D4AF37" }} /> {t.entry_requirement || "Open to verified traders"}
        </div>
      </div>
      <div
        className="rounded-lg px-3 py-2 mb-5 text-xs"
        style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
      >
        Variable Pool — funded by platform revenue
      </div>
      {isReg ? (
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="mt-auto py-3 rounded-full text-sm font-bold text-center transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: "#D4AF37", color: "#0A0E27", boxShadow: "0 0 16px rgba(212,175,55,0.3)" }}
        >
          REGISTER
        </a>
      ) : isUpcoming ? (
        <button
          onClick={() => toast.info("We'll notify you when registration opens.")}
          className="mt-auto py-3 rounded-full text-sm font-bold text-center transition-all hover:-translate-y-0.5"
          style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}
        >
          <span className="inline-flex items-center gap-2 justify-center"><Bell size={15} /> NOTIFY ME</span>
        </button>
      ) : (
        <Link
          to="/leaderboard"
          className="mt-auto py-3 rounded-full text-sm font-bold text-center transition-all hover:-translate-y-0.5"
          style={{ border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}
        >
          VIEW STANDINGS
        </Link>
      )}
    </div>
  );
}