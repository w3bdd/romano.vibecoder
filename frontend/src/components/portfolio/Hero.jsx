import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
import { scrollToSection } from "@/App";
import CodeRain from "@/components/portfolio/CodeRain";
import TypedTerminal from "@/components/portfolio/TypedTerminal";

const WHATSAPP_URL =
  "https://wa.me/639916848388?text=Hi%20Romano%2C%20I%27m%20interested%20in%20building%20a%20web%20project.";

// The big headline, split into lines so each can slide up out of its own mask.
const HEADLINE = ["I BUILD VIBEY,", "HIGH-VELOCITY", "WEB EXPERIENCES."];

export default function Hero() {
  // --- 3D tilt on the terminal card: follows the visitor's mouse gently ---
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 140, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 140, damping: 18 });

  const handleTilt = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    rotY.set(px * 14);
    rotX.set(-py * 14);
  };
  const resetTilt = () => {
    rotX.set(0);
    rotY.set(0);
  };

  // --- Subtle parallax: the accent blob drifts as you scroll away ---
  const { scrollYProgress } = useScroll();
  const blobY = useTransform(scrollYProgress, [0, 0.25], [0, 140]);

  return (
    <section id="top" className="grid-bg relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Soft accent glow that parallax-drifts on scroll */}
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />
      {/* Light falling-code backdrop — sits behind everything */}
      <CodeRain />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono mb-6 inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.2em] text-accent neo-shadow"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          [ AVAILABLE FOR FREELANCE & CONTRACT ]
        </motion.p>

        {/* ---------- Full-width kinetic masked headline ----------
            Font size uses clamp(): it grows with the screen width but never
            gets so big that the longest word spills off screen. */}
        <h1
          data-testid="hero-headline"
          className="font-heading font-extrabold leading-[0.95] tracking-tight text-[clamp(1.6rem,6vw,5rem)] break-words"
        >
          {HEADLINE.map((line, i) => (
            // Each line sits in an overflow-hidden "mask"; the text slides up into view.
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 2 ? (
                  <>
                    WEB <span className="text-accent">EXPERIENCES.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* ---------- Bottom row: pitch + buttons left, terminal card right ---------- */}
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-base sm:text-lg text-muted-foreground">
              Freelance web developer crafting ultra-fast, motion-driven, award-caliber
              digital products for bold founders and modern brands.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                data-testid="hero-email-cta"
                onClick={() => scrollToSection("#contact")}
                className="neo-lift neo-shadow inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-6 py-3 text-sm font-bold text-background"
              >
                START A PROJECT <ArrowUpRight size={16} />
              </button>
              <a
                data-testid="hero-whatsapp-cta"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-lift neo-shadow inline-flex items-center gap-2 border-2 border-foreground bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
              >
                <MessageCircle size={16} /> WHATSAPP ME
              </a>
              <span className="mono inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={13} /> Bamban, Tarlac, PH
              </span>
            </div>
          </motion.div>

          {/* ---------- 3D tilting terminal card ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ perspective: 1000 }}
            className="hidden w-full max-w-md shrink-0 lg:block"
          >
          <motion.div
            data-testid="hero-terminal-card"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
            className="neo-shadow-lg border-2 border-foreground bg-card"
          >
            {/* Window title bar */}
            <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-accent border border-foreground" />
              <span className="h-3 w-3 rounded-full bg-muted border border-foreground" />
              <span className="mono ml-2 text-[10px] tracking-widest text-muted-foreground">
                romano@vibe-coder — zsh
              </span>
            </div>
            {/* Animated terminal: types commands and builds the app on loop */}
            <TypedTerminal />
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
