"""Veritas Sphere FastAPI backend.

Routes are exposed under /api. Provides:
- Admin auth (JWT login)
- Public form submissions: bookings, scholarship applications, apostille orders, contact messages
- Public scholarships listing
- Admin endpoints to list, update status, and export CSV
- Resend email notifications (acknowledgement to candidate, alert to admin)
"""
from __future__ import annotations

import asyncio
import csv
import io
import logging
import os
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import List, Literal, Optional

import bcrypt
import jwt as pyjwt
import resend
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger("veritas")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "veritassphere26@gmail.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "ChangeMe123!")
ADMIN_NAME = os.environ.get("ADMIN_NAME", "Veritas Admin")
JWT_SECRET = os.environ.get("JWT_SECRET", "vs-secret")
JWT_ALG = os.environ.get("JWT_ALG", "HS256")
JWT_EXP_HOURS = int(os.environ.get("JWT_EXP_HOURS", "24"))

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Veritas Sphere API")
api_router = APIRouter(prefix="/api")
bearer_scheme = HTTPBearer(auto_error=False)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def gen_id(prefix: str) -> str:
    return f"{prefix}-{uuid.uuid4().hex[:8].upper()}"


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode(), hashed.encode())
    except Exception:
        return False


def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def admin_required(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)) -> str:
    if not creds:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        payload = pyjwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
    except pyjwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}") from e
    email = payload.get("sub")
    admin = await db.admins.find_one({"email": email}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    return email


async def send_email_async(to: str | List[str], subject: str, html: str) -> Optional[str]:
    if not RESEND_API_KEY:
        logger.warning("Resend not configured; skipping email '%s' to %s", subject, to)
        return None
    recipients = to if isinstance(to, list) else [to]
    params = {"from": SENDER_EMAIL, "to": recipients, "subject": subject, "html": html}
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as exc:  # pragma: no cover - external service
        logger.error("Resend send failed (%s -> %s): %s", subject, recipients, exc)
        return None


def render_email(title: str, intro: str, rows: list[tuple[str, str]], footer: str = "") -> str:
    rows_html = "".join(
        f"<tr><td style='padding:8px 12px;color:#755D5A;font-size:13px;text-transform:uppercase;letter-spacing:.04em;'>{k}</td>"
        f"<td style='padding:8px 12px;color:#2A1614;font-size:14px;font-weight:600;'>{v}</td></tr>"
        for k, v in rows
    )
    return f"""
    <div style='background:#FDFBF7;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#2A1614;'>
      <table width='100%' cellspacing='0' cellpadding='0' style='max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8DFD8;'>
        <tr><td style='background:#ec5c53;padding:24px 32px;color:#fff;'>
          <div style='font-size:13px;letter-spacing:.18em;text-transform:uppercase;opacity:.85;'>Veritas Sphere</div>
          <div style='font-size:22px;font-weight:800;margin-top:6px;'>{title}</div>
        </td></tr>
        <tr><td style='padding:28px 32px;'>
          <p style='margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#2A1614;'>{intro}</p>
          <table width='100%' cellspacing='0' cellpadding='0' style='border-collapse:collapse;background:#F5F2EA;border-radius:12px;overflow:hidden;'>{rows_html}</table>
          <p style='margin:24px 0 0 0;color:#755D5A;font-size:13px;line-height:1.6;'>{footer}</p>
        </td></tr>
        <tr><td style='background:#e0523e;padding:14px 32px;color:#fff;font-size:12px;'>Veritas Sphere · veritassphere26@gmail.com · +91 8007486195</td></tr>
      </table>
    </div>
    """


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    token: str
    email: str
    name: str


PackageType = Literal["PS_SOP", "SP", "BOTH", "GUIDANCE", "CONSULTANCY", "ADMISSION", "MINI", "FULL"]
StatusType = Literal["pending", "in_progress", "completed", "cancelled"]


class BookingCreate(BaseModel):
    package: PackageType
    candidate_name: str
    email: EmailStr
    mobile: str
    notes: Optional[str] = None


class Booking(BaseModel):
    id: str
    package: str
    candidate_name: str
    email: str
    mobile: str
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str


class ApplicationCreate(BaseModel):
    candidate_name: str
    degree_plan: Literal["UG", "Masters", "PhD", "Associate"]
    major: str
    education: str
    professional_courses: Optional[str] = None
    mobile: str
    email: EmailStr
    language_exam: Optional[str] = None
    birth_date: str
    target_country: Optional[str] = None
    target_scholarship: Optional[str] = None


class Application(ApplicationCreate):
    id: str
    status: str = "pending"
    created_at: str


class ApostilleCreate(BaseModel):
    candidate_name: str
    email: EmailStr
    mobile: str
    document_type: str
    num_documents: int = Field(ge=1, le=50)
    target_country: Optional[str] = None
    notes: Optional[str] = None


class ApostilleOrder(ApostilleCreate):
    id: str
    estimated_price: int
    status: str = "pending"
    created_at: str


class ContactCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


class ContactMessage(ContactCreate):
    id: str
    status: str = "new"
    created_at: str


class ConsultationCreate(BaseModel):
    candidate_name: str
    email: EmailStr
    mobile: str
    target_country: Optional[str] = None
    target_level: Optional[Literal["UG", "Masters", "PhD", "Associate", "Undecided"]] = "Undecided"
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    goals: Optional[str] = None


class Consultation(ConsultationCreate):
    id: str
    status: str = "pending"
    created_at: str


class StatusUpdate(BaseModel):
    status: StatusType


# ---------------------------------------------------------------------------
# Static data: scholarships
# ---------------------------------------------------------------------------
SCHOLARSHIPS = [
    {"id": "kgsp", "title": "Korean Government Scholarship (GKS)", "country": "South Korea", "country_code": "KR", "flag": "🇰🇷",
     "levels": ["UG", "Masters", "PhD"], "featured": True,
     "deadlines": [{"levels": ["UG"], "date": "Sep–Oct"}, {"levels": ["Masters", "PhD"], "date": "Feb–Mar (Embassy) / Mar–Apr (University)"}],
     "summary": "Full tuition, monthly stipend, airfare, Korean language training and settlement allowance."},
    {"id": "mext", "title": "MEXT Scholarship", "country": "Japan", "country_code": "JP", "flag": "🇯🇵",
     "levels": ["UG", "Masters", "PhD"], "featured": True,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "5 June 2026"}],
     "summary": "Japanese government scholarship covering tuition, living expenses, and travel."},
    {"id": "daad", "title": "DAAD Scholarship", "country": "Germany", "country_code": "DE", "flag": "🇩🇪",
     "levels": ["Masters", "PhD"], "featured": True,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "Varies by programme"}],
     "summary": "Monthly stipend, health insurance, and travel allowance for graduate study in Germany."},
    {"id": "csc", "title": "Chinese Government Scholarship (CSC)", "country": "China", "country_code": "CN", "flag": "🇨🇳",
     "levels": ["UG", "Masters", "PhD"], "featured": True,
     "deadlines": [{"levels": ["UG"], "date": "Jan–Feb"}, {"levels": ["Masters", "PhD"], "date": "Feb–Apr"}],
     "summary": "Full or partial scholarship covering tuition, accommodation, stipend and medical insurance."},
    {"id": "opendoors", "title": "Open Doors Scholarship", "country": "Russia", "country_code": "RU", "flag": "🇷🇺",
     "levels": ["UG", "Masters", "PhD"], "featured": True,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "December"}],
     "summary": "Tuition-free study at top Russian universities for international students."},
    {"id": "bangkok", "title": "Bangkok Government Scholarship", "country": "Thailand", "country_code": "TH", "flag": "🇹🇭",
     "levels": ["Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "Annual cycle"}],
     "summary": "Scholarships at top Thai universities for graduate study."},
    {"id": "chevening", "title": "Chevening Scholarship", "country": "United Kingdom", "country_code": "GB", "flag": "🇬🇧",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Aug–Nov"}],
     "summary": "Fully-funded UK Government Master's scholarship for future leaders."},
    {"id": "commonwealth", "title": "Commonwealth Shared Scholarships", "country": "United Kingdom", "country_code": "GB", "flag": "🇬🇧",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Oct–Dec"}],
     "summary": "For students from low- and middle-income Commonwealth countries."},
    {"id": "danish", "title": "Danish Government Scholarship", "country": "Denmark", "country_code": "DK", "flag": "🇩🇰",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Jan–Mar"}],
     "summary": "Tuition waivers and living grants for Master's students in Denmark."},
    {"id": "eiffel", "title": "Eiffel Excellence Scholarship", "country": "France", "country_code": "FR", "flag": "🇫🇷",
     "levels": ["Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "January"}],
     "summary": "French Ministry scholarship covering monthly allowance, travel and insurance."},
    {"id": "erasmus", "title": "Erasmus Mundus Joint Masters", "country": "Europe", "country_code": "EU", "flag": "🇪🇺",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Oct–Jan"}],
     "summary": "Fully-funded joint Master's across multiple European universities."},
    {"id": "ireland", "title": "Ireland Government Scholarship", "country": "Ireland", "country_code": "IE", "flag": "🇮🇪",
     "levels": ["Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "March"}],
     "summary": "Government of Ireland International Education Scholarship."},
    {"id": "hungary", "title": "Hungary Government Scholarship", "country": "Hungary", "country_code": "HU", "flag": "🇭🇺",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "January"}],
     "summary": "Stipendium Hungaricum – full tuition, monthly stipend and accommodation."},
    {"id": "orange", "title": "Orange Knowledge Programme", "country": "Netherlands", "country_code": "NL", "flag": "🇳🇱",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Varies"}],
     "summary": "Dutch government short courses & Master's programmes for selected countries."},
    {"id": "qecs", "title": "Queen Elizabeth Commonwealth Scholarships", "country": "Commonwealth", "country_code": "GB", "flag": "🇬🇧",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "Nov–Jan"}],
     "summary": "Cross-Commonwealth Master's awards funded by the Association of Commonwealth Universities."},
    {"id": "siga", "title": "Singapore International Graduate Award", "country": "Singapore", "country_code": "SG", "flag": "🇸🇬",
     "levels": ["PhD"], "featured": False,
     "deadlines": [{"levels": ["PhD"], "date": "Jun / Dec"}],
     "summary": "PhD scholarship at A*STAR research institutes and Singaporean universities."},
    {"id": "swedish", "title": "Swedish Institute Scholarships", "country": "Sweden", "country_code": "SE", "flag": "🇸🇪",
     "levels": ["Masters"], "featured": False,
     "deadlines": [{"levels": ["Masters"], "date": "February"}],
     "summary": "Scholarships for Global Professionals — tuition, living costs, insurance and travel."},
    {"id": "swiss", "title": "Swiss Government Excellence Scholarship", "country": "Switzerland", "country_code": "CH", "flag": "🇨🇭",
     "levels": ["PhD", "PostDoc"], "featured": False,
     "deadlines": [{"levels": ["PhD", "PostDoc"], "date": "Sep–Dec"}],
     "summary": "Research scholarships at Swiss universities and federal institutes of technology."},
    {"id": "turkey", "title": "Türkiye Bursları Scholarship", "country": "Türkiye", "country_code": "TR", "flag": "🇹🇷",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "Jan–Feb"}],
     "summary": "Full scholarship including tuition, monthly stipend, accommodation and Turkish language course."},
    {"id": "anso", "title": "ANSO Scholarship", "country": "China", "country_code": "CN", "flag": "🇨🇳",
     "levels": ["Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "March"}],
     "summary": "Alliance of International Science Organizations scholarship at UCAS, China."},
    {"id": "hkpfs", "title": "Hong Kong PhD Fellowship Scheme", "country": "Hong Kong", "country_code": "HK", "flag": "🇭🇰",
     "levels": ["PhD"], "featured": False,
     "deadlines": [{"levels": ["PhD"], "date": "Sep–Dec"}],
     "summary": "Generous monthly stipend and conference travel allowance for outstanding PhD candidates."},
    {"id": "mis", "title": "Malaysian International Scholarship", "country": "Malaysia", "country_code": "MY", "flag": "🇲🇾",
     "levels": ["Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["Masters", "PhD"], "date": "Annual cycle"}],
     "summary": "Scholarships for international students to pursue postgraduate study at Malaysian universities."},
    {"id": "knb", "title": "KNB Scholarship", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "Apr–May"}],
     "summary": "Indonesian government scholarship with tuition and living allowance."},
    {"id": "waikato", "title": "University of Waikato Scholarship", "country": "New Zealand", "country_code": "NZ", "flag": "🇳🇿",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "Varies"}],
     "summary": "Merit-based scholarships for international students at University of Waikato."},
    {"id": "uin_datokarama", "title": "Universitas Datokarama", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "10 May 2026"}],
     "summary": "Scholarship at Universitas Datokarama Palu, Indonesia.",
     "official_site": "https://uindatokarama.ac.id"},
    {"id": "upi", "title": "Universitas Pendidikan Indonesia (UPI)", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "19 May 2026"}],
     "summary": "Scholarship programmes at UPI, Bandung.",
     "official_site": "https://www.upi.edu"},
    {"id": "upnvj", "title": "UPN Veteran Jakarta", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "21 May 2026"}],
     "summary": "UPN Veteran Jakarta scholarship awards.",
     "official_site": "https://www.upnvj.ac.id"},
    {"id": "uksw", "title": "Satya Wacana Christian University", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "31 May 2026"}],
     "summary": "International scholarship at Satya Wacana Christian University.",
     "official_site": "https://www.uksw.edu"},
    {"id": "um_malang", "title": "Universitas Negeri Malang (UM)", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "31 May 2026"}],
     "summary": "Scholarship at Universitas Negeri Malang.",
     "official_site": "https://www.um.ac.id"},
    {"id": "umsu", "title": "Universitas Sumatera Utara (USU/UMSU)", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "31 May 2026"}],
     "summary": "USU / UMSU international scholarship.",
     "official_site": "https://www.usu.ac.id"},
    {"id": "unp", "title": "Universitas Negeri Padang (UNP)", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "31 May 2026"}],
     "summary": "UNP international scholarship.",
     "official_site": "https://www.unp.ac.id"},
    {"id": "telkom", "title": "Telkom University", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "31 May 2026"}],
     "summary": "Telkom University scholarship for international students.",
     "official_site": "https://telkomuniversity.ac.id"},
    {"id": "uin_saizu", "title": "UIN Saizu", "country": "Indonesia", "country_code": "ID", "flag": "🇮🇩",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "15 June 2026"}],
     "summary": "UIN Prof. K.H. Saifuddin Zuhri Purwokerto scholarship.",
     "official_site": "https://www.uinsaizu.ac.id"},
    {"id": "bolashak", "title": "Kazakhstan Government Scholarship (Bolashak)", "country": "Kazakhstan", "country_code": "KZ", "flag": "🇰🇿",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "31 May 2026"}],
     "summary": "Government of Kazakhstan international scholarship programme.",
     "official_site": "https://bolashak.gov.kz"},
    {"id": "saudi_govt", "title": "Saudi Government Scholarships", "country": "Saudi Arabia", "country_code": "SA", "flag": "🇸🇦",
     "levels": ["UG", "Masters", "PhD"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters", "PhD"], "date": "14 June 2026"}],
     "summary": "Ministry of Education, Saudi Arabia — international scholarship programme.",
     "official_site": "https://studyinsaudi.moe.gov.sa"},
    {"id": "al_qasimia", "title": "Al Qasimia University", "country": "United Arab Emirates", "country_code": "AE", "flag": "🇦🇪",
     "levels": ["UG", "Masters"], "featured": False,
     "deadlines": [{"levels": ["UG", "Masters"], "date": "30 June 2026"}],
     "summary": "Al Qasimia University, Sharjah — international scholarship awards.",
     "official_site": "https://alqasimia.ac.ae"},
    {"id": "al_bukhary", "title": "Al Bukhary International University", "country": "Malaysia", "country_code": "MY", "flag": "🇲🇾",
     "levels": ["UG"], "featured": False,
     "deadlines": [{"levels": ["UG"], "date": "31 July 2026"}],
     "summary": "Al Bukhary International University Bachelor's scholarship.",
     "official_site": "https://www.aiu.edu.my"},
]


