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
  const directionRef = useRef(1); // 1 = forward (slide left), -1 = backward (slide right)

  if (entries.length === 0) {
    return <></>;
  }

  function handleDecadeClick(index: number): void {
    directionRef.current = index > activeIndex ? 1 : -1;
    setActiveIndex(index);
  }

  const activeEntry = entries[activeIndex];
  const slideOffset = 200;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: heading + description */}
        {(heading || description) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-16 lg:mb-20">
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
        )}

        {/* Decade navigation bar */}
        <FadeIn delay={0.3}>
          <div className="relative mb-10 lg:mb-12">
            <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
              {entries.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => handleDecadeClick(index)}
                  className="flex items-center shrink-0 group"
                >
                  {/* Decade label */}
                  <span
                    className={`text-sm sm:text-base transition-all duration-300 whitespace-nowrap ${
                      index === activeIndex
                        ? "text-neutral-900 font-bold text-base sm:text-lg"
                        : "text-neutral-400 font-normal hover:text-neutral-600"
                    }`}
                  >
                    {entry.decade}
                  </span>

                  {/* Connector line (not after the last item) */}
                  {index < entries.length - 1 && (
                    <span
                      className={`mx-3 sm:mx-5 w-12 sm:w-20 transition-all duration-300 ${
                        index === activeIndex
                          ? "h-0.5 bg-neutral-900"
                          : "h-px bg-neutral-300"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Content: image + text */}
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={activeEntry.id}
            custom={directionRef.current}
            initial={{ opacity: 0, x: directionRef.current * -slideOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: directionRef.current * slideOffset }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          >
            {/* Image */}
            <div className="max-w-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getStrapiMediaUrl(activeEntry.image)}
                alt={
                  activeEntry.image.alternativeText ?? activeEntry.title
                }
                className="w-full aspect-3/2 object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 font-serif">
                {activeEntry.title}
              </h3>
              <p className="text-base lg:text-lg text-neutral-500 leading-relaxed">
                {activeEntry.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
