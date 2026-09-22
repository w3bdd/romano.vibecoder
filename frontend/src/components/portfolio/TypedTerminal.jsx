import { useEffect, useState } from "react";

// ---------------------------------------------------------------
// TypedTerminal — a fake terminal that "codes" on its own.
// It types out commands letter by letter (like a person typing),
// prints the results, shows a little build progress bar, and then
// starts over in an endless loop. Pure timers + React state, so it
// costs almost nothing in performance.
// ---------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The show script, in two acts:
//   Act 1 — the intro card (who Romano is, what he works with)
//   Act 2 — the coding session (dev server, build, deploy)
// "cmd" = typed letter by letter, "out"/"ok" = printed instantly,
// "bar" = animated progress bar, "clear" = wipe the screen for the next act.
const SCRIPT = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "romano_galvan — vibe coder, tarlac PH" },
  { type: "cmd", text: "stack --list" },
  { type: "out", text: "react · fastapi · tailwind · framer-motion · lenis" },
  { type: "cmd", text: "ship --fast --secure" },
  { type: "ok", text: "✔ build passed in 0.4s — lighthouse 100" },
  { type: "hold", ms: 2600 }, // let visitors read the intro
  { type: "clear" },
  { type: "cmd", text: "npm run dev" },
  { type: "out", text: "vite v6.2  ready in 212 ms" },
  { type: "cmd", text: "npm run build" },
  { type: "out", text: "vite building for production…" },
  { type: "bar" },
  { type: "ok", text: "✔ built in 0.84s · 68 kB gzip" },
  { type: "cmd", text: "git push origin main" },
  { type: "ok", text: "✔ deployed · lighthouse 100/100" },
  { type: "hold", ms: 3800 }, // admire the finished build, then replay
];

export default function TypedTerminal() {
  const [lines, setLines] = useState([]); // finished lines on screen
  const [typing, setTyping] = useState(""); // the half-typed command
  const [bar, setBar] = useState(null); // progress (0–100) while "compiling"

  useEffect(() => {
    let cancelled = false;

    // Visitors with "reduce motion" enabled get the finished intro, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(SCRIPT.filter((s) => ["cmd", "out", "ok"].includes(s.type)).slice(0, 6));
      return;
    }

    const run = async () => {
      while (!cancelled) {
        setLines([]);
        setTyping("");
        setBar(null);
        let done = [];

        for (const step of SCRIPT) {
          if (cancelled) return;

          if (step.type === "hold") {
            await sleep(step.ms); // quiet beat before the next thing happens
          } else if (step.type === "clear") {
            done = [];
            setLines([]);
          } else if (step.type === "cmd") {
            // Type the command one character at a time, like a human.
            for (let i = 1; i <= step.text.length; i++) {
              if (cancelled) return;
              setTyping(step.text.slice(0, i));
              await sleep(36);
            }
            await sleep(280); // tiny pause, as if pressing Enter
            done.push(step);
            setLines([...done]);
            setTyping("");
          } else if (step.type === "bar") {
            // The "compiling" progress bar fills up in chunks.
            for (let p = 0; p <= 100; p += 10) {
              if (cancelled) return;
              setBar(p);
              await sleep(85);
            }
            setBar(null);
          } else {
            await sleep(340); // output lines just appear
            done.push(step);
            setLines([...done]);
          }
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // One printed line: commands get a green prompt arrow,
  // success lines are fully accent-colored, normal output is dimmed.
  const Row = ({ item }) => (
    <p className={item.type === "out" ? "text-muted-foreground" : item.type === "ok" ? "text-accent" : ""}>
      {item.type === "cmd" && <span className="text-accent">➜ </span>}
      {item.text}
    </p>
  );

  return (
    // Fixed height so the card never jumps while lines appear.
    <div className="mono h-[280px] space-y-2 overflow-hidden p-6 text-xs leading-relaxed sm:h-[300px] sm:text-sm">
      {lines.map((item, i) => (
        <Row key={i} item={item} />
      ))}

      {/* The progress bar, drawn with text blocks: ████░░░░░░ 40% */}
      {bar !== null && (
        <p className="text-accent">
          {"█".repeat(bar / 10)}
          <span className="text-muted-foreground">{"░".repeat(10 - bar / 10)}</span> {bar}%
        </p>
      )}

      {/* The line currently being typed, with a blinking cursor block */}
      <p>
        <span className="text-accent">➜ </span>
        {typing}
        <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-accent animate-pulse-dot sm:h-4" />
      </p>
    </div>
  );
}
