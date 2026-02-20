import type { StrapiMedia } from "@/lib/types/strapi";

// Server-only URL for SSR API calls (can use Docker-internal hostnames)
const STRAPI_INTERNAL_URL =
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

// Public URL for browser-facing assets (images, media)
const STRAPI_PUBLIC_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

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
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_INTERNAL_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
