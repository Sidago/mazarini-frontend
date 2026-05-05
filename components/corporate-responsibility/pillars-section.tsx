"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { Icon } from "@/components/ui/icon";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { CorporateResponsibilityPage } from "@/lib/types/strapi";

interface PillarsSectionProps {
  data: CorporateResponsibilityPage;
}

export function CrPillarsSection({
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
    scrollRef.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section
      id="pillars"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-background-light text-neutral-900">
      {data.pillarsWatermark && (
        <div className="pointer-events-none select-none absolute">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "0vh" : "15vw"}
            flip={true}>
            {data.pillarsWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left */}
        <div className="w-full lg:w-[40vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-8 py-12 lg:py-0">
          <h2 className="text-2xl font-serif font-bold leading-tight mb-6">
            {data.pillarsTitle ?? "Our Social Responsibility"}
          </h2>
          {data.pillarsDescription && (
            <p className="text-sm font-serif font-thin leading-relaxed text-neutral-600 max-w-sm">
              {data.pillarsDescription}
            </p>
          )}
        </div>

        {/* Right — scrollable cards */}
        <div className="relative w-full lg:w-[60vw] flex-none min-w-0">
          <motion.button
            onClick={() => scroll(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_back" className="text-lg text-white" />
          </motion.button>

          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-12 h-12 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_forward" className="text-lg text-white" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 select-none px-6 lg:px-12">
            {pillars.map((pillar) => {
              const url = getStrapiMediaUrl(pillar.image);
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif flex flex-col gap-2 min-w-[70vw] lg:min-w-[25vw]">
                  <h4 className="text-lg font-semibold text-primary">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
                    {pillar.description}
                  </p>
                  {url && (
                    <Image
                      src={url}
                      alt={pillar.title}
                      width={pillar.image?.width ?? 800}
                      height={pillar.image?.height ?? 600}
                      className="w-full max-h-[60vh] object-cover mt-1"
                    />
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
