import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { News } from "@/lib/types/strapi";

interface NewsFilterCardProps {
  news: News;
}

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export function NewsFilterCard({
  news,
}: NewsFilterCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(news.image ?? null);

  return (
    <Link
      href={`/news/${news.slug}`}
      className="group block px-2"
    >
      <div className="relative w-[90%] aspect-[10/10.5] overflow-hidden rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={news.image?.alternativeText ?? news.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800 rounded-lg" />
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
          {news.title}
        </h3>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          {news.description ? truncateWords(news.description, 6) : ""}
        </p>
      </div>
    </Link>
  );
}
