import type { Metadata } from "next";
import type { SeoComponent, StrapiMedia } from "@/lib/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api/client";

const SITE_NAME = "Mazarini Inc.";
const DEFAULT_DESCRIPTION =
  "Modern construction and real estate development company. Leading the way in sustainable commercial and residential development.";

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
  const title = seo?.metaTitle
    ? `${seo.metaTitle} | ${SITE_NAME}`
    : fallbackTitle
      ? `${fallbackTitle} | ${SITE_NAME}`
      : `${SITE_NAME} | Building America`;

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
