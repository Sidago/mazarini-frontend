"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import { DragScrollRow } from "@/components/rd/drag-scroll-row";
import type { ColabPage } from "@/lib/types/strapi";

interface Props {
  data: ColabPage;
}

export function ColabTeamSection({ data }: Props): React.ReactElement {
  const members = data.teamMembers ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (members.length === 0) return <></>;

  return (
    <section
      id="team"
      className="relative w-screen min-h-screen lg:h-screen flex-none bg-neutral-900 text-white overflow-hidden flex items-center py-20 lg:py-0">
      {data.teamWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(255,255,255,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="18vw"
            flip={true}>
            {data.teamWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative font-serif z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:ps-[15vw]">
            <h2 className="text-4xl font-semibold leading-tight mb-6 mt-10">
              {data.teamTitle ?? "Team Members"}
            </h2>
            {data.teamDescription && (
              <p className="text-base leading-relaxed text-white/70 max-w-sm">
                {data.teamDescription}
              </p>
            )}
          </div>

          <DragScrollRow>
            {members.map((member) => {
              const url = getStrapiMediaUrl(member.image ?? null);
              return (
                <div key={member.id} className="flex-none text-center w-56 lg:w-64">
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
          </DragScrollRow>
        </div>
      </div>
    </section>
  );
}
