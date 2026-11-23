// ---------------------------------------------------------------
// Geo-currency logic — one small module, used by the pricing grid.
//
// Production behavior:
//   Cloudflare edge lookup → PH = PHP, anything else = USD.
//   Any failure (offline, timeout, worker down) → USD.
// There is NO manual currency selection and nothing is saved to
// localStorage — detection runs fresh on every visit.
//
// The only exception: "?cc=PH" / "?cc=US" in the URL, a testing
// override that works ONLY on development/testing hosts (never on
// the production domain) and is never saved.
// ---------------------------------------------------------------

// The Cloudflare Worker URL. Empty = detection skipped, USD default.
export const GEO_ENDPOINT = process.env.REACT_APP_GEO_ENDPOINT || "";

// The ?cc= testing override only works on development/testing hosts —
// it is completely disabled on the real production domain.
const isTestingHost = () => {
  const h = window.location.hostname;
  return (
    h === "localhost" ||
    h.endsWith(".github.io") ||
    h.endsWith(".workers.dev") ||
    h.endsWith(".preview.emergentagent.com")
  );
};

// Testing/VPN override: ?cc=PH in the URL simulates a country.
// Deliberate (documented in cloudflare/README.md), never saved,
// and disabled on production domains.
export function getForcedCurrency() {
  if (!isTestingHost()) return null;
  const forced = new URLSearchParams(window.location.search).get("cc");
  if (!forced) return null;
  return forced.toUpperCase() === "PH" ? "PHP" : "USD";
}

// Detects the visitor's currency via the Cloudflare edge worker.
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
