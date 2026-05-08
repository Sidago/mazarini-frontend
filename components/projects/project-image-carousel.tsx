"use client";

import { useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { StrapiMedia } from "@/lib/types/strapi";

interface Props {
  images: StrapiMedia[];
  title: string;
}

export function ProjectImageCarousel({ images, title }: Props): React.ReactElement | null {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  function prev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  const current = images[index];
  const url = getStrapiMediaUrl(current ?? null);

  return (
    <div className="flex flex-col gap-0">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-800">
        <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-neutral-900/80 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
        {url && (
          <Image
            src={url}
            alt={current?.alternativeText ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>

      <div className="flex items-center justify-between bg-neutral-950 pt-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="w-10 h-10 bg-primary flex items-center justify-center hover:bg-amber-400 transition-colors shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-3 h-3 bg-primary"
                  : "w-2.5 h-2.5 bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="w-10 h-10 bg-primary flex items-center justify-center hover:bg-amber-400 transition-colors shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
