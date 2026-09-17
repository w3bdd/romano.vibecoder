import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Selected work. These are SAMPLE projects with generated copy —
// replace titles, outcomes, and tags with your real case studies anytime.
// The "artwork" is pure CSS (giant letter + glow), so the page stays light and fast.
const PROJECTS = [
  {
    id: "project-1",
    monogram: "K",
    title: "KINETIC — AI Workflow Engine",
    category: "WEB APPLICATION",
    outcome: "+320% user engagement · 0.4s first paint",
    desc: "High-speed dashboard and landing suite for an autonomous AI workflow orchestrator.",
    glow: "bg-orange-500/25",
    tags: ["React", "FastAPI", "Framer Motion"],
  },
  {
    id: "project-2",
    monogram: "P",
    title: "PULSE — Web3 Trading Terminal",
    category: "FINTECH PLATFORM",
    outcome: "$4.2M transaction volume · 99.99% uptime",
    desc: "Dark-mode, real-time analytics interface with custom charting and brutalist data cards.",
    glow: "bg-emerald-500/25",
    tags: ["TypeScript", "Recharts", "Tailwind"],
  },
  {
    id: "project-3",
    monogram: "A",
    title: "AURA — Digital Creative Agency",
    category: "AWARD-STYLE SITE",
    outcome: "Site of the Day nominee · +180% inbound leads",
    desc: "Experimental agency website with kinetic typography, momentum scroll, and cursor physics.",
    glow: "bg-purple-500/25",
    tags: ["Lenis", "Framer Motion", "CSS Grid"],
  },
  {
    id: "project-4",
    monogram: "S",
    title: "SOLARIS — Sustainable Energy Portal",
    category: "SAAS PLATFORM",
    outcome: "-65% bounce rate · 100/100 Lighthouse",
    desc: "Clean dashboard tracking live solar grid output and carbon-reduction metrics.",
    glow: "bg-amber-500/25",
    tags: ["React", "Tailwind", "Recharts"],
  },
];

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="mono text-xs tracking-[0.25em] text-accent">[ SELECTED WORK ]</p>
        <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          PROJECTS WITH <span className="text-accent">OUTCOMES.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
          Not just screenshots — every build is measured by what it did for the business.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            data-testid={`project-card-${p.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
            className="neo-lift neo-shadow group border-2 border-foreground bg-card"
          >
            {/* CSS-only "cover art": dark canvas, glow, giant ghost letter */}
            <div className="relative h-44 sm:h-52 overflow-hidden border-b-2 border-foreground bg-zinc-950">
              <div className={`absolute inset-0 ${p.glow} blur-2xl`} />
              <div className="grid-bg absolute inset-0 opacity-60" />
              <span className="font-heading absolute -bottom-8 -left-2 select-none text-[9rem] sm:text-[11rem] font-extrabold leading-none text-white/10 transition-transform duration-500 group-hover:-translate-y-2">
                {p.monogram}
              </span>
              <span className="mono absolute left-4 top-4 border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] tracking-widest text-white">
                {p.category}
              </span>
              <ArrowUpRight
                className="absolute right-4 top-4 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                size={20}
              />
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight">{p.title}</h3>
              {/* The outcome strip — the part clients actually care about */}
              <p className="mono mt-2 inline-block border-2 border-foreground bg-accent px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide text-accent-foreground">
                {p.outcome}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="mono border border-foreground bg-background px-2 py-0.5 text-[10px] tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
