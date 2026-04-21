"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { ServiceProjectCard } from "@/components/services/service-project-card";
import type { Project } from "@/lib/types/strapi";

interface ServiceRelatedProjectsProps {
  projects: Project[];
}

export function ServiceRelatedProjects({
  projects,
}: ServiceRelatedProjectsProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (projects.length === 0) return <></>;

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <section className="relative py-24 lg:py-32 bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Watermark — same as expertise section */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none">
        <ParallaxText
          baseVelocity={-1}
          className="inline-block text-[20vw] md:text-[15vw] font-black text-neutral-900/4 dark:text-white/4 leading-none mx-4">
          Projects
        </ParallaxText>
      </div>

      <div className="relative z-10 max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: sticky heading */}
          <div className="lg:w-[30%] lg:sticky lg:top-32 shrink-0">
            <FadeIn direction="left" duration={0.7}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white leading-tight mb-6">
                Relevant Projects
              </h2>
              <p className="text-base lg:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                Explore a selection of projects that showcase our work in this
                area.
              </p>
            </FadeIn>
          </div>

          {/* Right: horizontal scrolling cards with nav arrows */}
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
              className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_forward" className="text-lg text-white" />
            </motion.button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {projects.map((project, index) => (
                <FadeIn
                  key={project.id}
                  direction="right"
                  delay={index * 0.1}
                  className="min-w-75 md:min-w-85 snap-start shrink-0">
                  <ServiceProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
