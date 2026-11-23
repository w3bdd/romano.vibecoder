import { createContext, useContext, useEffect, useState } from "react";
import { detectGeo, getForcedCountry } from "@/config/geo";

// ---------------------------------------------------------------
// PERMANENT CORE FEATURE — Global Currency State
// (governed by /CURRENCY_GOVERNANCE.md — do not remove, bypass,
// duplicate or replace without explicit project-owner approval)
//
// ONE detection runs here, at the top of the app, and every
// component reads the SAME result via useCurrency(). No component
// may ever fetch geolocation or decide a currency on its own.
//
// Rules (permanent):
//   PH country code  -> PHP pricing
//   anything else    -> USD pricing
//   detection fails  -> USD fallback
//   no manual selector, no conversions, no localStorage
// ---------------------------------------------------------------

const CurrencyContext = createContext(null); // null = still detecting

export function CurrencyProvider({ children }) {
  // "?cc=" test override (dev/testing hosts only) applies instantly.
  const [geo, setGeo] = useState(() => {
    const forced = getForcedCountry();
    return forced ? { country: forced, currency: forced === "PH" ? "PHP" : "USD" } : null;
  });

  useEffect(() => {
    if (geo) return; // test override already decided
    let alive = true;
    detectGeo().then((g) => {
      if (alive) setGeo(g);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CurrencyContext.Provider value={geo}>{children}</CurrencyContext.Provider>;
}

// Every pricing/budget/quotation component must use this hook.
// Returns the geo state: { country, currency } or null while detecting.
export function useGeo() {
  return useContext(CurrencyContext);
}

// Convenience: just the currency — "PHP" | "USD" | null (detecting).
export function useCurrency() {
  const geo = useContext(CurrencyContext);
  return geo ? geo.currency : null;
}
