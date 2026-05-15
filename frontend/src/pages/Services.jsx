import React, { useState } from "react";
import { toast } from "sonner";
import { Check, Clock, Sparkles, ArrowRight, BookOpen, FileSignature, FileText, GraduationCap, Layers, Star } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { api, PACKAGES } from "@/lib/config";

const PLANS = [
  {
    id: "PS_SOP",
    name: "Personal Statement / SOP",
    price: 999,
    timeline: "5–6 work days",
    desc: "A standout PS or SOP crafted around your story, achievements, and target programme.",
    bullets: ["Story-mining call", "2 personalised drafts", "1 revision", "Tailored to your scholarship"],
    icon: FileSignature,
  },
  {
    id: "SP",
    name: "Study Plan (SP)",
    price: 799,
    timeline: "5–6 work days",
    desc: "An academic study plan that aligns your goals with research interests and faculty fit.",
    bullets: ["Faculty/research mapping", "Goal–research alignment", "Academic tone editing", "Format per scholarship"],
    icon: BookOpen,
  },
  {
    id: "BOTH",
    name: "PS/SOP + SP Combo",
    price: 1499,
    timeline: "10–12 work days",
    desc: "The complete writing kit — PS/SOP and Study Plan together, perfectly aligned.",
    bullets: ["Everything in PS & SP", "Cross-document consistency", "Strategic narrative", "Priority turnaround"],
    icon: Layers,
    featured: true,
    badge: "Most popular",
  },
  {
    id: "GUIDANCE",
    name: "Scholarship Guidance",
    price: 399,
    timeline: "4–5 work days",
    desc: "Personalised scholarship matching, document checklists and country-specific tips.",
    bullets: ["Eligibility check", "Country-specific tips", "Document checklist", "Strategy session"],
    icon: GraduationCap,
  },
  {
    id: "CONSULTANCY",
    name: "Consultancy",
    price: 349,
    timeline: "4–6 work days",
    desc: "University selection, registration walkthrough, language prep & visa orientation.",
    bullets: ["University shortlisting", "Registration help", "Language exam guidance", "Visa preparation"],
    icon: Sparkles,
  },
  {
    id: "ADMISSION",
    name: "Admission & Application",
    price: 549,
    timeline: "2–3 work days",
    desc: "We help you fill admission forms accurately for chosen scholarships and universities.",
    bullets: ["Form filling support", "Document attachment", "Submission walkthrough", "Confirmation tracking"],
    icon: FileText,
  },
];

const PACKAGES_BUNDLE = [
  {
    id: "MINI",
    name: "Mini Package",
    price: 1299,
    timeline: "7 work days",
    desc: "One PS/SOP or SP + Admission Guidance — ideal for a single targeted application.",
    bullets: ["1× PS / SOP or SP", "Admission guidance", "Personalised mentor", "1 round of revisions"],
  },
  {
    id: "FULL",
    name: "Full Package",
    price: 2799,
    timeline: "7–10 work days",
    desc: "Personalised PS, SOP & SP + university selection + extracurricular write-ups + admission help.",
    bullets: ["PS + SOP + SP", "University shortlisting", "Extracurricular certificates", "Priority admission help"],
    featured: true,
  },
];

const PROCESS_STEPS = [
  { title: "Discovery Call", desc: "We understand your background, goals and target programmes." },
  { title: "Story-Mining", desc: "Deep-dive interview to surface unique experiences worth telling." },
  { title: "Draft v1", desc: "First personalised draft delivered with structure aligned to scholarship." },
  { title: "Iterate & Revise", desc: "Comprehensive language refinement with endless phrasing polish and precise fine-tuning, plus 2 major revisions to perfect tone." },
  { title: "Finalise & Submit", desc: "Final proofread, format check and submission walkthrough." },
];

