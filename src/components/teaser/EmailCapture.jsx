import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!v || busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setMsg({ text: "Enter a valid email address.", color: "#ff5a5a" });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const r = await base44.functions.invoke("teaserEntry", { action: "join", email: v });
      const d = r.data || {};
      if (d.exists) {
        setMsg({ text: "You're already on the list. Invite a friend.", color: "#D4AF37" });
      } else {
        setDone(true);
        setMsg({ text: "SPOT RESERVED. You're a Founding Member.", color: "#00C853" });
        setEmail("");
      }
    } catch {
      setMsg({ text: "Something went wrong. Try again.", color: "#ff5a5a" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section style={{ maxWidth: 500, margin: "0 auto 60px" }}>
      {!done && (
        <form onSubmit={submit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to claim your spot"
            className="w-full text-white"
            style={{ height: 50, background: "#0A0A0A", border: "1px solid #333333", borderRadius: 8, fontSize: 15, padding: "0 16px", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
            onBlur={(e) => (e.target.style.borderColor = "#333333")}
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full"
            style={{ height: 50, background: "#D4AF37", color: "#000000", fontWeight: 700, borderRadius: 8, marginTop: 12, cursor: "pointer", opacity: busy ? 0.6 : 1 }}
          >
            {busy ? "RESERVING…" : "RESERVE MY SPOT"}
          </button>
        </form>
      )}
      {msg && (
        <p className="text-center mt-4 text-sm font-semibold" style={{ color: msg.color }}>
          {msg.text}
        </p>
      )}
    </section>
  );
}