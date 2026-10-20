"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Tiny client wrapper that activates scroll-reveal.
 * Rendered inside the Server Component page tree — zero HTML output.
 */
export default function ScrollRevealProvider() {
  useScrollReveal();
  return null;
}
