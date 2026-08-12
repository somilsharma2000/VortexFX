export default function TeaserFooter() {
  return (
    <footer className="w-full text-center py-8" style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}>
      <div className="text-sm font-bold tracking-[0.25em] mb-2" style={{ color: "#D4AF37" }}>
        FORTREX
      </div>
      <p className="text-xs mb-1" style={{ color: "#666666" }}>© 2026 FORTREX. All rights reserved.</p>
      <p className="text-xs" style={{ color: "#666666" }}>
        Trading involves risk. Past performance does not guarantee future results.
      </p>
    </footer>
  );
}