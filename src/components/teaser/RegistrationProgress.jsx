const GOAL = 10000;

export default function RegistrationProgress({ count = 0 }) {
  const pct = Math.min(100, (count / GOAL) * 100);
  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="text-center text-xs uppercase tracking-[0.25em] mb-3"
        style={{ color: "#D4AF37" }}
      >
        Unlocking at 10,000 Registrations
      </div>
      <div
        className="h-3 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(212,175,55,0.25)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #B8941F, #D4AF37)" }}
        />
      </div>
      <div className="text-center text-sm mt-3" style={{ color: "#666666" }}>
        <span style={{ color: "#ffffff", fontWeight: 700 }}>{count.toLocaleString()}</span> / 10,000 traders waiting
      </div>
    </div>
  );
}