PACKAGE_PRICES = {
    "PS_SOP": 999,
    "SP": 799,
    "BOTH": 1499,
    "GUIDANCE": 399,
    "CONSULTANCY": 349,
    "ADMISSION": 549,
    "MINI": 1299,
    "FULL": 2799,
}
APOSTILLE_PRICE_PER_DOC = 1500  # INR per document, indicative


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"service": "Veritas Sphere", "status": "ok"}


# ---------- Auth ----------
@api_router.post("/auth/login", response_model=TokenResponse)
async def admin_login(body: LoginRequest):
    admin = await db.admins.find_one({"email": body.email}, {"_id": 0})
    if not admin or not verify_password(body.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return TokenResponse(token=create_token(admin["email"]), email=admin["email"], name=admin.get("name", "Admin"))


@api_router.get("/auth/me")
async def me(email: str = Depends(admin_required)):
    admin = await db.admins.find_one({"email": email}, {"_id": 0, "password_hash": 0})
    return admin


# ---------- Scholarships listing ----------
@api_router.get("/scholarships")
async def list_scholarships(
    level: Optional[str] = None,
    country: Optional[str] = None,
    q: Optional[str] = None,
):
    items = SCHOLARSHIPS
    if level and level != "All":
        items = [s for s in items if level in s["levels"]]
    if country and country != "All":
        items = [s for s in items if s["country"].lower() == country.lower()]
    if q:
        ql = q.lower()
        items = [s for s in items if ql in s["title"].lower() or ql in s["country"].lower()]
    countries = sorted({s["country"] for s in SCHOLARSHIPS})
    return {"items": items, "countries": countries}


# ---------- Bookings ----------
@api_router.post("/bookings", response_model=Booking)
async def create_booking(body: BookingCreate):
    booking = Booking(
        id=gen_id("VS-BK"),
        package=body.package,
        candidate_name=body.candidate_name,
        email=body.email,
        mobile=body.mobile,
        notes=body.notes,
        status="pending",
        created_at=now_iso(),
    )
    doc = booking.model_dump()
    await db.bookings.insert_one(doc)

    price = PACKAGE_PRICES.get(body.package, 0)
    rows = [
        ("Booking ID", booking.id),
        ("Package", body.package.replace("_", " / ")),
        ("Indicative Price", f"₹{price}"),
        ("Candidate", body.candidate_name),
        ("Email", body.email),
        ("Mobile", body.mobile),
    ]
    asyncio.create_task(send_email_async(
        body.email,
        f"Veritas Sphere · Booking Confirmed ({booking.id})",
        render_email("Booking received", "Thank you for booking with Veritas Sphere. Our team will reach out within 24 hours to confirm your slot and share next steps.", rows,
                     "If you need urgent help, WhatsApp us at +91 8007486195."),
    ))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"[New Booking] {body.candidate_name} — {body.package}",
        render_email("New service booking", "A new package booking just landed.", rows + [("Notes", body.notes or "—")]),
    ))
    return booking


