"use client";

import { useState, useId } from "react";
import Link from "next/link";

export default function EmailCapture() {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const emailId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Quick contact form"
        className="flex items-stretch border border-[#0A2540] overflow-hidden"
      >
        <label htmlFor={emailId} className="sr-only">Work email address</label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          required
          disabled={loading}
          autoComplete="email"
          className="flex-1 min-w-0 font-mono text-[0.8125rem] text-[#0A2540] placeholder:text-[#627D98]/60
            bg-white border-none outline-none px-5 py-3.5 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || sent}
          className="font-mono text-[0.75rem] font-semibold tracking-[0.03em] text-white bg-[#0A2540]
            border-none px-6 py-3.5 whitespace-nowrap shrink-0
            transition-colors duration-200 hover:bg-[#0066FF] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : sent ? "Sent" : "Deploy Project"}
        </button>
      </form>

      {sent && (
        <p role="status" aria-live="polite" className="font-mono text-[0.75rem] text-[#00D4B2] text-center">
          Received. We will be in touch shortly.
        </p>
      )}

      <p className="font-mono text-[0.625rem] text-[#627D98] text-center">
        Or{" "}
        <Link href="/contact" className="text-[#0066FF] hover:text-[#004FCC] transition-colors">
          fill out the full project brief
        </Link>
        {" "}for a faster, more tailored response.
      </p>
    </div>
  );
}
