import { MessageCircle } from "lucide-react";

const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

export default function TeaserNav() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 sm:px-8 h-16"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(212,175,55,0.12)",
      }}
    >
      <span className="text-lg sm:text-xl font-extrabold tracking-[0.25em]" style={{ color: "#D4AF37" }}>
        FORTREX
      </span>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-transform hover:scale-105"
        style={{ backgroundColor: "#5865F2", color: "#ffffff" }}
      >
        <MessageCircle className="w-4 h-4" /> JOIN THE COMMUNITY
      </a>
    </nav>
  );
}