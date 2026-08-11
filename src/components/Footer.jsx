import { Link } from "react-router-dom";
import { MessageCircle, Youtube, Send, Instagram } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Dashboard", to: "/" },
      { label: "Championships", to: "/tournaments" },
      { label: "Traders", to: "/traders" },
      { label: "Leaderboard", to: "/leaderboard" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Daily Check-in", to: "/check-in" },
      { label: "Referrals", to: "/referrals" },
      { label: "Transactions", to: "/transactions" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", to: "/traders" },
      { label: "REX Wallet", to: "/transactions" },
      { label: "Admin", to: "/admin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24" style={{ backgroundColor: "#080C1F", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0E27] font-bold" style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #00C853)" }}>F</div>
              <span className="text-lg font-bold text-white">FORTREX</span>
            </div>
            <p className="text-sm text-[#A0A8C0] max-w-sm mb-6 leading-relaxed">
              Trade. Compete. Win. The FORTREX Trading Community — free education, monthly trading championships, and real cash prizes.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Discord" className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A0A8C0] hover:text-[#D4AF37] transition-colors" style={{ backgroundColor: "#111634", border: "1px solid rgba(212,175,55,0.15)" }}><MessageCircle className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A0A8C0] hover:text-[#D4AF37] transition-colors" style={{ backgroundColor: "#111634", border: "1px solid rgba(212,175,55,0.15)" }}><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A0A8C0] hover:text-[#D4AF37] transition-colors" style={{ backgroundColor: "#111634", border: "1px solid rgba(212,175,55,0.15)" }}><Youtube className="w-4 h-4" /></a>
              <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A0A8C0] hover:text-[#D4AF37] transition-colors" style={{ backgroundColor: "#111634", border: "1px solid rgba(212,175,55,0.15)" }}><Send className="w-4 h-4" /></a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="section-title-accent mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#A0A8C0] hover:text-[#D4AF37] transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
          <p className="text-xs text-[#6B7494]">© {new Date().getFullYear()} FORTREX. All rights reserved.</p>
          <p className="text-xs text-[#6B7494]">Not financial advice. Trading involves risk.</p>
        </div>
      </div>
    </footer>
  );
}