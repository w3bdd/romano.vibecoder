import { useState } from "react";
import { Sun, Moon, Menu, X, MessageCircle } from "lucide-react";
import { scrollToSection } from "@/App";
import ClockPill from "@/components/portfolio/ClockPill";

// Pre-filled WhatsApp chat link — opens a conversation with a hello message ready to send.
const WHATSAPP_URL =
  "https://wa.me/639916848388?text=Hi%20Romano%2C%20I%27m%20interested%20in%20building%20a%20web%20project.";

const LINKS = [
  { label: "Services", href: "#services", testid: "nav-link-services" },
  { label: "Manifesto", href: "#manifesto", testid: "nav-link-manifesto" },
  { label: "Work", href: "#work", testid: "nav-link-work" },
  { label: "Contact", href: "#contact", testid: "nav-link-contact" },
];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false); // mobile menu open/closed

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-2 border-foreground bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand mark */}
        <button
          data-testid="header-brand-logo"
          onClick={() => scrollToSection("#top")}
          className="font-heading text-base sm:text-lg font-extrabold tracking-tight"
        >
          ROMANO GALVAN <span className="text-accent">//</span>{" "}
          <span className="mono text-[10px] sm:text-xs tracking-[0.25em] align-middle">VIBE CODER</span>
        </button>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={l.testid}
              onClick={() => scrollToSection(l.href)}
              className="mono text-xs tracking-[0.2em] hover:text-accent transition-colors"
            >
              {l.label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ClockPill />
          {/* Light / dark theme switch */}
          <button
            data-testid="theme-toggle-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle color theme"
            className="neo-lift neo-shadow border-2 border-foreground bg-background p-2"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {/* WhatsApp quick contact (desktop) */}
          <a
            data-testid="nav-whatsapp-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-lift neo-shadow hidden md:inline-flex items-center gap-2 border-2 border-foreground bg-accent px-4 py-2 text-xs font-bold text-accent-foreground"
          >
            <MessageCircle size={14} /> WHATSAPP
          </a>
          {/* Mobile hamburger */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            className="lg:hidden border-2 border-foreground bg-background p-2"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <nav className="lg:hidden border-t-2 border-foreground bg-background px-4 py-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`${l.testid}-mobile`}
              onClick={() => {
                setOpen(false);
                scrollToSection(l.href);
              }}
              className="mono text-left text-sm tracking-[0.2em] py-1"
            >
              {l.label.toUpperCase()}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
