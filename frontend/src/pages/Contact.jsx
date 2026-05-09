import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { api, WHATSAPP_NUMBERS } from "@/lib/config";
import SectionTitle from "@/components/SectionTitle";

export default function Contact() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/contact", form);
      setConfirmation(data);
      toast.success(`Message sent · ${data.id}`);
      setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-ribbon overflow-hidden" data-testid="contact-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Mail size={12} /> Get in Touch
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Let's plan your scholarship together.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              Send us a message, hop on WhatsApp or call us — whatever works for you. We respond within one working day.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="contact-grid">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          {/* Left — info */}
          <aside className="lg:col-span-5 space-y-5">
            <ContactInfoCard icon={Phone} title="Call us" lines={["+91 80074 86195", "+91 88604 11049", "+91 80538 46002"]} hrefs={["tel:+918007486195", "tel:+918860411049", "tel:+918053846002"]} testid="contact-phones" />
            <ContactInfoCard icon={Mail} title="Email" lines={["veritassphere26@gmail.com"]} hrefs={["mailto:veritassphere26@gmail.com"]} testid="contact-email" />
            <ContactInfoCard icon={Clock} title="Office Hours" lines={["Mon – Fri", "10:00 am – 6:00 pm"]} testid="contact-hours" />
            <ContactInfoCard icon={MapPin} title="Registered" lines={["Udyam · UDYAM-DL-05-0082130"]} testid="contact-udyam" />

            <div className="rounded-3xl bg-brand text-white p-6 relative overflow-hidden" data-testid="contact-whatsapp">
              <div className="absolute inset-0 grain opacity-25" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 grid place-items-center"><MessageCircle size={20} strokeWidth={1.6} /></div>
                  <div>
                    <div className="font-display text-xl font-bold">Quick Chat on WhatsApp</div>
                    <div className="text-white/80 text-sm">Tap to start a conversation</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  {WHATSAPP_NUMBERS.map((w) => (
                    <a
                      key={w.number}
                      href={`https://wa.me/${w.number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-white text-brand-ink hover:bg-brand-cream px-4 py-3 text-sm font-semibold inline-flex items-center justify-between transition-colors"
                      data-testid={`contact-wa-${w.number}`}
                    >
                      WhatsApp {w.label} <ArrowRight size={16} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-line" data-testid="contact-form">
              <SectionTitle title="Send us a message" subtitle="Fill out the form below and we'll get back to you within 24 hours." />
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <Field label="Full name" required><input required className="input-soft" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Your full name" data-testid="contact-name" /></Field>
                <Field label="Email" required><input required type="email" className="input-soft" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" data-testid="contact-email-input" /></Field>
                <Field label="Phone"><input className="input-soft" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9XXXXXXXXX" data-testid="contact-phone" /></Field>
                <Field label="Subject" required><input required className="input-soft" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" data-testid="contact-subject" /></Field>
                <Field label="Message" required span={2}><textarea required className="input-soft min-h-[140px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more about your inquiry…" data-testid="contact-message" /></Field>
              </div>
              <button type="submit" disabled={loading} className="btn-brand mt-7 w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="contact-submit">
                {loading ? "Sending…" : (<><Send size={16} strokeWidth={1.7} /> Send message</>)}
              </button>
              {confirmation && (
                <div className="mt-6 rounded-2xl bg-brand/10 border border-brand/20 p-5 text-brand-ink" data-testid="contact-confirmation">
                  <div className="font-semibold">Message received</div>
                  <div className="text-sm mt-1">Ticket: <span className="font-mono">{confirmation.id}</span> — we'll reply within 1 working day.</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfoCard({ icon: Icon, title, lines, hrefs = [], testid }) {
  return (
    <div className="card-soft p-6 flex gap-4 items-start" data-testid={testid}>
      <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center shrink-0"><Icon size={20} strokeWidth={1.6} /></div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-brand-muted">{title}</div>
        <div className="mt-1 space-y-1">
          {lines.map((l, i) => (
            hrefs[i] ? (
              <a key={l} href={hrefs[i]} className="block font-display text-lg font-bold text-brand-ink hover:text-brand transition-colors">{l}</a>
            ) : (
              <div key={l} className="font-display text-lg font-bold text-brand-ink">{l}</div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children, span = 1 }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold mb-1.5">{label}{required && <span className="text-brand"> *</span>}</label>
      {children}
    </div>
  );
}
