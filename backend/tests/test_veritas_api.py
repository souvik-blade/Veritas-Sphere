"""End-to-end Veritas Sphere API tests covering public + admin flows."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://unlock-abroad.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# ---------- health ----------
class TestHealth:
    def test_root_health(self, api_client):
        r = api_client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert body.get("status") == "ok"
        assert body.get("service") == "Veritas Sphere"


# ---------- scholarships ----------
class TestScholarships:
    def test_list_all(self, api_client):
        r = api_client.get(f"{API}/scholarships", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "items" in data and "countries" in data
        assert isinstance(data["items"], list)
        assert len(data["items"]) >= 20
        assert "South Korea" in data["countries"]

    def test_filter_by_level_masters(self, api_client):
        r = api_client.get(f"{API}/scholarships", params={"level": "Masters"}, timeout=15)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) > 0
        for s in items:
            assert "Masters" in s["levels"]

    def test_filter_by_country_south_korea(self, api_client):
        r = api_client.get(f"{API}/scholarships", params={"country": "South Korea"}, timeout=15)
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 1
        for s in items:
            assert s["country"] == "South Korea"

    def test_search_q_korea(self, api_client):
        r = api_client.get(f"{API}/scholarships", params={"q": "korea"}, timeout=15)
        assert r.status_code == 200
        items = r.json()["items"]
        assert any("korea" in s["title"].lower() or "korea" in s["country"].lower() for s in items)


# ---------- bookings ----------
class TestBookings:
    def test_create_booking_ps_sop(self, api_client):
        payload = {
            "package": "PS_SOP",
            "candidate_name": "TEST_Booking User",
            "email": "test_booking@example.com",
            "mobile": "9999900001",
            "notes": "automated test",
        }
        r = api_client.post(f"{API}/bookings", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        b = r.json()
        assert b["id"].startswith("VS-BK-")
        assert b["package"] == "PS_SOP"
        assert b["candidate_name"] == "TEST_Booking User"
        assert b["status"] == "pending"

    def test_create_booking_invalid_package(self, api_client):
        r = api_client.post(
            f"{API}/bookings",
            json={"package": "INVALID", "candidate_name": "X", "email": "x@y.com", "mobile": "1"},
            timeout=15,
        )
        assert r.status_code == 422


# ---------- applications ----------
class TestApplications:
    def test_create_application(self, api_client):
        payload = {
            "candidate_name": "TEST_App Candidate",
            "degree_plan": "Masters",
            "major": "Computer Science",
            "education": "B.Tech CSE, 8.5 CGPA",
            "professional_courses": "AWS Certified",
            "mobile": "9999900002",
            "email": "test_app@example.com",
            "language_exam": "IELTS 7.5",
            "birth_date": "1998-05-12",
            "target_country": "South Korea",
            "target_scholarship": "GKS",
        }
        r = api_client.post(f"{API}/applications", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        a = r.json()
        assert a["id"].startswith("VS-APP-")
        assert a["degree_plan"] == "Masters"
        assert a["major"] == "Computer Science"
        assert a["status"] == "pending"


# ---------- apostille ----------
class TestApostille:
    def test_create_apostille_price(self, api_client):
        payload = {
            "candidate_name": "TEST_Apostille User",
            "email": "test_apt@example.com",
            "mobile": "9999900003",
            "document_type": "Degree Certificate",
            "num_documents": 3,
            "target_country": "Germany",
            "notes": "urgent",
        }
        r = api_client.post(f"{API}/apostille", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        o = r.json()
        assert o["id"].startswith("VS-APT-")
        assert o["estimated_price"] == 1500 * 3
        assert o["num_documents"] == 3
        assert o["status"] == "pending"

    def test_apostille_doc_count_validation(self, api_client):
        r = api_client.post(
            f"{API}/apostille",
            json={
                "candidate_name": "x",
                "email": "x@y.com",
                "mobile": "1",
                "document_type": "Birth",
                "num_documents": 0,
            },
            timeout=15,
        )
        assert r.status_code == 422


# ---------- contact ----------
class TestContact:
    def test_create_contact(self, api_client):
        payload = {
            "full_name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "phone": "9999900004",
            "subject": "Inquiry about GKS",
            "message": "Please help me apply for GKS.",
        }
        r = api_client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        m = r.json()
        assert m["id"].startswith("VS-MSG-")
        assert m["subject"] == "Inquiry about GKS"
        assert m["status"] == "new"


# ---------- auth ----------
class TestAuth:
    def test_login_success(self, api_client):
        r = api_client.post(
            f"{API}/auth/login",
            json={"email": "veritassphere26@gmail.com", "password": "Veritas@2026"},
            timeout=15,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert "token" in data and len(data["token"]) > 10
        assert data["email"] == "veritassphere26@gmail.com"

    def test_login_wrong_password(self, api_client):
        r = api_client.post(
            f"{API}/auth/login",
            json={"email": "veritassphere26@gmail.com", "password": "wrong"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_admin_endpoints_require_token(self, api_client):
        r = api_client.get(f"{API}/admin/stats", timeout=15)
        assert r.status_code == 401
        r = api_client.get(f"{API}/admin/bookings", timeout=15)
        assert r.status_code == 401


# ---------- admin endpoints ----------
class TestAdmin:
    def test_stats(self, auth_client):
        r = auth_client.get(f"{API}/admin/stats", timeout=15)
        assert r.status_code == 200
        s = r.json()
        for key in ["bookings", "applications", "apostille", "messages"]:
            assert key in s
            assert isinstance(s[key], int)

    @pytest.mark.parametrize("kind", ["bookings", "applications", "apostille", "messages"])
    def test_list_kind(self, auth_client, kind):
        r = auth_client.get(f"{API}/admin/{kind}", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "items" in data
        assert isinstance(data["items"], list)

    def test_unknown_kind_404(self, auth_client):
        r = auth_client.get(f"{API}/admin/unknown_kind", timeout=15)
        assert r.status_code == 404

    def test_patch_booking_status(self, api_client, auth_client):
        # create a booking first
        payload = {
            "package": "SP",
            "candidate_name": "TEST_Patch Booking",
            "email": "test_patch@example.com",
            "mobile": "9999900005",
        }
        cr = api_client.post(f"{API}/bookings", json=payload, timeout=15)
        assert cr.status_code == 200
        bid = cr.json()["id"]

        # patch
        pr = auth_client.patch(
            f"{API}/admin/bookings/{bid}/status",
            json={"status": "in_progress"},
            timeout=15,
        )
        assert pr.status_code == 200, pr.text
        assert pr.json()["status"] == "in_progress"

        # verify persistence via list
        lr = auth_client.get(f"{API}/admin/bookings", timeout=15)
        items = lr.json()["items"]
        match = next((it for it in items if it["id"] == bid), None)
        assert match is not None
        assert match["status"] == "in_progress"

    def test_patch_unknown_id_404(self, auth_client):
        r = auth_client.patch(
            f"{API}/admin/bookings/VS-BK-NOPE/status",
            json={"status": "completed"},
            timeout=15,
        )
        assert r.status_code == 404

    def test_export_csv_bookings(self, auth_client):
        r = auth_client.get(f"{API}/admin/bookings/export.csv", timeout=20)
        assert r.status_code == 200
        assert "text/csv" in r.headers.get("content-type", "")
        assert "attachment" in r.headers.get("content-disposition", "").lower()
        body = r.text
        assert "\n" in body  # at least header
        first_line = body.splitlines()[0]
        assert "id" in first_line or "info" in first_line
