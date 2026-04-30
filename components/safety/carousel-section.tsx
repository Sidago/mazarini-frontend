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

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row min-h-120">

          {/* Mobile — image with text overlay */}
          <div className="relative lg:hidden w-full h-120 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={active.image?.alternativeText ?? active.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold font-serif text-white mb-3">
                {active.title}
              </h3>
              {active.description && (
                <p className="text-white/80 leading-relaxed text-sm">
                  {active.description}
                </p>
              )}
            </div>
          </div>

          {/* Desktop — image left, text right */}
          <div className="hidden lg:block relative w-[55%] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={active.image?.alternativeText ?? active.title}
                fill
                className="object-cover"
                sizes="55vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
            )}
          </div>

          <div className="hidden lg:flex w-[45%] items-center px-16 bg-white dark:bg-neutral-950">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-neutral-900 dark:text-white mb-4">
                {active.title}
              </h3>
              {active.description && (
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {active.description}
                </p>
              )}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </section>
  );
}
