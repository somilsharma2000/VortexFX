import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Zap, LayoutDashboard, Trophy, Users, BarChart3, Gift, Wallet, CalendarCheck, Shield, Flame, Sword } from "lucide-react";
import { useCurrentTrader } from "@/hooks/useCurrentTrader";

const DISCORD_URL = "https://discord.gg/9pTSqeTbn";
import Logo from "@/components/Logo";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/tournaments", label: "Championships", icon: Trophy },
  { to: "/traders", label: "Traders", icon: Users },
  { to: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { to: "/check-in", label: "Check-in", icon: CalendarCheck, badge: "HUB" },
  { to: "/referrals", label: "Referrals", icon: Gift },
  { to: "/transactions", label: "Transactions", icon: Wallet },
];

export default function Sidebar() {
  const { user, trader, loading } = useCurrentTrader();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  const sidebarContent = (
    <>
      <Link to="/" className="flex items-center gap-2.5 px-6 h-16 shrink-0" onClick={() => setOpen(false)}>
        <Logo size={36} />
        <span className="text-lg font-bold tracking-tight" style={{ color: "#D4AF37" }}>FORTREX</span>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) => `sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="badge badge-purple" style={{ fontSize: "0.6rem", padding: "2px 6px" }}>{item.badge}</span>
            )}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink to="/admin" onClick={() => setOpen(false)} className={({ isActive }) => `sidebar-item ${isActive ? "sidebar-item-active" : ""}`}>
            <Shield className="w-[18px] h-[18px] shrink-0" />
            <span className="flex-1">Admin</span>
          </NavLink>
        )}
      </nav>

      <div className="p-4" style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        {!loading && trader && (
          <div className="card-container px-4 py-3 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-white">{(trader.rex_balance || 0).toLocaleString()}</span>
            <span className="text-xs text-[#A0A8C0]">REX</span>
          </div>
        )}
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-sm mb-2" style={{ padding: "10px 16px" }}>
          <Sword className="w-4 h-4" /> Enter Arena
        </a>
        <Link to="/check-in" onClick={() => setOpen(false)} className="btn-secondary w-full text-sm" style={{ padding: "10px 16px" }}>
          <Flame className="w-4 h-4" /> Daily Check-in
        </Link>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] flex-col z-40" style={{ backgroundColor: "#080C1F", borderRight: "1px solid rgba(212,175,55,0.15)" }}>
        {sidebarContent}
      </aside>

      <header className="lg:hidden fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-4" style={{ backgroundColor: "rgba(10,14,39,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={30} />
          <span className="text-base font-bold" style={{ color: "#D4AF37" }}>FORTREX</span>
        </Link>
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs" style={{ padding: "6px 12px" }}>
          <Sword className="w-3.5 h-3.5" /> Enter Arena
        </a>
        <button onClick={() => setOpen(!open)} className="text-white p-2" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {open && (
        <>
          <div className="lg:hidden fixed inset-0 z-40" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-[260px] z-50 flex flex-col" style={{ backgroundColor: "#080C1F", borderRight: "1px solid rgba(212,175,55,0.15)" }}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-[#A0A8C0] hover:text-white z-10">
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}