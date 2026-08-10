import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";
import { Plus, Settings, Trophy, Save } from "lucide-react";

const statusOptions = ["upcoming", "live", "revealing", "completed", "cancelled"];

export default function Admin() {
  const { user, loading } = useCurrentTrader();
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState([]);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    markets: "both",
    prize_pool_rex: 0,
    entry_criteria_min_deposit: 0,
    start_date: "",
    end_date: "",
    reveal_date: "",
  });
  const [settings, setSettings] = useState({ platform_name: "Koda Trading", default_min_deposit: 100, discord_invite: "" });

  const loadTournaments = async () => {
    const tn = await base44.entities.Tournament.list("-created_date", 100);
    setTournaments(tn);
  };

  useEffect(() => {
    if (user?.role === "admin") loadTournaments();
  }, [user]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-[#9ca3af]">Loading…</div>;
  if (user?.role !== "admin") {
    return <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="card">
        <h1 className="text-2xl font-bold text-white mb-2">Admin access required</h1>
        <p className="text-[#9ca3af]">You need an admin role to view this page.</p>
      </div>
    </div>;
  }

  const updateForm = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCreating(true);
    try {
      await base44.entities.Tournament.create({
        ...form,
        prize_pool_rex: Number(form.prize_pool_rex) || 0,
        entry_criteria_min_deposit: Number(form.entry_criteria_min_deposit) || 0,
        status: "upcoming",
        is_active: true,
        participant_count: 0,
      });
      toast({ title: "Tournament created", description: `${form.name} is now scheduled.` });
      setForm({ name: "", description: "", markets: "both", prize_pool_rex: 0, entry_criteria_min_deposit: 0, start_date: "", end_date: "", reveal_date: "" });
      await loadTournaments();
    } catch (err) {
      toast({ title: "Creation failed", description: err.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const updateTournament = async (id, patch) => {
    try {
      await base44.entities.Tournament.update(id, patch);
      toast({ title: "Tournament updated" });
      await loadTournaments();
    } catch (err) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await base44.functions.invoke("adminUpdateSettings", settings);
      toast({ title: "Settings saved" });
    } catch (err) {
      toast({ title: "Save failed", description: err?.response?.data?.error || err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="section-label mb-3">Control Center</div>
      <h1 className="text-3xl font-bold text-white mb-10">Admin Panel</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create tournament */}
        <div className="card">
          <div className="flex items-center gap-2 section-title-accent mb-6"><Plus className="w-4 h-4" /> Create Tournament</div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="section-label block mb-2">Name</label>
              <input className="input-field" value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="August Forex Cup" required />
            </div>
            <div>
              <label className="section-label block mb-2">Description</label>
              <textarea className="input-field min-h-[80px]" value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Tournament description…" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-2">Markets</label>
                <select className="input-field" value={form.markets} onChange={(e) => updateForm("markets", e.target.value)}>
                  <option value="both">Forex + Crypto</option>
                  <option value="forex">Forex</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
              <div>
                <label className="section-label block mb-2">Prize Pool (REX)</label>
                <input type="number" className="input-field" value={form.prize_pool_rex} onChange={(e) => updateForm("prize_pool_rex", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-2">Min Deposit ($)</label>
                <input type="number" className="input-field" value={form.entry_criteria_min_deposit} onChange={(e) => updateForm("entry_criteria_min_deposit", e.target.value)} />
              </div>
              <div>
                <label className="section-label block mb-2">Start Date</label>
                <input type="date" className="input-field" value={form.start_date} onChange={(e) => updateForm("start_date", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-2">End Date</label>
                <input type="date" className="input-field" value={form.end_date} onChange={(e) => updateForm("end_date", e.target.value)} />
              </div>
              <div>
                <label className="section-label block mb-2">Reveal Date</label>
                <input type="date" className="input-field" value={form.reveal_date} onChange={(e) => updateForm("reveal_date", e.target.value)} />
              </div>
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full disabled:opacity-50">
              <Trophy className="w-4 h-4" /> {creating ? "Creating…" : "Create Tournament"}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          {/* Tournament control */}
          <div className="card">
            <div className="flex items-center gap-2 section-title-accent mb-6"><Settings className="w-4 h-4" /> Tournament Control</div>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {tournaments.length === 0 ? (
                <div className="text-[#9ca3af] text-sm py-6 text-center">No tournaments yet.</div>
              ) : (
                tournaments.map((t) => (
                  <div key={t.id} className="card-container p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="min-w-0">
                        <div className="text-white font-semibold truncate">{t.name}</div>
                        <div className="text-xs text-[#9ca3af]">{(t.prize_pool_rex || 0).toLocaleString()} REX · {t.participant_count || 0} traders</div>
                      </div>
                      <span className={`badge ${t.status === "live" ? "badge-green" : "badge-muted"}`}>{t.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="input-field text-sm flex-1"
                        style={{ padding: "8px 12px" }}
                        value={t.status}
                        onChange={(e) => updateTournament(t.id, { status: e.target.value })}
                      >
                        {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => updateTournament(t.id, { is_active: !t.is_active })}
                        className={`btn-secondary text-sm ${t.is_active ? "" : "opacity-60"}`}
                        style={{ padding: "8px 14px" }}
                      >
                        {t.is_active ? "Active" : "Paused"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <div className="flex items-center gap-2 section-title-accent mb-6"><Settings className="w-4 h-4" /> Platform Settings</div>
            <div className="space-y-4">
              <div>
                <label className="section-label block mb-2">Platform Name</label>
                <input className="input-field" value={settings.platform_name} onChange={(e) => setSettings((s) => ({ ...s, platform_name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-2">Default Min Deposit</label>
                  <input type="number" className="input-field" value={settings.default_min_deposit} onChange={(e) => setSettings((s) => ({ ...s, default_min_deposit: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="section-label block mb-2">Discord Invite</label>
                  <input className="input-field" value={settings.discord_invite} onChange={(e) => setSettings((s) => ({ ...s, discord_invite: e.target.value }))} placeholder="https://discord.gg/…" />
                </div>
              </div>
              <button onClick={handleSaveSettings} disabled={saving} className="btn-primary w-full disabled:opacity-50">
                <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}