import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Sample projects — real live sites Romano built. Each card links out to the
// live site in a new tab. The "artwork" is pure CSS (giant letter + glow),
// so the page stays light and fast.
const PROJECTS = [
  {
    id: "project-1",
    monogram: "C",
    title: "CleverHouse Philippines",
    category: "SMART HOME & SOLAR",
    outcome: "Smart living. Secured. Powered.",
    desc: "Company site for a smart home, CCTV, solar, and electrical engineering provider serving Aurora and Central Luzon.",
    url: "https://w3bdd.github.io/cleverhouse.ph/",
    glow: "bg-emerald-500/25",
    tags: ["Smart Home", "Solar", "CCTV"],
  },
  {
    id: "project-2",
    monogram: "R",
    title: "RenovaLife Dialysis Center",
    category: "HEALTHCARE",
    outcome: "Renewing lives. Restoring hope.",
    desc: "Website for a PhilHealth-accredited dialysis center focused on dignity, comfort, and human-centered healing.",
    url: "https://w3bdd.github.io/renovalife.ph/",
    glow: "bg-sky-500/25",
    tags: ["Healthcare", "PhilHealth", "Patient Care"],
  },
  {
    id: "project-3",
    monogram: "A",
    title: "Aureon Architecture & Builders",
    category: "ARCHITECTURE & CONSTRUCTION",
    outcome: "Design. Build. Endure.",
    desc: "Site for a family-owned architectural and construction firm serving Central Luzon and beyond since 2016.",
    url: "https://w3bdd.github.io/aureon.ar/",
    glow: "bg-amber-500/25",
    tags: ["Architecture", "Design & Build", "Construction"],
  },
  {
    id: "project-4",
    monogram: "X",
    title: "CoreGridX Technologies",
    category: "IT INFRASTRUCTURE",
    outcome: "Infrastructure, engineered for the long run.",
    desc: "Corporate site for a firm designing, deploying, securing, and managing server, network, and data center environments.",
    url: "https://w3bdd.github.io/coregridx.it/",
    glow: "bg-orange-500/25",
    tags: ["Servers", "Networks", "Data Centers"],
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
        <p className="mono text-xs tracking-[0.25em] text-accent">[ SAMPLE PROJECTS ]</p>
        <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          SITES I'VE <span className="text-accent">SHIPPED.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
          Real sample projects, live on the web — click any card to open the site in a new tab.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.id}
            data-testid={`project-card-${p.id}`}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
            className="neo-lift neo-shadow group block border-2 border-foreground bg-card"
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
