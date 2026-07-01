"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { FadeIn } from "@/components/ui/fade-in";
import type { Teams } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";

interface ServiceKeyTeamMembersProps {
  members: Teams[];
}

export function ServiceKeyTeamMembers({
  members,
}: ServiceKeyTeamMembersProps): React.ReactElement | null {
  if (!members.length) return null;

  return (
    <section className="relative py-20 md:py-35 overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Background watermark */}
      <div className="absolute top-0 left-0 w-full h-[20vw] pointer-events-none select-none overflow-hidden">
        <ParallaxText baseVelocity={-0.5} color="rgba(0,0,0,0.07)">
          Our Experts
        </ParallaxText>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6 mb-8">
          <FadeIn direction="up">
            <h2 className="text-3xl font-black font-serif text-neutral-900 dark:text-white leading-tight">
              Key Team
              <br />
              Members
            </h2>
          </FadeIn>
        </div>
        <MobileCarousel members={members} />
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-row gap-12 lg:gap-16">
          <div className="w-56 shrink-0 flex items-start">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-black font-serif text-neutral-900 dark:text-white leading-tight">
                Key Team
                <br />
                Members
              </h2>
            </FadeIn>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-6 md:gap-8">
            {members.map((member, i) => (
              <FadeIn key={member.id} direction="up" delay={i * 0.06}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCarousel({ members }: { members: Teams[] }): React.ReactElement {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef(0);

  function handleDragStart(_: unknown, info: { point: { x: number } }): void {
    dragStartX.current = info.point.x;
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number } }): void {
    const threshold = 50;
    if (info.offset.x < -threshold && index < members.length - 1) {
      setIndex((p) => p + 1);
    } else if (info.offset.x > threshold && index > 0) {
      setIndex((p) => p - 1);
    }
  }

  const CARD_WIDTH = "calc(100vw - 2rem)";
  const GAP = 16;

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden px-4">
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: `calc(-${index} * (${CARD_WIDTH} + ${GAP}px))` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {members.map((member) => (
            <div key={member.id} className="shrink-0" style={{ width: CARD_WIDTH }}>
              <MobileCard member={member} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2">
        {members.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-neutral-900 dark:bg-white"
                : "w-1.5 bg-neutral-300 dark:bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileCard({ member }: { member: Teams }): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(member.image);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[65vh] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>
      <div className="pt-3">
        <h3 className="font-bold text-neutral-900 dark:text-white leading-snug text-center">
          {member.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 text-center">
          {member.position}
        </p>
        {member.location && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 text-center">
            {member.location}
          </p>
        )}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Teams }): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(member.image);

  return (
    <div className="group flex flex-col">
      <div className="relative w-full aspect-3/4 overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-3">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 220px"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>

      <h3 className="font-bold text-neutral-900 dark:text-white leading-snug text-center">
        {member.name}
      </h3>
      <p className="text-neutral-500 dark:text-neutral-400 mt-0.5 text-center">
        {member.position}
      </p>
      {member.location && (
        <p className="text-neutral-400 dark:text-neutral-500 mt-0.5 text-center">
          {member.location}
        </p>
      )}
    </div>
  );
}
