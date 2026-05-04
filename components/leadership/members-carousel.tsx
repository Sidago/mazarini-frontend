"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

function MemberCard({ member }: { member: LeadershipMember }): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(member.image);
  return (
    <div id={`member-${member.id}`} className="w-full h-full flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-10 lg:px-24 gap-10 lg:gap-20">
      {/* Image */}
      <div className="relative w-full lg:w-[38%] flex-none h-56 lg:h-[68%] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.image?.alternativeText ?? member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 38vw"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-3xl lg:text-4xl font-black font-serif text-neutral-900">
            {member.name}
          </h2>
          {member.linkedinUrl && (
            <Link
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077B5] hover:opacity-70 transition-opacity">
              <LinkedInIcon />
            </Link>
          )}
        </div>

        <p className="text-neutral-400 text-sm mb-6">{member.position}</p>

        {member.quote && (
          <blockquote className="font-semibold font-serif text-neutral-900 leading-snug mb-5 border-l-4 border-primary pl-4">
            {member.quote}
          </blockquote>
        )}

        {member.bio && (
          <p className="text-neutral-500 text-sm leading-relaxed mb-8">
            {member.bio}
          </p>
        )}

        {member.ctaText && member.ctaUrl && (
          <Link
            href={member.ctaUrl}
            className="self-start inline-flex items-center px-8 py-4 bg-primary text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
            {member.ctaText}
          </Link>
        )}
      </div>
    </div>
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
      setTimeout(() => { canNavigateRef.current = true; }, 650);
    },
    [count],
  );

  const goTo = useCallback((idx: number) => {
    activeIndexRef.current = idx;
    canNavigateRef.current = true;
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<{ index: number }>).detail.index;
      goTo(idx);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("leadership:navigate", handler);
    return () => window.removeEventListener("leadership:navigate", handler);
  }, [goTo]);

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
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) navigate(dy > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [navigate, count]);

  if (members.length === 0) return <></>;

  return (
    <>
      {/* ── Mobile: simple stacked list ── */}
      <div className="lg:hidden flex flex-col divide-y divide-neutral-100 bg-white">
        {members.map((member) => {
          const imageUrl = getStrapiMediaUrl(member.image);
          return (
            <div key={member.id} id={`member-${member.id}`} className="flex flex-col">
              {/* Image on top */}
              <div className="relative w-full h-80 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={member.image?.alternativeText ?? member.name}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}
              </div>
              {/* Content below */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-black font-serif text-neutral-900">{member.name}</h2>
                  {member.linkedinUrl && (
                    <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#0077B5]">
                      <LinkedInIcon />
                    </Link>
                  )}
                </div>
                <p className="text-neutral-400 text-sm mb-5">{member.position}</p>
                {member.quote && (
                  <blockquote className="font-semibold font-serif text-neutral-900 leading-snug mb-4 border-l-4 border-primary pl-4">
                    {member.quote}
                  </blockquote>
                )}
                {member.bio && (
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">{member.bio}</p>
                )}
                {member.ctaText && member.ctaUrl && (
                  <Link href={member.ctaUrl} className="inline-flex items-center px-6 py-3 bg-primary text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors">
                    {member.ctaText}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Desktop: vertical sliding carousel ── */}
      <section ref={sectionRef} className="hidden lg:block relative h-screen overflow-hidden bg-white">
        {/* Progress bar — left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1">
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
                <div className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-primary border-primary scale-125"
                    : "bg-neutral-300 border-neutral-300 group-hover:border-primary group-hover:bg-primary/40"
                }`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-neutral-400 group-hover:text-primary/70"
                }`}>
                  {member.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
          <div className="w-px h-12 bg-neutral-300" />
        </div>

        {/* Sliding track */}
        <motion.div
          animate={{ y: `-${activeIndex * 100}vh` }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="will-change-transform">
          {members.map((member) => (
            <div key={member.id} className="h-screen w-full flex items-center">
              <MemberCard member={member} />
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
