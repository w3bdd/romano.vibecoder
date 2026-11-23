import { createContext, useContext, useEffect, useState } from "react";
import { detectCurrency, getForcedCurrency } from "@/config/geo";

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
  const [currency, setCurrency] = useState(() => getForcedCurrency());

  useEffect(() => {
    if (currency) return; // test override already decided
    let alive = true;
    detectCurrency().then((c) => {
      if (alive) setCurrency(c);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CurrencyContext.Provider value={currency}>{children}</CurrencyContext.Provider>;
}

// Every pricing/budget/quotation component must use this hook.
export function useCurrency() {
  return useContext(CurrencyContext); // "PHP" | "USD" | null (detecting)
}
