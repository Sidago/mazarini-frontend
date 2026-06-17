"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const firstName = active.authorName?.trim().split(/\s+/)[0] ?? null;

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + quotes.length) % quotes.length);
  };

  return (
    <section className="relative w-full bg-black overflow-hidden py-20 lg:py-0 lg:min-h-screen flex items-center">
      {/* Nav arrows — edges, vertically centered */}
      {quotes.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous quote"
            onClick={() => go(-1)}
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next quote"
            onClick={() => go(1)}
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-16 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — quote + author */}
            <div className="relative flex flex-col justify-center lg:py-24">
              <div
                className="pointer-events-none absolute -top-8 -left-6 lg:-top-12 lg:-left-10 text-[12rem] lg:text-[16rem] leading-[0.6] font-serif text-primary/15 select-none z-0"
                aria-hidden="true">
                &ldquo;
              </div>

              {active.text && (
                <blockquote className="relative z-10 font-serif font-semibold leading-snug text-white mb-8">
                  {active.text}
                </blockquote>
              )}

              <div className="relative z-10">
                {active.authorName && (
                  <p className="font-bold text-white uppercase tracking-widest text-sm">
                    {active.authorName}
                  </p>
                )}
                {active.authorPosition && (
                  <p className="text-white/60 text-sm mt-1">
                    {active.authorPosition}
                  </p>
                )}
                {active.contactUrl && firstName && (
                  <Link
                    href={active.contactUrl}
                    className="inline-flex items-center gap-2 mt-4 text-primary text-sm font-bold uppercase tracking-widest hover:text-amber-400 transition-colors">
                    Contact {firstName}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Right — portrait */}
            {authorImageUrl && (
              <div className="relative h-104 lg:h-168 flex items-center justify-center">
                <Image
                  src={authorImageUrl}
                  alt={active.authorName ?? "Author"}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
