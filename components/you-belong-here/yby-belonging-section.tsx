"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyBelongingSection({ data }: Props): React.ReactElement {
  const items = data.belongingItems ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (items.length === 0) return <></>;

  return (
    <section
      id="belonging"
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row lg:items-center py-20 lg:py-0 bg-background-light text-neutral-900">
      {/* Watermark */}
      {data.belongingWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.05)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "0vh" : "12vw"}
            flip={true}>
            {data.belongingWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Heading panel */}
      <div className="relative z-10 flex-none w-full lg:w-[50vw] flex flex-col justify-center px-6 lg:pl-[20vw] lg:pr-20 py-12 lg:py-0">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
          {data.belongingTitle ?? "Why Belonging Matters"}
        </h2>
        {data.belongingDescription && (
          <p className="text-base font-serif leading-relaxed text-neutral-600 max-w-lg">
            {data.belongingDescription}
          </p>
        )}
      </div>

      {/* Cards row */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-stretch gap-8 px-6 lg:px-0 lg:pr-[10vw]">
        {items.map((item) => {
          const url = getStrapiMediaUrl(item.image ?? null);
          return (
            <div
              key={item.id}
              className="font-serif flex flex-col gap-3 flex-none w-[80vw] sm:w-[26rem] lg:w-[24vw]">
              <div className="h-28 overflow-hidden">
                <h4 className="text-xl font-semibold text-primary line-clamp-1">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
              {url && (
                <div className="relative w-full h-90 flex-none overflow-hidden">
                  <Image
                    src={url}
                    alt={item.title}
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
