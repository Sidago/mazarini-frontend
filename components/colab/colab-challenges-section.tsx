"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { Icon } from "@/components/ui/icon";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabChallengesSection({ data }: Props): React.ReactElement {
  const cards = [...(data.challengeCards ?? [])].sort(
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
      id="challenges"
      className="relative w-screen min-h-screen lg:h-screen flex-none flex items-center overflow-hidden py-20 lg:py-0 bg-neutral-950 text-white">

      {data.challengesWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.05)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "" : "14vw"}
            flip={true}>
            {data.challengesWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center w-full lg:h-full">

        {/* Left */}
        <div className="w-full lg:w-[40vw] flex-none flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-8 py-12 lg:py-0">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
            {data.challengesTitle ?? "Unique Challenges,\nSmart Solutions"}
          </h2>
          {data.challengesDescription && (
            <p className="text-base leading-relaxed text-white/60 max-w-sm">
              {data.challengesDescription}
            </p>
          )}
        </div>

        {/* Right — scrollable cards */}
        <div className="relative w-full lg:w-[60vw] flex-none min-w-0">
          <motion.button
            onClick={() => scroll(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-10 h-10 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_back" className="text-white" />
          </motion.button>

          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-10 h-10 rounded-full bg-primary items-center justify-center cursor-pointer shadow-lg">
            <Icon name="arrow_forward" className="text-white" />
          </motion.button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide select-none px-6 lg:px-8 lg:h-screen items-center">
            {cards.map((card) => {
              return (
                <div
                  key={card.id}
                  className="group flex-none w-72 lg:w-80 h-72 lg:h-80 relative overflow-hidden bg-neutral-800/40 p-6 flex flex-col justify-end cursor-default">

                  {/* Default view — challenge label + description */}
                  <div className="transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                      {card.label}
                    </p>
                    {card.description && (
                      <p className="text-white text-sm leading-relaxed">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Hover view — "Solution" + hoverDescription */}
                  {card.hoverDescription && (
                    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-neutral-800/80 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                        Solution
                      </p>
                      <p className="text-white text-sm leading-relaxed">
                        {card.hoverDescription}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
