import React from "react";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { DragScrollRow } from "./drag-scroll-row";

interface PillarsSectionProps {
  data: RdPage;
}

export function PillarsSection({ data }: PillarsSectionProps): React.ReactElement {
  const pillars = [...(data.pillars ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section
      id="pillars"
      className="relative w-screen h-screen flex-none bg-neutral-900 text-white overflow-hidden flex flex-col justify-center py-16"
    >
      {/* Watermark */}
      {data.pillarsWatermark && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            color: "rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
          }}
        >
          {data.pillarsWatermark}
        </span>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: pillar text cards */}
        {pillars.length > 0 && (
          <div className="mb-16 overflow-x-auto scrollbar-hide">
            <div className="flex gap-12 pb-4 border-b border-white/10">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="flex-none max-w-xs">
                  <h4 className="text-base font-bold mb-2">{pillar.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom: left title + right image cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              {data.pillarsTitle ?? "Our R&D Pillars"}
            </h2>
            <p className="text-lg leading-relaxed text-white/60 max-w-sm">
              {data.pillarsDescription}
            </p>
          </div>

          <DragScrollRow>
            {pillars.map((pillar) => {
              const url = getStrapiMediaUrl(pillar.image);
              return (
                <div
                  key={pillar.id}
                  className="relative flex-none w-64 h-80 overflow-hidden rounded-sm"
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white text-sm font-bold">{pillar.title}</span>
                  </div>
                </div>
              );
            })}
          </DragScrollRow>
        </div>
      </div>
    </section>
  );
}
