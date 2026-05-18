import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "sobre", href: "/sobre" },
  { label: "blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full backdrop-blur-md"
      style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)",
        borderBottom: "1px solid rgba(0, 255, 65, 0.08)",
        zIndex: 50,
      }}
      id="main-nav"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
          <img
            src="images/logo.png"
            alt="c4o5.sec logo"
            className="w-9 h-9 rounded-lg pulse-glow"
            style={{ transition: "transform 0.3s" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span
            className="text-sm font-semibold tracking-wider"
            style={{
              color: "#00f0ff",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.4)",
            }}
          >
            c4o5@sec:~$
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className="nav-link" id={`nav-${item.label}`}>
              <span style={{ color: "#00ff41", marginRight: "4px" }}>./</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
          id="mobile-menu-toggle"
          style={{ color: "#8b949e", transition: "color 0.2s" }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            borderTop: "1px solid rgba(0, 255, 65, 0.1)",
          }}
          id="mobile-menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block py-2.5 text-sm"
              style={{ color: "#8b949e", transition: "color 0.2s" }}
              onClick={() => setMobileOpen(false)}
            >
              <span style={{ color: "#00ff41" }}>$ </span>
              cd ./{item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
