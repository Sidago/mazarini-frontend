import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { News } from "@/lib/types/strapi";

interface NewsCardProps {
  news: News;
  reversed?: boolean;
}

export function NewsCard({
  news,
  reversed = false,
}: NewsCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(news.image ?? null);

  return (
    <div
      className={`flex flex-col ${reversed ? "sm:flex-row-reverse" : "sm:flex-row"} gap-6 sm:gap-8`}>
      {/* Image */}
      {imageUrl && (
        <div className="w-full sm:w-[280px] md:w-[320px] shrink-0 aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={news.image?.alternativeText ?? news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-center">
        {news.category && (
          <span className="inline-block w-fit px-3 py-1 mb-3 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider">
            {news.category}
          </span>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight mb-3">
          {news.title}
        </h3>
        {news.description && (
          <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">
            {news.description}
          </p>
        )}
        <Link
          href={`/news/${news.slug}`}
          className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
          aria-label={`Read ${news.title}`}>
          &rarr;
        </Link>
      </div>
    </div>
  );
}
