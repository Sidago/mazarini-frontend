import React from "react";
import Image from "next/image";
import { RdSectionShell } from "./rd-section-shell";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface InnovationSectionProps {
  data: RdPage;
}

export function InnovationSection({ data }: InnovationSectionProps): React.ReactElement {
  const items = data.innovationItems ?? [];

  return (
    <RdSectionShell
      id="innovation"
      dark={false}
      watermark={data.innovationWatermark ?? "Innovation"}
      leftContent={
        <>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
            {data.innovationTitle ?? "Innovation at Work"}
          </h2>
          <p className="leading-relaxed text-neutral-600 max-w-sm">
            {data.innovationDescription}
          </p>
        </>
      }
      rightContent={
        <div className="grid grid-cols-2 gap-3 max-w-[78%] ml-auto">
          {items.slice(0, 4).map((item) => {
            const url = getStrapiMediaUrl(item.image ?? null);
            return (
              <div
                key={item.id}
                className="relative h-64 overflow-hidden rounded-sm group"
              >
                {url ? (
                  <Image
                    src={url}
                    alt={item.title ?? "Innovation"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 900px) 30vw, 50vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}
              </div>
            );
          })}
        </div>
      }
    />
  );
}
