import React from "react";
import { ArrowRight, FileCheck2, Languages, ShieldCheck, Stamp, Truck, Clock, Image as ImageIcon, MessageCircle, PhoneCall } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { WHATSAPP_NUMBERS } from "@/lib/config";

const WA_NUMBER = WHATSAPP_NUMBERS[0]?.number || "919466145196";

const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I would like to contact you to place an apostille order, check sample documents, and get a price quote.")}`;

const STEPS = [
  { icon: FileCheck2, title: "Online Verification", desc: "Share document details & scans online. We verify document type, state authority, and target country requirements." },
  { icon: Languages, title: "Translation (if needed)", desc: "Certified translators convert documents into the required language for international acceptance." },
  { icon: ShieldCheck, title: "Authentication", desc: "Documents are verified by the issuing authority — university, state HRD, Home Department or notary." },
  { icon: Stamp, title: "Apostille Certification", desc: "Official stamp/seal attached by MEA / designated state authority — confirming international validity." },
  { icon: ImageIcon, title: "Sample Preview & Verification", desc: "Before final courier dispatch, we send you a clear image preview of the completed apostilled document for your verification." },
  { icon: Truck, title: "Home Delivery", desc: "After your approval, the apostilled originals are couriered to your home address with tracking." },
];

export default function Apostille() {
  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="apostille-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Stamp size={12} /> Apostille Services
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              International apostille — done right, delivered fast.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Apostille is an international certification that verifies your document's authenticity for any country in
              the Hague Convention. Contact us on WhatsApp to place your order, view sample apostille documents, and get an instant price quote.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-[12px] font-semibold">
              <ShieldCheck size={14} strokeWidth={2} /> Contact us for order, sample document previews & price quotes on WhatsApp.
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-brand inline-flex items-center gap-2"
                data-testid="apostille-cta-whatsapp"
              >
                <MessageCircle size={18} /> Contact us for order <ArrowRight size={18} strokeWidth={1.7} />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 fade-up delay-200">
            <div className="rounded-3xl bg-brand-ink p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-25" />
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">When you need apostille</div>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {["Scholarship applications", "University admissions", "Work permits & visas", "International notarisations", "Group / bulk processing"].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <ShieldCheck size={18} className="text-brand mt-0.5" strokeWidth={1.6} /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-[0.16em]">Working Days</div>
                    <div className="font-display text-xl font-bold mt-1">Mon - Sat</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-[0.16em]">Turnaround</div>
                    <div className="font-display text-xl font-bold mt-1">3–5 days*</div>
                    <div className="text-[10px] text-white/60 mt-0.5">*excluding holidays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="section bg-white" data-testid="apostille-why">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="Why Apostille Matters" title="Without it, your documents may be rejected abroad." subtitle="Apostille is recognised by every country in the Hague Convention. It is essential proof that your academic, personal or legal documents are valid for international authorities." />
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {[
              { t: "Academic certificates", d: "Degree, transcripts, mark sheets, school leaving certificates." },
              { t: "Personal documents", d: "Birth, marriage, name change & police clearance certificates." },
              { t: "Legal & business", d: "Affidavits, MoAs, power of attorney, commercial agreements." },
              { t: "Country-specific", d: "We tailor processing for Korea, Japan, Germany, China and more." },
            ].map((c) => (
              <div key={c.t} className="card-soft p-6">
                <div className="font-display text-lg font-bold text-brand-ink">{c.t}</div>
                <p className="text-brand-muted text-[14px] mt-2 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="section bg-brand-cream" data-testid="apostille-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Our Process" title="Six clear stages, full transparency." subtitle="Updates at every stage with image previews before dispatch." />
          <div className="mt-12 relative">
            <div className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px bg-brand-line" aria-hidden />
            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative flex gap-6 fade-up" style={{ animationDelay: `${i * 60}ms` }} data-testid={`apostille-step-${i}`}>
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand text-white grid place-items-center shadow-[0_10px_30px_-12px_rgba(236,92,83,0.55)] z-10">
                    <s.icon size={22} strokeWidth={1.6} />
                  </div>
                  <div className="card-soft p-6 flex-1">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-brand-muted">Step {i + 1}</div>
                    <div className="font-display text-xl font-bold text-brand-ink mt-1">{s.title}</div>
                    <p className="text-brand-muted text-[15px] mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Banner Section (No Form) */}
      <section id="contact-whatsapp" className="section bg-brand-ink relative overflow-hidden" data-testid="apostille-whatsapp-banner">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[12px] uppercase tracking-[0.2em] font-semibold">
            <MessageCircle size={14} className="text-brand" /> Instant Quote & Order
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-5 leading-tight">
            Contact us for order on <span className="text-brand">WhatsApp</span> for sample & price.
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Want to place an order, view sample apostille certificates, or get an accurate price quote for your documents? Reach out directly on WhatsApp to speak with our coordinator.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-brand text-base py-3.5 px-8 inline-flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(236,92,83,0.5)]"
              data-testid="apostille-banner-whatsapp-btn"
            >
              <MessageCircle size={22} /> Contact us for order on WhatsApp (+91 94661 45196)
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-left border-t border-white/10 pt-8">
            <div className="flex items-start gap-3 text-white/85">
              <ImageIcon size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">Sample Document Previews</div>
                <div className="text-xs text-white/60 mt-0.5">Inspect verified apostille stamps & seals</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/85">
              <Clock size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">Instant Price Quotes</div>
                <div className="text-xs text-white/60 mt-0.5">Fixed quotes based on country & document type</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/85">
              <PhoneCall size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">Direct Support</div>
                <div className="text-xs text-white/60 mt-0.5">Expert assistance for MEA & State HRD attestation</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
