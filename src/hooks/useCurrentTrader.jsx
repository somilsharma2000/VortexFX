import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// Fetches the logged-in user and their linked Trader profile.
export function useCurrentTrader() {
  const [user, setUser] = useState(null);
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const me = await base44.auth.me();
      setUser(me);
      const traders = await base44.entities.Trader.filter({ created_by_id: me.id });
      setTrader(traders[0] || null);
    } catch (e) {
      setUser(null);
      setTrader(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { user, trader, loading, setTrader, refresh };
}