"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CareerPage, CareerCultureCard } from "@/lib/types/strapi";

interface Props {
  data: CareerPage | null;
}

function Card({ card }: { card: CareerCultureCard }): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(card.image ?? null);

  const inner = (
    <div className="group relative h-115 overflow-hidden cursor-pointer">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={card.image?.alternativeText ?? card.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {card.tag && (
          <span className="inline-block w-fit px-3 py-1 mb-3 border border-white/30 text-[11px] font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-sm">
            {card.tag}
          </span>
        )}
        <h3 className="text-2xl font-bold text-white leading-tight">
          {card.title}
        </h3>
      </div>
    </div>
  );

  if (card.url) {
    return (
      <Link href={card.url} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function CareerCultureSection({ data }: Props): React.ReactElement {
  const cards = data?.cultureCards ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right"): void {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (cards.length === 0) return <></>;

  return (
    <section className="relative py-24 lg:py-32 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 flex items-center pointer-events-none select-none">
        <ParallaxText
          baseVelocity={-1}
          className="inline-block text-[20vw] md:text-[15vw] font-black text-white/4 leading-none mx-4">
          Culture
        </ParallaxText>
      </div>

      <div className="relative z-10 max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: heading */}
          <div className="lg:w-[30%] lg:sticky lg:top-32 shrink-0">
            <FadeIn direction="left" duration={0.7}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {data?.cultureTitle ?? "A glimpse into our culture"}
              </h2>
              {data?.cultureSubtitle && (
                <p className="text-base lg:text-lg text-white/50 leading-relaxed mb-8">
                  {data.cultureSubtitle}
                </p>
              )}
            </FadeIn>
          </div>

          {/* Right: horizontal scrolling cards */}
          <div className="relative lg:w-[70%] w-full ps-5.5">
            <motion.button
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll left"
              className="absolute hidden md:flex left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_back" className="text-lg text-white" />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll right"
              className="absolute hidden md:flex right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
              <Icon name="arrow_forward" className="text-lg text-white" />
            </motion.button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {cards.map((card, index) => (
                <FadeIn
                  key={card.id}
                  direction="right"
                  delay={index * 0.1}
                  className="min-w-75 md:min-w-85 snap-start shrink-0">
                  <Card card={card} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
