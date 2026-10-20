import Link from "next/link";
import { SERVICES } from "@/lib/services";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Technical Stack", href: "/technical-stack" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-[#E2E8F0] bg-white">

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-14 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-10 border-b border-[#E2E8F0]">

        {/* Brand block */}
        <div className="space-y-4 md:pr-16">
          <Link
            href="/"
            className="font-mono text-[1rem] font-semibold text-[#0A2540] tracking-[-0.02em] hover:opacity-70 transition-opacity"
          >
            ZETTA<span className="text-[#0066FF]">[</span>SHIFT<span className="text-[#0066FF]">]</span>
          </Link>
          <p className="text-[0.8125rem] leading-[1.7] text-[#627D98] max-w-[22ch]">
            Core engine for digital multi-scalability.
          </p>
          <div className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.06em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
            <span className="text-[#00D4B2] uppercase">System Online</span>
          </div>
        </div>

        {/* Studios links */}
        <div>
          <p className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.08em] uppercase mb-5">Studios</p>
          <nav aria-label="Studios services navigation">
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/studios/${s.slug}`}
                    className="text-[0.8125rem] text-[#627D98] hover:text-[#0A2540] transition-colors duration-150"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Company links */}
        <div>
          <p className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.08em] uppercase mb-5">Company</p>
          <nav aria-label="Company navigation">
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.8125rem] text-[#627D98] hover:text-[#0A2540] transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.08em] uppercase mb-5">Contact</p>
          <ul className="space-y-3">
            <li className="text-[0.8125rem] text-[#627D98]">hello@zettashift.com</li>
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-[#0066FF] hover:text-[#004FCC] transition-colors group"
              >
                Start a project
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 4h8M5.5 1L9 4l-3.5 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.625rem] text-[#627D98] tracking-[0.02em]">
          &copy; {year} ZettaShift. All rights reserved.
        </p>
        <p className="font-mono text-[0.5625rem] text-[#627D98] tracking-[0.01em]">
          ZettaShift Studios is a client-services division of ZettaShift Corp.
        </p>
      </div>
    </footer>
  );
}
