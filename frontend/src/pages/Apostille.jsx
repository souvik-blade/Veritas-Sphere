import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, FileCheck2, Languages, ShieldCheck, Stamp, Truck, Phone, Clock, Image as ImageIcon, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { api } from "@/lib/config";

const STEPS = [
  { icon: FileCheck2, title: "Online Submission", desc: "Submit your academic, personal or legal documents online — no physical pickup required. We verify scans before processing." },
  { icon: Languages, title: "Translation (if needed)", desc: "Certified translators convert documents into the required language for international acceptance." },
  { icon: ShieldCheck, title: "Authentication", desc: "Documents are verified by the issuing authority — university, government office or notary." },
  { icon: Stamp, title: "Apostille Certification", desc: "Official stamp/seal attached by the designated MEA / state authority — confirming international validity." },
  { icon: ImageIcon, title: "Verification Preview", desc: "Before final delivery we send you a clear image of the completed apostilled documents so you can verify everything is in order." },
  { icon: Truck, title: "Home Delivery", desc: "After your verification approval, the apostilled documents are couriered to your home address with tracking and digital confirmation." },
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
              the Hague Convention. We receive your documents online and, after processing, courier the apostilled originals to your home address.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-[12px] font-semibold">
              <ShieldCheck size={14} strokeWidth={2} /> Orders are accepted only via the form below — calls are for queries only.
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#order" className="btn-brand inline-flex items-center gap-2" data-testid="apostille-cta-order">
                Start an apostille order <ArrowRight size={18} strokeWidth={1.7} />
              </a>
              <a href="https://wa.me/919466145196" target="_blank" rel="noreferrer" className="btn-outline-brand inline-flex items-center gap-2" data-testid="apostille-contact">
                <MessageCircle size={16} /> Apostille queries · WhatsApp +91 94661 45196
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
                    <div className="text-white/60 text-xs uppercase tracking-[0.16em]">Working hours</div>
                    <div className="font-display text-xl font-bold mt-1">24h · Workdays</div>
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



      <section className="section bg-white" data-testid="apostille-samples">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Sample Apostille Documents" title="Preview the kind of finished document evidence you receive." subtitle="These sample visuals show how apostille verification images are presented before final courier dispatch." />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {["Academic Certificate", "Birth Certificate"].map((label) => (
              <div key={label} className="card-soft p-5">
                <div className="aspect-[4/5] rounded-2xl bg-white border border-brand-line p-5 shadow-inner">
                  <div className="h-full rounded-xl border-2 border-brand-line bg-brand-cream/40 p-5 flex flex-col">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted">Sample Apostille</div>
                    <div className="mt-4 h-3 bg-brand/25 rounded-full w-3/4" />
                    <div className="mt-3 h-3 bg-brand/15 rounded-full w-full" />
                    <div className="mt-3 h-3 bg-brand/15 rounded-full w-5/6" />
                    <div className="mt-auto flex items-end justify-between">
                      <div className="w-20 h-20 rounded-full border-4 border-brand/40 grid place-items-center text-brand font-display font-black">AP</div>
                      <Stamp className="text-brand" size={42} strokeWidth={1.4} />
                    </div>
                  </div>
                </div>
                <div className="font-display text-lg font-bold text-brand-ink mt-5">{label}</div>
                <p className="text-brand-muted text-sm mt-1">Representative sample image for apostille verification preview.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="section bg-brand-cream" data-testid="apostille-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle eyebrow="Our Process" title="Five clear stages, full transparency." subtitle="Updates at every stage by phone or email." />
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

      {/* Order form */}
      <section id="order" className="section bg-brand-ink relative overflow-hidden" data-testid="apostille-order">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-5 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Clock size={12} /> Place an Order
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold mt-4 leading-[1.05]">
              Start your apostille in minutes.
            </h2>
            <p className="text-white/75 mt-5 leading-relaxed">
              Tell us what you need apostilled. Our coordinator will reach out within an hour with a fixed quote
              and the next steps. Orders are accepted <strong className="text-white">only through this form</strong> — for queries{" "}
              <a href="https://wa.me/919466145196" target="_blank" rel="noreferrer" className="text-white underline underline-offset-2 hover:text-brand-cream font-semibold" data-testid="apostille-form-whatsapp">
                WhatsApp +91 94661 45196
              </a>.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <Stat label="Working hours" value="24h" />
              <Stat label="Turnaround" value="3–5 days*" />
            </div>
            <p className="text-white/55 text-xs mt-2">*excluding holidays</p>
          </div>
          <div className="lg:col-span-7">
            <ApostilleForm />
          </div>
        </div>
      </section>
      )}
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
      <div className="text-white/60 text-[11px] uppercase tracking-[0.16em]">{label}</div>
      <div className="font-display text-3xl font-extrabold mt-1 text-white">{value}</div>
    </div>
  );
}

function ApostilleForm() {
  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    document_type: "",
    num_documents: 1,
    target_country: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/apostille", { ...form, num_documents: Number(form.num_documents) });
      setConfirmation(data);
      toast.success(`Order placed · ${data.id}`);
      setForm({ candidate_name: "", email: "", mobile: "", document_type: "", num_documents: 1, target_country: "", notes: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]" data-testid="apostille-form">
      <div className="font-display text-2xl font-bold text-brand-ink">Apostille order</div>
      <p className="text-brand-muted text-sm mt-1">We'll quote a fixed price and confirm by email & WhatsApp.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <Field label="Candidate name" span={2}><input required className="input-soft" value={form.candidate_name} onChange={(e) => setForm({ ...form, candidate_name: e.target.value })} data-testid="apostille-name" /></Field>
        <Field label="Email"><input required type="email" className="input-soft" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="apostille-email" /></Field>
        <Field label="Mobile"><input required className="input-soft" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} data-testid="apostille-mobile" /></Field>
        <Field label="Document type">
          <select required className="input-soft" value={form.document_type} onChange={(e) => setForm({ ...form, document_type: e.target.value })} data-testid="apostille-doctype">
            <option value="">Select…</option>
            {["Degree / Transcript", "Birth Certificate", "Marriage Certificate", "Affidavit", "Police Clearance", "School Leaving", "Other"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="No. of documents"><input required type="number" min={1} max={50} className="input-soft" value={form.num_documents} onChange={(e) => setForm({ ...form, num_documents: e.target.value })} data-testid="apostille-num" /></Field>
        <Field label="Target country" span={2}><input className="input-soft" value={form.target_country} onChange={(e) => setForm({ ...form, target_country: e.target.value })} data-testid="apostille-country" placeholder="e.g. South Korea" /></Field>
        <Field label="Notes" span={2}><textarea className="input-soft min-h-[90px]" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} data-testid="apostille-notes" placeholder="Urgency, special requirements, target country deadline etc." /></Field>
      </div>
      <button type="submit" disabled={loading} className="btn-brand mt-6 w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="apostille-submit">
        {loading ? "Submitting…" : (<>Place order <ArrowRight size={18} strokeWidth={1.7} /></>)}
      </button>
      {confirmation && (
        <div className="mt-6 rounded-2xl bg-brand/10 border border-brand/20 p-5 text-brand-ink" data-testid="apostille-confirmation">
          <div className="font-semibold">Order received</div>
          <div className="text-sm mt-1">Reference: <span className="font-mono">{confirmation.id}</span> — our team will call you within an hour with a fixed quote.</div>
        </div>
      )}
    </form>
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
