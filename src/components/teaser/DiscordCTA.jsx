import { MessageCircle } from "lucide-react";

const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

export default function DiscordCTA() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="h-px w-full" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />
      <p className="mt-6 text-sm" style={{ color: "#666666" }}>
        Want early access? Join the inner circle.
      </p>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 font-bold rounded-lg px-6 py-3 transition-transform hover:scale-105"
        style={{ backgroundColor: "#5865F2", color: "#ffffff" }}
      >
        <MessageCircle className="w-5 h-5" /> JOIN THE COMMUNITY
      </a>
    </div>
  );
}