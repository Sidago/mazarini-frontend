"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CareerPage } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

export function CareerQuotesSection({ data }: Props): React.ReactElement {
  const quotes = data?.quotes ?? [];
  const [index, setIndex] = useState(0);

  if (quotes.length === 0) return <></>;

  const active = quotes[index];
  const authorImageUrl = getStrapiMediaUrl(active.authorImage ?? null);

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + quotes.length) % quotes.length);
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        {data?.quotesTitle && (
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-neutral-900 mb-10 text-center">
            {data.quotesTitle}
          </h2>
        )}

        <div className="relative">
          <div
            className="text-[10rem] leading-none font-serif text-neutral-100 select-none -mb-16"
            aria-hidden="true">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative">
              {authorImageUrl && (
                <div className="float-right ml-8 mb-4">
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-neutral-200">
                    <Image
                      src={authorImageUrl}
                      alt={active.authorName ?? "Author"}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </div>
              )}

              <blockquote className="text-lg lg:text-2xl font-serif font-semibold leading-relaxed italic tracking-wide text-neutral-800 mb-8">
                {active.text}
              </blockquote>

              <div className="clear-both">
                {active.authorName && (
                  <p className="font-bold text-neutral-900 uppercase tracking-widest text-sm">
                    {active.authorName}
                  </p>
                )}
                {active.authorPosition && (
                  <p className="text-neutral-500 text-sm mt-0.5">
                    {active.authorPosition}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {quotes.length > 1 && (
          <div className="flex items-center gap-3 mt-12">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => go(-1)}
              className="w-11 h-11 flex items-center justify-center border border-neutral-300 text-neutral-700 hover:bg-primary hover:border-primary hover:text-neutral-900 transition-colors cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12l7 7M5 12l7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => go(1)}
              className="w-11 h-11 flex items-center justify-center border border-neutral-300 text-neutral-700 hover:bg-primary hover:border-primary hover:text-neutral-900 transition-colors cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <span className="ml-3 text-sm text-neutral-400 font-medium tabular-nums">
              {index + 1} / {quotes.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
