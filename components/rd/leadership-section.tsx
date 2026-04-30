import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { DragScrollRow } from "./drag-scroll-row";
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
      className="relative w-screen min-h-screen lg:h-screen flex-none bg-neutral-900 text-white overflow-hidden flex items-center py-20 lg:py-0">
      {/* Watermark */}
      {data.leadershipWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="18vw"
            flip={true}>
            {data.leadershipWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="lg:ps-[15vw]">
            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6 mt-10">
              {data.leadershipTitle ?? "Leadership"}
            </h2>
            <p className="text-lg leading-relaxed text-white/60 max-w-sm">
              {data.leadershipDescription}
            </p>
          </div>

          {/* Right: member cards */}
          <DragScrollRow>
            {members.map((member) => {
              const url = getStrapiMediaUrl(member.image ?? null);
              return (
                <div key={member.id} className="flex-none">
                  <div className="relative w-full h-90 overflow-hidden mb-3">
                    {url ? (
                      <Image
                        src={url}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 280px"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700" />
                    )}
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {member.name}
                  </p>
                  <p className=" text-white/50 mt-0.5">{member.position}</p>
                </div>
              );
            })}
          </DragScrollRow>
        </div>
      </div>
    </section>
  );
}
