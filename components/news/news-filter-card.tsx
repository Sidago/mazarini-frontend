import Link from "next/link";
import Image from "next/image";
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
      <div className="relative w-[90%] aspect-[10/10.5] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={news.image?.alternativeText ?? news.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 30vw, 22vw"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800 rounded-lg" />
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white leading-tight">
          {news.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {news.description ? truncateWords(news.description, 6) : ""}
        </p>
      </div>
    </Link>
  );
}
