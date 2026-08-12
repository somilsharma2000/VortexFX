import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function EmailCapture({ onJoined }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || busy) return;
    setBusy(true);
    try {
      const res = await base44.functions.invoke("teaserEntry", { action: "join", email: value });
      const data = res.data || {};
      if (data.exists) {
        setState("exists");
      } else if (data.ok) {
        setState("done");
        setEmail("");
        if (onJoined) onJoined();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setState(null); }}
        placeholder="Enter your email to claim your spot"
        className="w-full text-center px-4 py-3 rounded-lg outline-none transition-all focus:border-[#D4AF37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]"
        style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(212,175,55,0.25)", color: "#ffffff" }}
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full mt-3 font-bold tracking-wider py-3 rounded-lg transition-all hover:brightness-110 disabled:opacity-50"
        style={{ backgroundColor: "#D4AF37", color: "#000000" }}
      >
        {busy ? "RESERVING…" : "RESERVE MY SPOT"}
      </button>
      {state === "done" && <p className="mt-3 text-sm text-center" style={{ color: "#D4AF37" }}>SPOT RESERVED. We'll notify you when the gates open.</p>}
      {state === "exists" && <p className="mt-3 text-sm text-center" style={{ color: "#666666" }}>You're already on the list. Spread the word.</p>}
      {state === "error" && <p className="mt-3 text-sm text-center" style={{ color: "#FF3B3B" }}>Something went wrong. Try again.</p>}
    </form>
  );
}