"use client";

import { Activity, useState } from "react";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SubNavItem, SubNavSubItem } from "@/lib/types/strapi";

interface SubNavProps {
  items: SubNavItem[];
}

export function SubNav({ items }: SubNavProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  // Show hovered sub-item image, or fall back to first sub-item with an image
  const hoveredSub =
    hoveredSubIndex !== null ? activeItem?.subItems?.[hoveredSubIndex] : null;
  const displayImage =
    hoveredSub?.image ??
    activeItem?.subItems?.find((sub: SubNavSubItem) => sub.image)?.image ??
    null;
  const displayImageUrl = displayImage ? getStrapiMediaUrl(displayImage) : "";

  return (
    <nav className="hidden md:block relative border-b border-white/10">
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
                  setActiveIndex(index);
                  setHoveredSubIndex(null);
                }}
                onMouseLeave={() => setActiveIndex(null)}>
                <span
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer py-4 inline-block ${
                    activeIndex === index
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}>
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
          className="absolute top-[3.09rem] left-[5%] right-[5%] w-[90%] z-40"
          onMouseEnter={() => setActiveIndex(activeIndex)}
          onMouseLeave={() => {
            setActiveIndex(null);
            setHoveredSubIndex(null);
          }}>
          <div className="bg-neutral-900/98 backdrop-blur-md border-t border-white/10">
            <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-12 gap-8">
                {/* Left — large section title */}
                <div className="col-span-3 flex items-start">
                  <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                    {activeItem?.name}
                  </h3>
                </div>
                {/* Center — sub-items in a two-column grid */}
                <div className={displayImageUrl ? "col-span-5" : "col-span-9"}>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
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
                {/* Right — featured image (changes on sub-item hover) */}
                {displayImageUrl && (
                  <div className="col-span-4">
                    <img
                      src={displayImageUrl}
                      alt={
                        hoveredSub?.name ??
                        activeItem?.name ??
                        "Featured image"
                      }
                      className="w-full h-52 object-cover transition-opacity duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Activity>
    </nav>
  );
}
