import React from "react";
import { RdSectionShell } from "./rd-section-shell";
import { DragScrollRow } from "./drag-scroll-row";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface PillarsSectionProps {
  data: RdPage;
}

export function PillarsSection({ data }: PillarsSectionProps): React.ReactElement {
  const pillars = [...(data.pillars ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <RdSectionShell
      id="pillars"
      dark={true}
      watermark={data.pillarsWatermark ?? "Pillars"}
      watermarkDirection="vertical"
      watermarkPosition="start"
      contentClassName="pl-[15%] pr-[5%]"
      leftContent={
        <div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            {data.pillarsTitle ?? "Our R&D Pillars"}
          </h2>
          <p className="text-lg leading-relaxed text-white/60 max-w-sm">
            {data.pillarsDescription}
          </p>
        </div>
      }
      rightContent={
        <DragScrollRow>
          {pillars.map((pillar) => {
            const url = getStrapiMediaUrl(pillar.image);
            return (
              <div
                key={pillar.id}
                className="relative flex-none w-95 h-130 overflow-hidden"
              >
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold uppercase tracking-widest">
                  {pillar.title}
                </span>
              </div>
            );
          })}
        </DragScrollRow>
      }
    />
  );
}
