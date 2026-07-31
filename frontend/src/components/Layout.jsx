import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { LOGO_URL } from "@/lib/config";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/scholarships", label: "Scholarships" },
  { to: "/apostille", label: "Apostille" },
  { to: "/alumni", label: "Alumni" },
  { to: "/about", label: "About" },
  { to: "/notice", label: "Notice" },
  { to: "/contact", label: "Contact" },
  { to: "/additional-services", label: "Additional Services" },
  { to: "/terms", label: "Terms & Conditions" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_-8px_rgba(42,22,20,0.15)]" : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0" data-testid="nav-logo">
          <img src={LOGO_URL} alt="Veritas Sphere" className="h-11 w-auto rounded-lg object-contain bg-white p-1 ring-1 ring-brand-line" />
          <div className="leading-tight hidden xl:block">
            <div className="font-display font-extrabold text-[16px] text-brand-ink tracking-tight">Veritas Sphere</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-brand-muted mt-0.5">The trusted hub for scholarship clarity</div>
          </div>
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-evenly gap-2 mx-3 xl:mx-5">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `link-underline text-[13px] font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-brand" : "text-brand-ink/80 hover:text-brand"
                }`
              }
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link to="/consultation" className="btn-brand text-[11px] py-2 px-3" data-testid="nav-cta-book">
            Book Free Consultation
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-brand-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-brand-line bg-white">
          <div className="px-5 py-5 flex flex-col gap-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`nav-mobile-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-[15px] font-medium ${isActive ? "text-brand" : "text-brand-ink/85"}`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/consultation" className="btn-brand text-center mt-2" data-testid="nav-mobile-cta">
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white" data-testid="site-footer">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 relative">
        <div className="md:col-span-1">
          <div className="flex items-center">
            <img src={LOGO_URL} alt="Veritas Sphere" className="h-16 w-auto rounded-xl object-contain bg-white p-1.5 ring-1 ring-white/20" />
          </div>
          <p className="mt-5 text-white/70 text-sm leading-relaxed">
            Personalised end-to-end guidance for international scholarships, study-abroad admissions and apostille services.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Ic, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand grid place-items-center transition-colors"
                aria-label="social"
              >
                <Ic size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white/50 text-[11px] uppercase tracking-[0.18em] mb-4">Quick Links</div>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/85 hover:text-brand transition-colors">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white/50 text-[11px] uppercase tracking-[0.18em] mb-4">Services</div>
          <ul className="space-y-3 text-sm text-white/85">
            <li>Personal Statement / SOP</li>
            <li>Study Plan Writing</li>
            <li>Scholarship Guidance</li>
            <li>Apostille & Attestation</li>
            <li>Admission & Application</li>
          </ul>
        </div>
        <div>
          <div className="text-white/50 text-[11px] uppercase tracking-[0.18em] mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5" strokeWidth={1.5} /> +91 94661 45196</li>
            <li className="flex items-start gap-2"><Mail size={15} className="mt-0.5" strokeWidth={1.5} /> veritassphere26@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5" strokeWidth={1.5} /> Mon–Sat · 10am – 6pm</li>
            <li className="text-white/60 text-xs mt-3">Udyam Reg No.<br/>UDYAM-OD-05-0063562</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-white/50 text-xs">
        © {new Date().getFullYear()} Veritas Sphere — All Rights Reserved
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
