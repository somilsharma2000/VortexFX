import { MessageCircle, Camera, Share2, Users } from "lucide-react";

const WA_URL =
  "https://wa.me/?text=The%20gates%20open%20at%2010%2C000%20traders.%20Reserve%20your%20spot%20before%20they%20fill.%20https%3A%2F%2Fdiscord.gg%2Fz2qVgJgCg4";
const IG_URL = "https://www.instagram.com/";
const X_URL =
  "https://twitter.com/intent/tweet?text=The%20gates%20open%20at%2010%2C000%20traders.%20Reserve%20your%20spot%20before%20they%20fill.%20";
const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

const BUTTONS = [
  { label: "WhatsApp", icon: MessageCircle, href: WA_URL, bg: "#25D366" },
  { label: "Instagram", icon: Camera, href: IG_URL, bg: "linear-gradient(135deg, #833AB4, #FD1D1D)" },
  { label: "X", icon: Share2, href: X_URL, bg: "#000000", border: true },
  { label: "Discord", icon: Users, href: DISCORD_URL, bg: "#5865F2" },
];

export default function ShareSection() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <p className="text-sm" style={{ color: "#666666" }}>
        Know a trader who'd want in? Share the gates.
      </p>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BUTTONS.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold rounded-lg px-3 py-3 transition-transform hover:scale-105"
            style={{ backgroundColor: b.bg, color: "#ffffff", border: b.border ? "1px solid #ffffff" : "none" }}
          >
            <b.icon className="w-4 h-4" /> {b.label}
          </a>
        ))}
      </div>
    </div>
  );
}