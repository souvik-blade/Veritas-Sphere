import React from "react";
import { Calendar, Briefcase } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const NOTICES = [
  {
    type: "Internship",
    icon: Briefcase,
    title: "Internship Opportunity — Applications Opening Soon",
    body: "Veritas Sphere will soon be opening internship slots for the upcoming cohort. Stipend-based opportunities for college students passionate about scholarships and study-abroad guidance. Applications are not yet open — stay tuned for the announcement.",
  },
];

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
          <SectionTitle eyebrow="Upcoming" title="What's coming up." subtitle="Exact dates will be announced closer to launch — stay tuned." />
          <ol className="mt-12 relative space-y-6">
            {NOTICES.map((n, i) => (
              <li key={i} className="fade-up" style={{ animationDelay: `${i * 60}ms` }} data-testid={`notice-${i}`}>
                <div className="card-soft p-7">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center shrink-0">
                      <n.icon size={22} strokeWidth={1.6} />
                    </div>
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.18em] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> Upcoming · {n.type}
                      </div>
                      <div className="font-display text-xl font-bold text-brand-ink mt-3">{n.title}</div>
                      <p className="text-brand-muted text-[15px] leading-relaxed mt-2">{n.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}
    </>
  );
}
