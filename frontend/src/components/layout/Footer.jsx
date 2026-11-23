import { Link } from "react-router-dom";
import { BUSINESS } from "@/config/business";

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        {/* Brand + socials */}
        <div>
          <p className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
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
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {BUSINESS.socials.map((s) => (
              <a
                key={s.name}
                data-testid={`footer-link-${s.name.toLowerCase()}`}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.name} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Page links */}
        <nav aria-label="Footer">
          <p className="mono text-[11px] tracking-[0.25em] text-muted-foreground">EXPLORE</p>
          <div className="mt-4 flex flex-col gap-2">
            {PAGES.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Contact summary */}
        <div>
          <p className="mono text-[11px] tracking-[0.25em] text-muted-foreground">CONTACT</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-foreground">
              {BUSINESS.email}
            </a>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              WhatsApp: {BUSINESS.phoneDisplay}
            </a>
            <span>{BUSINESS.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} RomanoGalvan.com — All rights reserved.</span>
          <span>{BUSINESS.subTagline}</span>
        </div>
      </div>
    </footer>
  );
}
