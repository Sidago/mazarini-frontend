"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { Icon } from "@/components/ui/icon";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface PillarsSectionProps {
  data: RdPage;
}

export function PillarsSection({
  data,
}: PillarsSectionProps): React.ReactElement {
  const pillars = [...(data.pillars ?? [])].sort(
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
      id="pillars"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-900 text-white">
      {/* Watermark */}
      {data.pillarsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            flip={true}>
            {data.pillarsWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left */}
        <div className="w-full lg:w-[40vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-8 py-12 lg:py-0">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
            {data.pillarsTitle ?? "Our R&D\nPillars"}
          </h2>
          <p className="text-base leading-relaxed text-white/60 max-w-sm">
            {data.pillarsDescription}
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
            <Icon name="arrow_back" className="text-white" />
          </motion.button>

          {/* Right arrow — desktop only */}
          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-10 h-10 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_forward" className="text-white" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 select-none px-6 lg:px-0">
            {pillars.map((pillar) => {
              const url = getStrapiMediaUrl(pillar.image);
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2 flex-none w-[70vw] lg:w-[25vw]">
                  <h4 className="text-2xl font-bold text-primary">
                    {pillar.title}
                  </h4>
                  <p className="text-white/80 leading-relaxed max-w-md">
                    {pillar.description}
                  </p>
                  {url && (
                    <div className="relative w-full h-100 overflow-hidden">
                      <Image
                        src={url}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 70vw, 25vw"
                        draggable={false}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
