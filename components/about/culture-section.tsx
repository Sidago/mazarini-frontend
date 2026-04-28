"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { Icon } from "@/components/ui/icon";
import type { CultureCard } from "@/lib/types/strapi";

interface CultureSectionProps {
  heading: string | null;
  description: string | null;
  watermark: string | null;
  cards: CultureCard[];
}

export function CultureSection({
  heading,
  description,
  watermark,
  cards,
}: CultureSectionProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!heading && cards.length === 0) return <></>;

  const scroll = (direction: 1 | -1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden py-20">
      {/* Watermark */}
      {watermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-full z-0">
          <ParallaxText
            baseVelocity={0.15}
            color="rgba(255,255,255,0.15)"
            direction="horizontal">
            {watermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0 w-full">
        {/* Left — heading + description */}
        <div className="flex-none w-full lg:w-[38vw] px-8 lg:pl-16 lg:pr-10">
          {heading && (
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-serif leading-tight mb-6">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-base text-white/60 leading-relaxed max-w-sm">
              {description}
            </p>
          )}

        </div>

        {/* Right — scrollable cards with overlaid arrows */}
        <div className="relative flex-1 min-w-0">
          {/* Prev arrow */}
          {cards.length > 0 && (
            <motion.button
              onClick={() => scroll(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_back" className="text-base text-white" />
            </motion.button>
          )}

          {/* Next arrow */}
          {cards.length > 0 && (
            <motion.button
              onClick={() => scroll(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_forward" className="text-base text-white" />
            </motion.button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-8 lg:px-0 pb-2">
          {cards.map((card) => {
            const url = getStrapiMediaUrl(card.image);
            const Wrapper = card.url ? Link : "div";
            const wrapperProps = card.url ? { href: card.url } : {};

            return (
              <Wrapper
                key={card.id}
                {...(wrapperProps as any)}
                className="relative flex-none w-64 h-96 lg:w-72 lg:h-[440px] overflow-hidden group cursor-pointer">
                {/* Image */}
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={card.image?.alternativeText ?? card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800" />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {card.tag && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">
                      {card.tag}
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {card.title}
                  </h3>
                </div>
              </Wrapper>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
