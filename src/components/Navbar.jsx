import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/tournaments", label: "Tournaments" },
  { to: "/traders", label: "Traders" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/check-in", label: "Check-in", badge: "HUB" },
];

export default function Navbar() {
  const { user, trader, loading } = useCurrentTrader();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ backgroundColor: "rgba(10,10,12,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #202028" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
              K
            </div>
            <span className="text-lg font-bold text-white tracking-tight">KODA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-pill ${isActive ? "nav-pill-active" : ""}`}
              >
                {item.label}
                {item.badge && (
                  <span className="badge badge-purple ml-1" style={{ fontSize: "0.6rem", padding: "2px 6px" }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `nav-pill ${isActive ? "nav-pill-active" : ""}`}>
                Admin
              </NavLink>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {!loading && trader && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#14141c", border: "1px solid #202028" }}>
                <Zap className="w-4 h-4 text-[#7c3aed]" />
                <span className="text-sm font-semibold text-white">{(trader.rex_balance || 0).toLocaleString()}</span>
                <span className="text-xs text-[#9ca3af]">REX</span>
              </div>
            )}
            <Link to="/check-in" className="btn-primary text-sm" style={{ padding: "8px 18px" }}>
              Daily Check-in
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#202028]" style={{ backgroundColor: "#0a0a0c" }}>
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `nav-pill ${isActive ? "nav-pill-active" : ""}`}
              >
                {item.label}
                {item.badge && <span className="badge badge-purple ml-1" style={{ fontSize: "0.6rem" }}>{item.badge}</span>}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" onClick={() => setOpen(false)} className={({ isActive }) => `nav-pill ${isActive ? "nav-pill-active" : ""}`}>
                Admin
              </NavLink>
            )}
            <Link to="/check-in" onClick={() => setOpen(false)} className="btn-primary mt-2">Daily Check-in</Link>
          </nav>
        </div>
      )}
    </header>
  );
}