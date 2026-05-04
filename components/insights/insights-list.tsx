"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Insight } from "@/lib/types/strapi";

const PAGE_SIZE = 5;

interface InsightsListProps {
  insights: Insight[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function InsightsList({
  insights,
}: InsightsListProps): React.ReactElement {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(insights.length / PAGE_SIZE);
  const paginated = insights.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      <div className="divide-y divide-neutral-200">
        {paginated.map((insight) => {
          const imageUrl = getStrapiMediaUrl(insight.image);
          return (
            <div key={insight.id} className="py-8 flex gap-6 items-start">
              {/* Image */}
              {imageUrl && (
                <div className="relative flex-none w-65 h-70 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={insight.image?.alternativeText ?? insight.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col my-auto gap-5 items-center justify-start">
                <div className="flex-1 min-w-0">
                  {/* Category + date */}
                  <div className="flex items-center gap-4 mb-3">
                    {insight.category && (
                      <span className="text-xs font-bold uppercase tracking-widest border border-neutral-300 px-3 py-1 text-neutral-600">
                        {insight.category}
                      </span>
                    )}
                    {insight.date && (
                      <span className="text-sm text-neutral-400">
                        {formatDate(insight.date)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl leading-relaxed font-black font-serif text-neutral-900 mb-2">
                    {insight.title}
                  </h3>

                  {/* Description */}
                  {insight.description && (
                    <p className="text-neutral-500 text-base leading-relaxed line-clamp-2">
                      {insight.description}
                    </p>
                  )}
                </div>

                {/* Arrow CTA */}
                <Link
                  href={`/insights/${insight.slug}`}
                  className="flex-none self-start w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-neutral-600 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`w-10 h-10 text-sm font-bold transition-colors ${
                n === page
                  ? "bg-primary text-neutral-900"
                  : "border border-neutral-300 text-neutral-600 hover:border-primary hover:text-primary"
              }`}>
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-neutral-600 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
