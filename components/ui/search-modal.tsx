"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { useSearch } from "@/hooks/use-search";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SearchResults } from "@/lib/api/search";
import type { StrapiMedia } from "@/lib/types/strapi";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResultSectionProps {
  title: string;
  items: { id: number; title: string; image?: StrapiMedia | StrapiMedia[] | null; category?: string | null }[];
}

function getFirstImage(image: StrapiMedia | StrapiMedia[] | null | undefined): StrapiMedia | null {
  if (!image) return null;
  if (Array.isArray(image)) return image[0] ?? null;
  return image;
}

function getTotalResults(results: SearchResults): number {
  return (
    results.projects.length +
    results.services.length +
    results.news.length +
    results.expertises.length
  );
}

function ResultSection({ title, items }: ResultSectionProps): React.ReactElement | null {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const thumb = getFirstImage(item.image);
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              {thumb && (
                <img
                  src={getStrapiMediaUrl(thumb)}
                  alt={thumb.alternativeText ?? item.title}
                  className="w-12 h-12 rounded object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {item.title}
                </p>
                {item.category && (
                  <p className="text-xs text-white/40">{item.category}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SearchModal({ isOpen, onClose }: SearchModalProps): React.ReactElement | null {
  const { query, setQuery, results, isLoading, reset } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        reset();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, reset, onClose]);

  function handleClose(): void {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-200 flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-32 md:pt-40 px-4 sm:px-6 w-full max-w-3xl mx-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close search"
          className="absolute top-6 right-4 md:top-8 md:right-0 p-2 text-white/70 hover:text-white transition-colors"
        >
          <Icon name="close" className="text-3xl" />
        </button>

        {/* Label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
          I&apos;m interested in
        </p>

        {/* Search input row */}
        <div className="flex items-center gap-3 w-full border-b border-white/20 pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Office, Data Center, etc."
            className="flex-1 bg-transparent text-2xl md:text-4xl text-white placeholder-white/30 outline-none"
          />
          <button
            aria-label="Search"
            className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-neutral-900 hover:bg-amber-500 transition-colors"
          >
            <Icon name="search" />
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="mt-8 text-sm text-white/50 animate-pulse">
            Searching...
          </p>
        )}

        {/* Results */}
        {results && !isLoading && (
          <div className="w-full mt-8 space-y-6 max-h-[50vh] overflow-y-auto scrollbar-hide pb-8">
            <ResultSection
              title="Projects"
              items={results.projects.map((p) => ({
                id: p.id,
                title: p.title,
                image: p.image,
                category: p.category,
              }))}
            />
            <ResultSection
              title="Services"
              items={results.services.map((s) => ({
                id: s.id,
                title: s.title,
                image: s.image,
                category: s.catagory,
              }))}
            />
            <ResultSection
              title="News"
              items={results.news.map((n) => ({
                id: n.id,
                title: n.title,
                image: n.image,
                category: n.category,
              }))}
            />
            <ResultSection
              title="Expertise"
              items={results.expertises.map((e) => ({
                id: e.id,
                title: e.title,
                image: e.image,
              }))}
            />
            {getTotalResults(results) === 0 && (
              <p className="text-center text-white/50">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
