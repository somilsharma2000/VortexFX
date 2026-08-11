import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";
import { Gift, Users, Copy, Check, Award } from "lucide-react";

export default function Referrals() {
  const { trader, loading } = useCurrentTrader();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!trader) return;
    (async () => {
      const r = await base44.entities.Referral.filter({ referrer_id: trader.id }, "-referral_date", 100);
      setReferrals(r);
    })();
  }, [trader]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#A0A8C0]">Loading…</div>;
  if (!trader) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="card">
          <h1 className="text-2xl font-bold text-white mb-3">No trader profile yet</h1>
          <p className="text-[#A0A8C0]">Connect your Discord to create your FORTREX trader profile and start referring.</p>
        </div>
      </div>
    );
  }

  const code = trader.referral_code || "—";
  const link = `${window.location.origin}/?ref=${code}`;
  const qualified = referrals.filter((r) => r.status === "qualified" || r.status === "rewarded");
  const totalReward = referrals.reduce((s, r) => s + (r.reward_amount_rex || 0), 0);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="section-label mb-3">Earn Rewards</div>
      <h1 className="text-3xl font-bold text-white mb-10">Referrals</h1>

      <div className="card mb-8 fade-in text-center" style={{ backgroundImage: "linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,200,83,0.04))" }}>
        <div className="inline-flex items-center gap-2 section-label mb-4 justify-center"><Gift className="w-4 h-4 text-[#D4AF37]" /> Your Referral Code</div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider">{code}</div>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="input-field flex-1 flex items-center" style={{ padding: "12px 16px" }}>
            <span className="text-sm text-[#A0A8C0] truncate">{link}</span>
          </div>
          <button onClick={() => copy(link)} className="btn-primary shrink-0">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="card text-center">
          <div className="inline-flex items-center gap-2 section-label mb-3 justify-center"><Users className="w-4 h-4" /> Total</div>
          <div className="text-3xl font-bold text-white">{referrals.length}</div>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center gap-2 section-label mb-3 justify-center"><Check className="w-4 h-4" /> Qualified</div>
          <div className="text-3xl font-bold text-white">{qualified.length}</div>
        </div>
        <div className="card text-center">
          <div className="inline-flex items-center gap-2 section-label mb-3 justify-center"><Award className="w-4 h-4" /> REX Earned</div>
          <div className="text-3xl font-bold text-white">{totalReward.toLocaleString()}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="section-label mb-3">History</div>
        <h2 className="text-2xl font-bold text-white">Referred Traders</h2>
      </div>
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <div className="grid grid-cols-12 px-6 py-4 border-b border-[#D4AF37]/15 table-header">
          <div className="col-span-5">Trader</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2 text-right">Status</div>
          <div className="col-span-2 text-right">Reward</div>
        </div>
        {referrals.length === 0 ? (
          <div className="px-6 py-8 text-[#A0A8C0]">No referrals yet. Share your code to earn REX.</div>
        ) : (
          referrals.map((r) => (
            <div key={r.id} className="data-row grid grid-cols-12 items-center px-6 py-4 border-b border-[#D4AF37]/15 last:border-0">
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #00C853)" }}>
                  {(r.referred_username || "T")[0].toUpperCase()}
                </div>
                <span className="text-white font-semibold">{r.referred_username || "Trader"}</span>
              </div>
              <div className="col-span-3 text-sm text-[#A0A8C0]">{r.referral_date ? new Date(r.referral_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}</div>
              <div className="col-span-2 text-right">
                <span className={`badge ${r.status === "rewarded" ? "badge-green" : r.status === "qualified" ? "badge-purple" : "badge-muted"}`}>{r.status}</span>
              </div>
              <div className="col-span-2 text-right text-white font-bold">+{r.reward_amount_rex || 0}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}