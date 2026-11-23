# Geo Pricing Setup — Plain-English Guide

The pricing on the site adapts to where the visitor is: **Philippines → PHP,
everywhere else → USD**, with a manual switch that always wins. This works on
pure static hosting (GitHub Pages) because the "where are you from?" answer
comes from a tiny **Cloudflare Worker** — a snippet of code that runs on
Cloudflare's global network, not on any server you manage.

## How the pieces fit together

```
Visitor opens site
      │
      ▼
Does the visitor have a SAVED manual currency choice?  ── yes ──▶ show that
      │ no
      ▼
Ask the Cloudflare Worker for the country code
      │
      ├─ "PH" ─────────────▶ PHP prices
      ├─ anything else ────▶ USD prices
      └─ worker unreachable ▶ USD prices (safe default, site never breaks)
```

A saved manual choice is never overridden. Detection results are NOT saved —
if the visitor later picks a currency by hand, that choice is remembered
(localStorage) and respected forever until they change it.

## One-time setup (~10 minutes)

### 1. Create a free Cloudflare account
Go to https://dash.cloudflare.com and sign up (free plan is fine).

### 2. Install the Wrangler tool on your computer
```bash
npm install -g wrangler
wrangler login        # opens a browser window to connect your account
```

### 3. Deploy the worker
From this project folder:
```bash
cd cloudflare
wrangler deploy
```
Wrangler prints the worker's URL, something like:
```
https://geo-country.your-subdomain.workers.dev
```
Test it in your browser — you should see `{"country":"PH"}` (or your country).

### 4. Tell the website where to ask
In `frontend/.env`, set:
```
REACT_APP_GEO_ENDPOINT=https://geo-country.your-subdomain.workers.dev
```
Then rebuild/redeploy the site (push to GitHub — the Actions robot rebuilds,
and injects the same variable there by adding it under the workflow's `env:`
block in `.github/workflows/deploy.yml`, or as a repository **variable**).

### 5. Optional but recommended: run it on your own domain
Workers → your worker → Settings → Triggers → Custom Domains → add
`api.romanogalvan.com` (requires romanogalvan.com's DNS on Cloudflare —
which you also get free when you move the domain there).

## Testing matrix (no VPN needed)

Add `?cc=XX` to any page URL to simulate a country — this override is for
testing and is never saved:

| URL                              | Expected prices |
|----------------------------------|-----------------|
| `https://yoursite/pricing?cc=PH` | PHP             |
| `https://yoursite/pricing?cc=US` | USD             |
| `https://yoursite/pricing?cc=JP` | USD             |

Other scenarios:
- **Manual selection**: click PHP/USD, reload the page → your choice stays.
- **Manual + detection**: with a saved choice, detection never overrides it.
- **Worker down / offline**: prices fall back to USD, page still works.
- **Shared CDN caching**: the worker answers `cache-control: no-store`, so no
  cache can ever serve one visitor's country to another visitor.

## Privacy note
The worker returns only a two-letter country code. It never sees, stores, or
returns the visitor's IP address or precise location.
