import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, Mail, MessageCircle, MapPin, Send } from "lucide-react";

// Where the contact form posts to (address comes from the .env file).
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL = "rvg.webdd@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/639916848388?text=Hi%20Romano%2C%20I%27m%20interested%20in%20building%20a%20web%20project.";

const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

const EMPTY_FORM = { name: "", email: "", budget: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  // One handler updates whichever field is being typed in.
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      toast.success(
        res.data.emailed
          ? "Message sent straight to Romano's inbox!"
          : "Message received! Romano will get back to you shortly."
      );
      setForm(EMPTY_FORM);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Couldn't send right now — try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  // Copies the email address to the clipboard with one click.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email address copied!");
    } catch {
      toast.error(`Copy failed — the address is ${EMAIL}`);
    }
  };

  const inputCls =
    "w-full border-2 border-foreground bg-background px-4 py-3 text-sm focus:outline-none focus:neo-shadow transition-shadow placeholder:text-muted-foreground";

  return (
    <section id="contact" className="border-t-2 border-foreground bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
        {/* ---------- Left: pitch + direct channels ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mono text-xs tracking-[0.25em] text-accent">[ CONTACT ]</p>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            LET'S BUILD <span className="text-accent">SOMETHING FAST.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Tell me about your project and I'll reply within 24 hours.
            Prefer instant chat? WhatsApp is one tap away.
          </p>

          <div className="mt-8 space-y-4">
            {/* Email row with one-click copy */}
            <div className="neo-shadow flex items-center justify-between gap-3 border-2 border-foreground bg-card px-4 py-3">
              <span className="flex items-center gap-3 text-sm font-semibold">
                <Mail size={16} className="text-accent" /> {EMAIL}
              </span>
              <button
                data-testid="contact-copy-email-button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="neo-lift border-2 border-foreground bg-background p-2"
              >
                <Copy size={14} />
              </button>
            </div>

            {/* WhatsApp click-to-chat */}
            <a
              data-testid="contact-whatsapp-direct-button"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-lift neo-shadow flex items-center justify-between border-2 border-foreground bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={16} /> WhatsApp: +63 991 684 8388
              </span>
              <span className="mono text-[10px] tracking-widest">CHAT NOW →</span>
            </a>

            <p className="mono flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={13} /> Bamban, Tarlac — Philippines 2317
            </p>
          </div>
        </motion.div>

        {/* ---------- Right: the form ---------- */}
        <motion.form
          data-testid="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="neo-shadow-lg border-2 border-foreground bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="contact-name" className="mono mb-1.5 block text-[10px] tracking-[0.2em]">YOUR NAME *</label>
              <input
                id="contact-name"
                data-testid="contact-form-name-input"
                name="name"
                value={form.name}
                onChange={update}
                required
                minLength={2}
                placeholder="Jane Founder"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mono mb-1.5 block text-[10px] tracking-[0.2em]">EMAIL *</label>
              <input
                id="contact-email"
                data-testid="contact-form-email-input"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
                placeholder="jane@startup.com"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="contact-budget" className="mono mb-1.5 block text-[10px] tracking-[0.2em]">BUDGET RANGE</label>
              <select
                id="contact-budget"
                data-testid="contact-form-budget-select"
                name="budget"
                value={form.budget}
                onChange={update}
                className={inputCls}
              >
                <option value="">Select a range…</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="mono mb-1.5 block text-[10px] tracking-[0.2em]">PROJECT DETAILS *</label>
              <textarea
                id="contact-message"
                data-testid="contact-form-message-input"
                name="message"
                value={form.message}
                onChange={update}
                required
                minLength={10}
                rows={5}
                placeholder="What are we building? Timeline? Goals?"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Honeypot: invisible trap for spam bots. Real humans never see
                or fill this field, so filled = bot = silently discarded. */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <button
              data-testid="contact-form-submit-button"
              type="submit"
              disabled={sending}
              className="neo-lift neo-shadow inline-flex items-center justify-center gap-2 border-2 border-foreground bg-foreground px-6 py-3.5 text-sm font-bold text-background disabled:opacity-60"
            >
              {sending ? "SENDING…" : "SEND MESSAGE"} <Send size={15} />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
