import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Calendar, Clock, Sparkles, ShieldCheck, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { api, WHATSAPP_NUMBERS } from "@/lib/config";

export default function Consultation() {
  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    target_country: "",
    target_level: "Undecided",
    preferred_date: "",
    preferred_time: "",
    goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/consultations", form);
      setConfirmation(data);
      toast.success(`Consultation booked · ${data.id}`);
      setForm({ candidate_name: "", email: "", mobile: "", target_country: "", target_level: "Undecided", preferred_date: "", preferred_time: "", goals: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not book consultation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="consultation-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12 relative grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Sparkles size={12} /> Free Consultation
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              A free 20-minute call to map your scholarship path.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Share a few details and we'll WhatsApp you within an hour to lock in a slot. No fee, no pressure — just a clear conversation about eligibility, timelines and what's right for you.
            </p>
            <ul className="mt-8 space-y-3 text-brand-ink/85">
              {[
                { icon: ShieldCheck, t: "Free & no-obligation" },
                { icon: Clock, t: "20 minutes · Mon–Fri 10am – 6pm" },
                { icon: MessageCircle, t: "Confirmation via WhatsApp + email" },
              ].map(({ icon: Ic, t }) => (
                <li key={t} className="flex items-start gap-3"><Ic size={18} className="text-brand mt-0.5" strokeWidth={1.6} /> {t}</li>
              ))}
            </ul>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-[12px] font-semibold">
              <Calendar size={14} /> This form is dedicated to free consultations only — not paid services or contact queries.
            </div>
          </div>
          <div className="lg:col-span-6">
            <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)]" data-testid="consultation-form">
              <div className="font-display text-2xl font-bold text-brand-ink">Book your free slot</div>
              <p className="text-brand-muted text-sm mt-1">We'll confirm by WhatsApp & email.</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <Field label="Full name" span={2}><input required className="input-soft" value={form.candidate_name} onChange={(e) => setForm({ ...form, candidate_name: e.target.value })} data-testid="consult-name" placeholder="Your full name" /></Field>
                <Field label="Email"><input required type="email" className="input-soft" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="consult-email" placeholder="you@example.com" /></Field>
                <Field label="Mobile / WhatsApp"><input required className="input-soft" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} data-testid="consult-mobile" placeholder="+91 9XXXXXXXXX" /></Field>
                <Field label="Target country"><input className="input-soft" value={form.target_country} onChange={(e) => setForm({ ...form, target_country: e.target.value })} data-testid="consult-country" placeholder="e.g. South Korea" /></Field>
                <Field label="Target level">
                  <select className="input-soft" value={form.target_level} onChange={(e) => setForm({ ...form, target_level: e.target.value })} data-testid="consult-level">
                    {["UG", "Masters", "PhD", "Associate", "Undecided"].map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                </Field>
                <Field label="Preferred date"><input type="date" className="input-soft" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} data-testid="consult-date" /></Field>
                <Field label="Preferred time"><input type="time" className="input-soft" value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} data-testid="consult-time" /></Field>
                <Field label="Goals or questions" span={2}><textarea className="input-soft min-h-[90px]" value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} data-testid="consult-goals" placeholder="What do you want to achieve? Any specific scholarships you've shortlisted?" /></Field>
              </div>
              <button type="submit" disabled={loading} className="btn-brand mt-7 w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="consult-submit">
                {loading ? "Booking…" : (<>Book free consultation <ArrowRight size={18} strokeWidth={1.7} /></>)}
              </button>
              {confirmation && (
                <div className="mt-6 rounded-2xl bg-brand/10 border border-brand/20 p-5 text-brand-ink" data-testid="consult-confirmation">
                  <div className="font-semibold">Consultation booked</div>
                  <div className="text-sm mt-1">Reference: <span className="font-mono">{confirmation.id}</span> — we'll WhatsApp you within an hour to confirm the slot.</div>
                </div>
              )}
              <div className="mt-6 pt-6 border-t border-brand-line text-sm text-brand-muted">
                Prefer to chat first?{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBERS[0].number}`} target="_blank" rel="noreferrer" className="text-brand font-semibold hover:text-brand-dark">WhatsApp us directly →</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, span = 1 }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
