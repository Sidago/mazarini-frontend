"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConstructionPage } from "@/lib/types/strapi";

interface Props {
  data: ConstructionPage | null;
}

export function ConstructionQuotesSection({ data }: Props): React.ReactElement {
  const quotes = data?.quotes ?? [];
  const [index, setIndex] = useState(0);

  if (quotes.length === 0) return <></>;

  const active = quotes[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + quotes.length) % quotes.length);
  };

  return (
    <section className="relative w-full bg-neutral-950 text-white overflow-hidden py-20 lg:py-32">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Big quote mark */}
        <div
          className="pointer-events-none text-[10rem] absolute left-0 top-0 lg:text-[14rem] leading-[0.6] font-serif text-primary/30 slect-none"
          aria-hidden="true">
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="-mt-8">
            {active.text && (
              <blockquote className="font-serif leading-relaxed  text-xl text-white mb-8 whitespace-pre-line">
                {active.text}
              </blockquote>
            )}

            <div>
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
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / next arrow buttons */}
        {quotes.length > 1 && (
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous quote"
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12l7 7M5 12l7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next quote"
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-400 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
