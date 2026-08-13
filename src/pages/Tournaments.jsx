import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import TournamentCard from "@/components/TournamentCard";

const FEATURES = ["SEALED STANDINGS", "MT4/MT5 VERIFIED", "VARIABLE PRIZE POOL"];

export default function Tournaments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke("getTournaments", {});
        setItems((res.data && res.data.tournaments) || []);
      } catch {
        // empty
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#D4AF37" }}>THE ARENA</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Tournaments</h1>
        <p className="max-w-xl mx-auto" style={{ color: "#A0A0A0" }}>
          Skill-based trading competitions. Verified accounts. Sealed standings. Variable prize pools funded by platform revenue.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-3xl mx-auto">
        {FEATURES.map((f) => (
          <div
            key={f}
            className="text-center py-3 rounded-lg text-xs font-bold tracking-[0.1em]"
            style={{ border: "1px solid rgba(212,175,55,0.15)", color: "#D4AF37", backgroundColor: "rgba(212,175,55,0.04)" }}
          >
            {f}
          </div>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" size={28} style={{ color: "#D4AF37" }} />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#A0A0A0" }}>No tournaments announced yet. Check back soon.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}