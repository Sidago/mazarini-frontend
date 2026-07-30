import type { Metadata } from "next";
import type { SeoComponent, StrapiMedia } from "@/lib/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api/client";

const SITE_NAME = "Mazarini Inc.";
const DEFAULT_DESCRIPTION =
  "Modern construction and real estate development company. Leading the way in sustainable commercial and residential development.";

// Build the final <title>, ensuring the site name appears at most once —
// even if the source title (from Strapi SEO or a fallback) already contains it.
// e.g. "Mazarini Inc. | Building America | Mazarini Inc." -> "Mazarini Inc. | Building America"
function composeTitle(base: string): string {
  const segments = base
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  const out: string[] = [];
  let hasSiteName = false;
  for (const seg of segments) {
    if (seg === SITE_NAME) {
      if (hasSiteName) continue; // drop duplicate site-name segments
      hasSiteName = true;
    }
    out.push(seg);
  }
  if (!hasSiteName) out.push(SITE_NAME); // append when missing (e.g. "Careers")
  return out.join(" | ");
}

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}: {
  seo?: SeoComponent | null;
  fallbackTitle?: string | null;
  fallbackDescription?: string | null;
  fallbackImage?: StrapiMedia | null;
}): Metadata {
  const baseTitle =
    seo?.metaTitle ?? fallbackTitle ?? `${SITE_NAME} | Building America`;
  const title = composeTitle(baseTitle);

  const description =
    seo?.metaDescription ?? fallbackDescription ?? DEFAULT_DESCRIPTION;

  const imageUrl =
    getStrapiMediaUrl(seo?.shareImage ?? fallbackImage ?? null) || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
