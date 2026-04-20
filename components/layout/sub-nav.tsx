"use client";

import { Activity, useState, useRef } from "react";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SubNavItem, SubNavSubItem } from "@/lib/types/strapi";

interface SubNavProps {
  items: SubNavItem[];
  scrolled: boolean;
}

export function SubNav({ items, scrolled }: SubNavProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const hoveredSub =
    hoveredSubIndex !== null ? activeItem?.subItems?.[hoveredSubIndex] : null;
  const displayImage =
    hoveredSub?.image ??
    activeItem?.subItems?.find((sub: SubNavSubItem) => sub.image)?.image ??
    null;
  const displayImageUrl = displayImage ? getStrapiMediaUrl(displayImage) : "";

  const subItemCount = activeItem?.subItems?.length ?? 0;
  const useTwoColumns = subItemCount > 9;
  const columnRows = useTwoColumns ? Math.ceil(subItemCount / 2) : subItemCount;

  function scheduleClose(): void {
    closeTimer.current = setTimeout(() => {
      setActiveIndex(null);
      setHoveredSubIndex(null);
    }, 80);
  }

  function cancelClose(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <nav
      className={`hidden md:block relative border-b ${scrolled ? "border-black/20" : "border-white/15"}`}>
      {/* Nav link row */}
      <div className="relative z-50 max-w-400 mx-auto px-4 sm:px-6 lg:px-8 top-0.5">
        <div className="flex items-center justify-center gap-10">
          {items.map((item, index) => {
            const slug = item?.slug ?? "/";
            return (
              <Link
                key={item.id}
                href={slug === "home" ? "/" : `/${slug}`}
                onMouseEnter={() => {
                  cancelClose();
                  setActiveIndex(index);
                  setHoveredSubIndex(null);
                }}
                onMouseLeave={scheduleClose}>
                <span
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer py-4 inline-block ${
                    scrolled
                      ? "text-black/90 hover:text-black/60"
                      : "text-white/90 hover:text-white/60"
                  } ${activeIndex === index ? (scrolled ? "text-black!" : "text-white!") : ""}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Full-width mega-menu dropdown */}
      <Activity
        mode={
          activeItem && activeItem?.subItems?.length > 0 ? "visible" : "hidden"
        }>
        <div
          className="absolute top-[3.09rem] left-0 right-0 w-full z-40"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}>
          <div className="bg-neutral-900/98 backdrop-blur-md border-t border-white/10 flex items-stretch h-127 w-[80%] mx-auto">

            {/* Left: title + sub-items (padded) */}
            <div className="w-[65%] px-8 lg:px-12 py-10 flex gap-8 items-start min-w-0 overflow-y-auto">
              {/* Section title */}
              <div className="shrink-0">
                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  {activeItem?.name}
                </h3>
              </div>

              {/* Sub-items: 1 col if ≤9, 2 cols if >9 (column-major fill) */}
              <div
                className={`grid mx-auto gap-x-8 gap-y-1 ${useTwoColumns ? "grid-cols-2 grid-flow-col" : "grid-cols-1 items-center"}`}
                style={useTwoColumns ? { gridTemplateRows: `repeat(${columnRows}, auto)` } : undefined}
              >
                {activeItem?.subItems.map(
                  (sub: SubNavSubItem, subIdx: number) => (
                    <Link
                      key={sub.id}
                      href={sub.linkTo ?? "#"}
                      className="group flex items-center py-2 text-white/60 hover:text-white transition-colors"
                      onMouseEnter={() => setHoveredSubIndex(subIdx)}
                      onMouseLeave={() => setHoveredSubIndex(null)}>
                      <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-3" />
                      <span className="text-sm uppercase tracking-wide font-medium">
                        {sub.name}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* Right: image flush to edge, no padding */}
            {displayImageUrl && (
              <div className="w-[35%] shrink-0 self-stretch">
                <img
                  src={displayImageUrl}
                  alt={hoveredSub?.name ?? activeItem?.name ?? "Featured image"}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
            )}

          </div>
        </div>
      </Activity>
    </nav>
  );
}
