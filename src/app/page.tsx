import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import EmailCapture from "@/components/EmailCapture";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "ZettaShift — Core Engine for Digital Multi-Scalability",
  description:
    "ZettaShift designs and deploys next-generation digital frameworks, scalable computing models, and autonomous technology architectures built for enterprise operational velocity.",
  alternates: { canonical: "https://www.zettashift.com" },
};

export default function HomePage() {
  return (
    <>
      <ScrollRevealProvider />

      <a
        href="#ecosystem"
        className="sr-only focus:not-sr-only fixed top-2 left-2 z-[9999] bg-[#0066FF] text-white font-mono text-xs px-4 py-2 focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">

        {/* Hero */}
        <HeroSection />

        {/* Studios intro belt */}
        <section
          id="studios"
          aria-labelledby="studios-heading"
          className="border-b border-[#E2E8F0] bg-[#F3F4F6]"
        >
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end mb-14 reveal">
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-[#0066FF] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
                  Division 01 — Active
                </p>
                <h2
                  id="studios-heading"
                  className="text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold text-[#0A2540] leading-[1.08] tracking-[-0.04em] mb-4"
                >
                  ZettaShift Studios
                </h2>
                <p className="text-[1rem] leading-[1.8] text-[#627D98] max-w-[52ch]">
                  High-performance digital infrastructure and cognitive automation. Six disciplines,
                  one integrated system built to compound results over time.
                </p>
              </div>
              <Link
                href="/studios"
                className="shrink-0 inline-flex items-center gap-2.5 border border-[#0A2540] text-[#0A2540] text-[0.875rem] font-semibold px-6 py-3.5 hover:bg-[#0A2540] hover:text-white transition-all duration-200 group whitespace-nowrap"
              >
                All services
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#E2E8F0]">
              {SERVICES.map((service, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const isLastCol = col === 2;
                const isLastRow = row === Math.floor((SERVICES.length - 1) / 3);

                return (
                  <Link
                    key={service.slug}
                    href={`/studios/${service.slug}`}
                    className={`group relative bg-white flex flex-col p-7 hover:bg-[#F8F9FA] transition-colors duration-200
                      ${!isLastCol ? "sm:border-r border-[#E2E8F0]" : ""}
                      ${!isLastRow ? "border-b border-[#E2E8F0]" : ""}
                      reveal`}
                    style={{ transitionDelay: `${i * 55}ms` }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.08em] uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className="text-[#E2E8F0] group-hover:text-[#0066FF] transition-colors duration-200"
                      >
                        <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    <h3 className="text-[0.9375rem] font-bold text-[#0A2540] group-hover:text-[#0066FF] transition-colors duration-200 mb-2 tracking-[-0.01em]">
                      {service.title}
                    </h3>
                    <p className="text-[0.8125rem] leading-[1.65] text-[#627D98] flex-1">
                      {service.tagline}
                    </p>

                    <div className="mt-5 pt-5 border-t border-[#E2E8F0] flex items-center gap-1.5">
                      <span className="text-[0.75rem] font-semibold text-[#0066FF]">
                        Learn more
                      </span>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-[#0066FF] group-hover:translate-x-0.5 transition-transform">
                        <path d="M1 4h8M5.5 1L9 4l-3.5 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why ZettaShift */}
        <section
          id="why"
          aria-labelledby="why-heading"
          className="border-b border-[#E2E8F0]"
        >
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-3">Why ZettaShift</p>
                <h2
                  id="why-heading"
                  className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#0A2540] tracking-[-0.04em] leading-[1.1] mb-6"
                >
                  Systems that earn their keep.
                </h2>
                <p className="text-[1rem] leading-[1.8] text-[#627D98] mb-8">
                  We build infrastructure that compounds. Every engagement is scoped around measurable
                  outcomes — not deliverables, not hours billed, not reports filed.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-mono text-[0.8125rem] text-[#0066FF] hover:text-[#004FCC] transition-colors font-medium group"
                >
                  More about us
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-0 border border-[#E2E8F0] reveal reveal-delay-1">
                {[
                  { label: "Outcome-first contracts", copy: "Success metrics defined before we start. No ambiguous briefs." },
                  { label: "No account managers", copy: "You talk directly to the engineers building your system." },
                  { label: "Edge-deployed infrastructure", copy: "Sub-100ms TTFB globally. Performance is non-negotiable." },
                  { label: "Compounding returns", copy: "Month three outperforms month one by design." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-6
                      ${i % 2 === 0 ? "border-r border-[#E2E8F0]" : ""}
                      ${i < 2 ? "border-b border-[#E2E8F0]" : ""}
                    `}
                  >
                    <div className="w-6 h-0.5 bg-[#0066FF] mb-4" />
                    <p className="text-[0.875rem] font-bold text-[#0A2540] mb-2">{item.label}</p>
                    <p className="text-[0.8125rem] leading-[1.65] text-[#627D98]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA panel */}
        <section
          id="contact"
          aria-labelledby="cta-heading"
          className="border-b border-[#E2E8F0] bg-[#F3F4F6]"
        >
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-20">
            <div className="max-w-[720px] mx-auto border border-[#E2E8F0] bg-white relative overflow-hidden reveal">
              {/* Corner ticks */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#0066FF]" aria-hidden="true" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#0066FF]" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#0066FF]" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#0066FF]" aria-hidden="true" />

              <div className="px-10 md:px-16 py-14 text-center">
                <p className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-[#00D4B2] mb-4">
                  Direct uplink
                </p>
                <h2
                  id="cta-heading"
                  className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#0A2540] tracking-[-0.04em] leading-[1.1] mb-4"
                >
                  Calibrate your system architecture.
                </h2>
                <p className="text-[0.9375rem] leading-[1.75] text-[#627D98] max-w-[46ch] mx-auto mb-10">
                  Connect with our lead engineer to audit your digital infrastructure and map your deployment vectors.
                </p>
                <EmailCapture />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
