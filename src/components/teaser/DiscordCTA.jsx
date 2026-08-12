const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

export default function DiscordCTA() {
  return (
    <section style={{ marginBottom: 60, textAlign: "center" }}>
      <div style={{ height: 1, background: "#333333", maxWidth: 400, margin: "0 auto" }} />
      <p className="text-[14px] md:text-[16px] mt-10" style={{ color: "#FFFFFF" }}>
        Want early access? Join the inner circle.
      </p>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4"
        style={{ background: "#5865F2", color: "#ffffff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
      >
        JOIN THE COMMUNITY
      </a>
    </section>
  );
}