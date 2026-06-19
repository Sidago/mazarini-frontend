"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api/client";
import type { RdPage } from "@/lib/types/strapi";
import { ParallaxText } from "../ui/scroll-animations";

interface PartnersSectionProps {
  data: RdPage;
}

export function PartnersSection({
  data,
}: PartnersSectionProps): React.ReactElement {
  const partners = data.partners ?? [];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section
      id="partners"
      className="relative w-screen min-h-screen lg:h-screen flex-none bg-background-light text-neutral-900 overflow-hidden flex items-center py-20 lg:py-0">
      {/* Watermark */}
      {data.partnersWatermark && (
        <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[40%] lg:inset-0 lg:h-auto z-0">
          <ParallaxText
            baseVelocity={0.2}
            color="rgba(0,0,0,0.06)"
            direction={isMobile ? "horizontal" : "vertical"}
            position="start"
            paddingStart="15vw"
            flip={true}>
            {data.partnersWatermark}
          </ParallaxText>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-center">
          {/* Left */}
          <div className="lg:ps-[12vw]">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-serif leading-tight mb-6 whitespace-pre-line">
              {data.partnersTitle ?? "In Good Company"}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600 max-w-sm whitespace-pre-line">
              {data.partnersDescription}
            </p>
          </div>

          {/* Right: logo grid */}
          <div className="grid grid-cols-3 gap-12 max-w-[90%] mx-auto">
            {partners.map((partner) => {
              const url = getStrapiMediaUrl(partner.image ?? null);
              return (
                <div
                  key={partner.id}
                  className="flex items-center justify-center py-4 opacity-50 hover:opacity-80 transition-opacity">
                  {url ? (
                    <Image
                      src={url}
                      alt={partner.image?.alternativeText ?? partner.name}
                      width={partner.image?.width ?? 160}
                      height={partner.image?.height ?? 88}
                      className="max-h-22 w-auto object-contain grayscale"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-neutral-500">
                      {partner.name}
                    </span>
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
