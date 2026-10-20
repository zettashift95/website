import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About ZettaShift — The Technology Infrastructure Company",
  description:
    "ZettaShift is a technology infrastructure company building next-generation digital systems, AI-powered automation, and enterprise-scale web products.",
  alternates: { canonical: "https://www.zettashift.com/about" },
};

const VALUES = [
  {
    n: "01",
    title: "Precision over volume",
    copy: "We take fewer clients and go deeper. Every engagement is resourced properly, scoped realistically, and executed with full attention.",
  },
  {
    n: "02",
    title: "Ownership mindset",
    copy: "We treat your systems like we built them for ourselves. That means flagging problems early, making hard calls, and caring past the invoice.",
  },
  {
    n: "03",
    title: "Compounding systems",
    copy: "We build infrastructure that gets better over time. Every delivery adds leverage — the output of month three should outperform month one.",
  },
  {
    n: "04",
    title: "No black boxes",
    copy: "Everything we build is documented, explainable, and transferable. You own what we make. There is no dependency lock-in by design.",
  },
];

const TIMELINE = [
  { year: "2024", label: "Founded", copy: "ZettaShift incorporated with a focus on AI-augmented web infrastructure." },
  { year: "2024", label: "Studios launched", copy: "ZettaShift Studios opened as the client services division, shipping the first three engagements." },
  { year: "2025", label: "AI practice expanded", copy: "Added AI Consulting and AI Marketing as formal disciplines after growing demand from existing clients." },
  { year: "2026", label: "Enterprise tier", copy: "Launched enterprise-grade retainer programs for Series B and above companies." },
];

export default function AboutPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative border-b border-[#E2E8F0] overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0066FF] opacity-[0.025] blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto px-8 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-[0.6875rem] text-[#0066FF] tracking-[0.1em] uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
                Corporate Overview
              </div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#0A2540] leading-[1.05] tracking-[-0.04em] mb-6 reveal">
                We build the systems companies grow on.
              </h1>
              <p className="text-[1.0625rem] leading-[1.8] text-[#627D98] mb-8 reveal reveal-delay-1">
                ZettaShift is a technology infrastructure company. We design, build, and operate
                digital systems — from production web architecture to autonomous AI workflows —
                for companies that compete on the quality of their technology.
              </p>
              <div className="flex flex-wrap gap-4 reveal reveal-delay-2">
                <Link
                  href="/studios"
                  className="inline-flex items-center gap-2.5 bg-[#0066FF] text-white text-[0.875rem] font-semibold px-6 py-3.5 hover:bg-[#004FCC] transition-colors group"
                >
                  See our services
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#627D98] text-[0.875rem] font-medium px-6 py-3.5 hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                  Get in touch
                </Link>
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-0 border border-[#E2E8F0] h-fit reveal reveal-delay-1">
              {[
                { label: "Founded", value: "2024" },
                { label: "Headquarters", value: "Global" },
                { label: "Team size", value: "12–20" },
                { label: "Client retention", value: "94%" },
                { label: "Disciplines", value: "6" },
                { label: "Projects shipped", value: "340+" },
              ].map((f, i, arr) => (
                <div
                  key={f.label}
                  className={`px-6 py-5
                    ${i % 2 === 0 ? "border-r border-[#E2E8F0]" : ""}
                    ${i < arr.length - 2 ? "border-b border-[#E2E8F0]" : ""}
                  `}
                >
                  <div className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.06em] uppercase mb-1">{f.label}</div>
                  <div className="text-[1.125rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-6xl mx-auto px-8 md:px-12 py-20 border-b border-[#E2E8F0]">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2 reveal">Mission</p>
              <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em] max-w-[14ch] reveal reveal-delay-1">
                Why we exist.
              </h2>
            </div>
            <div className="space-y-6 reveal reveal-delay-2">
              <p className="text-[1.125rem] leading-[1.85] text-[#627D98]">
                Most digital agencies optimize for deliverables. We optimize for outcomes.
                The distinction matters because a beautiful website that doesn&apos;t convert
                is a cost, not an asset. An AI system that needs constant supervision isn&apos;t
                saving time — it&apos;s creating a new kind of work.
              </p>
              <p className="text-[1.0625rem] leading-[1.85] text-[#627D98]">
                ZettaShift exists to close that gap. We hire engineers who understand business,
                and strategists who understand code. Every system we build is designed to create
                measurable, compounding returns on the investment our clients make.
              </p>
              <p className="text-[1.0625rem] leading-[1.85] text-[#627D98]">
                Our model is simple: fewer clients, deeper partnerships, better results. We are
                not a body shop. We are not a sprint factory. We are a technology partner
                embedded in your growth.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F3F4F6] border-b border-[#E2E8F0] py-20">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="mb-12 reveal">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">Operating principles</p>
              <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">How we work.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E2E8F0] bg-white">
              {VALUES.map((v, i) => (
                <div
                  key={v.n}
                  className={`p-8
                    ${i % 2 === 0 ? "border-b md:border-b-0 md:border-r border-[#E2E8F0]" : ""}
                    ${i < 2 ? "border-b border-[#E2E8F0]" : ""}
                    reveal`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="font-mono text-[0.625rem] text-[#0066FF] tracking-[0.1em] mb-4">{v.n}</p>
                  <h3 className="text-[1rem] font-bold text-[#0A2540] mb-3">{v.title}</h3>
                  <p className="text-[0.875rem] leading-[1.75] text-[#627D98]">{v.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-6xl mx-auto px-8 md:px-12 py-20">
          <div className="mb-12 reveal">
            <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">Company history</p>
            <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">The timeline.</h2>
          </div>

          <div className="relative pl-8 border-l border-[#E2E8F0] space-y-10">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Dot */}
                <div className="absolute -left-[calc(2rem+4.5px)] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#0066FF] bg-white" />

                <div className="flex flex-wrap gap-4 items-start">
                  <span className="font-mono text-[0.6875rem] font-semibold text-[#0066FF] tracking-[0.04em] mt-0.5 min-w-[3rem]">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-[0.9375rem] font-bold text-[#0A2540] mb-1">{item.label}</p>
                    <p className="text-[0.875rem] leading-[1.7] text-[#627D98]">{item.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