export default function Services() {
  return (
    <>
      <section className="relative bg-ribbon overflow-hidden">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Star size={12} /> Our Services
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Plans built for every step of your application.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Choose a focused service or grab a curated package — each plan includes a dedicated mentor, personalised
              writing and comprehensive language refinement.
            </p>
          </div>
        </div>
      </section>

      {/* Plan grid */}
      <section className="section bg-brand-cream" data-testid="services-plans">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Single Services" title="Pick exactly the help you need." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {PLANS.map((p, i) => (
              <PlanCard key={p.id} plan={p} index={i} />
            ))}
          </div>

          <div className="mt-20">
            <SectionTitle eyebrow="Curated Packages" title="Save more with bundled packages." />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {PACKAGES_BUNDLE.map((p, i) => (
                <PlanCard key={p.id} plan={p} index={i} large />
              ))}
            </div>
            <p className="text-center text-sm text-brand-muted mt-6">
              Extra customisation / urgency: <span className="font-semibold text-brand">+₹129</span> (varies by requirement)
            </p>
          </div>
        </div>
      </section>

      {/* PS/SOP step-wise */}
      <section className="section bg-white" data-testid="services-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="How PS / SOP Work" title="Step-by-step, never templated." subtitle="A focused, repeatable workflow that keeps your voice intact and your application sharp." />
          </div>
          <div className="lg:col-span-7">
            <ol className="space-y-4">
              {PROCESS_STEPS.map((s, i) => (
                <li key={s.title} className="card-soft p-6 flex gap-5" data-testid={`ps-step-${i}`}>
                  <div className="w-12 h-12 rounded-full bg-brand text-white grid place-items-center font-display font-extrabold text-lg shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-brand-ink">{s.title}</div>
                    <p className="text-brand-muted text-[15px] leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="section bg-brand-ink relative overflow-hidden" data-testid="services-booking">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-5 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Clock size={12} /> Slot Booking
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-4 leading-[1.05]">
              Book your slot in <span className="text-brand">under a minute.</span>
            </h2>
            <p className="text-white/75 mt-5 leading-relaxed">
              Pick a package, share your details, and we'll email you a confirmation along with the next steps within an
              hour. We respond on WhatsApp, email or call — your choice.
            </p>
            <ul className="mt-8 space-y-3">
              {["Auto-generated booking ID & email confirmation", "Direct admin notification for instant follow-up", "Free initial 20-min consultation included"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-white/85">
                  <Check size={18} className="text-brand mt-0.5" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}

function PlanCard({ plan, index, large = false }) {
  const Icon = plan.icon || Sparkles;
  const featured = plan.featured;
  return (
    <div
      className={`relative rounded-3xl border transition-all p-8 fade-up ${
        featured
          ? "bg-brand text-white border-transparent shadow-[0_30px_60px_-20px_rgba(236,92,83,0.55)] hover:-translate-y-1"
          : "bg-white border-brand-line text-brand-ink hover:-translate-y-1 hover:shadow-[0_28px_50px_-22px_rgba(42,22,20,0.18)] hover:border-brand"
      } ${large ? "lg:p-10" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
      data-testid={`plan-${plan.id}`}
    >
      {featured && plan.badge && (
        <div className="absolute -top-3 left-8 bg-brand-ink text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-3 py-1 rounded-full">
          {plan.badge}
        </div>
      )}
      <div className={`w-12 h-12 rounded-xl grid place-items-center ${featured ? "bg-white/20 text-white" : "bg-brand/10 text-brand"}`}>
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h3 className={`font-display text-2xl font-bold mt-5 ${featured ? "text-white" : "text-brand-ink"}`}>{plan.name}</h3>
      <p className={`mt-2 text-[15px] leading-relaxed ${featured ? "text-white/85" : "text-brand-muted"}`}>{plan.desc}</p>
      <div className="flex items-end gap-2 mt-6">
        <div className={`font-display text-5xl font-black ${featured ? "text-white" : "text-brand-ink"}`}>₹{plan.price}</div>
        <div className={`mb-2 text-sm ${featured ? "text-white/70" : "text-brand-muted"}`}>/ engagement</div>
      </div>
      <div className={`text-xs uppercase tracking-[0.18em] mt-1 ${featured ? "text-white/80" : "text-brand-muted"}`}>
        Timeline · {plan.timeline}
      </div>
      <ul className={`mt-6 space-y-2.5 text-[14px] ${featured ? "text-white/90" : "text-brand-ink/85"}`}>
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <Check size={16} strokeWidth={2.2} className={featured ? "text-white mt-0.5" : "text-brand mt-0.5"} /> {b}
          </li>
        ))}
      </ul>
      <a
        href="#booking"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent("vs-prefill-package", { detail: plan.id }));
        }}
        className={`mt-7 inline-flex items-center gap-2 font-semibold ${featured ? "text-white hover:text-brand-cream" : "text-brand hover:text-brand-dark"}`}
        data-testid={`plan-cta-${plan.id}`}
      >
        Book this plan <ArrowRight size={16} strokeWidth={2} />
      </a>
    </div>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ package: "BOTH", candidate_name: "", email: "", mobile: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  React.useEffect(() => {
    const handler = (e) => setForm((f) => ({ ...f, package: e.detail }));
    window.addEventListener("vs-prefill-package", handler);
    return () => window.removeEventListener("vs-prefill-package", handler);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/bookings", form);
      setConfirmation(data);
      toast.success(`Booking confirmed · ${data.id}`);
      setForm({ package: form.package, candidate_name: "", email: "", mobile: "", notes: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="booking-form" onSubmit={onSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]" data-testid="booking-form">
      <div className="font-display text-2xl font-bold text-brand-ink">Book a slot</div>
      <p className="text-brand-muted text-sm mt-1">Fill in your details — we'll confirm by email & WhatsApp.</p>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="sm:col-span-2">
          <Label>Package</Label>
          <select
            data-testid="booking-package"
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className="input-soft"
            required
          >
            {PACKAGES.map((p) => (
              <option key={p.value} value={p.value}>{p.label} · ₹{p.price}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Candidate name</Label>
          <input data-testid="booking-name" required value={form.candidate_name} onChange={(e) => setForm({ ...form, candidate_name: e.target.value })} className="input-soft" placeholder="Your full name" />
        </div>
        <div>
          <Label>Email</Label>
          <input data-testid="booking-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-soft" placeholder="you@example.com" />
        </div>
        <div className="sm:col-span-2">
          <Label>Mobile</Label>
          <input data-testid="booking-mobile" required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="input-soft" placeholder="+91 9XXXXXXXXX" />
        </div>
        <div className="sm:col-span-2">
          <Label>Notes (optional)</Label>
          <textarea data-testid="booking-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-soft min-h-[90px]" placeholder="Tell us your target country, scholarship or deadline." />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-brand mt-7 w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="booking-submit">
        {loading ? "Submitting…" : (<>Submit booking <ArrowRight size={18} strokeWidth={1.7} /></>)}
      </button>

      {confirmation && (
        <div className="mt-6 rounded-2xl bg-brand/10 border border-brand/20 p-5 text-brand-ink" data-testid="booking-confirmation">
          <div className="font-semibold">Booking confirmed</div>
          <div className="text-sm mt-1">Reference: <span className="font-mono">{confirmation.id}</span> — confirmation email sent to {confirmation.email}.</div>
        </div>
      )}
    </form>
  );
}

function Label({ children }) {
  return <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold mb-1.5">{children}</label>;
}
