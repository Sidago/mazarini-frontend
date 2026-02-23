"use client";

import { useState } from "react";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SubNavItem, SubNavSubItem } from "@/lib/types/strapi";

interface SubNavProps {
  items: SubNavItem[];
}

export function SubNav({ items }: SubNavProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  // Use the first sub-item image as the mega-menu featured image
  const featuredImage = activeItem?.subItems?.find(
    (sub: SubNavSubItem) => sub.image,
  )?.image;
  const featuredImageUrl = featuredImage
    ? getStrapiMediaUrl(featuredImage)
    : "";

  return (
    <nav className="hidden md:block relative">
      {/* Nav link row */}
      <div className="border-b border-white/10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-10 h-12">
          {items.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}>
              <span
                className={`text-sm font-semibold uppercase tracking-widest transition-colors cursor-pointer py-3 inline-block ${
                  activeIndex === index
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width mega-menu dropdown */}
      {activeItem && activeItem.subItems?.length > 0 && (
        <div
          className="absolute top-11.5 left-0 w-full z-50"
          onMouseEnter={() => setActiveIndex(activeIndex)}
          onMouseLeave={() => setActiveIndex(null)}>
          <div className="bg-neutral-900/98 backdrop-blur-md border-t border-white/10">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-12 gap-8">
                {/* Left — large section title */}
                <div className="col-span-3 flex items-start">
                  <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                    {activeItem.name}
                  </h3>
                </div>
                {/* Center — sub-items in a two-column grid */}
                <div className="col-span-5">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {activeItem.subItems.map((sub: SubNavSubItem) => (
                      <Link
                        key={sub.id}
                        href={sub.linkTo ?? "#"}
                        className="group flex items-center py-2 text-white/60 hover:text-white transition-colors">
                        <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-200 mr-0 group-hover:mr-3" />
                        <span className="text-sm uppercase tracking-wide font-medium">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Right — featured image */}
                {featuredImageUrl && (
                  <div className="col-span-4">
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={featuredImageUrl}
                      alt={activeItem.name}
                      className="w-full h-52 object-cover"
                    />
                    ) : (
                    <div className="w-full h-52 bg-neutral-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
