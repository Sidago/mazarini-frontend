export default function strapiImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: (quality ?? 75).toString(),
  });
  return `/api/strapi-image?${params}`;
}
