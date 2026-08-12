import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Crown, MessageCircle, Send, UserPlus, Flame, ArrowRight } from "lucide-react";

export default function Waitlist() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const list = await base44.entities.WaitlistEntry.list("-signup_date", 1000);
      setCount(list.length);
    } catch {}
  };
  useEffect(() => { load(); }, []);

  const join = async () => {
    if (!email.trim()) {
      toast({ title: "Email required", description: "Enter your email to join the waitlist.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const pos = count + 1;
      const today = new Date().toISOString().slice(0, 10);
      await base44.entities.WaitlistEntry.create({
        email: email.trim(),
        phone: phone.trim(),
        position: pos,
        referred_by: "",
        discord_joined: false,
        telegram_joined: false,
        signup_date: today
      });
      setPosition(pos);
      setEmail("");
      setPhone("");
      toast({ title: "You're on the list!", description: `Position #${pos} — welcome to the Genesis program.` });
      await load();
    } catch (e) {
      toast({ title: "Failed to join", description: e?.message || "Try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const moveUp = [
    { icon: UserPlus, label: "Refer a friend", reward: "+50 spots + 150 REX", color: "#D4AF37" },
    { icon: MessageCircle, label: "Join our Discord", reward: "+25 spots", color: "#00C853" },
    { icon: Send, label: "Join our Telegram", reward: "+25 spots", color: "#D4AF37" }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10 fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}>
          <Crown className="w-4 h-4" style={{ color: "#D4AF37" }} />
          <span className="text-sm font-semibold" style={{ color: "#D4AF37" }}>Genesis Trader Program</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span className="text-gradient">Be First. Be Genesis.</span>
        </h1>
        <p className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
          The first 2,500 traders get permanent perks. Join the waitlist and climb your way up.
        </p>
      </div>

      <div className="card mb-8 fade-in-delay-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <input className="input-field" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input-field" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button onClick={join} disabled={submitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? "Joining…" : "Join Waitlist"} <ArrowRight className="w-4 h-4 btn-arrow" />
        </button>
        {position && (
          <div className="mt-5 text-center p-5 rounded-xl" style={{ backgroundColor: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.25)" }}>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>You are</div>
            <div className="text-3xl font-bold" style={{ color: "#00C853" }}>#{position.toLocaleString()}</div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>in line</div>
          </div>
        )}
      </div>

      <div className="text-center mb-6 fade-in-delay-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#D4AF37" }}>
          <Flame className="w-4 h-4" /> {count.toLocaleString()} traders already in line
        </span>
      </div>

      <div className="mb-3 text-center section-label">Ways to move up</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 fade-in-delay-3">
        {moveUp.map((m) => (
          <div key={m.label} className="card card-hover text-center">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}>
              <m.icon className="w-5 h-5" style={{ color: m.color }} />
            </div>
            <div className="text-white font-semibold mb-1">{m.label}</div>
            <div className="text-sm" style={{ color: m.color }}>{m.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );
}