import { MessageCircle, Twitter, Instagram } from "lucide-react";

const URL = typeof window !== "undefined" ? window.location.href : "https://fortrex.app";
const TEXT = "FORTREX — the gates open at 10,000 traders. Reserve your spot.";

export default function ShareSection() {
  const shares = [
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(TEXT + " " + URL)}` },
    { icon: Twitter, label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(TEXT)}&url=${encodeURIComponent(URL)}` },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: MessageCircle, label: "Discord", href: "https://discord.gg/z2qVgJgCg4" },
  ];
  return (
    <section className="relative max-w-2xl mx-auto px-5 py-8 text-center">
      <p className="text-xs tracking-[0.2em] mb-4" style={{ color: "#A0A0A0" }}>SHARE</p>
      <div className="flex justify-center gap-4">
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37" }}
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}