# ---------- Scholarship Applications ----------
@api_router.post("/applications", response_model=Application)
async def create_application(body: ApplicationCreate):
    app_id = gen_id("VS-APP")
    record = Application(id=app_id, status="pending", created_at=now_iso(), **body.model_dump())
    await db.applications.insert_one(record.model_dump())

    rows = [
        ("Application ID", app_id),
        ("Candidate", body.candidate_name),
        ("Degree Plan", body.degree_plan),
        ("Major", body.major),
        ("Target Country", body.target_country or "—"),
        ("Target Scholarship", body.target_scholarship or "—"),
        ("Mobile", body.mobile),
        ("Email", body.email),
        ("Language Exam", body.language_exam or "—"),
    ]
    asyncio.create_task(send_email_async(
        body.email,
        f"Veritas Sphere · Application Received ({app_id})",
        render_email("We received your application", "Our scholarship advisors will review your details and reach out within 1–2 working days with personalised next steps.", rows),
    ))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"[New Scholarship Application] {body.candidate_name}",
        render_email("New scholarship application", "Review and follow up with the candidate.", rows),
    ))
    return record


# ---------- Apostille ----------
@api_router.post("/apostille", response_model=ApostilleOrder)
async def create_apostille(body: ApostilleCreate):
    price = APOSTILLE_PRICE_PER_DOC * body.num_documents
    order = ApostilleOrder(
        id=gen_id("VS-APT"),
        estimated_price=price,
        status="pending",
        created_at=now_iso(),
        **body.model_dump(),
    )
    await db.apostille_orders.insert_one(order.model_dump())

    rows_candidate = [
        ("Order ID", order.id),
        ("Document Type", body.document_type),
        ("Number of Documents", str(body.num_documents)),
        ("Target Country", body.target_country or "—"),
        ("Candidate", body.candidate_name),
        ("Mobile", body.mobile),
        ("Email", body.email),
    ]
    rows_admin = rows_candidate + [
        ("Estimated Price", f"₹{price}"),
        ("Notes", body.notes or "—"),
    ]
    asyncio.create_task(send_email_async(
        body.email,
        f"Veritas Sphere · Apostille Request ({order.id})",
        render_email("Apostille request received", "Our apostille desk will contact you to confirm pricing and the next steps within 24 hours. You submit documents online; once apostilled, we will share a verification image and then courier the originals to your home address.", rows_candidate),
    ))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"[New Apostille Order] {body.candidate_name} — {body.num_documents} doc(s)",
        render_email("New apostille order", "A new apostille order needs processing.", rows_admin),
    ))
    return order


