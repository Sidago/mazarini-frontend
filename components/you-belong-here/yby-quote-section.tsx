"use client";

import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyQuoteSection({ data }: Props): React.ReactElement {
  const authorImageUrl = getStrapiMediaUrl(data.quoteAuthorImage ?? null);

  return (
    <section
      id="quote"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-900 text-white">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 lg:px-16">
        <div
          className="text-[10rem] leading-none font-serif text-white/10 select-none -mb-15"
          aria-hidden="true">
          &ldquo;
        </div>

        {data.quoteText && (
          <blockquote className="text-sm lg:text-lg font-serif font-semibold leading-relaxed italic tracking-wider text-white mb-8">
            {data.quoteText}
          </blockquote>
        )}

        <div className="flex items-center gap-5">
          {authorImageUrl && (
            <div className="relative w-24 h-24 border-2 border-white/30 rounded-full overflow-hidden flex-none">
              <Image
                src={authorImageUrl}
                alt={data.quoteAuthorName ?? "Author"}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          )}
          <div>
            {data.quoteAuthorName && (
              <p className="font-bold text-white uppercase tracking-widest text-sm">
                {data.quoteAuthorName}
              </p>
            )}
            {data.quoteAuthorPosition && (
              <p className="text-white/50 text-sm mt-0.5">
                {data.quoteAuthorPosition}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
