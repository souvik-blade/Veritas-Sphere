# Veritas Sphere — Product Requirements Document

## Original Problem Statement
Build a scholarship & study-abroad consultancy website for **Veritas Sphere** with brand palette `#ec5c53` (main) and `#e0523e` (dark patches), using the uploaded Veritas logo. Pages: Home, Services, Scholarships, Apostille, About, Notice, Contact + Admin dashboard. Backend stores bookings, scholarship applications, apostille orders, contact messages.

## User Choices (Captured)
- **Email**: Resend (`re_L5zp8ZSh_…`), notifications to `veritassphere26@gmail.com`
- **Quick chat**: Message form (DB) + WhatsApp click-to-chat to `+91 80074 86195` and `+91 87001 61753`
- **Admin auth**: JWT email/password
- **Logo**: User-provided Veritas logo, used as-is across header, hero, footer, admin
- **Palette**: Red coral `#ec5c53` main, dark patch `#e0523e`, cream `#FDFBF7` body surface

## Architecture
- **Backend**: FastAPI, MongoDB (motor), JWT (PyJWT), bcrypt, Resend SDK, async fire-and-forget emails. All routes under `/api`.
- **Frontend**: React 19 + react-router-dom v7, TailwindCSS, shadcn/ui base, Cabinet Grotesk + Work Sans (Fontshare/Google Fonts), `sonner` for toasts, axios with bearer interceptor.
- **Admin**: seeded on startup from `.env` (idempotent).

## User Personas
1. **Student applicant** (UG/Masters/PhD) — books a service, applies to a scholarship, requests apostille, contacts support.
2. **Parent/Guardian** — browses services, contacts via WhatsApp/email.
3. **Admin / Founder** — logs in, monitors leads, updates statuses, exports CSV.

## Core Requirements (Static)
- Brand palette: `#ec5c53` (primary), `#e0523e` (primary-dark), `#FDFBF7` (cream), `#2A1614` (ink).
- All forms with `data-testid`.
- 25+ scholarships with filter (level + country + free-text).
- Apostille step-by-step process (5 stages) + order pricing (₹1500/doc estimate).
- Service plans with prices: PS/SOP ₹999, SP ₹799, Combo ₹1499, Guidance ₹399, Consultancy ₹349, Admission ₹549, Mini ₹1299, Full ₹2799.
- Notice page (calendar-style timeline).
- Email confirmations to candidate AND admin alert (best-effort via Resend sandbox).
- Admin dashboard: 4 tabs (Bookings, Applications, Apostille, Messages) with status update + CSV export.

## What's Been Implemented (2026-02-09 — Phase 1 / MVP)
- ✅ Full FastAPI backend: auth (JWT login/me), bookings, applications, apostille, contact, scholarships listing, admin stats/list/patch-status/export.csv. 23/23 pytest tests passing.
- ✅ Resend email integration (asyncio.to_thread, fire-and-forget). Acknowledgement to candidate + alert to admin for every form submission.
- ✅ All 8 frontend pages: Home, Services, Scholarships, Apostille, Notice, About, Contact, Admin Login, Admin Dashboard.
- ✅ Admin seeded on startup; JWT in localStorage; auth-protected admin routes.
- ✅ WhatsApp floating button + dual numbers on Contact page.
- ✅ Branded design with Cabinet Grotesk display + Work Sans body, scrolling marquee, soft grain textures, hover lifts.
- ✅ Admin can change status via dropdown, search, filter by status, export CSV.
- ✅ Mobile responsive nav with hamburger menu.

## Prioritized Backlog
### P1 — Recommended next
- Verify a custom sender domain in Resend so emails reliably reach `veritassphere26@gmail.com` and applicants (currently uses `onboarding@resend.dev` sandbox, which only delivers to verified addresses).
- Rate-limit public POST endpoints (`/contact`, `/bookings`, `/applications`, `/apostille`) to prevent abuse.
- HTML-escape user-supplied strings before embedding in email bodies.

### P2
- Real-time WebSocket chat for Contact (currently uses message form + WhatsApp).
- Move scholarships from `server.py` constant to a MongoDB collection with admin CRUD.
- Pagination + date-range filter in admin tables.
- Public testimonials/admissions wall (curated alumni stories).
- SEO meta-tags, OpenGraph images per page.
- Bulk apostille pricing tiers / per-document override.

### P3
- Multi-language site (English/Hindi).
- Student portal: self-service login to track booking status & document uploads.
- Stripe / Razorpay integration for paid plans.

## Test Credentials
See `/app/memory/test_credentials.md`.
