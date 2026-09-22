# Deploying to GitHub Pages (Free) — Plain-English Guide

Your site is now **fully static**: it's just HTML, CSS, and JavaScript files.
That means GitHub Pages can host it completely free. The contact form sends
email through FormSubmit (a free form-to-email service), so no server is needed.

> The `backend/` folder is still in the project, but GitHub Pages ignores it.
> Keep it — it's ready if you ever move to your VPS and want SMTP delivery
> through your own mail server instead.

---

## One-time setup

### 1. Push the code to GitHub
Use the Save button in Emergent → "Save to GitHub", or push manually.

### 2. On your own computer (or any machine with Node.js)

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO/frontend
yarn install
yarn deploy
```

What `yarn deploy` does, in plain words:
1. `predeploy` runs automatically first — it builds the site into a folder
   called `build/` (this is the actual website, all packed and optimized).
2. `gh-pages -d build` then publishes that folder to a special branch called
   `gh-pages` in your repository. GitHub Pages serves your site from there.

### 3. Turn on GitHub Pages (one click)
In your GitHub repository:
**Settings → Pages → Source → select the `gh-pages` branch → Save**

Wait 1–2 minutes. Your site is live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

### 4. Activate the contact form (one click, one time only)
The **very first time** anyone submits the contact form, FormSubmit sends a
confirmation email to **rvg.webdd@gmail.com**. Open it and click the
activation link. From then on, every form message arrives as a normal email.

---

## Updating the site later

After any change, from the `frontend/` folder just run:

```bash
yarn deploy
```

That's it — the live site updates within a minute or two.

---

## Optional: your own domain later

GitHub Pages supports custom domains for free (e.g. `romanogalvan.com`):
**Settings → Pages → Custom domain**, then point your domain's DNS to GitHub.
Ask me for a step-by-step when you're ready.

## Troubleshooting

- **Blank page after deploy?** Make sure the repo is public (or you have
  GitHub Pro for private Pages), and that you selected the `gh-pages` branch
  in Settings → Pages.
- **Form says sent but no email?** Check your spam folder for the FormSubmit
  activation email — step 4 above must be done once.
- **`yarn: command not found`?** Install Node.js first (nodejs.org), then run
  `npm install -g yarn` once.
