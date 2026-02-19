"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { TextReveal, BlurFadeIn } from "@/components/ui/scroll-animations";
import type { Testimonial } from "@/lib/types/strapi";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({
  testimonials,
}: TestimonialSectionProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -540 : 540;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  if (testimonials.length === 0) {
    return <></>;
  }

  return (
    <section className="py-24 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <TextReveal
          text="Client Stories"
          as="h2"
          className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4"
        />
        <motion.div
          className="h-1 bg-primary mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        <BlurFadeIn delay={0.4} direction="up">
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl">
            Hear from the visionaries we&apos;ve collaborated with to build
            iconic structures.
          </p>
        </BlurFadeIn>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 gap-6 snap-x snap-mandatory scrollbar-hide"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end">
        <div className="flex gap-2">
          <motion.button
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <Icon name="arrow_back" className="text-lg" />
          </motion.button>
          <motion.button
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <Icon name="arrow_forward" className="text-lg" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
