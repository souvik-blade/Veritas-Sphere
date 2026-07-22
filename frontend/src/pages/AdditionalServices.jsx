import React from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Building2,
  Receipt,
  BookOpenCheck,
  CreditCard,
  Car,
  FileText,
  UserCheck,
  Calculator,
  Briefcase,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Clock,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { WHATSAPP_NUMBERS } from "@/lib/config";

const WA_NUMBER = WHATSAPP_NUMBERS[0]?.number || "919466145196";

const SERVICE_CATEGORIES = [
  {
    category: "Identity & Government Documents",
    eyebrow: "Personal Documentation",
    desc: "Hassle-free application assistance and processing for essential government identity cards and certificates.",
    items: [
      {
        id: "passport",
        icon: FileText,
        title: "Passport Application & Renewal",
        desc: "End-to-end assistance for fresh passport applications, renewals, Tatkal processing, and document verification.",
        tags: ["Fresh / Renewal", "Tatkal Support", "Document Check"],
      },
      {
        id: "pcc",
        icon: UserCheck,
        title: "PCC (Police Clearance Certificate)",
        desc: "Specialised assistance for obtaining Police Clearance Certificates required for overseas study, work, or immigration.",
        tags: ["Passport Authority PCC", "Local Police PCC", "Verification Help"],
      },
      {
        id: "pan-tan",
        icon: CreditCard,
        title: "TAN / PAN Card Application",
        desc: "Quick processing and application submission for individual PAN cards, business PAN, and TAN registration.",
        tags: ["New PAN / TAN", "Correction / Update", "Digital Processing"],
      },
      {
        id: "driving-licence",
        icon: Car,
        title: "Driving Licence Application",
        desc: "Complete guidance for learner's licence, permanent driving licence applications, renewals, and international driving permits.",
        tags: ["Learner & Permanent", "Renewal", "IDP Guidance"],
      },
    ],
  },
  {
    category: "Business Registration & Setup",
    eyebrow: "Corporate Formation",
    desc: "Turnkey business incorporation and registration services for startups, firms, and sole proprietors.",
    items: [
      {
        id: "company-incorporation",
        icon: Building2,
        title: "Company Incorporation",
        desc: "Full-service incorporation for Private Limited (Pvt Ltd), Limited Liability Partnerships (LLP), and One Person Companies (OPC).",
        tags: ["Pvt Ltd / LLP / OPC", "Name Approval", "MOA & AOA Drafting"],
      },
      {
        id: "proprietorship-partnership",
        icon: Briefcase,
        title: "Proprietorship & Partnership Registration",
        desc: "Legal drafting of Partnership Deeds and registration setup for sole proprietorships and firm partnerships.",
        tags: ["Partnership Deed", "Firm Registration", "Legal Compliance"],
      },
      {
        id: "gst-registration",
        icon: Receipt,
        title: "GST Registration",
        desc: "Fast GST registration for individuals, traders, service providers, and corporate entities with state tax authorities.",
        tags: ["GSTIN Allotment", "Document Preparation", "HSN / SAC Mapping"],
      },
      {
        id: "udyam-registration",
        icon: Sparkles,
        title: "Udyam (MSME) Registration",
        desc: "Official Udyam registration to avail government MSME subsidies, collateral-free loans, and priority benefits.",
        tags: ["Micro / Small / Medium", "Instant Certificate", "Subsidies Access"],
      },
    ],
  },
  {
    category: "Taxation & Financial Compliance",
    eyebrow: "Accounting & Tax Services",
    desc: "Timely and accurate tax returns, accounting, and MCA regulatory compliance for individuals and companies.",
    items: [
      {
        id: "income-tax-return",
        icon: Calculator,
        title: "Income Tax Return (ITR) Filing",
        desc: "Expert tax calculation and return filing for salaried individuals, freelancers, professionals, and business entities.",
        tags: ["ITR 1 to ITR 7", "Tax Savings Guidance", "Notice Resolution"],
      },
      {
        id: "gst-return",
        icon: FileCheck2,
        title: "GST Return Filing",
        desc: "Regular monthly and quarterly GST return preparation and filing (GSTR-1, GSTR-3B, Annual Returns GSTR-9).",
        tags: ["GSTR-1 & GSTR-3B", "Reconciliation", "Annual GSTR-9"],
      },
      {
        id: "tds-return",
        icon: Receipt,
        title: "TDS Return Filing",
        desc: "Quarterly TDS return preparation (Form 24Q, 26Q, 27Q) and Form 16/16A generation for employers and deductors.",
        tags: ["Form 24Q & 26Q", "Form 16 Generation", "TDS Reconciliation"],
      },
      {
        id: "mca-return",
        icon: Building2,
        title: "MCA Return Filing",
        desc: "Annual ROC compliance, AOC-4, MGT-7, DIN KYC, and MCA regulatory return filings for registered companies.",
        tags: ["ROC Compliance", "AOC-4 & MGT-7", "DIR-3 KYC"],
      },
      {
        id: "bookkeeping",
        icon: BookOpenCheck,
        title: "Professional Bookkeeping",
        desc: "Systematic maintenance of financial accounts, ledgers, profit & loss reports, and balance sheets by qualified experts.",
        tags: ["Monthly Ledgers", "P&L & Balance Sheet", "Tally / Zoho Books"],
      },
    ],
  },
];

