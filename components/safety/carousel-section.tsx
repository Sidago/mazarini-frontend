"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CultureCard } from "@/lib/types/strapi";

interface CarouselSectionProps {
  title: string;
  description: string;
  cards: CultureCard[];
}

export function CarouselSection({
  title,
  description,
  cards,
}: CarouselSectionProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  if (cards.length === 0) return <></>;

  const active = cards[activeIndex];
  const imageUrl = getStrapiMediaUrl(active.image);

  return (
    <section className="bg-white dark:bg-neutral-950 py-30">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-6 py-20 pb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-neutral-900 dark:text-white leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex items-end justify-center gap-0 py-10 px-6 overflow-x-auto scrollbar-hide">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 px-6 pb-3 text-sm font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
              }`}>
              {card.title}
              {isActive && (
                <motion.div
                  layoutId="safety-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content — image left, text right */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Image */}
        <div className="relative w-full lg:w-[55%] h-72 lg:h-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={active.image?.alternativeText ?? active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text */}
        <div className="w-full lg:w-[45%] flex items-center px-10 lg:px-16 py-12 lg:py-0 bg-white dark:bg-neutral-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-neutral-900 dark:text-white mb-4">
                {active.title}
              </h3>
              {active.description && (
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {active.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
