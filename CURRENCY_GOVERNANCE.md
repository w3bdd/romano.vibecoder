# CURRENCY GOVERNANCE — Permanent Core Feature

**Status: PERMANENT ARCHITECTURAL REQUIREMENT for RomanoGalvan.com.**
Equivalent in importance to responsive design, routing, the theme system,
security, performance and accessibility. This file is the law for how
currency works on this website.

## The rules (never change without explicit project-owner approval)

1. Visitor in the Philippines (country code `PH`) → **PHP (₱)** pricing.
2. Every other country code → **USD ($)** pricing.
3. Geolocation failure, timeout, or downtime → **USD** fallback.
4. **No** visible manual currency selector anywhere on the site.
5. **No** currency conversion math. Only the approved fixed PHP and USD
   prices in `frontend/src/config/business.js` may be displayed.
6. Testing overrides (`?cc=PH` / `?cc=US`) work ONLY on development/testing
   hosts and are never saved.

## The architecture (three pieces, each with one job)

| Piece | File | Job |
|---|---|---|
| Detection service | `frontend/src/config/geo.js` | Talks to the Cloudflare Worker, returns `{ country, currency }` |
| Global state | `frontend/src/config/currency.jsx` | ONE detection per visit, shared with every component via `useGeo()` / `useCurrency()` |
| Price data | `frontend/src/config/business.js` | The approved PHP and USD prices, `BUDGET_RANGES`, and custom-app starting price |

The detected **country code is metadata only** (carried by `useGeo()` for
inquiry submissions). It must never be used as a second currency source —
currency is derived once, inside `geo.js`, and stays the single truth.

The Cloudflare Worker (`cloudflare/geo-country-worker.js`) returns only the
visitor's country code with `cache-control: no-store`. It is deployed once
and shared by preview and production:
`https://geo-country.romanogalvan.workers.dev`

## Rules for future development

- Any new pricing feature, quotation form, budget field, or price display
  **must** read currency from `useCurrency()` (config/currency.jsx) and
  prices from `config/business.js`.
- **Budget ranges** (Estimated Budget fields in inquiry/quotation forms)
  must come from `BUDGET_RANGES` in `config/business.js` — never define
  ranges inside a form component.
- **Submissions** that include a budget must also include the currency the
  visitor saw (`budgetCurrency`) and the detected country metadata
  (`detectedCountry`) so a USD budget can never be read as PHP.
- **Never** hardcode currency symbols, detection calls, or price values in
  individual components.
- **Never** reintroduce a manual currency selector or localStorage currency
  preference.
- Any change to `geo.js`, `currency.jsx`, or the Worker must be tested in
  BOTH the Emergent preview AND the GitHub Pages production configuration
  before release.
- Do not remove, bypass, duplicate, or replace this system without explicit
  project-owner approval.

## Quick test procedure (both environments)

1. Visit `/pricing?cc=PH` on a testing host → all prices ₱, indicator reads Philippines.
2. Visit `/pricing?cc=US` → all prices $, indicator reads International.
3. Visit `/contact?cc=PH` → Estimated Budget shows ₱ ranges; `/contact?cc=US` → $ ranges.
4. Block `geo-country.romanogalvan.workers.dev` in DevTools → prices and budgets fall back to USD.
5. Confirm no PHP/USD toggle exists anywhere.
6. Repeat in light and dark mode, on desktop and mobile.
