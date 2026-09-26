# PRD — Romano Galvan: Vibe Coder Portfolio

## Original Problem Statement
A personal portfolio website (more website than web app) for Romano Galvan, a vibe coder / freelance web developer in Bamban, Tarlac, Philippines (2317). Goal: showcase profile, services, selected work, and convert visitors via email contact form (to romano.vibecoder@gmail.com, sent through his private SMTP mail server) and WhatsApp click-to-chat (+63 991 684 8388). Requirements: animated premium neo-brutalist kinetic design (minimalist, motion-led), light/dark mode toggle, fast loading, secure form, responsive, basic SEO, layman's-term code comments (user deploys on own VPS), auto-generated content/assets.

## User Personas
- Potential clients evaluating a freelance developer
- Founders looking for contract/freelance web help
- Visitors reviewing work before contacting

## Architecture
- Frontend: React (CRA/craco) + Tailwind + framer-motion + lenis, single-page, sections in `/app/frontend/src/components/portfolio/`
- Backend: FastAPI at `/api` — POST `/api/contact` (validation, honeypot, 5/hr per-IP rate limit, MongoDB backup, SMTP forward via env config)
- DB: MongoDB (MONGO_URL env) — `contact_messages` collection
- Theme: CSS variables, `.dark` class on `<html>`, persisted in localStorage (`rg-theme`), default dark
- Design system: `/app/design_guidelines.json` (Neo-Brutalist Kinetic Minimalist: Syne / Plus Jakarta Sans / JetBrains Mono; light = paper/orange, dark = ink/terminal-green)

## Implemented (2026-07-17... build date: current session)
- Kinetic hero: masked line-by-line headline reveal, 3D mouse-tilt terminal card with self-typing two-act coding animation (intro → build/deploy loop), parallax accent blob, lightweight canvas "code rain" backdrop, availability badge, live GMT+8 clock
- Editorial marquee ribbon (pure CSS, pause on hover)
- Services matrix (4 cards, neo-brutalist hard shadows, tag pills)
- Manifesto/about in 3 numbered chapters with sticky left column
- Selected work: 4 SAMPLE project cards with CSS-only artwork + outcome strips (content is placeholder — user to replace with real work)
- Contact: validated form + toast feedback, copy-email button, WhatsApp click-to-chat
- Sticky bottom CTA pill, mobile hamburger nav, light/dark toggle
- SEO: title, meta description, keywords, Open Graph, Twitter card
- STATIC-READY for GitHub Pages: contact form posts directly to Web3Forms API (https://api.web3forms.com/submit) → emails romano.vibecoder@gmail.com. Needs REACT_APP_WEB3FORMS_ACCESS_KEY in frontend/.env (placeholder until owner creates free key at web3forms.com). package.json has homepage:"." + gh-pages deploy scripts. Guide: /app/DEPLOY_GITHUB_PAGES.md
- VPS-READY: contact form is dual-mode via REACT_APP_CONTACT_MODE ("formsubmit" for static hosting, "smtp" for VPS → posts to own FastAPI /api/contact which emails via private SMTP server). Deploy kit: /app/deploy/nginx.conf (static files + /api proxy + caching + security headers), /app/deploy/portfolio-backend.service (systemd auto-restart), full layman guide /app/DEPLOY_VPS.md (Ubuntu: Node/Python/MongoDB/Nginx/Certbot, .env SMTP setup, firewall, testing, troubleshooting)
- Backend (kept for future VPS use): /api/contact with spam guards; SMTP delivery ready but PLACEHOLDER credentials in /app/backend/.env

## Prioritized Backlog
- P0: User adds real SMTP credentials to backend/.env (SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM) → form emails start landing in romano.vibecoder@gmail.com
- P0: Replace 4 sample projects with real case studies/links
- P1: Real social profile URLs in footer (currently placeholder github/linkedin links)
- P1: Custom domain + VPS deployment guide (build React, serve via Nginx, uvicorn behind reverse proxy, HTTPS via Certbot)
- P2: Testimonials section, blog/writing section, OG share image, analytics

## Next Tasks
1. Collect SMTP credentials from user and verify live email delivery
2. Swap sample projects for real portfolio pieces
3. Add real social links
4. VPS deploy walkthrough
