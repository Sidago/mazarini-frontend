"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { YouBelongHerePage } from "@/lib/types/strapi";

interface Props {
  data: YouBelongHerePage;
}

export function YbyLeadershipSection({ data }: Props): React.ReactElement {
  const members = data.featuredLeadership ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="leadership"
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen bg-neutral-900 text-white overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-center py-20 lg:py-0">
      {data.leadershipWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.1)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="18vw"
            flip={true}>
            {data.leadershipWatermark}
          </ParallaxText>
        </div>
      )}

      {/* Heading panel */}
      <div className="relative z-10 flex-none w-full lg:w-auto lg:max-w-md font-serif flex flex-col justify-center px-6 lg:px-10 py-12 lg:py-0">
        <h2 className="text-4xl font-semibold leading-tight mb-6">
          {data.leadershipTitle ?? "Leadership"}
        </h2>
        {data.leadershipDescription && (
          <p className="text-base leading-relaxed text-white/70 max-w-lg">
            {data.leadershipDescription}
          </p>
        )}
      </div>

      {/* Cards row */}
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-stretch gap-6 px-6 lg:px-0 lg:pr-[6vw]">
        {members.map((member) => {
          const url = getStrapiMediaUrl(member.image ?? null);
          return (
            <div
              key={member.id}
              className="flex-none text-center w-[80vw] sm:w-[20rem] lg:w-[18vw]">
              <div className="relative w-full h-72 lg:h-80 overflow-hidden mb-4">
                {url ? (
                  <Image
                    src={url}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 256px"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700" />
                )}
              </div>
              <p className="text-lg font-bold text-white">{member.name}</p>
              <p className="text-white/50 text-sm mt-0.5">{member.position}</p>
              {member.location && (
                <p className="text-white/40 text-sm mt-0.5">{member.location}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
