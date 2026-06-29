"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ParallaxText } from "@/components/ui/scroll-animations";
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

  return (
    <section
      id="pillars"
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row lg:items-center py-20 lg:py-0 bg-neutral-900 text-white">
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

      {/* Heading panel */}
      <div className="relative z-10 flex-none w-full lg:w-[34vw] flex flex-col justify-center px-6 lg:pl-[12vw] lg:pr-10 py-12 lg:py-0">
        <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
          {data.pillarsTitle ?? "Our R&D\nPillars"}
        </h2>
        <p className="text-base leading-relaxed text-white/60 max-w-sm">
          {data.pillarsDescription}
        </p>
      </div>

      {/* Cards row */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-stretch gap-6 px-6 lg:px-0 lg:pr-[6vw]">
        {pillars.map((pillar) => {
          const url = getStrapiMediaUrl(pillar.image);
          return (
            <div
              key={pillar.id}
              className="flex flex-col gap-3 flex-none w-[80vw] sm:w-[26rem] lg:w-[24vw]">
              <div className="h-28 overflow-hidden">
                <h4 className="text-xl font-bold text-primary line-clamp-1">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-white/80 leading-relaxed text-sm line-clamp-3">
                  {pillar.description}
                </p>
              </div>
              {url && (
                <div className="relative w-full h-90 flex-none overflow-hidden">
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
