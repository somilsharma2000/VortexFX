const BUTTONS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/?text=The%20gates%20open%20at%2010%2C000%20traders.%20Reserve%20your%20spot%20before%20they%20fill.%20https%3A%2F%2Fdiscord.gg%2Fz2qVgJgCg4",
    bg: "#25D366",
    border: "none",
  },
  { label: "Instagram", href: "https://www.instagram.com/", bg: "linear-gradient(135deg, #833AB4, #FD1D1D)", border: "none" },
  {
    label: "X",
    href: "https://twitter.com/intent/tweet?text=The%20gates%20open%20at%2010%2C000%20traders.%20Reserve%20your%20spot%20before%20they%20fill.",
    bg: "#000000",
    border: "1px solid #333",
  },
  { label: "Discord", href: "https://discord.gg/z2qVgJgCg4", bg: "#5865F2", border: "none" },
];

export default function ShareSection() {
  return (
    <section style={{ marginBottom: 80, textAlign: "center" }}>
      <p className="text-sm" style={{ color: "#666666" }}>
        Know a trader who'd want in? Share the gates.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {BUTTONS.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
            style={{ background: b.bg, color: "#ffffff", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: b.border, gap: 8 }}
          >
            {b.label}
          </a>
        ))}
      </div>
    </section>
  );
}