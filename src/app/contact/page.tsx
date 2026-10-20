import type { Metadata } from "next";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact ZettaShift — Start a Project",
  description:
    "Start a project with ZettaShift. Tell us about your goals and we will map out the right system architecture for your business.",
  alternates: { canonical: "https://www.zettashift.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ScrollRevealProvider />
      <Navbar />
      <main className="pt-16">
        <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0066FF] opacity-[0.03] blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00D4B2] opacity-[0.03] blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative w-full max-w-6xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: copy */}
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[0.6875rem] text-[#0066FF] tracking-[0.1em] uppercase mb-6 flex items-center gap-2 reveal">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
                Direct uplink
              </div>

              <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold text-[#0A2540] leading-[1.06] tracking-[-0.04em] mb-6 reveal reveal-delay-1">
                Let's build something that compounds.
              </h1>

              <p className="text-[1rem] leading-[1.8] text-[#627D98] mb-10 max-w-[40ch] reveal reveal-delay-2">
                Tell us what you are building or struggling with. We will respond
                within one business day with a clear next step — no pitch decks,
                no sales calls you didn't ask for.
              </p>

              {/* Contact details */}
              <div className="space-y-4 reveal reveal-delay-3">
                {[
                  { label: "Email", value: "hello@zettashift.com" },
                  { label: "Response time", value: "Within 1 business day" },
                  { label: "Timezone", value: "GMT / EST" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-8 border-b border-[#E2E8F0] pb-4">
                    <span className="font-mono text-[0.6875rem] text-[#627D98] tracking-[0.06em] uppercase min-w-[110px]">
                      {item.label}
                    </span>
                    <span className="text-[0.875rem] text-[#0A2540] font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* What happens next */}
              <div className="mt-10 reveal reveal-delay-4">
                <p className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.08em] uppercase mb-4">What happens next</p>
                <div className="space-y-3">
                  {[
                    "We review your submission and research your business",
                    "We send a tailored response with a proposed direction",
                    "We schedule a focused working session — not a demo",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono text-[0.5625rem] text-[#0066FF] mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.875rem] leading-[1.6] text-[#627D98]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal reveal-delay-1">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