const TERMS_OF_ADDITIONAL_SERVICES = [
  {
    title: "1. Client Information & Verification",
    text: "All government applications (Passport, PCC, PAN, Driving Licence, GST, ITR) are processed based on authentic details and original documentation provided by the applicant.",
  },
  {
    title: "2. Processing Timelines & Authority Discretion",
    text: "While Veritas Sphere ensures prompt filing and follow-up, final issuance of government documents, GST approvals, and passport timelines remain subject to government office schedules.",
  },
  {
    title: "3. Government & Third-Party Fees",
    text: "Official government portal fees, stamp duties, and statutory charges are payable per actuals as prescribed by the issuing department.",
  },
  {
    title: "4. Confidentiality & Data Safety",
    text: "Personal identity documents, tax credentials, and financial statements are strictly encrypted and utilized exclusively for service execution.",
  },
];

export default function AdditionalServices() {
  const getWhatsAppUrl = (serviceName) => {
    const text = serviceName
      ? `Hi, I would like further details regarding ${serviceName} services.`
      : "Hi, I would like further details regarding your Additional Services.";
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ribbon overflow-hidden" data-testid="additional-services-hero">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-14 relative">
          <div className="max-w-3xl fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Layers size={12} /> Government & Business Solutions
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mt-5 leading-[1.02] text-brand-ink">
              Additional Services & Legal Compliance.
            </h1>
            <p className="mt-5 text-brand-muted text-lg leading-relaxed">
              From Passport & PCC assistance to GST, Income Tax filing, Company Incorporation, and Bookkeeping — connect with us on WhatsApp for complete details and assistance.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-brand inline-flex items-center gap-2"
                data-testid="additional-cta-whatsapp-hero"
              >
                <MessageCircle size={18} /> Contact Us on WhatsApp <ArrowRight size={18} strokeWidth={1.7} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Categorized */}
      <section className="section bg-brand-cream" data-testid="additional-services-list">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
          {SERVICE_CATEGORIES.map((catGroup, idx) => (
            <div key={catGroup.category} className="fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <SectionTitle
                eyebrow={catGroup.eyebrow}
                title={catGroup.category}
                subtitle={catGroup.desc}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                {catGroup.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="card-soft p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
                      data-testid={`additional-service-${item.id}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center">
                            <Icon size={22} strokeWidth={1.6} />
                          </div>
                          <a
                            href={getWhatsAppUrl(item.title)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-outline-brand text-xs py-1.5 px-3 inline-flex items-center gap-1.5 font-semibold"
                            data-testid={`additional-wa-btn-${item.id}`}
                          >
                            <MessageCircle size={14} /> Inquire on WhatsApp
                          </a>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-ink leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-brand-muted text-[14px] mt-3 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-brand-line flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-brand-cream border border-brand-line text-brand-ink/80"
                          >
                            <CheckCircle2 size={11} className="text-brand" /> {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Contact Banner Section (No Form) */}
      <section className="section bg-brand-ink relative overflow-hidden" data-testid="additional-whatsapp-banner">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[12px] uppercase tracking-[0.2em] font-semibold">
            <MessageCircle size={14} className="text-brand" /> Instant Assistance
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-5 leading-tight">
            Contact us on <span className="text-brand">WhatsApp</span> for further details.
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Need help with Passport, PCC, PAN, GST, ITR, Company Incorporation, or Bookkeeping? Connect with our dedicated team directly on WhatsApp for instant assistance, document checklists, and process details.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-brand text-base py-3.5 px-8 inline-flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(236,92,83,0.5)]"
              data-testid="additional-banner-whatsapp-btn"
            >
              <MessageCircle size={22} /> Chat on WhatsApp +91 94661 45196
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-left border-t border-white/10 pt-8">
            <div className="flex items-start gap-3 text-white/85">
              <Clock size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">Quick Response</div>
                <div className="text-xs text-white/60 mt-0.5">Replies within minutes during business hours</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/85">
              <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">100% Confidential</div>
                <div className="text-xs text-white/60 mt-0.5">Safe and secure document assistance</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/85">
              <PhoneCall size={20} className="text-brand shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white text-sm">Direct Support</div>
                <div className="text-xs text-white/60 mt-0.5">Connect with experienced filing experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Additional Services */}
      <section className="section bg-white" data-testid="terms-additional-services">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <SectionTitle
            eyebrow="Guidelines & Policies"
            title="Terms of Additional Services"
            subtitle="Essential policies governing identity, corporate registration, and tax filing support."
            align="center"
            className="mx-auto"
          />

          <div className="mt-12 space-y-6">
            {TERMS_OF_ADDITIONAL_SERVICES.map((term, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-2xl bg-brand-cream/60 border border-brand-line"
              >
                <h4 className="font-display text-lg font-bold text-brand-ink">
                  {term.title}
                </h4>
                <p className="text-brand-muted text-[15px] mt-2 leading-relaxed">
                  {term.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between p-6 rounded-2xl bg-brand-ink text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand shrink-0" size={24} />
              <span className="text-sm text-white/90">
                Need details regarding Rule Book policies or general service terms?
              </span>
            </div>
            <Link
              to="/terms"
              className="btn-brand text-xs py-2.5 px-4 shrink-0 inline-flex items-center gap-1.5"
            >
              Full Rule Book <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
