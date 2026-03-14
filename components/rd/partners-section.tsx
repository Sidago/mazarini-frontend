import React from "react";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";

interface PartnersSectionProps {
  data: RdPage;
}

export function PartnersSection({ data }: PartnersSectionProps): React.ReactElement {
  const partners = data.partners ?? [];

  return (
    <section
      id="partners"
      className="relative w-screen h-screen flex-none bg-background-light text-neutral-900 overflow-hidden flex items-center"
    >
      {/* Watermark */}
      {data.partnersWatermark && (
        <span
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 260px)",
            color: "rgba(0,0,0,0.04)",
            whiteSpace: "nowrap",
          }}
        >
          {data.partnersWatermark}
        </span>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              {data.partnersTitle ?? "In Good Company"}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600 max-w-sm">
              {data.partnersDescription}
            </p>
          </div>

          {/* Right: logo grid */}
          <div className="grid grid-cols-3 gap-8">
            {partners.map((partner) => {
              const url = getStrapiMediaUrl(partner.image ?? null);
              return (
                <div
                  key={partner.id}
                  className="flex items-center justify-center py-4 opacity-50 hover:opacity-80 transition-opacity"
                >
                  {url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt={partner.name}
                      className="max-h-10 w-auto object-contain grayscale"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-neutral-500">{partner.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
