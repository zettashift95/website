import type { Metadata } from "next";
import Link from "next/link";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Technical Stack | ZettaShift",
  description: "The modern technology stack ZettaShift uses to build, deploy, and scale world-class digital systems for enterprise clients.",
  alternates: { canonical: "https://www.zettashift.com/technical-stack" },
};

const STACK = [
  {
    category: "Frontend",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "tRPC", "PostgreSQL", "Redis", "Supabase"],
  },
  {
    category: "AI & Automation",
    items: ["OpenAI GPT-4o", "LangChain", "n8n", "Zapier", "Vercel AI SDK"],
  },
  {
    category: "Infrastructure",
    items: ["Vercel Edge Network", "Cloudflare", "AWS", "Docker", "GitHub Actions"],
  },
  {
    category: "Analytics & SEO",
    items: ["Google Analytics 4", "Plausible", "Search Console API", "Ahrefs API", "Looker Studio"],
  },
  {
    category: "Design System",
    items: ["Figma", "Radix UI", "Storybook", "Design tokens", "Component libraries"],
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Performance as a feature",
    copy: "We treat Core Web Vitals as a product requirement, not an afterthought. Every architecture decision is benchmarked against real user impact.",
  },
  {
    n: "02",
    title: "Type safety end-to-end",
    copy: "TypeScript from the database schema to the UI component. Fewer bugs, faster refactors, and a codebase your team can actually maintain.",
  },
  {
    n: "03",
    title: "Edge-first deployment",
    copy: "Static where possible, dynamic where necessary, cached everywhere. Sub-100ms TTFB from any geography by default.",
  },
  {
    n: "04",
    title: "AI-augmented workflows",
    copy: "We embed AI tooling into the development lifecycle itself — code review, documentation, test generation, and deployment checks.",
  },
];

export default function TechnicalStackPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative border-b border-[#E2E8F0] overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0066FF] opacity-[0.03] blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto px-8 md:px-12 py-24 md:py-32">
            <div className="font-mono text-[0.6875rem] text-[#0066FF] tracking-[0.1em] uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
              Engineering Infrastructure
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#0A2540] leading-[1.05] tracking-[-0.04em] mb-5 max-w-2xl reveal">
              The stack that powers our clients.
            </h1>
            <p className="text-[1.0625rem] leading-[1.8] text-[#627D98] max-w-[50ch] reveal reveal-delay-1">
              We run a curated, modern, production-grade technology stack across every engagement. No legacy dependencies. No bloat.
            </p>
          </div>
        </section>

        {/* Stack grid */}
        <section className="max-w-6xl mx-auto px-8 md:px-12 py-20">
          <div className="mb-12 pb-6 border-b border-[#E2E8F0] reveal">
            <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">Technology layers</p>
            <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">Core toolchain.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#E2E8F0]">
            {STACK.map((layer, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const isLastCol = col === 2;
              const isLastRow = row === Math.floor((STACK.length - 1) / 3);
              return (
                <div
                  key={layer.category}
                  className={`p-8 reveal ${!isLastCol ? "md:border-r border-[#E2E8F0]" : ""} ${!isLastRow ? "border-b border-[#E2E8F0]" : ""}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <p className="font-mono text-[0.5625rem] text-[#0066FF] tracking-[0.1em] uppercase mb-4">
                    {String(i + 1).padStart(2, "0")} / {layer.category}
                  </p>
                  <ul className="space-y-2.5">
                    {layer.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[0.875rem] text-[#0A2540]">
                        <span className="w-1 h-1 rounded-full bg-[#E2E8F0] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Engineering principles */}
        <section className="bg-[#F3F4F6] border-y border-[#E2E8F0] py-20">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="mb-12 reveal">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-2">Our approach</p>
              <h2 className="text-[1.875rem] font-extrabold text-[#0A2540] tracking-[-0.03em]">Engineering principles.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#E2E8F0] bg-white">
              {PRINCIPLES.map((p, i) => (
                <div key={p.n} className={`p-8 ${i % 2 === 0 ? "border-b md:border-b-0 md:border-r border-[#E2E8F0]" : ""} ${i < 2 ? "border-b border-[#E2E8F0]" : ""} reveal`} style={{ transitionDelay: `${i * 80}ms` }}>
                  <p className="font-mono text-[0.6875rem] text-[#0066FF] tracking-[0.08em] mb-4">{p.n}</p>
                  <h3 className="text-[1rem] font-bold text-[#0A2540] mb-3">{p.title}</h3>
                  <p className="text-[0.875rem] leading-[1.75] text-[#627D98]">{p.copy}</p>
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
