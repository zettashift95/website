"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const HeroVisual = dynamic(() => import("@/components/HeroVisual"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[520px] bg-gradient-to-br from-[#F8FAFF] to-[#EBF5F5]" />
  ),
});

const METRICS = [
  { label: "Projects delivered", value: "340+"   },
  { label: "Avg performance lift", value: "4.8x" },
  { label: "Client retention",   value: "94%"    },
  { label: "Uptime SLA",         value: "99.97%" },
];

export default function HeroSection() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="hero-heading"
      className="mt-16 min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden bg-white"
    >
      {/* Left column */}
      <div className="relative z-10 flex flex-col justify-center gap-8 px-8 md:px-12 lg:px-16 py-20 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">

        {/* Eyebrow */}
        <p className="text-[0.8125rem] font-medium text-[#627D98] tracking-wide reveal">
          Digital infrastructure, built to scale.
        </p>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="text-[clamp(2.75rem,5vw,4rem)] font-extrabold text-[#0A2540] leading-[1.04] tracking-[-0.04em] reveal reveal-delay-1"
        >
          The core engine<br />
          for digital<br />
          <span className="text-[#0066FF]">multi-scalability.</span>
        </h1>

        {/* Body copy */}
        <p className="text-[1.0625rem] leading-[1.8] text-[#627D98] max-w-[42ch] reveal reveal-delay-2">
          ZettaShift designs and deploys next-generation digital frameworks,
          autonomous AI systems, and enterprise web architecture built for
          operational velocity.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 reveal reveal-delay-3">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2.5 bg-[#0066FF] text-white text-[0.9375rem] font-semibold px-7 py-3.5 hover:bg-[#004FCC] transition-colors duration-200 group"
          >
            Explore Studios
            <svg
              width="14" height="11" viewBox="0 0 14 11" fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#0A2540] text-[0.9375rem] font-semibold px-7 py-3.5 hover:border-[#0A2540] transition-colors duration-200"
          >
            Start a project
          </Link>
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#E2E8F0] mt-2 reveal reveal-delay-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`px-5 py-4 flex flex-col gap-1.5 ${i < METRICS.length - 1 ? "border-r border-[#E2E8F0]" : ""}`}
            >
              <span className="text-[1.375rem] font-extrabold text-[#0A2540] tracking-[-0.03em] leading-none">
                {m.value}
              </span>
              <span className="text-[0.75rem] text-[#627D98] leading-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: visual */}
      <div className="relative z-10 min-h-[520px] lg:min-h-0">
        <HeroVisual />
      </div>
    </section>
  );
}
