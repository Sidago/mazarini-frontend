"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { Icon } from "@/components/ui/icon";
import type { Testimonial } from "@/lib/types/strapi";

interface ServiceTestimonialSectionProps {
  testimonials: Testimonial[];
}

export function ServiceTestimonialSection({
  testimonials,
}: ServiceTestimonialSectionProps): React.ReactElement | null {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!testimonials.length) return null;

  const current = testimonials[index];
  const imageUrl = getStrapiMediaUrl(current.image ?? null);
  const hasMultiple = testimonials.length > 1;

  function go(next: number): void {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  function prev(): void {
    go(index === 0 ? testimonials.length - 1 : index - 1);
  }

  function next(): void {
    go(index === testimonials.length - 1 ? 0 : index + 1);
  }

  return (
    <section className="relative py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6 mb-8">
          <h2 className="font-serif text-2xl font-black text-neutral-900 dark:text-white leading-tight">
            Our Clients Say
          </h2>
        </div>
        <MobileCarousel
          testimonials={testimonials}
          index={index}
          hasMultiple={hasMultiple}
          go={go}
          prev={prev}
          next={next}
        />
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-stretch gap-0">

          {/* Prev button */}
          {hasMultiple ? (
            <button
              type="button"
              onClick={prev}
              className="flex shrink-0 self-center mr-4 w-11 h-11 rounded-full bg-primary text-white items-center justify-center hover:bg-primary/80 transition-all"
            >
              <Icon name="arrow_back" className="text-base" />
            </button>
          ) : (
            <div className="shrink-0 w-11 mr-4" />
          )}

          {/* Left — text */}
          <div className="flex-1 flex flex-col justify-center pr-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 30 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -30 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col"
              >
                <h2 className="font-serif text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-4">
                  Our Clients Say
                </h2>
                <span className="font-serif text-[5rem] text-neutral-200 dark:text-neutral-700 leading-none -mb-4 select-none">
                  &ldquo;
                </span>
                <p className="font-serif text-sm md:text-base font-bold italic text-[#1a2744] dark:text-neutral-200 leading-snug mb-4">
                  {current.quote}
                </p>
                <div>
                  <p className="font-serif text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-white">
                    {current.client_name}
                  </p>
                  {(current.designation || current.company) && (
                    <p className="font-serif text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {current.designation}
                      {current.designation && current.company && ", "}
                      {current.company}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — image */}
          <div className="w-[52%] relative min-h-105 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 30 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -30 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={current.client_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          {hasMultiple ? (
            <button
              type="button"
              onClick={next}
              className="flex shrink-0 self-center ml-4 w-11 h-11 rounded-full bg-primary text-white items-center justify-center hover:bg-primary/80 transition-all"
            >
              <Icon name="arrow_forward" className="text-base" />
            </button>
          ) : (
            <div className="shrink-0 w-11 ml-4" />
          )}

        </div>
      </div>
    </section>
  );
}

interface MobileCarouselProps {
  testimonials: Testimonial[];
  index: number;
  hasMultiple: boolean;
  go: (i: number) => void;
  prev: () => void;
  next: () => void;
}

function MobileCarousel({
  testimonials,
  index,
  hasMultiple,
  go,
}: MobileCarouselProps): React.ReactElement {
  const dragStartX = useRef(0);

  const CARD_WIDTH = "calc(100vw - 2rem)";
  const GAP = 16;

  function handleDragStart(_: unknown, info: { point: { x: number } }): void {
    dragStartX.current = info.point.x;
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number } }): void {
    const threshold = 50;
    if (info.offset.x < -threshold && index < testimonials.length - 1) {
      go(index + 1);
    } else if (info.offset.x > threshold && index > 0) {
      go(index - 1);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden px-4">
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: `calc(-${index} * (${CARD_WIDTH} + ${GAP}px))` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((t) => {
            const imgUrl = getStrapiMediaUrl(t.image ?? null);
            return (
              <div key={t.id} className="shrink-0 flex flex-col" style={{ width: CARD_WIDTH }}>
                {/* Image */}
                <div className="relative w-full h-[60vh] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={t.client_name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
                  )}
                </div>

                {/* Text below image */}
                <div className="pt-4">
                  <span className="font-serif text-[3.5rem] text-neutral-200 dark:text-neutral-700 leading-none -mb-2 select-none block">
                    &ldquo;
                  </span>
                  <p className="font-serif text-sm font-bold italic text-[#1a2744] dark:text-neutral-200 leading-snug mb-3">
                    {t.quote}
                  </p>
                  <p className="font-serif text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-white">
                    {t.client_name}
                  </p>
                  {(t.designation || t.company) && (
                    <p className="font-serif text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {t.designation}
                      {t.designation && t.company && ", "}
                      {t.company}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-neutral-900 dark:bg-white"
                  : "w-1.5 bg-neutral-300 dark:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
