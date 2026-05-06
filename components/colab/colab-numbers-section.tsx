"use client";

import { useEffect, useState } from "react";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabNumbersSection({ data }: Props): React.ReactElement {
  const stats = data.stats ?? [];

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
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-900 text-white">
      {data.numbersWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.04)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="10vw"
            flip={true}>
            {data.numbersWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 w-full px-8 lg:pl-[12vw] lg:pr-[10vw]">
        {data.numbersTitle && (
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-16">
            {data.numbersTitle}
          </h2>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat) => (
            <div key={stat.id}>
              <p className="text-5xl lg:text-7xl font-black text-primary leading-none mb-3">
                {stat.value}
                {stat.suffix && (
                  <span className="text-3xl lg:text-5xl">{stat.suffix}</span>
                )}
              </p>
              <p className="text-sm font-bold text-white uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              {stat.description && (
                <p className="text-xs text-white/50 leading-relaxed">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
