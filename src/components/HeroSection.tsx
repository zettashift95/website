"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] bg-[#F3F4F6] animate-pulse" aria-hidden="true" />
  ),
});

const METRICS = [
  { label: "Deployments", value: "340+",   accent: false },
  { label: "Uptime SLA",  value: "99.97%", accent: false },
  { label: "Avg Lift",    value: "4.8x",   accent: true  },
  { label: "NPS Score",   value: "94",     accent: false },
];

export default function HeroSection() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="hero-heading"
      className="mt-16 min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden"
    >
      {/* Blueprint grid background — full width */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none z-0" aria-hidden="true" />

      {/* Left column */}
      <div className="relative z-10 flex flex-col justify-center gap-9 px-8 md:px-12 lg:px-16 py-20 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#E2E8F0]">

        {/* System tag */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[0.6875rem] font-mono font-medium text-[#00D4B2] tracking-[0.06em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] shadow-[0_0_8px_#00D4B2] animate-pulse" />
            ZettaShift Core Platform
          </span>
          <span className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.06em] uppercase border border-[#E2E8F0] px-2 py-0.5">
            v1.0.0
          </span>
        </div>

        {/* H1 */}
        <div className="space-y-4">
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,4.5vw,3.75rem)] font-extrabold text-[#0A2540] leading-[1.04] tracking-[-0.04em] reveal"
          >
            The Core Engine<br />
            for Digital<br />
            <span className="relative inline-block">
              <span className="relative z-10">Multi-Scalability.</span>
              <span
                className="absolute left-0 bottom-1 h-[0.18em] w-full bg-[#0066FF] opacity-20 z-0"
                aria-hidden="true"
              />
            </span>
          </h1>
        </div>

        {/* Body */}
        <p className="text-[1rem] leading-[1.8] text-[#627D98] max-w-[44ch] reveal reveal-delay-1">
          ZettaShift designs and deploys next-generation digital frameworks,
          scalable computing models, and autonomous technology architectures
          built for enterprise operational velocity.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 reveal reveal-delay-2">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2.5 bg-[#0066FF] text-white text-[0.875rem] font-semibold px-6 py-3.5 hover:bg-[#004FCC] transition-colors duration-200 group"
          >
            Explore Studios
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#0A2540] text-[#0A2540] text-[0.875rem] font-semibold px-6 py-3.5 hover:bg-[#0A2540] hover:text-white transition-all duration-200"
          >
            Start a Project
          </Link>
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-4 gap-0 border border-[#E2E8F0] reveal reveal-delay-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`px-4 py-4 flex flex-col gap-1 ${i < METRICS.length - 1 ? "border-r border-[#E2E8F0]" : ""}`}
            >
              <span className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.06em] uppercase">{m.label}</span>
              <span className={`text-[1.25rem] font-extrabold tracking-[-0.03em] ${m.accent ? "text-[#0066FF]" : "text-[#0A2540]"}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Trusted by strip */}
        <div className="flex flex-wrap items-center gap-3 reveal reveal-delay-4">
          <span className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.06em] uppercase">Trusted by teams at</span>
          {["Series A", "Enterprise", "Scale-ups", "Global brands"].map((label) => (
            <span
              key={label}
              className="font-mono text-[0.625rem] text-[#0A2540] bg-[#F3F4F6] border border-[#E2E8F0] px-2.5 py-1"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Right column: interactive canvas */}
      <div className="relative z-10 min-h-[480px] lg:min-h-0">
        <HeroCanvas />

        {/* Floating service preview cards */}
        <div className="absolute left-5 bottom-12 flex flex-col gap-2 pointer-events-none">
          {[
            { label: "AI Consulting",     color: "#00D4B2", status: "Active" },
            { label: "Website Development", color: "#0066FF", status: "Active" },
            { label: "Automations",       color: "#0066FF", status: "Active" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-white/85 backdrop-blur-md border border-[#E2E8F0] px-3.5 py-2.5 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: s.color }} />
              <span className="font-mono text-[0.5625rem] text-[#0A2540] font-medium tracking-[0.04em]">{s.label}</span>
              <span className="ml-auto font-mono text-[0.5rem] text-[#627D98] tracking-[0.06em] uppercase pl-3">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
