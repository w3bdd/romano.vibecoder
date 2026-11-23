import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";

const SERVICES = [
  {
    n: "01",
    title: "Website Design & Development",
    desc: "Beautiful, responsive websites built around your brand, your customers and your business objectives.",
    deliverables: [
      "Business websites",
      "Corporate websites",
      "Landing pages",
      "Portfolio websites",
      "E-commerce websites",
      "Responsive website development",
    ],
  },
  {
    n: "02",
    title: "Web Applications & Systems",
    desc: "Custom-built digital tools that simplify operations, improve workflows and support business growth.",
    deliverables: [
      "Custom web applications",
      "Booking and reservation systems",
      "Admin dashboards",
      "E-commerce systems",
      "Business workflow tools",
      "API integrations",
    ],
  },
  {
    n: "03",
    title: "Interactive 3D Experiences",
    desc: "Distinctive websites featuring immersive visuals, refined motion and engaging interactions.",
    deliverables: [
      "Interactive 3D hero sections",
      "Three-dimensional product presentations",
      "Scroll-based animations",
      "Interactive web experiences",
      "Motion-driven landing pages",
    ],
  },
  {
    n: "04",
    title: "Website Optimization & Maintenance",
    desc: "Keep your website secure, updated, accessible and performing at its best.",
    deliverables: [
      "Website redesign",
      "Performance optimization",
      "Technical SEO improvements",
      "Website maintenance",
      "Backup and monitoring assistance",
      "Technical support",
    ],
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services | RomanoGalvan.com"
        description="Website design and development, custom web applications, interactive 3D experiences, and website optimization and maintenance for growing businesses."
        path="/services"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead
              eyebrow="Services"
              title="Digital Solutions. Thoughtfully Engineered."
              lead="We help businesses establish, improve and expand their digital presence through modern web technologies and purposeful design."
            />
          </Reveal>
        </div>
      </section>

      {/* Oversized numbered editorial rows — no generic card grids */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="divide-y divide-border">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.04}>
                <article
                  data-testid={`service-detail-${s.n}`}
                  className="group grid gap-6 py-10 sm:py-14 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-12"
                >
                  {/* Oversized ghost number */}
                  <span className="font-display select-none text-7xl sm:text-8xl leading-none text-foreground/10 transition-colors duration-500 group-hover:text-foreground/25">
                    {s.n}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{s.title}</h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                  <div>
                    <p className="mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                      Deliverables may include
                    </p>
                    <ul className="mt-3 space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="mt-2 h-px w-4 shrink-0 bg-foreground/40" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="py-14 text-center">
              <Link
                to="/contact"
                data-testid="services-cta"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Tell us what you want to build <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
