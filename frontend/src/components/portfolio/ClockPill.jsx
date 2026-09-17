import { useEffect, useState } from "react";

// Little live clock showing Romano's local time (Manila = GMT+8),
// so overseas clients instantly know when he's awake.
export default function ClockPill({ testid }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Manila",
          hour12: false,
        })
      );
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      data-testid={testid}
      className="mono hidden sm:inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1.5 text-[11px] tracking-widest text-[#00FF66]"
    >
      <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
      TARLAC {time} GMT+8
    </span>
  );
}
