import React from "react";
import { Calendar, Megaphone, GraduationCap, Briefcase } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const NOTICES = [
  {
    date: "2026-04-15",
    type: "Internship",
    icon: Briefcase,
    title: "Internship Opportunity — Applications Open",
    body: "Veritas Sphere is opening internship slots for the upcoming cohort. Stipend-based opportunities for college students passionate about scholarships and study-abroad guidance. Apply via the Contact page with subject 'Internship'.",
  },
];

const fmt = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function Notice() {
  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="notice-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Calendar size={12} /> Notice Board
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Updates, deadlines & opportunities — all in one place.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Stay current on scholarship cycles, internship openings, webinars and activity drops from Veritas Sphere.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="notice-list">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Latest" title="What's new this month." />
          <ol className="mt-12 relative space-y-6">
            <div className="hidden md:block absolute left-[120px] top-2 bottom-2 w-px bg-brand-line" aria-hidden />
            {NOTICES.map((n, i) => (
              <li key={i} className="grid md:grid-cols-[120px_1fr] gap-6 items-start fade-up" style={{ animationDelay: `${i * 60}ms` }} data-testid={`notice-${i}`}>
                <div className="md:text-right">
                  <div className="font-display text-xl font-extrabold text-brand-ink leading-none">{fmt(n.date)}</div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-brand-muted mt-1">{n.type}</div>
                </div>
                <div className="card-soft p-6 relative">
                  <div className="hidden md:block absolute -left-[19px] top-7 w-3.5 h-3.5 rounded-full bg-brand ring-4 ring-brand-cream" />
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand grid place-items-center shrink-0">
                      <n.icon size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-brand-ink">{n.title}</div>
                      <p className="text-brand-muted text-[15px] leading-relaxed mt-2">{n.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
