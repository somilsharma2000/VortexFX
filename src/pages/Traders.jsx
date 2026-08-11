import { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TraderCard from "@/components/TraderCard";

export default function Traders() {
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const t = await base44.entities.Trader.list("-rex_balance", 100);
        setTraders(t);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return traders;
    const q = query.toLowerCase();
    return traders.filter((tr) =>
      (tr.discord_username || "").toLowerCase().includes(q) ||
      (tr.referral_code || "").toLowerCase().includes(q)
    );
  }, [traders, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader label="Community" title="Trader Profiles" subtitle="Meet the FORTREX traders. Search by username or referral code." />

      <div className="relative max-w-md mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7494]" />
        <input
          className="input-field pl-11"
          placeholder="Search traders…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-[#A0A8C0]">Loading traders…</div>
      ) : filtered.length === 0 ? (
        <div className="card text-center text-[#A0A8C0] py-16">No traders found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tr, i) => (
            <div key={tr.id} className={`fade-in-delay-${(i % 4) + 1}`}>
              <TraderCard trader={tr} rank={i + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}