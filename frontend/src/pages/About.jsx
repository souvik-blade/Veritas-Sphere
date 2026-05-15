import React, { useState } from "react";
import { Compass, Heart, Globe, Sparkles, Award, ShieldCheck, ChevronDown } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Link } from "react-router-dom";
import { LOGO_URL } from "@/lib/config";

const VALUES = [
  { icon: Compass, title: "Truth-led guidance", desc: "Veritas means truth. Honest advice — even when it isn't what students want to hear." },
  { icon: Heart, title: "Personalised care", desc: "We treat every applicant as an individual story, never a template." },
  { icon: Globe, title: "Global reach", desc: "Active scholarship coverage across 30+ countries, with growing partnerships." },
  { icon: Sparkles, title: "Craftsmanship", desc: "Each PS, SOP, and Study Plan is hand-crafted by mentors with proven scholarship expertise." },
];

const PILLARS = [
  {
    tag: "Vision",
    title: "A world where talent isn't limited by geography.",
    icon: Globe,
    detail:
      "We aspire to cultivate a global academic ecosystem in which merit transcends borders. Our vision is to dismantle systemic barriers — bureaucratic opacity, fragmented information, and inequitable access — thereby enabling deserving scholars to pursue opportunities with transparency and intellectual dignity.",
  },
  {
    tag: "Mission",
    title: "End-to-end mentorship for every scholarship applicant.",
    icon: Award,
    detail:
      "Our mission is to provide rigorous, end-to-end guidance that encompasses program identification, document articulation, credential verification, and pre-departure preparation. We transform complexity into clarity, ensuring that every applicant navigates the scholarship process with precision, confidence, and scholarly integrity.",
  },
  {
    tag: "Promise",
    title: "Honest, personalised, fast — never templated.",
    icon: ShieldCheck,
    detail:
      "We categorically reject generic consultancy practices. Every Statement of Purpose, Personal Statement, and Study Plan is meticulously curated to reflect the applicant's unique academic trajectory. Our promise is to deliver counsel that is transparent, expeditious, and academically robust — safeguarding individuality while advancing success.",
  },
];

export default function About() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Sparkles size={12} /> Our Story
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Born from experience. Built for clarity.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Veritas Sphere emerged to close a glaring gap: scholarship guidance lacked a unified, trustworthy source. Blogs contradicted each other. Consultants recycled templates. We built the platform the industry was missing — with clarity, credibility, and impact.
            </p>
          </div>
          <div className="lg:col-span-5 fade-up delay-200">
            <div className="rounded-3xl bg-brand p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-25" />
              <div className="relative">
                <img src={LOGO_URL} alt="Veritas Sphere" className="w-24 h-24 rounded-2xl object-contain bg-white p-2 ring-4 ring-white/30" />
                <div className="font-display text-3xl font-extrabold mt-6 leading-tight">
                  An entire sphere of opportunity — guided by truth.
                </div>
                <p className="mt-4 text-white/85 leading-relaxed">
                  We exist to help students from every background access fully-funded education abroad — without losing themselves in the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Promise — expandable */}
      <section className="section bg-white" data-testid="about-vmp">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="What we stand for" title="Vision, Mission & Promise." subtitle="Tap any card to read the detailed statement." align="center" className="mx-auto" />
          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            {PILLARS.map((p, i) => {
              const open = openIdx === i;
              return (
                <button
                  key={p.tag}
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className={`text-left p-8 rounded-2xl border transition-all duration-300 ${
                    open
                      ? "bg-brand-ink text-white border-transparent shadow-[0_30px_70px_-30px_rgba(42,22,20,0.6)]"
                      : "bg-white border-brand-line text-brand-ink hover:border-brand hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(42,22,20,0.18)]"
                  }`}
                  data-testid={`pillar-${p.tag.toLowerCase()}`}
                  aria-expanded={open}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl grid place-items-center ${open ? "bg-white/15 text-white" : "bg-brand/10 text-brand"}`}>
                      <p.icon size={22} strokeWidth={1.6} />
                    </div>
                    <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""} ${open ? "text-white/70" : "text-brand-muted"}`} />
                  </div>
                  <div className={`text-[11px] uppercase tracking-[0.18em] mt-5 ${open ? "text-white/70" : "text-brand-muted"}`}>Our {p.tag}</div>
                  <div className={`font-display text-2xl font-bold mt-2 leading-snug`}>{p.title}</div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] mt-5 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className={`text-[15px] leading-relaxed ${open ? "text-white/85" : "text-brand-muted"}`}>{p.detail}</p>
                  </div>
                  <div className={`mt-5 text-[12px] font-semibold ${open ? "text-white/70" : "text-brand"}`}>
                    {open ? "Show less" : "Read in detail →"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="about-values">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Our Values" title="What we stand for, every single day." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {VALUES.map((v) => (
              <div key={v.title} className="card-soft p-7">
                <div className="w-12 h-12 rounded-xl bg-brand text-white grid place-items-center"><v.icon size={22} strokeWidth={1.6} /></div>
                <div className="font-display text-lg font-bold text-brand-ink mt-5">{v.title}</div>
                <p className="text-brand-muted text-[14px] mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" data-testid="about-differentiator">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionTitle eyebrow="Why Choose Us" title="Insider knowledge. Tailored support. Global reach." />
            <ul className="mt-8 space-y-4">
              {[
                "Experts who've guided successful scholarship applicants worldwide.",
                "Tailored writing — not paid templates dressed up as advice.",
                "End-to-end ownership: discovery to apostille to departure.",
                "Direct WhatsApp access — no ticket queues, no chatbots.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-brand-ink/85">
                  <span className="w-2 h-2 rounded-full bg-brand mt-2.5 shrink-0" /> <span className="text-[16px] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/services" className="btn-brand">Explore packages</Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-brand-ink text-white p-10 relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-25" />
              <div className="relative grid grid-cols-2 gap-8">
                {[
                  ["85%", "Success rate"],
                  ["30+", "Countries covered"],
                  ["35+", "Scholarships supported"],
                  ["24/7", "Mentor availability"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-5xl font-black text-white">{v}</div>
                    <div className="text-white/60 mt-2 text-[12px] uppercase tracking-[0.18em]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
