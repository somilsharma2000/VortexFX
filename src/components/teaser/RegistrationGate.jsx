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
    <>
      <section style={{ marginBottom: 40, textAlign: "center" }}>
        <h2 className="text-[24px] md:text-[36px] font-bold" style={{ color: "#D4AF37", letterSpacing: "1px" }}>
          THE GATES OPEN AT 10,000
        </h2>
        <p className="text-[14px] md:text-[16px] mx-auto mt-3" style={{ color: "#666666", maxWidth: 500 }}>
          10,000 traders. That's the key. When the counter hits 10,000, the arena unlocks.
        </p>
      </section>

      <section style={{ maxWidth: 500, margin: "0 auto 60px" }}>
        <div className="text-xs" style={{ color: "#D4AF37", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 8 }}>
          Traders Registered
        </div>
        <div style={{ width: "100%", height: 8, background: "#1A1A1A", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#D4AF37", borderRadius: 4, transition: "width 0.7s ease" }} />
        </div>
        <div className="text-sm text-center mt-3 text-white">{count.toLocaleString()} / 10,000</div>
        <div className="text-xs text-center mt-2" style={{ color: "#666666" }}>
          Every registration brings us closer. Every invite accelerates the unlock.
        </div>
      </section>
    </>
  );
}