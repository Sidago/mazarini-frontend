"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { Teams } from "@/lib/types/strapi";

interface TeamListProps {
  teams: Teams[];
}

const CATEGORIES = ["Executive Leadership", "Senior Leadership"] as const;
const PAGE_SIZE = 12;

export default function TeamList({ teams }: TeamListProps): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = activeCategory
    ? teams.filter((t) => t.catagory === activeCategory)
    : teams;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(cat: string | null): void {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-6 mb-12 border-b border-neutral-200 dark:border-neutral-700 pb-4">
          <button
            type="button"
            onClick={() => handleCategoryChange(null)}
            className={`text-sm font-semibold uppercase tracking-wider transition-colors pb-1 ${
              activeCategory === null
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors pb-1 ${
                activeCategory === cat
                  ? "text-primary border-b-2 border-primary"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {paginated.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 mt-12">No team members found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm font-semibold transition-colors ${
                  p === page
                    ? "bg-primary text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-primary border border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface TeamCardProps {
  member: Teams;
}

function TeamCard({ member }: TeamCardProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(member.image);

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-3/4 overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>

      {/* Info */}
      <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
        {member.name}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
        {member.position}
      </p>
      {member.location && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
          {member.location}
        </p>
      )}
    </div>
  );
}
