import React, { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const RULE_PAGES = [
  { title: "Welcome to the Rule Book", body: "These Terms & Conditions explain how Veritas Sphere provides scholarship guidance, document review, consultation, apostille coordination and related student-support services." },
  { title: "Consultations", body: "Free consultancy calls are advisory in nature. Final admissions, scholarship awards, embassy decisions and university outcomes remain under the authority of the relevant institutions." },
  { title: "Documents & Reviews", body: "Students must provide accurate information and original documents. Veritas Sphere may suggest improvements, but applicants remain responsible for final submission accuracy." },
  { title: "Apostille Services", body: "Apostille timelines may vary by issuing authority, public holidays, document type and courier availability. Sample images or previews are shared for verification before dispatch where applicable." },
  { title: "Payments & Refunds", body: "Paid services begin after confirmation. Refund eligibility depends on service stage, work completed and third-party processing costs already incurred." },
  { title: "Privacy & Communication", body: "Contact details and academic information are used only for service delivery, follow-up and coordination. Official communication may happen through phone, email or WhatsApp at +91 94661 45196." },
];

export default function Terms() {
  const [page, setPage] = useState(0);
  const current = RULE_PAGES[page];
  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="terms-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <FileText size={12} /> Terms & Conditions
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Browse the Veritas Sphere Rule Book.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Use the booklet controls to read the key service terms in a simple flipbook format.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="terms-flipbook">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Rule Book" title="Flipbook booklet view." align="center" className="mx-auto" />
          <div className="mt-12 rounded-[2rem] bg-brand-ink p-4 sm:p-8 shadow-[0_35px_90px_-45px_rgba(42,22,20,0.7)]">
            <iframe src="https://heyzine.com/flip-book/a7f624aecc.html" title="Veritas Sphere Rule Book" className="w-full min-h-[70vh] rounded-3xl bg-white" loading="lazy" allowFullScreen />
          <div className="hidden">
              <div className="bg-brand text-white p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <BookOpen size={34} strokeWidth={1.4} />
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/65 mt-8">Veritas Sphere</div>
                  <h2 className="font-display text-4xl font-black mt-3 leading-tight">Rule Book</h2>
                </div>
                <div className="text-white/70 text-sm">Page {page + 1} of {RULE_PAGES.length}</div>
              </div>
              <div className="p-8 sm:p-10 bg-white flex flex-col">
                <div className="text-[11px] uppercase tracking-[0.18em] text-brand-muted">Section {String(page + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-3xl font-bold text-brand-ink mt-3">{current.title}</h3>
                <p className="text-brand-muted text-lg leading-relaxed mt-6">{current.body}</p>
                <div className="mt-auto pt-10 flex items-center justify-between gap-4">
                  <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="btn-outline-brand inline-flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
                    <ChevronLeft size={18} /> Previous
                  </button>
                  <button disabled={page === RULE_PAGES.length - 1} onClick={() => setPage((p) => Math.min(RULE_PAGES.length - 1, p + 1))} className="btn-brand inline-flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-start gap-3 text-brand-muted text-sm justify-center">
            <ShieldCheck size={17} className="text-brand mt-0.5" />
            <span>This page is structured so the full Rule Book can be expanded page-by-page when final policy text is supplied.</span>
          </div>
        </div>
      </section>
    </>
  );
}
