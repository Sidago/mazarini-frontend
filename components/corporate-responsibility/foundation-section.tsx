"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/api/client";
import { ParallaxText } from "@/components/ui/scroll-animations";
import type { CorporateResponsibilityPage } from "@/lib/types/strapi";

interface FoundationSectionProps {
  data: CorporateResponsibilityPage;
}

export function FoundationSection({
  data,
}: FoundationSectionProps): React.ReactElement {
  const imageUrl = getStrapiMediaUrl(data.foundationImage ?? null);

  return (
    <section
      id="foundation"
      className="relative w-screen min-h-screen lg:h-screen flex-none overflow-hidden bg-neutral-900 text-white">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left: image with overlay */}
        <div className="relative w-full lg:w-[60vw] min-h-[50vh] lg:h-full flex-none">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={data.foundationTitle ?? "Foundation"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute font-serif inset-0 flex flex-col justify-center p-10 lg:p-16">
            {data.foundationDescription && (
              <p className="text-white text-base leading-relaxed mb-8 max-w-xl">
                {data.foundationDescription}
              </p>
            )}
            {data.foundationCtaUrl && (
              <Link
                href={data.foundationCtaUrl}
                className="inline-block self-start bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-neutral-900 hover:bg-amber-500 transition-colors">
                {data.foundationCtaText ?? "Learn More"}
              </Link>
            )}
          </div>
        </div>

        {/* Right: impact intro */}
        <div className="w-full lg:w-[40vw] font-serif flex-none flex items-center justify-center bg-neutral-900 p-10 lg:p-16">
          <div className="pointer-events-none select-none absolute">
            <ParallaxText
              baseVelocity={0.2}
              color="rgba(255,255,255,0.06)"
              direction="vertical"
              flip={true}
              position="start">
              {data.impactWatermark ?? "Impact "}
            </ParallaxText>
          </div>

          <div className="text-center lg:text-left max-w-sm">
            <h2 className="text-3xl font-semibold text-white leading-tight mb-8">
              {data.impactTitle ?? "Impact by the Numbers"}
            </h2>
            {data.impactCtaUrl && (
              <Link
                href={data.impactCtaUrl}
                className="inline-block max-w-50 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-center text-neutral-900 hover:bg-amber-500 transition-colors hover:cursor-pointer">
                {data.impactCtaText ?? "View Annual Report"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
