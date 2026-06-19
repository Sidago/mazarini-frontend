"use client";

import { useEffect, useState } from "react";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyGoalsSection({ data }: Props): React.ReactElement {
  const items = data.goals ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="goals"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-background-light text-neutral-900">
      {data.goalsWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.05)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "0vh" : "12vw"}
            flip={true}>
            {data.goalsWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left */}
        <div className="w-full flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-10 py-12 lg:py-0">
          <h2 className="text-2xl lg:text-4xl font-serif font-bold leading-tight mb-6 text-neutral-900">
            {data.goalsTitle ?? "Our Goals"}
          </h2>
          {data.goalsDescription && (
            <p className="text-lg font-serif leading-relaxed text-neutral-600 max-w-3xl whitespace-pre-line">
              {data.goalsDescription}
            </p>
          )}
        </div>

        {/* Right — item list */}
        {/* <div className="w-full lg:w-[62vw] flex-none px-6 lg:pr-[10vw] lg:pl-8 py-8 lg:py-0 flex flex-col justify-center gap-8 overflow-y-auto lg:max-h-[80vh]">
          {items.map((item, i) => (
            <div key={item.id} className="font-serif border-b border-neutral-200 pb-6 last:border-0 last:pb-0 flex gap-5 items-start">
              <span className="flex-none text-xs font-bold text-primary uppercase tracking-widest pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
