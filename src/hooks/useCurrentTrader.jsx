import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// Fetches the logged-in user and their linked Trader profile.
// Testing default: if the logged-in user has no Trader yet, falls back to the
// seeded admin_001 trader so all features are visible immediately.
export function useCurrentTrader() {
  const [user, setUser] = useState(null);
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      let me = null;
      try {
        me = await base44.auth.me();
      } catch {
        me = null;
      }

      const useAdminFallback = async () => {
        const admins = await base44.entities.Trader.filter({ discord_id: "admin_001" });
        if (admins.length) {
          setTrader(admins[0]);
          setUser({ id: admins[0].id, name: admins[0].discord_username, role: admins[0].role, full_name: admins[0].discord_username });
        }
      };

      if (me) {
        setUser(me);
        const traders = await base44.entities.Trader.filter({ discord_id: me.id });
        if (traders.length) {
          setTrader(traders[0]);
        } else {
          await useAdminFallback();
        }
      } else {
        await useAdminFallback();
      }
    } catch {
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