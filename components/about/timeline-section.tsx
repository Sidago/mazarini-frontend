"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { TimelineEntry } from "@/lib/types/strapi";

interface TimelineSectionProps {
  heading: string | null;
  description: string | null;
  entries: TimelineEntry[];
}

export function TimelineSection({
  heading,
  description,
  entries,
}: TimelineSectionProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);

  if (entries.length === 0) return <></>;

  function handleDecadeClick(index: number): void {
    directionRef.current = index > activeIndex ? 1 : -1;
    setActiveIndex(index);
  }

  const activeEntry = entries[activeIndex];

  return (
    <section className="bg-white overflow-hidden py-10">
      {/* Heading + description */}
      {(heading || description) && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {heading && (
              <FadeIn direction="left" duration={0.7}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight font-serif">
                  {heading}
                </h2>
              </FadeIn>
            )}
            {description && (
              <FadeIn direction="right" delay={0.2} duration={0.7}>
                <p className="text-base lg:text-lg text-neutral-500 leading-relaxed lg:pt-4">
                  {description}
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      )}

      {/* Timeline nav — full width */}
      <div className="py-5">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide px-6 py-5">
          {entries.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => handleDecadeClick(index)}
              className="flex items-center shrink-0 group">
              <span
                className={`text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                  index === activeIndex
                    ? "text-neutral-900 font-bold text-base sm:text-lg"
                    : "text-neutral-400 font-normal hover:text-neutral-600"
                }`}>
                {entry.decade}
              </span>

              {index < entries.length - 1 && (
                <span
                  className={`mx-3 sm:mx-5 flex-none transition-all duration-300 ${
                    index === activeIndex
                      ? "w-12 sm:w-20 h-0.5 bg-neutral-900"
                      : "w-12 sm:w-20 h-px bg-neutral-300"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel — full bleed */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={activeEntry.id}
            custom={directionRef.current}
            initial={{ opacity: 0, x: directionRef.current * 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: directionRef.current * -120 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">

            {/* Image — left, full bleed */}
            <div className="w-[90%] h-72 sm:h-96 lg:h-[65vh] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getStrapiMediaUrl(activeEntry.image)}
                alt={activeEntry.image?.alternativeText ?? activeEntry.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text — right */}
            <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-0">
              <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-6 font-serif leading-tight">
                {activeEntry.title}
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed mb-8 max-w-md">
                {activeEntry.description}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-900 hover:text-primary transition-colors duration-300 group w-fit">
                Learn More
                <span className="text-primary group-hover:translate-x-1 transition-transform duration-300">
                  &#9658;
                </span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
