import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import Magnetic from "@/components/shared/Magnetic";
import HeroVisual from "@/components/three/HeroVisual";
import { PROJECTS } from "@/config/business";

// Smooth-scroll helper — uses Lenis when running, browser fallback otherwise.
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

const SERVICES_OVERVIEW = [
  {
    n: "01",
    title: "Website Design & Development",
    desc: "Beautiful, responsive websites built around your brand, your customers and your business objectives.",
  },
  {
    n: "02",
    title: "Web Applications & Systems",
    desc: "Custom-built digital tools that simplify operations, improve workflows and support business growth.",
  },
  {
    n: "03",
    title: "Interactive 3D Experiences",
    desc: "Distinctive websites featuring immersive visuals, refined motion and engaging interactions.",
  },
  {
    n: "04",
    title: "Website Optimization & Maintenance",
    desc: "Keep your website secure, updated, accessible and performing at its best.",
  },
];

const WHY_US = [
  { title: "Thoughtful design", desc: "Every element has a purpose." },
  { title: "Business-focused development", desc: "We build around real business needs." },
  { title: "Modern technology", desc: "We use appropriate modern tools and frameworks." },
  { title: "Responsive experiences", desc: "Designed for desktops, tablets and smartphones." },
  { title: "Performance-conscious", desc: "Beautiful websites should also be fast and accessible." },
  { title: "Personalized collaboration", desc: "Every project begins with understanding your requirements." },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "Understand your business, audience and objectives." },
  { n: "02", title: "Strategize", desc: "Define the scope, features and development direction." },
  { n: "03", title: "Design", desc: "Create a visual experience aligned with your brand." },
  { n: "04", title: "Develop", desc: "Build, integrate and refine the website." },
  { n: "05", title: "Launch", desc: "Test, optimize and publish your website." },
  { n: "06", title: "Support", desc: "Provide ongoing maintenance and improvements when required." },
];

export default function Home({ dark }) {
  return (
    <>
      <Seo
        title="RomanoGalvan.com | Web Development & Digital Solutions"
        description="Premium web development, custom web applications and interactive 3D website experiences for Philippine and international businesses."
        path="/"
      />

      {/* ---------- HERO: editorial composition + platinum sculpture ---------- */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                Independent Digital Studio
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                data-testid="hero-headline"
                className="font-display mt-6 text-5xl sm:text-6xl lg:text-[4.6rem] leading-[1.04] tracking-tight"
              >
                Digital experiences,
                <br />
                <span className="italic text-muted-foreground">crafted with intention.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-display mt-6 text-xl sm:text-2xl text-muted-foreground">
                Design. Develop. Elevate.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                We design and develop distinctive websites and intelligent digital solutions
                that help businesses build credibility, connect with customers, and grow.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnetic>
                  <Link
                    to="/contact"
                    data-testid="hero-cta-consultation"
                    className="inline-block rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
                  >
                    Start a Project
                  </Link>
                </Magnetic>
                <Magnetic>
                  <button
                    onClick={() => scrollToId("selected-work")}
                    data-testid="hero-cta-work"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground"
                  >
                    Explore Selected Work <ArrowRight size={15} />
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* The platinum sculpture — lazy-loaded 3D with static fallback */}
          <Reveal delay={0.2} className="h-[340px] sm:h-[480px]">
            <HeroVisual dark={dark} />
          </Reveal>
        </div>
      </section>

      {/* ---------- INTRODUCTION ---------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Introduction"
              title="Digital experiences designed to make an impression."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 grid max-w-4xl gap-6 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
              <p>
                Your website is more than an online presence. It's an opportunity to establish
                trust, communicate your value, and turn visitors into customers.
              </p>
              <p>
                At RomanoGalvan.com, we combine thoughtful design, modern development
                technologies, and practical business thinking to create digital experiences
                that look exceptional and work beautifully.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SELECTED WORK (immediately after the intro) ---------- */}
      <section id="selected-work" className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Selected Work"
              title="Selected Work. Thoughtful Solutions."
              lead="Real sample projects, live on the web — self-initiated concept work demonstrating our approach."
            />
          </Reveal>

          {/* Editorial alternating layouts — each project composed differently */}
          <div className="mt-14 space-y-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={0.04}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`home-project-${i + 1}`}
                  className="group grid items-stretch overflow-hidden rounded-xl border border-border bg-card lux-shadow lux-lift md:grid-cols-2"
                >
                  <div
                    className={`relative flex min-h-[220px] items-center justify-center border-border bg-muted/60 ${
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
                    <h3 className="font-display mt-3 text-2xl sm:text-3xl tracking-tight">{p.name}</h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Visit live site <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-10 text-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-muted-foreground"
              >
                View the full portfolio <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SERVICES: oversized numbered editorial rows ---------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Services"
              title="Digital solutions designed around your business."
              lead="From professional websites to custom applications and interactive digital experiences, we create solutions that help businesses move forward."
            />
          </Reveal>

          <div className="mt-14 divide-y divide-border border-y border-border">
            {SERVICES_OVERVIEW.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04}>
                <Link
                  to="/services"
                  data-testid={`home-service-row-${s.n}`}
                  className="group grid items-center gap-4 py-8 sm:py-10 lg:grid-cols-[auto_1fr_auto]"
                >
                  <span className="font-display select-none text-6xl sm:text-7xl leading-none text-foreground/10 transition-colors duration-500 group-hover:text-foreground/25">
                    {s.n}
                  </span>
                  <div className="lg:pl-8">
                    <h3 className="font-display text-2xl sm:text-3xl tracking-tight">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowRight
                    className="hidden text-muted-foreground transition-transform duration-300 group-hover:translate-x-2 lg:block"
                    size={22}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Why choose us"
              title="Technology with purpose. Design with intention."
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-lg tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DEVELOPMENT PROCESS ---------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead eyebrow="Process" title="How a project comes together." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <span className="mono text-xs text-muted-foreground">{p.n}</span>
                  <h3 className="font-display mt-2 text-lg tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28 text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-2xl text-3xl sm:text-5xl tracking-tight">
              Have an idea? <span className="italic text-muted-foreground">Let's bring it to life.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Whether you're starting a new business, improving your existing website, or
              exploring a custom digital solution, let's discuss how we can help.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Magnetic>
              <Link
                to="/contact"
                data-testid="home-final-cta"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Let's Talk About Your Project <ArrowRight size={15} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
