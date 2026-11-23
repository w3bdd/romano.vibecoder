# GitHub Pages Migration Checklist — Phase 11 Production

Everything below is ready in the code. This checklist is what YOU (or we,
on your approval) do in GitHub/Cloudflare dashboards. Nothing here runs
until you approve production deployment.

## Already done (no action needed)

- [x] Cloudflare Worker `geo-country` deployed once, reused everywhere:
      `https://geo-country.romanogalvan.workers.dev`
- [x] Worker CORS restricted to exactly these origins:
      `https://romanogalvan.com`, `https://www.romanogalvan.com`,
      `https://w3bdd.github.io`, `https://romano-creative.preview.emergentagent.com`
- [x] Worker answers `{"country":"PH"}`-style codes only — never an IP,
      always `cache-control: no-store` (no wrong-currency-from-cache possible)
- [x] Preview `.env` uses the same worker URL (no environment-specific forks)
- [x] Workflow injects `REACT_APP_GEO_ENDPOINT` from a repository **variable**,
      Web3Forms key from a repository **secret** — no tokens in code or frontend env
- [x] Cloudflare API token exists only in the Emergent vault (server-side),
      never in frontend code, never in the repo
- [x] Production behavior built in: PH → ₱ PHP, all others → $ USD,
      failure → USD, no toggle, no saved preference, `?cc=` test override
      disabled on romanogalvan.com

## GitHub repository settings (one-time, ~5 minutes)

- [ ] **Secret**: Settings → Secrets and variables → Actions → Secrets tab →
      New repository secret → Name `REACT_APP_WEB3FORMS_ACCESS_KEY`,
      Value: your Web3Forms access key (from web3forms.com)
- [ ] **Variable**: same page → Variables tab → New repository variable →
      Name `REACT_APP_GEO_ENDPOINT`,
      Value `https://geo-country.romanogalvan.workers.dev`
- [ ] **Pages**: Settings → Pages → Source → **GitHub Actions** (not "Deploy from a branch")

## Build & deployment steps (after approval)

1. Push the latest code to GitHub (Emergent: Save → Save to GitHub).
2. The `Deploy to GitHub Pages` workflow runs automatically on push to `main`
   (or run it manually: Actions tab → workflow → Run workflow).
3. Wait for the green checkmark (~2 minutes).
4. Site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`
   (or romanogalvan.com once the custom domain is connected).

## Post-deployment testing (on the live site)

- [ ] Open the site normally → USD prices (international view)
- [ ] Open with a Philippine IP/VPN → ₱ PHP prices
- [ ] Confirm the passive indicator pill reads the right market
- [ ] Confirm no PHP/USD toggle appears anywhere
- [ ] Disconnect network / block the worker (DevTools → Network → block
      `geo-country.romanogalvan.workers.dev`) → prices fall back to USD
- [ ] Confirm `?cc=PH` does NOTHING on the production domain
- [ ] Send a test inquiry → arrives at romano.vibecoder@gmail.com
- [ ] Check both light and dark themes on mobile and desktop

## If the worker URL ever changes

Update it in exactly two places: the GitHub repository **variable** above
(production builds) and `frontend/.env` (Emergent preview). Never hardcode
it in source files.

---
**Status: staged, awaiting your explicit approval to publish.**
