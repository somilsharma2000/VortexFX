export default function StatCounter({ value, label, suffix, accent }) {
  return (
    <div className="fade-in">
      <div className="stat-number" style={accent ? { color: accent } : undefined}>
        {value}
        {suffix && <span className="text-[#7c3aed]">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}