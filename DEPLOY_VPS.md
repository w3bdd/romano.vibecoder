# Deploying to Your Own VPS — Plain-English Guide

This guide takes the site from this project folder to a live website on your
own virtual private server, with the contact form sending email through
**your private mail server** (no third-party form service involved).

**What you'll end up with:**
- Nginx serves the website files and answers visitors
- A small Python backend (FastAPI) handles the contact form and emails you via SMTP
- MongoDB keeps a backup copy of every message
- Free HTTPS padlock from Let's Encrypt
- Everything auto-restarts if the server reboots or something crashes

**What you need before starting:**
1. A VPS running Ubuntu 22.04 or 24.04 (even the cheapest 1GB plan works)
2. A domain name pointed at your server's IP address (an "A record" at your
   domain registrar) — e.g. `yourdomain.com` → your server IP
3. Your private mail server details: SMTP host, port, username, password
4. About 30–45 minutes

---

## Step 1 — Connect to your server

From your computer's terminal:
```bash
ssh root@YOUR-SERVER-IP
```

## Step 2 — Install the ingredients

```bash
# Update the server's package list
sudo apt update && sudo apt upgrade -y

# Node.js 20 (builds the website files)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs
sudo npm install -g yarn

# Python tools (runs the contact-form backend)
sudo apt install -y python3 python3-venv python3-pip

# MongoDB (stores backup copies of messages)
sudo apt install -y mongodb
sudo systemctl enable --now mongodb

# Nginx (serves the website to the world) + Certbot (free HTTPS padlock)
sudo apt install -y nginx certbot python3-certbot-nginx
```

## Step 3 — Put the code on the server

```bash
sudo mkdir -p /var/www/portfolio
sudo chown $USER:$USER /var/www/portfolio
cd /var/www/portfolio
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git .
```

## Step 4 — Set up the backend (contact form + your mail server)

```bash
cd /var/www/portfolio/backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
```

Now edit the settings file and fill in your REAL mail server details:
```bash
nano /var/www/portfolio/backend/.env
```
Make it look like this (replace the values with yours):
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="portfolio"
CORS_ORIGINS="https://yourdomain.com"
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="465"
SMTP_USERNAME="you@yourdomain.com"
SMTP_PASSWORD="your-real-password"
SMTP_FROM="you@yourdomain.com"
CONTACT_RECEIVER="romano.vibecoder@gmail.com"
```
(Save in nano: press Ctrl+O, Enter, then Ctrl+X.)

Quick test that the backend starts and can reach your mail server:
```bash
./venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
```
Visit `http://YOUR-SERVER-IP:8001/api/` briefly (or Ctrl+C to stop after
seeing "Application startup complete").

## Step 5 — Tell systemd to keep the backend running forever

```bash
sudo cp /var/www/portfolio/deploy/portfolio-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-backend
sudo systemctl status portfolio-backend   # should say "active (running)"
```

## Step 6 — Build the website files

```bash
cd /var/www/portfolio/frontend
```

Tell the frontend where its backend lives and to use YOUR mail pipeline:
```bash
nano .env
```
Set (or add) these two lines:
```
REACT_APP_BACKEND_URL=https://yourdomain.com
REACT_APP_CONTACT_MODE=smtp
```

Then build:
```bash
yarn install
yarn build
```

## Step 7 — Point Nginx at the site

```bash
sudo cp /var/www/portfolio/deploy/nginx.conf /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio
# replace "yourdomain.com" with your real domain (it appears 3 times)

sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t                    # checks the config for typos
sudo systemctl reload nginx
```

Your site is now live on plain HTTP. Add the free HTTPS padlock:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot edits the config for you and renews itself automatically.

## Step 8 — Lock the doors (firewall)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 9 — Test everything

1. Open `https://yourdomain.com` — the site should load with the padlock
2. Send yourself a message through the contact form
3. Check **romano.vibecoder@gmail.com** — the message should arrive via your mail server
4. Reboot the server (`sudo reboot`), wait a minute, confirm the site is back
   up by itself

---

## Updating the site later

```bash
cd /var/www/portfolio
git pull
cd frontend && yarn build        # rebuild website files
sudo systemctl restart portfolio-backend   # only if backend code changed
```

## If something goes wrong

- **Site loads but form fails:** `sudo journalctl -u portfolio-backend -n 50`
  shows backend errors (usually a wrong SMTP password or port)
- **502 Bad Gateway:** the backend isn't running —
  `sudo systemctl status portfolio-backend`
- **Nginx errors:** `sudo nginx -t` and `sudo tail -n 50 /var/log/nginx/error.log`
- **Email not arriving but form says sent:** messages are safely stored in
  MongoDB; check SMTP settings in `/var/www/portfolio/backend/.env`
