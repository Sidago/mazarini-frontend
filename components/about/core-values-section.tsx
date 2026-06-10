"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CoreValue, StrapiMedia } from "@/lib/types/strapi";

interface CoreValuesSectionProps {
  image: StrapiMedia | null;
  values: CoreValue[];
}

export function CoreValuesSection({
  image,
  values,
}: CoreValuesSectionProps): React.ReactElement | null {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!values.length) return null;

  // Pad to nearest multiple of 4 for a complete desktop grid
  const padded = [...values];
  while (padded.length % 4 !== 0) {
    padded.push({ id: -padded.length, title: "", description: null });
  }

  function handleCarouselScroll(): void {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.78;
    setActiveSlide(Math.round(el.scrollLeft / cardWidth));
  }

  const imageUrl = image ? getStrapiMediaUrl(image) : null;

  return (
    <section className="py-10 px-4 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-sm">

        {/* Background image */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1250px"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* ── Mobile carousel ── */}
        <div className="relative sm:hidden">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {values.map((value) => (
              <div
                key={value.id}
                className="snap-start shrink-0 w-[78vw] border-r border-white/15 px-7 py-12 flex flex-col justify-end min-h-[120vw]">
                <h3 className="text-lg font-semibold text-white font-serif leading-snug">
                  {value.title}
                </h3>
                {value.description && (
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 py-4">
            {values.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop grid ── */}
        <div className="relative hidden sm:grid sm:grid-cols-4 sm:grid-rows-2 h-[90vh]">
          {padded.map((value, i) => {
            if (!value.title) {
              return <div key={`empty-${i}`} className="border border-white/15" />;
            }

            const isHovered = hovered === i;

            return (
              <motion.div
                key={value.id}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative border border-white/15 px-10 py-14 flex flex-col justify-end overflow-hidden cursor-default">

                <motion.div
                  className="absolute inset-0 bg-black/35"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <h3 className=" font-semibold text-white font-serif leading-snug">
                    {value.title}
                  </h3>

                  <AnimatePresence>
                    {isHovered && value.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.22 }}
                        className="mt-3 text-sm text-white/75 leading-relaxed">
                        {value.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
