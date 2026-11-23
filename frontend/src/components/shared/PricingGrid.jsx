import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { PACKAGES, CUSTOM_APP_USD_START } from "@/config/business";
import { useCurrency } from "@/config/currency";

// ---------------------------------------------------------------
// Pricing grid — shared by the homepage pricing section and the
// Pricing page. Currency comes from the GLOBAL currency service
// (config/currency.jsx — one detection for the whole site).
// PERMANENT CORE FEATURE: never add local currency logic here.
// See /CURRENCY_GOVERNANCE.md.
// Prices are the approved fixed figures from config/business.js.
// ---------------------------------------------------------------

const formatRange = (min, max, symbol) =>
  max
    ? `${symbol}${min.toLocaleString()}–${symbol}${max.toLocaleString()}`
    : `${symbol}${min.toLocaleString()}`;

const formatPrice = (p, currency) =>
  currency === "PHP"
    ? formatRange(p.php, p.phpMax, "₱")
    : formatRange(p.usd, p.usdMax, "$");

export default function PricingGrid({ showCta = true }) {
  // Global currency state — null briefly means "still detecting";
  // the "···" placeholder prevents any wrong currency from flashing
  // and keeps the layout perfectly still.
  const currency = useCurrency();

  return (
    <div>
      {/* Passive indicator (not a switcher) — tells visitors which
          market's pricing they're seeing */}
      <Reveal delay={0.05}>
        <p
          data-testid="pricing-market-indicator"
          className="mono inline-block rounded-full border border-border px-4 py-1.5 text-[11px] tracking-[0.15em] text-muted-foreground uppercase"
        >
          {currency
            ? currency === "PHP"
              ? "Pricing shown in ₱ PHP — Philippines"
              : "Pricing shown in $ USD — International"
            : "Detecting your region…"}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <article
              data-testid={`pricing-card-${i + 1}`}
              className="lux-lift flex h-full flex-col rounded-xl border border-border bg-card p-7 sm:p-9 lux-shadow"
            >
              <h3 className="font-display text-2xl tracking-tight">{p.name}</h3>
              <p className="mt-4">
                <span className="mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  Starting at
                </span>
                <span
                  data-testid={`pricing-amount-${i + 1}`}
                  className="font-display mt-1 block min-h-[2.5rem] text-3xl tracking-tight"
                >
                  {currency ? formatPrice(p, currency) : "···"}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">{p.ideal}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Custom web applications — quoted individually */}
      <Reveal delay={0.08}>
        <div className="mt-5 rounded-xl border border-border bg-muted/50 p-7 sm:p-9 text-center">
          <h3 className="font-display text-2xl tracking-tight">Custom Web Application</h3>
          <p data-testid="pricing-custom-amount" className="font-display mt-3 text-xl tracking-tight">
            {currency === "USD"
              ? `Starting at $${CUSTOM_APP_USD_START.toLocaleString()}`
              : currency === "PHP"
                ? "Custom quotation"
                : "···"}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Custom quotation based on project scope and requirements — booking systems,
            dashboards, workflow tools, integrations and more.
          </p>
        </div>
      </Reveal>

      {/* The fine print, stated plainly */}
      <Reveal delay={0.12}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          All prices are starting estimates. Final quotations depend on project requirements,
          functionality, content, integrations and development scope. Hosting, domains,
          third-party services and ongoing maintenance are quoted separately unless expressly
          included.
        </p>
      </Reveal>

      {showCta && (
        <Reveal delay={0.16}>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              data-testid="pricing-cta"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Request a Project Quote <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
