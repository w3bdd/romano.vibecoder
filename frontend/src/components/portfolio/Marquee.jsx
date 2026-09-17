// One slow, endless editorial ribbon. Pure CSS animation (cheap on the CPU).
// The track is duplicated side-by-side so the loop has no visible seam.
const ITEMS = [
  "VIBE CODING",
  "FULL-STACK DEV",
  "NEO-BRUTALISM",
  "FRAMER MOTION",
  "FAST LOADS",
  "MOTION-LED UX",
  "BAMBAN, TARLAC PH",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]; // duplicate for the seamless loop
  return (
    <div
      data-testid="marquee-ribbon"
      className="overflow-hidden border-y-2 border-foreground bg-foreground py-4 select-none"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight ${
                // Alternate solid and hollow-outline words for rhythm
                i % 2 === 0 ? "text-background" : "text-outline [-webkit-text-stroke-color:hsl(var(--background))]"
              }`}
            >
              {item}
            </span>
            <span className="text-accent text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