# ---------- Contact ----------
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(body: ContactCreate):
    msg = ContactMessage(id=gen_id("VS-MSG"), status="new", created_at=now_iso(), **body.model_dump())
    await db.messages.insert_one(msg.model_dump())

    rows = [
        ("Ticket ID", msg.id),
        ("Name", body.full_name),
        ("Email", body.email),
        ("Phone", body.phone or "—"),
        ("Subject", body.subject),
    ]
    asyncio.create_task(send_email_async(
        body.email,
        f"Veritas Sphere · We received your message ({msg.id})",
        render_email("Thanks for reaching out", "Our team typically replies within one working day.", rows,
                     f"Your message: {body.message}"),
    ))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"[Contact] {body.subject} — {body.full_name}",
        render_email("New contact message", body.message, rows),
    ))
    return msg


# ---------- Free Consultation ----------
@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(body: ConsultationCreate):
    record = Consultation(id=gen_id("VS-CON"), status="pending", created_at=now_iso(), **body.model_dump())
    await db.consultations.insert_one(record.model_dump())

    rows = [
        ("Consultation ID", record.id),
        ("Candidate", body.candidate_name),
        ("Email", body.email),
        ("Mobile", body.mobile),
        ("Target Country", body.target_country or "—"),
        ("Target Level", body.target_level or "—"),
        ("Preferred Date", body.preferred_date or "—"),
        ("Preferred Time", body.preferred_time or "—"),
        ("Goals / Notes", body.goals or "—"),
    ]
    asyncio.create_task(send_email_async(
        body.email,
        f"Veritas Sphere · Free Consultation Booked ({record.id})",
        render_email("Free consultation booked", "Thank you for booking a free 20-minute consultation with Veritas Sphere. Our advisor will WhatsApp you within an hour to confirm the exact slot.", rows),
    ))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"[Free Consultation] {body.candidate_name}",
        render_email("New free consultation request", "Schedule a 20-minute call with the candidate.", rows),
    ))
    return record


