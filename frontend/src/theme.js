import { useEffect, useState } from "react";

// ---------------------------------------------------------------
// Theme hook — light/dark mode for the whole site.
// A tiny script in index.html applies the theme BEFORE the page
// paints (saved choice, or the visitor's OS preference on a first
// visit), so there is never a flash of the wrong colors. This hook
// simply reads what the boot script decided and lets the toggle
// button change it; the choice is saved for the next visit.
// ---------------------------------------------------------------
export function useTheme() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("rg-theme", dark ? "dark" : "light");
    } catch (e) {
      // private browsing etc. — theme still works for this session
    }
  }, [dark]);

  return [dark, setDark];
}
