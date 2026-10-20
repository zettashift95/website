"use client";

import { useState, useId } from "react";
import Link from "next/link";

export default function CTASection() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const emailId = useId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStatus("sent");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="py-20 px-6 md:px-10 bg-[#F3F4F6] border-t border-[#E2E8F0]"
    >
      <div className="cta-panel max-w-[680px] mx-auto border border-[#E2E8F0] bg-white px-8 md:px-12 py-14 text-center relative reveal">
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-[#00D4B2] mb-5">
          Direct uplink
        </p>

        <h2
          id="cta-heading"
          className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#0A2540] tracking-[-0.04em] leading-[1.1] mb-4"
        >
          Calibrate your system architecture.
        </h2>

        <p className="text-[0.9375rem] leading-[1.75] text-[#627D98] max-w-[48ch] mx-auto mb-10">
          Establish direct connectivity with our lead engineer to audit your
          digital infrastructure and map out deployment vectors.
        </p>

        <form onSubmit={handleSubmit} aria-label="Project consultation form" noValidate>
          <label htmlFor={emailId} className="sr-only">Work email address</label>

          <div className="flex items-stretch border border-[#0A2540] overflow-hidden">
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              required
              disabled={loading}
              autoComplete="email"
              className="flex-1 min-w-0 font-mono text-[0.8125rem] text-[#0A2540]
                placeholder:text-[#627D98] placeholder:opacity-60
                bg-white border-none outline-none px-5 py-3.5 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || status === "sent"}
              className="font-mono text-[0.75rem] font-semibold tracking-[0.03em]
                text-white bg-[#0A2540] border-none px-5 py-3.5 whitespace-nowrap shrink-0
                transition-colors duration-200 hover:bg-[#0066FF]
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : status === "sent" ? "Sent" : "Start the conversation"}
            </button>
          </div>

          {status === "sent" && (
            <p role="status" aria-live="polite" className="mt-4 font-mono text-[0.75rem] text-[#00D4B2]">
              Received. We will be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p role="alert" aria-live="assertive" className="mt-4 font-mono text-[0.75rem] text-red-500">
              Submission failed. Please try again.
            </p>
          )}
        </form>

        <p className="mt-5 font-mono text-[0.625rem] text-[#627D98]">
          Prefer to share more detail?{" "}
          <Link href="/contact" className="text-[#0066FF] hover:text-[#004FCC] transition-colors">
            Fill out the full project brief
          </Link>
        </p>
      </div>
    </section>
  );
}
