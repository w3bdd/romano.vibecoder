# ---------------------------------------------------------------
# Romano Galvan — Portfolio Backend (FastAPI)
# This server does one main job: receive contact-form messages,
# guard them against spam, save a backup copy in the database,
# and forward them to your inbox through your private SMTP server.
# ---------------------------------------------------------------
from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.utils import formataddr
from pathlib import Path
import asyncio
import logging
import os
import smtplib
import ssl
import time

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# --- Database (MongoDB) -----------------------------------------
# Connection details come from the .env file — never written in code.
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# --- Mail settings (read from .env) ------------------------------
# Fill these in with your private mail server details when going live.
SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '465'))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM = os.environ.get('SMTP_FROM', SMTP_USERNAME)
CONTACT_RECEIVER = os.environ.get('CONTACT_RECEIVER', '')  # where enquiries land

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# --- What a contact message looks like ---------------------------
class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr                      # checks the address looks like a real email
    budget: str = Field(default="Not specified", max_length=60)
    message: str = Field(min_length=10, max_length=5000)
    website: str = ""                    # hidden trap field — humans never fill this in


# --- Simple anti-spam shield -------------------------------------
# Remembers how many messages each visitor (IP address) sent recently.
# More than 5 per hour from the same visitor gets politely refused.
RATE_LIMIT_HITS = {}
MAX_PER_HOUR = 5


def deliver_email(msg: ContactMessage) -> bool:
    """Send the enquiry through your private SMTP mail server.
    smtplib is a blocking library, so FastAPI runs this in a side thread
    to keep the website fast for other visitors."""
    # Placeholder host means credentials aren't set up yet — skip sending.
    if not SMTP_HOST or 'yourmailserver' in SMTP_HOST:
        logger.info("SMTP not configured yet — message stored in database only.")
        return False

    body = (
        f"New portfolio enquiry\n"
        f"---------------------\n"
        f"Name:   {msg.name}\n"
        f"Email:  {msg.email}\n"
        f"Budget: {msg.budget}\n\n"
        f"{msg.message}\n"
    )
    mail = MIMEText(body, "plain", "utf-8")
    mail["Subject"] = f"Portfolio enquiry from {msg.name}"
    mail["From"] = formataddr(("Portfolio Contact Form", SMTP_FROM))
    mail["To"] = CONTACT_RECEIVER
    mail["Reply-To"] = msg.email  # hit "Reply" in your inbox to answer the visitor

    context = ssl.create_default_context()
    if SMTP_PORT == 465:
        # Port 465 = SSL from the very first byte (most private servers)
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=15) as server:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(mail)
    else:
        # Port 587 = starts plain, then upgrades to a secure TLS tunnel
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
            server.starttls(context=context)
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(mail)
    return True


@api_router.get("/")
async def root():
    return {"message": "Romano Galvan portfolio API is running"}


@api_router.post("/contact")
async def submit_contact(msg: ContactMessage, request: Request):
    # 1) Honeypot: real visitors never see the "website" field, so if it's
    #    filled in, a bot sent this. Pretend it worked and throw it away.
    if msg.website.strip():
        return {"ok": True, "emailed": False}

    # 2) Rate limit: max 5 messages per hour per visitor.
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    recent = [t for t in RATE_LIMIT_HITS.get(ip, []) if now - t < 3600]
    if len(recent) >= MAX_PER_HOUR:
        raise HTTPException(status_code=429, detail="Too many messages — please try again later or reach out on WhatsApp.")
    recent.append(now)
    RATE_LIMIT_HITS[ip] = recent

    # 3) Keep a backup copy in the database (in case email ever fails).
    doc = {
        "name": msg.name,
        "email": msg.email,
        "budget": msg.budget,
        "message": msg.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)

    # 4) Forward to your inbox via SMTP. If the mail server hiccups,
    #    the visitor still sees success because the backup is saved.
    try:
        emailed = await asyncio.to_thread(deliver_email, msg)
    except Exception:
        logger.exception("SMTP delivery failed")
        emailed = False

    return {"ok": True, "emailed": emailed}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
