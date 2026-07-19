import React from "react";
import { BookOpen, ExternalLink } from "lucide-react";

const FLIPBOOK_URL = "https://heyzine.com/flip-book/a7f624aecc.html";

export default function Flipbook() {
  return (
    <main className="min-h-screen bg-brand-soft">
      <section className="relative overflow-hidden bg-brand-navy py-14 text-white sm:py-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="section-shell relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4" />
            Digital Rule Book
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Veritas Sphere Rule Book
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
            Read our complete terms, conditions, and programme guidelines in an interactive flipbook.
          </p>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-xl sm:rounded-3xl">
          <iframe
            src={FLIPBOOK_URL}
            title="Veritas Sphere Rule Book"
            className="h-[72vh] min-h-[540px] w-full border-0"
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
          />
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-brand-navy">Need a larger view?</h2>
            <p className="mt-1 text-sm text-brand-muted">
              Open the flipbook in a separate tab for the full-screen reading experience.
            </p>
          </div>
          <a
            href={FLIPBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-brand inline-flex shrink-0 items-center gap-2"
          >
            Open Full Screen
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
