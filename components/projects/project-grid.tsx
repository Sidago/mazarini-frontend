"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { ProjectFilterCard } from "@/components/home/project-filter-card";
import type { Project } from "@/lib/types/strapi";

interface ProjectGridProps {
  projects: Project[];
}

interface DropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}

function Dropdown({
  label,
  options,
  value,
  onChange,
}: DropdownProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors"
      >
        {value ?? label}
        <Icon
          name="expand_more"
          className={`text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[200px] bg-white dark:bg-neutral-800 rounded shadow-xl z-50 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-primary hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              ALL
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  value === opt
                    ? "bg-neutral-100 dark:bg-neutral-700 text-primary"
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectGrid({
  projects,
}: ProjectGridProps): React.ReactElement {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category).filter(Boolean))).sort(),
    [projects],
  );
  const locations = useMemo(
    () => Array.from(new Set(projects.map((p) => p.location).filter((l): l is string => l !== null))).sort(),
    [projects],
  );
  const types = useMemo(
    () => Array.from(new Set(projects.map((p) => p.type).filter((t): t is string => t !== null))).sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    let result = projects;
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (locationFilter) {
      result = result.filter((p) => p.location === locationFilter);
    }
    if (typeFilter) {
      result = result.filter((p) => p.type === typeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [projects, categoryFilter, locationFilter, typeFilter, searchQuery]);

  return (
    <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <Dropdown
              label="Category"
              options={categories}
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
            {locations.length > 0 && (
              <Dropdown
                label="Location"
                options={locations}
                value={locationFilter}
                onChange={setLocationFilter}
              />
            )}
            {types.length > 0 && (
              <Dropdown
                label="Type"
                options={types}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            )}
          </div>

          {/* Search input */}
          <div className="ml-auto flex items-center gap-2 border-b border-neutral-300 dark:border-neutral-600 pb-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for..."
              className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-32 md:w-48"
            />
            <Icon name="search" className="text-lg text-neutral-400" />
          </div>
        </div>

        {/* Project cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <ProjectFilterCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 mt-12">
            No projects found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
}
