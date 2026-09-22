import { useEffect, useRef } from "react";

// ---------------------------------------------------------------
// CodeRain — a very light animated backdrop for the hero section.
// Thin columns of code characters ( < > { } => 0 1 ... ) drift slowly
// downward, like gentle rain made of code. Details that keep it fast:
//   - Draws on a <canvas> (cheap for the browser, no page re-layout)
//   - Runs at ~20 frames per second, not 60 (backgrounds don't need more)
//   - Very low opacity so text on top stays perfectly readable
//   - Pauses when the tab is hidden, and stays still for visitors
//     who enabled "reduce motion" in their system settings
//   - Color follows the theme automatically: green in dark mode,
//     orange in light mode
// ---------------------------------------------------------------

// The characters that fall — code-flavored symbols and digits.
const GLYPHS = "01<>{}[]();=>$#/*+=._".split("");

export default function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect the visitor's "reduce motion" system setting — show nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let rafId;
    let lastFrame = 0;
    let drops = [];
    let width = 0;
    let height = 0;
    const COLUMN_WIDTH = 32; // one falling glyph every 32px — sparse on purpose

    // Size the canvas to exactly cover the hero section.
    const resize = () => {
      const box = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = box.width;
      height = canvas.height = box.height;
      drops = Array.from({ length: Math.floor(width / COLUMN_WIDTH) }, () =>
        Math.random() * height
      );
    };
    resize();
    window.addEventListener("resize", resize);

    // Theme-aware color: reads which mode is active right now.
    const accentRGB = () =>
      document.documentElement.classList.contains("dark")
        ? "0, 255, 102" // terminal green (dark mode)
        : "255, 62, 0"; // signal orange (light mode)

    const draw = (time) => {
      rafId = requestAnimationFrame(draw);
      // Skip frames to hold ~20fps, and skip entirely when tab is hidden.
      if (time - lastFrame < 50 || document.hidden) return;
      lastFrame = time;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "13px 'JetBrains Mono', monospace";
      const color = accentRGB();

      drops.forEach((y, i) => {
        const x = i * COLUMN_WIDTH + 10;
        const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        // Faint body glyph + a slightly brighter "head" one step above.
        ctx.fillStyle = `rgba(${color}, 0.13)`;
        ctx.fillText(glyph, x, y);
        ctx.fillStyle = `rgba(${color}, 0.28)`;
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, y - 18);

        // Drift down slowly; when past the bottom, occasionally restart at top.
        drops[i] = y > height + 24 ? (Math.random() > 0.975 ? 0 : y + 9) : y + 9;
      });
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
