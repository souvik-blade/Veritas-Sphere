import React from "react";
import { Award, GraduationCap, Globe2, Quote, UserRound } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const ALUMNI = [
  {
    name: "SRUSHTI SUDHIR MAHATME",
    photo: "/alumni/srushti.jpeg",
    displayName: "Srushti Sudhir Mahatme",
    photo: "/images/alumni/srushti.jpg",
    scholarship: "KYUNGDONG UNIVERSITY SCHOLARSHIP",
    university: "KYUNGDONG UNIVERSITY",
    level: "BACHELOR'S DEGREE (UG)",
    field: "SMART COMPUTING",
    country: "SOUTH KOREA",
    flag: "🇰🇷",
    testimonial:
      "Veritas Sphere’s mentorship provided me with structured guidance and clear reviews that strengthened my preparation for the Kyungdong University Scholarship. Their approach helped me focus on my academic goals in Smart Computing with confidence.",
  },
  {
    name: "AYUSHMAN BAL",
    photo: "/alumni/ayushman.jpeg",
    displayName: "Ayushman Bal",
    photo: "/images/alumni/ayushman.jpg",
    scholarship: "UNIVERSITY ENTRY-LEVEL SCHOLARSHIP",
    university: "BEIJING NORMAL-HONG KONG BAPTIST UNIVERSITY",
    level: "BACHELOR'S DEGREE (UG)",
    field: "BSC HONS",
    country: "CHINA",
    flag: "🇨🇳",
    testimonial:
      "Thanks to Veritas Sphere's mentorship, I was able to discover a lot of potential qualities that allowed me to prepare myself for getting a scholarship at BNBU. Their structured planning as well as reviews did help me a lot.",
  },
  {
    name: "SUPRIYA RUSHI DUMBE",
    photo: "/alumni/supriya.jpeg",
    displayName: "Supriya Rushi Dumbe",
    photo: "/images/alumni/supriya.jpg",
    scholarship: "GLOBAL KOREA SCHOLARSHIP (GKS) 2026",
    university: "CHONNAM NATIONAL UNIVERSITY",
    level: "MASTER'S DEGREE",
    field: "PHARMACY",
    country: "SOUTH KOREA",
    flag: "🇰🇷",
    testimonial:
      "The mentorship program guided me at every step of my Global Korea Scholarship journey. From preparing documents to shaping my application for Chonnam National University, the support was professional, responsive, and reassuring. Pursuing my Master's in Pharmacy abroad felt less overwhelming because of their structured guidance. I truly recommend this mentorship to anyone aspiring to study in South Korea.",
  },
  {
    name: "AASTHA",
    photo: "/alumni/aastha.jpeg",
    displayName: "Aastha",
    photo: "/images/alumni/aastha.jpg",
    scholarship: null,
    university: "KYOTO UNIVERSITY OF ADVANCED SCIENCES",
    level: "BACHELOR'S DEGREE (UG)",
    field: "BSC. APPLIED BIOLOGICAL SCIENCES UNDER THE FACULTY OF BIO-ENVIRONMENTAL SCIENCE",
    country: "JAPAN",
    flag: "🇯🇵",
    testimonial:
      "Getting accepted into Kyoto University of Advanced Sciences has been a turning point for me. The mentorship program provided structured guidance, timely feedback, and constant encouragement that made the application process smoother. Their support helped me believe in my potential to pursue Applied Biological Sciences under the Faculty of Bio-Environmental Science. I'm grateful for the mentorship that made this opportunity possible.",
  },
];

export default function Alumni() {
  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="alumni-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Award size={12} /> Alumni
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Scholarship journeys shaped with Veritas Sphere.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Meet students who used structured mentorship, careful reviews, and focused planning to pursue international scholarship pathways.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="alumni-profiles">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Profiles" title="Alumni success profiles." subtitle="Each profile includes university, program, field, country, photo space and testimonial." />
          <div className="grid lg:grid-cols-2 gap-6 mt-12">
            {ALUMNI.map((person) => (
              <article key={person.name} className="card-soft p-7 flex flex-col sm:flex-row gap-6">
                <div className="sm:w-40 shrink-0">
            <div className="aspect-[4/5] rounded-2xl bg-white border border-brand-line overflow-hidden">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.name + " alumni portrait"}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              ) : (
                <div className="h-full grid place-items-center text-center p-4">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-brand text-white grid place-items-center mx-auto font-display text-2xl font-black">
                      {person.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-brand-muted">Formal photo</div>
                  </div>
                </div>
              )}
            </div>
          </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-brand-ink">{person.name}</h2>
                  <div className="mt-4 grid gap-2 text-sm text-brand-ink/85">
                    {person.scholarship && <Info icon={Award} label="Scholarship" value={person.scholarship} />}
                    <Info icon={GraduationCap} label="University" value={person.university} />
                    <Info icon={GraduationCap} label="Program Level" value={person.level} />
                    <Info icon={Globe2} label="Field of Study" value={person.field} />
                    <Info icon={Globe2} label="Country of Study" value={`${person.flag} ${person.country}`} />
                  </div>
                  <blockquote className="mt-5 rounded-2xl bg-white p-5 border border-brand-line text-brand-muted text-sm leading-relaxed">
                    <Quote size={16} className="text-brand mb-2" />
                    {person.testimonial}
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon = UserRound, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} className="text-brand mt-0.5 shrink-0" strokeWidth={1.7} />
      <span><span className="font-semibold text-brand-ink">{label}:</span> {value}</span>
    </div>
  );
}
