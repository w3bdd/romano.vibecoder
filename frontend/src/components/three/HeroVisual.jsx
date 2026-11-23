import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// The 3D scene is loaded lazily — the Three.js code downloads in the
// background AFTER the page's text and buttons are already usable.
const HeroScene = lazy(() => import("./HeroScene"));

// Checks once whether this visitor can and should get the 3D scene.
function useCanRender3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // Respect "reduce motion" system settings — show the calm static version
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Make sure the browser actually supports WebGL before loading Three.js
    let webgl = false;
    try {
      const probe = document.createElement("canvas");
      webgl = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch (e) {
      webgl = false;
    }
    setOk(webgl && !reduced);
  }, []);
  return ok;
}

// Elegant static stand-in: a soft metallic glow. Used while the 3D scene
// downloads, and permanently if WebGL is unavailable or the visitor prefers
// reduced motion — the site stays fully usable either way.
function StaticFallback() {
  return (
    <div
      data-testid="hero-static-fallback"
      aria-hidden="true"
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 38% 32%, hsl(var(--metallic) / 0.55), transparent 62%)",
      }}
    />
  );
}

export default function HeroVisual({ dark }) {
  const can3D = useCanRender3D();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // As the hero scrolls out of view, the whole scene drifts and fades —
  // a gentle handover to the rest of the page, no scroll-jacking.
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  if (!can3D) return <StaticFallback />;

  return (
    <motion.div ref={wrapRef} style={{ y, opacity }} className="h-full w-full">
      <Suspense fallback={<StaticFallback />}>
        <HeroScene dark={dark} isMobile={isMobile} />
      </Suspense>
    </motion.div>
  );
}
