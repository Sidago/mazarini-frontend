import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";

interface LeadershipSectionProps {
  data: RdPage;
}

export function LeadershipSection({
  data,
}: LeadershipSectionProps): React.ReactElement {
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
      className="relative flex-none w-screen lg:w-auto lg:min-w-screen lg:h-screen overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-center py-20 lg:py-0 bg-neutral-900 text-white">
      {/* Watermark */}
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
      <div className="relative z-10 flex-none w-full lg:w-auto lg:max-w-md flex flex-col justify-center px-6 lg:px-10 py-12 lg:py-0">
        <h2 className="text-4xl lg:text-5xl font-serif font-semibold leading-tight mb-4">
          {data.leadershipTitle ?? "Key Leadership"}
        </h2>
        {data.leadershipDescription && (
          <p className="text-base leading-relaxed text-white/60">
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
              className="flex-none w-[80vw] sm:w-[20rem] lg:w-[18vw] flex flex-col items-center">
              <div className="relative w-60 h-80 overflow-hidden">
                {url ? (
                  <Image
                    src={url}
                    alt={member.name}
                    fill
                    className="object-cover rounded-sm"
                    sizes=""
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700" />
                )}
              </div>
              <p className="text-base font-semibold text-white text-center mt-3">
                {member.name}
              </p>
              <p className="text-sm text-white/50 text-center mt-0.5">
                {member.position}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
