import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { News } from "@/lib/types/strapi";

interface NewsFilterCardProps {
  news: News;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsFilterCard({
  news,
}: NewsFilterCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(news.image ?? null);

  return (
    <Link
      href={`/news/${news.slug}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <div className="relative w-full aspect-[4/3]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news.image?.alternativeText ?? news.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-500 group-hover:from-black/90" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {news.category && (
            <span className="inline-block w-fit px-3 py-1 mb-3 border border-white/30 rounded text-[11px] font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
              {news.category}
            </span>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {news.title}
          </h3>
          {news.publishedDate && (
            <p className="mt-2 text-xs font-medium text-white/60">
              {formatDate(news.publishedDate)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
