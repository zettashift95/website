import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "ZettaShift Studios — Digital Infrastructure and Cognitive Automation",
  description:
    "ZettaShift Studios builds production-grade web architecture, autonomous AI systems, and data-driven growth engines. Explore all six service disciplines.",
  alternates: { canonical: "https://www.zettashift.com/studios" },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  "website-development": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="4" width="22" height="16" rx="1.5" stroke="#0066FF" strokeWidth="1.5"/>
      <path d="M3 10h22M10 24h8M14 20v4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 14l2 2-2 2M13 17h5" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "digital-marketing": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 20l5-6 4 4 5-7 5 3" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="23" cy="6" r="3" stroke="#0066FF" strokeWidth="1.5"/>
      <path d="M4 24h20" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  "social-media-management": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="9" stroke="#00D4B2" strokeWidth="1.5"/>
      <path d="M11 14a3 3 0 1 1 6 0 3 3 0 0 1-6 0" stroke="#00D4B2" strokeWidth="1.25"/>
      <path d="M5 14h4M19 14h4M14 5v4M14 19v4" stroke="#00D4B2" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
      <circle cx="14" cy="14" r="1.5" fill="#00D4B2"/>
    </svg>
  ),
  "automations": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3.5" stroke="#0066FF" strokeWidth="1.5"/>
      <path d="M14 4v5M14 19v5M4 14h5M19 14h5M7.05 7.05l3.54 3.54M17.41 17.41l3.54 3.54M7.05 20.95l3.54-3.54M17.41 10.59l3.54-3.54" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  ),
  "ai-marketing": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4C9 4 5 8 5 13c0 3.5 2 6.5 5 8.2V24h8v-2.8c3-1.7 5-4.7 5-8.2 0-5-4-9-9-9z" stroke="#00D4B2" strokeWidth="1.5"/>
      <path d="M10 13h8M10 16h5" stroke="#00D4B2" strokeWidth="1.25" strokeLinecap="round"/>
      <circle cx="14" cy="10" r="1.5" fill="#00D4B2"/>
    </svg>
  ),
  "ai-consulting": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 20s0-6 9-6 9 6 9 6" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="9" r="4" stroke="#0066FF" strokeWidth="1.5"/>
      <path d="M22 11l3 3-3 3" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 14h-3" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
};

export default function StudiosPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E2E8F0]">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" aria-hidden="true" />

          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0066FF] opacity-[0.03] blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00D4B2] opacity-[0.04] blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto px-8 md:px-12 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[0.6875rem] text-[#0066FF] tracking-[0.1em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
                Active Division: Studio Operations
              </div>

              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#0A2540] leading-[1.05] tracking-[-0.04em] mb-6 reveal">
                ZettaShift Studios
              </h1>

              <p className="text-[1.125rem] leading-[1.8] text-[#627D98] max-w-[52ch] mb-8 reveal reveal-delay-1">
                High-performance digital infrastructure and cognitive automation for companies that need results, not reports. Six disciplines. One integrated system.
              </p>

              <div className="flex flex-wrap gap-4 reveal reveal-delay-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[#0066FF] text-white text-[0.875rem] font-semibold px-6 py-3.5 hover:bg-[#004FCC] transition-colors group"
                >
                  Start a Project
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href="#services" className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#627D98] text-[0.875rem] font-medium px-6 py-3.5 hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                  View all services
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#E2E8F0] mt-16 reveal reveal-delay-3">
              {[
                { label: "Services", value: "6" },
                { label: "Active clients", value: "85+" },
                { label: "Avg client retention", value: "94%" },
                { label: "Projects delivered", value: "340+" },
              ].map((s, i, arr) => (
                <div key={s.label} className={`px-6 py-5 ${i < arr.length - 1 ? "border-r border-[#E2E8F0]" : ""}`}>
                  <div className="text-[1.75rem] font-extrabold text-[#0A2540] tracking-[-0.04em] mb-1">{s.value}</div>
                  <div className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.06em] uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section id="services" className="max-w-6xl mx-auto px-8 md:px-12 py-20">
          <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#E2E8F0] reveal">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">
                Service Disciplines
              </p>
              <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">
                Six pillars of execution.
              </h2>
            </div>
            <span className="font-mono text-[0.6875rem] text-[#627D98] hidden sm:block">
              6 DISCIPLINES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#E2E8F0]">
            {SERVICES.map((service, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const isLastCol = col === 2;
              const isLastRow = row === Math.floor((SERVICES.length - 1) / 3);

              return (
                <Link
                  key={service.slug}
                  href={`/studios/${service.slug}`}
                  className={`group relative flex flex-col p-8 hover:bg-[#F8F9FA] transition-colors duration-200
                    ${!isLastCol ? "md:border-r border-[#E2E8F0]" : ""}
                    ${!isLastRow ? "border-b border-[#E2E8F0]" : ""}
                    reveal`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 text-[#E2E8F0] group-hover:text-[#0066FF] transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="mb-5 w-12 h-12 flex items-center justify-center bg-[#F3F4F6] border border-[#E2E8F0] group-hover:border-[#0066FF] group-hover:bg-white transition-all duration-200">
                    {ICON_MAP[service.slug]}
                  </div>

                  <p className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.08em] uppercase mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-[1rem] font-bold text-[#0A2540] tracking-[-0.02em] mb-2 group-hover:text-[#0066FF] transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-[0.875rem] leading-[1.7] text-[#627D98] mb-6 flex-1">
                    {service.tagline}
                  </p>

                  {/* Stats preview */}
                  <div className="flex gap-4 pt-4 border-t border-[#E2E8F0]">
                    {service.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <div className="text-[0.9375rem] font-extrabold text-[#0066FF] tracking-[-0.02em]">{stat.value}</div>
                        <div className="font-mono text-[0.5rem] text-[#627D98] tracking-[0.05em] uppercase mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Process section */}
        <section className="bg-[#F3F4F6] border-y border-[#E2E8F0] py-20">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="mb-12 reveal">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">How we work</p>
              <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">
                A system, not a service.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 border border-[#E2E8F0] bg-white reveal reveal-delay-1">
              {[
                { step: "01", label: "Discovery", copy: "We audit your existing stack and identify the highest-leverage opportunities." },
                { step: "02", label: "Architecture", copy: "We design a deployment roadmap with clear milestones and measurable outcomes." },
                { step: "03", label: "Execution", copy: "We build and ship in tight sprints with daily visibility into progress." },
                { step: "04", label: "Scale", copy: "We iterate on live data to compound results and expand the system." },
              ].map((p, i, arr) => (
                <div key={p.step} className={`p-8 ${i < arr.length - 1 ? "border-b md:border-b-0 md:border-r border-[#E2E8F0]" : ""}`}>
                  <div className="font-mono text-[0.625rem] text-[#0066FF] tracking-[0.1em] mb-4">{p.step}</div>
                  <h3 className="text-[1rem] font-bold text-[#0A2540] mb-3">{p.label}</h3>
                  <p className="text-[0.875rem] leading-[1.7] text-[#627D98]">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
