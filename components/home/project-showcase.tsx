"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ScaleReveal } from "@/components/ui/scroll-animations";
import { ProjectCard } from "@/components/home/project-card";
import type { Project } from "@/lib/types/strapi";

interface ProjectShowcaseProps {
  heading: string | null;
  projects: Project[];
}

export function ProjectShowcase({
  heading,
  projects,
}: ProjectShowcaseProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -600 : 600;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <section className="py-24 overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4">
            {heading ?? "Recent Work"}
          </h2>
        </FadeIn>
        <motion.div
          className="h-1 bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 gap-6 snap-x snap-mandatory scrollbar-hide"
      >
        {projects.map((project, index) => (
          <ScaleReveal
            key={project.id}
            delay={index * 0.1}
            className="min-w-[85vw] md:min-w-[600px] lg:min-w-[800px] snap-center"
          >
            <ProjectCard project={project} />
          </ScaleReveal>
        ))}
      </div>
      <FadeIn delay={0.4}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-between items-center text-sm font-medium text-neutral-500">
          <span>01 — {String(projects.length).padStart(2, "0")}</span>
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
      </FadeIn>
    </section>
  );
}
