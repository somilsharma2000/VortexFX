export default function SectionHeader({ label, title, viewAllTo, viewAllText = "View All", subtitle }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        {label && <div className="section-label mb-3">{label}</div>}
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-[#9ca3af] mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <a
          href={viewAllTo}
          className="inline-flex items-center gap-1.5 text-[#7c3aed] hover:text-[#8b5cf6] font-semibold text-sm transition-all duration-300 group"
        >
          {viewAllText}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}