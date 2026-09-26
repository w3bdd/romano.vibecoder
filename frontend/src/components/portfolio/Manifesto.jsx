import { motion } from "framer-motion";

// The "about" story told as numbered manifesto chapters.
const CHAPTERS = [
  {
    chapter: "#01",
    title: "The Vibe Coding Ethos",
    text: "Coding isn't just typing logic — it's orchestrating rhythm, feedback, and atmosphere. I combine deep engineering discipline with high-taste design sensibility so every click feels tactile and alive.",
  },
  {
    chapter: "#02",
    title: "Rooted in Bamban, Building Worldwide",
    text: "Operating out of Bamban, Tarlac, Philippines, working asynchronously with clients across US, Europe, and Asia-Pacific time zones — transparent communication, relentless focus on outcomes.",
  },
  {
    chapter: "#03",
    title: "Speed, Security & Pure Craft",
    text: "No bloated frameworks, no unnecessary weight. Clean architecture, GPU-accelerated motion, rigid security practices, and instant loading speeds on every single build.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="border-y-2 border-foreground bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left column sticks while chapters scroll past */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mono text-xs tracking-[0.25em] text-accent">[ MANIFESTO ]</p>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            HOW I WORK, <span className="text-accent">IN THREE CHAPTERS.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            I'm Romano Galvan — a vibe coder who ships fast, communicates clearly,
            and treats every project like it's going up for an award.
          </p>

          {/* Portrait cutout (transparent WebP, 89KB) — tilted polaroid style
              with a hard offset frame behind it, pure neo-brutalism */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mt-10 max-w-sm"
          >
            {/* Offset frame that peeks out behind the photo */}
            <div className="grid-bg absolute inset-0 translate-x-3 translate-y-3 border-2 border-foreground bg-accent/15" />
            <img
              src={`${process.env.PUBLIC_URL}/images/romano-portrait.webp`}
              alt="Romano Galvan coding on his laptop with vibe coder stickers"
              loading="lazy"
              data-testid="manifesto-portrait"
              className="relative w-full border-2 border-foreground bg-card"
            />
            {/* Little badge pinned on top, like tape on a polaroid */}
            <span className="mono absolute -top-3 left-4 border-2 border-foreground bg-accent px-2.5 py-1 text-[10px] font-bold tracking-widest text-accent-foreground">
              ROMANO // IRL
            </span>
          </motion.div>
        </motion.div>

        <div>
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.chapter}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`py-8 ${i > 0 ? "border-t-2 border-foreground/15" : ""}`}
            >
              <span className="mono text-3xl sm:text-4xl font-bold text-outline">{c.chapter}</span>
              <h3 className="font-heading mt-3 text-xl sm:text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
