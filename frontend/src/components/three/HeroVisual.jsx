import { lazy, Suspense, useEffect, useState } from "react";

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

// Elegant static stand-in: a soft metallic glow disc. Used while the 3D
// scene downloads, and permanently if WebGL is unavailable or the visitor
// prefers reduced motion — the site stays fully usable either way.
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

  if (!can3D) return <StaticFallback />;

  return (
    <Suspense fallback={<StaticFallback />}>
      <HeroScene dark={dark} isMobile={isMobile} />
    </Suspense>
  );
}
