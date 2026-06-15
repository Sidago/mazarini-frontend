"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabNumbersSection({ data }: Props): React.ReactElement {
  const stats = data.stats ?? [];
  const imageUrl = getStrapiMediaUrl(data.numbersImage ?? null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (stats.length === 0) return <></>;

  return (
    <section
      id="numbers"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex flex-col lg:flex-row overflow-hidden">

      {/* Left — stats */}
      <div className="relative w-full lg:w-[55%] flex-none bg-background-light flex items-center overflow-hidden py-20 lg:py-0">

        {/* Watermark */}
        {data.numbersWatermark && (
          <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
            <ParallaxText
              baseVelocity={0.2}
              color="rgba(0,0,0,0.05)"
              direction={isMobile ? "horizontal" : "vertical"}
              position="start"
              paddingStart="8vw"
              flip={true}>
              {data.numbersWatermark}
            </ParallaxText>
          </div>
        )}

        <div className="relative z-10 w-full px-8 lg:pl-[20vw] lg:pr-16">
          {data.numbersTitle && (
            <h2 className="text-xl font-semibold text-neutral-900 mb-12 uppercase tracking-widest">
              {data.numbersTitle}
            </h2>
          )}

          <div className="flex flex-col gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="border-neutral-200 pt-2">
                <p className="text-lg text-neutral-700 leading-none mb-1">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg">{stat.suffix}</span>
                  )}
                </p>
                <p className="text-xs font-bold text-neutral-900 uppercase tracking-widest">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — image with right gap */}
      <div className="relative w-full lg:w-[45%] flex-none min-h-[50vh] lg:min-h-0 lg:pr-[5vw]">
        <div className="relative w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data.numbersTitle ?? "By the numbers"}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-200" />
          )}
        </div>
      </div>

    </section>
  );
}
