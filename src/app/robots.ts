import type { MetadataRoute } from "next";

const SITE_URL = "https://www.zettashift.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        // Allow Google's various crawlers explicitly
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-Video"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
