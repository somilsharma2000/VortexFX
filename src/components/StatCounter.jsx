export default function StatCounter({ value, label, suffix, accent }) {
  return (
    <div className="fade-in">
      <div className="stat-number" style={accent ? { color: accent } : undefined}>
        {value}
        {suffix && <span className="text-[#D4AF37]">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}