import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import { PROJECTS } from "@/config/business";

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Portfolio | RomanoGalvan.com"
        description="Selected digital projects and development work demonstrating our approach to design, functionality and technology."
        path="/portfolio"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead
              eyebrow="Portfolio"
              title="Selected Work. Thoughtful Solutions."
              lead="Explore selected digital projects, experiments and development work demonstrating our approach to design, functionality and technology."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mono mt-6 inline-block rounded-full border border-border px-4 py-1.5 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              Demonstration projects — self-initiated concept work
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial alternating layouts — each project composed differently */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl space-y-6 px-5 py-16 sm:py-20">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`portfolio-card-${i + 1}`}
                className="group grid items-stretch overflow-hidden rounded-xl border border-border bg-card lux-shadow lux-lift md:grid-cols-2"
              >
                <div
                  className={`relative flex min-h-[240px] items-center justify-center border-border bg-muted/60 ${
                    i % 2 ? "md:order-2 md:border-l" : "md:border-r"
                  } border-b md:border-b-0`}
                >
                  <span className="font-display select-none text-[9rem] leading-none text-foreground/10 transition-transform duration-700 group-hover:scale-110">
                    {p.monogram}
                  </span>
                  <span className="mono absolute left-5 top-5 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {String(i + 1).padStart(2, "0")} — Live
                  </span>
                  <ArrowUpRight
                    className="absolute right-5 top-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={18}
                  />
                </div>
                <div className="p-7 sm:p-10">
                  <p className="mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {p.category}
                  </p>
                  <h2 className="font-display mt-3 text-2xl sm:text-3xl tracking-tight">{p.name}</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="mono rounded-full border border-border px-2.5 py-1 text-[10px] tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Visit live site <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
