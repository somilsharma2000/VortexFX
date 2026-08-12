import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Lock, ArrowRight } from "lucide-react";

export default function GenesisBanner() {
  const [remaining, setRemaining] = useState(2500);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const s = await base44.entities.PlatformSetting.filter({ key: "genesis_spots_remaining" });
        if (s.length && s[0].value) setRemaining(parseInt(s[0].value, 10) || 0);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const target = new Date("2026-08-31T23:59:59").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setTimeLeft("Ended");
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const claimed = Math.max(0, 2500 - remaining);
  const pct = Math.min(100, Math.round((claimed / 2500) * 100));

  return (
    <div className="rounded-2xl mb-8 overflow-hidden fade-in" style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)", boxShadow: "0 0 40px rgba(212,175,55,0.25)" }}>
      <div className="px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(10,14,39,0.2)" }}>
            <Lock className="w-5 h-5" style={{ color: "#0A0E27" }} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(10,14,39,0.7)" }}>🔒 Genesis Trader Program</div>
            <div className="text-base md:text-lg font-bold leading-snug" style={{ color: "#0A0E27" }}>
              First 2,500 traders get permanent 1.25x REX multiplier + 1,000 bonus REX
            </div>
            <div className="text-sm font-medium mt-1" style={{ color: "rgba(10,14,39,0.8)" }}>
              2,500 spots → <span className="font-bold">{remaining.toLocaleString()} remaining</span>
            </div>
            <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(10,14,39,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: "#0A0E27" }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch md:items-end gap-3 shrink-0">
          <div className="text-center md:text-right">
            <div className="text-xs uppercase font-semibold" style={{ color: "rgba(10,14,39,0.7)" }}>Closes in</div>
            <div className="text-lg font-bold font-mono" style={{ color: "#0A0E27" }}>{timeLeft}</div>
          </div>
          <Link to="/waitlist" className="inline-flex items-center justify-center gap-2 font-bold rounded-xl px-5 py-3 transition-all hover:scale-[1.03]" style={{ backgroundColor: "#0A0E27", color: "#D4AF37" }}>
            Claim Your Genesis Spot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}