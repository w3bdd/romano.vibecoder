import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import HeroVisual from "@/components/three/HeroVisual";

const SERVICES_OVERVIEW = [
  {
    title: "Website Design & Development",
    desc: "Beautiful, responsive websites built around your brand, your customers, and your business objectives.",
  },
  {
    title: "Web Applications & Systems",
    desc: "Custom-built digital tools that simplify operations, improve workflows, and support business growth.",
  },
  {
    title: "Interactive 3D Experiences",
    desc: "Distinctive websites featuring immersive visuals, refined motion, and engaging interactions.",
  },
  {
    title: "Optimization & Maintenance",
    desc: "Keep your website secure, updated, accessible, and performing at its best.",
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

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                Web Development & Digital Solutions
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                data-testid="hero-headline"
                className="font-display mt-5 text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight"
              >
                Design. Develop. <span className="italic text-muted-foreground">Elevate.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-display mt-6 text-xl sm:text-2xl text-muted-foreground">
                Premium Web Experiences. Powerful Digital Solutions.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                We create beautifully crafted websites and intelligent digital solutions that
                help businesses build credibility, connect with customers, and grow in an
                increasingly digital world.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  data-testid="hero-cta-consultation"
                  className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
                >
                  Get a Free Consultation
                </Link>
                <Link
                  to="/portfolio"
                  data-testid="hero-cta-work"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-foreground"
                >
                  Explore Our Work <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* The chrome 3D sculpture (lazy-loaded, with static fallback) */}
          <Reveal delay={0.2} className="h-[320px] sm:h-[440px]">
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

      {/* ---------- SERVICES OVERVIEW ---------- */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Services"
              title="Digital solutions designed around your business."
              lead="From professional websites to custom applications and interactive digital experiences, we create solutions that help businesses move forward."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {SERVICES_OVERVIEW.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <Link
                  to="/services"
                  data-testid={`home-service-card-${i + 1}`}
                  className="lux-lift block rounded-xl border border-border bg-card p-7 sm:p-8 lux-shadow"
                >
                  <span className="mono text-xs text-muted-foreground">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Why choose us"
              title="Technology with purpose. Design with intention."
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-lg font-medium tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DEVELOPMENT PROCESS ---------- */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <Reveal>
            <SectionHead eyebrow="Process" title="How a project comes together." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <span className="mono text-xs text-muted-foreground">{p.n}</span>
                  <h3 className="font-display mt-2 text-lg font-medium tracking-tight">{p.title}</h3>
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
            <h2 className="font-display mx-auto max-w-2xl text-3xl sm:text-5xl font-medium tracking-tight">
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
            <Link
              to="/contact"
              data-testid="home-final-cta"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Let's Talk About Your Project <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
