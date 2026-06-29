"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { StrapiBlocks } from "@/components/ui/strapi-blocks";
import { JobCard, postedLabel } from "@/components/jobs/job-card";
import type { Job, JobsPage } from "@/lib/types/strapi";

const PAGE_SIZE = 20;

interface JobsBoardProps {
  jobs: Job[];
  about: JobsPage | null;
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

function uniqueValues(jobs: Job[], pick: (job: Job) => string | null): string[] {
  return Array.from(
    new Set(jobs.map(pick).filter((v): v is string => v !== null && v !== "")),
  ).sort();
}

function AboutSidebar({ about }: { about: JobsPage | null }): React.ReactElement {
  return (
    <aside className="lg:sticky lg:top-28 self-start border border-neutral-200 dark:border-neutral-700 rounded p-6 bg-white dark:bg-neutral-900">
      <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
        {about?.aboutTitle ?? "About Us"}
      </h2>
      {about?.aboutText && (
        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
          {about.aboutText}
        </p>
      )}

      {(about?.fraudTitle || about?.fraudText || about?.fraudUrl) && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          {about?.fraudTitle && (
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {about.fraudTitle}
            </h3>
          )}
          {about?.fraudText && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
              {about.fraudText}
            </p>
          )}
          {about?.fraudUrl && (
            <a
              href={about.fraudUrl}
              className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Learn more
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

function JobDetail({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}): React.ReactElement {
  const posted = postedLabel(job.createdAt);

  return (
    <aside className="lg:sticky lg:top-28 self-start border border-neutral-200 dark:border-neutral-700 rounded p-6 bg-white dark:bg-neutral-900">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-500 hover:text-primary transition-colors mb-4"
      >
        <Icon name="arrow_back" className="text-base" />
        Back
      </button>

      <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
        {job.title}
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
        {job.location && (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="place" className="text-base text-neutral-400" />
            {job.location}
          </span>
        )}
        {job.jobType && (
          <span className="inline-flex items-center gap-1.5">
            <Icon
              name="business_center"
              className="text-base text-neutral-400"
            />
            {job.jobType}
          </span>
        )}
      </div>

      {posted && (
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {posted}
        </p>
      )}
      {job.jobCode && (
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          {job.jobCode}
        </p>
      )}

      {job.description && job.description.length > 0 && (
        <StrapiBlocks content={job.description} className="mt-5 text-sm" />
      )}

      {job.applyUrl && (
        <a
          href={job.applyUrl}
          className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors"
        >
          Apply Now
        </a>
      )}
    </aside>
  );
}

export function JobsBoard({ jobs, about }: JobsBoardProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const locations = useMemo(() => uniqueValues(jobs, (j) => j.location), [jobs]);
  const types = useMemo(() => uniqueValues(jobs, (j) => j.jobType), [jobs]);
  const categories = useMemo(
    () => uniqueValues(jobs, (j) => j.department),
    [jobs],
  );

  const filtered = useMemo(() => {
    let result = jobs;
    if (locationFilter) {
      result = result.filter((j) => j.location === locationFilter);
    }
    if (typeFilter) {
      result = result.filter((j) => j.jobType === typeFilter);
    }
    if (categoryFilter) {
      result = result.filter((j) => j.department === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((j) => j.title.toLowerCase().includes(q));
    }
    return result;
  }, [jobs, locationFilter, typeFilter, categoryFilter, searchQuery]);

  // Reset to first page whenever filters or search change.
  useEffect(() => {
    setPage(1);
  }, [locationFilter, typeFilter, categoryFilter, searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectedJob = jobs.find((j) => j.id === selectedId) ?? null;

  return (
    <section className="py-12 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + filter bar */}
        <div className="flex flex-wrap items-center gap-6 mb-10">
          <div className="flex items-center gap-2 border-b border-neutral-300 dark:border-neutral-600 pb-1">
            <Icon name="search" className="text-lg text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 outline-none w-40 md:w-56"
            />
          </div>

          <div className="flex flex-wrap items-center gap-5">
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
                label="Full/Part-time"
                options={types}
                value={typeFilter}
                onChange={setTypeFilter}
              />
            )}
            {categories.length > 0 && (
              <Dropdown
                label="Job Category"
                options={categories}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
            )}
            <button
              type="button"
              disabled
              className="text-sm font-semibold text-neutral-400 cursor-default"
            >
              More
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              {filtered.length} {filtered.length === 1 ? "Job" : "Jobs"} Found
            </p>

            {paginated.length > 0 ? (
              <div>
                {paginated.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isActive={job.id === selectedId}
                    onSelect={(j) => setSelectedId(j.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-500 mt-12">
                No jobs found matching your criteria.
              </p>
            )}

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 disabled:opacity-40 hover:text-primary transition-colors"
                >
                  <Icon name="chevron_left" className="text-lg" />
                </button>

                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`min-w-[2.25rem] h-9 px-2 text-sm font-semibold rounded transition-colors ${
                      p === currentPage
                        ? "bg-primary text-neutral-900"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={currentPage === pageCount}
                  className="px-3 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 disabled:opacity-40 hover:text-primary transition-colors"
                >
                  <Icon name="chevron_right" className="text-lg" />
                </button>
              </div>
            )}
          </div>

          {selectedJob ? (
            <JobDetail job={selectedJob} onClose={() => setSelectedId(null)} />
          ) : (
            <AboutSidebar about={about} />
          )}
        </div>
      </div>
    </section>
  );
}
