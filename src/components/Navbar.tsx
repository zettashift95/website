"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES } from "@/lib/services";

const NAV_LINKS = [
  { label: "Ecosystem Hub", href: "/" },
  { label: "ZettaShift Studios", href: "/studios", hasDropdown: true },
  { label: "Technical Stack", href: "/technical-stack" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [studiosOpen, setStudiosOpen]   = useState(false);
  const [mobileStudios, setMobileStudios] = useState(false);
  const dropdownRef                     = useRef<HTMLDivElement>(null);
  const pathname                        = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStudiosOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setStudiosOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 h-16 nav-glass border-b border-[#E2E8F0]
          flex items-center justify-between px-6 md:px-10
          transition-all duration-300 ${scrolled ? "shadow-[0_4px_32px_rgba(10,37,64,0.07)]" : ""}`}
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="ZettaShift Home"
          className="font-mono text-[1rem] font-semibold text-[#0A2540] tracking-[-0.02em] select-none shrink-0 hover:opacity-80 transition-opacity duration-200"
        >
          ZETTA<span className="text-[#0066FF]">[</span>SHIFT<span className="text-[#0066FF]">]</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setStudiosOpen((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[0.8125rem] font-medium tracking-[-0.01em]
                    transition-all duration-200 rounded-sm
                    ${isActive(link.href) ? "text-[#0066FF] font-semibold" : "text-[#627D98] hover:text-[#0A2540]"}`}
                  aria-expanded={studiosOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    width="10" height="6" viewBox="0 0 10 6" fill="none"
                    className={`transition-transform duration-200 ${studiosOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {studiosOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white border border-[#E2E8F0] shadow-[0_16px_48px_rgba(10,37,64,0.10)] z-50 animate-[fadeDown_200ms_ease]">
                    {/* Dropdown header */}
                    <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[0.625rem] text-[#0066FF] tracking-[0.1em] uppercase mb-0.5">Division 01</p>
                        <p className="text-sm font-bold text-[#0A2540] tracking-tight">ZettaShift Studios</p>
                      </div>
                      <Link
                        href="/studios"
                        onClick={() => setStudiosOpen(false)}
                        className="font-mono text-[0.6875rem] text-[#0066FF] hover:text-[#004FCC] transition-colors"
                      >
                        View all services →
                      </Link>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-2 p-3 gap-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/studios/${s.slug}`}
                          onClick={() => setStudiosOpen(false)}
                          className="group flex items-start gap-3 p-3 hover:bg-[#F3F4F6] transition-colors duration-150 rounded-sm"
                        >
                          <ServiceIcon slug={s.slug} />
                          <div className="min-w-0">
                            <p className="text-[0.8125rem] font-semibold text-[#0A2540] group-hover:text-[#0066FF] transition-colors leading-snug">
                              {s.title}
                            </p>
                            <p className="text-[0.75rem] text-[#627D98] leading-snug mt-0.5 line-clamp-2">
                              {s.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[0.8125rem] font-medium tracking-[-0.01em]
                  transition-all duration-200 rounded-sm
                  ${isActive(link.href) ? "text-[#0066FF] font-semibold" : "text-[#627D98] hover:text-[#0A2540]"}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium tracking-[0.01em]
            text-white bg-[#0066FF] px-5 py-2.5 shrink-0
            transition-all duration-200 hover:bg-[#004FCC]"
        >
          Start a Project
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-[22px] h-[1.5px] bg-[#0A2540] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-[#0A2540] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-[22px] h-[1.5px] bg-[#0A2540] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 pt-16 nav-glass flex flex-col
          transition-all duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col overflow-y-auto border-t border-[#E2E8F0]">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobileStudios((v) => !v)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-[#0A2540] border-b border-[#E2E8F0] hover:bg-[#F3F4F6] transition-colors"
                >
                  {link.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${mobileStudios ? "rotate-180" : ""}`}>
                    <path d="M1 1l4 4 4-4" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {mobileStudios && (
                  <div className="bg-[#F3F4F6]">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/studios/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-8 py-3 text-sm text-[#627D98] hover:text-[#0066FF] border-b border-[#E2E8F0] transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#0066FF] shrink-0" />
                        {s.title}
                      </Link>
                    ))}
                    <Link
                      href="/studios"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-8 py-3 text-sm font-semibold text-[#0066FF] border-b border-[#E2E8F0]"
                    >
                      View all services
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 text-sm font-medium border-b border-[#E2E8F0] transition-colors hover:bg-[#F3F4F6]
                  ${isActive(link.href) ? "text-[#0066FF]" : "text-[#0A2540]"}`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mx-6 mt-6 font-mono text-[0.8125rem] font-semibold text-white bg-[#0066FF] px-5 py-3.5 text-center hover:bg-[#004FCC] transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0)   translateX(-50%); }
        }
      `}</style>
    </>
  );
}

function ServiceIcon({ slug }: { slug: string }) {
  const icons: Record<string, React.ReactNode> = {
    "website-development": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <rect x="2" y="3" width="16" height="12" rx="1" stroke="#0066FF" strokeWidth="1.25"/>
        <path d="M2 7h16M7 17h6" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    "digital-marketing": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="5" r="2" stroke="#0066FF" strokeWidth="1.25"/>
      </svg>
    ),
    "social-media-management": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <circle cx="10" cy="10" r="7" stroke="#00D4B2" strokeWidth="1.25"/>
        <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3" stroke="#00D4B2" strokeWidth="1.25"/>
        <circle cx="10" cy="10" r="1.5" fill="#00D4B2"/>
      </svg>
    ),
    "automations": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <path d="M10 4v3M10 13v3M4 10H7M13 10h3M6.22 6.22l2.12 2.12M11.66 11.66l2.12 2.12M6.22 13.78l2.12-2.12M11.66 8.34l2.12-2.12" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2" stroke="#0066FF" strokeWidth="1.25"/>
      </svg>
    ),
    "ai-marketing": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <path d="M5 10c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5" stroke="#00D4B2" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M10 8v2l1.5 1.5" stroke="#00D4B2" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="1" fill="#00D4B2"/>
      </svg>
    ),
    "ai-consulting": (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
        <path d="M4 14s0-4 6-4 6 4 6 4" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round"/>
        <circle cx="10" cy="6" r="3" stroke="#0066FF" strokeWidth="1.25"/>
        <path d="M16 8l2 2-2 2" stroke="#0066FF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return <>{icons[slug] ?? <span className="w-5 h-5 shrink-0" />}</>;
}
