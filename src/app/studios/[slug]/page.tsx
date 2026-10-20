import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, SERVICE_MAP } from "@/lib/services";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_MAP[slug];
  if (!service) return {};
  return {
    title: `${service.title} | ZettaShift Studios`,
    description: service.description,
    alternates: { canonical: `https://www.zettashift.com/studios/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_MAP[slug];
  if (!service) notFound();

  const currentIdx = SERVICES.findIndex((s) => s.slug === slug);
  const prev = SERVICES[currentIdx - 1];
  const next = SERVICES[currentIdx + 1];

  const isNeon = service.color === "#00D4B2";

  return (
    <>
      <ScrollRevealProvider />
      <Navbar />
      <main className="pt-16">

        {/* Breadcrumb */}
        <div className="border-b border-[#E2E8F0] bg-[#F8F9FA]">
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-3 flex items-center gap-2 font-mono text-[0.6875rem] text-[#627D98]">
            <Link href="/" className="hover:text-[#0066FF] transition-colors">ZettaShift</Link>
            <span>/</span>
            <Link href="/studios" className="hover:text-[#0066FF] transition-colors">Studios</Link>
            <span>/</span>
            <span className="text-[#0A2540] font-medium">{service.title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E2E8F0]">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-[0.04]"
            style={{ background: service.color }}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto px-8 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <div className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase mb-5 flex items-center gap-2"
                style={{ color: service.color }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: service.color }} />
                ZettaShift Studios / {String(currentIdx + 1).padStart(2, "0")}
              </div>

              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#0A2540] leading-[1.05] tracking-[-0.04em] mb-5 reveal">
                {service.title}
              </h1>

              <p className="text-[1.125rem] leading-[1.8] text-[#627D98] max-w-[52ch] mb-8 reveal reveal-delay-1">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4 reveal reveal-delay-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 text-white text-[0.875rem] font-semibold px-6 py-3.5 transition-colors group"
                  style={{ background: service.color }}
                >
                  Start with {service.title}
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/studios" className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#627D98] text-[0.875rem] font-medium px-6 py-3.5 hover:border-[#0A2540] hover:text-[#0A2540] transition-all">
                  All services
                </Link>
              </div>
            </div>

            {/* Stats block */}
            <div className="flex flex-col gap-0 border border-[#E2E8F0] bg-white min-w-[220px] reveal reveal-delay-1">
              {service.stats.map((stat, i) => (
                <div key={stat.label} className={`px-6 py-5 ${i < service.stats.length - 1 ? "border-b border-[#E2E8F0]" : ""}`}>
                  <div className="text-[1.875rem] font-extrabold tracking-[-0.04em] mb-0.5" style={{ color: service.color }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[0.6rem] text-[#627D98] tracking-[0.06em] uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features and detail */}
        <section className="max-w-6xl mx-auto px-8 md:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* What's included */}
            <div className="reveal">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-4">
                What you get
              </p>
              <h2 className="text-[1.5rem] font-extrabold text-[#0A2540] tracking-[-0.03em] mb-8">
                Full-scope delivery.
              </h2>
              <ul className="space-y-3">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                    <span className="text-[0.9375rem] text-[#0A2540] leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why ZettaShift */}
            <div className="reveal reveal-delay-1">
              <p className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase text-[#627D98] mb-4">
                Why ZettaShift Studios
              </p>
              <h2 className="text-[1.5rem] font-extrabold text-[#0A2540] tracking-[-0.03em] mb-8">
                Built for outcomes.
              </h2>

              <div className="space-y-6">
                {[
                  { title: "Outcome-first contracts", copy: "We define success metrics before we start. Your goals are built into how we scope, price, and measure every engagement." },
                  { title: "No handoffs", copy: "The team that scopes the work builds it. No account managers passing briefs to strangers. You talk to the people building your system." },
                  { title: "Speed without shortcuts", copy: "We ship fast because we have the infrastructure to do it right. Quality isn't traded for speed — it's enabled by process." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="shrink-0 w-7 h-7 flex items-center justify-center text-white font-mono text-[0.625rem] font-semibold"
                      style={{ background: service.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-[#0A2540] mb-1">{item.title}</p>
                      <p className="text-[0.875rem] leading-[1.7] text-[#627D98]">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="border-t border-[#E2E8F0] bg-[#F3F4F6] py-16">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[1.25rem] font-bold text-[#0A2540] tracking-tight">Other services</h2>
              <Link href="/studios" className="font-mono text-[0.75rem] text-[#0066FF] hover:text-[#004FCC] transition-colors">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E2E8F0] bg-white">
              {SERVICES.filter((s) => s.slug !== slug)
                .slice(0, 3)
                .map((s, i, arr) => (
                  <Link
                    key={s.slug}
                    href={`/studios/${s.slug}`}
                    className={`group p-6 hover:bg-[#F8F9FA] transition-colors ${i < arr.length - 1 ? "border-b md:border-b-0 md:border-r border-[#E2E8F0]" : ""}`}
                  >
                    <p className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.06em] uppercase mb-2">
                      {String(SERVICES.findIndex((sv) => sv.slug === s.slug) + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[0.9375rem] font-bold text-[#0A2540] group-hover:text-[#0066FF] transition-colors mb-1">{s.title}</h3>
                    <p className="text-[0.8125rem] text-[#627D98] leading-snug">{s.tagline}</p>
                  </Link>
                ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E2E8F0]">
              {prev ? (
                <Link href={`/studios/${prev.slug}`} className="flex items-center gap-2 font-mono text-[0.75rem] text-[#627D98] hover:text-[#0066FF] transition-colors">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M13 5.5H1M6 1.5L1 5.5l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {prev.title}
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/studios/${next.slug}`} className="flex items-center gap-2 font-mono text-[0.75rem] text-[#627D98] hover:text-[#0066FF] transition-colors">
                  {next.title}
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              )}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
