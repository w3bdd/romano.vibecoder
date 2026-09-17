import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/App";

// A floating pill that appears once the visitor has scrolled a bit —
// a gentle, always-available nudge to get in touch without being intrusive.
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4"
        >
          <button
            data-testid="sticky-contact-cta-pill"
            onClick={() => scrollToSection("#contact")}
            className="neo-shadow inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
          >
            LET'S BUILD SOMETHING <ArrowUpRight size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
