"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import type { SubcontractorQuote } from "@/lib/types/strapi";

interface QuoteCarouselProps {
  quotes: SubcontractorQuote[];
}

export function QuoteCarousel({
  quotes,
}: QuoteCarouselProps): React.ReactElement {
  const [current, setCurrent] = useState(0);

  if (quotes.length === 0) return <></>;

  function prev(): void {
    setCurrent((c) => (c === 0 ? quotes.length - 1 : c - 1));
  }

  function next(): void {
    setCurrent((c) => (c === quotes.length - 1 ? 0 : c + 1));
  }

  const quote = quotes[current];

  return (
    <section className="relative bg-neutral-950 py-24 overflow-hidden">
      {/* Background images faded */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 min-h-[65vh] max-w-4xl mx-auto px-6 sm:px-8 flex items-center">
        {/* Left arrow */}
        <motion.button
          type="button"
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center mr-8 hover:bg-amber-400 transition-colors"
        >
          <Icon name="arrow_back" className="text-xl" />
        </motion.button>

        {/* Quote content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote mark */}
              <span className="text-primary text-8xl font-serif leading-none block -mb-8 opacity-60">
                &ldquo;
              </span>

              <p className="text-white text-xl sm:text-2xl font-bold leading-relaxed">
                {quote.quote}
              </p>

              <div className="mt-8">
                <p className="text-white font-bold uppercase tracking-wider text-sm">
                  {quote.authorName}
                </p>
                {(quote.company || quote.designation) && (
                  <p className="text-neutral-400 text-sm mt-1">
                    {quote.company}
                    {quote.company && quote.designation && ", "}
                    {quote.designation}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <motion.button
          type="button"
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center ml-8 hover:bg-amber-400 transition-colors"
        >
          <Icon name="arrow_forward" className="text-xl" />
        </motion.button>
      </div>
    </section>
  );
}
