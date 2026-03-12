import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Service } from "@/lib/types/strapi";

interface ServiceFilterCardProps {
  service: Service;
}

function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export function ServiceFilterCard({
  service,
}: ServiceFilterCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(service.image ?? null);

  return (
    <Link
      href={`/services/${service.id}`}
      className="group block px-2"
    >
      <div className="relative w-[90%] aspect-[10/10.5] overflow-hidden rounded-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={service.image?.alternativeText ?? service.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
          {service.title}
        </h3>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          {truncateWords(service.discriptions, 6)}
        </p>
      </div>
    </Link>
  );
}
