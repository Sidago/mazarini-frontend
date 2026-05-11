import type { StrapiMedia } from "@/lib/types/strapi";

// Public URL for browser-facing assets (images, media)
const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://75.119.135.164:5001";

// How long Next.js holds Strapi responses in its Data Cache (seconds).
// Override per-call by passing a revalidate option if needed.
const DEFAULT_REVALIDATE = 300; // 5 minutes

export function getStrapiUrl(): string {
  return STRAPI_PUBLIC_URL;
}

export function getStrapiMediaUrl(media: StrapiMedia | null): string {
  if (!media) return "";
  const { url } = media;
  if (url?.startsWith("http")) return url;
  return `${STRAPI_PUBLIC_URL}${url}`;
}

export async function strapiGet<T>(
  path: string,
  params?: Record<string, string>,
  revalidate: number = DEFAULT_REVALIDATE,
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_PUBLIC_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
  }
  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
