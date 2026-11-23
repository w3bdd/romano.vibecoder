import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home", testid: "nav-link-home" },
  { to: "/services", label: "Services", testid: "nav-link-services" },
  { to: "/portfolio", label: "Portfolio", testid: "nav-link-portfolio" },
  { to: "/pricing", label: "Pricing", testid: "nav-link-pricing" },
  { to: "/about", label: "About", testid: "nav-link-about" },
  { to: "/contact", label: "Contact", testid: "nav-link-contact" },
];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);

  return (
    // The overlay menu must be OUTSIDE the header: the header's backdrop
    // blur would otherwise trap the menu's fixed positioning inside the
    // 64px-tall bar instead of covering the whole screen.
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Brand */}
        <Link
          to="/"
          data-testid="header-brand-logo"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/rg-monogram.png`}
            alt="RG monogram"
            className="h-8 w-8 rounded-full"
          />
          <span className="flex flex-col leading-tight">
            <span className="uppercase">
              RomanoGalvan<span className="text-accent">.COM</span>
            </span>
            <span className="mono mt-0.5 text-[8px] font-normal leading-snug tracking-[0.16em] text-muted-foreground">
              PREMIUM WEB EXPERIENCES.
              <br />
              POWERFUL DIGITAL SOLUTIONS.
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={l.testid}
              className={({ isActive }) =>
                `text-[13px] tracking-wide transition-colors ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Light / dark theme switch */}
          <button
            data-testid="theme-toggle-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle color theme"
            className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link
            to="/contact"
            data-testid="nav-cta-consultation"
            className="hidden md:inline-flex rounded-full bg-foreground px-5 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-85"
          >
            Get a Free Consultation
          </Link>
          {/* Mobile menu button */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            className="lg:hidden rounded-full border border-border p-2"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>
      </header>

      {/* Mobile full-screen menu — semi-translucent so the page glows
          through behind a heavy blur; padded below the fixed header bar */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-background/85 pt-16 backdrop-blur-xl"
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`${l.testid}-mobile`}
                  onClick={() => setOpen(false)}
                  className="font-display block py-2 text-3xl font-medium tracking-tight"
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
