"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { Icon } from "@/components/ui/icon";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface WhySectionProps {
  data: RdPage;
}

export function WhySection({ data }: WhySectionProps): React.ReactElement {
  const cards = [...(data.whyCards ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section
      id="why"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-background-light text-neutral-900">

      {data.whyWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            flip={true}>
            {data.whyWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">

        {/* Left */}
        <div className="w-full lg:w-[40vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-8 py-12 lg:py-0">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
            {data.whyTitle ?? "Why We're\nInvesting in R&D"}
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 max-w-sm">
            {data.whyDescription}
          </p>
        </div>

        {/* Right — scrollable cards */}
        <div className="relative w-full lg:w-[60vw] flex-none min-w-0">

          {/* Left arrow — desktop only */}
          <motion.button
            onClick={() => scroll(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-10 h-10 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_back" className="text-base text-white" />
          </motion.button>

          {/* Right arrow — desktop only */}
          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-10 h-10 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_forward" className="text-base text-white" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 select-none px-6 lg:px-0"
          >
            {cards.map((card) => {
              const url = getStrapiMediaUrl(card.image);
              return (
                <div
                  key={card.id}
                  className="group relative flex-none w-72 h-96 lg:w-95 lg:h-130 overflow-hidden"
                >
                  {url ? (
                    <Image
                      src={url}
                      alt={card.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 288px, 380px"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200" />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                  {card.description && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-white text-sm leading-relaxed">{card.description}</p>
                    </div>
                  )}

                  <span className="absolute bottom-4 left-4 text-white text-sm font-semibold uppercase tracking-widest transition-opacity duration-300 group-hover:opacity-0">
                    {card.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
