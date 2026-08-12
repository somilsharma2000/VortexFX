const PARTICLES = [
  { left: "12%", top: "24%", size: 3, delay: "0s" },
  { left: "84%", top: "32%", size: 2, delay: "1.2s" },
  { left: "28%", top: "74%", size: 4, delay: "2.1s" },
  { left: "68%", top: "80%", size: 2, delay: "0.6s" },
  { left: "52%", top: "16%", size: 3, delay: "1.8s" },
  { left: "90%", top: "60%", size: 2, delay: "2.6s" },
];

export default function TeaserBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 100% 100%, rgba(212,175,55,0.04), transparent 45%)" }}
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
            opacity: 0.22,
            animationDelay: p.delay,
            boxShadow: "0 0 8px rgba(212,175,55,0.45)",
          }}
        />
      ))}
    </div>
  );
}