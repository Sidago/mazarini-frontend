"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { LeadershipMember } from "@/lib/types/strapi";

interface MembersCarouselProps {
  members: LeadershipMember[];
}

function LinkedInIcon(): React.ReactElement {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function MembersCarousel({
  members,
}: MembersCarouselProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const canNavigateRef = useRef(true);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const count = members.length;

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!canNavigateRef.current) return;
      const next = activeIndexRef.current + direction;
      if (next < 0 || next >= count) return;
      canNavigateRef.current = false;
      activeIndexRef.current = next;
      setActiveIndex(next);
      setTimeout(() => {
        canNavigateRef.current = true;
      }, 700);
    },
    [count],
  );

  const goTo = useCallback((idx: number) => {
    activeIndexRef.current = idx;
    canNavigateRef.current = true;
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const atStart = activeIndexRef.current === 0 && e.deltaY < 0;
      const atEnd = activeIndexRef.current === count - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowUp") navigate(-1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) navigate(dy > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate, count]);

  if (members.length === 0) return <></>;

  const active = members[activeIndex];
  const imageUrl = getStrapiMediaUrl(active.image);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">
      {/* Vertical progress bar — left side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1">
        {/* Top line */}
        <div className="w-px h-12 bg-neutral-300" />

        {members.map((member, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => goTo(index)}
              className="flex items-center gap-3 group cursor-pointer py-2"
              aria-label={`Go to ${member.name}`}>
              <div
                className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary border-primary scale-125"
                    : "bg-neutral-300 border-neutral-300 group-hover:border-primary group-hover:bg-primary/40"
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 hidden lg:block ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-400 group-hover:text-primary/70"
                }`}>
                {member.name.split(" ")[0]}
              </span>
            </button>
          );
        })}

        {/* Bottom line */}
        <div className="w-px h-12 bg-neutral-300" />
      </div>

      {/* Member card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          id={`member-${active.id}`}
          className="h-full flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-16 lg:px-24 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative w-full lg:w-[38%] flex-none h-64 lg:h-[70%] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={active.image?.alternativeText ?? active.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Name + LinkedIn */}
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl lg:text-4xl font-black font-serif text-neutral-900">
                {active.name}
              </h2>
              {active.linkedinUrl && (
                <Link
                  href={active.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077B5] hover:opacity-70 transition-opacity">
                  <LinkedInIcon />
                </Link>
              )}
            </div>

            {/* Position */}
            <p className="text-neutral-400 text-sm mb-8">{active.position}</p>

            {/* Quote */}
            {active.quote && (
              <blockquote className="text-xl lg:text-2xl font-bold text-neutral-900 leading-snug mb-6 border-l-4 border-primary pl-5">
                {active.quote}
              </blockquote>
            )}

            {/* Bio */}
            {active.bio && (
              <p className="text-neutral-500 leading-relaxed mb-8">
                {active.bio}
              </p>
            )}

            {/* CTA */}
            {active.ctaText && active.ctaUrl && (
              <Link
                href={active.ctaUrl}
                className="self-start inline-flex items-center px-8 py-4 bg-primary text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                {active.ctaText}
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll hint on first slide */}
      {activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <motion.line
              x1="8" y1="6" x2="8" y2="10"
              animate={{ y1: [6, 9, 6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </svg>
        </motion.div>
      )}
    </section>
  );
}
