"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ConstructionPage } from "@/lib/types/strapi";

interface Props {
  data: ConstructionPage | null;
}

export function ConstructionInnovationSection({
  data,
}: Props): React.ReactElement {
  const items = data?.innovationItems ?? [];
  const title = data?.innovationTitle ?? null;
  const description = data?.innovationDescription ?? null;

  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);

  if (items.length === 0) return <></>;

  const active = items[Math.min(activeIndex, items.length - 1)];
  const imageUrl = getStrapiMediaUrl(active.image ?? null);

  function selectTab(index: number): void {
    directionRef.current = index > activeIndex ? 1 : -1;
    setActiveIndex(index);
  }

  return (
    <section className="bg-white text-black overflow-hidden py-20 lg:py-28">
      {/* Heading + description */}
      {(title || description) && (
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 text-center">
          {title && (
            <FadeIn direction="up" duration={0.7}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
                {title}
              </h2>
            </FadeIn>
          )}
          {description && (
            <FadeIn direction="up" delay={0.1} duration={0.7}>
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-neutral-600 max-w-2xl mx-auto">
                {description}
              </p>
            </FadeIn>
          )}
        </div>
      )}

      {/* Tab nav */}
      <div className="mb-12">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide px-6">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(index)}
              className="flex items-center shrink-0 group">
              <span
                className={`text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                  index === activeIndex
                    ? "text-neutral-900 font-bold"
                    : "text-neutral-400 font-normal hover:text-neutral-600"
                }`}>
                {item.tab}
              </span>
              {index < items.length - 1 && (
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

      {/* Active item — feature block (full-bleed, like the timeline) */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={active.id}
            custom={directionRef.current}
            initial={{ opacity: 0, x: directionRef.current * 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: directionRef.current * -120 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[45fr_55fr]">
            {/* Image — left, full bleed */}
            <div className="relative w-full h-64 sm:h-80 lg:h-[58vh] overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={active.title ?? active.tab}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
            </div>

            {/* Text — right */}
            <div className="flex flex-col justify-center items-start px-8 lg:px-16 py-12 lg:py-0 whitespace-pre-line">
              {active.title && (
                <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-6 font-serif leading-tight">
                  {active.title}
                </h3>
              )}
              {active.description && (
                <p className="text-base lg:text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl">
                  {active.description}
                </p>
              )}
              {active.ctaText && active.ctaUrl && (
                <Link
                  href={active.ctaUrl}
                  className="inline-block px-8 py-3 border border-black text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-black transition-colors">
                  {active.ctaText}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
