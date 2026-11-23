import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import PricingGrid from "@/components/shared/PricingGrid";

export default function Pricing() {
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
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          {/* Shared pricing grid: geo-aware default currency + manual switch */}
          <PricingGrid />
        </div>
      </section>
    </>
  );
}
