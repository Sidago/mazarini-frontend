"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { AwardPage } from "@/lib/types/strapi";

interface Props {
  data: AwardPage | null;
}

export function AwardKnowledgeSection({ data }: Props): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const members = data?.fieldMembers ?? [];
  const title = data?.knowledgeTitle ?? null;
  const description = data?.knowledgeDescription ?? null;
  const watermark = data?.knowledgeWatermark ?? null;

  if (members.length === 0) {
    return <></>;
  }

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="relative py-24 lg:py-32 bg-white text-black overflow-hidden">
      {/* ParallaxText — contained within the section by overflow-hidden */}
      {watermark && (
        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
          <ParallaxText
            baseVelocity={-1}
            className="inline-block text-[20vw] md:text-[15vw] font-black text-neutral-900/4 leading-none mx-4">
            {watermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 items-start">
          {/* ── Left: heading + description ── */}
          <div className="lg:w-[35%] lg:ps-15 lg:sticky lg:top-32 shrink-0">
            <FadeIn direction="left" duration={0.7}>
              {title && (
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight mb-6">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-base lg:text-lg text-neutral-500 leading-relaxed mb-8">
                  {description}
                </p>
              )}
            </FadeIn>
          </div>

          {/* ── Right: horizontal scrolling cards with nav arrows ── */}
          <div className="relative lg:w-[65%] w-full ps-5.5">
            {/* Left arrow */}
            <motion.button
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous"
              className="absolute hidden md:flex left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_back" className="text-lg text-white" />
            </motion.button>

            {/* Right arrow */}
            <motion.button
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next"
              className="absolute hidden md:flex right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_forward" className="text-lg text-white" />
            </motion.button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {members.map((member, index) => {
                const imageUrl = getStrapiMediaUrl(member.image ?? null);
                return (
                  <FadeIn
                    key={member.id}
                    direction="right"
                    delay={index * 0.1}
                    className="min-w-75 md:min-w-85 snap-start shrink-0">
                    <div className="group relative aspect-3/4 w-full overflow-hidden">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 75vw, 340px"
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        {member.location && (
                          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                            {member.location}
                          </p>
                        )}
                        <p className="text-white text-lg font-serif font-bold leading-tight">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
