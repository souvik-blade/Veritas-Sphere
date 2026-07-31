import React, { useState } from "react";
import { toast } from "sonner";
import {
  Globe,
  Award,
  BookOpen,
  Calendar,
  Users,
  ShieldCheck,
  Send,
  MessageCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Gavel,
  CheckCircle2,
  ChevronRight,
  Building2,
  Download
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { WHATSAPP_NUMBERS, saveToGoogleSheet } from "@/lib/config";

const WA_NUMBER = WHATSAPP_NUMBERS[0]?.number || "919466145196";

const COMMITTEES = [
  {
    id: "UNSC",
    name: "United Nations Security Council",
    tag: "Double Delegation",
    difficulty: "Advanced",
    color: "from-blue-900 to-indigo-950",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    agenda: "Deliberation on Nuclear Non-Proliferation, Sovereign Boundaries & International Crisis Management.",
    desc: "The UNSC demands razor-sharp diplomacy, strategic veto maneuvering, and high-intensity caucus negotiations."
  },
  {
    id: "UNGA",
    name: "United Nations General Assembly",
    tag: "Single Delegation",
    difficulty: "All Levels",
    color: "from-emerald-950 to-teal-900",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    agenda: "Accountability for War Crimes Against Civilians Under International Humanitarian Law.",
    desc: "A massive plenary simulation focusing on multilateral coalition building, draft resolution drafting, and broad consensus."
  },
  {
    id: "UNHRC",
    name: "United Nations Human Rights Council",
    tag: "Single Delegation",
    difficulty: "Beginner / Intermediate",
    color: "from-amber-950 to-orange-900",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    agenda: "Protection of Fundamental Freedoms, Asylum Rights, and Human Rights in Conflict Zones.",
    desc: "Debate press freedoms, asylum protocols, and global human rights treaties with rigorous legal backing."
  },
  {
    id: "AIPPM",
    name: "All India Political Parties Meet",
    tag: "Single Delegation",
    difficulty: "All Levels",
    color: "from-rose-950 to-red-900",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    agenda: "Review of Electoral Reforms, Legislative Governance, and State Autonomy in India.",
    desc: "High-voltage parliamentary simulation bringing together political ideologies, press conference sparring, and bill amendments."
  },
  {
    id: "JCC",
    name: "Joint Crisis Committee (Cold War)",
    tag: "Single Delegation",
    difficulty: "Advanced Crisis",
    color: "from-purple-950 to-slate-900",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    agenda: "Classified Intelligence Directives & Rapid Stand-off Response (1962 Geopolitical Simulation).",
    desc: "Real-time directive updates, covert operations, crisis notes, and unpredictable cabinet developments."
  },
  {
    id: "IPC",
    name: "International Press Corps",
    tag: "Journalist / Photographer",
    difficulty: "All Levels",
    color: "from-cyan-950 to-slate-900",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    agenda: "Journalistic Integrity, Press Conferences, Caricatures, and Daily Conference Gazette.",
    desc: "Hold executive boards accountable, conduct press conferences, publish daily columns, and capture historic moments."
  }
];

const GUIDES = [
  { title: "First-Timer's MUN Starter Guide", desc: "Step-by-step walk-through from GSL speeches to unmoderated caucusing.", icon: BookOpen },
  { title: "Mastering Rules of Procedure (RoP)", desc: "Comprehensive guide to UNA-USA, THIMUN, and Indian parliamentary motions.", icon: Gavel },
  { title: "Position Paper Writing & Templates", desc: "Craft committee-winning position papers with sample structures.", icon: FileText },
  { title: "Resolution & Clause Drafting Masterclass", desc: "How to draft operative clauses, sponsors, signatories, and amendments.", icon: Award }
];

export default function Claritas() {
  const [form, setForm] = useState({
    candidate_name: "",
    email: "",
    mobile: "",
    institution: "",
    experience_level: "Beginner",
    preferred_committee: "UNGA",
    notes: ""
  });
  const [confirmation, setConfirmation] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      form_type: "Claritas MUN Registration",
      candidate_name: form.candidate_name,
      email: form.email,
      mobile: form.mobile,
      institution: form.institution,
      experience_level: form.experience_level,
      preferred_committee: form.preferred_committee,
      notes: form.notes
    };

    saveToGoogleSheet(payload);

    const text =
      `*Claritas MUN Registration Request*\n\n` +
      `*Delegate Name:* ${form.candidate_name}\n` +
      `*Email:* ${form.email}\n` +
      `*Mobile:* ${form.mobile}\n` +
      `*Institution:* ${form.institution || "N/A"}\n` +
      `*Experience Level:* ${form.experience_level}\n` +
      `*Preferred Committee:* ${form.preferred_committee}\n` +
      `*Notes:* ${form.notes || "N/A"}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp with your Claritas MUN registration details...");
    setConfirmation({ id: `CM-${Math.floor(100000 + Math.random() * 900000)}` });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-ink text-white overflow-hidden" data-testid="claritas-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-[#0F172A] to-brand-ink opacity-90" />
        <div className="absolute inset-0 grain opacity-20" />
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/20 border border-brand/40 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold mb-6">
            <Sparkles size={14} className="text-brand animate-pulse" /> Claritas Model United Nations · Veritas Sphere Division
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter max-w-4xl leading-[1.02]">
            Empowering Tomorrow's Diplomats & Global Leaders.
          </h1>
          
          <p className="mt-6 text-white/80 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Welcome to <strong className="text-white">Claritas MUN</strong> — a dedicated youth diplomacy & Model United Nations hub powered by Veritas Sphere. Designed for parliamentary mastery, substantive debate, and delegate excellence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#register" className="btn-brand text-sm px-6 py-3.5 inline-flex items-center gap-2" data-testid="claritas-cta-register">
              <Send size={16} /> Register for Claritas MUN
            </a>
            <a href="#committees" className="px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-colors inline-flex items-center gap-2">
              Explore Committees <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            <div>
              <div className="font-display text-3xl font-bold text-brand">9+</div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">Simulated Committees</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">500+</div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">Expected Delegates</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-brand">15+</div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">Free Preparation Guides</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">100%</div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">Delegate-First Mentorship</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Overview */}
      <section className="section bg-brand-cream" data-testid="claritas-overview">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <SectionTitle
                title="The Claritas Advantage"
                subtitle="Built by seasoned MUN chairs and national delegates for an unmatched conference experience."
              />
              <p className="text-brand-muted mt-5 leading-relaxed">
                Claritas MUN provides high-caliber committee simulations designed for both first-time delegates and circuit veterans. We emphasize substantive debate, impartial executive board feedback, transparent awards, and comprehensive preparation materials.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Comprehensive background guides & committee matrices",
                  "Rules of Procedure (RoP) bootcamps before conference day",
                  "Structured resolution drafting and unmoderated caucus workshops",
                  "Transparent award criteria and 1-on-1 feedback from Chairs"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-brand-ink text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-brand-ink p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 grain opacity-25" />
                <div className="relative z-10">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-brand font-semibold">Claritas Communiqué</div>
                  <h3 className="font-display text-2xl font-bold text-white mt-2">Delegate-First Philosophy</h3>
                  <p className="mt-4 text-white/70 text-sm leading-relaxed">
                    "Every delegate deserves a platform where their voice is heard, their position paper is thoroughly reviewed, and their parliamentary skills are genuinely sharpened."
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span>Claritas Secretariat · Veritas Sphere</span>
                    <span className="font-mono text-brand">New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committees Directory */}
      <section id="committees" className="section bg-white" data-testid="claritas-committees">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title="Simulated Committees"
            subtitle="Choose your committee and agenda for Claritas MUN 2026."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {COMMITTEES.map((c) => (
              <div key={c.id} className="rounded-3xl border border-brand-line p-6 hover:shadow-xl transition-all flex flex-col justify-between bg-white group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${c.badgeColor}`}>
                      {c.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-muted">{c.difficulty}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-brand-ink group-hover:text-brand transition-colors">
                    {c.name}
                  </h3>

                  <div className="mt-4 p-3.5 rounded-2xl bg-brand-cream border border-brand-line">
                    <div className="text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Agenda</div>
                    <p className="text-xs text-brand-ink font-medium leading-relaxed">{c.agenda}</p>
                  </div>

                  <p className="mt-4 text-xs text-brand-muted leading-relaxed">{c.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-line flex items-center justify-between">
                  <a href="#register" onClick={() => setForm({ ...form, preferred_committee: c.id })} className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1">
                    Apply for {c.id} <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Delegate Resources */}
      <section className="section bg-brand-cream" data-testid="claritas-resources">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            title="Free Delegate Preparation Guides"
            subtitle="Master committee debate with our step-by-step resource library."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {GUIDES.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} className="card-soft p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand grid place-items-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h4 className="font-display text-lg font-bold text-brand-ink">{g.title}</h4>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">{g.desc}</p>
                  </div>
                  <a href="#register" className="btn-secondary text-xs mt-6 inline-flex items-center justify-center gap-1.5">
                    <Download size={14} /> Request Guide
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="section bg-white" data-testid="claritas-register-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-line shadow-2xl">
            <SectionTitle
              title="Claritas MUN Registration & Inquiry"
              subtitle="Fill in your details below — our Delegate Affairs team will reach out via WhatsApp."
            />

            <form onSubmit={onSubmit} className="mt-8 space-y-4" data-testid="claritas-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    Full Name <span className="text-brand">*</span>
                  </label>
                  <input
                    required
                    className="input-soft"
                    value={form.candidate_name}
                    onChange={(e) => setForm({ ...form, candidate_name: e.target.value })}
                    placeholder="Your full name"
                    data-testid="claritas-name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    Email <span className="text-brand">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    className="input-soft"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    data-testid="claritas-email"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    Mobile / WhatsApp <span className="text-brand">*</span>
                  </label>
                  <input
                    required
                    className="input-soft"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="+91 9XXXXXXXXX"
                    data-testid="claritas-mobile"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    School / College / Institution
                  </label>
                  <input
                    className="input-soft"
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    placeholder="e.g. Delhi University / DPS"
                    data-testid="claritas-institution"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    Experience Level
                  </label>
                  <select
                    className="input-soft"
                    value={form.experience_level}
                    onChange={(e) => setForm({ ...form, experience_level: e.target.value })}
                    data-testid="claritas-experience"
                  >
                    <option value="Beginner">Beginner (0–2 MUNs)</option>
                    <option value="Intermediate">Intermediate (3–6 MUNs)</option>
                    <option value="Advanced">Advanced (7+ MUNs / Executive Board)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                    Preferred Committee
                  </label>
                  <select
                    className="input-soft"
                    value={form.preferred_committee}
                    onChange={(e) => setForm({ ...form, preferred_committee: e.target.value })}
                    data-testid="claritas-committee-select"
                  >
                    {COMMITTEES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.id} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-semibold mb-1">
                  Questions / Additional Notes (optional)
                </label>
                <textarea
                  className="input-soft min-h-[90px]"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Tell us about country preferences or any questions regarding registration..."
                  data-testid="claritas-notes"
                />
              </div>

              {/* WhatsApp Notification Notice */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 text-xs text-emerald-800 flex items-center gap-2">
                <MessageCircle size={16} className="text-emerald-600 shrink-0" />
                <span>Submitting will also open WhatsApp with your pre-filled Claritas MUN registration details.</span>
              </div>

              <button
                type="submit"
                className="btn-brand mt-4 w-full inline-flex items-center justify-center gap-2"
                data-testid="claritas-submit"
              >
                Submit Booking & Send Details on WhatsApp <ArrowRight size={18} />
              </button>

              {confirmation && (
                <div className="mt-6 rounded-2xl bg-brand/10 border border-brand/20 p-5 text-brand-ink" data-testid="claritas-confirmation">
                  <div className="font-semibold">Registration Received</div>
                  <div className="text-sm mt-1">
                    Reference Ticket: <span className="font-mono">{confirmation.id}</span> — our Delegate Affairs coordinator will message you on WhatsApp shortly.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
