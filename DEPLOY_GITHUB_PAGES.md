# Deploying to GitHub Pages (Free) — Plain-English Guide

Your site is **fully static**: it's just HTML, CSS, and JavaScript files.
That means GitHub Pages can host it completely free. The contact form sends
email through Web3Forms (a free form-to-email service), so no server is needed.

> The `backend/` folder is still in the project, but GitHub Pages ignores it.
> Keep it — it's ready if you ever move to your VPS and want SMTP delivery
> through your own mail server instead.

---

## One-time setup

### 1. Get your free Web3Forms access key (5 minutes)
The contact form needs a free "access key" so Web3Forms knows which inbox
receives the messages:

1. Go to **https://web3forms.com**
2. Enter your email: **romano.vibecoder@gmail.com**
3. Open the verification email Web3Forms sends you and confirm it
4. Copy the **Access Key** they give you (looks like
   `a1b2c3d4-1234-5678-abcd-abcdef123456`)
5. Paste it into `frontend/.env`, replacing the placeholder:
   ```
   REACT_APP_WEB3FORMS_ACCESS_KEY=paste-your-real-key-here
   ```

Don't worry about the key being visible in the website's code — it's designed
to be public. It can only send email TO you, never read anything.

### 2. Push the code to GitHub
Use the Save button in Emergent → "Save to GitHub", or push manually.

### 3. On your own computer (or any machine with Node.js)

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO/frontend
yarn install
yarn deploy
```

What `yarn deploy` does, in plain words:
1. `predeploy` runs automatically first — it builds the site into a folder
   called `build/` (this is the actual website, all packed and optimized,
   with your access key baked in).
2. `gh-pages -d build` then publishes that folder to a special branch called
   `gh-pages` in your repository. GitHub Pages serves your site from there.

### 4. Turn on GitHub Pages (one click)
In your GitHub repository:
**Settings → Pages → Source → select the `gh-pages` branch → Save**

Wait 1–2 minutes. Your site is live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

### 5. Test the contact form
Send yourself a message from the live site. It should arrive at
**romano.vibecoder@gmail.com** within a minute. If it's not in the inbox,
check Spam and the Promotions tab — mark it "not spam" once and future
messages will land in the inbox.

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
- **Form says "isn't configured yet"?** The access key in `frontend/.env` is
  still the placeholder — do step 1, then run `yarn deploy` again.
- **Form says sent but no email?** Check Spam/Promotions in Gmail, and make
  sure you verified your email at web3forms.com (step 1).
- **`yarn: command not found`?** Install Node.js first (nodejs.org), then run
  `npm install -g yarn` once.
