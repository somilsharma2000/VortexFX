import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Flame, Zap, Link2, MessageCircle, Calendar, Award } from "lucide-react";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";

export default function CheckIn() {
  const { trader, loading, refresh } = useCurrentTrader();
  const { toast } = useToast();
  const [history, setHistory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [mt4Account, setMt4Account] = useState("");
  const [linkingMt4, setLinkingMt4] = useState(false);

  const loadHistory = async (traderId) => {
    if (!traderId) return;
    const h = await base44.entities.CheckIn.filter({ trader_id: traderId }, "-checkin_date", 30);
    setHistory(h);
  };

  useEffect(() => {
    if (trader) {
      setMt4Account(trader.mt4_account || "");
      loadHistory(trader.id);
    }
  }, [trader]);

  const handleCheckIn = async () => {
    setSubmitting(true);
    try {
      const res = await base44.functions.invoke("dailyCheckin", {});
      const data = res.data || {};
      toast({
        title: "Check-in complete!",
        description: `+${data.rex_earned ?? 1} REX · Streak ${data.new_streak ?? (trader?.checkin_streak || 0) + 1}`,
      });
      await refresh();
      await loadHistory(trader.id);
    } catch (e) {
      toast({ title: "Check-in failed", description: e?.response?.data?.error || e.message || "Try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLinkMt4 = async () => {
    if (!mt4Account.trim()) return;
    setLinkingMt4(true);
    try {
      await base44.functions.invoke("linkMT4", { mt4_account: mt4Account.trim() });
      toast({ title: "MT4 linked", description: "Your MT4 account is now connected." });
      await refresh();
    } catch (e) {
      toast({ title: "Linking failed", description: e?.response?.data?.error || e.message || "Try again later.", variant: "destructive" });
    } finally {
      setLinkingMt4(false);
    }
  };

  const handleDiscord = async () => {
    try {
      const res = await base44.functions.invoke("discordAuth", {});
      const data = res.data || {};
      if (data.url) window.location.href = data.url;
      else toast({ title: "Discord", description: data.message || "Discord connection requested." });
    } catch (e) {
      toast({ title: "Discord connect failed", description: e?.response?.data?.error || e.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Loading…</div>;

  if (!trader) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="card">
          <h1 className="text-2xl font-bold text-white mb-3">No trader profile yet</h1>
          <p className="text-[#9ca3af] mb-6">Connect your Discord to create your Koda trader profile and start earning REX.</p>
          <button onClick={handleDiscord} className="btn-primary">
            <MessageCircle className="w-4 h-4" /> Connect Discord
          </button>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const alreadyCheckedIn = trader.last_checkin_date === today;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="section-label mb-3">Daily Hub</div>
      <h1 className="text-3xl font-bold text-white mb-10">Check-in & Rewards</h1>

      {/* Streak hero */}
      <div className="card mb-8 text-center fade-in" style={{ backgroundImage: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.04))" }}>
        <div className="inline-flex items-center gap-2 section-label mb-4 justify-center"><Flame className="w-4 h-4 text-[#7c3aed]" /> Current Streak</div>
        <div className="text-7xl font-bold text-white mb-2">{trader.checkin_streak || 0}<span className="text-2xl text-[#9ca3af] ml-2">days</span></div>
        <p className="text-[#9ca3af] mb-6">Best streak: {trader.best_streak || 0} days · Total check-ins: {trader.total_checkins || 0}</p>
        <button onClick={handleCheckIn} disabled={submitting || alreadyCheckedIn} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {alreadyCheckedIn ? "Checked in today ✓" : submitting ? "Processing…" : "Check in now"}
          {!alreadyCheckedIn && !submitting && <Zap className="w-4 h-4 btn-arrow" />}
        </button>
        <div className="grid grid-cols-4 gap-3 mt-8 max-w-md mx-auto">
          {["7", "14", "30", "90"].map((m) => {
            const reached = ["7", "14", "30", "90"].includes(String(trader.best_streak)) && Number(trader.best_streak) >= Number(m);
            return (
              <div key={m} className="card-container px-3 py-3 text-center" style={{ opacity: reached ? 1 : 0.5 }}>
                <div className="text-lg font-bold text-white">{m}d</div>
                <div className="text-[0.65rem] uppercase text-[#9ca3af] tracking-wider">Bonus</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-2 section-title-accent mb-4"><Link2 className="w-4 h-4" /> MT4 Account</div>
          <p className="text-sm text-[#9ca3af] mb-4">Link your MT4 trading account to verify trades.</p>
          <input className="input-field mb-4" placeholder="MT4 account number" value={mt4Account} onChange={(e) => setMt4Account(e.target.value)} />
          <button onClick={handleLinkMt4} disabled={linkingMt4 || !mt4Account.trim()} className="btn-blue w-full disabled:opacity-50">
            {linkingMt4 ? "Linking…" : trader.mt4_linked ? "Update MT4" : "Link MT4"}
          </button>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 section-title-accent mb-4"><MessageCircle className="w-4 h-4" /> Discord</div>
          <p className="text-sm text-[#9ca3af] mb-4">Connect Discord to join the community hub and verify identity.</p>
          <div className="mb-4 text-sm">
            {trader.discord_username ? (
              <span className="inline-flex items-center gap-2 text-white"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22c55e" }} /> Connected as {trader.discord_username}</span>
            ) : (
              <span className="text-[#9ca3af]">Not connected</span>
            )}
          </div>
          <button onClick={handleDiscord} className="btn-secondary w-full">
            {trader.discord_username ? "Reconnect Discord" : "Connect Discord"}
          </button>
        </div>
      </div>

      {/* Streak history */}
      <div className="mb-4">
        <div className="section-label mb-3">History</div>
        <h2 className="text-2xl font-bold text-white">Streak History</h2>
      </div>
      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="card text-center text-[#9ca3af] py-12">No check-ins yet. Start your streak today!</div>
        ) : (
          history.map((c) => (
            <div key={c.id} className="card flex items-center gap-4" style={{ padding: "16px 20px" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(124,58,237,0.15)" }}>
                <Flame className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Day {c.new_streak} streak</div>
                <div className="text-xs text-[#9ca3af] inline-flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {c.checkin_date ? new Date(c.checkin_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  {c.milestone_reached && c.milestone_reached !== "none" && (
                    <span className="badge badge-purple ml-1"><Award className="w-3 h-3" /> {c.milestone_reached}d milestone</span>
                  )}
                </div>
              </div>
              <div className="font-bold text-sm text-[#22c55e]">+{c.rex_earned || 0} REX</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}