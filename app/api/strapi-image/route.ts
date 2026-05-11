import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";

// Next.js default device sizes — only allow these to prevent abuse
const ALLOWED_WIDTHS = new Set([
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
]);

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.searchParams.get("url");
  const w = parseInt(req.nextUrl.searchParams.get("w") ?? "828", 10);
  const q = Math.min(
    100,
    Math.max(1, parseInt(req.nextUrl.searchParams.get("q") ?? "75", 10)),
  );

  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Resolve relative paths against Strapi base URL
  const imageUrl = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;

  // Only allow images from our own Strapi instance
  if (!imageUrl.startsWith(STRAPI_URL)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const width = ALLOWED_WIDTHS.has(w) ? w : 828;

  try {
    const upstream = await fetch(imageUrl);
    if (!upstream.ok) {
      return new NextResponse("Upstream error", { status: 502 });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());

    // Check Accept header — prefer AVIF, fall back to WebP
    const accept = req.headers.get("accept") ?? "";
    const useAvif = accept.includes("image/avif");

    const optimized = useAvif
      ? await sharp(buffer)
          .resize(width, undefined, { withoutEnlargement: true })
          .avif({ quality: q })
          .toBuffer()
      : await sharp(buffer)
          .resize(width, undefined, { withoutEnlargement: true })
          .webp({ quality: q })
          .toBuffer();

    return new NextResponse(optimized, {
      headers: {
        "Content-Type": useAvif ? "image/avif" : "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        Vary: "Accept",
      },
    });
  } catch {
    return new NextResponse("Image processing failed", { status: 500 });
  }
}
