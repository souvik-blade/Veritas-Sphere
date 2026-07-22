import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe, Sparkles, Users, ShieldCheck, Clock, MessageCircle, GraduationCap, FileText } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { LOGO_URL } from "@/lib/config";

const REASONS = [
  { icon: Award, title: "85% Success Rate", desc: "Proven track record of placing students into globally-funded programmes." },
  { icon: Globe, title: "30+ Countries", desc: "Active scholarship coverage across Asia, Europe, North America and Oceania." },
  { icon: Users, title: "Expert Mentors", desc: "Insider knowledge from alumni who navigated the same journey." },
  { icon: Sparkles, title: "Personalised Approach", desc: "Tailored study-plan and statement writing — never templated." },
  { icon: ShieldCheck, title: "Personalised Revisions", desc: "Targeted revisions until your application reads sharp and authentic." },
  { icon: Clock, title: "Mon – Sat Support", desc: "10 AM – 6 PM (Mon–Sat)" },
];

const STEPS = [
  { icon: GraduationCap, title: "Our Services", desc: "Tell us your goals — we analyse your profile and map a personalised scholarship and application roadmap." },
  { icon: FileText, title: "Documents & Drafting", desc: "We craft your PS, SP and supporting documents with revisions." },
  { icon: ShieldCheck, title: "Submission & Apostille", desc: "Verified, apostilled, and submitted on time — every time." },
  { icon: Award, title: "Offer Letter / Funded Offer", desc: "Track your application and secure an offer letter or funded offer based on your profile." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ribbon overflow-hidden" data-testid="home-hero">
        <div className="absolute inset-0 grain pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-brand-ink text-[11px] uppercase tracking-[0.2em] font-semibold border border-brand-line">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" /> Registered at Udyam · UDYAM-OD-05-0063562
            </div>
            <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] font-black tracking-tighter text-brand-ink">
              Unlock Your Dream <span className="text-brand">International Scholarship</span>.
            </h1>
            <p className="mt-6 text-brand-muted text-lg max-w-xl leading-relaxed">
              Veritas Sphere is a personalised scholarship & study-abroad consultancy. We craft your story, prepare your
              documents and walk every step until you secure an offer letter or funded offer based on your profile.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/consultation" className="btn-brand inline-flex items-center gap-2" data-testid="hero-book-cta">
                Book Free Consultation <ArrowRight size={18} strokeWidth={1.7} />
              </Link>
              <Link to="/scholarships" className="btn-outline-brand inline-flex items-center gap-2" data-testid="hero-browse-cta">
                Browse Scholarships
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              <Stat value="85%" label="Success rate" />
              <Stat value="30+" label="Countries" />
              <Stat value="Mon – Sat" label={<>Support<br /><span className="text-[10px]">10 AM – 6 PM (Mon–Sat)</span></>} />
            </div>
          </div>

          <div className="lg:col-span-5 relative fade-up delay-200">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand/20 rounded-[2.2rem] blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] bg-brand p-8 text-white shadow-[0_30px_80px_-30px_rgba(236,92,83,0.6)]">
                <div className="absolute inset-0 grain rounded-[2rem] opacity-30" />
                <div className="relative">
                  <img src={LOGO_URL} alt="Veritas Sphere" className="w-28 h-28 rounded-2xl object-contain bg-white p-2 ring-4 ring-white/30" />
                  <div className="mt-6 font-display text-3xl font-extrabold leading-tight">
                    “Truth-led guidance for an entire sphere of opportunity.”
                  </div>
                  <p className="mt-4 text-white/90 leading-relaxed">
                    We help students secure GKS, MEXT, DAAD, CSC, Chevening, Eiffel & 20+ more scholarships every year.
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <Link to="/services" className="rounded-xl bg-white/15 hover:bg-white/25 px-4 py-3 text-sm font-semibold backdrop-blur-sm transition-colors text-center">
                      View packages
                    </Link>
                    <Link to="/contact" className="rounded-xl bg-white text-brand hover:bg-brand-dark hover:text-white px-4 py-3 text-sm font-semibold transition-colors text-center">
                      Talk to us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="border-y border-brand-line bg-white overflow-hidden">
        <div className="marquee-track py-5 text-brand-ink/70">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["GKS Korea 🇰🇷", "MEXT Japan 🇯🇵", "DAAD Germany 🇩🇪", "CSC China 🇨🇳", "Chevening UK 🇬🇧", "Eiffel France 🇫🇷", "Erasmus Mundus 🇪🇺", "Türkiye Bursları 🇹🇷", "Stipendium Hungaricum 🇭🇺", "Open Doors Russia 🇷🇺"].map((s, i) => (
              <span key={`${k}-${i}`} className="mx-8 font-display text-xl tracking-tight whitespace-nowrap">{s}</span>
            ))
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-brand-cream" data-testid="home-why-us">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Why Choose Veritas Sphere" title="Personal mentorship, every step of the way." subtitle="A small, dedicated team — not a fragmented portal. Every plan is hand-crafted to your story and target." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {REASONS.map((r, idx) => (
              <div key={r.title} className="card-soft p-7 fade-up" style={{ animationDelay: `${idx * 60}ms` }} data-testid={`why-card-${idx}`}>
                <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center">
                  <r.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-xl font-bold mt-5 text-brand-ink">{r.title}</h3>
                <p className="text-brand-muted mt-2 leading-relaxed text-[15px]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white" data-testid="home-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Our Process" title="Four steps to a bright future." />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative card-soft p-7" data-testid={`process-step-${i}`}>
                <div className="absolute top-5 right-5 font-display text-5xl text-brand/15 font-black">{String(i + 1).padStart(2, "0")}</div>
                <div className="w-12 h-12 rounded-xl bg-brand text-white grid place-items-center">
                  <s.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-lg font-bold mt-5 text-brand-ink">{s.title}</h3>
                <p className="text-brand-muted text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand" />
        <div className="absolute inset-0 grain opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05]">
              Ready to start your scholarship journey?
            </h2>
            <p className="text-white/85 mt-5 text-lg leading-relaxed max-w-xl">
              Book a free 20-minute consultation. We will map your eligibility, deadlines, and the scholarships best suited to your profile.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link to="/consultation" className="bg-white text-brand hover:bg-brand-cream rounded-full px-8 py-4 font-semibold transition-all hover:-translate-y-0.5" data-testid="cta-book">
              Book Free Consultation
            </Link>
            <Link to="/services" className="bg-brand-dark text-white hover:bg-brand-deeper rounded-full px-8 py-4 font-semibold transition-all hover:-translate-y-0.5 inline-flex items-center gap-2" data-testid="cta-services">
              <Sparkles size={18} strokeWidth={1.6} /> View packages
            </Link>
          </div>
        </div>
      </section>
      )}
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="border-l-2 border-brand pl-4">
      <div className="font-display text-3xl font-black text-brand-ink">{value}</div>
      <div className="text-xs uppercase tracking-[0.16em] text-brand-muted mt-1">{label}</div>
    </div>
  );
}
