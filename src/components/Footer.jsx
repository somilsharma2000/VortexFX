import { Link } from "react-router-dom";
import { Twitter, MessageCircle, Github } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Dashboard", to: "/" },
      { label: "Tournaments", to: "/tournaments" },
      { label: "Traders", to: "/traders" },
      { label: "Leaderboard", to: "/leaderboard" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Daily Check-in", to: "/check-in" },
      { label: "Link MT4", to: "/check-in" },
      { label: "Discord Hub", to: "/check-in" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", to: "/traders" },
      { label: "Settings", to: "/check-in" },
      { label: "Admin", to: "/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#202028] mt-24" style={{ backgroundColor: "#0a0a0c" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
                K
              </div>
              <span className="text-lg font-bold text-white">KODA</span>
            </div>
            <p className="text-sm text-[#9ca3af] max-w-sm mb-6 leading-relaxed">
              The competitive trading tournament platform. Compete, climb the leaderboard, and earn REX rewards across forex and crypto markets.
            </p>
            <div className="text-sm text-[#9ca3af] space-y-1">
              <p>Koda Trading HQ</p>
              <p>contact@koda.trade</p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="section-title-accent mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#9ca3af] hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#202028] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9ca3af]">© {new Date().getFullYear()} Koda Trading. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors" style={{ backgroundColor: "#14141c", border: "1px solid #202028" }}><Twitter className="w-4 h-4" /></a>
              <a href="#" aria-label="Discord" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors" style={{ backgroundColor: "#14141c", border: "1px solid #202028" }}><MessageCircle className="w-4 h-4" /></a>
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors" style={{ backgroundColor: "#14141c", border: "1px solid #202028" }}><Github className="w-4 h-4" /></a>
            </div>
            <div className="flex items-center gap-6 text-xs text-[#9ca3af]">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}