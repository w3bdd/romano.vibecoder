// ---------------------------------------------------------------
// Geo-currency logic — one small module, used by the pricing grid.
//
// Priority order:
//   1. "?cc=PH" in the URL  → testing/VPN override (never saved)
//   2. Saved manual choice  → visitor clicked PHP/USD before
//   3. Cloudflare edge lookup → PH = PHP, anything else = USD
//   4. Any failure          → USD (site always works)
//
// Only MANUAL choices are saved. Automatic detection is never saved,
// so it can never "lock in" a wrong guess.
// ---------------------------------------------------------------

// The Cloudflare Worker URL. Empty = detection skipped, USD default.
export const GEO_ENDPOINT = process.env.REACT_APP_GEO_ENDPOINT || "";

const STORAGE_KEY = "rg-currency";

// Testing/VPN override: ?cc=PH in the URL simulates a country.
// Deliberate (documented in cloudflare/README.md), highest priority,
// and never saved — so it can't pollute anyone's real preference.
export function getForcedCurrency() {
  const forced = new URLSearchParams(window.location.search).get("cc");
  if (!forced) return null;
  return forced.toUpperCase() === "PH" ? "PHP" : "USD";
}

export function getManualCurrency() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "PHP" || saved === "USD" ? saved : null;
  } catch {
    return null; // private browsing etc.
  }
}

export function saveManualCurrency(c) {
  try {
    localStorage.setItem(STORAGE_KEY, c);
  } catch {
    // storage unavailable — the choice still works for this session
  }
}

// Detects the currency for a visitor with no saved manual choice.
export async function detectCurrency() {
  const forced = getForcedCurrency();
  if (forced) return forced;

  if (!GEO_ENDPOINT) return "USD"; // worker not configured yet

  try {
    // Give up after 2.5 seconds so pricing never hangs
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(GEO_ENDPOINT, { signal: ctrl.signal, cache: "no-store" });
    clearTimeout(timer);
    const data = await res.json();
    return data.country === "PH" ? "PHP" : "USD";
  } catch {
    return "USD"; // network error, timeout, offline — always safe
  }
}
