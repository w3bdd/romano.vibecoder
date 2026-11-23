// ---------------------------------------------------------------
// Cloudflare Worker: geo-country
// ---------------------------------------------------------------
// What this does, in plain words:
//   When the website asks "where is this visitor from?", this tiny
//   program runs on Cloudflare's servers (close to the visitor) and
//   answers with ONLY a two-letter country code, e.g. {"country":"PH"}.
//
//   - It NEVER reveals the visitor's IP address or precise location.
//   - It collects NOTHING: no logs of personal data, no storage.
//   - "no-store" means the answer is never cached/shared between
//     visitors — everyone gets their own correct country.
//   - Browsers may only READ the answer from our own websites
//     (see ALLOWED_ORIGINS below).
//   - Free on Cloudflare's free plan for this traffic.
//
// How to deploy it: see README.md in this same folder.
// ---------------------------------------------------------------

// Websites allowed to read the answer. Add or remove domains here.
const ALLOWED_ORIGINS = [
  "https://romanogalvan.com",
  "https://www.romanogalvan.com",
  "https://w3bdd.github.io", // GitHub Pages hosting
  "https://romano-creative.preview.emergentagent.com", // Emergent preview
];

function corsHeaders(request) {
  // Only grant browser read-access to our own sites. Requests without an
  // Origin header (curl, direct browser visit) still get the country code —
  // it is not sensitive — but cross-site scripts elsewhere cannot read it.
  const origin = request.headers.get("Origin");
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : null;
  return {
    ...(allowed ? { "access-control-allow-origin": allowed, vary: "Origin" } : {}),
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-max-age": "86400",
  };
}

export default {
  async fetch(request) {
    // Answer browser "preflight" checks (CORS) so our site is allowed to ask.
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request) });
    }

    try {
      // Cloudflare attaches the visitor's country to every request.
      // "XX" = unknown (rare); the website treats that as international (USD).
      const country = (request.cf && request.cf.country) || "XX";

      return new Response(JSON.stringify({ country }), {
        headers: {
          ...corsHeaders(request),
          "content-type": "application/json",
          // Critical: never let any cache store this — it is different
          // for every visitor and must never be shared.
          "cache-control": "no-store",
        },
      });
    } catch (e) {
      // Even on failure, answer gracefully: "XX" → the site falls back to USD.
      return new Response(JSON.stringify({ country: "XX" }), {
        status: 200,
        headers: {
          ...corsHeaders(request),
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      });
    }
  },
};
