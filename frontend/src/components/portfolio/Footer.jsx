import ClockPill from "@/components/portfolio/ClockPill";
import { scrollToSection } from "@/App";

// Big typographic sign-off. Social URLs are placeholders — swap in your real profiles.
const SOCIALS = [
  { name: "GitHub", url: "https://github.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "WhatsApp", url: "https://wa.me/639916848388" },
  { name: "Email", url: "mailto:rvg.webdd@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <button
          onClick={() => scrollToSection("#top")}
          className="font-heading block text-left text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
        >
          ROMANO <span className="text-accent">GALVAN</span>
        </button>
        <p className="mono mt-3 text-xs tracking-[0.25em] opacity-70">
          VIBE CODER — BAMBAN, TARLAC, PHILIPPINES 2317
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-background/20 pt-8">
          <nav className="flex flex-wrap gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                data-testid={`footer-link-${s.name.toLowerCase()}`}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="mono text-xs tracking-[0.2em] hover:text-accent transition-colors"
              >
                {s.name.toUpperCase()} ↗
              </a>
            ))}
          </nav>
          <ClockPill testid="footer-timezone-clock" />
        </div>

        <p className="mono mt-8 text-[10px] tracking-widest opacity-50">
          © {new Date().getFullYear()} ROMANO GALVAN — BUILT WITH REACT + FASTAPI. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
