import React from "react";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { DragScrollRow } from "./drag-scroll-row";

interface LeadershipSectionProps {
  data: RdPage;
}

export function LeadershipSection({ data }: LeadershipSectionProps): React.ReactElement {
  const members = data.featuredLeadership ?? [];

  return (
    <section
      id="leadership"
      className="relative w-screen h-screen flex-none bg-neutral-900 text-white overflow-hidden flex items-center"
    >
      {/* Watermark */}
      {data.leadershipWatermark && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            color: "rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
          }}
        >
          {data.leadershipWatermark}
        </span>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
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
                <div key={member.id} className="flex-none w-48">
                  <div className="w-full h-60 overflow-hidden mb-3">
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-700" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-white">{member.name}</p>
                  <p className="text-xs text-white/50 mt-0.5">{member.position}</p>
                </div>
              );
            })}
          </DragScrollRow>
        </div>
      </div>
    </section>
  );
}
