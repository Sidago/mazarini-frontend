"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabResultsSection({ data }: Props): React.ReactElement {
  const images = data.resultsImages ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="results"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-white text-neutral-900">
      {data.resultsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.15}
            color="rgba(0,0,0,0.04)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="10vw"
            flip={true}>
            {data.resultsWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left — title */}
        <div className="w-full lg:w-[35vw] flex-none flex flex-col justify-center px-8 lg:pl-[12vw] lg:pr-10 py-12 lg:py-0">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight">
            {data.resultsTitle ?? "The Results"}
          </h2>
        </div>

        {/* Right — 2×2 image grid */}
        <div className="w-full lg:w-[65vw] flex-none px-6 lg:pr-[8vw] lg:pl-4 py-8 lg:py-0">
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {images.slice(0, 4).map((img) => {
              const url = getStrapiMediaUrl(img);
              return url ? (
                <div key={img.id} className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={url}
                    alt={img.alternativeText ?? "Result"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
