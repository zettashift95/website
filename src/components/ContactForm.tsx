"use client";

import { useState, useId } from "react";
import { SERVICES } from "@/lib/services";

type Status = "idle" | "loading" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus]     = useState<Status>("idle");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [company, setCompany]   = useState("");
  const [service, setService]   = useState("");
  const [message, setMessage]   = useState("");
  const nameId    = useId();
  const emailId   = useId();
  const companyId = useId();
  const serviceId = useId();
  const msgId     = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="border border-[#E2E8F0] bg-white p-10 flex flex-col items-center text-center gap-5">
        <div className="w-12 h-12 rounded-full bg-[#00D4B2]/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#00D4B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[1rem] font-bold text-[#0A2540] mb-1">Submission received.</p>
          <p className="text-[0.875rem] text-[#627D98] leading-relaxed max-w-[36ch]">
            We will review your project and respond within one business day with a clear next step.
          </p>
        </div>
        <button
          onClick={() => { setStatus("idle"); setName(""); setEmail(""); setCompany(""); setService(""); setMessage(""); }}
          className="font-mono text-[0.75rem] text-[#0066FF] hover:text-[#004FCC] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = `
    w-full bg-white border border-[#E2E8F0] text-[#0A2540] text-[0.875rem]
    px-4 py-3 outline-none placeholder:text-[#627D98]/60
    focus:border-[#0066FF] transition-colors duration-150
    disabled:opacity-50
  `;

  const labelClass = "block font-mono text-[0.625rem] text-[#627D98] tracking-[0.06em] uppercase mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Project inquiry form"
      className="border border-[#E2E8F0] bg-white p-8 md:p-10 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={nameId} className={labelClass}>Full name</label>
          <input
            id={nameId} type="text" required
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            disabled={status === "loading"}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor={emailId} className={labelClass}>Work email</label>
          <input
            id={emailId} type="email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            disabled={status === "loading"}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor={companyId} className={labelClass}>Company</label>
        <input
          id={companyId} type="text"
          value={company} onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          disabled={status === "loading"}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor={serviceId} className={labelClass}>Service interest</label>
        <div className="relative">
          <select
            id={serviceId}
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={status === "loading"}
            className={`${inputClass} appearance-none pr-10 cursor-pointer`}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
            <option value="other">Not sure yet</option>
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor={msgId} className={labelClass}>Tell us about your project</label>
        <textarea
          id={msgId} required rows={5}
          value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building? What problem are you solving? What does success look like?"
          disabled={status === "loading"}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="font-mono text-[0.75rem] text-red-500">
          Submission failed. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !name || !email || !message}
        className="w-full flex items-center justify-center gap-2.5
          bg-[#0066FF] text-white text-[0.875rem] font-semibold
          px-6 py-4 hover:bg-[#004FCC] transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Project Brief
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M1 5.5h12M8 1.5l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p className="font-mono text-[0.625rem] text-[#627D98] text-center tracking-[0.02em]">
        No spam. No sales calls you didn't ask for. One focused reply.
      </p>
    </form>
  );
}
