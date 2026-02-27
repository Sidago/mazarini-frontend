"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Project } from "@/lib/types/strapi";

interface ProjectCarouselProps {
  projects: Project[];
  ctaText: string;
}

export function ProjectCarousel({
  projects,
  ctaText,
}: ProjectCarouselProps): React.ReactElement | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
  }, [projects.length]);

  useEffect(() => {
    if (projects.length <= 1) return;
    startAutoRotate();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [projects.length, startAutoRotate]);

  function goTo(index: number): void {
    setActiveIndex(index);
    startAutoRotate();
  }

  if (projects.length === 0) return null;

  const current = projects[activeIndex];
  const imageUrl = getStrapiMediaUrl(current?.image[0] ?? null);

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-neutral-900">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={current?.image[0]?.alternativeText ?? current?.title ?? ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-8">
              {current?.title}
            </h1>
            {current && (
              <Link
                href={`/projects/${current.id}`}
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-widest text-neutral-900 bg-primary hover:bg-amber-500 transition-all"
              >
                {ctaText}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom project tabs */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${projects.length}, 1fr)` }}>
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => goTo(index)}
                className="group relative py-6 px-4 text-left transition-colors"
              >
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 w-[50%] mx-auto">
                  {index === activeIndex && (
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`progress-${activeIndex}`}
                    />
                  )}
                </div>
                <p
                  className={`text-center text-sm md:text-base font-semibold transition-colors line-clamp-2 ${
                    index === activeIndex
                      ? "text-white"
                      : "text-white/60 group-hover:text-white/80"
                  }`}
                >
                  {project.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
