export default function RegistrationGate({ stats, loading }) {
  const { totalTraders, target, progressPercent, remaining } = stats;
  return (
    <section className="relative max-w-2xl mx-auto px-5 py-8">
      <div className="rounded-2xl p-8" style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="flex items-end justify-between mb-4">
          <div className="text-left">
            <div className="text-3xl font-bold" style={{ color: "#D4AF37", fontFamily: "Space Grotesk, sans-serif" }}>
              {loading ? "—" : Number(totalTraders || 0).toLocaleString()}
            </div>
            <div className="text-xs mt-1" style={{ color: "#A0A0A0" }}>traders registered</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: "#fff", fontFamily: "Space Grotesk, sans-serif" }}>
              {Number(target || 10000).toLocaleString()}
            </div>
            <div className="text-xs mt-1" style={{ color: "#A0A0A0" }}>gates open at</div>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#111" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent || 0}%`,
              backgroundImage: "linear-gradient(90deg, #BF9256, #D4AF37, #E5C158)",
              boxShadow: "0 0 12px rgba(212,175,55,0.5)",
            }}
          />
        </div>
        <p className="text-xs mt-4" style={{ color: "#A0A0A0" }}>
          {loading ? "Loading…" : `${Number(remaining || 0).toLocaleString()} spots remaining`}
        </p>
      </div>
    </section>
  );
}