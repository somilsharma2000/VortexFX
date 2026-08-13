import { MessageCircle } from "lucide-react";

const DISCORD = "https://discord.gg/z2qVgJgCg4";

export default function DiscordCTA() {
  return (
    <section className="relative max-w-2xl mx-auto px-5 py-6 text-center">
      <a
        href={DISCORD}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
        style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", backgroundColor: "rgba(212,175,55,0.06)" }}
      >
        <MessageCircle size={18} /> Join the Community
      </a>
    </section>
  );
}