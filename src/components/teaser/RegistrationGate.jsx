import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const GOAL = 10000;

export default function RegistrationGate() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await base44.functions.invoke("teaserEntry", { action: "stats" });
        setCount((r.data && r.data.count) || 0);
      } catch {}
    };
    load();
    const iv = setInterval(load, 30000);
    return () => clearInterval(iv);
  }, []);

  const pct = Math.min(100, (count / GOAL) * 100);

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
        THE GATES OPEN AT 10,000
      </h2>
      <p className="mt-3 text-sm sm:text-base max-w-md mx-auto" style={{ color: "#666666" }}>
        10,000 traders. That's the key. When the counter hits 10,000, the arena unlocks.
      </p>

      <div className="mt-8 text-left">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase mb-2" style={{ color: "#D4AF37" }}>
          Traders Registered
        </div>
        <div
          className="h-3 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: "#D4AF37", boxShadow: "0 0 12px rgba(212,175,55,0.6)" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-white font-bold tabular-nums">{count.toLocaleString()} / 10,000</span>
          <span style={{ color: "#666666" }}>{pct.toFixed(1)}%</span>
        </div>
      </div>

      <p className="mt-4 text-sm" style={{ color: "#666666" }}>
        Every registration brings us closer. Every invite accelerates the unlock.
      </p>
    </div>
  );
}