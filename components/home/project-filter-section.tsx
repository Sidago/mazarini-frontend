"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ProjectFilterCard } from "@/components/home/project-filter-card";
import type { Project } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";

interface ProjectFilterSectionProps {
  projects: Project[];
}

export function ProjectFilterSection({
  projects,
}: ProjectFilterSectionProps): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from projects
  const categories = Array.from(
    new Set(projects.map((p) => p.category)),
  ).sort();

  // Filter projects by selected category
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-neutral-950 py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Filter bar with background text ── */}
        <div className="relative pb-16 mb-10 md:py-24">
          {/* Scrolling "Projects" text — positioned behind the filter bar */}
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
            <ParallaxText
              baseVelocity={-1}
              className="inline-block text-[20vw] md:text-[15vw] font-black text-white/12 leading-none mx-4"
            >
              Projects
            </ParallaxText>
          </div>

          {/* Filter controls */}
          <FadeIn direction="up">
            <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap py-8 md:py-12">
              <span className="text-2xl md:text-4xl font-bold text-white">
                I&apos;m interested in
              </span>

              {/* Custom dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="text-2xl md:text-4xl font-bold text-white border-b-2 border-primary pb-1 flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  {selectedCategory ?? "market"}
                  <Icon
                    name="expand_more"
                    className={`text-xl transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[220px] bg-white rounded shadow-xl z-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(null);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-5 py-2 text-sm font-bold text-primary hover:bg-neutral-100 transition-colors cursor-pointer">
                        RESET
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            selectedCategory === cat
                              ? "bg-neutral-100 text-primary"
                              : "text-neutral-800 hover:bg-neutral-50"
                          }`}>
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer">
                <Icon name="search" className="text-xl text-white" />
              </motion.button>
            </div>
          </FadeIn>
        </div>

        {/* ── Project cards grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}>
                <ProjectFilterCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
