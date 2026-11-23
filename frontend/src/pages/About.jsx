import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import { BUSINESS } from "@/config/business";

export default function About() {
  return (
    <>
      <Seo
        title="About | RomanoGalvan.com"
        description="RomanoGalvan.com is an independent web development and digital solutions practice helping businesses establish and strengthen their digital presence."
        path="/about"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead
              eyebrow="About"
              title="Built Around Ideas. Driven by Technology. Focused on Results."
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_0.8fr]">
          {/* Story + philosophy */}
          <div>
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  RomanoGalvan.com is an independent web development and digital solutions
                  practice focused on helping businesses establish and strengthen their
                  digital presence.
                </p>
                <p>
                  We believe that great websites should bring together visual quality,
                  reliable functionality, and a clear understanding of business goals.
                </p>
                <p>
                  From professional business websites to custom web applications and
                  interactive digital experiences, our approach is centered on creating
                  practical solutions with lasting value.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 border-t border-border pt-8">
                <p className="mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                  Our philosophy
                </p>
                <div className="mt-4 space-y-3">
                  <p className="font-display text-xl font-medium tracking-tight">
                    Good design should communicate clearly.
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight">
                    Good technology should solve real problems.
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight">
                    Great digital experiences should bring both together.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 border-t border-border pt-8">
                <p className="mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                  Our commitment
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Every project begins with understanding what the client wants to achieve.
                  We value clear communication, thoughtful development, practical solutions
                  and continuous improvement.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Portrait — the person behind the practice */}
          <Reveal delay={0.12}>
            <figure className="lg:sticky lg:top-28 lg:self-start">
              <img
                src={`${process.env.PUBLIC_URL}/images/romano-portrait.webp`}
                alt="Romano Galvan, founder of RomanoGalvan.com, working on his laptop"
                loading="lazy"
                data-testid="about-portrait"
                className="w-full rounded-xl border border-border bg-card lux-shadow"
              />
              <figcaption className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Romano Galvan — Founder</span>
                <span className="mono">{BUSINESS.address.split("—")[0].trim()}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}
