// ---------------------------------------------------------------
// Cloudflare Worker: geo-country
// ---------------------------------------------------------------
// What this does, in plain words:
//   When the website asks "where is this visitor from?", this tiny
//   program runs on Cloudflare's servers (close to the visitor) and
//   answers with ONLY a two-letter country code, e.g. {"country":"PH"}.
//
//   - It NEVER reveals the visitor's IP address or precise location.
//   - "no-store" means the answer is never cached/shared between
//     visitors — everyone gets their own correct country.
//   - It costs nothing on Cloudflare's free plan for this traffic.
//
// How to deploy it: see README.md in this same folder.
// ---------------------------------------------------------------

export default {
  async fetch(request) {
    // Answer browser "preflight" checks (CORS) so the site is allowed to ask.
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    // Cloudflare attaches the visitor's country to every request.
    // "XX" = unknown (rare); the website treats that as international (USD).
    const country = (request.cf && request.cf.country) || "XX";

    return new Response(JSON.stringify({ country }), {
      headers: {
        ...corsHeaders(),
        "content-type": "application/json",
        // Critical: never let any cache store this — it is different
        // for every visitor and must never be shared.
        "cache-control": "no-store",
      },
    });
  },
};

function corsHeaders() {
  return {
    // This endpoint only exposes a country code — safe to read from anywhere.
    // To lock it to your site only, replace "*" with "https://romanogalvan.com".
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-max-age": "86400",
  };
}
