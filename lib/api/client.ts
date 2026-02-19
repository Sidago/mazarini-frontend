import type { StrapiMedia } from "@/lib/types/strapi";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function getStrapiUrl(): string {
  return API_BASE_URL;
}

export function getStrapiMediaUrl(media: StrapiMedia | null): string {
  if (!media) return "";
  const { url } = media;
  if (url?.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
}

export async function strapiGet<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`/api${path}`, API_BASE_URL);
  console.log('url', url);
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
