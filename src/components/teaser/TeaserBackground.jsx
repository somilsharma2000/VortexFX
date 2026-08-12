const PARTICLES = [
  { top: "18%", left: "12%", size: 3, delay: "0s" },
  { top: "32%", left: "78%", size: 2, delay: "1.2s" },
  { top: "62%", left: "22%", size: 4, delay: "0.6s" },
  { top: "74%", left: "66%", size: 2, delay: "2.1s" },
  { top: "48%", left: "90%", size: 3, delay: "1.8s" },
  { top: "84%", left: "40%", size: 2, delay: "0.9s" },
];

export default function TeaserBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
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
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: "#D4AF37",
            boxShadow: "0 0 8px rgba(212,175,55,0.6)",
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}