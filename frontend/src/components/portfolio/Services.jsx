import { motion } from "framer-motion";

// What Romano sells. Swap text here anytime — the layout adapts automatically.
const SERVICES = [
  {
    number: "01",
    title: "Custom Vibe Coding & Web Apps",
    desc: "Bespoke React web applications built with pixel precision, snappy reactivity, and clean modern architecture.",
    tags: ["React", "Tailwind CSS", "FastAPI", "TypeScript"],
  },
  {
    number: "02",
    title: "Kinetic Landing Pages & Portfolios",
    desc: "High-converting, award-worthy marketing sites with kinetic motion, buttery smooth scroll, and immersive micro-interactions.",
    tags: ["Framer Motion", "Lenis", "Awwwards Style", "SEO Ready"],
  },
  {
    number: "03",
    title: "Performance & Frontend Refactoring",
    desc: "Turning heavy, sluggish websites into light-speed products with sub-second loads and zero layout shift.",
    tags: ["Lighthouse 100", "Core Web Vitals", "Code Splitting"],
  },
  {
    number: "04",
    title: "UI/UX Systems & Prototyping",
    desc: "High-trust design systems, dark/light theme architecture, and accessible components that feel tactile and alive.",
    tags: ["Design Systems", "Shadcn/UI", "WCAG AA"],
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="mono text-xs tracking-[0.25em] text-accent">[ SERVICES ]</p>
        <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          WHAT I CAN BUILD <span className="text-accent">FOR YOU.</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.number}
            data-testid={`service-card-${s.number}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="neo-lift neo-shadow border-2 border-foreground bg-card p-7 sm:p-9"
          >
            <span className="mono text-sm font-bold text-accent">[ {s.number} ]</span>
            <h3 className="font-heading mt-3 text-xl sm:text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="mono border border-foreground bg-background px-2.5 py-1 text-[10px] tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
