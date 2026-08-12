import { Lock } from "lucide-react";

const CARDS = [
  { title: "COMPETE", desc: "Verified championships. Real prize pools. More coming soon." },
  { title: "EARN", desc: "A reward system unlike anything you've seen. Details locked." },
  { title: "DOMINATE", desc: "Climb the ranks. Prove your skill. The throne awaits." },
];

export default function CrypticCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
      {CARDS.map((c) => (
        <div
          key={c.title}
          className="relative rounded-xl p-6 text-center transition-transform hover:-translate-y-1"
          style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <span
            className="absolute top-3 right-3 text-[0.6rem] font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(212,175,55,0.12)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.4)" }}
          >
            LOCKED
          </span>
          <Lock className="w-6 h-6 mx-auto mb-3" style={{ color: "#D4AF37" }} />
          <h3 className="text-base font-bold tracking-[0.2em] mb-2" style={{ color: "#ffffff" }}>
            {c.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
            {c.desc}
          </p>
        </div>
      ))}
    </div>
  );
}