# ---------- Admin: list, update, export ----------
COLLECTION_MAP = {
    "bookings": "bookings",
    "applications": "applications",
    "apostille": "apostille_orders",
    "messages": "messages",
    "consultations": "consultations",
}


@api_router.get("/admin/stats")
async def admin_stats(_: str = Depends(admin_required)):
    stats = {}
    for key, coll in COLLECTION_MAP.items():
        stats[key] = await db[coll].count_documents({})
    return stats


@api_router.get("/admin/{kind}")
async def admin_list(kind: str, status_filter: Optional[str] = None, _: str = Depends(admin_required)):
    coll = COLLECTION_MAP.get(kind)
    if not coll:
        raise HTTPException(status_code=404, detail="Unknown resource")
    query: dict = {}
    if status_filter:
        query["status"] = status_filter
    items = await db[coll].find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"items": items}


@api_router.patch("/admin/{kind}/{item_id}/status")
async def admin_update_status(kind: str, item_id: str, body: StatusUpdate, _: str = Depends(admin_required)):
    coll = COLLECTION_MAP.get(kind)
    if not coll:
        raise HTTPException(status_code=404, detail="Unknown resource")
    result = await db[coll].update_one({"id": item_id}, {"$set": {"status": body.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"id": item_id, "status": body.status}


@api_router.get("/admin/{kind}/export.csv")
async def admin_export(kind: str, _: str = Depends(admin_required)):
    coll = COLLECTION_MAP.get(kind)
    if not coll:
        raise HTTPException(status_code=404, detail="Unknown resource")
    items = await db[coll].find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    if not items:
        items = [{"info": "no records"}]
    keys = sorted({k for it in items for k in it.keys()})
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=keys)
    writer.writeheader()
    for it in items:
        writer.writerow({k: it.get(k, "") for k in keys})
    buf.seek(0)
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=veritas_{kind}.csv"},
    )


# ---------------------------------------------------------------------------
# Startup: seed admin
# ---------------------------------------------------------------------------
@app.on_event("startup")
async def on_startup() -> None:
    existing = await db.admins.find_one({"email": ADMIN_EMAIL}, {"_id": 0})
    if not existing:
        await db.admins.insert_one(
            {
                "email": ADMIN_EMAIL,
                "name": ADMIN_NAME,
                "password_hash": hash_password(ADMIN_PASSWORD),
                "created_at": now_iso(),
            }
        )
        logger.info("Seeded admin user %s", ADMIN_EMAIL)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
