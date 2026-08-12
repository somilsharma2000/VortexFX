export default function TeaserFooter() {
  return (
    <footer style={{ textAlign: "center", paddingBottom: 40 }}>
      <div className="text-sm font-bold" style={{ color: "#D4AF37" }}>
        FORTREX
      </div>
      <p className="text-xs mt-3" style={{ color: "#666666" }}>© 2026 FORTREX. All rights reserved.</p>
      <p className="text-xs mt-1" style={{ color: "#666666" }}>
        Trading involves risk. Past performance does not guarantee future results.
      </p>
      <p className="text-xs mt-1" style={{ color: "#666666" }}>Built by traders, for traders.</p>
    </footer>
  );
}