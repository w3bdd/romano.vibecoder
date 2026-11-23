import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import Seo from "@/components/shared/Seo";
import Reveal from "@/components/shared/Reveal";
import SectionHead from "@/components/shared/SectionHead";
import { BUSINESS } from "@/config/business";

// ---------------------------------------------------------------
// Inquiry delivery. Two modes, chosen by REACT_APP_CONTACT_MODE:
//   "web3forms" (default) — posts to Web3Forms, a free service that
//     emails each inquiry to romano.vibecoder@gmail.com. Works on
//     static hosting (GitHub Pages), key injected at build time.
//   "smtp" — posts to your own FastAPI backend (/api/contact), which
//     validates, stores a backup in MongoDB, and emails via YOUR
//     private mail server. Use this on your VPS.
// No keys or credentials ever appear in the frontend code.
// ---------------------------------------------------------------
const CONTACT_MODE = process.env.REACT_APP_CONTACT_MODE || "web3forms";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || "";
const BACKEND_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/api/contact`;

const PROJECT_TYPES = [
  "Business website",
  "Corporate website",
  "Landing page",
  "E-commerce website",
  "Web application",
  "3D interactive website",
  "Website redesign",
  "Maintenance and optimization",
  "Other",
];

const BUDGETS = [
  "Below PHP 10,000",
  "PHP 10,000–25,000",
  "PHP 25,000–50,000",
  "PHP 50,000–100,000",
  "Above PHP 100,000",
  "International / custom budget",
];

const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "Flexible"];
const CONTACT_METHODS = ["Email", "WhatsApp", "Either is fine"];

const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "Project timelines depend on complexity and requirements. A typical business website may take approximately one to three weeks after requirements and content are finalized.",
  },
  {
    q: "Will my website work on mobile devices?",
    a: "Yes. Websites are designed to adapt to desktop, tablet and mobile screen sizes.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We can review your existing website and recommend design, usability, performance and functionality improvements.",
  },
  {
    q: "Do you offer 3D animated websites?",
    a: "Yes. We can develop interactive websites with selected 3D elements, animation and motion effects, depending on the project's objectives and performance requirements.",
  },
  {
    q: "Can I update my website after launch?",
    a: "Yes. We can discuss content management options and ongoing support depending on your website's architecture.",
  },
  {
    q: "Do you provide website maintenance?",
    a: "Yes. Maintenance packages can include updates, backups, monitoring and technical assistance, depending on the agreed service scope.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We welcome project inquiries from both Philippine and international businesses.",
  },
  {
    q: "How do I get started?",
    a: "Submit the project inquiry form. We'll review your requirements and discuss the next steps.",
  },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  country: "",
  projectType: "",
  budget: "",
  timeline: "",
  contactMethod: "",
  message: "",
  website: "", // honeypot — humans never see this field
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    // Honeypot check: the hidden "website" field is invisible to humans,
    // so a filled one means a bot — pretend success and discard quietly.
    if (form.website.trim()) {
      toast.success("Inquiry sent! We'll review your requirements and get back to you.");
      setForm(EMPTY_FORM);
      return;
    }

    setSending(true);
    try {
      if (CONTACT_MODE === "smtp") {
        // VPS mode: your own backend validates, stores, and emails via SMTP.
        await axios.post(BACKEND_ENDPOINT, form);
      } else {
        // Static mode (GitHub Pages): Web3Forms turns the inquiry into an email.
        if (!WEB3FORMS_KEY || WEB3FORMS_KEY.includes("your-access-key")) {
          toast.error("The form isn't configured yet — please reach out via email or WhatsApp.");
          return;
        }
        const res = await axios.post(
          WEB3FORMS_ENDPOINT,
          {
            access_key: WEB3FORMS_KEY,
            subject: `Project inquiry (${form.projectType || "General"}) from ${form.name}`,
            from_name: "RomanoGalvan.com Inquiry Form",
            name: form.name,
            email: form.email,
            company: form.company || "—",
            country: form.country || "—",
            project_type: form.projectType || "Not specified",
            budget: form.budget || "Not specified",
            timeline: form.timeline || "Not specified",
            preferred_contact: form.contactMethod || "Email",
            message: form.message,
            botcheck: "", // Web3Forms' own bot trap (always empty for humans)
          },
          { headers: { "Content-Type": "application/json", Accept: "application/json" } }
        );
        // Only claim success when the service actually confirms delivery.
        if (!res.data.success) throw new Error(res.data.message);
      }
      toast.success("Inquiry sent! We'll review your requirements and discuss the next steps.");
      setForm(EMPTY_FORM);
    } catch (err) {
      const detail = err?.response?.data?.detail || err?.response?.data?.message;
      toast.error(
        typeof detail === "string" ? detail : "Couldn't send right now — please try WhatsApp instead."
      );
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm transition-colors focus:outline-none focus:border-foreground/50 placeholder:text-muted-foreground";
  const labelCls = "mono mb-1.5 block text-[11px] tracking-[0.2em] text-muted-foreground uppercase";

  return (
    <>
      <Seo
        title="Contact | RomanoGalvan.com"
        description="Start your project — send a project inquiry to RomanoGalvan.com. Web development, web applications and 3D experiences for Philippine and international businesses."
        path="/contact"
      />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead
              eyebrow="Contact"
              title="Let's Create Something Exceptional."
              lead="Whether you're starting a new business, improving your existing website, or exploring a custom digital solution, let's discuss how we can help."
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
          {/* ---------- Direct channels ---------- */}
          <Reveal>
            <div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Tell us about your project, your goals, and what you have in mind. We'll
                review your requirements and discuss a suitable approach.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  data-testid="contact-email-link"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <Mail size={16} className="text-muted-foreground" /> {BUSINESS.email}
                </a>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-link"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <MessageCircle size={16} className="text-muted-foreground" /> WhatsApp: {BUSINESS.phoneDisplay}
                </a>
                <p className="flex items-center gap-3 px-1 text-sm text-muted-foreground">
                  <MapPin size={16} /> {BUSINESS.address}
                </p>
              </div>
            </div>
          </Reveal>

          {/* ---------- Project inquiry form ---------- */}
          <Reveal delay={0.1}>
            <form
              data-testid="inquiry-form"
              onSubmit={submit}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 lux-shadow"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="inq-name" className={labelCls}>Full name *</label>
                  <input id="inq-name" data-testid="inquiry-name-input" name="name" value={form.name} onChange={update} required minLength={2} placeholder="Juan Dela Cruz" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="inq-email" className={labelCls}>Email address *</label>
                  <input id="inq-email" data-testid="inquiry-email-input" name="email" type="email" value={form.email} onChange={update} required placeholder="you@company.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="inq-company" className={labelCls}>Company or business name</label>
                  <input id="inq-company" data-testid="inquiry-company-input" name="company" value={form.company} onChange={update} placeholder="Optional" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="inq-country" className={labelCls}>Country</label>
                  <input id="inq-country" data-testid="inquiry-country-input" name="country" value={form.country} onChange={update} placeholder="Philippines" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="inq-type" className={labelCls}>Project type</label>
                  <select id="inq-type" data-testid="inquiry-type-select" name="projectType" value={form.projectType} onChange={update} className={inputCls}>
                    <option value="">Select…</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="inq-budget" className={labelCls}>Estimated budget</label>
                  <select id="inq-budget" data-testid="inquiry-budget-select" name="budget" value={form.budget} onChange={update} className={inputCls}>
                    <option value="">Select…</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="inq-timeline" className={labelCls}>Preferred timeline</label>
                  <select id="inq-timeline" data-testid="inquiry-timeline-select" name="timeline" value={form.timeline} onChange={update} className={inputCls}>
                    <option value="">Select…</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="inq-method" className={labelCls}>Preferred contact method</label>
                  <select id="inq-method" data-testid="inquiry-method-select" name="contactMethod" value={form.contactMethod} onChange={update} className={inputCls}>
                    <option value="">Select…</option>
                    {CONTACT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="inq-message" className={labelCls}>Project description *</label>
                  <textarea id="inq-message" data-testid="inquiry-message-input" name="message" value={form.message} onChange={update} required minLength={10} rows={5} placeholder="What are we building? Goals, features, examples you like…" className={`${inputCls} resize-none`} />
                </div>
              </div>

              {/* Honeypot: invisible bot trap. Humans never see or fill this. */}
              <input type="text" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

              <button
                data-testid="inquiry-submit-button"
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Project Inquiry"} <Send size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <Reveal>
            <SectionHead eyebrow="FAQ" title="Questions, answered." center />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {FAQS.map((f, i) => (
                <details key={f.q} className="group py-5" data-testid={`faq-item-${i + 1}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    {f.q}
                    <span className="mono text-lg text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
