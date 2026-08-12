import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowRight } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    setState(null);
    try {
      const r = await base44.functions.invoke("teaserEntry", { action: "join", email: email.trim() });
      const d = r.data || {};
      if (d.exists) {
        setState("exists");
      } else {
        setState("done");
        setEmail("");
      }
    } catch {
      setState("error");
    } finally {
      setBusy(false);
    }
  };

  const msg = {
    done: "SPOT RESERVED. You're a Founding Member.",
    exists: "You're already on the list. Invite a friend.",
    error: "Something went wrong. Try again.",
  }[state];
  const msgColor = state === "done" ? "#D4AF37" : state === "exists" ? "#666666" : "#ff5a5a";

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to claim your spot"
        className="w-full text-white text-center rounded-lg px-4 py-3 outline-none transition-all"
        style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(212,175,55,0.25)" }}
        onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.25)")}
      />
      <button
        type="submit"
        disabled={busy}
        className="w-full mt-3 inline-flex items-center justify-center gap-2 font-bold rounded-lg px-5 py-3 transition-all hover:scale-[1.02] disabled:opacity-60"
        style={{ backgroundColor: "#D4AF37", color: "#000000" }}
      >
        {busy ? "RESERVING…" : "RESERVE MY SPOT"} <ArrowRight className="w-4 h-4" />
      </button>
      {msg && (
        <p className="mt-4 text-center text-sm font-semibold" style={{ color: msgColor }}>
          {msg}
        </p>
      )}
    </form>
  );
}