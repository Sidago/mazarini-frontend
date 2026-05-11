"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { SubNavItem, SubNavSubItem } from "@/lib/types/strapi";

interface SubNavProps {
  items: SubNavItem[];
  scrolled: boolean;
}

const PANEL_H = 440;
const NAV_H = 46; // h-11.5 = 2.875rem × 16px
const COL_LIMIT = 9;

function groupByCategory(subs: SubNavSubItem[]): [string, SubNavSubItem[]][] {
  const map = new Map<string, SubNavSubItem[]>();
  for (const s of subs) {
    const key = s.category ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return Array.from(map.entries());
}

function splitGroups(
  groups: [string, SubNavSubItem[]][],
  col1Max: number,
): [[string, SubNavSubItem[]][], [string, SubNavSubItem[]][]] {
  const col1: [string, SubNavSubItem[]][] = [];
  const col2: [string, SubNavSubItem[]][] = [];
  let filled = 0;

  for (const [cat, subs] of groups) {
    if (filled >= col1Max) {
      col2.push([cat, subs]);
    } else if (filled + subs.length <= col1Max) {
      col1.push([cat, subs]);
      filled += subs.length;
    } else {
      // Split the group across columns
      const take = col1Max - filled;
      col1.push([cat, subs.slice(0, take)]);
      col2.push(["", subs.slice(take)]);
      filled = col1Max;
    }
  }

  return [col1, col2];
}

export function SubNav({ items, scrolled }: SubNavProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSubId, setHoveredSubId] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const isOpen = !!activeItem && (activeItem.subItems?.length ?? 0) > 0;

  const hoveredSub =
    hoveredSubId !== null
      ? activeItem?.subItems?.find((s) => s.id === hoveredSubId)
      : null;

  const displayImageUrl = getStrapiMediaUrl(
    hoveredSub?.image ??
      activeItem?.subItems?.find((s) => s.image)?.image ??
      null,
  );

  const groups = groupByCategory(activeItem?.subItems ?? []);
  const totalItems = groups.reduce((sum, [, subs]) => sum + subs.length, 0);

  const useTwoColumns = totalItems > COL_LIMIT;
  const col1Max =
    totalItems > COL_LIMIT * 2
      ? Math.ceil(totalItems / 2) // >18: balance evenly
      : COL_LIMIT; // 10–18: first col gets exactly 9

  const [col1Groups, col2Groups] = useTwoColumns
    ? splitGroups(groups, col1Max)
    : [groups, []];

  function scheduleClose(): void {
    closeTimer.current = setTimeout(() => {
      setActiveIndex(null);
      setHoveredSubId(null);
    }, 80);
  }

  function cancelClose(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <nav className={`hidden md:block relative `}>
      {/* Nav link row */}
      <div
        className={`relative z-60 overflow-hidden max-w-400 mx-auto px-4 sm:px-6 lg:px-8 h-11.5 border-b ${
          scrolled ? "border-black/20 shadow-xs" : "border-white/15"
        }`}>
        <div className="flex items-center justify-center gap-10">
          {items.map((item, index) => {
            const slug = item?.slug ?? "/";
            const isActive = activeIndex === index;
            return (
              <Link
                key={item.id}
                href={slug === "home" ? "/" : `/${slug}`}
                onMouseEnter={() => {
                  cancelClose();
                  setActiveIndex(index);
                  setHoveredSubId(null);
                }}
                onMouseLeave={scheduleClose}>
                <span
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer py-4 inline-block ${
                    isActive
                      ? scrolled ? "text-black/70" : "text-white/70"
                      : scrolled ? "text-black" : "text-white"
                  }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mega-menu — clips via overflow-hidden; inner div slides from behind the nav */}
      <motion.div
        className={`absolute top-full left-0 right-0 z-40 max-w-[93%] mx-auto overflow-hidden`}
        animate={{ height: isOpen ? PANEL_H : 0 }}
        initial={false}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}>
        <motion.div
          className={`flex items-stretch bg-neutral-950`}
          style={{ height: PANEL_H }}
          animate={{ y: isOpen ? 0 : -PANEL_H }}
          initial={false}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
          {/* Section title */}
          <div className="shrink-0 w-40 lg:w-52 flex items-start pt-10 justify-start ps-8">
            <h3 className="font-serif text-3xl font-black text-white leading-tight text-center">
              {activeItem?.name}
            </h3>
          </div>

          {/* Links area */}
          <div
            className={`flex-1 px-8 xl:px-14 py-4 overflow-y-auto mega-scroll ${useTwoColumns ? "grid grid-cols-2 gap-x-10" : "flex flex-col"}`}>
            <ItemColumn
              groups={col1Groups}
              hoveredSubId={hoveredSubId}
              setHoveredSubId={setHoveredSubId}
            />
            {useTwoColumns && (
              <ItemColumn
                groups={col2Groups}
                hoveredSubId={hoveredSubId}
                setHoveredSubId={setHoveredSubId}
              />
            )}
          </div>

          {/* Image — always rendered, dark fallback */}
          <div className="shrink-0 w-[38%] xl:w-[42%] self-stretch bg-neutral-900 overflow-hidden">
            <AnimatePresence mode="wait">
              {displayImageUrl && (
                <motion.img
                  key={displayImageUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={displayImageUrl}
                  alt={hoveredSub?.name ?? activeItem?.name ?? ""}
                  className="w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
}

function ItemColumn({
  groups,
  hoveredSubId,
  setHoveredSubId,
}: {
  groups: [string, SubNavSubItem[]][];
  hoveredSubId: number | null;
  setHoveredSubId: (id: number | null) => void;
}): React.ReactElement {
  return (
    <div className="flex flex-col">
      {groups.map(([category, subs], gi) => (
        <div key={`${category}-${gi}`} className={gi > 0 ? "mt-6" : ""}>
          {category && (
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary mb-3">
              {category}
            </p>
          )}
          {subs.map((sub) => {
            const hovered = hoveredSubId === sub.id;
            return (
              <Link
                key={sub.id}
                href={sub.linkTo ?? "#"}
                className="flex items-center gap-3 py-2 transition-colors duration-150"
                onMouseEnter={() => setHoveredSubId(sub.id)}
                onMouseLeave={() => setHoveredSubId(null)}>
                <span className="flex flex-col min-w-0">
                  <span
                    className={`font-serif text-base font-bold leading-snug transition-colors duration-150 ${
                      hovered ? "text-white" : "text-white/70"
                    }`}>
                    {sub.name}
                  </span>
                  {sub.description && (
                    <span className="text-sm font-serif text-white/55 leading-snug mt-1">
                      {sub.description}
                    </span>
                  )}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${
                    hovered ? "bg-primary" : "bg-transparent"
                  }`}>
                  {hovered && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
