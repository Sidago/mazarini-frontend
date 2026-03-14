import React from "react";
import { RdSectionShell } from "./rd-section-shell";
import { DragScrollRow } from "./drag-scroll-row";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface WhySectionProps {
  data: RdPage;
}

export function WhySection({ data }: WhySectionProps): React.ReactElement {
  const cards = [...(data.whyCards ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <RdSectionShell
      id="why"
      dark={false}
      watermark={data.whyWatermark ?? "Why"}
            leftContent={
        <>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            {data.whyTitle ?? "Why We're Investing in R&D"}
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600 max-w-sm">
            {data.whyDescription}
          </p>
        </>
      }
      rightContent={
        <DragScrollRow>
          {cards.map((card) => {
            const url = getStrapiMediaUrl(card.image);
            return (
              <div
                key={card.id}
                className="relative flex-none w-56 h-72 overflow-hidden rounded-sm"
              >
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={card.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold uppercase tracking-widest">
                  {card.label}
                </span>
              </div>
            );
          })}
        </DragScrollRow>
      }
    />
  );
}
