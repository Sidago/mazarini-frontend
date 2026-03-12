"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { ServiceFilterCard } from "@/components/services/service-filter-card";
import type { Service } from "@/lib/types/strapi";

interface ServiceGridProps {
  services: Service[];
}

const SERVICES_PER_PAGE = 12;

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
        className="flex items-center gap-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors">
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
            className="absolute top-full left-0 mt-2 min-w-50 bg-white dark:bg-neutral-800 rounded shadow-xl z-50 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-primary hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
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
                }`}>
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceGrid({
  services,
}: ServiceGridProps): React.ReactElement {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          services
            .map((s) => s.catagory)
            .filter((c): c is string => c !== null),
        ),
      ).sort(),
    [services],
  );

  const filtered = useMemo(() => {
    let result = services;
    if (categoryFilter) {
      result = result.filter((s) => s.catagory === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.discriptions.toLowerCase().includes(q),
      );
    }
    return result;
  }, [services, categoryFilter, searchQuery]);

  const totalPages = Math.ceil(filtered.length / SERVICES_PER_PAGE);
  const startIdx = (currentPage - 1) * SERVICES_PER_PAGE;
  const endIdx = startIdx + SERVICES_PER_PAGE;
  const paginatedServices = filtered.slice(startIdx, endIdx);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchQuery]);

  return (
    <section className="py-12 lg:py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter bar with better spacing */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {categories.length > 0 && (
                <Dropdown
                  label="Category"
                  options={categories}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                />
              )}
            </div>

            {/* Search input */}
            <div className="ml-auto flex items-center gap-2 border-b border-neutral-300 dark:border-neutral-600 pb-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-32 md:w-48"
              />
              <Icon name="search" className="text-lg text-neutral-400" />
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Showing {paginatedServices.length > 0 ? startIdx + 1 : 0} to{" "}
            {Math.min(endIdx, filtered.length)} of {filtered.length} services
          </div>
        </div>

        {/* Service cards grid with better spacing */}
        {paginatedServices.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              <AnimatePresence mode="popLayout">
                {paginatedServices.map((service) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}>
                    <ServiceFilterCard service={service} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page">
                  <Icon name="chevron_left" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1,
                    )
                    .map((page, idx, arr) => (
                      <div key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="text-neutral-400 dark:text-neutral-600 px-1">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }>
                          {page}
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page">
                  <Icon name="chevron_right" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400 mt-12 py-12">
            No services found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
}
