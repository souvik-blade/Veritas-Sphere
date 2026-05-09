import React from "react";
import { Compass, Heart, Globe, Sparkles, Award, ShieldCheck } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Link } from "react-router-dom";
import { LOGO_URL } from "@/lib/config";

const VALUES = [
  { icon: Compass, title: "Truth-led guidance", desc: "Veritas means truth. Honest advice — even when it isn't what students want to hear." },
  { icon: Heart, title: "Personalised care", desc: "We treat every applicant as an individual story, never a template." },
  { icon: Globe, title: "Global reach", desc: "Active scholarship coverage across 30+ countries, with growing partnerships." },
  { icon: Sparkles, title: "Craftsmanship", desc: "Each PS, SOP and Study Plan is hand-crafted by mentors who've walked the same path." },
];

export default function About() {
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
              Built by students who walked the same path.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Veritas Sphere was born from a simple frustration — there was no unified, trustworthy place to find
              scholarship guidance. Every blog said something different. Every consultant sold a template. We decided
              to build the thing we wished we had.
            </p>
          </div>
          <div className="lg:col-span-5 fade-up delay-200">
            <div className="rounded-3xl bg-brand p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-25" />
              <div className="relative">
                <img src={LOGO_URL} alt="Veritas Sphere" className="w-20 h-20 rounded-2xl ring-4 ring-white/30 object-cover" />
                <div className="font-display text-3xl font-extrabold mt-6 leading-tight">
                  An entire sphere of opportunity — guided by truth.
                </div>
                <p className="mt-4 text-white/85 leading-relaxed">
                  We exist to help students from every background access fully-funded education abroad — without losing
                  themselves in the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="section bg-white" data-testid="about-vmv">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-6">
          {[
            { tag: "Vision", title: "A world where talent isn't limited by geography.", icon: Globe },
            { tag: "Mission", title: "End-to-end mentorship for every scholarship applicant.", icon: Award },
            { tag: "Promise", title: "Honest, personalised, fast — never templated.", icon: ShieldCheck },
          ].map((v) => (
            <div key={v.tag} className="card-soft p-8">
              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center"><v.icon size={22} strokeWidth={1.6} /></div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand-muted mt-5">{v.tag}</div>
              <div className="font-display text-2xl font-bold text-brand-ink mt-2 leading-snug">{v.title}</div>
            </div>
          ))}
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

      {/* Differentiator / Why Choose Us */}
      <section className="section bg-white" data-testid="about-differentiator">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionTitle eyebrow="Why Choose Us" title="Insider knowledge. Tailored support. Global reach." />
            <ul className="mt-8 space-y-4">
              {[
                "Mentors who've actually won the scholarships you're applying to.",
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
                  ["25+", "Scholarships supported"],
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
