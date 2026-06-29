"use client";

import { useEffect, useState } from "react";
import { ParallaxText } from "@/components/ui/scroll-animations";
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

  return (
    <section
      id="challenges"
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row lg:items-center py-20 lg:py-0 bg-neutral-950 text-white">

      {data.challengesWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.15)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart={isMobile ? "" : "14vw"}
            flip={true}>
            {data.challengesWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Heading panel */}
      <div className="relative z-10 flex-none w-full lg:w-[40vw] flex flex-col justify-center px-6 lg:pl-[15vw] lg:pr-15 py-12 lg:py-0">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight mb-6 whitespace-pre-line">
          {data.challengesTitle ?? "Unique Challenges,\nSmart Solutions"}
        </h2>
        {data.challengesDescription && (
          <p className="text-base leading-relaxed text-white/60 max-w-sm">
            {data.challengesDescription}
          </p>
        )}
      </div>

      {/* Cards row */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-stretch gap-10 px-6 lg:px-0 lg:pr-[10vw]">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="group flex-none w-[80vw] sm:w-[26rem] lg:w-[24vw] h-72 lg:h-90 relative overflow-hidden bg-neutral-800/40 p-4 flex flex-col justify-end cursor-default">

              {/* Default view — challenge label + description */}
              <div className="transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                <p className="text-primary text-lg font-bold uppercase tracking-widest mb-3">
                  {card.label}
                </p>
                {card.description && (
                  <p className="text-white text-lg leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>

              {/* Hover view — "Solution" + hoverDescription */}
              {card.hoverDescription && (
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-neutral-800/80 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-primary text-lg font-bold uppercase tracking-widest mb-3">
                    Solution
                  </p>
                  <p className="text-white text-lg leading-relaxed">
                    {card.hoverDescription}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
