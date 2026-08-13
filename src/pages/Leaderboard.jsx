import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Lock, Loader2 } from "lucide-react";

export default function Leaderboard() {
  const [tournaments, setTournaments] = useState([]);
  const [sel, setSel] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke("getTournaments", {});
        const ts = (res.data && res.data.tournaments) || [];
        setTournaments(ts);
        if (ts.length) setSel(ts[0].id);
      } catch {
        // empty
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!sel) return;
    setFetching(true);
    (async () => {
      try {
        const res = await base44.functions.invoke("getLeaderboard", { tournamentId: sel });
        setEntries((res.data && res.data.entries) || []);
      } catch {
        setEntries([]);
      }
      setFetching(false);
    })();
  }, [sel]);

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#D4AF37" }}>RANKINGS</p>
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Leaderboard</h1>
      </div>

      <div
        className="flex items-center gap-3 rounded-xl px-5 py-4 mb-6"
        style={{ border: "1px solid rgba(212,175,55,0.25)", backgroundColor: "rgba(212,175,55,0.06)" }}
      >
        <Lock size={20} style={{ color: "#D4AF37" }} />
        <p className="text-sm font-semibold" style={{ color: "#D4AF37" }}>STANDINGS SEALED UNTIL REVEAL</p>
      </div>

      <div className="mb-6">
        <select
          value={sel}
          onChange={(e) => setSel(e.target.value)}
          disabled={loading}
          className="px-4 py-2.5 rounded-lg text-sm outline-none"
          style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(212,175,55,0.2)", color: "#fff" }}
        >
          {loading ? (
            <option>Loading…</option>
          ) : tournaments.length === 0 ? (
            <option>No tournaments</option>
          ) : (
            tournaments.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))
          )}
        </select>
      </div>

      {fetching ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin" size={26} style={{ color: "#D4AF37" }} />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 rounded-xl" style={{ border: "1px solid rgba(212,175,55,0.12)", backgroundColor: "#0A0A0A" }}>
          <p className="text-lg font-semibold mb-1" style={{ color: "#D4AF37" }}>No standings yet</p>
          <p className="text-sm" style={{ color: "#A0A0A0" }}>Tournament begins August 23.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(212,175,55,0.12)", backgroundColor: "#0A0A0A" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.12)", color: "#A0A0A0" }}>
                <th className="text-left py-3 px-4 font-semibold">Rank</th>
                <th className="text-left py-3 px-4 font-semibold">Trader</th>
                <th className="text-right py-3 px-4 font-semibold">ROI %</th>
                <th className="text-right py-3 px-4 font-semibold">Final Equity</th>
                <th className="text-right py-3 px-4 font-semibold">Trades</th>
                <th className="text-right py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const sealed = !e.revealed;
                return (
                  <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td className="py-3 px-4 font-bold" style={{ color: sealed ? "#666" : "#fff" }}>{sealed ? "🔒" : `#${e.rank || "-"}`}</td>
                    <td className="py-3 px-4" style={{ color: sealed ? "#666" : "#fff" }}>{sealed ? "SEALED" : e.trader_name}</td>
                    <td className="py-3 px-4 text-right font-bold" style={{ color: sealed ? "#666" : "#00C853" }}>{sealed ? "—" : `+${Number(e.roi || 0).toFixed(2)}%`}</td>
                    <td className="py-3 px-4 text-right" style={{ color: sealed ? "#666" : "#fff" }}>{sealed ? "—" : `$${Number(e.final_equity || 0).toLocaleString()}`}</td>
                    <td className="py-3 px-4 text-right" style={{ color: sealed ? "#666" : "#A0A0A0" }}>{sealed ? "—" : (e.trades || 0)}</td>
                    <td className="py-3 px-4 text-right">
                      {sealed ? (
                        <span style={{ color: "#D4AF37", fontSize: 12 }}>🔒 SEALED</span>
                      ) : (
                        <span style={{ color: "#00C853", fontSize: 12 }}>REVEALED</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}