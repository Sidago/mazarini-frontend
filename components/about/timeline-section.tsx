"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { TimelineEntry, TimelineMilestone } from "@/lib/types/strapi";

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
  const [modalEntry, setModalEntry] = useState<TimelineEntry | null>(null);

  useEffect(() => {
    if (!modalEntry) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [modalEntry]);

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
            <div className="relative w-[90%] h-72 sm:h-96 lg:h-[65vh] overflow-hidden">
              <Image
                src={getStrapiMediaUrl(activeEntry.image)}
                alt={activeEntry.image?.alternativeText ?? activeEntry.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 55vw"
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
                onClick={() => setModalEntry(activeEntry)}
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

      {/* Modal */}
      <AnimatePresence>
        {modalEntry && (
          <MilestonesModal
            entry={modalEntry}
            onClose={() => setModalEntry(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function MilestonesModal({
  entry,
  onClose,
}: {
  entry: TimelineEntry;
  onClose: () => void;
}): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const milestones = entry.milestones?.length ? entry.milestones : null;

  function handleScroll(): void {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-200 flex items-end sm:items-center justify-center bg-black/70">
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-neutral-950 w-full max-w-6xl mx-4 mb-4 sm:mb-0 rounded-sm overflow-hidden">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-6 z-10 text-white/50 hover:text-white text-xl transition-colors leading-none">
          ✕
        </button>

        {/* Decade header */}
        <div className="px-10 pt-10 pb-6 border-b border-white/10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
            {entry.decade}
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white font-serif leading-tight">
            {entry.title}
          </h3>
        </div>

        {/* Milestone columns — horizontally scrollable */}
        {milestones ? (
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide px-10 py-10 gap-10">
            {milestones.map((m: TimelineMilestone) => (
              <div key={m.id} className="shrink-0 w-72">
                <p className="text-3xl sm:text-4xl font-bold text-white font-serif mb-5">
                  {m.year}
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-10 py-10">
            <p className="text-sm text-white/70 leading-relaxed max-w-2xl">
              {entry.description}
            </p>
          </div>
        )}

        {/* Scroll progress bar */}
        {milestones && milestones.length > 3 && (
          <div className="px-10 pb-8">
            <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
