"use client";

import { useEffect, useState } from "react";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabVisionSection({ data }: Props): React.ReactElement {
  const items = data.visionItems ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="vision"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-900 text-white">
      {data.visionWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.05)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "0vh" : "12vw"}
            flip={true}>
            {data.visionWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">
        {/* Left */}
        <div className="w-full lg:w-[40vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-10 py-12 lg:py-0">
          <h2 className="text-xl font-serif font-bold leading-tight mb-4 text-white">
            {data.visionTitle ?? "Vision"}
          </h2>
          {data.visionSubtitle && (
            <p className="text-sm font-serif text-primary font-semibold uppercase tracking-widest">
              {data.visionSubtitle}
            </p>
          )}
        </div>

        {/* Right — item list */}
        <div className="w-full lg:w-[60vw] flex-none px-6 lg:pr-[10vw] lg:pl-8 py-8 lg:py-0 flex flex-col justify-center gap-8 overflow-y-auto lg:max-h-[80vh]">
          {items.map((item) => (
            <div key={item.id} className="font-serif border-b border-white/10 pb-6 last:border-0 last:pb-0">
              <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
