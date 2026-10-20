import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ── FONTS (next/font — zero layout shift, self-hosted) ─────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

/* ── CANONICAL ORIGIN ────────────────────────────────────────────────────── */
const SITE_URL = "https://www.zettashift.com";
const SITE_NAME = "ZettaShift";
const DEFAULT_TITLE = "ZettaShift — Core Engine for Digital Multi-Scalability";
const DEFAULT_DESCRIPTION =
  "ZettaShift designs and deploys next-generation digital frameworks, scalable computing models, and autonomous technology architectures built for enterprise operational velocity.";

/* ── NEXT.JS METADATA API (replaces <Head> — fully SSR'd for crawlers) ──── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  /* ── Open Graph ──────────────────────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ZettaShift — Core Engine for Digital Multi-Scalability",
      },
    ],
  },

  /* ── Twitter / X Card ────────────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: "@zettashift",
    creator: "@zettashift",
    images: [`${SITE_URL}/og-image.png`],
  },

  /* ── Canonical & Robots ──────────────────────────────────────────────── */
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Icons ───────────────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  /* ── Verification ────────────────────────────────────────────────────── */
  verification: {
    google: "YOUR_GSC_VERIFICATION_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
    // bing:   "YOUR_BING_TOKEN",
  },

  /* ── App metadata ────────────────────────────────────────────────────── */
  applicationName: SITE_NAME,
  keywords: [
    "ZettaShift",
    "ZettaShift Studios",
    "AI Agents",
    "LLM Workflows",
    "Web Architecture",
    "Programmatic SEO",
    "Digital Infrastructure",
    "Cognitive Automation",
    "Enterprise Technology",
    "Next.js Agency",
    "Autonomous AI Systems",
    "Scalable Web Applications",
  ],
  authors: [{ name: "ZettaShift", url: SITE_URL }],
  creator: "ZettaShift",
  publisher: "ZettaShift",
  category: "Technology",
};

/* ── VIEWPORT (separate export per Next.js 14+ spec) ────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0066FF",
};

/* ── JSON-LD STRUCTURED DATA ─────────────────────────────────────────────── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 400,
    height: 120,
  },
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/zettashift",
    "https://linkedin.com/company/zettashift",
    "https://github.com/zettashift",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ZettaShift Studios Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Autonomous AI Agents",
          description:
            "Engineering custom LLM workflows, secure data routing protocols, and multi-agent cognitive systems that execute complex manual backend processes at scale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Architecture",
          description:
            "Deploying high-tier, production-ready, hyper-optimized web apps, complex API structures, and fluid user experiences built on modern frontend engines.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Programmatic SEO",
          description:
            "Designing high-volume algorithmic keyword indexing strategies, architectural speed tuning, and data-driven visibility platforms that scale search authority.",
        },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ── ROOT LAYOUT ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD — inline in <head> for immediate crawler parsing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {/* Preconnect to Google Fonts (already handled by next/font but belt-and-suspenders) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
