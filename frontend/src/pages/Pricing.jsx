import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import { BUSINESS, PACKAGES } from "@/config/business";

// Formats a PHP price in the visitor's chosen currency.
// USD figures are approximate conversions for international reference only.
const formatPrice = (php, currency) => {
  if (currency === "PHP") return `PHP ${php.toLocaleString()}`;
  return `≈ USD ${Math.round(php / BUSINESS.phpPerUsd).toLocaleString()}`;
};

export default function Pricing() {
  const [currency, setCurrency] = useState("PHP");

  return (
    <>
      <Seo
        title="Pricing | RomanoGalvan.com"
        description="Website packages starting at PHP 7,500 — starter, professional and premium websites, 3D interactive experiences, and custom web applications."
        path="/pricing"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead
              eyebrow="Pricing"
              title="The Right Solution for Your Next Stage of Growth."
              lead="Every business has different needs. Choose a starting package that fits your objectives, or request a customized proposal for your project."
            />
          </Reveal>

          {/* Currency switch — PHP for local clients, USD for international */}
          <Reveal delay={0.1}>
            <div
              data-testid="pricing-currency-toggle"
              className="mt-8 inline-flex rounded-full border border-border p-1"
              role="group"
              aria-label="Pricing currency"
            >
              {["PHP", "USD"].map((c) => (
                <button
                  key={c}
                  data-testid={`currency-${c.toLowerCase()}`}
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                    currency === c ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <article
                  data-testid={`pricing-card-${i + 1}`}
                  className="lux-lift flex h-full flex-col rounded-xl border border-border bg-card p-7 sm:p-9 lux-shadow"
                >
                  <h2 className="font-display text-2xl font-medium tracking-tight">{p.name}</h2>
                  <p className="mt-4">
                    <span className="mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                      Starting at
                    </span>
                    <span
                      data-testid={`pricing-amount-${i + 1}`}
                      className="font-display mt-1 block text-3xl font-medium tracking-tight"
                    >
                      {formatPrice(p.php, currency)}
                    </span>
                  </p>
                  {p.note && <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>}
                  <ul className="mt-6 flex-1 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-2 h-px w-4 shrink-0 bg-foreground/40" />
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
          <Reveal delay={0.1}>
            <div className="mt-5 rounded-xl border border-border bg-muted/50 p-7 sm:p-9 text-center">
              <h2 className="font-display text-2xl font-medium tracking-tight">Custom Web Application</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Custom quotation based on project scope and requirements — booking systems,
                dashboards, workflow tools, integrations and more.
              </p>
            </div>
          </Reveal>

          {/* The fine print, stated plainly */}
          <Reveal delay={0.14}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
              All prices are starting estimates. Final quotations depend on project requirements,
              functionality, content, integrations and development scope. Hosting, domains,
              third-party services and ongoing maintenance are quoted separately unless expressly
              included.{currency === "USD" && ` USD figures are approximate conversions at ₱${BUSINESS.phpPerUsd} = $1, for reference only.`}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
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
        </div>
      </section>
    </>
  );
}
