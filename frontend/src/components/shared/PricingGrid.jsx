import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { BUSINESS, PACKAGES, CUSTOM_APP_USD_START } from "@/config/business";
import { detectCurrency, getForcedCurrency, getManualCurrency, saveManualCurrency } from "@/config/geo";

// ---------------------------------------------------------------
// Pricing grid — shared by the homepage pricing section and the
// Pricing page. Prices are the APPROVED fixed figures from
// config/business.js (PHP for the Philippines, fixed USD for
// international — not conversions). Currency is chosen by (in
// order): ?cc= test override (dev hosts only) → saved manual
// choice → Cloudflare edge geolocation → USD fallback.
// ---------------------------------------------------------------

const formatRange = (min, max, symbol) =>
  max
    ? `${symbol} ${min.toLocaleString()}–${max.toLocaleString()}`
    : `${symbol} ${min.toLocaleString()}`;

const formatPrice = (p, currency) =>
  currency === "PHP"
    ? formatRange(p.php, p.phpMax, "PHP")
    : formatRange(p.usd, p.usdMax, "USD");

export default function PricingGrid({ showCta = true }) {
  // Priority: ?cc= test override → saved manual choice → geo lookup.
  // ("···" placeholder keeps the layout from jumping while we detect.)
  const [currency, setCurrency] = useState(() => getForcedCurrency() || getManualCurrency());

  useEffect(() => {
    if (currency) return; // a saved manual choice always wins — never override it
    let alive = true;
    detectCurrency().then((c) => {
      if (alive) setCurrency(c);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clicking PHP/USD is a manual choice — remembered across visits.
  const choose = (c) => {
    saveManualCurrency(c);
    setCurrency(c);
  };

  return (
    <div>
      {/* Currency switch — works before, during and after detection */}
      <Reveal delay={0.05}>
        <div
          data-testid="pricing-currency-toggle"
          className="inline-flex rounded-full border border-border p-1"
          role="group"
          aria-label="Pricing currency"
        >
          {["PHP", "USD"].map((c) => (
            <button
              key={c}
              data-testid={`currency-${c.toLowerCase()}`}
              onClick={() => choose(c)}
              className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                currency === c ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
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
              ? `Starting at USD ${CUSTOM_APP_USD_START.toLocaleString()}`
              : "Custom quotation"}
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
