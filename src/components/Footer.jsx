import { Link } from "react-router-dom";

const DISCORD = "https://discord.gg/z2qVgJgCg4";

export default function Footer() {
  return (
    <footer className="mt-16" style={{ borderTop: "1px solid rgba(212,175,55,0.12)", backgroundColor: "#070A18" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <div className="text-lg font-bold tracking-[0.2em]" style={{ color: "#D4AF37", fontFamily: "Space Grotesk, sans-serif" }}>
            FORTREX
          </div>
          <p className="mt-2 text-sm" style={{ color: "#A0A0A0" }}>Trading Competition Community</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link to="/tournaments" className="text-sm hover:opacity-80" style={{ color: "#A0A0A0" }}>Tournaments</Link>
          <Link to="/leaderboard" className="text-sm hover:opacity-80" style={{ color: "#A0A0A0" }}>Leaderboard</Link>
          <Link to="/faq" className="text-sm hover:opacity-80" style={{ color: "#A0A0A0" }}>FAQ</Link>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="text-sm hover:opacity-80" style={{ color: "#D4AF37" }}>Discord</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8">
        <p className="text-xs" style={{ color: "#666" }}>Trading involves risk. Past performance does not guarantee future results.</p>
        <p className="text-xs mt-2" style={{ color: "#555" }}>© 2026 FORTREX. All rights reserved.</p>
      </div>
    </footer>
  );
}