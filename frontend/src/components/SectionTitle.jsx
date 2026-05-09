import React from "react";

export default function SectionTitle({ eyebrow, title, subtitle, align = "left", className = "" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[11px] uppercase tracking-[0.2em] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-ink font-extrabold mt-4 leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-brand-muted text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}
