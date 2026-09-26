# Deploying to GitHub Pages (Free) — Plain-English Guide

Your site is **fully static**: it's just HTML, CSS, and JavaScript files.
That means GitHub Pages can host it completely free. The contact form sends
email through Web3Forms (a free form-to-email service), so no server is needed.

Your Web3Forms key is stored as a **GitHub secret** — it never touches the
repository code. A robot (GitHub Actions) builds and publishes the site for
you automatically every time you push. The workflow file is already included
in this project at `.github/workflows/deploy.yml`.

> The `backend/` folder is still in the project, but GitHub Pages ignores it.
> Keep it — it's ready if you ever move to your VPS and want SMTP delivery
> through your own mail server instead.

**One honest note about the key:** the secret keeps your key out of the git
history, but the built website is public, so the key is technically visible
in the site's final JavaScript. That's completely fine — Web3Forms keys are
designed to be public. They can only SEND email to you, never read anything.

---

## One-time setup (about 10 minutes)

### 1. Get your free Web3Forms access key
1. Go to **https://web3forms.com**
2. Enter your email: **romano.vibecoder@gmail.com**
3. Open the verification email Web3Forms sends you and confirm it
4. Copy the **Access Key** (looks like `a1b2c3d4-1234-5678-abcd-abcdef123456`)

### 2. Store the key as a GitHub secret
1. Open your repository on GitHub
2. Go to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Fill in:
   - **Name:** `REACT_APP_WEB3FORMS_ACCESS_KEY` (must be exactly this)
   - **Secret:** paste your access key
5. Click **Add secret**

GitHub now stores it encrypted. Nobody — including you — can view it again
through the website; you can only replace it.

### 3. Push the code to GitHub
Use the Save button in Emergent → "Save to GitHub", or push manually.
The moment the code lands on the `main` branch, the build robot starts
automatically (check the **Actions** tab to watch it work).

> If your default branch is called `master` instead of `main`, open
> `.github/workflows/deploy.yml` and change `branches: [main]` to
> `branches: [master]`.

### 4. Tell GitHub Pages to use the robot
In your repository: **Settings → Pages → Source → select "GitHub Actions"**
(NOT "Deploy from a branch").

### 5. Done — your site is live
After the Actions run finishes (green checkmark, ~2 minutes), your site is at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

### 6. Test the contact form
Send yourself a message from the live site. It should arrive at
**romano.vibecoder@gmail.com** within a minute. If it's not in the inbox,
check Spam and the Promotions tab — mark it "not spam" once and future
messages will land in the inbox.

---

## Updating the site later

Just push your changes to `main` — the robot rebuilds and republishes
automatically. Nothing else to do.

## Rotating or replacing the key

If you ever get a new key: **Settings → Secrets and variables → Actions →
click the secret name → Update secret**, then re-run the workflow
(Actions tab → "Deploy to GitHub Pages" → "Re-run jobs").

---

## Optional: your own domain later

GitHub Pages supports custom domains for free (e.g. `romanogalvan.com`):
**Settings → Pages → Custom domain**, then point your domain's DNS to GitHub.
Ask me for a step-by-step when you're ready.

## Troubleshooting

- **Actions run failed?** Open the failed run in the Actions tab and click
  the red step to read the error. Most common cause: the secret name has a
  typo — it must be exactly `REACT_APP_WEB3FORMS_ACCESS_KEY`.
- **Blank page after deploy?** Make sure Settings → Pages → Source is set to
  "GitHub Actions", and the repo is public (or you have GitHub Pro).
- **Form says "isn't configured yet"?** The secret is missing or misnamed —
  redo step 2, then Actions tab → Re-run jobs.
- **Form says sent but no email?** Check Spam/Promotions in Gmail, and make
  sure you verified your email at web3forms.com (step 1).
- **Want to build on your own computer instead?** You still can: put the key
  in `frontend/.env` locally, then `cd frontend && yarn deploy`. But the
  secrets method above is recommended — nothing sensitive ever sits in files.
