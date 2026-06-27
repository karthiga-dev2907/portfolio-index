import os
import re
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

# Slowapi rate limiting imports
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")

# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Portfolio Backend API",
    description="Backend API for contact form handling and site health.",
    version="1.0.0"
)

# Attach rate limiter to app and override default handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Load configuration from environment variables
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
# Default allow localhost/common ports for local testing
DEFAULT_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
origins = list(set(ALLOWED_ORIGINS + DEFAULT_ORIGINS))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic request model
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

# Input Sanitization Helper
def sanitize_input(text: str) -> str:
    """
    Remove basic HTML tags and scripts to prevent common injection attacks.
    """
    # Remove HTML tags
    clean = re.compile('<.*?>')
    text = re.sub(clean, '', text)
    # Escape quotes and other chars
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return text.strip()

def send_contact_email(name: str, email: str, message: str) -> bool:
    """
    Attempts to send contact request via SMTP.
    If credentials are missing, falls back to logging for easy demonstration.
    """
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port_str = os.getenv("SMTP_PORT", "587")
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    recipient_email = os.getenv("RECIPIENT_EMAIL")

    # Basic logging format of the message
    email_body = f"""
    New Contact Form Submission:
    --------------------------------------
    Name: {name}
    Email: {email}
    
    Message:
    {message}
    --------------------------------------
    """

    # If variables are missing, execute a safe fallback (Console/Log Mock)
    if not all([smtp_host, smtp_user, smtp_pass, recipient_email]):
        logger.warning("SMTP Environment variables are not fully configured. Email was not sent via SMTP.")
        logger.info("--- MOCK EMAIL OUTPUT ---")
        logger.info(email_body)
        logger.info("--------------------------")
        # Return True to simulate successful email dispatch in dev mode
        return True

    try:
        smtp_port = int(smtp_port_str)
        
        # Prepare MIME Message
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact: Message from {name}"
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))

        # Standard secure connection workflow (STARTTLS)
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.ehlo()
        if smtp_port == 587 or smtp_port == 25:
            server.starttls()
            server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, recipient_email, msg.as_string())
        server.close()
        logger.info(f"Email successfully sent to {recipient_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via SMTP: {str(e)}")
        # Raise/return false to signal error to the client
        return False

# Endpoints
@app.get("/api/health")
def health_check():
    """
    Returns API health status.
    """
    return {"status": "ok"}

@app.post("/api/contact")
@limiter.limit("5/minute")
def submit_contact(request: Request, contact: ContactRequest):
    """
    Contact form submission endpoint with rate limiting and sanitization.
    """
    # Sanitize fields
    sanitized_name = sanitize_input(contact.name)
    sanitized_email = sanitize_input(contact.email)
    sanitized_message = sanitize_input(contact.message)

    if not sanitized_name or not sanitized_email or not sanitized_message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message content contains invalid or malicious characters."
        )

    # Dispatch email
    success = send_contact_email(sanitized_name, sanitized_email, sanitized_message)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="There was an issue processing your contact request. Please try again later."
        )

    return {
        "success": True,
        "message": "Thank you! Your message has been received."
    }
