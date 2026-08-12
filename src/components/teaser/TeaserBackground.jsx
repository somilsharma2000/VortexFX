const PARTICLES = [
  { left: "10%", top: "22%", size: 3, delay: "0s" },
  { left: "85%", top: "30%", size: 2, delay: "1.2s" },
  { left: "25%", top: "76%", size: 4, delay: "2.1s" },
  { left: "70%", top: "82%", size: 2, delay: "0.6s" },
  { left: "50%", top: "15%", size: 3, delay: "1.8s" },
  { left: "92%", top: "62%", size: 2, delay: "2.6s" },
];

export default function TeaserBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 38%, rgba(212,175,55,0.10), transparent 62%)" }}
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: "#D4AF37",
            opacity: 0.25,
            animationDelay: p.delay,
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
          }}
        />
      ))}
    </div>
  );
}