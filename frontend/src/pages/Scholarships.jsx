import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Filter, ArrowRight, Globe, Award, X } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { api } from "@/lib/config";

const LEVELS = ["All", "UG", "Masters", "PhD", "Associate"];

export default function Scholarships() {
  const [data, setData] = useState({ items: [], countries: [] });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ level: "All", country: "All", q: "" });
  const [applyOpen, setApplyOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = async (next = filters) => {
    setLoading(true);
    try {
      const params = {};
      if (next.level && next.level !== "All") params.level = next.level;
      if (next.country && next.country !== "All") params.country = next.country;
      if (next.q) params.q = next.q;
      const { data } = await api.get("/scholarships", { params });
      setData(data);
    } catch (e) {
      toast.error("Could not load scholarships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.level, filters.country]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    fetchData(filters);
  };

  const featured = useMemo(() => data.items.filter((i) => i.featured), [data.items]);
  const isSearching = (filters.q && filters.q.trim().length > 0) || filters.level !== "All" || filters.country !== "All";

  return (
    <>
      <section className="relative bg-brand overflow-hidden" data-testid="scholarships-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 relative text-white">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm">
              <Award size={12} /> Scholarships Library
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02]">
              25+ fully-funded scholarships, one curated library.
            </h1>
            <p className="mt-5 text-white/90 text-lg leading-relaxed max-w-2xl">
              Filter by your degree level and target country. Find the right scholarship and book a guidance slot — we'll
              walk you through eligibility and timelines.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream" data-testid="scholarships-list">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar filters */}
            <aside className="lg:col-span-3">
              <div className="card-soft p-6 sticky top-24" data-testid="scholarships-filters">
                <div className="flex items-center gap-2 text-brand-ink">
                  <Filter size={16} strokeWidth={1.6} /> <span className="font-display text-lg font-bold">Filters</span>
                </div>
                <form onSubmit={onSearchSubmit} className="mt-4">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3.5 top-3.5 text-brand-muted" />
                    <input
                      data-testid="scholarships-search"
                      value={filters.q}
                      onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                      placeholder="Korea, MEXT…"
                      className="input-soft pl-10"
                    />
                  </div>
                </form>
                <div className="mt-5">
                  <Label>Degree Level</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {LEVELS.map((l) => (
                      <button
                        key={l}
                        onClick={() => setFilters({ ...filters, level: l })}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          filters.level === l ? "bg-brand text-white border-brand" : "bg-white text-brand-ink/80 border-brand-line hover:border-brand"
                        }`}
                        data-testid={`filter-level-${l}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <Label>Country</Label>
                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    className="input-soft mt-2"
                    data-testid="filter-country"
                  >
                    <option value="All">All countries</option>
                    {data.countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => { setFilters({ level: "All", country: "All", q: "" }); fetchData({ level: "All", country: "All", q: "" }); }}
                  className="mt-5 text-xs text-brand-muted hover:text-brand inline-flex items-center gap-1"
                  data-testid="clear-filters"
                >
                  <X size={12} /> Clear filters
                </button>
              </div>
            </aside>

            {/* List */}
            <div className="lg:col-span-9">
              {loading ? (
                <div className="card-soft p-10 text-center text-brand-muted">Loading scholarships…</div>
              ) : (
                <>
                  {!isSearching && featured.length > 0 && (
                    <div>
                      <SectionTitle eyebrow="Featured" title="Most-applied scholarships." subtitle="Use the search or filters on the left to discover 20+ more curated scholarships across countries." />
                      <div className="grid md:grid-cols-2 gap-5 mt-8">
                        {featured.map((s) => (
                          <ScholarshipCard key={s.id} item={s} onApply={() => { setSelected(s); setApplyOpen(true); }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {isSearching && (
                    <div>
                      <SectionTitle
                        eyebrow={`${data.items.length} result${data.items.length === 1 ? "" : "s"}`}
                        title={data.items.length ? "Curated scholarships matching your search." : "No scholarships match your filters."}
                        subtitle={data.items.length ? "Browse the matches below or refine your filters." : "Try clearing a filter or searching another country."}
                      />
                      <div className="grid md:grid-cols-2 gap-5 mt-8">
                        {data.items.map((s) => (
                          <ScholarshipCard key={s.id} item={s} onApply={() => { setSelected(s); setApplyOpen(true); }} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {applyOpen && (
        <ApplyModal scholarship={selected} onClose={() => setApplyOpen(false)} />
      )}
    </>
  );
}

function ScholarshipCard({ item, onApply }) {
  return (
    <div className="card-soft p-6 flex flex-col" data-testid={`scholarship-${item.id}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-4xl">{item.flag}</div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-brand-muted">{item.country}</span>
      </div>
      <h3 className="font-display text-xl font-bold mt-4 text-brand-ink leading-snug">{item.title}</h3>
      <p className="text-brand-muted text-[14px] mt-2 leading-relaxed">{item.summary}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {item.levels.map((lv) => (
          <span key={lv} className="text-[11px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-brand/10 text-brand font-semibold">
            {lv}
          </span>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-brand-line flex items-center justify-between">
        <div className="text-xs text-brand-muted">Deadline · {item.deadline}</div>
        <button
          onClick={onApply}
          className="text-brand font-semibold inline-flex items-center gap-1.5 hover:text-brand-dark"
          data-testid={`scholarship-apply-${item.id}`}
        >
          Apply now <ArrowRight size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function ApplyModal({ scholarship, onClose }) {
  const [form, setForm] = useState({
    candidate_name: "",
    degree_plan: "Masters",
    major: "",
    education: "",
    professional_courses: "",
    mobile: "",
    email: "",
    language_exam: "",
    birth_date: "",
    target_country: scholarship?.country || "",
    target_scholarship: scholarship?.title || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/applications", form);
      setSuccess(data);
      toast.success(`Application submitted · ${data.id}`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-ink/70 backdrop-blur-sm grid place-items-center p-4 fade-up" data-testid="apply-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-brand-line p-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand-muted">Apply for</div>
            <div className="font-display text-xl font-bold text-brand-ink">{scholarship?.flag} {scholarship?.title}</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-brand-cream hover:bg-brand-line grid place-items-center" data-testid="apply-close">
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              Submitted
            </div>
            <h3 className="font-display text-2xl font-bold text-brand-ink mt-3">We received your application</h3>
            <p className="text-brand-muted mt-2">Reference: <span className="font-mono">{success.id}</span>. We'll reach out within 1–2 working days.</p>
            <button onClick={onClose} className="btn-brand mt-6">Done</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 grid sm:grid-cols-2 gap-4">
            <Field span={2} label="Candidate Name"><input required className="input-soft" value={form.candidate_name} onChange={(e) => setForm({ ...form, candidate_name: e.target.value })} data-testid="apply-name" /></Field>
            <Field label="Degree Plan">
              <select required className="input-soft" value={form.degree_plan} onChange={(e) => setForm({ ...form, degree_plan: e.target.value })} data-testid="apply-degree">
                {["UG", "Masters", "PhD", "Associate"].map((d) => (<option key={d} value={d}>{d}</option>))}
              </select>
            </Field>
            <Field label="Major / Field"><input required className="input-soft" value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} data-testid="apply-major" /></Field>
            <Field span={2} label="Highest Education"><input required className="input-soft" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} data-testid="apply-education" placeholder="e.g. B.Tech, Computer Science, IIT Delhi (2024)" /></Field>
            <Field span={2} label="Professional Courses (optional)"><input className="input-soft" value={form.professional_courses} onChange={(e) => setForm({ ...form, professional_courses: e.target.value })} data-testid="apply-courses" /></Field>
            <Field label="Mobile"><input required className="input-soft" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} data-testid="apply-mobile" /></Field>
            <Field label="Email"><input required type="email" className="input-soft" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="apply-email" /></Field>
            <Field label="Language Exam (IELTS/TOPIK/JLPT…)"><input className="input-soft" value={form.language_exam} onChange={(e) => setForm({ ...form, language_exam: e.target.value })} data-testid="apply-language" /></Field>
            <Field label="Birth Date"><input type="date" required className="input-soft" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} data-testid="apply-birth" /></Field>
            <div className="sm:col-span-2 mt-2">
              <button type="submit" disabled={loading} className="btn-brand w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="apply-submit">
                {loading ? "Submitting…" : (<>Submit application <ArrowRight size={18} strokeWidth={1.7} /></>)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Label({ children }) {
  return <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold">{children}</label>;
}

function Field({ label, span = 1, children }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
