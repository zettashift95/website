"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { SERVICES } from "@/lib/services";

const NeuralSVG    = dynamic(() => import("@/components/cards/NeuralSVG"),    { ssr: false });
const WireframeSVG = dynamic(() => import("@/components/cards/WireframeSVG"), { ssr: false });
const ChartSVG     = dynamic(() => import("@/components/cards/ChartSVG"),     { ssr: false });

// Map first 3 services to their advanced visuals; rest get the generic stat visual
const VISUAL_MAP: Record<string, React.ComponentType> = {
  "ai-consulting":           NeuralSVG,
  "ai-marketing":            NeuralSVG,
  "website-development":     WireframeSVG,
  "digital-marketing":       ChartSVG,
  "social-media-management": ChartSVG,
  "automations":             NeuralSVG,
};

export default function CapabilityMatrix() {
  return (
    <section
      id="stack"
      aria-labelledby="matrix-heading"
      className="py-20 px-6 md:px-10 bg-white"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#E2E8F0] reveal">
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">
              Studios capability matrix
            </p>
            <h2
              id="matrix-heading"
              className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold text-[#0A2540] tracking-[-0.03em]"
            >
              Six disciplines. One integrated system.
            </h2>
          </div>
          <Link
            href="/studios"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[0.75rem] text-[#0066FF] hover:text-[#004FCC] transition-colors font-medium group"
          >
            View all
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M1 4h8M5.5 1L9 4l-3.5 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Card grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border border-[#E2E8F0]"
          role="list"
          aria-label="ZettaShift Studios service capabilities"
        >
          {SERVICES.map((service, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const isLastCol = col === 2;
            const isLastRow = row === Math.floor((SERVICES.length - 1) / 3);
            const Visual = VISUAL_MAP[service.slug];

            return (
              <article
                key={service.slug}
                role="listitem"
                className={`
                  group flex flex-col relative overflow-hidden
                  bg-white hover:bg-[#F8F9FA]
                  transition-colors duration-200
                  reveal
                  ${!isLastCol ? "md:border-r border-[#E2E8F0]" : ""}
                  ${!isLastRow ? "border-b border-[#E2E8F0]" : ""}
                `}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Top visual area */}
                <div
                  className="h-[180px] border-b border-[#E2E8F0] bg-[#F3F4F6] flex items-center justify-center overflow-hidden p-5 relative"
                  aria-hidden="true"
                >
                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {Visual && <Visual />}
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <span className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.08em] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1rem] font-bold text-[#0A2540] tracking-[-0.02em] leading-[1.3] group-hover:text-[#0066FF] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-[0.875rem] leading-[1.7] text-[#627D98] flex-1">
                    {service.tagline}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-5 pt-4 border-t border-[#E2E8F0]">
                    {service.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <div className="text-[0.9375rem] font-extrabold text-[#0066FF] tracking-[-0.02em]">{stat.value}</div>
                        <div className="font-mono text-[0.5rem] text-[#627D98] tracking-[0.05em] uppercase mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/studios/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-[#0066FF] mt-2 group-hover:gap-3 transition-all duration-200"
                    aria-label={`Explore ${service.title}`}
                  >
                    Explore
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4h8M5.5 1L9 4l-3.5 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
