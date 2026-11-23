# PRD — RomanoGalvan.com: Premium Web Development Practice

## Original Problem Statement (v2 redesign, 2026-11-23)
Transform the existing portfolio into RomanoGalvan.com — a premium, conversion-focused business website: "Minimalist 3D Luxury" design with switchable light/dark mode, chrome 3D hero sculpture, six pages (Home, Services, Portfolio, Pricing, About, Contact) with approved business copy, PHP pricing (USD reference), full project inquiry form + FAQ, complete SEO layer, no invented claims, no publishing without approval.

## Original Problem Statement (v1, original build)
A personal portfolio website (more website than web app) for Romano Galvan, a vibe coder / freelance web developer in Bamban, Tarlac, Philippines (2317). Contact via email + WhatsApp. Neo-brutalist kinetic design. (Superseded by v2 redesign.)

## User Personas
- Potential clients evaluating a freelance developer
- Founders looking for contract/freelance web help
- Visitors reviewing work before contacting

## Architecture (v2 + Revision 02 "Platinum Sculptural Luxury")
- Typography: DM Serif Display (editorial headlines) + Manrope (body) + JetBrains Mono (labels)
- Hero: "Meridian" sculpture — custom ParametricGeometry fluid platinum ribbon (meshPhysicalMaterial clearcoat) folding through brushed-aluminum slab; entrance ease-in (smoothstep 1.8s), cursor parallax, scroll-driven rotation + camera drift (contained to hero, no scroll-jacking), wrapper fade-out via framer-motion useScroll; procedural Lightformer studio (no external HDR)
- Motion: framer-motion only (GSAP deliberately not installed — equivalent capability exists); Magnetic hover on hero/CTA buttons
- Homepage order: Hero → Introduction → Selected Work (editorial alternating rows) → Services (oversized numbered rows) → Why Us → Process → CTA
- Shared data: PROJECTS + PACKAGES in /app/frontend/src/config/business.js
- Pages/Services + Portfolio rewritten as editorial layouts; Pricing/About/Contact inherit new type system
- Theme/router/SEO/3D guards/backend dual-mode inquiry: unchanged from v2 (see below)
- Frontend: React (CRA/craco) + react-router-dom (6 pages), Tailwind, framer-motion (reveals), lenis (smooth scroll), Three.js via @react-three/fiber + drei (chrome torus-knot hero, lazy-loaded, procedural Lightformer studio env, no external HDR), sonner toasts
- Theme: flash-free boot script in index.html (localStorage rg-theme → OS preference), `.dark` class on <html>, palettes per brand spec (light #F5F3EF ivory / dark #111111 studio, metallic #C5C5C5/#D5D5D5), Fraunces + Manrope + JetBrains Mono
- 3D guards: reduced-motion → static metallic disc fallback; no WebGL → same fallback; mobile → lower geometry + dpr cap
- Pages: / /services /portfolio /pricing /about /contact — Seo.jsx sets per-page title/description/canonical/OG; sitemap.xml + robots.txt + JSON-LD ProfessionalService in index.html; 404.html deep-link helper (pathSegmentsToKeep=1, set 0 for custom domain)
- Config: ALL business info + pricing in /app/frontend/src/config/business.js
- Backend: FastAPI /api/contact — extended inquiry model (company, country, projectType, timeline, contactMethod), honeypot, 5/hr rate limit, MongoDB contact_messages, SMTP forward (placeholder creds)
- Contact form: dual-mode — web3forms (default, key via GitHub secret at build) / smtp (VPS)
- Deploy: GitHub Actions /app/.github/workflows/deploy.yml (structure auto-detect, no fragile cache path) + gh-pages script + VPS kit (/app/deploy/)

## Implemented (v2, 2026-11-23)
- Six-page site with approved copy: Home (3D chrome hero, intro, services overview, why-us, 6-step process, CTA), Services (4 services + deliverables), Portfolio (4 real sample projects, labeled self-initiated demonstration work, live links), Pricing (4 packages PHP + USD reference toggle, disclaimer, custom app quote card), About (story, philosophy, commitment, founder portrait), Contact (9-field inquiry form, direct email/WhatsApp links, 8-question FAQ accordion)
- Full SEO layer: per-page titles/descriptions/canonical/OG, sitemap.xml, robots.txt, JSON-LD structured data, optional GA4 via %REACT_APP_GA_ID% build var
- Theme: light/dark switcher in nav, OS-preference first visit, localStorage persist, no flash, smooth transitions, 3D scene lighting is theme-aware
- Backend extended for full inquiry fields; honeypot + rate limit preserved; success toast only on confirmed delivery
- GEOLOCATION PRICING (Phase 11, PERMANENT CORE FEATURE — governed by /app/CURRENCY_GOVERNANCE.md): three-piece architecture — detection service frontend/src/config/geo.js (Cloudflare Worker, PH=PHP else USD, USD fallback, ?cc=XX dev-hosts-only override, nothing saved), global state frontend/src/config/currency.jsx (CurrencyProvider wraps the app in App.js; ONE detection per visit shared via useCurrency() hook — components must never detect or hardcode currency), prices in config/business.js (approved fixed: PHP 7,500/15,000/25,000/35,000-60,000 + custom quotation; USD 250/500/900/1,200-2,000 + custom from $1,500; NO conversions). Worker deployed 2026-11-23: https://geo-country.romanogalvan.workers.dev (CORS: romanogalvan.com, www.romanogalvan.com, w3bdd.github.io, preview; no-store; country code only). Endpoint via REACT_APP_GEO_ENDPOINT in frontend/.env (preview) + GitHub repo Variable (production). Migration checklist: /app/GITHUB_PAGES_MIGRATION.md
- Old neo-brutalist single-page components removed (replaced by this redesign)
- GEO-AWARE ESTIMATED BUDGET (2026-11-23): budget ranges centralized as BUDGET_RANGES in config/business.js (PHP: <₱10,000 … >₱250,000; USD: <$250 … >$5,000). Contact form's Estimated Budget dropdown reads the global currency via useGeo() — shows "Detecting your region…" (disabled) until detection resolves, PH→₱ ranges, else $ ranges, USD on failure. Stale selection cleared if currency resolves differently. Geo state extended to carry the detected country code as METADATA ONLY (single detection in geo.js remains the sole currency source; no second detection mechanism). Every inquiry submission now includes budgetCurrency + detectedCountry (Web3Forms: budget_currency/detected_country fields; FastAPI/SMTP mode: ContactMessage model + MongoDB doc + email body extended). CURRENCY_GOVERNANCE.md updated with budget-range, submission, and country-metadata rules.

## Implemented (v1, earlier sessions — superseded)
- Neo-brutalist single-page portfolio (hero/terminal/marquee/manifesto), portrait optimization (89KB WebP, reused on About), Web3Forms static form pipeline, GitHub Pages workflow + secrets guide, VPS deploy kit, GitHub/LinkedIn/Facebook links

## Prioritized Backlog
- P0: Owner creates Web3Forms key (web3forms.com, romano.vibecoder@gmail.com) → adds GitHub secret REACT_APP_WEB3FORMS_ACCESS_KEY → inquiry form goes live on static hosting
- P0: Owner reviews redesigned site in preview and approves before any production publishing
- P1: Point romanogalvan.com domain (custom domain on GitHub Pages or VPS); set 404.html pathSegmentsToKeep=0 when on root domain
- P1: VPS SMTP path: fill real mail credentials in backend/.env, set REACT_APP_CONTACT_MODE=smtp
- P2: Real screenshots for portfolio cards; Google Maps embed on Contact; optional GA4 id

## Next Tasks
1. Owner approval of preview
2. Web3Forms key via GitHub secret
3. Custom domain setup
4. Publish only after explicit approval — migration checklist ready at /app/GITHUB_PAGES_MIGRATION.md
