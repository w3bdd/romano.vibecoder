import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Marquee from "@/components/portfolio/Marquee";
import Services from "@/components/portfolio/Services";
import Manifesto from "@/components/portfolio/Manifesto";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import StickyCTA from "@/components/portfolio/StickyCTA";

// Shared "scroll smoothly to a section" helper — uses Lenis when it's running,
// falls back to the browser's built-in smooth scroll otherwise.
export const scrollToSection = (id) => {
  const el = document.querySelector(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export default function App() {
  // Theme switch: remembered between visits, defaults to dark (the kinetic look).
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("rg-theme");
    return saved ? saved === "dark" : true;
  });

  // Flipping the "dark" class on <html> swaps every color variable instantly.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("rg-theme", dark ? "dark" : "light");
  }, [dark]);

  // Lenis = buttery momentum scrolling. A tiny animation loop keeps it ticking.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Manifesto />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      {/* Toast popups (bottom-right) confirm form sends and copy actions */}
      <Toaster position="bottom-right" theme={dark ? "dark" : "light"} />
    </div>
  );
}
