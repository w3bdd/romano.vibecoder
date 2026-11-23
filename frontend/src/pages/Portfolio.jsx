import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";

// Sample projects — real live sites, clearly labeled as self-initiated
// demonstration work (no invented clients, results, or testimonials).
const PROJECTS = [
  {
    name: "CleverHouse Philippines",
    category: "Business Website — Smart Home & Solar",
    desc: "Company website for a smart home, CCTV, solar, and electrical engineering provider serving Aurora and Central Luzon.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/cleverhouse.ph/",
    monogram: "C",
  },
  {
    name: "RenovaLife Dialysis Center",
    category: "Business Website — Healthcare",
    desc: "Website for a PhilHealth-accredited dialysis center focused on dignity, comfort, and human-centered healing.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/renovalife.ph/",
    monogram: "R",
  },
  {
    name: "Aureon Architecture & Builders",
    category: "Business Website — Architecture & Construction",
    desc: "Website for a family-owned architectural and construction firm serving Central Luzon and beyond since 2016.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/aureon.ar/",
    monogram: "A",
  },
  {
    name: "CoreGridX Technologies",
    category: "Business Website — IT Infrastructure",
    desc: "Corporate website for a firm designing, deploying, securing, and managing server, network, and data center environments.",
    tech: ["React", "Responsive Design", "GitHub Pages"],
    url: "https://w3bdd.github.io/coregridx.it/",
    monogram: "X",
  },
];

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

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`portfolio-card-${i + 1}`}
                  className="lux-lift group block h-full rounded-xl border border-border bg-card lux-shadow"
                >
                  {/* Minimal typographic preview — no stock imagery needed */}
                  <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-xl border-b border-border bg-muted/60 sm:h-52">
                    <span className="font-display select-none text-8xl font-medium text-foreground/10 transition-transform duration-500 group-hover:scale-110">
                      {p.monogram}
                    </span>
                    <ArrowUpRight
                      className="absolute right-4 top-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      size={18}
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                      {p.category}
                    </p>
                    <h2 className="font-display mt-2 text-xl font-medium tracking-tight">{p.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="mono rounded-full border border-border px-2.5 py-1 text-[10px] tracking-wider text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Visit live site <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
