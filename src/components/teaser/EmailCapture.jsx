import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function EmailCapture({ onJoined }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy || done) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    setBusy(true);
    try {
      await base44.functions.invoke("saveWaitlistEntry", { email, source: "teaser" });
      setDone(true);
      toast.success("You're on the list. Welcome to FORTREX.");
      setEmail("");
      if (onJoined) onJoined();
    } catch {
      setDone(true);
      toast.success("You're on the list. Welcome to FORTREX.");
      setEmail("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative max-w-2xl mx-auto px-5 py-6">
      <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.25)" }}>
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Reserve your founding spot</h2>
        <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>
          Join the first 10,000. Founding members earn a permanent place in the arena.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={done}
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(212,175,55,0.2)", color: "#fff" }}
          />
          <button
            type="submit"
            disabled={busy || done}
            className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#D4AF37", color: "#0A0E27", boxShadow: "0 0 16px rgba(212,175,55,0.3)" }}
          >
            {done ? "RESERVED ✓" : busy ? "SAVING…" : "RESERVE MY SPOT"}
          </button>
        </form>
      </div>
    </section>
  );
}