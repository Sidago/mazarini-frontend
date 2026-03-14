import React from "react";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface NewsSectionProps {
  data: RdPage;
}

export function NewsSection({ data }: NewsSectionProps): React.ReactElement {
  const articles = (data.featuredNews ?? []).slice(0, 2);

  return (
    <section
      id="news"
      className="relative w-screen h-screen flex-none bg-neutral-900 text-white overflow-hidden flex items-center"
    >
      {/* Watermark */}
      {data.newsWatermark && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            color: "rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
          }}
        >
          {data.newsWatermark}
        </span>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8">
              {data.newsTitle ?? "News"}
            </h2>
            {data.newsCtaUrl && (
              <Link
                href={data.newsCtaUrl}
                className="inline-block bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              >
                {data.newsCtaText ?? "View All"}
              </Link>
            )}
          </div>

          {/* Right: stacked news items */}
          <div className="flex flex-col gap-8">
            {articles.map((article) => {
              const url = getStrapiMediaUrl(article.image ?? null);
              return (
                <div key={article.id} className="flex gap-6 items-start">
                  {/* Image */}
                  <div className="flex-none w-44 h-28 overflow-hidden">
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {article.category && (
                      <span className="inline-block border border-white/40 text-white/70 text-xs font-bold uppercase tracking-widest px-2 py-0.5 mb-3">
                        {article.category}
                      </span>
                    )}
                    <h3 className="text-base font-bold leading-snug mb-4">{article.title}</h3>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                      aria-label="Read article"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8H13M13 8L8 3M13 8L8 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
