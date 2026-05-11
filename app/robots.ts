import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mazarini.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Block known AI training crawlers (replaces non-standard Content-Signal header)
      {
        userAgent: [
          "GPTBot",         // OpenAI
          "Google-Extended", // Google AI training
          "anthropic-ai",   // Anthropic
          "CCBot",          // Common Crawl
          "Bytespider",     // ByteDance
          "Amazonbot",      // Amazon
          "Applebot-Extended", // Apple AI
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
