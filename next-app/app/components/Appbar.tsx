"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Appbar() {
  const session = useSession();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.6s ease, box-shadow 0.6s ease, border-color 0.6s ease",
        background: scrolled
          ? "rgba(22, 22, 31, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.3)"
          : "none",
        borderBottom: scrolled
          ? "1px solid rgba(139, 92, 246, 0.1)"
          : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <span className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 700 }}>MusicMate</span>
          </a>

          {/* Desktop Nav - only show on landing page */}
          {!isDashboard && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          )}

          {/* Auth Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {session.data?.user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 700, color: "white",
                  }}>
                    {session.data.user.name?.charAt(0) || "U"}
                  </div>
                  <span style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {session.data.user.name?.split(" ")[0] || "User"}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: 12,
                    transition: "color 0.3s, background 0.3s",
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => signIn("google")}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: 12,
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="btn-primary"
                  style={{
                    padding: "8px 20px",
                    fontSize: "0.875rem",
                    borderRadius: 12,
                  }}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong px-6 py-4 border-t border-[var(--border-color)]">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-white py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-[var(--border-color)] my-1" />
            {session.data?.user ? (
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-left text-[var(--text-secondary)] hover:text-white py-2"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="btn-primary !py-2.5 !text-sm w-full mt-1"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}