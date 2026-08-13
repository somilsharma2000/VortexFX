import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DISCORD = "https://discord.gg/z2qVgJgCg4";
const LINKS = [
  { label: "Home", to: "/" },
  { label: "Tournaments", to: "/tournaments" },
  { label: "Leaderboard", to: "/leaderboard" },
  { label: "FAQ", to: "/faq" },
  { label: "REX", to: "/rex" },
  { label: "Journal", to: "/journal" },
  { label: "Community", to: "/community" },
];

const activeStyle = { color: "#D4AF37" };
const inactive = { color: "#A0A0A0" };

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "rgba(10,14,39,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.12)" }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-lg font-bold tracking-[0.2em]" style={{ color: "#D4AF37", fontFamily: "Space Grotesk, sans-serif" }}>
            FORTREX
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={({ isActive }) => (isActive ? activeStyle : inactive)}
              className="text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center">
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#D4AF37", color: "#0A0E27", boxShadow: "0 0 16px rgba(212,175,55,0.3)" }}
          >
            ENTER ARENA
          </a>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: "#D4AF37" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              style={({ isActive }) => (isActive ? activeStyle : inactive)}
              className="text-sm font-medium py-2"
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold text-center"
            style={{ backgroundColor: "#D4AF37", color: "#0A0E27" }}
          >
            ENTER ARENA
          </a>
        </div>
      )}
    </header>
  );
}