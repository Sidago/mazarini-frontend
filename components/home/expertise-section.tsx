"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { ExpertiseCard } from "@/components/home/expertise-card";
import type { Expertise } from "@/lib/types/strapi";

interface ExpertiseSectionProps {
  heading: string | null;
  subheading: string | null;
  expertises: Expertise[];
}

export function ExpertiseSection({
  heading,
  subheading,
  expertises,
}: ExpertiseSectionProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <section
      id="expertise"
      className="relative py-24 lg:py-32 bg-background-light dark:bg-background-dark overflow-hidden">
      {/* ParallaxText — contained within the section by overflow-hidden */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none">
        <ParallaxText
          baseVelocity={-1}
          className="inline-block text-[20vw] md:text-[15vw] font-black text-neutral-900/[0.04] dark:text-white/[0.04] leading-none mx-4">
          Expertise
        </ParallaxText>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* ── Left: heading + description ── */}
          <div className="lg:w-[30%] lg:sticky lg:top-32 shrink-0">
            <FadeIn direction="left" duration={0.7}>
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white leading-tight mb-6">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-base lg:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                  {subheading}
                </p>
              )}
            </FadeIn>
          </div>

          {/* ── Right: horizontal scrolling cards with nav arrows ── */}
          <div className="relative lg:w-[70%] w-full ps-5.5">
            {/* Left arrow */}
            <motion.button
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute hidden md:flex left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_back" className="text-lg text-white" />
            </motion.button>

            {/* Right arrow */}
            <motion.button
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute hidden md:flex right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_forward" className="text-lg text-white" />
            </motion.button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {expertises.map((item, index) => (
                <FadeIn
                  key={item.id}
                  direction="right"
                  delay={index * 0.1}
                  className="min-w-[300px] md:min-w-[350px] snap-start shrink-0">
                  <ExpertiseCard expertise={item} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
