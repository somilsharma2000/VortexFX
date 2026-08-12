const BADGE_TEXT = "SEALED · LAUNCHING AUG 23";

export default function TeaserNav() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 sm:px-8 h-16"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", borderBottom: "1px solid #1A1A1A" }}
    >
      <div className="flex items-center gap-2.5">
        <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#D4AF37" />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="52" fontWeight="800" fill="#000000">F</text>
        </svg>
        <span className="text-base sm:text-lg font-extrabold tracking-[0.18em] text-white">FORTREX FX</span>
      </div>
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.35)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#D4AF37" }} />
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.12em]" style={{ color: "#D4AF37" }}>
          {BADGE_TEXT}
        </span>
      </div>
    </nav>
  );
}