import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

// Next.js default device sizes — only allow these to prevent abuse
const ALLOWED_WIDTHS = new Set([
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
]);

// In-memory cache of already-optimized images. Persists for the life of the
// server process, so a given (url + width + quality) is fetched from Strapi and
// re-encoded only ONCE — every later request is served instantly from memory.
const CACHE = new Map<string, Uint8Array>();
const MAX_ENTRIES = 400;

function cacheSet(key: string, value: Uint8Array): void {
  // Bound memory: drop the oldest entry when full (Map keeps insertion order).
  if (CACHE.size >= MAX_ENTRIES) {
    const oldest = CACHE.keys().next().value;
    if (oldest !== undefined) CACHE.delete(oldest);
  }
  CACHE.set(key, value);
}

const RESPONSE_HEADERS = {
  "Content-Type": "image/webp",
  "Cache-Control": "public, max-age=31536000, immutable",
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.searchParams.get("url");
  const wRaw = parseInt(req.nextUrl.searchParams.get("w") ?? "828", 10);
  const q = Math.min(
    100,
    Math.max(1, parseInt(req.nextUrl.searchParams.get("q") ?? "72", 10)),
  );

  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Resolve relative paths against Strapi base URL
  const imageUrl = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;

  // Only allow images from our own Strapi instance
  if (!imageUrl.startsWith(STRAPI_URL)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const width = ALLOWED_WIDTHS.has(wRaw) ? wRaw : 828;
  const cacheKey = `${imageUrl}|${width}|${q}`;

  const cached = CACHE.get(cacheKey);
  if (cached) {
    return new NextResponse(cached, { headers: RESPONSE_HEADERS });
  }

  try {
    // Cache the original download in Next's data cache for a day so repeated
    // cold-cache encodes don't re-hit the remote Strapi.
    const upstream = await fetch(imageUrl, { next: { revalidate: 86400 } });
    if (!upstream.ok) {
      return new NextResponse("Upstream error", { status: 502 });
    }

    const input = Buffer.from(await upstream.arrayBuffer());

    // WebP only. AVIF encoding was ~10x slower and the main cause of slow
    // images; WebP is fast to encode and supported by all modern browsers.
    const optimized = new Uint8Array(
      await sharp(input)
        .rotate()
        .resize(width, undefined, { withoutEnlargement: true })
        .webp({ quality: q, effort: 4 })
        .toBuffer(),
    );

    cacheSet(cacheKey, optimized);
    return new NextResponse(optimized, { headers: RESPONSE_HEADERS });
  } catch {
    return new NextResponse("Image processing failed", { status: 500 });
  }
}
